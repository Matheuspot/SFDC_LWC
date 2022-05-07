import { LightningElement, track } from 'lwc';
import getAccountIndustryByName from '@salesforce/apex/DynamicFieldsController.getAccountIndustryByName'
const OBJECT_ROW = {'Id' : '', 'Name' : '', 'Industry' : ''}

export default class DynamicRows extends LightningElement {

@track rows = []
@track rowModel = {}

type
numberOfRows = 0
objectRow = OBJECT_ROW

    connectedCallback() {
        this.buildRow()
    }
    
    searchForAccountIndustry(event) {
       
        let name = event.target.value
        let index = event.target.dataset.index
     
        getAccountIndustryByName({accountName : name})
        .then(result =>{
            this.buildObjectByController(result, index)                
        }).catch(error => {
            this.error = error
            console.log(this.error)
        })
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

    buildObjectByController(result, index) {
        for (let i = 0; i < this.rows.length; i++){
            if (this.rows[i].Id === parseInt(index)) {
                this.rows[i]['Industry'] = result
            }
        }    
        console.log(JSON.stringify(this.rows))
    }

    setNumberOfRows(event) {
        this.numberOfRows = parseInt(event.target.value)    
        console.log(this.numberOfRows)    
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