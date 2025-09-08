function sentencePalindrome(sentence) {
    let regExp = /\W/g
    let string = sentence.replace(regExp, "").toLocaleLowerCase()
    let lastIndex = string.length;
    let validStr = true;

    for (let i = 0; i < string.length; i++) {

        if (string[i] == string[lastIndex - 1]) {
            lastIndex--
            continue;
        } else {
            validStr = false;
            break;
        }
    }
    return validStr;
}

console.log(sentencePalindrome("No lemon, no melon"))
console.log(sentencePalindrome("Evil is a name of a foeman, as I live"))
console.log(sentencePalindrome("racecar"))


// using string revrse method 

function revrseStringPalindrome(sentence) {

    let rev = []
    let str = sentence.replace(/\W/g, "").toLocaleLowerCase()
    for (let i = str.length - 1; i >= 0; i--) {
        rev.push(str[i])
    }
    if (str === rev.join("")) {
        return true
    } else {
        return false
    }
}

console.log(revrseStringPalindrome("Go hang a salami, I'm a lasagna hog."))
console.log(revrseStringPalindrome("palindrome?"))
