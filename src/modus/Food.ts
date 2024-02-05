import Snake from "./Snake";
class Food {
    snake: Snake;
    // 食物元素
    element: HTMLElement
    // 最大移动宽度
    maxWid: number; 
    constructor(maxWid: number = 29) {
        this.snake = new Snake()
        this.element = document.getElementById('food')!
        this.maxWid = maxWid
    }
    // 获取坐标
    get X() { 
        return this.element.offsetLeft
    }
    get Y() { 
        return this.element.offsetTop
    } 
    // 修改坐标
    change(){
        // 生成一个食物的坐标
        // 食物位置0 ，290
        // 蛇一次移动一格，一格大小10
        const left = Math.round(Math.random() * this.maxWid) * 10
        const top = Math.round(Math.random() * this.maxWid) * 10
        // 检查食物位置是否和蛇身体位置重合
        for (const key in this.snake.bodies) {
            let ele = this.snake.bodies[key] as HTMLElement
            if (ele.offsetLeft == left && ele.offsetTop == top) { 
                this.change()
                return
            }
        } 
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}
export default Food