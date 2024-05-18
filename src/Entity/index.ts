import {Object2D, Object2DOptions} from '../Object2D/index.js';
import {Scene} from '../Scene/index.js';

export class Entity extends Object2D {
    constructor(name: string, options:Object2DOptions , scene: Scene) {
        super(name, options, scene)
    }
}