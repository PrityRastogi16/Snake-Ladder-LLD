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
        const newPosition = this.playerPosition[currPlayer];
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
const snakes = [
    { head: 62, tail: 5 },
    { head: 33, tail: 6 },
    { head: 49, tail: 9 },
    { head: 88, tail: 16 },
    { head: 41, tail: 20 },
    { head: 56, tail: 53 },
    { head: 98, tail: 64 },
    { head: 93, tail: 73 },
    { head: 95, tail: 75 }
];

const ladders = [
    { start: 2, end: 37 },
    { start: 27, end: 46 },
    { start: 10, end: 32 },
    { start: 51, end: 68 },
    { start: 61, end: 79 },
    { start: 65, end: 84 },
    { start: 71, end: 91 },
    { start: 81, end: 100 }
]

const players = ["Prity", "Sahil"];

const game = new SnakeAndLadderGame(snakes,ladders, players);
game.startGame();
