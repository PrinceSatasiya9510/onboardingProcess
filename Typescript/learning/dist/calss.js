// with public keyword
class Music {
    name;
    artist;
    length;
    constructor(name, artist, length) {
        this.name = name;
        this.artist = artist;
        this.length = length;
    }
}
let music1 = new Music("abc", "xyz", 4);
console.log("🚀 ~ music1:", music1);
// with private keyword
class User {
    name;
    email;
    age;
    constructor(name, email, age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }
    getDetails() {
        return `Name: ${this.name}, Email: ${this.email}, Age: ${this.age}`;
    }
}
class Admin extends User {
    constructor(name, email, age) {
        super(name, email, age);
    }
    changeName(newName) {
        this.name = newName;
    }
    getAge() {
        return 10;
    }
}
let admin1 = new Admin("abc", "abc@gmail.com", 10);
admin1.changeName("new name");
console.log("🚀 ~ admin1:", admin1);
console.log("🚀 ~ admin1 details:", admin1.getDetails());
// with protected keyword
// protected are only change it's inner own and subclass  
class Car {
    name;
    model;
    price;
    launchDate;
    constructor(name, model, price, launchDate) {
        this.name = name;
        this.model = model;
        this.price = price;
        this.launchDate = launchDate;
    }
}
class Tesla extends Car {
    name;
    model;
    price;
    launchDate;
    parentCompanyName;
    constructor(name, model, price, launchDate, parentCompanyName) {
        super(name, model, price, launchDate);
        this.name = name;
        this.model = model;
        this.price = price;
        this.launchDate = launchDate;
        this.parentCompanyName = parentCompanyName;
    }
    changeCarName() {
        this.name = "car name are changed";
        this.price = 400;
    }
}
let car1 = new Tesla("tesla", "m1", 10, "10 oct 2025", "tesla");
car1.changeCarName();
export {};
// with an protected keyword not give warning and name are be changed
// car1.name = "ddddd" // give an error and name are not changed
