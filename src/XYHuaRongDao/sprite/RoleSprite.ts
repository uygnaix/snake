/**
 * Created by xiang on 9/11/16.
 */
module XYHRD {
    import Bitmap = egret.Bitmap;
    export class RoleSprite extends egret.Sprite {
        /** 角色id */
        public role:Role;
        /** 当前所在行 */
        public row:number;
        /** 当前所在列 */
        public column:number;
        /** 横向格子数 */
        public gridWidth:number;
        /** 竖向格子数 */
        public gridHeight:number;

        /** 头像 */
        private face:egret.Bitmap;

        constructor(role:Role,row:number,col:number){
            super();
            this.role = role;
            this.gridWidth = role.gridWidth;
            this.gridHeight = role.gridHeight;
            this.row = row;
            this.column = col;

            this.init();
        }

        private init(){
            this.face = new Bitmap(RES.getRes(this.role.img));
            this.addChild(this.face);
        }

    }
}
