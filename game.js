
var buttonColours=["red","blue","green","yellow"];

var gamePattern =[];
var userClickedPattern =[];

var hasBegun = false;
var level = 0;

$(document).on("keypress",function(){
    if(hasBegun== false)
    {
      $('h1').text("Level:" + level);
        next_Sequence();
        hasBegun=true; 
    }
});

$(".btn").on("click",function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
//     console.log(userClickedPattern);
        
    animatePress(userChosenColor);
    playSounds(userChosenColor);
    timerMessage(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    // console.log("userclickedpattern length: " +userClickedPattern[userClickedPattern.length-1]);
    // console.log("game pattern length: " + gamePattern[gamePattern.length-1]);
    //alert("gamepattern array length:" + gamePattern.length);
   // console.log("userclicked array length:" + userClickedPattern.length);
   // console.log(checkAnswer(userChosenColor));
});

function checkAnswer(currentLevel) {
    //var currentLevel = userClickedPattern.length-1;
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        console.log("userclicked pattern length : " +currentLevel.length);
        console.log("game pattern length : " +gamePattern.length);
        console.log(gamePattern);
        console.log(userClickedPattern);
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(next_Sequence(),1000);
        }
    
    }
    else{
        console.log("wrong");
        playSounds("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function next_Sequence()
{
    userClickedPattern =[];
    level++;
    $('h1').text("Level:" + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSounds(randomChosenColour);
}
function startOver(){
    level =0;
    gamePattern =[];
    hasBegun = false;
    console.log("startover activated");
}
//using jquery to target on click event and passing a callback function which creates a var that stores the id target attribute of pressed colour button
//then pushes the variable instance into an array, lastly it plays a sound function which takes the var that stored the id target.
// Inside the click event handler, this refers to the element that was clicked. 




//to play sound
function playSounds(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}
function animatePress(test1) {
    $("#"+test1).on("click",function(){
        $("."+test1).addClass('pressed');
    });
}
function timerMessage(test2){
    setTimeout(function() {
    $("."+test2).removeClass('pressed');
      }, 100);     
   
}

