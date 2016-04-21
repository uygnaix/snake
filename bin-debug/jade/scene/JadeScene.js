var jade;
(function (jade) {
    /**
     *
     * @author Xiang.y
     *
     */
    var JadeScene = (function (_super) {
        __extends(JadeScene, _super);
        function JadeScene(width, height) {
            _super.call(this);
            this.width = width;
            this.height = height;
            this.loadTiledMap();
            this.enemy();
            this.getLayer();
        }
        var d = __define,c=JadeScene,p=c.prototype;
        p.loadTiledMap = function () {
            var url = "resource/assets/jade/jade.tmx";
            var data = egret.XML.parse(RES.getRes('jade_tmx'));
            this.tileMap = new tiled.TMXTilemap(960, 960, data, url);
            this.tileMap.render();
            // this.tileMap.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event))
            this.addChild(this.tileMap);
        };
        p.getLayer = function () {
            var layers = this.tileMap.getLayers();
            for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
                var layer = layers_1[_i];
                console.dir(layer);
                if (layer instanceof tiled.TMXLayer) {
                    this.layer = layer;
                    console.dir(this.layer);
                    this.layer.touchEnabled = true;
                    this.layer.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                        console.dir(event);
                    }, this);
                }
            }
        };
        p.enemy = function () {
            var mvDataFactory = new egret.MovieClipDataFactory(RES.getRes('212_json'), RES.getRes('212_png'));
            var mc = new egret.MovieClip(mvDataFactory.generateMovieClipData('move'));
            this.addChild(mc);
            mc.frameRate = 3;
            mc.gotoAndPlay('down', -1);
        };
        return JadeScene;
    }(egret.DisplayObjectContainer));
    jade.JadeScene = JadeScene;
    egret.registerClass(JadeScene,'jade.JadeScene');
})(jade || (jade = {}));
