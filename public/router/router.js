
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.TrouverDernierResultat);
    app.get('/accueil',HomeController.TrouverDernierResultat);

// pilotes
    app.get('/repertoirePilote', PiloteController.ListerLettre);
    app.get('/repertoirePilote', PiloteController.ListerPilote);
    app.get('/repertoirePiloteDet/:lettre',PiloteController.ListerPilote)
    app.get('/repertoirePiloteDet/repertoireDetail/:pilote',PiloteController.ListerPiloteDet)

 // circuits
   app.get('/circuits', CircuitController.ListerCircuit);
   app.get('/circuits/detailCircuit/:circuit', CircuitController.ListerCircuit);

// Ecuries
   app.get('/ecuries', EcurieController.ListerEcurie);
   app.get('/ecuries/detailEcurie/:ecurie', EcurieController.ListerEcurie);

 //Résultats
   app.get('/resultats', ResultatController.ListerResultat);
   app.get('/resultats/detailResult/:resultat', ResultatController.ListerResultat);

// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
