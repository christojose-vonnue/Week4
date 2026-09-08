// @vitest-environment jsdom
import { getCoordinates } from "./4weatherapi.js"
import { initTheme,fetchCityWeather, renderApp } from "./4utils.js" 
import { afterEach, expect, test } from "vitest"

vi.mock(`./4weatherapi.js`,()=>({
    getCoordinates : vi.fn()
}))



describe('Weather API ',()=>{
    test('Test case I ',async ()=>{
        getCoordinates.mockResolvedValue({ current_weather:{temperature:25}})
        const result = await fetchCityWeather('Tokyo')
        console.log(result);
        expect(result).toEqual('Weather in Tokyo: 25°C')
    })

})

describe('Inital Theme inittheme() ',()=>{
    afterEach(()=>vi.resetAllMocks())
    test('Inittheme function',()=>{
        const getItemSpy=vi.spyOn(Storage.prototype,'getItem').mockReturnValue('dark')
        const theme=initTheme()
        expect(getItemSpy).toHaveBeenCalledWith('theme') //???
        expect(theme).toEqual('dark')
        expect(document.documentElement.getAttribute('theme')).toEqual('dark')
    })

     test('Inittheme',()=>{
        // const getItemSpy=vi.spyOn(Storage.prototype,'getItem').mockReturnValue('dark')
        const theme=initTheme()
        expect(theme).toBe('dark') //???
        // expect(theme).toEqual('dark')
        // expect(document.documentElement.getAttribute('theme')).toEqual('dark')
    })


})

describe('DOM Isolation with renderApp', ()=>{
    beforeEach(() => {
         document.body.innerHTML='<div id="app"></div>';
    });
    test("Case 1 ",()=>{
        const app=renderApp("Hello World")
        expect(app.innerHTML).toEqual("<h1>Hello World</h1>")
    })
    test("Case 2",()=>{
        expect(document.querySelectorAll("h1").length).toBe(0)
        const app=renderApp("Hello World")
        expect(app.innerHTML).toEqual("<h1>Hello World</h1>")
    })
    test("Case 3",()=>{
        document.body.innerHTML=''
        const app=renderApp("Hello World")
        expect(app).toEqual(null)

    })
})

describe('Teardown Rigor with logMessage',()=>{
    afterEach(()=>{vi.restoreAllMocks();})

    test('Test One',()=>{
        const logSpy=vi.spyOn(console,'log').mockImplementation(()=>{})
        console.log("Alpha");
        console.log("bETA");
        expect(logSpy).toHaveBeenCalledTimes(2)
    })

    test('Test Two ',()=>{
        const logSpy=vi.spyOn(console,'log').mockImplementation(()=>{})
       expect(logSpy).toHaveBeenCalledTimes(0)  
       console.log("Gamma");
       expect(logSpy).toHaveBeenCalledTimes(1)
    })
})