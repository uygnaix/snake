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
        private tiledMap(){
            var self = this;
            var url:string = "resource/assets/jade/jade.tmx";
            var urlLoader:egret.URLLoader = new egret.URLLoader();
            urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            //load complete
            urlLoader.addEventListener(egret.Event.COMPLETE,function(event:egret.Event):void{
                var data: any = egret.XML.parse(event.target.data);
                var tmxTileMap:tiled.TMXTilemap = new tiled.TMXTilemap(960,960,data,this);
                tmxTileMap.render();
                self.addChild(tmxTileMap);
            },url);
            urlLoader.load(new egret.URLRequest(url));
        }
    }
}
