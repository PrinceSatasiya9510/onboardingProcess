var User;
(function (User) {
    User["superAdmin"] = "full access";
    User["admin"] = "limited access";
    User["user"] = "user panel access";
})(User || (User = {}));
let superAdmin = User.superAdmin;
console.log("🚀 ~ superAdmin:", superAdmin);
let admin = User.admin;
console.log("🚀 ~ admin:", admin);
let user = User.user;
console.log("🚀 ~ user:", user);
export {};
