const express = require('express');
const router = express();
const cors = require('cors');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken')

const dbUser = require('../models/dbUser');

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/signup', async (request, response) => {
    const passwordHash = await bcrypt.hash(request.body.password, 10);
    const username = request.body.username;

    const userDB = dbUser.create();

    userDB.createNewUser(username, passwordHash)
    .then(data => response.json(data))
    .catch(err => console.log(err));
})

router.post('/login', async (request, response) => {
    const {username, password} = request.body;
    
    const userDB = dbUser.create();

    const user = await userDB.findByUsername(username)
        .catch(err => console.error(err));
    
    const match = await bcrypt.compare(password, user.password);

    if(match) {
        jwt.sign({user}, process.env.TOKEN_SECRET, { expiresIn: '1800s' }, (err, token) => {
            response.json({
                success: true,
                token//u postmanu ispise generisani token, tj vrati ga na frontend
            });
        });
    } else {
        response.json({
            success: false, //kada u vue ides console.log(response.data) onda ispise oba ova reda jer je ovo sve data, ili data.success ispise samo false ili true
            message: 'Username or password is wrong.'
        })
    }
});

module.exports = router;
