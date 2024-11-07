class Tour {
  constructor(
    host,
    location,
    packageName,
    category,
    duration,
    phone,
    email,
    price,
    //image
  ) {
    this.host = host;
    this.location = location;
    this.packageName = packageName;
    this.category = category;
    this.duration = duration;
    this.phone = phone;
    this.email = email;
    this.price = price;
    //this.image = image;
    this.id = this.generateId();
  }

  generateId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `${timestamp}${random.toString().padStart(3, "0")}`;
  }
}

module.exports = { Tour };