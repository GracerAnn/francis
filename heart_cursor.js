const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 30;

const colors = ['#ff6b81', '#ff4757', '#bd2f2fff', '#ff0000ff', '#751010ff'];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 2 -1;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.life = 100;
        this.decay = Math.random() * 0.5 + 0.1;
        this.angle = 0;
        this.angularSpeed = Math.random() * 0.1 - 0.5;
        this.floatStrength = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.angularSpeed;
        this.y += Math.sin(this.angle) * this.floatStrength;
        this.life -= this.decay;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life / 100;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);

        ctx.bezierCurveTo(
            this.x, this.y,
            this.x - this.size / 2, this.y,
            this.x - this.size / 2, this.y + topCurveHeight
        );

        ctx.bezierCurveTo(
            this.x - this.size / 2, this.y + (this.size / 1.5),
            this.x, this.y + (this.size / 1.5),
            this.x, this.y + this.size
        );

        ctx.bezierCurveTo(
            this.x, this.y + (this.size / 1.5),
            this.x + this.size / 2, this.y + (this.size / 1.5),
            this.x + this.size / 2, this.y + topCurveHeight
        );

        ctx.bezierCurveTo(
            this.x + this.size / 2, this.y,
            this.x, this.y,
            this.x, this.y + topCurveHeight
        );

        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

}

function handleMouseMove(e) {
    for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
    if (particles.length > 100) {
        particles.splice(0, particles.length - 200);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

function init() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }
    animate();
}

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();

