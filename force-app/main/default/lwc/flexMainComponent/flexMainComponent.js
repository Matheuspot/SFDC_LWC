import { LightningElement, track } from 'lwc';
import getRegisteredPricesForIBM from '@salesforce/apex/FlexController.getRegisteredPricesForIBM'
import saveFlex from '@salesforce/apex/FlexController.saveFlex';

const OBJECT_ROW = {'Id' : '', 'ibmCode' : '', 'basesCode' : [], 'baseCode' : '', 'productCodes' : [], 'productCode' : '', 'productPrices' : [], 'productPrice' : 0.0}

export default class FlexMainComponent extends LightningElement {

numberOfRows = 1
currentIndex
initialNumberOfRows = 1
objectRow = OBJECT_ROW

@track mainData = []
@track rows = []
@track ibmBases = []

    connectedCallback() {
        this.buildNewRow()
    }
    
    searchForIBMs(event) {     

        let fieldName = event.target.name
        this.currentIndex = event.target.dataset.index   

        this.buildObjectOnChange(event)        
        this.getRegisteredPricesForIBM(fieldName)    
    }

    addRow() {
        const currentNumberOfRows = this.numberOfRows        
        if (currentNumberOfRows == 1) {
            this.buildNewRow()
        }
        if (currentNumberOfRows > 1) {
            for (let i = 0; i < currentNumberOfRows; i++) {
                this.buildNewRow()
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
        this.buildNewRow()
    }

    buildNewRow() {        
        let index = this.getCurrentIndex()
        let newRow = {...this.objectRow}

        newRow.Id = index,
        newRow.ibmCode = '',
        newRow.baseCode = '',
        newRow.productCode = '',
        newRow.productPrice = ''

        this.rows.push(newRow)          
    }

    saveFlex() {
        saveFlex({flexRows : this.rows}).then(data =>{
            console.log('success')
        }).catch(error => {
            console.log(error)
        })
    }

    selectCheckbox(event) {
        console.log(event.target.checked)
        //let isSelected = event.target.checked
      //  let index = event.dataset.index        
       
    }

    selectAllCheckboxes(event) {
        console.log(event.target.checked)
    }

    buildObjectOnChange(event) {
        let fieldName = event.target.name
        let fieldValue = event.target.value
        let currentIndex = event.target.dataset.index

        for (let i = 0; i < this.rows.length; i++){
            if (this.rows[i].Id === parseInt(currentIndex)) {
                this.rows[i][fieldName] = fieldValue
            }
        }        
    }

    buildObjectByController(data, type) {  
       
        for (let i = 0; i < this.rows.length; i++){
            if (this.rows[i].Id === parseInt(this.currentIndex)) {
                this.rows[i][type] = data
            }
        }           
    }

    setNumberOfRows(event) {
        this.numberOfRows = parseInt(event.target.value)   
        this.initialNumberOfRows = this.numberOfRows
    }

    getRegisteredPricesForIBM(fieldName) {     
        getRegisteredPricesForIBM({filters : this.getCurrentRow()})
        .then(data =>{  
            this.mainData = data   
            console.log('main data: ', JSON.stringify(this.mainData))
            this.getListOfBasesForIBM(fieldName)                                  
        }).catch(error => {
            console.error(error)
        })       
    }

    getListOfBasesForIBM(fieldName) {    
        
        if (fieldName === 'ibmCode') {
            let ibmBase = this.mainData.map(item => {return { value : item.Base__c, label: item.Base__c }}) 
            this.buildObjectByController(ibmBase, 'basesCode')  
        }  

        if (fieldName === 'baseCode') {
            let ibmBase = this.mainData.map(item => {return { value : item.Product__c, label: item.Product__c }}) 
            this.buildObjectByController(ibmBase, 'productCodes')  
        }  
        if (fieldName === 'productCode') {
            let ibmBase = this.mainData.map(item => {return { value : item.Price__c, label: item.Price__c }}) 
            this.buildObjectByController(ibmBase, 'productPrice')  
        }               
    }

    getCurrentRow() {
        let currentRow = []

        for (let i = 0; i < this.rows.length; i++){
            if (this.rows[i].Id === parseInt(this.currentIndex)) {
                currentRow = this.rows[i]
            }
        }

        console.log('current ', JSON.stringify(currentRow))

        return currentRow
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