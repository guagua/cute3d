/**
 * Created by guagua on 15/5/30.
 */

function draw() {
    var canvas = document.getElementById("webgl");
    if (!canvas) {
        console.log("获取Canvas失败");
        return;
    }

    var gl = canvas.getContext("webgl");//获取WebGL上下文环境
    if (!gl) {
        console.log("获取WebGL上下文失败,请确认您的浏览器支持WebGL");
        return;
    }

    gl.clearColor(0.0, 0.0, 1.0, 1.0);//指定刷新Canvas使用的颜色
    gl.clear(gl.COLOR_BUFFER_BIT);//刷新Canvas颜色
}