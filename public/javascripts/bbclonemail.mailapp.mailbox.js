// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// MailApp.Mailbox
// ---------------

// The mail box view to display the list of emails
// for the mailbox.
BBCloneMail.MailApp.MailBox = (function(Backbone, $){

  // The item view is private to the MailBox module
  // because the rest of the app does not need to
  // know about it. Only the mailbox itself needs to
  // be concerned with the individual item view.
  var ItemView = Backbone.View.extend({
    tagName: "li",
    template: "#email-list-item-template",

    events: {
      "click": "showHideBody"
    },

    // Show or hide the body of the email when
    // the email header is clicked.
    showHideBody: function(e){
      $(this.el).find(".body").toggle("fast");
    }
  });

  // The actual mail box view, which renders each
  // of the individual email items. You can see here
  // that I'm overriding the `render` method in order
  // to render the collection of item views.
  return Backbone.View.extend({
    tagName: "ul",
    className: "email-list",

    initialize: function(){
      _.bindAll(this, "renderItem");
    },

    render: function(){
      this.collection.each(this.renderItem);
    },

    renderItem: function(item){
      var itemView = new ItemView({
        model: item
      });
      itemView.render();
      $(this.el).append(itemView.el);
    }
  });

})(Backbone, jQuery);
