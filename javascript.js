const choice = ["rock", "paper", "scissors"];
let round = 0;
let humanScore = 0;
let computerScore = 0;

function getComputerChoice(){
    let num = Math.floor(Math.random() * 3);
    return choice[num];
}

function loseRound(humanChoice, computerChoice){
    const topText = document.querySelector(".result-text");
    topText.textContent = "You lose! " + computerChoice + " beats " + humanChoice;
}

function winRound(humanChoice, computerChoice){
    const topText = document.querySelector(".result-text");
    topText.textContent = "You win! " + humanChoice + " beats " + computerChoice;
}

function drawRound(humanChoice){
    const topText = document.querySelector(".result-text");
    topText.textContent = "It's a draw! We both played " + humanChoice;
}

function updateScore(humanScore, computerScore){
    const hScore = document.querySelector("#human-score");
    const cScore = document.querySelector("#computer-score");
    const nRound = document.querySelector("#round");

    hScore.textContent = humanScore;
    cScore.textContent = computerScore;
    nRound.textContent = round;
}

function hideScore(){
    const score = document.querySelectorAll(".score.num");
    score.forEach((div) =>{
        div.style.display = "none";
    });

    const result = document.querySelector(".result-text");
    result.style.display = "none";
}

function showScore(){
    const score = document.querySelectorAll(".score.num");
    score.forEach((div) =>{
        div.style.display = "flex";
    });

    const result = document.querySelector(".result-text");
    result.style.display = "flex";
}

function reset(){
    humanScore = 0;
    computerScore = 0;
    round = 0;

    const result = document.querySelector(".result-text")
    if(result.style.display != "none") hideScore(); //hides score if it wasn't
}

function endGame(humanScore){
    //hide top container
    const topContainer = document.querySelector(".container.top");
    topContainer.style.display = "none";

    //show result message
    const result = document.querySelector(".result-text");
    if(humanScore === 5){
        result.textContent = "CONGRATULATIONS YOU WON!"
    }
    else{
        result.textContent = "AWW YOU LOST :("
    }
    
    //add play again button
    const container = document.querySelector(".result");
    const playAgain = document.createElement("button");
    playAgain.textContent = "Play again";
    playAgain.classList.add("reset-btn");
    playAgain.style.fontSize = "20px";
    container.appendChild(playAgain);
    container.classList.add("result");

    playAgain.addEventListener("click", () =>{
        topContainer.style.display = "flex";
        playAgain.remove();
        reset();
    });
}

function playRound(humanChoice, computerChoice){
    const result = document.querySelector(".result-text");
    if(result.style.display != "flex") showScore(); //show score if it's hidden

    if(humanChoice === "paper" && computerChoice === "rock" ||
         humanChoice === "rock" && computerChoice === "scissors" || 
         humanChoice === "scissors" && computerChoice === "paper"){
       
        winRound(humanChoice, computerChoice);
        humanScore++;
    }
    else if(humanChoice === "paper" && computerChoice === "scissors" ||
        humanChoice === "rock" && computerChoice === "paper" ||
        humanChoice === "scissors" && computerChoice === "rock"){

        loseRound(humanChoice, computerChoice);
        computerScore++;
    }
    else{
        drawRound(humanChoice);
    }

    round++;

    if(humanScore === 5 || computerScore === 5) endGame(humanScore);
    updateScore(humanScore, computerScore);
}

//choice buttons
const choiceButtons = document.querySelectorAll(".btn");

choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        playRound(button.id, getComputerChoice());
    });
});

//reset button
const resetBtn = document.querySelector("#reset");

resetBtn.addEventListener("click", reset);
