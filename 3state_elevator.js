class ElevatorShaft {
    constructor() {
        this.states = [new Idle(), new MovingUp(), new MovingDown()];
        this.current = this.states[1];
        this.upCalls = [2,4,7];
        this.downCalls = [3,5];
        this.currentFloor = 1;
    }

    move() {
        // const totalStates = this.states.length;
        console.log("current floor: "+this.currentFloor);
        let currentState = this.states.find(action => action === this.current);
        // this bit of commented code just runs it between the states, we need to be smarter
        // if (currentState + 1 < totalStates) this.current = this.states[currentState + 1];
        // else this.current = this.states[0];
        // console.log(currentState);
        if(currentState.direction() === "UP" ) {

            var index = this.upCalls.indexOf(this.currentFloor);
            if(index ==! -1) {
                this.upCalls.splice(index, 1);
            }



            if(this.upCalls.findIndex( floor => floor > this.currentFloor) != -1) { // move up, keep moving
                this.currentFloor++;
            } else if (this.downCalls.findIndex( floor => floor < this.currentFloor) != -1) { // move down, change state
                this.currentFloor--;
                this.current = this.states[2];
            } else { // no more calls to process, go idle
                this.current = this.states[0];
            }

        } else if(currentState.direction() === "DOWN") {
            var index = this.downCalls.indexOf(this.currentFloor)
            if(index ==! -1) {
                this.downCalls.splice(index, 1);
            }


            if(this.downCalls.findIndex( floor => floor < this.currentFloor) != -1) {// move down, kep moving
                this.currentFloor--;
            } else if(this.upCalls.findIndex( floor => floor > this.currentFloor) != -1) { // move up, change state
                this.currentFloor++;
                this.current = this.states[1];
            }
        } else if(currentState.direction() === "IDLE") {
            if(this.upCalls.findIndex( floor => floor > this.currentFloor) != -1) {
                this.current = this.states[1];
            } else if(this.downCalls.findIndex( floor => floor < this.currentFloor) != -1) {
                this.current = this.states[2];
            }
        }

    }

    direction() {
        return this.current.direction();
    }
}

class Elevator {
    constructor(action) {
        this.action = action;
    }
}

class MovingUp extends Elevator {
    constructor() {
        super('up');
    }

    direction() {
        return 'UP';
    }
}

class MovingDown extends Elevator {
    constructor() {
        super('down');
    }

    direction() {
        return 'DOWN';
    }
}

class Idle extends Elevator {
    constructor() {
        super('idle');
    }

    direction() {
        return 'IDLE';
    }
}

// usage
const elevator = new ElevatorShaft();

for(var i = 0; i < 20; ++i) {
    console.log(elevator.direction()); // 'GO'
    elevator.move();

}

console.log(elevator.direction()); // 'STOP'
elevator.move();

console.log(elevator.direction()); // 'STEADY'
elevator.move();

console.log(elevator.direction()); // 'GO'
elevator.move();

console.log(elevator.direction()); // 'STOP'