let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keypress(function() {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() { 
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animateButton(userChosenColour);
    
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    
    let randomNum = Math.floor(Math.random() * 4);
    let randomColour = buttonColours[randomNum];
    gamePattern.push(randomColour);
    
    animateButton(randomColour);
    playSound(randomColour);
}

function checkAnswer(currentLevel) {
    for (let i = 0; i <= currentLevel; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            playSound("wrong");

            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
            return;
        }
    }

    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(color) {
    let audio = new Audio("sounds/" + color + ".mp3"); 
    audio.play();
}

function animateButton(color) {
    $("#" + color).fadeOut(100).fadeIn(100);
}