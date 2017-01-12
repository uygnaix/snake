module XYMount {
	import create = egret_native.Texture.create;
	export class Cat {
		/**
		 * 适应性
		 */
		public fitness: number;
		public genome: Array<number>;

		constructor(genome: Array<number> = [], fitness: number = 0) {
			this.fitness = fitness;
			this.genome = [];
			for(let chrome of genome){
				this.genome.push(chrome);
			}
		}
	}
	export class CatGroup {
		public static MUTATE_RATE = 0.3;
		public static MAX_PERTURBATION = 0.1;
		public static LEFT_BOUND = -10;
		public static RIGHT_BOUND = 30;
		public size: number = 0;
		public cats: Array<Cat> = [];
		public generation = 0;

		public getTotalFitness(): number {
			let total = 0;
			for (let cat of this.cats) {
				total += cat.fitness;
			}
			return total;
		}

		public getBest(): Cat {
			let best = this.cats[0];
			for (let cat of this.cats) {
				if (cat.fitness > best.fitness) {
					best = cat;
				}
			}
			return best;
		}

		public getWorst(): Cat {
			let worst = this.cats[0];
			for (let cat of this.cats) {
				if (cat.fitness < worst.fitness) {
					worst = cat;
				}
			}
			return worst;
		}

		public getAverageFitness() {
			return this.cats.length == 0 ? 0 : this.getTotalFitness() / this.cats.length;
		}

		public getCatOnRoulette(): Cat {
			//轮盘停留位置
			let stop = Math.random() * this.getTotalFitness();
			//轮盘已转过区域
			let fitnessSoFar = 0;
			let chooseCat = null;
			//转动轮盘
			for (let i = 0; i < this.cats.length; i++) {
				fitnessSoFar += this.cats[i].fitness;
				if (fitnessSoFar >= stop) {
					chooseCat = this.cats.splice(i, 1)[0];
					break;
				}
			}
			return chooseCat;
		}

		public mutate(cat: Cat) {
			for (let i=0;i<cat.genome.length;i++) {
				let chrome = cat.genome[i];
				if (Math.random() < CatGroup.MUTATE_RATE) {
					chrome += (Math.random() - 0.5) * CatGroup.MAX_PERTURBATION;
				}
				chrome = Math.max(chrome, CatGroup.LEFT_BOUND);
				chrome = Math.min(chrome, CatGroup.RIGHT_BOUND);
				cat.genome[i]=chrome;
			}
		}

		public create(size: number) {
			this.size = size;
			this.cats = [];
			for (let i = 0; i < size; i++) {
				this.cats.push(this.createNewCat());
			}
		}
		public createNewCat():Cat{
			let position = CatGroup.LEFT_BOUND + Math.random() * (CatGroup.RIGHT_BOUND - CatGroup.LEFT_BOUND);
			return new Cat([position]);
		}

		public epoch() {
			let spring = [];
			//用轮盘赌选择一半的个体，淘汰另一半
			for (let i = 0; i < this.size / 2; i++) {
				spring.push(this.getCatOnRoulette());
			}
			//繁殖
			let springSize = spring.length;
			for (let i = 0; i < springSize; i++) {
				spring.push(new Cat(spring[i].genome, spring[i].fitness));
			}
			for(let i =0;i<this.size-spring.length;i++){
				spring.push(this.createNewCat());
			}
			//变异
			for (let i=0;i<spring.length;i++) {
				this.mutate(spring[i]);
			}
			this.cats = spring;
			this.generation ++;
		}

	}
}