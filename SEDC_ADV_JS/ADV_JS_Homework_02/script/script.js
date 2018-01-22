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
        console.log(`Are we moving?: ${isMoving}`);
    }

}

Bus.prototype.getFreeSeats = function () {
    if (this.seats >= this.passengers) {
        let free = this.seats - this.passengers;
        let message = null;
        free !== 0 ? message = `there are ${free} free seats` : message = "bus is full!";
        console.log(message);
        return free;
    } else {
        let excess = this.passengers - this.seats;
        console.log(`${excess} passengers can't get on the bus`);
        return excess;
    }
}

Bus.prototype.toggleEngine = function () {
    !this.isWorking ? this.isWorking = true : this.isWorking = false;
    console.log(`the engine is working: ${this.isWorking}`);
}

Bus.prototype.getIsWorking = function () {
    console.log(`is the engine working?: ${this.isWorking}`)
    return this.isWorking
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
	if(!this.doorsOpen.front && openFront) this.doorsOpen.front = true;
	if(!this.doorsOpen.back && openBack) this.doorsOpen.back = true;
}
PublicTransportBus.prototype.closeDoors = function(closeFront, closeBack){
	if(this.doorsOpen.front && closeFront) this.doorsOpen.front = false;
	if(this.doorsOpen.back && closeBack) this.doorsOpen.back = false;
}

//Lets test them

//Public transport bus
var petka = new PublicTransportBus(5, 3, "red");
console.log(`You are driving a ${petka.color} bus with line nummber ${petka.lineNumber}`);
console.log(`and capacity of ${petka.seats} passengers. now there are ${petka.passengers} pasengers on board`);
petka.getFreeSeats();
console.log('\n')
console.log("the engine is off, press the gass pedal");
petka.gasPedal(true);
console.log("now turn it on.")
petka.toggleEngine();
console.log("press the pedal again.")
petka.gasPedal(true);
console.log("take your foot off the pedal while engine is working");
petka.gasPedal(false);
petka.getIsWorking();
console.log("27 passengers get on board");
petka.passengers += 27;
console.log("are there any more free seats?")
petka.getFreeSeats();
console.log("two more passengers try to get on board!");
petka.passengers += 2;
petka.getFreeSeats();
console.log("Someone is yelling: Majstore Zadna! you open it.");
petka.openDoors(false, true);
console.log(`is zadna open?: ${petka.doorsOpen.back}`);
console.log("now you close it!");
petka.closeDoors(false, true);
console.log(`is zadna open?: ${petka.doorsOpen.back}`);
console.log('ok. time to go.. press the gas');
petka.gasPedal(true);