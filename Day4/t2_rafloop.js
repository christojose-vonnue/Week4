let startValue=0
let targetValue=1000
let duration=2000
const div=document.getElementById("container")
div.style.fontSize="100px"
let startTime=performance.now()
// console.log(startTime);
function easeOutCubic(){
    let rawProgress=0
    const now=performance.now()
    // console.log(now);
    rawProgress = Math.min(Math.max((now - startTime) / duration, 0), 1)
    let easedProgress = 1 - Math.pow(1 - rawProgress, 3)
    let currentValue = startValue + (targetValue - startValue) * easedProgress
    div.textContent=Math.floor(currentValue)
    if(rawProgress<1){
        requestAnimationFrame(easeOutCubic)
    }
}

easeOutCubic()

const canvas=document.querySelector('canvas')
const canvasobj=canvas.getContext('2d')

// random array particles = [ [x,y,vx,vy,radius,color] ]

const particles = [];
const colors = ["red", "yellow", "blue", "green", "orange", "purple", "pink", "cyan"];

for (let i = 0; i < 100; i++) {
    // Position X and Y between 10 and 490
    const x = Math.floor(Math.random() * (490 - 10 + 1)) + 10;
    const y = Math.floor(Math.random() * (490 - 10 + 1)) + 10;
    
    // Velocity X and Y between -3 and 3 (excluding 0 for movement)
    const vx = (Math.random() * 6 - 3) || 1;
    const vy = (Math.random() * 6 - 3) || 1;
    
    // Radius between 2 and 12
    const radius = Math.floor(Math.random() * 11) + 2;
    
    // Pick a random color from the array
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particles.push([x, y, vx, vy, radius, color]);
}

// Preview the first two particles
// console.log(particles[0]);
// console.log(particles[1]);


function frame(){
    canvasobj.clearRect(0,0,500,500)
    
    
    for(let particle of particles){
        // console.log(particle);
        
        canvasobj.beginPath()
        canvasobj.arc(particle[0],particle[1],particle[4],0,Math.PI*2)
        canvasobj.stroke()
        canvasobj.fillStyle=particle[5]
        canvasobj.fill()
        particle[0]+=particle[2]
        particle[1]+=particle[3]
        if(particle[0]>=500 || particle[0]<=0){
            particle[2]=-particle[2]
        }
        if(particle[1]>=500 || particle[1]<=0){
            particle[3]=-particle[3]
        }
    }
    // canvasobj.fillRect(0,0,500,500)
    // canvasobj.fill("black")
}
// frame()
// let frameid=null

// let timerid=setInterval(()=>{
//     requestAnimationFrame(frame)
// },10)

// document.getElementById("resume").addEventListener("click",()=>{
//     if(timerid) return
//     timerid=setInterval(()=>{
//     requestAnimationFrame(frame)
// },10)
// })

//  document.getElementById("pause").addEventListener('click',()=>{
//         clearInterval(timerid)
//         timerid=null
// })

let frameid = null;

function loop() {
    frame(); // update state + draw
    frameid = requestAnimationFrame(loop); // schedule next frame natively
}

// Start
frameid = requestAnimationFrame(loop);

// Resume
document.getElementById("resume").addEventListener("click", () => {
    if (!frameid) {
        frameid = requestAnimationFrame(loop);
    }
});

// Pause
document.getElementById("pause").addEventListener("click", () => {
    if (frameid) {
        cancelAnimationFrame(frameid);
        frameid = null;
    }
});
