//this is my train ticket model

class Ticket {
    constructor(name,email,phoneNumber,quantity,location,dateOfTravel, dateOfBooking, cardNumber) {


    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.quantity = quantity;
    this.location = location;
    this.dateOfBooking = dateOfBooking;
    this.dateOfTravel = dateOfTravel;
    this.cardNumber = cardNumber



    
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    this.id = timestamp + "" + random.toString().padStart(3, '0');
    }
    }
    module.exports = { Ticket };



