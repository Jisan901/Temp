import type {Scene} from "../Scene/index.js";
import {Object2D,Object2DOptions} from "../Object2D/index.js";
/**
 * @typedef {import('../Object2D/index.js').Object2DOptions} Object2DOptions
 */
/**
 * @typedef SpriteData
 * @prop {number} x
 * @prop {number} y
 * @prop {number} height
 * @prop {number} width
 * @prop {string} frameId
 */
export interface SpriteData {
    x:number,
    y:number,
    height : number,
    width:number,
    frameId :string
}
/**
 * @class Sprite
 * @param {string} name
 * @param {HTMLImageElement} image
 * @param {SpriteData} spriteData
 * @param {Object2DOptions} options
 * @param {Scene} scene
 * @property {HTMLImageElement} image - sprites image
 * @property {SpriteData} spriteData - data for Sprite
 * @property {number} frame - image frame
 * @property {number} frameRate - frameRate
 * @property {number} currentFrame - frameRate frame
 * @property {boolean} animate - is animated
 * @property {boolean} loopAnimation - animation looping depend on it 
 * 
 */
export class Sprite {
    public image : HTMLImageElement;
    public spriteData : SpriteData[];
    public groupHead:ObjectWithAnimationGroup;
    public frame : number;
    public currentFrame : number;
    public frameRate : number;
    public animate : boolean;
    public loopAnimation : boolean;
    public scene : Scene;
    constructor(name: string ,image : HTMLImageElement, spriteData: SpriteData[], groupHead: ObjectWithAnimationGroup, scene: Scene) {
        this.groupHead = groupHead;
        this.image = image;
        this.spriteData = spriteData;
        this.frame=0;
        this.frameRate = groupHead.frameRate;
        this.currentFrame=0;
        this.animate = true;
        this.loopAnimation = true;
        this.scene = scene;
        this.scene.sprites.push(this);
    }
    /**
    * reset
    */
    public reset() {
        this.frame = 0;
        this.currentFrame = 0;
    }
    /**
     * update currentFrame frame
     */
    public update(){
        if (this.animate) {
            if (this.currentFrame%this.frameRate===0) {
                this.frame<this.spriteData.length-1?this.frame++:
                this.loopAnimation?this.frame=0:null;
                this.currentFrame=0
            }
            this.currentFrame++
        }
    }
    /**
     * render
     */
    public render(){
        let ctx = this.scene.engine.ctx;
        if (!ctx) {
            throw new Error("ctx is possibly null");
            return;
        }
        let absPosition = this.groupHead.getAbsPosition(this.scene.camera?.projectionBound);
        
        ctx.drawImage(
            this.image,
            this.spriteData[this.frame].x,
            this.spriteData[this.frame].y,
            this.spriteData[this.frame].width,
            this.spriteData[this.frame].height,
            absPosition.x,
            absPosition.y,
            this.groupHead.width,
            this.groupHead.height
            );
        this.update();
    }
}



interface AnimData {
    name : string,
    data : string,
    file : string
}
interface FrameData {
    frame: {
        w:number,
        height:number,
        x:number,
        y:number
    }
};

export class ObjectWithAnimationGroup extends Object2D {
    public animData : AnimData[];
    private currentAnimation : string;
    private animations : {[key: string] : Sprite};
    private path:string;
    public frameRate: number;
    constructor(name : string, data:AnimData[], path: string, options:Object2DOptions, scene:Scene) {
        super(name ,options, scene)
        this.animData = data;
        this.currentAnimation = "";
        this.animations = {};
        this.path = path;
        this.frameRate = 3;
        //this._initiateData();
    }
    public async initiateData(){
        this.animData.forEach(async (item: AnimData)=>{
            const res = await fetch(this.path+item.data);
            const {frames} = await res.json();
            let spData : SpriteData[] = this.mapFrames(frames);
            let image = new Image();
            image.src = this.path+item.file;
            this.animations[item.name] = new Sprite(item.name, image, spData, this, this.scene);
        });
        if (!this.currentAnimation) this.currentAnimation = this.animData[0].name;
    }
    
    private mapFrames(data: { [key: string]: { frame: { x: number; y: number; w: number; h: number } } }): SpriteData[] {
        let mapped: SpriteData[] = [];
        for (let key in data) {
            const frameData = data[key].frame;
            mapped.push({
                frameId: key,
                width: frameData.w,
                height: frameData.h,
                x: frameData.x,
                y: frameData.y
            });
        }
        return mapped;
    }
    
    
    /**
    * dispatch
    */
    public dispatch(animationName: string, loop : boolean = true, animate:boolean = true): boolean {
        if (animationName === this.currentAnimation) {
            return false
        }
        if (animationName in this.animations) {
            this.currentAnimation = animationName;
            this.animations[this.currentAnimation].loopAnimation = loop;
            this.animations[this.currentAnimation].animate = animate;
            this.animations[this.currentAnimation].reset();
            return true;
        }
        return false;
    }
    
    
    public render(){
        this.animations[this.currentAnimation]?.render();
    }
}

/**
 * examples 
 * 
 */

[
    {
        name:"Attack",
        data:"Attack.json",
        file:"Attack.png"
    },
    {
        name:"Dead",
        data:"Dead.json",
        file:"Dead.png",
    },
    {
        name:"Idle",
        data:"Idle.json",
        file:"Idle.png"
    },
    {
        name:"Jump",
        data:"Jump.json",
        file:"Jump.png"
    },
    {
        name:"JumpAtk",
        data:"JumpAtk.json",
        file:"JumpAttk.png"
    },
    {
        name:"Jump_tr",
        data:"Jump_tr.json",
        file:"Jump_tr.png"
    },
    {
        name:"Run",
        data:"Run.json",
        file:"Run.png"
    },
    {
        name:"Slide",
        data:"Slide.json",
        file:"Slide.png"
    },
    {
        name:"Throw",
        data:"Throw.json",
        file:"Throw.png"
    }
]