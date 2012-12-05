# Empty-coop

A starting point for our projects at Hatchd. Rather than an extensive boilerplate, this is simply meant as a springboard, with a set of base typographic styles and an initial folder structure to ensure all our builds remain consistent.

Please note: Many examples use LESS, as that is the pre-processor Empty-coop uses.

## Style-rules of the roost

Everyone writes different, so enforcing sameness in a complete sense is a pointless endevour. However, there are some golden rules we should all follow, to ensure we can pick each other's work up, and to ensure our styles remain effecient:

### Rule 1: Avoid overqualification and lots of descendence

When writing a CSS rule, it should be made as specific as it needs to be, for that rule to stick. A rule shouldn't be over-qualified for the sake of it. Let's say for example, we're targeting the *h1* inside this element:

	<header role="banner" id="page-header">
		<hgroup>
			<h1>Title</h1>
			<h2>Subtitle</h2>
		</hgroup>
	</header>

You could write:

	header#page-header hgroup h1{ ... }
*(specifity: 1+100+1+1)*

But it would be better to write:

	#page-header h1{ ... }
*(specifity: 100+1)*

The top rule has a large amount of specifity and plenty of descendance, which is unneccesary. The user agent has to work harder to apply the rule, and as a CSS author the rule is stronger, so hard to override. It can be tempting in LESS to end up with lots of descendence, as LESS has a convenient nesting function. As tempting as this is, it should be avoided. For example:

Bad:

	#page-header{

		hgroup{

			h1{
				...
			}
		}
	}

Better:

	#page-header h1{
		...
	}

### Rule 2: Name things after function, not look

We don't work on a fixed canvas, so our rules shouldn't point to a specific location on the design, nor should they be named by their appearence. Some examples:

 - An orange button reserved for the main call to action on a page should *not* be called: **btn-orange**; it should be called something like: **btn-maincta.**
 - The side column of a blog page should *not* be called: **page-sidebar**; it should be called something like: **page-complimentry.**

 ### Rule 3: When creating a modular component, it should be styled element-agnostic

 Self-contained modules can be used in many different situations, and so should be as flexible as possible; tying styles to elements is not as flexible as tying them to unique class names. Let's take a simple blog post listing as an example:


 	<article class="post-listing">
 		<h1>Post title</h1>
 		<figure>
 			<img src="featured-image" />
 		</figure>
 		<p>Post content</p>
 	</article>

	article.post-listing{

		...

		h1{
			...
		}
		figure{
			...
		}
		img{
			...
		}
	}

The problem with this is, if a different element is used, or a h2 swapped out for an h1, then the styles will no longer work. Also, Each rule uses 1 level of descendence.

A better way to style:

 	<article class="post-listing">
 		<h1 class="pl-title">Post title</h1>
 		<figure class="pl-featuredimg">
 			...
 		</figure>
 		<p>Post content</p>
 	</article>

 	.post-listing{
 		...
 	}
 		.pl-title{
 			...
 		}
 		.pl-featuredimg{
 			...
 		}

Ah, much better! Less descendence and more flexibility. Also, using a naming convention where the parent module name is abbreviated and prefixed before each child element, gives the rules clarity and ensures they won't get mixed up with other rules.

