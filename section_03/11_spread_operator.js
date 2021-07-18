// Spread Operator

// 1. Array
var arr = ["a", "b", "c"]
console.log(arr)
console.log(arr[0])
console.log(arr[1])
console.log(arr[2])
arr.push("3")
console.log(arr)

// 2. Objects
var obj = {
    "name"      : "Salesforce",
    "age"       : 23,
    "fullname"  : "Zero to Hero"
}

console.log(obj.age)
console.log(obj["age"])
console.log(obj["name"])
console.log(obj["fullname"])
console.log(obj.fullname)

// ---------------------------------------------

// 1. Expanding of String
console.log('Expanding of String')
let greeting = "Hello Everyone"
let charList = [...greeting]
console.log(charList)
console.log(charList[0])
console.log(charList[5])
console.log(charList[8])

// 2. Combining array
console.log('Combining an array')
let arr1 = ['Amazon', 'Google']
let arr2 = ['Facebook', 'Instagram']
let arr3 = [...arr1, ...arr2]
console.log(arr3)

// 3. Adding values to an array
console.log('Adding values to an array')
let arr4 = ['a', 'b', 'c']
let arr5 = [...arr4, 'Matheus']
console.log(arr5)

// 4. Combining objects
console.log('Combining Objects')
let obj1 = {name : 'Salesforce', age : 23, date: '07/15/2021'}
let obj2 = {name : 'Facebook', age : 55, 'next' : 'helo'}
let obj3 = {...obj1, ...obj2}
console.log(obj3)

// 5. Shallow copy
console.log('Shallow copy')
var arr10 = ['x', 'y', 'z']
var arr11 = [...arr10]
arr11.push('Matheus')
console.log(arr10)
console.log(arr11)

// 6. Nested copy
console.log('Nested Copy')
var arrObj = [
    {name : 'Matheus'},
    {name:  'Salesforce'}
]
/*
var arrObj1 = [...arrObj]
console.log(arrObj1)
arrObj1[0].name = 'Superman'
console.log(arrObj1)
console.log(arrObj)
*/

// Hack for nested copy
var arrObj1 = JSON.parse(JSON.stringify(arrObj))
arrObj1[0].name = 'Superman'
console.log(arrObj)
console.log(arrObj1)