var XYGBoy;
(function (XYGBoy) {
    /**
     *
     * @author Xiang.y
     *
     */
    var Matrix = (function () {
        function Matrix(row, col, defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0; }
            this.row = row;
            this.column = col;
            this.matrix = new Array();
            for (var i = 0; i < row; i++) {
                this.matrix[i] = new Array();
                for (var j = 0; j < col; j++) {
                    this.matrix[i][j] = defaultValue;
                }
            }
        }
        var d = __define,c=Matrix,p=c.prototype;
        p.setValue = function (row, col, value) {
            if (value === void 0) { value = 0; }
            this.matrix[row][col] = value;
        };
        p.getValue = function (row, col) {
            return this.matrix[row][col];
        };
        p.getRow = function () {
            return this.row;
        };
        p.getColumn = function () {
            return this.column;
        };
        return Matrix;
    }());
    XYGBoy.Matrix = Matrix;
    egret.registerClass(Matrix,'XYGBoy.Matrix');
})(XYGBoy || (XYGBoy = {}));
