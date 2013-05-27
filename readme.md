BBCloneMail: A Backbone.Marionette Reference Application

**NOTE:** This code is currently in an experimental state. I don't recommend 
using it as guidance for how to build Marionette apps at the moment. If you
would like to see a better reference code base, check out the version of
BBCloneMail that [Foxandxss is building](https://github.com/Foxandxss/bbclonemail).

## See It In Action

This is a sample application, demonstrating how to use my 
[Backbone.Marionette](http://github.com/marionettejs/backbone.marionette)
plugin for Backbone.js. You can see it in action at:

http://bbclonemail.heroku.com

## Running BBCloneMail On Your Computer

BBCloneMail is a NodeJS app built on Express.js. To run it on your
computer you'll want to clone this repository to your machine somewhere,
and then follow these steps:

1. Install the latest http://nodejs.org if you don't have it already
2. Open a command prompt / terminal window in the BBCloneMail project folder
3. Run `npm install` to install all of the needed components
4. Run `npm start` to start the server
5. Open http://localhost:3000 in your browser

Note that step 1 through 3 only have to be done once. After you have
done that, you just need to run step 4 and 5 any time you want to
see the app running on your computer.

## A Work In Progress

Keep in mind that this is always a work in progress. While the source code
and functionality do demonstrate all of the core features and capabilities
of Backbone.Marionette, the application itself is very limited in it's 
functionality. 

Also note that I haven't optimized the JavaScript downloads in any way. There
is no minification, and no asset packaging to create a single download for the
entire application at this point. As a result, the app takes a moment or two
to download all of the JavaScript files and start up.

As I continue working on functionality, I'll also put in some optimizations for
the JavaScript, so that it starts up faster.

## Legal Mumbo Jumbo (MIT License)

Copyright (c) 2012 Derick Bailey, Muted Solutions, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
