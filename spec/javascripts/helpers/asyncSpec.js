AsyncSpec = (function(){

  // Private Methods
  // ---------------
  
  function runAsync(block){
    return function(){
      var done = false;
      var complete = function(){ done = true; }

      runs(function(){
        block(complete);
      });

      waitsFor(function(){
        return done;
      });
    }
  }

  // Constructor Function
  // --------------------

  function AsyncSpec(spec){
    this.spec = spec;
  };

  // Public API
  // ----------

  AsyncSpec.prototype.beforeEach = function(block){
    this.spec.beforeEach(runAsync(block));
  };

  AsyncSpec.prototype.afterEach = function(block){
    this.spec.afterEach(runAsync(block));
  };

  return AsyncSpec;
})();
