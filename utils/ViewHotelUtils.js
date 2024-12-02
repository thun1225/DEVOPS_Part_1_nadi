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


async function viewHotels(req, res) {
    try {
        const allHotels = await readJSON('utils/hotels.json');
        return res.status(200).json(allHotels);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    readJSON, writeJSON, viewHotels
};