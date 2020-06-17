### nginx是什么
性能上，占用很少系统资源，支持更多并发连接。  
功能上，优秀的代理服务器和负载均衡服务器。  
安装配置上，简单灵活，支持热部署，启动速度快。  
微服务上，可被作为网关使用，配合Lua做限流、熔断等控制。  

nginx不能直接处理php、java，大多数当做一个静态文件服务器和http请求转发器，
把静态文件的请求直接返回静态文件资源，把动态文件的请求转发给后台的处理程序。  


```
nginx命令行：
nginx -c </path/to/config>  为nginx指定一个配置文件，来代替缺省的。
nginx -t 仅用于测试配置文件是否正确可运行
```

问题：Nginx使用什么算法来实现负载均衡？它能实现基于连接数的负载均衡吗？  
目前nginx使用简单的轮询算法，所以无法做基于链接计数的负载均衡。

惊群现象？  
一个网路连接到来，多个睡眠的进程被同时叫醒，但只有一个进程能获得链接，这样会影响系统性能。


#### nginx配置文件结构
```
    #user nobody
    ... #全局块
    events
    { 
        ... #events块
    }

    http
    {
        ... //http全局块
        server 
        {
            ... #server全局块

            location [PATTERN] 
            {
                ...  #location块
            }
        }
        server 
        {

        }
    }
```
1、全局块：配置影响nginx全局的指令。一般有运行nginx服务器的用户组，nginx进程pid存放路径，日志存放路径，配置文件引入，允许生成worker process数等。  
2、events块：配置影响nginx服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。  
3、http块：可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。如文件引入，mime-type定义，日志自定义，是否使用sendfile传输文件，连接超时时间，单连接请求数等。  
4、server块：配置虚拟主机的相关参数，一个http中可以有多个server。
5、location块：配置请求的路由，以及各种页面的处理情况。  
