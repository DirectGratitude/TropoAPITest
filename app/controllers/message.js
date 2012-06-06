require('tropo-webapi/lib/tropo-session');

var createController = require("../../libs/controllers").createController;

var MessageController = createController({
  Messages: null,

  setup: function() {
    this.Messages = this.repositories.Messages;
  },

  // /messages/new
  new: function(req, res) {
    var action = "call";
    var message = "Do not miss your rendez-vous with Sabrina at 3pm. Love you. Pommy.";
    var number = "18198018805";

    // todo : reselect action when form has errors
    // todo : fix sms (problems seems to be about outbound sms)
    // todo : properly handle parameters and move this to send()

    if (action == "message") {
      var token = process.env["TROPO_MESSAGE_TOKEN"];
    } else if (action == "call") {
      var token = process.env["TROPO_CALL_TOKEN"];
    }

    var session = new TropoSession();
    //session.makeApiCall(token, { msg: message, number: number });

    session.addListener('responseBody', function(response) {
      console.log(response);
    });

    res.render("messages/send", {
      title: "New message"
    });
  },

  // /messages/send
  send: function(req, res) {
    var that = this;

    this.Messages.save(req.body.message, function(message, validationErrors) {
      if (validationErrors) {
        that.validator.addErrorsToMessages(req, validationErrors);
      } else {
        // todo: api call here
        that.messages.addMessage(req, "success", "Message sent with success.");
        res.redirect("/");
      }

      res.render("messages/send", {
        title: "New message",
        message: message
      });

    });
  },

});

module.exports = MessageController;