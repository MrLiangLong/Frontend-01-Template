const parser = require('./parser(2).js')


module.exports= function(source){
    console.log("this.resourcePath",this.resourcePath)
    console.log(parser.parseHTML(source))

    const data = this.resourcePath.split('\\');
    const className = data[data.length - 1].replace('.view', '')
    console.log('className',className)

    let tree = parser.parseHTML(source);

    let template = null;
    let script = null;

    for(let node of tree.children){
        if(node.tagName == "template")
            template = node.children.filter(e=>e.type!="text")[0];
        if(node.tagName==="script")
            script = node.children[0].content;
    }

    let visit = (node)=>{
        if(node.type==="text"){
            return JSON.stringify(node.content)
        }
        let attrs = {};
        for(let attr of node.attributes){
            if(!['type','tagname','isSelfClosing'].includes(attr.name)){
                attrs[attr.name] = attr.value;
            }
        }
        let children = node.children.map(node=>visit(node));
        return `createElement("${node.tagName}",${JSON.stringify(attrs)},${children})`
    }

    const r = `
        import {createElement,Wrapper,Text} from './createElement.js'
        export class ${className}{
            constructor(){
                this.children = [];
                this.root = document.createElement('div');
            }
            setAttribute(name,val){
                this.root.setAttribute(name,val)
            }
            mountTo(parent){
                this.render().mountTo(parent);
            }
            render(){
                return ${visit(template)}
            }
        }
    `
    console.log(r)
    return r;
}