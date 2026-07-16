// Grille tarifaire détaillée de Connexion Digitale 237
const prices = {
    // Services Agence & Formations
    logo: 25000,          // Identité Visuelle
    communication: 40000,  // Community Management
    publicite: 30000,      // Campagnes Ads
    website: 150000,       // Site Web
    formation: 50000,      // Formations digitales
    import: 35000,         // Importation Chine

    // Services Cybercafé & Rédaction de documents
    cv_fr: 1500,           // CV en Français
    cv_en: 3000,           // CV en Anglais
    cv_ca: 5000,           // CV Canadien
    cv_other: 5000,        // CV Autre Langue Officielle Étrangère
    motivation: 1000       // Lettre de motivation
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

    // Affichage du montant formaté
    totalPriceEl.innerText = total.toLocaleString('fr-FR') + ' FCFA';
    
    updateWhatsAppLink(total);
}

// Mise à jour du message envoyé sur votre numéro WhatsApp
function updateWhatsAppLink(total) {
    const clientName = clientNameInput.value.trim() || "un client";
    
    if (selectedServices.length === 0) {
        whatsappBtn.style.display = 'none';
        return;
    }
    
    whatsappBtn.style.display = 'block';

    // Votre vrai numéro de l'agence Connexion Digitale 237 (sans le +)
    const myPhoneNumber = "237691850125"; 
    
    const message = `Bonjour Connexion Digitale 237, je m'appelle ${clientName}. Je souhaite commander les services suivants :\n- ${selectedServices.join('\n- ')}\n\nMontant estimatif total : ${total.toLocaleString('fr-FR')} FCFA. Pouvons-nous caler les détails ?`;
    
    const encodedMessage = encodeURIComponent(message);
    whatsappBtn.href = `https://wa.me/${myPhoneNumber}?text=${encodedMessage}`;
}

// Écouter les saisies du client
clientNameInput.addEventListener('input', () => {
    calculateTotal();
});

// Initialisation
calculateTotal();