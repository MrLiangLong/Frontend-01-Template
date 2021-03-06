### 正则匹配Number字面量

正则表达式手册：[](https://tool.oschina.net/uploads/apidocs/jquery/regexp.html)

###### 二进制
```
/^[01]+$/
```

###### 八进制
```
/^[0-7]+$/
```

###### 十进制
```
/^0|[1-9]\d*$/
```

###### 十六进制
```
/^#?([a-f0-9]{6}|[a-f0-9]{3})$/
```

###### 整数
```
/^-?\\d+$/
```

###### 正整数
```
/^[0-9]*[1-9][0-9]*$/
```

###### 非负整数（正整数+0）
```
/^\\d+$/
```

###### 非正整数（负整数+0）
```
/((-\\d+)|(0+))$/
```

###### 负整数
```
/^-[0-9]*[1-9][0-9]*$/
```

###### 浮点数
```
/^(-?\\d+)(\\.\\d+)?$/
```

###### Number字面量
```
/(^-?\\d+$)|(^(-?\\d+)(\\.\\d+)?$)|(^[01]+$)|(^[0-7]+$)|((^0x[a-f0-9]{1,2}$)|(^0X[A-F0-9]{1,2}$)|(^[A-F0-9]{1,2}$)|(^[a-f0-9]{1,2}$))/
```


