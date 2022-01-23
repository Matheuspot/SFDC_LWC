import { LightningElement, api, wire} from 'lwc';
import getSimilarCars from '@salesforce/apex/CarController.getSimilarCars'
import {getRecord} from 'lightning/uiRecordApi'
import CAR_OBJECT from '@salesforce/schema/Car__c'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'

import {NavigationMixin} from 'lightning/navigation'
export default class SimilarCars extends NavigationMixin(LightningElement) {
    @api recordId 
    similarCars

    @wire(getRecord, {recordId: '$recordId', fields: [MAKE_FIELD]}) 
    car  

    fetchSimilarCars() {       
        getSimilarCars({
            carId : this.recordId,
            maker : this.car.data.fields.Make__c.value
        }).then(result => {
            this.similarCars = result       
            console.log(this.similarCars)   
        }).catch(error => {
            console.log(error)
        })
    }

    handleViewDetailsClick(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId : event.target.dataset.id,
                objectApiName : CAR_OBJECT.objectApiName,
                actionName : 'view'
            }
        })
    }
}