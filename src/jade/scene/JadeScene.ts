module jade {
    import error = egret.error;
    import tr = egret.sys.tr;
    import TMXLayer = tiled.TMXLayer;
    /**
     *
     * @author Xiang.y
     *
     */
    export class JadeScene extends egret.DisplayObjectContainer {

        private tileMap:tiled.TMXTilemap;
        private layer:tiled.TMXLayer;
        public constructor(width:number, height:number) {
            super();
            this.width = width;
            this.height = height;
            this.loadTiledMap();
            this.enemy();
            this.getLayer();
        }

        private loadTiledMap() {
            var url:string = "resource/assets/jade/jade.tmx";
            var data = egret.XML.parse(RES.getRes('jade_tmx'));
            this.tileMap = new tiled.TMXTilemap(960,960,data,url);
            this.tileMap.render();
            // this.tileMap.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event))
            this.addChild(this.tileMap);
        }
        private getLayer(){
            var layers = this.tileMap.getLayers();
            for(var layer of layers){
                console.dir(layer);
                if(layer instanceof tiled.TMXLayer){
                    this.layer = layer;
                    console.dir(this.layer);
                    this.layer.touchEnabled = true;
                    this.layer.addEventListener(egret.TouchEvent.TOUCH_TAP,function(event){
                        console.dir(event);
                    },this);
                }
            }
        }

        private enemy() {

            var mvDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes('212_json'), RES.getRes('212_png'));
            var mc:egret.MovieClip = new egret.MovieClip(mvDataFactory.generateMovieClipData('move'));
            this.addChild(mc);
            mc.frameRate=3;
            mc.gotoAndPlay('down',-1);
        }

    }
}
