/**
 * Created by xiang on 10/2/16.
 */
module XYSweeper {
    export class Environment {
        public static TICKER_SPEED = 0.05;

        public static ZONE_LEFT = 20;
        public static ZONE_RIGHT = 460;
        public static ZONE_TOP = 20;
        public static ZONE_BOTTOM = 460;

        public static TICKS_SIZE = 500;

        public static INPUT_SIZE = 2;
        //隐藏层数
        public static HIDDEN_LAYER_SIZE = 1;
        //每隐藏层细胞数
        public static NEURON_SIZE_PER_LAYER = 4;
        //基因长度，由隐藏层数和基因编码规则决定
        public static GENOME_SEGMENT_SIZE = 28;

        //人口数量
        public static POPULATION_SIZE = 25;
        //食物数量
        public static MINE_SIZE = 10;

        //最大发现距离
        public static MAX_FIND_DISTANCE = 25;
        //一帧最大转动角度
        public static MAX_TURN_RATE: number = 10;

        //选择比例
        public static SURVIVE_RATE = 0.3;
        public static COMPETITION_SIZE = 2;

        //突变率
        public static MUTATION_RATE: number = 0.1;
        //最大突变量
        public static MAX_PERTURBATION: number = 0.5;

        /**
         * 随机一个正整数
         */
        public static randomInt(max: number, min: number = 0): number {
            return Math.floor(Math.random() * max)
        }
        //随机位置
        public static randomPosition(): Array<number> {
            var x = Environment.randomInt(Environment.ZONE_RIGHT - Environment.ZONE_LEFT)
                + Environment.ZONE_LEFT;
            var y = Environment.randomInt(Environment.ZONE_BOTTOM - Environment.ZONE_TOP)
                + Environment.ZONE_TOP;
            return [x, y];
        }

    }
}