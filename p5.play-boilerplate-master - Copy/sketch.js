var snowman,snow2,snow2Image
var ground,restart,restartImage
var snowball,gameState=0,snowmanImage
var fireball,fireballGroup,FireballImage,snowballGroup,bgImage,miss,missImage
var sound,Game,GameImage
var missGroup,score=0
var fireball1,fireball1Image,fireball1Group
var del

function preload() 
{
  FireballImage=loadImage("astroid.png")
  bgImage=loadImage("bg.jpeg")
  snowmanImage=loadImage("d.png")
  missImage=loadImage("miss.png")
  GameImage=loadImage("game.png")
  sound=loadSound("laser.mp3")
  restartImage=loadImage("b.png")
  // snow2Image=loadImage("space ship.png")
   
}
  function setup() {
  createCanvas(windowWidth,windowHeight);
  edges=createEdgeSprites()
  ground=createSprite(width/2,height-10,width,20)
  snowman=createSprite(700, height-50, 50, 50);
  snowman.addImage(snowmanImage)
  snowman.scale=0.4
  snowman.depth=2
  

  missGroup= new Group()
  // snow2=createSprite(800, height-50, 50, 50);
  // snow2.addImage(snow2Image)
  // snow2.scale=0.4
  // snow2.depth=2
 
  fireballGroup= new Group()
  fireball1Group= new Group()
  Game=createSprite(width/2,height-490)
  Game.addImage(GameImage)
  Game.scale=1
  Game.visible=false
 

  // snowballGroup= new Group

  restart=createSprite(width/2,height-300)
  restart.addImage(restartImage)
  restart.scale=0.3
  restart.visible=false
}



function draw() {
  background(bgImage);
textSize(30)
fill("white") 
text("Score: "+ score,width-200,100)
snowman.collide(edges[0])
snowman.collide(edges[1])
// console.log(snowman.y)

if(gameState===0)
{
  Game.visible=false
 restart.visible=false
 
 
if(fireballGroup.isTouching(ground))
{
  fireballGroup.bounceOff(ground)
  
}

if(fireball1Group.isTouching(ground))
{
  fireball1Group.bounceOff(ground)
}
//  F  I  R  S  T  -  P  L  A  Y  E  R
if(keyDown("UP_ARROW")&&snowman.y>=712)
  {
    snowman.velocityY=-15

  }
   snowman.velocityY+=0.8

  if(keyDown(LEFT_ARROW))
  {
    snowman.x-=6
  }
  if(keyDown(RIGHT_ARROW))
  {
    snowman.x+=6
  }
  if(missGroup.isTouching(fireballGroup))
  {
    score=score+10
    fireballGroup.destroyEach()
    missGroup.destroyEach()
  }
  if(missGroup.isTouching(fireball1Group))
  {
    score=score+10
    fireball1Group.destroyEach()
    missGroup.destroyEach()
  }
  //   S  E  C  O  N  D  -  P  L  A  Y  E  R
  
  // if(keyDown("W")&&snow2.y>=712)
  // {
  //   snow2.velocityY=-15
  // }
  //  snow2.velocityY+=0.8

  // if(keyDown("A"))
  // {
  //   snow2.x-=2
  // }
  // if(keyDown("D"))
  // {
  //   snow2.x+=2
  // }
createMissile()
spawnFireBall()
fireBall()

if(fireballGroup.isTouching(snowman)||fireball1Group.isTouching(snowman))
{
  gameState=1
  
}
}
else if(gameState===1)
{
  fireballGroup.destroyEach()
  
  // snow2.destroy(0)
 Game.visible=true
 restart.visible=true

  if(mousePressedOver(restart))
  {
   reset()
  }
}
  snowman.collide(ground)
  drawSprites();
}

function spawnFireBall()
{
  if(frameCount%150===0)
  {
    fireball=createSprite(width+10,Math.round(random(100,height-400)),20,20)
    fireball.addImage(FireballImage)
    fireball.scale=0.3
    fireball.x=Math.round(random(20,width-20))
    fireball.y=-10
    fireball.velocityY=5+score*2/50
    fireball.lifetime=width/5
    fireballGroup.add(fireball) 
  }
  
}
function createMissile()
{
  if(keyDown("space"))
  {

  
  miss=createSprite(snowman.x,snowman.y)
  miss.addImage(missImage)
  miss.velocityY=-8
  miss.scale=0.1
  miss.lifetime=width/8
  missGroup.add(miss)
  
  }
}

function reset()
{
  gameState = 0
  Game.visible=false
  restart.visible=false
}

function fireBall()
{
  if(frameCount%200===0)
  {
    fireball1=createSprite(width+10,Math.round(random(50,height-300)),20,20)
    fireball1.addImage(FireballImage)
    fireball1.scale=0.3
    fireball1.x=Math.round(random(20,width-20))
    fireball1.y=-10
    fireball1.velocityY=5+score*2/50
    fireball1.lifetime=width/5
    fireball1Group.add(fireball1) 

  }
}