##前端技术总结

	本周课程最大收获在于梳理了知识体系、以及更明白职业发展方向和规划、学习了方法论。
	
	翻看Web Api时，重温了以前使用过的，比如DOM相关的MutationObserver/UIEvent/Ranges/Node等等，在开发富文本编辑器、样式采集工具等时候使用到。
	
	###DOM API相关
	
	######MutationObserver用法
	
	```
	//定义监听器
	let selectObserver = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if(mutation.type == 'childList') {
				//监听到此类发生变化
			}
		})
	});
	
	const appMsgNode = document.getElementById("#id")
	//监听对象
	selectObserver.observe(appMsgNode, {
		childList: true,
		subtree: true
	});
	```
	
	######UIEvent用法
	```
		const $edit = $("#editor")
		let eventObj = document.createEvent("UIEvent");
		eventObj.initUIEvent("past",true,true,window,1);
		$edit.dispatchEvent(eventObj);
	```
	
	###BOM相关API复习
	
	#####IndexDB浏览器数据库
	开发chrome浏览器插件时，因为插件跟客户端类似，版本升级要重新安装插件，存在紧急重大bug时，总不能一天发布多个插件版本，而且版本审核需要时间。基于这个需求，我们提出了方案：基于IndexDB数据库，插件实现热更新。 流程如下：
	1、前端修复问题后，执行npm run hotfix，会打出对应的修复文件包
	2、执行npm run deploy会将修复文件包发布到服务器
	3、插件运行，请求服务，判断是否存在热更新，存在则下载对应的js文件内容，并存储在IndexDB。
	4、页面请求IndexDB，获取对应模块文件，通过eval(热更新代码)，执行，完成修复。
	注：此流程是我们基于webpack自行开发的工作流。
		热修复完成，其实是服务端派发个object字符串在浏览器eval后，替换当前插件的object，并执行Init。
	
	以下是封装的IndexDB数据库用法,趁着重温前端，也覆盖上。

	附上webDB.js对indexDB的封装方法。
	
	
	未完待续...
	
	
	
	
	
	
	
	
	
	
	