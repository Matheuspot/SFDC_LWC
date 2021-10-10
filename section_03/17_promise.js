// function checkIsSuccess(data) {
//     return new Promise(function(resolve, reject){
//         if (data === 'success'){
//             return resolve('success')
//         }
//         else {
//             return reject('unsuccessfully executed')
//         }        
//     })
// }

// checkIsSuccess('success').then(function(result){
//     console.log(result)
// }).catch(function(error){
//     console.error(error)
// })

let jsonReturned = fetch('https://api.github.com/users/karkranikhil').then(function(result){
    return result.json()
}).then(function(response){
    console.log(response)
})

console.log(jsonReturned)
