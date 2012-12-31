// $.resolved
// ----------
//
// Copyright (C) 2012 Muted Solutions, LLC. All Rights Reserved.
// Distributed under MIT licence
//
// Based on Deferred Method Combinator
// http://docfuncmod.posterous.com/deferred-method-combinator
// 
// To resolve a $.Deferred (promise) from another method, as a 
// pre-requisite to the primary code for a method being executed
//
// Example:
//
// ```js
// MyObj = function(){
//   $.resolve(this);
// }
//
// MyObj.prototype.anotherFunc = function(){
//  var def = $.Deferred();
//  def.resolve("foo");
//  return def.promise();
// }
//
// MyObj.prototype.someFunc = {
//   resolve: "anotherFunc", 
//   run: function(anotherFuncArg, someFuncArg){
//     return anotherFuncArg + someFuncArg;
//   }
// };
//
// var obj = new MyObj();
// obj.someFunc("bar"); // => "foobar"
// ```
//
// You can also specify an array of methods to resolve. Each of
// the return values from the prerequisites will be passed along
// to the `run` function.
//
// ```js
// MyObj.prototype.someFunc = {
//   resolve: ["prereq1", "prereq2", "etc"],
//   run: function(p1, p2, etc){
//     // ...
//   }
// }
// ```

$.resolve = (function($){
  var Resolve = function(obj){
    for(var attrName in obj){
      var attr = obj[attrName];
      if (attr && attr.resolve && attr.run){
        obj[attrName] = resolveMethod(obj, attr.resolve, attr.run);
      }
    }
  }

  function resolveMethod(target, funcNames, runMethod){

    var resolvedMethod = function(){
      var self = target, 
          resolvingArgs = Array.prototype.slice.call(arguments);

      if (!$.isArray(funcNames)){
        funcNames = [funcNames];
      }

      var promises = $.map(funcNames, function(f){
        return self[f].apply(self, resolvingArgs);
      });
      
      $.when.apply($, promises).then(function(){
        var args = Array.prototype.slice.call(arguments);

        resolvingArgs.push(args);

        var flatArgs = $.map(resolvingArgs, function(arg){ return arg; });
        runMethod.apply(self, flatArgs);
      });

    };

    resolvedMethod.run = function(){
      var args = Array.prototype.slice.call(arguments);
      runMethod.apply(target, args);
    };

    return resolvedMethod;
  }

  return Resolve;
})($);
