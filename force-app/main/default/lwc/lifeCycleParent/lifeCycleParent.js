import { LightningElement } from 'lwc';

export default class LifeCycleParent extends LightningElement {
        
    constructor() {
        super()
        console.log('Parent constructor called')    
    }
    connectedCallback() {
        console.log('Parent connectedCallack called')
    }
    renderedCallback() {
        console.log('Parent renderedCallback called')
    }

    name
    changeHandler(event) {
        this.name = event.target.value
    }
}