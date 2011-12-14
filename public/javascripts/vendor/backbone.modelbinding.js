// Backbone.ModelBinding v0.4.1
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT Liscene
//
// Documentation and Full Licence Availabe at:
// http://github.com/derickbailey/backbone.modelbinding

// ----------------------------
// Backbone.ModelBinding
// ----------------------------

Backbone.ModelBinding = (function (Backbone, _, $) {
  var modelBinding = {
    version: "0.4.1",

    bind: function (view, options) {
      view.modelBinder = new ModelBinder(view, options);
      view.modelBinder.bind();
    },

    unbind: function (view) {
      if (view.modelBinder) {
        view.modelBinder.unbind()
      }
    }
  };

  // scope containing functionality for binding to attr specified by path
  var modelAccess = (function () {

    // Converts path expression string, e.g. "manufacturer.name" to a sequence of objects with data about
    // the parts of the expression
    var parsePathExpression = function () {
      var error = function (description) {
        var message = "Unexpected syntax at position " + index + " in model path '" + text + "': " + description;
        throw {
          name: "SyntaxError",
          message: message,
          index: index,
          text: text
        };
      },
        expressionChain = function () {
          var result = [], first = true;
          white();
          while (current) {
            result.push(expression(first));
            if (white() && current) { // there was some whitespace but not at end, oh no!
              error("Unexpected whitespace in middle of path");
            }
            first = false;
          }
          return result;
        },
        expression = function (first) {
          switch (current) {
            case "[":
              return collectionItemAccess(first);
            default:
              return attributeAccess(first);
          }
        },
        collectionItemAccess = function () {
          var number;
          next("[");
          number = integer();
          next("]");
          return { type: "collectionItemAccess", index: number, text: "[" + number + "]" };
        },
        integer = function () {
          var number, string = "";
          while (current >= "0" && current <= "9") {
            string += current;
            next();
          }
          if (!string) {
            error("Expected a positive number");
          }
          number = +string;
          return number;
        },
        attributeAccess = function (first) {
          var text = "", attrName;
          if (!first) {
            text = next(".");
          }
          attrName = name();
          text += attrName;
          return { type: "attributeAccess", name: attrName, text: text };
        },
        name = function () {
          var string = "";
          if (!/[A-Za-z_]/.test(current)) {
            error("Names used to access an attribute must start with a character or underscore");
          }
          string += next();
          while (/[A-Za-z_0-9]/.test(current)) {
            string += next();
          }
          return string;
        },
        next = function (expected) {
          if (expected && expected != current) {
            error("Expected '" + expected + "' instead of '" + current + "'");
          }
          var previous = text.charAt(index);
          index += 1;
          current = text.charAt(index);
          return previous;
        },
        white = function () {
          var space = "";
          while (current && current <= ' ') {
            space += next();
          }
          return space;
        };
      var text, index, current;
      return function (path) {
        var result;
        text = path;
        index = 0;
        current = (text.length > 0) ? text[index] : "";
        result = expressionChain();
        if (current) {
          error("Unrecognised syntax");
        }
        return result;
      };
    } ();

    // ----------------------------
    // Accessors - Responsible for getting / setting values specified by a path expression (e.g."manufacturer.name") 
    // on a target object (Backbone model or collection). 
    // 
    // A deep path will result in a chain of accessors, for example, an accessor for path "manufacturer.name" would 
    // result in the following hierarchy:
    //
    // RootAccessor - retrieves the root model
    // > AttrAccessor - retrieves the "manufacturer" attr of the root model
    //   > AttrAccessor - retrieves the "name" attr of the Model referenced by parent "manufacturer" expression
    //
    // Accessors do not hold a reference to a specific target but are used by ModelChangeTracker (below) for:
    // 1. accessing attr values
    // 2. binding events to models and collections along the chain
    // ----------------------------

    // References the root model at the start of a chain of access expressions
    var RootAccessor = function () {
      this.get = function (target) {
        return target;
      };
      this.has = function (target) {
        return !_.isNull(target) && !_.isUndefined(target);
      },
      this.bindToTarget = function () {
        return [];
      };
    };

    // Accesses an attribute of a Backbone.Model instance
    var AttrAccessor = function (parent, expression){
      this.get = function (target) {
        var model = this.getModel(target);
        if(model instanceof Backbone.Model && model.has(expression.name)){
          return model.get(expression.name);
        }
        else if (model && !_.isFunction(model[expression.name])) {
          return model[expression.name];
        }
        else {
          return undefined;
        }
      };
      this.has = function(target){
        var model = this.getModel(target);
        if(model instanceof Backbone.Model && model.has(expression.name)){
          return true;
        }
        else {
          return model && expression.name in model;
        }
      };
      this.set = function (target, value) {
        var model = this.getModel(target);
        var mode = "prop";
        if(model instanceof Backbone.Model) {
          var existsAsProperty = model 
            && expression.name in model 
            && !_.isFunction(model[expression.name]);
          if(model.has(expression.name) || !existsAsProperty) {
            // Set attribute on model if not currently attr or property
            mode = "attr"; 
          }
        }
        switch(mode) {
          case "attr":
            var attrs = {};
            attrs[expression.name] = value;
            model.set(attrs);
            break;
          case "prop":
            if(model) {
              if(_.isFunction(model[expression.name])) {
                throw new Error("Property '" + expression.name + "' is a function and cannot be changed via model binding");
              }
              model[expression.name] = value;
            }
        }
      },
      this.getModel = function (target) {
        var model = parent.get(target);
        return model;
      };
      this.bindToTarget = function (target, callback, context) {
        var eventBindings = [];
        var model = parent.get(target);
        if (model instanceof Backbone.Model) {
          var event = "change:" + expression.name;
          model.bind(event, callback, context);
          eventBindings.push(new TargetEventBinding(model, [event], callback));
        }
        var parentEventBindings = parent.bindToTarget(target, callback, context);
        return eventBindings.concat(parentEventBindings);
      };
    };
    AttrAccessor.expressionType = "attributeAccess";

    // Access model within a Backbone.Collection by index
    var CollectionItemAccessor = function (parent, expression) {
      this.get = function (target) {
        var collection = parent.get(target);
        if (collection instanceof Backbone.Collection) {
          return collection.at(expression.index);
        } else if(_.isArray(collection)) {
          return collection[expression.index];
        }
      };
      this.has = function (target) {
        var collection = parent.get(target);
        return collection.length > expression.index;
      },
      this.set = function (target, value) {
        var collection = parent.get(target);
        if (collection instanceof Backbone.Collection) {
          throw ("Setting an item in a Backbone collection is not supported by modelbinding. Elements in the view can be bound to attributes of models in the collection, but not directly to models");
        }
        else if (_.isArray(collection)) {
          collection[expression.index] = value;
        }
      };
      this.bindToTarget = function (target, callback, context) {
        var eventBindings = [];
        var collection = parent.get(target);
        if (collection instanceof Backbone.Collection) {
          // track events that affect position of item
          var events = ["add", "remove", "reset"];
          _.each(events, function (event) {
            collection.bind(event, callback, context);
          });
          eventBindings.push(new TargetEventBinding(collection, events, callback));
        }
        var parentEventBindings = parent.bindToTarget(target, callback, context);
        return eventBindings.concat(parentEventBindings);
      };
    };
    CollectionItemAccessor.expressionType = "collectionItemAccess";

    // Tracks model or collection events bound to the "change" callback of ModelChangeTracker
    // so they can be unbound
    var TargetEventBinding = function (target, eventNames, callback) {
      this.unbindFromTarget = function () {
        _.each(eventNames, function (eventName) {
          target.unbind(eventName, callback);
        }, this);
      };
    };

    var accessorTypes = [AttrAccessor, CollectionItemAccessor];

    var buildAccessor = function (path) {
      var expressions = parsePathExpression(path);
      var accessor = _.reduce(expressions, function (parent, expression) {
        var accessorType = _.detect(accessorTypes, function (a) { return a.expressionType === expression.type; });
        return new accessorType(parent, expression);
      }, new RootAccessor(), this);

      return accessor;
    };

    // ----------------------------
    // ModelChangeTracker - Manages get / set of attr specified by a path expression and monitors for changes to
    // the specified attribute// 
    // ----------------------------
    var ModelChangeTracker = function (target, accessor, path) {
      this.target = target;
      this.accessor = accessor;
    this.path = path;
      this.currentValue = this.getValue(this.target);
      this.currentBindings = [];
      var self = this;
      this.changeCallback = function() { self.change(); }; // func must belong to instance, not prototype to allow unbinding
      this.bindToTargets();
    };
    _.extend(ModelChangeTracker.prototype, Backbone.Events, {
      change: function () {
        this.triggerChange();
        // Any targets along chain that we are bound to may be different instances,
        // so we need to rebind. Certain types of change (attr change at end of chain) 
        // don't require a rebind - could optimise for this...
        this.unbindFromTargets();
        this.bindToTargets();
      },
      triggerChange: function () {
        var value = this.getValue();
        if (value !== this.currentValue) {
          this.trigger("change", { value: value });
        }
        this.currentValue = value;
      },
      unbindFromTargets: function () {
        _.each(this.currentBindings, function (b) { b.unbindFromTarget(); });
      },
      bindToTargets: function () {
        this.currentBindings = this.accessor.bindToTarget(this.target, this.changeCallback, this);
      },
      getValue: function () {
        return this.accessor.get(this.target);
      },
      setValue: function (value) {
        this.accessor.set(this.target, value);
      },
      hasValue: function () {
        return this.accessor.has(this.target);
      }
    });

    return {
      accessorFor: function (path) {
        var accessor = buildAccessor(path);
        return accessor;
      },
      changeTrackerFor: function (target, path) {
        var accessor = this.accessorFor(path);
        var binder = new ModelChangeTracker(target, accessor, path);
        return binder;
      }
    };
  })();

  modelBinding.modelAccess = modelAccess; // expose for testing

  ModelBinder = function (view, options) {
    this.config = new modelBinding.Configuration(options);
    this.changeTrackerBindings = [];
    this.modelBindings = [];
    this.elementBindings = [];

    this.bind = function () {
      var conventions = modelBinding.Conventions;
      for (var conventionName in conventions) {
        if (conventions.hasOwnProperty(conventionName)) {
          var conventionElement = conventions[conventionName];
          var handler = conventionElement.handler;
          var conventionSelector = conventionElement.selector;
          handler.bind.call(this, conventionSelector, view, view.model, this.config);
        }
      }
    }

    this.unbind = function () {

      _.each(this.changeTrackerBindings, function (binding) {
        binding.changeTracker.unbindFromTargets();
        binding.changeTracker.unbind("change", binding.callback);
      });

      // unbind the html element bindings
      _.each(this.elementBindings, function (binding) {
        binding.element.unbind(binding.eventName, binding.callback);
      });

      // unbind the model bindings
      _.each(this.modelBindings, function (binding) {
        binding.model.unbind(binding.eventName, binding.callback);
      });
    }

    this.registerChangeTrackerBinding = function (changeTracker, callback) {
      changeTracker.bind("change", callback);
      this.changeTrackerBindings.push({ changeTracker: changeTracker, callback: callback });
    },

    this.registerModelBinding = function (model, attribute_name, callback) {
      // bind the model changes to the form elements
      var eventName = "change:" + attribute_name;
      model.bind(eventName, callback);
      this.modelBindings.push({ model: model, eventName: eventName, callback: callback });
    }

    this.registerElementBinding = function (element, callback) {
      // bind the form changes to the model
      element.bind("change", callback);
      this.elementBindings.push({ element: element, eventName: "change", callback: callback });
    }
  }

  // ----------------------------
  // Model Binding Configuration
  // ----------------------------
  modelBinding.Configuration = function (options) {
    this.bindingAttrConfig = {};

    _.extend(this.bindingAttrConfig,
      modelBinding.Configuration.bindindAttrConfig,
      options
    );

    if (this.bindingAttrConfig.all) {
      var attr = this.bindingAttrConfig.all;
      delete this.bindingAttrConfig.all;
      for (var inputType in this.bindingAttrConfig) {
        if (this.bindingAttrConfig.hasOwnProperty(inputType)) {
          this.bindingAttrConfig[inputType] = attr;
        }
      }
    }

    this.getBindingAttr = function (type) {
      return this.bindingAttrConfig[type];
    };

    this.getBindingValue = function (element, type) {
      var bindingAttr = this.getBindingAttr(type);
      return element.attr(bindingAttr);
    };

  };

  modelBinding.Configuration.bindindAttrConfig = {
    text: "id",
    textarea: "id",
    password: "id",
    radio: "name",
    checkbox: "id",
    select: "id",
    number: "id",
    range: "id",
    tel: "id",
    search: "id",
    url: "id",
    email: "id"

  };

  modelBinding.Configuration.store = function () {
    modelBinding.Configuration.originalConfig = _.clone(modelBinding.Configuration.bindindAttrConfig);
  };

  modelBinding.Configuration.restore = function () {
    modelBinding.Configuration.bindindAttrConfig = modelBinding.Configuration.originalConfig;
  };

  modelBinding.Configuration.configureBindingAttributes = function (options) {
    if (options.all) {
      this.configureAllBindingAttributes(options.all);
      delete options.all;
    }
    _.extend(modelBinding.Configuration.bindindAttrConfig, options);
  };

  modelBinding.Configuration.configureAllBindingAttributes = function (attribute) {
    var config = modelBinding.Configuration.bindindAttrConfig;
    config.text = attribute;
    config.textarea = attribute;
    config.password = attribute;
    config.radio = attribute;
    config.checkbox = attribute;
    config.select = attribute;
    config.number = attribute;
    config.range = attribute;
    config.tel = attribute;
    config.search = attribute;
    config.url = attribute;
    config.email = attribute;
  };

  // ----------------------------
  // Text, Textarea, and Password Bi-Directional Binding Methods
  // ----------------------------
  StandardBinding = (function (Backbone) {
    var methods = {};

    var _getElementType = function (element) {
      var type = element[0].tagName.toLowerCase();
      if (type == "input") {
        type = element.attr("type");
        if (type == undefined || type == '') {
          type = 'text';
        }
      }
      return type;
    };

    methods.bind = function (selector, view, model, config) {
      var modelBinder = this;

      view.$(selector).each(function (index) {
        var element = view.$(this);
        var elementType = _getElementType(element);
        var attribute_path = config.getBindingValue(element, elementType);
        if (!attribute_path) return;

        var changeTracker = modelAccess.changeTrackerFor(model, attribute_path);
        var modelChange = function (ev) { element.val(ev.value); };
        var elementChange = function (ev) {
          changeTracker.setValue(view.$(ev.target).val());
        };

        modelBinder.registerChangeTrackerBinding(changeTracker, modelChange);
        modelBinder.registerElementBinding(element, elementChange);

        // set the default value on the form, from the model
        var attr_value = changeTracker.getValue();
        if (typeof attr_value !== "undefined" && attr_value !== null) {
          element.val(attr_value);
        } else {
          var elVal = element.val();
          if (elVal) {
            changeTracker.setValue(elVal);
          }
        }
      });
    };

    return methods;
  })(Backbone);

  // ----------------------------
  // Select Box Bi-Directional Binding Methods
  // ----------------------------
  SelectBoxBinding = (function (Backbone) {
    var methods = {};

    methods.bind = function (selector, view, model, config) {
      var modelBinder = this;

      view.$(selector).each(function (index) {
        var element = view.$(this);
        var attribute_path = config.getBindingValue(element, 'select');
        if (!attribute_path) return;

        var changeTracker = modelAccess.changeTrackerFor(model, attribute_path);
        var textAttrAccessor = modelAccess.accessorFor(attribute_path + "_text");
        var modelChange = function (ev) { element.val(ev.value); };
        var elementChange = function (ev) {
          var targetEl = view.$(ev.target);
          var value = targetEl.val();
          var text = targetEl.find(":selected").text();
          setModelValue(value, text);
        };

        var setModelValue = function (val, text) {
          changeTracker.setValue(val);
          textAttrAccessor.set(model, text);
        };

        modelBinder.registerChangeTrackerBinding(changeTracker, modelChange);
        modelBinder.registerElementBinding(element, elementChange);

        // set the default value on the form, from the model
        var attr_value = changeTracker.getValue();
        if (typeof attr_value !== "undefined" && attr_value !== null) {
          element.val(attr_value);
        }

        // set the model to the form's value if there is no model value
        if (element.val() != attr_value) {
          var value = element.val();
          var text = element.find(":selected").text();
          setModelValue(value, text);
        }
      });
    };

    return methods;
  })(Backbone);

  // ----------------------------
  // Radio Button Group Bi-Directional Binding Methods
  // ----------------------------
  RadioGroupBinding = (function (Backbone) {
    var methods = {};

    methods.bind = function (selector, view, model, config) {
      var modelBinder = this;

      var foundElements = [];
      view.$(selector).each(function (index) {
        var element = view.$(this);

        var group_path = config.getBindingValue(element, 'radio');
        if (!group_path) return;
        if (!foundElements[group_path]) {
          foundElements[group_path] = true;
          var bindingAttr = config.getBindingAttr('radio');

          var changeTracker = modelAccess.changeTrackerFor(model, group_path);
          var modelChange = function (ev) {
            var value_selector = "input[type=radio][" + bindingAttr + "=" + group_path + "][value=" + ev.value + "]";
            view.$(value_selector).attr("checked", "checked");
          };
          modelBinder.registerChangeTrackerBinding(changeTracker, modelChange);

          var setModelValue = function (val) {
            changeTracker.setValue(val);
          };

          // bind the form changes to the model
          var elementChange = function (ev) {
            var element = view.$(ev.currentTarget);
            if (element.is(":checked")) {
              changeTracker.setValue(element.val());
            }
          };

          var group_selector = "input[type=radio][" + bindingAttr + "=" + group_path + "]";
          view.$(group_selector).each(function () {
            var groupEl = $(this);
            modelBinder.registerElementBinding(groupEl, elementChange);
          });

          var attr_value = changeTracker.getValue();
          if (typeof attr_value !== "undefined" && attr_value !== null) {
            // set the default value on the form, from the model
            var value_selector = "input[type=radio][" + bindingAttr + "=" + group_path + "][value=" + attr_value + "]";
            view.$(value_selector).attr("checked", "checked");
          } else {
            // set the model to the currently selected radio button
            var value_selector = "input[type=radio][" + bindingAttr + "=" + group_path + "]:checked";
            var value = view.$(value_selector).val();
            changeTracker.setValue(value);
          }
        }
      });
    };

    return methods;
  })(Backbone);

  // ----------------------------
  // Checkbox Bi-Directional Binding Methods
  // ----------------------------
  CheckboxBinding = (function (Backbone) {
    var methods = {};

    methods.bind = function (selector, view, model, config) {
      var modelBinder = this;

      view.$(selector).each(function (index) {
        var element = view.$(this);
        var bindingAttr = config.getBindingAttr('checkbox');
        var attribute_path = config.getBindingValue(element, 'checkbox');
        if (!attribute_path) return;

        var changeTracker = modelAccess.changeTrackerFor(model, attribute_path);
        var modelChange = function (ev) {
          if (ev.value) {
            element.attr("checked", "checked");
          }
          else {
            element.removeAttr("checked");
          }
        };

        var elementChange = function (ev) {
          var changedElement = view.$(ev.target);
          var checked = changedElement.is(":checked") ? true : false;
          changeTracker.setValue(checked);
        };

        modelBinder.registerChangeTrackerBinding(changeTracker, modelChange);
        modelBinder.registerElementBinding(element, elementChange);

        if (changeTracker.hasValue()) {
          // set the default value on the form, from the model
          var attr_value = changeTracker.getValue();
          if (typeof attr_value !== "undefined" && attr_value !== null && attr_value != false) {
            element.attr("checked", "checked");
          }
          else {
            element.removeAttr("checked");
          }
        } else {
          // bind the form's value to the model
          var checked = element.is(":checked") ? true : false;
          changeTracker.setValue(checked);
        }
      });
    };

    return methods;
  })(Backbone);

  // ----------------------------
  // Data-Bind Binding Methods
  // ----------------------------
  DataBindBinding = (function (Backbone, _, $) {
    var dataBindSubstConfig = {
      "default": ""
    };

    modelBinding.Configuration.dataBindSubst = function (config) {
      this.storeDataBindSubstConfig();
      _.extend(dataBindSubstConfig, config);
    };

    modelBinding.Configuration.storeDataBindSubstConfig = function () {
      modelBinding.Configuration._dataBindSubstConfig = _.clone(dataBindSubstConfig);
    };

    modelBinding.Configuration.restoreDataBindSubstConfig = function () {
      if (modelBinding.Configuration._dataBindSubstConfig) {
        dataBindSubstConfig = modelBinding.Configuration._dataBindSubstConfig;
        delete modelBinding.Configuration._dataBindSubstConfig;
      }
    };

    modelBinding.Configuration.getDataBindSubst = function (elementType, value) {
      var returnValue = value;
      if (value === undefined) {
        if (dataBindSubstConfig.hasOwnProperty(elementType)) {
          returnValue = dataBindSubstConfig[elementType];
        } else {
          returnValue = dataBindSubstConfig["default"];
        }
      }
      return returnValue;
    };

    setOnElement = function (element, attr, val) {
      var valBefore = val;
      val = modelBinding.Configuration.getDataBindSubst(attr, val);
      switch (attr) {
        case "html":
          element.html(val);
          break;
        case "text":
          element.text(val);
          break;
        case "enabled":
          element.attr("disabled", !val);
          break;
        case "displayed":
          element[val ? "show" : "hide"]();
          break;
        case "hidden":
          element[val ? "hide" : "show"]();
          break;
        default:
          element.attr(attr, val);
      }
    };

    splitBindingAttr = function (element) {
      var dataBindConfigList = [];
      var databindList = element.attr("data-bind").split(";");
      _.each(databindList, function (attrbind) {
        var databind = $.trim(attrbind).split(" ");

        // make the default special case "text" if none specified
        if (databind.length == 1) databind.unshift("text");

        dataBindConfigList.push({
          elementAttr: databind[0],
          modelAttrPath: databind[1]
        });
      });
      return dataBindConfigList;
    };

    var methods = {};

    methods.bind = function (selector, view, model, config) {
      var modelBinder = this;

      view.$(selector).each(function (index) {
        var element = view.$(this);
        var databindList = splitBindingAttr(element);

        _.each(databindList, function (databind) {
          var modelChange = function (ev) {
            setOnElement(element, databind.elementAttr, ev.value);
          };
          var changeTracker = modelAccess.changeTrackerFor(model, databind.modelAttrPath);
          modelBinder.registerChangeTrackerBinding(changeTracker, modelChange);

          // set default on data-bind element
          setOnElement(element, databind.elementAttr, changeTracker.getValue());
        });

      });
    };

    return methods;
  })(Backbone, _, $);


  // ----------------------------
  // Binding Conventions
  // ----------------------------
  modelBinding.Conventions = {
    text: { selector: "input:text", handler: StandardBinding },
    textarea: { selector: "textarea", handler: StandardBinding },
    password: { selector: "input:password", handler: StandardBinding },
    radio: { selector: "input:radio", handler: RadioGroupBinding },
    checkbox: { selector: "input:checkbox", handler: CheckboxBinding },
    select: { selector: "select", handler: SelectBoxBinding },
    databind: { selector: "*[data-bind]", handler: DataBindBinding },
    // HTML5 input
    number: { selector: "input[type=number]", handler: StandardBinding },
    range: { selector: "input[type=range]", handler: StandardBinding },
    tel: { selector: "input[type=tel]", handler: StandardBinding },
    search: { selector: "input[type=search]", handler: StandardBinding },
    url: { selector: "input[type=url]", handler: StandardBinding },
    email: { selector: "input[type=email]", handler: StandardBinding }
  };

  return modelBinding;
})(Backbone, _, jQuery);

