const ACCELERATION = 3000;
const DECELERATION = 1500;
const OVERDRIVE_LIMIT = 30

function Vehicle (color, engine) {
    this.color = color;
    this.engine = engine;
    this.maxSpeed = 70;
    Object.defineProperties(this, {
        'currentSpeeed': {
            value: 0,
            writable: true
        }, 
        'isMoving': {
            value: false,
            writable: true
        }, 
        'onStop': {
            value: `Vehicle is stopped. Maximum speed during the drive was `,
            configurable: true
        }
    })

    Object.definePropertie
}


Vehicle.prototype.upgradeEngine = function(newEngine, maxSpeed){
    this.engine = newEngine;
    this.maxSpeed = maxSpeed;
}

Vehicle.prototype.getInfo = function(){
    let output = {}
    for(let key in this){
        if(this.hasOwnProperty(key)){
            output[key] = this[key];
        }
    }
    return output;
}

Vehicle.prototype.speedLimitMessage = function(){
    console.log('speed is too high, SLOW DOWN!')
}

Vehicle.prototype.afterStop = function(maxSpeed){
    console.log(this.onStop + maxSpeed);
}

Vehicle.prototype.drive = function(){
    if(this.isMoving === true){
        console.log('Already Driving')
    } else {
        this.isMoving = true;
        let interval = setInterval(() => {
            if(this.isMoving === true){
                if(this.currentSpeeed >= this.maxSpeed){
                    this.speedLimitMessage(interval);
                }
                this.currentSpeeed += 20;
                console.log(this.currentSpeeed);
            } else {
                clearInterval(interval); 
            }
        }, ACCELERATION);
    }
}

Vehicle.prototype.stop = function () {
    if(this.isMoving === true){
        this.isMoving = false;
        let maxSpeed = this.currentSpeeed;
        let interval = setInterval(() => {
            if(this.isMoving === true){
                clearInterval(interval);
            }
            if(this.currentSpeeed>0){
                this.currentSpeeed -= 20;
                console.log(this.currentSpeeed);
            } else {
                clearInterval(interval);
                this.afterStop(maxSpeed);
            }
        }, DECELERATION);
    } else {
        if(this.currentSpeeed > 0){
           console.log('Already slows down') 
        } else {
            console.log(`Vehicle in not moving`);
        }
        
    }
    
}

function Car (color, engine, model){
    Vehicle.call(this, color, engine);
    this.model = model;
    this.maxSpeed = 80;

    Object.defineProperties(this, {
        'onStop': {
            value: `Car ${this.model} is stopped. Maximum speed during drive was `
        }
    })
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Vehicle;

Car.prototype.changeColor = function(newColor){
    if(this.color !== newColor){
        this.color = newColor;
    } else {
        console.log('Selected color is the same as previous, please choose another one');
    }
}

function Motorcycle (color, engine, model) {
    Vehicle.call(this, color, engine);
    this.model = model;
    this.maxSpeed = 90;
    Object.defineProperties(this, {
        'onStop': {
            value: `Motorcycle ${this.model} is stopped. Good drive`
        }
    })
}


Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Vehicle;

Motorcycle.prototype.speedLimitMessage = function(interval){
    Vehicle.prototype.speedLimitMessage.call(this)
    if(this.currentSpeeed - this.maxSpeed >= OVERDRIVE_LIMIT){
        console.log('engine is overheating');
        clearInterval(interval)
        this.stop();
    }
}

Motorcycle.prototype.drive = function(){
    console.log(`Let's drive`);
    Vehicle.prototype.drive.call(this);
}

Motorcycle.prototype.afterStop = function(){
    console.log(this.onStop);
}

const moto1 = new Motorcycle('Green', 'v6' ,'Yamaha');
const car1 = new Car('red', 'V4', 'Nissan');