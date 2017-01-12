/**
 * Created by xiang on 10/3/16.
 */
module XYMount {
	import GridLayer = XY.GridLayer;
	import Point = XY.Point;
	import TextField = egret.TextField;
	export class MountScene extends egret.DisplayObjectContainer {

		private gridLayer: GridLayer;
		private coordinateLayer: CoordinateLayer;
		private catGroup: CatGroup;
		private mount: MountCurve = new MountCurve();
		private labels = [];

		constructor(width: number, height: number) {
			super();
			this.width = width;
			this.height = height;
			this.loadGrid();
			this.loadCoordinate();
			this.start();
			this.showInfo();
		}

		private loadGrid() {
			this.gridLayer = new GridLayer(this.width, this.height);
			this.addChild(this.gridLayer);
		}

		private loadCoordinate() {
			this.coordinateLayer = new CoordinateLayer(this.width, this.height, this.width / 3, this.height / 2);
			this.addChild(this.coordinateLayer);
			this.coordinateLayer.densityX = 10;
			this.coordinateLayer.densityY = 8;
			this.coordinateLayer.draw(this.mount, -10, 30, 0.01);
		}

		public running: boolean = false;

		public start() {
			this.catGroup = new CatGroup();
			this.catGroup.create(100);
			this.drawCat();
			this.showInfo();
			egret.startTick(this.update, this);
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
				this.catGroup.epoch();
				this.drawCat();
				this.changeInfo();
				this.running = true;
			}, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, () => {
				this.running = false;

			}, this);
		}

		private setFitness() {
			for (let cat of this.catGroup.cats) {
				cat.fitness = this.mount.fun(cat.genome[0]);
			}
		}

		private drawCat() {
			this.setFitness();
			let points = [];
			this.catGroup.cats.map((cat) => {
				points.push(new Point(cat.genome[0], cat.fitness));
			});
			this.coordinateLayer.drawPoints(points);
		}

		public update(timeStamp: number): boolean {
			if (this.running) {

			}
			return false;
		}

		private showInfo() {
			let label = this.getLabel(0);
			this.labels.push(label);
			this.addChild(label);

			let label2 = this.getLabel(150);
			this.labels.push(label2);
			this.addChild(label2);

			var label3 = this.getLabel(250);
			this.labels.push(label3);
			this.addChild(label3);
		}
		private getLabel(x:number):TextField{
			let label = new egret.TextField();
			label.textColor = 0xff0000;
			label.size = 14;
			label.x = x;
			return label;
		}

		private changeInfo(){
			this.labels[0].text="代数:"+this.catGroup.generation;
			this.labels[1].text="最好"+this.catGroup.getBest().fitness.toFixed(2);
			this.labels[2].text="最差"+this.catGroup.getWorst().fitness.toFixed(2);
		}
	}
}