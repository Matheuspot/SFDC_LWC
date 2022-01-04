import { LightningElement, wire, track } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';

// Car Schema
import CAR_OBJECT from '@salesforce/schema/Car__c'
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'

// Constants 
const CATEGORY_ERROR = 'Error loading categories'
const MAKE_ERROR = 'Error loading make types'
export default class CarFilter extends LightningElement {

    categoryError = CATEGORY_ERROR
    makeTypeError = MAKE_ERROR

    filters = {
        searchKey: '',
        maxPrice: 999999
    }
    
    @wire(getObjectInfo, {objectApiName : CAR_OBJECT}) carObjectInfo
    @wire(getPicklistValues, {
                                recordTypeId : '$carObjectInfo.data.defaultRecordTypeId',
                                fieldApiName : CATEGORY_FIELD
    })categories

    @wire(getPicklistValues, {
                                recordTypeId : '$carObjectInfo.data.defaultRecordTypeId',
                                fieldApiName : MAKE_FIELD
    })makers

    // Search key handler
    handleSearchKeyChange(event) {
      console.log(event.target.value)
      this.filters = {...this.filters, "searchKey": event.target.value}
    }

    handleMaxPriceChange(event) {
        console.log(event.target.value)
        this.filters = {...this.filters, "maxPrice": event.target.value}
    }

    handleCheckBox(event) {
        const {name, value} = event.target.dataset
        console.log("name", name)
        console.log("value", value)
    }
}