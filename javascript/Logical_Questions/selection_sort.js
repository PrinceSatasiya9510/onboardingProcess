function selectionSort(arr) {
    let min = 0

    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            if (arr[min] <= arr[i]) {
                min = i
            }

            if (arr[min] >= arr[j]) {
                let temp = arr[j]
                arr[j] = arr[min]
                arr[min] = temp
            }
        }
    }
    return arr
}

console.log(selectionSort([29, 72, 98, 13, 87, 66, 52, 51, 36]))
console.log(selectionSort([1, -48, 39, 38, -35, 29, -25, 24, 18, 10, -5]))
console.log(selectionSort([-10, -89, -5, -45, 5, -41, -66, -101]))