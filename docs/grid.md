# Chickenwire grid

Our chickenwire grid comes in two types: static and fluid.
Static is fixed, and is pixel-based; fluid is flexible,
and is percentage-based.

## Setting up the grid

1. Go to: static/stylesheets/less/settings.less
2. Under **Grid config** set:
    - @raw-width: container width (in px).
    - @total-columns: number of columns.
    - @raw-gutter: gutter size (in px).
3. Under **Grid type**, uncomment the grid you'd like to use.
4. Declare the wrapper width for your grid using the @rounded-width variable.

## Declaring wrapper width for your grid

    @rounded-width

This is the computed container width, taken from @raw-width.
If setting the container width for your grid, this **must** be used.
Don't use the @raw-width as rounding errors may apply. For example:

    #wrapper{
        max-width:@rounded-width + 0px;
    }

## Column types

The fixed grid has 4 mixins, which all give different grid column treatments.

**Within a column container, only a single type can be used
(nude, run/run-last or dist). Mixing types can result in width errors.**

### Nude

    #grid > .nude( [@arguments] );

This outputs only the grid width

### Run / Run last

    #grid > .run( [@arguments] );
    #grid > .run-last( [@arguments] );

.run outputs a floated grid unit, with right-hand gutter. run-last is the same,
but has no right-hand gutter. Should be used for the last column in a row

### Distributed

    #grid > .dist( [@arguments] );

This outputs a floated grid unit, with equal half-width right and left-hand
gutters. Useful for cases like thumbnail galleries, where it is hard to remove
the last column in a row.

## Arguments

### For fixed grid

    @desired-columns (number from 1 - @total-columns)
The number of columns you need. This should not exceed the @total-columns
variable that was set in settings.less

### For fluid grid

    @desired-columns (number from 1 - @total-columns)
The number of columns you need. This should not exceed the @total-columns
variable that was set in settings.less

    @container-columns (number from 1 - @total-columns)
If the element you're styling is nested within a container that is **not**
12 columns wide, you'll need to set this variable as the column count of the
nested container.

    @gutter-nest-[1-3]

If the element you're styling is nested within a container that is **not**
12 columns wide, you'll need to set this variable with the suffix number being
the nesting level of the grid element's container.

**NOTE: No need to declare this variable within the nude mixin.**

## Code example

To lay the following markup within either grid:

    <div id="wrapper">
        <div id="main-content">
            <div id="sidebar">
                ...
            </div>
        </div>
        <div id="secondary-content">
            ...
        </div>
    </div>

### If using fluid grid

    #wrapper{
        /* Set container at the default container width (12 columns) */
        max-width:@rounded-width + 0px;
    }
        #main-content{
            /* Set main-content area at 8 columns */
            #grid > .run(8);
        }
            #main-content > #sidebar{
                /* Set sidebar as 4 columns in an 8 column container, at 1
                nest level deep (as it is within the 8-col main-content div) */
                #grid > .run(4,8,@gutter-nest-1);
            }
        #secondary-content{
            /* Set secondary content area at 4 columns */
            #grid > .run-last(4);
        }

### If using fixed grid

    #wrapper{
        /* Set container at the default container width (12 columns) */
        width:@rounded-width + 0px;
    }
        #main-content{
            /* Set main-content area at 8 columns */
            #grid > .run(8);
        }
            #main-content > #sidebar{
                /* Set sidebar as 4 columns */
                #grid > .run(4);
            }
        #secondary-content{
            /* Set secondary content area at 4 columns */
            #grid > .run-last(4);
        }

