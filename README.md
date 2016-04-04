# Snap And Compare

SnapAndCompare is an easy to use screenshot comparison tool used for CSS Visual Regression Testing built using NodeJS.

NO CODE...JUST CONFIGS.

It can compare against a single environment or dual and will produce visuals and equality stats on image comparisons.

Run in standalone mode or if you give a `watchFile` will run everytime that is updated/saved (useful for SASS development).

## Examples:

![Master image](http://i866.photobucket.com/albums/ab227/craigtaub/about_zpsec20c088.jpg "Master image")

## Setup:

### Download and install NodeJS
http://nodejs.org/download/

### Download and install GraphicMagick (gm)
<b>brew install graphicsmagick</b>

Or if that doesn't work install from source (http://www.graphicsmagick.org/download.html).

    ./configure
    make
    sudo make install

### Download app dependencies
<b>npm install</b>

## Usage:
- Update the `config.js` file to hold the `masterUrl` and `diffUrl` you need (they are often the same but not always)
- Run (first builds initial snapshot, second builds diff and compares):

    node snapandcompare.js
    node snapandcompare.js

## How does the logic work:

### Without a `watchFile`:

First run :
For all Breakpoints will check if a master image exists, if not will create one.

Second run:
For all Breakpoints will find the master image, create a new .diff image and run a comparison on the two producing a .fail image and flagging up if the images differ.

After that:
For each Breakpoint it will either compare against the diff or download a new Master image (depending on what already exists in `/screenshots`).

### With a `watchFile`:
It will continually run on save of the file. It will flag up the status of each Breakpoint as PASS or FAIL.

First run:
On save of `watchFile` it will create the Master files after that will run the comparison evertime it detects a change.

## Testing:
- Swap the config files and run the program to test. `('./config')` for `('./config.test')`.

## About the tool:

### What about the other tools?
- PhantomCSS - Image comparison using ResembleJS which did colours well but very little else was caught on testing
- CSS Critic - Does not work on command line
- Wraith - Must run off 2 different domains everytime, is built this way.Takes a while to run (3-5 seconds per image). Built with Ruby so requires the right environment.

### Why not use PhantomJS?
- Did not find any decent image comparison library for it (see PhantomCSS at bottom for more).
- Its not a node module whereas Webshot is a light wrapper around PhantomJS.

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

## Known Issues:
- If there are many images on the page the snapshot might not have downloaded all the images in time, you might be required to run the tool twice in order to get a proper comparison.
-- Be sure to get the best quality Master images you can.
- Doesn't execute any Javascript (alert in page and it is not shown).
- Accuracy of FAIL, is it always a failure?
-- If everything is a failure it will end up being ignored.
