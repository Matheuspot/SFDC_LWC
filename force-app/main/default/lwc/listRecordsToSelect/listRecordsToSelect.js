import { LightningElement, wire, track} from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import getSelectedRows from '@salesforce/apex/AccountController.setSelectedRows';

const columns = [
                    { label: 'Account Name', fieldName: 'Name', type: 'text', sortable: true},
                    { label: 'Account Type', fieldName: 'Type', type: 'text', sortable: true}
                ];
export default class ListRecordsToSelect extends LightningElement {

@track columns = columns 

@track rowsToDisplay = []
@track allSelectedRows = []
@track selectedRows = []
@track currentSelectedRows = []
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
        this.setSelectedRow()       
    }

    setSelectedRow() {    

        let aux = []
        aux = this.selectedRows
            .filter(element => !this.currentSelectedRows.includes(element.Id))
            .map(element => element.Id)
        
       console.log('aux: ' + aux)
       
       
        this.currentSelectedRows.push(aux)

        console.log('current: ' + this.currentSelectedRows)

            for(let row of this.lsAccounts){
                if(!this.allSelectedRows.includes(row) && this.selectedRows.includes(row)){
                    this.allSelectedRows.push(row)
                }
              
                
                if(this.allSelectedRows.includes(row) && !this.selectedRows.includes(row)){
                    let index = this.allSelectedRows.indexOf(row)
                    this.allSelectedRows.splice(index, 1)
                }
                
            }
        
        
        
    }

    next() {  
        let hasNextPage = this.page < this.totalPage - 1
        if (hasNextPage) this.page++   
        
        //this.setSelectedRows() 
        this.selectedRowToDisplay = this.allSelectedRows 
          
        this.update()    
        //console.log('next: ' + JSON.stringify(this.allSelectedRows))        
    }

    prev() {
        let hasPrevPage = this.page > 0
        if (hasPrevPage) this.page--

        //this.setSelectedRows()   
        this.selectedRowToDisplay = this.allSelectedRows       
        this.update()           
       // console.log('prev: ' + JSON.stringify(this.allSelectedRows))      
    }

    update() {        
        let page    = this.page
        let start   = page  * this.perPage
        let end     = start + this.perPage   

        this.updateArray = this.lsAccounts.slice(start, end)                              
    }   
}