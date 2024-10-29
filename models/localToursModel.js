"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tour = void 0;
var Tour = /** @class */ (function () {
    //images: string[];
    function Tour(host, location, packageName, category, duration, phone, email, price
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
    Tour.prototype.generateId = function () {
        var timestamp = new Date().getTime();
        var random = Math.floor(Math.random() * 1000);
        return "".concat(timestamp).concat(random.toString().padStart(3, "0"));
    };
    return Tour;
}());
exports.Tour = Tour;
