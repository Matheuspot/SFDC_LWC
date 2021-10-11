import { LightningElement, api, wire, track } from 'lwc';
import getRelatedFilesByRecordId from '@salesforce/apex/filePreviewAndDownloadController.getRelatedFilesByRecordId';
import { NavigationMixin} from 'lightning/navigation'

export default class FilePreviewAndDownloads extends NavigationMixin(LightningElement) {
    @api recordId
    filesList = []

    @wire(getRelatedFilesByRecordId, {recordId : '$recordId'}) 
    wiredResult ({data, error}){
        if (data) {
            console.log(data)
            this.filesList = Object.keys(data).map(item => ({
                "label" : data[item], 
                "value" : item,
                "url"   : `/sfc/servlet.shepherd/document/download/${item}`
            }))        
        }
        if (error) {
            console.log(error)
        }
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