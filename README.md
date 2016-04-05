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
Update the `config.js` file to hold the `masterUrl` and `diffUrl` you need (they are often the same but not always)
Run (first builds initial snapshot, second builds diff and compares):

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

## Research:
- found here https://gist.github.com/craigtaub/8450909416482d594058ce88dbbeaf08 
