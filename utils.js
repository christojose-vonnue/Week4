
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
  partial
};

