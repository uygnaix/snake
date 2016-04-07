module XYGBoy {
    /**
     *
     * @author
     *
     */
    export class Dot extends egret.Bitmap {


        private status:DotStatus;
        private size:number;
        private timer:egret.Timer;
        private flickerDelay:number=250;

        public constructor(size:number, status = DotStatus.OFF) {
            super();
            this.status = status;
            this.width = size;
            this.height = size;
            this.size = size;
            this.renderTexture();
        }
        public getStatus():DotStatus{
            return this.status;
        }
        private setStatus(status:DotStatus) {
            this.status = status;
            this.renderTexture();
        }

        public turnOn() {
            this.stopFlicker();
            this.setStatus(DotStatus.ON);
        }
        
        public flicker(delay:number = 250){
            this.setStatus(DotStatus.FLICKER);
            this.timer = new egret.Timer(delay,0);
            this.timer.addEventListener(egret.TimerEvent.TIMER,this.doFlicker,this);
            this.timer.start();
        }
        private doFlicker(){
            if(this.texture == DotTextures.getInstance().TEXTURE_ON){
                this.texture = DotTextures.getInstance().TEXTURE_OFF;
            }else{
                this.texture = DotTextures.getInstance().TEXTURE_ON;
            }
        }
        private stopFlicker(){
            if(this.timer)
                this.timer.stop();
        }

        public turnOff() {
            this.stopFlicker();
            this.setStatus(DotStatus.OFF);
        }

        private renderTexture() {
            switch (this.status) {
                case DotStatus.ON:
                    this.texture = DotTextures.getInstance().TEXTURE_ON;
                    break;
                case DotStatus.OFF:
                default:
                    this.texture = DotTextures.getInstance().TEXTURE_OFF;
                    this.timer = null;
                    break;
                case DotStatus.FLICKER:
                    break;
            }
        }

        public setPosition(row:number, col:number, size:number) {
            this.x = col * size;
            this.y = row * size;
        }

        public clone():Dot {
            return new Dot(this.size, this.status);
        }

    }
    export enum DotStatus { OFF,FLICKER,ON}
    /**
     * 单例模式
     */
    class DotTextures {
        private static instance:DotTextures;

        public static getInstance() {
            if (DotTextures.instance == null) {
                DotTextures.instance = new DotTextures();
            }
            return DotTextures.instance;
        }

        public TEXTURE_ON:egret.Texture;
        public TEXTURE_OFF:egret.Texture;

        public constructor() {
            this.TEXTURE_ON = RES.getRes('on_png');
            this.TEXTURE_OFF = RES.getRes('off_png');
        }
    }

}
