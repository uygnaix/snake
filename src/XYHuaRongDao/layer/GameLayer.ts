/**
 * Created by xiang on 9/11/16.
 */
module XYHRD {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    export class GameLayer extends DisplayObjectContainer {

        public level:Level;
        public roles:RoleSprite[]=[];

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
                role.x = Constant.PADDING_LEFT + Constant.GRID_SIZE * role.column;
                role.y = Constant.PADDING_TOP  + Constant.GRID_SIZE * role.row;
                this.addChild(role);
            }
        }
    }
}