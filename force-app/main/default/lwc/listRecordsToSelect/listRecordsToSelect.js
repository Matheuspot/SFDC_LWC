import { LightningElement, wire, track} from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
import getSelectedRows from '@salesforce/apex/AccountController.setSelectedRows';

const columns = [
                    { label: 'Account Name', fieldName: 'Name', type: 'text', sortable: true},
                    { label: 'Account Type', fieldName: 'Type', type: 'text', sortable: true}
                ]
export default class ListRecordsToSelect extends LightningElement {

@track columns = columns

@track page             = null 
@track accountId        = []
@track perPage          = null
@track accountsData         = []
@track auxArray         = []  
@track totalPage        = null
@track selectedRows     = []
@track rowsToDisplay    = []
@track paginatedItems   = []
@track allRowsToDisplay = []

    @wire (getAccountList) 
    accounts ({data, error}) {
        if (data) {
            this.accountsData = data      
            this.definePagination = data                                 
        }
        if (error) {
            this.error = error
            console.error(error)
        }
    }

    set definePagination(value) { 
        this.page = 0    
        this.perPage = 10
        this.totalPage = Math.ceil(value.length / this.perPage)           
        this.update()        
    }
    
    set paginate(value) {
        this.paginatedItems = value
    }

    get isFirstPage() {
        return this.page == 0
    }
    
    get isLastPage() {
        return this.page == this.totalPage - 1
    }

    setSelectedRows() {           
        getSelectedRows({selectedRowsId : this.auxArray})
            .then(result => {
                this.allRowsToDisplay = result                     
                console.log('result: ' + result)      
            }).catch (error => {
                this.error = error
            })
    }

    getSelectedRows(event) {
        this.selectedRows = event.detail.selectedRows;         
        this.checkSelectedRow()        
    }

    checkSelectedRow() {        
        
        console.log('Linhas selecionadas: ' + JSON.stringify(this.selectedRows))
        /*this.selectedRows.forEach(item => {                                  
            this.auxArray.push(item.Id)       
        }) */
        
        let deselectedRecs = this.auxArray.
        concat(this.selectedRows.filter(item => {
            if(!this.auxArray.includes(item.Id)){
                return item.Id
            }
            return item.Id
        }));
        
        //filter(item => { 
        //    return !this.selectedRows.includes(item.Id)
        //    console.log('item: ' + item)       
       // })
            
            //.concat(this.selectedRows.filter(item => !this.auxArray.includes(item.Id)));

        console.log('deselected: ' + JSON.stringify(deselectedRecs))
    }

    next() {  
        let hasNextPage = this.page < this.totalPage - 1
        if (hasNextPage) this.page++   
        
        this.setSelectedRows() 
        this.update()           
    }

    prev() {
        let hasPrevPage = this.page > 0
        if (hasPrevPage) this.page--

        this.setSelectedRows() 
        this.update()                 
    }

    update() {        
        let page    = this.page
        let start   = page  * this.perPage
        let end     = start + this.perPage   

        this.paginate = this.accountsData.slice(start, end)                              
    }   
}