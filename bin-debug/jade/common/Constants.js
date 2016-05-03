/**
 * Created by xiang on 5/3/16.
 */
var jade;
(function (jade) {
    var Tile = (function () {
        function Tile() {
        }
        var d = __define,c=Tile,p=c.prototype;
        Tile.width = 48;
        Tile.height = 48;
        return Tile;
    }());
    jade.Tile = Tile;
    egret.registerClass(Tile,'jade.Tile');
    var Time = (function () {
        function Time() {
        }
        var d = __define,c=Time,p=c.prototype;
        Time.second = function (sec) {
            return sec * 1000;
        };
        Time.minute = function (min) {
            return this.second(60 * min);
        };
        Time.hour = function (hour) {
            return this.minute(60 * hour);
        };
        return Time;
    }());
    jade.Time = Time;
    egret.registerClass(Time,'jade.Time');
})(jade || (jade = {}));
