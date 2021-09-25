import { LightningElement } from 'lwc';

export default class C2pParentComponentNew extends LightningElement {
    showModal = false
    msg

    clickHandler(event) {
        this.showModal = true
    }
    closeHandler(event) {
        this.msg        = event.detail.msg
        this.showModal  = false
    }
}