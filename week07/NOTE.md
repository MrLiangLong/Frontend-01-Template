# 每周总结可以写在这里

## CSS语法的研究
#### CSS总体结构
产生式-->CSS语法
@charset  
@import  
rules  
  @media  
  @page  
  rule

  1、HTML注释"<-- -->"在CSS里面被解释为空白

版本兼容性是工程问题，不是技术问题。

http://www.html-js.com/article/2402

#### CSS规则结构

https://www.w3.org/TR/?tag=css

```
let iframe = document.createElement("iframe");
document.body.innerHTML = "";
document.body.appendChild(iframe);


function happen(element, event){
    return new Promise(function(resolve){
        let handler = () => {
            resolve();
            element.removeEventListener(event, handler);
        }
        element.addEventListener(event, handler);
    })
}


void async function(){
    for(let standard of standards) {
        iframe.src = standard.url;
        console.log(standard.name);
        await happen(iframe, "load");
    }
}();

```