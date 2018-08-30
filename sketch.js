let world;
let boundaries = [];

let spring;
let pendulum;

let clt;
let filter;
let debug;

let targetX;

let boxes = [];

function setup() {

    createCanvas(window.innerWidth, window.innerHeight);
    world = createWorld();

    boundaries.push(new Boundary(0, window.innerHeight-10, window.innerWidth, 10));

    pendulum = new Pendulum(window.innerWidth/2, window.innerHeight/2);
    targetX = window.innerWidth/2;

    boxes.push(new Box(25, 0, 25, 25));
    boxes.push(new Box(25, 0, 25, 25));

    clt = new PID(25, 20, 20);

    spring = new Spring();
    filter = new Filter();
    debug  = new Debug();

}

function rectify(x, minValue, maxValue) {
    if (x > maxValue) return maxValue;
    if (x < minValue) return minValue;
    return x;
}

function draw() {

    background(51);

    let timeStep = 1.0 / 30;
    world.Step(timeStep, 10, 10);

    spring.update(mouseX, mouseY);

    boxes.forEach(box=>box.display());
    boundaries.forEach(boundary=>boundary.display());

    // draw target position
    stroke(255, 127, 127);
    line(targetX, window.innerHeight/2, targetX, window.innerHeight);

    let pos = pendulum.getPosition();
    let velocity = pendulum.getVelocity();

    filter.push(velocity.x);
    let smoothVelocity = filter.getValue();

    let predictPos = pos.x + 25 * smoothVelocity;
    if((predictPos - targetX) * (pos.x-targetX) < 0) {
        predictPos = pos.x + 100 * smoothVelocity;
    }

    // draw predict position
    stroke(127, 255, 127);
    line(predictPos, window.innerHeight/2, predictPos, window.innerHeight);

    let targetAngle = rectify(-(predictPos-targetX)/window.innerWidth*PI/5, -0.25, 0.25);
    let nowAngle = pendulum.getAngleRadians();
    if(
        abs(10 * smoothVelocity) > 60 &&
        (predictPos - targetX) * (pos.x-targetX) >= 0 &&
        (predictPos - targetX) * smoothVelocity < 0
    ) {
        targetAngle = 0;
    }

    clt.setError(targetAngle-nowAngle);
    clt.step(timeStep);

    let speed = clt.getOutput();
    pendulum.setMotorSpeed(100 * speed);
    pendulum.display();

    // draw velocity curve
    debug.step(8 * smoothVelocity);
    debug.display();

}

function mouseReleased() {
    spring.destroy();
}

function mousePressed() {

    let select = false;

    boxes.some(box=>{
        if (box.contains(mouseX, mouseY)) {
            spring.bind(mouseX, mouseY, box);
            select = true;
            return true;
        }
    });

    if (select === false) {
        targetX = mouseX;
    }

}
