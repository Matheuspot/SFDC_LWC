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

    /*setSelectedRows() {                
        getSelectedRows({selectedRowsId : this.allRowsToDisplay})
            .then(result => {
                this.selectedRowToDisplay = result              
            })
            .catch (error => {
                this.error = error
            })
    }*/

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
        
        filteredArray = this.selectedRows
            .filter(item => !this.allRowsToDisplay.includes(item.Id))
            .map(item => item.Id)               
          
             

        console.log('Filtered array: ' + JSON.stringify(filteredArray))

       //this.setSelectedRows(filteredArray) 
       //this.rowsToDisplay = [...this.rowsToDisplay, filteredArray]
       this.allRowsToDisplay = [...this.allRowsToDisplay, filteredArray]
      // this.selectedRowToDisplay = filteredArray   
        console.log('rows to display: ' + this.allRowsToDisplay)
    }

    next() {  
        let hasNextPage = this.page < this.totalPage - 1
        if (hasNextPage) this.page++   
        
        //this.setSelectedRows() 
        this.selectedRowToDisplay = this.allRowsToDisplay   
        this.update()    
        console.log('next: ' + this.allRowsToDisplay)        
    }

    prev() {
        let hasPrevPage = this.page > 0
        if (hasPrevPage) this.page--

        //this.setSelectedRows()   
        this.selectedRowToDisplay = this.allRowsToDisplay       
        this.update()           
        console.log('prev: ' + this.allRowsToDisplay)      
    }

    update() {        
        let page    = this.page
        let start   = page  * this.perPage
        let end     = start + this.perPage   

        this.updateArray = this.lsAccounts.slice(start, end)                              
    }   
}