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
       3. SONIDOS DE INTERFAZ (AUDIO SYNTH)
       ========================================= */
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function playCyberSound(type) {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (type === 'hover') {
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
            oscillator.frequency.linearRampToValueAtTime(600, audioCtx.currentTime + 0.05);
            gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.05);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.05);
        } else if (type === 'click') {
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        }
    }

    const interactiveElements = document.querySelectorAll('a, button, input, .card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => playCyberSound('hover'));
        el.addEventListener('click', () => playCyberSound('click'));
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
            playCyberSound('click');
            alert('CONFIRMACIÓN: DATOS ENVIADOS AL NÚCLEO.');
            contactForm.reset();
        });
    }
});