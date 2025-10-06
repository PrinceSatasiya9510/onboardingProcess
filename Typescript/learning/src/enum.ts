enum User {
    superAdmin = "full access",
    admin = "limited access",
    user = "user panel access",
}

let superAdmin: User = User.superAdmin
console.log("🚀 ~ superAdmin:", superAdmin)
let admin: User = User.admin
console.log("🚀 ~ admin:", admin)
let user: User = User.user
console.log("🚀 ~ user:", user)
