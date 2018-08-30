class Circle {

    constructor(x, y, r) {

        this.x = x;
        this.y = y;
        this.r = r;

        let bd = new box2d.b2BodyDef();
        bd.type = box2d.b2BodyType.b2_dynamicBody;
        bd.position = scaleToWorld(this.x, this.y);

        let fd = new box2d.b2FixtureDef();
        fd.shape = new box2d.b2CircleShape();
        fd.shape.m_radius = scaleToWorld(this.r);

        fd.density = 1.0;
        fd.friction = 0.5;
        fd.restitution = 0.2;

        this.body = world.CreateBody(bd);
        this.body.CreateFixture(fd);

    }

    display() {

        let pos = scaleToPixels(this.body.GetPosition());
        let a = this.body.GetAngleRadians();

        rectMode(CENTER);
        push();
        translate(pos.x, pos.y);
        rotate(a);
        fill(127);
        stroke(200);
        strokeWeight(2);
        ellipse(0, 0, this.r*2, this.r*2);
        line(0, 0, this.r, 0);
        pop();

    }

    deletion() {

        let pos = scaleToPixels(this.body.GetPosition());

        if(pos.y > window.innerHeight) {
            world.DestroyBody(this.body);
            return true;
        }

        return false;

    }

    contains(x, y) {
        let worldPoint = scaleToWorld(x, y);
        let f = this.body.GetFixtureList();
        let inside = f.TestPoint(worldPoint);
        return inside;
    }

}