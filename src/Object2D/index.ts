import {Vector2} from '../Math/Vectors.js';
import {Scene} from '../Scene/index.js';
/**
 * @typedef BoundInfo
 * @prop {number} minX
 * @prop {number} minY
 * @prop {number} maxX
 * @prop {number} maxY
 */
export interface BoundInfo {
    minX :number,
    minY: number,
    maxX: number,
    maxY: number
}
/**
 * @typedef Object2DOptions
 * @prop {number} width
 * @prop {number} height
 * @prop {Vector2|Vector3} position
 */
export interface Object2DOptions {
    width: number,
    height: number,
    position: Vector2
}
/**
 * @typedef ObjectData
 * @prop {string} fillColor?
 * @prop {string} strokeColor?
 * @prop {number} strokeWidth?
 * @prop {boolean} fill?
 */
export interface ObjectData {
    fillColor?: string,
    strokeColor?: string,
    strokeWidth?: number,
    fill?:boolean,
    stroke?:boolean
}
/**
 * @class Object2D
 * for basic object position and bound Info
 * @param {string} name - object name. 
 * @param {Object2DOptions} options - options for basic object such as positions boundInfo
 * @param {Scene} scene - targeted scene
 * @property {string} name - object name. 
 * @property {Object2DOptions} options - options for basic object such as positions boundInfo
 * @property {Scene} scene - targeted scene
 * @property {string} id - unique identifier readonly
 * @property {number} width - width for object
 * @property {number} height - height for object
 * @property {Vector3|Vector2} position - options.position
 * @property {BoundInfo} boundInfo - minimum xy and maximum xy. readonly ,depending on height and width.
 * @property {ObjectData} data - such as fill color, stroke width
 */
export class Object2D {
    public name : string;
    readonly id : string;
    readonly options : Object2DOptions;
    public width : number;
    public height : number;
    private _position : Vector2;
    public boundInfo : BoundInfo;
    public scene : Scene;
    public data : ObjectData;
    constructor(name: string, options : Object2DOptions, scene: Scene) {
        this.name = name;
        this.id = crypto?crypto.randomUUID():Date.now().toString();
        this.options = options || {};
        this.width = this.options.width || 10;
        this.height = this.options.height || 10;
        this._position = this.options.position || new Vector2(0);
        this.scene = scene;
        // setting boundInfo based on height width
        this.boundInfo = {
            minX: this._position.x - this.width*0.5,
            minY: this._position.y - this.height*0.5,
            maxX: this._position.x + this.width*0.5,
            maxY: this._position.y + this.height*0.5,
        };
        // adding to scene
        this.scene.objects.push(this);
        this.data = {}
    }
    /**
    * position
    */
    public get position() {
        return this._position;
    }
    /**
    * position
    */
    public set position(vec : Vector2) {
        this._position = vec;
        this.boundInfo = {
            minX: this._position.x - this.width*0.5,
            minY: this._position.y - this.height*0.5,
            maxX: this._position.x + this.width*0.5,
            maxY: this._position.y + this.height*0.5,
        };
    }
    /**
    * updateBoundInfo
    */
    public updateBoundInfo() {
        this.boundInfo = {
            minX: this._position.x - this.width*0.5,
            minY: this._position.y - this.height*0.5,
            maxX: this._position.x + this.width*0.5,
            maxY: this._position.y + this.height*0.5,
        };
    }
    /**
    * return the absolute value for 2d canvas
    * @param {BoundInfo} cb - projection bound
    * @return {Vector2}
    */
    public getAbsPosition(cb : BoundInfo|undefined ): Vector2 {
        if (!cb) {
            return new Vector2(0,0);
        }
        let ob = this.boundInfo;
        let x = (ob.minX - cb.minX);
        let y = (ob.minY - cb.minY);
        return new Vector2(x , y);
    }
    /**
    * render
    */
    public render() {
        
    }
}
export * from './shapes.js';