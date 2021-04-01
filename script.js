/* ------ JavaScript - HTML Canvas Particles - Eyeballs Follow Mouse Animation - Variation ------ */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d'); // ctx is abreviated for context.
ctx.canvas.width = window.innerWidth; // setting window width.
ctx.canvas.height = window.innerHeight; // setting window height.
let eyes = [];
let theta;

const mouse = {
    x: undefined,
    y: undefined
};
window.addEventListener("mousemove", 
    function(e){
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

class Eye {
    constructor(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw(){
        // draw eye ball
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = "white"; // Eye Ball Colour.
        ctx.fill();
        ctx.closePath();

        // get angle
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        theta = Math.atan2(dy, dx);

        // draw iris
        let iris_x = this.x + Math.cos(theta) * this.radius/10;
        let iris_y = this.y + Math.sin(theta) * this.radius/10;
        let irisRadius = this.radius / 1.2;
        
        ctx.beginPath();
        ctx.arc(iris_x, iris_y, irisRadius, 0, Math.PI * 2, true);
        ctx.fillStyle = "#4287f5"; // Iris Colour.
        ctx.fill();

        // draw pupil
        let pupilRadius = this.radius / 2.5;
        let pupil_x = this.x + Math.cos(theta) * this.radius/1.9;
        let pupil_y = this.y + Math.sin(theta) * this.radius/1.9;

        ctx.beginPath();
        ctx.arc(pupil_x, pupil_y, pupilRadius, 0, Math.PI * 2, true);
        ctx.fillStyle = "black"; // Pupil Colour.
        ctx.fill();
        ctx.closePath();

        // draw pupil reflection
        /* 
        ctx.beginPath();
        ctx.arc(pupil_x-pupilRadius/3, pupil_y-pupilRadius/3, pupilRadius/2, 0, Math.PI * 2, true);
        ctx.fillStyle = "rgba(255,255,255,.1)";
        ctx,fill();
        ctx.closePath();
        */

        // draw mouse
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2, true);
        ctx.fillStyle = "gold";
        ctx.fill();
        ctx.closePath();
    }
}
function init(){
    eyes = [];
    let overlapping = false;
    let numberOfEyes = 70; // The Number of Eyes on the page.
    let protection = 10000;
    let counter = 0;

    while (eyes.length < numberOfEyes && counter < protection ) {
        let eye = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.floor(Math.random() * 225) + 15 // this controls the global size of the eyes, change 50 to 100.
        };
        overlapping = false;
        for(let i = 0; i < eyes.length; i++){
            let previousEye = eyes[i];
            let dx = eye.x - previousEye.x;
            let dy = eye.y - previousEye.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < (eye.radius + previousEye.radius) * 2){ // changing the distance from less than <, to greater than > will group the eyes all together.
                overlapping = true;
                break;
            }
        }
        if (!overlapping) {
            eyes.push(new Eye(eye.x, eye.y, eye.radius));
        }
        counter++;
    } 
}
function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0, 19, 19, 0.30)"; // Mouse trail
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < eyes.length; i++) {
        eyes[i].draw();
    }
}
init();
animate();

// resize event
window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        
        init();
    }
);