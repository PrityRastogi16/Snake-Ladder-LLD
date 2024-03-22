class SnakeAndLadderGame{
    constructor(snakes, ladders, players){
        this.snakes = snakes;
        this.ladders = ladders;
        this.players = players;
        this.playerPosition = {};
        this.currPlayerPosition = 0;
        this.winner = null;
        this.startingPlayePosition();
    }

    startingPlayePosition(){
        this.players.forEach(player=>{
            this.playerPosition[player] = 0; 
        })
    }
    rollDice(){
        return Math.floor(Math.random()*6)+1;
       
    }

    movePlayer(player, steps){
       let currPosition = this.playerPosition[player];
       let postionAfterMove = currPosition + steps;
       if(postionAfterMove > 100){
         postionAfterMove = currPosition;
       }
       this.snakes.forEach(snake=>{
        if(snake.head == postionAfterMove){
            postionAfterMove = snake.tail;
        }
       });
       this.ladders.forEach(ladder=>{
        if(ladder.start === postionAfterMove){
            postionAfterMove = ladder.end;
        }
       });
       this.playerPosition[player] = postionAfterMove;
    }
    playTurn(){
        const currPlayer = this.players[this.currPlayerPosition];
        const diceValue = this.rollDice();
        const currentPosition = this.playerPosition[currPlayer];
        this.movePlayer(currPlayer, diceValue);
        const newPosition = this.playerPosition[currentPosition];
        console.log(`${currPlayer} rolled a ${diceValue} and moved from ${currentPosition} to ${newPosition}`);

        if(newPosition == 100){
            this.winner = currPlayer;
            console.log(`${currPlayer} wins the match`);
        }
        this.currPlayerPosition = (this.currPlayerPosition+1) % this.players.length;
    }
    startGame(){
        while(!this.winner){
            this.playTurn();
        }
    }
}

// INPUT SNAKE


// const game = new SnakeAndLadderGame([], [], []);
// console.log(game.rollDice());