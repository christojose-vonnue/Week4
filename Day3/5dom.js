export class FormValidator{
    constructor(formElement){
        this.form=formElement
        this.emailInput=this.form.querySelector('#email')
        this.errorSpan=this.form.querySelector('#email-error')
    }
    validate(){
        const email=this.emailInput.value.trim()
        const isValid=email.includes('@') && email.includes('.')
        
        if(isValid){
            this.errorSpan.textContent=''
            return true
        }
        else{
            this.errorSpan.textContent='Please enter a valid email'
            return false
        }
    }
}
// document.getElementById("dfd").previo
export class Accordion{
    constructor(containerElement){
        this.container=containerElement
        this.button=containerElement.querySelector('.accordion-header')
        this.panel=containerElement.querySelector('.accordion-panel')
        this.init()
    }

    init(){
        this.button.addEventListener('click',()=>{this.toggle()})
    }
    toggle(){
        const isExpanded=this.button.getAttribute('aria-expanded')==='true'
        this.button.setAttribute('aria-expanded',!isExpanded)
        this.panel.toggleAttribute('hidden');
    }
}
// document.body.classList.
export class Hamburger{
    constructor(drawerContainer){
        this.drawerContainer=drawerContainer
        this.button=drawerContainer.previousElementSibling
        this.links=drawerContainer.querySelectorAll("a") //array
        this.firstFocusable=this.links[0]
        this.lastFocusable=this.links[this.links.length-1]
        this.handledown=this.handledown.bind(this)
        this.init()
    }

    init(){
        this.button.addEventListener('click',()=>{this.toggle()})
    }

    toggle(){
        const isExpanded=this.button.getAttribute('aria-expanded')==='true'
        this.button.setAttribute('aria-expanded',!isExpanded)
        if(!isExpanded){
            // If aria-expanded is true, add visible classlist
            this.drawerContainer.classList.remove("invisible")
            this.drawerContainer.classList.add("open")
            this.firstFocusable.focus()
            window.addEventListener('keydown',this.handledown)
        }
        else{
            this.drawerContainer.classList.remove("open")
            this.drawerContainer.classList.add("invisible")
            window.removeEventListener('keydown',this.handledown)
        }
    }
    handledown(e){
        // we set the expanded to true, mow implement focus trap , current istate is always !isExpanded
        if(e.key!="Tab") return;
        // This is tab+ shift !! genius
        if(e.shiftKey){
            if(document.activeElement==this.firstFocusable){
                e.preventDefault()
                this.lastFocusable.focus()
            }
        }else{
            //This is tab only 
            if(document.activeElement==this.lastFocusable){
                e.preventDefault()
                this.firstFocusable.focus()
            } 
        }
        
    }
}