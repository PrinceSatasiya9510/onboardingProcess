function fibonacci(number) {
    if (number <= 0) {
        return 1
    }

    let a = 0
    let b = 1


    for (let i = 0; i <= number; i++) {
        console.log(a)
        let temporaryVariable = a + b
        a = b
        b = temporaryVariable
    }


}

fibonacci(10)


// fibonacci using recursion


function fibonacciWithRecursion(number) {
    if (number === 0) {
        return 0;
    }
    if (number === 1) {
        return 1;
    }
    // console.log((number - 1) + (number - 2))
    return fibonacciWithRecursion(number - 1) + fibonacciWithRecursion(number - 2)
}

for (let i = 0; i <= 10; i++) {
    console.log(fibonacciWithRecursion(i))
}