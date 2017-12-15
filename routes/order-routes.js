const db = require("../models")
const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/index');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('order', { user: req.user });
});

router.put('/', authCheck, (req, res) => {
    db.Todo.update(
        req.body. {
            where: {
                id: req.body.id
            }
        }).then(function(dbTodo) {
        res.json(dbTodo);
    });
});
}

module.exports = router;