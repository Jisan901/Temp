import { Object2D } from '../Object2D/index.js';
export class Shapes {
    /**
    * basic Circle
    * @param {string} name - Circle name
    * @param {CircleOption} options - radius:number,startAngle:number,endAngle:number,position:Vector2
    * @param {Scene} scene
    * @return {Object2D}
    */
    static Circle(name, options, scene) {
        let options2 = {
            height: options.radius * 2,
            width: options.radius * 2,
            position: options.position
        };
        const circle = new Object2D(name, options2, scene);
        let ctx = circle.scene.engine.ctx;
        circle.render = () => {
            var _a, _b, _c, _d, _e;
            if (!ctx) {
                throw new Error("ctx is possibly null");
                return;
            }
            let absPosition = circle.getAbsPosition((_a = circle.scene.camera) === null || _a === void 0 ? void 0 : _a.projectionBound);
            ctx.beginPath();
            ctx.fillStyle = ((_b = circle.data) === null || _b === void 0 ? void 0 : _b.fillColor) || "#fff";
            ctx.strokeStyle = ((_c = circle.data) === null || _c === void 0 ? void 0 : _c.strokeColor) || "#fff";
            ctx.lineWidth = ((_d = circle.data) === null || _d === void 0 ? void 0 : _d.strokeWidth) || 8;
            ctx.arc(absPosition.x + (options.radius), absPosition.y + (options.radius), options.radius, options.startAngle, options.endAngle);
            ((_e = circle.data) === null || _e === void 0 ? void 0 : _e.fill) ?
                ctx.fill() : ctx.stroke();
            ctx.closePath();
        };
        return circle;
    }
    /**
     * basic Rectangle
     * @param {string} name - rect name
     * @param {RectangleOption} options - height width position
     * @param {Scene} scene
     * @return {Object2D}
     */
    static Rectangle(name, options, scene) {
        const rect = new Object2D(name, options, scene);
        let ctx = rect.scene.engine.ctx;
        rect.render = () => {
            var _a, _b, _c, _d, _e, _f;
            if (!ctx) {
                throw new Error("ctx is possibly null");
                return;
            }
            let absPosition = rect.getAbsPosition((_a = rect.scene.camera) === null || _a === void 0 ? void 0 : _a.projectionBound);
            ctx.beginPath();
            ctx.fillStyle = ((_b = rect.data) === null || _b === void 0 ? void 0 : _b.fillColor) || "#fff";
            ctx.strokeStyle = ((_c = rect.data) === null || _c === void 0 ? void 0 : _c.strokeColor) || "#fff";
            ctx.lineWidth = ((_d = rect.data) === null || _d === void 0 ? void 0 : _d.strokeWidth) || 8;
            ctx.rect(absPosition.x, absPosition.y, options.width, options.height);
            ((_e = rect.data) === null || _e === void 0 ? void 0 : _e.fill) ?
                ctx.fill() : ctx.stroke();
            ((_f = rect.data) === null || _f === void 0 ? void 0 : _f.stroke) ?
                ctx.stroke() : ctx.fill();
            ctx.closePath();
        };
        return rect;
    }
    /**
     * basic Line
     * @param {string} name - line name
     * @param {LineOptions} options -  position target
     * @param {Scene} scene
     * @return {Object2D}
     */
    static Line(name, options, scene) {
        let options2 = {
            width: options.lineWidth,
            height: Math.abs(options.target.y - options.position.y),
            position: options.position
        };
        const line = new Object2D(name, options2, scene);
        let ctx = line.scene.engine.ctx;
        line.render = () => {
            var _a, _b, _c, _d, _e;
            if (!ctx) {
                throw new Error("ctx is possibly null");
                return;
            }
            let absPosition = line.getAbsPosition((_a = line.scene.camera) === null || _a === void 0 ? void 0 : _a.projectionBound);
            ctx.beginPath();
            ctx.fillStyle = ((_b = line.data) === null || _b === void 0 ? void 0 : _b.fillColor) || "#fff";
            ctx.strokeStyle = ((_c = line.data) === null || _c === void 0 ? void 0 : _c.strokeColor) || "#fff";
            ctx.lineWidth = options.lineWidth;
            ctx.moveTo(absPosition.x, absPosition.y);
            ctx.lineTo(absPosition.x + Math.abs(options.target.x - options.position.x), absPosition.y + options2.height);
            ((_d = line.data) === null || _d === void 0 ? void 0 : _d.fill) ?
                ctx.fill() : ctx.stroke();
            ((_e = line.data) === null || _e === void 0 ? void 0 : _e.stroke) ?
                ctx.stroke() : ctx.fill();
            ctx.closePath();
            console.log('r1');
        };
        return line;
    }
}
//# sourceMappingURL=shapes.js.map