//Setting up the game space 
const myCanvas = document.querySelector("canvas");
const ctx = myCanvas.getContext("2d");
myCanvas.style.border ="2px solid black";

// Creating the components
const startButton = document.getElementById("start-button");
const curtains = document.querySelectorAll(".curtain");
const leftCurtain = document.querySelector(".curtain.left");
const rightCurtain = document.querySelector(".curtain.right");

const playButton = document.querySelector("#play-button");
const characterSelection = document.querySelector(".character-selection");
const newScreen = document.querySelector(".new-screen");
const canvas = document.querySelector("#canvas");

const aliceSelection = document.querySelector("#select-alice");
const catSelection = document.querySelector("#select-cat");
const madhatterSelection = document.querySelector("#select-madhatter");

const endGameSection = document.querySelector(".end-game-screen");
const winScreen = document.querySelector(".win-screen");
const gameOverLife = document.querySelector(".game-over-life");
const startOverBtn = document.querySelectorAll(".start-over-btn");

// Defining players
let playerX = 50;
let playerY = 50;
let playerHeight = 110;
let playerWidth = 70;
let playerSpeed = 4.3;


// Adding event listeners for character selection & displaying "Play" button only after the user selects a character
const player = new Image ()


const drawCharacter = () => {
    ctx.drawImage(player, playerX, playerY, playerWidth, playerHeight);
}


//Creating the components 

//The backgrounds
const bgImg = new Image();
bgImg.src = "images/bg-3.jpg";

const bgImg2 = new Image();
bgImg2.src = "images/bg-3.jpg";

let bg1X=0;
let bg2X =  - myCanvas.width;



// OBSTACLES
//Mushrooms
function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const obsMush = new Image();
    obsMush.src = "images/neon_mush.png";
  let obsMushX = myCanvas.width;
  let obsMushY;
  let obsMushWidth = 40;
  let obsMushHeight = 40;
  let obsMushSpeed = -4;


const drawMushObstacles = () => {
    obsMushX += obsMushSpeed;
    if(obsMushX < 0){
        obsMushX= myCanvas.width;
        obsMushY = randomize(10, myCanvas.height - obsMushHeight);
    }
}


// Card guards
const obsCards = new Image();
    obsCards.src = "images/card.png";
  let obsCardsX = myCanvas.width;
  let obsCardsY;
  let obsCardsWidth = 90;
  let obsCardsHeight = 120;
  let obsCardsSpeed = -2.8;

const drawCardsObstacles = () => {
    obsCardsX += obsCardsSpeed;
    if(obsCardsX < 0){
        obsCardsX= myCanvas.width;
        obsCardsY = randomize(5, myCanvas.height - obsCardsHeight);
    }
}

// Drink me potion
const obsPotion = new Image();
    obsPotion.src = "images/potion.png";
  let obsPotionX = myCanvas.width;
  let obsPotionY;
  let obsPotionWidth = 70;
  let obsPotionHeight = 40;
  let obsPotionSpeed = -3.5;


const drawPotionObstacles = () => {
    obsPotionX += obsPotionSpeed;
    if(obsPotionX < 0){
        obsPotionX= myCanvas.width;
        obsPotionY = randomize(5, myCanvas.height - obsPotionHeight);
    }
}


// Check for collisions 

let score = 0;

const checkCollision =() => {
// let score = 0;

    let playerLeft = playerX;
    let playerRight = playerX + playerWidth;
    let playerTop = playerY;
    let playerBottom = playerY + playerHeight;

    //For objects:
    let obsMushLeft = obsMushX;
    let obsMushRight = obsMushX + obsMushWidth;
    let obsMushTop = obsMushY;
    let obsMushBottom = obsMushY + obsMushHeight;

    let obsCardsLeft = obsCardsX;
    let obsCardsRight = obsCardsX + obsCardsWidth;
    let obsCardsTop = obsCardsY;
    let obsCardsBottom = obsCardsY + obsCardsHeight;

    let obsPotionLeft = obsPotionX;
    let obsPotionRight = obsPotionX + obsPotionWidth;
    let obsPotionTop = obsPotionY;
    let obsPotionBottom = obsPotionY + obsPotionHeight;


    // Mushroom collision (point loss)
    if (playerRight > obsMushLeft && playerLeft < obsMushRight && playerBottom > obsMushTop && playerTop < obsMushBottom) {
        score -= 10;
        gameOver = false;
        // Do this to make sure the mushroom goes up and disappears once touched
        obsMushY = 1000;
        if (score === -10){
            gameOver = true;

        }
    }

    // For cards - game over 

    if (playerRight > obsCardsLeft && playerLeft < obsCardsRight && playerBottom > obsCardsTop && playerTop < obsCardsBottom) {
        gameOver = true;
        
    }

    // For Potions - winning points 
if(score >= 100){
    gameOver = true;
}

    if (playerRight > obsPotionLeft && playerLeft < obsPotionRight && playerBottom > obsPotionTop && playerTop < obsPotionBottom) {
        score += 20;
        gameOver = false;
        // Do this to make sure the mushroom goes up and disappears once touched
        obsPotionY = 1000;
    }
}
    

    // Display score 
    const displayScore = () => {
    ctx.fillStyle = "white";
    ctx.font = "10px Arial";
    ctx.fillText(`Score: ${score}`, 20, myCanvas.height - 20);
    }



