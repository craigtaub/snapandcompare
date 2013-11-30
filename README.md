# Snap And Compare

 * Source: https://github.com/craigtaub/snapandcompare

SnapAndCompare is a screenshot comparison tool used for CSS regression testing built using NodeJS.
It can compare against a single environment or several and will produce visuals and stats on image comparisons.

## Why is this tool here?

### Why not imagemagick?
- The node api doesnt have compare
- Thats why GraphicsMagick
- GraphicsMagick is a fork of ImageMagick, emphasizing stability of both programming API and command-line options. The settings are a matter of trial and error

### Why not phantomJS
- no good image comp tool
- its not a node module and we dont need overhead of headless browser, just snap on diff bps.
- Thats why Node and webpage

### Why node?
- very easy to setup/install and use
- easy to add new modules and keep decoupled

### Why not nodes imagediff?
- need pkgconfig stuff (cairo)
- canvas html based so needs a browser with the image.

### Why not other tools?
- PhantomCSS - img compares lame (resemble)
- CSS Critic - doesnt work command line
- Wraith - must work off 2 domains, cant take master and then diff from same place...takes long time too (3-5 seconds per image). Built with ruby.

## Setup:

### Download and install NodeJS
http://nodejs.org/download/

### Download and install GraphicMagick (gm)
- http://www.graphicsmagick.org/download.html 
- ./configure
- sudo make
- sudo make install

### Download app dependencies
npm install

## How does the logic work:

First run:
For all Breakpoints will check if a master image exists, if not will create one.

Second run:
For all Breakpoints will find the master image, create a new .diff image and run a comparison on the two producing a .fail image and flagging up if the images differ.

## Usage:

node snapandcompare.js <url>
