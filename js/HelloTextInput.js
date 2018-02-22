var HelloTextInput = /** @class */ (function () {
    function HelloTextInput() {
        this.Text_InputSingleline();
        this.Text_InputMultiline();
        // Laya.loader.load([{ url: "res/atlas/bitmapFont2.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, onLoaded));
        // function onLoaded(): void {
        //实例UI界面
        var v2 = new ui.F2.V2UI();
        Laya.stage.addChild(v2);
        // }
    }
    HelloTextInput.prototype.Text_InputSingleline = function () {
        var textInput = new Laya.TextInput(); //创建一个 TextInput 类的实例对象 textInput 。
        // textInput.font = 'ssf4abuket';
        textInput.font = 'Steelworks Vintage Demo';
        // textInput.font = 'desyrel';
        textInput.prompt = 'TTTTestprompt';
        textInput.wordWrap = true; //设置 textInput 的文本自动换行。
        textInput.fontSize = 30; //设置 textInput 的字体大小。
        textInput.x = 0; //设置 textInput 对象的属性 x 的值，用于控制 textInput 对象的显示位置。
        textInput.y = 0; //设置 textInput 对象的属性 y 的值，用于控制 textInput 对象的显示位置。
        textInput.width = 300; //设置 textInput 的宽度。
        textInput.height = 200; //设置 textInput 的高度。
        textInput.bgColor = "#c30c30";
        Laya.stage.addChild(textInput); //将 textInput 添加到显示列表。
    };
    HelloTextInput.prototype.Text_InputMultiline = function () {
        var textInput = new Laya.TextInput("多行输入"); //创建一个 TextInput 类的实例对象 textInput 。
        textInput.font = 'ssf4abuket';
        // textInput.font = 'Steelworks Vintage Demo';
        // textInput.font = 'desyrel';
        textInput.fontSize = 30; //设置 textInput 的字体大小。
        textInput.wordWrap = true; //设置 textInput 的文本自动换行。
        textInput.multiline = true; //设置textInput的多行输入
        textInput.x = 0; //设置 textInput 对象的属性 x 的值，用于控制 textInput 对象的显示位置。
        textInput.y = 300; //设置 textInput 对象的属性 y 的值，用于控制 textInput 对象的显示位置。
        textInput.width = 300; //设置 textInput 的宽度。
        textInput.height = 200; //设置 textInput 的高度。
        textInput.bgColor = "#c30c30";
        Laya.stage.addChild(textInput); //将 textInput 添加到显示列表。
    };
    return HelloTextInput;
}());
//初始化引擎，不支持WebGL时自动切换到Canvas
Laya.init(640, 800, Laya.WebGL);
// Laya.init(640,800);
// //设置画布的背景颜色
Laya.stage.bgColor = "#efefef";
// new HelloTextInput();
var embedFontNames = ['Steelworks Vintage Demo', 'ssf4abuket'];
initEmbedFonts(embedFontNames, function () {
    var bf = new Laya.BitmapFont();
    // bf.loadFont("res/bitmapFont/desyrel.fnt",new Laya.Handler(this,function():void{
    bf.loadFont("res/bitmapFont/desyrel.fnt", new Laya.Handler(this, function () {
        Laya.Text.registerBitmapFont("desyrel", bf);
        new HelloTextInput();
    }));
});
function initEmbedFonts(names, onComplete) {
    if (!names)
        return;
    if (names.length == 0) {
        onComplete();
    }
    var name = names.shift();
    if (name) {
        var temp = new Laya.Text();
        temp.font = name;
        temp.text = ".简繁En";
        var c = temp.textWidth;
        Laya.timer.frameLoop(1, null, check);
        function check() {
            if (temp.textWidth != c) {
                Laya.timer.clear(null, check);
                initEmbedFonts(names, onComplete);
            }
            else {
                temp.fontSize = temp.fontSize;
            }
        }
    }
}
//# sourceMappingURL=HelloTextInput.js.map