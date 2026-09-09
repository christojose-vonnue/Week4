const registry= new Map()
let element= document.createElement('a')
registry.set(element,{metadata:"some heavy payload data"})
document.body.append(element)
element.remove()
element=null
console.log(registry);


let element1= document.createElement('a')
document.body.append(element1)
element1.remove()
element1=null

// Map holding DOM references prevents GC after nodes are
// removed , what are you meaning by garbage collection in this Context
// why is Mapped elements when removed in that snapshot
// what is strong and weak memory 

const weakRegistry= new WeakMap()
let element2= document.createElement('a')
weakRegistry.set(element2,{metadata:"some heavy payload"})
document.body.append(element2)
element2.remove()
element2=null

const privateData= new WeakMap()
class User{
    constructor(name,secretToken){
        this.name=name
        privateData.set(this,{secretToken})
    }
    getprivateData(){
        // console.log(privateData.get(this));
        return privateData.get(this)
    }
}

const userInstance=new User("lolipop","TOKEN_TOKYO")
console.log(userInstance);
console.log(userInstance.getprivateData());
console.log(Object.keys(userInstance));
