//alert(Laya.Render.isWebGL);
Config.showCanvasMark = true;
Config.isAntialias = true;
//创建舞台，默认背景色是黑色的
//console.debug(Laya.init(600, 300)); 
console.debug(Laya.init(500, 180, laya.webgl.WebGL));
// alert(Laya.Render.isWebGL);
// Laya.stage.fullScreenEnabled = true;
Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
//Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
//Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
//Laya.stage.screenAdaptationEnabled = false;
//Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
console.debug(Laya.stage.clientScaleX + "_" + Laya.stage.clientScaleY);
//Laya.stage.getTimeFromFrameStart
// Laya.Font.defaultFamily = "_san";
// Laya.Font.defaultFont
// alert(Laya.Font.defaultFamily);
// alert(Laya.Font.defaultFont);
var txt = new Laya.Text();
//设置文本内容
txt.text = "Hello Layabox";
//设置文本颜色
txt.color = "#FF0000";
//设置文本字体大小，单位是像素
txt.fontSize = 60;
//设置字体描边
//txt.stroke = 35;//描边为5像素
txt.strokeColor = "#e9d738";
//设置为粗体
txt.bold = true;
//设置文本的显示起点位置X,Y
txt.pos(60, 100);
txt.mouseEnabled = true;
txt.hitArea = txt.getSelfBounds();
// alert(txt.width + "_" + txt.height);
//设置舞台背景色
Laya.stage.bgColor = '#1a9787';
//将文本内容添加到舞台 
Laya.stage.addChild(txt);
//console.debug("000", Laya.init);
// document.addEventListener("fullscreenchange",this._fullScreenChanged);
// 			document.addEventListener("mozfullscreenchange",this._fullScreenChanged);
// 			document.addEventListener("webkitfullscreenchange",this._fullScreenChanged);
// 			document.addEventListener("msfullscreenchange",this._fullScreenChanged);
//             function _fullScreenChanged():void{
// 		Laya.stage.event(/*laya.events.Event.FULL_SCREEN_CHANGE*/"fullscreenchange");
// 	}
function toggleFullScreen(e) {
    console.log(e);
    // alert(Laya.stage.mouseX + "_" + Laya.stage.mouseY);
    console.log(txt.hitTestPoint(Laya.stage.mouseX, Laya.stage.mouseY));
    if (txt.hitTestPoint(Laya.stage.mouseX, Laya.stage.mouseY)) {
        console.log(111);
    }
    else {
        console.log(222);
        // alert("123456");
        return;
    }
    console.log(333);
    // alert(txt.hitTestPoint(Laya.stage.mouseX, Laya.stage.mouseY));
    // return;
    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
        else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
        else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        }
        else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        }
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}
// laya.renders.Render.canvas.addEventListener('mousedown', toggleFullScreen);
laya.renders.Render.canvas.addEventListener('touchstart', toggleFullScreen);
// laya.renders.Render.canvas.addEventListener('touchend',toggleFullScreen);
function toggleFullScreen2() {
    alert(txt.hitTestPoint(Laya.stage.mouseX, Laya.stage.mouseY));
}
Laya.stage.on("click", this, function () {
    Laya.Font.defaultFamily = "_san";
    txt.customRenderEnable;
    txt.font = "Microsoft JhengHei";
    txt.text = "Hello Layabox2";
    var txt2 = new Laya.Text();
    txt2.text = "Hello Layabox";
    //设置文本字体大小，单位是像素
    txt2.fontSize = 60;
    Laya.stage.addChild(txt2);
    // Laya.stage.width = 400;
    // Laya.stage.height = 400;
    //Laya.stage.size(200, 200);
    // Laya.stage.setScreenSize(200,200);
    // Laya.stage.width = 400;
    // Laya.stage.height = 400;
    // Laya.stage.repaint();
    // alert(Laya.stage.designWidth + " __ " + Laya.stage.designHeight);
    // alert(Laya.stage.clientScaleX + " __ " + Laya.stage.clientScaleY);
    //laya.renders.Render.canvas.removeEventListener('touchstart',null);
});
// element.requestFullscreen();
// 			}else if (element.mozRequestFullScreen){
// 			element.mozRequestFullScreen();
// 			}else if (element.webkitRequestFullscreen){
// 			element.webkitRequestFullscreen();
// 			}else if (element.msRequestFullscreen){
// 			element.msRequestFullscreen();
Laya.stage.on("focus", this, function () {
    console.debug("222");
});
Laya.stage.on("focuschange", this, function () {
    console.debug("333");
});
Laya.stage.on("fullscreenchange", this, function () {
    console.debug("444");
});
Laya.stage.on("resize", this, function () {
    console.debug("555");
    //  alert(Laya.stage.width + " __ " + Laya.stage.height);
    // alert(Laya.stage.canvasRotation + "   :  " + Laya.stage.canvasDegree);
});
Laya.stage.on("visibilitychange", this, function () {
    console.debug("666");
});
//# sourceMappingURL=HelloLayabox.js.map