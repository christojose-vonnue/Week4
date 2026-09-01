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
    let  deferedprompt = null;
    console.log("main js offline loading....");
    const installbtn=document.getElementById("install-btn")
    window.addEventListener("beforeinstallprompt",(e)=>{
        console.log("fired.. beforeinstall prompt??");
        e.preventDefault()
        deferedprompt=e
        installbtn.hidden=false
        installbtn.style.color="red"
    })

    installbtn.addEventListener('click', () => {
        console.log(deferedprompt);
        
        if(!deferedprompt) return
        deferedprompt.prompt();

        deferedprompt.userChoice.then((choiceresult)=>{
            if(choiceresult.outcome=="accepted"){
                console.log('User accepted the PWA install prompt');
            }
            deferedprompt = null;
        })
        
    })
}