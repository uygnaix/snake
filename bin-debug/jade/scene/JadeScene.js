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
        p.enemy = function () {
            var mvDataFactory = new egret.MovieClipDataFactory(RES.getRes('212_json'), RES.getRes('212_png'));
            var mc = new egret.MovieClip(mvDataFactory.generateMovieClipData('move'));
            this.addChild(mc);
            mc.frameRate = 3;
            mc.gotoAndPlay('down', -1);
            mc.x = 5 * jade.Tile.width;
            mc.y = 7 * jade.Tile.height;
            var tw = egret.Tween.get(mc);
            tw.to({
                y: 5 * jade.Tile.height
            }, jade.Time.second(6))
                .to({
                x: 4 * jade.Tile.width
            }, jade.Time.second(4));
        };
        return JadeScene;
    }(egret.DisplayObjectContainer));
    jade.JadeScene = JadeScene;
    egret.registerClass(JadeScene,'jade.JadeScene');
})(jade || (jade = {}));
