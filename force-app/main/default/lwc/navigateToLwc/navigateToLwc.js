import { LightningElement } from 'lwc';
import { NavigationMixin} from 'lightning/navigation'

export default class NavigateToLwc extends NavigationMixin(LightningElement) {
    navigateToLwc() {
        var definition = {
            componentDef: 'c:navigationLwcTarget',
            attributes : {
                recordId: '768762322552'
            }   
        }

        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes : {
                url: '/one/one.app#' + btoa(JSON.stringify(definition))
            }
        })
    }
}