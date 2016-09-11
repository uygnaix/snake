/**
 * Created by xiang on 9/7/16.
 */
module XYHRD {
    export class Role {

        public static roles = RES.getRes('roles_json');

        constructor() {

        }

    }
    enum RoleType{
        hero,
        hor,
        ver,
        soldier
    }
}