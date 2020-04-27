let db = require('../configDb');

module.exports.getListeCircuit = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT CIRNUM, CIRNOM, CIRLONGUEUR, CIRNBSPECTATEURS FROM circuit ORDER BY CIRNOM";
						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
       });
 };
 module.exports.getListePays = function (callback) {
    // connection à la base
 	db.getConnection(function(err, connexion){
         if(!err){
         	  // s'il n'y a pas d'erreur de connexion
         	  // execution de la requête SQL
 						let sql ="SELECT PAYNUM, PAYNOM FROM pays ORDER BY PAYNOM";
 						console.log (sql);
             connexion.query(sql, callback);

             // la connexion retourne dans le pool
             connexion.release();
          }
        });
  };

	 module.exports.newCircuit = function (data, callback) {
			// connection à la base
		 db.getConnection(function(err, connexion){
					 if(!err){
							 // s'il n'y a pas d'erreur de connexion
							 // execution de la requête SQL
							 let sql ="INSERT INTO circuit (CIRNOM, CIRLONGUEUR, PAYNUM, CIRADRESSEIMAGE, CIRNBSPECTATEURS, CIRTEXT)";
							 sql = sql + " VALUES ('" + data.cirnom + "', '";
							 sql = sql + data.cirlongueur + "', '";
							 sql = sql + data.paynum + "', '";
							 sql = sql + data.ciradresseimage + "', '";
							 sql = sql + data.cirnbspectateurs + "', '";
							 sql = sql + data.cirtexte;
							 sql = sql + "' )";
							 console.log (sql);
							 connexion.query(sql, callback);

							 // la connexion retourne dans le pool
							 connexion.release();
						}
					});
		};

		module.exports.modifCircuit = function (data, callback) {
			 // connection à la base
			db.getConnection(function(err, connexion){
						if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
								let sql ="UPDATE circuit SET ";
								sql = sql + "   CIRNOM = '" + data.cirnom;
								sql = sql + "', CIRLONGUEUR = '" + data.cirlongueur;
								sql = sql + "', PAYNUM = '" + data.paynum;
								sql = sql + "', CIRADRESSEIMAGE = '" + data.ciradresseimage;
								sql = sql + "', CIRNBSPECTATEURS = '" + data.cirnbspectateurs;
								sql = sql + "', CIRTEXT = '" + data.cirtexte;
								sql = sql + "' WHERE CIRNUM = '" + data.cirnum + "'";
								console.log (sql);
								connexion.query(sql, callback);

								// la connexion retourne dans le pool
								connexion.release();
						 }
					 });
		 };

		module.exports.supprimerCir = function (data, callback) {
			 // connection à la base
			db.getConnection(function(err, connexion){
						if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
								let sql ="DELETE FROM circuit WHERE CIRNUM = '" + data + "' ";
								console.log (sql);
								connexion.query(sql, callback);

								// la connexion retourne dans le pool
								connexion.release();
						 }
					 });
		 };

		module.exports.getInfoCir = function (data, callback) {
			 // connection à la base
			db.getConnection(function(err, connexion){
						if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
								let sql ="SELECT CIRNUM, CIRNOM, CIRLONGUEUR, PAYNUM, CIRADRESSEIMAGE, CIRNBSPECTATEURS, CIRTEXT  FROM circuit";
								sql = sql + " WHERE CIRNUM = '" + data;
								sql = sql + "'";
								console.log (sql);
								connexion.query(sql, callback);

								// la connexion retourne dans le pool
								connexion.release();
						 }
					 });
		 };
