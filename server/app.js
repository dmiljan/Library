const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const memberRoutes = require('./routes/member');

app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/member", memberRoutes);



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// app.post('/api/posts',verifyToken, (req, res) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if(err) {
//             res.sendStatus(403);
//         } else {
//             res.json({
//                 message: 'Post created...',
//                 authData
//             });
//         }
//     });
// });

// app.post('/api/users', async (req, res) => {
//     if(!verifyJwtToken(req)) {
//         res.sendStatus(403);
//     } else {
//         res.json({
//             'message': 'Dobar ti je token ispisi rezultat'
//         })
//     }
// });

// const verifyJwtToken = async (req) =>  {
//     const jwtToken = extractJwtToken(req);

//     if(jwtToken === null) {
//         return false;
//     } else {
//         try {
//             const response = await new Promise((resolve, reject) => {
//                 jwt.verify(jwtToken, 'secretkey', (err, authData) => {
//                     if(!err) {
//                         resolve({authData});
//                     }
    
//                     reject(err);
//                 });
//             });

//             return true
//         } catch(e) {
//             return false;
//         }
//     }
// }

//FORMAT OF TOKEN 
//Authorization: Bearer <access_token>

//Verify Token
function verifyToken(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken;
        //Next middleware
        next();
    } else {
        //Forbidden
        res.sendStatus(403); //ispise forbidden u postmanu
    }
}

// function extractJwtToken(request) 
// {
//     const bearerHeader = request.headers['authorization'];
    
//     if(typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(' ');
//         return bearer[1];
//     }

//     return null;
// }

app.listen(process.env.PORT, () => {
    console.log('Server started.');
})

// module.exports = app;