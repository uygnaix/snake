/**
 * Created by xiang on 9/7/16.
 */
module XYHRD {
    export class Role {

        public static roles:Role[] = [];

        public id:number;
        public img:string;
        public type:RoleType;
        public gridWidth:number;
        public gridHeight:number;

        public static load() {
            var data = RES.getRes('roles_json');
            var roleData:[any] = data['roles'];
            for (var i = 0; i < roleData.length; i++) {
                var roleInfo = roleData[i];
                var role = new Role(roleInfo['id'], roleInfo['img'], roleInfo['type'],
                    roleInfo['width'], roleInfo['height']);
                Role.roles.push(role);
            }
        }

        public static get(id:number) {
            return Role.roles[id];
        }

        constructor(id:number, img:string, type:string, gridWidth:number, gridHeight:number) {
            this.id = id;
            this.img = img;
            this.type = XYHRD.RoleType[type];
            this.gridWidth = gridWidth;
            this.gridHeight = gridHeight;
        }
    }

    export enum RoleType{
        hero,
        hor,
        ver,
        soldier
    }

}