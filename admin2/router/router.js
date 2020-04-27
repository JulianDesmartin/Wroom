
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let SponsorController = require('./../controllers/SponsorController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Connex);
    app.get('/accueil', HomeController.Connex);
    app.get('/accueil/connexion', HomeController.Connex);
    app.post('/accueil/connexion',HomeController.SeConnecter);


// pilotes
    app.get('/pilotesAdmin', PiloteController.ListerPilote);
    app.get('/pilotesAdmin/ajouterPilote', PiloteController.ListerInfoAjout);
    app.post('/pilotesAdmin/piloteAjouter', PiloteController.AjoutPil);
    app.get('/pilotesAdmin/supprimerPilote/:pilnum', PiloteController.SupprPil);
    app.get('/pilotesAdmin/modifierPilote/:pilote', PiloteController.ListerInfoPil);
    app.post('/pilotesAdmin/piloteModifier', PiloteController.ModifierPil);

 // circuits
   app.get('/circuitsAdmin', CircuitController.ListerCircuit);
   app.get('/circuitsAdmin/ajouterCircuit', CircuitController.ListerInfoAjout);
   app.post('/circuitsAdmin/circuitAjouter', CircuitController.AjoutCir);
   app.get('/circuitsAdmin/supprimerCircuit/:cirnum', CircuitController.SupprCir);
   app.get('/circuitsAdmin/modifierCircuit/:circuit', CircuitController.ListerInfoCir);
   app.post('/circuitsAdmin/circuitModifier', CircuitController.ModifierCir);

// Ecuries
   app.get('/ecuriesAdmin', EcurieController.ListerEcurie);
   app.get('/ecuriesAdmin/ajouterEcurie', EcurieController.ListerInfoAjout);
   app.post('/ecuriesAdmin/ecurieAjouter', EcurieController.AjoutEcu);
   app.get('/ecuriesAdmin/supprimerEcurie/:ecunum', EcurieController.SupprEcu);
   app.get('/ecuriesAdmin/modifierEcurie/:ecurie', EcurieController.ListerInfoEcu);
   app.post('/ecuriesAdmin/ecurieModifier', EcurieController.ModifierEcu);

 //Résultats
   app.get('/resultatsAdmin', ResultatController.ListerResultat);
   app.post('/resultatsAdmin/resultatSaisie', ResultatController.ListerResultatGP);
   app.post('/resultatsAdmin/scoreAjouter', ResultatController.AjoutScore);
   app.get('/resultatsAdmin/supprimerScore/:gpnum/:pilnum', ResultatController.SupprScore);

 //Sponsors
   app.get('/sponsorsAdmin', SponsorController.ListerSponsor);
   app.get('/sponsorsAdmin/ajouterSponsor', SponsorController.ListerInfoAjout);
   app.post('/sponsorsAdmin/sponsorAjouter', SponsorController.AjoutSpo);
   app.get('/sponsorsAdmin/supprimerSponsor/:sponum', SponsorController.SupprSpo);
   app.get('/sponsorsAdmin/modifierSponsor/:sponsor', SponsorController.ListerInfoSpo);
   app.post('/sponsorsAdmin/sponsorModifier', SponsorController.ModifierSpo);

// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
