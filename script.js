// Étape 1: Simulation de la base de données
// On crée des données de départ pour tester

let communes = [
    { Id_Commune: 1, Nom_Commune: "Casablanca", Nb_Habitants: 4000000, Distance_Agence: 5 },
    { Id_Commune: 2, Nom_Commune: "Rabat", Nb_Habitants: 1800000, Distance_Agence: 90 }
];

let quartiers = [
    { Id_Quartier: 1, Nom_Quartier: "Maârif", Id_Commune: 1 },
    { Id_Quartier: 2, Nom_Quartier: "Anfa", Id_Commune: 1 },
    { Id_Quartier: 3, Nom_Quartier: "Agdal", Id_Commune: 2 }
];

let typeLogements = [
    { Id_Type: 1, Libelle_Type: "Studio", Charges_Forfaitaires: 30.00 },
    { Id_Type: 2, Libelle_Type: "T2", Charges_Forfaitaires: 50.00 },
    { Id_Type: 3, Libelle_Type: "Maison", Charges_Forfaitaires: 100.00 }
];

let logements = [
    { Id_Logement: 1, Adresse: "12 Rue de la Liberté", Superficie: 35, Loyer_Base: 400.00, Id_Type: 1, Id_Quartier: 1 },
    { Id_Logement: 2, Adresse: "55 Boulevard d'Anfa", Superficie: 70, Loyer_Base: 750.00, Id_Type: 2, Id_Quartier: 2 },
    { Id_Logement: 3, Adresse: "8 Avenue de France", Superficie: 80, Loyer_Base: 800.00, Id_Type: 2, Id_Quartier: 3 },
];

let individus = [
    { Id_Individu: 1, Nom: "Alaoui", Prenom: "Ahmed", Date_Naissance: "1990-05-15", Num_Telephone: "0661000001" },
    { Id_Individu: 2, Nom: "Bennani", Prenom: "Fatima", Date_Naissance: "1995-11-20", Num_Telephone: "0662000002" }
];

let contrats = [
    { Id_Contrat: 1, Id_Logement: 2, Id_Individu: 1 } // Ahmed loue le logement 2
];


// Étape 2: Fonctions pour afficher les données (Render Functions)

function renderAll() {
    renderLogements();
    renderIndividus();
    populateSelects();
}

function renderLogements() {
    const container = document.getElementById('liste-logements');
    container.innerHTML = ''; // Vider la liste avant de la remplir

    logements.forEach(logement => {
        // Trouver les informations liées (type, quartier, commune)
        const type = typeLogements.find(t => t.Id_Type === logement.Id_Type);
        const quartier = quartiers.find(q => q.Id_Quartier === logement.Id_Quartier);
        const commune = communes.find(c => c.Id_Commune === quartier.Id_Commune);

        const loyerTotal = logement.Loyer_Base + type.Charges_Forfaitaires;

        // Vérifier si le logement a un contrat
        const contrat = contrats.find(c => c.Id_Logement === logement.Id_Logement);
        let locataireInfo = '<p class="vacant">Statut : Libre</p>';
        if (contrat) {
            const locataire = individus.find(i => i.Id_Individu === contrat.Id_Individu);
            locataireInfo = `<p class="locataire-info">Loué par : ${locataire.Prenom} ${locataire.Nom}</p>`;
        }

        const card = `
            <div class="card">
                <h3>${type.Libelle_Type} - ${logement.Adresse}</h3>
                <p><strong>Quartier :</strong> ${quartier.Nom_Quartier}, ${commune.Nom_Commune}</p>
                <p><strong>Superficie :</strong> ${logement.Superficie} m²</p>
                <p><strong>Loyer Total :</strong> ${loyerTotal} €/mois</p>
                ${locataireInfo}
            </div>
        `;
        container.innerHTML += card;
    });
}

