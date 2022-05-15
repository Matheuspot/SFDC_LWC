import { LightningElement, track } from 'lwc';
import getRegisteredPricesForIBM from '@salesforce/apex/FlexController.getRegisteredPricesForIBM'

const OBJECT_ROW = {'Id' : '', 'ibmCode' : '', 'basesCode' : [], 'baseCode' : '', 'productCodes' : [], 'productCode' : '', 'productPrices' : [], 'productPrice' : ''}

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
       
        let index = event.target.dataset.index
        let fieldName = event.target.name
        let fieldValue = event.target.value        

        this.currentIndex = index      
        this.getRegisteredPricesForIBM()    
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
        newRow.IBM = '',
        newRow.Base = '',
        newRow.Product = '',
        newRow.Price = ''

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

    buildObjectOnChange(event) {
        let fieldName = event.target.name
        let fieldValue = event.target.value
        let currentIndex = event.target.dataset.index

        for (let i = 0; i < this.rows.length; i++){
            if (this.rows[i].Id === parseInt(currentIndex)) {
                this.rows[i][fieldName] = fieldValue
            }
        }       
        console.log('JSON: ', JSON.stringify(this.rows)) 
    }

    setNumberOfRows(event) {
        this.numberOfRows = parseInt(event.target.value)   
        this.initialNumberOfRows = this.numberOfRows
    }

    getRegisteredPricesForIBM() {      
        getRegisteredPricesForIBM({ibmCodes : this.rows})
        .then(data =>{  
            this.mainData = data     
            console.log('MAIN DATA: ', this.mainData)                          
        }).catch(error => {
            console.error(error)
        })       
    }

    getListOfBasesForIBM(ibmCode) {  
       
        let ibmBase = {'IBM' : '', 'Base' : ''}           
        //let basesByIBM = [ {value : 'BIP-SP', label : 'BIP-SP'}, {value : 'BIP-RJ', label : 'BIP-RJ'}]

     

   
      /*  for (let i = 0; i < this.mainData.length; i++) {
            if (item.IBM__c === ibmCode) {
                ibmBase['IBM'] = item.IBM__c
                ibmBase['Base'] = item.Base__c                             
            }    
        }    
      */
        this.buildObjectByController(basesByIBM)         
    }

    buildObjectByController(data) {  
       
        for (let i = 0; i < this.rows.length; i++){
                if (this.rows[i].Id === parseInt(this.currentIndex)) {
                    this.rows[i]['Bases'] = data
                }
        }     
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