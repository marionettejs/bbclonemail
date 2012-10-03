(function(){
  "option strict";
  var commands = new Backbone.Wreqr.Commands();
  var reqres = new Backbone.Wreqr.RequestResponse();

  _.extend(Backbone.Marionette.Application.prototype, {
    commands: commands,
    execute: function(name, argObj){
      commands.execute(name, argObj);
    },

    requestResponse: reqres,
    request: function(name, argObj){
      return reqres.request(name, argObj);
    }
  });
})();
