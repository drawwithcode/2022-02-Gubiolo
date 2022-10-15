//increase value
let s = 0;
//array declare
let cerchi = [];
//rotation value
let g = 0.3;
let wi;
let he;
let Bool= true;
let mySound;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('./UMI - Midnight Blues [Music Video].mp3');
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    //Set Dimension for Translate transformation
    wi = width / 2;
    he = height / 2;

    amp = new p5.Amplitude();
    //fill the array with 3 circles
    for (let i = 0; i < 3; i++) {
            cerchi.push(new Cerchio(200));
        }
}
//play and stop sound using mouse.
function mousePressed() {
    if (Bool == true) {
        mySound.play();
        mySound.setVolume(0.4);
        Bool = false;


    } else {
        mySound.pause();
        mySound.setVolume(0.4);
        Bool = true;
    }
}

function draw() {
    
    background("#1a66ff");
    
    //text
    textFont("Roboto Mono");
    textSize(13);
    textAlign(CENTER);
    fill("#99ff99");
    text('Move Mouse', mouseX, mouseY);
    textSize(20);
    fill("white")
    text("Chill Out Page", width / 2, height / 2);
    textSize(13);
    text("click screen to chill more", width / 2, height / 2+25);
    
    if (Bool == false) {
        //text
        textSize(13);
        textAlign(CENTER);
        fill("#99ff99");
        text("You're listening to MIDNIGHT BLUES by UMI", width/2, height*9/10);
    }

    noStroke();
    //set rotation on the center of canvas
    translate(wi, he);
    for (let i = 0; i < cerchi.length; i++) {
        cerchi[i].wave();
    }
}
//class that create circle
class Cerchio{
    constructor(altezza) {
        this.a = altezza;
        this.color = random(220,256);
       
        this.xoff = 0;
        this.yoff = 0;
        this.n = 0;
        this.s = 0;
        this.h = 0;
        this.volume = 0;
        this.scale = 0;
    }

    wave() {
        //set variable link with the sound volume.
        this.volume = amp.getLevel();
        this.scale = map(this.volume, 0, 0.4, 0, 50);

// for cylce for creation of circles made by rectangles
        for (let i = 0; i < 360; i += g){
        //Set Noise Values with the mouse position.
        this.xoff = map(cos(i), -1, 1, 0, mouseX/500);
        this.yoff = map(sin(i), 1, -1, 0, mouseY/500);

        this.n = noise(this.xoff + s, this.yoff + this.s);
        //use noise as height of rectangles
        this.h = map(this.n, 0, 1, -50, 100);

        rotate(g);
        fill(this.color, 25);
        //Variable This.scale (set with the volume) is used to change width of rectangles and so create a "flare" effect 
        rect(this.a, 0, this.h, 5+this.scale);
        
    }
   // Animation Speed
     this.s += random(0,0.04);
       
    }
}
//Function for resize page
function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
    wi = windowWidth / 2;
    he = windowHeight / 2;
}