/**
 * Created by xiang on 10/2/16.
 */
module XYSweeper {
    /**
     * 遗传算法的基因
     * 神经网络Neuron中,全部权重包括偏移量的权重按由前之后编码
     */
    export class Genome {

        //基因片段由数字构成
        public segments:Array<number> = [];

        //基因的适应性评分
        public fitness:number;

        public clone():Genome{
            var offspring = new Genome();
            offspring.segments = this.segments;
            return offspring;
        }

    }
    export class GeneticAlgorithm {
        public epoch(population:Array<Genome>):Array<Genome> {
            var populationSize = population.length;
            var survives:Array<Genome> = GeneticAlgorithm.select(population);
            var offspring:Array<Genome> = GeneticAlgorithm.mating(survives, populationSize);
            return GeneticAlgorithm.mutate(offspring);
        }

        /**
         * 选择算法: 锦标赛选择
         */
        private static select(population:Array<Genome>):Array<Genome> {
            //选取生存比例可以生存
            var survivalSize = population.length * Environment.SURVIVE_RATE;
            var survives:Array<Genome> = [];
            for (var k = 0; k < survivalSize; k++) {
                //随机选取n个进行竞争
                var candidates:Array<Genome> = [];
                for (var i = 0; i < Environment.COMPETITION_SIZE; i++) {
                    var index = GeneticAlgorithm.randomInt(population.length);
                    var candidate:Genome = population[index];
                    candidates.push(candidate);
                    population.splice(index,1);
                }
                survives.push(GeneticAlgorithm.compete(candidates));
            }
            return survives;
        }

        /**
         * 锦标赛选择N个比较,竞争选出最大的
         */
        private static compete(genomes:Array<Genome>):Genome {
            var bestFitness = genomes[0].fitness;
            var bestGenome = genomes[0];
            for (var i = 1; i < genomes.length; i++) {
                if (genomes[i].fitness > bestFitness) {
                    bestFitness = genomes[i].fitness;
                    bestGenome = genomes[i];
                }
            }
            return bestGenome;
        }

        /**
         * 交配繁衍出Size大小的种群
         */
        private static mating(genomes:Array<Genome>, size:number):Array<Genome> {
            var offspring:Array<Genome> = [];
            var birthRate = size / genomes.length * 2;
            for (var i = 0; i < genomes.length / 2; i++) {
                var fatherIndex = GeneticAlgorithm.randomInt(genomes.length);
                var motherIndex = GeneticAlgorithm.randomInt(genomes.length);
                var father = genomes[fatherIndex];
                var mother = genomes[motherIndex];
                genomes.splice(fatherIndex,1);
                genomes.splice(motherIndex,1);
                offspring.concat(GeneticAlgorithm.matingCouple(father,mother,birthRate));
            }
            //随机出去多余的
            for(var i =0;i<offspring.length-size;i++){
                var deathIndex = GeneticAlgorithm.randomInt(offspring.length);
                offspring.splice(deathIndex,1);
            }
            return offspring;
        }

        /**
         * 交配, 基因杂交,单点交叉
         * @param birthRate 需产生后代数
         */
        private static matingCouple(father:Genome, mother:Genome,birthRate:number):Array<Genome> {
            var offspring:Array<Genome> = [];
            for(var i=0;i<Math.ceil(birthRate);i++){
                var crossIndex = GeneticAlgorithm.randomInt(father.segments.length);
                //随机继承父亲或母亲的大部分基因
                var base:Genome = mother;
                var other:Genome = father;
                if(Math.random()>0.5){
                    base = father;
                    other = mother;
                }
                var boy = base.clone();
                boy.segments[crossIndex] = other.segments[crossIndex];
                offspring.push(boy);
            }
            return offspring;
        }

        /**
         * 基因突变
         */
        private static mutate(genomes:Array<Genome>):Array<Genome> {
            for(var i=0;i<genomes.length;i++){
                var genome = genomes[i];
                for (var i = 0; i < genome.segments.length; i++) {
                    if (GeneticAlgorithm.isMutate()) {
                        //为权重突变
                        genome.segments[i] += GeneticAlgorithm.getPerturbation();
                    }
                }
            }
            return genomes;
        }

        /**
         * 判断本次是否发生突变
         */
        public static isMutate() {
            return Math.random() < Environment.MUTATION_RATE;
        }

        /**
         * 随机获取突变量
         */
        public static getPerturbation():number {
            return (Math.random() - 0.5) * Environment.MAX_PERTURBATION;
        }

        private static randomInt(max:number):number{
            return Math.floor(Math.random() * max)
        }
    }
}