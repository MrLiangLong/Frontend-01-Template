
var regexp = /([0-9\.]+)|([ ]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g
var dictionary = ["Number","Whitespace","LineTerminator","+","-","*","/"]

function* tokenize(source){
    var result = null;
    var lastIndex = 0;
    do{

        //匹配
        lastIndex = regexp.lastIndex;
        result = regexp.exec(source);

        //判断
        if(!result)
            break;  
        if(regexp.lastIndex-lastIndex>result[0].length)
            throw new Error("Unexpected token \""+source.slice(lastIndex,regexp.lastIndex-result[0].length)+"\"!");    

        //生成token
        let token = {
            type:null,
            value:null
        }
        for(var i=0;i<dictionary.length;i++){
             if(result[i+1]){
                token.type = (dictionary[i])
             }
        }   
        token.value =(result[0])

        yield token;
            
    }while(result)

    yield {
        type:"EOF"
    }
}

function Expression(source){
    if(source[0].type==="AdditiveExpression" && source[1].type==="EOF"){
        let node = {
            type:"Expression",
            children:[source.shift(),source.shift()]
        }
        source.unshift(node);
        return node;
    }
    AdditiveExpression(source);
    return Expression(source)
}

function AdditiveExpression(source){
    if(source[0].type==="Number"){
        MultiplicativeExpression(source)
        return AdditiveExpression(source)
    }
    if(source[0].type==="MultiplicativeExpression"){
        let node = {
            type:"AdditiveExpression",
            children:[source.shift()]
        }
        source.unshift(node);
        return AdditiveExpression(source)
    }

    if(source[0].type==="AdditiveExpression" && source.length>1 && source[1].type==="+"){
        let node = {
            type:"AdditiveExpression",
            children:[source.shift(),source.shift()]
        }
        MultiplicativeExpression(source);
        node.children.push(source.shift())
        source.unshift(node);
        return AdditiveExpression(source)
    }

    if(source[0].type==="AdditiveExpression" && source.length>1 && source[1].type==="-"){
        let node = {
            type:"AdditiveExpression",
            children:[source.shift(),source.shift()]
        }
        MultiplicativeExpression(source);
        node.children.push(source.shift())
        source.unshift(node);
        return AdditiveExpression(source)
    }

    
    if(source[0].type=="AdditiveExpression")
        return source[0]


}

function MultiplicativeExpression(source){
    if(source[0].type==="Number"){
        let node = {
            type:"MultiplicativeExpression",
            children:source.shift()
        }
        source.unshift(node);
        return MultiplicativeExpression(source)
    }

    if(source[0].type==="MultiplicativeExpression"
        && source.length>1 && source[1].type==="*"){
        let node = {
            type:"MultiplicativeExpression",
            children:[source.shift(),source.shift(),source.shift()]
        }
        source.unshift(node)
        return MultiplicativeExpression(source)
    }

    if(source[0].type==="MultiplicativeExpression"
    && source.length>1 && source[1].type==="/"){
        let node = {
            type:"MultiplicativeExpression",
            children:[source.shift(),source.shift(),source.shift()]
        }
        source.unshift(node)
        return MultiplicativeExpression(source)
    }

    if(source[0].type=="MultiplicativeExpression")
        return source[0]
    
        throw new Error();
}

let source = [];
for(let token of tokenize("1024+10*25")){
    if(token.type !=="Whitespace" && token.type!=="LineTerminator"){
        source.push(token)
    }
}
Expression(source);

//解析表达式括号 github.com/wintercn
function parse(source){
    let stack = [];
    for(let c of source){
        if(c==="(" || c==="[" || c==="{")
            stack.push(c);
        
        if(c===")"){
            if(stack[stack.length-1]==="(")
                stack.pop();
            else
                return false;
        }
        
        if(c==="]"){
            if(stack[stack.length-1]==="[")
                stack.pop();
            else
                return false;
        }

        if(c==="}"){
            if(stack[stack.length-1]==="{")
                stack.pop();
            else
                return false;
        }
    }
    if(stack.length===0){
        return true;
    }else{
        return false;
    }
}
