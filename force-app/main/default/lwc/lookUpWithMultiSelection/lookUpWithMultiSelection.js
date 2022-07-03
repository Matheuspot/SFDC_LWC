import { LightningElement } from 'lwc';

const CLOSED_COMBOBOX = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click'
const OPEN_COMBOBOX = CLOSED_COMBOBOX + ' slds-is-open'
const CLOSED_INPUT = 'slds-input slds-combobox__input'
const OPEN_INPUT = CLOSED_INPUT + ' slds-has-focus'
export default class LookUpWithMultiSelection extends LightningElement {

  comboboxState = CLOSED_COMBOBOX
  inputState = CLOSED_INPUT

  isInputOut = true
  isMouseOut = true

  set comboActualState (value) {
    this.comboboxState = value
  }

  get comboActualState() {
    return this.comboboxState
  }

  onFocusIn() { 
    this.isInputOut = false
    this.openCombobox() 
  }

  onFocusOut() {
    this.isInputOut = true
    this.openCombobox()   
  }

  onMouseOver() {
    this.isMouseOut = false
    this.openCombobox() 
  }

  onMouseLeave() {
    this.isMouseOut = true
    this.openCombobox()
  }

  openCombobox() {
    if ( this.isInputOut && this.isMouseOut ) {
      this.displayCombobox(false)   
    }
    else {
      this.displayCombobox(true)   
    }
  }

  displayCombobox(value) {
    if (value) {
      this.comboActualState = OPEN_COMBOBOX
      this.inputState = OPEN_INPUT      
    } else {
      this.comboActualState = CLOSED_COMBOBOX
      this.inputState = CLOSED_INPUT
    }
  }
}