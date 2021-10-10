/*
// EXAMPLE 1
// No arrow Function
 function abc() {
    console.log('Hello')
}
abc() 
// Arrow Function
const abc = () => console.log('Hello')

// ---------------------------------------

// EXAMPLE 2
//No arrow Function

 function sum(data) {
    let sum = data + 10
    return sum
}

// Arrow Function
// If I have only one parameter there is no need of parentesis
const sum1 = data => {
    let sum1 = data + 10
    return sum1
}
console.log(sum1(4))

// ---------------------------------------

// EXAMPLE 3
const sum2 = (data1, data2) => data1 + data2
console.log(sum2(10,10))

var arr = [1, 2, 3, 4]
let newArr = arr.map((item) => item * 2)
console.log(newArr)
*/
// ---------------------------------------

// Problem solved by Arrow Function
let obj = {

    name        : 'Matheus',
    lastName    : 'Antonio',

    getName     : function() {        
    let fullName = () =>      
        `My full name is ${this.name} ${this.lastName}`        
        console.log(fullName())
    }
}
obj.getName()