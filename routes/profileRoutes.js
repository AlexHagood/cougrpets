var express = require('express');
var router = express.Router();
const Profile = require('../models/Profile')


router.post('/create', async function(req, res, next){
    try{
        await Profile.create(
            {
                username: req.body.username,
                petname: req.body.petname,
            }
        )
        res.redirect('/profile?msg=successful&username='+req.body.username)
    } catch (error){
        res.redirect('/?msg='+new URLSearchParams(error.toString()).toString()+'&username'+req.body.username)
    }
})

router.get('/login', async function(req, res, next){
    const username = await Profile.findUser(req.params.username, req.params.petname);
    if (username){
        res.render('profile',{username})
    }else{
        res.redirect('/?msg=profile+not+found&?username='+req.params.username)
    }
})

router.get('/', async function(req, res, next){
    const profiles = await Profile.findAll();
    if(req.query.msg){
        res.locals.msg = req.query.msg;
        res.locals.username = req.query.username;
    }
    res.render('profiles', {profiles});
})

module.exports = router