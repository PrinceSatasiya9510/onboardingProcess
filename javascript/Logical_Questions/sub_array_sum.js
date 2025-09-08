function subArraySum(array) {
    let newArray = []
    for (let i = 0; i < array.length; i++) {
        let sum = 0;
        for (let j = 0; j < array[i].length; j++) {
            sum += array[i][j]
        }
        newArray.push(sum)
    }

    let max = newArray[0]

    for (let i = 0; i < newArray.length; i++) {
        if (max < newArray[i]) {
            max = newArray[i]
        }
    }
    return `biggest sum of nested array is ${max}`
}


console.log(subArraySum([[10, 20, 30], [40, 50, 60], [70, 80, 90], [11, 12, 13], [101, 78, 45]]))