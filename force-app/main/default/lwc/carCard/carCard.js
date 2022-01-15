import { LightningElement, wire } from 'lwc';
import {getFieldValue} from 'lightning/uiRecordApi'

// Import navigation
import { NavigationMixin } from 'lightning/navigation';

// Car Schema
import CAR_OBJECT from '@salesforce/schema/Car__c'
import NAME_FIELD from '@salesforce/schema/Car__c.Name'
import PICTURE_URL_FIELD from '@salesforce/schema/Car__c.Picture_URL__c'
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'
import MSRP_FIELD from '@salesforce/schema/Car__c.MSRP__c'
import FUEL_FIELD from '@salesforce/schema/Car__c.Fuel_Type__c'
import SEATS_FIELD from '@salesforce/schema/Car__c.Number_of_Seats__c'
import CONTROL_FIELD from '@salesforce/schema/Car__c.Control__c'

// ======== LMS AND MESSAGE CHANNEL
import {subscribe, unsubscribe, MessageContext} from 'lightning/messageService'
import CAR_SELECTED_MESSAGE from '@salesforce/messageChannel/CarSelected__c';
export default class CarCard extends NavigationMixin(LightningElement) {

    // Load content for LSM
    @wire(MessageContext)
    messageContext;

    // Exposing fields to make them avaiable in the template
    categoryField = CATEGORY_FIELD
    makeField = MAKE_FIELD
    msrpField = MSRP_FIELD
    fuelField = FUEL_FIELD
    seatsField = SEATS_FIELD
    controlField = CONTROL_FIELD

    // Car data
    recordId
    carName
    carPictureUrl    

    // Subscription reference for carSelected
    carSelectionSubscription   

    subscribeToMessageChannel() {        
        this.carSelectionSubscription = subscribe(this.messageContext, CAR_SELECTED_MESSAGE, (message) => {
            this.handleMessage(message)            
        });        
    }

    handleMessage(message) {
        this.recordId = message.carId;
    }

    // Subscription reference for carSelected
    handleRecordLoaded(event) {
        const {records} = event.detail
        const recordData = records[this.recordId]
        this.carName = getFieldValue(recordData, NAME_FIELD)
        this.carPictureUrl = getFieldValue(recordData, PICTURE_URL_FIELD)
    }

    // Navigate to record page
    handleNavigationAction() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: CAR_OBJECT.objectApiName,
                actionName: 'view',
            },
        });
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        unsubscribe(this.carSelectionSubscription)
        this.carSelectionSubscription = null
    }
}