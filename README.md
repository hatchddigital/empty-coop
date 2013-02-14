# Empty-coop

Created and maintained by the team at Hatchd Digital, Perth (see humans.txt)

## Purpose

Empty coop is a consistent base for all our projects at Hatchd. It contains a
basic folder structure in which to keep assets like images and scripts, and a
good set of starting LESS styles, including mixins, that handle common tasks
like CSS gradients and 2D transforms.

## Grid

The coop contains two grid mixins (which we call *Chickenwire*), which set a
configurable fixed or fluid grid. These grid mixins are deliberately not tied
to a class system, as it is our preference that grid classes remain seperate
from markup, as they become redundant when being changed with media queries.

A class system can be built around these grid mixins however, it is entirely
up to the author
