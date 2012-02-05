// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2012 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// Routing
// -------

BBCloneMail.Routing = (function(BBCloneMail, Backbone){
  var Routing = {};

  // Public API
  // ----------

  // The `showRoute` method is a private method used to update the 
  // url's hash fragment route. It accepts a base route and an 
  // unlimited number of optional parameters for the route: 
  // `showRoute("foo", "bar", "baz", "etc");`.
  Routing.showRoute = function(){
    var route = getRoutePath(arguments);
    Backbone.history.navigate(route, false);
  };

  // Helper Methods
  // --------------

  // Creates a proper route based on the `routeParts`
  // that are passed to it.
  var getRoutePath = function(routeParts){
    var base = routeParts[0];
    var length = routeParts.length;
    var route = base;

    if (length > 1){
      for(var i = 1; i < length; i++) {
        var arg = routeParts[i];
        if (arg){
          route = route + "/" + arg;
        }
      }
    }

    return route;
  }

  return Routing;
})(BBCloneMail, Backbone);
