var boy,boyImg,sickBoyImg;
var mask,maskImg;
var sanitizer,sanitizerImg;
var virus,virus1Img;
var virus2Img;
var bgImg;
var heart1,heart1Img;
var heart2,heart2Img;
var heart3,heart3Img;
var brokenHeartImg;
var water,waterImg;
var instruction,instructionImg;
var boyWithGunImg;

var gameState = "START";

var touch = 0;
var score = 0;

function preload(){
bgImg = loadImage("./assets/bg.png");
boyImg = loadImage("./assets/healthy boy.png");
sanitizerImg= loadImage("./assets/sanitizer.png");
maskImg = loadImage("./assets/mask.png");
virus1Img= loadImage("./assets/virus1.png");
virus2Img = loadImage("./assets/virus2.png");
sickBoyImg = loadImage("./assets/sick boy.png");
heart1Img = loadImage("./assets/heart1.png");
heart2Img = loadImage("./assets/heart2.png");
heart3Img = loadImage("./assets/heart3.png");
waterImg = loadImage("./assets/water.png");
instructionImg = loadImage("./assets/instruction.png");
brokenHeartImg = loadImage("./assets/brokenHeart.png");
boyWithGunImg = loadImage("./assets/boyWithGun.png");
}

function setup() {
  createCanvas(600,600);


boy = createSprite(45,300);
boy.scale = 0.6;
boy.addImage(boyImg);

 mask = createSprite(380,30);
mask.addImage(maskImg);
mask.scale = 0.19;

 sanitizer = createSprite(380,90);
sanitizer.addImage(sanitizerImg);
sanitizer.scale = 0.19;

 virus = createSprite(360,180);
virus.addImage(virus1Img);
virus.scale = 0.15;

 heart1 = createSprite(25,20);
heart1.addImage(heart1Img);
heart1.scale = 0.08;

 heart2 = createSprite(60,20);
heart2.addImage(heart2Img);
heart2.scale = 0.08;

 heart3 = createSprite(95,20);
heart3.addImage(heart3Img);
heart3.scale = 0.08;

water = createSprite(boy.x,boy.y+5,20,20);
water.addImage(waterImg);
water.visible = false;
water.scale = 0.5;


 instruction = createSprite(300,300);
instruction.addImage(instructionImg);
instruction.scale = 1.72;


}

function draw() {
  background(bgImg);  
  
  if(gameState === "START"){
    instruction.visible = true;
  }
  
  if(mousePressedOver(instruction)){
    instruction.visible = false;
    gameState = "PLAY";
  }
 
  
  if(gameState ==="PLAY"){
  if(keyDown(UP_ARROW)){
    boy.y = boy.y-5;
  }
  
  if(keyDown(DOWN_ARROW)){
    boy.y = boy.y+5;
  }
  
  mask.velocityX = -7;
  if(mask.x<0|| mask.x>600){
    mask.x = 380;
    mask.y = random(32,570);
  }
  
  sanitizer.velocityX = -7;
  if(sanitizer.x<0|| sanitizer.x>600){
    sanitizer.x = 380;
    sanitizer.y = random(32,570);
  }
  
  virus.velocityX = -7;
  
  
  if(boy.isTouching(virus)){
    virus.x = 380;
    virus.y = random(32,570);
    touch = touch +1;
    score = 0;
    boy.addImage(sickBoyImg);
  }
  
  if(touch === 1){
    heart1.addImage(brokenHeartImg);
  }
  if(touch === 2){
    heart2.addImage(brokenHeartImg);
  }
  if(touch === 3){
    heart3.addImage(brokenHeartImg);
    boy.destroy();
    virus.destroy();
    sanitizer.destroy();
    mask.destroy();
    
  }
  if(virus.x<0||virus.x>600){
    virus.x = 380;
    virus.y = random(32,570);
  }
  
  if(boy.isTouching(sanitizer)){
    score = score+5;
    sanitizer.x = 380;
    sanitizer.y = random(32,570);
  }
  
  
  if(boy.isTouching(mask)){
    score = score+5;
    mask.x = 380;
    mask.y = random(32,570);
  }

  if(water.isTouching(virus)){
    virus.x = 380;
    virus.y = random(32,570);
    score= score+10;
  }

  if(score>100){
    boy.addImage(boyImg);
    mask.velocityX = -7;
    sanitizer.veloctiyX = -7;
    virus.addImage(virus2Img);
  }
  
  if(keyWentDown("space")){
    boy.addImage(boyWithGunImg);
    water.x = boy.x;
    water.y = boy.y+5;
    water.addImage(waterImg);
    water.visible = true;
    water.scale = 0.07;
    water.velocityX = 5;
    
  }

  if(keyWentUp("space")){
    boy.addImage(boyImg);
    
  }

  
  
  
  }
  
  
  drawSprites();
  fill("black");
  textSize(20);
  text("score: "+score,380,20);
  

}