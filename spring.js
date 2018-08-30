class Spring {

    constructor(x, y) {
        this.mouseJoint = null;
    }

    update(x, y) {
        if (this.mouseJoint !== null) {
            let mouseWorld = scaleToWorld(x, y);
            this.mouseJoint.SetTarget(mouseWorld);
        }
    }

    display() {
        if (this.mouseJoint !== null) {

            let posA = this.mouseJoint.GetAnchorA();
            let posB = this.mouseJoint.GetAnchorB();

            let v1 = scaleToPixels(posA.x, posA.y);
            let v2 = scaleToPixels(posB.x, posB.y);

            stroke(200);
            strokeWeight(2);

            line(v1.x, v1.y, v2.x, v2.y);

        }
    }

    bind(x, y, ele) {

        let md = new box2d.b2MouseJointDef();
        md.bodyA = world.CreateBody(new box2d.b2BodyDef());
        md.bodyB = ele.body;

        ele.body.SetFixedRotation(true);

        let mp = scaleToWorld(x, y);
        md.target = mp;

        md.maxForce = 1000.0 * ele.body.m_mass;
        md.frequencyHz = 5.0;
        md.dampingRatio = 0.9;

        this.mouseJoint = world.CreateJoint(md);

    }

    destroy() {
        if (this.mouseJoint !== null) {
            this.mouseJoint.GetBodyB().SetFixedRotation(false);
            world.DestroyJoint(this.mouseJoint);
            this.mouseJoint = null;
        }
    }

}