# 浏览器工作原理

## HTML解析器
    HTML5规范中规范了浏览器的解析算法，包括两个阶段：符号化及构建树。

    符号化是词法分析的过程，将输入解析为符号，html的符号包括开始标签、结束标签、属性名及属性值。符号识别器识别出符号后，将其传递给树构造器，并读取下一个字符，以识别下一个符号，直到处理完所有输入。流程如下：

```
Network————>Tokeniser————>Tree Construction————>DOM
```


##### 符号识别算法(The tokenization algorithm)
    该算法用状态机表示。每读取输入流中的一个或多个字符，并根据这些字符转移到下一个状态，当前的符号状态及构建树状态共同影响结果。
    状态机核心实现：
```
function match(string){
    let state = start;
    for(let c of string){
        state = state(c)
    }
    return state === end;
}
```

##### 树的构建算法(Tree construction algorithm)
    在树的构建阶段，将修改以Document为根的DOM树，将元素附加到树上。每个由符号识别器识别生成的节点将会被树构造器处理，规范中定义了每个符号相对应的Dom元素，对应的Dom元素将会被创建。这些元素除了会被添加到Dom树上，还将被添加到开放元素堆栈中。这个堆栈用来纠正嵌套的未匹配和未闭合标签，这个算法也是用状态机描述，所有的状态采用插入模式。