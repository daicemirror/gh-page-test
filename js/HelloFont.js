var HelloFont = /** @class */ (function () {
    function HelloFont() {
        this.prevX = 0;
        this.prevY = 0;
        //设置画布是否透明，只对2D(WebGL)、3D有效
        Config.isAlpha = true;
        //初始化引擎，不支持WebGL时自动切换到Canvas
        Laya.init(Laya.Browser.clientWidth, Laya.Browser.clientHeight);
        // Laya.init(Laya.Browser.clientWidth,Laya.Browser.clientHeight, Laya.WebGL);
        // if(Laya.Render.isWebGL)
        // {
        //     Laya.stage.bgColor = 'none';
        // }
        // else
        // {
        //     Laya.stage.bgColor = null;
        // }
        Laya.stage.bgColor = '#60afff';
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        this.temp = new Laya.Text();
        this.temp.font = 'Steelworks Vintage Demo';
        this.temp.text = ".简繁En";
        var c = this.temp.textWidth;
        Laya.timer.frameLoop(1, this, check);
        function check() {
            if (this.temp.textWidth != c) {
                Laya.timer.clear(this, check);
                // this.createText();
                var bf = new Laya.BitmapFont();
                bf.loadFont("res/bitmapFont/desyrel.fnt", new Laya.Handler(this, function () {
                    Laya.Text.registerBitmapFont("desyrel", bf);
                    this.createText();
                }));
            }
            else {
                this.temp.fontSize = this.temp.fontSize;
            }
        }
        // this.createText();
    }
    HelloFont.prototype.createText = function () {
        alert("createText!!!!!!!!!");
        this.temp.destroy();
        this.temp = null;
        this.txt = new Laya.Text();
        this.txt._lastVisibleLineIndex = 0; //解決bitmapfont scroll的bug
        // this.txt.font = 'ssf4abuket';
        // this.txt.font = 'Steelworks Vintage Demo';
        this.txt.font = 'desyrel';
        this.txt.overflow = Laya.Text.SCROLL;
        this.txt.text = "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
            "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
            "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
            "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
            "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！\n" +
            "Layabox是HTML5引擎技术提供商与优秀的游戏发行商，面向AS/JS/TS开发者提供HTML5开发技术方案！";
        this.txt.size(600, 300);
        // this.txt.scrollY = 0;//解決bitmapfont scroll的bug, 放在適當位置scrollY才不會被return掉
        this.txt.x = Laya.stage.width - this.txt.width >> 1;
        this.txt.y = Laya.stage.height - this.txt.height >> 1;
        this.txt.borderColor = "#ffff00";
        this.txt.fontSize = 60;
        this.txt.color = "#ff8000";
        Laya.stage.addChild(this.txt);
        this.txt.on(Laya.Event.MOUSE_DOWN, this, this.startScrollText);
    };
    /*开始滚动文本*/
    HelloFont.prototype.startScrollText = function () {
        this.prevX = this.txt.mouseX;
        this.prevY = this.txt.mouseY;
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.scrollText);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.finishScrollText);
    };
    /* 停止滚动文本 */
    HelloFont.prototype.finishScrollText = function () {
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.scrollText);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.finishScrollText);
    };
    /* 鼠标滚动文本 */
    HelloFont.prototype.scrollText = function () {
        var nowX = this.txt.mouseX;
        var nowY = this.txt.mouseY;
        this.txt.scrollX += this.prevX - nowX;
        this.txt.scrollY += this.prevY - nowY;
        this.prevX = nowX;
        this.prevY = nowY;
    };
    return HelloFont;
}());
new HelloBitmapFont();
//# sourceMappingURL=HelloFont.js.map