let model = require('../models/ecurie.js');
let async = require("async");

   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response){
  let ecurie = request.params.ecurie;
   response.title = 'Liste des écuries';
    async.parallel ([
      function (callback){
        model.getListeEcurie( function (err, result){callback(null,result)});
      },
      function (callback){
          model.getEcurieDet(ecurie, (function (errPil, resultPil){callback(null,resultPil)}));
      },
      function (callback){
          model.getEcuriePilote(ecurie, (function (errPil, resultPil){callback(null,resultPil)}));
      },
      function (callback){
          model.getEcurieVehicule(ecurie, (function (errPil, resultPil){callback(null,resultPil)}));
      },
    ],
     function (err, result){
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
        response.listeEcurie = result[0];
        response.ecurieDet = result[1][0];
        response.pilote = result[2];
        response.vehicule = result[3];
        console.log(result[2]);

response.render('listerEcurie', response);
});
}
