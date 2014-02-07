Ember Blog Tutorial
===
Ember is an MVC javascript framework that's good for URL driven web apps. It uses the jQuery and handlebars libraries. As described on the [Ember.js](http://emberjs.com) website, the use of handlebars makes it possible to get more done with less code. The integrated templates allow for powerful data binding that happens automatically. Ember.js enables you to spend less time reinventing the wheel by using common idioms and by following Ember conventions, rapid devlopment ensues. Ember was built for developer productivity. It's intuitive and has friendly APIs to get the job done quickly.

Personally, I think Ember is a great framework for building small apps, super fast. This tutorial is directly based off of the blog tutorial created and presented by Tom Dale, the creator of Ember and available to watch at <https://www.youtube.com/watch?v=1QHrlFlaXdI>. It's a really good tutorial, although he runs through it a bit fast.

I've basically broken down the steps presented in his video tutorial into logical pieces and have tagged the solution (using git) to enable these steps to be checked out. Below the steps are outlined with the associated tag name. Checking out the associated tag name will bring the solution into the state of that step being completed. So if one checks out step1 for example, the solution would be in a state where step 1 is completed, ready to begin step 2. The command to do this is 'git checkout -f tagname'. This will throw away any local changes as well. The commands will be listed at the end of each step.

Step 1 - Getting Started
---
Boilerplate Ember code is available on the [Ember](http://emberjs.com) website. Simply download the starter kit. For this tutorial, do a 'git checkout -f step0' to essentially put the project in this state.

Install the Ember Inspector add-on for Chrome. This is a great tool that you use along with the Chrome developer tools and really helps in understanding and debugging Ember applications.

Now let's open the project and see what it looks like. Pretty basic stuff here with css and js folders. This solution has three additional libraries. In the css folder, bootstrap.css has been added to help make this tutorial pretty without having to be a CSS expert. In the js/libs folder, showdown.js and moment.min.js have been added. Showdown is a markdown to html conversion library and moment is a date formatting library. We'll make use of all of these libraries in this tutorial. 

###End of Step 1 - git checkout -f step1
- - -

Step 2 - Blog Master Template
---
In app.js, remove everything but the create function call at the top which boots up Ember. When calling Ember things, you can use 'Ember' or 'Em'. 
```
App = Ember.Application.create();
```
or
```
App = Em.Application.create();
```
  
In index.html, remove the existing templates and add one as a starting point for the blog:
```
<script type="text/x-handlebars">
    <div class="navbar">
        <div class="navbar-inner">
            <a class="brand" href="#">EmBlog</a>
            <ul class="nav">
                <li><a href="#">Posts</a></li>
                <li><a>About</a></li>
            </ul>
        </div>
    </div>
</script> 
```
  
This will be the master template that everything else will be pushed into. Open this page up in the browser and we should see the template rendered. Notice the posts and about links.

### End of Step 2 - git checkout -f step2
- - - 

Step 3 - The About Page
---
Let's implement the about page. When about is clicked, we want to render the about template to the screen.

To render a template to the screen, think about what url is associated with it. To define urls, use App.Router.map. Remember App is the Ember application we defined on the first line of app.js. It takes a function and we can define routes there. In app.js add:
```
App.Router.map(function() {
    this.resource('about');
});
```
  
Now that the about route is defined, let's define the template. It's similar to the template we previously created, but we give it an id of about. In index.html:
```
<script type="text/x-handlebars" id="about">
	<div class="about">
        <p>Lorem ipsum dolor sit amet, <a href="consectetur">adipisicing elit</a>. Nulla maxime rem non autem labore sint placeat. Non voluptas ipsam ut natus earum quisquam perferendis culpa architecto accusamus illo laboriosam rerum!. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus tempora accusamus nostrum quis facilis facere reprehenderit perspiciatis ea alias odio libero maiores eveniet ut sapiente eligendi maxime iure impedit unde.</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla maxime rem non autem labore sint placeat. Non voluptas ipsam ut natus earum quisquam perferendis culpa architecto accusamus illo laboriosam rerum!. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus tempora accusamus nostrum quis facilis facere reprehenderit perspiciatis ea alias odio libero maiores eveniet ut sapiente eligendi maxime iure impedit unde.</p>
    </div>
    <div class="about">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla maxime rem non autem labore sint placeat. Non voluptas ipsam ut natus earum quisquam perferendis culpa architecto accusamus illo laboriosam rerum!. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus tempora accusamus nostrum quis facilis facere reprehenderit perspiciatis ea alias odio libero maiores eveniet ut sapiente eligendi maxime iure impedit unde.</p>
    </div>
</script>
```
  
Switch back to browser and refresh the page. Nothing happens. =/

Why not? Well, we need to go to that route by adding '#/about' to the URL.

Still nothing. We need an outlet in the application template (the first template we made in the beginning that's always visible to the user). We use the outlet tag for that:
```
<script type="text/x-handlebars">
    <div class="navbar">
        <div class="navbar-inner">
            <a class="brand" href="#">EmBlog</a>
            <ul class="nav">
                <li><a href="#">Posts</a></li>
                <li><a>About</a></li>
            </ul>
        </div>
    </div>

    {{outlet}}
</script> 
```
  
This outlet tag lets Ember know that additional templates rendered will go there and the template rendered depends on the URL.

Now go back to browser and refresh. We should see the about page as we'd expect to see it.

#### Ember Inspector
Let's take a moment to introduce the Ember Inspector. In Chrome, open up the dev tools and you should see an Ember tab. Click on it. If you've opened the about page with the file protocol, you will need to make sure it's turned on in Ember. Go to preferences, extensions, ember and turn on the file thing.   

We can now see it detects an ember app and it's showing a hierarchy of templates and highlights stuff. We can see routes defined in the app and what controller they use. This inspector provides helpful information and is very useful in knowing what's going on in the app.

### End of Step 3 - git checkout -f step3
- - -

Step 4 - Enabling Links with the 'link-to' Helper
---
Now lets get the links working.

First let's add a posts route. It's just a placeholder for now, we'll add a template for posts later.
```
App.Router.map(function() {
	this.resource('about');
	this.resource('posts');
});
```
  
Replace the a tag links with the handlebars helper 'link-to':
```
<script type="text/x-handlebars">
    <div class="navbar">
        <div class="navbar-inner">
            <a class="brand" href="#">EmBlog</a>
            <ul class="nav">
                <li>{{#link-to 'posts'}}Posts{{/link-to}}</li>
                <li>{{#link-to 'about'}}About{{/link-to}}</li>
            </ul>
        </div>
    </div>

    {{outlet}}
</script> 
```
  
Switch back to browser and refresh the page. In the inspector, see that we now have a posts route.

Click on the about link and see that the about template loads. Clicking on posts would display a posts template if we had one defined. 

As we click between the links, notice the URL change. We're not writing the code to do that. It comes for free by following Ember's conventions.

Add active class css rule in style.css:
```
.active { font-weight: bold; }
```
  
Now refresh the page and notice the style is in effect. This comes free when using the link-to helper, the active class is automatically added. Nice eh?

### End of Step 4 - git checkout -f step4
- - -

Step 5 - Posts Template and Data
---
Now we'd like to implement a posts template that will display a dynamically generated list of posts backed from something like json objects that would typically come from a database. 

In ember, a template is backed by a model (usually json). When model data changes, the associated template automatically updates as well. So remember, templates are backed by models.

Now we want to create a posts template and specify a model to back the template:
```
<script type="text/x-handlebars" id="posts">
	<div class="container-fluid">
	    <div class="row-fluid">
	        <div class="span3">
	        	<table class="table">
	        		<thead>
	    				<tr><th>Recent Posts</th></tr>
	        		</thead>
	        		{{#each}}
	        			<tr>
	    					<td>
	    						{{title}} <small class="muted">by {{author.name}}</small>	
	    					</td>
	        			</tr>
	        		{{/each}}
	    		</table>
			</div>
	    </div>
	</div>
</script>
```

We're using the handlebars 'each' helper here that will iterate if the model is an array.

Now we'll create some fake data (plain old javascript objects) for some model data in app.js:
```
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
```
  
Now how do we hook up the model and the template? With a route. A route specifies which model a template should be backed by. Routes have a method called model which is a hook that Ember calls to see what model to use. Create a posts route that returns some data: 
```
App.PostsRoute = Ember.Route.extend({
	model: function() {
		return posts;
	}
});
```
  
Now refresh the page and see that a list of posts is now showing up. Woot!

### End of Step 5 - git checkout -f step5
- - -

Step 6 - Detailed Post Information
---
Now we want to show detailed information about a post. Think about the URL.

Create a new resource called post, but this one will have a different model depending on what post we want. We can capture that in the URL by passing in an options hash.
```
App.Router.map(function() {
	this.resource('about');
	this.resource('posts');
	this.resource('post', { path: ':post_id' });
});
```

Now lets go create that template. It's just like the others with bound values, but this one reflects the properties of a post.
```
<script type="text/x-handlebars" id="post">
	<h1>{{title}}</h1>
	<h2>by {{author.name}} <small class='muted'>({{date}})</small></h2>

	<hr>

	<div class='intro'>
		{{excerpt}}
	</div>

	<div class='below-the-fold'>
		{{body}}
	</div>
</script>
```
  
Now that we have the template, how do we tell the app to transition to the post template and show the right post?

We'll use the link-to helper in the posts template:
```
<script type="text/x-handlebars" id="posts">
	<div class="container-fluid">
	    <div class="row-fluid">
	        <div class="span3">
	        	<table class="table">
	        		<thead>
	    				<tr><th>Recent Posts</th></tr>
	        		</thead>
	        		{{#each}}
	        			<tr>
	    					<td>
	    						{{#link-to 'post'}}
	    							{{title}} <small class="muted">by {{author.name}}</small>
	    						{{/link-to}}	
	    					</td>
	        			</tr>
	        		{{/each}}
	    		</table>
			</div>
	    </div>
	</div>
</script>
```
  
The 'link-to' helper can take an additional parameter for the model we want to display. By passing 'this', we're passing the current model in the iteration of the each helper.
```
<script type="text/x-handlebars" id="posts">
	<div class="container-fluid">
	    <div class="row-fluid">
	        <div class="span3">
	        	<table class="table">
	        		<thead>
	    				<tr><th>Recent Posts</th></tr>
	        		</thead>
	        		{{#each}}
	        			<tr>
	    					<td>
	    						{{#link-to 'post' this}}
	    							{{title}} <small class="muted">by {{author.name}}</small>
	    						{{/link-to}}	
	    					</td>
	        			</tr>
	        		{{/each}}
	    		</table>
			</div>
	    </div>
	</div>
</script> 
```

Now go refresh the page and see that the posts have turned into links and clicking on them takes us to a page displaying the post. Notice the URL changes and is using the post id in it.

### End of Step 6 - git checkout -f step6
- - -

Step 7 - Nested Routes
---
Now depending on what was designed, the previous way of displaying posts could work fine. However, let's say we want the post to render alongside the list of posts.

So we don't want to switch out the templates, but render the post template inside of the posts template. Ember allows us to do this with nested routes.

Instead of posts and post being siblings, we'll move post inside of posts like so:
```
App.Router.map(function() {
	this.resource('about');
	this.resource('posts', function() {
		this.resource('post', { path: ':post_id' });
	});
});
```
  
Now we just need to make sure that the posts template has an outlet for the nested template to be displayed in.
```
<script type="text/x-handlebars" id="posts">
	<div class="container-fluid">
	    <div class="row-fluid">
	        <div class="span3">
	        	<table class="table">
	        		<thead>
	    				<tr><th>Recent Posts</th></tr>
	        		</thead>
	        		{{#each}}
	        			<tr>
	    					<td>
	    						{{#link-to 'post' this}}
	    							{{title}} <small class="muted">by {{author.name}}</small>
	    						{{/link-to}}	
	    					</td>
	        			</tr>
	        		{{/each}}
	    		</table>
			</div>
			<div class="span9">
				{{outlet}}
			</div>
	    </div>
	</div>
</script> 
```
  
Refresh the page to see it working. In the inspector, note the new hierarchy of the templates. See the active class working on the links here too.

### End of Step 7 - git checkout -f step7
- - -

Step 8 - Editing a Post
---
Add some editing UI to the post template:
```
<script type="text/x-handlebars" id="post">
	{{#if isEditing}}
	    {{partial 'post/edit'}}
	    <button {{action 'doneEditing'}}>Done</button>
	{{else}}
	    <button {{action 'edit'}}>Edit</button>
	{{/if}}

	<h1>{{title}}</h1>
	<h2>by {{author.name}} <small class='muted'>({{date}})</small></h2>

	<hr>

	<div class='intro'>
		{{excerpt}}
	</div>

	<div class='below-the-fold'>
		{{body}}
	</div>
</script>
```

Ok, what does all this new stuff mean? 

We have an if/else helper that says if we're in editing mode, show editing controls and when we're not in editing mode, just show a button that will take us to editing mode. 

We also have some buttons with action helpers that can be used to send an event to the applications controller or a route.
So it'll send the edit action when the edit button is clicked and send the doneEditing action when the done button is clicked.

But where are isEditing, doneEditing, and edit defined and handled? Enter the Ember controller. An ember controller can be used to store application state and respond to events. Controllers don't generally store persistent state, that's what models are for. isEditing doesn't need to persist mostly because we wouldn't expect the page to be in editing mode on page refresh. Since we're creating a controller for a post, we use the naming convention of PostController to get things wired up like so:
```
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
```
  
Now we've defined and set a value for isEditing and the button clicks are now handled by this controller through the actions property.

The partial helper in the post template enables us to inject a template. We are injecting one called post/edit. This helps to break up templates as they get bigger, to promote reuse, etc.
```
<script type="text/x-handlebars" id="post/_edit">
	<p>{{input type="text" value=title}}</p>
	<p>{{input type="text" value=excerpt}}</p>
	<p>{{textarea value=body}}</p>
</script>
```
  
Refresh the page, click on a post, and click edit. See that the data is live bound and updates everywhere. Clicking done will end editing. Things are looking pretty good...

But we have a problem. Clicking refresh borks it all. Why? When we refresh, the models with the data are thrown away. We need the app to reconstruct the models from the URL.

In Ember, the object responsible for providing a model to back a template is a route. And params can be passed in. Since the router defined some params that will be passed in, we can access them in the route using params.
```
App.PostRoute = Ember.Route.extend({
	model: function(params) {
		return posts.findBy('id', parseInt(params.post_id));
	}
});
```
  
findBy is a function made available by the Ember API. Refresh the page and see that it now works.

### End of Step 8 - git checkout -f step8
- - -

Step 9 - Custom Helpers
---
When viewing a post, there's some ugliness on the page. The date looks horrible, the body of a blog entry is in markdown and looks bad, and some blog titles have escaped HTML in them. Ugh.

#### Format Date
First, let's create a handlebars helper to see what can be done to make the date pretty. We'll call it 'format-date' and use the moment library to make dates pretty.
```
Ember.Handlebars.helper('format-date', function(date) {
	return moment(date).fromNow();
});
``` 

To use this custom helper, go to a piece of data where we want the filter applied and simply add it at the front. An ugly date goes in and a pretty date comes out.
```
<script type="text/x-handlebars" id="post">
  {{#if isEditing}}
      {{partial 'post/edit'}}
      <button {{action 'doneEditing'}}>Done</button>
  {{else}}
      <button {{action 'edit'}}>Edit</button>
  {{/if}}
  
  <h1>{{title}}</h1>
  <h2>by {{author.name}} <small class='muted'>({{format-date date}})</small></h2>
  
  <hr>
  
  <div class='intro'>
    {{excerpt}}
  </div>
  
  <div class='below-the-fold'>
    {{body}}
  </div>
</script>
```
  
Refresh the page and see how much better the date looks.

#### Convert Markdown
Notice that the body of our entries is in markdown. Can we create a filter to make that show the HTML represented?

Yep. We can use the showdown library to make this a snap:
```
var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
	return new Handlebars.SafeString(showdown.makeHtml(input));
});
```
  
Handlebars by default escapes any HTML returned to prevent XSS attacks. To opt out, use safestring. Essentially it enables you to tell Ember and handlebars that you take responsibility for the text.

Now apply the filter where we have markdown that we want to turn into HTML:
```
<script type="text/x-handlebars" id="post">
  {{#if isEditing}}
      {{partial 'post/edit'}}
      <button {{action 'doneEditing'}}>Done</button>
  {{else}}
      <button {{action 'edit'}}>Edit</button>
  {{/if}}
  
  <h1>{{title}}</h1>
  <h2>by {{author.name}} <small class='muted'>({{format-date date}})</small></h2>
  
  <hr>
  
  <div class='intro'>
    {{format-markdown excerpt}}
  </div>
  
  <div class='below-the-fold'>
    {{format-markdown body}}
  </div>
</script>
```
  
Refresh a post and notice we have nicely formatted text instead of straight up markdown. Now edit a post and add markdown and notice it update as HMTL in the post. Nice!

#### Escaping HTML
Handlebars HTML-escapes values returned by a {{expression}}. If you don't want handlebars to escape a value, use the "triple-stash". So use {{{expression}}}.

### End of Step 9 - git checkout -f step9
- - -

Step 10 - Live Data
Instead of using fixture data, let's use real live data. We'll make a couple of changes in the posts and post routes to query to get live data instead of the hard-coded posts array. In the posts route do this:
```
App.PostsRoute = Ember.Route.extend({
	model: function() {
		return $.getJSON('http://tomdale.net/api/get_recent_posts/?callback=?').then(function(data) {
			return data.posts.map(function(post) {
				post.body = post.content;
				return post;
			});
		});
	}
});
```
  
The model property can handle synchronous or asynchronous data and it looks pretty much the same either way. jQuery's getJSON call returns a promise and the model property supports promises and will wait to render the template until the promise is fulfilled.

When the data comes back, we can tweak it and transform it the way our app expects it. So the service returns the meat of the post in a content property, but we treat that as the body property, hence the additional property.

Let's do the same thing for the post and just interpolate the post id into the call:
```
App.PostRoute = Ember.Route.extend({
	model: function(params) {
		return $.getJSON('http://tomdale.net/api/get_post/?id='+params.post_id+'&callback=?').then(function(data) {
			data.post.body = data.post.content;
			return data.post;
		});
	}
});
```
  
Refresh the page and see it making live JSON calls to web services and showing the data. Magical.

### End of Step 10 - git checkout -f step10
- - -

Your Turn
---
We've got a pretty functional app in only about 50 lines of application code. Not too shabby. There's a lot more that could be done to enhance this app. Go ahead and give it a shot. 

I suggest checking out step 9 (git checkout -f step9) to put the app in a state where you have control of the data (in the form of the posts variable). Try to add functionality to enable new posts to be added. We already have an edit template defined that could be reused for adding items. 

Another thing to try is adding functionality to add comments to blog entries. You could have comments be a part of a post or could create a totally seperate template for them and load comments based on the post. 

What's Next?
---
There's a lot more to Ember, but this is a good introduction to some of the basics. Ember has a lot of model goodness that we didn't really get into here, views, components, and a lot more in the API. To learn more, check out the [official site](http://emberjs.com). Also, checkout the css piece of the [bootstrap](http://getbootstrap.com/css/) site to see the beautiful things you can do easily with this awesome library to make your pages look great.
