let initialState = { name: '', email: '' }
let listeners=[]

function subscribe(listnerfn){
    listeners.push(listnerfn)
}

function notifyObservers(){
    for(let listener of listeners){
        listener()
    }
}

// Create a proxy handler object defining three trap traps: get, set, and deleteProperty.

const handler={
    set(target,prop,value,receiver){
        if(target[prop]!==value){
            Reflect.set(target,prop,value,receiver)
            notifyObservers()
        }
        return true
    },
    get(target,prop,receiver){
        const data=Reflect.get(target, prop, receiver)
        return data
    },
    deleteProperty(target, prop){
        if(prop in target){
            const sucess=Reflect.deleteProperty(target, prop)
            if(sucess){
                notifyObservers()
            }
            return sucess
        }
        return true
    }
}

const state = new Proxy(initialState,handler)
console.log(state);

const nameInput=document.getElementById("nameInput")
nameInput.addEventListener('input', (e) => { state.name = e.target.value; })

const emailInput=document.getElementById("emailInput")
emailInput.addEventListener('input', (e) => { state.email = e.target.value; })

const previewDOM=document.getElementById("preview")

function renderPreview(){
    previewDOM.textContent=`Name ${state.name || 'N/A'} | Email: ${state.email || 'N/A'}`
}
subscribe(renderPreview)