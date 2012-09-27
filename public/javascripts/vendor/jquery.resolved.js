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

$.resolve = (function($){
  var Resolve = function(obj){
    for(var attrName in obj){
      var attr = obj[attrName];
      if (attr && attr.resolve && attr.run){
        obj[attrName] = resolveMethod(attr.resolve, attr.run);
      }
    }
  }

  function resolveMethod(funcName, cb){
    return function(){

      var self = this, 
          argList = arguments;

      var promise = this[funcName].apply(this, arguments);
      
      $.when(promise).then(function(){
        var parentArgs = Array.prototype.slice.call(argList);
        var args = Array.prototype.slice.call(arguments);

        parentArgs.push(args);
        var flatArgs = $.map(parentArgs, function(arg){ return arg; });
        cb.apply(self, flatArgs);
      });

    }
  }

  return Resolve;
})($);
