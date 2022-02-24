import { LightningElement } from 'lwc';
import ID from '@salesforce/user/Id'
import ID_GUEST from '@salesforce/user/isGuest'

export default class UserInformation extends LightningElement {
    userId = ID
    isGuest = ID_GUEST
}