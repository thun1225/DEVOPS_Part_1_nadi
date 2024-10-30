const { Hotel } = require('../models/Hotel');
const fs = require('fs').promises;
async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}
async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}
async function addHotel(req, res) {
    try {
        const name = req.body.name;
        const location = req.body.location;
        const description = req.body.description;
        const owner = req.body.owner;
        if (!owner.includes('@') || !owner.includes('.') || description.length < 6) {
            return res.status(500).json({ message: 'Validation error' });
        } else {
            const newHotel = new Hotel(name, location, description, owner);
            const updatedHotels = await writeJSON(newHotel,
                'utils/hotels.json');
            return res.status(201).json(updatedHotels);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function viewHotels(req, res) {
    try {
        const allHotels = await readJSON('utils/hotels.json');
        return res.status(201).json(allHotels);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    readJSON, writeJSON, addHotel, viewHotels
};