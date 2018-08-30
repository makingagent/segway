class Filter {

    constructor() {
        this.values = [];
    }

    push(value) {
        this.values.push(value);
        if(this.values.length > 30) {
            this.values.shift();
        }
    }

    getValue() {
        let sum = 0;
        this.values.forEach(value=>{sum+=value;});
        return sum / this.values.length;
    }

}