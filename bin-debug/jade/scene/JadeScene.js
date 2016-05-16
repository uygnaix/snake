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
            this.getLayer();
        }
        var d = __define,c=JadeScene,p=c.prototype;
        p.loadTiledMap = function () {
            var url = "resource/assets/jade/jade.tmx";
            var data = egret.XML.parse(RES.getRes('jade_tmx'));
            this.tileMap = new tiled.TMXTilemap(960, 960, data, url);
            this.tileMap.render();
            this.tileMap.x = 0;
            // this.tileMap.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event))
            this.addChild(this.tileMap);
        };
        p.getLayer = function () {
            var layers = this.tileMap.getLayers();
            for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
                var layer = layers_1[_i];
                if (layer instanceof tiled.TMXLayer) {
                    this.layer = layer;
                    this.layer.touchEnabled = true;
                    var map = this.tileMap;
                    this.layer.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                        var tile = layer.getTile(event.localX, event.localY);
                        tile = layer.setTile(tile.tileX, tile.tileY, ++tile.gid);
                        layer.renderer.drawTile(layer.staticContainer, tile.tileX, tile.tileY, tile);
                    }, this);
                }
            }
        };
        p.fire = function (x, y) {
            if (x == null) {
                x = 100;
            }
            if (y == null) {
                y = 100;
            }
            var mvDataFactory = new egret.MovieClipDataFactory(RES.getRes('3-1_json'), RES.getRes('3-1_png'));
            var mc = new egret.MovieClip(mvDataFactory.generateMovieClipData('fire'));
            this.parent.addChild(mc);
            mc.frameRate = 5;
            mc.gotoAndPlay('call', -1);
            mc.x = x;
            mc.y = y;
        };
        return JadeScene;
    }(egret.DisplayObjectContainer));
    jade.JadeScene = JadeScene;
    egret.registerClass(JadeScene,'jade.JadeScene');
})(jade || (jade = {}));
