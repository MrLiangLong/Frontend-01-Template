# 结构化程序设计

js执行粒度：
```
JS Context =>Realm
宏任务
微任务(Promise)
函数调用(Execution Context)
语句/声明
表达式
直接量/变量/this
```
#### 知识扩展

##### Function学习
1、在JavaScript里，函数是一种特殊的对象，可以用于赋值、传参和作为返回值，也称函数为一等公民(Fist Class Function)。  
2、函数在V8内部的实现：
```
Function
	key --> value
	key1-->value
	
	//隐藏属性
	name-->函数名 || anonymous
	code-->函数代码
```
3、函数是特殊的对象，在于函数可以被调用，调用时还需要关联相关的执行上下文。

##### 应用
```
netstat -a -n #各个端口占用
netstat -ano #各个端口占用和进程PID
netstat -aon | findstr "8088"
tasklist | findstr "8088" 查看端口号所对应的应用程序
```


##### 课堂笔记
1、JS Context=>Realm
	可比喻成国度，里面会创建一套完整的JS对象
		JS对象：
			NaN/undefined/Number/Set/Math...详情参考重新前端
	多个Realm可以相互通信，比如iframe

2、函数调用
	Execution Context Stack：执行上下文栈
	栈顶名字：Running Execution Context 
	
	Execution Context：
		code evaluation state
		Funtion
		Script or Module
		Generator
		Realm
		LexicaEnvironment：词法环境
		VariableEnvironment：变量环境
		
	LexicaEnvironment：词法环境
		this
		new.target
		super
		变量
	VariableEnvironment：
		历史遗留包袱，仅用于处理var声明
		
	Environment Records：
		Declarative Environment Records:
			Function Environment Records
			Module Environment Records
		Global Environment Records
		Object Environment Records
		
3、Function - Closure
		
		
		
		
		
		
		
		
		
		