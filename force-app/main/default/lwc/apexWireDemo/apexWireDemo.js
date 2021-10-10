import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

export default class ApexWireDemo extends LightningElement {
   accountList
   
    @wire(getAccountList) accounts
    @wire(getAccountList)
    accountsHandler({data, error}){
        if (data) {
            this.accountList = data.map(item => {
                let newType = item.Type === 'Dummy 101 EDITED 227 BB' ? 'Dummy only' :
                item.Type === 'Dummy 102 EDITED 345 BCD' ? 'Dummy Only' : 'Dummy -----'
                return {...item, newType}
            })
        }
        if (error) {
            console.error(error)
        }
    }
}