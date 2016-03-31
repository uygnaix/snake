module XYGBoy {
    /**
     *
     * @author
     *
     */
    export class Dot extends egret.Bitmap {


        private status:DotStatus;
        private size:number;

        public constructor(size:number, status = DotStatus.OFF) {
            super();
            this.status = status;
            this.width = size;
            this.height = size;
            this.size = size;
            this.renderTexture();
        }

        private setStatus(status:DotStatus) {
            this.status = status;
            this.renderTexture();
        }

        public turnOn() {
            this.setStatus(DotStatus.ON);
        }

        public turnOff() {
            this.setStatus(DotStatus.OFF);
        }

        private renderTexture() {
            if (this.status == DotStatus.ON) {
                this.texture = DotTextures.getInstance().TEXTURE_ON;
            } else {
                this.texture = DotTextures.getInstance().TEXTURE_OFF;
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
    export enum DotStatus { OFF, ON }
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
