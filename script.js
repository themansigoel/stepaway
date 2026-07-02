// JavaScript for StepAway Landing Page Interactions

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Toggle active state for clicked item
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 2. Navbar Styling on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '8px 0';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            navbar.style.background = 'rgba(8, 9, 13, 0.85)';
        } else {
            navbar.style.padding = '16px 0';
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(8, 9, 13, 0.7)';
        }
    });

    // 3. Scroll Reveal Animations (Subtle UX Enhancements)
    const elementsToReveal = document.querySelectorAll('.feature-card, .changelog-item, .comparison-table, .detailed-article');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;
        
        elementsToReveal.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial style setup for animations
    elementsToReveal.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load
});

// 4. Interactive Web Demo Function
function startWebDemo() {
    const overlay = document.createElement('div');
    overlay.id = 'web-demo-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(15, 23, 42, 0.9)';
    overlay.style.backdropFilter = 'blur(20px)';
    overlay.style.webkitBackdropFilter = 'blur(20px)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.color = '#0f172a';
    overlay.style.fontFamily = "'Plus Jakarta Sans', sans-serif";

    const modal = document.createElement('div');
    modal.style.background = '#ffffff';
    modal.style.borderRadius = '24px';
    modal.style.padding = '40px';
    modal.style.maxWidth = '450px';
    modal.style.width = '90%';
    modal.style.textAlign = 'center';
    modal.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    modal.style.border = '1px solid rgba(13, 148, 136, 0.1)';

    const icon = document.createElement('div');
    icon.innerHTML = '👁️';
    icon.style.fontSize = '3.5rem';
    icon.style.marginBottom = '20px';

    const title = document.createElement('h3');
    title.innerText = 'Automated Short Break';
    title.style.fontFamily = "'Outfit', sans-serif";
    title.style.fontSize = '1.8rem';
    title.style.fontWeight = '700';
    title.style.marginBottom = '8px';

    const subtitle = document.createElement('p');
    subtitle.innerText = 'Close your eyes and look at something 20 feet away.';
    subtitle.style.color = '#475569';
    subtitle.style.fontSize = '1rem';
    subtitle.style.lineHeight = '1.5';
    subtitle.style.marginBottom = '24px';

    const timer = document.createElement('div');
    timer.innerText = '5';
    timer.style.fontFamily = "'Outfit', sans-serif";
    timer.style.fontSize = '4rem';
    timer.style.fontWeight = '800';
    timer.style.color = '#0d9488';
    timer.style.margin = '20px 0';

    const skipBtn = document.createElement('button');
    skipBtn.innerText = 'Skip Preview';
    skipBtn.className = 'btn btn-secondary';
    skipBtn.style.padding = '8px 20px';
    skipBtn.style.fontSize = '0.9rem';
    skipBtn.style.border = '1px solid #e2e8f0';
    skipBtn.style.background = 'transparent';
    skipBtn.style.color = '#64748b';

    modal.appendChild(icon);
    modal.appendChild(title);
    modal.appendChild(subtitle);
    modal.appendChild(timer);
    modal.appendChild(skipBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    let timeLeft = 5;
    const interval = setInterval(() => {
        timeLeft--;
        timer.innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(interval);
            icon.innerHTML = '✅';
            title.innerText = 'Well Done!';
            subtitle.innerText = 'You completed a screen fatigue relief session. Regular micro-breaks prevent strain and headaches.';
            timer.style.display = 'none';
            skipBtn.innerText = 'Back to Website';
            skipBtn.style.background = 'var(--primary-gradient)';
            skipBtn.style.color = '#ffffff';
            skipBtn.style.border = 'none';
            
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(880, ctx.currentTime);
                gain.gain.setValueAtTime(0.1, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.5);
            } catch (e) {}
        }
    }, 1000);

    const closeDemo = () => {
        clearInterval(interval);
        document.body.removeChild(overlay);
    };

    skipBtn.addEventListener('click', closeDemo);
}
