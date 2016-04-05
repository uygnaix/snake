module XYGBoy {
    /**
     *
     * @author Xiang.y
     * 点阵图
     *
     */
    export class DotMap extends egret.DisplayObjectContainer{

        private dotMap: Array<Array<Dot>>;
        
        private row: number;
        private column: number;
        private cursor: DotMapPointer;
        
        private dotSize: number;
        
        public constructor(row:number,col:number,dotSize:number) {
            super();
            this.row = row;
            this.column = col;
            this.dotSize = dotSize;
            this.width = col * dotSize;
            this.height = row * dotSize;
            this.initDotMap(row,col);
            this.cursor = this.getCursor();
            
        }
        private initDotMap(row: number,col: number,templateDot:Dot=null) { 
            this.dotMap = new Array();
            for(var i = 0;i < row;i++) {
                this.dotMap[i] = new Array();
                for(var j = 0;j < col;j++) {
                    var dot = templateDot==null? new Dot(this.dotSize,DotStatus.OFF):templateDot.clone();
                    dot.setPosition(i,j,this.dotSize);
                    this.dotMap[i][j] = dot;
                    //调整dot位置
                    this.addChild(dot);
                }
            }
        }
        
        public resize():boolean {
            
            return true;
        }
        
        public getRow():number{
            return this.row;
        }
        public getColumn():number {
            return this.column;
        }
        
        public getCursor():DotMapPointer {
            if(this.cursor==null){
                this.cursor = new DotMapPointer();
            }
            return this.cursor;
        }
        public getCursorRow():number{
            return this.cursor.row;
        }
        public getCursorColumn():number{
            return this.cursor.column;
        }
        public setCursorByPointer(pointer:DotMapPointer):boolean {
            return this.setCursor(pointer.row,pointer.column);
        }
        /**
         * @returns true表示未越界，设置游标成功
         */ 
        public setCursor(row:number=0,col:number=0):boolean{
            if(row>=this.row){
                row = this.row-1;
            }
            if(row<0){
                row = 0;
            }
            if(col>=this.column){
                col = this.column-1;
            }
            if(col<0){
                col = 0;
            }
            this.cursor.row = row;
            this.cursor.column = col;
            return true;
        }
        public setCursorRow(row:number=0){
            this.cursor.row = row;
        }
        public setCursorColumn(col:number=0){
            this.cursor.column = col;
        }
        
        public getDotAtCursor():Dot{
            return this.getDotAt(this.cursor.row,this.cursor.column);
        }
        public getDotAt(row:number,col:number):Dot {
            return this.dotMap[row][col];
        }
        public turnOnDotAtCursor(){
            this.turnOnDotAt(this.cursor.row,this.cursor.column);
        }
        private turnOnDotAt(row:number,col:number) {
            this.getDotAt(row,col).turnOn();
        }
        public turnOnDotAtGroup(group:DotMapPointerGroup) {
            for(var j of group.points) {
                this.turnOnDotAtPointer(j);
            }
        }
        public turnOnDotAtPointer(pointer:DotMapPointer) {
            this.setCursorByPointer(pointer);
            this.turnOnDotAtCursor();
        }
        public turnOffDotAtCursor(){
            this.turnOffDotAt(this.cursor.row,this.cursor.column);
        }
        public turnOffDotAtGroup(group: DotMapPointerGroup) {
            for(var i of group.points) {
                this.turnOffDotAtPointer(i);
            }
        }
        public turnOffDotAtPointer(pointer:DotMapPointer) {
            this.setCursorByPointer(pointer);
            this.turnOffDotAtCursor();
        }
        private turnOffDotAt(row:number,col:number) {
            this.getDotAt(row,col).turnOff();
        }
        public turnOffAllDot() {
            for(var row in this.dotMap){
                for(var col in this.dotMap[row]){
                    this.dotMap[row][col].turnOff();
                }
            }
        }
        public flickerDotAtPointer(pointer:DotMapPointer) {
            this.setCursorByPointer(pointer);
            this.flickerDotAtCursor();
        }
        public flickerDotAtCursor(){
            this.getDotAtCursor().flicker();
        }
    }
    export class DotMapPointer{
        public row;
        public column;
        
        public constructor(row:number=0,col:number=0){
            this.row = row;
            this.column = col;
        }
        public equals(pointer:DotMapPointer) :boolean{
            return pointer&&this.row==pointer.row&&this.column==pointer.column;
        }
        public clone():DotMapPointer{
            return new DotMapPointer(this.row,this.column);
        }
        public set(pointer:DotMapPointer){
            this.row = pointer.row;
            this.column = pointer.column;
        }
    }
    export class DotMapPointerGroup{
        public points: Array<DotMapPointer>;
        public constructor(){
            this.points = new Array<DotMapPointer>();
        }
        public getAt(i:number):DotMapPointer{
            return this.points[i];
        }
        public setAt(value: DotMapPointer,i:number){
            this.points[i] = value;
        }
        public first():DotMapPointer{
            return this.points[0];
        }
        public last():DotMapPointer {
            return this.points[this.points.length-1];
        }
        public size():number{
            return this.points.length;
        }
    }
    export class DotMapDirector{
        public row;
        public column;
        private status:DotMapDirection;
        public constructor(row = 0,col = 0){
            this.row = row;
            this.column = col;
        }
        public getStatus():DotMapDirection{
            return this.status;
        }
        public stop(){
            this.row=0;
            this.column=0;
            this.status = DotMapDirection.STAND;
        }
        public up(){
            this.row = -1;
            this.column = 0;
            this.status = DotMapDirection.UP;
        }
        public down(){
            this.row = 1;
            this.column = 0;
            this.status = DotMapDirection.DOWN;
        }
        public left(){
            this.row = 0;
            this.column = -1;
            this.status = DotMapDirection.LEFT;
        }
        public right(){
            this.row = 0;
            this.column = 1;
            this.status = DotMapDirection.RIGHT;
        }
    }
    export enum DotMapDirection{
        STAND,UP,DOWN,LEFT,RIGHT
    }
}
