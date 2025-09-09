function insertionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let key = arr[i]
        for (let j = 0; j <= i; j++) {
            if (key <= arr[j]) {
                let temp = arr[j]
                arr[j] = arr[i]
                arr[i] = temp
            }
        }
        console.log(arr)
    }
    return arr
}


// console.log(insertionSort([54, 26, 93, 17, 77, 31, 44, 55, 20]))



// Failed attemt !!!


// function insertionSort(arr) {
//     let index = arr[1]
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = index; j >= 0; j--) {
//             if (arr[j] <= arr[j - 1]) {
//                 let temp = arr[j]
//                 arr[j] = arr[j - 1]
//                 arr[j - 1] = temp
//             }
//         }
//         index++
//         console.log(arr)
//     }
//     return arr
// }


// function insertionSort(arr) {
//     for (let i = 0; i < arr.length - 1; i++) {
//         for (let j = i + 1; j < arr.length; j++) {
//             for (let k = j; k >= 0; k--) {
//                 if (arr[j] >= arr[k] && arr[j] <= arr[k + 1]) {
//                     let temp = arr[j]
//                     arr[j] = arr[k]
//                     arr[k] = temp
//                 }
//             }
//         }
//     }
//     return arr
// }

// console.log(insertionSort([45, 78, 12, 45, 99, 6, 9, 5, 41, 21, 10]))


// function insertionSort(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = i + 1; j >= 0; j--) {
//             if (arr[j] < arr[i]) {
//                 let temp = arr[j]
//                 arr[j] = arr[i]
//                 arr[i] = temp
//             }
//         }
//     }
//     return arr
// }

// console.log(insertionSort([45, 78, 12, 45, 99, 6, 9, 5, 41, 21, 10]))


// function insertionSort(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j <= i + 1; j++) {
//             if (arr[j] < arr[i + 1]) {
//                 let temp = arr[j]
//                 arr[j] = arr[i + 1]
//                 arr[i + 1] = temp
//             }
//         }
//     }
//     return arr
// }

// console.log(insertionSort([45, 78, 12, 45, 99, 6, 9, 5, 41, 21, 10]))


function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
        console.log(arr)
    }
    return arr
}



console.log(insertionSort([23, 1, 10, 5, 2, 30]))
