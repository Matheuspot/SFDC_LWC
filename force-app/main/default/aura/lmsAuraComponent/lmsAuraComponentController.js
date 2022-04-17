({
    handleMessage: function(component, message) {
       if (message != null && message.getParam('lmsData') != null) {
           component.set('v.messageReceived', message.getParam('lmsData').value)
       }
   },

    inputHandler: function(component, event) {       
        component.set('v.messageValue', event.target.value)
   },

    publishMessage: function(component) {
        let msgToSend = component.get('v.messageValue')
        let message = {
            lsmData: {
                value: msgToSend
            }
        }
        component.find('SampleMessageChannel').publish(message)
    }
})
