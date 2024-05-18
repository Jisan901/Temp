/**
 * @typedef {import('../Object2D/index.js').BoundInfo} BoundInfo
 */
import {Object2D, BoundInfo, Object2DOptions} from '../Object2D/index.js';
import {Vector2} from '../Math/Vectors.js';
import {Scene} from '../Scene/index.js';
/**
 * @class Camera
 * @augments Object2D
 * @param {string} name - camera name
 * @param {Vector2} position - camera default position
 * @param {Scene} scene - camera default position
 * @property {Vector2} absolutePosition - absolute position of camera
 * @property {BoundInfo} projectionBound - private 
 * for more common properties see @see {Object2D}
 */
export class Camera extends Object2D {
    public projectionBound:BoundInfo;
    public absolutePosition:Vector2;
    constructor(name: string, position: Vector2, scene:Scene) {
        let options : Object2DOptions = {
            width: scene.engine.canvasWidth,
            height: scene.engine.canvasHeight,
            position: new Vector2(scene.engine.canvasWidth/2,scene.engine.canvasHeight/2)
        }
        super(name,options,scene)
        this.absolutePosition = position;
        this.projectionBound = {
            minX: this.absolutePosition.x - this.width*0.5,
            minY: this.absolutePosition.y - this.height*0.5,
            maxX: this.absolutePosition.x + this.width*0.5,
            maxY: this.absolutePosition.y + this.height*0.5
        }
        this.scene.camera = this;
    }
    /**
    * you can't set this camera position directly by camera.position
    * instead use camera.setPosition(vec)
    * @param {Vector2} vec
    */
    private _setPosition(vec: Vector2) {
        this.absolutePosition = vec;
        this.projectionBound = {
            minX: this.absolutePosition.x - this.width*0.5,
            minY: this.absolutePosition.y - this.height*0.5,
            maxX: this.absolutePosition.x + this.width*0.5,
            maxY: this.absolutePosition.y + this.height*0.5
        }
    }
    /**
    * get position
    */
    public get position() {
        return this.absolutePosition;
    }
    /**
    * set position
    */
    public set position(vec : Vector2) {
        this._setPosition(vec);
    }
    /**
    * is Inside Projection of camera
    * @param {Object2D} object - which to check
    * @return {boolean}
    */
    public isInsideProjection(object : Object2D): boolean {
        if (!object) {
            return false;
        }
        let ob = object.boundInfo;
        let cb = this.projectionBound;
        let isXin:boolean = (cb.minX<=ob.minX&&ob.minX<=cb.maxX)||(cb.minX<=ob.maxX&&ob.maxX<=cb.maxX);
        let isYin:boolean = (cb.minY<=ob.minY&&ob.minY<=cb.maxY)||(cb.minY<=ob.maxY&&ob.maxY<=cb.maxY);
        if (isYin&&isXin) {
            return true;
        }
        return false;
    }
}