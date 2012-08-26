(function(){

  var handlers = {};

  BBCloneMail.registerCommand = function(name, handler){
    handlers[name] = handler;
  };

  BBCloneMail.removeCommand = function(name){
    delete handlers[name];
  };

  BBCloneMail.execute = function(name, args){
    var handler = handlers[name];
    if (!handler){
      throw new Error("Handler not found for '" + name + "'");
    }

    handler(args);
  };

})(BBCloneMail);
