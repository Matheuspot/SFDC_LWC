import { LightningElement } from 'lwc';

export default class HelloConditionalRendering extends LightningElement {
    isVisible = false
    name

    handleClick() {
        this.isVisible = true
    }

    changeHandler(event) {
        this.name = event.target.value
    }

    get helloMethod() {
        return this.name === 'Hello'
    }
}

// falsy valeus in JS
// x = 0, false, undefined, null, ''