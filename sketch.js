var helicopterIMG, helicopterSprite, packageSprite, packageIMG, zombieANI;
var packageBody, ground, zombie, count, tile;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

function preload() {
	helicopterIMG = loadImage("helicopter.png");
	packageIMG = loadImage("package.png");
	zombieANI = loadAnimation("Walk (1).png", "Walk (2).png", "Walk (3).png", "Walk (4).png",
		"Walk (5).png", "Walk (6).png", "Walk (7).png", "Walk (8).png", "Walk (9).png", "Walk (10).png");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	packageSprite = createSprite(width / 2, 80, 10, 10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale = 0.2

	helicopterSprite = createSprite(width / 2, 200, 10, 10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale = 0.6

	groundSprite = createSprite(width / 2, height - 35, width, 10);
	groundSprite.shapeColor = color(0);


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width / 2, 200, 5, { restitution: 1, isStatic: true });
	World.add(world, packageBody);

	//Create a Ground
	ground = Bodies.rectangle(width / 2, 650, width, 10, { isStatic: true });
	World.add(world, ground);

	tile = createSprite(width / 2, 665, 200, 30);
	tile.shapeColor = color(200, 0, 100);
	tile.scale = 0.29;

	count = 0;
	Engine.run(engine);

}


function draw() {
	rectMode(CENTER);
	background(50);
	packageSprite.x = packageBody.position.x;
	packageSprite.y = packageBody.position.y;


	zombie_l();

	keyPressed();

	drawSprites();

	textSize(18);
	fill(color(255));
	text("Let zombie go away from the tile and then press down key to let  package fall on the ground", 20, 20)

}

function keyPressed() {
	if (keyCode === DOWN_ARROW && count >= 6) {
		// Look at the hints in the document and understand how to make the package body fall only on
		Body.setStatic(packageBody, false);
	}
}

function zombie_l() {
	if (frameCount % 50 === 0) {
		zombie = createSprite(50, 600, 10, 10);
		zombie.addAnimation("Lable1", zombieANI);
		zombie.velocityX = 2;
		zombie.scale = 0.29;
		count = count + 1;
	}
	if (count >= 3) {
		zombie.destroy();
	}
}

