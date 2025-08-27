const choice = ["rock", "paper", "scissors"];
gameOver = false;
let round = 0;
let humanScore = 0;
let computerScore = 0;
let endText;

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
    if(result.style.display != "none") hideScore(); //hides score

    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
        button.disabled = false; // enable buttons
    });
}

function endGame(humanScore){
    gameOver = true;
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
        button.disabled = true; // disable buttons
    });

    //show result message
    const result = document.querySelector(".result-text");
    if(humanScore === 5){
        result.textContent = "CONGRATULATIONS YOU WON!"
    }
    else{
        result.textContent = "AWW YOU LOST :("
    }
    
    //add new text
    const container = document.querySelector(".result");
    endText = document.createElement("p");
    endText.textContent = "Click Reset to restart the game";
    endText.classList.add("result-text");
    endText.style.fontSize = "13px";
    container.appendChild(endText);
    container.classList.add("result");
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
const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        playRound(button.id, getComputerChoice());
    });
});

//reset button
const resetBtn = document.querySelector("#reset");

resetBtn.addEventListener("click", () =>{
    if(gameOver){
        endText.remove();
    }
    reset();
});