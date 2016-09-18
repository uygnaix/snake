/**
 * Created by xiang on 9/11/16.
 */

module XYHRD {

    import DisplayObjectContainer = egret.DisplayObjectContainer;
    import TouchEvent = egret.TouchEvent;
    import Point = egret.Point;
    import DirectionType = XY.DirectionType;
    import Bitmap = egret.Bitmap;
    import DisplayObject = egret.DisplayObject;
    import OverStatus = XY.OverStatus;
    import log = egret.log;

    export class GameLayer extends DisplayObjectContainer {

        public level:Level;
        public roles:RoleSprite[] = [];
        private hero:RoleSprite;

        private isMoving:boolean;
        private touchBeginPoint:Point;
        private target:RoleSprite;

        constructor(levelIndex:number) {
            super();
            this.loadBG();
            this.level = Level.get(levelIndex);
            for (var i = 0; i < this.level.roles.length; i++) {
                var role = new RoleSprite(this.level.roles[i],
                    this.level.roleRows[i], this.level.roleCols[i]);
                this.roles.push(role);
                if(role.role.type == RoleType.hero) {
                    this.hero = role;
                }
            }
            this.init();
        }

        private loadBG(){
            var bg = new Bitmap(RES.getRes('controller_bg_png'));
            bg.width = 320;
            bg.height = 480;
            bg.alpha = 0;
            this.addChild(bg);
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
                this.over();
            }
            this.target = null;
        }

        /**
         * 是否能向选的方向移动
         * 每个role选两个特征点,1/3处和2/3处
         */
        private canMove(direction:DirectionType):boolean {
            if(this.target==null){
                return false;
            }
            var hitX = this.target.column * Constant.GRID_SIZE + this.target.width / 3;
            var hitY = this.target.row * Constant.GRID_SIZE + this.target.height / 3;
            var hitX2 = this.target.column * Constant.GRID_SIZE + this.target.width * 2 / 3;
            var hitY2 = this.target.row * Constant.GRID_SIZE + this.target.height * 2 / 3;


            switch (direction) {
                case DirectionType.UP:
                    hitY = hitY - Constant.GRID_SIZE;
                    hitY2 = hitY2 - Constant.GRID_SIZE * this.target.gridHeight;
                    break;
                case DirectionType.DOWN:
                    hitY = hitY + Constant.GRID_SIZE * this.target.gridHeight;
                    hitY2 = hitY2 + Constant.GRID_SIZE;
                    break;
                case DirectionType.LEFT:
                    hitX = hitX - Constant.GRID_SIZE;
                    hitX2 = hitX2 - Constant.GRID_SIZE * this.target.gridWidth;
                    break;
                case DirectionType.RIGHT:
                    hitX = hitX + Constant.GRID_SIZE * this.target.gridWidth;
                    hitX2 = hitX2 + Constant.GRID_SIZE;
                    break;
            }

            //是否出界
            if (hitY < 0 || hitY > 5 * Constant.GRID_SIZE || hitX < 0 || hitX > 4 * Constant.GRID_SIZE
                || hitY2 < 0 || hitY2 > 5 * Constant.GRID_SIZE || hitX2 < 0 || hitX2 > 4 * Constant.GRID_SIZE) {
                console.log('移动方向出界:' + direction);
                return false;
            }

            //判断是否碰撞
            var canMove:boolean = true;
            for (var i = 0; i < this.roles.length; i++) {
                var role:RoleSprite = this.roles[i];
                if (this.hitTest(role,hitX, hitY) || this.hitTest(role,hitX2, hitY2)) {
                    console.log('移动方向有障碍物:' + direction, role);
                    canMove = false;
                }
            }
            return canMove;
        }

        private move(direction:DirectionType) {

            switch (direction) {
                case DirectionType.UP:
                    this.target.row--;
                    break;
                case DirectionType.DOWN:
                    this.target.row++;
                    break;
                case DirectionType.LEFT:
                    this.target.column--;
                    break;
                case DirectionType.RIGHT:
                    this.target.column++;
                    break;
            }
            var targetX = this.target.column * Constant.GRID_SIZE;
            var targetY = this.target.row * Constant.GRID_SIZE;
            egret.Tween.get(this.target).to({x: targetX, y: targetY}, 1000);

        }

        private hitTest(role:DisplayObject,x,y):boolean{
            return role.hitTestPoint(x+Constant.PADDING_LEFT,y+Constant.PADDING_TOP);
        }

        private over(){
            if(this.hero.row == this.level.exitRow && this.hero.column == this.level.exitCol){
                console.log('WIN!');
            }
        }
    }
}