// import { chunk, zip, groupBy }  from "./utils.js"
const { chunk, zip, groupBy, pipe, compose,curry,partial ,EventEmitter,fetchdata,fetchWithRetry} = require("./utils");

const addone=(num)=>{
    return num+1
}
const square=(num)=>{
    return num*num
}
test('chunk test', () => {
    //Happy Path
    const testcase1 = chunk([1, 2, 3, 1, 2, 3], 2);
    expect(testcase1).toEqual([[1, 2], [3, 1], [2, 3]]);

    // Edge case 2
    const testcase2=chunk([1,2,3,4,5],4)
    expect(testcase2).toEqual([[1,2,3,4],[5]])

    //Error case
    expect(()=>{chunk({123:123})}).toThrow(Error)
});

// function add() {
//     return 2+2
// }


const sum=(a,b,c)=>{
    return a+b+c
}
test('pipe',()=>{
    const testcase1=pipe(5,addone,square)
    expect(testcase1).toBe(36)
})

test('compose',()=>{
    const testcase1=compose(5,addone,square)
    expect(testcase1).toBe(26)
})

test('zip results structure', () => {
  const zipped = zip(['a', 'b'], [1, 2]);
  expect(zipped).toHaveLength(2);
  expect(zipped).toContainEqual(['a', 1]);
});

test('pipe with floating point division', () => {
  const divideByThree = (x) => x / 3;
  const result = pipe(10, divideByThree); // 3.333333333...
  expect(result).toBeCloseTo(3.33, 2);
});

test('groupBy',()=>{
    const testcase1=groupBy([{"synced":0},{"synced":0}],"synced")
    expect(testcase1).not.toBeFalsy()
})

test('curry',()=>{
    const testcase1=curry(sum)(1)(2)(3)
    expect(testcase1).toBe(6)
})

test('partial',()=>{
    const testcase1=partial(sum,1,2)
    expect(testcase1).toBeTruthy()
    const result=testcase1(3)
    expect(result).toBe(6)
})

// Task 2 Files

describe('EventEmitter module',()=>{
    //Write various test functions
    const initalEventEmitter=new EventEmitter()
    test('Argument & Execution Verification',()=>{
        const mockListener=vi.fn()
        initalEventEmitter.on("userlogin",mockListener)
        initalEventEmitter.emit('userlogin',{"id":42},"admin")
        expect(mockListener).toHaveBeenCalled()
        expect(mockListener).toHaveBeenCalledWith({"id":42},"admin")
        // mockListener

        const mockListener1=vi.fn()
        const mockListener2=vi.fn()
        initalEventEmitter.on("common",mockListener1)
        initalEventEmitter.on("common",mockListener2)
        initalEventEmitter.emit('common',{"id":42},"admin")
        expect(mockListener1).toHaveBeenCalledTimes(1)
        expect(mockListener2).toHaveBeenCalledTimes(1)

        // check evenemitter off events
        initalEventEmitter.off("common",mockListener1)
        expect(mockListener1).toHaveBeenCalledTimes(1)
        initalEventEmitter.emit('common',{"id":42},"admin")
        expect(mockListener1).toHaveBeenCalledTimes(1)
        expect(mockListener2).toHaveBeenCalledTimes(2)
        initalEventEmitter.emit('common',{"id":42},"admin")
        expect(mockListener1).toHaveBeenCalledTimes(1)
        expect(mockListener2).toHaveBeenCalledTimes(3)

    })

    test('Testcase II',()=>{
        const eventEmitter=new EventEmitter()
        const mockListener3=vi.fn()
        const mockListener4=vi.fn()
        // eventEmitter.on('Addition',mockListener3)
        eventEmitter.on('Addition',mockListener4)
        eventEmitter.on('*', (mockListener3));
        eventEmitter.emit('Addition',3)    
        // We did not added mockListener3 to 'Addition' yet it was called once
        expect(mockListener3).toHaveBeenCalledTimes(1)
        expect(mockListener4).toHaveBeenCalledTimes(1)
    })

    test('Testcase III',()=>{
        const eventEmitter1=new EventEmitter()
        const mockListener5=vi.fn()
        const mockListener6=vi.fn()
        eventEmitter1.once('Addition',mockListener5)
        eventEmitter1.on('Subraction',mockListener6)

        eventEmitter1.emit('Addition',3) 
        eventEmitter1.emit('Addition',4)
        eventEmitter1.emit('Subraction',12)
        eventEmitter1.emit('Subraction',212)

        expect(mockListener5).toHaveBeenCalledTimes(1)
        expect(mockListener6).toHaveBeenCalledTimes(2)
    })
})

describe('fetchjson',()=>{
    afterEach(()=>{vi.restoreAllMocks();})
    test('Success path', async()=>{

        vi.spyOn(global,'fetch').mockResolvedValue({
            ok : true,
            json : vi.fn().mockResolvedValue({data:"success"})
        })
        const data=await fetchdata("https://api.example.com/data")
        expect(data).toEqual({data:"success"})
        expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/data")
    })

    test('Failure path',async()=>{
        vi.spyOn(global,'fetch').mockResolvedValue({
            ok:false,
            status:404
        })

        await expect(fetchdata("https://api.example.com/data")).rejects.toThrow("wrong url")
    })

    it('Failure path 2',async()=>{
        vi.spyOn(global,'fetch').mockResolvedValue({
            ok:false,
            status:302
        })

        await expect(fetchdata("https://api.example.com/data")).rejects.toThrow("check response status")
    })

    test("Failed Network",async()=>{
        vi.spyOn(global,'fetch').mockRejectedValue(new Error('Network Failure'))

        await expect(fetchdata("https://api.example.com/data")).rejects.toThrow('Network Failure')
    })
   })

describe('fetchWithRetry',()=>{
    afterEach(()=>{
        console.log("Cleared before next test");
        vi.restoreAllMocks()  
    })

    test('Retry..',async ()=>{
        vi.spyOn(global,'fetch')
        .mockRejectedValueOnce(new Error("Network TRansient Error"))
        .mockResolvedValueOnce({
            ok:true,
            json:vi.fn().mockResolvedValue({data:'retry_sucesss'})
        })

        const result=await fetchWithRetry("https://api.example.com/retry",2)
        expect(result).toEqual({data:'retry_sucesss'})
    })

    test('Response code failed..',async ()=>{
        vi.spyOn(global,'fetch')
        .mockRejectedValueOnce(new Error("Network TRansient Error"))
        .mockResolvedValue({
            ok:false
        })

        // const result=await fetchWithRetry("https://api.example.com/retry",2)
        await expect(fetchWithRetry("https://api.example.com/retry")).rejects.toThrow('HTTP Error')
    })

})

