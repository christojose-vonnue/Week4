import { beforeEach, describe, expect, test } from "vitest";
import { FormValidator,Accordion ,Hamburger} from "./5dom.js";
describe('Task 523 ',()=>{
    test('Testing document,window..',()=>{
        expect(document).toBeDefined()
        expect(window).toBeDefined()
        const div=document.createElement("div")
        expect(div).instanceOf(HTMLElement)
    })
})

describe('Task 524 ',()=>{
  
        beforeEach(() => {
        document.body.innerHTML = `
        <form id="signup-form">
        <input type="email" id="email" />
        <span id="email-error"></span>
        </form>
        `;
        });

        test('Testcase 1',()=>{
            const validator=new FormValidator(document.getElementById('signup-form'))
            validator.validate()
            expect(document.getElementById("email-error").textContent).toBe("Please enter a valid email")
        });

        test('Testcase 2',()=>{
            document.getElementById('email').value="user123@gmail.com"
            const validator=new FormValidator(document.getElementById('signup-form'))
            validator.validate()
            expect(document.getElementById("email-error").textContent).toBe("")
        })

        test('Testcase 2',()=>{
            document.getElementById('email').value="user123gmail.com"
            const validator=new FormValidator(document.getElementById('signup-form'))
            validator.validate()
            expect(document.getElementById("email-error").textContent).toBe("Please enter a valid email")
        })

})

describe('Task 525',()=>{
    beforeEach(() => {
        document.body.innerHTML = `
        <div id="accordion-group">
            <button class="accordion-header" aria-expanded="false">Section 1</button>
            <div class="accordion-panel" hidden>Panel Content</div>
        </div>
        `;
    });

    test('Testcase 1',()=>{
        const accordion=new Accordion(document.getElementById("accordion-group"))
        const button=accordion.button
        const panel=accordion.panel
        expect(button.getAttribute('aria-expanded')).toBe("false")
        expect(panel.hasAttribute('hidden')).toBe(true)
        button.click()
        expect(button.getAttribute('aria-expanded')).toBe("true")
        expect(panel.hasAttribute('hidden')).toBe(false)
        button.click()
        expect(button.getAttribute('aria-expanded')).toBe("false")
        expect(panel.hasAttribute('hidden')).toBe(true)
    })
    // expect(button.getAttribute('aria-expanded')).toBeFalsy()
})

describe('Task 526',()=>{
    beforeEach(()=>{
        document.body.innerHTML=`
        <button id="hamburger" aria-expanded="false"> = </button>
        <div class="invisible" id="drawer"> 
                <div class="tab"><a href="index.html" id="temp">Home</a></div>
                <div class="tab"><a href="about.html">About</a></div>
                <div class="tab"><a href="contact.html">Contact</a></div>
                <div class="tab"><a href="services.html">Services</a></div>
                <div class="tab"><a href="team.html">Team</a></div>
                <div class="tab"><a href="blog.html">Blog</a></div>
        </div>`
    })

    test('Testcase 1',()=>{
        const hamburger= new Hamburger(document.getElementById("drawer"))
        const drawer=hamburger.drawerContainer
        const button=hamburger.button
        expect(button.getAttribute('aria-expanded')).toBe('false')
        expect(drawer.getAttribute("class")).toBe("invisible")
        button.click()
        expect(button.getAttribute('aria-expanded')).toBe('true')
        expect(drawer.getAttribute("class")).toBe("open")
        button.click()
        expect(button.getAttribute('aria-expanded')).toBe('false')
        expect(drawer.getAttribute("class")).toBe("invisible")
    })

    test("Test 2: Forward Focus Trap (Tab)",()=>{
        const hamburger= new Hamburger(document.getElementById("drawer"))
        const drawer=hamburger.drawerContainer
        const button=hamburger.button
        button.click()
        const event=new KeyboardEvent('keydown',{key:'Tab',bubbles:true})
        window.dispatchEvent(event)
        expect(button.getAttribute('aria-expanded')).toBe('true')
        expect(drawer.getAttribute("class")).toBe("open")
        expect(document.activeElement).toEqual(hamburger.firstFocusable)
    })

})


