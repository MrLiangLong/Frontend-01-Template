### JavaScript中的对象

#### 特殊行为的对象
```
	1、Array：
	Array的length属性根据最大的下标自动发生变化。
	2、Object.prototype
	作为所有正常对象的默认原型，不能再给它设置原型。
	3、String
	为了支持下标运算，String的正整数属性访问会去字符串里查找。
	4、Arguments
	arguments的非负整数型下标属性跟对应的变量联动。
	5、模块的namespace对象
	特殊的地方非常多，跟一般对象完全不一样，尽量只用于import。
```
	
#### 宿主对象
	由JavaScript宿主环境提供的对象，它们的行为完全由宿主环境决定，常见浏览器的window。
```
	document
	navigator
	origin
	captureEvents
	screen
	location
	history
	indexedDB
	caches
	fetch
	......
```
	
#### 内置对象

	由JavaScript语言提供的对象
	
##### 固有对象
	由标准决定，随着JavaScript运行时创建而自动创建的对象实例。
```
	1、三个值
	Infinity、NaN、undefined
	2、九个函数
	eval
	isFinite
	isNaN
	parseFloat
	parseInt
	decodeURI
	decodeURIComponent
	encodeURI
	encodeURIComponent
	3、四个用于当作命名空间的对象
	Atomics
	JSON
	Math
	Reflect
	4、一些构造函数
	Array、Date、RegExp....
```
##### 原生对象
	能够通过语言本身的构造器创建的对象。
```
	1、基础类型
	Boolean/String/Number/Symbol/Object
	2、基础功能和数据结构
	Array/Date/RegExp/Promise/Proxy/Map/WeakMap/Set/WeakSet/Function
	3、错误类型
	Error/EvalError/RangeError/ReferenceError/SyntaxError/TypeError/URIError
	4、二进制操作
	ArrayBuffer/ShareArrayBuffer/DataView
	5、带类型的数组
	Float32Array/Float64Array
	Int8Array/Int16Array/Int32Array
	Uint8Array/Unit16Array/Unit32Array
	Unit8ClampedArray
```
##### 普通对象
	由{}、Object构建器或者class关键字定义类创建的对象，它能够被原型继承。




