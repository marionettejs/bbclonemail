BBCloneMail.MailApp.Categories = (function(Backbone, $){

  return Backbone.View.extend({
    template: "#mail-categories-view-template",

    events: {
      "click a": "categoryClicked"
    },

    categoryClicked: function(e){
      e.preventDefault();
    }
  });

})(Backbone, jQuery);
