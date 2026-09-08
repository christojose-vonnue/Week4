export class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

export async function fetchjson(url) {
    const res=await fetch(url)
    if(!res.ok){
        throw new HttpError("HTTP Error",res.status)
    }
    return await res.json()
}

export function debounce(fn, delay){
  let timerid=null
  return function (...args){
    clearTimeout(timerid)
    timerid=setTimeout(()=>fn(...args),delay)
  }
}

export function memoize(fn){
  const cache=new Map()
  return (...args)=>{
    const key=JSON.stringify(args)
    
    if(cache.has(key)){
      console.log(key);
      return cache.get(key)
    }
    else{
      const result=fn(...args)
      cache.set(key,result)
      return result
    }
  }
}

export async function fetchWithTimeout(url,ms){
  const controller=new AbortController()
  const timerid=setTimeout(()=>controller.abort(),ms)
  try{
    const res=await fetch(url,{signal:controller.signal})
    // return  res
  }
  finally{
    clearTimeout(timerid)
  }
}

// module.exports={
//   HttpError,
//   fetchjson,
//   debounce,
//   memoize,
//   fetchWithTimeout
// }