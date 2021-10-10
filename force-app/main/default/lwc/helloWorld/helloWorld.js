import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {   
    fullName = 'Zero to Hero'
    title    = 'Aura'

    @track address = {
        city     : 'Melbourne',
        postCode : 3008,
        country  : 'Australia'
    }

    @track userLst = ['a', 'b', 'c']

    changeHandler(event) {
        this.title = event.target.value
    }   

    trackHandler(event) {
        this.address.city = event.target.value        
        //this.address = {...this.address, 'city' : event.target.value}
    }

    // getter example
    users       = ['Matheus', 'Marcos', 'Rafael']    
    num1        = 10
    num2        = 20
 
    get firstUser() {
        return this.users[0].toUpperCase()
    } 

    get multiply() {
        return this.num1 * this.num2
    }


    
}