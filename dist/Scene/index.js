import { Colors } from '../Utility/index.js';
/**
 * @class Scene
 * @param {Engine} engine - engine for rendering context
 * @property {Engine} engine - engine for rendering context
 * @property {boolean} willRender - engine will render this scene depending on this.
 * @property {Camera|null} camera - rendering camera
 * @property {Object2D[]} objects - objects to render
 * @property {Sprite[]} sprites - sprites buffer or image
 * @property {Entity[]} entities - entities for scene
 * @property {string} clearColor - clearColor
 * @description - Scene for rendering 2d objects.
 */
export class Scene {
    constructor(engine) {
        this.id = crypto ? crypto.randomUUID() : Date.now().toString();
        this.engine = engine;
        this.willRender = true;
        this.camera = null;
        this.objects = [];
        this.sprites = [];
        this.entities = [];
        this.width = this.engine.canvasWidth;
        this.height = this.engine.canvasHeight;
        this.engine.scenes.push(this);
        this.clearColor = Colors.rgb(0, 0, 0);
    }
    /**
    * render method for engine
    * it will render all this.objects and this.entities
    */
    render() {
        var _a, _b;
        //setting clear color
        if (this.engine.ctx) {
            this.engine.ctx.beginPath();
            this.engine.ctx.fillStyle = this.clearColor;
            this.engine.ctx.fillRect(0, 0, this.engine.canvasWidth, this.engine.canvasHeight);
            this.engine.ctx.closePath();
        }
        if (this.camera === null) {
            throw new Error("no camera found");
            return;
        }
        if (this.objects.length === this.entities.length) {
            for (let i = 0; i < this.objects.length; i++) {
                this.camera.isInsideProjection(this.objects[i]) ? this.objects[i].render() : undefined;
                this.camera.isInsideProjection(this.entities[i]) ? this.entities[i].render() : undefined;
            }
            return;
        }
        else {
            let length = Math.max(this.entities.length, this.objects.length);
            for (let i = 0; i < length; i++) {
                this.camera.isInsideProjection(this.entities[i]) ? (_a = this.entities[i]) === null || _a === void 0 ? void 0 : _a.render() : undefined;
                this.camera.isInsideProjection(this.objects[i]) ? (_b = this.objects[i]) === null || _b === void 0 ? void 0 : _b.render() : undefined;
            }
        }
    }
}
//# sourceMappingURL=index.js.map