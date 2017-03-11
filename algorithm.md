Laying stones algorithm.

Algorithm v2.

So you start with a bis spot, that has the size of the entire available space.
The first stone is placed, then the available space is calculated again. After
each placed stone, new available space/spots are calculated.
When one stone is placed, every previous spot must be verified and modified if the
new stone changes it. After which a new spot is calculated, on top of the new position.

Also it must be taken into account if a new position cuts a spot's top.
