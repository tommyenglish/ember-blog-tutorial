App = Ember.Application.create();

App.Router.map(function() {
	this.resource('about');
	this.resource('posts', function() {
		this.resource('post', { path: ':post_id' });
	});
});

var posts = [{
    id: 1,
    title: 'John&apos;s Thoughts Today',
    author: { first: 'Jonathan', last: 'Doe', name: 'John Doe' },
    date: new Date('2011-05-11'),
    excerpt: 'Lorem ipsum dolor sit amet, consectetur...',
    body: 'Lorem **ipsum** *dolor* sit amet, [consectetur adipisicing elit](#). Dolorum sequi officia in praesentium provident dolore quo placeat et. Soluta `assumenda` modi quasi numquam sequi necessitatibus suscipit debitis earum quas nostrum.'
}, {
    id: 2,
    title: 'Country Cooking',
    author: { first: 'William', last: 'Bob', name: 'Billy Bob' },
    date: new Date('2013-03-17'),
    excerpt: 'Other ipsum dolor sit amet, consectetur...',
    body: 'Other **ipsum** *dolor* sit amet, [consectetur adipisicing elit](#). Dolorum sequi officia in praesentium provident dolore quo placeat et. Soluta `assumenda` modi quasi numquam sequi necessitatibus suscipit debitis earum quas nostrum.'
}];

App.PostsRoute = Ember.Route.extend({
	model: function() {
		return posts;
	}
});

App.PostController = Ember.ObjectController.extend({
	isEditing: false,

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		doneEditing: function() {
			this.set('isEditing', false);
		}
	}
});

App.PostRoute = Ember.Route.extend({
	model: function(params) {
		return posts.findBy('id', parseInt(params.post_id));
	}
});

Ember.Handlebars.helper('format-date', function(date) {
	return moment(date).fromNow();
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
	return new Handlebars.SafeString(showdown.makeHtml(input));
});