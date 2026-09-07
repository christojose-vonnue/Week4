# Task 1 - First Tests - Matchers & Assertions

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

# Task 2 - Mock Functions - `jest.fn()` & `jest.spyOn()`

### 1. Summary of New Concepts
* **Mock Telemetry & Inversion of Control (`jest.fn()`):** Mastered using standalone mock functions as spyable telemetry dummies to register callbacks, verify execution flow, and assert pass-through arguments using matchers like `.toHaveBeenCalled()`, `.toHaveBeenCalledWith()`, and `.toHaveBeenCalledTimes()`.
* **Global API Spying & Interception (`jest.spyOn()`):** Applied `jest.spyOn(global, 'fetch')` to dynamic runtime objects to mock platform APIs without permanently mutating global scope, testing clean async success paths and network errors without making real HTTP requests.
* **Asynchronous Resolution Control:** Learned the precise distinction between `.mockReturnValue()` and `.mockResolvedValue()`, utilizing Promise wrappers to correctly simulate `fetch` responses and evaluating rejected Promises using `await expect(...).rejects.toThrow()`.
* **Sequential Mocking & Temporal States:** Chained single-use mock implementations (`.mockImplementationOnce()`, `.mockRejectedValueOnce()`, `.mockResolvedValueOnce()`) to test resilience patterns and retry logic (`fetchWithRetry`) where identical function calls produce different outcomes across sequential attempts.
* **Test Isolation & Lifecycle Cleanups:** Implemented `afterEach(() => jest.restoreAllMocks())` hooks to prevent spy leakage and test pollution across independent test blocks.

---

### 2. Mistakes & Conceptual Corrections
* **Issue 1 (Call Scope vs. Call Count Assertion Mismatch):**
  * **Root Cause:** Misinterpreted `.toHaveBeenLastCalledWith()` as a method for asserting call counts rather than evaluating the argument payload of the single most recent execution.
  * **Correction:** Clarified matcher boundaries: `.toHaveBeenCalledTimes(n)` asserts total call frequency, `.toHaveBeenCalledWith(...)` inspects argument history across all calls, and `.toHaveBeenLastCalledWith(...)` inspects only the final call.
* **Issue 2 (Over-Strict Rejection Assertions):**
  * **Root Cause:** Wrote string mismatch expectations in `rejects.toThrow("wrong url")` that did not align with the actual error message thrown by the inner function.
  * **Correction:** Aligned the expected error string in the test assertion directly with the thrown Error string from `fetchJSON`/`fetchdata`.
* **Issue 3 (Hardcoded Loop Bounds in Retry Logic):**
  * **Root Cause:** Hardcoded the retry loop condition as `i < 2` inside `fetchWithRetry`, limiting the function to exactly 2 attempts regardless of the dynamic `retries` parameter.
  * **Correction:** Refactored the loop upper bound to `i <= retries` so the retry algorithm dynamically honors any configured retry limit.
* **Issue 4 (Missing `await` on Asynchronous Rejections):**
  * **Root Cause:** Unclear on why `expect(promise).rejects` needs an `await` modifier, risking premature test completion before Jest can evaluate the rejection state.
  * **Correction:** Applied `await` directly before `expect(...)` to ensure Jest waits for the underlying rejected Promise to settle before concluding the test.

---

### 3. Autonomy Score (Code Ownership)
* **Code Written By You:** **92%**
  *(All implementations of `EventEmitter`, `fetchJSON`, `fetchWithRetry`, and their corresponding Jest test suites with mock assertions, spies, and sequential chains were written independently using conceptual blueprints.)*

---

### 4. Mentorship & Architectural Assistance
* **Architectural Blueprints:** Provided step-by-step mental models for `jest.fn()` call inspection (`mockFn.mock.calls`), global API spying lifecycles, and sequential chaining for retry algorithms.
* **Async Assertion Debugging:** Guided the proper wrapping of `Promise.resolve` structures on mocked `fetch` response objects (`{ ok, json: jest.fn() }`) and clarified `await expect().rejects` execution mechanics.
* **Test Isolation Guidance:** Structuring `afterEach` hooks to guarantee global spy restoration and prevent test state leakage.

# Task 3 - Async Tests & Timer Mocks

### 1. Summary of New Concepts
* **Explicit Custom Error Types (`Extending Error`):** Implemented a custom `HttpError` class extending base `Error` to attach status codes (`this.status`), enabling typed error verification in consumer logic via `instanceof`.
* **Async Resolution & Custom Exception Assertions:** Mastered verifying Promise rejections using `await expect(...).rejects.toThrow(HttpError)`, validating both class type compatibility and error propagation in asynchronous flows.
* **Fake Timers & Deferred Execution Control (`vi.useFakeTimers()`):** Applied virtual clock management to test time-bound Higher-Order Functions like `debounce`, verifying that rapid synchronous calls reset internal timers and defer underlying function invocation until fast-forwarding with `vi.advanceTimersByTime()`.
* **Function Memoization & Key Serialization (`memoize`):** Built cache management using `Map` structures, learning why reference equality in JS objects/arrays requires argument serialization (`JSON.stringify(args)`) to guarantee structural key lookup across distinct function invocations.
* **Request Abort Signal Timers (`AbortController`):** Integrated `AbortController` and `setTimeout` inside `fetchWithTimeout` to enforce max request durations, leveraging `finally` blocks for `clearTimeout` resource cleanup and testing cancellation via fake timers.

---

