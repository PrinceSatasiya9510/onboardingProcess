// with public keyword
class Music {
    constructor(public name: string, public artist: string, public length: number) {

    }
}

let music1 = new Music("abc", "xyz", 4)
console.log("🚀 ~ music1:", music1)


// with private keyword


class User {
    constructor(protected name: string, public email: string, private age: number) { }
    public getDetails(): string {
        return `Name: ${this.name}, Email: ${this.email}, Age: ${this.age}`;
    }
}


class Admin extends User {
    constructor(name: string, email: string, age: number) {
        super(name, email, age);
    }
    public changeName(newName: string): void {
        this.name = newName;
    }
    public getAge(): number {
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
    constructor(protected name: string, protected model: string, protected price: number, public launchDate: string) { }
}

class Tesla extends Car {
    constructor(protected name: string, protected model: string, protected price: number, public launchDate: string, public parentCompanyName: string) {
        super(name, model, price, launchDate)
    }

    changeCarName() {
        this.name = "car name are changed"
        this.price = 400
    }
}

let car1 = new Tesla("tesla", "m1", 10, "10 oct 2025", "tesla")
car1.changeCarName()

// with an protected keyword not give warning and name are be changed
// car1.name = "ddddd" // give an error and name are not changed