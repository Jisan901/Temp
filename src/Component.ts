 class Component {
    readonly uuid: string;
    readonly name : string|null|undefined;
    public components : Component[];
    public parent : Component|null;
    public props : any;
    public root : Component|null;
    public updateNeeded : boolean;
    public isRoot : boolean;
    constructor(name:string|null|undefined) {
        this.uuid = crypto.randomUUID();
        this.name = name||crypto.randomUUID();
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
    public start() {
        
    }
    /**
     * user
    * repeat
    */
    public repeat() {
        this.updateNeeded = false;
    }
    /**
     * init
     */
    public init() {
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
    public onDiscard() {
        this.updateNeeded = false;
    }
    /**
     * update 
     */
    public update() {
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
    public discard() {
        this.onDiscard();
        if (this.components.length < 1 )
            return;
        for (let i = 0; i < this.components.length; i++) {
            const element = this.components[i];
            element.discard();
        }
    }
    /**
     * findComponent
     */
    public findComponent(uuid:string){
        if (this.components.length < 1) return undefined;
        return this.components.find(e=>e.uuid === uuid);
    }
    /**
     * by name
     */
    public findComponentBy(name:string){
        if (this.components.length < 1) return undefined;
        return this.components.find(e=>e.name === name);
    }
    /**
     * addComponent
     */
    public addComponent(component:Component){
        if (!this.components.includes(component)){
            this.components.push(component);
            component.parent = this
            this.isRoot? component.root = this : component.root = component.parent.root;
        }
    }
    /**
     * removeComponent
     */
    public removeComponent(component :Component){
        if (this.components.indexOf(component)!==-1) {
            this.components.splice(this.components.indexOf(component), 1);
        }
    }
    /**
     * setParent
     */
    public setParent(parent:Component){
        if (parent===this) {
            return;
        }
        if (!this.parent) {
            parent?.addComponent(this);
            this.parent = parent;
            return;
        }
        this.parent.removeComponent(this);
        this.parent = parent;
        parent?.addComponent(this);
        parent.isRoot?this.root = parent : this.root = parent.root;
    }
}


class MainLoop extends Component {
    public initials:any;
    constructor(initials:any) {
        super(undefined);
        this.initials = initials;
        this.isRoot = true;
        this.root = this;
    }
    /**
    * initialize
    */
    public start() {
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
    public repeat() {
        if (this.components.length < 1 || !this.updateNeeded)
            return;
        for (let i = 0; i < this.components.length; i++) {
            const element = this.components[i];
            element.update();
        }
    }
    public init() { }
    public update() { }
    /**
    * stop
    */
    public stop() {
        this.updateNeeded = false;
    }
}

export {MainLoop, Component};