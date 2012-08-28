// A command pattern module for BBCloneMail
// ----------------------------------------

(function(BBCloneMail){

  var handlers = {};

  BBCloneMail.registerCommand = function(name, handler, context){
    handlers[name] = {
      handler: handler,
      context: context
    };
  };

  BBCloneMail.removeCommand = function(name){
    delete handlers[name];
  };

  BBCloneMail.execute = function(name, args){
    var config = handlers[name];
    if (!config){
      throw new Error("Handler not found for '" + name + "'");
    }

    config.handler.call(config.context, args);
  };

})(BBCloneMail);
