import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class Notifications extends LightningElement {

    toastHandlerOne() {
        this.showToast('Success!', '{0} Account created! {1}', 'success')
    }

    toastHandlerTwo() {    
        this.showToast('Error!', 'Account creation failed', 'error')
    }

    toastHandlerThree() {    
        this.showToast('Warning!', 'Password should have 15 characteres!', 'warning')
    }

    toastHandlerFour() {    
        this.showToast('Info!', 'Summer 22 release is available', 'info')
    }

    showToast(title, message, variant, mode) {
        const event = new ShowToastEvent({
            title, 
            message, 
            variant, 
            messageData: [
                'Salesforce', {
                url: 'http://www.salesforce.com',
                label: 'Click Here'
            }],
            mode: 'sticky'
        })
        this.dispatchEvent(event)
    }
}