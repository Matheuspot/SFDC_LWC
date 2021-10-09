import { LightningElement, wire, track} from 'lwc';
import filterAccountTypeType from '@salesforce/apex/AccountController.filterAccountTypeType';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import TYPE_FIELD from '@salesforce/schema/Account.Type';

export default class WireApexWithParams extends LightningElement {
    
    selectedType = ''  

    @wire(filterAccountTypeType, {type: '$selectedType'}) filteredAccounts  
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT }) accountInfo;
    @wire(getPicklistValues, { recordTypeId: '$accountInfo.data.defaultRecordTypeId', fieldApiName: TYPE_FIELD}) accountTypeValues;  

    handleChange(event) {
        this.selectedType = event.target.value
    }
}