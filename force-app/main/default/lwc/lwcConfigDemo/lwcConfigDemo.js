import { LightningElement, api } from 'lwc';

export default class LwcConfigDemo extends LightningElement {
    
    @api recordId
    @api heading    
    @api age
    @api levels
}