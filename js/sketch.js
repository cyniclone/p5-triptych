var img1, img2, img3;
var eye, halfmoon;
var explosions = [];

var mask;
var img3masked;

var angle;

var count;
var panel;
var countIncreasing; // boolean

var scl;
var x, y;

/*******************************************
 *  setup and draw
 *******************************************/
function preload() {
    // Load assets
    img1 = loadImage("img/img.png");
    img2 = loadImage("img/img2.png");
    img3 = loadImage("img/img3.png");
    img3masked = loadImage("img/img3.png");
    eye = loadImage("img/eye.png");
    halfmoon = loadImage("img/halfmoon.png");
    mask = loadImage("img/mask.png");
}
function setup() {
    // Dynamically set scale and adjust canvas size/position
    scl = (windowHeight >= 1000) ? 1000 : windowHeight/1000;
    var canvas = createCanvas(windowHeight, windowHeight);
    canvas.parent('canvas-container');
    $("#canvas-container").css("padding-left", (windowWidth-width)/2 + "px");

    img3masked.mask(mask);
    panel = 1;

    count = 0;
    countIncreasing = true;
}

function draw() {
    push();
    scale(scl);
    imageMode(CORNER);
    angle = 0;

    // First panel
    if (panel == 1) {
        //tint(255, 255);
        image(img1, 0, 0);

        adjustCount();
        adjustCount();

        fill (255, count);
        noStroke();

        ellipse (885, 145, 150, 150);
    }
    //Second panel
    if (panel == 2) {
        image (img2, 0, 0);

        // Draw half-moon
        push();
        translate(335, 300);
        rotate(radians(frameCount * 2 % 360));
        imageMode(CENTER);
        image(halfmoon, 0, 0);
        pop();
    }
    // Third panel
    if (panel == 3) {
        noStroke();

        // Fill in a green rectangle #30b997
        fill ("#30b997");
        rect(0, height/scl - 325, 1000, 325);

        //Handle explosions
        for (var i = 0; i < explosions.length; i++) {
            var exp = explosions[i];

            exp.plus();
            exp.display();
            if (exp.finished()) {
                explosions.splice(i, 1);
            }
        }
        if (frameCount % 2 == 0) {
            explosions.push(new Explosion());
        }
        // Draw image mask on top
        image (img3masked, 0, 0);

        adjustCount();
        imageMode(CENTER);
        push();
        translate(787, 205);
        rotate(radians(frameCount * 3  % 360));

        //tint(255, 255);
        image (eye, 0, 0);
        pop();

        noFill();
        strokeWeight(4);
        stroke("#be1e2d");
        bezier(400, 485,
            500 + map(mouseX, 0, width, 0, 50), 500 + map(mouseY, 0, height, 0, 50),
            464, 342,
            map(mouseX, 0, width, 320, 450), map(mouseY, 0, height, 280, 400));

        bezier(420, 485,
            520 +map(mouseX, 0, width, 0, 50), 480 + map(mouseY, 0, height, 0, 50),
            480, 300,
            map(mouseX, 0, width, 320, 450)+ 20, map(mouseY, 0, height, 260, 380));
    }
    pop();
}

/*******************************************
 *  Event Handling
 *******************************************/
function adjustCount() {
    if (count >= 225) {
        countIncreasing = false;
    } else if (count <= 40) {
        countIncreasing = true;
    }

    count = countIncreasing ? count+1 : count-1;

}

function mousePressed() {
    if (panel == 1 && dist (885*scl, 145*scl, mouseX, mouseY) < 75) {
        panel = 2;
    }
    if (panel == 2 && dist (335*scl, 300*scl, mouseX, mouseY) < 35) {
        panel = 3;
        imageMode(CORNER);
        image (img3, 0, 0);
    }
    if (panel == 3 && dist (787*scl, 215*scl, mouseX, mouseY) < 185) {
        panel = 1;
    }
}
/*******************************************
 *  Explosion class
 *******************************************/
function Explosion() {
    this.x = random(width);
    this.y = random(height/2, height);
    this.r = 0;
    this.r_goal = random(20, 150);
    this.alp = 255;
    this.life = 200;
    this.green = random(50, 255);

    this.plus = function() {
        this.r ++;
        if (this.r > this.r_goal) {
            this.r = this.r_goal;
            this.alp -= 5;
        }
    }

    this.display = function() {
        noStroke();
        fill(255, this.green, 0, this.alp);
        ellipse(this.x, this.y, this.r, this.r);
    }

    this.finished = function() {
        this.life--;
        if (this.life < 0) {
            return true;
        } else {
            return false;
        }
    }
}