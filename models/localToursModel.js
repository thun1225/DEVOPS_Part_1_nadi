// Define an enumeration for tour categories
const Continent = Object.freeze({
  Asia: "Asia",
  Oceania: "Oceania",
  Europe: "Europe",
  Africa: "Africa",
  NorthAmerica: "North America",
  SouthAmerica: "South America",
});

class Tour {
  constructor(
    host,
    officeLocation,
    packageName,
    category,
    duration,
    phone,
    emailAddress,
    price,
    // image
  ) {
    if (!Object.values(Continent).includes(category)) {
      throw new Error(`Invalid category. Allowed values are: ${Object.values(Continent).join(", ")}`);
    }

    this.host = host;
    this.officeLocation = officeLocation;
    this.packageName = packageName;
    this.category = category;
    this.duration = duration;
    this.phone = phone;
    this.emailAddress = emailAddress;
    this.price = price;
    // this.image = image;
    this.id = this.generateId();
  }

  generateId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `${timestamp}${random.toString().padStart(3, "0")}`;
  }
}

// Export the Tour class and Continent
module.exports = { Tour, Continent };
