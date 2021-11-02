import { LightningElement, track, wire } from 'lwc';

export default class DynamicPagination extends LightningElement {   
    @track dataRaw = Array.from({length: 100}).map((_, item) => `${item + 1}. This sample is populated by this field {0} which is used to display dates 1 {1} {2}`) 
    @track data = this.convertToView(this.dataRaw)

    paginatedItems = 0
    @track perPage = 1 

    @track state = { page: 1, numberOfButtons: 5} 
    totalPage = Math.ceil(this.data.length / this.perPage)  

    controller = {
        next() {
            const hasNextPage = this.state.page < this.totalPage
            if (hasNextPage) this.state.page++
              
            this.update()         
        }, 
        prev() {
            const hasPrevPage = this.state.page > 1
            if (hasPrevPage) this.state.page--
          
            this.update()
        },
        goTo(event) {
            let page = 0
            page = event.target.value   

            const higherThanMaxPages    = page > this.totalPage
            const lowerThanMinPages     = page < 1
            const availablePage         = page >= 1 && page <= this.totalPage
    
            if (lowerThanMinPages)  this.state.page = 1
            if (availablePage)      this.state.page = +page
            if (higherThanMaxPages) this.state.page = this.totalPage  

            this.update()
        }
    }    
    update() {        
        let page    = this.state.page - 1
        let start   = page  * this.perPage
        let end     = start + this.perPage     
       
        this.paginatedItems = this.data.slice(start, end)              
    } 

    appendToDiv() {
        const container = this.template.querySelector('.test .clausula')
        console.log(this.data[1])
        container.setAttribute = this.data[1]
    }    

    convertToView(dataRaw) {
        let inputField = '<lightning-input type = "String" name = "Field {}" onchange = {changeClause}</lightning-input>'           
    
        let dataWithParagraph = []  
        for (let j = 0; j < dataRaw.length; j++) {
            dataWithParagraph.push('<p>' + dataRaw[j] + '</p>')
        }     

        let dataWithInputs = []  
        for (let x = 0; x < dataWithParagraph.length; x++) {
            dataWithInputs.push(dataWithParagraph[x].replace(/\{\d{1,2}\}/g, inputField))
        }

        let aux
        let final = []

        for (let z = 0; z < dataWithInputs.length; z++) {
        
            let totalMatches = dataWithInputs[z].match(/\{\}/g).length          
        
            for (let i = 0; i < totalMatches; i++) { 
                if (i == 0) {
                    aux = dataWithInputs[z].replace(/\{\}/, i)   
                } 
                else {
                    aux = aux.replace(/\{\}/, i)              
                }                
            }    
            final[z] = aux     
        }
        return final
    }

    changeClause() {
        console.log('to define')
    }

    get isFirstPage() {
        return this.state.page == 1
    }

    get isLastPage() {
        return this.state.page == this.totalPage
    }
    
    connectedCallback() {               
        this.update()
        
        
    }
    renderedCallback() {  
        
        
        //const tst = this.template.querySelector('.controls')      
        //console.log(tst)
    }
    /*
    button = {    
        create(number) {      
            const button = this.template.createElement('div')
            button.innerHTML = number
            console.log(button)    
                
    
            button.addEventListener('click', (event) =>{
                const page = event.target.innerText
                controller.goTo(page)
                update()
            })
    
            this.getTemplateTags('.test').appendChild(button)
        },
        update() {     
            this.getTemplateTags('.test').innerHTML = ""
            const { maxLeft, maxRight} = button.calculateMaxVisibility()    
            for (let page = maxLeft; page <= maxRight; page++) {
                button.create(page)
            }
        },
        calculateMaxVisibility() {
            const {numberOfButtons} = state
            let maxLeft     =   this.state.page - Math.floor(numberOfButtons / 2)
            let maxRight    =   this.state.page + Math.floor(numberOfButtons / 2)
    
            if (maxLeft < 1) {
                maxLeft  = 1    
                maxRight = numberOfButtons       
            }
    
            if (maxRight > this.state.totalPage) {
                maxLeft  = this.state.totalPage - (numberOfButtons - 1)
                maxRight = this.state.totalPage
    
                if (maxLeft < 1) maxLeft = 1
            }
            return { maxLeft, maxRight}
        }
    }*/     
}