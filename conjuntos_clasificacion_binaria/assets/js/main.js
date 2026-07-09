// main.js - Funcionalidades adicionales

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('¡Copiado al portapapeles!');
    }).catch(() => {
        alert('No se pudo copiar automáticamente.');
    });
}

function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        animation: fadeInOut ${duration}ms ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
}

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.dataset-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
});

document.querySelectorAll('.dataset-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.closest('a')) return;
        const link = card.querySelector('.card-link');
        if (link) window.location.href = link.href;
    });
});

document.querySelectorAll('.metric').forEach(metric => {
    metric.addEventListener('click', () => {
        const label = metric.querySelector('.metric-label')?.innerText;
        const value = metric.querySelector('.metric-value')?.innerText;
        if (label && value) {
            showToast(`${label}: ${value}`);
        }
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(20px); }
        15% { opacity: 1; transform: translateY(0); }
        85% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

window.copyToClipboard = copyToClipboard;
window.showToast = showToast;
