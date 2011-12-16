BBCloneMail.MailApp.MailBox = (function(Backbone, $){
  var ItemView = Backbone.View.extend({
    tagName: "li",
    template: "#email-list-item-template",

    events: {
      "click": "showHideBody"
    },

    showHideBody: function(e){
      $(this.el).find(".body").toggle("fast");
    }
  });

  return Backbone.View.extend({
    tagName: "ul",
    className: "email-list",

    initialize: function(){
      _.bindAll(this, "render", "renderItem");
    },

    events: {
      "click header": "expandCollapseEmail"
    },

    expandCollapseEmail: function(e){
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
