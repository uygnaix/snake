/**
 * Created by xiang on 10/2/16.
 */
module XYSweeper {
    /**
     * 遗传算法的基因
     * 神经网络Neuron中,全部权重包括偏移量的权重按由前之后编码
     */
    export class Genome {
        //突变率
        public static MUTATION_RATE:number = 0.1;
        //最大突变量
        public static MAX_PERTURBATION:number = 0.5;

        //基因片段由数字构成
        public segments:[number]=[];

        //基因的适应性评分
        public fitness:number;

        /**
         * 基因突变
         */
        public mutate(){
            for(var i=0;i<this.segments.length;i++){
                if(Genome.isMutate()){
                    //为权重突变
                    this.segments[i]+=Genome.getPerturbation();
                }
            }
        }

        /**
         * 判断本次是否发生突变
         */
        public static isMutate(){
            return Math.random()<Genome.MUTATION_RATE;
        }

        /**
         * 随机获取突变量
         */
        public static getPerturbation():number{
            return (Math.random() - 0.5) * Genome.MAX_PERTURBATION;
        }
    }
    export class GenomeHelper {

    }
}