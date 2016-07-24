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
        // this.listenTo(this.collection, 'reset add change remove', this.render);
        this.listenTo(this.collection, 'add', this.append);
        this.collection.fetch();
    },
    append: function( model ) {
        this.$el.append(this.template(model.toJSON()));
    },
    render: function () {
        this.collection.each(function(model){
            var post = model.toJSON();
			this.$el.append(this.template(post));
        }, this); 
        
        return this;
    },
});

var postData = new PostData();
var indexView = new IndexView({ collection: postData }); // collection: new PostData() });

});
