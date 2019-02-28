function Elevator(){
    var self = this;
    this.state = new UpState(self);
    this.changeState = function(){
        self.state.next();
    }
    this.getValue = function(){
        return self.state.value
    }
}
function UpState(container){
    var self = this;
    this.container = container;
    this.value = function () {
        console.log("moving up");
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
        console.log("moving down");
    };
    container.state = this;
    this.next = function(){
        return new UpState(self.container);
    }
}

function ElevatorShaft(){
    var self = this;
    var elevator = new Elevator();
    var heading = elevator.getValue();
    // this.observers = [];
    // this.registerObserver = function(observer){
    //     self.observers.push(observer);
    // }
    // this.notifyAll = function(){
    //     self.observers.forEach(function(observer){
    //         observer.update(self);
    //     })
    // }
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
