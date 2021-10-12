import { LightningElement, api, wire, track } from 'lwc';
import getRelatedFilesByRecordId from '@salesforce/apex/filePreviewAndDownloadController.getRelatedFilesByRecordId';
import { NavigationMixin} from 'lightning/navigation'

export default class FilePreviewAndDownloads extends NavigationMixin(LightningElement) {
    @api recordId
    filesList = []

    @wire(getRelatedFilesByRecordId, {recordId : '$recordId'}) 
    wiredResult ({data, error}){
        if (data) {           
            let payload = JSON.parse(data)   
            this.filesList = Object.values(payload).map(item => ({
                "Title"         : item.Title,
                "DocId"         : item.ContentDocumentId,
                "CreatedBy"     : item.CreatedBy.Name,
                "CreatedDate"   : this.formatDate(item),
                "url"           : `/sfc/servlet.shepherd/document/download/${item.ContentDocumentId}`              
            }))
        }
        if (error) {
            console.log(error)
        }
    }

    formatDate(item) {
        let dateRaw = item.CreatedDate
        let day     = dateRaw.substring(8,10)
        let month   = dateRaw.substring(5,7)
        let year    = dateRaw.substring(0,4)
        let time    = dateRaw.substring(11,19)
        return day + '/' + month + '/' + year + ' ' + time
    }

    downloadHandler(event) {        
        let clickedLink = event.target.value        
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: this.filesList[clickedLink].url
            }
        })
    }

    previewHandler(event){
        console.log(event.target.dataset.id)
        this[NavigationMixin.Navigate]({ 
            type:'standard__namedPage',
            attributes:{ 
                pageName:'filePreview'
            },
            state:{ 
                selectedRecordId: event.target.dataset.id
            }
        })
    }

    get isUploaded() {
        return this.filesList.length >= 1
    }  
}




