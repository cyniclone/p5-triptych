var img1, img2, img3;
var eye, halfmoon;

var mask;
var img3masked;

var angle;

var count;
var panel;
var countIncreasing; // boolean

var scl;

// TODO: add explosions
var x, y;

function setup() {
    scl = (windowHeight >= 1000) ? 1000 : windowHeight/1000;
    var canvas = createCanvas(windowHeight, windowHeight);
    canvas.parent('canvas-container');

    // Load assets
    img1 = loadImage("img/img.png");
    img2 = loadImage("img/img2.png");
    img3 = loadImage("img/img3.png");
    img3masked = loadImage("img/img3.png");
    eye = loadImage("img/eye.png");
    halfmoon = loadImage("img/halfmoon.png");
    mask = loadImage("img/planetmask.png");
    // img3masked.mask(mask);
    img3masked.mask(mask)

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
        //tint(255, 20);
        image (img2, 0, 0);

        //tint(255, 255);

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
        rect(0, height - 325, 1000, 325);


        //Make explosions
        // for (int i = 0; i < explosions.size (); i++) {
        //     Explosion exp = explosions.get(i);
        //
        //     exp.plus();
        //     exp.display();
        //     if (exp.finished()) {
        //         explosions.remove(i);
        //     }
        // }
        // if (frameCount % 2 == 0) {
        //     explosions.add(new Explosion(random(width), random(height)));
        // }


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

// Other functions
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
