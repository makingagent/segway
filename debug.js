class Debug {

    constructor() {
        this.values = [];
    }

    step(value) {
        this.values.push(value);
        if(this.values.length > window.innerWidth) {
            this.values.shift();
        }
    }

    display() {

        let height = 150;

        stroke(200);
        strokeWeight(1);
        line(0, height, window.innerWidth, height);
        stroke(255, 127, 127);
        strokeWeight(2);
        this.values.forEach(function (value, idx) {
            point(idx, value+height);
        });

    }

}