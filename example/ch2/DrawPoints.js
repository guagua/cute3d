/**
 * Created by guagua on 15/5/30.
 */

var VSHADER_SOURCE =
    'void main() {\n' +
    '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + //设置顶点坐标
    '  gl_PointSize = 20.0;\n' +                    //设置顶点尺寸
    '}\n';

var FSHADER_SOURCE =
    'void main() {\n' +
    '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + //设置片元颜色
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

    gl.clearColor(0.0, 0.0, 1.0, 1.0);  //指定刷新Canvas使用的颜色
    gl.clear(gl.COLOR_BUFFER_BIT);//刷新Canvas颜色

    gl.drawArrays(gl.POINTS, 0, 1);
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