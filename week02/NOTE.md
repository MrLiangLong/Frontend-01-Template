# 每周总结可以写在这里

	本周主要学习语言是怎样构成的，组成语法的粒子是啥，以及语言的编码，从语言的最底层去理解学习。
	
### BNF（巴科斯范式）：
	编程语言都有自己遵循的语法，一般是基于BNF规范来表示，它是一种形式化的表示方法，用来描述语法的一种形式体系，是一种典型的元语言。
	它一般是从符号开始，然后给出替换前面符号的规则,公式可为:<符号>::=<使用符号的表达式>
```
	//例子:
	<NUMBER>::=0|1|2|3|4|5|6|7|8|9
```
	它的基本组成成份有：
	<>:包含的为必选项
	[]:包含的为可选项
	{}:包含的为可重复0至无数次的项
	|:表示左右两边任选一项，OR的意思
	::=  :表示被定义为
	
	以下实现个for循环的例子：
```
	FOR_STATEMENT::=
		"for""(" (variable_decalation | (expression ";" | ";") )
			[expression] ";"
			[expression]
		")"  statement
```
	
	
	而JS输入元素的语法构成，可以分为WhiteSpace/LineTerminator/Common/Token

### INPUTELEMENT
INPUTELEMENT
	WhiteSpace  //空格
		TAB
		VT
		FF
		SP
		NBSP
		ZWNBSP
		USP
	LineTerminator  //换行符
		LINE FEED(LF)
		CARRIAGE RETURN(CR)
	Common
		单行注释
		多行注释
	Token
		//帮助程序形成结构
		Punctuator  符号(+/-等)  
		IdentifierName  标识符
			Keywords
			Identifier
			Future reserved Keywords:enum
		//帮助程序形成有效信息
		Literal     直接量（true/1...）
			Number
				2进制   0b 开头
				8进制   Oo 开头
				16进制  0x 开头
				Math(0.1+0.2-0.3)<Number.EPSILON（精确度）
				Number.MAX_SAFE_INTEGER  最大的安全整数
			String
				Character
				Code Point
				Encoding
				字符编码:
					ASCII
					Unicode
					UCS: U+0000-U+FFFF
					GB(国标): ASCII+中文字符
						GB2312
						GBK(GB13000)
						GB19030
					ISO-8895(欧洲)
					BIG5(台湾-繁体中文)
					UTF
					科普：为啥有\r,\n两个换行符 这是两个动作兼容打印机，
	//	Keywords  关键字(for/let...) undefined未设计成关键字，全局下不可改，局部可以
	
### Unicode
	
	计算机解析文字和符号流程：
	涉及字符编码，字符编码强行将每一个字符对应一个十进制数字，再将十进制数字转换成计算机能理解的二进制，而计算机读到这些0和1之后就会显示出对应的文字或符号。
	
	1、初衷：
	将全世界所有的字符都包含在一个集合里，计算机只要支持这一个字符集，就能显示所有的字符，再也不会乱码。
	
	2、码点(code point)
	计算机里的字符都对应一个“码点”(code point)。比如，码点0的符号就是null(表示所有二进制位都是0).
```
	 U+0000 = null   //U+表示紧跟在后面的十六进制数是Unicode的码点
```
	
	3、unicode编号规格
		a、从0开始编号u+0000 = null
		b、最新7.0版
		c、共计109449个符号，其中CJK字符(中日韩字符集)占比68%
		d、2^16（65536）个号码组成一个平面（plane）
		e、目前共17个平面，整个空间大小：2^21
		f、1个基本平面（BMP）：U+0000~U+FFFF
		g、16个辅助平面（SMP）：U+010000~U+10FFFF
		
		unicode并非一次性定义，而是分区定义。每个区可存放2^16字符，成为一个平面（plane），目前共有17个平面。
		最前面的2^16个字符位，成为基本平面(BMP)，码点范围0~（2^16-1），16进制就是U+0000~U+FFFF。
		最常见的字符都放在这个平面，是unicode最先定义和公布的一个平面。
	
	4、UTF-8
		unicode只规定了每个字符的码点，到底用什么样的字符序表示这个码点，就涉及到编码方法。
		
		最直观的编码方法是，每个码点使用四个字节表示，字节内容一一对应码点。这种编码方法叫UTF-32。
		a、4个字节表示1个字符
		b、完全对应unicode编码
		c、比如字母a为0x00000061
		d、查找效率低，时间复杂度o(1)
		e、浪费空间，比相同的ASCII编码文件大4倍
		d、不使用此编码UTF-32
		
		UTF-8是一种变长的编码，字符长度从1个字节到4个字节不等。越是常用的字符，字节越短，最前面的128个字符，
		只使用1个字节表示，与ASCII码完全相同。
		编号范围            字节
		0x0000~0x007F       1
		0x0080~0x07FF  		2
		0x0800~0xFFFF       3
		0x010000~0x10FFFF   4
		
		UTF-16编码规则
		a、unicode编号0xD800~0xDFFF为空段
		b、编号大于0XFFFF的字符
			一半映射在0xD800~oxDBFF（空间大小2^10）
			一半映射在0xDC00~0xDFFF（空间大小2^10）
		所以，当我们遇到两个字节，发现它的码点在U+D800到U+DBFF之间，就可以断定，紧跟在后面的两个字节的码点，应该在U+DC00到U+DFFF之间，这四个字节必须放在一起解读。
		
		可以用中文做变量名，但不建议超出ASCII外的字符，涉及字符编译问题。
	
	5、ES6增强了Unicode的支持
		a、正确识别字符，可以自动识别4个字节的码点
```
	for(let s of string){}
```
		但是，为了保持兼容，length属性还是使用原来的行为方式。得到正确字符串长度，使用
```
	Array.from(string).length
```
		b、码点表示法
			js允许直接用码点表示Unicode，写法是“反斜杠+u+mad”
```
	'好'=== '\u587D' //true   此法对4字节的码点无效
	
	'4字节码点'==='\u{1D306}' // 识别4字符码点
```
		
		c、字符串处理函数
```
	String.fromCodePoint() //从Unicode码点返回对应字符
	String.prototype.codePointAt() //从字符返回对应的码点
	String.prototype.at()  //返回字符串给定位置的字符
```
		d、正则表达式
			es6提供了u修复符，对正则表达式添加4字符码点的支持。
```
	/^.$/u.test('')
```
		e、Unicode正规化
			有些字符除了字母以外，还有附加符号。比如，汉语拼音的Ǒ，字母上面的声调就是附加符号。
			
			Unicode提供了两种表示方法。一种是带附加符号的单个字符，即一个码点表示一个字符，比如Ǒ的码点是U+01D1；另一种是将附加符号单独作为一个码点，与主体字符复合显示，即两个码点表示一个字符，比如Ǒ可以写成O（U+004F） + ˇ（U+030C）。
	
			ES6提供了normalize方法，允许"Unicode正规化"，即将两种方法转为同样的序列

```
<script>
for(let i=0;i<128;i++){
	//打印出编码对应的字符
   console.log(String.fromCharCode(i));
   "厉害".codePointAt(0).toString(16); //获取字符对应的编码 一个中文对应2个字节
}
</script>
```








