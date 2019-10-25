const routers = require('../routers');
const controllers = require('../controllers');
const auth = require('../utilities/auth');

module.exports = (app) => {
    app.use('/', routers.home);
    
    app.use('/user', routers.user);

    app.use('*', (req, res, next) => {
        res.send('<h1>PAGE NOT FOUND!</h1>')
    })
}