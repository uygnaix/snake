var XYGBoy;
(function (XYGBoy) {
    /**
     *
     * @author Xiang.y
     * 点阵图
     *
     */
    var DotMap = (function (_super) {
        __extends(DotMap, _super);
        function DotMap(row, col, dotSize) {
            _super.call(this);
            this.row = row;
            this.column = col;
            this.dotSize = dotSize;
            this.width = col * dotSize;
            this.height = row * dotSize;
            this.initDotMap(row, col);
            this.cursor = this.getCursor();
        }
        var d = __define,c=DotMap,p=c.prototype;
        p.initDotMap = function (row, col, templateDot) {
            if (templateDot === void 0) { templateDot = null; }
            this.dotMap = new Array();
            for (var i = 0; i < row; i++) {
                this.dotMap[i] = new Array();
                for (var j = 0; j < col; j++) {
                    var dot = templateDot == null ? new XYGBoy.Dot(this.dotSize, XYGBoy.DotStatus.OFF) : templateDot.clone();
                    dot.setPosition(i, j, this.dotSize);
                    this.dotMap[i][j] = dot;
                    //调整dot位置
                    this.addChild(dot);
                }
            }
        };
        p.resize = function () {
            return true;
        };
        p.getRow = function () {
            return this.row;
        };
        p.getColumn = function () {
            return this.column;
        };
        p.getCursor = function () {
            if (this.cursor == null) {
                this.cursor = new DotMapPointer();
            }
            return this.cursor;
        };
        p.getCursorRow = function () {
            return this.cursor.row;
        };
        p.getCursorColumn = function () {
            return this.cursor.column;
        };
        p.setCursorByPointer = function (pointer) {
            return this.setCursor(pointer.row, pointer.column);
        };
        /**
         * @returns true表示未越界，设置游标成功
         */
        p.setCursor = function (row, col) {
            if (row === void 0) { row = 0; }
            if (col === void 0) { col = 0; }
            if (row >= this.row) {
                row = this.row - 1;
            }
            if (row < 0) {
                row = 0;
            }
            if (col >= this.column) {
                col = this.column - 1;
            }
            if (col < 0) {
                col = 0;
            }
            this.cursor.row = row;
            this.cursor.column = col;
            return true;
        };
        p.setCursorRow = function (row) {
            if (row === void 0) { row = 0; }
            this.cursor.row = row;
        };
        p.setCursorColumn = function (col) {
            if (col === void 0) { col = 0; }
            this.cursor.column = col;
        };
        p.getDotAtCursor = function () {
            return this.getDotAt(this.cursor.row, this.cursor.column);
        };
        p.getDotAt = function (row, col) {
            return this.dotMap[row][col];
        };
        p.turnOnDotAtCursor = function () {
            this.turnOnDotAt(this.cursor.row, this.cursor.column);
        };
        p.turnOnDotAt = function (row, col) {
            this.getDotAt(row, col).turnOn();
        };
        p.turnOnDotAtGroup = function (group) {
            for (var i in group.points) {
                this.turnOnDotAtPointer(group.getAt(i));
            }
        };
        p.turnOnDotAtPointer = function (pointer) {
            this.setCursorByPointer(pointer);
            this.turnOnDotAtCursor();
        };
        p.turnOffDotAtCursor = function () {
            this.turnOffDotAt(this.cursor.row, this.cursor.column);
        };
        p.turnOffDotAtGroup = function (group) {
            for (var i in group.points) {
                this.turnOffDotAtPointer(group.getAt(i));
            }
        };
        p.turnOffDotAtPointer = function (pointer) {
            this.setCursorByPointer(pointer);
            this.turnOffDotAtCursor();
        };
        p.turnOffDotAt = function (row, col) {
            this.getDotAt(row, col).turnOff();
        };
        p.turnOffAllDot = function () {
            for (var row in this.dotMap) {
                for (var col in this.dotMap[row]) {
                    this.dotMap[row][col].turnOff();
                }
            }
        };
        p.flickerDotAtPointer = function (pointer) {
            this.setCursorByPointer(pointer);
            this.flickerDotAtCursor();
        };
        p.flickerDotAtCursor = function () {
            this.getDotAtCursor().flicker();
        };
        return DotMap;
    })(egret.DisplayObjectContainer);
    XYGBoy.DotMap = DotMap;
    egret.registerClass(DotMap,'XYGBoy.DotMap');
    var DotMapPointer = (function () {
        function DotMapPointer(row, col) {
            if (row === void 0) { row = 0; }
            if (col === void 0) { col = 0; }
            this.row = row;
            this.column = col;
        }
        var d = __define,c=DotMapPointer,p=c.prototype;
        p.equals = function (pointer) {
            return pointer && this.row == pointer.row && this.column == pointer.column;
        };
        p.clone = function () {
            return new DotMapPointer(this.row, this.column);
        };
        p.set = function (pointer) {
            this.row = pointer.row;
            this.column = pointer.column;
        };
        return DotMapPointer;
    })();
    XYGBoy.DotMapPointer = DotMapPointer;
    egret.registerClass(DotMapPointer,'XYGBoy.DotMapPointer');
    var DotMapPointerGroup = (function () {
        function DotMapPointerGroup() {
            this.points = new Array();
        }
        var d = __define,c=DotMapPointerGroup,p=c.prototype;
        p.getAt = function (i) {
            return this.points[i];
        };
        p.setAt = function (value, i) {
            this.points[i] = value;
        };
        p.first = function () {
            return this.points[0];
        };
        p.last = function () {
            return this.points[this.points.length - 1];
        };
        p.size = function () {
            return this.points.length;
        };
        return DotMapPointerGroup;
    })();
    XYGBoy.DotMapPointerGroup = DotMapPointerGroup;
    egret.registerClass(DotMapPointerGroup,'XYGBoy.DotMapPointerGroup');
    var DotMapDirector = (function () {
        function DotMapDirector(row, col) {
            if (row === void 0) { row = 0; }
            if (col === void 0) { col = 0; }
            this.row = row;
            this.column = col;
        }
        var d = __define,c=DotMapDirector,p=c.prototype;
        p.getStatus = function () {
            return this.status;
        };
        p.stop = function () {
            this.row = 0;
            this.column = 0;
            this.status = DotMapDirection.STAND;
        };
        p.up = function () {
            this.row = -1;
            this.column = 0;
            this.status = DotMapDirection.UP;
        };
        p.down = function () {
            this.row = 1;
            this.column = 0;
            this.status = DotMapDirection.DOWN;
        };
        p.left = function () {
            this.row = 0;
            this.column = -1;
            this.status = DotMapDirection.LEFT;
        };
        p.right = function () {
            this.row = 0;
            this.column = 1;
            this.status = DotMapDirection.RIGHT;
        };
        return DotMapDirector;
    })();
    XYGBoy.DotMapDirector = DotMapDirector;
    egret.registerClass(DotMapDirector,'XYGBoy.DotMapDirector');
    (function (DotMapDirection) {
        DotMapDirection[DotMapDirection["STAND"] = 0] = "STAND";
        DotMapDirection[DotMapDirection["UP"] = 1] = "UP";
        DotMapDirection[DotMapDirection["DOWN"] = 2] = "DOWN";
        DotMapDirection[DotMapDirection["LEFT"] = 3] = "LEFT";
        DotMapDirection[DotMapDirection["RIGHT"] = 4] = "RIGHT";
    })(XYGBoy.DotMapDirection || (XYGBoy.DotMapDirection = {}));
    var DotMapDirection = XYGBoy.DotMapDirection;
})(XYGBoy || (XYGBoy = {}));
