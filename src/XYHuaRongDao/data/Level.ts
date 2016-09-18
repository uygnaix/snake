/**
 * Created by xiang on 9/7/16.
 */
module XYHRD {
    export class Level {

        private static levels:Level[] = [];

        private index:number;
        public roleIds:number[];
        public roleRows:number[];
        public roleCols:number[];
        public roles:Role[]=[];
        public exitRow:number;
        public exitCol:number;

        /**
         * 资源载入完成后载入数据
         */
        public static load(){
            var data = RES.getRes('levels_json');
            var levelData:Array<any> = data['levels'];
            for (var i=0;i<levelData.length;i++) {
                var levelInfo = levelData[i];
                var level = new Level(levelInfo['index'], levelInfo['role_id'],
                    levelInfo['row'], levelInfo['col'],levelInfo['exit_row'],levelInfo['exit_col']);
                Level.levels.push(level);
            }
        }

        public static get(index:number):Level {
            return Level.levels[index];
        }

        constructor(index:number, roleIds:number[], roleRows:number[], roleCols:number[],
                    exitRow:number, exitCol:number) {
            this.index = index;
            this.roleIds = roleIds;
            this.roleRows = roleRows;
            this.roleCols = roleCols;
            for(var i=0;i<roleIds.length;i++){
                var role = Role.get(this.roleIds[i]);
                this.roles.push(role);
            }
            this.exitRow = exitRow;
            this.exitCol = exitCol;
        }
    }
}