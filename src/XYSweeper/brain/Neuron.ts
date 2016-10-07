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
        public inputSize: number;
        //输入权重
        public inputWeights: Array<number> = [];
        //偏移量,阈值的权制
        public offsetWeight: number;

        constructor(inputSize: number) {
            this.inputSize = inputSize;
            for (var i = 0; i < inputSize; i++) {
                //随机权重
                this.inputWeights.push(NeuronHelper.randomWeight())
            }
            this.offsetWeight = NeuronHelper.randomWeight();
        }

        public compute(input: Array<number>): number {
            var output: number = 0;
            if (!input || this.inputSize != input.length) {
                console.error('神经细胞输入个数与实际不符', this);
                return output;
            }
            //计算权重*输入的乘积的总和
            for (var i = 0; i < this.inputSize; i++) {
                output += input[i] * this.inputWeights[i];
            }
            output += NeuronHelper.OFFSET * this.offsetWeight;
            return NeuronHelper.sigmoid(output, NeuronHelper.SIGMOID_P);
        }
        /**
         * 获取全部权重
         */
        public getAllWeights(): Array<number> {
            var allWeights = [];
            allWeights = allWeights.concat(this.inputWeights);
            allWeights.push(this.offsetWeight);
            return allWeights;
        }
        public putAllWeights(allWeights: Array<number>) {
            this.inputWeights = allWeights.slice(0, allWeights.length - 1);
            this.offsetWeight = allWeights[allWeights.length-1];
        }
    }
    /**
     * 神经细胞层
     */
    export class NeuronLayer extends Array<Neuron> {
        constructor(neuronSize: number, perInputSize: number) {
            super(neuronSize);
            for (var i = 0; i < neuronSize; i++) {
                this.push(new Neuron(perInputSize));
            }
        }

        public compute(inputs: Array<number>): Array<number> {
            var outputs: Array<number> = [];
            for (var i = 0; i < this.length; i++) {
                outputs.push(this[i].compute(inputs));
            }
            return outputs;
        }
        public getWeights(): Array<number> {
            var weights = [];
            for (var i = 0; i < this.length; i++) {
                weights = weights.concat(this[i].getAllWeights());
            }
            return weights;
        }
        public putWeights(weights: Array<number>) {
            for (var i = 0; i < this.length; i++) {
                var weightSize = this[i].inputSize + 1;
                this[i].putAllWeights(weights.slice(i * weightSize, (i + 1) * weightSize));
            }
        }
    }

    /**
     * 神经细胞网络
     */
    export class NeuronNet {
        public inputSize: number;
        public outputSize: number;
        //隐藏层数
        private hiddenLayerSize: number = Environment.HIDDEN_LAYER_SIZE;
        //每隐藏层细胞数
        private neuronSizePerLayer: number = Environment.NEURON_SIZE_PER_LAYER;
        public layers: Array<NeuronLayer> = [];


        constructor(inputSize: number, outputSize: number,
            hiddenLayerSize?: number, neuronSizePerLayer?: number) {
            this.inputSize = inputSize;
            this.outputSize = outputSize;
            if (hiddenLayerSize) this.hiddenLayerSize = hiddenLayerSize;
            if (neuronSizePerLayer) this.neuronSizePerLayer = neuronSizePerLayer;
            this.createNet(this.hiddenLayerSize);
        }

        public createNet(hiddenLayerSize: number) {
            //第一个隐藏层，输入数为输入变量数，其余的为隐藏层的喜好数
            this.layers.push(new NeuronLayer(this.neuronSizePerLayer, this.inputSize));
            for (var i = 0; i < hiddenLayerSize - 1; i++) {
                this.layers.push(new NeuronLayer(this.neuronSizePerLayer, this.neuronSizePerLayer));
            }
            //输出层
            this.layers.push(new NeuronLayer(this.outputSize, this.neuronSizePerLayer));
        }

        /**
         * 读取所有权重
         */
        public getAllWeights(): Array<number> {
            var weights = [];
            for (var i = 0; i < this.layers.length; i++) {
                weights = weights.concat(this.layers[i].getWeights());
            }
            return weights;
        }

        /**
         * 读取所有权重和
         */
        public getSumOfWeights(): number {
            return 0;
        }

        /**
         * 设置所有权重　
         * @param weights
         */
        public evolve(weights: Array<number>) {
            for (var i = 0; i < this.layers.length; i++) {
                var weightSize = this.layers[i].getWeights().length;
                this.layers[i].putWeights(weights.slice(i * weightSize, (i + 1) * weightSize - 1));
            }
        }

        public update(inputs: Array<number>): Array<number> {
            //保存从每一层产生的输出
            var outputs: Array<number> = inputs;
            if (!inputs || this.inputSize != inputs.length) {
                return outputs;
            }
            //计算每一层数据
            for (var i = 0; i < this.hiddenLayerSize + 1; i++) {
                //计算每层的输出
                outputs = this.layers[i].compute(inputs);
                inputs = outputs;
            }
        }
    }
    export class NeuronHelper {
        //默认偏移量
        public static OFFSET: number = -1;
        public static SIGMOID_P: number = 1;
        /**
         * 随机产生-1.0到1.0的权重
         * @returns {number}
         */
        public static randomWeight(): number {
            return Math.random() * 2 - 1;
        }

        /**
         * sigmoid函数
         */
        public static sigmoid(input: number, p: number): number {
            return 1 / (1 + Math.pow(Math.E, -input / p));
        }

    }
}