// import { chunk, zip, groupBy }  from "./utils.js"
const { chunk, zip, groupBy, pipe, compose,curry,partial } = require("./utils");

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

addone=(num)=>{
    return num+1
}
square=(num)=>{
    return num*num
}

sum=(a,b,c)=>{
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