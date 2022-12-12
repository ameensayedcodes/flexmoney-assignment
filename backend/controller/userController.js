const connection = require("../config/dbConfig");

exports.getUser = async (req, res) => {
    const username = req.params.username

    connection.query(
        'SELECT * FROM `person` WHERE `username` = ?',
        [username],
        function (err, results, fields) {
            if (results.length !== 0) {
                res.json({
                    status: true,
                    result: results[0]
                })
            }
            else {
                res.json({
                    status: false,
                    result: null
                })
            }
        }
    )
}