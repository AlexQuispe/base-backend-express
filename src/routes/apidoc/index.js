module.exports = app => {

  app.get('/apidoc', function(req, res, next) {
    res.status(200).render('index');
  });

  app.get('/', function(req, res, next) {
    res.redirect('/apidoc');
  });

  app.use(function (req, res, next) {
    res.status(404).json({"error":"El recurso solicitado no existe"});
  });

};
