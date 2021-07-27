import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {   
    fullName = 'Zero to Hero'
    title = 'Aura'

    changeHandler(event) {
        this.title = event.target.value
    }   
}