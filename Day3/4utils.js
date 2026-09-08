// // let div=document.createElement('div')
// localStorage.setItem('theme','dark')

export function initTheme(){
    const savedtheme=localStorage.getItem('theme') || 'dark'
    document.documentElement.setAttribute('theme',savedtheme)
    return savedtheme
}

// Task 520

import { getCoordinates } from "./4weatherapi.js"
export async function fetchCityWeather(city) {
  const data = await getCoordinates(city);
  // console.log(data.current_weather.temperature);
  return `Weather in ${city}: ${data.current_weather.temperature}°C`;
}

// Task 521

export function renderApp(message){
  const app=document.getElementById('app')
  if(!app) return null
  app.innerHTML=`<h1>${message}</h1>`
  return app
} 

// Task 522

// export function logMessage(message){
//   console.log(`Log : ${message}`);
// }





