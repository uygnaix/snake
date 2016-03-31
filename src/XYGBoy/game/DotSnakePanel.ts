module XYGBoy {
	/**
	 *
	 * @author Xiang.y
	 *
	 */
	export class DotSnakePanel extends egret.DisplayObjectContainer{
        private map: DotMap;
        private food: DotMapPointer;
        private direction:DotMapDirection;
        private body: DotMapPointerGroup;
        private speed:number=1;
        private timer: egret.Timer;
        private delay: number=1000;
        
        public constructor(row: number,col:number,dotSize:number) {
            super();
            this.width = col * dotSize;
            this.height = row * dotSize;
            
            this.map = new DotMap(row,col,dotSize);
            this.body = new DotMapPointerGroup();
            this.body.points.push(new DotMapPointer(row / 2,col / 2));
            this.addChild(this.map);
            
            this.speed = 1;
            this.direction = new DotMapDirection;
            
            
            egret.startTick(this.draw,this);
            
            this.initControllerEvent();
            //创建一个计时器对象
            this.timer= new egret.Timer(this.delay/this.speed,0);
            //注册事件侦听器
            this.timer.addEventListener(egret.TimerEvent.TIMER,this.gameTimer,this);
            //开始计时
            this.timer.start();
		}
		private draw(time):boolean{
            this.map.turnOffAllDot();
            this.map.turnOnDotAtGroup(this.body);
            return true;
		}
		private gameTimer(){
            this.body.first().row += this.direction.row;
            this.body.first().column += this.direction.column;
		}
		public speedUp(){
            this.speed++;
            this.timer.delay = this.delay / this.speed;
		}
		public speedDown(){
            if(this.speed > 1)
                this.speed--;
            this.timer.delay = this.delay / this.speed;
		}
		/**
		 * 随机在可出现的范围内产生食物
		 */ 
		private feed(){
            var mapSize = this.map.getRow() * this.map.getColumn();
            var bodySize = this.body.points.length;   
            var freeSpace = mapSize - bodySize;
            
		}
		private eat(){
		    
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
		public tapBtnB(){
            this.speedDown();
		}
		public tapBtnUp(){
            this.direction.up();
		}
        public tapBtnDown() {
            this.direction.down();
        }
        public tapBtnLeft() {
            this.direction.left();
        }
        public tapBtnRight() {
            this.direction.right();
        }
	}
}
