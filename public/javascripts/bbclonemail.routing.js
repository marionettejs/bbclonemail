// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// Routing
// -------

BBCloneMail.Routing = (function(BBCloneMail, Backbone){
  var Routing = {};

  // AppRouter
  // ---------
  
  // The AppRouter object is a work-in-progress to reduce the
  // boilerplate code in routers. It requires an `app` object
  // be provided to the constructor, and `appRoutes` hash to be
  // defined on the router. 
  //
  // The left part of the `appRoutes` is a standard Backbone route. 
  // The right part of the `appRoutes` is the name of the method to 
  // call on the `app` object, when the route callback fires. 
  //
  // For example:
  // `appRoutes: { "foo/bar": "bar"}` will call the `bar` 
  // method on the `app` object: `new MyRouter({app: fooApp});`

  Routing.AppRouter = Backbone.Router.extend({

    constructor: function(options){
      Backbone.Router.prototype.constructor.call(this, options);

      if (this.appRoutes){
        this.processAppRoutes(options.app, this.appRoutes);
      }
    },

    processAppRoutes: function(app, appRoutes){
      var route, methodName, method;
      var routes = [], routesLength;
      var args;

      for(route in appRoutes){
        routes.unshift([route, appRoutes[route]]);
      }

      routesLength = routes.length;
      for (var i = 0; i < routesLength; i++){

        route = routes[i][0];
        methodName = routes[i][1];
        method = app[methodName];
        args = Array.prototype.slice.call(arguments);

        this.route(route, methodName, function(){
          method.apply(this, args);
        });

      }
    }

  });

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
