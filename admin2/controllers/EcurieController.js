let model = require('../models/ecurie.js');
let async = require("async");

module.exports.ListerEcurie = function(request, response){
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
      //console.log(result[0]);
      response.render('ecuriesAdmin', response);
    }
 );
};

module.exports.ListerInfoAjout = function(request, response){
   response.title = 'Liste des pays';
   async.parallel ([
     function (callback){
         model.getListePays(function (errPil, resultPil){callback(null,resultPil)});
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listePays = result[0];
      //console.log(result[1]);
      response.render('ecuriesAdmin', response);
    }
 );
};

module.exports.ListerInfoEcu = function(request, response){
  let data = request.params.ecurie;
   response.title = 'Info ecurie';
   async.parallel ([
     function (callback){
         model.getInfoEcu(data, (function (errPil, resultPil){callback(null,resultPil)}));
     },
     function (callback){
         model.getListePays(function (errPil, resultPil){callback(null,resultPil)});
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.detailEcu = result[0][0];
      response.listePays2 = result[1];
      //console.log(result[0]);
      response.render('ecuriesAdmin', response);
    }
 );
};

module.exports.AjoutEcu = function(request, response){
   response.title = 'Ajout Ecurie';
   let imageAdr = request.files.stpmarche.name;

   let data = {
     "ecunom":request.body.nom,
     "ecunomdir":request.body.dir,
		 "ecuadrsiege":request.body.adr,
		 "ecupoints":request.body.points,
     "paynum":request.body.pays,
     "ecuadresseimage":imageAdr,
   };
   async.parallel ([
     function (callback){
       let image = request.files.stpmarche;
       image.mv("../public/public/image/ecurie/" + imageAdr);
       callback(null);
     },
     function (callback){
         model.newEcurie(data, (function (errPil, resultPil){callback(null,resultPil)}));
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      //console.log(result[1]);
      response.render('ecuriesAdmin', response);
    }
 );
};

module.exports.ModifierEcu = function(request, response){
   response.title = 'Modification ecurie';

   let imageName2;
   if (null != request.files){
     imageName2 = request.files.stpmarche.name;
   } else {
     imageName2 = request.body.adrImage;
   }

   let data = {
		 "ecunom":request.body.nom,
     "ecunomdir":request.body.dir,
		 "ecuadrsiege":request.body.adr,
		 "ecupoints":request.body.points,
     "paynum":request.body.pays,
     "ecuadresseimage":imageName2,
     "ecunum":request.body.numecu,
   };

   async.parallel ([
     function (callback){
       if (null != request.files){
         let image = request.files.stpmarche;
         image.mv("../public/public/image/ecurie/" + imageName2);
       }
        callback(null);
     },
     function (callback){
         model.modifEcurie(data, (function (errPil, resultPil){callback(null,resultPil)}));
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      //console.log(result[1]);
      response.render('ecuriesAdmin', response);
    }
 );
};

module.exports.SupprEcu = function(request, response){
   response.title = 'Supprimer circuit';
   let data = request.params.ecunum;

   async.parallel ([
     function (callback){
         model.supprimerEcu(data, (function (errPil, resultPil){callback(null,resultPil)}));
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      //console.log(result[1]);
      response.render('ecuriesAdmin', response);
    }
 );
};
