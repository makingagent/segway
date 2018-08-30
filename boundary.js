class Boundary {

    constructor(x, y, w, h) {

        this.x = x+w/2;
        this.y = y+h/2;
        this.w = w;
        this.h = h;

        let bd = new box2d.b2BodyDef();
        bd.type = box2d.b2BodyType.b2_staticBody;
        bd.position = scaleToWorld(this.x, this.y);

        let fd = new box2d.b2FixtureDef();
        fd.density = 1.0;
        fd.friction = 0.5;
        fd.restitution = 0.2;
        fd.shape = new box2d.b2PolygonShape();
        fd.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2));

        this.body = world.CreateBody(bd);
        this.body.CreateFixture(fd);

    }

    display() {
        fill(127);
        stroke(0);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
    }

}