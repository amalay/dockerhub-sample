const testController = require("../controllers/testController");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/test", testController.get);
    app.get("/api/test/:id", testController.getById);
};
