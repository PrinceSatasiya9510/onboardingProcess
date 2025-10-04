// type Narrowing 
// in example function use of an if else for diffrent diffrent types so it's calling type narrowing


function example(response: number | string | boolean): void {
    if (typeof response == "number") {
        console.log(response.toFixed(2))
    } else if (typeof response == "string") {
        console.log(response.charAt(0))
    } else {
        throw new Error("type are olny number or string")
    }
}

example(1010)
example("this is an string!")
// example(true)

// type narrowing in class with using instanceof keyword.


class Cat {
    catDetail() {
        console.log("this is an Cat!")
    }
}

class Dog {
    dogDetail() {
        console.log("this is an Dog!")
    }
}


const cat = new Cat()
const dog = new Dog()


function testing(response: Cat | Dog): void {
    if (response instanceof Cat) {
        response.catDetail()
    } else if (response instanceof Dog) {
        response.dogDetail()
    }
}

testing(dog)
testing(cat)