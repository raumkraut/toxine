Toxine is a browser-based client for the [Tox][1] network.

It's written in C, javascript, html and css.
Text chat is supported by most modern browsers, other features, when implemented, might demand
recent versions.

Try the [demo][2]!

Rationale
---------

One of the stated goals of the Tox project is to make usage of the tox network as easy as possible,
no matter the level of expertise of the user or their prefered platform. In [this blog post][3], 
_irungentoo_ predicted that Tox would be "usable by anyone with a web browser". Jokes aside, a
javascript implementation allows anyone to test this messaging system by just pointing their
browsers to [a webpage hosting toxine][2].
These users can later export their configuration (secret key and users list) if they decide to
switch to a desktop or mobile Tox client.

Note that while the code is (optionally) provided by a webpage and runs in the browser environment,
user data is not exchanged with the webpage provider, the client code directly connects to the tox
network, i.e. Toxine is *not* webbased, therefore no privacy concerns arise in that regard,
provided the browser and OS are trusted.

Usage
-----

See the [User's Guide] (TODO).
For local installation, download this repo using git, then run `./autogen.sh` in the repo's
top-level directory. You will need to have [emscripten][5] installed.

License
-------

Since toxwrap is statically linked against the toxcore library, it has to be distributed under the
terms of the [GNU General Public License][4], version 3.
Note that other license conditions might apply to libsodium, whammy, opus and other libraries used
by the code. IANAL.

[1]: http://tox.im  "Tox peer-to-peer instant messaging network"
[2]: http://polymeris.github.io "Live Toxine demo"
[3]: http://blog.libtoxcore.so/193/tox-a-new-direction "Tox: A New Direction"
[4]: http://www.gnu.org/copyleft/gpl.html "GNU General Public License (GPLv3)"
[5]: http://www.emscripten.org "Emscripten LLVM to JavaScript compiler"
