document.addEventListener('DOMContentLoaded', () => {
    const trainingSelect = document.getElementById('trainingSelect');
    const durationSelect = document.getElementById('durationSelect');
    const whatsappBtn = document.getElementById('whatsappBtn');

    whatsappBtn.addEventListener('click', () => {
        const training = trainingSelect.value;
        const durationOpt = durationSelect.options[durationSelect.selectedIndex];
        const duration = durationOpt.value;
        let price = parseInt(durationOpt.getAttribute('data-price'));
        if (durationOpt.getAttribute('data-discount')) price *= 0.9;

        const message = `Bonjour, je souhaite m'inscrire :
- Service : ${training}
- Durée : ${duration}
- Total : ${price.toLocaleString()} FCFA

Mes informations :
- Nom complet :
- Adresse de livraison :`;

        window.open(`https://wa.me/237652091367?text=${encodeURIComponent(message)}`, '_blank');
    });
});