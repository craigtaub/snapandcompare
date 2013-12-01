# Snap And Compare

SnapAndCompare is a screenshot comparison tool used for CSS regression testing built using NodeJS.
It can compare against a single environment or several and will produce visuals and stats on image comparisons.

## Why is this tool here?

### Why about the other tools?
- PhantomCSS - Image comparison using ResembleJS which did colours well but very little else was caught on testing
- CSS Critic - Does not work on command line
- Wraith - Must run off 2 different domains everytime, is built this way.Takes a while to run (3-5 seconds per image). Built with Ruby so requires the right environment.

### Why not PhantomJS?
- Did not find any decent image comparison library for it (see PhantomCSS at bottom for more).
- Its not a node module and we dont need overhead of headless browser, just snap on diff bps.

### Why not ImageMagick?
- The NodeJS API for it does not have compare().

### Why GraphicsMagick?
- GraphicsMagick is a fork of ImageMagick, emphasizing stability of both programming API and command-line options (so it does have compare). 
- The settings are a matter of trial and error.

### Why NodeJS?
- Very easy to setup/install and use.
- Easy to add new modules and keep decoupled.
- Asynchronous so light weight and very fast.
- Can move onto processing next BP while waiting for GraphicsMagick.

### Why not Nodes imagediff?
- Need pkgconfig (and all of cairo etc).
- Canvas html based so needs a browser holding the image, kind of pointless.

## Setup:

### Download and install NodeJS
http://nodejs.org/download/

### Download and install GraphicMagick (gm)
- http://www.graphicsmagick.org/download.html 
- ./configure
- make
- sudo make install

### Download app dependencies
<b>npm install</b>

## How does the logic work:

First run:
For all Breakpoints will check if a master image exists, if not will create one.

Second run:
For all Breakpoints will find the master image, create a new .diff image and run a comparison on the two producing a .fail image and flagging up if the images differ.

## Usage:
- Update the `config.js` file to hold the `masterUrl` and `diffUrl` you need (they are often the same but not always)
- Run:
<b>node snapandcompare.js</b>

## Testing:
- Swap the config files and run the program to test. (`./config')` for `('./config.test')`.

