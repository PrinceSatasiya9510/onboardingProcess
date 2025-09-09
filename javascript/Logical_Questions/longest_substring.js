function longestSubString(string) {
    let splitString = string.split(" ")
    let newString = ""

    for (let i = 0; i < splitString.length; i++) {
        if (checkString(splitString[i])) {
            if (newString.length < splitString[i].length) {
                newString = splitString[i]
            }
        }
    }
    return newString
}

console.log(longestSubString("This is an Example String Only!"))



function checkString(string) {
    let status = true
    for (let i = 0; i < string.length; i++) {
        for (let j = i + 1; j < string.length; j++) {
            if (string[i] == string[j]) {
                status = false
            }
        }
    }
    return status
}
