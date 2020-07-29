
//let element = document.body//document.getElementById("app");
//enableGesture(element);
function enableGesture(element) {

    let contexts = Object.create(null);
    let MOUSE_SYMBOL = Symbol("mouse");

    if (document.ontouchstart !== null) {
        element.addEventListener('mousedown', event => {
            contexts[MOUSE_SYMBOL] = Object.create(null);
            start(event, contexts[MOUSE_SYMBOL]);
            let mousemove = event => {
                move(event, contexts[MOUSE_SYMBOL])
            }

            let mouseend = event => {
                end(event, contexts[MOUSE_SYMBOL]);
                document.removeEventListener('mousemove', mousemove);
                document.removeEventListener('mouseup', mouseend)
            }

            document.addEventListener('mousemove', mousemove);
            document.addEventListener('mouseup', mouseend)
        })
    }


    //event.identifier 用于区分于哪个手势
    element.addEventListener('touchstart', event => {
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier])
        }
    })

    element.addEventListener('touchmove', event => {
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            move(touch, contexts[touch.identifier])
        }
    })

    element.addEventListener('touchend', event => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    })

    element.addEventListener('touchcancel', event => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    })

    /*
    *tap 点击
    *pan-start/move/end  轻滑
    *flick 快速滑
    *press-start/end  长按
    */
    let start = (point, context) => {
        element.dispatchEvent(Object.assign(new CustomEvent('start'),{
            startX:point.clientX,
            startY:point.clientY,
            clientX:point.clientX,
            clientY:point.clientY
        }));
        context.startX = point.clientX;
        context.startY = point.clientY;
        context.moves = [];
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.timeoutHandler = setTimeout(() => {
            if (context.isPan)
                return;

            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
            console.log('press start')
            element.dispatchEvent(Object.assign(new CustomEvent('pressstart'),{}));
        }, 500)
    }

    let move = (point, context) => {

        let dx = point.clientX - context.startX,
            dy = point.clientY - context.startY;

        if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            console.log('pan start')
            element.dispatchEvent(Object.assign(new CustomEvent('panstart'),{
                startX:context.startX,
                startY:context.startY,
                clientX:point.clientX,
                clientY:point.clientY
            }));
        }

        if (context.isPan) {
            console.log('pan')
            context.moves.push({
                dx,
                dy,
                t: Date.now()
            });
            //算300ms内的
            context.moves = context.moves.filter(record => Date.now() - record.t < 300)
            const customEvent = Object.assign(new CustomEvent('pan'),{
                startX:context.startX,
                startY:context.startY,
                clientX:point.clientX,
                clientY:point.clientY
            })
            element.dispatchEvent(customEvent);
        }
    }

    let end = (point, context) => {
        if (context.isPan) {
            let dx = point.clientX - context.startX,
                dy = point.clientY - context.startY;

            let record = context.moves[0];
            let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);
            console.log('speed', speed)

            //速度可以调
            let isFrick = speed>0.5
            if (speed > 0.5) {
                console.log('flick')
                element.dispatchEvent(new CustomEvent('flick',{
                    startX:context.startX,
                    startY:context.startY,
                    clientX:point.clientX,
                    clientY:point.clientY,
                    speed:speed
                }));
            }
            console.log('panend')
            element.dispatchEvent(Object.assign(new CustomEvent('panend') ,{
                startX:context.startX,
                startY:context.startY,
                clientX:point.clientX,
                clientY:point.clientY,
                speed:speed,
                isFlick:isFrick
            }));
        }

        if (context.isTap){
            console.log('tap end')
            element.dispatchEvent(Object.assign(new CustomEvent('tap'),{}));
        }
            
        if (context.isPress){
            console.log('press end')
            element.dispatchEvent(Object.assign(new CustomEvent('pressend'),{}));
        }
            

        clearTimeout(context.timeoutHandler);
    }

    let cancel = (point, context) => {
        console.log('cancel')
        element.dispatchEvent(Object.assign(new CustomEvent('canceled'),{}));
        clearTimeout(context.timeoutHandler);
    }


}
