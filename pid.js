class PID {

    constructor(p, i, d) {

        this.p = p;
        this.i = i;
        this.d = d;

        this.cError = 0;
        this.pError = 0;
        this.integral = 0;

        this.output = 0;

    }

    setError(e) {
        this.cError = e;
    }

    step(dt) {
        this.integral = this.integral + this.cError * dt;
        let derivative = (this.cError - this.pError) / dt;
        this.output = this.p * this.cError + this.i * this.integral + this.d * derivative;
        this.pError = this.cError;
    }

    getOutput() {
        return this.output;
    }

}