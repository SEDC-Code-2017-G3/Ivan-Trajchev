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
    this.getIsMoving = function(){
        return isMoving;
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



//Tour Bus Object
function TourBus(from, to, company, color, passengers, airConditionig) {
    Bus.call(this, passengers, color);
    this.from = from || "Skopje";
    this.to = to || "Gevgelija";
    this.company = company || "Rule Tours";
    this.seats = 40;
    this.airConditioning = airConditionig || false;
    if(this.airConditioning) this.airConOn = false;
    //Again with the private property
    let doorsOpen = false;
    this.openDoors= function(open){
        if(open && !doorsOpen){
            return this.getIsMoving() ? "can't open dors while moving!" : doorsOpen = true;
        }
        else{
            return doorsOpen = false;
        }
    }
}

TourBus.prototype = Object.create(Bus.prototype);
Object.defineProperty(TourBus.prototype, "constructor", {
    enumerable: false,
    writable: true,
    configurable: true,
    value: PublicTransportBus
});

TourBus.prototype.toggleAirCon = function(){
    if(this.airConditioning){
        return this.airConOn ? this.airConOn = false : this.airConOn = true;
    }
    else{
        return "there is no air conditioner in the bus"
    }
}

//Lets test them
//Public transport bus
var headingP = document.getElementById("headingP").innerHTML = "Public transport example";
var outputP = document.getElementById("outputP");
var petka = new PublicTransportBus(5, 3, "red");
outputP.innerText += `You are driving a ${petka.color} bus with line number ${petka.lineNumber}`;
outputP.innerText += "\n" + `and capacity of ${petka.seats} passengers. now there are ${petka.passengers} pasengers on board`;
outputP.innerText += "\n" + petka.getFreeSeats();
outputP.innerText += "\n" + "the engine is off, press the gass pedal";
outputP.innerText += "\n" + petka.gasPedal(true);
outputP.innerText += "\n" + "now turn it on."
outputP.innerText += "\n" + petka.toggleEngine();
outputP.innerText += "\n" + "press the pedal again.";
outputP.innerText += "\n" + petka.gasPedal(true);
outputP.innerText += "\n" + "take your foot off the pedal while engine is working";
outputP.innerText += "\n" + petka.gasPedal(false);
outputP.innerText += "\n" + petka.getIsWorking();
outputP.innerText += "\n" + "27 passengers get on board";
petka.passengers += 27;
outputP.innerText += "\n" + "are there any more free seats?";
outputP.innerText += "\n" + petka.getFreeSeats();
outputP.innerText += "\n" + "two more passengers try to get on board!";
petka.passengers += 2;
outputP.innerText += "\n" + petka.getFreeSeats();
outputP.innerText += "\n" + "Someone is yelling: Majstore Zadna! you open it.";
outputP.innerText += "\n" + `is zadna open?: ${ petka.openDoors(false, true)}`;
outputP.innerText += "\n" + "now you close it!";
outputP.innerText += "\n" + `is zadna open?: ${petka.closeDoors(false, true)}`;
outputP.innerText += "\n" + 'ok. time to go.. press the gas';
outputP.innerText += "\n" + petka.gasPedal(true);

// Tour Bus
var headingT = document.getElementById("headingT").innerHTML = "Touring bus example";
var outputT = document.getElementById("outputT");
var tourBus = new TourBus("Skopje", "Ohrid", "Galeb", "White", 37, false)
outputT.innerText += `You are driving a ${tourBus.color} bus from the company ${tourBus.company} from ${tourBus.from} to ${tourBus.to}`;
outputT.innerText += "\n" + `there are ${tourBus.passengers} passengers and there ${tourBus.airConditioning ? "is" : "is no"} air conditioning.`;
outputT.innerText += "\n" + "You turn on the bus";
outputT.innerText += "\n" + tourBus.toggleEngine();
outputT.innerText += "\n" + `and the trip is ${tourBus.airConditioning ? "fine" : "hell"}`