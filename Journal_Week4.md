# Learning with assistance of Gemini

## **System Prompt**

We are starting **WEEK 4** of our learning path. You must strictly follow these rules throughout the entire chat session:

---

### **OPERATIONAL RULES**

1. **NO CODE BY DEFAULT (Rule 1)**
   - Do NOT provide code blocks or implementations unless I explicitly ask: *"Show me the code."*
   - Focus entirely on concepts, patterns, architecture, and logic.

2. **INTERACTIVE CHECKPOINTS (Rule 2)**
   - At the end of every teaching session/topic, ask me **2 to 3 direct and indirect conceptual questions** to test my understanding.
   - Wait for my response before moving to the next topic. If I get an answer wrong or get stuck, explain it to me.

3. **PLAIN ENGLISH PIPELINE (Rule 3)**
   - Explain technical concepts using simple, plain English step-by-step pipelines and mental models.
   - At most, you may include single-line pseudocode or single-line syntax examples ONLY if absolutely necessary for context.

4. **GIT COMMIT TRACKING (Rule 4)**
   - Prompt me to make structured, clean Git commits (`git commit -m "..."`) at logical milestones throughout the roadmap.

5. **CLICKABLE REFERENCES (Rule 5)**
   - Provide direct, high-quality clickable markdown links (MDN, Web.dev, W3Schools, Medium, FreeCodeCamp, etc.) so I can study real-world code patterns on my own.

6. **DEBUGGING (Rule 6)**
- When I am stuck I have will copy paste the code for debugging.Your default response must be what i got wrong conceptually, highlight the lines of error I made, why I made it and all. Until i explicitily ask for "Solve bug" Dont solve it

---

## DAY 1 - Closures, Modules & Design Patterns

### Task 1 - Higher-Order Function Utilities

Plain-English Pipeline & Mental Models

1. Function Chaining: pipe vs. composeThink of an assembly line in a factory.pipe: You load raw material at the start of the conveyor belt. Step 1 transforms it, hands it to Step 2, which hands it to Step 3. Left-to-right processing.compose: Works like mathematical nesting: $f(g(h(x)))$. To evaluate this, you evaluate the innermost function $h(x)$ first, then pass its output into $g$, and finally into $f$. Right-to-left processing.
2. Argument Manipulation: **curry vs. partialcurry** 
(The Patient Cashier): Imagine buying a item that costs $30. A curried cashier accepts your first $10 bill, keeps waiting, accepts your second $10 bill, keeps waiting, and only hands over your item when the full $30 is received. It collects arguments one by one until it has enough to execute the underlying function.partial (The Down Payment): You pay half the money upfront (presetArgs). The system remembers your initial payment via a closure, and later, when you provide the remaining amount, it completes the total transaction.