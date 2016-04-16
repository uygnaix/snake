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
            }, url);
            urlLoader.load(new egret.URLRequest(url));
        };
        return JadeScene;
    }(egret.DisplayObjectContainer));
    jade.JadeScene = JadeScene;
    egret.registerClass(JadeScene,'jade.JadeScene');
})(jade || (jade = {}));
