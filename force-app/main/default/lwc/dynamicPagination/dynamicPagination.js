import { LightningElement, track, wire } from 'lwc';

export default class DynamicPagination extends LightningElement {   
    data = Array.from({length: 100}).map((_, item) => `<p>This sample ${item + 1} is populated by this field:</p> {0}.`) 
    formatedData   
    auxRaw = this.data.map((item, index)=> {
        this.formatedData = item.replace('{0}', '<lightning-input type="String" name="Field 1" label="Field 1" ></lightning-input>')       
    })
   
    
    //data = Array.from({length: 100}).map((_, item) => `This sample is populate by this field: {}. Thank you! ${item + 1}`)  
    paginatedItems = 0
    @track perPage = 1      
    @track state = { page: 1, numberOfButtons: 5} 
    totalPage = Math.ceil(this.data.length / this.perPage)
    
    getTemplateTags(element) {
        return this.template.querySelector(element)
    }   

    get isFirstPage() {
        return this.state.page == 1
    }

    get isLastPage() {
        return this.state.page == this.totalPage
    }

    controller = {
        next() {
            const hasNextPage = this.state.page < this.totalPage
            if (hasNextPage) this.state.page++
            console.log(this.state.page)   
            this.update()         
        }, 
        prev() {
            const hasPrevPage = this.state.page > 1
            if (hasPrevPage) this.state.page--
            console.log(this.state.page)
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
            console.log(page)
            console.log(this.state.page)
            this.update()
        }
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
   
    update() {        
        let page    = this.state.page - 1
        let start   = page  * this.perPage
        let end     = start + this.perPage
        console.log(this.formatedData)
       
        this.paginatedItems = this.data.slice(start, end)         
    }   
    
    connectedCallback() {               
        this.update()
    }
    renderedCallback() {  
        //const tst = this.template.querySelector('.controls')      
        //console.log(tst)
    }

    
}