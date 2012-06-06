var createRepository = require("../../libs/repositories").createRepository;

var Messages = createRepository("messages", {

  // saves a message
  save: function(message, callback) {
    this.baseSave(message, function(savedMessage, errors) {
      return callback(savedMessage, errors);
    });
  }

});

module.exports = Messages;