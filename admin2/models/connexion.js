
let db = require('../configDb');


module.exports.connect = function (data,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						//let sql ="SELECT LOGIN,PASSWD  FROM login WHERE LOGIN = '" + data.login + "' AND PASSWD = '" + data.password +"'";
						let sql ="SELECT LOGIN,PASSWD  FROM login WHERE LOGIN = '" + data.login + "'";
						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
