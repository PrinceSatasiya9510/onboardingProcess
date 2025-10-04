//  interfaces
function testing(obj) {
    console.log(obj);
}
let obj = {
    name: "fnvb",
    email: "dsdnjk",
    phone: 5457,
    password: "dfsdf"
};
testing(obj);
function interfaceExtends(response) {
    response.token;
}
let adminObject = {
    name: "fnvb",
    email: "dsdnjk",
    phone: 5457,
    password: "dfsdf",
    admin: true,
    token: "d"
};
interfaceExtends(adminObject);
export {};
