let db = require('../configDb');


module.exports.getListeLettre = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT DISTINCT SUBSTR(PILNOM,1,1) as lettre FROM pilote order by PILNOM";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getListePilote = function (data, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT PILNOM, PILPRENOM, PHOADRESSE, pi.PILNUM FROM pilote pi JOIN photo po ON pi.PILNUM = po.PILNUM";
						sql = sql + " WHERE PILNOM LIKE '" + data;
						sql = sql + "%' AND PHOSUJET LIKE 'Photo identité'";
						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
       });
 };

 module.exports.getListePiloteDet = function (data, callback) {
    // connection à la base
 	db.getConnection(function(err, connexion){
         if(!err){
						/* sql :
						SELECT PILNOM, PILPRENOM, PILDATENAIS, PAYNOM, PILPOIDS, PILTAILLE, PHOADRESSE, SPONOM, SPOSECTACTIVITE, PILTEXTE, ECUNOM
						FROM pilote pi
						JOIN photo po ON pi.PILNUM = po.PILNUM
						JOIN sponsorise spr ON pi.PILNUM = spr.PILNUM
						JOIN sponsor spo ON spr.SPONUM = spo.SPONUM
						JOIN pays pa ON pi.PAYNUM = pa.PAYNUM
						WHERE PILNOM LIKE 'Räikkönen'
						AND PHOSUJET LIKE 'Photo identité'
						*/

 						let sql ="SELECT DISTINCT PILNOM, PILPRENOM, PILDATENAIS, PAYNOM, PILPOIDS, PILTAILLE, PHOADRESSE, SPONOM, SPOSECTACTIVITE, PILTEXTE, ECUNOM";
						sql = sql + " FROM pilote pi ";
						sql = sql + "	LEFT JOIN photo po ON pi.PILNUM = po.PILNUM";
						sql = sql + " LEFT JOIN sponsorise spr ON pi.PILNUM = spr.PILNUM";
						sql = sql + " LEFT JOIN sponsor spo ON spr.SPONUM = spo.SPONUM";
						sql = sql + " LEFT JOIN pays pa ON pi.PAYNUM = pa.PAYNUM";
						sql = sql + " LEFT JOIN ecurie e ON pi.ECUNUM = e.ECUNUM";
 						sql = sql + " WHERE pi.PILNUM = '" + data;
 						sql = sql + "' AND PHOSUJET LIKE 'Photo identité'"
 						console.log (sql);
             connexion.query(sql, callback);

             // la connexion retourne dans le pool
             connexion.release();
          }
        });
  };

	module.exports.getListePhoto = function (data, callback) {
		 // connection à la base
	 db.getConnection(function(err, connexion){
					if(!err){

						 let sql = "SELECT PHOADRESSE, PHOSUJET, PHOCOMMENTAIRE";
						 sql = sql + " FROM photo po";
						 sql = sql + " JOIN pilote pi ON po.PILNUM=pi.PILNUM";
						 sql = sql + " WHERE pi.PILNUM = '" + data;
						 sql = sql + "' AND PHOSUJET NOT LIKE 'Photo identité'"
						 console.log (sql);
							connexion.query(sql, callback);

							// la connexion retourne dans le pool
							connexion.release();
					 }
				 });
	 };

	 module.exports.getListeSponsor = function (data, callback) {
			// connection à la base
		db.getConnection(function(err, connexion){
					 if(!err){
/*
SELECT SPONOM, SPOSECTACTIVITE FROM sponsor spo
JOIN sponsorise spr ON spo.SPONUM = spr.SPONUM
JOIN pilote pi ON spr.PILNUM=pi.PILNUM
WHERE pi.PILNOM LIKE 'Räikkönen'

*/


							let sql = "SELECT SPONOM, SPOSECTACTIVITE";
							sql = sql + " FROM sponsor spo";
							sql = sql + " JOIN sponsorise spr ON spo.SPONUM = spr.SPONUM";
							sql = sql + " JOIN pilote pi ON spr.PILNUM=pi.PILNUM";
							sql = sql + " WHERE pi.PILNUM = '" + data;
							sql = sql + "'"
							console.log (sql);
							 connexion.query(sql, callback);

							 // la connexion retourne dans le pool
							 connexion.release();
						}
					});
		};
