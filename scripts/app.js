jQuery(function($){ 

var PostData = Backbone.Collection.extend({
    url:"/api/get_recent_posts",
    parse: function(response){
        return response.posts;
    },
    toJSON : function() {
      return this.map(function(model){ return model.toJSON(); });
    }
 });

var IndexView = Backbone.View.extend({
    el: '#index-template',
    template: _.template($('#indexTemplate').html()),
    initialize: function(){
        //this.$el.html(this.template());
        this.listenTo(this.collection, 'reset add change remove', this.render);
        this.collection.fetch();
    },
    render: function () {

        this.collection.each(function(model){
            var post = model.toJSON();
			this.$el.append(this.template(post));
        }, this); 
        //this.$el.html(this.template());

        return this;
    },
});

var postData = new PostData();
var indexView = new IndexView({ collection: postData }); // collection: new PostData() });

});
