// Menu mobile
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    // Função para toggle do menu
    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.setAttribute('aria-expanded', isMenuOpen);
        navLinks.style.display = isMenuOpen ? 'flex' : 'none';
        
        // Anima as barras do hamburger
        const spans = mobileMenu.querySelectorAll('span');
        if (isMenuOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    };

    mobileMenu.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Animação de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    window.scrollTo(0, offsetPosition);
                } else {
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Animação de entrada dos elementos quando ficam visíveis
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
document.querySelectorAll('.menu-item, .about-content > *, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Aqui você pode adicionar a lógica para enviar o formulário
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('.submit-button');
        
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            // Simulação de envio (substitua por sua lógica real)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Feedback de sucesso
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        } catch (error) {
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Mensagem';
        }
    });
}

// Adiciona classe ativa ao link do menu atual
const updateActiveMenuLink = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const currentId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveMenuLink);
updateActiveMenuLink();