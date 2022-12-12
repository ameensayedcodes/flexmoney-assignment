const connection = require("../config/dbConfig");

exports.loginCheck = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    connection.query(
        'SELECT * FROM `person` WHERE `username` = ?',
        [username],
        function(err, results, fields) {
            if(results.length !== 0) {
                if(results[0].password === password) {
                    res.json({
                        status: true,
                        username: true,
                        password: true
                    })
                }
                else {
                    res.json({
                        status: false,
                        username: true,
                        password: false
                    })
                }
            }
            else {
                res.json({
                    status: false,
                    username: false,
                    password: false
                })
            }
        }
    )
}