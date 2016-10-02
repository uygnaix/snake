/**
 * Created by xiang on 9/29/16.
 */
module XYSweeper {
    import create = egret_native.Texture.create;
    /**
     * 神经细胞
     */
    export class Neuron {

        //输入个数
        public inputSize:number;
        //输入权重
        public weights:[number] = [];
        //偏移量,阈值的权制
        public offsetWeight:number;

        constructor(inputSize:number) {
            this.inputSize = inputSize;
            for (var i = 0; i < inputSize; i++) {
                //随机权重
                this.weights.push(NeuronHelper.randomWeight())
            }
            this.offsetWeight = NeuronHelper.randomWeight();
        }

        public compute(input:[number]):number {
            var output:number = 0;
            if (input || this.inputSize != input.length) {
                console.error('神经细胞输入个数与实际不符', this);
                return output;
            }
            //计算权重*输入的乘积的总和
            for (var i = 0; i < this.inputSize; i++) {
                output+=input[i]*this.weights[i];
            }
            output+=NeuronHelper.OFFSET*this.offsetWeight;
            return NeuronHelper.sigmoid(output,NeuronHelper.SIGMOID_P);
        }
    }
    /**
     * 神经细胞层
     */
    export class NeuronLayer extends Array<Neuron> {
        constructor(neuronSize:number, perInputSize:number) {
            super(neuronSize);

            this.push(new Neuron(perInputSize));
        }

        public compute(inputs:[number]):[number] {
            var outputs:[number] = [];
            for (var i = 0; i < this.length; i++) {
                outputs.push(this[i].compute(inputs));
            }
            return outputs;
        }
    }

    /**
     * 神经细胞网络
     */
    export class NeuronNet {
        public inputSize:number;
        public outputSize:number;
        //隐藏层数
        private hiddenLayerSize:number = 0;
        //每隐藏层细胞数
        private neuronSizePerLayer:number = 4;
        public layers:[NeuronLayer] = [];


        constructor(inputSize:number, outputSize:number,
                    hiddenLayerSize:number, neuronSizePerLayer:number) {
            this.inputSize = inputSize;
            this.outputSize = outputSize;
            this.hiddenLayerSize = hiddenLayerSize;
            this.neuronSizePerLayer = neuronSizePerLayer;
        }

        public createNet(hiddenLayerSize:number) {
            for (var i = 0; i < hiddenLayerSize - 1; i++) {
                this.layers.push(new NeuronLayer(this.neuronSizePerLayer,this.neuronSizePerLayer));
            }

        }

        /**
         * 读取所有权重
         */
        public getAllWeights():[number] {

        }

        /**
         * 读取所有权重和
         */
        public getSumOfWeights():number {
            return 0;
        }

        /**
         * 设置所有权重　
         * @param weights
         */
        public evolve(weights:[number]) {

        }

        public update(inputs:[number]):[number] {
            //保存从每一层产生的输出
            var outputs:[number] = [];
            if (inputs || this.inputSize != inputs.length) {
                return outputs;
            }
            //计算每一层数据
            for (var i = 0; i < this.hiddenLayerSize + 1; i++) {
                //计算每层的输出
            }
        }
    }
    export class NeuronHelper {
        //默认偏移量
        public static OFFSET:number = -1;
        public static SIGMOID_P:number = 1;
        /**
         * 随机产生-1.0到1.0的权重
         * @returns {number}
         */
        public static randomWeight():number {
            return Math.random() * 2 - 1;
        }

        /**
         * sigmoid函数
         */
        public static sigmoid(input:number, p:number):number {
            return 1 / (1 + Math.pow(Math.E, -input / p));
        }

    }
}