module XYGBoy {
	/**
	 *
	 * @author 
	 *
	 */
	export class GameSceneEvent extends egret.Event{
    	public static GAMEOVER = 'game_over';
    	public static WIN = 'win';
        public constructor(type: string,bubbles: boolean = false,cancelable: boolean = false) {
    		   super(type,bubbles,cancelable);
		}
	}
}
