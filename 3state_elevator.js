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
        this.currentFloor = this.current.move();
        this.upCalls = this.current.pruneUpCalls();
        this.downCalls = this.current.pruneDownCalls();
        if(this.current.shouldChangeState()) {
            this.current = this.states[this.current.getChangedState()];
        }
    }

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
