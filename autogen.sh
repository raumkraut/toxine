echo "Checking for emscripten:"
which emcc || (echo "emscripten not found" && exit)
git submodule update --init || exit
(cd libsodium; ./autogen.sh; emconfigure ./configure) || exit
make -C toxwrap
