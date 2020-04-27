let model = require('../models/resultat.js');
let async = require("async");

module.exports.ListerResultat = function(request, response){
   response.title = 'Liste des grands prix';
    async.parallel ([
      function (callback){
        model.getListeResultat( function (err, result){callback(null,result)});
      }
    ],
     function (err, result){
       if (err) {
           console.log(err);
           return;
       }
        response.listeResultat = result[0];
        console.log(result[0]);

response.render('resultatsAdmin', response);
});
}

module.exports.ListerResultatGP = function(request, response){

  let data = {
    "gpnum":request.body.gp,
  };
   response.title = 'Liste des grands prix';
    async.parallel ([
      function (callback){
          model.getResultatGP(data, (function (errPil, resultPil){callback(null,resultPil)}));
      },
      function (callback){
          model.getPilote(function (errPil, resultPil){callback(null,resultPil)});
      },
      function (callback){
          model.getPoints(function (errPil, resultPil){callback(null,resultPil)});
      }
    ],
     function (err, result){
       if (err) {
           console.log(err);
           return;
       }

       let tablePoint = result[0];
       tablePoint.forEach(function(item, i){
         item.score = result[2][i]
       }, this);


        response.result = tablePoint//result[0];
        response.pilote = result[1];
        response.gpnum = result[0][0];
        //response.point = tablePoint;
        //console.log(result[1]);

response.render('resultatsAdmin', response);
});
}

module.exports.AjoutScore = function(request, response){
   response.title = 'Ajout Resultat';


   let data = {
     "pilnum":request.body.pilote,
     "m":request.body.minute,
		 "s":request.body.seconde,
		 "ms":request.body.milli,
     "gpnum":request.body.GP,
   };
   async.parallel ([
     function (callback){
         model.newScore(data, (function (errPil, resultPil){callback(null,resultPil)}));
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      //console.log(result[1]);
      response.render('resultatsAdmin', response);
    }
 );
};

module.exports.SupprScore = function(request, response){
   response.title = 'Ajout Resultat';

   let data = {
     "pilnum":request.params.pilnum,
     "gpnum":request.params.gpnum,
   };
   async.parallel ([
     function (callback){
         model.supprimerScore(data, (function (errPil, resultPil){callback(null,resultPil)}));
     }
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.render('resultatsAdmin', response);
    }
 );
};
