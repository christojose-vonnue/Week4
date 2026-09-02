## Task 1 - First Tests - Matchers & Assertions

### 1. Summary of New Concepts
* **Test-Driven Development (TDD) & Environment Setup:** Configured Jest in a Node.js CommonJS environment, establishing structured unit test files (`utils.test.js`) and executing test suites via `npm test`.
* **Referential vs. Deep Structural Equality:** Mastered the distinction between strict referential identity (`.toBe()`) and recursive value/structural equality (`.toEqual()`) when evaluating nested arrays and object primitives.
* **Exception Interception Mechanics:** Learned to defer execution of throwing functions using anonymous arrow wrappers (`expect(() => fn()).toThrow()`) so Jest's `try...catch` engine can intercept and validate error instances safely.
* **Higher-Order Function (HOF) Architecture:** Implemented functional utilities (`pipe`, `compose`, `curry`, `partial`) using standard FP mechanics: array reduction (`.reduce()`, `.reduceRight()`), argument pre-filling via rest/spread operators, and dynamic parameter introspection using `fn.length`.
* **Comprehensive Assertions Toolkit:** Applied the full range of Jest matchers across pure utilities: `.toHaveLength()`, `.toContain()`, `.toBeTruthy()`, `.toBeFalsy()`, and floating-point tolerance testing via `.toBeCloseTo()`.

---

### 2. Mistakes & Conceptual Corrections
* **Issue 1 (Module System Mismatch):**
  * **Root Cause:** Mixed ESM syntax (`export`) inside `utils.js` with CommonJS `require('./utils')` in `utils.test.js`, causing Jest to throw runtime parsing errors.
  * **Correction:** Unified the module contract across both files to standard CommonJS using `module.exports = { ... }` and `const { ... } = require('./utils')`.
* **Issue 2 (Immediate Invocation in Error Assertions):**
  * **Root Cause:** Wrote `expect(chunk([], 3)).toThrow()`, which executed `chunk([], 3)` immediately before `expect()` could run, crashing the test runner with an unhandled exception.
  * **Correction:** Delegated function execution to Jest by wrapping the call in an arrow function: `expect(() => chunk([], 3)).toThrow()`.
* **Issue 3 (Reference Identity vs. Value Equality):**
  * **Root Cause:** Attempted to test array output from `chunk()` using `.toBe()`, causing assertions to fail because newly generated array instances do not share the same memory location.
  * **Correction:** Switched structural comparisons to `.toEqual()` to evaluate array contents by value rather than memory address.
* **Issue 4 (Factory Signature vs. Immediate Execution in HOFs):**
  * **Root Cause:** Designed initial drafts of `pipe` and `compose` to accept and process the initial value immediately rather than returning a reusable pipeline function.
  * **Correction:** Refactored HOF signatures to return factory functions `(initialValue) => ...` for deferred pipeline evaluation.

---

### 3. Autonomy Score (Code Ownership)
* **Code Written By You:** **100%**
  *(All implementations of `chunk`, `zip`, `groupBy`, `pipe`, `compose`, `curry`, and `partial`, along with their 8 corresponding Jest test suites, were written independently using functional blueprints.)*

---

### 4. Mentorship & Architectural Assistance
* **Architectural Blueprints:** Provided step-by-step logic breakdowns for HOF argument collection (`curry` parameter matching via `fn.length` vs. `partial` preset argument spreading).
* **Environment & Config Debugging:** Resolved Jest runtime module parsing failures and guided switching from TypeScript configuration scaffolding (`jest.config.ts`) to plain CommonJS (`jest.config.js`).
* **Test Design & Matcher Guidance:** Structured the full coverage matrix mapping pure utilities to appropriate Jest matchers (`toBeCloseTo`, `toHaveLength`, `toBeTruthy`/`toBeFalsy`).

