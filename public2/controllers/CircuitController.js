let model = require('../models/circuit.js');
let async = require("async");


module.exports.ListerCircuit = function(request, response){
   let circuit = request.params.circuit;
   response.title = 'circuit ' ;//+ data;
   async.parallel ([
     function (callback){
         model.getListePays( function (err, result){callback(null,result)});
     },
     function (callback){
         model.getCircuitDet(circuit, (function (errPil, resultPil){callback(null,resultPil)}));
     },
   ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listePays = result[0];
      response.circuit=result[1];
      console.log(result[1]);
      response.render('listerCircuit', response);
    }
 );
};
