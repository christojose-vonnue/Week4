
function chunk(array,size){
    if(!array.length){
        throw new Error
    }
    let temp=[]
    let x=0
    while(x<array.length){
        let sliced=array.slice(x,x+size)
        temp.push(sliced)
        x+=size
    }
    console.log(temp);
    return temp
}

function zip(...arrays) {
  const maxLen = Math.max(...arrays.map(arr => arr.length), 0);
  return Array.from({ length: maxLen }, (_, i) => arrays.map(arr => arr[i]));
}

function groupBy(array, fnOrKey){
    
    let grouped= array.reduce((acc,item)=>{
        const key=typeof fnOrKey === 'function' ? fnOrKey(item) : item[fnOrKey]
        if(!acc[key]){
            acc[key]=[]
        }
        acc[key].push(item);
        return acc
    },{})
    return grouped
}

function pipe(start,...fns){
    let pipevalue=fns.reduce((result,fn)=>{
        result=fn(result)
        return result
    },start)
    return pipevalue
}

function compose(start,...fns){
    let composevalue=fns.reduceRight((result,fn)=>{
        result=fn(result)
        return result
    },start)
    return composevalue
}

function curry(fn) {
    // Step 1: Create a recursive wrapper function that accepts arguments
    return function curried(...args) {
        
        // Base Case: Do we have enough arguments to call fn?
        if (args.length >= fn.length) {
            return fn(...args); // Return the final result!
        } else {
            // Recursive Case: We don't have enough arguments yet!
            // Return a new function that collects the next arguments...
            return function(...nextArgs) {
                // Call curried again, merging old args + new args
                return curried(...args, ...nextArgs);
            };
        }
    };
}

function partial(fn, ...presetArgs) {
    // Step 1: Return an inner function that collects any later arguments
    return function(...laterArgs) {
        // Step 2: Call the original function passing presetArgs FIRST, then laterArgs
        return fn(...presetArgs, ...laterArgs);
    };
}

// Task 2 Utils.js


class EventEmitter{
    constructor(){
        this.events={}
    }
    on(event, listener){
        // as you said event is a label 
        // listners are simple functions
        // I would assume we need to add this as a key-value pair to events

        // Version 1 :  I was wrong, on means just add a listner to the functions, if not add new event
        // let temp
        // temp={event:listener}
        // Object.assign(this.events,temp)

        if(!(this.events[event])){
            this.events[event] = [];
        }
        // Improved , we pre-checked if event exist,  if not we create and push , if yes we push
        // for(let i of Object.keys(this.events)){
        //     if(event==i){
                this.events[event].push(listener)
                return
        //     }
        // }

    }

    off(event,listener){
        // I would assume we need to remove this event as we dont need it,
        // So check if the event exist in events directory and if yes remove if

        // Version 3
        if (!this.events[event]) return;
        const index=this.events[event].indexOf(listener)
        if(index!==-1){
            this.events[event].splice(index,1)
        }

        // Version 2, is correct, the above Version 3 it much simpler code
        // for(let i of Object.keys(this.events)){
        //     if(event==i){
        //         let curr_listners=this.events[event]
        //         for(i of curr_listners){
        //             if(i==listener){
        //                 const index = curr_listners.indexOf(listener)
        //                 this.events[event].splice(index,1)
        //                 return
        //             }
        //         }
        //     }
        // }
    }

    //emit(event, ...args): Calls all listeners registered under event (AND any wildcards registered under '*')
    // I think emit means to actually call all the listeners stored under an event..
    // args must be the callback functions inside them , also if args= "*".. call all the listeners

    emit(event, ...args){
        if(this.events[event]) {
            // VERSION 2 ... args are payload data, * is a wildcard function, a special event as i understand
            for(let i of this.events[event]){
                i(...args)
            }
        }
            // I believe that wildcard listners must always run , if they exist in the events
            if(this.events["*"]){
                this.events['*'].forEach(listener => listener(event, ...args));
            }

            //check if the event actually exist

        //check if * is in the array args, if yes, execute all listners VERSION 1
        // if(args.includes("*")){
        //     this.events[event].forEach(listener => {
        //         listener()
        //     });
        //     return
        // }
        // else{
        //     for (let i of args){
        //         if(this.events[event].includes(i)){
        //             i() // I asssume i are listeners.. listeners are functions and we are calling them..??
        //         }
                
        //     }
        // }

    }

    once(event,listener){ //once must automatically remove the listener after it fires
        // if(!(this.events[event])) return

        // if(this.events[event].includes(listener)){
        //     listener()
        // } // call the listner)
        // this.off(event,listener)

        // Version 2
        // Create a function object that calls the listener and removes it
        const functionobject=(...args)=>{
            listener(...args)
            this.off(event,functionobject) //self removal
        }
        
        // Step 2 add it to the emitter
        this.on(event,functionobject)
    }
}

 async function fetchdata(url) {               
        const response =await fetch(url)  // "https:/jsonplaceholder.typicode.com/posts"
        if(!(response.ok)){
            if(response.status==404){
                console.warn("wrong url")
                throw new Error("wrong url")
            }
            else if(response.status>=300){
                console.warn("Error 300+")
                throw new Error("check response status")
            }
        }
        return await response.json()
    }

async function fetchWithRetry(url,retires=1) {
    for(let i=0;i<2;i++){
        try{
            const res=await fetch(url)
            if(!res.ok){
                throw new Error('HTTP Error')
            }
            return await res.json()
        }catch(error){
            if(i==retires){
                throw new Error('HTTP Error')
            }
        }
    }
}

// I would like another blueprint, this time less abstract
chunk([1,2,3,1,2,3],2)
// let testarr=[1,23,4,5,6,7,8,9]
// chunk(testarr,3)

module.exports = {
  chunk,
  zip,
  groupBy,
  pipe,
  compose,
  curry,
  partial,
  //Task 2 is exported here
  EventEmitter,
  fetchdata,
  fetchWithRetry
};

