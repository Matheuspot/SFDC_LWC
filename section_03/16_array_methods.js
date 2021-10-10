let arr = [2, 3, 5, 7, 9, 10]

// map () 
// Syntax - array.methodName(function(currentItem, index, actualArray){})

// let newArray = arr.map(function(currentItem, index, array){
//     console.log(`currentItem is ${currentItem}, index is ${index} , and array is ${array}}`)
//     return currentItem * 2
// })

// console.log(`Old array ${arr}`)
// console.log(`New array ${newArray}`)

// filter()
let filteredValues = arr.filter(function(currentItem, index, array){
    return currentItem > 5
})
console.log(filteredValues)

// every()
console.log('Running every()')
let age = [32, 33, 18, 40]
let isAllAdult = age.every(function(currentItem){
    return currentItem > 18
})
console.log(isAllAdult)

// some()
console.log('Running some()')
let ageLst = [32, 33, 18, 40]
let isAdult = ageLst.every(function(currentItem){
    return currentItem > 32
})
console.log(isAdult)

// sort()
var names = ['Felipe', 'Matheus', 'Andrea', 'Daniela']
console.log(names.sort())

// sorting numbers
console.log('Running sort()')
var point = [10, 39, 12, 80, 54]
let sortedValues = point.sort(function(a, b){
    //return a - b  // asceding return 
    return b - a  // desceding return  
})

// reduce()
// Syntax - array.reduce(function(accumulator, currentValue, index, array){}, initialValue)
console.log('Running reduce()')
let num = [12, 78, 30]
let total = num.reduce(function(accumulator, currentValue){
    return accumulator + currentValue
},0)

console.log(total)

// forEach()
console.log('Running forEach()')
num.forEach(function(currentValue){
    console.log('Actual value: ' + currentValue)
})