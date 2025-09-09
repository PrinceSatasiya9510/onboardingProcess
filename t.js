// function bubbleSort(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr.length - i; j++) {
//             if (arr[j] >= arr[j + 1]) {
//                 let temp = arr[j]
//                 arr[j] = arr[j + 1]
//                 arr[j + 1] = temp
//             }
//         }
//         console.log(arr)
//     }
//     return arr
// }

// console.log(bubbleSort([54, 26, 93, 17, 77, 31, 44, 55, 20]))

function selection(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        let temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
        console.log(arr)
    }
    return arr
}

console.log(selection([54, 26, 93, 17, 77, 31, 44, 55, 20]))