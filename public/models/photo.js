let db = require('../configDb');

module.exports.getPhoto = function (data, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT PHOADRESSE FROM photo po JOIN pilote pi ON po.PILNUM = pi.PILNUM"
						sql = sql + " WHERE pi.PILNOM LIKE '" + data;
						sql = sql + "%' AND PHOADRESSE LIKE '44%'"
						console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
       });
 };
