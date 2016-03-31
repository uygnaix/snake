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
            if (status === void 0) {
                status = DotStatus.OFF;
            }
            _super.call(this);
            this.status = status;
            this.width = size;
            this.height = size;
            this.size = size;
            this.renderTexture();
        }

        var d = __define, c = Dot, p = c.prototype;
        p.setStatus = function (status) {
            this.status = status;
            this.renderTexture();
        };
        p.turnOn = function () {
            this.setStatus(DotStatus.ON);
        };
        p.turnOff = function () {
            this.setStatus(DotStatus.OFF);
        };
        p.renderTexture = function () {
            if (this.status == DotStatus.ON) {
                this.texture = DotTextures.getInstance().TEXTURE_ON;
            }
            else {
                this.texture = DotTextures.getInstance().TEXTURE_OFF;
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
    })(egret.Bitmap);
    XYGBoy.Dot = Dot;
    egret.registerClass(Dot, 'XYGBoy.Dot');
    (function (DotStatus) {
        DotStatus[DotStatus["OFF"] = 0] = "OFF";
        DotStatus[DotStatus["ON"] = 1] = "ON";
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

        var d = __define, c = DotTextures, p = c.prototype;
        DotTextures.getInstance = function () {
            if (DotTextures.instance == null) {
                DotTextures.instance = new DotTextures();
            }
            return DotTextures.instance;
        };
        return DotTextures;
    })();
    egret.registerClass(DotTextures, 'DotTextures');
})(XYGBoy || (XYGBoy = {}));
