let db = require('../configDb');

module.exports.getListePilote = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT PILNOM, PILPRENOM, PILNUM, DATE_FORMAT(PILDATENAIS, \"%d/%m/%Y\") as PILDATENAIS FROM pilote ORDER BY PILNOM";
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

	 module.exports.newPilote = function (data, callback) {
			// connection à la base
		 db.getConnection(function(err, connexion){
					 if(!err){
							 // s'il n'y a pas d'erreur de connexion
							 // execution de la requête SQL
							 let sql ="INSERT INTO pilote (PILPRENOM, PILNOM, PILDATENAIS, PAYNUM, ECUNUM, PILPOINTS, PILPOIDS, PILTAILLE, PILTEXTE)";
							 sql = sql + " VALUES ('" + data.pilprenom + "', '";
							 sql = sql + data.pilnom + "', STR_TO_DATE('";
							 sql = sql + data.pildatenais + "',\"%d/%m/%Y\"), '";
							 sql = sql + data.paynum + "', '";
							 sql = sql + data.ecunum + "', '";
							 sql = sql + data.pilpoints + "', '";
							 sql = sql + data.pilpoids + "', '";
							 sql = sql + data.piltaille + "', '";
							 sql = sql + data.piltexte;
							 sql = sql + "' )";
							 console.log (sql);
							 connexion.query(sql, callback);

							 // la connexion retourne dans le pool
							 connexion.release();
						}
					});
		};

		module.exports.modifPilote = function (data, callback) {
			 // connection à la base
			db.getConnection(function(err, connexion){
						if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
								let sql ="UPDATE pilote SET ";
								sql = sql + "   PILPRENOM = '" + data.pilprenom;
								sql = sql + "', PILNOM = '" + data.pilnom;
								sql = sql + "', PILDATENAIS = STR_TO_DATE('" + data.pildatenais + "',\"%d/%m/%Y\")";
								sql = sql + " , PAYNUM = '" + data.paynum;
								sql = sql + "', ECUNUM = '" + data.ecunum;
								sql = sql + "', PILPOINTS = '" + data.pilpoints;
								sql = sql + "', PILPOIDS = '" + data.pilpoids;
								sql = sql + "', PILTAILLE = '" + data.piltaille;
								sql = sql + "', PILTEXTE = '" + data.piltexte;
								sql = sql + "' WHERE pilnum = '" + data.pilnum + "'";
								console.log (sql);
								connexion.query(sql, callback);

								// la connexion retourne dans le pool
								connexion.release();
						 }
					 });
		 };

		module.exports.supprimerPil = function (data, callback) {
			 // connection à la base
			db.getConnection(function(err, connexion){
						if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
								let sql ="DELETE FROM pilote WHERE pilnum = '" + data + "' ";
								console.log (sql);
								connexion.query(sql, callback);

								// la connexion retourne dans le pool
								connexion.release();
						 }
					 });
		 };

		module.exports.getInfoPil = function (data, callback) {
			 // connection à la base
			db.getConnection(function(err, connexion){
						if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
								let sql ="SELECT PILNUM, PAYNUM, ECUNUM, PILNOM, PILPRENOM, DATE_FORMAT(PILDATENAIS, \"%d/%m/%Y\") as PILDATENAIS, PILPOIDS, PILPOINTS, PILTAILLE, PILTEXTE  FROM pilote";
								sql = sql + " WHERE PILNUM = '" + data;
								sql = sql + "'";
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

 						let sql ="SELECT DISTINCT PILNOM, PILPRENOM, DATE_FORMAT(PILDATENAIS, \"%d/%m/%Y\") as PILDATENAIS, PAYNOM, PILPOIDS, PILTAILLE, PHOADRESSE, SPONOM, SPOSECTACTIVITE, PILTEXTE, ECUNOM";
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

						 let sql = "SELECT PHOADRESSE";
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
