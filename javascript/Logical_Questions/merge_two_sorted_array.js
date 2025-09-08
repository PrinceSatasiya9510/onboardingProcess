function mergeTwoSortedArray(arr1, arr2) {
    for (let i = 0; i < arr2.length; i++) {
        arr1.push(arr2[i])
    }


    for (let i = 0; i < arr1.length; i++) {
        for (let j = i + 1; j < arr1.length; j++) {
            if (arr1[i] >= arr1[j]) {
                let temp = arr1[i]
                arr1[i] = arr1[j]
                arr1[j] = temp
            }
        }
    }
    return arr1
}


console.log(mergeTwoSortedArray([50, 30, 10, 20, 40, 50, 60], [80, 70, 90, 10, 30, 100, 60])) 