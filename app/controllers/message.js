require('tropo-webapi/lib/tropo-session');

var createController = require("../../libs/controllers").createController;

var MessageController = createController({
  Messages: null,

  setup: function() {
    this.Messages = this.repositories.Messages;
  },

  // /messages/new
  new: function(req, res) {
    res.render("messages/send", { title: "New message" });
  },

  // /messages/send
  send: function(req, res) {
    var that = this;

    // saving message to mongodb
    this.Messages.save(req.body.message, function(message, validationErrors) {
      if (validationErrors) {
        // if there's validation errors with the form, send back the form with the errors
        that.validator.addErrorsToMessages(req, validationErrors);
        res.render("messages/send", { title: "New message", message: message });
      } else {

        // todo : fix sms (problems seems to be about outbound sms)
        // todo : reselect action when form has errors

        var session = new TropoSession();

        // selecting which token to use
        if (message.messageType == "message") {
          var token = process.env["TROPO_MESSAGE_TOKEN"];
        } else if (message.messageType == "call") {
          var token = process.env["TROPO_CALL_TOKEN"];
        }

        // sending message to API
        session.makeApiCall(token, { msg: message.message, number: message.phoneNumber });

        // reponse from Tropo API, sending success message
        session.addListener('responseBody', function(response) {
          that.messages.addMessage(req, "success", "Message sent with success.");
          res.redirect("/");
        });

        // if the Tropo API does not answer, we send a timeout message.
        setTimeout(function () { 
          that.messages.addMessage(req, "error", "Message has timed out. Please try again");
          res.render("messages/send", { title: "New message", message: message });
        }, 60000);

      }
    });
  },

});

module.exports = MessageController;