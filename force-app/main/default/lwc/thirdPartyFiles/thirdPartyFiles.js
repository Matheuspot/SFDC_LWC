import { LightningElement } from 'lwc';
import MOMENT from '@salesforce/resourceUrl/moment'
import { loadScript } from 'lightning/platformResourceLoader'

export default class ThirdPartyFiles extends LightningElement {

    currentDate = null
    isLibLoaded = false

    renderedCallback() {
        if (this.isLibLoaded) {
            return 
        } else {
            // If I were to use several js classes I should have to implement Promise.all
            //Promise.all([loadScript(this, MOMENT + '/moment/moment.min.js')]).then(() => {    
            loadScript(this, MOMENT + '/moment/moment.min.js').then(() => {            
                this.setDateOnScreen()                
            }).catch(error => {
                console.error(error)
            })
            this.isLibLoaded = true
        }
    }

    setDateOnScreen() {
        this.currentDate = moment().format('LLLL')
    }
}