// Game variables 
let gameOver = false; 
let animateId;

//for the characters 
let isMovingDown = false;
let isMovingLeft = false;
let isMovingRight = false;
let isMovingUp = false;


//Starting the game only when pressing the playbutton:
// const playGame = () => { 
window.addEventListener('load', () => {


//Clicking on the "Start button" to open the curtains and seing the select character screen behind
document.getElementById("start-button").onclick = () => {
    startButton.style.display = "none";
    leftCurtain.style.transform = "translateX(-100%)";
    rightCurtain.style.transform = "translateX(100%)";
    playButton.style.display = "none";
    characterSelection.style.display = "block";
    endGameSection.style.display = "none";
     gameSong.play();
};



aliceSelection.addEventListener("click", () => {
    player.src = "images/alice.png";
    playButton.style.display = "block";
    
});

catSelection.addEventListener("click", () => {
    player.src = "images/cat.png";
    playButton.style.display = "block";
});

madhatterSelection.addEventListener("click", () => {
    player.src = "images/madhatter.png";
    playButton.style.display = "block";
});



document.querySelector("#play-button").onclick = () => {
    if(player.character === "") {
        return "Select a character!"
    } else {
        newScreen.style.display = "block";
        canvas.style.display ="block";
        characterSelection.style.display = "none";
        winScreen.style.display = "none";
        gameOverLife.style.display = "none";
        // startOverBtn.style.display = "none";
        endGameSection.style.display ="none";
        drawCharacter();
    }
        gameOver = false; 
        startGame();
        gameSong.pause();
        gameSong.currentTime = 19;
        gameSong.play();
                

};


    startOverBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            // starts the game over by reloading the page
            location.reload();  
        });
    });


    // Global animation function
    function animate(){


    // Adding the backgrounds 
    ctx.drawImage(bgImg, bg1X, 0, myCanvas.width, myCanvas.height);
    ctx.drawImage(bgImg2,bg2X, 0, myCanvas.width, myCanvas.height);
    
    ctx.drawImage(obsMush, obsMushX, obsMushY, obsMushWidth, obsMushHeight);
    ctx.drawImage(obsCards, obsCardsX, obsCardsY, obsCardsWidth, obsCardsHeight);
    ctx.drawImage(obsPotion, obsPotionX, obsPotionY, obsPotionWidth, obsPotionHeight);


    //calling the obs object
    drawMushObstacles();

    drawCardsObstacles();

    drawPotionObstacles();

    drawCharacter();

    checkCollision();

    displayScore();


    //Player animations
    if (isMovingRight){
    playerX += playerSpeed;
    }

    if (isMovingLeft){
    playerX -= playerSpeed;
    }

    if(isMovingUp){
    playerY -= playerSpeed;
    }
    if(isMovingDown){
    playerY += playerSpeed;
    }


    // Background animations
    bg1X -= 1;
    bg2X -= 1;

        if(bg1X < 0 - myCanvas.width){
        bg1X = myCanvas.width
        }
        if(bg2X < 0 - myCanvas.width){
        bg2X = myCanvas.width
        }



    function endGame(){
        canvas.style.display = "none";
        myCanvas.style.display = "none";
        characterSelection.style.display = "none"
        endGameSection.style.display = "block";
        winScreen.style.display = "none";
        gameOverLife.style.display = "block";
        newScreen.style.display = "none";
        gameOver = true;
        gameSong.pause();
        
        // startOverBtn.forEach(btn => btn.style.display = "block");
    }


    function winGame(){
        canvas.style.display = "none";
        myCanvas.style.display = "none";
        characterSelection.style.display = "none";
        endGameSection.style.display = "block";
        winScreen.style.display = "block";
        gameOverLife.style.display = "none";
        newScreen.style.display = "none";
        gameOver = true;
        gameSong.pause()
        // startOverBtn.forEach(btn => btn.style.display = "block");
    }    


    if(!gameOver){
        animateId = requestAnimationFrame(animate);
        } 
        else {
            cancelAnimationFrame(animateId);
            gameoverSong.currentTime = 21;
            gameoverSong.play();
            if(score>=100){
                winGame();
            }else{
                endGame();
            }
            
        }
    }

    // starting the game
    function startGame() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        animate(); 
    }


    // Adding event listeners 
    document.addEventListener('keypress', event => {
        console.log(event);
        if (event.key === '6'){
        isMovingRight = true
        } 
        if (event.key === '4'){
        isMovingLeft = true
        } 

        if (event.key === '8'){
        isMovingUp = true
        } 

        if (event.key === '2'){
        isMovingDown = true
        } 
    })

        document.addEventListener('keyup', ()=> {
        isMovingDown = false;
        isMovingLeft = false;
        isMovingRight = false;
        isMovingUp = false;
         })


// Music 
let gameSong= new Audio("sounds/forest-walk.mp3")
gameSong.volume = 0.3;

let gameoverSong= new Audio("sounds/punctus.mp3")
gameoverSong.volume = 0.2;


 });
