/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ECUNUM, ECUNOM, ECUNOMDIR, ECUPOINTS, ECUADRSIEGE FROM ecurie ORDER BY ECUNOM";
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

	 module.exports.newEcurie = function (data, callback) {
			// connection à la base
		 db.getConnection(function(err, connexion){
					 if(!err){
							 // s'il n'y a pas d'erreur de connexion
							 // execution de la requête SQL
							 let sql ="INSERT INTO ecurie (ECUNOM, ECUNOMDIR, ECUADRSIEGE, ECUPOINTS, PAYNUM, ECUADRESSEIMAGE)";
							 sql = sql + " VALUES ('" + data.ecunom + "', '";
							 sql = sql + data.ecunomdir + "', '";
							 sql = sql + data.ecuadrsiege + "', '";
							 sql = sql + data.ecupoints + "', '";
							 sql = sql + data.paynum + "', '";
							 sql = sql + data.ecuadresseimage;
							 sql = sql + "' )";
							 console.log (sql);
							 connexion.query(sql, callback);

							 // la connexion retourne dans le pool
							 connexion.release();
						}
					});
		};

		module.exports.modifEcurie = function (data, callback) {
			 // connection à la base
			db.getConnection(function(err, connexion){
						if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
								let sql ="UPDATE ecurie SET ";
								sql = sql + "   ECUNOM = '" + data.ecunom;
								sql = sql + "', ECUNOMDIR = '" + data.ecunomdir;
								sql = sql + "', ECUADRSIEGE = '" + data.ecuadrsiege;
								sql = sql + "', ECUPOINTS = '" + data.ecupoints;
								sql = sql + "', PAYNUM = '" + data.paynum;
								sql = sql + "', ECUADRESSEIMAGE = '" + data.ecuadresseimage;
								sql = sql + "' WHERE ECUNUM = '" + data.ecunum + "'";
								console.log (sql);
								connexion.query(sql, callback);

								// la connexion retourne dans le pool
								connexion.release();
						 }
					 });
		 };

		module.exports.supprimerEcu = function (data, callback) {
			 // connection à la base
			db.getConnection(function(err, connexion){
						if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
								let sql ="DELETE FROM ecurie WHERE ECUNUM = '" + data + "' ";
								console.log (sql);
								connexion.query(sql, callback);

								// la connexion retourne dans le pool
								connexion.release();
						 }
					 });
		 };

		module.exports.getInfoEcu = function (data, callback) {
			 // connection à la base
			db.getConnection(function(err, connexion){
						if(!err){
								// s'il n'y a pas d'erreur de connexion
								// execution de la requête SQL
								let sql ="SELECT ECUNUM, ECUNOM, ECUNOMDIR,ECUADRSIEGE, ECUPOINTS, PAYNUM, ECUADRESSEIMAGE  FROM ecurie";
								sql = sql + " WHERE ECUNUM = '" + data;
								sql = sql + "'";
								console.log (sql);
								connexion.query(sql, callback);

								// la connexion retourne dans le pool
								connexion.release();
						 }
					 });
		 };
