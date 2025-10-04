interface User {
    name: string,
    gender: string,
    age?: number | undefined
}

function example(name: string, gender: string, callback: (value: User) => User, age: undefined | number = undefined): void {

    let obj: User = {
        name,
        gender,
        age
    }


    callback(obj)
}

function cb(response: User): User {
    console.log("🚀 ~ cb ~ response:", response)
    return response
}
example("ABC", "male", cb)
