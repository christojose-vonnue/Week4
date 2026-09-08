import { describe, expect, test } from "vitest";
import { formatDate } from "./7tdd.js";

describe('Format Date',()=>{
    test('Format : DD/MM/YYY',()=>{
        const date=new Date(2000,0,1)
        expect(formatDate(date,'DD/MM/YYYY')).toBe("01/01/2000")
    })
    test('Format : YYYY-MM-DD',()=>{
        const date=new Date(2000,0,1)
        expect(formatDate(date,'YYYY-MM-DD')).toBe("2000-01-01")
    })
    test('Format : Month DD, YYYY',()=>{
        const date=new Date(2000,0,1) 
        expect(formatDate(date,'Month DD, YYYY')).toBe("January 01, 2000")
    })
    test('Format Relative , past',()=>{
        const date=new Date(2026,8,6)
        expect(formatDate(date,'relative')).toBe("2 Days ago")
    })
    test('Format Relative , past',()=>{
        const date=new Date(2026,8,10)
        expect(formatDate(date,'relative')).toBe("In 2 Days")
    })
    test('Format Relative , today',()=>{
        const date=new Date(2026,8,8)
        expect(formatDate(date,'relative')).toBe("Today")
    })
    test('Format Relative , today',()=>{
        const date=new Date(2026,8,8)
        expect(formatDate(date,'Invalid Format')).toBe("Wrong Format")
    })

    test('Wrong Instance',()=>{
        const date=new Error()
        expect(formatDate(date,'relative')).toBe("Invalid Date")
    })
})