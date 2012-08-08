function AsyncSpec(spec){
  this.spec = spec;
};

AsyncSpec.prototype.beforeEach = function(block){
  this.spec.beforeEach(function(){
    var done = false;
    var complete = function(){
      done = true;
    }

    runs(function(){
      block(complete);
    });

    waitsFor(function(){
      return done;
    });
  });
}
