import { LightningElement, api } from 'lwc';

export default class CarTile extends LightningElement {
    @api key 
    @api car = {}
    
    handleClick() {
        this.dispatchEvent(new CustomEvent('selected', {
            detail: this.car.Id
        }))
    }
}