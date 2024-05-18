import { Vector2 } from '../Math/Vectors.js';
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
    constructor(name, options, scene) {
        this.name = name;
        this.id = crypto ? crypto.randomUUID() : Date.now().toString();
        this.options = options || {};
        this.width = this.options.width || 10;
        this.height = this.options.height || 10;
        this._position = this.options.position || new Vector2(0);
        this.scene = scene;
        // setting boundInfo based on height width
        this.boundInfo = {
            minX: this._position.x - this.width * 0.5,
            minY: this._position.y - this.height * 0.5,
            maxX: this._position.x + this.width * 0.5,
            maxY: this._position.y + this.height * 0.5,
        };
        // adding to scene
        this.scene.objects.push(this);
        this.data = {};
    }
    /**
    * position
    */
    get position() {
        return this._position;
    }
    /**
    * position
    */
    set position(vec) {
        this._position = vec;
        this.boundInfo = {
            minX: this._position.x - this.width * 0.5,
            minY: this._position.y - this.height * 0.5,
            maxX: this._position.x + this.width * 0.5,
            maxY: this._position.y + this.height * 0.5,
        };
    }
    /**
    * updateBoundInfo
    */
    updateBoundInfo() {
        this.boundInfo = {
            minX: this._position.x - this.width * 0.5,
            minY: this._position.y - this.height * 0.5,
            maxX: this._position.x + this.width * 0.5,
            maxY: this._position.y + this.height * 0.5,
        };
    }
    /**
    * return the absolute value for 2d canvas
    * @param {BoundInfo} cb - projection bound
    * @return {Vector2}
    */
    getAbsPosition(cb) {
        if (!cb) {
            return new Vector2(0, 0);
        }
        let ob = this.boundInfo;
        let x = (ob.minX - cb.minX);
        let y = (ob.minY - cb.minY);
        return new Vector2(x, y);
    }
    /**
    * render
    */
    render() {
    }
}
export * from './shapes.js';
//# sourceMappingURL=index.js.map