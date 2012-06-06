var tropoWebAPI = require('tropo-webapi'),
    tropoSession = require('tropo-webapi/lib/tropo-session'),
    http = require('http'),
    createController = require("../../libs/controllers").createController;

var MessageController = createController({
  Messages: null,

  setup: function() {
    this.Messages = this.repositories.Messages;
  },

  // /messages/new
  new: function(req, res) {
    var token = '11ba4dbf1d1a694183a76675679242a27c9418e2bb4a68b274f4c7b0534adf54f7c7bc18fdee3c1d7fba9a1a';

    var tropo = new tropoWebAPI.TropoWebAPI();

    //to, answerOnMedia, channel, from, headers, name, network, recording, required, timeout
    tropo.call("+18199950115", null, null, null, null, null, "SMS", null, null, null);
    tropo.say("Tag, you're it!!");

    var session = new TropoSession();
    session.makeApiCall(token, TropoJSON(tropo));

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