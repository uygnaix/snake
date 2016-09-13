/**
 * Created by xiang on 9/11/16.
 */
module XYHRD {

    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import TouchEvent = egret.TouchEvent;
    import Point = egret.Point;

    export class GameLayer extends DisplayObjectContainer {

        public level:Level;
        public roles:RoleSprite[] = [];

        private isMoving:boolean;
        private touchBeginPoint:Point;

        constructor(levelIndex:number) {
            super();
            this.level = Level.get(levelIndex);
            for (var i = 0; i < this.level.roles.length; i++) {
                var role = new RoleSprite(this.level.roles[i],
                    this.level.roleRows[i], this.level.roleCols[i]);
                this.roles.push(role);
            }

            this.init();
        }

        private init() {
            for (var i = 0; i < this.roles.length; i++) {
                var role = this.roles[i];
                role.x = Constant.GRID_SIZE * role.column;
                role.y =  Constant.GRID_SIZE * role.row;
                this.addChild(role);
            }
            this.touchEnabled = true;
            this.addEventListener(TouchEvent.TOUCH_TAP, this.onTouchBegin, this);
        }

        private onTouchBegin(event) {
            this.isMoving = true;
            this.touchBeginPoint = new Point(event.localX,event.localY);
        }

        private canMove() {

        }


    }
}