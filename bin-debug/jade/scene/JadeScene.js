var jade;
(function (jade) {
    /**
     *
     * @author Xiang.y
     *
     */
    var JadeScene = (function (_super) {
        __extends(JadeScene, _super);
        // private tileMap:tiled.TMXTilemap;
        // private layer:tiled.TMXLayer;
        function JadeScene(width, height) {
            _super.call(this);
            this.width = width;
            this.height = height;
            this.loadTiledMap();
            this.getLayer();
            this.loadPlayer();
            this.loadTower();
        }
        var d = __define,c=JadeScene,p=c.prototype;
        p.loadTiledMap = function () {
            var url = "resource/assets/jade/jade.tmx";
            var data = egret.XML.parse(RES.getRes('jade_tmx'));
            // this.tileMap = new tiled.TMXTilemap(960, 960, data, url);
            // this.tileMap.render();
            // this.tileMap.x = 0;
            // this.tileMap.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event))
            // this.addChild(this.tileMap);
        };
        p.loadPlayer = function () {
            var en = new jade.Enemy('212_json', '212_png');
            en.x = jade.Tile.height * 5;
            en.y = jade.Tile.height * 5;
            this.addChild(en);
        };
        p.loadTower = function () {
            // this.layer.setTile(10,5,25);
            // this.layer.setTile(11,5,1);
        };
        p.getLayer = function () {
            // var layers = this.tileMap.getLayers();
            // for (var layer of layers) {
            //     if (layer instanceof tiled.TMXLayer) {
            //         this.layer = layer;
            //         this.layer.touchEnabled = true;
            //         var map = this.tileMap;
            //         this.layer.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            //             var tile = layer.getTile(event.localX, event.localY);
            //             tile = layer.setTile(tile.tileX, tile.tileY, ++tile.gid);
            //             layer.renderer.drawTile(layer.staticContainer, tile.tileX, tile.tileY, tile);
            //         }, this);
            //     }
            // }
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
