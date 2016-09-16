module XYGBoy {
    /**
     *
     * @author Xiang.y
     *
     */
    export class Matrix {
        public constructor(row:number, col:number, defaultValue = 0) {
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

        /**          * 点阵矩阵,二维数组          */
        private matrix;
        private row:number;
        private column:number;

        public setValue(row:number, col:number, value = 0) {
            this.matrix[row][col] = value;
        }

        public getValue(row:number, col:number) {
            return this.matrix[row][col];
        }

        public getRow():number {
            return this.row;
        }

        public getColumn():number {
            return this.column;
        }


    }
}
