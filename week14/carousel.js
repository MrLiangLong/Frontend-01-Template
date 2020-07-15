import {createElement,Text,Wrapper} from './createElement.js'

class Carouse {
    constructor(config) {
        this.attributes = new Map();
        this.properties = new Map();
        this.children = [];
    }

    setAttribute(name, value) { //attribute
       this[name] = value;
    }

    appendChild(child) {
        this.children.push(child);
    }

    render() {
        let children = this.data.map(url => {
            let element = <img src={url} />
            element.addEventListener("dragstart", event => event.preventDefault());
            return element
        })

        let root = <div class="carousel">{children}</div>
        
        let position = 0;
        let nextPic = () => {
            console.log("nextPic")
            let nextPostion = (position + 1) % this.data.length;

            let current = children[position];
            let next = children[nextPostion];

            current.style.transition = "ease 0s";
            next.style.transition = "ease 0s";

            current.style.transform = `translateX(${-100 * position}%)`;
            next.style.transform = `translateX(${100 - 100 * nextPostion}%)`;

            setTimeout(() => {
                current.style.transition = "ease 0.5s";
                next.style.transition = "ease 0.5s";
                current.style.transform = `translateX(${-100 - 100 * position}%)`;
                next.style.transform = `translateX(${-100 * nextPostion}%)`;

                position = nextPostion;
            }, 16);//16m一帧  两段动画，一段动画在下一帧执行
          //  setTimeout(nextPic, 3000)
        }
        nextPic();

        return root;
    }

    mountTo(parent) {
        const re = this.render();
        console.log(re)
        re.mountTo(parent)
        let position = 0;
        re.addEventListener('mousedown', (e) => {
          console.log(e.path[1].childNodes)
          let startX = e.clientX;
    
          let nextPosition = (position + 1) % this.data.length;
          let lastPosition = (position - 1 + this.data.length) % this.data.length;
    
          let current = e.path[1].childNodes[position];
          let next = e.path[1].childNodes[nextPosition];
          let last = e.path[1].childNodes[lastPosition];
    
          current.style.transition = 'ease 0s';
          next.style.transition = 'ease 0s';
          last.style.transition = 'ease 0s';
    
    
          current.style.transform = `translateX(${-500 * position}px)`
          next.style.transform = `translateX(${-500 -500 * nextPosition}px)`
          last.style.transform = `translateX(${500 -500 * lastPosition}px)`
          
          let move = (e) => {
            current.style.transform = `translateX(${e.clientX - startX -500 * position}px)`
            next.style.transform = `translateX(${e.clientX - startX - 500 -500 * nextPosition}px)`
            last.style.transform = `translateX(${e.clientX - startX + 500 -500 * lastPosition}px)`
          };
          let up = (e) => {
            let offset = 0;
            if (e.clientX - startX > 250) {
              offset = 1;
            } else if (e.clientX - startX < -250) {
              offset = -1;
            }
    
            current.style.transition = 'ease 0s';
            next.style.transition = 'ease 0s';
            last.style.transition = 'ease 0s';
    
            current.style.transform = `translateX(${offset * 500 -500 * position}px)`
            next.style.transform = `translateX(${offset * 500 - 500 -500 * nextPosition}px)`
            last.style.transform = `translateX(${offset * 500 + 500 -500 * lastPosition}px)`
    
            position = (position + offset + this.data.length) % this.data.length;
    
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', up)
          }
          document.addEventListener('mousemove', move)
          document.addEventListener('mouseup', up)
        })
    }
}


let component = <Carouse data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}>
</Carouse>

console.log('component-',component)

component.mountTo(document.body);
