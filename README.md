# lib-magnitudes
TypeScript library for unit-aware handling and arithmetics of arbitrary magnitudes

This project / repo starts as a way to consolidate duplicate code from [WowFinder's Model repository](https://github.com/WowFinder/model/tree/main/src/Scalar) and the [Battery Capacity Converter project](https://github.com/edurne85/battery-capacity-converter).

## Roadmap

The first goal is to absorb all the relevant functionality from the above projects, and to present an extensible and agnostic interface.

Additional goals after that, in no particular order:

 - Ensure support for all the units, magnitudes, and prefixes defined by the [International System of Units](https://en.wikipedia.org/wiki/International_System_of_Units) (SI)
 - Support other widely used unit systems, such as:
   - [US Customary units](https://en.wikipedia.org/wiki/United_States_customary_units) 
   - [Imperial system](https://en.wikipedia.org/wiki/Imperial_units)
 - Support aliases for units and prefixes beyond the SI, such as:
   - using either `u` or `µ` for micro (while `µ` is the strictly correct symbol, `u` is widely used due to better support in fonts and text encodings).
   - CGS units, which are all equivalent to some SI unit with an appropriate preffix (examples: 1 Gal = 1 cm/s², 1 dyne = 1 g·cm/s²).
 - Ensure extensibility of the system. For example, the WowFinder project needs a "squares per turn" unit for speed (which implies a "squares" unit for distance / length and a "turn" unit for time), which wouldn't make sense in a general-purpose library. The library must inlcude hooks to allow defintion of custom units, and ideally require only one conversion factor with a known unit to be able to handle it seamlessly (for example, definint "1 square = 5 feet" for lenght and "1 turn = 6 seconds" for time should be enough to convert any speed to and from "squares per turn").
 - Update the code to meet the highest standards of code quality, aiming for comprehensive test coverage, minimal to no code duplication, descriptive names for any exported entities, API consistency, etc.
 - Support defining the _dimensionality_ of units (and sets of units), so basic dimensinal analysis and validation can be performed on the fly.
 - Support for vectorial magnitudes in addition to scalars, and basic arithmetics for them (addition, subtraction, multiplication by a scalar, dot-product, cross-product for 3D vectors, etc..)