BBCloneMail.module("MailApp.Inbox", function(Inbox, App, Backbone, Marionette, $, _){
  "use strict";

  // Experimetal Method
  // ------------------
  //
  // Deferred Method Combinator
  // http://docfuncmod.posterous.com/deferred-method-combinator
  // 
  // To resolve a $.Deferred object in a declarative manner, instead of
  // an imperative manner. Order of arguments is specified as the
  // arg list for the function being resolved, then the arg list for
  // the callback function.
  //
  // Example:
  //
  // ```js
  // {
  //   someFunc: resolve("anotherFunc", function(anotherFuncArg, someFuncArg){
  //     return anotherFuncArg + someFuncArg;
  //   }
  // }
  // ```
  //
  function resolve(funcName, cb){
    return function(){

      var self = this, 
          argList = arguments;

      var promise = this[funcName].apply(this, arguments);
      
      $.when(promise).then(function(){
        var parentArgs = Array.prototype.slice.call(argList);
        var args = Array.prototype.slice.call(arguments);

        parentArgs.push(args);
        cb.apply(self, _.flatten(parentArgs));
      });

    }
  }

  // Controller
  // ----------

  var InboxController = function(mainRegion){
    this.mainRegion = mainRegion;
  };

  _.extend(InboxController.prototype, {

    // EXPERIMENTAL: show use of `resolve` function here, to get the
    // email list that needs to be displayed.
    showInbox: resolve("getEmail", function(emailList){
      App.execute("show:mail:list", emailList);
      Backbone.history.navigate("");
    }),

    // EXPERIMENTAL: show use of `resolve` function here, to get the
    // email list and filter it down to the one that is needed.
    showMailById: resolve("getEmail", function(id, emailList){
      var emailItem = emailList.get(id);
      App.execute("show:mail:item", emailItem);
    }),

    // EXPERIMENTAL: show use of `resolve` function here, to get the
    // email list by category
    showMailByCategory: resolve("getEmailByCategory", function(categoryName, emailList){
      Backbone.history.navigate("categories/" + categoryName);
      App.execute("show:mail:list", emailList);
    }),

    getEmail: function(callback){
      return App.request("mail:inbox");
    },

    getEmailByCategory: function(categoryName, callback){
      return App.request("mail:category", categoryName);
    }
  });

  // Initializers
  // ------------

  Inbox.addInitializer(function(){
    Inbox.controller = new InboxController(App.main);
    Inbox.controller.showInbox();
  });

  Inbox.addFinalizer(function(){
    delete Inbox.controller;
  });

});
