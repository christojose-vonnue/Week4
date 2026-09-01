
const todo = document.getElementById("to-do");
const inProgress = document.getElementById("in-progress");
const done = document.getElementById("done");
const columns = [todo, inProgress, done];
const taskcontainer = document.getElementById("task-container");

let currentlyDraggedId = null;
let pickedupCardId = null;
let idindex = 0;


function getCurrentColumnIndex(card) {
    const parentColumn = card.parentElement;
    return columns.indexOf(parentColumn);
}


function makePlaceholder(draggedTask) {
    const placeholder = document.createElement("div");
    placeholder.classList.add("placeholder");
    if (draggedTask) {
        placeholder.style.height = `${draggedTask.offsetHeight}px`;
    } else {
        placeholder.style.height = "60px"; // Fallback default height
    }
    return placeholder;
}


function shift(e, card1) {
    let colindex = getCurrentColumnIndex(card1);

    if (e.key === "ArrowRight") {
        colindex = (colindex + 1) % columns.length; // Next column
        columns[colindex].append(card1);
        card1.focus();
        saveBoard();
    } else if (e.key === "ArrowLeft") {
        colindex = (colindex - 1 + columns.length) % columns.length; // Previous column
        columns[colindex].append(card1);
        card1.focus();
        saveBoard();
    }
}


function setupCardListeners(card) {
    // --- Mouse Drag Listeners ---
    card.addEventListener("dragstart", (ev) => {
        ev.dataTransfer.effectAllowed = "move";
        currentlyDraggedId = card.id;
        ev.dataTransfer.setData("text/plain", card.id);
    });

    card.addEventListener("dragend", () => {
        currentlyDraggedId = null;
    });

    // --- Keyboard Listeners ---
    card.addEventListener("keydown", (e) => {
        // Allow contentEditable editing (Space key inside text won't trigger pick-up)
        if (e.target.isContentEditable && e.key === " ") {
            return;
        }

        e.stopPropagation(); // Prevent bubbling to column container

        const currentCard = e.currentTarget;
        const currentCardId = currentCard.id;

        // Pick Up or Drop
        if (e.key === " " || e.code === "Space") {
            e.preventDefault();

            if (pickedupCardId === null) {
                // Pick up card
                console.log("Picked up card:", currentCardId);
                pickedupCardId = currentCardId;
                currentCard.classList.add("keyboardselected");
            } else if (pickedupCardId === currentCardId) {
                // Drop/Deselect card
                console.log("Deselected card:", currentCardId);
                currentCard.classList.remove("keyboardselected");
                pickedupCardId = null;
            }
        }

        //Move card across columns
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            shift(e, currentCard);
        }
    });
}


function createCard(text, columnId, customId) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("draggable", "true");
    
    const cardId = customId || ("id" + idindex++);
    card.setAttribute("id", cardId);
    card.setAttribute("tabIndex", "0");

    //your creation logic so any new/modified task marks synced: false by default.
    card.setAttribute("synced", false);

    const task = document.createElement("p");
    task.setAttribute("contenteditable", "true");
    task.textContent = text || "Your task..";

    const deletebutton = document.createElement("button");
    deletebutton.textContent = "Delete task";
    deletebutton.setAttribute("class", "removetask");

    card.append(task);
    card.append(deletebutton);

    // Target specified column (or default to "to-do")
    const targetColumn = document.getElementById(columnId) || todo;
    targetColumn.append(card);

    // Attach drag & keyboard event listeners
    setupCardListeners(card);
    
    return card;
}


document.getElementById("add").addEventListener("click", () => {
    createCard("Your task..", "to-do");
    saveBoard();
});

// Delete Button 
taskcontainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("removetask")) {
        const carddeleted = event.target.closest(".card");
        if (carddeleted) {
            deleteRecord(carddeleted.getAttribute("id"))
            carddeleted.remove();
            // saveBoard();
        }
    }
});
// Auto-save Text 
taskcontainer.addEventListener("focusout", (e) => {
    if (e.target.isContentEditable) {
        saveBoard();
    }
});

