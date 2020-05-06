

# Function/Class/JS引擎

OC相关：Objective C --> C++ 异步代码

#### 1、实现已经基础的JS引擎
```
#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

int main(int argc,const char * argv[]){
	//创建上下文
	JSContext context = [[JSContext alloc] init]
	//定义js代码字符串
	NSString* code = @"new Promise(resolve=>resolve()).then(()=>this.a=3),function(){return this.a}"
	//执行js代码字符串 === result=函数
	JSValue* result = [context evaluateScript:code] 
	NSLog(@"%",[result toString]);
	//执行result函数
	result = [result callWithArguments:@[]]  
	NSLog(@"%",[result toString]);
}


代码分析：
evaluateScript【执行代码块】执行产生一个宏任务。
	Promise产生一个微任务，当遇到resolve()，又产生一个微任务 this.a=3; 会产生微任务列表
callWithArgument【执行函数】执行产生一个宏任务(执行JS代码片段)，
	产生微任务return this.a
Promise产生微任务`

```

##### 2、宏任务与微任务总结
* 在JS引擎执行的叫微任务，几个微任务构成1个宏任务，1个宏任务存在一个微任务列表，微任务列表执行遵照执行队列，一切JS都是微任务。
* 出JS引擎的叫宏任务：evaluateScript/callWithArgument，比如：script。 宿主提供的方法是宏任务，比如：UI交互/setTimeout/setTimeInternal。
* Promise：JS本身自带的API，属于微任务。
* JS单线程执行的，每条同步代码归为一个微任务。
* JS事件循环，在JS引擎之外，也不属于JS语言的一部分，而是JS实现方实现的一种方式。









