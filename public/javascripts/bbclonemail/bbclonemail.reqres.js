// A request/response module for Marionette
// ----------------------------------------

(function(Marionette){

  var handlers = {};

  _.extend(Marionette.Application.prototype, {
    respondTo: function(name, handler, context){
      var config = {
        handler: handler,
        context: context
      };

      handlers[name] = config;
    },

    request: function(name, args){
      var config = handlers[name];

      if (!config){
        throw new Error("Request handler not found for '" + name + "'");
      }

      return config.handler.call(config.context, args);
    },

    removeRequestHandler: function(name){
      delete handlers[name];
    },

    clearRequestHandlers: function(){
      handlers = {};
    }
  });

})(Backbone.Marionette);
