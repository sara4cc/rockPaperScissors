const choice = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice(){
    let num = Math.floor(Math.random() * 3);
    return choice[num];
}

function getHumanChoice(){
    let human_choice = prompt("Enter your choice (rock, paper or scissors): ")
    return human_choice.toLowerCase();
}

function playRound(humanChoice, computerChoice){

    if(humanChoice === "paper" && computerChoice === "rock" ||
         humanChoice === "rock" && computerChoice === "scissors" || 
         humanChoice === "scissors" && computerChoice === "paper"){
       
        console.log("You win! " + humanChoice + " beats " + computerChoice);
        humanScore++;
    }
    else if(humanChoice === "paper" && computerChoice === "scissors" ||
        humanChoice === "rock" && computerChoice === "paper" ||
        humanChoice === "scissors" && computerChoice === "rock"){

        console.log("You lose! " + computerChoice + " beats " + humanChoice);
        computerScore++;
    }
    else{
        console.log("It's a draw! You both played " + computerChoice);
    }
}

function playGame(){
    for(let i = 1; i <= 5; i++){
        playRound(getHumanChoice(), getComputerChoice());
        console.log("Your points: " + humanScore);
        console.log("Computer's points: " + computerScore);
    }

    if(humanScore > computerScore) console.log("Congratulations! You win!");
    else if (computerScore > humanScore) console.log("You lose!");
    else console.log("It's a draw!");

}
playGame();