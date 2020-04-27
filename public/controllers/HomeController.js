
module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};


let model = require('../models/resultat.js');
let async = require("async");

module.exports.TrouverDernierResultat = function(request, response){
  //let resultat = request.params.resultat;
   response.title = 'Dernier résultat';
    async.parallel ([
      function (callback){
        model.getLastResult( function (err, result){callback(null,result);});
      }
    ],
     function (err, result){
       if (err) {
           console.log(err);
           return;
       }
        response.dernierResultat = result[0];
        console.log(result[0]);

response.render('home', response);
});
}
