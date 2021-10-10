import { LightningElement, api } from 'lwc';

export default class SetterDemoChild extends LightningElement {
   
    userdetail   
    @api
    get detail() {
        return this.userdetail
    }

    set detail(data) {
        let newAge      = data.age * 2
        this.userdetail = {...data, age: newAge, 'location' : 'São Paulo'}  
    }
}