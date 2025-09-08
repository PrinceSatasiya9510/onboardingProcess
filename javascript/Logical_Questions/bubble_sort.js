function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j <= (arr.length - i); j++) {
            if (arr[j] >= arr[j + 1]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }

    return arr
}

console.log(bubbleSort([30, 10, 50, 40, 20]))



// Failed try

// function bubbleSort(array) {
//     let arrayLength = array.length;

//     for (let i = 0; i < arrayLength; i++) {
//         for (let j = i + 1; j < arrayLength; j++) {
//             if (array[i] >= array[j]) {
//                 let temp = arr[i]
//                 array[i] = arr[j]
//                 array[j] = temp
//           }
//         }
//      arrayLength--
//     }
//     // return array
// }


// function bubbleSort(array) {
//     let arrayLength = array.length;

//     for (let i = 0; i < arrayLength; i++) {
//         for (let j = i; j < i+1; j++) {
//             if (array[i] >= array[j]) {
//                 let temp = arr[i]
//                 array[i] = arr[j]
//                 array[j] = temp
//             }
//         }
//      arrayLength--
//     }
//     // return array
// }


// function bubbleSort(array) {
//     let arrayLength = array.length;

//     for (let i = 0; i < arrayLength; i++) {
//         for (let j = 0; j <= i+1; j++) {
//             if (array[i] >= array[j]) {
//                 let temp = arr[i]
//                 array[i] = arr[j]
//                 array[j] = temp
//             }
//         }
//      arrayLength--
//     }
//     // return array
// }


// function bubbleSort(array) {
//     for (let i = 0; i < array.length; i++) {
//         for (let j = 0; j <= array.length - 1; j++) {
//             if (array[i] >= array[j]) {
//                 let temp = arr[i]
//                 array[i] = arr[j]
//                 array[j] = temp
//             }
//         }
//     }
//     // return array
// }



// function bubbleSort(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j <= arr.length - i; j++) {
//             if (array[i] >= array[j]) {
//                 let temp = arr[i]
//                 array[i] = arr[j]
//                 array[j] = temp
//             }
//         }
//         console.log(arr)
//     }

//     return arr
// }


// function bubbleSort(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j <= arr.length - i; j++) {
//             if (array[i] >= array[j + 1]) {
//                 let temp = arr[i]
//                 array[i] = arr[j + 1]
//                 array[j + 1] = temp
//             }
//         }
//         console.log(arr)
//     }

//     return arr
// }

