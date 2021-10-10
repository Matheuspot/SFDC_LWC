import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi'
import Id from '@salesforce/user/Id'
import NAME_FIELD from '@salesforce/schema/User.Name'
import EMAIL_FIELD from '@salesforce/schema/User.Email'
const fields = [NAME_FIELD, EMAIL_FIELD]

export default class WireDemoUserDetail extends LightningElement {

    userId = Id
    userDetail

    // Non-hard-coded fields
    @wire(getRecord, {recordId: '$userId', fields})
    userDetailHandler({data, error}) {
        if (data) {          
           this.userDetail = data.fields 
        }
        if (error) {
            console.error(error)
        }
    }

    // Hard-coded fields
    @wire(getRecord, {recordId: '0055e000002G1PLAA0', fields: ['User.Name', 'User.Email']})
    userDetailProperty
}