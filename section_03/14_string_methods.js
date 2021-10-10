let str = 'Helloy guys I hope you are doing well'

// includes ()-
// The includes() method determines whether a string constains
// the characters of a specified string

let check = str.includes('hope')
console.log(check)

// IndexOf
// The indexOf() method returns the position of the first
// Occurrence of a specified value in a String
let index = str.indexOf('doing')
console.log(index)

// startsWith()
// determines whether a string begins with the characters
// of a specified string
console.log(str.startsWith('Hello'))

// Slice()
// method extracts parts of a string  and returns the
// extracts parts in a new string
let newStr = str.slice(0, 5)
console.log(newStr)

// toLowerCase()
// converts String to lowerCase letter

let x = 'My name is Matheus'
console.log(x.toLowerCase())

// toUpperCase()
let y = 'My name is Matheus'
console.log(y.toUpperCase())

// Trim() - Removes whitespaces from both sides of a String
let searchText = '     salesforce lwc    '
console.log(searchText.trim())
