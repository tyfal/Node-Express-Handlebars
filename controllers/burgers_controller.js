var express = require(`express`);

var router = express.Router();

var burger = require(`../models/burger`);

router.get(`/`, (req, res) => {
    burger.all((data) => {
        var hbsObject = {
            burgers: data
        };
        // console.log(hbsObject);
        res.render(`index`, hbsObject);
    });
});

router.post(`/api/burgers`, (req, res) => {
    burger.create([
        `burger_name`,
        `devoured`
    ], [
        req.body.name,
        req.body.devoured
    ], (result) => {
        res.json({ id: result.insertId});
    });
});

router.put(`/api/burgers/:id`, (req, res) => {
    var condition = `id = ${req.params.id}`;

    // console.log(`condition: ${condition}`);

    burger.update({
        devoured: req.body.devoured
    }, condition, (result) => {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;

