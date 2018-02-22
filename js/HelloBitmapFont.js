var HelloBitmapFont = /** @class */ (function () {
    function HelloBitmapFont() {
        //自定义文件名称
        this.mFontName = "diyFont";
        //初始化引擎
        // Laya.init(550,400);
        Laya.init(550, 400, Laya.WebGL);
        Laya.stage.bgColor = '#d8d8d8';
        this.mBitmapFont = new Laya.BitmapFont();
        //这里不需要扩展名，外部保证fnt与png文件同名
        this.mBitmapFont.loadFont("res/bitmapFont/desyrel.fnt", new Laya.Handler(this, this.onLoaded));
    }
    HelloBitmapFont.prototype.onLoaded = function () {
        this.init();
    };
    HelloBitmapFont.prototype.init = function () {
        //如果位图字体中，没放空格，最好设置一个空格宽度
        // this.mBitmapFont.setSpaceWidth(100);
        Laya.Text.registerBitmapFont(this.mFontName, this.mBitmapFont);
        var txt = new Laya.Text();
        txt.bgColor = '#8000ff';
        txt.pos(100, 100);
        txt.text = "这是lay abox测试文件";
        //设置宽度，高度自动匹配
        txt.width = 250;
        //自动换行
        // txt.wordWrap = true;
        txt.align = "center";
        // console.log(txt.textWidth);
        //使用我们注册的字体
        txt.font = this.mFontName;
        txt.fontSize = 50;
        txt.leading = 5;
        Laya.stage.addChild(txt);
        // console.log(txt.textWidth);
        // Laya.timer.once(5000, this, console.log, [txt.textWidth]);
    };
    return HelloBitmapFont;
}());
new HelloBitmapFont();
//# sourceMappingURL=HelloBitmapFont.js.map