class Hotel {
    constructor(hotelName, hotelLocation, hotelDescription, hotelOwner) {
        this.hotelName = hotelName;
        this.hotelLocation = hotelLocation;
        this.hotelDescription = hotelDescription;
        this.hotelOwner = hotelOwner;
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
    }
}
module.exports = { Hotel };