function addFrequency(array) {
    let object = {}
    for (let i = 0; i < array.length; i++) {
        if (object.hasOwnProperty(array[i])) {
            object[array[i]]++
        } else {
            object[array[i]] = 1
        }
    }
    sortByFrequency(object)

}

function sortByFrequency(object) {
    let nestedArray = []
    let finalArray = []

    for (let key of Object.keys(object)) {
        nestedArray.push([Number.parseInt(key), object[key]])
    }

    for (let i = 0; i < nestedArray.length - 1; i++) {
        for (let j = i + 1; j < nestedArray.length; j++) {
            if (nestedArray[i][1] <= nestedArray[j][1]) {
                let temp = nestedArray[i]
                nestedArray[i] = nestedArray[j]
                nestedArray[j] = temp
            }
        }
    }

    for (let i = 0; i < nestedArray.length; i++) {
        for (let j = 0; j < nestedArray[i][1]; j++) {
            finalArray.push(nestedArray[i][0])
        }
    }

    console.log(finalArray)
}


addFrequency([10, 5, 5, 5, 9, 4, 1, 15, 2, 4, 8, 6, 10, 3, 6, 15, 1, 2])