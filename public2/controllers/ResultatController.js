let model = require('../models/resultat.js');
let async = require("async");

module.exports.ListerResultat = function(request, response){
  let resultat = request.params.resultat;
   response.title = 'Liste des grands prix';
    async.parallel ([
      function (callback){
        model.getListeResultat( function (err, result){callback(null,result)});
      },
      function (callback){
          model.getResultatGP(resultat, (function (errPil, resultPil){callback(null,resultPil)}));
      },
      function (callback){
          model.getInfoSup(resultat, (function (errPil, resultPil){callback(null,resultPil)}));
      },
    ],
     function (err, result){
       if (err) {
           console.log(err);
           return;
       }
        response.listeResultat = result[0];
        response.tabResult = result[1];
        response.infoSup = result[2][0];
        //response.vehicule = result[3];
        console.log(result[1]);

response.render('listerResultat', response);
});
}
