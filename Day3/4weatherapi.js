export async function getCoordinates(cityName) {
    const object=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`)
    const body=await object.json()
    // console.log(object)
    const [lat,lon,name]=[body.results[0].latitude,body.results[0].longitude,body.results[0].name]
    const promise=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    const data=await promise.json()
    return data
}   
