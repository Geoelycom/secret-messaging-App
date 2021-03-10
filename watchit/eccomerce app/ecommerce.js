const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const authRouter = require('./routes/Admin/auth');
const productRouter = require('./routes/Admin/product');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cookieSession({
        keys: ['ahahajajjaayuewhej']
    })
);

app.use(authRouter);
app.use(productRouter);


app.listen(3000, () => {
    console.log('listening')
})