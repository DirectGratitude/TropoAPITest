var tropoWebAPI = require('tropo-webapi'),
  http = require('http'),
  createController = require("../../libs/controllers").createController;

var MessageController = createController({
  Messages: null,

  setup: function() {
    this.Messages = this.repositories.Messages;
  },

  // /messages/new
  new: function(req, res) {
    var site = http.createClient(80, 'api.tropo.com');
    var request = site.request("GET", "/1.0/sessions?action=create&token=11ba4dbf1d1a694183a76675679242a27c9418e2bb4a68b274f4c7b0534adf54f7c7bc18fdee3c1d7fba9a1a", {
      'host': 'api.tropo.com'
    });
    request.end();

    request.on('response', function(response) {
      response.setEncoding('utf8');
      console.log('STATUS: ' + response.statusCode);
      response.on('data', function(chunk) {
        console.log("DATA: " + chunk);

        var tropo = new tropoWebAPI.TropoWebAPI();

        //to, answerOnMedia, channel, from, headers, name, network, recording, required, timeout
        tropo.call("+18199950115", null, null, null, null, null, "SMS", null, null, null);
        tropo.say("Tag, you're it!!");

        console.log(TropoJSON(tropo));

      });
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