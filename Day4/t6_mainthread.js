// Constants & Configuration
const ARRAY_SIZE = 3000000;
const resultsDOM = document.getElementById('results') || document.body;

// Instantiate Web Worker thread once at top-level scope
const worker = new Worker('t6_subthread.js');

// Part 3 & 4: Main Thread Sorting Test (Blocking UI)
document.getElementById("main-thread").addEventListener('click', () => {
    // 1. Generate Dataset
    const data = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
        data.push({ id: i, val: Math.random() });
    }

    // 2. Measure & Execute Blocking Sort
    const startTime = performance.now();
    const sortedData = data.sort((a, b) => a.val - b.val);
    const elapsed = (performance.now() - startTime).toFixed(2);

    // 3. Render Benchmark Output
    renderResults('Main Thread', elapsed, sortedData.slice(0, 5));
});

// Part 1, 3 & 4: Worker Thread Sorting Test (Non-Blocking UI)
document.getElementById("sub-thread").addEventListener('click', () => {
    // 1. Generate Dataset
    const data = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
        data.push({ id: i, val: Math.random() });
    }

    // 2. Record Start Time & Offload Task
    const startTime = performance.now();

    // Attach Response Listener
    worker.onmessage = (event) => {
        const { action, payload } = event.data;
        if (action === 'SORT_COMPLETE') {
            const elapsed = (performance.now() - startTime).toFixed(2);
            renderResults('Web Worker', elapsed, payload.slice(0, 5));
        }
    };

    // Dispatch Payload to Background Thread
    worker.postMessage({ action: 'SORT', payload: data });
});

// Helper: DOM Results Renderer
function renderResults(source, timeMs, topItems) {
    console.log(`[${source}] Sorted in ${timeMs}ms`, topItems);
    const logEntry = document.createElement('div');
    logEntry.innerHTML = `<strong>${source}:</strong> ${timeMs} ms (Top item: ${topItems[0]?.val.toFixed(4)})`;
    resultsDOM.appendChild(logEntry);
}

// Continuous Smooth Animation Loop (60fps Visualizer)
const counterDOM = document.getElementById('counter');
if (counterDOM) {
    counterDOM.style.fontSize = "100px";
    
    const duration = 30000;
    const target = 10000;
    const startTimer = Date.now();

    function counter() {
        const elapsedTime = Date.now() - startTimer;
        const ratio = Math.min(elapsedTime / duration, 1);
        const newVal = Math.floor(ratio * target);
        
        counterDOM.textContent = newVal;

        if (ratio < 1) {
            requestAnimationFrame(counter);
        }
    }

    requestAnimationFrame(counter);
}