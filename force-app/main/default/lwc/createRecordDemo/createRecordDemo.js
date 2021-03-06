import { LightningElement } from 'lwc';
import { createRecord} from 'lightning/uiRecordApi'
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import { ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class CreateRecordDemo extends LightningElement {
    formFields = {}
    changeHandler(event) {
        const {name, value} = event.target       
        console.log('event target: ' + JSON.stringify(event.target))
        this.formFields[name] = value

        console.log('created field: ' + JSON.stringify(this.formFields))
    }
    createContact() {
        const recordInput = {apiName: CONTACT_OBJECT.objectApiName, fields: this.formFields}
        createRecord(recordInput).then(result => {
            console.log(result)
            this.showToast('Success at creating record!', `Contact ${result.fields.FirstName.value} ${result.fields.LastName.value} created with id ${result.id}`)
            this.template.querySelector('form.createForm').reset()
            this.formFields = {}
        }).catch(error => {
            this.showToast('Error at creating record!', error.body.message, 'error')
        }) 
    }
    showToast(title, message, variant){
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant: variant || 'success'
        }))        
    }
}