function renderIndividus() {
    const container = document.getElementById('liste-individus');
    container.innerHTML = '';
    
    individus.forEach(individu => {
         const contrat = contrats.find(c => c.Id_Individu === individu.Id_Individu);
         let logementInfo = '<p class="vacant">Ne loue aucun logement actuellement.</p>';
         if(contrat) {
             const logement = logements.find(l => l.Id_Logement === contrat.Id_Logement);
             logementInfo = `<p class="locataire-info">Loue le logement : ${logement.Adresse}</p>`;
         }

         const card = `
            <div class="card">
                <h3>${individu.Prenom} ${individu.Nom}</h3>
                <p><strong>Date de naissance :</strong> ${individu.Date_Naissance}</p>
                <p><strong>Téléphone :</strong> ${individu.Num_Telephone}</p>
                ${logementInfo}
            </div>
        `;
        container.innerHTML += card;
    });
}


// Étape 3: Fonctions pour remplir les listes déroulantes (select)

function populateSelects() {
    // Remplir les types et quartiers pour le formulaire d'ajout de logement
    const typeSelect = document.getElementById('logement-type');
    typeSelect.innerHTML = '<option value="">-- Choisir un type --</option>';
    typeLogements.forEach(t => {
        typeSelect.innerHTML += `<option value="${t.Id_Type}">${t.Libelle_Type}</option>`;
    });

    const quartierSelect = document.getElementById('logement-quartier');
    quartierSelect.innerHTML = '<option value="">-- Choisir un quartier --</option>';
    quartiers.forEach(q => {
        quartierSelect.innerHTML += `<option value="${q.Id_Quartier}">${q.Nom_Quartier}</option>`;
    });
    
    // Remplir les individus et logements disponibles pour créer un contrat
    const individuSelect = document.getElementById('contrat-individu');
    individuSelect.innerHTML = '<option value="">-- Choisir un locataire --</option>';
    const individusDisponibles = individus.filter(i => !contrats.some(c => c.Id_Individu === i.Id_Individu));
    individusDisponibles.forEach(i => {
        individuSelect.innerHTML += `<option value="${i.Id_Individu}">${i.Prenom} ${i.Nom}</option>`;
    });

    const logementSelect = document.getElementById('contrat-logement');
    logementSelect.innerHTML = '<option value="">-- Choisir un logement --</option>';
    const logementsDisponibles = logements.filter(l => !contrats.some(c => c.Id_Logement === l.Id_Logement));
    logementsDisponibles.forEach(l => {
        logementSelect.innerHTML += `<option value="${l.Id_Logement}">${l.Adresse}</option>`;
    });
}

// Étape 4: Gérer les soumissions de formulaires

document.getElementById('form-add-logement').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche la page de se recharger
    
    const newLogement = {
        Id_Logement: logements.length > 0 ? Math.max(...logements.map(l => l.Id_Logement)) + 1 : 1,
        Adresse: document.getElementById('logement-adresse').value,
        Superficie: parseInt(document.getElementById('logement-superficie').value),
        Loyer_Base: parseFloat(document.getElementById('logement-loyer').value),
        Id_Type: parseInt(document.getElementById('logement-type').value),
        Id_Quartier: parseInt(document.getElementById('logement-quartier').value)
    };
    
    logements.push(newLogement);
    this.reset(); // Vider le formulaire
    renderAll();
});

document.getElementById('form-add-individu').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newIndividu = {
        Id_Individu: individus.length > 0 ? Math.max(...individus.map(i => i.Id_Individu)) + 1 : 1,
        Nom: document.getElementById('individu-nom').value,
        Prenom: document.getElementById('individu-prenom').value,
        Date_Naissance: document.getElementById('individu-date').value,
        Num_Telephone: document.getElementById('individu-tel').value
    };
    
    individus.push(newIndividu);
    this.reset();
    renderAll();
});

document.getElementById('form-add-contrat').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newContrat = {
        Id_Contrat: contrats.length > 0 ? Math.max(...contrats.map(c => c.Id_Contrat)) + 1 : 1,
        Id_Logement: parseInt(document.getElementById('contrat-logement').value),
        Id_Individu: parseInt(document.getElementById('contrat-individu').value)
    };

    if(newContrat.Id_Logement && newContrat.Id_Individu) {
        contrats.push(newContrat);
        this.reset();
        renderAll();
    } else {
        alert("Veuillez sélectionner un logement et un locataire.");
    }
});


// Étape 5: Lancer l'application au chargement de la page
document.addEventListener('DOMContentLoaded', renderAll);