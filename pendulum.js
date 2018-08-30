class Pendulum {

    constructor(x, y) {

        this.len = 96.0;

        this.cart = new Box(x, y, 30, 16);
        this.wheel = new Circle(x, y, 24);
        this.stick = new Box(x, y, 8, this.len, true);
        this.handle = new Box(x, y, 32, 16);

        let wjd = new box2d.b2WeldJointDef();
        wjd.bodyA = this.cart.body;
        wjd.bodyB = this.stick.body;
        wjd.localAnchorB = scaleToWorld(0, this.len/2);
        world.CreateJoint(wjd);

        wjd = new box2d.b2WeldJointDef();
        wjd.bodyA = this.handle.body;
        wjd.bodyB = this.stick.body;
        wjd.localAnchorB = scaleToWorld(0, -this.len/2);
        world.CreateJoint(wjd);

        wjd = new box2d.b2WheelJointDef();
        wjd.bodyA = this.wheel.body;
        wjd.bodyB = this.cart.body;

        wjd.frequencyHz = 30;
        wjd.dampingRatio = 1.0;
        wjd.maxMotorTorque = 1000;

        this.motor = world.CreateJoint(wjd);
        this.motor.EnableMotor(true);
        this.motor.SetMotorSpeed(0);

        this.elements = [this.wheel, this.stick, this.handle];

    }

    deletion() {
        world.DestroyBody(this.cart.body);
        world.DestroyBody(this.wheel.body);
        world.DestroyBody(this.stick.body);
        world.DestroyBody(this.handle.body);
        this.elements = null;
    }

    getPosition() {
        return scaleToPixels(this.wheel.body.GetPosition());
    }

    getVelocity() {
        return this.cart.body.GetLinearVelocity();
    }

    getAngleRadians() {
        let radians = this.stick.body.GetAngleRadians();
        while(radians >  PI) radians -= 2*PI;
        while(radians < -PI) radians += 2*PI;
        return radians;
    }

    setMotorSpeed(speed) {
        this.motor.SetMotorSpeed(speed);
    }

    display() {

        this.wheel.display();
        this.cart.display();
        this.handle.display();
        this.stick.display();

    }

    getElements() {
        return this.elements;
    }

}