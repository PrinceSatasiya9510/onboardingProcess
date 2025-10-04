// exmple of type aliases 

type oneTypeOfType = number
let a: oneTypeOfType
a = 10


// react real example of type aliases 

type argument = string | number | null;

function example(response: argument) { }

example("true") // not give any type of error 
example(10) // not give any type of error 
example(null) // not give any type of error 
// example(true) // throw error