class Component {
    constructor(name) {
        this.uuid = crypto.randomUUID();
        this.name = name || crypto.randomUUID();
        this.components = [];
        this.parent = null;
        this.props = {};
        this.root = null;
        this.updateNeeded = false;
        this.isRoot = false;
    }
    /**
     * user
    * start
    */
    start() {
    }
    /**
     * user
    * repeat
    */
    repeat() {
        this.updateNeeded = false;
    }
    /**
     * init
     */
    init() {
        this.start();
        if (this.components.length < 1)
            return;
        for (let i = 0; i < this.components.length; i++) {
            const element = this.components[i];
            element.init();
        }
        this.updateNeeded = true;
    }
    /**
     * user
    * stop
    */
    onDiscard() {
        this.updateNeeded = false;
    }
    /**
     * update
     */
    update() {
        this.repeat();
        if (this.components.length < 1 || !this.updateNeeded)
            return;
        for (let i = 0; i < this.components.length; i++) {
            const element = this.components[i];
            element.update();
        }
    }
    /**
     * discard
     */
    discard() {
        this.onDiscard();
        if (this.components.length < 1)
            return;
        for (let i = 0; i < this.components.length; i++) {
            const element = this.components[i];
            element.discard();
        }
    }
    /**
     * findComponent
     */
    findComponent(uuid) {
        if (this.components.length < 1)
            return undefined;
        return this.components.find(e => e.uuid === uuid);
    }
    /**
     * by name
     */
    findComponentBy(name) {
        if (this.components.length < 1)
            return undefined;
        return this.components.find(e => e.name === name);
    }
    /**
     * addComponent
     */
    addComponent(component) {
        if (!this.components.includes(component)) {
            this.components.push(component);
            component.parent = this;
            this.isRoot ? component.root = this : component.root = component.parent.root;
        }
    }
    /**
     * removeComponent
     */
    removeComponent(component) {
        if (this.components.indexOf(component) !== -1) {
            this.components.splice(this.components.indexOf(component), 1);
        }
    }
    /**
     * setParent
     */
    setParent(parent) {
        if (parent === this) {
            return;
        }
        if (!this.parent) {
            parent === null || parent === void 0 ? void 0 : parent.addComponent(this);
            this.parent = parent;
            return;
        }
        this.parent.removeComponent(this);
        this.parent = parent;
        parent === null || parent === void 0 ? void 0 : parent.addComponent(this);
        parent.isRoot ? this.root = parent : this.root = parent.root;
    }
}
class MainLoop extends Component {
    constructor(initials) {
        super(undefined);
        this.initials = initials;
        this.isRoot = true;
        this.root = this;
    }
    /**
    * initialize
    */
    start() {
        if (this.components.length < 1)
            return;
        for (let i = 0; i < this.components.length; i++) {
            const element = this.components[i];
            element.init();
        }
        this.updateNeeded = true;
    }
    /**
    * update
    */
    repeat() {
        if (this.components.length < 1 || !this.updateNeeded)
            return;
        for (let i = 0; i < this.components.length; i++) {
            const element = this.components[i];
            element.update();
        }
    }
    init() { }
    update() { }
    /**
    * stop
    */
    stop() {
        this.updateNeeded = false;
    }
}
export { MainLoop, Component };
//# sourceMappingURL=Component.js.map