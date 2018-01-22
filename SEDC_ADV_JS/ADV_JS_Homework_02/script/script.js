function Bus(passengers, color) {
    this.passengers = passengers || 0;
    this.color = color || "none";

    this.isWorking = false;
    //I set the isMoving property to private so it can't 
    //be changed manually if the engine(isWorking property) is off/false.
    //I made a function in the constructor that when called
    //checks whether the engine is on before setting the isMoving property.
    let isMoving = false;
    this.gasPedal = function (press) {
        if (this.isWorking && press) {
            isMoving = true;
        } else isMoving = false;
        return `Are we moving?: ${isMoving}`;
    }

}

Bus.prototype.getFreeSeats = function () {
    if (this.seats >= this.passengers) {
        let free = this.seats - this.passengers;
        let message = null;
        free !== 0 ? message = `there are ${free} free seats` : message = "bus is full!";
        return message;
    } else {
        let excess = this.passengers - this.seats;
        return `${excess} passengers can't get on the bus`;
    }
}

Bus.prototype.toggleEngine = function () {
    !this.isWorking ? this.isWorking = true : this.isWorking = false;
    return `the engine is working: ${this.isWorking}`;
}

Bus.prototype.getIsWorking = function () {
    return `is the engine working?: ${this.isWorking}`;
}

//Public Transport Bus Object
function PublicTransportBus(lineNumber, passengers, color) {
    Bus.call(this, passengers, color);
    this.seats = 30;
    this.lineNumber = lineNumber || parseFloat((Math.random() * 100).toFixed(0));
    this.doorsOpen = {
    	front: false,
    	back: false
    }
}

PublicTransportBus.prototype = Object.create(Bus.prototype);
Object.defineProperty(PublicTransportBus.prototype, "constructor", {
    enumerable: false,
    writable: true,
    configurable: true,
    value: PublicTransportBus
});

PublicTransportBus.prototype.openDoors = function(openFront, openBack){
	if(!this.doorsOpen.front && openFront){
        this.doorsOpen.front = true;
        return this.doorsOpen.front;
    }
    if(!this.doorsOpen.back && openBack){
        this.doorsOpen.back = true;
        return this.doorsOpen.back;
    }
}
PublicTransportBus.prototype.closeDoors = function(closeFront, closeBack){
    if(this.doorsOpen.front && closeFront){
        this.doorsOpen.front = false;
        return this.doorsOpen.front;
    }
    if(this.doorsOpen.back && closeBack){
        this.doorsOpen.back = false;
        return this.doorsOpen.back;
    }
}

//Lets test them
var output = document.getElementById("output");
//Public transport bus
var petka = new PublicTransportBus(5, 3, "red");
output.innerText += `You are driving a ${petka.color} bus with line number ${petka.lineNumber}`;
output.innerText += "\n" + `and capacity of ${petka.seats} passengers. now there are ${petka.passengers} pasengers on board`;
output.innerText += "\n" + petka.getFreeSeats();
output.innerText += "\n" + "the engine is off, press the gass pedal";
output.innerText += "\n" + petka.gasPedal(true);
output.innerText += "\n" + "now turn it on."
output.innerText += "\n" + petka.toggleEngine();
output.innerText += "\n" + "press the pedal again.";
output.innerText += "\n" + petka.gasPedal(true);
output.innerText += "\n" + "take your foot off the pedal while engine is working";
output.innerText += "\n" + petka.gasPedal(false);
output.innerText += "\n" + petka.getIsWorking();
output.innerText += "\n" + "27 passengers get on board";
petka.passengers += 27;
output.innerText += "\n" + "are there any more free seats?";
output.innerText += "\n" + petka.getFreeSeats();
output.innerText += "\n" + "two more passengers try to get on board!";
petka.passengers += 2;
output.innerText += "\n" + petka.getFreeSeats();
output.innerText += "\n" + "Someone is yelling: Majstore Zadna! you open it.";
output.innerText += "\n" + `is zadna open?: ${ petka.openDoors(false, true)}`;
output.innerText += "\n" + "now you close it!";
output.innerText += "\n" + `is zadna open?: ${petka.closeDoors(false, true)}`;
output.innerText += "\n" + 'ok. time to go.. press the gas';
output.innerText += "\n" + petka.gasPedal(true);