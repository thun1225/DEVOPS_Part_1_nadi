export class Tour {
  id: string;
  host: string;
  location: string;
  packageName: string;
  category: string;
  duration: string;
  phone: string;
  email: string;
  price: string;
  //images: string[];

  constructor(
    host: string,
    location: string,
    packageName: string,
    category: string,
    duration: string,
    phone: string,
    email: string,
    price: string
    //images: string[]
  ) {
    this.host = host;
    this.location = location;
    this.packageName = packageName;
    this.category = category;
    this.duration = duration;
    this.phone = phone;
    this.email = email;
    this.price = price;
    //this.images = images;
    this.id = this.generateId();
  }

  private generateId(): string {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `${timestamp}${random.toString().padStart(3, "0")}`;
  }
}
