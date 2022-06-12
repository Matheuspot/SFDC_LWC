import { LightningElement,api,track } from 'lwc';
import getRecords from '@salesforce/apex/CustomLookupController.getOnlyRecordsOwnedByTMs'

const idleClassName = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click'

export default class LwcMultiLookup extends LightningElement {

    // General setup
    @api sobjectName = 'Account'
    @api lookupLabel;
    @api required
    @api iconName    
    @api fieldName = 'Name';
    @api disableInputField = false;

    // Specific filter
    @api filterField = ''; //used to provide filter field in where clause
    @api filterFieldValue= '';//used to provide filter field value in where clause
    @api useFilterCriteria = false; // used to toggle the where clause in soql query   

    // Auxiliar variables
    @track data = []    
    @track status = {displayMessage : false, textMessage: ''}
    @track isLoading = false
    @track selectedRecordIds = []
    @track selectedRecords = []
    @track classeName = idleClassName  

    addSelectedRecord(event) {

        this.data = []

        let recordId = event.currentTarget.dataset.id
        let recordName = event.currentTarget.dataset.name        
        let object = { 'recordId' : recordId ,'recordName' : recordName};
        
        this.selectedRecordIds.push(recordId)
        this.selectedRecords.push(object)                 
        
        this.clearInputField() 
        this.styleHandler()      
        this.isLoading = false  
        this.messageHandler('', [], '', true)
    }

    eventHandler() {            
               
    }
    
    handleInputText(event) {
        var fieldValue = event.target.value
        this.isLoading = true
        this.getRecords(fieldValue, this.selectedRecordIds)
    }

    clearInputField() {
        this.template.querySelectorAll('.input_1').forEach(item => {item.value = null}) 
        this.isLoading = false
        this.styleHandler()
    }

    messageHandler(inputValue, data, message, success) {       

        let isValueEmpty = inputValue === ''
        let hasNoRecords = data.length == 0
        let isLoading = this.isLoading == true

        if (!success) {            
            this.status.displayMessage = true
            this.status.textMessage = message
            return            
        }

        if (isLoading) {
            this.status.displayMessage = true
            this.status.textMessage = 'Pesquisando...'
        } 

        if (isValueEmpty && !isLoading) {
            this.status.displayMessage = false       
        }

        if (!isValueEmpty && hasNoRecords && !isLoading) {
            this.status.displayMessage = true
            this.status.textMessage = 'Não foram encontrados registros'
        }       

        this.styleHandler()      
    }

    styleHandler() {                
        let closeCombobox = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click'
        let openCombobox =  closeCombobox + ' slds-is-open'             
        
        this.classeName =  this.data.length > 0 ? openCombobox : closeCombobox
    }

    getRecords(inputValue, recordIds) {       

        getRecords({ sObjectName: 'Account', fieldName: this.fieldName, fieldInput: inputValue, recordIds : recordIds})
        .then(data => {
            this.messageHandler(inputValue, data, '', true)            
            this.data = data;             
            this.isLoading = false
            this.messageHandler(inputValue, data, '', true)
        }).catch(error => {           
            this.messageHandler(inputValue, data, error, false)
        }).finally(()=>{
            this.isLoading = false;                  
        });
    }

    removeSelectedRecord (event){
        let selectRecId = [];
        let selectedIds1 = [];
        for(let i = 0; i < this.selectedRecords.length; i++){
            if(event.detail.name !== this.selectedRecords[i].recordId){
                selectRecId.push(this.selectedRecords[i]);
                selectedIds1.push(this.selectedRecords[i].recordId)
            }
        }
        this.selectedRecords = [...selectRecId];
        this.selectedRecordIds = [...selectedIds1];
        let selRecords = this.selectedRecords;
    
    }
}