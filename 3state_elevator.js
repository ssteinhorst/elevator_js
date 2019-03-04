class ElevatorShaft {
    constructor() {
        let self = this;
        this.states = [new Idle(self), new MovingUp(self), new MovingDown(self)];
        this.current = this.states[1];
        this.upCalls = [2,4,7];
        this.downCalls = [3,5];
        this.currentFloor = 1;
        this.idleIndex = 0;
        this.upIndex = 1;
        this.downIndex = 2;
    }

    move() {
        let self = this;
        // const totalStates = this.states.length;
        // console.log("current floor: "+this.currentFloor);
        // let currentState = this.states.find(action => action === this.current);
        // this bit of commented code just runs it between the states, we need to be smarter
        // if (currentState + 1 < totalStates) this.current = this.states[currentState + 1];
        // else this.current = this.states[0];
        // console.log(currentState);


        // think OOP. what does the state know about what to do? what is the elevator doing
        // that it can offload to the state? new floor?
        // set current floor, prune the call list
        let up = this.current.pruneUpCalls();
        let down = this.current.pruneDownCalls();

        this.currentFloor = this.current.move();
        this.upCalls = this.current.pruneUpCalls();
        this.downCalls = this.current.pruneDownCalls();
        if(this.current.shouldChangeState()) {
            this.current = this.states[this.current.getChangedState()];
            // this.current = new MovingDown(self);
        }
        // this.upCalls = this.current.pruneUpCalls();
        // this.downCalls = this.current.pruneDownCalls();
        // if(this.current.direction() === "UP" ) {
        //     // remove current floor from call list
        //     var index = this.upCalls.indexOf(this.currentFloor);
        //     if(index ==! -1) {
        //         this.upCalls.splice(index, 1);
        //     }
        //
        //
        //
        //     if(this.upCalls.findIndex( floor => floor > this.currentFloor) != -1) { // move up, keep moving
        //         this.currentFloor++;
        //     } else if (this.downCalls.findIndex( floor => floor < this.currentFloor) != -1) { // move down, change state
        //         this.currentFloor--;
        //         this.current = this.states[2];
        //     } else { // no more calls to process, go idle
        //         this.current = this.states[0];
        //     }
        //
        // } else if(this.current.direction() === "DOWN") {
        //     // remove current floor from call list
        //     var index = this.downCalls.indexOf(this.currentFloor);
        //     if(index ==! -1) {
        //         this.downCalls.splice(index, 1);
        //     }
        //
        //
        //     if(this.downCalls.findIndex( floor => floor < this.currentFloor) != -1) {// move down, kep moving
        //         this.currentFloor--;
        //     } else if(this.upCalls.findIndex( floor => floor > this.currentFloor) != -1) { // move up, change state
        //         this.currentFloor++;
        //         this.current = this.states[1];
        //     }
        // } else if(this.current.direction() === "IDLE") {
        //     if(this.upCalls.findIndex( floor => floor > this.currentFloor) != -1) {
        //         this.current = this.states[1];
        //     } else if(this.downCalls.findIndex( floor => floor < this.currentFloor) != -1) {
        //         this.current = this.states[2];
        //     }
        // }

    }
    // should direction be the new move()?
    direction() {
        return this.current.direction();
    }
}

class Elevator {
    constructor(elevator) {
        this.elevator = elevator;
    }
}

class MovingUp extends Elevator {
    constructor(shaft) {
        super(shaft);
    }
    move() {
        return ++this.elevator.currentFloor;
    }
    pruneUpCalls() {
        let index = this.elevator.upCalls.indexOf(this.elevator.currentFloor);
        if(index !== -1) {
            this.elevator.upCalls.splice(index, 1);
        }
        return this.elevator.upCalls;

    }
    pruneDownCalls() {
        return this.elevator.downCalls;
    }
    shouldChangeState() {
        return this.elevator.upCalls.findIndex(floor => floor > this.elevator.currentFloor) === -1;
    }
    getChangedState(self) {
        if (this.elevator.downCalls.findIndex( floor => floor < this.elevator.currentFloor) !== -1) {
            return this.elevator.downIndex;
            // return new MovingDown(self);
        } else {
            // return this.elevator.idleIndex;
            return new Idle(self);
        }
    }
    direction() {
        return 'UP';
    }
}

class MovingDown extends Elevator {
    constructor(shaft) {
        super(shaft);
    }
    move() {
        return --this.elevator.currentFloor;
    }
    pruneUpCalls() {
        return this.elevator.upCalls;
    }
    pruneDownCalls() {
        let index = this.elevator.downCalls.indexOf(this.elevator.currentFloor);
        if(index !== -1) {
            this.elevator.downCalls.splice(index, 1);
        }
        return this.elevator.downCalls;
    }
    shouldChangeState() {
        return this.elevator.downCalls.findIndex(floor => floor < this.elevator.currentFloor) === -1;

    }
    getChangedState() {
        if (this.elevator.upCalls.findIndex(floor => floor > this.elevator.currentFloor) !== -1) {
            return this.elevator.upIndex;
        } else {
            return this.elevator.idleIndex;
        }
        return null;
    }
    direction() {
        return 'DOWN';
    }
}

class Idle extends Elevator {
    constructor(shaft) {
        super(shaft);
    }
    move() {
        // does not move
        return this.elevator.currentFloor;
    }
    pruneUpCalls() {
        return this.elevator.upCalls;
    }
    pruneDownCalls() {
        return this.elevator.downCalls;
    }
    shouldChangeState() {
        return this.elevator.upCalls.length > 0 || this.elevator.downCalls.length > 0;
    }
    getChangedState() {
        if (this.elevator.upCalls.findIndex(floor => floor > this.elevator.currentFloor) !== -1) {
            return this.elevator.upIndex;
        }
        if (this.elevator.downCalls.findIndex( floor => floor < this.elevator.currentFloor) !== -1) {
            return this.elevator.downIndex;
        }
        return this.elevator.idleIndex;
    }
    direction() {
        return 'IDLE';
    }
}

// usage
elevator = new ElevatorShaft();

for(var i = 0; i < 30; ++i) {
    console.log("-" +elevator.direction());
    console.log("currentFloor -------"+elevator.currentFloor);
    console.log("upcalls: "+elevator.upCalls);
    console.log("downcalls: "+elevator.downCalls);
    elevator.move();

}
