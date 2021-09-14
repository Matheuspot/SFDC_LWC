import { LightningElement } from 'lwc';

export default class LifeCycleChild extends LightningElement {
    constructor() {
        super()
        console.log('Child constructor called')    
    }
    connectedCallback() {
        console.log('Child connectedCallack called')
    }
    renderedCallback() {
        console.log('Child renderedCallback called')
    }
}