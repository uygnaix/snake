/**
 * Created by xiang on 5/3/16.
 */

module jade {

    export class Tile {
        public static width:number = 48;
        public static height:number = 48;
    }
    export class Time{
        public static second(sec:number):number {
            return sec*1000;
        }

        public static minute(min:number){
            return this.second(60*min);
        }

        public static hour(hour:number){
            return this.minute(60*hour);
        }
    }
}
