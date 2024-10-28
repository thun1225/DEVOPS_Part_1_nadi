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
async function addTrainTicket(req, res) {
  try {
   

    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const quantity = req.body.quantity;
    const location = req.body.location;
    const time = req.body.time;
    const dateOfTravel = req.body.dateOfTravel;
    const cardNumber = req.body.cardNumber



// add validations to the input feilds

    const Nameregex = /^[A-Za-z]+$/;
    const Numberregex = /^[0-9]+$/;
    const Emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/



    if(
        !Nameregex.test(name)
    ){
        return res.status(500).json({ message: "Name should only contain alphabets" });
    }

    if(
        !Numberregex.test(quantity)
    ){
        return res.status(500).json({ message: "Quanity should only contain numeical value" });
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
        const newTicket = new Ticket(name,email,phoneNumber,quantity,location,dateOfTravel, dateOfBooking, cardNumber);
      const updatedTicket = await writeJSON(
        newTicket,
        "utils/tickets.json"
      );
      return res.status(201).json(updatedTicket);
    }

} catch (error) {
    return res.status(500).json({ message: error.message });
  }
}




    // if (
    //   !name.includes("@") ||
    //   !owner.includes(".") ||
    //   description.length < 6
    // ) {
    //   return res.status(500).json({ message: "Validation error" });
    // } else {
    //   const newTicket = new Ticket(name,email,phoneNumber,quantity,location,dateOfTravel, dateOfBooking, cardNumber);
    //   const updatedResources = await writeJSON(
    //     newResource,
    //     "utils/resources.json"
    //   );
    //   return res.status(201).json(updatedResources);
    // }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// }
module.exports = {
  readJSON,
  writeJSON,
  addTrainTicket
};
