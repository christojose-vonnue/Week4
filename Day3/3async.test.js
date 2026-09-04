

// const { HttpError,fetchjson, debounce, memoize,fetchWithTimeout} = require('./3async')
import { HttpError, fetchjson, debounce, memoize, fetchWithTimeout } from './3async.js'


describe('fetchJSON',()=>{
    afterEach(()=>{
        vi.restoreAllMocks()
    })
    it('Success Path',async ()=>{
        vi.spyOn(global,'fetch')
        .mockResolvedValue({
            ok:true,
            json:vi.fn().mockResolvedValue({data:'ok'})
        })
    
        const res=await fetchjson("http://test/data.com")
        expect(res).toEqual({data:'ok'})
    })

    it('Failure Path',async ()=>{
        vi.spyOn(global,'fetch').mockResolvedValue({
            ok:false,
            status:404
        })
        await expect(fetchjson("http://test.com")).rejects.toThrow(HttpError)
    })
})

describe('Debounce',()=>{
    beforeEach(()=>vi.useFakeTimers())
    afterEach(()=>vi.useRealTimers())
    
    it('Rapid Execution',()=>{
        const mockFn=vi.fn()
        const debounced=debounce(mockFn,1000)
        for(let i=0;i<10;i++){
            debounced()
        }
        expect(mockFn).toHaveBeenCalledTimes(0)
        // FAST FORWARD
        vi.advanceTimersByTime(1000)
        expect(mockFn).toHaveBeenCalledTimes(1)
    })
})

describe('Memoize Test',()=>{
    it('Testcase 1',()=>{
        const computeSpy=vi.fn((x)=>x*2)
    const memoizeCompute=memoize(computeSpy)
    let x1=memoizeCompute(5)
    let x2=memoizeCompute(5)
    expect(computeSpy).toHaveBeenCalledTimes(1)
    expect(x1).toBe(10)
    expect(x2).toBe(10)

    let x3=memoizeCompute(10)
    expect(computeSpy).toHaveBeenCalledTimes(2)
    expect(x3).toBe(20)
    })
})

describe('fetchWithTimeout',()=>{
    beforeEach(()=>vi.useFakeTimers())
    afterEach(()=>vi.useRealTimers())

    it('Timer fetch',async ()=>{
        vi.spyOn(global,'fetch')
        const fetchPromise=fetchWithTimeout("https://api.example.com/data",5000)
        vi.advanceTimersByTime(5000)
        await expect(fetchPromise).rejects.toThrow()
    })
})