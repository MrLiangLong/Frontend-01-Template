# 每周总结可以写在这里

### nimation

@keyframes   
定义：关键帧    
```
@keyframes mykf{
    from{background:red}
    to{background:yellow}
}

div{
    animation:mykf 5s infinite;
}

```

animation-name 时间曲线  
animation-duration 动画的时长  
animation-timing-function 动画的时间曲线  
animation-delay 动画开始前的延迟  
animation-iteration-count 动画的播放次数  
animation-direaction 动画的方向  


@keyframes mykf{
    0%{top:0;transition:top ease}
    50%{top:30px;transition:top ease}
    75%{top:60px;transition:top ease}
    100%{top:0;transition:top ease}
}


### Transition
transition-property 要变换的属性
transition-duration 变换的时长
transition-timing-function 时间曲线
transition-delay 延迟


timing-function
X轴：时间
Y轴：变换比

 遵循3次cubic-bezier曲线去定义



 





















