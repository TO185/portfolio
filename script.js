// Copy email functionality
document.getElementById('copyEmail').addEventListener('click', function() {
    const email = document.getElementById('email').textContent;
    
    navigator.clipboard.writeText(email)
        .then(() => {
            // Visual feedback
            const button = document.getElementById('copyEmail');
            const originalText = button.textContent;
            button.textContent = '✅ Copied!';
            button.style.background = '#10b981';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '#06b6d4';
            }, 2000);
        })
        .catch(() => {
            alert('❌ Copy failed — please select and copy manually: ' + email);
        });
});

// Optional: Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Optional: Console greeting
console.log('🚀 Toufik Gafur Shaikh Portfolio — Thanks for visiting!');
