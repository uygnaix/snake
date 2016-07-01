module XYStar {
    /**
     * FloatingBanner
     */
    export class FloatingBanner extends egret.DisplayObjectContainer {
        public label: string;
        public labelDisplay: egret.TextField;
        public tween: egret.Tween;
        constructor(text: string) {
            super();
            this.label = text;
            this.setLabelDisplay(text);

        }
        public setLabelDisplay(text: string) {
            if (!this.labelDisplay) {
                this.labelDisplay = new egret.TextField();
            }
            this.labelDisplay.text = text;
            this.labelDisplay.textColor = 0xffff00;
            this.addChild(this.labelDisplay);

            var shape: egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0xff0000);
            shape.graphics.drawRect(0, 0, 100, 100);
            shape.graphics.endFill();
            shape.x = shape.y = 100;
            this.addChild(shape);
        }
        public move() {
            //默认右边界
            this.x = this.parent == null ? 200 : this.parent.width;
            this.y = this.parent == null ? 100 : this.parent.height * 0.2;
            this.tween = egret.Tween.get(this, {
                loop: false
            }).to({
                //默认在中间停留一下然后去左边界
                x: (this.parent.width - this.labelDisplay.width) / 2
            }, 500).wait(1000).to({
                x: -this.labelDisplay.width
            }, 500).call(this.onComplete, this)
        }
        private onComplete() {
            this.parent.removeChild(this);
        }
    }
}