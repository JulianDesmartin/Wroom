let model = require('../models/pilote.js');
let model2 = require('../models/photo.js');
let async = require("async");

module.exports.ListerPilote = function(request, response){
   response.title = 'Liste des pilotes';
   async.parallel ([
     function (callback){
         model.getListePilote(function (errPil, resultPil){callback(null,resultPil)});
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listePilote = result[0];
      //console.log(result[0]);
      response.render('pilotesAdmin', response);
    }
 );
};

module.exports.ListerInfoAjout = function(request, response){
   response.title = 'Liste des pays et ecurie';
   async.parallel ([
     function (callback){
         model.getListePays(function (errPil, resultPil){callback(null,resultPil)});
     },
     function (callback){
         model.getListeEcurie(function (errPil, resultPil){callback(null,resultPil)});
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listePays = result[0];
      response.listeEcurie = result[1];
      //console.log(result[1]);
      response.render('pilotesAdmin', response);
    }
 );
};

module.exports.ListerInfoPil = function(request, response){
  let data = request.params.pilote;
   response.title = 'Info pilote';
   async.parallel ([
     function (callback){
         model.getInfoPil(data, (function (errPil, resultPil){callback(null,resultPil)}));
     },
     function (callback){
         model.getListePays(function (errPil, resultPil){callback(null,resultPil)});
     },
     function (callback){
         model.getListeEcurie(function (errPil, resultPil){callback(null,resultPil)});
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.detailPil = result[0][0];
      response.listePays2 = result[1];
      response.listeEcurie2 = result[2];
      response.jour = result[0][0].PILDATENAIS.split("/")[0];
      response.mois = result[0][0].PILDATENAIS.split("/")[1];
      response.année = result[0][0].PILDATENAIS.split("/")[2];
      //console.log(result[0]);
      response.render('pilotesAdmin', response);
    }
 );
};

module.exports.AjoutPil = function(request, response){
   response.title = 'Ajout pilote';
   let data = {
     "pilprenom":request.body.pre,
     "pilnom":request.body.nom,
     "pildatenais":request.body.jour + "/" + request.body.mois + "/" +request.body.année,
     "paynum":request.body.pays,
     "ecunum":request.body.ecurie,
     "pilpoints":request.body.point,
     "pilpoids":request.body.poid,
     "piltaille":request.body.taille,
     "piltexte":request.body.descrip,
   };

   async.parallel ([
     function (callback){
         model.newPilote(data, (function (errPil, resultPil){callback(null,resultPil)}));
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      //console.log(result[1]);
      response.render('pilotesAdmin', response);
    }
 );
};

module.exports.ModifierPil = function(request, response){
   response.title = 'Modification pilote';
   let data = {
     "pilprenom":request.body.pre,
     "pilnom":request.body.nom,
     "pildatenais":request.body.jour + "/" + request.body.mois + "/" +request.body.année,
     "paynum":request.body.pays,
     "ecunum":request.body.ecurie,
     "pilpoints":request.body.point,
     "pilpoids":request.body.poid,
     "piltaille":request.body.taille,
     "piltexte":request.body.descrip,
     "pilnum":request.body.numpil,
   };

   async.parallel ([
     function (callback){
         model.modifPilote(data, (function (errPil, resultPil){callback(null,resultPil)}));
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      //console.log(result[1]);
      response.render('pilotesAdmin', response);
    }
 );
};

module.exports.SupprPil = function(request, response){
   response.title = 'Supprimer pilote';
   let data = request.params.pilnum;

   async.parallel ([
     function (callback){
         model.supprimerPil(data, (function (errPil, resultPil){callback(null,resultPil)}));
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      //console.log(result[1]);
      response.render('pilotesAdmin', response);
    }
 );
};
