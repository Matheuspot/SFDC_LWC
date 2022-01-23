import { LightningElement } from 'lwc'
import { deleteRecord } from 'lightning/uiRecordApi'
import { ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class DeleteRecordDemo extends LightningElement {
    recordId    

    changeHandler(event) {
        this.recordId = event.target.value
    }

    deleteHandler() {
        deleteRecord(this.recordId).then((result) => {
            console.log('Deleted successfully!!!')
            this.showToast('Success!', 'Deleted successfully!', 'success')
        }).catch(error => {
            this.showToast('Oho, something went wrong!', 'It was not possible to delete this record', 'error')
            console.error(error)
        })    
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        }))
    }
}