let obj = {
    name: 'Salesforce',
    age: 23,
    dob: '07/08/1996'
}

//Object.keys()
console.log(Object.keys(obj))

// Object.values()
console.log(Object.values(obj))

// JSON.stringify
let str = JSON.stringify(obj)
console.log(str)

// JSON.parse
let strParse = JSON.parse(str)
console.log(strParse)