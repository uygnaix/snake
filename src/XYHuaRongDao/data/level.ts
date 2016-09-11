/**
 * Created by xiang on 9/7/16.
 */
module XYHRD {
    export class Level {

        private static levels:Level[] = [];

        public index:number;
        public roleIds:number[];
        public roleRows:number[];
        public roleCols:number[];

        /**
         * 资源载入完成后载入数据
         */
        public static load(){
            var data = RES.getRes('levels_json');
            var levelData:Array<any> = data['levels'];
            for (var i=0;i<levelData.length;i++) {
                var levelInfo = levelData[i];
                var level = new Level(levelInfo['index'], levelInfo['role_id'],
                    levelInfo['row'], levelInfo['col']);
                Level.levels.push(level);
            }
        }

        static get(number:number):Level {
            return Level.levels[number];
        }


        constructor(index:number, roleIds:number[], roleRows:number[], roleCols:number[]) {
            this.index = index;
            this.roleIds = roleIds;
            this.roleRows = roleRows;
            this.roleCols = roleCols;
        }
    }
}