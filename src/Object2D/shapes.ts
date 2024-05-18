import {Object2D, Object2DOptions} from '../Object2D/index.js';
import {Vector2} from '../Math/Vectors.js';
import type {Scene} from '../Scene/index.js';
/**
 * @typedef CircleOption 
 * @prop { number } radius
 * @prop {number} startAngle
 * @prop {number} endAngle
 * @prop {Vector2} position
 */
type CircleOption = {
    radius:number,
    startAngle:number,
    endAngle:number,
    position:Vector2
}
/**
 * @typedef RectangleOption 
 * @prop {number} height
 * @prop {number} width
 * @prop {Vector2} position
 */
type RectangleOption = {
    width:number,
    height:number,
    position:Vector2
}
/**
 * @typedef LineOptions
 * @prop {Vector2} position
 * @prop {Vector2} target
 * @prop {number} lineWidth
 */
type LineOptions = {
    position:Vector2,
    target:Vector2,
    lineWidth: number
}
export class Shapes {
    /**
    * basic Circle
    * @param {string} name - Circle name
    * @param {CircleOption} options - radius:number,startAngle:number,endAngle:number,position:Vector2
    * @param {Scene} scene
    * @return {Object2D}
    */
    static Circle(name: string, options: CircleOption, scene: Scene) {
        let options2:Object2DOptions = {
            height:options.radius*2,
            width: options.radius*2,
            position: options.position
        }
        const circle = new Object2D(name, options2, scene);
        let ctx = circle.scene.engine.ctx;
        
        circle.render = ()=>{
            if (!ctx) {
                throw new Error("ctx is possibly null");
                return;
            }
            let absPosition = circle.getAbsPosition(circle.scene.camera?.projectionBound);
            ctx.beginPath()
            ctx.fillStyle =  circle.data?.fillColor||"#fff";
            ctx.strokeStyle = circle.data?.strokeColor||"#fff";
            ctx.lineWidth = circle.data?.strokeWidth||8;
            ctx.arc(absPosition.x+(options.radius),absPosition.y+(options.radius),options.radius,options.startAngle,options.endAngle);
            circle.data?.fill?
            ctx.fill():ctx.stroke();
            ctx.closePath();
        }
        return circle;
    }
    /**
     * basic Rectangle
     * @param {string} name - rect name
     * @param {RectangleOption} options - height width position
     * @param {Scene} scene
     * @return {Object2D}
     */
    static Rectangle(name: string, options:RectangleOption, scene:Scene){
        
        const rect = new Object2D(name, options, scene);
        let ctx = rect.scene.engine.ctx;
        
        rect.render = ()=>{
            if (!ctx) {
                throw new Error("ctx is possibly null");
                return;
            }
            let absPosition = rect.getAbsPosition(rect.scene.camera?.projectionBound);
            ctx.beginPath()
            ctx.fillStyle =  rect.data?.fillColor||"#fff";
            ctx.strokeStyle = rect.data?.strokeColor||"#fff";
            ctx.lineWidth = rect.data?.strokeWidth||8;
            ctx.rect(absPosition.x,absPosition.y,options.width,options.height);
            rect.data?.fill?
            ctx.fill():ctx.stroke();
            rect.data?.stroke?
            ctx.stroke():ctx.fill();
            ctx.closePath();
        }
        return rect;
    }

    /**
     * basic Line
     * @param {string} name - line name
     * @param {LineOptions} options -  position target
     * @param {Scene} scene
     * @return {Object2D}
     */
    static Line(name: string, options:LineOptions, scene:Scene){
        
        
        let options2 = {
            width:options.lineWidth,
            height:Math.abs(options.target.y - options.position.y),
            position: options.position
        }
        
        
        const line = new Object2D(name, options2, scene);
        let ctx = line.scene.engine.ctx;
        
        line.render = ()=>{
            if (!ctx) {
                throw new Error("ctx is possibly null");
                return;
            }
            let absPosition = line.getAbsPosition(line.scene.camera?.projectionBound);
            ctx.beginPath()
            ctx.fillStyle =  line.data?.fillColor||"#fff";
            ctx.strokeStyle = line.data?.strokeColor||"#fff";
            ctx.lineWidth = options.lineWidth;
            ctx.moveTo(absPosition.x,absPosition.y);
            ctx.lineTo(absPosition.x+Math.abs(options.target.x - options.position.x),absPosition.y+options2.height);
            line.data?.fill?
            ctx.fill():ctx.stroke();
            line.data?.stroke?
            ctx.stroke():ctx.fill();
            ctx.closePath();
            console.log('r1')
        }
        return line;
    }
}