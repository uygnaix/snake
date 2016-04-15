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
                tmxTileMap.x = -200;
                tmxTileMap.render();
                self.addChild(tmxTileMap);
            }, url);
            urlLoader.load(new egret.URLRequest(url));
        };
        return JadeScene;
    }(egret.DisplayObjectContainer));
    jade.JadeScene = JadeScene;
    egret.registerClass(JadeScene,'jade.JadeScene');
    var VillageExample = (function (_super) {
        __extends(VillageExample, _super);
        function VillageExample() {
            _super.call(this);
            var self = this;
            this.width = 500;
            this.height = 500;
            this._opacity = 1;
            var url = 'resource/assets/gboy/bg.png';
            if (url == null || url == "")
                return;
            RES.getResByUrl(url, function (texture) {
                if (texture) {
                    if (this._sourcebitmap == null) {
                        this._sourcebitmap = new egret.Bitmap();
                    }
                    this._sourcebitmap.texture = texture;
                    this._texture = texture;
                    self.draw(new egret.Rectangle(0, 0, self.width, self.height));
                }
            }, this, RES.ResourceItem.TYPE_IMAGE);
        }
        var d = __define,c=VillageExample,p=c.prototype;
        ;
        p.draw = function (rect) {
            // this.addChild(this._sourcebitmap);
            var renderTexture = new egret.RenderTexture();
            var brect = new egret.Rectangle(this.x, this.y, this._sourcebitmap.width, this._sourcebitmap.height);
            rect = brect.intersection(rect);
            rect.right = this.width;
            rect.bottom = this.height;
            //补充可能缺失的部分像素区域
            // renderTexture.drawToTexture(this._sourcebitmap);
            renderTexture.drawToTexture(this._sourcebitmap, rect);
            this._bitmap = new egret.Bitmap();
            this._bitmap.texture = renderTexture;
            this._bitmap.alpha = this._opacity;
            this._bitmap.visible = this.visible;
            this.addChild(this._bitmap);
        };
        return VillageExample;
    }(egret.DisplayObjectContainer));
    jade.VillageExample = VillageExample;
    egret.registerClass(VillageExample,'jade.VillageExample');
    /**
     * 以下示例演示了使用 RenderTexture 类绘制显示对象。
     */
    var RenderTextureExample = (function (_super) {
        __extends(RenderTextureExample, _super);
        function RenderTextureExample() {
            _super.call(this);
            this.startLoad();
        }
        var d = __define,c=RenderTextureExample,p=c.prototype;
        p.startLoad = function () {
            //创建 URLLoader 对象
            var loader = new egret.URLLoader();
            //设置加载方式为纹理
            loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
            //添加加载完成侦听
            loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            var url = "resource/assets/gboy/bg.png";
            var request = new egret.URLRequest(url);
            //开始加载
            loader.load(request);
        };
        p.onLoadComplete = function (event) {
            var loader = event.target;
            //获取加载到的纹理对象
            var texture = loader.data;
            //使用 RenderTexture 进行显示
            var renderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(new egret.Bitmap(texture));
            //将绘制好的 RenderTexture 进行显示
            var bitmap = new egret.Bitmap(renderTexture);
            this.addChild(bitmap);
        };
        return RenderTextureExample;
    }(egret.DisplayObjectContainer));
    jade.RenderTextureExample = RenderTextureExample;
    egret.registerClass(RenderTextureExample,'jade.RenderTextureExample');
})(jade || (jade = {}));
