// Alice in Wonderlan JS doc


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


//Clicking on the "Start button" to open the curtains and seing the select character screen behind
document.getElementById("start-button").onclick = () => {
    startButton.style.display = "none";
    leftCurtain.style.transform = "translateX(-100%)";
    rightCurtain.style.transform = "translateX(100%)";
    playButton.style.display = "none";
    // playButton.style.display = "block";
    characterSelection.style.display = "block";
};


//Clicking on the "Start button" to open the curtains and seing the select character screen behind
// document.querySelector("#play-button").onclick = () => {
//     playGame();
// };


// Defining players
let playerX = 50;
let playerY = 40;
let playerHeight = 40;
let playerWidth = 40;
let playerSpeed = 5;


// Adding event listeners for character selection & displaying "Play" button only after the user selects a character
const player = new Image ()

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


// document.querySelector("#play-button").onclick = () => {
//     if(player.character === "") {
//         return "Select a character!"
//     } else {
//         // playGame();
//         newScreen.style.display = "block";
//         canvas.style.display ="block";
//         drawCharacter();
//         // Start the game loop
//     }
// };


const drawCharacter = () => {
    ctx.drawImage(player, playerX, playerY, playerWidth, playerHeight);
}



// Clicking on the "Play game button"
document.querySelector("#play-button").onclick = () => {
    newScreen.style.display = "block";
    canvas.style.display ="block";
};


//Creating the components 

//The backgrounds
const bgImg = new Image();
bgImg.src = "images/bg-3.jpg";
;
const bgImg2 = new Image();
bgImg2.src = "images/bg-3.jpg";
;
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
  let obsMushWidth = 10;
  let obsMushHeight = 10;
  let obsMushSpeed = -3;


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
  let obsCardsWidth = 60;
  let obsCardsHeight = 35;
  let obsCardsSpeed = -1.5;


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
  let obsPotionWidth = 45;
  let obsPotionHeight = 15;
  let obsPotionSpeed = -2;


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

    // let obsPotionsLeft = obsPotionsX;
    // let obsPotionsRight = obsPotionsX + obsPotionsWidth;
    // let obsPotionsTop = obsPotionsY;
    // let obsPotionsBottom = obsPotionsY + obsPotionsHeight;


    // Mushroom collision (point loss)
    if (playerRight > obsMushLeft && playerLeft < obsMushRight && playerBottom > obsMushTop && playerTop < obsMushBottom) {
        score -= 10;
        gameOver = false;
    }

    // For cards - game over 

    if (playerRight > obsCardsLeft && playerLeft < obsCardsRight && playerBottom > obsCardsTop && playerTop < obsCardsBottom) {
        alert ("Captured by the guard");
        gameOver = true;
}

    // For Potions - winning points 


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
    window.onload = () => {

document.querySelector("#play-button").onclick = () => {
    if(player.character === "") {
        return "Select a character!"
    } else {
        // playGame();
        newScreen.style.display = "block";
        canvas.style.display ="block";
        drawCharacter();
        // Start the game loop
    }
};
        //  document.querySelector("#play-button").onclick = () => {
            startGame();
        //  };
        
    // Global animation function
    function animate(){
    // ctx.clearRect(0,0, canvas.width, canvas.height)

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




    // starting the game
    if(!gameOver){
        animateId = requestAnimationFrame(animate);
        }else{
        cancelAnimationFrame(animateId);
        characterSelection.style.display = "block"
        }
    }

    


    function startGame() {
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


    };
// };
