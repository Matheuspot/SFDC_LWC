import { LightningElement } from 'lwc';

export default class LifeCycleChild extends LightningElement {
    constructor() {
        super()
        console.log('Child constructor called')    
    }
    interval
    connectedCallback() {
        console.log('Child connectedCallack called')
        this.interval =  window.setInterval()
    }
    renderedCallback() {
        console.log('Child renderedCallback called')
    }
    
    disconnectedCallback() {
        alert('Child disconnectedCallback called !!')
        window.removeEventListener('click', this.handleClick)
        window.clearInterval(this.interval)
    }
}