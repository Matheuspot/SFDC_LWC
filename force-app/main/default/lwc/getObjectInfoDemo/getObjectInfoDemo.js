import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getObjectInfos } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity'

export default class GetObjectInfoDemo extends LightningElement {

    // Wire property - Only one object
    @wire(getObjectInfo, {objectApiName: ACCOUNT_OBJECT}) 
    objectInfo
    
    objectApiNames = [ACCOUNT_OBJECT, OPPORTUNITY_OBJECT]

    // Wire property - More than one object
    objectInfos
    @wire(getObjectInfos, {objectApiNames: '$objectApiNames'}) 
    objectInfosHandler({data}) {
        if (data) {
            console.log(data)
            this.objectInfos = data
        }
    }

    // Wire function - Only one object
    /*
    @wire(getObjectInfo, {objectApiName: ACCOUNT_OBJECT}) 
    objectInfo({data, error}) {
        if (data) {
            console.log(data)
            this.defaultRecordTypeId = data.defaultRecordTypeId
        }
        if (error) {
            console.error(error)
        }
    }
    */   
   
}