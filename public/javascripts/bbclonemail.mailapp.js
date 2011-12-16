BBCloneMail.MailApp = (function(BBCloneMail, Backbone){
  var MailApp = {};

  MailApp.EmailListView = Backbone.View.extend({
    tagName: "ul",
    className: "email-list",
    template: "#email-list-view-template",

    events: {
      "click header": "expandCollapseEmail"
    },

    expandCollapseEmail: function(e){
      var emailEl = $(e.currentTarget).parent();
      console.log(e);

      var body = emailEl.find(".body");
      console.log(body);
      if (body.length > 0){
        body.remove();
      } else {
        var content = $("#email-body-template").tmpl();
        body = $("<div>");
        body.addClass("body");
        body.html(content);
        emailEl.find("article").append(body);
      }

    }
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
