import { LightningElement,track,api} from 'lwc';
import saveAccounts from '@salesforce/apex/AccountCreationController.createAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MultipleRowInsertion extends LightningElement {
    @track formFields = {}
    @track keyIndex = 0;  
    @track error;
    @track message;
    @track accountName;  
    @track accountRecordId;   
    @track accountRecList = 
    [
        {                      
            Name: '',
            Industry: '',
            Phone: ''
        }
    ];
 
    addRow() {
        this.keyIndex + 1;   
        this.accountRecList.push({            
            Name: '',
            Industry: '',
            Phone: ''
        });
    }    

    removeRow(event){          
        if(this.accountRecList.length >= 1){             
             this.accountRecList.splice(event.target.accessKey, 1);
             this.keyIndex - 1;
        }
    }

    saveMultipleAccounts() {        
        saveAccounts({ accountList : this.accountRecList }).then(result =>  {
            this.message = result;
            this.error = undefined;                
            this.accountRecList.forEach(function(item){                   
                item.Name='';
                item.Industry='';
                item.Phone='';                   
            });
    
            if(this.message !== undefined) {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Accounts Created!',
                        variant: 'success',
                    }),
                );
            }         
        }).catch(error => {
            this.message = undefined;
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating records',
                    message: error.body.message,
                    variant: 'error',
                }),
            );        
        });
    }

    changeHandler(event){  
        const {name, value} = event.target       
        this.formFields[name] = value
        
        console.log('NAME: ', name)
        console.log('VALUE: ', value)
        console.log('FORM FIELDS: ' + JSON.stringify(this.formFields))     

   

    this.accountRecList.forEach(item => {
            for (var [key, value2] of Object.entries(item)){
                for (var [keyNew, valueNew] of Object.entries(this.formFields)){
                    console.log('keyNew', keyNew)
                if ( key === keyNew) {
                    item[key] = valueNew                    
                    console.log('entrou')
                    console.log(JSON.stringify(this.accountRecList))
                }
            }
        }
    })
      
        

        


        /*if(event.target.name === 'accName') {
            this.accountRecList[event.target.accessKey].Name = event.target.value;
        }
        else if(event.target.name==='accIndustry'){
            this.accountRecList[event.target.accessKey].Industry = event.target.value;
        }
        else if(event.target.name==='accPhone'){
            this.accountRecList[event.target.accessKey].Phone = event.target.value;
        }*/

        console.log('ACCOUNT LIST: ' + JSON.stringify(this.accountRecList))
    }

    onAccountSelection(event){  
        this.accountName = event.detail.selectedValue;  
        this.accountRecordId = event.detail.selectedRecordId;  

        console.log('Account ID: ' + this.accountRecordId)
    }
    
    selectedCheckbox(event) {
        console.log(event.target.dataset.index)
        console.log('triggered checkbox')
        console.log(event)
    }
}