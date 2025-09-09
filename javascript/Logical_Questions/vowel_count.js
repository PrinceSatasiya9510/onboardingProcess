function countVowelAndConsonants(str) {
    let vowel = 0
    let string = str.toLowerCase()
    for (let i = 0; i < string.length; i++) {
        if (string[i] === 'a' || string[i] === 'e' || string[i] === 'i' || string[i] === 'o' || string[i] === 'u') {
            vowel++
        }
    }
    return `vowel are ${vowel} and Consonants are ${str.length - vowel}`
}

console.log(countVowelAndConsonants("aeiou!"))