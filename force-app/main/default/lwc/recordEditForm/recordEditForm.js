import { LightningElement } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId'
import NAME_FIELD from '@salesforce/schema/Contact.Name'
import TITLE_FIELD from '@salesforce/schema/Contact.Title'
import PHONE_FIELD from '@salesforce/schema/Contact.Phone'
import EMAIL_FIELD from '@salesforce/schema/Contact.Email'

export default class RecordEditForm extends LightningElement {
    objectName = CONTACT_OBJECT

    fields = {
        accountField    : ACCOUNT_FIELD,
        nameField       : NAME_FIELD,
        titleField      : TITLE_FIELD,
        phoneField      : PHONE_FIELD,
        emailField      : EMAIL_FIELD
    }
}