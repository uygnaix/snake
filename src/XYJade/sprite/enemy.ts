module jade{
    import Sprite = egret.Sprite;
    import MovieClipDataFactory = egret.MovieClipDataFactory;
    import MovieClip = egret.MovieClip;

    export class Enemy extends Sprite{

        private json:string;
        private sheet:string;
        private face;
        private foot;

        public constructor(json:string,sheet:string){
            super();
            this.json = json;
            this.sheet = sheet;
            this.loadFace();
        }

        private loadFace(){
            this.face = new MovieClipDataFactory(RES.getRes(this.json), RES.getRes(this.sheet));
            var mc:MovieClip = new egret.MovieClip(this.face.generateMovieClipData('move'));
            this.addChild(mc);
            mc.frameRate = 3;
            mc.gotoAndPlay('down',-1);
        }
    }
}