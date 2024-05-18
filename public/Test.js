import * as ENGINE2D from "/dist/index.js";

const canvas = document.getElementById('canvas');
canvas.height = window.innerHeight/2;
canvas.width = window.innerWidth;
async function main() {
    const engine = new ENGINE2D.Engine(canvas);
    const scene = ENGINE2D.Engine.createScene(engine);
    const camera = new ENGINE2D.Camera('Camera1',new ENGINE2D.Vector2(0),scene);
    
    const animation = [
    {
        name:"Run",
        data:"Run.json",
        file:"Run.png"
    },
    {
        name:"Jump",
        data:"Jump.json",
        file:"Jump.png",
    },{
        name: "Walk",
        data: "Walk.json",
        file: "Walk.png"
    }
]
    // const circle1 = ENGINE2D.Shapes.Circle('circle1', {
    //     radius:10,
    //     startAngle:0,
    //     endAngle:Math.PI*2,
    //     position:new ENGINE2D.Vector2(0)},scene);
    /*
    // const circle2 = ENGINE2D.Shapes.Circle('circle2', {
    //     radius:50,
    //     startAngle:0,
    //     endAngle:Math.PI*2,
    //     position:new ENGINE2D.Vector2(0,0)},scene);
    // const rect = ENGINE2D.Shapes.Rectangle('rect',{
    //     height:100,
    //     width:100,
    //     position:new ENGINE2D.Vector2(0)
    //     }, scene)
    // rect.data.fill = true
    // rect.data.fillColor = ENGINE2D.Colors.rgba(255,255,255,0.5)
    // console.log(scene, circle2);
    // const rect2 = ENGINE2D.Shapes.Rectangle('rect2',{
    //     height:engine.canvasHeight,
    //     width:engine.canvasWidth,
    //     position:new ENGINE2D.Vector2(0)
    //     }, scene)
    // rect2.data.fill = true
    // rect2.data.stroke = true
    // rect2.data.fillColor = ENGINE2D.Colors.rgba(255,0,0,0.5)
    // console.log(scene, circle2);
    */
    let x = 0;
    
    const o2 = ENGINE2D.Shapes.Line('line',{
        position:new ENGINE2D.Vector2(0,0),
        target:new ENGINE2D.Vector2(400,0),
        lineWidth:5
        }, scene);

    const o1 = new ENGINE2D.ObjectWithAnimationGroup("name1",animation,'./Dat/',{
        width: 150,
        height : 100,
        position : new ENGINE2D.Vector2(0)
        }, scene)
        o1.frameRate = 5
        o1.initiateData();
    console.log(o1.dispatch('Walk'));

    window.onclick = ()=>o1.dispatch('Jump');
    window.ondblclick = ()=>o1.dispatch('Run');
    window.ontouchmove = ()=>o1.dispatch('Walk');
    
    engine.runDefaultRenderLoop(()=>{
        
        x+=0.5
        
        //o2.position.copyFrom(new ENGINE2D.Vector2(x,0));
        //o2.updateBoundInfo()
        //o1.position.copyFrom(new ENGINE2D.Vector2(x,0));
        //o1.updateBoundInfo()
        //camera.setPosition(x,0)
    })
}


window.onload = ()=>{
    eruda.init();
    main();
}