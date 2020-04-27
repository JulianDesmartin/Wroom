let model = require('../models/resultat.js');
let async = require("async");
let model2 = require('../models/connexion.js');

let Cryptr = require('cryptr');
let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF');


module.exports.Connex = function(request, response){
   response.title = 'connexion en attente';
   response.entraindeseconecter = true;
   response.render('home', response);
};

module.exports.SeConnecter = function(request, response){
   response.title = 'connexion';

   let data = {
     "login":request.body.login,
     "password":request.body.password,
   };

    model2.connect(data, function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
          if(data.login == "admin"){
            let decryptedString = cryptr.decrypt(result[0].PASSWD);
            if(decryptedString == data.password){
              var session = request.session;
              session.connecter = true;
              console.log("1");
              response.render('home', response);
            }else{
              response.erreur = true;
              console.log("2");
              response.render('home', response);
            }
          } else {
            response.erreur = true;
            console.log("3");
            response.render('home', response);
          }
});}

module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};

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
