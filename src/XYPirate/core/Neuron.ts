/**
 * Created by xiang on 9/29/16.
 */
module XY {
    export class Neuron {
        //输入个数
        public size:number;
        //输入权重
        public weights:Array<number>;
        //偏移量
        public offset:number;

        private randomWeight():number{
            return Math.random();
        }

    }
}