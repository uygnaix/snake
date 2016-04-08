module XYGBoy {
  import Sprite = egret.Sprite;
  /**
   *
   * @author Xiang.y
   *
   */
  export class GameScene extends egret.DisplayObjectContainer {

    private dotSize = 25;

    private gamePanel:DotSnakePanel;
    private gameController:DotControllerPanel;

    public constructor(width:number, height:number) {
      super();
      this.width = width;
      this.height = height;
      this.snake();
    }

    public showGameOver() {
      alert('game over');
      this.snake();
    }

    public snake() {
      this.gamePanel = new DotSnakePanel(20, 10, this.dotSize);
      //游戏进程控制
      this.gamePanel.gameScene = this;
      this.addEventListener(GameSceneEvent.GAMEOVER, this.showGameOver, this);
      //调整gampanel的位置
      this.gamePanel.x = (this.width - this.gamePanel.width) / 2;
      this.gamePanel.y = 50;

      this.gameController = new DotControllerPanel(this.gamePanel, this.width, this.height);
      
      this.addChildAt(this.gameController,0);
      this.addChildAt(this.gamePanel, 10);

    }
  }
}
