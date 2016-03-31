module XYGBoy {
    /**
     *
     * @author Xiang.y
     *
     */
    export class ControllerEvent extends egret.Event {
        public static UP:string = "up";
        public static DOWN:string = "down";
        public static LEFT:string = "left";
        public static RIGHT:string = "right";
        public static A:string = "a";
        public static B:string = "b";

        public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
            super(type, bubbles, cancelable);
        }
    }
}
