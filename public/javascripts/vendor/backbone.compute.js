// Backbone.Compute, v0.0.1
// Copyright (c)2012 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
// http://github.com/derickbailey/backbone.compute
Backbone.Compute = (function(Backbone, _){

  // Model Initializer
  // -----------------
  //
  // Initializes all of the computed fields for your
  // model. Call `Backbone.Compute(this);` from within your
  // model's `initialize` function.
  function initializeModel(obj){
    for(var field in obj){
      var computeAttr = obj[field];
      
      if (computeAttr && computeAttr.fields && computeAttr.compute){
        obj[field] = computeField(field, computeAttr.fields, computeAttr.compute);
        obj[field].call(obj);
      }

    }
  }

  // Computed Field Definition And Handler
  // -------------------------------------
  //
  // Handles both the definition and execution of
  // computed fields on models.
  //
  // The `fieldName` parameter is the name of the field
  // to `set` in your model, when the dependent fields change
  // and the computed field value is calculated
  //
  // The `fieldList` parameter can either be a single
  // string, or an array of strings, representing the
  // fields on which this computed field relies.
  //
  // The `callback` parameter is the computed field
  // calculator function. This callback recieves a
  // `fields` parameter. It is an object iteral that
  // contains the name/value pairs for the fields that
  // this computed field depends on.
  function computeField(fieldName, fieldList, callback){
    fieldList = _.flatten([fieldList]);
    var length = fieldList.length;

    var fireCallback = function(){
      var fields = {};

      for (var i = 0; i<length; i++){
        var field = fieldList[i];
        fields[field] = this.get(field);
      }

      var value = callback.call(this, fields);
      this.set(fieldName, value);

      return value;
    };

    var computedFunc = function(){
      var cb = _.bind(fireCallback, this);

      for (var i = 0; i<length; i++){
        var field = fieldList[i];
        this.on("change:" + field, cb);
      }

      return cb();
    };

    computedFunc.computedField = true;

    return computedFunc;
  }

  // The raw API for computed fields. Determines whether
  // you are attempting to initialize the model or define
  // a computed field, and call the correct behavior.
  var Compute = function(model){
    return initializeModel(model);
  };

  return Compute;
})(Backbone, _);
