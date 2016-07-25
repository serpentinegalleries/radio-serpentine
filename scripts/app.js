jQuery(function($){ 

var PostModel = Backbone.Model.extend({});

var PostData = Backbone.Collection.extend({
    initialize: function(models, options) {
        this.query = options.query;
    },
    url:function() {
        return '/api/' + this.query;
    },
    parse: function(response){
        return response.posts;
    },
    toJSON : function() {
      return this.map(function(model){ return model.toJSON(); });
    },
    model: PostModel,
 });

var IndexView = Backbone.View.extend({
    el: '#index-template',
    template: _.template($('#indexTemplate').html()),
    initialize: function(){
        this.listenTo(this.collection, 'add', this.append);
    },
    events: {
        "click .menu-nav-item" : "filter"
    },
    append: function( model ) {
        $('#menu-images').append(this.template(model.toJSON()));
    },
    render: function () {
        this.collection.each(function(model){
            var post = model.toJSON();
        }, this); 
        
        return this;
    },
    filter: function() {
        var filter = $(event.target).data('category');
    }
});

var postData = new PostData([], { query: 'get_recent_posts' });
postData.fetch();
var indexView = new IndexView({ collection: postData });



















/* For the featured track on the header */

var FeaturedData = Backbone.Collection.extend({
    url:"/tag/featured/?json=1",
    parse: function(response){
        return response.posts[0];
    },
    toJSON : function() {
      return this.map(function(model){ return model.toJSON(); });
    }
 });

var HeaderView = Backbone.View.extend({
    el: '#header-template',
    template: _.template($('#headerTemplate').html()),
    initialize: function(){
        this.listenTo(this.collection, 'add', this.append);
        this.collection.fetch();
    },
    append: function( model ) {
        //this.collection = this.collection.parseOne();
        this.$el.append(this.template(model.toJSON()));
    },
    render: function () {
        this.collection.each(function(model){
            var post = model.toJSON();
            this.$el.append(this.template(post));
        }, this); 
        
        return this;
    },
    filter: function() {
        var name = $(event.target).data('category');
    }
});

var headerView = new HeaderView({ collection: new FeaturedData() });

});
