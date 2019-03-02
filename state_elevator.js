function UpState(container){
    var self = this;
    this.container = container;
    this.value = function () {
        // console.log("moving up "+container);
        return 'up';
    };
    container.state = this;
    this.next = function(){
        return new DownState(self.container);
    }
}
function DownState(container){
    var self = this;
    this.container = container;
    this.value = function () {
        // console.log("moving down ");
        return 'down';
    };
    container.state = this;
    // i can remove these next calls
    // in the changestate function, call the correct status
    this.next = function(){
        return new UpState(self.container);
    }
}

function Elevator(){
    var self = this;
    this.state = new UpState(self);
    this.changeState = function(){
        // return the correct state here
        // check direction and see if there are calls
        // in the same direction
        self.state.next();
    }
    this.getValue = function(){
        return self.state.value
    }
}
function ElevatorShaft(){
    var self = this;
    var elevator = new Elevator();
    var heading = elevator.getValue();
    var currentFloor = 1;

    //add changeHeading method to toggle state;
    this.changeHeading = function(){
        console.log('change heading');
        elevator.changeState();
        self.heading = elevator.getValue();
    }
    Object.defineProperty(this,"heading",{
        get: function() { return heading; },
        set: function(value) {
            heading = value;
            // this.notifyAll();
        }
    });
}
var shaft = new ElevatorShaft();
var floors = [2, 5, 7, 9];

shaft.heading();
shaft.changeHeading();
shaft.heading();
