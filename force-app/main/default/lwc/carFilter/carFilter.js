import { LightningElement, wire, track } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';

// ======== CAR SCHEMA
import CAR_OBJECT from '@salesforce/schema/Car__c'
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'
// ====================================================== //

// ======== CONSTANTS 
const CATEGORY_ERROR = 'Error loading categories'
const MAKE_ERROR = 'Error loading make types'
// ====================================================== //

// ======== LMS AND MESSAGE CHANNEL - PUBLISH 
import {publish, MessageContext} from 'lightning/messageService'
import CARS_FILTERED_MESSAGE from '@salesforce/messageChannel/CarsFiltered__c'
// ====================================================== //
export default class CarFilter extends LightningElement {

    categoryError = CATEGORY_ERROR
    makeTypeError = MAKE_ERROR

    // Load Context for LMS
    @wire (MessageContext)
    messageContext    

    filters = {
        searchKey: '',
        maxPrice: 999999
    }
    
    @wire(getObjectInfo, {objectApiName : CAR_OBJECT}) carObjectInfo

    // Fetch category picklist for checkboxes
    @wire(getPicklistValues, {
                                recordTypeId : '$carObjectInfo.data.defaultRecordTypeId',
                                fieldApiName : CATEGORY_FIELD
    })categories

    // Fetch makers picklist for checkboxes
    @wire(getPicklistValues, {
                                recordTypeId : '$carObjectInfo.data.defaultRecordTypeId',
                                fieldApiName : MAKE_FIELD
    })makers

    // Search key handler
    handleSearchKeyChange(event) {
      console.log(event.target.value)
      this.filters = {...this.filters, "searchKey": event.target.value}
      this.sendDataToCarList()
    }

    handleMaxPriceChange(event) {
        console.log(event.target.value)
        this.filters = {...this.filters, "maxPrice": event.target.value}
        this.sendDataToCarList()
    }

    handleCheckBox(event) {
        const {name, value} = event.target.dataset
        console.log("name", name)
        console.log("value", value)
    }

    sendDataToCarList() {
        publish(this.messageContext, CARS_FILTERED_MESSAGE, {
            filters : this.filters
        })
    }
}