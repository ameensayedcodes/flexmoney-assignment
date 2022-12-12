const connection = require("../config/dbConfig");

exports.enroll = async (req, res) => {
    const batchName = req.body.batchName;
    const enrolledAt = new Date();
    const isPaid = req.body.isPaid === true ? 1 : 0;
    const id = req.body.id;
    connection.query(
        'UPDATE `person` SET `is_enrolled` = 1, `is_paid` = ?, `batch_name` = ?, `enrolled_at` = ? WHERE `id` = ?',
        [isPaid, batchName, enrolledAt, id],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            res.json(results);
        }
    );
}

exports.paid = async (req, res) => {
    const id = req.body.id;
    connection.query(
        'UPDATE `person` SET `is_paid` = 1 WHERE `id` = ?',
        [id],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            res.json(results);
        }
    );
}

exports.removeEnrollment = async (req, res) => {
    const id = req.body.id;
    connection.query(
        'UPDATE `person` SET `is_enrolled` = 0, `is_paid` = 0, `batch_name` = NULL, `enrolled_at` = NULL WHERE `id` = ?',
        [id],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            res.json(results);
        }
    );
}