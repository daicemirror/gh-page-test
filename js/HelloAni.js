/*
* name;
*/
var HelloAni = /** @class */ (function () {
    function HelloAni() {
        var AniConfPath = 'res/fighter/fighter.atlas';
        var ss = new Laya.Sprite();
        // var hh:Laya.Handler = Laya.Handler.create(this, function():void{
        // 	console.log('99999999999999');
        // },undefined, false);
        // ss.loadImage('res/fighter/yd-6_08.png', undefined,undefined,undefined,undefined,hh);
        Laya.loader.load(AniConfPath, Laya.Handler.create(this, function () {
            var ani = new Laya.Animation();
            // alert(ani.interval + " __ " + ani.index);
            // ani.loadAtlas(AniConfPath,undefined); // 加载图集动画
            Laya.Animation.createFrames(AniConfPath, 'ppopp');
            // var ani = new Laya.Animation();
            // 		var character4: Array<string> = [
            // 		"res/fighter/wyd-1_01.png",
            // 		"res/fighter/wyd-1_02.png",
            // 		"res/fighter/wyd-1_03.png",
            // 		"res/fighter/wyd-1_04.png",
            // 		"res/fighter/wyd-1_05.png",
            // 		"res/fighter/wyd-1_06.png",
            // 		"res/fighter/wyd-1_07.png",
            // 		"res/fighter/wyd-1_08.png",
            // 		"res/fighter/yd-6_01.png",
            // 		"res/fighter/yd-6_02.png",
            // 		"res/fighter/yd-6_03.png",
            // 		"res/fighter/yd-6_04.png",
            // 		"res/fighter/yd-6_05.png",
            // 		"res/fighter/yd-6_06.png",
            // 		"res/fighter/yd-6_07.png",
            // 		"res/fighter/yd-6_08.png",
            // 	];
            // 	ani.source = character4.join(',');
            ani.play(undefined, undefined, 'ppopp');
            ani.gotoAndStop(10);
            Laya.stage.addChild(ani);
            // console.log(Laya.Handler.create(this,function():void{},undefined,true).run());
            console.log(Laya.Handler._pool);
            ani.frameLoop(1, this, function () {
                // console.log(ani.getSelfBounds(), ani.getBounds(), ani.getGraphicBounds(true));
                console.log(Laya.Handler._pool);
            });
            Laya.Tween.from(ani, { x: 300 }, 1000, Laya.Ease.elasticOut, Laya.Handler.create(this, function () {
                // Laya.Handler._pool;
            }, undefined, true));
            return;
            // ani.addLabel('pp0', 1);
            // ani.addLabel('pp1', 8);
            // ani.play('pp0', false);
            // ani.stop();
            // ani.gotoAndStop('pp0');
            // ani.loadImages(character4);
            ani.frameLoop(1, this, function () {
                console.log(ani.getGraphicBounds(), ani.getGraphicBounds(true));
            });
            ani.on(Laya.Event.LABEL, this, function (oo) {
                console.log('ani LABEL!!', oo);
            });
            ani.once(Laya.Event.COMPLETE, this, function () {
                console.log('ani COMPLETE!!', Laya.loader.getRes('FF15'));
                // ani.play(undefined,undefined,'FF15');
                ani.play('pp0');
                ani.destroy(true);
                Laya.Animation.clearCache('FF15');
                // Laya.Animation.createFrames
                console.log(Laya.loader.getRes('res/fighter/wyd-1_01.png'));
                // var ani2 = new Laya.Animation();
                // 	var character4: Array<string> = [
                // 	"res/fighter/wyd-1_01.png",
                // 	"res/fighter/wyd-1_02.png",
                // 	"res/fighter/wyd-1_03.png",
                // 	"res/fighter/wyd-1_04.png",
                // 	"res/fighter/wyd-1_05.png",
                // 	"res/fighter/wyd-1_06.png",
                // 	"res/fighter/wyd-1_07.png",
                // 	"res/fighter/wyd-1_08.png",
                // 	"res/fighter/yd-6_01.png",
                // 	"res/fighter/yd-6_02.png",
                // 	"res/fighter/yd-6_03.png",
                // 	"res/fighter/yd-6_04.png",
                // 	"res/fighter/yd-6_05.png",
                // 	"res/fighter/yd-6_06.png",
                // 	"res/fighter/yd-6_07.png",
                // 	"res/fighter/yd-6_08.png",
                // ];
                var ani2 = new Laya.Animation();
                ani2.source = character4.join(',');
                // ani2.play(undefined,undefined,'FF15');
                ani2.play(undefined, undefined, 'FF15');
                ani2.x = 100;
                Laya.stage.addChild(ani2);
                // console.log(ani.frames.length,ani.frames, '``````````````!!!!!!!!!!!!!!!!!');
            });
            // ani.interval = 30;			// 设置播放间隔（单位：毫秒）
            // ani.index = 2; 				// 当前播放索引
            // ani.play('pp0',false); 				// 播放图集动画
            // 获取动画的边界信息
            // var bounds = ani.getGraphicBounds();
            // ani.pivot(bounds.width / 2, bounds.height / 2);
            // ani.pos(Laya.stage.width / 2, Laya.stage.height / 2);
            console.log(ani.frames.length, ani.frames, '``````````````!!!!!!!!!!!!!!!!!');
            Laya.stage.addChild(ani);
        }, undefined, true), null, Laya.Loader.ATLAS);
    }
    return HelloAni;
}());
Laya.init(550, 400, Laya.WebGL);
Laya.stage.bgColor = '#d8d8d8';
Laya.loader.on(Laya.Event.COMPLETE, this, function (oo) {
    console.log('Laya.loader on COMPLETE', oo); //不會觸發 Laya.Event.LOADED
});
var HelloAni2 = /** @class */ (function () {
    function HelloAni2() {
        Laya.loader.load("res/atlas/ani.atlas", Laya.Handler.create(this, this.onLoaded));
    }
    HelloAni2.prototype.onLoaded = function () {
        var tl = new Laya.Animation();
        tl.loadAnimation("AAAAN.ani");
        Laya.stage.addChild(tl);
        tl.y = 100;
        tl.x = 100;
        tl.play(undefined, undefined, 'tootoo');
    };
    return HelloAni2;
}());
new HelloAni2();
new HelloAni();
//# sourceMappingURL=HelloAni.js.map