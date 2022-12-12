const connection = require("../config/dbConfig");

exports.signup = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const age = req.body.age;
    connection.query(
        'INSERT INTO `person` (username, password, name, age) VALUES (?, ?, ?, ?)',
        [username, password, name, age],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.json(results);
            }
        }
    )
}