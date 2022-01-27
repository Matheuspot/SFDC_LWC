import { LightningElement, wire, track} from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import getSelectedRows from '@salesforce/apex/AccountController.setSelectedRows';

const columns =  [
                    { label: 'Account Name', fieldName: 'Name', type: 'text', sortable: true},
                    { label: 'Account Type', fieldName: 'Type', type: 'text', sortable: true}
                ]
export default class ListRecordsToSelect extends LightningElement {

@track page             = null
@track perPage          = null
@track auxArray         = [] 
@track totalPage        = null
@track lsAccounts       = []
@track selectedRows     = []
@track columns          = columns
@track rowsToDisplay    = []
@track paginatedItems   = []
@track allRowsToDisplay = []

    @wire (getAccountList) 
    accounts ({data, error}) {
        if (data) {
            this.lsAccounts = data      
            this.definePagination = data                            
        }
        if (error) {
            this.error = error
            console.error(error)
        }
    }

    set definePagination(value) { 
        this.page = 0    
        this.perPage = 5
        this.totalPage = Math.ceil(value.length / this.perPage)   
        this.update()        
    }
    
    set updateArray(value) {
        this.paginatedItems = value
    }

    set selectedRowToDisplay(value) {
        this.rowsToDisplay = value
    }

    get isFirstPage() {
        return this.page == 0
    }
    get isLastPage() {
        return this.page == this.totalPage - 1
    }

    getSelectedRows() {
        this.selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows(); 
        this.filterSelectedRows()       
    }

    filterSelectedRows() {    
        let filteredArray = []   
        let auxArrayRows = [] 
        let auxArray = []
        
        filteredArray = this.selectedRows
            .filter(item => !this.allRowsToDisplay.includes(item.Id))
            .map(item => item.Id)         

        console.log('Filtered array: ' + JSON.stringify(filteredArray))    
        //this.allRowsToDisplay = [...this.allRowsToDisplay, filteredArray]

        auxArray = this.allRowsToDisplay
                 .filter(x => !filteredArray.includes(x.Id))
                 .concat(filteredArray.filter(x => !this.allRowsToDisplay.includes(x.Id)));

        //console.log('Array: ' + auxArray)

       // auxArrayRows = [...this.allRowsToDisplay] 
       this.allRowsToDisplay = [...this.allRowsToDisplay, filteredArray]

        //this.allRowsToDisplay = [...filteredArray] - failed
        //  this.allRowsToDisplay = [...this.allRowsToDisplay, filteredArray] -failed 
        //this.allRowsToDisplay.push(filteredArray) - failed

       // console.log('SELECTED rows to display: ' + JSON.stringify(this.selectedRows))
        console.log('rows to display: ' + this.allRowsToDisplay)
    }

    setSelectRows() {
        if (this.allRowsToDisplay > 0) this.selectedRowToDisplay = this.allRowsToDisplay 
    }

    next() {  
        let hasNextPage = this.page < this.totalPage - 1
        if (hasNextPage) this.page++         
         
        this.update()    
        this.setSelectRows()
        console.log('next: ' + this.allRowsToDisplay)        
    }

    prev() {
        let hasPrevPage = this.page > 0
        if (hasPrevPage) this.page--

        this.update()    
        this.setSelectRows()        
        console.log('prev: ' + this.allRowsToDisplay)      
    }

    update() {        
        let page    = this.page
        let start   = page  * this.perPage
        let end     = start + this.perPage   

        this.updateArray = this.lsAccounts.slice(start, end)                              
    }   
}