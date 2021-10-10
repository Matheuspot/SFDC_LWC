// Query selector -> Matches first element
let element = document.querySelector('.abc')
console.log(element.innerHTML)
element.style.color = 'red'

// Query selector all -> Matches all elements
let elementAll = document.querySelectorAll('div')
console.log(elementAll)

// Array.from(obj).map(mapFn, thisArg)
Array.from(elementAll).map(function(item){
    console.log(item.innerHTML)
    if (item.innerHTML != 'Hello everyone'){
        return item.style.color = 'green'
    }
})