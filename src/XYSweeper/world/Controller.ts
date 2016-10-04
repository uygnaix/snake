/**
 * Created by xiang on 10/2/16.
 */
module XYSweeper {
    export class Controller extends egret.DisplayObjectContainer {
        constructor() {
            super();
            this.genAI = new GeneticAlgorithm();
            this.createPopulation();
            this.loadSweepers();
            this.loadMines();
        }
        public population: Array<Genome> = [];
        public sweepers: Array<Sweeper> = [];
        public mines: Array<Mine> = [];

        public genAI: GeneticAlgorithm;

        public weightSum: number = 0;

        //存放每一代平均适应性分数
        public avgFitness: Array<number> = [];
        //存放每一代最高适应性分数
        public bestFitness: Array<number> = [];
        //每一代的帧数
        public ticks: number = 0;
        //代数
        public generationIndex: number = 0;

        private createPopulation() {
            for (var i = 0; i < Environment.POPULATION_SIZE; i++) {
                var genome = Genome.newInstance(Environment.GENOME_SEGMENT_SIZE);
                //随机大脑
                this.population.push(genome);
            }
        }

        private loadSweepers() {
            for (var i = 0; i < Environment.POPULATION_SIZE; i++) {
                var sweeper = new Sweeper();
                //随机大脑
                sweeper.brain = new NeuronNet(4, 2,
                    Environment.HIDDEN_LAYER_SIZE, Environment.NEURON_SIZE_PER_LAYER);
                sweeper.injectBrain(this.population[i].segments);
                this.addChild(sweeper);
                this.sweepers.push(sweeper);
            }
        }
        private loadMines() {
            for (var i = 0; i < Environment.MINE_SIZE; i++) {
                var mine = new Mine();
                this.addChild(mine);
                this.mines.push(mine);
            }
        }
        //描绘数据
        public drawData() {

        }

        public resetMines(mines: Array<Mine>) {
            for (var i = 0; i < mines.length; i++) {
                mines[i].reset();
            }
        }

        /**
         * 扫雷机运行总数为CParams::iNumTicks次的循环。在此循环周期中，扫雷机的神经网络
         * 不断利用它周围特有的环境信息进行更新。而从神经网络得到的输出，使扫雷机实现所需的
         * 动作。如果扫雷机遇见了一个地雷，则它的适应性将相应地被更新，且同样地更新了它对应
         * 基因组的适应性。
         */
        public update() {
            this.ticks++;
            if (this.ticks < Environment.TICKS_SIZE) {
                //检查扫描机是否发现地雷
                for (var i = 0; i < this.sweepers.length; i++) {
                    //更新扫描机位置
                    this.sweepers[i].update(this.mines);
                    var foundMine = this.sweepers[i].findMine(this.mines);
                    if (foundMine.length > 0) {
                        //扫描机已找到地雷,增加扫描机分数,移除被找到的雷,并用新的代替
                        this.sweepers[i].fitness += foundMine.length;
                        this.resetMines(foundMine);
                        //更新基因组的适应性分数
                    }
                    this.population[i].fitness = this.sweepers[i].fitness;
                }
            } else {
                //一代已经循环完毕
                //记录上一代适应性情况
                this.avgFitness.push();
                this.bestFitness.push();
                this.generationIndex++;
                //帧计数复位
                this.ticks = 0;
                //运行GA创建一个新的群体
                this.population = this.genAI.epoch(this.population);
                //在各扫雷机中从新插入新的（有希望）被改进的大脑,并将它们的位置进行复位,等
                for (var i = 0; i < this.sweepers.length; i++) {
                    this.sweepers[i].evolve(this.population[i].segments);
                    this.sweepers[i].reset();
                }
            }
        }
    }
}