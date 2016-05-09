/**
 * Created by xiang on 5/4/16.
 */
var jade;
(function (jade) {
    var GameLayer = (function (_super) {
        __extends(GameLayer, _super);
        function GameLayer() {
            _super.call(this);
            this.addLayer();
        }
        var d = __define,c=GameLayer,p=c.prototype;
        p.addLayer = function () {
        };
        return GameLayer;
    }(egret.DisplayObjectContainer));
    jade.GameLayer = GameLayer;
    egret.registerClass(GameLayer,'jade.GameLayer');
})(jade || (jade = {}));
