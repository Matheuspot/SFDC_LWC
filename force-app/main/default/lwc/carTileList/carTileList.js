import { LightningElement, wire } from 'lwc';
import getCars from '@salesforce/apex/CarController.getCars'

// ======== LMS AND MESSAGE CHANNEL
import {subscribe, MessageContext} from 'lightning/messageService'
import CARS_FILTERED_MESSAGE from '@salesforce/messageChannel/CarsFiltered__c'
// ====================================================== //
export default class CarTileList extends LightningElement {
    cars 
    error
    filters = {}
    carFilterSubscription


    @wire(getCars, {filters : '$filters'}) 
    carsHandler({data, error}) {
        if (data) {
            console.log(data)
            this.cars = data
        }
        if (error) {
            console.error(error)
            this.error = error
        }
    }

    // Load Context for LMS
    @wire (MessageContext)
    messageContext    

    connectedCallback() {
        this.subscribeHandler()
    }

    subscribeHandler() {
        this.carFilterSubscription = subscribe(this.messageContext, CARS_FILTERED_MESSAGE, (message) => {
            this.handleFilterChanges(message)
        })
    }

    handleFilterChanges(message) {
        console.log(message.filters)
        this.filters = {...message.filters}
    }
}