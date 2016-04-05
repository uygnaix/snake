var XYGBoy;
(function (XYGBoy) {
    /**
     *
     * @author
     *
     */
    var Dot = (function (_super) {
        __extends(Dot, _super);
        function Dot(size, status) {
            if (status === void 0) { status = DotStatus.OFF; }
            _super.call(this);
            this.flickerDelay = 250;
            this.status = status;
            this.width = size;
            this.height = size;
            this.size = size;
            this.renderTexture();
        }
        var d = __define,c=Dot,p=c.prototype;
        p.getStatus = function () {
            return this.status;
        };
        p.setStatus = function (status) {
            this.status = status;
            this.renderTexture();
        };
        p.turnOn = function () {
            this.stopFlicker();
            this.setStatus(DotStatus.ON);
        };
        p.flicker = function (delay) {
            if (delay === void 0) { delay = 250; }
            this.setStatus(DotStatus.FLICKER);
            this.timer = new egret.Timer(delay, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.doFlicker, this);
            this.timer.start();
        };
        p.doFlicker = function () {
            if (this.texture == DotTextures.getInstance().TEXTURE_ON) {
                this.texture = DotTextures.getInstance().TEXTURE_OFF;
            }
            else {
                this.texture = DotTextures.getInstance().TEXTURE_ON;
            }
        };
        p.stopFlicker = function () {
            if (this.timer)
                this.timer.stop();
        };
        p.turnOff = function () {
            this.stopFlicker();
            this.setStatus(DotStatus.OFF);
        };
        p.renderTexture = function () {
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
        };
        p.setPosition = function (row, col, size) {
            this.x = col * size;
            this.y = row * size;
        };
        p.clone = function () {
            return new Dot(this.size, this.status);
        };
        return Dot;
    }(egret.Bitmap));
    XYGBoy.Dot = Dot;
    egret.registerClass(Dot,'XYGBoy.Dot');
    (function (DotStatus) {
        DotStatus[DotStatus["OFF"] = 0] = "OFF";
        DotStatus[DotStatus["FLICKER"] = 1] = "FLICKER";
        DotStatus[DotStatus["ON"] = 2] = "ON";
    })(XYGBoy.DotStatus || (XYGBoy.DotStatus = {}));
    var DotStatus = XYGBoy.DotStatus;
    /**
     * 单例模式
     */
    var DotTextures = (function () {
        function DotTextures() {
            this.TEXTURE_ON = RES.getRes('on_png');
            this.TEXTURE_OFF = RES.getRes('off_png');
        }
        var d = __define,c=DotTextures,p=c.prototype;
        DotTextures.getInstance = function () {
            if (DotTextures.instance == null) {
                DotTextures.instance = new DotTextures();
            }
            return DotTextures.instance;
        };
        return DotTextures;
    }());
    egret.registerClass(DotTextures,'DotTextures');
})(XYGBoy || (XYGBoy = {}));
