//setTimeout

// The text will be displayed after 5 seconds in this case
/*window.setTimeout(function(){
    console.log('Hello')
}, 5000)
*/

let timerId = window.setTimeout(function(){
    console.log('Hello')
}, 2000)

console.log(timerId)
clearTimeout(timerId)

//setInterval

let intervalId = window.setInterval(function(){
    console.log('hello')
}, 5000)

clearInterval(intervalId)