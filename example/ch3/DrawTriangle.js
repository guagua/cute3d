/**
 * Created by guagua on 15/6/2.
 */

var VSHADER_SOURCE =
    'attribute vec4 aPosition;\n' +
    'void main() {\n' +
    '  gl_Position = aPosition;\n' +
    '}\n';

var FSHADER_SOURCE =
    'void main() {\n' +
    '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
    '}\n';

function draw() {
    var canvas = document.getElementById("webgl");
    if (!canvas) {
        console.log("获取Canvas失败");
        return;
    }

    var gl = canvas.getContext("webgl");    //获取WebGL上下文环境
    if (!gl) {
        console.log("获取WebGL上下文失败,请确认您的浏览器支持WebGL");
        return;
    }

    var isInitSuccess = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    if (!isInitSuccess) {
        console.log("初始化Shader失败")
        return;
    }

    var vNum = initVertexBuffers(gl);
    if (vNum < 0) {
        console.log("设置顶点位置失败");
        return;
    }

    gl.clearColor(0.0, 0.0, 1.0, 1.0);  //指定刷新Canvas使用的颜色
    gl.clear(gl.COLOR_BUFFER_BIT);//刷新Canvas颜色

    gl.drawArrays(gl.TRIANGLES, 0, vNum);
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);
    var n = vertices.length/2;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log("创建buffer失败");
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(gl.program, "aPosition");
    if (aPosition < 0) {
        console.log("error");
        return -1;
    }

    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    return n;
}

function initShaders(gl, vshader, fshader) {
    var program = createProgram(gl, vshader, fshader);
    if (!program) {
        console.log("创建Program失败");
        return false;
    }

    gl.useProgram(program);
    gl.program = program;

    return true;
}

function createProgram(gl, vshader, fshader) {
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
    if (!vertexShader || !fragmentShader) {
        console.log("创建Shader失败");
        return null;
    }

    var program = gl.createProgram();
    if (!program) {
        return null;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        var error = gl.getProgramInfoLog(program);
        console.log("链接Program失败:" + error);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        return null;
    }
    return program;
}

function loadShader(gl, type, source) {
    var shader = gl.createShader(type);
    if (shader == null) {
        console.log("创建Shader失败");
        return null;
    }

    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        var error = gl.getShaderInfoLog(shader);
        console.log("编译Shader失败:" + error);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}