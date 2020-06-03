String.prototype.compare = function (str) {
    //不区分大小写
    if (this.toLowerCase() == str.toLowerCase()) {
        return true;
    } else {
        return false;
    }
}

//验证简单选择器|复合选择器与元素是否匹配
var simpleMatcher = function (simpleSelector, element) {
    let flag = false;
    let firstWord = simpleSelector.substring(0, 1);
    //通配符
    if (firstWord === "*") {
        return true;
    }

    //去除伪类元素
    let pseudoClsType;
    if (simpleSelector.includes(':')) {
        let arr = simpleSelector.split(":")
        simpleSelector = arr[0];
        pseudoClsType = arr[arr.length - 1];//最后一个值
        //css伪类元素貌似不会变换操作元素节点，因此无做特殊处理
    }

    //判断是否为标签:开始为标签
    if (firstWord >= 'a' && firstWord <= 'z') {
        let curTagName = simpleSelector.match(/([\w]*)/ig)[0] || '';
        flag = element.tagName.compare(curTagName);
        console.log("判断标签开始是否相等", flag)
    }

    //匹配出ID选择器
    let ids = simpleSelector.match(/\#([\w]*)/ig)
    if (ids) {
        if (ids.length > 1) throw new Error("ID选择器只能有1个");
        flag = (element.getAttribute("id") || "").compare(ids[0].replace("#", ""));
        console.log("ID选择器匹配", flag)
        if (!flag) return flag;
    }
    //匹配出Class选择器
    let cls = simpleSelector.match(/\.([\w]*)/ig)
    if (cls) {
        let eleCls = (element.getAttribute("class") || "").split(" ");
        if (!element.getAttribute("class") || cls.length > eleCls.length) {
            flag = false;
        } else {
            ///dom的样式>=选择器的样式
            let isContained = function isContained(aa, bb) {
                if (!(aa instanceof Array) || !(bb instanceof Array) || ((aa.length < bb.length))) {
                    return false;
                }
                var aaStr = aa.toString();
                for (var i = 0; i < bb.length; i++) {
                    if (aaStr.indexOf(bb[i].replace(".", "")) < 0) return false;
                }
                return true;
            }
            flag = isContained(eleCls, cls);
        }
        console.log("匹配class样式", flag)
        if (!flag) return flag;
    }
    //获取[attr=value]
    let attrs = simpleSelector.match(/\[(.+?)\]/g)
    if (attrs) {
        let checkFlag = true;
        for (let i = 0; i < attrs.length; i++) {
            let [key, value] = attrs[i].replace(/\[|\]/g, "").split("=");//"name=btn"           
            if (element.getAttribute(key) != value) {
                checkFlag = false;
                break;
            }
        }
        flag = checkFlag;
        console.log("属性选择器", checkFlag)
        if (!flag) return flag;
    }

    return flag;
}

//验证复杂选择器,从右到左依次验证
var complexSelector = function (selector,selectorAttr,element) {

    /** 
        复杂选择器
        e1 e2: 父元素e1底下的所有元素e2
        e1>e2:父元素e1内的所有子元素e2
        e1+e2:el元素相邻的下一个兄弟元素
        e1~e2:e1元素相邻下的所有兄弟e2元素
    */

    //['#box','div[name=abc]']  #box>div[name=abc]
    let curElement = element,
        selectorsLength = selectorAttr.length,
        curFlag = isLastSelector = true,
        selectorPos, curSelector, selectType, curPoint;
    //从右到左，依次匹配选择器与元素
    while (selectorsLength > 0) {
        selectorPos = --selectorsLength;
        //从后向前依次判断选择器
        curSelector = selectorAttr[selectorPos];
        //选择器与样式是否匹配
        curFlag = simpleMatcher(curSelector, curElement);
        //获取当前选择器前的选择器类型
        if (selectorPos !== 0) {
            curPoint = selector.length - curSelector.length;//获取当前选择器的锚点
            selectType = selector.substring(curPoint - 1, curPoint);
        } else {
            //第一个选择器 退出
            break;
        }

        if (curFlag) {
            isLastSelector = false;
            if (selectType.trim() == "+") { //选择器类型：e1+e2
                curElement = curElement.previousElementSibling;
            }
            else if (selectType.trim() == "") { //选择器类型：e1 e2
                const loopMatch = function () {
                    curElement = curElement.parentNode;
                    --selectorPos;
                    curSelector = selectorAttr[selectorPos];

                    curFlag = simpleMatcher(curSelector, curElement)
                    if (!curFlag && curElement.tagName.toLowerCase() !== "html") {
                        //样式与元素不匹配，样式不变，继续查找上一个元素
                        ++selectorPos;
                        loopMatch();
                    }
                }
                //循环遍历父元素与选择器匹配
                loopMatch();
                if (!curFlag) { break } else {
                    //当前选择器匹配到元素，则选择器右移，元素往上一级
                    --selectorsLength;
                    curElement = curElement.parentNode;
                };
            }
            else if (selectType.trim() == ">") {//选择器类型:e1>e2
                curElement = curElement.parentNode;
            } else if (selectType.trim() == "~") {
                const loopMatch = function () {
                    curElement = curElement.previousElementSibling;
                    if (curElement) {
                        curFlag = simpleMatcher(curSelector, curElement);
                    }
                    if (!curFlag && curElement) {
                        loopMatch();
                    }
                }
                loopMatch();
                if (!curFlag) { break } else {
                    //当前选择器匹配到元素，则选择器右移，元素往上一级
                    --selectorsLength;
                    curElement = curElement.parentNode;
                };

            }
            else {
                curElement = curElement.parentNode;
            }

        } else {
            if (isLastSelector) {
                console.log("最后一个选择器未匹配元素")
                break;
            }
            if (selectType.trim() == "") {
                curElement = curElement.parentNode;
            }
        }
    }
    return curFlag;
}

var matchSelector = function (selector, element) {

    if (!selector || !element) {
        return false;
    }
    selector = selector.toLowerCase();
    //按复杂选择器规则，切割选择器，若为复杂选择器 elems.length>1
    let selectorAttr = selector.split(/\>|\~|\+|\s+/);
    console.log("selectorAttr", selectorAttr)
    //处理元素集合,如class
    var flag;
    if (element.length) {
        for(let ele of element){
            if (selectorAttr.length === 1) {
                let simpleSelector = selectorAttr[0];
                flag = simpleMatcher(simpleSelector, ele);
            }else{
                flag = complexSelector(selector,selectorAttr,ele);
            }
            if(flag) break;
        }
        return flag;
    }

    
    //简单选择器 || 复合选择器 * | div | div#id/.cls/[attr-name]
    if (selectorAttr.length === 1) {
        let simpleSelector = selectorAttr[0];
        return simpleMatcher(simpleSelector, element);  
    }

    return complexSelector(selector,selectorAttr,element)

}

//var flag1 = matchSelector("#test+#test1", document.getElementById('test1')); //验证通过
//var flag2 = matchSelector("#box>#test.box", document.getElementById('test'));  //验证通过
//var flag3 = matchSelector("#box #test .bbb", document.getElementById('aa')); //验证通过
var flag4 = matchSelector("#box~p", document.getElementsByClassName("p")); //验证通过
console.log("flag4", flag4)
//console.log("flag",flag1 ,flag2,flag3)
