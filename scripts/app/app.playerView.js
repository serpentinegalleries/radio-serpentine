jQuery(function($){ 

var PlayerModel = Backbone.Model.extend({});

var PlayerModel = Backbone.Collection.extend({
    initialize: function(models, options) {
        this.query = options.query;
        this.fetch();
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
    filterBy: function(filter) {
        this.trigger('filterCollection');
        return new PostData([], {query: filter});
    },
    model: PostModel,
 });

var IndexView = Backbone.View.extend({
    el: '#index-template',
    template: _.template($('#indexTemplate').html()),
    initialize: function(){
        this.listenTo(this.collection, 'add', this.append);
        this.listenTo(this.collection, 'filterCollection', this.render);
    },
    events: {
        "click .menu-nav-item" : "filter"
    },
    append: function( model ) {
        $('#menu-images').append(this.template(model.toJSON())); // See help on Trello for separating elements
    },
    render: function( model ) {
        console.log(model);
    },
    filter: function() {
        var filter = $(event.target).data('category');
        filter = 'get_category_posts/?category_slug=' + filter;
        this.collection.filterBy(filter);
    }
});

var postData = new PostData([], { query: 'get_recent_posts' });
postData.fetch();
var indexView = new IndexView({ collection: postData });

