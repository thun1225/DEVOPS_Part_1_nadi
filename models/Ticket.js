//this is my train ticket model

class Ticket {
    constructor(name,gender,email,phoneNumber,quantity,location,dateOfTravel, time, cardNumber,termsconditions) {


    this.name = name;
    this.gender = gender
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.quantity = quantity;
    this.location = location;
    this.dateOfTravel = dateOfTravel;
    this.time = time;
    this.cardNumber = cardNumber
    this.termsconditions = termsconditions



    
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    this.id = timestamp + "" + random.toString().padStart(3, '0');
    }
    }
    module.exports = { Ticket };



