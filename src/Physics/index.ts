import * as Matter from 'matter-js';

export class Physics {
    world : Matter.World
    constructor() {
        this.world = new Matter.World()
    }
}