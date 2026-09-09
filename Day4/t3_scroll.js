const scrollContainer=document.getElementById("scrollContainer")
const scrollContainerParent=document.getElementById("scrollContainerParent")
// Part 1: Visible Index & Layout Calculations
// Input

let array=[]
for(let i=0;i<100;i++){
    const dummyObject={"id":i,"text":`text${i}`}
    array.push(dummyObject)
}

const itemHeight=50
const buffer_size=5
let scrollTop=0
// let clientHeight=200 // defined in css, how is the size of the container going to change,  crollContainerParent's HEIGHT

//Process
let once=1
let phantomHeight=itemHeight*array.length
scrollContainer.style.height=`${phantomHeight}px`
let isTicking=false
function renderVirtualList(){
    
        const clientHeight=scrollContainerParent.clientHeight
        console.log("------------");
        const startIndex=Math.max(0,(Math.floor(scrollContainerParent.scrollTop/itemHeight)-buffer_size))
        const stopIndex=Math.min(Math.floor(((scrollContainerParent.scrollTop+clientHeight)/itemHeight)+buffer_size),array.length)
        const visibleData=array.slice(startIndex,stopIndex+1)
        const offsetY=startIndex*itemHeight
    
        scrollContainer.innerHTML=""
        // console.log(scrollContainer.innerHTML);
        
    
        const documentFragment = document.createElement("div")
        for(let data of visibleData){
            const div=document.createElement("div")
            div.innerHTML=`${data.text}`
            div.setAttribute("class","item")
            documentFragment.append(div)
            
        }
        scrollContainer.append(documentFragment)
        documentFragment.style.transform=`translateY(${offsetY}px)`
    
}

scrollContainerParent.addEventListener('scroll',()=>{
    if(isTicking) return
    renderVirtualList()
    isTicking=true
    requestAnimationFrame(()=>{
        renderVirtualList()
        isTicking=false
    })
})

renderVirtualList()