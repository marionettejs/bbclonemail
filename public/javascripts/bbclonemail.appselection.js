BBCloneMail.AppSelection = (function(BBCloneMail, Backbone){

  var AppSelection = {};

  AppSelection.AppSelectionView = Backbone.View.extend({
    events: {
      "change select": "appChanged"
    },

    appChanged: function(e){
      e.preventDefault();
      var app = $(e.currentTarget).val();
      if (app == "mail"){
        BBCloneMail.MailApp.show();
      } else {
        BBCloneMail.ContactsApp.show();
      }
    },

    setSelection: function(app){
      this.$("select").val(app);
    }
  });

  AppSelection.showSelection = function(app){
    AppSelection.view.setSelection(app);
  }

  BBCloneMail.addInitializer(function(){
    AppSelection.view = new AppSelection.AppSelectionView({
      el: $("#app-selector")
    });
  });

  return AppSelection;
})(BBCloneMail, Backbone);