### 2. Mistakes & Conceptual Corrections
* **Issue 1 (Constructor Context in Derived Error Classes):**
  * **Root Cause:** Unclear on why `super(message)` is mandatory inside derived ES6 class constructors before assigning properties to `this`.
  * **Correction:** Internalized that `this` remains uninitialized in derived classes until `super()` executes the parent `Error` constructor.
* **Issue 2 (Class Instance vs. String Matching in `.toThrow()`):**
  * **Root Cause:** Misunderstood the difference between testing class instances (`.toThrow(HttpError)`) versus partial string matches (`.toThrow('Error')`).
  * **Correction:** Clarified that passing a constructor verifies `instanceof` identity, whereas passing a string checks exact substring inclusion in `.message`.
* **Issue 3 (Reference Identity in Map Cache Keys):**
  * **Root Cause:** Assumed `Map` objects handle array/object key lookups like Python dictionaries.
  * **Correction:** Learned that JS `Map` uses strict referential equality (`===`), making `cache.has([5])` evaluate to `false` unless arguments are serialized into primitive strings.
* **Issue 4 (Dangling Timers & Memory Leak Risks):**
  * **Root Cause:** Unsure why `clearTimeout(timerId)` is necessary in a `finally` block if a `fetch` request completes successfully before timing out.
  * **Correction:** Recognized that uncleaned timers remain active in the Node event loop, causing memory leaks and firing delayed `controller.abort()` calls on finished requests.

---

### 3. Autonomy Score (Code Ownership)
* **Code Written By You:** **95%**
  *(All implementations of `HttpError`, `fetchjson`, `debounce`, `memoize`, `fetchWithTimeout`, and their corresponding Vitest test suites were written independently using functional blueprints.)*

---

### 4. Mentorship & Architectural Assistance
* **Architectural Blueprints:** Provided conceptual breakdowns for fake timer initialization, HOF closure state retention (`debounce` and `memoize`), and combining `AbortController` signals with `fetch`.
* **Timer Lifecycle Debugging:** Clarified the necessity of paired `beforeEach(() => vi.useFakeTimers())` and `afterEach(() => vi.useRealTimers())` hooks to prevent virtual timer leakages across the runner.
* **Async Response Handling:** Guided resolution for `res.json is not a function` errors resulting from unconfigured spy return values.

<br>

# Task 4 - Module Mocking & Setup/Teardown

### 1. Summary of New Concepts
* **Web Storage Spying (`Storage.prototype`):** Targeted `Storage.prototype.getItem` using `vi.spyOn()` to intercept `localStorage` reads, bypassing read-only instance restrictions on `window.localStorage` in simulated environments.
* **ESM Module Interception (`vi.mock()`):** Leveraged compile-time module hoisting with `vi.mock()` to substitute an entire API dependency (`4weatherapi.js`) with isolated mock implementations (`vi.fn()`), verifying payload assertions without invoking live endpoints.
* **DOM Baseline Isolation (`beforeEach` Fixtures):** Implemented clean HTML DOM fixture resets (`document.body.innerHTML = '<div id="app"></div>'`) before each test block, eliminating inter-test state leakage across `document.documentElement` nodes.
* **Teardown Mechanics & Lifecycle Cleanups:** Mastered the architectural differences across mock cleanup tiers (`clearAllMocks` vs. `resetAllMocks` vs. `restoreAllMocks`), enforcing `vi.restoreAllMocks()` in `afterEach` to reattach original native method definitions onto intercepted globals.

---

### 2. Mistakes & Conceptual Corrections
* **Issue 1 (Mutating State Inside Init Functions):**
  * **Root Cause:** Added `localStorage.setItem('theme', 'dark')` inside `initTheme()`, causing initialization logic to overwrite pre-existing user preferences instead of strictly reading them.
  * **Correction:** Refactored `initTheme()` to read saved values via `localStorage.getItem()` and apply fallback defaults (`|| 'light'`) without mutating storage state.
* **Issue 2 (Misunderstanding Module Hoisting Rules):**
  * **Root Cause:** Assumed static `import` statements executed before `vi.mock()`, leading to confusion over how Vitest substitutes module references.
  * **Correction:** Internalized that Vitest hoists `vi.mock()` declarations to the top of the bundle at compile time, ensuring mock factories execute before imported modules evaluate.
* **Issue 3 (Incomplete Teardown via Partial Mock Cleanups):**
  * **Root Cause:** Unclear on why `vi.clearAllMocks()` is insufficient when spying on global system objects like `console.log`.
  * **Correction:** Established that `clearAllMocks()` only wipes call history arrays, whereas `restoreAllMocks()` is required to detach spies and reinstate native function implementations on target prototypes.

---

### 3. Autonomy Score (Code Ownership)
* **Code Written By You:** **93%**
  *(All implementations of `initTheme`, `fetchCityWeather`, `renderApp`, `logMessage`, and their corresponding Vitest suite assertions were written independently following architectural blueprints.)*

---

### 4. Mentorship & Architectural Assistance
* **API Fixture Guidance:** Provided the conceptual schema for mocking ESM module exports (`vi.mock()`) and configuring resolved promise structures (`mockResolvedValue`).
* **DOM State Prevention:** Guided the implementation of explicit `beforeEach` DOM baseline resets to prevent accumulated `HTMLElement` nodes from bleeding into adjacent tests.
* **Lifecycle Matrix Clarification:** Detailed the exact operational boundaries of `clearAllMocks`, `resetAllMocks`, and `restoreAllMocks` for global spy management.