const express = require('express');
const mongoose = require('mongoose');
const userAuthRoutes = require('./routes/userAuthRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

app.set('view engine', 'ejs');

const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

const dbURL = 'mongodb+srv://Aditya:Database@nodejs-tasks.yhqwx.mongodb.net/LMS?retryWrites=true&w=majority';

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log('Connected to DB');
        app.listen( port || process.env.PORT, () => {
            console.log('Server is listening at http://localhost:8000');
        });
    })
    .catch((err) => console.log(err));

app.get('*', checkUser);

app.get('/', (req,res) => {
    res.render('home');    
});

app.get('/dashboard', requireAuth, (req, res) => res.render('dashboard'));

app.use(userAuthRoutes);