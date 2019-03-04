class ElevatorShaft {
    constructor() {
        let self = this;
        this.states = [new Idle(self), new MovingUp(self), new MovingDown(self)];
        this.currentState = this.states[1];
        this.upCalls = [2,4,7];
        this.downCalls = [3,5];
        this.currentFloor = 1;
        this.idleIndex = 0;
        this.upIndex = 1;
        this.downIndex = 2;
    }

    move() {
        this.upCalls = this.currentState.pruneUpCalls();
        this.downCalls = this.currentState.pruneDownCalls();
        this.currentFloor = this.currentState.move();
        this.upCalls = this.currentState.pruneUpCalls();
        this.downCalls = this.currentState.pruneDownCalls();
        if(this.currentState.shouldChangeState()) {
            this.currentState = this.states[this.currentState.getChangedState()];
        }
    }

    direction() {
        return this.currentState.direction();
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

        if(this.elevator.upCalls.findIndex(floor => floor > this.elevator.currentFloor) !== -1) {
            return ++this.elevator.currentFloor;
        } else if(this.elevator.upCalls.findIndex(floor => floor < this.elevator.currentFloor) !== -1) {
            // we need to go down before we can go up again
            return --this.elevator.currentFloor;
        }
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
    getChangedState() {
        if (this.elevator.downCalls.findIndex( floor => floor < this.elevator.currentFloor) !== -1) {
            return this.elevator.downIndex;
        } else {
            return this.elevator.idleIndex;
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
        if(this.elevator.downCalls.findIndex(floor => floor < this.elevator.currentFloor) !== -1) {
            return --this.elevator.currentFloor;
        } else if(this.elevator.downCalls.findIndex(floor => floor > this.elevator.currentFloor) !== -1) {
            // we need to go up before we can go down again
            return ++this.elevator.currentFloor;
        }

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
        } else if (this.elevator.downCalls.findIndex( floor => floor < this.elevator.currentFloor) !== -1) {
            return this.elevator.downIndex;
        }

        else if (this.elevator.upCalls.findIndex(floor => floor <= this.elevator.currentFloor) !== -1) {
            return this.elevator.upIndex;
        } else if (this.elevator.downCalls.findIndex( floor => floor >= this.elevator.currentFloor) !== -1) {
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

for(var i = 0; i < 12; ++i) {
    console.log("currentFloor -------"+elevator.currentFloor);
    console.log("-" +elevator.direction());
    console.log("upcalls: "+elevator.upCalls);
    console.log("downcalls: "+elevator.downCalls);
    elevator.move();
}
console.log("****************")
elevator.upCalls.push(2);
elevator.upCalls.push(4);
elevator.upCalls.push(3);

elevator.downCalls.push(2);
elevator.downCalls.push(6);
elevator.downCalls.push(5);

for(var i = 0; i < 20; ++i) {
    console.log("currentFloor -------"+elevator.currentFloor);
    console.log("-Post move: " +elevator.direction());
    console.log("upcalls: "+elevator.upCalls);
    console.log("downcalls: "+elevator.downCalls);
    elevator.move();
}