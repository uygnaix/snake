/**
 * Created by xiang on 9/11/16.
 */
module XYHRD {
    export class RoleSprite extends egret.Sprite {
        /** 角色id */
        public roleId:number;
        /** 当前所在行 */
        public row:number;
        /** 当前所在列 */
        public column:number;
        /** 横向格子数 */
        public gridWidth:number;
        /** 竖向格子数 */
        public gridHeight:number;

    }
}
