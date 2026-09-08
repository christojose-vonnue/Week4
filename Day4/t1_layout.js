const trashBtn = document.getElementById("trashBtn");
const clearBtn = document.getElementById("clearContent");
const inlineBtn = document.getElementById("inlineStyle");
const separateBtn = document.getElementById("seperate");
const container = document.getElementById("container");

trashBtn.addEventListener("click", () => {
  // Use DocumentFragment to batch DOM inserts into a single layout pass
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 200; i++) {
    const card = document.createElement("div");
    card.className = "card";
    fragment.appendChild(card);
  }
  container.appendChild(fragment);
});

clearBtn.addEventListener("click", () => {
  container.innerHTML = "";
});

// UNOPTIMIZED: Interleaved Read -> Write (Layout Thrashing)
inlineBtn.addEventListener("click", () => {
  console.time("Thrashing");
  let newHeight = 10;
  const cards = document.querySelectorAll(".card");
  
  cards.forEach((card) => {
    let height = card.getBoundingClientRect().height; // READ (forces synchronous layout)
    card.style.height = `${newHeight}px`;              // WRITE (invalidates layout)
    newHeight += 5;
  });
  console.timeEnd("Thrashing");
});

// OPTIMIZED: Batch READ -> Batch WRITE
separateBtn.addEventListener("click", () => {
  console.time("BatchEnd");
  const cards = document.querySelectorAll(".card");
  
  // 1. READ BATCH: Gather measurements first without modifying the DOM
  const heights = [];
  cards.forEach((card) => {
    heights.push(card.getBoundingClientRect().height);
  });

  // 2. WRITE BATCH: Apply all mutations sequentially
  let newHeight = 10;
  cards.forEach((card, index) => {
    card.style.height = `${newHeight}px`;
    newHeight += 5;
  });

  console.timeEnd("BatchEnd");
});