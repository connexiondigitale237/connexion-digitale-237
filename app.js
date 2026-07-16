document.getElementById('whatsappBtn').addEventListener('click', () => {
    const formation = document.getElementById('trainingSelect').value;
    const message = `Bonjour, je souhaite m'inscrire à la formation : ${formation}.
Voici mes infos pour le dossier :
- Nom complet :
- Adresse de livraison :`;
    window.open(`https://wa.me/237652091367?text=${encodeURIComponent(message)}`, '_blank');
});