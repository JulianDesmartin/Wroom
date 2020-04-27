let db = require('../configDb');

module.exports.getListeResultat = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){

						let sql = "SELECT GPNUM, GPNOM FROM grandprix ";

						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getResultatGP = function (data,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){

						let sql = "SELECT c.TEMPSCOURSE, p.PILNOM, p.PILPOINTS, p.PILNUM, g.GPNUM FROM pilote p ";
            sql = sql + "LEFT JOIN course c ON p.PILNUM = c.PILNUM ";
            sql = sql + "LEFT JOIN grandprix g ON c.GPNUM = g.GPNUM ";
            sql = sql + "WHERE g.GPNUM ='" + data.gpnum;
            sql = sql + "' ";
            sql = sql + "ORDER BY c.TEMPSCOURSE asc LIMIT 10";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getPoints = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql = "SELECT PTNBPOINTSPLACE FROM points ORDER BY PTNBPOINTSPLACE desc";
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getPilote = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL

						let sql = "SELECT PILNUM, PILNOM FROM pilote ORDER BY PILNOM";

						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


module.exports.getInfoSup = function (data,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql = "SELECT GPNOM, DATE_FORMAT(GPDATE, \"%d/%m/%Y\") as GPDATE , GPCOMMENTAIRE  FROM grandprix ";
            sql = sql + "WHERE GPNUM ='" + data;
            sql = sql + "' ";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


module.exports.newScore = function (data, callback) {
	 // connection à la base
	db.getConnection(function(err, connexion){
				if(!err){
						// s'il n'y a pas d'erreur de connexion
						// execution de la requête SQL
						let sql ="INSERT INTO course (GPNUM, PILNUM, TEMPSCOURSE)";
						sql = sql + " VALUES ('" + data.gpnum + "', '";
						sql = sql + data.pilnum + "', '";
						sql = sql + data.m + ":" + data.s + ":" + data.ms;
						sql = sql + "' )";
						console.log (sql);
						connexion.query(sql, callback);

						// la connexion retourne dans le pool
						connexion.release();
				 }
			 });
 };

 module.exports.supprimerScore = function (data, callback) {
		// connection à la base
	 db.getConnection(function(err, connexion){
				 if(!err){
						 // s'il n'y a pas d'erreur de connexion
						 // execution de la requête SQL
						 let sql ="DELETE FROM course WHERE PILNUM = '" + data.pilnum + "' AND GPNUM = '" + data.gpnum + "' ";
						 console.log (sql);
						 connexion.query(sql, callback);

						 // la connexion retourne dans le pool
						 connexion.release();
					}
				});
	};


module.exports.getLastResult = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){

						let sql = "SELECT GPNUM ,max(GPNOM) as GPNOM , DATE_FORMAT(max(GPDATE), \"%d/%m/%Y\") as GPDATE FROM grandprix";
						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
