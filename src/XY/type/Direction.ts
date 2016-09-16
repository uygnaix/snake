module XY {

    export class Direction {

        public static cal(x1,y1,x2,y2):DirectionType{
            var result:DirectionType;
            var diffX = x2-x1;
            var diffY = y2-y1;
            if(diffX>diffY){
                if(diffX>-diffY){
                    result = DirectionType.RIGHT;
                }else {
                    result = DirectionType.UP;
                }
            }else {
                if(diffX>-diffY){
                    result = DirectionType.DOWN
                }else {
                    result = DirectionType.LEFT;
                }
            }
            return result;
        }
    }
    export enum DirectionType {
        UP,
        DOWN,
        LEFT,
        RIGHT
    }
}