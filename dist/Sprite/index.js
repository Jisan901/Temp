var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Object2D } from "../Object2D/index.js";
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
    constructor(name, image, spriteData, groupHead, scene) {
        this.groupHead = groupHead;
        this.image = image;
        this.spriteData = spriteData;
        this.frame = 0;
        this.frameRate = groupHead.frameRate;
        this.currentFrame = 0;
        this.animate = true;
        this.loopAnimation = true;
        this.scene = scene;
        this.scene.sprites.push(this);
    }
    /**
    * reset
    */
    reset() {
        this.frame = 0;
        this.currentFrame = 0;
    }
    /**
     * update currentFrame frame
     */
    update() {
        if (this.animate) {
            if (this.currentFrame % this.frameRate === 0) {
                this.frame < this.spriteData.length - 1 ? this.frame++ :
                    this.loopAnimation ? this.frame = 0 : null;
                this.currentFrame = 0;
            }
            this.currentFrame++;
        }
    }
    /**
     * render
     */
    render() {
        var _a;
        let ctx = this.scene.engine.ctx;
        if (!ctx) {
            throw new Error("ctx is possibly null");
            return;
        }
        let absPosition = this.groupHead.getAbsPosition((_a = this.scene.camera) === null || _a === void 0 ? void 0 : _a.projectionBound);
        ctx.drawImage(this.image, this.spriteData[this.frame].x, this.spriteData[this.frame].y, this.spriteData[this.frame].width, this.spriteData[this.frame].height, absPosition.x, absPosition.y, this.groupHead.width, this.groupHead.height);
        this.update();
    }
}
;
export class ObjectWithAnimationGroup extends Object2D {
    constructor(name, data, path, options, scene) {
        super(name, options, scene);
        this.animData = data;
        this.currentAnimation = "";
        this.animations = {};
        this.path = path;
        this.frameRate = 3;
        //this._initiateData();
    }
    initiateData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.animData.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                const res = yield fetch(this.path + item.data);
                const { frames } = yield res.json();
                let spData = this.mapFrames(frames);
                let image = new Image();
                image.src = this.path + item.file;
                this.animations[item.name] = new Sprite(item.name, image, spData, this, this.scene);
            }));
            if (!this.currentAnimation)
                this.currentAnimation = this.animData[0].name;
        });
    }
    mapFrames(data) {
        let mapped = [];
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
    dispatch(animationName, loop = true, animate = true) {
        if (animationName === this.currentAnimation) {
            return false;
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
    render() {
        var _a;
        (_a = this.animations[this.currentAnimation]) === null || _a === void 0 ? void 0 : _a.render();
    }
}
/**
 * examples
 *
 */
[
    {
        name: "Attack",
        data: "Attack.json",
        file: "Attack.png"
    },
    {
        name: "Dead",
        data: "Dead.json",
        file: "Dead.png",
    },
    {
        name: "Idle",
        data: "Idle.json",
        file: "Idle.png"
    },
    {
        name: "Jump",
        data: "Jump.json",
        file: "Jump.png"
    },
    {
        name: "JumpAtk",
        data: "JumpAtk.json",
        file: "JumpAttk.png"
    },
    {
        name: "Jump_tr",
        data: "Jump_tr.json",
        file: "Jump_tr.png"
    },
    {
        name: "Run",
        data: "Run.json",
        file: "Run.png"
    },
    {
        name: "Slide",
        data: "Slide.json",
        file: "Slide.png"
    },
    {
        name: "Throw",
        data: "Throw.json",
        file: "Throw.png"
    }
];
//# sourceMappingURL=index.js.map