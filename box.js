class Box {

    constructor(x, y, w, h, _ignoreCollision) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        let bd = new box2d.b2BodyDef();
        bd.type = box2d.b2BodyType.b2_dynamicBody;
        bd.position = scaleToWorld(this.x, this.y);

        let fd = new box2d.b2FixtureDef();
        fd.shape = new box2d.b2PolygonShape();
        fd.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.h/2));

        fd.density = 1.0;
        fd.friction = 0.5;
        fd.restitution = 0.2;

        if (_ignoreCollision) {
            fd.filter.maskBits = 0;
            bd.linearDamping = 0.1;
        }

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
        rect(0, 0, this.w, this.h);
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