import { LightningElement, wire } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry'
import TYPE_FIELD from '@salesforce/schema/Account.Type'
import ACCOUNT_OBJECT from '@salesforce/schema/Account'

export default class GetPicklistValuesDemo extends LightningElement {
   
    selectedIndustry    = ''
    selectedOptions     = ''
    industryOptions     = []
    typeOptions         = []

    @wire(getObjectInfo, {objectApiName: ACCOUNT_OBJECT})
    objectInfo

    @wire(getPicklistValues, {recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: INDUSTRY_FIELD}) 
    industryPicklistValues ({data, error}) {
        if (data) {
            this.industryOptions = [...this.generatePicklist(data)]
        }
        if (error) {
            console.error(error)
        }
    }
    @wire(getPicklistValues, {recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: TYPE_FIELD}) 
    typePicklistValues ({data, error}) {
        if (data) {            
            this.typeOptions = [...this.generatePicklist(data)]          
        }
        if (error) {
            console.error(error)
        }
    }

    handleIndustryChange(event) {
        this.selectedIndustry = event.detail.value;
    }

    handleTypeChange(event) {
        this.selectedType = event.detail.value;
    }

    generatePicklist(data) {
        return data.values.map(item => ({label : item.label, value : item.value}))
    }
}