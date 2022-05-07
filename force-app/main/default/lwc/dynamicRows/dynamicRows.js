import { LightningElement, track } from 'lwc';
import getAccountIndustryByName from '@salesforce/apex/DynamicFieldsController.getAccountIndustryByName'
import getAccountPhoneByName from '@salesforce/apex/DynamicFieldsController.getAccountPhoneByName'
const OBJECT_ROW = {'Id' : '', 'Name' : '', 'Industry' : '', 'Phones' : []}

export default class DynamicRows extends LightningElement {

@track rows = []
@track rowModel = {}
@track options = []//[{label:'39722047', value :'39722047'}, {label:'39722048', value :'39722047'}]
type
numberOfRows = 0
objectRow = OBJECT_ROW

    connectedCallback() {
        this.buildRow()
    }
    
    searchForAccountIndustry(event) {
       
        let index = event.target.dataset.index
        let fieldName = event.target.name
        let accountName = event.target.value 
     
        getAccountIndustryByName({accountName : accountName})
        .then(data =>{
            this.buildObjectByController('Industry', data, index)                
        }).catch(error => {
            this.error = error         
        })

        this.setPhoneOptions('Phones', accountName, index)
    }

    buildRow() {        
        let index = this.getCurrentIndex()
        let newRow = {...this.objectRow}

        newRow.Id = index,
        newRow.Name = '',
        newRow.Industry = ''

        this.rows.push(newRow)   
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

    buildObject(event) {
        let fieldName = event.target.name
        let fieldValue = event.target.value
        let currentIndex = event.target.dataset.index

        for (let i = 0; i < this.rows.length; i++){
            if (this.rows[i].Id === parseInt(currentIndex)) {
                this.rows[i][fieldName] = fieldValue
            }
        }       
    }

    buildObjectByController(fieldName, data, index) {

        console.log('here')
        console.log(fieldName)

        if (fieldName === 'Industry') {
            for (let i = 0; i < this.rows.length; i++){
                if (this.rows[i].Id === parseInt(index)) {
                    this.rows[i]['Industry'] = data
                }
            }  
        }

        console.log(JSON.stringify(this.rows))

        if (fieldName === 'Phones') {
            for (let i = 0; i < this.rows.length; i++){
                if (this.rows[i].Id === parseInt(index)) {
                    this.rows[i]['Phones'] = data
                }
            }  
        }        
    }

    setPhoneOptions(fieldName, accountName, index) {
        let options = []

        getAccountPhoneByName({accountName : accountName})
        .then(data =>{  
            for (let i = 0; i < data.length; i++) {
                options.push({value : data[i].Phone, label : data[i].Phone})
            } 
            this.buildObjectByController(fieldName, options, index)            
        }).catch(error => {
            console.error(error)
        })
    }

    setNumberOfRows(event) {
        this.numberOfRows = parseInt(event.target.value)         
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
    
    get isNotMultipleRows() {
        return this.numberOfRows < 2 || this.numberOfRows == null
    }
}