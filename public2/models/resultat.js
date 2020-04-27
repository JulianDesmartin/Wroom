let db = require('../configDb');

module.exports.getListeResultat = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql = "SELECT gpnum, gpnom, payadrdrap FROM grandprix g ";
            sql = sql + "JOIN circuit c ON g.CIRNUM = c.CIRNUM ";
            sql = sql + "JOIN pays p ON c.PAYNUM = p.PAYNUM ";
            sql = sql + "ORDER BY GPNOM";
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
        	  /* sql :
            SELECT TEMPSCOURSE, PILNOM, PILPRENOM, PILPOINTS  FROM grandprix g
            JOIN course c ON g.GPNUM = c.GPNUM
            JOIN pilote p ON c.PILNUM = p.PILNUM
            WHERE g.GPNUM = 1
            AND P.PILPOINTS IS NOT NULL
            ORDER BY p.PILPOINTS desc

            */
						let sql = "SELECT TEMPSCOURSE, PILNOM, PILPRENOM, p.PILPOINTS  FROM grandprix g ";
            sql = sql + "LEFT JOIN course c ON g.GPNUM = c.GPNUM ";
            sql = sql + "LEFT JOIN pilote p ON c.PILNUM = p.PILNUM ";
            sql = sql + "WHERE g.GPNUM ='" + data;
            sql = sql + "' ";
            sql = sql + "ORDER BY p.PILPOINTS desc LIMIT 10";
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
        	  /* sql :
            SELECT GPNOM, GPDATE, TEMPSCOURSE, PILNOM, PILPRENOM, PILPOINTS  FROM grandprix g
            JOIN course c ON g.GPNUM = c.GPNUM
            JOIN pilote p ON c.PILNUM = p.PILNUM
            WHERE g.GPNUM = 1
            AND P.PILPOINTS IS NOT NULL
            ORDER BY p.PILPOINTS desc

            */
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

module.exports.getLastResult = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  /* sql :
						SELECT max(GPNOM), max(GPDATE) FROM grandprix
            */
						let sql = "SELECT GPNUM ,max(GPNOM) as GPNOM , DATE_FORMAT(max(GPDATE), \"%d/%m/%Y\") as GPDATE FROM grandprix";
						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
