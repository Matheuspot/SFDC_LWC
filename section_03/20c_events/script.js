document.addEventListener('hello', function(data){
    console.log('Hello has called and send', data.detail)
})

function callCustomMethod() {
    let event = new CustomEvent('hello', {
        detail : {name : 'Matheus'}
    })
    document.dispatchEvent(event)
}