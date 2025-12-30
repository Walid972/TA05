document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. EFECTO 3D TILT (SOLO EN PROYECTOS)
       ========================================= */
    // AHORA: Solo seleccionamos .card y .project-row (El formulario queda fuera)
    const tiltElements = document.querySelectorAll('.card, .project-row');

    tiltElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Movimiento sutil
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

            // Sombra de neón dinámica
            card.style.boxShadow = `${-rotateY}px ${rotateX}px 20px rgba(0, 243, 255, 0.15)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.boxShadow = '0 0 0 rgba(0,0,0,0)'; // Sin sombra al salir
        });
    });


    /* =========================================
       2. TYPEWRITER (ESCRITURA AUTOMÁTICA)
       ========================================= */
    const textElements = document.querySelectorAll('h1, h2');

    textElements.forEach(el => {
        const textToType = el.innerText;
        el.innerText = '';
        el.classList.add('typing-cursor');

        let i = 0;
        const speed = 40;

        function typeWriter() {
            if (i < textToType.length) {
                el.innerText += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        setTimeout(typeWriter, 300);
    });


    /* =========================================
       3. POLVOS INTERACTIVOS GRISES EN EL FONDO
       ========================================= */
    // Crear canvas para el fondo
    const canvas = document.createElement('canvas');
    canvas.id = 'backgroundCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1'; // Detrás de todo
    canvas.style.pointerEvents = 'none'; // No interfiere con clics
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Partículas (polvos grises)
    const particles = [];
    const particleCount = 100; // Número de polvos

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1; // Tamaño pequeño
            this.speedX = (Math.random() - 0.5) * 0.5; // Movimiento lento
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = 'rgba(128, 128, 128, 0.5)'; // Gris semi-transparente
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Rebote en bordes
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Inicializar partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animación
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Función para efecto interactivo (dispersar polvos)
    function disperseParticles() {
        particles.forEach(particle => {
            particle.speedX += (Math.random() - 0.5) * 2; // Aceleración aleatoria
            particle.speedY += (Math.random() - 0.5) * 2;
            setTimeout(() => {
                particle.speedX *= 0.9; // Frenar gradualmente
                particle.speedY *= 0.9;
            }, 1000);
        });
    }

    // Aplicar dispersión en interacciones
    const interactiveElements = document.querySelectorAll('a, button, input, .card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', disperseParticles);
        el.addEventListener('click', disperseParticles);
    });

    // Redimensionar canvas al cambiar ventana
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    /* EXTRAS (Menú, Año, Validación) */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if(menuToggle){
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            disperseParticles(); // Dispersar polvos al enviar
            alert('CONFIRMACIÓN: DATOS ENVIADOS AL NÚCLEO.');
            contactForm.reset();
        });
    }
});