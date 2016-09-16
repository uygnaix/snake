/**
 * Created by xiang on 9/11/16.
 */

module XYHRD {

    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import TouchEvent = egret.TouchEvent;
    import Point = egret.Point;
    import DirectionType = XY.DirectionType;

    export class GameLayer extends DisplayObjectContainer {

        public level:Level;
        public roles:RoleSprite[] = [];

        private isMoving:boolean;
        private touchBeginPoint:Point;
        private target:RoleSprite;

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
                role.y = Constant.GRID_SIZE * role.row;
                this.addChild(role);
            }

            this.touchEnabled = true;
            this.addEventListener(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
        }

        private onTouchBegin(event) {
            this.isMoving = true;
            this.touchBeginPoint = new Point(event.stageX, event.stageY);
            for (var i = 0; i < this.roles.length; i++) {
                var role = this.roles[i];
                var isHit:boolean = role.hitTestPoint(this.touchBeginPoint.x, this.touchBeginPoint.y);
                if (isHit) {
                    this.target = role;
                    break;
                }
            }
        }

        private onTouchEnd(event) {
            this.isMoving = false;
            var endPoint = new Point(event.stageX, event.stageY);
            var direction:XY.DirectionType = XY.Direction.cal(this.touchBeginPoint.x, this.touchBeginPoint.y,
                endPoint.x, endPoint.y);
            if (this.canMove(direction)) {
                this.move(direction);
            }
        }

        /**
         * 是否能向选的方向移动
         * 每个role选两个特征点,1/3处和2/3处
         */
        private canMove(direction:DirectionType):boolean {
            var x13 = this.target.x + this.target.width / 3;
            var y13 = this.target.y + this.target.height / 3;
            var x23 = this.target.x + this.target.width * 2 / 3;
            var y23 = this.target.y + this.target.height * 2 / 3;
            debugger;
            switch (direction) {
                case DirectionType.UP:
                    y13 = y13 - Constant.GRID_SIZE_HALF;
                    y23 = y23 - Constant.GRID_SIZE_HALF;
                    break;
                case DirectionType.DOWN:
                    y13 = y13 + Constant.GRID_SIZE_HALF;
                    y23 = y23 + Constant.GRID_SIZE_HALF;
                    break;
                case DirectionType.LEFT:
                    x13 = x13 - Constant.GRID_SIZE_HALF;
                    x23 = x23 - Constant.GRID_SIZE_HALF;
                    break;
                case DirectionType.RIGHT:
                    x13 = x13 + Constant.GRID_SIZE_HALF;
                    x23 = x23 + Constant.GRID_SIZE_HALF;
                    break;
            }
            //判断是否碰撞
            var canMove:boolean = true;
            for (var i = 0; i < this.roles.length; i++) {
                var role:RoleSprite = this.roles[i];
                if (role.hitTestPoint(x13, y13) && role.hitTestPoint(x23, y23)) {
                    canMove = false;
                }
            }
            return canMove;
        }

        private move(direction:DirectionType) {
            var targetX:number = this.target.x;
            var targetY:number = this.target.y;

            switch (direction) {
                case DirectionType.UP:
                    targetY = targetY - Constant.GRID_SIZE;
                    break;
                case DirectionType.DOWN:
                    targetY = targetY + Constant.GRID_SIZE;
                    break;
                case DirectionType.LEFT:
                    targetX = targetX - Constant.GRID_SIZE;
                    break;
                case DirectionType.RIGHT:
                    targetX = targetX + Constant.GRID_SIZE;
                    break;
            }

            var tw = egret.Tween.get(this.target).to({x: targetX, y: targetY}, 1000);

        }


    }
}