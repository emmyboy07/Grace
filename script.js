// script.js
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('heart-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const music = document.getElementById('background-music');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const loveText = document.getElementById('love-text');
    const quotesDiv = document.getElementById('quotes');
    const volumeSlider = document.getElementById('volume-slider');

    const quotes = [
        "Love is composed of a single soul inhabiting two bodies.",
        "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
        "I have waited for this opportunity for more than half a century, to repeat to you once again my vow of eternal fidelity and everlasting love.",
        "To love and be loved is to feel the sun from both sides.",
        "You are my sun, my moon, and all my stars."
    ];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Heart particle class
    class Heart {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = Math.random() * 0.5 + 0.5;
            this.opacity = Math.random();
        }
        draw() {
            ctx.fillStyle = `rgba(255, 105, 180, ${this.opacity})`;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size / 2, this.x + this.size, this.y + this.size / 2, this.x, this.y + this.size);
            ctx.bezierCurveTo(this.x - this.size, this.y + this.size / 2, this.x - this.size / 2, this.y - this.size / 2, this.x, this.y);
            ctx.closePath();
            ctx.fill();
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.y > canvas.height || this.x > canvas.width || this.x < 0) {
                this.x = Math.random() * canvas.width;
                this.y = 0 - this.size;
            }
        }
    }

    function init() {
        particlesArray = [];
        for (let i = 0; i < 150; i++) {
            let size = Math.random() * 15 + 10;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            particlesArray.push(new Heart(x, y, size));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    // Music controls
    playBtn.addEventListener('click', () => {
        music.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline';
    });

    pauseBtn.addEventListener('click', () => {
        music.pause();
        playBtn.style.display = 'inline';
        pauseBtn.style.display = 'none';
    });

    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        music.volume = e.target.value;
    });

    // Typing text animation
    const typingText = "I love you, Grace";
    let index = 0;

    function typeText() {
        if (index < typingText.length) {
            loveText.textContent += typingText.charAt(index);
            index++;
            setTimeout(typeText, 100); // Adjust speed here
        }
    }

    // Quotes carousel
    let quoteIndex = 0;
    function displayQuotes() {
        quotesDiv.textContent = quotes[quoteIndex];
        quoteIndex = (quoteIndex + 1) % quotes.length;
        setTimeout(displayQuotes, 5000); // Change quote every 5 seconds
    }

    // Click to generate hearts
    canvas.addEventListener('click', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const size = Math.random() * 15 + 10;
        particlesArray.push(new Heart(x, y, size));
    });

    init();
    animate();
    typeText(); // Start typing effect
    displayQuotes(); // Start quotes display
});function init() {
    particlesArray = [];
    let numParticles = window.innerWidth > 600 ? 150 : 80; // Fewer particles on mobile
    for (let i = 0; i < numParticles; i++) {
        let size = Math.random() * 15 + 10;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Heart(x, y, size));
    }
}

