module XYGBoy {
	/**
	 *
	 * @author Xiang.y
	 *
	 */
	export class DotSnakePanel extends egret.DisplayObjectContainer{
        private map: DotMap;
        private food: DotMapPointer;
        private direction:DotMapDirector;
        private body: DotMapPointerGroup;
        private speed:number=1;
        private timer: egret.Timer;
        private delay: number=1000;
        public gameScene: GameScene;
        
        public constructor(row: number,col:number,dotSize:number) {
            super();
            this.width = col * dotSize;
            this.height = row * dotSize;
            
            this.map = new DotMap(row,col,dotSize);
            this.body = new DotMapPointerGroup();
            this.body.points.push(new DotMapPointer(row / 2,col / 2));
            this.addChild(this.map);
            
            this.speed = 2;
            this.direction = new DotMapDirector;
            
            egret.startTick(this.draw,this);
            
            this.initControllerEvent();
            //创建一个计时器对象
            this.timer= new egret.Timer(this.delay/this.speed,0);
            //注册事件侦听器
            this.timer.addEventListener(egret.TimerEvent.TIMER,this.gameTimer,this);
            //开始计时
            this.timer.start();
            
            //初始化食物
            this.feed();
            //初始化body
            this.map.turnOnDotAtGroup(this.body);
		}
		private draw(time):boolean{
            return true;
		}
		private gameTimer(){
    		   
               if(this.canEat()) {
                   this.eat();
                   //变长
                   this.growUp(this.food);
                   this.feed();
               }
               this.move();
               if(this.isOver()){
                   this.gameover();
               }
		}
		
		/**
		 * 随机在可出现的范围内产生食物，线性化空闲位置坐标，使得保证随机在空点
		 */ 
		private feed(){
            var mapSize = this.map.getRow() * this.map.getColumn();
            var bodySize = this.body.points.length;   
            var freeSpace = mapSize - bodySize;
            if(freeSpace==0){
                // TODO win
            }
            var feedingPoint = Math.floor(Math.random() * freeSpace);
           this.food = this.feedingPoint2MapPointer(feedingPoint);
           this.map.flickerDotAtPointer(this.food);
		}
		/**
		 * 食物随机位置转换成二维坐标
		 */ 
        private feedingPoint2MapPointer(feedingPoint):DotMapPointer{
        		var index=0;
        		for(var i=0;i<this.map.getRow();i++){
        		   for(var j=0;j<this.map.getColumn();j++){
        		       if(this.map.getDotAt(i,j).getStatus()==DotStatus.OFF){
        		           index++;
                        if(index == feedingPoint){
            		           return new DotMapPointer(i,j);
        		           }
        		       }
        		   }
        		}
        		return null;
		}
		private canEat():boolean {
		    return this.body.first().equals(this.food);
		}
		private eat(){
    		   this.map.turnOnDotAtPointer(this.food);
		}
		private growUp(food:DotMapPointer){
    		   // 将食物吃到最后
		    this.body.points.push(food);
		}
		private move(){
    		   this.map.turnOffDotAtPointer(this.body.last());
		    for(var i=this.body.size()-1;i>0;i--){
		        var dot = this.body.getAt(i);
		        var pre = this.body.getAt(i-1);
		        dot.set(pre);
		    }
            this.body.first().row += this.direction.row;
            this.body.first().column += this.direction.column;
            this.map.turnOnDotAtGroup(this.body);
		}
		private isOver():boolean{
		    //自己撞自己,头在身体里
    		   for(var i=1;i<this.body.size();i++){
    		       if(this.body.getAt(i).equals(this.body.first())){
    		           return true;
    		       }
    		   }
    		   //超出边界
    		   if(this.body.first().row>=this.map.getRow()
        		   ||this.body.first().row<0
        		   ||this.body.first().column>=this.map.getColumn()
        		   ||this.body.first().column<0){
        		   return true;
        	   }
    		   return false;
		}
        private gameover() {
            this.timer.stop();
		    this.gameScene.dispatchEvent(new GameSceneEvent(GameSceneEvent.GAMEOVER));
		}
		
		public initControllerEvent(){
            this.addEventListener(ControllerEvent.A,this.tapBtnA,this);
            this.addEventListener(ControllerEvent.B,this.tapBtnB,this);
            this.addEventListener(ControllerEvent.UP,this.tapBtnUp,this);
            this.addEventListener(ControllerEvent.DOWN,this.tapBtnDown,this);
            this.addEventListener(ControllerEvent.LEFT,this.tapBtnLeft,this);
            this.addEventListener(ControllerEvent.RIGHT,this.tapBtnRight,this);
		}
        public tapBtnA(){
                this.speedUp();
        }
        public tapBtnB() {
                this.speedDown();
		}
		public tapBtnUp(){
            if(this.direction.getStatus() != DotMapDirection.DOWN)
            this.direction.up();
		}
        public tapBtnDown() {
            if(this.direction.getStatus() != DotMapDirection.UP)
                this.direction.down();
        }
        public tapBtnLeft() {
            if(this.direction.getStatus() != DotMapDirection.RIGHT)
                this.direction.left();
        }
        public tapBtnRight() {
            if(this.direction.getStatus() != DotMapDirection.LEFT)
                this.direction.right();
        }
        public speedUp() {
            this.speed++;
            this.timer.delay = this.delay / this.speed;
        }
        public speedDown() {
            if(this.speed > 1)
                this.speed--;
            this.timer.delay = this.delay / this.speed;
        }
	}
}
