let model = require('../models/circuit.js');
let async = require("async");

module.exports.ListerCircuit = function(request, response){
   response.title = 'Liste des circuits';
   async.parallel ([
     function (callback){
         model.getListeCircuit(function (errPil, resultPil){callback(null,resultPil)});
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listeCircuit = result[0];
      //console.log(result[0]);
      response.render('circuitsAdmin', response);
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
      response.render('circuitsAdmin', response);
    }
 );
};

module.exports.ListerInfoCir = function(request, response){
  let data = request.params.circuit;
   response.title = 'Info circuit';
   async.parallel ([
     function (callback){
         model.getInfoCir(data, (function (errPil, resultPil){callback(null,resultPil)}));
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
      response.detailCir = result[0][0];
      response.listePays2 = result[1];
      //console.log(result[0]);
      response.render('circuitsAdmin', response);
    }
 );
};


module.exports.AjoutCir = function(request, response){
   response.title = 'Ajout Circuit';
   let image = request.files.image;
   let imageName = request.files.image.name;
   console.log(request.body.nom);
   let data = {
     "cirnom":request.body.nom,
     "cirlongueur":request.body.long,
     "paynum":request.body.pays,
     "ciradresseimage":imageName,
     "cirnbspectateurs":request.body.spec,
     "cirtexte":request.body.descrip,
   };
   async.parallel ([
     function (callback){
       image.mv("../public/public/image/circuit/" + imageName);
       callback(null);
     },
     function (callback){
         model.newCircuit(data, (function (errPil, resultPil){callback(null,resultPil)}));
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }

      response.render('circuitsAdmin', response);
    }
 );
};

module.exports.ModifierCir = function(request, response){
   response.title = 'Modification circuit';
   console.log(request.body.adrImage);
   let imageName2;
   if (null != request.files){
     imageName2 = request.files.image.name;
     let image = request.files.image;
   } else {
     imageName2 = request.body.adrImage;
   }

   let data = {
     "cirnom":request.body.nom,
     "cirlongueur":request.body.long,
     "paynum":request.body.pays,
     "ciradresseimage":imageName2,
     "cirnbspectateurs":request.body.spec,
     "cirtexte":request.body.descrip,
     "cirnum":request.body.numcir,
   };

   async.parallel ([
     function (callback){
       if (null != request.files){
         image.mv("../public/public/image/circuit/" + imageName2);
       }
        callback(null);
     },
     function (callback){
         model.modifCircuit(data, (function (errPil, resultPil){callback(null,resultPil)}));
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      //console.log(result[1]);
      response.render('circuitsAdmin', response);
    }
 );
};

module.exports.SupprCir = function(request, response){
   response.title = 'Supprimer circuit';
   let data = request.params.cirnum;

   async.parallel ([
     function (callback){
         model.supprimerCir(data, (function (errPil, resultPil){callback(null,resultPil)}));
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      //console.log(result[1]);
      response.render('circuitsAdmin', response);
    }
 );
};
