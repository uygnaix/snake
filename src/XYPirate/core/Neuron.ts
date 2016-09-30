/**
 * Created by xiang on 9/29/16.
 */
module XY {
    /**
     * 神经细胞
     */
    export class Neuron {
        //输入个数
        public inputSize:number;
        //输入权重
        public weights:[number] = [];
        //偏移量,阈值
        public offset:number;

        constructor(size:number) {
            this.inputSize = size;
            for (var i = 0; i < size; i++) {
                //随机权重
                this.weights.push(Neuron.randomWeight())
            }
        }

        /**
         * 随机产生-1.0到1.0的权重
         * @returns {number}
         */
        private static randomWeight():number {
            return Math.random() * 2 - 1;
        }

    }
    /**
     * 神经细胞层
     */
    export class NeuronLayer extends Array<Neuron>{
        constructor(size:number){
            super(size);
        }
    }

    /**
     * 神经细胞网络
     */
    export class NeuronNet{
        public inputSize:number;
        public outputSize:number;
        public layers:[NeuronLayer]=[];

        constructor(){

        }

        public createNet(){

        }

        /**
         * 读取所有权重
         */
        public getAllWeights():[number]{

        }

        /**
         * 读取所有权重和
         */
        public getSumOfWeights():number{
            return 0;
        }

        /**
         * 设置所有权重　
         * @param weights
         */
        public setAllWeights(weights:[number]){

        }


    }
}