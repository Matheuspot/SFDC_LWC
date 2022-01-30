import { LightningElement, wire, track} from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

const columns = [
                    { label: 'Account Name', fieldName: 'Name', type: 'text', sortable: true},
                    { label: 'Account Type', fieldName: 'Type', type: 'text', sortable: true}
                ]
export default class ListRecordsToSelect extends LightningElement {

@track allSelectedRows = []
@track rowsToDisplay   = []
@track selectedRows    = []
@track paginatedItems  = []
@track lsAccounts      = []
@track totalPage       = null
@track columns         = columns 
@track perPage         = null
@track page            = null

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

    getSelectedRows(event) {
        //this.selectedRows = [...this.template.querySelector('lightning-datatable').getSelectedRows()]; 
        this.selectedRows = [...event.detail.selectedRows]; 
        console.log('Current selected row: ' + JSON.stringify(this.selectedRows))           
     
    }
    
    setSelectedRows() {    
        for(let row of this.paginatedItems){
            if(!this.allSelectedRows.includes(row) && this.selectedRows.includes(row)){
                this.allSelectedRows.push(row)
            }           
            if(this.allSelectedRows.includes(row) && !this.selectedRows.includes(row)){
                let index = this.allSelectedRows.indexOf(row)
                this.allSelectedRows.splice(index, 1)
            }            
        }    
        
        console.log('Selected rows: ' + JSON.stringify(this.selectedRows))
        console.log('All Selected rows: ' + JSON.stringify(this.allSelectedRows))
    }

    buildArrayWithIdsOnly() {        
        return this.allSelectedRows.map(item => item.Id)          
    }

    next() {  
        let hasNextPage = this.page < this.totalPage - 1
        if (hasNextPage) this.page++   
        
        this.setSelectedRows()        
        this.selectedRowToDisplay = this.buildArrayWithIdsOnly()

        this.update()                  
    }

    prev() {
        let hasPrevPage = this.page > 0
        if (hasPrevPage) this.page--

        this.setSelectedRows()
        this.selectedRowToDisplay = this.buildArrayWithIdsOnly() 

        this.update()    
    }

    update() {        
        let page    = this.page
        let start   = page  * this.perPage
        let end     = start + this.perPage   

        this.updateArray = this.lsAccounts.slice(start, end)                              
    }      
}