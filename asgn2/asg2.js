// Quinlan Hoang

// Global Variables
var gl;
var canvas;
var a_Position;
var u_FragColor;
var u_ModelMatrix;
var u_GlobalRotateMatrix;

// UI
var gAnimalGlobalRotation = 0; // Camera
var g_jointAngle = 0; // Joint 1
var head_animation = 0;
var g_jointAngle2 = 0; // Joint 2
var g_Animation = false; // Joint 2

// Animation
var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0 - g_startTime;

// FPS tracking
var g_lastFrameTime = performance.now();
var g_frameCount = 0;
var g_fps = 0;

// Mouse drag
var g_mouseDown = false;
var g_lastMouseX = null;

// Vertex shader program ==========================================
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_ModelMatrix;\n' +
    'uniform mat4 u_GlobalRotateMatrix;\n' +
    'void main() {\n' +
    ' gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;\n' +
    '}\n';

// Fragment shader program ========================================
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main() {\n' +
    '  gl_FragColor = u_FragColor;\n' +
    '}\n';

// HTML ============================================================
function addActionsForHtmlUI(){
   document.getElementById('camera').addEventListener('mousemove', function() { gAnimalGlobalRotation = this.value; renderScene();});
   document.getElementById('joint').addEventListener('mousemove', function() { g_jointAngle = this.value; renderScene();});
   document.getElementById('joint2').addEventListener('mousemove', function() { g_jointAngle2 = this.value; renderScene();});
   document.getElementById('animate_on').onclick = function() {g_Animation = true;};
   document.getElementById('animate_off').onclick = function() {g_Animation = false;};
}

// Get Canvas and GL Context ======================================
function setupWebGL(){
   canvas = document.getElementById('asg2');
   if (!canvas) {
       console.log('Failed to retrieve the <canvas> element');
       return;
   }

   gl = getWebGLContext(canvas);
   if(!gl){
       console.log('Failed to get the rendering context for WebGL');
       return;
   }

   gl.enable(gl.DEPTH_TEST);
}

// Compile Shader Programs and connect js to GLSL =================
function connectVariablesToGLSL(){
   if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
       console.log('Failed to intialize shaders.');
       return;
   }

   a_Position = gl.getAttribLocation(gl.program, 'a_Position');
   if (a_Position < 0) {
       console.log('Failed to get the storage location of a_Position');
       return;
   }

   u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
   if (!u_FragColor) {
       console.log('Failed to get u_FragColor');
       return;
   }

   u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
   if (!u_ModelMatrix) {
       console.log('Failed to get u_ModelMatrix');
       return;
   }

   u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
   if (!u_GlobalRotateMatrix) {
       console.log('Failed to get u_GlobalRotateMatrix');
       return;
   }

   var identityM = new Matrix4();
   gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

// Main ===========================================================
function main() {
   setupWebGL();
   connectVariablesToGLSL();
   addActionsForHtmlUI();

   gl.clearColor(0.0, 0.0, 0.0, 1.0);

   // Mouse interactions
   canvas.onmousedown = function(ev) {
      g_mouseDown = true;
      g_lastMouseX = ev.clientX;
   };

   canvas.onmouseup = function() {
      g_mouseDown = false;
   };

   canvas.onmousemove = function(ev) {
      if (g_mouseDown) {
         let deltaX = ev.clientX - g_lastMouseX;
         gAnimalGlobalRotation += deltaX * 0.5;
         g_lastMouseX = ev.clientX;
         renderScene();
      }
   };

   requestAnimationFrame(tick);
}

// TICK =================================================
function tick(){
   g_seconds = performance.now()/1000.0 - g_startTime;
   updateAnimationAngles();
   renderScene();

   // FPS logic
   let currentTime = performance.now();
   g_frameCount++;
   if (currentTime - g_lastFrameTime >= 1000) {
      g_fps = g_frameCount;
      g_frameCount = 0;
      g_lastFrameTime = currentTime;
      document.getElementById('fpsCounter').innerText = g_fps;
   }

   requestAnimationFrame(tick);
}

// renderScene =================================================
function renderScene(){
   var globalRotMat = new Matrix4().rotate(gAnimalGlobalRotation, 0,1,0);
   gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

   drawAllShapes();
}

function updateAnimationAngles(){
   if(g_Animation){
      g_jointAngle = 10 * Math.sin(g_seconds);
      head_animation = 15 * Math.sin(g_seconds);
   }
}
