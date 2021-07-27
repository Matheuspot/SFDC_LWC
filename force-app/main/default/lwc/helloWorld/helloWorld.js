import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
   
    fullName = 'Zero to Hero'
    users    = ['a', 'b'] // Not allowed in template
    user      = {
        name: 'Matheus'
    }
   
}