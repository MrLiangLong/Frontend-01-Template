import cubicBezier from './cubicBezier'
export class Timeline {
    constructor() {
        this.animations = [];
        this.requestId = null;
        this.state = "inited";
    }
    tick() {
        let t = Date.now() - this.startTime;

        let animations = this.animations.filter(animation => !animation.finished)

        for (let animation of this.animations) {

            //   t = animation.during+animation.delay;
            let { object, property, template, start, end, timingFunction, delay, during, addTime } = animation;

            if(t<delay+addTime)
                continue;

            let progression = timingFunction((t - delay - addTime) / during);//0-1直接的数
            if (t > during + delay + addTime) {
                animation.finished = true;//动画结束
                progression = 1; //最后归位
            }
    
            let value = animation.valueFromProgressin(progression);
            object[property] = template(value) //template(animation.timingFunction(start,end)(t-delay));
        }

        //每一帧执行
        if (animations.length)
            this.requestId = requestAnimationFrame(() => this.tick())
    }
    pause() {
        if (this.state != "playing")
            return;
        this.state = "paused"
        this.pauseTime = Date.now();
        if (this.requestId !== null){
            cancelAnimationFrame(this.requestId);
            this.requestId = null;
        }      
    }
    resume() {
        if (this.state != "paused")
            return;
        this.state = "playing";
        this.startTime += (Date.now() - this.pauseTime);
        this.tick();
    }
    start() {
        if (this.state != "inited")
            return;
        this.state = "playing";
        this.startTime = Date.now();
        this.tick();
    }
    restart() {
        if (this.state == "playing")
            this.pause();
       
        for(let animation of this.finishedAnimations)
            this.animations.push(animation)    
            
        this.animation = [];
        this.requestId = null;
        this.startTime = Date.now();
        this.state = "playing";
        this.pauseTime = null;
        this.tick();
    }
    add(animation, addTime) {
        this.animations.push(animation);
        animation.finished = false;
        if (this.state == "playing")
            animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime;
        else
            animation.addTime = addTime !== void 0 ? addTime : 0;
    }


}

export class Animation {
    constructor(object, property, template, start, end, during, delay, timingFunction) {
        this.object = object;
        this.property = property;
        this.template = template;
        this.start = start;
        this.end = end;
        this.during = during;
        this.delay = delay || 0;
        this.timingFunction = timingFunction;
    }
    valueFromProgressin(progression){
        return this.start + progression*(this.end-this.start);
    }
}

export class ColorAnimation {
    constructor(object, property, template, start, end, during, delay, timingFunction) {
        this.object = object;
        this.property = property;
        this.template = template || ((v) => `rgba(${v.r},${v.g},${v.b},${v.a})`);
        this.start = start;
        this.end = end;
        this.during = during;
        this.delay = delay || 0;
        this.timingFunction = timingFunction;
        // this.timingFunction = timingFunction || ((start, end) => {
        //     return (t) => start + (t / during) * (end - start)
        // })
    }
    valueFromProgressin(progression) {
        return {
            r: this.start.r + progression * (this.end.r - this.start.r),
            g: this.start.g + progression * (this.end.g - this.start.g),
            b: this.start.b + progression * (this.end.b - this.start.b),
            a: this.start.a + progression * (this.end.a - this.start.a),
        }
    }
}

export let ease =  cubicBezier(0.25, .1, 0.25, 1);
export let linear = cubicBezier(0.25, .1, 0.25, 1);


