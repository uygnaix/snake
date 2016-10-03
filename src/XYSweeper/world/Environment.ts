/**
 * Created by xiang on 10/2/16.
 */
module XYSweeper {
    export class Environment{
        public static ZONE_LEFT = 20;
        public static ZONE_RIGHT = 460;
        public static ZONE_TOP = 20;
        public static ZONE_BOTTOM = 460;

        public static TICKS_SIZE = 2000;

        //最大发现距离平方
        public static MAX_FIND_DISTANCE = 25;
            //一帧最大转动角度
        public static MAX_TURN_RATE:number = 10;

        //选择比例
        public static SURVIVE_RATE = 0.3;
        public static COMPETITION_SIZE = 2;

        //突变率
        public static MUTATION_RATE:number = 0.1;
        //最大突变量
        public static MAX_PERTURBATION:number = 0.5;


    }
}