// funcrtion generic : 

function abc<T>(response: T) {
    console.log(response)
}

abc<number>(10)
abc<string>("this is a string!")
abc<boolean>(true)


// interface generics 

interface User<T> {
    name: string,
    email: string,
    password: string,
    token: T
}

function data(response: User<boolean>): void {
    console.log("🚀 ~ data ~ response:", response)
}

let myObject: User<boolean> = {
    name: "abc",
    email: "abc@abc.abc",
    password: "abc@123",
    token: true
}

data(myObject)



// class generics 


class Login<T> {
    constructor(private email: T, private password: T) {
        console.log(this.email)
        console.log(this.password)
    }
}

let user1 = new Login<string | number>("abc@gmail.com", 10)
