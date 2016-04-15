module jade {
  import error = egret.error;
  /**
   *
   * @author Xiang.y
   *
   */
  export class JadeScene extends egret.DisplayObjectContainer {

    public constructor(width:number, height:number) {
      super();
      this.width = width;
      this.height = height;
      this.tiledMap();
    }

    private tiledMap() {
      var self = this;
      var url:string = "resource/assets/jade/jade.tmx";
      var urlLoader:egret.URLLoader = new egret.URLLoader();
      urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
      //load complete
      urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {
        var data:any = egret.XML.parse(event.target.data);
        var tmxTileMap:tiled.TMXTilemap = new tiled.TMXTilemap(960, 960, data, this);
        tmxTileMap.x = -200;
        tmxTileMap.render();
        self.addChild(tmxTileMap);
      }, url);
      urlLoader.load(new egret.URLRequest(url));
    }
  }
  export class VillageExample extends egret.DisplayObjectContainer {
    private _sourcebitmap;
    private _bitmap;
    private _opacity;

    public constructor() {
      super();
      var self = this;
      this.width = 500;
      this.height = 500;
      this._opacity =1;
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
          // this.dispatchEvent(new tiled.TMXImageLoadEvent(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, texture));
        }
      }, this, RES.ResourceItem.TYPE_IMAGE);
    };

    public draw(rect) {
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
    }
  }


  /**
   * 以下示例演示了使用 RenderTexture 类绘制显示对象。
   */
  export class RenderTextureExample extends egret.DisplayObjectContainer {
    public constructor() {
      super();

      this.startLoad();
    }

    private startLoad():void {
      //创建 URLLoader 对象
      var loader:egret.URLLoader = new egret.URLLoader();
      //设置加载方式为纹理
      loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
      //添加加载完成侦听
      loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
      var url:string = "resource/assets/gboy/bg.png";
      var request:egret.URLRequest = new egret.URLRequest(url);
      //开始加载
      loader.load(request);
    }

    private onLoadComplete(event:egret.Event):void {
      var loader:egret.URLLoader = <egret.URLLoader>event.target;
      //获取加载到的纹理对象
      var texture:egret.Texture = <egret.Texture>loader.data;
      //使用 RenderTexture 进行显示
      var renderTexture:egret.RenderTexture = new egret.RenderTexture();
      renderTexture.drawToTexture(new egret.Bitmap(texture));

      //将绘制好的 RenderTexture 进行显示
      var bitmap:egret.Bitmap = new egret.Bitmap(renderTexture);
      this.addChild(bitmap);
    }
  }
}
