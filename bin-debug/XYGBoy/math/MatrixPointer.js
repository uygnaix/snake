var XYGBoy;
(function (XYGBoy) {
    /**
     *
     * @author Xiang.y
     *
     */
    var MatrixPointer = (function () {
        function MatrixPointer(row, col) {
            if (row === void 0) { row = 0; }
            if (col === void 0) { col = 0; }
            this.row = row, this.col = col;
        }
        var d = __define,c=MatrixPointer,p=c.prototype;
        return MatrixPointer;
    }());
    XYGBoy.MatrixPointer = MatrixPointer;
    egret.registerClass(MatrixPointer,'XYGBoy.MatrixPointer');
})(XYGBoy || (XYGBoy = {}));
