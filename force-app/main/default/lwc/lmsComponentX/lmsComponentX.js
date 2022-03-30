import { LightningElement, wire } from 'lwc';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c"
import { APPLICATION_SCOPE, MessageContext, subscribe, unsubscribe } from 'lightning/messageService';

export default class LmsComponentX extends LightningElement {
    
    receivedMessage    
    subscription    
    @wire(MessageContext) 
    context

    connectedCallback() {
        this.subscribeMessage()
    }

    subscribeMessage() {
        this.subscription = subscribe(this.context, SAMPLEMC, (message) => 
        {this.handleMessage(message)},
        {scope : APPLICATION_SCOPE})
    }

    unsubscribeMessage() {
        unsubscribe(this.subscription)
        this.subscription = null
    }

    handleMessage(message) {
        this.receivedMessage = message.lmsData.value ? message.lmsData.value : 'No message published'
    }
}