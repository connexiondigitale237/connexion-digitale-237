// Tarifs de base de l'agence
const prices = {
    logo: 25000,          // 25 000 FCFA
    communication: 40000,  // 40 000 FCFA
    website: 150000        // 150 000 FCFA
};

// Sélection des éléments HTML
const cards = document.querySelectorAll('.service-card');
const totalPriceEl = document.getElementById('total-price');
const whatsappBtn = document.getElementById('whatsapp-btn');
const clientNameInput = document.getElementById('client-name');

let selectedServices = [];

// Écouteur de clic sur les cartes de service
cards.forEach(card => {
    card.addEventListener('click', () => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        
        if (checkbox.checked) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
        
        calculateTotal();
    });
});

// Calcul du devis
function calculateTotal() {
    let total = 0;
    selectedServices = [];

    cards.forEach(card => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            const serviceId = checkbox.value;
            total += prices[serviceId];
            selectedServices.push(card.querySelector('h3').innerText);
        }
    });

    // Affichage avec formatage
    totalPriceEl.innerText = total.toLocaleString('fr-FR') + ' FCFA';
    
    updateWhatsAppLink(total);
}

// Mise à jour dynamique du message WhatsApp
function updateWhatsAppLink(total) {
    const clientName = clientNameInput.value.trim() || "un futur client";
    
    if (selectedServices.length === 0) {
        whatsappBtn.style.display = 'none';
        return;
    }
    
    whatsappBtn.style.display = 'block';

    // Numéro WhatsApp de Connexion Digitale 237 (sans le +)
    const myPhoneNumber = "237691850125"; 
    
    const message = `Bonjour Connexion Digitale 237, je m'appelle ${clientName}. Je viens de faire une estimation sur votre simulateur en ligne et je souhaite un devis pour : \n- ${selectedServices.join('\n- ')}\n\nMontant estimé : ${total.toLocaleString('fr-FR')} FCFA. Merci de me recontacter !`;
    
    const encodedMessage = encodeURIComponent(message);
    whatsappBtn.href = `https://wa.me/${myPhoneNumber}?text=${encodedMessage}`;
}

// Écouter les changements dans le champ de saisie du nom
clientNameInput.addEventListener('input', () => {
    calculateTotal();
});

// Initialisation au chargement
calculateTotal();