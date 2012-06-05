module.exports = {
  registerRoutes: function(app) {
    var getAction = this.router.getAction,
        application = this.controllers.application,
		message = this.controllers.message;

	// main routes
    app.get("/", getAction(application, "index"));

	// messages routes
    app.post("/messages/send", getAction(message, "send"));

	// catchall for errors
    app.get('*', getAction(home, "error"));
  }
};