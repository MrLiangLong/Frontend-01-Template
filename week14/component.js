import {createElement,Text,Wrapper} from './createElement.js'

class MyComponent {
    constructor(config){
        this.children = [];
    }

    setAttribute(name, value) { //attribute
        this.root.setAttribute(name, value);
    }

    appendChild(child){
        this.children.push(child);
    }

    render(){
        return <article>
            <header>I'm a header</header>
            {this.slot}
            <footer>I'm a footer</footer>
        </article>
    }

    mountTo(parent){
        this.slot = <div></div>
        for(let child of this.children){
            debugger;
            this.slot.appendChild(child)
        }
        this.render().mountTo(parent)
    }
}

let component = <MyComponent>
    <div>text text text</div>
</MyComponent>
    

component.mountTo(document.body);
