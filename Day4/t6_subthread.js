self.onmessage=(event)=>{
    let paylord=event.data.payload
    let sortedData=paylord.sort((a,b)=>a.val-b.val)
    self.postMessage({action:'SORT_COMPLETE',payload:sortedData})
}

// Part 2: Worker Thread Processing
self.onmessage = (event) => {
    const { action, payload } = event.data;

    if (action === 'SORT' && Array.isArray(payload)) {
        // Perform sorting operation on background thread
        const sortedData = payload.sort((a, b) => a.val - b.val);

        // Send sorted array back to the main thread
        self.postMessage({
            action: 'SORT_COMPLETE',
            payload: sortedData
        });
    }
};