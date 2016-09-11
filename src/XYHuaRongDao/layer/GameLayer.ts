/**
 * Created by xiang on 9/11/16.
 */
module XYHRD {
    import DisplayObjectContainer = egret.DisplayObjectContainer;
    export class GameLayer extends DisplayObjectContainer{

        public level:Level;
        public roles:RoleSprite[];

        constructor(levelIndex:number){
            super();
            this.level = Level.get(0);
        }
    }
}