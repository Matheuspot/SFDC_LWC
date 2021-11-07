import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue} from 'lightning/uiRecordApi'
import NAME_FIELD from '@salesforce/schema/Account.Name'
import OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name'
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue'
import RATING_FIELD from '@salesforce/schema/Account.Rating'

export default class GetRecordDemo extends LightningElement {

    name
    owner
    annualRevenue
    rating
    isEqual
  
    @api recordId

    @api
    get verification() {
        return this.isEqual;
    }

    set verification(value) {
       this.isEqual = value
    }
    
    @wire (getRecord, {recordId : '$recordId', 
    //only selected fields | fields : [NAME_FIELD, OWNER_NAME_FIELD, ANNUAL_REVENUE_FIELD, RATING_FIELD]})   
    // only fields displayed on layout | layoutTypes: ['Compact'], modes: ['View']})
    // all object fields | layoutTypes: ['Full'], modes: ['View']})
    layoutTypes: ['Full'], modes: ['View']})
    accountHandler({data}){
        if (data) {
            console.log(data)
            this.name           = getFieldValue(data, NAME_FIELD)           
            this.owner          = getFieldValue(data, OWNER_NAME_FIELD)
            this.annualRevenue  = getFieldValue(data, ANNUAL_REVENUE_FIELD)
            this.rating         = getFieldValue(data, RATING_FIELD)            
            this.validateRate()
        }
    }

    validateRate() {
        this.verification = this.rating == 'Warm'                
    }
}