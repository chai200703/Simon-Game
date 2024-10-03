//alert("attached");
var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

for(var i=0;i<document.querySelectorAll(".btn").length;i++){
    document.querySelectorAll(".btn")[i].addEventListener("click",function(){
        var userChosenColour=this.attributes.id.value;
        userClickedPattern.push(userChosenColour);
        console.log(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
       
         
    });

}
var level=0;

var started=false;

document.addEventListener("keydown",function(e){
    if(!started){
        var heading="Level "+level;
        document.getElementById("level-title").innerHTML=heading;
        nextSequence();
        started=true;
        
    }
   
    
});

function nextSequence(){
    userClickedPattern=[];
   level++;
   var heading="Level "+level;
   document.getElementById("level-title").innerHTML=heading;
   
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    var activeButton=document.querySelector("."+randomChosenColour);
    activeButton.classList.add("fade-in");
    setTimeout(function()
    {activeButton.classList.remove("fade-in")}
    ,100);
    playSound(randomChosenColour);
  
     
}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
     audio.play();
}
function animatePress(currentColour){
    var activeButton=document.querySelector("."+currentColour);
    activeButton.classList.add("pressed");
    setTimeout(function()
    {activeButton.classList.remove("pressed")}
    ,100);
}
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length==userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
    }
  }
  else{
    var wrong=new Audio("sounds/wrong.mp3");
    wrong.play();
    wrongClick=document.querySelector("body");
    wrongClick.classList.add("game-over");
    setTimeout(function(){
        wrongClick.classList.remove("game-over");
    },200);
    document.getElementById("level-title").innerHTML="Game Over, Press Any Key to Restart";
   startOver();
}
}
function startOver(){
   
   gamePattern=[]; 
    level=0;
    started=false;
}