import { LightningElement } from 'lwc';

export default class C2pModalComponent extends LightningElement {
    
    closeHandler() {
        const myEvent = new CustomEvent('close', {
            //detail: 'Modal closed successfully!!'   // simple data -  detail is a standard variable
            detail: {
                msg: 'Modal closed successfully!!'   // complex data
            }
        })
        this.dispatchEvent(myEvent)    
    }
}