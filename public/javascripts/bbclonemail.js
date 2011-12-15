Backbone.View.prototype.render = function(){
  var html = $(this.template).tmpl();
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
