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
            this.tiledMap();
        }
        var d = __define,c=JadeScene,p=c.prototype;
        p.tiledMap = function () {
            var self = this;
            var url = "resource/assets/jade/jade.tmx";
            var urlLoader = new egret.URLLoader();
            urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            //load complete
            urlLoader.addEventListener(egret.Event.COMPLETE, function (event) {
                var data = egret.XML.parse(event.target.data);
                var tmxTileMap = new tiled.TMXTilemap(960, 960, data, this);
                tmxTileMap.render();
                self.addChild(tmxTileMap);
                self.enemy();
            }, url);
            urlLoader.load(new egret.URLRequest(url));
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
