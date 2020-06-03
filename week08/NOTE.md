# 每周总结可以写在这里
## 选择器
#### 简单选择器
``` 
*
div svg|a :xml
.cls
#id
[attr=value]
:hover
::before
``` 

#### 复合选择器
<简单选择器><简单选择器><简单选择器>
*或者div必须写在最前面

#### 复杂选择器
<复合选择器><sp><复合选择器> : 子孙关系
<复合选择器>">"<复合选择器>  ：父子关系
<复合选择器>"~"<复合选择器>  ：兄弟
<复合选择器>"+"<复合选择器>  ：兄弟
<复合选择器>"||"<复合选择器> ： table里面去选中一列，但浏览器不实现

## 选择器优先级

下面列表中，选择器类型的优先级是递增的：

1、类型选择器（例如，h1）和伪元素（例如，::before）

2、类选择器 (例如，.example)，属性选择器（例如，[type="radio"]）和伪类（例如，:hover）

3、ID 选择器（例如，#example）。

通配选择符（universal selector）（*）关系选择符（combinators）（+, >, ~, ' ', ||）和 否定伪类（negation pseudo-class）（:not()）对优先级没有影响。（但是，在 :not() 内部声明的选择器会影响优先级）。

4、给元素添加的内联样式 (例如，style="font-weight:bold") 总会覆盖外部样式表的任何样式 ，因此可看作是具有最高的优先级。

5、!important例外，破坏了原有的级联规则。

详情参考文章：https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity

[行内，id，class，标签]
计算公式：S=N^3+2*N^2+1*N^1+1


## 伪类

#### 链接/行为
```
:any-link
:link :visited
:hover
:active
:focus
:target
```

#### 树结构
```
:empty
:nth-child()
:nth-last-child()
:first/last/only-child
```

#### 逻辑型
```
:not伪类
:where
:has
```

## 伪元素
```
:before
:after
:first-line
    没有float属性，因为会脱离文档流，与设计违背
:first-letter
```

### 标签
源代码  语义     表现   
标签    元素      盒   
Tag    Element   Box   

DOM树中存储的是元素和其他类型的节点(Node).   
Css选择器选中的是元素，在排版时可能产生多个盒。   
排版和渲染的基本单位是盒。   

盒模型：  
margin + border + padding + content  
box-sizing:border-box|content-box   

### 正常流
正常流排版：   
收集盒进行   
计算盒在行中的排布   
计算行的排布   

#### 行模型：
```

IFC:inline formatting contexts 排版从左到右边
Text--> Inline-block--> inline-box  
文字排版存在一条基线。
vertical-align:bottom|top|middle :
设置行模型文字排版的基线。
一行多个行模型，会根据最高的行模型来处理基线和作为其他行模型的展示设计的基准。  
1、Vertical-align: baseline，是拿自己的 baseline 去对其行的 baseline   
2、Vertical-align: top，middle，bottom，是拿自己的 ”顶部“ “中线” ”底部“ 去对其行的 ”顶部“ “中线””底部“   
3、vertical-align: text-top，text-bottom，是拿自己的 ”顶部“ ”底部“ 去对齐行的 text-top 和 text-bottom 线  

```

### BFC
```
BFC:block formatting contexts 排版纵向(从上到下)
line-box
    |
block-box
    |
block-box

仅BFC，存在边际折叠，显示最大的margin（留白）,top|bottom发生折叠。

overflow:hidden|display:inline-blcok:
 会将块设置成一个容器（BFC），内部的margin自己算，不会与外部折叠。

overflow:visible:不产生BFC，会存在边际折叠问题。

BFC的合并：正常流放置正常流才有可能发生合并。
```
flex inline-flex :内部非正常流，受flex约束，产生多个BFC
table inline-table
grid inline-grid
blcok inline-block ：blcok-level

Block-level：flex、table、grid、block
block container: block、inline-block
block box：block

block-level 表示可以被放入bfc
block-container 表示可以容纳bfc
block-box = block-level + block-container  
block-box 如果 overflow 是 visible， 那么就跟父bfc合并  

















