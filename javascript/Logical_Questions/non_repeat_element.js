function nonRepeatingChar(array) {
    let obj = {}

    for (let i = 0; i < array.length; i++) {
        if (obj.hasOwnProperty(array[i])) {
            obj[array[i]]++
        } else {
            obj[array[i]] = 1
        }
    }
    // return obj

    for (let key of Object.keys(obj)) {
        if (obj[key] === 1) {
            return key
        }
    }
}

console.log(nonRepeatingChar([10, 20, 30, 10, 20, 30, 40, 45, 50, 60, 40, 50, 60, 70]))