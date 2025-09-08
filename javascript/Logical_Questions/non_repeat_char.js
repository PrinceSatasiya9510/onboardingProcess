function nonRepeatingChar(string) {
    let lowercaseString = string.toLowerCase()
    let obj = {}

    for (let i = 0; i < lowercaseString.length; i++) {
        if (obj.hasOwnProperty(lowercaseString[i])) {
            obj[lowercaseString[i]]++
        } else {
            obj[lowercaseString[i]] = 1
        }
    }
    // return obj

    for (let key of Object.keys(obj)) {
        if (obj[key] === 1) {
            return key
        }
    }


}

console.log(nonRepeatingChar("This is an Example String!"))