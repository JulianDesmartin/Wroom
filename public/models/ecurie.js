

let db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ecunum, payadrdrap, ecunom FROM " +
                            "ecurie e INNER JOIN pays p ";
						sql= sql + "ON p.paynum=e.paynum ORDER BY ecunom";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


module.exports.getEcurieDet = function (data, callback) {
	 // connection à la base
 db.getConnection(function(err, connexion){
				if(!err){
					/*sql :
					SELECT ECUADRESSEIMAGE, ECUNOM, ECUNOMDIR, ECUADRSIEGE, p.PAYNOM, f.FPNOM
					FROM ecurie e JOIN pays p ON e.PAYNUM = p.PAYNUM
					JOIN fourn_pneu f ON e.FPNUM=f.FPNUM
					WHERE ECUNUM = 1
					*/

					 let sql ="	SELECT ECUADRESSEIMAGE, ECUNOM, ECUNOMDIR, ECUADRSIEGE, p.PAYNOM, f.FPNOM";
					 sql = sql + " FROM ecurie e LEFT JOIN pays p ON e.PAYNUM = p.PAYNUM";
					 sql = sql + " LEFT JOIN fourn_pneu f ON e.FPNUM=f.FPNUM";
					 sql = sql + " WHERE ECUNUM = '" + data;
					 sql = sql + "' "
					 console.log (sql);
						connexion.query(sql, callback);

						// la connexion retourne dans le pool
						connexion.release();
				 }
			 });
 };

 module.exports.getEcuriePilote = function (data, callback) {
		// connection à la base
	db.getConnection(function(err, connexion){
				 if(!err){
					 /*
					 SELECT p.PILNUM, p.PILNOM, p.PILPRENOM, SUBSTRING(p.PILTEXTE,1,100), ph.PHOADRESSE FROM ecurie e
					 JOIN pilote p ON e.ECUNUM = p.ECUNUM
					 JOIN photo ph ON p.PILNUM = ph.PILNUM
					 WHERE e.ECUNUM = 1
					 AND PHOSUJET LIKE 'Photo identité'
					 */

						let sql = "SELECT p.PILNUM, p.PILNOM, p.PILPRENOM, SUBSTRING(p.PILTEXTE,1,100) as PILTEXTE, ph.PHOADRESSE FROM ecurie e ";
						sql = sql + " JOIN pilote p ON e.ECUNUM = p.ECUNUM";
						sql = sql + " JOIN photo ph ON p.PILNUM = ph.PILNUM";
						sql = sql + " WHERE e.ECUNUM = '" + data;
						sql = sql + "' AND PHOSUJET LIKE 'Photo identité'"
						console.log (sql);
						 connexion.query(sql, callback);

						 // la connexion retourne dans le pool
						 connexion.release();
					}
				});
	};

	module.exports.getEcurieVehicule = function (data, callback) {
		 // connection à la base
	 db.getConnection(function(err, connexion){
					if(!err){
						/*
						SELECT v.VOIADRESSEIMAGE, v.VOINOM, t.TYPELIBELLE
						FROM voiture v JOIN type_voiture t ON v.TYPNUM = t.TYPNUM
						WHERE v.ECUNUM = 1
						*/

						 let sql = "SELECT v.VOIADRESSEIMAGE, v.VOINOM, t.TYPELIBELLE";
						 sql = sql + " FROM voiture v JOIN type_voiture t ON v.TYPNUM = t.TYPNUM";
						 sql = sql + " WHERE v.ECUNUM = '" + data;
						 sql = sql + "' "
						 console.log (sql);
							connexion.query(sql, callback);

							// la connexion retourne dans le pool
							connexion.release();
					 }
				 });
	 };
