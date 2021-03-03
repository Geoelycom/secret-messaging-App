const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const usersRepo = require('./repository/users');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['ahahajajjaayuewhej']
}))
app.get('/', (req, res) => {
    res.send(`
        <div>
           <form method ="POST">
                <input name ="email" placeholder ="email" />
                <input name ="password" placeholder ="password" />
                <input name ="passwordConfirmation" placeholder ="password confirmation" />
                
                <button>sign up </button>
        </form>
     </div>
    
    
    `);
});
app.post('/', async(req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send('Email in use');
    }
    if (password !== passwordConfirmation) {
        return res.send('passwords must match')
    }

    //Create a user in our repo to represent this person
    const user = await usersRepo.create({ email, password });

    // store the id of that useer inside the user cookie
    req.session.userId = user.id;

    res.send('account created')

});
app.listen(3000, () => {
    console.log('listening')
})