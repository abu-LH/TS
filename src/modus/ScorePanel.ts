class ScorePanel {
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    // 表示最大等级
    maxLev: number;
    //表示多少分升级
    upScore: number;

    constructor(maxLev: number = 10, upScore: number = 10){
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        this.maxLev = maxLev
        this.upScore = upScore
    }
    // 加分
    addScore() {  
        this.scoreEle.innerHTML = ++this.score + ''
        if( this.score % this.upScore == 0) {
            this.levelUp()
        }
    }
    // 升级
    levelUp() {
        if(this.level < this.maxLev) { 
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}
export default ScorePanel