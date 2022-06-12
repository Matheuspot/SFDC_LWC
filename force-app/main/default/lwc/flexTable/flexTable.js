import { LightningElement, track } from 'lwc';
import getRegisteredPricesForIBMs from '@salesforce/apex/NewFlexController.getRegisteredPricesForIBMs'
import saveFlexItems from '@salesforce/apex/NewFlexController.saveFlexItems'

const actions = [    
    { label: 'Excluir', name: 'delete' }
];

const columns = [
    { label: 'IBM', fieldName: 'ibmCode', displayReadOnlyIcon: true},
    { label: 'Base', fieldName: 'base', displayReadOnlyIcon: true, initialWidth: 70},
    { label: 'Produto', fieldName: 'product', displayReadOnlyIcon: true},
    { label: 'Preço', fieldName: 'productNewPrice', editable: true, type: 'currency', typeAttributes : { currencyCode: 'BRL', step : '0.0001'}, initialWidth: 80},
    { label: 'Preço atual', fieldName: 'productCurrentPrice', displayReadOnlyIcon: true, type: 'currency', typeAttributes : { currencyCode: 'BRL', step : '0.0001'}, initialWidth: 110 },
    { label: 'Pagamento', fieldName: 'paymentCondition', editable: true, displayReadOnlyIcon: true, type: 'text' },
    { label: 'Transporte', fieldName: 'shippingCondition', editable: true, type: 'text', initialWidth: 110 },
    { label: 'Frete', fieldName: 'freightCost', type: 'currency', displayReadOnlyIcon: true, typeAttributes : { currencyCode: 'BRL', step : '0.0001'}, initialWidth: 80},
    { label: 'Arbt. Pond', fieldName: 'arbitragemPonderada', displayReadOnlyIcon: true, type: 'currency', initialWidth: 110 },
    { label: 'FAQ ICMS', fieldName: 'faqTotaICMs', displayReadOnlyIcon: true, type: 'currency', initialWidth: 105},
    { label: 'FAQ Total', fieldName: 'faqImpostoTotal', displayReadOnlyIcon: true, type: 'currency', initialWidth: 105 },
    { label: 'M3', fieldName: 'marginM3', displayReadOnlyIcon: true, type: 'currency', typeAttributes : { currencyCode: 'BRL', step : '0.0001'}, initialWidth: 80},
    { label: 'M3G', fieldName: 'marginM3G', displayReadOnlyIcon: true, type: 'currency', typeAttributes : { currencyCode: 'BRL', step : '0.0001'}, initialWidth: 80},
    { label: 'Data limite desconto', fieldName: 'limitDiscountDate', editable: true, type: 'date' },
    { label: 'Desc. temporário', fieldName: 'temporaryDiscount', editable: true, type: 'currency', typeAttributes : { currencyCode: 'BRL', step : '0.0001'}}
    //{ type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'left' } }
];

export default class FlexTable extends LightningElement {

    columns = columns;
    @track data = [];
    draftValues    

    connectedCallback() {
        this.getRegisteredPricesForIBMs()
    }

    getRegisteredPricesForIBMs() {
        getRegisteredPricesForIBMs({ibmCodes : '12345'})
        .then(result =>{
            this.data = this.buildFlexColumns(result)                   
        }).catch(error => {
            console.log(error)
        })
    }

    buildFlexColumns(data) {

        return data.map((item, index) => ({
            "index" : 'row-' + index,
            "ibmCode" : item.IBM__c,
            "base" : item.Base__c,
            "product" : item.Product__c,
            "productNewPrice" : "",
            "productCurrentPrice" : item.Price__c,
            "paymentCondition" : "",
            "shippingCondition" : "",
            "freightCost" : "",
            "arbitragemPonderada" : "",
            "faqTotalICMs" : "",
            "faqImpostoTotal" : "",
            "marginM3" : "",
            "marginM3G" : "",
            "limitDiscountDate" : "",
            "temporaryDiscount" : ""
        }))
    }

    handleDraftValues(event) {        
        let draftRows = event.detail.draftValues
        let draftObjectKey 
        let draftObjectValue
        let draftObject
        let draftObjectIndex

        for (let i = 0; i < draftRows.length; i++ ) {

            draftObject = draftRows[i]
            draftObjectIndex = draftObject.id  
            

            Object.keys(draftObject).forEach(key => {             
                if (key != 'id') {     
                    draftObjectKey = key                        
                    draftObjectValue = draftObject[key]
                }
            }); 

            for (let i = 0; i < this.data.length; i++){
                if (this.data[i].index === draftObjectIndex) {
                    this.data[i][draftObjectKey] = draftObjectValue
                }
            } 
        }  
        
        console.log('draft', JSON.stringify(this.data))
    }

    handleSave() {   
        let arr = this.transformFlexColumns()
        saveFlexItems({flexRows : arr}).then(result => {
            console.log('All the flexes were successfully !')
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            this.draftValues = []
        });        
    }

    selectedRows(event) {
        let selectedRows = []
        selectedRows = event.detail.selectedRows
        console.log('Selected rows: ', JSON.stringify(selectedRows))
    }

    transformFlexColumns() {

        return this.data.map(item => ({
            "ibmCode" : item.ibmCode,
            "base" : item.base,
            "product" : item.product,
            "productNewPrice" : item.productNewPrice,
            "productCurrentPrice" : item.productCurrentPrice,
            "paymentCondition" : item.paymentCondition,
            "shippingCondition" : item.shippingCondition/*
            "freightCost" : item.freightCost === null ? '' : item.freightCost, 
            "arbitragemPonderada" : item.arbitragemPonderada === null ? '' : item.arbitragemPonderada,
            "faqTotalICMs" : item.faqTotalICMs === null ? '' : item.faqTotalICMs,
            "faqImpostoTotal" : item.faqImpostoTotal === null ? '' : item.faqImpostoTotal,
            "marginM3" : item.marginM3 === null ? '' : item.marginM3,
            "marginM3G" : item.marginM3G === null ? '' : item.marginM3G,
            "limitDiscountDate" : item.limitDiscountDate === null ? '' : item.limitDiscountDate,
            "temporaryDiscount" : item.temporaryDiscount === null ? '' : item.temporaryDiscount*/
        }))          
    }

    /*handleRowAction(event) {
            const action = event.detail.action;
            const row = event.detail.row;
            switch (action.name) {
                case 'delete':
                    const rows = this.data;
                    const rowIndex = rows.indexOf(row);
                    rows.splice(rowIndex, 1);
                    this.data = rows;
                    break;
        }
    }*/
    
}
