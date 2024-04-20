var express = require('express');
var router = express.R
const Profile = require('../controllers/profile')
const ejs = require("ejs")

// Alternate login implementation 

// router.post('/create', async function(req, res, next){
//     try{
//         await Profile.create(
//             {
//                 username: req.body.username,
//                 petname: req.body.petname,
//             }
//         )
//         res.redirect('/profile?msg=successful&username='+req.body.username)
//     } catch (error){
//         res.redirect('/?msg='+new URLSearchParams(error.toString()).toString()+'&username'+req.body.username)
//     }
// })

// router.get('/login', async function(req, res, next){
//     const username = await Profile.findUser(req.params.username, req.params.petname);
//     if (username){
//         res.render('profile',{username})
//     }else{
//         res.redirect('/?msg=profile+not+found&?username='+req.params.username)
//     }
// })

// router.get('/', async function(req, res, next){
//     const profiles = await Profile.findAll();
//     if(req.query.msg){
//         res.locals.msg = req.query.msg;
//         res.locals.username = req.query.username;
//     }
//     res.render('profiles', {profiles});
// })

router.get('/', (req, res, next) => {
    console.log("profile router");
    username = req.session.user.username
    console.log("Acessing profile page with user", username);
    res.contentHTML = ejs.renderFile(__dirname + "/../views/profile.ejs", {username : username})
    next();
})

router.post('/password', Profile.changePass)
router.post('/username', Profile.changeUser)

module.exports = router