export function formatDate(date,format){
    if(!(date instanceof Date) || isNaN(date.getTime())){
        return "Invalid Date"
    }
    
    const [month,day,year ]=[(date.getMonth()+1).toString().padStart(2,'0'),date.getDate().toString().padStart(2,'0'),date.getFullYear()]
    let Datenow=Date.now()
    let Datepast=Date.UTC(year,month-1,day)
    let elapsedDays=Datenow-Datepast
    console.log(Datenow,Datepast,elapsedDays);

    switch(format){
        case 'DD/MM/YYYY':
            return `${day}/${month}/${year}`
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`  
        case 'Month DD, YYYY':
            return `${date.toLocaleString('default',{month:'long'})} ${day}, ${year}`
    }
    if(format.includes("relative")){
        let days=Math.floor(elapsedDays / (1000* 60 * 60 *24))
        if(days>0){
            return `${days} Days ago`
        }
        else if(days==0){
            return `Today`
        }
        else{
           return `In ${-1*days} Days`
        }
    }

    return "Wrong Format"
}

// Pass in this format year,month (from 0)  and date (from 1)
// const birthday2 = new Date(2026, 8, 10);
// console.log(birthday2.toLocaleString('default',{month:'long'}))
// console.log(formatDate(birthday2,'Month DD, YYYY')) 