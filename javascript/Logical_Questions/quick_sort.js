function partition(arr, low, high) {

    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    // console.log(i)
    console.log(arr)
    return i + 1;
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function sort(arr, low, high) {
    if (low < high) {
        let pivot = partition(arr, low, high);
        // console.log("🚀 ~ sort ~ pivot:", pivot)
        sort(arr, low, pivot - 1);
        sort(arr, pivot + 1, high);
    }
}

let arr = [10, 7, 8, 9, 1, 5];
sort(arr, 0, arr.length - 1);
console.log(arr);