import Food from "./Food"
import Snake from "./Snake"
import ScorePanel from "./ScorePanel"

// 游戏控制器
class GameControl {
    // 蛇
    snake: Snake;
    // 食物
    food: Food;
    // 记分盘
    scorePanel: ScorePanel; 
    // 存储蛇移动方向
    direction: string = 'Right';
    // 记录游戏结束状态
    isLive: boolean = true; 
    // 方向string
    arrowListStr: Array<string> = [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'Up',
        'Down',
        'Left',
        'Right',
    ]

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel(10,10) 

        // 一创建实例就初始化
        this.init()
    }

    // 游戏初始化
    init() {
        // this.keydownHandler.bind(this) //bind(this) 就是方法本身那个this
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        // 调用蛇移动方法
        this.run()
    }
    /**
     *  ArrowUp     Up
        ArrowDown   Down
        ArrowLeft   Left
        ArrowRight  Right
     * @param event 
     */
    // 创建键盘按下方法 
    keydownHandler(event: KeyboardEvent) { 
        for (const key in this.arrowListStr) {
            if (event.key == this.arrowListStr[key]) { 
                this.direction = event.key
                break;
            }
        }  
    }

    // 创建一个控制蛇移动的方法
    run() {
        /**
         * 根据 this.direction 的值来改变方向
         * 向上  top 减少
         * 向下  top 增加
         * 向左  lef 减少
         * 向右  lef 增加
         */
        // 获取蛇现在的坐标
        let X = this.snake.X
        let Y = this.snake.Y

        switch (this.direction) {
            // 上
            case 'Up': 
            case 'ArrowUp':
                Y -= 10 
                break;
            // 下
            case 'Down': 
            case 'ArrowDown':
                Y += 10  
                break;
            // 左
            case 'Left': 
            case 'ArrowLeft':
                X -= 10 
                break;
            // 右
            case 'Right': 
            case 'ArrowRight':
                X += 10
                break; 
            default:
                break;
        }
        // 检查蛇是否吃到食物
        this.changFood(X,Y) 
        
        // 赋值 X, Y
        try {
            this.snake.X = X
            this.snake.Y = Y
            // let val = {
            //     X,
            //     Y
            // }    
            // this.snake.coord(val)
        } catch (e) {
            alert(e + ' Game Over')
            this.isLive = false
        }

        // 开启一个定时调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }
    // 检查蛇是否吃到食物
    changFood(x: number, y: number) {
        if(this.food.X === x && this.food.Y === y) {
            // 改变food 位置
            this.food.change()
            // 增加分数
            this.scorePanel.addScore()
            // 增加蛇长度
            this.snake.addBodies()
        }
    }

}
export default GameControl