// A request/response module for BBCloneMail
// -----------------------------------------

(function(BBCloneMail){

  var handlers = {};

  BBCloneMail.respondTo = function(name, handler, context){
    var config = {
      handler: handler,
      context: context
    };

    handlers[name] = config;
  };

  BBCloneMail.request = function(name, args){
    var config = handlers[name];

    if (!config){
      throw new Error("Request handler not found for '" + name + "'");
    }

    return config.handler.apply(config.context, args);
  };

  BBCloneMail.removeRequestHandler = function(name){
    delete handlers[name];
  };

})(BBCloneMail);
