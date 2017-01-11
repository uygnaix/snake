module XYMount {
    export class MountCurve implements ICurve {

        /**
         * 曲线方程
         */
        public fun(x: number): number {
            return Math.sin(x) * x;
        }
    }
}