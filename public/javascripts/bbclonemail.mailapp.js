BBCloneMail.MailApp = (function(BBCloneMail, Backbone){
  var MailApp = {};

  MailApp.EmailListView = Backbone.View.extend({
    tagName: "ul",
    className: "email-list",
    template: "#email-list-view-template"
  });

  MailApp.MailCategoriesView = Backbone.View.extend({
    template: "#mail-categories-view-template",

    events: {
      "click a": "categoryClicked"
    },

    categoryClicked: function(e){
      e.preventDefault();
    }
  });

  MailApp.show = function(){
    BBCloneMail.mainRegion.show(new MailApp.EmailListView());
    BBCloneMail.navigationRegion.show(new MailApp.MailCategoriesView());
    BBCloneMail.showRoute("inbox");
    BBCloneMail.AppSelection.showSelection("mail");
  };
  
  return MailApp;
})(BBCloneMail, Backbone);
