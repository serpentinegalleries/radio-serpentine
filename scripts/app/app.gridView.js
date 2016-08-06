jQuery(function($){ 

var PostModel = Backbone.Model.extend({});

var PostData = Backbone.Collection.extend({
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


var postData = new PostData([], { query: 'get_recent_posts' });
postData.fetch();

var GridView = Backbone.View.extend({
    el: '#grid-template',
    template: _.template($('#gridTemplate').html()),
    initialize: function(){
        this.listenTo(this.collection, 'add', this.append);
    },
    append: function( model ) {
        $('#grid-images').append(this.template(model.toJSON())); // See help on Trello for separating elements
    },
    render: function( model ) {
        console.log(model);
    },
});

var gridView = new GridView({ collection: postData });

});

