var tropoWebAPI = require('tropo-webapi'),
  tropoSession = require('tropo-webapi/lib/tropo-session'),
  http = require('http'),
  createController = require("../../libs/controllers").createController;

var MessageController = createController({
  Messages: null,

  MessageToken: '11bc2ebce55e1142a9198cfc82c25475b653b08315c3a907eb3df8bf795be9cf4a25d4312290c409000555de',
  CallToken: '11bc7291593c6a408b6ca416ff478f269056f8bd7d4656633a9b289f0426d22bcf72ae2edfb3fb71dd673e10',

  setup: function() {
    this.Messages = this.repositories.Messages;
  },

  // /messages/new
  new: function(req, res) {
    var action = "message";

    // todo : add radio to form to chose between actions
    // todo : fix sms (problems seems to be about outbound sms)
    // todo : properly handle parameters and move this to send()

    if (action == "message") {
      var token = this.MessageToken;
    } else if (action == "call") {
      var token = this.CallToken;
    }

    var session = new TropoSession();
    session.makeApiCall(token, {
      msg: 'This is a test message from Node.js.',
      number: '12343526622'
    });

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