const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine , world;
var snakeArr , bug , snakeLength , snakeHead;
var value , framecount , hit , control;
var gamestate , PLAY , END;

function setup() {
  createCanvas(700 , 700);
  engine = Engine.create();
  world = engine.world;
  bug = new Square(Math.round(random(2 ,68))*10 , Math.round(random(2 , 68))*10);
  snakeHead = new Square(350 , 350);
  framecount = 0;
  snakeLength = 1;
  var a =  [snakeHead.body.position.x ,  snakeHead.body.position.y];
  snakeArr =[a];
  hit = false;
  PLAY = 0;
  END = 1;
  gamestate = PLAY; 
  
}

function draw() {
  if(gamestate == PLAY){
    background(0 , 0 , 0); 
  Engine.update(engine); 
  rectMode(CENTER);
  bug.display("red");
  snakeHead.display("white");
  
  if(keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40){
    if( keyCode === 37 && control != 0){
      value = 37;
      control = 0;
    }
    else if( keyCode === 38&& control != 1){
      value = 38;
      control = 1;
    }
    else if( keyCode === 39&& control != 0){
      value = 39;
      control = 0;
    }
    else if( keyCode === 40&& control != 1){
      value = 40;
      control = 1;
    }
  }
  framecount++;
  if(framecount%4 === 0){
    if( value === 37){
      Matter.Body.setPosition(snakeHead.body , {x: snakeHead.body.position.x-10 , y: snakeHead.body.position.y});
    }
    else if( value === 38){
      Matter.Body.setPosition(snakeHead.body , {x: snakeHead.body.position.x , y: snakeHead.body.position.y-10});
    }
    else if( value === 39){
      Matter.Body.setPosition(snakeHead.body, {x:snakeHead.body.position.x+10 , y: snakeHead.body.position.y});
    }
    else if( value === 40){
      Matter.Body.setPosition(snakeHead.body , {x: snakeHead.body.position.x , y: snakeHead.body.position.y+10});
    }
    framecount = 0;
    
    if(snakeHead.body.position.x === bug.body.position.x && snakeHead.body.position.y === bug.body.position.y){
      
      hit = true;
      Matter.Body.setPosition(bug.body ,  {x:Math.round(random(2 ,68))*10 ,y: Math.round(random(2 , 68))*10});
    }
    if(snakeLength>1 && hit === false){
      for(var i = 1;i<snakeLength;i++){
        snakeArr[i-1] = snakeArr[i];
      }
      var a = [snakeHead.body.position.x , snakeHead.body.position.y];
       snakeArr[snakeLength-1] = a;
     }
     else if(hit === true){
       snakeLength++;
       var a = [snakeHead.body.position.x , snakeHead.body.position.y];
       snakeArr.push(a);
       hit = false;
     }
    
   }
   var pos = snakeHead.body.position;
   if(snakeLength>1){
     for(var i = 0; i<snakeLength;i++){
       fill(255);
       rect(snakeArr[i][0] , snakeArr[i][1] , 10, 10);
     }
     for(var i = 0;i<snakeLength-1;i++){
      if(pos.x == snakeArr[i][0] && pos.y == snakeArr[i][1]){
        gamestate = END;
      }
     }
   }
   else{
     var a = [snakeHead.body.position.x , snakeHead.body.position.y];
     snakeArr[0] = a;
    }
    
    if(pos.x === 0 || pos.y === 0 || pos.x === 700 || pos.y === 700){
      gamestate = END;
    }
    
  }
  else{
    textSize(30);
    text("END" , 350 , 350);
    if(keyCode === 32){
      gamestate = PLAY;
      Matter.Body.setPosition(bug.body , {x:Math.round(random(2 ,68))*10 ,y: Math.round(random(2 , 68))*10});
      Matter.Body.setPosition(snakeHead.body , {x:350 , y:350});
      framecount = 0;
      snakeLength = 1;
      var a =  [snakeHead.body.position.x ,  snakeHead.body.position.y];
      snakeArr =[a];
      value = 0;
      control = 2;
      hit = false;
    }
  }
  
  
  
  
  
}