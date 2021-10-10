// Normal Export
const PI_DATA = 3.14
function add(a, b) {
    console.log(a + b)
}

// Export together
//export {PI, add}

// Export with Alias
export {PI_DATA as PI, add}

// Export with default () - Can import this default export by omitting the curly braces
export function minus(a, b) {
    console.log(a - b)
}


