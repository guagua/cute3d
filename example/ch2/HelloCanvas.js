/**
 * Created by guagua on 15/5/30.
 */

function draw() {
    var canvas = document.getElementById("canvas");
    if (!canvas) {
        console.log("获取Canvas失败");
        return;
    }

    var context = canvas.getContext("2d");

    context.beginPath();
    context.fillStyle="#FF0000";//设置填充颜色
    context.fillRect(10,0,150,100);//绘制矩形

    context.beginPath();
    context.strokeStyle="#00FF00";//设置边框
    context.lineWidth=2;//边框宽度
    context.strokeRect(10,150,150,100);

    context.beginPath();
    context.moveTo(10,300);
    context.lineTo(150,300);
    context.lineTo(80,400);
    context.closePath();/*可选步骤，关闭绘制的路径*/
    context.stroke();
}
