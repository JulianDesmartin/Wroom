let db = require('../configDb');

module.exports.getListePays = function (callback) {

	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="SELECT CIRNUM, payadrdrap, CIRNOM FROM " +
                            "circuit c INNER JOIN pays p ";
						sql= sql + "ON p.paynum=c.paynum ORDER BY CIRNOM";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getCircuitDet = function (data, callback) {
	 // connection à la base
 db.getConnection(function(err, connexion){
				if(!err){
					/* sql :
					SELECT CIRADRESSEIMAGE, CIRNOM, CIRLONGUEUR, CIRNBSPECTATEURS, p.PAYNOM, CIRTEXT
					FROM circuit c JOIN pays p ON c.PAYNUM = p.PAYNUM
					WHERE CIRNUM = 1
					*/

					 let sql ="	SELECT CIRADRESSEIMAGE, CIRNOM, CIRLONGUEUR, CIRNBSPECTATEURS, p.PAYNOM, CIRTEXT";
					 sql = sql + " FROM circuit c JOIN pays p ON c.PAYNUM = p.PAYNUM";
					 sql = sql + " WHERE CIRNUM = '" + data;
					 sql = sql + "' "
					 console.log (sql);
						connexion.query(sql, callback);

						// la connexion retourne dans le pool
						connexion.release();
				 }
			 });
 };
