function sentencePalindrome(sentence) {
    let lastIndex = sentence.length;
    let validStr = true;

    for (let i = 0; i < sentence.length; i++) {

        if (sentence[i] == sentence[lastIndex - 1]) {
            lastIndex--
            continue;
        } else {
            validStr = false;
            break;
        }
    }
    return validStr;
}



function subStringPalibndrome(sentense) {
    let regExp = /\W/g
    let string = sentense.replace(regExp, "").toLocaleLowerCase()
    if (string.length < 3) {
        return 'this is an not longest palindrome string'
    }
    let arrayOfSubString = []
    for (let i = 0; i < string.length; i++) {
        for (let j = i + 1; j <= string.length; j++) {
            let sliceString = string.slice(i, j)
            if (sentencePalindrome(sliceString)) {
                if (sliceString.length >= 2) {
                    arrayOfSubString.push(sliceString)
                }
            }
        }
    }
    if (!(arrayOfSubString.length == 0)) {
        return arrayOfSubString
    } else {
        return 'string not contain any palidrome substring!'
    }
}


console.log(subStringPalibndrome("forgeeksskeegfor"))
console.log(subStringPalibndrome("anana"))
console.log(subStringPalibndrome("45878712421"))
