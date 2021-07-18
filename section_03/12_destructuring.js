// Array destructuring

let arr = ['Amazon', 'Google']
//let company1 = arr[0]
//let company2 = arr[1]

let [company1, company2] = arr
console.log(company1)
console.log(company2)

// Object destructing

let options = {
    title   : 'Zero to Hero',
    age     : 23,
    type    : 'CRM'
}

//var title   = options.title
//var age     = options.age

let {title, age, type} = options
console.log(title)
console.log(age)
console.log(type)
