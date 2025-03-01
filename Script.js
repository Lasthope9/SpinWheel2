// Handle the disclaimer acceptance and form display
document.getElementById('accept-disclaimer').addEventListener('click', function() {
    // Hide the disclaimer and show the wheel container
    document.getElementById('disclaimer-container').style.display = 'none';
    document.getElementById('wheel-container').style.display = 'block';
});

// Wheel spin functionality
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin-btn");
const selectedOptionDisplay = document.getElementById("selected-option");

const options = ['Free Velo Can', 'Action Camera', 'Free Velo Can', 'Action Camera', 'Free Velo Can', 'Action Camera'];
const colors = ['#FF5733', '#FFBD33', '#33FF57', '#3380FF', '#A833FF', '#FF33A8'];
const numOptions = options.length;
const anglePerOption = (2 * Math.PI) / numOptions;
let currentAngle = 0;
let spinning = false;

// Draw the wheel
function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(currentAngle * Math.PI / 180);

    for (let i = 0; i < numOptions; i++) {
        const startAngle = i * anglePerOption;
        const endAngle = startAngle + anglePerOption;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }
    ctx.restore();
}

// Spin the wheel
function spinWheel() {
    if (spinning) return;
    spinning = true;
    let finalAngle = Math.random() * 360 + 1800; // Spin the wheel with a random final angle
    let spinDuration = 3000; // Duration for the wheel to spin
    let start = null;

    function animateSpin(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        if (progress < spinDuration) {
            let easing = 1 - Math.pow(1 - progress / spinDuration, 3); // Easing for smoother spin
            currentAngle = easing * finalAngle;
            drawWheel();
            requestAnimationFrame(animateSpin);
        } else {
            spinning = false;
            const randomIndex = Math.floor(Math.random() * numOptions);
            selectedOptionDisplay.textContent = `You won: ${options[randomIndex]}`;
        }
    }

    requestAnimationFrame(animateSpin);
}

// Initial wheel drawing
drawWheel();

// Event listener to start the wheel spin
spinBtn.addEventListener("click", spinWheel);

