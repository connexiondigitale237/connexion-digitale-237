document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const totalPriceEl = document.getElementById('total-price');
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const clientNameInput = document.getElementById('client-name');

    let selectedServices = [];

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const price = parseInt(card.getAttribute('data-price'));
            const name = card.getAttribute('data-name');

            card.classList.toggle('selected');

            if (card.classList.contains('selected')) {
                selectedServices.push({ name, price });
            } else {
                selectedServices = selectedServices.filter(item => item.name !== name);
            }
            calculateTotal();
        });
    });

    clientNameInput.addEventListener('input', () => {
        if (selectedServices.length > 0) calculateTotal();
    });

    function calculateTotal() {
        let total = 0;
        selectedServices.forEach(item => total += item.price);

        totalPriceEl.innerText = total.toLocaleString('fr-FR') + ' FCFA';

        if (selectedServices.length > 0) {
            whatsappBtn.style.display = 'block';
            const client = clientNameInput.value.trim() || "un nouveau client";
            const phone = "237652091367"; // Votre numéro officiel Business

            let servicesText = "";
            selectedServices.forEach(item => {
                servicesText += `\n- ${item.name} (${item.price.toLocaleString('fr-FR')} FCFA)`;
            });

            const msg = `Bonjour Connexion Digitale 237,\n\nJe suis *${client}*.\n\nJe viens de simuler un devis sur l'application pour un montant total estimé à *${total.toLocaleString('fr-FR')} FCFA*.\n\nDétails des services :${servicesText}\n\nJe souhaite valider ma demande. Merci !`;

            whatsappBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        } else {
            whatsappBtn.style.display = 'none';
        }
    }
    // Gestionnaire du Pop-up de paiement (0 FCFA)
    const modal = document.getElementById('payment-modal');
    const modalAmount = document.getElementById('modal-amount');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const totalPriceSpan = document.getElementById('total-price');

    if (whatsappBtn && modal) {
        // On intercepte le clic sur le bouton WhatsApp pour ouvrir le pop-up en premier
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Bloque la redirection immédiate vers WhatsApp
            
            // On récupère le montant calculé en direct
            const currentTotal = totalPriceSpan ? totalPriceSpan.textContent : "0";
            if (modalAmount) {
                modalAmount.textContent = currentTotal.replace(' FCFA', '');
            }
            
            // On affiche le pop-up
            modal.style.display = 'flex';
        });
    }

    if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        
        // 1. Récupération du montant total propre (sans le texte d'accompagnement)
        const totalAmount = currentTotal.replace(' FCFA', '').trim();
        
        // 2. Votre contact WhatsApp Business officiel : 652091367
        const phoneNumber = "237652091367"; 
        
        // 3. Message personnalisé encodé pour l'URL
        const message = encodeURIComponent(`Bonjour Connexion Digitale 237, je viens de faire le transfert de ${totalAmount} FCFA pour ma commande. Voici mon reçu.`);
        
        // 4. Construction du lien et ouverture dans un nouvel onglet
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });
}
});