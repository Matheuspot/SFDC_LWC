import { LightningElement, track } from 'lwc';
import getAccountIndustryByName from '@salesforce/apex/DynamicFieldsController.getAccountIndustryByName'
import getAccountPhoneByName from '@salesforce/apex/DynamicFieldsController.getAccountPhoneByName'

const OBJECT_ROW = {'Id' : '', 'Name' : '', 'Industry' : '', 'Phones' : [], 'Phone' : ''}

export default class DynamicRows extends LightningElement {

phones    
industry
numberOfRows = 1
initialNumberOfRows = 1
objectRow = OBJECT_ROW


@track rows = []
@track rowModel = {}
@track phoneOptions = []

    connectedCallback() {
        this.buildRow()
    }
    
    searchForAccountIndustry(event) {
       
        let index = event.target.dataset.index
        let fieldName = event.target.name
        let accountName = event.target.value 

        let industry = this.getAccountIndustryByName(accountName)    
        this.buildObjectByController('Industry', industry, index)   
       
        this.searchForAccountPhones(accountName, index)           
    }

    searchForAccountPhones(accountName, index) {
        let options = this.getAccountPhoneByName(accountName)
        options = this.getListOfOptions(options, 'Phone')      

        this.buildObjectByController('Phones', options, index)
    } 

    addRow() {
        const currentNumberOfRows = this.numberOfRows        
        if (currentNumberOfRows == 1) {
            this.buildRow()
        }
        if (currentNumberOfRows > 1) {
            for (let i = 0; i < currentNumberOfRows; i++) {
                this.buildRow()
            }
        }
    }

    deleteRow(event) {
        let currentIndex = event.target.dataset.index
        const index = this.rows.indexOf(currentIndex)
        this.rows.splice(index, 1)
    }

    deleteAllRows() {
        this.rows = []
        this.buildRow()
    }


    buildRow() {        
        let index = this.getCurrentIndex()
        let newRow = {...this.objectRow}

        newRow.Id = index,
        newRow.Name = '',
        newRow.Industry = ''

        this.rows.push(newRow)   
    }

    selectCheckbox(event) {
        console.log(event.target.checked)
        //let isSelected = event.target.checked
      //  let index = event.dataset.index
        
       
    }

    selectAllCheckboxes(event) {
        console.log(event.target.checked)
    }

    buildObject(event) {
        let fieldName = event.target.name
        let fieldValue = event.target.value
        let currentIndex = event.target.dataset.index

        console.log(fieldName)
        console.log(fieldValue)
        console.log('index: ', currentIndex)

        for (let i = 0; i < this.rows.length; i++){
            if (this.rows[i].Id === parseInt(currentIndex)) {
                this.rows[i][fieldName] = fieldValue
            }
        }         
    }

    buildObjectByController(fieldName, data, index) {  

        if (fieldName === 'Industry') {
            for (let i = 0; i < this.rows.length; i++){
                if (this.rows[i].Id === parseInt(index)) {
                    this.rows[i]['Industry'] = data
                }
            }  
        }

        if (fieldName === 'Phones') {
            for (let i = 0; i < this.rows.length; i++){
                if (this.rows[i].Id=== parseInt(index)) {
                    this.rows[i]['Phones'] = data
                }
            }  
        }      
    }

    setNumberOfRows(event) {
        this.numberOfRows = parseInt(event.target.value)   
        this.initialNumberOfRows = this.numberOfRows
    }

    getListOfOptions(data, fieldName) {  

        let options = []

        for (let i = 0; i < data.length; i++) {
            options.push({value : data[i].Phone, label : data[i].Phone})
        }        

        return options
    }

    getAccountPhoneByName(accountName) {      
        getAccountPhoneByName({accountName : accountName})
        .then(data =>{  
            this.phones = data                     
        }).catch(error => {
            console.error(error)
        })

        return this.phones
    }

    getAccountIndustryByName(accountName) {        

        getAccountIndustryByName({accountName : accountName})
        .then(data =>{
            this.industry = data            
        }).catch(error => {
            this.error = error         
        })     

        return this.industry
    }

    getCurrentIndex() {
        let index = 0
        let isFirstRow = this.rows.length === 0

        if (isFirstRow) {
            index = 1
        } 
        else {
            let numberOfRows = this.rows.length
            index = numberOfRows + 1
        }  
        return index      
    }  
    
    get isQuantityOfRowsNotDefined() {
        return this.numberOfRows < 1 || this.numberOfRows === (null || undefined)
    }
}