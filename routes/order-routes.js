const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/index');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('order', { user: req.user });
});

module.exports = router;
