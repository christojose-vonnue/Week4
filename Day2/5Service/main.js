if('serviceWorker' in navigator){
    // console.log(navigator);
    // console.log(navigator.serviceWorker);
    window.addEventListener("load",(e)=>{
        // console.log(e);
        const promise=navigator.serviceWorker.register("sw.js")
        console.log(promise);
        promise.then((reg)=>{
            console.log(reg);
            console.log('sw.js is registerd',reg.scope);
        }).catch((error)=>{
            console.log(error);
        })
    })
    
    console.log("main js offline loading....");
    
}