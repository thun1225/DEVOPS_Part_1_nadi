const { Ticket } = require("../models/Ticket");
const fs = require("fs").promises;
async function readJSON(filename) {
  try {
    const data = await fs.readFile(filename, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function writeJSON(object, filename) {
  try {
    const allObjects = await readJSON(filename);
    allObjects.push(object);
    await fs.writeFile(filename, JSON.stringify(allObjects), "utf8");
    return allObjects;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
async function createTrainTicketReservation(req, res) {
  try {
   

    const name = req.body.name;
    const gender = req.body.gender;
    const email = req.body.email;
  
    const phoneNumber = req.body.phoneNumber;
    const quantity = req.body.quantity;
    const location = req.body.location;
    const dateOfTravel = req.body.dateOfTravel;
    const time = req.body.time;
    const cardNumber = req.body.cardNumber;
    const termsconditions = req.body.termsconditions;



// add validations to the input feilds


    const Nameregex = /^[A-Za-z\s'-]+$/;

    const Numberregex = /^[0-9]+$/;
    const Emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/



    if(
        !Nameregex.test(name)
    ){
        return res.status(500).json({ message: "Name should only contain alphabets" });
    }

    if(
        !Emailregex.test(email)
    ){
        return res.status(500).json({ message: "Please enter a valid email" });
    }

    if(
        !Numberregex.test(phoneNumber)
    ){
        return res.status(500).json({ message: "Please enter a valid phone number" });
    }

    if(
        !Numberregex.test(cardNumber)
    ){
        return res.status(500).json({ message: "Please enter a valid bank card number" });
    }
    else{
        const newTicket = new Ticket(name,gender,email,phoneNumber,quantity,location,dateOfTravel, time, cardNumber,termsconditions);
      const updatedTicket = await writeJSON(
        newTicket,
        "utils/tickets.json"
      );
      return res.status(201).json(updatedTicket);
    }

} catch (error) {
    return res.status(500).json({ message: error.message }),
    alert(message)
  }
}



module.exports = {
  readJSON,
  writeJSON,
  createTrainTicketReservation
};
