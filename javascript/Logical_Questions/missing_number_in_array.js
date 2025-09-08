function findMissingNumberFormAnArray(array, from, to) {
    if (from >= to) {
        return "starting index must be grater then ending index!!"
    }
    let missingNumbersArray = []
    for (let i = from; i <= to; i++) {
        if (!(array.includes(i))) {
            missingNumbersArray.push(i)
        }
    }
    return missingNumbersArray
}

let array = [15, 1, 2, 5, 3, 8, 12, 16]
let startNumber = 5;
let endNumber = 10
console.log("Missing Numbers are : ", findMissingNumberFormAnArray(array, startNumber, endNumber))

