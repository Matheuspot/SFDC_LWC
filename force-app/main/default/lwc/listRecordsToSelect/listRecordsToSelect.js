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
        let auxArray = []
        auxArray.push('0015e000002qJ7ZAAU')
        if (data) {
            this.lsAccounts = data      
            this.definePagination = data  
            this.rowsToDisplay = auxArray
        }
        if (error) {
            this.error = error
            console.error(error)
        }
    }

    setSelectedRows(value) {                
        getSelectedRows({selectedRowsId : value})
            .then(result => {
                this.rowsToDisplay = result
                console.log('Imperativo: ' + result)
            })
            .catch (error => {
                this.error = error
            })
    }

    set definePagination(value) { 
        this.page = 0    
        this.perPage = 2
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

    getSelectedRows() {
        this.selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows(); 
        this.checkSelectedRow(this.selectedRows)          
    }

    checkSelectedRow(value) {        
        value.forEach(item => {           
            if (item.id != '' && !this.auxArray.includes(item.Id)) {
                this.auxArray.push(item.Id)
            }
        })



        this.setSelectedRows(this.auxArray)   
    }

    next() {  
        let hasNextPage = this.page < this.totalPage - 1
        if (hasNextPage) this.page++   
        
        this.getSelectedRows() 
        this.update()           
    }

    prev() {
        let hasPrevPage = this.page > 0
        if (hasPrevPage) this.page--

        this.getSelectedRows() 
        this.update()                 
    }

    update() {        
        let page    = this.page
        let start   = page  * this.perPage
        let end     = start + this.perPage   

        this.updateArray = this.lsAccounts.slice(start, end)                       
    }   
}