// Column Drag & Drop Listeners
for (let i of columns) {
    i.addEventListener("dragover", (ev) => {
        ev.preventDefault();
        const draggedtask = document.getElementById(currentlyDraggedId);
        
        if (!ev.currentTarget.querySelector(".placeholder")) {
            const placeholder = makePlaceholder(draggedtask);
            ev.currentTarget.append(placeholder);
        }
    });

    i.addEventListener("dragleave", (ev) => {
        if (!ev.currentTarget.contains(ev.relatedTarget)) {
            const placeholder = ev.currentTarget.querySelector(".placeholder");
            if (placeholder) {
                placeholder.remove();
            }
        }
    });

    i.addEventListener("drop", (ev) => {
        ev.preventDefault();
        const id = ev.dataTransfer.getData("text/plain");
        const draggedtask = document.getElementById(id);

        if (draggedtask) {
            ev.currentTarget.append(draggedtask);
        }

        // Clean up placeholder on drop
        const placeholder = ev.currentTarget.querySelector(".placeholder");
        if (placeholder) {
            placeholder.remove();
        }
        saveBoard();
    });
}

//  LocalStorage Save and Load 
// function saveBoard() {
//     const cards = document.querySelectorAll(".card");
//     const data = Array.from(cards).map(card => ({
//         id: card.id,
//         text: card.querySelector("p").textContent,
//         column: card.parentElement.id
//     }));
//     localStorage.setItem("kanbanData", JSON.stringify(data));
// }

// function loadBoard() {
//     const savedData = localStorage.getItem("kanbanData");
//     if (!savedData) return;

//     const dataArray = JSON.parse(savedData);
//     dataArray.forEach(item => {
//         createCard(item.text, item.column, item.id);
        
//         // Ensure idindex stays ahead of existing numerical IDs to avoid collisions
//         const numericId = parseInt(item.id.replace("id", ""), 10);
//         if (!isNaN(numericId) && numericId >= idindex) {
//             idindex = numericId + 1;
//         }
//     });
// }

// 1. Request

function openDB(){
    return new Promise((resolve,reject)=>{
        const request=indexedDB.open("Kanban",1)

        // 2. onupgrade, inside, get the db and creatObjectStore
        request.onupgradeneeded=(event)=>{
            const db=event.target.result
            if(!db.objectStoreNames.contains("tasks")){
                db.createObjectStore("tasks",{"keyPath":"id"})
            }
        }

        request.onsuccess=()=> resolve(request.result)
        request.onerror=()=>reject(request.error)
    })
}


async function getStore(mode="readonly") {
    const db=await openDB()
    return db.transaction("tasks",mode).objectStore("tasks")
}

// Crud helperes
// pattern , await the store

// return promise
// inside that promise, create a request object inside the promse
// esolve the result
// reject the error
async function updateRecord(item) {
    const store=await getStore("readwrite")   
    return new Promise((resolve,reject)=>{
        const req=store.put(item)
        req.onsuccess=()=>resolve(req.result)
        req.onerror=()=>reject(req.error) 
    }) 
}

async function getAllRecords(){
    const store=await getStore()
    // return new Promise(store.getAll())
    return new Promise((resolve,reject)=>{
        const req=store.getAll()
        req.onsuccess=()=>resolve(req.result)
        req.onerror=()=>reject(req.error)
    })
}   

async function deleteRecord(id) {
    const store=await getStore("readwrite")
    return new Promise((resolve,reject)=>{
        const req=store.delete(id)
        req.onsuccess=()=>resolve(req.result)
        req.onerror=()=>reject(req.error)
    })
}

// now we are saving data
async function saveBoard() {
    const cards = document.querySelectorAll(".card");
    for (const card of cards) {
        let temp = { 
            id: card.id,
            text: card.querySelector("p").textContent,
            column: card.parentElement.id,
            synced: false
        };
        await updateRecord(temp);
    }
}

async function loadBoard() {
    const cards=await getAllRecords()
    for (const card of cards) {
        createCard(card.text,card.column,card.id)
        // Ensure idindex stays ahead of existing numerical IDs to avoid collisions
        const numericId = parseInt(card.id.replace("id", ""), 10);
        if (!isNaN(numericId) && numericId >= idindex) {
            idindex = numericId + 1;
        }
    }
}

window.addEventListener("online",async ()=>{
    const records=await getAllRecords()
    const unsynced=records.filter((record)=>record.synced==false)
    for (const record of unsynced) {
        record.synced=true
        updateRecord(record)
    };
})


// Load saved cards on startup
loadBoard();
