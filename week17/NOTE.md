
#### 如何用闭包代替递归？
```
(g =>
  (f => f(f))(
    self =>
      g( (...args) => self(self).apply(this, args) )
  )
)(
  self => {
    return n => n > 0 ? self(n - 1) + n : 0
  }
)(100)
```

```
const y = g =>
      (f => f(f))(
        self =>
          g( (...arg) => self(self).apply(this, args) )
      )

let f = y(self => {
  return n => n > 0 ? self(n - 1) + n : 0
})

f(100);
```

### 工具链

使用 yeoman 可以构建一个套完整的对于包管理的工作链的过程，可以实现发布一个包的过程，可以管理文件，也能够生成对应的项目。 对于 yeoman 的使用情景，主要还是在对应的工程体系，需要在打的团队，有频繁构建新项目的需求，或者是搭建新的项目的情况，才会使用到。  

对于基础的命令行的控制，node本身就提供了这样的能力，使用 ttys，目前自己使用的 itrem2 的主题也是使用ttys来实现的。  
