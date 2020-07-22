const { pathToFileURL } = require("url");
const path = require("path");
module.exports = {
    entry:'./SFC/main.js',
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                        plugins:[[
                            "@babel/plugin-transform-react-jsx",
                            {pragma:"createElement"}
                        ]]
                    }
                }
            },
            {
                test:/\.view/,
                use:{
                    loader:require.resolve("./SFC/myloader.js")
                }
            }
  
        ],        
    },
    mode:"development",
    optimization:{
        minimize:false
    }
}