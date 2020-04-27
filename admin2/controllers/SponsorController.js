let model = require('../models/sponsor.js');
let async = require("async");

module.exports.ListerSponsor = function(request, response){
   response.title = 'Liste des sponsors';
   async.parallel ([
     function (callback){
         model.getListeSponsor(function (errPil, resultPil){callback(null,resultPil)});
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listeSponsor = result[0];
      //console.log(result[0]);
      response.render('sponsorsAdmin', response);
    }
 );
};

module.exports.ListerInfoAjout = function(request, response){
   response.title = 'Liste des ecuries';
   async.parallel ([
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
      response.listeEcurie = result[0];
      //console.log(result[1]);
      response.render('sponsorsAdmin', response);
    }
 );
};

module.exports.ListerInfoSpo = function(request, response){
  let data = request.params.sponsor;
   response.title = 'Info sponsor';
   async.parallel ([
     function (callback){
         model.getInfoSpo(data, (function (errPil, resultPil){callback(null,resultPil)}));
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
      response.detailSpo = result[0][0];
      response.listeEcurie2 = result[1];
      //console.log(result[0]);
      response.render('sponsorsAdmin', response);
    }
 );
};

module.exports.AjoutSpo = function(request, response){
   response.title = 'Ajout Sponsor';

   let data = {
     "sponom":request.body.nom,
     "sposectactivite":request.body.secteur,
   };

   if("null" != request.body.ecurie){
       ecunum = request.body.ecurie;
   }

   async.waterfall ([
     function (callback){
         model.newSponsor(data, (function (errPil, resultPil){callback(null,resultPil)}));
     },
     function (resultPil, callback){
       if("null" != request.body.ecurie){
         let sponum = resultPil.insertId;
         model.newSponsorAvecFin(sponum,ecunum, (function (errPil, resultPil){callback(null,resultPil)}));
       }else{
         callback(null);
       }
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      //console.log(result[1]);
      response.render('sponsorsAdmin', response);
    }
 );
};

module.exports.ModifierSpo = function(request, response){
   response.title = 'Modification sponsor';
   let data = {
     "sponom":request.body.nom,
     "sposectactivite":request.body.secteur,
     "sponum":request.body.numspo,
   };

   async.waterfall ([
     function (callback){
         model.modifSponsor(data, (function (errPil, resultPil){callback(null,resultPil)}));
     },
     function (resultPil, callback){
       if("null" != request.body.ecurie){
         let ecunum = request.body.ecurie;
         model.modifSponsorAvecFin(data,ecunum, (function (errPil, resultPil){callback(null,resultPil)}));
       }else{
         callback(null);
       }
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      //console.log(result[1]);
      response.render('sponsorsAdmin', response);
    }
 );
};

module.exports.SupprSpo = function(request, response){
   response.title = 'Supprimer sponsor';
   let data = request.params.sponum;

   async.parallel ([
     function (callback){
         model.supprimerSpoFin(data, (function (errPil, resultPil){callback(null,resultPil)}));
     },
     function (callback){
         model.supprimerSpo(data, (function (errPil, resultPil){callback(null,resultPil)}));
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      //console.log(result[1]);
      response.render('sponsorsAdmin', response);
    }
 );
};
