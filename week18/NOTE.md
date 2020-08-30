# 单元测试

mocha  
npm install mocha --save-dev   
pageage.json配置
{
    "scripts":{
        "test":"mocha"
    }
}
创建test文件夹，并在此文件夹写单元测试代码，执行npm run test会自动执行test目录下的测试用例。若未创建test文件夹或者test文件，则会报Error: No test files found: "test"


单元测试代码支持es模块import,需要升级node为最新版,并且pageage.json配置
```
{
    "type":"module"
}
```

```
"devDependencies": {
    "@babel/core": "^7.11.1",
    "@babel/preset-env": "^7.11.0",
    "@istanbuljs/nyc-config-babel": "^3.0.0",
    "babel-loader": "^8.1.0",
    "babel-plugin-istanbul": "^6.0.0",
    "mocha": "^8.1.1",
    "nyc": "^15.1.0",
    "webpack": "^4.44.1"
  },
  "scripts": {
    "test": "mocha",
    "coverage": "nyc mocha"
  }
```

ava  
```
 "ava": {
    "files": [
      "test/*.js"
    ],
    "require": [
      "@babel/register"
    ],
    "babel": {
      "testOptions": {
        "babelrc": true
      }
    }
  }
```
nyc  