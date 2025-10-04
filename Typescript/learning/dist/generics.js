// funcrtion generic : 
function abc(response) {
    console.log(response);
}
abc(10);
abc("this is a string!");
abc(true);
function data(response) {
    console.log("🚀 ~ data ~ response:", response);
}
let myObject = {
    name: "abc",
    email: "abc@abc.abc",
    password: "abc@123",
    token: true
};
data(myObject);
// class generics 
class Login {
    email;
    password;
    constructor(email, password) {
        this.email = email;
        this.password = password;
        console.log(this.email);
        console.log(this.password);
    }
}
let user1 = new Login("abc@gmail.com", 10);
export {};
