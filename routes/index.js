var adminRouter = require('../routes/adminRouter');
var apiRouter = require('../routes/apiRouter');

const routerCollection = function(app) {
    app.use('/admin', adminRouter); 
    app.use('/api', apiRouter);
}
module.exports = routerCollection;  