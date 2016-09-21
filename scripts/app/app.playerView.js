jQuery(function($){ 

var PlayerModel = Backbone.Model.extend({});

var PlayerData = Backbone.Collection.extend({
    initialize: function(models, options) {
        this.query = options.query;
        this.fetch();
    },
    url:function() {
        return '/api/' + this.query;
    },
    parse: function(response){
        return response.post;
    },
    toJSON : function() {
      return this.map(function(model){ return model.toJSON(); });
    },
    model: PlayerModel,
 });

var postSlug = (window.location.pathname).split("/")[2]; //replace(/\//g, "");
var playerData = new PlayerData([], { query: 'get_post/?post_slug=' + postSlug });
playerData.fetch();

var PlayerView = Backbone.View.extend({
    el: '#player-template',
    template: _.template($('#playerTemplate').html()),
    initialize: function(){
        this.listenTo(this.collection, 'add', this.append);
    },
    append: function( model ) {
        this.$el.append(this.template(model.toJSON()));
    },
    render: function( model ) {
    },
});

var playerView = new PlayerView({ collection: playerData });

});

