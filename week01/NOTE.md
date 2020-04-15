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
	```
	import isString from 'lodash/isString'

/**
 * @param dbName 数据库名称
 * @param version 数据库版本 不传默认为1
 * @param primary 数据库表主键
 * @param indexList Array 数据库表的字段以及字段的配置,每项为Object，结构为{ name, keyPath, options }
 */
class WebDB {
  constructor({dbName, version, primary, indexList}) {
    this.db = null
    this.objectStore = null
    this.request = null
    this.primary = primary
    this.indexList = indexList
    this.version = version
    this.intVersion = parseInt(version.replace(/\./g, ''))
    this.dbName = dbName
    try {
      this.open(dbName, this.intVersion)
    } catch (e) {
      throw e
    }
  }

  open (dbName, version) {
    const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    if (!indexedDB) {
      console.error('你的浏览器不支持IndexedDB')
    }
    this.request = indexedDB.open(dbName, version)
    this.request.onsuccess = this.openSuccess.bind(this)
    this.request.onerror = this.openError.bind(this)
    this.request.onupgradeneeded = this.onupgradeneeded.bind(this)
  }

  onupgradeneeded (event) {
    console.log('onupgradeneeded success!')
    this.db = event.target.result
    const names = this.db.objectStoreNames
    if (names.length) {
      for (let i = 0; i< names.length; i++) {
        if (this.compareVersion(this.version, names[i]) !== 0) {
          this.db.deleteObjectStore(names[i])
        }
      }
    }
    if (!names.contains(this.version)) {
      this.objectStore = this.db.createObjectStore(this.version, { keyPath: this.primary })
      this.indexList.forEach(index => {
        const { name, keyPath, options } = index
        this.objectStore.createIndex(name, keyPath, options)
      })
    }
  }

  openSuccess (event) {
    console.log('openSuccess success!')
    this.db = event.target.result
  }

  openError (event) {
    console.error('数据库打开报错', event)
    // 重新链接数据库
    if (event.type === 'error' && event.target.error.name === 'VersionError') {
      indexedDB.deleteDatabase(this.dbName);
      this.open(this.dbName, this.intVersion)
    }
  }

  compareVersion (v1, v2) {
    if (!v1 || !v2 || !isString(v1) || !isString(v2)) {
      throw '版本参数错误'
    }
    const v1Arr = v1.split('.')
    const v2Arr = v2.split('.')
    if (v1 === v2) {
      return 0
    }
    if (v1Arr.length === v2Arr.length) {
      for (let i = 0; i< v1Arr.length; i++) {
        if (+v1Arr[i] > +v2Arr[i]) {
          return 1
        } else if (+v1Arr[i] === +v2Arr[i]) {
          continue
        } else {
          return -1
        }
      }
    }
    throw '版本参数错误'
  }

  /**
   * 添加记录
   * @param record 结构与indexList 定下的index字段相呼应
   * @return Promise
   */
  add (record) {
    if (!record.key) throw '需要添加的key为必传字段!'
    return new Promise((resolve, reject) => {
      let request
      try {
        request = this.db.transaction([this.version], 'readwrite').objectStore(this.version).add(record)
        request.onsuccess = function (event) {
          resolve(event)
        }

        request.onerror = function (event) {
          console.error(`${record.key},数据写入失败`)
          reject(event)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * 读取记录
   * @param key 主键的值
   * @return Promise
   */
  get (key) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let request
        try {
          request = this.db.transaction([this.version]).objectStore(this.version).get(key)
          request.onerror = function (event) {
            console.error(`${key}, 数据读取失败!`)
            reject(event)
          }

          request.onsuccess = function (event) {
            if (request.result) {
              resolve(request.result)
            } else {
              reject(event)
            }
          }
        } catch (e) {
          reject(e)
        }
      }, 200)
    })
  }

  /**
   * 更新记录
   * @param record 结构与indexList 定下的index字段相呼应
   * @return Promise
   */
  update (record) {
    return new Promise((resolve, reject) => {
      // const request = this.db.transaction([this.version], 'readwrite').objectStore(this.version).put(record)
      let request
      try {
        request = this.db.transaction([this.version], 'readwrite').objectStore(this.version).put(record)
        request.onsuccess = function (event) {
          resolve(event)
        };

        request.onerror = function (event) {
          console.error(`${record.key},数据更新失败`)
          reject(event)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * 删除记录
   * @param key 主键的值
   * @return Promise
   */
  remove (key) {
    return new Promise((resolve, reject) => {
      const request = this.db.transaction([this.version], 'readwrite').objectStore(this.version).delete(key);

      request.onsuccess = function (event) {
        resolve(event)
      }
      request.onerror = function (event) {
        console.error(`${key}, 数据删除失败`)
        reject(event)
      }
    })
  }
}

export default WebDB

	
	```
	
	
	未完待续...
	
	
	
	
	
	
	
	
	
	
	