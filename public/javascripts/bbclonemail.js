Backbone.View.prototype.render = function(){
  var data;

  if (this.model){data = this.model.toJSON();}
  if (this.collection){data = this.collection.toJSON();}

  var html = $(this.template).tmpl(data);
  $(this.el).html(html);
}


BBCloneMail = new Backbone.Marionette.Application();

BBCloneMail.addRegions({
  navigationRegion: "#navigation",
  mainRegion: "#main"
});

BBCloneMail.bind("initialize:after", function(){
  if (Backbone.history){
    Backbone.history.start();
  }
});
