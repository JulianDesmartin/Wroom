let db = require('../configDb');


module.exports.getListeSponsor = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT SPONUM, SPONOM, SPOSECTACTIVITE FROM sponsor ORDER BY SPONOM";
						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
       });
 };
 module.exports.getListeEcurie = function (callback) {
    // connection à la base
 	db.getConnection(function(err, connexion){
         if(!err){
         	  // s'il n'y a pas d'erreur de connexion
         	  // execution de la requête SQL
 						let sql ="SELECT ECUNUM, ECUNOM FROM ecurie ORDER BY ECUNOM";
 						console.log (sql);
             connexion.query(sql, callback);

             // la connexion retourne dans le pool
             connexion.release();
          }
        });
  };

	 module.exports.newSponsor = function (data, callback) {
			// connection à la base
		 db.getConnection(function(err, connexion){
					 if(!err){
							 // s'il n'y a pas d'erreur de connexion
							 // execution de la requête SQL
							 let sql ="INSERT INTO sponsor (SPONOM, SPOSECTACTIVITE)";
							 sql = sql + " VALUES ('" + data.sponom + "', '";
							 sql = sql + data.sposectactivite;
							 sql = sql + "')";
							 console.log (sql);
							 connexion.query(sql, callback);

							 // la connexion retourne dans le pool
							 connexion.release();
						}
					});
		};
		module.exports.newSponsorAvecFin = function (sponum, ecunum, callback) {
			 // connection à la base
			db.getConnection(function(err, connexion){
						if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
								let sql ="INSERT INTO finance (ECUNUM, SPONUM)";
								sql = sql + " VALUES ('" + ecunum + "', '";
								sql = sql + sponum + "')";
								console.log (sql);
								connexion.query(sql, callback);

								// la connexion retourne dans le pool
								connexion.release();
						 }
					 });
		 };

		module.exports.modifSponsor = function (data, callback) {
			 // connection à la base
			db.getConnection(function(err, connexion){
						if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
								let sql ="UPDATE sponsor SET ";
								sql = sql + "   SPONOM = '" + data.sponom;
								sql = sql + "', SPOSECTACTIVITE = '" + data.sposectactivite;
								sql = sql + "' WHERE SPONUM = '" + data.sponum + "'";
								console.log (sql);
								connexion.query(sql, callback);

								// la connexion retourne dans le pool
								connexion.release();
						 }
					 });
		 };
		 module.exports.modifSponsorAvecFin = function (data, ecunum, callback) {
				// connection à la base
			 db.getConnection(function(err, connexion){
						 if(!err){
		
								 let sql ="INSERT INTO finance (ECUNUM, SPONUM)";
								 sql = sql + " VALUES ('" + ecunum + "', '";
								 sql = sql + data.sponum + "')";
								 console.log (sql);
								 connexion.query(sql, callback);

								 // la connexion retourne dans le pool
								 connexion.release();
							}
						});
			};

		module.exports.supprimerSpo = function (data, callback) {
			 // connection à la base
			db.getConnection(function(err, connexion){
						if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
								let sql ="DELETE FROM sponsor WHERE SPONUM = '" + data + "' ";
								console.log (sql);
								connexion.query(sql, callback);

								// la connexion retourne dans le pool
								connexion.release();
						 }
					 });
		 };
		 module.exports.supprimerSpoFin = function (data, callback) {
				// connection à la base
			 db.getConnection(function(err, connexion){
						 if(!err){
								 // s'il n'y a pas d'erreur de connexion
								 // execution de la requête SQL
								 let sql ="DELETE FROM finance WHERE SPONUM = '" + data + "' ";
								 console.log (sql);
								 connexion.query(sql, callback);

								 // la connexion retourne dans le pool
								 connexion.release();
							}
						});
			};

		module.exports.getInfoSpo = function (data, callback) {
			 // connection à la base
			db.getConnection(function(err, connexion){
						if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
								let sql ="SELECT SPONUM, SPONOM, SPOSECTACTIVITE FROM sponsor";
								sql = sql + " WHERE SPONUM = '" + data;
								sql = sql + "'";
								console.log (sql);
								connexion.query(sql, callback);

								// la connexion retourne dans le pool
								connexion.release();
						 }
					 });
		 };
