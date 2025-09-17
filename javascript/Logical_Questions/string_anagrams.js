function stringAnagram(string1, string2) {
    let splitString1 = string1.toLowerCase().split("")
    let splitString2 = string2.toLowerCase().split("")

    if (splitString1.length != splitString2.length) {
        return false
    }

    for (let i = 0; i < splitString1.length; i++) {
        for (let j = 0; j < splitString1.length - i; j++) {
            if (splitString1[j] > splitString1[j + 1]) {
                let temp = splitString1[j]
                splitString1[j] = splitString1[j + 1]
                splitString1[j + 1] = temp
            }
        }
    }

    for (let i = 0; i < splitString2.length; i++) {
        for (let j = 0; j < splitString2.length - i; j++) {
            if (splitString2[j] > splitString2[j + 1]) {
                let temp = splitString2[j]
                splitString2[j] = splitString2[j + 1]
                splitString2[j + 1] = temp
            }
        }
    }


    if (splitString1.join("") != splitString2.join("")) {
        return false
    }
    return true
}

console.log(stringAnagram("Listen", "Silent"));
console.log(stringAnagram("Debit Card", "Bad Credit"));
console.log(stringAnagram("Debit habit", "Bad habit"));