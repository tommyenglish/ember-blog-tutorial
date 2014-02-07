App = Ember.Application.create();

App.Router.map(function() {
	this.resource('about');
	this.resource('posts');
});