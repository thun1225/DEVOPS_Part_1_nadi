"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tour = void 0;
class Tour {
    //images: string[];
    constructor(host, location, packageName, category, duration, phone, email, price
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
    generateId() {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        return `${timestamp}${random.toString().padStart(3, "0")}`;
    }
}
exports.Tour = Tour;
