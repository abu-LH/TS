class Snake {
    // 获取蛇的容器
    snakeEle: HTMLElement;
    // 蛇的头部
    head: HTMLElement; 
    // 蛇的身体
    bodies: HTMLCollection;
    constructor() {
        this.snakeEle = document.getElementById('snake')!
        this.head = document.querySelector('#snake>div') as HTMLElement
        this.bodies = this.snakeEle.getElementsByTagName('div')
    }
    // 获取坐标
    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }
    // 设置坐标
    set X(val: number) {
        if(this.X === val) return

        if(val > 290 || val < 0) {
            // 蛇完蛋了
            throw new Error('蛇撞墙了')
        }
        
        // 设置left坐标时， 如果蛇头向左移动，就不可以马上向右掉头移动
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === val) { 
            console.log('水平调头了');
            // 发生调头了继续按原来方向走
            if(this.X > val) {
                val = this.X + 10
            }else{
                val = this.X - 10
            } 
        }
        // 移动身体
        this.moveBody()
        // 设置left坐标
        this.head.style.left = val + 'px'
        this.checkHeadBody()
    } 
    set Y(val: number) {
        if(this.Y === val) return
        if(val > 290 || val < 0) {
            // 蛇完蛋了
            throw new Error('蛇撞墙了')
        }
        // 设置top坐标时， 如果蛇头向上移动，就不可以马下向右掉头移动
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === val) { 
            console.log('上下调头了');
            // 发生调头了继续按原来方向走
            if(this.Y > val) {
                val = this.Y + 10
            }else{
                val = this.Y - 10
            } 
        }
         // 移动身体
         this.moveBody()
         // 设置top坐标
        this.head.style.top = val + 'px'
        this.checkHeadBody()
    } 
    // 添加蛇身体长度
    addBodies() {
        this.snakeEle.insertAdjacentHTML('beforeend', '<div></div>')
    } 
    // 蛇移动身体
    moveBody() {
        // 便利蛇的身体  
        console.log(this.bodies);
        
        for(let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前边身体的位置
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop; 
            
            // 将这个值设置到当前身体
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px'; 
           
        }
    }
    // 检查身体是否被头撞到 
    checkHeadBody() {
        for (let i: number = 1; i < this.bodies.length; i++) {  
            let left = (this.bodies[i] as HTMLElement).offsetLeft
            let top = (this.bodies[i] as HTMLElement).offsetTop
            if(this.X === left && this.Y === top) { 
                throw new Error('撞到自己了')
            }
        }
    }
    
}

export default Snake