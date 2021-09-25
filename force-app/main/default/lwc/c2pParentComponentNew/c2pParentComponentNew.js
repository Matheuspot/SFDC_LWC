import { LightningElement } from 'lwc';

export default class C2pParentComponentNew extends LightningElement {
    showModal = false
    clickHandler(event) {
        this.showModal = true
    }
    closeHandler() {
        this.showModal = false
    }
}