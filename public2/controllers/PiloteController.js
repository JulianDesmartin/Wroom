let model = require('../models/pilote.js');
let model2 = require('../models/photo.js');
let async = require("async");

module.exports.ListerLettre = function(request, response){
   response.title = 'Liste des lettres';
    model.getListeLettre( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeLettre = result;
        //console.log(result);
response.render('repertoirePilotes', response);
});}

module.exports.ListerPilote = function(request, response){
   let data = request.params.lettre;
   response.title = 'Pilote dont le nom commence par'+data;
   async.parallel ([
     function (callback){
         model.getListeLettre( function (err, result){callback(null,result)});
     },
     function (callback){
         model.getListePilote(data, (function (errPil, resultPil){callback(null,resultPil)}));
     },

   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listePilote = result[0];
      response.data=result[1];
      console.log(result);
      response.render('repertoirePilotes', response);
    }
 );
};

module.exports.ListerPiloteDet = function(request, response){
   let piloteDet = request.params.pilote;
   let sponsor = request.params.pilote;
   let photo = request.params.pilote;
   response.title = 'Detail de '+ piloteDet;
   async.parallel ([
     function (callback){
         model.getListeLettre( function (err, result){callback(null,result)});
     },
     function (callback){
         model.getListePiloteDet(piloteDet, (function (errPil, resultPil){callback(null,resultPil)}));
     },
     function (callback){
         model.getListeSponsor(sponsor, (function (errPil, resultPil){callback(null,resultPil)}));
     },
     function (callback){
         model.getListePhoto(photo, (function (errPil, resultPil){callback(null,resultPil)}));
     },

   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listePilote = result[0];
      response.piloteDet=result[1][0];
      response.sponsor=result[2];
      response.photo=result[3];
      console.log(result);
      response.render('repertoirePilotes', response);
    }
 );
};
