# Empty-coop

A starting point for our projects at Hatchd. Rather than an extensive boilerplate, this is simply meant as a springboard, with a set of base typographic styles and an initial folder structure to ensure all our builds remain consistent.

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




