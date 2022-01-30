import { LightningElement, wire, track} from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import getSelectedRows from '@salesforce/apex/AccountController.setSelectedRows';

export default class ListRecordsToSelect extends LightningElement {

@track columns = 
    [
        { label: 'Account Name', fieldName: 'Name', type: 'text', sortable: true},
        { label: 'Account Type', fieldName: 'Type', type: 'text', sortable: true}
    ];

@track rowsToDisplay = []
@track allRowsToDisplay = []
@track selectedRows = []
@track lsAccounts = []
@track error
@track paginatedItems = []
@track perPage
@track page
@track totalPage
@track auxArray = []  

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

    get isFirstPage() {
        return this.page == 0
    }
    get isLastPage() {
        return this.page == this.totalPage - 1
    }

    set selectedRowToDisplay(value) {
        this.rowsToDisplay = value
    }

    getSelectedRows() {
        this.selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows();       
        this.checkSelectedRow()       
    }

    checkSelectedRow() {    
        let filteredArray = []  
        let deselectedRows = []

        filteredArray = this.selectedRows
            .filter(item => !this.allRowsToDisplay.includes(item.Id))
            .map(item => item.Id)               
          
        this.allRowsToDisplay = this.allRowsToDisplay
            .filter(item =>!filteredArray.includes(item.Id))
            .concat(filteredArray.filter(item => !this.allRowsToDisplay.includes(item.Id)))  
    }

    next() {  
        let hasNextPage = this.page < this.totalPage - 1
        if (hasNextPage) this.page++   
      
        this.selectedRowToDisplay = this.allRowsToDisplay 
        this.update()                
    }

    prev() {
        let hasPrevPage = this.page > 0
        if (hasPrevPage) this.page--
      
        this.selectedRowToDisplay = this.allRowsToDisplay       
        this.update()                
    }

    update() {        
        let page    = this.page
        let start   = page  * this.perPage
        let end     = start + this.perPage   

        this.updateArray = this.lsAccounts.slice(start, end)                              
    }   
}