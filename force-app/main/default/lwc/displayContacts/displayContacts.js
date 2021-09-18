import { LightningElement, api } from 'lwc';
import displayContacts from '@salesforce/apex/DisplayContactsController.displayContacts'
import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';

export default class DisplayContacts extends LightningElement {
    @api records
    @api error

    isOpen = false 
    isShown = false

    get eventSource() {
        return (
            this.isShown === 'Show contact list' ? true : 
            this.isShown === 'Close contact list' ? false : false
        )
    }         

    handleClick(event) {
        console.log('botão clicado')
        this.isOpen = !this.isOpen
        this.isShown = event.target.label        
        
        displayContacts().then(result => {
            this.records = result
            this.error = undefined
            
        }).catch(error => {
            this.records = undefined
            this.error = error
        });
    }
}