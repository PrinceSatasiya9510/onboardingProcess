//  interfaces

interface User {
    name: string,
    email: string,
    password: string,
    phone: number,
    gender?: string
}


function testing(obj: User) {
    console.log(obj)
}


let obj = {
    name: "fnvb",
    email: "dsdnjk",
    phone: 5457,
    password: "dfsdf"
}


testing(obj)


// extends interfaces


interface User {
    name: string,
    email: string,
    password: string,
    phone: number,
    gender?: string
}


interface Admin extends User {
    admin: boolean,
    token: string,
}

function interfaceExtends(response: Admin) {
    response.token
}

let adminObject = {
    name: "fnvb",
    email: "dsdnjk",
    phone: 5457,
    password: "dfsdf",
    admin: true,
    token: "d"
}

interfaceExtends(adminObject)