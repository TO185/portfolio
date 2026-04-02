/* =====================================================
    TOUFIK GAFUR SHAIKH — Portfolio JavaScript
   ===================================================== */

(function () {
    document.body.classList.add('loading');
    const bar = document.querySelector('.preloader-bar');
    const pct = document.getElementById('preloaderPercent');
    let p = 0;
    const id = setInterval(() => {
        p += Math.random() * 18;
        if (p >= 100) { p = 100; clearInterval(id); finish(); }
        bar.style.setProperty('--p', p + '%');
        pct.textContent = Math.round(p) + '%';
    }, 120);

    function finish() {
        setTimeout(() => {
            document.getElementById('preloader').classList.add('done');
            document.body.classList.remove('loading');
            triggerReveal();
        }, 400);
    }
})();

const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
});

(function animateCursor() {
    fx += (mx - fx) * 0.1;
    fy += (my - fy) * 0.1;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animateCursor);
})();

const hoverEls = document.querySelectorAll(
    'a, button, .project-item, .skill-card, .copy-btn'
);
hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        follower.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        follower.classList.remove('hovered');
    });
});

const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    });
});

(function setupGrid() {
    const canvas = document.getElementById('gridCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const step = 60;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.5;

        for (let x = 0; x <= canvas.width; x += step) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y <= canvas.height; y += step) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        for (let x = 0; x <= canvas.width; x += step) {
            for (let y = 0; y <= canvas.height; y += step) {
                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
            }
        }
    }

    window.addEventListener('resize', resize);
    resize();

    document.addEventListener('mousemove', e => {
        const dx = (e.clientX / window.innerWidth - 0.5) * 10;
        const dy = (e.clientY / window.innerHeight - 0.5) * 10;
        canvas.style.transform = `translate(${dx}px, ${dy}px)`;
    });
})();

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const revealEls = document.querySelectorAll('.reveal-up');

function triggerReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
}

if (!document.getElementById('preloader') ||
    document.getElementById('preloader').classList.contains('done')) {
    triggerReveal();
}

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(bar => {
                bar.classList.add('animated');
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(c => skillObserver.observe(c));

document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.dataset.copy;
        navigator.clipboard.writeText(text).then(() => {
            const span = btn.querySelector('span');
            const orig = span.textContent;
            btn.classList.add('copied');
            span.textContent = 'Copied!';
            setTimeout(() => {
                btn.classList.remove('copied');
                span.textContent = orig;
            }, 2000);
        });
    });
});

document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mousemove', e => {
        const rect = item.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
        item.style.transform = `translate(${x}px, ${y}px)`;
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = '';
    });
});

const floatingTags = document.querySelector('.floating-tags');
if (floatingTags) {
    floatingTags.addEventListener('mouseenter', () => {
        floatingTags.style.animationPlayState = 'paused';
        floatingTags.querySelectorAll('.ftag').forEach(t => {
            t.style.animationPlayState = 'paused';
        });
    });
    floatingTags.addEventListener('mouseleave', () => {
        floatingTags.style.animationPlayState = 'running';
        floatingTags.querySelectorAll('.ftag').forEach(t => {
            t.style.animationPlayState = 'running';
        });
    });
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.style.color = 'var(--accent)';
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

(function glowName() {
    const lines = document.querySelectorAll('.hero-name .line');
    lines.forEach(line => {
        const letters = line.textContent;
        if (line.children.length === 0) {
            line.innerHTML = [...letters].map(l =>
                l === ' ' ? ' ' : `<span class="gl">${l}</span>`
            ).join('');
        } else {
            const text = line.firstChild.textContent;
            const wrapped = [...text].map(l =>
                l === ' ' ? ' ' : `<span class="gl">${l}</span>`
            ).join('');
            line.firstChild.replaceWith(
                Object.assign(document.createElement('span'), { innerHTML: wrapped })
            );
        }
    });

    const style = document.createElement('style');
    style.textContent = `
    .gl {
      display: inline-block;
      transition: color 0.3s, text-shadow 0.3s;
    }
    .hero-name:hover .gl {
      color: transparent;
      -webkit-text-stroke: 1.5px var(--text);
    }
    .hero-name:hover .gl:nth-child(odd) {
      color: var(--accent);
      -webkit-text-stroke: 0;
      text-shadow: 0 0 20px rgba(232,255,71,0.6);
    }
  `;
    document.head.appendChild(style);
})();

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, i) => {
        const speed = (i + 1) * 0.08;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
    });

    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
        heroContent.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
    }
});

(function typingEffect() {
    const el = document.querySelector('.hero-sub');
    if (!el) return;
    const original = el.innerHTML;
    el.innerHTML = '';
    let revealed = false;

    function reveal() {
        if (revealed) return;
        revealed = true;
        el.innerHTML = original;
        el.style.opacity = '0';
        el.style.animation = 'none';

        let i = 0;
        const text = el.textContent;
        el.innerHTML = '';
        el.style.opacity = '1';

        const chars = text.split('');
        el.style.minHeight = '60px';

        function tick() {
            if (i < chars.length) {
                const span = document.createElement('span');
                span.textContent = chars[i] === '\n' ? '' : chars[i];
                if (chars[i] === '\n') { el.appendChild(document.createElement('br')); }
                else { el.appendChild(span); }
                i++;
                setTimeout(tick, 18);
            }
        }
        setTimeout(tick, 800);
    }

    document.getElementById('preloader').addEventListener('transitionend', reveal);
    setTimeout(reveal, 2000);
})();