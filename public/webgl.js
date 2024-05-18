const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gl = canvas.getContext("webgl");
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

const vertexData = [
    -1 , -1 ,
    1 , -1 ,
    0 , 1 
    ].map(e=>e*0.2);
    
const Vbuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, Vbuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);


const colorData = [
    1,0,0,
    0,1,0,
    0,0,1
    ]
const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW)


const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
precision lowp float;
attribute vec2 position;
attribute vec3 color;
varying vec3 vColor;
uniform float angle;
uniform float aspectRatio;
uniform mat4 modelView;
uniform mat4 projection;
void main(){
    vColor = color;
    vec3 pos = vec3(position, 0.);
    float cosA = cos(angle);
    float sinA = sin(angle);
    mat3 rotationZ = mat3(
        cosA, -sinA, 0,
        sinA, cosA, 0,
        0, 0, 1
    );
    vec3 nposition = rotationZ * pos;
    nposition.x = nposition.x + sin(angle);
    nposition.y = nposition.y + cos(angle);
    gl_Position = projection * modelView * vec4(nposition,1);
}
`);
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('Vertex shader compilation error:', gl.getShaderInfoLog(vertexShader));
}

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `
precision lowp float;
uniform float angle;
varying vec3 vColor;
void main(){
    //vec3 colo = vec3(vColor.x * angle, vColor.y * angle, vColor.z * angle);
    gl_FragColor = vec4(vColor, 1) ;
}
`);
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('Fragment shader compilation error:', gl.getShaderInfoLog(fragmentShader));
}


const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking error:', gl.getProgramInfoLog(program));
}

const positionLocation = gl.getAttribLocation(program, "position");
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, Vbuffer)
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, "color");
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);

const uniformLocations = {
    angle : gl.getUniformLocation(program, "angle"),
    modelView: gl.getUniformLocation(program, "modelView"),
    projection: gl.getUniformLocation(program, "projection")
};

const aspectRatio = canvas.width / canvas.height;

const projectionMatrix = createOrthoMat4(aspectRatio, 0.1, 100).toFloat32Array();
const worldViewMatrix = createIdentityMat4().toFloat32Array();
gl.uniformMatrix4fv(uniformLocations.modelView, 0,worldViewMatrix);
gl.uniformMatrix4fv(uniformLocations.projection, 0,projectionMatrix);


let angle = 0;
const animate = (timeStamp)=>{
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear the canvas
    angle += 0.01;
    gl.uniform1f(uniformLocations.angle, angle);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(animate)
};
animate(0);