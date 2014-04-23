echo "Checking for emscripten:"
which emcc || (echo "emscripten not found" && exit)
git submodule update --init || exit
(cd libsodium; ./autogen.sh; emconfigure ./configure) || exit
echo "Patching toxcore. Answer 'n' if reverse patch detected"
patch -d toxcore -p1 < toxcore.patch
make -C toxwrap
