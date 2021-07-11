const express = require('express');
const router = express();
const cors  = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbMember = require('../models/dbMember');

router.use(cors());
router.use(express.json());
router.use(express.urlencoded( {extended: false} ));

router.get('/index', (request, response) => {
    const memberDB = dbMember.create();

    memberDB.getAllMembers()
    .then(data => response.json(data))
    .catch(err => console.log(err));
});

router.post('/create', (request, response) => {
    const {first_name, last_name, email} = request.body;

    const memberDB = dbMember.create();

    memberDB.insertNewMember(first_name, last_name, email)
    .then(data => response.json(data))
    .catch(err => console.log(err));
});

router.delete('/delete/:id', (request, response) => {
    const {id} = request.params;

    const memberDB = dbMember.create();

    memberDB.deleteMemberById(id)
    .then(data => response.json(data))
    .catch(err => console.log(err));
});

router.patch('/update', (request, response) => {
    const {id, first_name, last_name, email} = request.body;
    
    const memberDB = dbMember.create();

    memberDB.updateMemberById(id, first_name, last_name, email)
    .then(data => response.json(data))
    .catch(err => console.log(err));
});

router.get('/search/:first_name/:last_name', (request, response) => {
    const {first_name, last_name} = request.params;

    const memberDB = dbMember.create();

    memberDB.searchMemberByName(first_name, last_name)
        .then(data => response.json(data))
        .catch(err => console.log(err));
});

module.exports = router;