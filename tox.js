
var Module;
if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');
if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    }
    var PACKAGE_NAME = '../tox.data';
    var REMOTE_PACKAGE_NAME = (Module['filePackagePrefixURL'] || '') + 'tox.data';
    var PACKAGE_UUID = 'd3da704a-4654-4ce1-97d5-75f242889458';
  
    function fetchRemotePackage(packageName, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        if (event.loaded && event.total) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: event.total
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

function assert(check, msg) {
  if (!check) throw msg + new Error().stack;
}

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;
        Module['FS_createPreloadedFile'](this.name, null, byteArray, true, true, function() {
          Module['removeRunDependency']('fp ' + that.name);
        }, function() {
          if (that.audio) {
            Module['removeRunDependency']('fp ' + that.name); // workaround for chromium bug 124926 (still no audio with this, but at least we don't hang)
          } else {
            Module.printErr('Preloading file ' + that.name + ' failed');
          }
        }, false, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        this.requests[this.name] = null;
      },
    };
      new DataRequest(0, 1362, 0, 0).open('GET', '/DHTnodes');

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
      // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though.
      var ptr = Module['_malloc'](byteArray.length);
      Module['HEAPU8'].set(byteArray, ptr);
      DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
          DataRequest.prototype.requests["/DHTnodes"].onload();
          Module['removeRunDependency']('datafile_../tox.data');

    };
    Module['addRunDependency']('datafile_../tox.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

})();

// Note: For maximum-speed code, see "Optimizing Code" on the Emscripten wiki, https://github.com/kripken/emscripten/wiki/Optimizing-Code
// Note: Some Emscripten settings may limit the speed of the generated code.
// The Module object: Our interface to the outside world. We import
// and export values on it, and do the work to get that through
// closure compiler if necessary. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to do an eval in order to handle the closure compiler
// case, where this code here is minified but Module was defined
// elsewhere (e.g. case 4 above). We also need to check if Module
// already exists (e.g. case 3 above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module;
if (!Module) Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  if (!Module['print']) Module['print'] = function print(x) {
    process['stdout'].write(x + '\n');
  };
  if (!Module['printErr']) Module['printErr'] = function printErr(x) {
    process['stderr'].write(x + '\n');
  };

  var nodeFS = require('fs');
  var nodePath = require('path');

  Module['read'] = function read(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };

  Module['readBinary'] = function readBinary(filename) { return Module['read'](filename, true) };

  Module['load'] = function load(f) {
    globalEval(read(f));
  };

  Module['arguments'] = process['argv'].slice(2);

  module['exports'] = Module;
}
else if (ENVIRONMENT_IS_SHELL) {
  if (!Module['print']) Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm

  if (typeof read != 'undefined') {
    Module['read'] = read;
  } else {
    Module['read'] = function read() { throw 'no read() available (jsc?)' };
  }

  Module['readBinary'] = function readBinary(f) {
    return read(f, 'binary');
  };

  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  this['Module'] = Module;

  eval("if (typeof gc === 'function' && gc.toString().indexOf('[native code]') > 0) var gc = undefined"); // wipe out the SpiderMonkey shell 'gc' function, which can confuse closure (uses it as a minified name, and it is then initted to a non-falsey value unexpectedly)
}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };

  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof console !== 'undefined') {
    if (!Module['print']) Module['print'] = function print(x) {
      console.log(x);
    };
    if (!Module['printErr']) Module['printErr'] = function printErr(x) {
      console.log(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    if (!Module['print']) Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }

  if (ENVIRONMENT_IS_WEB) {
    this['Module'] = Module;
  } else {
    Module['load'] = importScripts;
  }
}
else {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}

function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] == 'undefined' && Module['read']) {
  Module['load'] = function load(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
// *** Environment setup code ***

// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];

// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];

// Merge back in the overrides
for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}



// === Auto-generated preamble library stuff ===

//========================================
// Runtime code shared with compiler
//========================================

var Runtime = {
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  forceAlign: function (target, quantum) {
    quantum = quantum || 4;
    if (quantum == 1) return target;
    if (isNumber(target) && isNumber(quantum)) {
      return Math.ceil(target/quantum)*quantum;
    } else if (isNumber(quantum) && isPowerOfTwo(quantum)) {
      return '(((' +target + ')+' + (quantum-1) + ')&' + -quantum + ')';
    }
    return 'Math.ceil((' + target + ')/' + quantum + ')*' + quantum;
  },
  isNumberType: function (type) {
    return type in Runtime.INT_TYPES || type in Runtime.FLOAT_TYPES;
  },
  isPointerType: function isPointerType(type) {
  return type[type.length-1] == '*';
},
  isStructType: function isStructType(type) {
  if (isPointerType(type)) return false;
  if (isArrayType(type)) return true;
  if (/<?{ ?[^}]* ?}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
  // See comment in isStructPointerType()
  return type[0] == '%';
},
  INT_TYPES: {"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},
  FLOAT_TYPES: {"float":0,"double":0},
  or64: function (x, y) {
    var l = (x | 0) | (y | 0);
    var h = (Math.round(x / 4294967296) | Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  and64: function (x, y) {
    var l = (x | 0) & (y | 0);
    var h = (Math.round(x / 4294967296) & Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  xor64: function (x, y) {
    var l = (x | 0) ^ (y | 0);
    var h = (Math.round(x / 4294967296) ^ Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  getNativeTypeSize: function (type) {
    switch (type) {
      case 'i1': case 'i8': return 1;
      case 'i16': return 2;
      case 'i32': return 4;
      case 'i64': return 8;
      case 'float': return 4;
      case 'double': return 8;
      default: {
        if (type[type.length-1] === '*') {
          return Runtime.QUANTUM_SIZE; // A pointer
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1));
          assert(bits % 8 === 0);
          return bits/8;
        } else {
          return 0;
        }
      }
    }
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  dedup: function dedup(items, ident) {
  var seen = {};
  if (ident) {
    return items.filter(function(item) {
      if (seen[item[ident]]) return false;
      seen[item[ident]] = true;
      return true;
    });
  } else {
    return items.filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
},
  set: function set() {
  var args = typeof arguments[0] === 'object' ? arguments[0] : arguments;
  var ret = {};
  for (var i = 0; i < args.length; i++) {
    ret[args[i]] = 0;
  }
  return ret;
},
  STACK_ALIGN: 8,
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (vararg) return 8;
    if (!vararg && (type == 'i64' || type == 'double')) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    var index = 0;
    type.flatIndexes = type.fields.map(function(field) {
      index++;
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = Runtime.getAlignSize(field, size);
      } else if (Runtime.isStructType(field)) {
        if (field[1] === '0') {
          // this is [0 x something]. When inside another structure like here, it must be at the end,
          // and it adds no size
          // XXX this happens in java-nbody for example... assert(index === type.fields.length, 'zero-length in the middle!');
          size = 0;
          if (Types.types[field]) {
            alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
          } else {
            alignSize = type.alignSize || QUANTUM_SIZE;
          }
        } else {
          size = Types.types[field].flatSize;
          alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
        }
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else if (field[0] === '<') {
        // vector type
        size = alignSize = Types.types[field].flatSize; // fully aligned
      } else if (field[0] === 'i') {
        // illegal integer field, that could not be legalized because it is an internal structure field
        // it is ok to have such fields, if we just use them as markers of field size and nothing more complex
        size = alignSize = parseInt(field.substr(1))/8;
        assert(size % 1 === 0, 'cannot handle non-byte-size field ' + field);
      } else {
        assert(false, 'invalid type for calculateStructAlignment');
      }
      if (type.packed) alignSize = 1;
      type.alignSize = Math.max(type.alignSize, alignSize);
      var curr = Runtime.alignMemory(type.flatSize, alignSize); // if necessary, place this on aligned memory
      type.flatSize = curr + size;
      if (prev >= 0) {
        diffs.push(curr-prev);
      }
      prev = curr;
      return curr;
    });
    if (type.name_ && type.name_[0] === '[') {
      // arrays have 2 elements, so we get the proper difference. then we scale here. that way we avoid
      // allocating a potentially huge array for [999999 x i8] etc.
      type.flatSize = parseInt(type.name_.substr(1))*type.flatSize/2;
    }
    type.flatSize = Runtime.alignMemory(type.flatSize, type.alignSize);
    if (diffs.length == 0) {
      type.flatFactor = type.flatSize;
    } else if (Runtime.dedup(diffs).length == 1) {
      type.flatFactor = diffs[0];
    }
    type.needsFlattening = (type.flatFactor != 1);
    return type.flatIndexes;
  },
  generateStructInfo: function (struct, typeName, offset) {
    var type, alignment;
    if (typeName) {
      offset = offset || 0;
      type = (typeof Types === 'undefined' ? Runtime.typeInfo : Types.types)[typeName];
      if (!type) return null;
      if (type.fields.length != struct.length) {
        printErr('Number of named fields must match the type for ' + typeName + ': possibly duplicate struct names. Cannot return structInfo');
        return null;
      }
      alignment = type.flatIndexes;
    } else {
      var type = { fields: struct.map(function(item) { return item[0] }) };
      alignment = Runtime.calculateStructAlignment(type);
    }
    var ret = {
      __size__: type.flatSize
    };
    if (typeName) {
      struct.forEach(function(item, i) {
        if (typeof item === 'string') {
          ret[item] = alignment[i] + offset;
        } else {
          // embedded struct
          var key;
          for (var k in item) key = k;
          ret[key] = Runtime.generateStructInfo(item[key], type.fields[i], alignment[i]);
        }
      });
    } else {
      struct.forEach(function(item, i) {
        ret[item[1]] = alignment[i];
      });
    }
    return ret;
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2*(1 + i);
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  getAsmConst: function (code, numArgs) {
    // code is a constant string on the heap, so we can cache these
    if (!Runtime.asmConstCache) Runtime.asmConstCache = {};
    var func = Runtime.asmConstCache[code];
    if (func) return func;
    var args = [];
    for (var i = 0; i < numArgs; i++) {
      args.push(String.fromCharCode(36) + i); // $0, $1 etc
    }
    code = Pointer_stringify(code);
    if (code[0] === '"') {
      // tolerate EM_ASM("..code..") even though EM_ASM(..code..) is correct
      if (code.indexOf('"', 1) === code.length-1) {
        code = code.substr(1, code.length-2);
      } else {
        // something invalid happened, e.g. EM_ASM("..code($0)..", input)
        abort('invalid EM_ASM input |' + code + '|. Please use EM_ASM(..code..) (no quotes) or EM_ASM({ ..code($0).. }, input) (to input values)');
      }
    }
    return Runtime.asmConstCache[code] = eval('(function(' + args.join(',') + '){ ' + code + ' })'); // new Function does not allow upvars in node
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[func]) {
      Runtime.funcWrappers[func] = function dynCall_wrapper() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return Runtime.funcWrappers[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xFF;

      if (buffer.length == 0) {
        if ((code & 0x80) == 0x00) {        // 0xxxxxxx
          return String.fromCharCode(code);
        }
        buffer.push(code);
        if ((code & 0xE0) == 0xC0) {        // 110xxxxx
          needed = 1;
        } else if ((code & 0xF0) == 0xE0) { // 1110xxxx
          needed = 2;
        } else {                            // 11110xxx
          needed = 3;
        }
        return '';
      }

      if (needed) {
        buffer.push(code);
        needed--;
        if (needed > 0) return '';
      }

      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var c4 = buffer[3];
      var ret;
      if (buffer.length == 2) {
        ret = String.fromCharCode(((c1 & 0x1F) << 6)  | (c2 & 0x3F));
      } else if (buffer.length == 3) {
        ret = String.fromCharCode(((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6)  | (c3 & 0x3F));
      } else {
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var codePoint = ((c1 & 0x07) << 18) | ((c2 & 0x3F) << 12) |
                        ((c3 & 0x3F) << 6)  | (c4 & 0x3F);
        ret = String.fromCharCode(
          Math.floor((codePoint - 0x10000) / 0x400) + 0xD800,
          (codePoint - 0x10000) % 0x400 + 0xDC00);
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function processJSString(string) {
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+7)&-8); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + size)|0;STATICTOP = (((STATICTOP)+7)&-8); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + size)|0;DYNAMICTOP = (((DYNAMICTOP)+7)&-8); if (DYNAMICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 8))*(quantum ? quantum : 8); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+((low>>>0)))+((+((high>>>0)))*(+4294967296))) : ((+((low>>>0)))+((+((high|0)))*(+4294967296)))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}


Module['Runtime'] = Runtime;









//========================================
// Runtime essentials
//========================================

var __THREW__ = 0; // Used in checking for thrown exceptions.

var ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;

var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD, tempDouble, tempFloat;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;

function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

var globalScope = this;

// C calling interface. A convenient way to call C functions (in C files, or
// defined with extern "C").
//
// Note: LLVM optimizations can inline and remove functions, after which you will not be
//       able to call them. Closure can also do so. To avoid that, add your function to
//       the exports using something like
//
//         -s EXPORTED_FUNCTIONS='["_main", "_myfunc"]'
//
// @param ident      The name of the C function (note that C++ functions will be name-mangled - use extern "C")
// @param returnType The return type of the function, one of the JS types 'number', 'string' or 'array' (use 'number' for any C pointer, and
//                   'array' for JavaScript arrays and typed arrays; note that arrays are 8-bit).
// @param argTypes   An array of the types of arguments for the function (if there are no arguments, this can be ommitted). Types are as in returnType,
//                   except that 'array' is not possible (there is no way for us to know the length of the array)
// @param args       An array of the arguments to the function, as native JS values (as in returnType)
//                   Note that string arguments will be stored on the stack (the JS string will become a C string on the stack).
// @return           The return value, as a native JS value (as in returnType)
function ccall(ident, returnType, argTypes, args) {
  return ccallFunc(getCFunc(ident), returnType, argTypes, args);
}
Module["ccall"] = ccall;

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  try {
    var func = Module['_' + ident]; // closure exported function
    if (!func) func = eval('_' + ident); // explicit lookup
  } catch(e) {
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}

// Internal function that does a C call using a function, not an identifier
function ccallFunc(func, returnType, argTypes, args) {
  var stack = 0;
  function toC(value, type) {
    if (type == 'string') {
      if (value === null || value === undefined || value === 0) return 0; // null string
      value = intArrayFromString(value);
      type = 'array';
    }
    if (type == 'array') {
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length);
      writeArrayToMemory(value, ret);
      return ret;
    }
    return value;
  }
  function fromC(value, type) {
    if (type == 'string') {
      return Pointer_stringify(value);
    }
    assert(type != 'array');
    return value;
  }
  var i = 0;
  var cArgs = args ? args.map(function(arg) {
    return toC(arg, argTypes[i++]);
  }) : [];
  var ret = fromC(func.apply(null, cArgs), returnType);
  if (stack) Runtime.stackRestore(stack);
  return ret;
}

// Returns a native JS wrapper for a C function. This is similar to ccall, but
// returns a function you can call repeatedly in a normal way. For example:
//
//   var my_function = cwrap('my_c_function', 'number', ['number', 'number']);
//   alert(my_function(5, 22));
//   alert(my_function(99, 12));
//
function cwrap(ident, returnType, argTypes) {
  var func = getCFunc(ident);
  return function() {
    return ccallFunc(func, returnType, argTypes, Array.prototype.slice.call(arguments));
  }
}
Module["cwrap"] = cwrap;

// Sets a value in memory in a dynamic way at run-time. Uses the
// type data. This is the same as makeSetValue, except that
// makeSetValue is done at compile-time and generates the needed
// code then, whereas this function picks the right code at
// run-time.
// Note that setValue and getValue only do *aligned* writes and reads!
// Note that ccall uses JS types as for defining types, while setValue and
// getValue need LLVM types ('i8', 'i32') - this is a lower-level operation
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[(ptr)]=value; break;
      case 'i8': HEAP8[(ptr)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;

// Parallel to setValue.
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[(ptr)];
      case 'i8': return HEAP8[(ptr)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_DYNAMIC'] = ALLOC_DYNAMIC;
Module['ALLOC_NONE'] = ALLOC_NONE;

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)|0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}
Module['allocate'] = allocate;

function Pointer_stringify(ptr, /* optional */ length) {
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    t = HEAPU8[(((ptr)+(i))|0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;

  var ret = '';

  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }

  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    t = HEAPU8[(((ptr)+(i))|0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF16ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
    if (codeUnit == 0)
      return str;
    ++i;
    // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
    str += String.fromCharCode(codeUnit);
  }
}
Module['UTF16ToString'] = UTF16ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16LE form. The copy will require at most (str.length*2+1)*2 bytes of space in the HEAP.
function stringToUTF16(str, outPtr) {
  for(var i = 0; i < str.length; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[(((outPtr)+(i*2))>>1)]=codeUnit;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[(((outPtr)+(str.length*2))>>1)]=0;
}
Module['stringToUTF16'] = stringToUTF16;

// Given a pointer 'ptr' to a null-terminated UTF32LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF32ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}
Module['UTF32ToString'] = UTF32ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32LE form. The copy will require at most (str.length+1)*4 bytes of space in the HEAP,
// but can use less, since str.length does not return the number of characters in the string, but the number of UTF-16 code units in the string.
function stringToUTF32(str, outPtr) {
  var iChar = 0;
  for(var iCodeUnit = 0; iCodeUnit < str.length; ++iCodeUnit) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    var codeUnit = str.charCodeAt(iCodeUnit); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++iCodeUnit);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[(((outPtr)+(iChar*4))>>2)]=codeUnit;
    ++iChar;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[(((outPtr)+(iChar*4))>>2)]=0;
}
Module['stringToUTF32'] = stringToUTF32;

function demangle(func) {
  try {
    // Special-case the entry point, since its name differs from other name mangling.
    if (func == 'Object._main' || func == '_main') {
      return 'main()';
    }
    if (typeof func === 'number') func = Pointer_stringify(func);
    if (func[0] !== '_') return func;
    if (func[1] !== '_') return func; // C function
    if (func[2] !== 'Z') return func;
    switch (func[3]) {
      case 'n': return 'operator new()';
      case 'd': return 'operator delete()';
    }
    var i = 3;
    // params, etc.
    var basicTypes = {
      'v': 'void',
      'b': 'bool',
      'c': 'char',
      's': 'short',
      'i': 'int',
      'l': 'long',
      'f': 'float',
      'd': 'double',
      'w': 'wchar_t',
      'a': 'signed char',
      'h': 'unsigned char',
      't': 'unsigned short',
      'j': 'unsigned int',
      'm': 'unsigned long',
      'x': 'long long',
      'y': 'unsigned long long',
      'z': '...'
    };
    function dump(x) {
      //return;
      if (x) Module.print(x);
      Module.print(func);
      var pre = '';
      for (var a = 0; a < i; a++) pre += ' ';
      Module.print (pre + '^');
    }
    var subs = [];
    function parseNested() {
      i++;
      if (func[i] === 'K') i++; // ignore const
      var parts = [];
      while (func[i] !== 'E') {
        if (func[i] === 'S') { // substitution
          i++;
          var next = func.indexOf('_', i);
          var num = func.substring(i, next) || 0;
          parts.push(subs[num] || '?');
          i = next+1;
          continue;
        }
        if (func[i] === 'C') { // constructor
          parts.push(parts[parts.length-1]);
          i += 2;
          continue;
        }
        var size = parseInt(func.substr(i));
        var pre = size.toString().length;
        if (!size || !pre) { i--; break; } // counter i++ below us
        var curr = func.substr(i + pre, size);
        parts.push(curr);
        subs.push(curr);
        i += pre + size;
      }
      i++; // skip E
      return parts;
    }
    var first = true;
    function parse(rawList, limit, allowVoid) { // main parser
      limit = limit || Infinity;
      var ret = '', list = [];
      function flushList() {
        return '(' + list.join(', ') + ')';
      }
      var name;
      if (func[i] === 'N') {
        // namespaced N-E
        name = parseNested().join('::');
        limit--;
        if (limit === 0) return rawList ? [name] : name;
      } else {
        // not namespaced
        if (func[i] === 'K' || (first && func[i] === 'L')) i++; // ignore const and first 'L'
        var size = parseInt(func.substr(i));
        if (size) {
          var pre = size.toString().length;
          name = func.substr(i + pre, size);
          i += pre + size;
        }
      }
      first = false;
      if (func[i] === 'I') {
        i++;
        var iList = parse(true);
        var iRet = parse(true, 1, true);
        ret += iRet[0] + ' ' + name + '<' + iList.join(', ') + '>';
      } else {
        ret = name;
      }
      paramLoop: while (i < func.length && limit-- > 0) {
        //dump('paramLoop');
        var c = func[i++];
        if (c in basicTypes) {
          list.push(basicTypes[c]);
        } else {
          switch (c) {
            case 'P': list.push(parse(true, 1, true)[0] + '*'); break; // pointer
            case 'R': list.push(parse(true, 1, true)[0] + '&'); break; // reference
            case 'L': { // literal
              i++; // skip basic type
              var end = func.indexOf('E', i);
              var size = end - i;
              list.push(func.substr(i, size));
              i += size + 2; // size + 'EE'
              break;
            }
            case 'A': { // array
              var size = parseInt(func.substr(i));
              i += size.toString().length;
              if (func[i] !== '_') throw '?';
              i++; // skip _
              list.push(parse(true, 1, true)[0] + ' [' + size + ']');
              break;
            }
            case 'E': break paramLoop;
            default: ret += '?' + c; break paramLoop;
          }
        }
      }
      if (!allowVoid && list.length === 1 && list[0] === 'void') list = []; // avoid (void)
      return rawList ? list : ret + flushList();
    }
    return parse();
  } catch(e) {
    return func;
  }
}

function demangleAll(text) {
  return text.replace(/__Z[\w\d_]+/g, function(x) { var y = demangle(x); return x === y ? x : (x + ' [' + y + ']') });
}

function stackTrace() {
  var stack = new Error().stack;
  return stack ? demangleAll(stack) : '(no stack trace available)'; // Stack trace is not available at least on IE10 and Safari 6.
}

// Memory management

var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return (x+4095)&-4096;
}

var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk

function enlargeMemory() {
  abort('Cannot enlarge memory arrays in asm.js. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value ' + TOTAL_MEMORY + ', or (2) set Module.TOTAL_MEMORY before the program runs.');
}

var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;

var totalMemory = 4096;
while (totalMemory < TOTAL_MEMORY || totalMemory < 2*TOTAL_STACK) {
  if (totalMemory < 16*1024*1024) {
    totalMemory *= 2;
  } else {
    totalMemory += 16*1024*1024
  }
}
if (totalMemory !== TOTAL_MEMORY) {
  Module.printErr('increasing TOTAL_MEMORY to ' + totalMemory + ' to be more reasonable');
  TOTAL_MEMORY = totalMemory;
}

// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'Cannot fallback to non-typed array case: Code is too specialized');

var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);

// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');

Module['HEAP'] = HEAP;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited

var runtimeInitialized = false;

function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
}

function postRun() {
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
Module['addOnPreRun'] = Module.addOnPreRun = addOnPreRun;

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
Module['addOnInit'] = Module.addOnInit = addOnInit;

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}
Module['addOnPreMain'] = Module.addOnPreMain = addOnPreMain;

function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}
Module['addOnExit'] = Module.addOnExit = addOnExit;

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
Module['addOnPostRun'] = Module.addOnPostRun = addOnPostRun;

// Tools

// This processes a JS string into a C-line array of numbers, 0-terminated.
// For LLVM-originating strings, see parser.js:parseLLVMString function
function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;

// Write a Javascript array to somewhere in the heap
function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))|0)]=chr;
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;

function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=str.charCodeAt(i);
  }
  if (!dontAddNull) HEAP8[(((buffer)+(str.length))|0)]=0;
}
Module['writeAsciiToMemory'] = writeAsciiToMemory;

function unSign(value, bits, ignore, sig) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore, sig) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}

// check for imul support, and also for correctness ( https://bugs.webkit.org/show_bug.cgi?id=126345 )
if (!Math['imul'] || Math['imul'](0xffffffff, 5) !== -5) Math['imul'] = function imul(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
Math.imul = Math['imul'];


var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_min = Math.min;

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}
Module['removeRunDependency'] = removeRunDependency;

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data


var memoryInitializer = null;

// === Body ===



STATIC_BASE = 8;

STATICTOP = STATIC_BASE + 10784;


/* global initializers */ __ATINIT__.push({ func: function() { runPostSets() } });



var _stderr;
var _stderr=_stderr=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);;


















































































































































/* memory initializer */ allocate([255,255,255,255,0,0,0,0,48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107,101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107,101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107,101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107,101,120,112,97,110,100,32,51,50,45,98,121,116,101,32,107,72,5,0,0,184,4,0,0,112,4,0,0,0,0,0,0,2,0,0,0,6,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,252,0,0,0,0,0,0,0,106,9,230,103,187,103,174,133,60,110,243,114,165,79,245,58,81,14,82,127,155,5,104,140,31,131,217,171,91,224,205,25,0,0,0,0,0,0,0,0,128,0,0,0,0,0,0,0,160,1,0,0,0,0,0,0,4,0,0,0,8,0,0,0,2,0,0,0,0,0,0,0,160,1,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,116,111,120,46,99,111,110,116,97,99,116,83,116,97,116,117,115,77,101,115,115,97,103,101,40,39,36,48,39,44,32,39,36,49,39,41,44,32,116,109,112,95,99,108,105,101,110,116,95,105,100,44,32,115,116,114,105,110,103,0,0,0,0,0,99,114,121,112,116,111,95,111,110,101,116,105,109,101,97,117,116,104,32,111,118,101,114,119,114,105,116,101,115,32,104,0,116,111,120,46,99,111,110,116,97,99,116,78,105,99,107,67,104,97,110,103,101,100,40,39,36,48,39,44,32,39,36,49,39,41,44,32,116,109,112,95,99,108,105,101,110,116,95,105,100,44,32,115,116,114,105,110,103,0,0,0,0,0,0,0,99,114,121,112,116,111,95,111,110,101,116,105,109,101,97,117,116,104,95,118,101,114,105,102,121,32,114,101,116,117,114,110,115,32,110,111,110,122,101,114,111,0,0,0,0,0,0,0,116,111,120,46,99,111,110,116,97,99,116,77,101,115,115,97,103,101,40,39,36,48,39,44,32,39,36,49,39,41,44,32,116,109,112,95,99,108,105,101,110,116,95,105,100,44,32,115,116,114,105,110,103,0,0,0,99,114,121,112,116,111,95,111,110,101,116,105,109,101,97,117,116,104,32,100,111,101,115,32,110,111,116,32,104,97,110,100,108,101,32,107,32,111,118,101,114,108,97,112,0,0,0,0,79,110,108,105,110,101,0,0,116,111,120,46,99,111,110,116,97,99,116,95,114,101,113,117,101,115,116,40,39,36,48,39,44,32,39,36,49,39,41,44,32,107,101,121,44,32,100,97,116,97,0,0,0,0,0,0,37,50,104,104,120,0,0,0,99,114,121,112,116,111,95,111,110,101,116,105,109,101,97,117,116,104,32,100,111,101,115,32,110,111,116,32,104,97,110,100,108,101,32,109,32,111,118,101,114,108,97,112,0,0,0,0,103,101,116,115,111,99,107,111,112,116,32,115,116,117,98,32,99,97,108,108,101,100,10,0,115,121,115,114,97,110,100,111,109,0,0,0,0,0,0,0,98,117,102,95,108,101,110,32,60,61,32,83,73,90,69,95,77,65,88,0,0,0,0,0,99,114,121,112,116,111,95,111,110,101,116,105,109,101,97,117,116,104,32,119,114,105,116,101,115,32,97,102,116,101,114,32,111,117,116,112,117,116,0,0,115,114,97,110,100,111,109,32,115,116,117,98,32,99,97,108,108,101,100,10,0,0,0,0,99,114,121,112,116,111,95,111,110,101,116,105,109,101,97,117,116,104,32,119,114,105,116,101,115,32,98,101,102,111,114,101,32,111,117,116,112,117,116,0,114,101,102,0,0,0,0,0,101,56,51,54,100,53,99,97,53,56,99,102,54,55,51,102,99,97,50,98,52,57,49,48,102,50,51,102,51,57,57,48,0,0,0,0,0,0,0,0,40,73,80,32,105,110,118,97,108,105,100,58,32,78,85,76,76,41,0,0,0,0,0,0,47,100,101,118,47,114,97,110,100,111,109,0,0,0,0,0,99,114,121,112,116,111,95,111,110,101,116,105,109,101,97,117,116,104,32,111,118,101,114,119,114,105,116,101,115,32,109,0,40,73,80,32,105,110,118,97,108,105,100,44,32,102,97,109,105,108,121,32,37,117,41,0,47,100,101,118,47,117,114,97,110,100,111,109,0,0,0,0,99,114,121,112,116,111,95,111,110,101,116,105,109,101,97,117,116,104,32,111,118,101,114,119,114,105,116,101,115,32,107,0,70,97,105,108,101,100,32,116,111,32,98,105,110,100,32,115,111,99,107,101,116,58,32,37,117,44,32,37,115,32,40,73,80,47,80,111,114,116,58,32,37,115,58,37,117,10,0,0,116,111,120,99,111,114,101,47,97,115,115,111,99,46,99,0,73,110,118,97,108,105,100,32,97,100,100,114,101,115,115,32,102,97,109,105,108,121,58,32,37,117,10,0,0,0,0,0,47,100,101,118,47,97,114,97,110,100,111,109,0,0,0,0,108,105,98,115,111,100,105,117,109,47,114,97,110,100,111,109,98,121,116,101,115,47,114,97,110,100,111,109,98,121,116,101,115,46,99,0,0,0,0,0,37,48,50,104,104,88,0,0,99,114,121,112,116,111,95,111,110,101,116,105,109,101,97,117,116,104,32,114,101,116,117,114,110,115,32,110,111,110,122,101,114,111,0,0,0,0,0,0,70,97,105,108,101,100,32,116,111,32,97,108,108,111,99,97,116,101,32,77,101,115,115,101,110,103,101,114,32,100,97,116,97,115,116,114,117,99,116,117,114,101,0,0,0,0,0,0,99,111,110,110,58,32,37,100,10,0,0,0,0,0,0,0,99,108,101,97,110,58,32,37,100,10,0,0,0,0,0,0,70,97,105,108,101,100,32,116,111,32,103,101,116,32,97,32,115,111,99,107,101,116,63,33,32,37,117,44,32,37,115,10,0,0,0,0,0,0,0,0,101,120,101,99,58,32,37,100,10,0,0,0,0,0,0,0,112,114,101,112,58,32,37,100,10,0,0,0,0,0,0,0,114,101,116,118,97,108,32,33,61,32,48,0,0,0,0,0,97,115,115,111,99,58,58,104,97,115,104,95,99,111,108,108,105,100,101,58,32,104,97,115,104,32,37,117,44,32,98,117,99,107,101,116,32,115,105,122,101,32,37,117,32,61,62,32,37,117,33,0,0,0,0,0,114,97,110,100,111,109,98,121,116,101,115,0,0,0,0,0,104,97,115,104,95,99,111,108,108,105,100,101,0,0,0,0], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);



var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);

assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

}

function copyTempDouble(ptr) {

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];

  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];

  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];

  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];

}


  function _llvm_stacksave() {
      var self = _llvm_stacksave;
      if (!self.LLVM_SAVEDSTACKS) {
        self.LLVM_SAVEDSTACKS = [];
      }
      self.LLVM_SAVEDSTACKS.push(Runtime.stackSave());
      return self.LLVM_SAVEDSTACKS.length-1;
    }

  
   
  Module["_memset"] = _memset;var _llvm_memset_p0i8_i32=_memset;

  
   
  Module["_memcpy"] = _memcpy;function _qsort(base, num, size, cmp) {
      if (num == 0 || size == 0) return;
      // forward calls to the JavaScript sort method
      // first, sort the items logically
      var keys = [];
      for (var i = 0; i < num; i++) keys.push(i);
      keys.sort(function(a, b) {
        return Module['dynCall_iii'](cmp, base+a*size, base+b*size);
      });
      // apply the sort
      var temp = _malloc(num*size);
      _memcpy(temp, base, num*size);
      for (var i = 0; i < num; i++) {
        if (keys[i] == i) continue; // already in place
        _memcpy(base+i*size, temp+keys[i]*size, size);
      }
      _free(temp);
    }

  function _llvm_stackrestore(p) {
      var self = _llvm_stacksave;
      var ret = self.LLVM_SAVEDSTACKS[p];
      self.LLVM_SAVEDSTACKS.splice(p, 1);
      Runtime.stackRestore(ret);
    }

  function _rand() {
      return Math.floor(Math.random()*0x80000000);
    }

  var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;

  
  
  
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};
  
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  
  
  var ___errno_state=0;function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      HEAP32[((___errno_state)>>2)]=value;
      return value;
    }
  
  var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            continue;
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          if (stream.tty.output.length) {
            stream.tty.ops.put_char(stream.tty, 10);
          }
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          for (var i = 0; i < length; i++) {
            try {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              result = process['stdin']['read']();
              if (!result) {
                if (process['stdin']['_readableState'] && process['stdin']['_readableState']['ended']) {
                  return null;  // EOF
                }
                return undefined;  // no data available
              }
            } else if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['print'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['printErr'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }}};
  
  var MEMFS={ops_table:null,CONTENT_OWNING:1,CONTENT_FLEXIBLE:2,CONTENT_FIXED:3,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 0777, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            },
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.contents = [];
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },ensureFlexible:function (node) {
        if (node.contentMode !== MEMFS.CONTENT_FLEXIBLE) {
          var contents = node.contents;
          node.contents = Array.prototype.slice.call(contents);
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        }
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.contents.length;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.ensureFlexible(node);
            var contents = node.contents;
            if (attr.size < contents.length) contents.length = attr.size;
            else while (attr.size > contents.length) contents.push(0);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 0777 | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else
          {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
          var node = stream.node;
          node.timestamp = Date.now();
          var contents = node.contents;
          if (length && contents.length === 0 && position === 0 && buffer.subarray) {
            // just replace it with the new data
            if (canOwn && offset === 0) {
              node.contents = buffer; // this could be a subarray of Emscripten HEAP, or allocated from some other source.
              node.contentMode = (buffer.buffer === HEAP8.buffer) ? MEMFS.CONTENT_OWNING : MEMFS.CONTENT_FIXED;
            } else {
              node.contents = new Uint8Array(buffer.subarray(offset, offset+length));
              node.contentMode = MEMFS.CONTENT_FIXED;
            }
            return length;
          }
          MEMFS.ensureFlexible(node);
          var contents = node.contents;
          while (contents.length < position) contents.push(0);
          for (var i = 0; i < length; i++) {
            contents[position + i] = buffer[offset + i];
          }
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.contents.length;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          stream.ungotten = [];
          stream.position = position;
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.ensureFlexible(stream.node);
          var contents = stream.node.contents;
          var limit = offset + length;
          while (limit > contents.length) contents.push(0);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        }}};
  
  var IDBFS={dbs:{},indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },reconcile:function (src, dst, callback) {
        var total = 0;
  
        var create = {};
        for (var key in src.files) {
          if (!src.files.hasOwnProperty(key)) continue;
          var e = src.files[key];
          var e2 = dst.files[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create[key] = e;
            total++;
          }
        }
  
        var remove = {};
        for (var key in dst.files) {
          if (!dst.files.hasOwnProperty(key)) continue;
          var e = dst.files[key];
          var e2 = src.files[key];
          if (!e2) {
            remove[key] = e;
            total++;
          }
        }
  
        if (!total) {
          // early out
          return callback(null);
        }
  
        var completed = 0;
        function done(err) {
          if (err) return callback(err);
          if (++completed >= total) {
            return callback(null);
          }
        };
  
        // create a single transaction to handle and IDB reads / writes we'll need to do
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        transaction.onerror = function transaction_onerror() { callback(this.error); };
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        for (var path in create) {
          if (!create.hasOwnProperty(path)) continue;
          var entry = create[path];
  
          if (dst.type === 'local') {
            // save file to local
            try {
              if (FS.isDir(entry.mode)) {
                FS.mkdir(path, entry.mode);
              } else if (FS.isFile(entry.mode)) {
                var stream = FS.open(path, 'w+', 0666);
                FS.write(stream, entry.contents, 0, entry.contents.length, 0, true /* canOwn */);
                FS.close(stream);
              }
              done(null);
            } catch (e) {
              return done(e);
            }
          } else {
            // save file to IDB
            var req = store.put(entry, path);
            req.onsuccess = function req_onsuccess() { done(null); };
            req.onerror = function req_onerror() { done(this.error); };
          }
        }
  
        for (var path in remove) {
          if (!remove.hasOwnProperty(path)) continue;
          var entry = remove[path];
  
          if (dst.type === 'local') {
            // delete file from local
            try {
              if (FS.isDir(entry.mode)) {
                // TODO recursive delete?
                FS.rmdir(path);
              } else if (FS.isFile(entry.mode)) {
                FS.unlink(path);
              }
              done(null);
            } catch (e) {
              return done(e);
            }
          } else {
            // delete file from IDB
            var req = store.delete(path);
            req.onsuccess = function req_onsuccess() { done(null); };
            req.onerror = function req_onerror() { done(this.error); };
          }
        }
      },getLocalSet:function (mount, callback) {
        var files = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
  
        var check = FS.readdir(mount.mountpoint)
          .filter(isRealDir)
          .map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat, node;
  
          try {
            var lookup = FS.lookupPath(path);
            node = lookup.node;
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path)
              .filter(isRealDir)
              .map(toAbsolute(path)));
  
            files[path] = { mode: stat.mode, timestamp: stat.mtime };
          } else if (FS.isFile(stat.mode)) {
            files[path] = { contents: node.contents, mode: stat.mode, timestamp: stat.mtime };
          } else {
            return callback(new Error('node type not supported'));
          }
        }
  
        return callback(null, { type: 'local', files: files });
      },getDB:function (name, callback) {
        // look it up in the cache
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        req.onupgradeneeded = function req_onupgradeneeded() {
          db = req.result;
          db.createObjectStore(IDBFS.DB_STORE_NAME);
        };
        req.onsuccess = function req_onsuccess() {
          db = req.result;
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function req_onerror() {
          callback(this.error);
        };
      },getRemoteSet:function (mount, callback) {
        var files = {};
  
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
  
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
          transaction.onerror = function transaction_onerror() { callback(this.error); };
  
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          store.openCursor().onsuccess = function store_openCursor_onsuccess(event) {
            var cursor = event.target.result;
            if (!cursor) {
              return callback(null, { type: 'remote', db: db, files: files });
            }
  
            files[cursor.key] = cursor.value;
            cursor.continue();
          };
        });
      }};
  
  var NODEFS={isWindows:false,staticInit:function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
      },mount:function (mount) {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // On Windows, directories return permission bits 'rw-rw-rw-', even though they have 'rwxrwxrwx', so 
            // propagate write bits to execute bits.
            stat.mode = stat.mode | ((stat.mode & 146) >> 1);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsToPermissionStringMap:{0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},flagsToPermissionString:function (flags) {
        if (flags in NODEFS.flagsToPermissionStringMap) {
          return NODEFS.flagsToPermissionStringMap[flags];
        } else {
          return flags;
        }
      },node_ops:{getattr:function (node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function (node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },unlink:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },rmdir:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readdir:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },symlink:function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readlink:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsToPermissionString(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },read:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(length);
          var res;
          try {
            res = fs.readSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          if (res > 0) {
            for (var i = 0; i < res; i++) {
              buffer[offset + i] = nbuffer[i];
            }
          }
          return res;
        },write:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(buffer.subarray(offset, offset + length));
          var res;
          try {
            res = fs.writeSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return res;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES[e.code]);
              }
            }
          }
  
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
  
          stream.position = position;
          return position;
        }}};
  
  var _stdin=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stdout=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stderr=allocate(1, "i32*", ALLOC_STATIC);
  
  function _fflush(stream) {
      // int fflush(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fflush.html
      // we don't currently perform any user-space buffering of data
    }var FS={root:null,mounts:[],devices:[null],streams:[null],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || { recurse_count: 0 };
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            current = current.mount.root;
          }
  
          // follow symlinks
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
              
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
            this.parent = null;
            this.mount = null;
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            FS.hashAddNode(this);
          };
  
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
  
          FS.FSNode.prototype = {};
  
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); },
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); },
            },
          });
        }
        return new FS.FSNode(parent, name, mode, rdev);
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var accmode = flag & 2097155;
        var perms = ['r', 'w', 'rw'][accmode];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return ERRNO_CODES.EACCES;
        }
        return 0;
      },mayLookup:function (dir) {
        return FS.nodePermissions(dir, 'x');
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return ERRNO_CODES.EEXIST;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return ERRNO_CODES.ENOTDIR;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return ERRNO_CODES.EBUSY;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return ERRNO_CODES.ENOENT;
        }
        if (FS.isLink(node.mode)) {
          return ERRNO_CODES.ELOOP;
        } else if (FS.isDir(node.mode)) {
          if ((flags & 2097155) !== 0 ||  // opening for write
              (flags & 512)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 1;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        if (stream.__proto__) {
          // reuse the object
          stream.__proto__ = FS.FSStream.prototype;
        } else {
          var newStream = new FS.FSStream();
          for (var p in stream) {
            newStream[p] = stream[p];
          }
          stream = newStream;
        }
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        var completed = 0;
        var total = FS.mounts.length;
        function done(err) {
          if (err) {
            return callback(err);
          }
          if (++completed >= total) {
            callback(null);
          }
        };
  
        // sync all mounts
        for (var i = 0; i < FS.mounts.length; i++) {
          var mount = FS.mounts[i];
          if (!mount.type.syncfs) {
            done(null);
            continue;
          }
          mount.type.syncfs(mount, populate, done);
        }
      },mount:function (type, opts, mountpoint) {
        var lookup;
        if (mountpoint) {
          lookup = FS.lookupPath(mountpoint, { follow: false });
          mountpoint = lookup.path;  // use the absolute path
        }
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          root: null
        };
        // create a root node for the fs
        var root = type.mount(mount);
        root.mount = mount;
        mount.root = root;
        // assign the mount info to the mountpoint's node
        if (lookup) {
          lookup.node.mount = mount;
          lookup.node.mounted = true;
          // compatibility update FS.root if we mount to /
          if (mountpoint === '/') {
            FS.root = mount.root;
          }
        }
        // add to our cached list of mounts
        FS.mounts.push(mount);
        return root;
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 0666;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 0777;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 0666;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // POSIX says unlink should set EPERM, not EISDIR
          if (err === ERRNO_CODES.EISDIR) err = ERRNO_CODES.EPERM;
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },readlink:function (path) {
        var lookup = FS.lookupPath(path, { follow: false });
        var link = lookup.node;
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        return link.node_ops.readlink(link);
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 0666 : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
          }
        }
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // check permissions
        var err = FS.mayOpen(node, flags);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            Module['printErr']('read file: ' + path);
          }
        }
        return stream;
      },close:function (stream) {
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
      },llseek:function (stream, offset, whence) {
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        return stream.stream_ops.llseek(stream, offset, whence);
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EACCES);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = '';
          var utf8 = new Runtime.UTF8Processor();
          for (var i = 0; i < length; i++) {
            ret += utf8.processCChar(buf[i]);
          }
        } else if (opts.encoding === 'binary') {
          ret = buf;
        } else {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        opts.encoding = opts.encoding || 'utf8';
        var stream = FS.open(path, opts.flags, opts.mode);
        if (opts.encoding === 'utf8') {
          var utf8 = new Runtime.UTF8Processor();
          var buf = new Uint8Array(utf8.processJSString(data));
          FS.write(stream, buf, 0, buf.length, 0);
        } else if (opts.encoding === 'binary') {
          FS.write(stream, data, 0, data.length, 0);
        } else {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function() { return 0; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        HEAP32[((_stdin)>>2)]=stdin.fd;
        assert(stdin.fd === 1, 'invalid handle for stdin (' + stdin.fd + ')');
  
        var stdout = FS.open('/dev/stdout', 'w');
        HEAP32[((_stdout)>>2)]=stdout.fd;
        assert(stdout.fd === 2, 'invalid handle for stdout (' + stdout.fd + ')');
  
        var stderr = FS.open('/dev/stderr', 'w');
        HEAP32[((_stderr)>>2)]=stderr.fd;
        assert(stderr.fd === 3, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno) {
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
          this.message = ERRNO_MESSAGES[errno];
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [ERRNO_CODES.ENOENT].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.root = FS.createNode(null, '/', 16384 | 0777, 0);
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
          function LazyUint8Array() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = Math.floor(idx / this.chunkSize);
            return this.getter(chunkNum)[chunkOffset];
          }
          LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
            this.getter = getter;
          }
          LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
              // Find length
              var xhr = new XMLHttpRequest();
              xhr.open('HEAD', url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var chunkSize = 1024*1024; // Chunk size in bytes
  
              if (!hasByteServing) chunkSize = datalength;
  
              // Function to get a range from the remote URL.
              var doXHR = (function(from, to) {
                if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
                // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
                // Some hints to the browser that we want binary data.
                if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
                if (xhr.overrideMimeType) {
                  xhr.overrideMimeType('text/plain; charset=x-user-defined');
                }
  
                xhr.send(null);
                if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                if (xhr.response !== undefined) {
                  return new Uint8Array(xhr.response || []);
                } else {
                  return intArrayFromString(xhr.responseText || '', true);
                }
              });
              var lazyArray = this;
              lazyArray.setDataGetter(function(chunkNum) {
                var start = chunkNum * chunkSize;
                var end = (chunkNum+1) * chunkSize - 1; // including this byte
                end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
                  lazyArray.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
                return lazyArray.chunks[chunkNum];
              });
  
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
          }
  
          var lazyArray = new LazyUint8Array();
          Object.defineProperty(lazyArray, "length", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._length;
              }
          });
          Object.defineProperty(lazyArray, "chunkSize", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._chunkSize;
              }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn) {
        Browser.init();
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        function processData(byteArray) {
          function finish(byteArray) {
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency('cp ' + fullname);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency('cp ' + fullname);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency('cp ' + fullname);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};
  
  
  
  
  var _mkport=undefined;var SOCKFS={mount:function (mount) {
        return FS.createNode(null, '/', 16384 | 0777, 0);
      },createSocket:function (family, type, protocol) {
        var streaming = type == 1;
        if (protocol) {
          assert(streaming == (protocol == 6)); // if SOCK_STREAM, must be tcp
        }
  
        // create our internal socket structure
        var sock = {
          family: family,
          type: type,
          protocol: protocol,
          server: null,
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: SOCKFS.websocket_sock_ops
        };
  
        // create the filesystem node to store the socket structure
        var name = SOCKFS.nextname();
        var node = FS.createNode(SOCKFS.root, name, 49152, 0);
        node.sock = sock;
  
        // and the wrapping stream that enables library functions such
        // as read and write to indirectly interact with the socket
        var stream = FS.createStream({
          path: name,
          node: node,
          flags: FS.modeStringToFlags('r+'),
          seekable: false,
          stream_ops: SOCKFS.stream_ops
        });
  
        // map the new stream to the socket structure (sockets have a 1:1
        // relationship with a stream)
        sock.stream = stream;
  
        return sock;
      },getSocket:function (fd) {
        var stream = FS.getStream(fd);
        if (!stream || !FS.isSocket(stream.node.mode)) {
          return null;
        }
        return stream.node.sock;
      },stream_ops:{poll:function (stream) {
          var sock = stream.node.sock;
          return sock.sock_ops.poll(sock);
        },ioctl:function (stream, request, varargs) {
          var sock = stream.node.sock;
          return sock.sock_ops.ioctl(sock, request, varargs);
        },read:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          var msg = sock.sock_ops.recvmsg(sock, length);
          if (!msg) {
            // socket is closed
            return 0;
          }
          buffer.set(msg.buffer, offset);
          return msg.buffer.length;
        },write:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          return sock.sock_ops.sendmsg(sock, buffer, offset, length);
        },close:function (stream) {
          var sock = stream.node.sock;
          sock.sock_ops.close(sock);
        }},nextname:function () {
        if (!SOCKFS.nextname.current) {
          SOCKFS.nextname.current = 0;
        }
        return 'socket[' + (SOCKFS.nextname.current++) + ']';
      },websocket_sock_ops:{createPeer:function (sock, addr, port) {
          var ws;
  
          if (typeof addr === 'object') {
            ws = addr;
            addr = null;
            port = null;
          }
  
          if (ws) {
            // for sockets that've already connected (e.g. we're the server)
            // we can inspect the _socket property for the address
            if (ws._socket) {
              addr = ws._socket.remoteAddress;
              port = ws._socket.remotePort;
            }
            // if we're just now initializing a connection to the remote,
            // inspect the url property
            else {
              var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
              if (!result) {
                throw new Error('WebSocket URL must be in the format ws(s)://address:port');
              }
              addr = result[1];
              port = parseInt(result[2], 10);
            }
          } else {
            // create the actual websocket object and connect
            try {
              var url = 'ws://' + addr + ':' + port;
              // the node ws library API is slightly different than the browser's
              var opts = ENVIRONMENT_IS_NODE ? {headers: {'websocket-protocol': ['binary']}} : ['binary'];
              // If node we use the ws library.
              var WebSocket = ENVIRONMENT_IS_NODE ? require('ws') : window['WebSocket'];
              ws = new WebSocket(url, opts);
              ws.binaryType = 'arraybuffer';
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH);
            }
          }
  
  
          var peer = {
            addr: addr,
            port: port,
            socket: ws,
            dgram_send_queue: []
          };
  
          SOCKFS.websocket_sock_ops.addPeer(sock, peer);
          SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
  
          // if this is a bound dgram socket, send the port number first to allow
          // us to override the ephemeral port reported to us by remotePort on the
          // remote end.
          if (sock.type === 2 && typeof sock.sport !== 'undefined') {
            peer.dgram_send_queue.push(new Uint8Array([
                255, 255, 255, 255,
                'p'.charCodeAt(0), 'o'.charCodeAt(0), 'r'.charCodeAt(0), 't'.charCodeAt(0),
                ((sock.sport & 0xff00) >> 8) , (sock.sport & 0xff)
            ]));
          }
  
          return peer;
        },getPeer:function (sock, addr, port) {
          return sock.peers[addr + ':' + port];
        },addPeer:function (sock, peer) {
          sock.peers[peer.addr + ':' + peer.port] = peer;
        },removePeer:function (sock, peer) {
          delete sock.peers[peer.addr + ':' + peer.port];
        },handlePeerEvents:function (sock, peer) {
          var first = true;
  
          var handleOpen = function () {
            try {
              var queued = peer.dgram_send_queue.shift();
              while (queued) {
                peer.socket.send(queued);
                queued = peer.dgram_send_queue.shift();
              }
            } catch (e) {
              // not much we can do here in the way of proper error handling as we've already
              // lied and said this data was sent. shut it down.
              peer.socket.close();
            }
          };
  
          function handleMessage(data) {
            assert(typeof data !== 'string' && data.byteLength !== undefined);  // must receive an ArrayBuffer
            data = new Uint8Array(data);  // make a typed array view on the array buffer
  
  
            // if this is the port message, override the peer's port with it
            var wasfirst = first;
            first = false;
            if (wasfirst &&
                data.length === 10 &&
                data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 &&
                data[4] === 'p'.charCodeAt(0) && data[5] === 'o'.charCodeAt(0) && data[6] === 'r'.charCodeAt(0) && data[7] === 't'.charCodeAt(0)) {
              // update the peer's port and it's key in the peer map
              var newport = ((data[8] << 8) | data[9]);
              SOCKFS.websocket_sock_ops.removePeer(sock, peer);
              peer.port = newport;
              SOCKFS.websocket_sock_ops.addPeer(sock, peer);
              return;
            }
  
            sock.recv_queue.push({ addr: peer.addr, port: peer.port, data: data });
          };
  
          if (ENVIRONMENT_IS_NODE) {
            peer.socket.on('open', handleOpen);
            peer.socket.on('message', function(data, flags) {
              if (!flags.binary) {
                return;
              }
              handleMessage((new Uint8Array(data)).buffer);  // copy from node Buffer -> ArrayBuffer
            });
            peer.socket.on('error', function() {
              // don't throw
            });
          } else {
            peer.socket.onopen = handleOpen;
            peer.socket.onmessage = function peer_socket_onmessage(event) {
              handleMessage(event.data);
            };
          }
        },poll:function (sock) {
          if (sock.type === 1 && sock.server) {
            // listen sockets should only say they're available for reading
            // if there are pending clients.
            return sock.pending.length ? (64 | 1) : 0;
          }
  
          var mask = 0;
          var dest = sock.type === 1 ?  // we only care about the socket state for connection-based sockets
            SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) :
            null;
  
          if (sock.recv_queue.length ||
              !dest ||  // connection-less sockets are always ready to read
              (dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {  // let recv return 0 once closed
            mask |= (64 | 1);
          }
  
          if (!dest ||  // connection-less sockets are always ready to write
              (dest && dest.socket.readyState === dest.socket.OPEN)) {
            mask |= 4;
          }
  
          if ((dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {
            mask |= 16;
          }
  
          return mask;
        },ioctl:function (sock, request, arg) {
          switch (request) {
            case 21531:
              var bytes = 0;
              if (sock.recv_queue.length) {
                bytes = sock.recv_queue[0].data.length;
              }
              HEAP32[((arg)>>2)]=bytes;
              return 0;
            default:
              return ERRNO_CODES.EINVAL;
          }
        },close:function (sock) {
          // if we've spawned a listen server, close it
          if (sock.server) {
            try {
              sock.server.close();
            } catch (e) {
            }
            sock.server = null;
          }
          // close any peer connections
          var peers = Object.keys(sock.peers);
          for (var i = 0; i < peers.length; i++) {
            var peer = sock.peers[peers[i]];
            try {
              peer.socket.close();
            } catch (e) {
            }
            SOCKFS.websocket_sock_ops.removePeer(sock, peer);
          }
          return 0;
        },bind:function (sock, addr, port) {
          if (typeof sock.saddr !== 'undefined' || typeof sock.sport !== 'undefined') {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already bound
          }
          sock.saddr = addr;
          sock.sport = port || _mkport();
          // in order to emulate dgram sockets, we need to launch a listen server when
          // binding on a connection-less socket
          // note: this is only required on the server side
          if (sock.type === 2) {
            // close the existing server if it exists
            if (sock.server) {
              sock.server.close();
              sock.server = null;
            }
            // swallow error operation not supported error that occurs when binding in the
            // browser where this isn't supported
            try {
              sock.sock_ops.listen(sock, 0);
            } catch (e) {
              if (!(e instanceof FS.ErrnoError)) throw e;
              if (e.errno !== ERRNO_CODES.EOPNOTSUPP) throw e;
            }
          }
        },connect:function (sock, addr, port) {
          if (sock.server) {
            throw new FS.ErrnoError(ERRNO_CODS.EOPNOTSUPP);
          }
  
          // TODO autobind
          // if (!sock.addr && sock.type == 2) {
          // }
  
          // early out if we're already connected / in the middle of connecting
          if (typeof sock.daddr !== 'undefined' && typeof sock.dport !== 'undefined') {
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
            if (dest) {
              if (dest.socket.readyState === dest.socket.CONNECTING) {
                throw new FS.ErrnoError(ERRNO_CODES.EALREADY);
              } else {
                throw new FS.ErrnoError(ERRNO_CODES.EISCONN);
              }
            }
          }
  
          // add the socket to our peer list and set our
          // destination address / port to match
          var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
          sock.daddr = peer.addr;
          sock.dport = peer.port;
  
          // always "fail" in non-blocking mode
          throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS);
        },listen:function (sock, backlog) {
          if (!ENVIRONMENT_IS_NODE) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
          if (sock.server) {
             throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already listening
          }
          var WebSocketServer = require('ws').Server;
          var host = sock.saddr;
          sock.server = new WebSocketServer({
            host: host,
            port: sock.sport
            // TODO support backlog
          });
  
          sock.server.on('connection', function(ws) {
            if (sock.type === 1) {
              var newsock = SOCKFS.createSocket(sock.family, sock.type, sock.protocol);
  
              // create a peer on the new socket
              var peer = SOCKFS.websocket_sock_ops.createPeer(newsock, ws);
              newsock.daddr = peer.addr;
              newsock.dport = peer.port;
  
              // push to queue for accept to pick up
              sock.pending.push(newsock);
            } else {
              // create a peer on the listen socket so calling sendto
              // with the listen socket and an address will resolve
              // to the correct client
              SOCKFS.websocket_sock_ops.createPeer(sock, ws);
            }
          });
          sock.server.on('closed', function() {
            sock.server = null;
          });
          sock.server.on('error', function() {
            // don't throw
          });
        },accept:function (listensock) {
          if (!listensock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          var newsock = listensock.pending.shift();
          newsock.stream.flags = listensock.stream.flags;
          return newsock;
        },getname:function (sock, peer) {
          var addr, port;
          if (peer) {
            if (sock.daddr === undefined || sock.dport === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            }
            addr = sock.daddr;
            port = sock.dport;
          } else {
            // TODO saddr and sport will be set for bind()'d UDP sockets, but what
            // should we be returning for TCP sockets that've been connect()'d?
            addr = sock.saddr || 0;
            port = sock.sport || 0;
          }
          return { addr: addr, port: port };
        },sendmsg:function (sock, buffer, offset, length, addr, port) {
          if (sock.type === 2) {
            // connection-less sockets will honor the message address,
            // and otherwise fall back to the bound destination address
            if (addr === undefined || port === undefined) {
              addr = sock.daddr;
              port = sock.dport;
            }
            // if there was no address to fall back to, error out
            if (addr === undefined || port === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ);
            }
          } else {
            // connection-based sockets will only use the bound
            addr = sock.daddr;
            port = sock.dport;
          }
  
          // find the peer for the destination address
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
  
          // early out if not connected with a connection-based socket
          if (sock.type === 1) {
            if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            } else if (dest.socket.readyState === dest.socket.CONNECTING) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // create a copy of the incoming data to send, as the WebSocket API
          // doesn't work entirely with an ArrayBufferView, it'll just send
          // the entire underlying buffer
          var data;
          if (buffer instanceof Array || buffer instanceof ArrayBuffer) {
            data = buffer.slice(offset, offset + length);
          } else {  // ArrayBufferView
            data = buffer.buffer.slice(buffer.byteOffset + offset, buffer.byteOffset + offset + length);
          }
  
          // if we're emulating a connection-less dgram socket and don't have
          // a cached connection, queue the buffer to send upon connect and
          // lie, saying the data was sent now.
          if (sock.type === 2) {
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
              // if we're not connected, open a new connection
              if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
              }
              dest.dgram_send_queue.push(data);
              return length;
            }
          }
  
          try {
            // send the actual data
            dest.socket.send(data);
            return length;
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
        },recvmsg:function (sock, length) {
          // http://pubs.opengroup.org/onlinepubs/7908799/xns/recvmsg.html
          if (sock.type === 1 && sock.server) {
            // tcp servers should not be recv()'ing on the listen socket
            throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
          }
  
          var queued = sock.recv_queue.shift();
          if (!queued) {
            if (sock.type === 1) {
              var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
  
              if (!dest) {
                // if we have a destination address but are not connected, error out
                throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
              }
              else if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                // return null if the socket has closed
                return null;
              }
              else {
                // else, our socket is in a valid state but truly has nothing available
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
            } else {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // queued.data will be an ArrayBuffer if it's unadulterated, but if it's
          // requeued TCP data it'll be an ArrayBufferView
          var queuedLength = queued.data.byteLength || queued.data.length;
          var queuedOffset = queued.data.byteOffset || 0;
          var queuedBuffer = queued.data.buffer || queued.data;
          var bytesRead = Math.min(length, queuedLength);
          var res = {
            buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
            addr: queued.addr,
            port: queued.port
          };
  
  
          // push back any unread data for TCP connections
          if (sock.type === 1 && bytesRead < queuedLength) {
            var bytesRemaining = queuedLength - bytesRead;
            queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
            sock.recv_queue.unshift(queued);
          }
  
          return res;
        }}};function _send(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _write(fd, buf, len);
    }
  
  function _pwrite(fildes, buf, nbyte, offset) {
      // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _write(fildes, buf, nbyte) {
      // ssize_t write(int fildes, const void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var bytesWritten = _write(stream, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        var streamObj = FS.getStream(stream);
        if (streamObj) streamObj.error = true;
        return 0;
      } else {
        return Math.floor(bytesWritten / size);
      }
    }
  
  
   
  Module["_strlen"] = _strlen;
  
  function __reallyNegative(x) {
      return x < 0 || (x === 0 && (1/x) === -Infinity);
    }function __formatString(format, varargs) {
      var textIndex = format;
      var argIndex = 0;
      function getNextArg(type) {
        // NOTE: Explicitly ignoring type safety. Otherwise this fails:
        //       int x = 4; printf("%c\n", (char)x);
        var ret;
        if (type === 'double') {
          ret = HEAPF64[(((varargs)+(argIndex))>>3)];
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+8))>>2)]];
          argIndex += 8; // each 32-bit chunk is in a 64-bit block
  
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Math.max(Runtime.getNativeFieldSize(type), Runtime.getAlignSize(type, null, true));
        return ret;
      }
  
      var ret = [];
      var curr, next, currArg;
      while(1) {
        var startTextIndex = textIndex;
        curr = HEAP8[(textIndex)];
        if (curr === 0) break;
        next = HEAP8[((textIndex+1)|0)];
        if (curr == 37) {
          // Handle flags.
          var flagAlwaysSigned = false;
          var flagLeftAlign = false;
          var flagAlternative = false;
          var flagZeroPad = false;
          var flagPadSign = false;
          flagsLoop: while (1) {
            switch (next) {
              case 43:
                flagAlwaysSigned = true;
                break;
              case 45:
                flagLeftAlign = true;
                break;
              case 35:
                flagAlternative = true;
                break;
              case 48:
                if (flagZeroPad) {
                  break flagsLoop;
                } else {
                  flagZeroPad = true;
                  break;
                }
              case 32:
                flagPadSign = true;
                break;
              default:
                break flagsLoop;
            }
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          }
  
          // Handle width.
          var width = 0;
          if (next == 42) {
            width = getNextArg('i32');
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          } else {
            while (next >= 48 && next <= 57) {
              width = width * 10 + (next - 48);
              textIndex++;
              next = HEAP8[((textIndex+1)|0)];
            }
          }
  
          // Handle precision.
          var precisionSet = false, precision = -1;
          if (next == 46) {
            precision = 0;
            precisionSet = true;
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
            if (next == 42) {
              precision = getNextArg('i32');
              textIndex++;
            } else {
              while(1) {
                var precisionChr = HEAP8[((textIndex+1)|0)];
                if (precisionChr < 48 ||
                    precisionChr > 57) break;
                precision = precision * 10 + (precisionChr - 48);
                textIndex++;
              }
            }
            next = HEAP8[((textIndex+1)|0)];
          }
          if (precision === -1) {
            precision = 6; // Standard default.
            precisionSet = false;
          }
  
          // Handle integer sizes. WARNING: These assume a 32-bit architecture!
          var argSize;
          switch (String.fromCharCode(next)) {
            case 'h':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 104) {
                textIndex++;
                argSize = 1; // char (actually i32 in varargs)
              } else {
                argSize = 2; // short (actually i32 in varargs)
              }
              break;
            case 'l':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 108) {
                textIndex++;
                argSize = 8; // long long
              } else {
                argSize = 4; // long
              }
              break;
            case 'L': // long long
            case 'q': // int64_t
            case 'j': // intmax_t
              argSize = 8;
              break;
            case 'z': // size_t
            case 't': // ptrdiff_t
            case 'I': // signed ptrdiff_t or unsigned size_t
              argSize = 4;
              break;
            default:
              argSize = null;
          }
          if (argSize) textIndex++;
          next = HEAP8[((textIndex+1)|0)];
  
          // Handle type specifier.
          switch (String.fromCharCode(next)) {
            case 'd': case 'i': case 'u': case 'o': case 'x': case 'X': case 'p': {
              // Integer.
              var signed = next == 100 || next == 105;
              argSize = argSize || 4;
              var currArg = getNextArg('i' + (argSize * 8));
              var origArg = currArg;
              var argText;
              // Flatten i64-1 [low, high] into a (slightly rounded) double
              if (argSize == 8) {
                currArg = Runtime.makeBigInt(currArg[0], currArg[1], next == 117);
              }
              // Truncate to requested size.
              if (argSize <= 4) {
                var limit = Math.pow(256, argSize) - 1;
                currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
              }
              // Format the number.
              var currAbsArg = Math.abs(currArg);
              var prefix = '';
              if (next == 100 || next == 105) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], null); else
                argText = reSign(currArg, 8 * argSize, 1).toString(10);
              } else if (next == 117) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], true); else
                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                currArg = Math.abs(currArg);
              } else if (next == 111) {
                argText = (flagAlternative ? '0' : '') + currAbsArg.toString(8);
              } else if (next == 120 || next == 88) {
                prefix = (flagAlternative && currArg != 0) ? '0x' : '';
                if (argSize == 8 && i64Math) {
                  if (origArg[1]) {
                    argText = (origArg[1]>>>0).toString(16);
                    var lower = (origArg[0]>>>0).toString(16);
                    while (lower.length < 8) lower = '0' + lower;
                    argText += lower;
                  } else {
                    argText = (origArg[0]>>>0).toString(16);
                  }
                } else
                if (currArg < 0) {
                  // Represent negative numbers in hex as 2's complement.
                  currArg = -currArg;
                  argText = (currAbsArg - 1).toString(16);
                  var buffer = [];
                  for (var i = 0; i < argText.length; i++) {
                    buffer.push((0xF - parseInt(argText[i], 16)).toString(16));
                  }
                  argText = buffer.join('');
                  while (argText.length < argSize * 2) argText = 'f' + argText;
                } else {
                  argText = currAbsArg.toString(16);
                }
                if (next == 88) {
                  prefix = prefix.toUpperCase();
                  argText = argText.toUpperCase();
                }
              } else if (next == 112) {
                if (currAbsArg === 0) {
                  argText = '(nil)';
                } else {
                  prefix = '0x';
                  argText = currAbsArg.toString(16);
                }
              }
              if (precisionSet) {
                while (argText.length < precision) {
                  argText = '0' + argText;
                }
              }
  
              // Add sign if needed
              if (currArg >= 0) {
                if (flagAlwaysSigned) {
                  prefix = '+' + prefix;
                } else if (flagPadSign) {
                  prefix = ' ' + prefix;
                }
              }
  
              // Move sign to prefix so we zero-pad after the sign
              if (argText.charAt(0) == '-') {
                prefix = '-' + prefix;
                argText = argText.substr(1);
              }
  
              // Add padding.
              while (prefix.length + argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad) {
                    argText = '0' + argText;
                  } else {
                    prefix = ' ' + prefix;
                  }
                }
              }
  
              // Insert the result into the buffer.
              argText = prefix + argText;
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 'f': case 'F': case 'e': case 'E': case 'g': case 'G': {
              // Float.
              var currArg = getNextArg('double');
              var argText;
              if (isNaN(currArg)) {
                argText = 'nan';
                flagZeroPad = false;
              } else if (!isFinite(currArg)) {
                argText = (currArg < 0 ? '-' : '') + 'inf';
                flagZeroPad = false;
              } else {
                var isGeneral = false;
                var effectivePrecision = Math.min(precision, 20);
  
                // Convert g/G to f/F or e/E, as per:
                // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
                if (next == 103 || next == 71) {
                  isGeneral = true;
                  precision = precision || 1;
                  var exponent = parseInt(currArg.toExponential(effectivePrecision).split('e')[1], 10);
                  if (precision > exponent && exponent >= -4) {
                    next = ((next == 103) ? 'f' : 'F').charCodeAt(0);
                    precision -= exponent + 1;
                  } else {
                    next = ((next == 103) ? 'e' : 'E').charCodeAt(0);
                    precision--;
                  }
                  effectivePrecision = Math.min(precision, 20);
                }
  
                if (next == 101 || next == 69) {
                  argText = currArg.toExponential(effectivePrecision);
                  // Make sure the exponent has at least 2 digits.
                  if (/[eE][-+]\d$/.test(argText)) {
                    argText = argText.slice(0, -1) + '0' + argText.slice(-1);
                  }
                } else if (next == 102 || next == 70) {
                  argText = currArg.toFixed(effectivePrecision);
                  if (currArg === 0 && __reallyNegative(currArg)) {
                    argText = '-' + argText;
                  }
                }
  
                var parts = argText.split('e');
                if (isGeneral && !flagAlternative) {
                  // Discard trailing zeros and periods.
                  while (parts[0].length > 1 && parts[0].indexOf('.') != -1 &&
                         (parts[0].slice(-1) == '0' || parts[0].slice(-1) == '.')) {
                    parts[0] = parts[0].slice(0, -1);
                  }
                } else {
                  // Make sure we have a period in alternative mode.
                  if (flagAlternative && argText.indexOf('.') == -1) parts[0] += '.';
                  // Zero pad until required precision.
                  while (precision > effectivePrecision++) parts[0] += '0';
                }
                argText = parts[0] + (parts.length > 1 ? 'e' + parts[1] : '');
  
                // Capitalize 'E' if needed.
                if (next == 69) argText = argText.toUpperCase();
  
                // Add sign.
                if (currArg >= 0) {
                  if (flagAlwaysSigned) {
                    argText = '+' + argText;
                  } else if (flagPadSign) {
                    argText = ' ' + argText;
                  }
                }
              }
  
              // Add padding.
              while (argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad && (argText[0] == '-' || argText[0] == '+')) {
                    argText = argText[0] + '0' + argText.slice(1);
                  } else {
                    argText = (flagZeroPad ? '0' : ' ') + argText;
                  }
                }
              }
  
              // Adjust case.
              if (next < 97) argText = argText.toUpperCase();
  
              // Insert the result into the buffer.
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 's': {
              // String.
              var arg = getNextArg('i8*');
              var argLength = arg ? _strlen(arg) : '(null)'.length;
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              if (arg) {
                for (var i = 0; i < argLength; i++) {
                  ret.push(HEAPU8[((arg++)|0)]);
                }
              } else {
                ret = ret.concat(intArrayFromString('(null)'.substr(0, argLength), true));
              }
              if (flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              break;
            }
            case 'c': {
              // Character.
              if (flagLeftAlign) ret.push(getNextArg('i8'));
              while (--width > 0) {
                ret.push(32);
              }
              if (!flagLeftAlign) ret.push(getNextArg('i8'));
              break;
            }
            case 'n': {
              // Write the length written so far to the next parameter.
              var ptr = getNextArg('i32*');
              HEAP32[((ptr)>>2)]=ret.length;
              break;
            }
            case '%': {
              // Literal percent sign.
              ret.push(curr);
              break;
            }
            default: {
              // Unknown specifiers remain untouched.
              for (var i = startTextIndex; i < textIndex + 2; i++) {
                ret.push(HEAP8[(i)]);
              }
            }
          }
          textIndex += 2;
          // TODO: Support a/A (hex float) and m (last error) specifiers.
          // TODO: Support %1${specifier} for arg selection.
        } else {
          ret.push(curr);
          textIndex += 1;
        }
      }
      return ret;
    }function _fprintf(stream, format, varargs) {
      // int fprintf(FILE *restrict stream, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var stack = Runtime.stackSave();
      var ret = _fwrite(allocate(result, 'i8', ALLOC_STACK), 1, result.length, stream);
      Runtime.stackRestore(stack);
      return ret;
    }

  function ___assert_fail(condition, filename, line, func) {
      ABORT = true;
      throw 'Assertion failed: ' + Pointer_stringify(condition) + ', at: ' + [filename ? Pointer_stringify(filename) : 'unknown filename', line, func ? Pointer_stringify(func) : 'unknown function'] + ' at ' + stackTrace();
    }

  function _llvm_lifetime_start() {}

  function _llvm_lifetime_end() {}

   
  Module["_memcmp"] = _memcmp;

  function _htonl(value) {
      return ((value & 0xff) << 24) + ((value & 0xff00) << 8) +
             ((value & 0xff0000) >>> 8) + ((value & 0xff000000) >>> 24);
    }

  var _ntohl=_htonl;

  
  function _htons(value) {
      return ((value & 0xff) << 8) + ((value & 0xff00) >> 8);
    }var _ntohs=_htons;


  var _llvm_memcpy_p0i8_p0i8_i64=_memcpy;

  function _close(fildes) {
      // int close(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/close.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        FS.close(stream);
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }

  function _fcntl(fildes, cmd, varargs, dup2) {
      // int fcntl(int fildes, int cmd, ...);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/fcntl.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      switch (cmd) {
        case 0:
          var arg = HEAP32[((varargs)>>2)];
          if (arg < 0) {
            ___setErrNo(ERRNO_CODES.EINVAL);
            return -1;
          }
          var newStream;
          try {
            newStream = FS.open(stream.path, stream.flags, 0, arg);
          } catch (e) {
            FS.handleFSError(e);
            return -1;
          }
          return newStream.fd;
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4:
          var arg = HEAP32[((varargs)>>2)];
          stream.flags |= arg;
          return 0;
        case 12:
        case 12:
          var arg = HEAP32[((varargs)>>2)];
          var offset = 0;
          // We're always unlocked.
          HEAP16[(((arg)+(offset))>>1)]=2;
          return 0;
        case 13:
        case 14:
        case 13:
        case 14:
          // Pretend that the locking is successful.
          return 0;
        case 8:
        case 9:
          // These are for sockets. We don't have them fully implemented yet.
          ___setErrNo(ERRNO_CODES.EINVAL);
          return -1;
        default:
          ___setErrNo(ERRNO_CODES.EINVAL);
          return -1;
      }
      // Should never be reached. Only to silence strict warnings.
      return -1;
    }

  function _setsockopt(fd, level, optname, optval, optlen) {
      console.log('ignoring setsockopt command');
      return 0;
    }

  function _gettimeofday(ptr) {
      var now = Date.now();
      HEAP32[((ptr)>>2)]=Math.floor(now/1000); // seconds
      HEAP32[(((ptr)+(4))>>2)]=Math.floor((now-1000*Math.floor(now/1000))*1000); // microseconds
      return 0;
    }

  
  
  function __inet_pton4_raw(str) {
      var b = str.split('.');
      for (var i = 0; i < 4; i++) {
        var tmp = Number(b[i]);
        if (isNaN(tmp)) return null;
        b[i] = tmp;
      }
      return (b[0] | (b[1] << 8) | (b[2] << 16) | (b[3] << 24)) >>> 0;
    }
  
  function __inet_pton6_raw(str) {
      var words;
      var w, offset, z, i;
      /* http://home.deds.nl/~aeron/regex/ */
      var valid6regx = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i
      var parts = [];
      if (!valid6regx.test(str)) {
        return null;
      }
      if (str === "::") {
        return [0, 0, 0, 0, 0, 0, 0, 0];
      }
      // Z placeholder to keep track of zeros when splitting the string on ":"
      if (str.indexOf("::") === 0) {
        str = str.replace("::", "Z:"); // leading zeros case
      } else {
        str = str.replace("::", ":Z:");
      }
  
      if (str.indexOf(".") > 0) {
        // parse IPv4 embedded stress
        str = str.replace(new RegExp('[.]', 'g'), ":");
        words = str.split(":");
        words[words.length-4] = parseInt(words[words.length-4]) + parseInt(words[words.length-3])*256;
        words[words.length-3] = parseInt(words[words.length-2]) + parseInt(words[words.length-1])*256;
        words = words.slice(0, words.length-2);
      } else {
        words = str.split(":");
      }
  
      offset = 0; z = 0;
      for (w=0; w < words.length; w++) {
        if (typeof words[w] === 'string') {
          if (words[w] === 'Z') {
            // compressed zeros - write appropriate number of zero words
            for (z = 0; z < (8 - words.length+1); z++) {
              parts[w+z] = 0;
            }
            offset = z-1;
          } else {
            // parse hex to field to 16-bit value and write it in network byte-order
            parts[w+offset] = _htons(parseInt(words[w],16));
          }
        } else {
          // parsed IPv4 words
          parts[w+offset] = words[w];
        }
      }
      return [
        (parts[1] << 16) | parts[0],
        (parts[3] << 16) | parts[2],
        (parts[5] << 16) | parts[4],
        (parts[7] << 16) | parts[6]
      ];
    }var DNS={address_map:{id:1,addrs:{},names:{}},lookup_name:function (name) {
        // If the name is already a valid ipv4 / ipv6 address, don't generate a fake one.
        var res = __inet_pton4_raw(name);
        if (res) {
          return name;
        }
        res = __inet_pton6_raw(name);
        if (res) {
          return name;
        }
  
        // See if this name is already mapped.
        var addr;
  
        if (DNS.address_map.addrs[name]) {
          addr = DNS.address_map.addrs[name];
        } else {
          var id = DNS.address_map.id++;
          assert(id < 65535, 'exceeded max address mappings of 65535');
  
          addr = '172.29.' + (id & 0xff) + '.' + (id & 0xff00);
  
          DNS.address_map.names[addr] = name;
          DNS.address_map.addrs[name] = addr;
        }
  
        return addr;
      },lookup_addr:function (addr) {
        if (DNS.address_map.names[addr]) {
          return DNS.address_map.names[addr];
        }
  
        return null;
      }};
  
  
  var Sockets={BUFFER_SIZE:10240,MAX_BUFFER_SIZE:10485760,nextFd:1,fds:{},nextport:1,maxport:65535,peer:null,connections:{},portmap:{},localAddr:4261412874,addrPool:[33554442,50331658,67108874,83886090,100663306,117440522,134217738,150994954,167772170,184549386,201326602,218103818,234881034]};
  
  function __inet_ntop4_raw(addr) {
      return (addr & 0xff) + '.' + ((addr >> 8) & 0xff) + '.' + ((addr >> 16) & 0xff) + '.' + ((addr >> 24) & 0xff)
    }
  
  function __inet_ntop6_raw(ints) {
      //  ref:  http://www.ietf.org/rfc/rfc2373.txt - section 2.5.4
      //  Format for IPv4 compatible and mapped  128-bit IPv6 Addresses
      //  128-bits are split into eight 16-bit words
      //  stored in network byte order (big-endian)
      //  |                80 bits               | 16 |      32 bits        |
      //  +-----------------------------------------------------------------+
      //  |               10 bytes               |  2 |      4 bytes        |
      //  +--------------------------------------+--------------------------+
      //  +               5 words                |  1 |      2 words        |
      //  +--------------------------------------+--------------------------+
      //  |0000..............................0000|0000|    IPv4 ADDRESS     | (compatible)
      //  +--------------------------------------+----+---------------------+
      //  |0000..............................0000|FFFF|    IPv4 ADDRESS     | (mapped)
      //  +--------------------------------------+----+---------------------+
      var str = "";
      var word = 0;
      var longest = 0;
      var lastzero = 0;
      var zstart = 0;
      var len = 0;
      var i = 0;
      var parts = [
        ints[0] & 0xffff,
        (ints[0] >> 16),
        ints[1] & 0xffff,
        (ints[1] >> 16),
        ints[2] & 0xffff,
        (ints[2] >> 16),
        ints[3] & 0xffff,
        (ints[3] >> 16)
      ];
  
      // Handle IPv4-compatible, IPv4-mapped, loopback and any/unspecified addresses
  
      var hasipv4 = true;
      var v4part = "";
      // check if the 10 high-order bytes are all zeros (first 5 words)
      for (i = 0; i < 5; i++) {
        if (parts[i] !== 0) { hasipv4 = false; break; }
      }
  
      if (hasipv4) {
        // low-order 32-bits store an IPv4 address (bytes 13 to 16) (last 2 words)
        v4part = __inet_ntop4_raw(parts[6] | (parts[7] << 16));
        // IPv4-mapped IPv6 address if 16-bit value (bytes 11 and 12) == 0xFFFF (6th word)
        if (parts[5] === -1) {
          str = "::ffff:";
          str += v4part;
          return str;
        }
        // IPv4-compatible IPv6 address if 16-bit value (bytes 11 and 12) == 0x0000 (6th word)
        if (parts[5] === 0) {
          str = "::";
          //special case IPv6 addresses
          if(v4part === "0.0.0.0") v4part = ""; // any/unspecified address
          if(v4part === "0.0.0.1") v4part = "1";// loopback address
          str += v4part;
          return str;
        }
      }
  
      // Handle all other IPv6 addresses
  
      // first run to find the longest contiguous zero words
      for (word = 0; word < 8; word++) {
        if (parts[word] === 0) {
          if (word - lastzero > 1) {
            len = 0;
          }
          lastzero = word;
          len++;
        }
        if (len > longest) {
          longest = len;
          zstart = word - longest + 1;
        }
      }
  
      for (word = 0; word < 8; word++) {
        if (longest > 1) {
          // compress contiguous zeros - to produce "::"
          if (parts[word] === 0 && word >= zstart && word < (zstart + longest) ) {
            if (word === zstart) {
              str += ":";
              if (zstart === 0) str += ":"; //leading zeros case
            }
            continue;
          }
        }
        // converts 16-bit words from big-endian to little-endian before converting to hex string
        str += Number(_ntohs(parts[word] & 0xffff)).toString(16);
        str += word < 7 ? ":" : "";
      }
      return str;
    }function __read_sockaddr(sa, salen) {
      // family / port offsets are common to both sockaddr_in and sockaddr_in6
      var family = HEAP16[((sa)>>1)];
      var port = _ntohs(HEAP16[(((sa)+(2))>>1)]);
      var addr;
  
      switch (family) {
        case 2:
          if (salen !== 16) {
            return { errno: ERRNO_CODES.EINVAL };
          }
          addr = HEAP32[(((sa)+(4))>>2)];
          addr = __inet_ntop4_raw(addr);
          break;
        case 10:
          if (salen !== 28) {
            return { errno: ERRNO_CODES.EINVAL };
          }
          addr = [
            HEAP32[(((sa)+(8))>>2)],
            HEAP32[(((sa)+(12))>>2)],
            HEAP32[(((sa)+(16))>>2)],
            HEAP32[(((sa)+(20))>>2)]
          ];
          addr = __inet_ntop6_raw(addr);
          break;
        default:
          return { errno: ERRNO_CODES.EAFNOSUPPORT };
      }
  
      return { family: family, addr: addr, port: port };
    }function _sendto(fd, message, length, flags, dest_addr, dest_len) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
      // read the address and port to send to
      var info = __read_sockaddr(dest_addr, dest_len);
      if (info.errno) {
        ___setErrNo(info.errno);
        return -1;
      }
      var port = info.port;
      var addr = DNS.lookup_addr(info.addr) || info.addr;
  
      // send the message
      try {
        var slab = HEAP8;
        return sock.sock_ops.sendmsg(sock, slab, message, length, addr, port);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }

  function ___errno_location() {
      return ___errno_state;
    }

  
  var ___DEFAULT_POLLMASK=5;function _select(nfds, readfds, writefds, exceptfds, timeout) {
      // readfds are supported,
      // writefds checks socket open status
      // exceptfds not supported
      // timeout is always 0 - fully async
      assert(nfds <= 64, 'nfds must be less than or equal to 64');  // fd sets have 64 bits
      assert(!exceptfds, 'exceptfds not supported');
  
      var total = 0;
      
      var srcReadLow = (readfds ? HEAP32[((readfds)>>2)] : 0),
          srcReadHigh = (readfds ? HEAP32[(((readfds)+(4))>>2)] : 0);
      var srcWriteLow = (writefds ? HEAP32[((writefds)>>2)] : 0),
          srcWriteHigh = (writefds ? HEAP32[(((writefds)+(4))>>2)] : 0);
      var srcExceptLow = (exceptfds ? HEAP32[((exceptfds)>>2)] : 0),
          srcExceptHigh = (exceptfds ? HEAP32[(((exceptfds)+(4))>>2)] : 0);
  
      var dstReadLow = 0,
          dstReadHigh = 0;
      var dstWriteLow = 0,
          dstWriteHigh = 0;
      var dstExceptLow = 0,
          dstExceptHigh = 0;
  
      var allLow = (readfds ? HEAP32[((readfds)>>2)] : 0) |
                   (writefds ? HEAP32[((writefds)>>2)] : 0) |
                   (exceptfds ? HEAP32[((exceptfds)>>2)] : 0);
      var allHigh = (readfds ? HEAP32[(((readfds)+(4))>>2)] : 0) |
                    (writefds ? HEAP32[(((writefds)+(4))>>2)] : 0) |
                    (exceptfds ? HEAP32[(((exceptfds)+(4))>>2)] : 0);
  
      function get(fd, low, high, val) {
        return (fd < 32 ? (low & val) : (high & val));
      }
  
      for (var fd = 0; fd < nfds; fd++) {
        var mask = 1 << (fd % 32);
        if (!(get(fd, allLow, allHigh, mask))) {
          continue;  // index isn't in the set
        }
  
        var stream = FS.getStream(fd);
        if (!stream) {
          ___setErrNo(ERRNO_CODES.EBADF);
          return -1;
        }
  
        var flags = ___DEFAULT_POLLMASK;
  
        if (stream.stream_ops.poll) {
          flags = stream.stream_ops.poll(stream);
        }
  
        if ((flags & 1) && get(fd, srcReadLow, srcReadHigh, mask)) {
          fd < 32 ? (dstReadLow = dstReadLow | mask) : (dstReadHigh = dstReadHigh | mask);
          total++;
        }
        if ((flags & 4) && get(fd, srcWriteLow, srcWriteHigh, mask)) {
          fd < 32 ? (dstWriteLow = dstWriteLow | mask) : (dstWriteHigh = dstWriteHigh | mask);
          total++;
        }
        if ((flags & 2) && get(fd, srcExceptLow, srcExceptHigh, mask)) {
          fd < 32 ? (dstExceptLow = dstExceptLow | mask) : (dstExceptHigh = dstExceptHigh | mask);
          total++;
        }
      }
  
      if (readfds) {
        HEAP32[((readfds)>>2)]=dstReadLow;
        HEAP32[(((readfds)+(4))>>2)]=dstReadHigh;
      }
      if (writefds) {
        HEAP32[((writefds)>>2)]=dstWriteLow;
        HEAP32[(((writefds)+(4))>>2)]=dstWriteHigh;
      }
      if (exceptfds) {
        HEAP32[((exceptfds)>>2)]=dstExceptLow;
        HEAP32[(((exceptfds)+(4))>>2)]=dstExceptHigh;
      }
      
      return total;
    }

  function _srand(seed) {}

  function _socket(family, type, protocol) {
      var sock = SOCKFS.createSocket(family, type, protocol);
      assert(sock.stream.fd < 64); // select() assumes socket fd values are in 0..63
      return sock.stream.fd;
    }

  
  function _strerror_r(errnum, strerrbuf, buflen) {
      if (errnum in ERRNO_MESSAGES) {
        if (ERRNO_MESSAGES[errnum].length > buflen - 1) {
          return ___setErrNo(ERRNO_CODES.ERANGE);
        } else {
          var msg = ERRNO_MESSAGES[errnum];
          writeAsciiToMemory(msg, strerrbuf);
          return 0;
        }
      } else {
        return ___setErrNo(ERRNO_CODES.EINVAL);
      }
    }function _strerror(errnum) {
      if (!_strerror.buffer) _strerror.buffer = _malloc(256);
      _strerror_r(errnum, _strerror.buffer, 256);
      return _strerror.buffer;
    }

  function _bind(fd, addrp, addrlen) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
      var info = __read_sockaddr(addrp, addrlen);
      if (info.errno) {
        ___setErrNo(info.errno);
        return -1;
      }
      var port = info.port;
      var addr = DNS.lookup_addr(info.addr) || info.addr;
  
      try {
        sock.sock_ops.bind(sock, addr, port);
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }

  
  function __inet_ntop4(src, dst, size) {
      var addr = HEAP32[((src)>>2)];
      var str = __inet_ntop4_raw(addr);
      if (str.length+1 > size) {
        ___setErrNo(ERRNO_CODES.ENOSPC);
        return 0;
      }
      writeStringToMemory(str, dst);
      return dst;
    }
  
  function __inet_ntop6(src, dst, size) {
      var addr = [
        HEAP32[((src)>>2)], HEAP32[(((src)+(4))>>2)],
        HEAP32[(((src)+(8))>>2)], HEAP32[(((src)+(12))>>2)]
      ];
      var str = __inet_ntop6_raw(addr);
      if (str.length+1 > size) {
        ___setErrNo(ERRNO_CODES.ENOSPC);
        return 0;
      }
      writeStringToMemory(str, dst);
      return dst;
    }function _inet_ntop(af, src, dst, size) {
      // http://pubs.opengroup.org/onlinepubs/9699919799/functions/inet_ntop.html
      switch (af) {
        case 2:
          return __inet_ntop4(src, dst, size);
        case 10:
          return __inet_ntop6(src, dst, size);
        default:
          ___setErrNo(ERRNO_CODES.EAFNOSUPPORT);
          return 0;
      }
    }


  function _snprintf(s, n, format, varargs) {
      // int snprintf(char *restrict s, size_t n, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var limit = (n === undefined) ? result.length
                                    : Math.min(result.length, Math.max(n - 1, 0));
      if (s < 0) {
        s = -s;
        var buf = _malloc(limit+1);
        HEAP32[((s)>>2)]=buf;
        s = buf;
      }
      for (var i = 0; i < limit; i++) {
        HEAP8[(((s)+(i))|0)]=result[i];
      }
      if (limit < n || (n === undefined)) HEAP8[(((s)+(i))|0)]=0;
      return result.length;
    }

  
  function __inet_pton4(src, dst) {
      var ret = __inet_pton4_raw(Pointer_stringify(src));
      if (ret === null) {
        return 0;
      }
      HEAP32[((dst)>>2)]=ret;
      return 1;
    }
  
  function __inet_pton6(src, dst) {
      var ints = __inet_pton6_raw(Pointer_stringify(src));
      if (ints === null) {
        return 0;
      }
      for (var i = 0; i < 4; i++) {
        HEAP32[(((dst)+(i*4))>>2)]=ints[i];
      }
      return 1;
    }function _inet_pton(af, src, dst) {
      // http://pubs.opengroup.org/onlinepubs/9699919799/functions/inet_pton.html
      switch (af) {
        case 2:
          return __inet_pton4(src, dst);
        case 10:
          return __inet_pton6(src, dst);
        default:
          ___setErrNo(ERRNO_CODES.EAFNOSUPPORT);
          return -1;
      }
    }

  
  function __write_sockaddr(sa, family, addr, port) {
      switch (family) {
        case 2:
          addr = __inet_pton4_raw(addr);
          HEAP16[((sa)>>1)]=family;
          HEAP32[(((sa)+(4))>>2)]=addr;
          HEAP16[(((sa)+(2))>>1)]=_htons(port);
          break;
        case 10:
          addr = __inet_pton6_raw(addr);
          HEAP32[((sa)>>2)]=family;
          HEAP32[(((sa)+(8))>>2)]=addr[0];
          HEAP32[(((sa)+(12))>>2)]=addr[1];
          HEAP32[(((sa)+(16))>>2)]=addr[2];
          HEAP32[(((sa)+(20))>>2)]=addr[3];
          HEAP16[(((sa)+(2))>>1)]=_htons(port);
          break;
        default:
          return { errno: ERRNO_CODES.EAFNOSUPPORT };
      }
      // kind of lame, but let's match _read_sockaddr's interface
      return {};
    }function _getaddrinfo(node, service, hint, out) {
      // Note getaddrinfo currently only returns a single addrinfo with ai_next defaulting to NULL. When NULL
      // hints are specified or ai_family set to AF_UNSPEC or ai_socktype or ai_protocol set to 0 then we
      // really should provide a linked list of suitable addrinfo values.
      var addrs = [];
      var canon = null;
      var addr = 0;
      var port = 0;
      var flags = 0;
      var family = 0;
      var type = 0;
      var proto = 0;
      var ai, last;
  
      function allocaddrinfo(family, type, proto, canon, addr, port) {
        var sa, salen, ai;
        var res;
  
        salen = family === 10 ?
          28 :
          16;
        addr = family === 10 ?
          __inet_ntop6_raw(addr) :
          __inet_ntop4_raw(addr);
        sa = _malloc(salen);
        res = __write_sockaddr(sa, family, addr, port);
        assert(!res.errno);
  
        ai = _malloc(32);
        HEAP32[(((ai)+(4))>>2)]=family;
        HEAP32[(((ai)+(8))>>2)]=type;
        HEAP32[(((ai)+(12))>>2)]=proto;
        if (canon) {
          HEAP32[(((ai)+(24))>>2)]=canon;
        }
        HEAP32[(((ai)+(20))>>2)]=sa;
        if (family === 10) {
          HEAP32[(((ai)+(16))>>2)]=28;
        } else {
          HEAP32[(((ai)+(16))>>2)]=16;
        }
  
        return ai;
      }
  
      if (hint) {
        flags = HEAP32[((hint)>>2)];
        family = HEAP32[(((hint)+(4))>>2)];
        type = HEAP32[(((hint)+(8))>>2)];
        proto = HEAP32[(((hint)+(12))>>2)];
      }
      if (type && !proto) {
        proto = type === 2 ? 17 : 6;
      }
      if (!type && proto) {
        type = proto === 17 ? 2 : 1;
      }
  
      // If type or proto are set to zero in hints we should really be returning multiple addrinfo values, but for
      // now default to a TCP STREAM socket so we can at least return a sensible addrinfo given NULL hints.
      if (proto === 0) {
        proto = 6;
      }
      if (type === 0) {
        type = 1;
      }
  
      if (!node && !service) {
        return -2;
      }
      if (flags & ~(1|2|4|
          1024|8|16|32)) {
        return -1;
      }
      if (hint !== 0 && (HEAP32[((hint)>>2)] & 2) && !node) {
        return -1;
      }
      if (flags & 32) {
        // TODO
        return -2;
      }
      if (type !== 0 && type !== 1 && type !== 2) {
        return -7;
      }
      if (family !== 0 && family !== 2 && family !== 10) {
        return -6;
      }
  
      if (service) {
        service = Pointer_stringify(service);
        port = parseInt(service, 10);
  
        if (isNaN(port)) {
          if (flags & 1024) {
            return -2;
          }
          // TODO support resolving well-known service names from:
          // http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.txt
          return -8;
        }
      }
  
      if (!node) {
        if (family === 0) {
          family = 2;
        }
        if ((flags & 1) === 0) {
          if (family === 2) {
            addr = _htonl(2130706433);
          } else {
            addr = [0, 0, 0, 1];
          }
        }
        ai = allocaddrinfo(family, type, proto, null, addr, port);
        HEAP32[((out)>>2)]=ai;
        return 0;
      }
  
      //
      // try as a numeric address
      //
      node = Pointer_stringify(node);
      addr = __inet_pton4_raw(node);
      if (addr !== null) {
        // incoming node is a valid ipv4 address
        if (family === 0 || family === 2) {
          family = 2;
        }
        else if (family === 10 && (flags & 8)) {
          addr = [0, 0, _htonl(0xffff), addr];
          family = 10;
        } else {
          return -2;
        }
      } else {
        addr = __inet_pton6_raw(node);
        if (addr !== null) {
          // incoming node is a valid ipv6 address
          if (family === 0 || family === 10) {
            family = 10;
          } else {
            return -2;
          }
        }
      }
      if (addr != null) {
        ai = allocaddrinfo(family, type, proto, node, addr, port);
        HEAP32[((out)>>2)]=ai;
        return 0;
      }
      if (flags & 4) {
        return -2;
      }
  
      //
      // try as a hostname
      //
      // resolve the hostname to a temporary fake address
      node = DNS.lookup_name(node);
      addr = __inet_pton4_raw(node);
      if (family === 0) {
        family = 2;
      } else if (family === 10) {
        addr = [0, 0, _htonl(0xffff), addr];
      }
      ai = allocaddrinfo(family, type, proto, null, addr, port);
      HEAP32[((out)>>2)]=ai;
      return 0;
    }

  function _freeaddrinfo(ai) {
      var sa = HEAP32[(((ai)+(20))>>2)];
      _free(sa);
      _free(ai);
    }

  function _recvfrom(fd, buf, len, flags, addr, addrlen) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
      // read from the socket
      var msg;
      try {
        msg = sock.sock_ops.recvmsg(sock, len);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
  
      if (!msg) {
        // socket is closed
        return 0;
      }
  
      // write the source address out
      if (addr) {
        var res = __write_sockaddr(addr, sock.family, DNS.lookup_name(msg.addr), msg.port);
        assert(!res.errno);
      }
      // write the buffer out
      HEAPU8.set(msg.buffer, buf);
  
      return msg.buffer.byteLength;
    }


  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret;
      }
      return ret;
    }

  var _llvm_memset_p0i8_i64=_memset;

  
  function _strncmp(px, py, n) {
      var i = 0;
      while (i < n) {
        var x = HEAPU8[(((px)+(i))|0)];
        var y = HEAPU8[(((py)+(i))|0)];
        if (x == y && x == 0) return 0;
        if (x == 0) return -1;
        if (y == 0) return 1;
        if (x == y) {
          i ++;
          continue;
        } else {
          return x > y ? 1 : -1;
        }
      }
      return 0;
    }function _strcmp(px, py) {
      return _strncmp(px, py, TOTAL_MEMORY);
    }

  function _abort() {
      Module['abort']();
    }

  
  function _recv(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _read(fd, buf, len);
    }
  
  function _pread(fildes, buf, nbyte, offset) {
      // ssize_t pread(int fildes, void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _read(fildes, buf, nbyte) {
      // ssize_t read(int fildes, void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }

  function _access(path, amode) {
      // int access(const char *path, int amode);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/access.html
      path = Pointer_stringify(path);
      if (amode & ~7) {
        // need a valid mode
        ___setErrNo(ERRNO_CODES.EINVAL);
        return -1;
      }
      var node;
      try {
        var lookup = FS.lookupPath(path, { follow: true });
        node = lookup.node;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
      var perms = '';
      if (amode & 4) perms += 'r';
      if (amode & 2) perms += 'w';
      if (amode & 1) perms += 'x';
      if (perms /* otherwise, they've just passed F_OK */ && FS.nodePermissions(node, perms)) {
        ___setErrNo(ERRNO_CODES.EACCES);
        return -1;
      }
      return 0;
    }

  function _open(path, oflag, varargs) {
      // int open(const char *path, int oflag, ...);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/open.html
      var mode = HEAP32[((varargs)>>2)];
      path = Pointer_stringify(path);
      try {
        var stream = FS.open(path, oflag, mode);
        return stream.fd;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }

  
  
  function __getFloat(text) {
      return /^[+-]?[0-9]*\.?[0-9]+([eE][+-]?[0-9]+)?/.exec(text);
    }function __scanString(format, get, unget, varargs) {
      if (!__scanString.whiteSpace) {
        __scanString.whiteSpace = {};
        __scanString.whiteSpace[32] = 1;
        __scanString.whiteSpace[9] = 1;
        __scanString.whiteSpace[10] = 1;
        __scanString.whiteSpace[11] = 1;
        __scanString.whiteSpace[12] = 1;
        __scanString.whiteSpace[13] = 1;
      }
      // Supports %x, %4x, %d.%d, %lld, %s, %f, %lf.
      // TODO: Support all format specifiers.
      format = Pointer_stringify(format);
      var soFar = 0;
      if (format.indexOf('%n') >= 0) {
        // need to track soFar
        var _get = get;
        get = function get() {
          soFar++;
          return _get();
        }
        var _unget = unget;
        unget = function unget() {
          soFar--;
          return _unget();
        }
      }
      var formatIndex = 0;
      var argsi = 0;
      var fields = 0;
      var argIndex = 0;
      var next;
  
      mainLoop:
      for (var formatIndex = 0; formatIndex < format.length;) {
        if (format[formatIndex] === '%' && format[formatIndex+1] == 'n') {
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          HEAP32[((argPtr)>>2)]=soFar;
          formatIndex += 2;
          continue;
        }
  
        if (format[formatIndex] === '%') {
          var nextC = format.indexOf('c', formatIndex+1);
          if (nextC > 0) {
            var maxx = 1;
            if (nextC > formatIndex+1) {
              var sub = format.substring(formatIndex+1, nextC);
              maxx = parseInt(sub);
              if (maxx != sub) maxx = 0;
            }
            if (maxx) {
              var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
              argIndex += Runtime.getAlignSize('void*', null, true);
              fields++;
              for (var i = 0; i < maxx; i++) {
                next = get();
                HEAP8[((argPtr++)|0)]=next;
              }
              formatIndex += nextC - formatIndex + 1;
              continue;
            }
          }
        }
  
        // handle %[...]
        if (format[formatIndex] === '%' && format.indexOf('[', formatIndex+1) > 0) {
          var match = /\%([0-9]*)\[(\^)?(\]?[^\]]*)\]/.exec(format.substring(formatIndex));
          if (match) {
            var maxNumCharacters = parseInt(match[1]) || Infinity;
            var negateScanList = (match[2] === '^');
            var scanList = match[3];
  
            // expand "middle" dashs into character sets
            var middleDashMatch;
            while ((middleDashMatch = /([^\-])\-([^\-])/.exec(scanList))) {
              var rangeStartCharCode = middleDashMatch[1].charCodeAt(0);
              var rangeEndCharCode = middleDashMatch[2].charCodeAt(0);
              for (var expanded = ''; rangeStartCharCode <= rangeEndCharCode; expanded += String.fromCharCode(rangeStartCharCode++));
              scanList = scanList.replace(middleDashMatch[1] + '-' + middleDashMatch[2], expanded);
            }
  
            var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
            argIndex += Runtime.getAlignSize('void*', null, true);
            fields++;
  
            for (var i = 0; i < maxNumCharacters; i++) {
              next = get();
              if (negateScanList) {
                if (scanList.indexOf(String.fromCharCode(next)) < 0) {
                  HEAP8[((argPtr++)|0)]=next;
                } else {
                  unget();
                  break;
                }
              } else {
                if (scanList.indexOf(String.fromCharCode(next)) >= 0) {
                  HEAP8[((argPtr++)|0)]=next;
                } else {
                  unget();
                  break;
                }
              }
            }
  
            // write out null-terminating character
            HEAP8[((argPtr++)|0)]=0;
            formatIndex += match[0].length;
            
            continue;
          }
        }      
        // remove whitespace
        while (1) {
          next = get();
          if (next == 0) return fields;
          if (!(next in __scanString.whiteSpace)) break;
        }
        unget();
  
        if (format[formatIndex] === '%') {
          formatIndex++;
          var suppressAssignment = false;
          if (format[formatIndex] == '*') {
            suppressAssignment = true;
            formatIndex++;
          }
          var maxSpecifierStart = formatIndex;
          while (format[formatIndex].charCodeAt(0) >= 48 &&
                 format[formatIndex].charCodeAt(0) <= 57) {
            formatIndex++;
          }
          var max_;
          if (formatIndex != maxSpecifierStart) {
            max_ = parseInt(format.slice(maxSpecifierStart, formatIndex), 10);
          }
          var long_ = false;
          var half = false;
          var longLong = false;
          if (format[formatIndex] == 'l') {
            long_ = true;
            formatIndex++;
            if (format[formatIndex] == 'l') {
              longLong = true;
              formatIndex++;
            }
          } else if (format[formatIndex] == 'h') {
            half = true;
            formatIndex++;
          }
          var type = format[formatIndex];
          formatIndex++;
          var curr = 0;
          var buffer = [];
          // Read characters according to the format. floats are trickier, they may be in an unfloat state in the middle, then be a valid float later
          if (type == 'f' || type == 'e' || type == 'g' ||
              type == 'F' || type == 'E' || type == 'G') {
            next = get();
            while (next > 0 && (!(next in __scanString.whiteSpace)))  {
              buffer.push(String.fromCharCode(next));
              next = get();
            }
            var m = __getFloat(buffer.join(''));
            var last = m ? m[0].length : 0;
            for (var i = 0; i < buffer.length - last + 1; i++) {
              unget();
            }
            buffer.length = last;
          } else {
            next = get();
            var first = true;
            
            // Strip the optional 0x prefix for %x.
            if ((type == 'x' || type == 'X') && (next == 48)) {
              var peek = get();
              if (peek == 120 || peek == 88) {
                next = get();
              } else {
                unget();
              }
            }
            
            while ((curr < max_ || isNaN(max_)) && next > 0) {
              if (!(next in __scanString.whiteSpace) && // stop on whitespace
                  (type == 's' ||
                   ((type === 'd' || type == 'u' || type == 'i') && ((next >= 48 && next <= 57) ||
                                                                     (first && next == 45))) ||
                   ((type === 'x' || type === 'X') && (next >= 48 && next <= 57 ||
                                     next >= 97 && next <= 102 ||
                                     next >= 65 && next <= 70))) &&
                  (formatIndex >= format.length || next !== format[formatIndex].charCodeAt(0))) { // Stop when we read something that is coming up
                buffer.push(String.fromCharCode(next));
                next = get();
                curr++;
                first = false;
              } else {
                break;
              }
            }
            unget();
          }
          if (buffer.length === 0) return 0;  // Failure.
          if (suppressAssignment) continue;
  
          var text = buffer.join('');
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          switch (type) {
            case 'd': case 'u': case 'i':
              if (half) {
                HEAP16[((argPtr)>>1)]=parseInt(text, 10);
              } else if (longLong) {
                (tempI64 = [parseInt(text, 10)>>>0,(tempDouble=parseInt(text, 10),(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)],HEAP32[((argPtr)>>2)]=tempI64[0],HEAP32[(((argPtr)+(4))>>2)]=tempI64[1]);
              } else {
                HEAP32[((argPtr)>>2)]=parseInt(text, 10);
              }
              break;
            case 'X':
            case 'x':
              HEAP32[((argPtr)>>2)]=parseInt(text, 16);
              break;
            case 'F':
            case 'f':
            case 'E':
            case 'e':
            case 'G':
            case 'g':
            case 'E':
              // fallthrough intended
              if (long_) {
                HEAPF64[((argPtr)>>3)]=parseFloat(text);
              } else {
                HEAPF32[((argPtr)>>2)]=parseFloat(text);
              }
              break;
            case 's':
              var array = intArrayFromString(text);
              for (var j = 0; j < array.length; j++) {
                HEAP8[(((argPtr)+(j))|0)]=array[j];
              }
              break;
          }
          fields++;
        } else if (format[formatIndex].charCodeAt(0) in __scanString.whiteSpace) {
          next = get();
          while (next in __scanString.whiteSpace) {
            if (next <= 0) break mainLoop;  // End of input.
            next = get();
          }
          unget(next);
          formatIndex++;
        } else {
          // Not a specifier.
          next = get();
          if (format[formatIndex].charCodeAt(0) !== next) {
            unget(next);
            break mainLoop;
          }
          formatIndex++;
        }
      }
      return fields;
    }function _sscanf(s, format, varargs) {
      // int sscanf(const char *restrict s, const char *restrict format, ... );
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/scanf.html
      var index = 0;
      function get() { return HEAP8[(((s)+(index++))|0)]; };
      function unget() { index--; };
      return __scanString(format, get, unget, varargs);
    }

  function _emscripten_asm_const(code) {
      Runtime.getAsmConst(code, 0)();
    }

  function _sprintf(s, format, varargs) {
      // int sprintf(char *restrict s, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      return _snprintf(s, undefined, format, varargs);
    }

  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) self.alloc(bytes);
      return ret;  // Previous break location.
    }

  function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 30: return PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 79:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
          return 200809;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024;
        case 31:
        case 42:
        case 72:
          return 32;
        case 87:
        case 26:
        case 33:
          return 2147483647;
        case 34:
        case 1:
          return 47839;
        case 38:
        case 36:
          return 99;
        case 43:
        case 37:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 28: return 32768;
        case 44: return 32767;
        case 75: return 16384;
        case 39: return 1000;
        case 89: return 700;
        case 71: return 256;
        case 40: return 255;
        case 2: return 100;
        case 180: return 64;
        case 25: return 20;
        case 5: return 16;
        case 6: return 6;
        case 73: return 4;
        case 84: return 1;
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }






  var Browser={mainLoop:{scheduler:null,shouldPause:false,paused:false,queue:[],pause:function () {
          Browser.mainLoop.shouldPause = true;
        },resume:function () {
          if (Browser.mainLoop.paused) {
            Browser.mainLoop.paused = false;
            Browser.mainLoop.scheduler();
          }
          Browser.mainLoop.shouldPause = false;
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
  
        if (Browser.initted || ENVIRONMENT_IS_WORKER) return;
        Browser.initted = true;
  
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
          Module.noImageDecoding = true;
        }
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
              }
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          var img = new Image();
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function audio_onerror(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
  
        // Canvas event setup
  
        var canvas = Module['canvas'];
        canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                    canvas['mozRequestPointerLock'] ||
                                    canvas['webkitRequestPointerLock'];
        canvas.exitPointerLock = document['exitPointerLock'] ||
                                 document['mozExitPointerLock'] ||
                                 document['webkitExitPointerLock'] ||
                                 function(){}; // no-op if function does not exist
        canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas;
        }
  
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
  
        if (Module['elementPointerLock']) {
          canvas.addEventListener("click", function(ev) {
            if (!Browser.pointerLock && canvas.requestPointerLock) {
              canvas.requestPointerLock();
              ev.preventDefault();
            }
          }, false);
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        var ctx;
        try {
          if (useWebGL) {
            var contextAttributes = {
              antialias: false,
              alpha: false
            };
  
            if (webGLContextAttributes) {
              for (var attribute in webGLContextAttributes) {
                contextAttributes[attribute] = webGLContextAttributes[attribute];
              }
            }
  
  
            var errorInfo = '?';
            function onContextCreationError(event) {
              errorInfo = event.statusMessage || errorInfo;
            }
            canvas.addEventListener('webglcontextcreationerror', onContextCreationError, false);
            try {
              ['experimental-webgl', 'webgl'].some(function(webglId) {
                return ctx = canvas.getContext(webglId, contextAttributes);
              });
            } finally {
              canvas.removeEventListener('webglcontextcreationerror', onContextCreationError, false);
            }
          } else {
            ctx = canvas.getContext('2d');
          }
          if (!ctx) throw ':(';
        } catch (e) {
          Module.print('Could not create canvas: ' + [errorInfo, e]);
          return null;
        }
        if (useWebGL) {
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
  
          // Warn on context loss
          canvas.addEventListener('webglcontextlost', function(event) {
            alert('WebGL context lost. You will need to reload the page.');
          }, false);
        }
        if (setInModule) {
          GLctx = Module.ctx = ctx;
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Module['canvas'];
        function fullScreenChange() {
          Browser.isFullScreen = false;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement']) === canvas) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'];
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else if (Browser.resizeCanvas){
            Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
        }
  
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
        }
  
        canvas.requestFullScreen = canvas['requestFullScreen'] ||
                                   canvas['mozRequestFullScreen'] ||
                                   (canvas['webkitRequestFullScreen'] ? function() { canvas['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvas.requestFullScreen();
      },requestAnimationFrame:function requestAnimationFrame(func) {
        if (typeof window === 'undefined') { // Provide fallback to setTimeout if window is undefined (e.g. in Node.js)
          setTimeout(func, 1000/60);
        } else {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                           window['mozRequestAnimationFrame'] ||
                                           window['webkitRequestAnimationFrame'] ||
                                           window['msRequestAnimationFrame'] ||
                                           window['oRequestAnimationFrame'] ||
                                           window['setTimeout'];
          }
          window.requestAnimationFrame(func);
        }
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (!ABORT) func();
        });
      },safeSetTimeout:function (func, timeout) {
        return setTimeout(function() {
          if (!ABORT) func();
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        return setInterval(function() {
          if (!ABORT) func();
        }, timeout);
      },getMimetype:function (name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          
          // check if SDL is available
          if (typeof SDL != "undefined") {
          	Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          	Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
          	// just add the mouse delta to the current absolut mouse position
          	// FIXME: ideally this should be clamped against the canvas size and zero
          	Browser.mouseX += Browser.mouseMovementX;
          	Browser.mouseY += Browser.mouseMovementY;
          }        
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var x, y;
          
          // Neither .scrollX or .pageXOffset are defined in a spec, but
          // we prefer .scrollX because it is currently in a spec draft.
          // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
          var scrollX = ((typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset);
          var scrollY = ((typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset);
          if (event.type == 'touchstart' ||
              event.type == 'touchend' ||
              event.type == 'touchmove') {
            var t = event.touches.item(0);
            if (t) {
              x = t.pageX - (scrollX + rect.left);
              y = t.pageY - (scrollY + rect.top);
            } else {
              return;
            }
          } else {
            x = event.pageX - (scrollX + rect.left);
            y = event.pageY - (scrollY + rect.top);
          }
  
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
  
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        canvas.width = width;
        canvas.height = height;
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        var canvas = Module['canvas'];
        this.windowedWidth = canvas.width;
        this.windowedHeight = canvas.height;
        canvas.width = screen.width;
        canvas.height = screen.height;
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        var canvas = Module['canvas'];
        canvas.width = this.windowedWidth;
        canvas.height = this.windowedHeight;
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      }};
FS.staticInit();__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
___errno_state = Runtime.staticAlloc(4); HEAP32[((___errno_state)>>2)]=0;
__ATINIT__.unshift({ func: function() { TTY.init() } });__ATEXIT__.push({ func: function() { TTY.shutdown() } });TTY.utf8 = new Runtime.UTF8Processor();
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); NODEFS.staticInit(); }
__ATINIT__.push({ func: function() { SOCKFS.root = FS.mount(SOCKFS, {}, null); } });
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);

staticSealed = true; // seal the static portion of memory

STACK_MAX = STACK_BASE + 5242880;

DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);

assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");

 var ctlz_i8 = allocate([8,7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_DYNAMIC);
 var cttz_i8 = allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0], "i8", ALLOC_DYNAMIC);

var Math_min = Math.min;
function invoke_viiiii(index,a1,a2,a3,a4,a5) {
  try {
    Module["dynCall_viiiii"](index,a1,a2,a3,a4,a5);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_v(index) {
  try {
    Module["dynCall_v"](index);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_i(index) {
  try {
    return Module["dynCall_i"](index);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_vi(index,a1) {
  try {
    Module["dynCall_vi"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_vii(index,a1,a2) {
  try {
    Module["dynCall_vii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_ii(index,a1) {
  try {
    return Module["dynCall_ii"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  try {
    Module["dynCall_viiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iiiii(index,a1,a2,a3,a4) {
  try {
    return Module["dynCall_iiiii"](index,a1,a2,a3,a4);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module["dynCall_viiiiii"](index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iii(index,a1,a2) {
  try {
    return Module["dynCall_iii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_iiiiii(index,a1,a2,a3,a4,a5) {
  try {
    return Module["dynCall_iiiiii"](index,a1,a2,a3,a4,a5);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_viiii(index,a1,a2,a3,a4) {
  try {
    Module["dynCall_viiii"](index,a1,a2,a3,a4);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function asmPrintInt(x, y) {
  Module.print('int ' + x + ',' + y);// + ' ' + new Error().stack);
}
function asmPrintFloat(x, y) {
  Module.print('float ' + x + ',' + y);// + ' ' + new Error().stack);
}
// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer){"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.cttz_i8|0;var n=env.ctlz_i8|0;var o=env._stderr|0;var p=+env.NaN;var q=+env.Infinity;var r=0;var s=0;var t=0;var u=0;var v=0,w=0,x=0,y=0,z=0.0,A=0,B=0,C=0,D=0.0;var E=0;var F=0;var G=0;var H=0;var I=0;var J=0;var K=0;var L=0;var M=0;var N=0;var O=global.Math.floor;var P=global.Math.abs;var Q=global.Math.sqrt;var R=global.Math.pow;var S=global.Math.cos;var T=global.Math.sin;var U=global.Math.tan;var V=global.Math.acos;var W=global.Math.asin;var X=global.Math.atan;var Y=global.Math.atan2;var Z=global.Math.exp;var _=global.Math.log;var $=global.Math.ceil;var aa=global.Math.imul;var ba=env.abort;var ca=env.assert;var da=env.asmPrintInt;var ea=env.asmPrintFloat;var fa=env.min;var ga=env.invoke_viiiii;var ha=env.invoke_v;var ia=env.invoke_i;var ja=env.invoke_vi;var ka=env.invoke_vii;var la=env.invoke_ii;var ma=env.invoke_viiiiiiii;var na=env.invoke_iiiii;var oa=env.invoke_viiiiii;var pa=env.invoke_iii;var qa=env.invoke_iiiiii;var ra=env.invoke_viiii;var sa=env._llvm_lifetime_end;var ta=env._rand;var ua=env._getaddrinfo;var va=env._htonl;var wa=env.___assert_fail;var xa=env.__scanString;var ya=env.__inet_pton4_raw;var za=env._inet_pton;var Aa=env.__getFloat;var Ba=env._freeaddrinfo;var Ca=env._fprintf;var Da=env.__read_sockaddr;var Ea=env._close;var Fa=env._fflush;var Ga=env._htons;var Ha=env.__reallyNegative;var Ia=env.__write_sockaddr;var Ja=env._select;var Ka=env._access;var La=env._emscripten_asm_const;var Ma=env._llvm_stackrestore;var Na=env._open;var Oa=env.___setErrNo;var Pa=env._fwrite;var Qa=env.__inet_ntop4;var Ra=env._qsort;var Sa=env._send;var Ta=env._write;var Ua=env._inet_ntop;var Va=env.__inet_pton6_raw;var Wa=env._sprintf;var Xa=env._fcntl;var Ya=env._sysconf;var Za=env._srand;var _a=env.__inet_ntop4_raw;var $a=env._read;var ab=env.__inet_ntop6_raw;var bb=env.__formatString;var cb=env._gettimeofday;var db=env.__inet_ntop6;var eb=env._strncmp;var fb=env.__inet_pton6;var gb=env._setsockopt;var hb=env.__inet_pton4;var ib=env._pwrite;var jb=env._recv;var kb=env._socket;var lb=env._sbrk;var mb=env._llvm_stacksave;var nb=env._strerror_r;var ob=env._bind;var pb=env._pread;var qb=env.___errno_location;var rb=env._strerror;var sb=env._recvfrom;var tb=env._llvm_lifetime_start;var ub=env._abort;var vb=env._time;var wb=env._sendto;var xb=env._sscanf;var yb=env._strcmp;var zb=env._snprintf;var Ab=0.0;
// EMSCRIPTEN_START_FUNCS
function Nb(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+7&-8;return b|0}function Ob(){return i|0}function Pb(a){a=a|0;i=a}function Qb(a,b){a=a|0;b=b|0;if((r|0)==0){r=a;s=b}}function Rb(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0]}function Sb(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0];a[k+4|0]=a[b+4|0];a[k+5|0]=a[b+5|0];a[k+6|0]=a[b+6|0];a[k+7|0]=a[b+7|0]}function Tb(a){a=a|0;E=a}function Ub(a){a=a|0;F=a}function Vb(a){a=a|0;G=a}function Wb(a){a=a|0;H=a}function Xb(a){a=a|0;I=a}function Yb(a){a=a|0;J=a}function Zb(a){a=a|0;K=a}function _b(a){a=a|0;L=a}function $b(a){a=a|0;M=a}function ac(a){a=a|0;N=a}function bc(){}function cc(a,b){a=a|0;b=b|0;Nc(a,b);return}function dc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return Oc(a,b,c,d)|0}function ec(a,b){a=a|0;b=b|0;return Lc(a,b)|0}function fc(a,b,c){a=a|0;b=b|0;c=c|0;return Mc(a,b,c)|0}function gc(a,b){a=a|0;b=b|0;return Pc(a,b)|0}function hc(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return Qc(a,b,c,d)|0}function ic(a,b,c){a=a|0;b=b|0;c=c|0;return Sc(a,b,c)|0}function jc(a,b){a=a|0;b=b|0;return Tc(a,b)|0}function kc(a,b,c){a=a|0;b=b|0;c=c|0;Uc(a,b,c);return}function lc(a,b,c){a=a|0;b=b|0;c=c|0;Vc(a,b,c);return}function mc(a,b,c){a=a|0;b=b|0;c=c|0;Wc(a,b,c);return}function nc(a,b,c){a=a|0;b=b|0;c=c|0;Xc(a,b,c);return}function oc(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;return ue(c[a+8>>2]|0,b,d,e,f)|0}function pc(a){a=a|0;return Je(c[a+8>>2]|0)|0}function qc(a){a=a|0;return Yc(a)|0}function rc(a){a=a|0;$c(a);return}function sc(a){a=a|0;dd(a);return}function tc(){return ed()|0}function uc(a,b){a=a|0;b=b|0;return fd(a,b)|0}function vc(a,b,c){a=a|0;b=b|0;c=c|0;return gd(a,b,c)|0}function wc(a,b){a=a|0;b=b|0;return hd(a,b)|0}function xc(e,f,g,h,j){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0;k=i;i=i+24|0;l=k|0;if((e|0)==0|(f|0)==0|(g|0)==0){m=0;i=k;return m|0}n=e|0;do{if((c[n>>2]|0)==0){yc(e);if((c[n>>2]|0)==0){m=0}else{break}i=k;return m|0}}while(0);p=g|0;if((Ad(p)|0)==0){m=0;i=k;return m|0}if((h|0)==0){q=0}else{r=(Ad(h)|0)==0;q=r?0:h}h=0;r=430329474;do{r=((d[f+h|0]|0)^r<<1)+(r>>>31)|0;h=h+1|0;}while(h>>>0<32>>>0);h=e+44|0;s=(((r>>>0)%((c[h>>2]|0)>>>0)|0|0)==0)+r|0;do{if((s|0)==(c[n>>2]|0)){if($d(f,e+4|0)|0){m=0}else{break}i=k;return m|0}}while(0);n=e+36|0;r=c[n>>2]&255;if((r&255)>>>0>8>>>0){t=r;u=0;v=0;while(1){w=v+1&255;x=t-8&255;y=d[f+(v&255)|0]|0|u<<8&65280;if((x&255)>>>0>8>>>0){t=x;u=y;v=w}else{break}}z=y;A=w&255;B=x}else{z=0;A=0;B=r}r=B&255;B=e+48|0;e=c[h>>2]|0;x=(c[B>>2]|0)+((((d[f+A|0]|0)>>>((8-r|0)>>>0)|z<<r)&65535)<<2)|0;r=(s>>>0)%(e>>>0)|0;z=0;A=e;while(1){if(z>>>0>=5>>>0){C=21;break}D=c[x>>2]|0;F=D+(r*552|0)|0;if((c[F>>2]|0)==(s|0)){if($d(D+(r*552|0)+88|0,f)|0){C=54;break}G=c[h>>2]|0}else{G=A}e=Xh((r>>>0)%(G>>>0)|0,0,101,0)|0;w=Zh(e,E,G,0)|0;e=w;if((e|0)==0){C=20;break}else{r=e;z=z+1|0;A=G}}if((C|0)==20){Ca(c[o>>2]|0,1624,(H=i,i=i+24|0,c[H>>2]=r,c[H+8>>2]=G,c[H+16>>2]=0,H)|0)|0;i=H;wa(1608,1304,234,1696);return 0}else if((C|0)==21){G=(q|0)!=0;z=l;x=c[n>>2]&255;if((x&255)>>>0>8>>>0){n=x;e=0;w=0;while(1){I=w+1&255;J=n-8&255;K=d[f+(w&255)|0]|0|e<<8&65280;if((J&255)>>>0>8>>>0){n=J;e=K;w=I}else{break}}L=K;M=I&255;N=J}else{L=0;M=0;N=x}x=N&255;N=((d[f+M|0]|0)>>>((8-x|0)>>>0)|L<<x)&65535;x=c[B>>2]|0;Jh(z|0,0,24)|0;z=x+(N<<2)|0;x=0;L=(s>>>0)%(A>>>0)|0;while(1){if(x>>>0>=5>>>0){C=33;break}A=c[z>>2]|0;if((c[A+(L*552|0)>>2]|0)==0){O=L;break}M=A+(L*552|0)+16|0;_d(c[M>>2]|0,c[M+4>>2]|0,122,0)|0;M=A+(L*552|0)+24|0;if((_d(c[M>>2]|0,c[M+4>>2]|0,1800,0)|0)==0){P=2}else{M=A+(L*552|0)+32|0;P=(_d(c[M>>2]|0,c[M+4>>2]|0,600,0)|0)==0|0}M=l+(P<<2)|0;if((c[M>>2]|0)==0){c[M>>2]=L+1}Q=c[h>>2]|0;M=Xh((L>>>0)%(Q>>>0)|0,0,101,0)|0;A=Zh(M,E,Q,0)|0;M=A;if((M|0)==0){C=32;break}else{x=x+1|0;L=M}}if((C|0)==32){Ca(c[o>>2]|0,1624,(H=i,i=i+24|0,c[H>>2]=L,c[H+8>>2]=Q,c[H+16>>2]=0,H)|0)|0;i=H;wa(1608,1304,234,1696);return 0}do{if((C|0)==33){if(j<<24>>24==0){R=G?2:1}else{R=3}H=0;while(1){if(H>>>0>=R>>>0){m=0;C=73;break}S=c[l+(H<<2)>>2]|0;if((S|0)==0){H=H+1|0}else{C=38;break}}if((C|0)==38){O=S-1|0;break}else if((C|0)==73){i=k;return m|0}}}while(0);S=c[(c[B>>2]|0)+(N<<2)>>2]|0;N=S+(O*552|0)|0;Jh(N|0,0,552)|0;if((N|0)==0){m=0;i=k;return m|0}B=g|0;l=a[B]|0;if((l<<24>>24|0)==2){T=S+(O*552|0)+120|0}else if((l<<24>>24|0)==10){T=S+(O*552|0)+336|0}else{m=0;i=k;return m|0}if((T|0)==0){m=0;i=k;return m|0}c[N>>2]=s;ae(S+(O*552|0)+88|0,f)|0;if(j<<24>>24!=0){f=Zd()|0;s=S+(O*552|0)+16|0;c[s>>2]=f;c[s+4>>2]=E}do{if(G){s=(Ad(q)|0)==0;f=s?0:q;if((f|0)==0){break}s=g+24|0;N=c[s+4>>2]|0;l=S+(O*552|0)+24|0;c[l>>2]=c[s>>2];c[l+4>>2]=N;b[S+(O*552|0)+40>>1]=d[B]|0;Kh(T|0,B|0,19)|0;N=c[s+4>>2]|0;l=T+24|0;c[l>>2]=c[s>>2];c[l+4>>2]=N;Kh(T+184|0,f|0,19)|0;f=Zd()|0;N=T+208|0;c[N>>2]=f;c[N+4>>2]=E;m=1;i=k;return m|0}}while(0);T=a[B]|0;if((T<<24>>24|0)==2){U=S+(O*552|0)+44|0}else if((T<<24>>24|0)==10){U=S+(O*552|0)+63|0}else{m=1;i=k;return m|0}if((U|0)==0){m=1;i=k;return m|0}T=g+24|0;G=c[T+4>>2]|0;N=S+(O*552|0)+32|0;c[N>>2]=c[T>>2];c[N+4>>2]=G;b[S+(O*552|0)+42>>1]=d[B]|0;Kh(U|0,B|0,19)|0;m=1;i=k;return m|0}else if((C|0)==54){if((F|0)==0){m=2;i=k;return m|0}F=g|0;C=a[F]|0;if((C<<24>>24|0)==2){V=D+(r*552|0)+120|0}else if((C<<24>>24|0)==10){V=D+(r*552|0)+336|0}else{m=2;i=k;return m|0}if((V|0)==0){m=2;i=k;return m|0}if(j<<24>>24!=0){j=Zd()|0;C=D+(r*552|0)+16|0;c[C>>2]=j;c[C+4>>2]=E}if((q|0)!=0){Kh(V|0,F|0,19)|0;C=g+24|0;j=c[C+4>>2]|0;B=V+24|0;c[B>>2]=c[C>>2];c[B+4>>2]=j;Kh(V+184|0,q|0,19)|0;q=Zd()|0;j=V+208|0;c[j>>2]=q;c[j+4>>2]=E;j=Zd()|0;q=D+(r*552|0)+24|0;c[q>>2]=j;c[q+4>>2]=E;b[D+(r*552|0)+40>>1]=d[F]|0;m=2;i=k;return m|0}if((Ad(p)|0)==0){m=2;i=k;return m|0}q=g|0;j=a[F]|0;if((j<<24>>24|0)==2){W=D+(r*552|0)+44|0}else if((j<<24>>24|0)==10){W=D+(r*552|0)+63|0}else{m=2;i=k;return m|0}if((wd(p,W)|0)!=0){m=2;i=k;return m|0}if((Ad(W)|0)==0){Kh(W|0,F|0,19)|0;p=g+24|0;j=c[p+4>>2]|0;V=D+(r*552|0)+32|0;c[V>>2]=c[p>>2];c[V+4>>2]=j;b[D+(r*552|0)+42>>1]=d[F]|0;m=2;i=k;return m|0}j=(Hc(q)|0)!=0;q=D+(r*552|0)+32|0;do{if(!(j|(Hc(W|0)|0)==0)){if((_d(c[q>>2]|0,c[q+4>>2]|0,600,0)|0)==0){m=2}else{break}i=k;return m|0}}while(0);Kh(W|0,F|0,19)|0;W=g+24|0;g=c[W+4>>2]|0;c[q>>2]=c[W>>2];c[q+4>>2]=g;b[D+(r*552|0)+42>>1]=d[F]|0;m=2;i=k;return m|0}return 0}function yc(a){a=a|0;var b=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;b=i;e=a|0;if((c[e>>2]|0)!=0){i=b;return}f=a+4|0;g=f|0;if((f|0)==0){i=b;return}else{h=0;j=0}do{h=d[a+4+j|0]|0|h;j=j+1|0;}while(j>>>0<32>>>0);if((h|0)==0){i=b;return}else{k=0;l=430329474}do{l=((d[a+4+k|0]|0)^l<<1)+(l>>>31)|0;k=k+1|0;}while(k>>>0<32>>>0);k=a+44|0;h=c[k>>2]|0;j=(((l>>>0)%(h>>>0)|0|0)==0)+l|0;c[e>>2]=j;l=c[a+36>>2]&255;if((l&255)>>>0>8>>>0){f=l;m=0;n=0;while(1){p=n+1&255;q=f-8&255;r=d[(n&255)+(a+4)|0]|0|m<<8&65280;if((q&255)>>>0>8>>>0){f=q;m=r;n=p}else{break}}s=r;t=p&255;u=q}else{s=0;t=0;u=l}l=u&255;u=(c[a+48>>2]|0)+((((d[a+4+t|0]|0)>>>((8-l|0)>>>0)|s<<l)&65535)<<2)|0;l=(j>>>0)%(h>>>0)|0;h=0;while(1){if(h>>>0>=5>>>0){v=16;break}j=c[u>>2]|0;s=j+(l*552|0)|0;do{if((c[s>>2]|0)==(c[e>>2]|0)){if(!($d(j+(l*552|0)+88|0,g)|0)){break}c[s>>2]=0}}while(0);w=c[k>>2]|0;s=Xh((l>>>0)%(w>>>0)|0,0,101,0)|0;j=Zh(s,E,w,0)|0;s=j;if((s|0)==0){v=15;break}else{l=s;h=h+1|0}}if((v|0)==15){Ca(c[o>>2]|0,1624,(h=i,i=i+24|0,c[h>>2]=l,c[h+8>>2]=w,c[h+16>>2]=0,h)|0)|0;i=h;wa(1608,1304,234,1696)}else if((v|0)==16){i=b;return}}function zc(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0;g=i;i=i+1024|0;h=g|0;if((f+4|0)>>>0>1023>>>0){j=-1;i=g;return j|0}k=h|0;a[k]=32;l=h+1|0;w=d;a[l]=w;w=w>>8;a[l+1|0]=w;w=w>>8;a[l+2|0]=w;w=w>>8;a[l+3|0]=w;Kh(h+5|0,e|0,f)|0;e=fg(b,c)|0;if((e|0)==-1){j=-1;i=g;return j|0}c=dg(b,e,k,f+5|0)|0;j=(c|0)<1?-1:c;i=g;return j|0}function Ac(a,b){a=a|0;b=b|0;c[a>>2]=b;return}function Bc(a){a=a|0;return c[a>>2]|0}function Cc(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;c[b+4>>2]=d;a[b+8|0]=1;c[b+12>>2]=e;c[b+16>>2]=f;return}function Dc(a,b,d){a=a|0;b=b|0;d=d|0;c[a+20>>2]=b;c[a+24>>2]=d;return}function Ec(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=0;while(1){if(c>>>0>=32>>>0){d=-1;e=5;break}f=a+28+(c<<5)|0;if($d(f,b)|0){break}else{c=c+1|0}}if((e|0)==5){return d|0}Jh(f|0,0,32)|0;d=0;return d|0}function Fc(a,b){a=a|0;b=b|0;kg(b,32,16,a);return}function Gc(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0;h=i;j=d;if((g-6|0)>>>0>1018>>>0){k=1;i=h;return k|0}l=f+1|0;if((a[d+8|0]|0)==0){k=1;i=h;return k|0}else{m=0}while(1){if(m>>>0>=32>>>0){break}if($d(j+28+(m<<5)|0,e)|0){k=1;n=11;break}else{m=m+1|0}}if((n|0)==11){i=h;return k|0}if((Mh(l|0,d|0,4)|0)!=0){k=1;i=h;return k|0}l=c[d+20>>2]|0;do{if((l|0)!=0){if((Kb[l&15](e,c[d+24>>2]|0)|0)==0){break}else{k=1}i=h;return k|0}}while(0);l=d+1052|0;n=b[l>>1]|0;if((n&65535)>>>0>31>>>0){b[l>>1]=0;o=0}else{o=n}ae(j+28+((o&65535)<<5)|0,e)|0;b[l>>1]=(b[l>>1]|0)+1;l=g-5|0;o=mb()|0;j=i;i=i+(g-4)|0;i=i+7&-8;Kh(j|0,f+5|0,l)|0;a[j+l|0]=0;Bb[c[d+4>>2]&15](c[d+12>>2]|0,e,j,l&65535,c[d+16>>2]|0);Ma(o|0);k=0;i=h;return k|0}function Hc(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;e=i;i=i+24|0;f=b;b=i;i=i+17|0;i=i+7&-8;c[b>>2]=c[f>>2];c[b+4>>2]=c[f+4>>2];c[b+8>>2]=c[f+8>>2];c[b+12>>2]=c[f+12>>2];a[b+16|0]=a[f+16|0]|0;f=e|0;g=b|0;h=a[g]|0;a:do{if((h<<24>>24|0)==2){j=a[g+2|0]|0;k=a[g+3|0]|0;switch(a[b+1|0]|0){case-84:{if((j-16&255)>>>0<16>>>0){l=0}else{break a}i=e;return l|0};case-64:{if(j<<24>>24==-88){l=0}else{break a}i=e;return l|0};case-87:{if(j<<24>>24!=-2){break a}if((k<<24>>24|0)==(-1|0)|(k<<24>>24|0)==0){break a}else{l=0}i=e;return l|0};case 100:{if((j&-64)<<24>>24==64){l=0}else{break a}i=e;return l|0};case 127:case 10:{l=0;i=e;return l|0};default:{break a}}}else if((h<<24>>24|0)==10){j=b+1|0;k=j;m=j;n=a[m]|0;do{if((n<<24>>24|0)==(-1|0)){if((d[k+1|0]|0)>>>0>=3>>>0){break}if((a[k+15|0]|0)==1){l=0;i=e;return l|0}else{if(n<<24>>24==-2){o=12;break}else{break}}}else if((n<<24>>24|0)==(-2|0)){o=12}}while(0);do{if((o|0)==12){if((a[k+1|0]&-64)<<24>>24==-128){l=0}else{break}i=e;return l|0}}while(0);k=j;if((c[k>>2]|0)!=0){break}if((c[k+4>>2]|0)!=0){break}do{if((a[b+9|0]|0)==0){if((a[m+9|0]|0)!=0){break}if((a[m+10|0]|0)!=-1){break}if((a[m+11|0]|0)!=-1){break}a[f|0]=2;k=j+12|0;n=f+1|0;w=d[k]|d[k+1|0]<<8|d[k+2|0]<<16|d[k+3|0]<<24|0;a[n]=w;w=w>>8;a[n+1|0]=w;w=w>>8;a[n+2|0]=w;w=w>>8;a[n+3|0]=w;l=Hc(f)|0;i=e;return l|0}}while(0);if((c[b+9>>2]|0)!=0){break}if((a[m+12|0]|0)!=0){break}if((a[m+13|0]|0)!=0){break}if((a[m+14|0]|0)!=0){break}if((a[m+15|0]|0)==1){l=0}else{break}i=e;return l|0}}while(0);l=-1;i=e;return l|0}function Ic(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;i=i+112|0;g=f|0;h=f+24|0;j=f+48|0;k=f+88|0;l=j|0;a[l]=33;ae(j+1|0,e+14900|0)|0;j=k+17|0;w=d;a[j]=w;w=w>>8;a[j+1|0]=w;j=e+4|0;e=k|0;do{if((b[(c[j>>2]|0)+2048>>1]|0)==10){d=h|0;xd(h);a[d]=10;m=h+1|0;n=m;a[m]=-1;a[n+1|0]=2;a[n+15|0]=1;Kh(k|0,d|0,17)|0;if((zd(e)|0)==0){o=-1;break}d=(ld(c[j>>2]|0,k,l,33)|0)>0;o=d?1:-1}else{o=-1}}while(0);h=b[(c[j>>2]|0)+2048>>1]|0;d=g|0;xd(g);if((h<<16>>16|0)==10){a[d]=10;n=g+1|0;m=n;p=n;w=0;a[p]=w;w=w>>8;a[p+1|0]=w;w=w>>8;a[p+2|0]=w;w=w>>8;a[p+3|0]=w;p=m+4|0;w=0;a[p]=w;w=w>>8;a[p+1|0]=w;w=w>>8;a[p+2|0]=w;w=w>>8;a[p+3|0]=w;p=g+9|0;w=va(65535)|0;a[p]=w;w=w>>8;a[p+1|0]=w;w=w>>8;a[p+2|0]=w;w=w>>8;a[p+3|0]=w;p=m+12|0;w=-1;a[p]=w;w=w>>8;a[p+1|0]=w;w=w>>8;a[p+2|0]=w;w=w>>8;a[p+3|0]=w}else if((h<<16>>16|0)==2){a[d]=2;h=g+1|0;w=-1;a[h]=w;w=w>>8;a[h+1|0]=w;w=w>>8;a[h+2|0]=w;w=w>>8;a[h+3|0]=w}Kh(k|0,d|0,17)|0;if((zd(e)|0)==0){i=f;return o|0}else{e=(ld(c[j>>2]|0,k,l,33)|0)==0;i=f;return(e?o:1)|0}return 0}function Jc(a){a=a|0;md(c[a+4>>2]|0,33,12,a);return}function Kc(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0;h=i;j=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[e+12>>2]=c[j+12>>2];b[e+16>>1]=b[j+16>>1]|0;a[e+18|0]=a[j+18|0]|0;if(!((Hc(e|0)|0)!=-1&(g|0)==33)){k=1;i=h;return k|0}te(d,e,f+1|0);k=0;i=h;return k|0}function Lc(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;e=b+2228|0;f=c[e>>2]|0;if((f|0)==0){g=-1;return g|0}h=b+2224|0;b=0;i=f;while(1){f=c[h>>2]|0;if((a[f+(b*14072|0)+52|0]|0)==0){j=i}else{if($d(d,f+(b*14072|0)|0)|0){g=b;k=7;break}j=c[e>>2]|0}f=b+1|0;if(f>>>0<j>>>0){b=f;i=j}else{g=-1;k=7;break}}if((k|0)==7){return g|0}return 0}function Mc(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;if((c[b+2228>>2]|0)>>>0<=d>>>0){f=-1;return f|0}g=c[b+2224>>2]|0;if((a[g+(d*14072|0)+52|0]|0)==0){f=-1;return f|0}Kh(e|0,g+(d*14072|0)|0,32)|0;f=0;return f|0}function Nc(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+8|0;g=f|0;ae(e,(c[d+4>>2]|0)+12|0)|0;h=e+32|0;w=Bc(d+24|0)|0;a[h]=w;w=w>>8;a[h+1|0]=w;w=w>>8;a[h+2|0]=w;w=w>>8;a[h+3|0]=w;h=g;b[g>>1]=0;d=0;do{j=h+(d&1)|0;a[j]=a[j]^a[e+d|0];d=d+1|0;}while(d>>>0<36>>>0);d=e+36|0;w=b[g>>1]|0;a[d]=w;w=w>>8;a[d+1|0]=w;i=f;return}function Oc(e,f,g,h){e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,x=0,y=0,z=0,A=0,B=0,C=0;j=i;i=i+40|0;k=j|0;l=h&65535;if((h&65535)>>>0>983>>>0){m=-1;i=j;return m|0}n=j+8|0;ae(n,f)|0;o=k;b[k>>1]=0;p=0;do{q=o+(p&1)|0;a[q]=a[q]^a[f+p|0];p=p+1|0;}while(p>>>0<36>>>0);p=f+36|0;if((d[p]|d[p+1|0]<<8)<<16>>16<<16>>16!=(b[k>>1]|0)){m=-6;i=j;return m|0}if(h<<16>>16==0){m=-2;i=j;return m|0}if($d(n,(c[e+4>>2]|0)+12|0)|0){m=-3;i=j;return m|0}k=e+2228|0;p=c[k>>2]|0;o=e+2224|0;do{if((p|0)==0){r=1;s=c[o>>2]|0;t=20}else{q=0;u=p;while(1){v=c[o>>2]|0;if((a[v+(q*14072|0)+52|0]|0)==0){x=u}else{if($d(n,v+(q*14072|0)|0)|0){t=13;break}x=c[k>>2]|0}v=q+1|0;if(v>>>0<x>>>0){q=v;u=x}else{y=x;break}}do{if((t|0)==13){if((q|0)==-1){y=c[k>>2]|0;break}u=c[o>>2]|0;if((d[u+(q*14072|0)+52|0]|0)>>>0>2>>>0){m=-4;i=j;return m|0}v=f+32|0;z=d[v]|d[v+1|0]<<8|d[v+2|0]<<16|d[v+3|0]<<24|0;v=u+(q*14072|0)+1240|0;if((c[v>>2]|0)==(z|0)){m=-4;i=j;return m|0}c[v>>2]=z;m=-7;i=j;return m|0}}while(0);q=y+1|0;z=c[o>>2]|0;if((q|0)!=0){r=q;s=z;t=20;break}Eh(z);A=0}}while(0);do{if((t|0)==20){y=Gh(s,r*14072|0)|0;if((y|0)==0){m=-8;i=j;return m|0}else{A=y;break}}}while(0);c[o>>2]=A;Jh(A+((c[k>>2]|0)*14072|0)|0,0,14072)|0;A=gg(c[e+20>>2]|0,n)|0;if((A|0)==-1){m=-5;i=j;return m|0}e=c[k>>2]|0;r=0;while(1){if(r>>>0>e>>>0){m=-5;t=28;break}B=c[o>>2]|0;C=r+1|0;if((a[B+(r*14072|0)+52|0]|0)==0){break}else{r=C}}if((t|0)==28){i=j;return m|0}c[B+(r*14072|0)+32>>2]=A;a[(c[o>>2]|0)+(r*14072|0)+52|0]=1;c[(c[o>>2]|0)+(r*14072|0)+36>>2]=-1;A=(c[o>>2]|0)+(r*14072|0)+40|0;c[A>>2]=0;c[A+4>>2]=0;c[(c[o>>2]|0)+(r*14072|0)+48>>2]=5;ae((c[o>>2]|0)+(r*14072|0)|0,n)|0;n=Fh(1,1)|0;c[(c[o>>2]|0)+(r*14072|0)+1212>>2]=n;b[(c[o>>2]|0)+(r*14072|0)+1216>>1]=1;c[(c[o>>2]|0)+(r*14072|0)+1220>>2]=0;a[(c[o>>2]|0)+(r*14072|0)+1227|0]=0;Kh((c[o>>2]|0)+(r*14072|0)+53|0,g|0,l)|0;b[(c[o>>2]|0)+(r*14072|0)+1228>>1]=h;c[(c[o>>2]|0)+(r*14072|0)+1232>>2]=0;a[(c[o>>2]|0)+(r*14072|0)+1236|0]=1;h=(c[o>>2]|0)+(r*14072|0)+1240|0;o=f+32|0;w=d[o]|d[o+1|0]<<8|d[o+2|0]<<16|d[o+3|0]<<24|0;a[h]=w;w=w>>8;a[h+1|0]=w;w=w>>8;a[h+2|0]=w;w=w>>8;a[h+3|0]=w;if((c[k>>2]|0)!=(r|0)){m=r;i=j;return m|0}c[k>>2]=C;m=r;i=j;return m|0}function Pc(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;e=b+2228|0;if((c[e>>2]|0)>>>0<=d>>>0){f=-1;return f|0}g=b+2224|0;a:do{if((a[(c[g>>2]|0)+(d*14072|0)+52|0]|0)==4){h=b+2236|0;i=c[h>>2]|0;j=b+2232|0;k=0;while(1){if(k>>>0>=i>>>0){break a}l=c[j>>2]|0;if((c[l+(k*24|0)>>2]|0)==(d|0)){break}else{k=k+1|0}}m=i-1|0;c[h>>2]=m;if((m|0)==(k|0)){n=k;o=l}else{p=l+(k*24|0)|0;q=l+(m*24|0)|0;c[p>>2]=c[q>>2];c[p+4>>2]=c[q+4>>2];c[p+8>>2]=c[q+8>>2];c[p+12>>2]=c[q+12>>2];c[p+16>>2]=c[q+16>>2];c[p+20>>2]=c[q+20>>2];n=c[h>>2]|0;o=c[j>>2]|0}q=o;if((n|0)==0){Eh(q);c[j>>2]=0;break}p=Gh(q,n*24|0)|0;if((p|0)==0){break}c[j>>2]=p}}while(0);hg(c[b+20>>2]|0,c[(c[g>>2]|0)+(d*14072|0)+32>>2]|0)|0;Qf(c[b+4>>2]|0,c[(c[g>>2]|0)+(d*14072|0)+36>>2]|0)|0;Eh(c[(c[g>>2]|0)+(d*14072|0)+1212>>2]|0);Ec(b+24|0,(c[g>>2]|0)+(d*14072|0)|0)|0;Jh((c[g>>2]|0)+(d*14072|0)|0,0,14072)|0;d=c[e>>2]|0;while(1){if((d|0)==0){r=15;break}b=d-1|0;s=c[g>>2]|0;if((a[s+(b*14072|0)+52|0]|0)==0){d=b}else{break}}if((r|0)==15){c[e>>2]=0;Eh(c[g>>2]|0);c[g>>2]=0;f=0;return f|0}c[e>>2]=d;e=Gh(s|0,d*14072|0)|0;if((e|0)==0){f=-8;return f|0}c[g>>2]=e;f=0;return f|0}function Qc(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;i=i+1024|0;g=f|0;if((c[a+2228>>2]|0)>>>0<=b>>>0){i=f;return 0}h=(c[a+2224>>2]|0)+(b*14072|0)+1232|0;j=(c[h>>2]|0)+1|0;c[h>>2]=j;h=(j|0)==0?1:j;if(e>>>0>1019>>>0){k=0;i=f;return k|0}c[g>>2]=va(h|0)|0;Kh(g+4|0,d|0,e)|0;d=(Rc(a,b,64,g,e+4|0)|0)==0;k=d?0:h;i=f;return k|0}function Rc(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0;h=i;if((c[b+2228>>2]|0)>>>0<=d>>>0|g>>>0>1023>>>0){j=0;i=h;return j|0}k=b+2224|0;if((a[(c[k>>2]|0)+(d*14072|0)+52|0]|0)!=4){j=0;i=h;return j|0}l=g+1|0;m=mb()|0;n=i;i=i+l|0;i=i+7&-8;a[n]=e;if((g|0)!=0){Kh(n+1|0,f|0,g)|0}g=Kf(c[b+4>>2]|0,c[(c[k>>2]|0)+(d*14072|0)+36>>2]|0,n,l)|0;Ma(m|0);j=g;i=h;return j|0}function Sc(d,e,f){d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;if((f&65535)>>>0>128>>>0|f<<16>>16==0){g=-1;return g|0}Kh(d+1080|0,e|0,f&65535)|0;b[d+1208>>1]=f;h=d+2228|0;if((c[h>>2]|0)!=0){i=d+2224|0;j=0;do{a[(c[i>>2]|0)+(j*14072|0)+1208|0]=0;j=j+1|0;}while(j>>>0<(c[h>>2]|0)>>>0)}h=d+2244|0;j=c[h>>2]|0;if((j|0)==0){g=0;return g|0}i=d+2240|0;d=0;k=j;while(1){j=c[(c[i>>2]|0)+(d<<2)>>2]|0;if((j|0)==0){l=k}else{Te(j,e,f)|0;l=c[h>>2]|0}j=d+1|0;if(j>>>0<l>>>0){d=j;k=l}else{g=0;break}}return g|0}function Tc(a,c){a=a|0;c=c|0;var d=0,f=0;if((c|0)==0){d=0;return d|0}f=a+1208|0;Kh(c|0,a+1080|0,e[f>>1]|0)|0;d=b[f>>1]|0;return d|0}function Uc(a,b,c){a=a|0;b=b|0;c=c|0;Cc(a+24|0,b,a,c);return}function Vc(a,b,d){a=a|0;b=b|0;d=d|0;c[a+2256>>2]=b;c[a+2260>>2]=d;return}function Wc(a,b,d){a=a|0;b=b|0;d=d|0;c[a+2272>>2]=b;c[a+2276>>2]=d;return}function Xc(a,b,d){a=a|0;b=b|0;d=d|0;c[a+2280>>2]=b;c[a+2316>>2]=d;return}function Yc(d){d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;e=i;i=i+24|0;f=e|0;g=Fh(1,2400)|0;h=g;if((g|0)==0){j=0;i=e;return j|0}yd(f,d);d=sd(f,-32091)|0;f=g;c[f>>2]=d;if((d|0)==0){Eh(g);j=0;i=e;return j|0}k=Tf(d)|0;d=g+4|0;c[d>>2]=k;if((k|0)==0){td(c[f>>2]|0);Eh(g);j=0;i=e;return j|0}l=Ce(k)|0;k=g+8|0;c[k>>2]=l;if((l|0)==0){Xf(c[d>>2]|0);td(c[f>>2]|0);Eh(g);j=0;i=e;return j|0}m=g+12|0;c[m>>2]=Id(l)|0;l=g+16|0;c[l>>2]=_f(c[k>>2]|0)|0;n=mg(c[k>>2]|0)|0;o=g+20|0;c[o>>2]=n;p=c[m>>2]|0;do{if((p|0)!=0){if((c[l>>2]|0)==0|(n|0)==0){break}m=g+1210|0;a[m]=a[784]|0;a[m+1|0]=a[785]|0;a[m+2|0]=a[786]|0;a[m+3|0]=a[787]|0;a[m+4|0]=a[788]|0;a[m+5|0]=a[789]|0;a[m+6|0]=a[790]|0;b[g+2218>>1]=7;m=g+2228|0;if((c[m>>2]|0)==0){q=n}else{r=g+2224|0;s=0;do{a[(c[r>>2]|0)+(s*14072|0)+1218|0]=0;s=s+1|0;}while(s>>>0<(c[m>>2]|0)>>>0);q=c[o>>2]|0}m=g+24|0;Fc(m,q);Jc(c[k>>2]|0);Ac(m,jd()|0);Dc(m,6,g);md(c[f>>2]|0,48,38,g);j=h;i=e;return j|0}}while(0);Pd(p);bg(c[l>>2]|0);rg(c[o>>2]|0);De(c[k>>2]|0);Xf(c[d>>2]|0);td(c[f>>2]|0);Eh(g);j=0;i=e;return j|0}function Zc(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=d+2228|0;f=c[e>>2]|0;a:do{if((f|0)==0){g=-1}else{h=d+2224|0;i=0;j=f;while(1){k=c[h>>2]|0;if((a[k+(i*14072|0)+52|0]|0)==0){l=j}else{if($d(b,k+(i*14072|0)|0)|0){g=i;break a}l=c[e>>2]|0}k=i+1|0;if(k>>>0<l>>>0){i=k;j=l}else{g=-1;break}}}}while(0);return((g|0)!=-1)<<31>>31|0}function _c(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;h=i;j=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[e+12>>2]=c[j+12>>2];b[e+16>>1]=b[j+16>>1]|0;a[e+18|0]=a[j+18|0]|0;if(g>>>0<33>>>0){k=1;i=h;return k|0}j=d+2244|0;l=c[j>>2]|0;if((l|0)==0){k=1;i=h;return k|0}m=d+2240|0;d=f+1|0;n=0;o=l;while(1){l=c[(c[m>>2]|0)+(n<<2)>>2]|0;if((l|0)==0){p=o}else{if($d(d,l+4|0)|0){break}p=c[j>>2]|0}l=n+1|0;if(l>>>0<p>>>0){n=l;o=p}else{k=1;q=9;break}}if((q|0)==9){i=h;return k|0}k=Se(c[(c[m>>2]|0)+(n<<2)>>2]|0,e,f,g)|0;i=h;return k|0}function $c(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;b=a+2244|0;d=c[b>>2]|0;a:do{if((d|0)!=0){e=a+2240|0;f=0;g=d;while(1){do{if(g>>>0>f>>>0){h=c[e>>2]|0;if((h|0)==0){break}i=c[h+(f<<2)>>2]|0;if((i|0)==0){break}Xe(i);c[(c[e>>2]|0)+(f<<2)>>2]=0;i=c[b>>2]|0;while(1){if((i|0)==0){j=9;break}h=i-1|0;k=c[e>>2]|0;if((c[k+(h<<2)>>2]|0)==0){i=h}else{break}}if((j|0)==9){j=0;c[b>>2]=0;Eh(c[e>>2]|0);c[e>>2]=0;break}c[b>>2]=i;h=Gh(k,i<<2)|0;if((h|0)==0){break}c[e>>2]=h}}while(0);h=f+1|0;if(h>>>0>=d>>>0){break a}f=h;g=c[b>>2]|0}}}while(0);Pd(c[a+12>>2]|0);bg(c[a+16>>2]|0);rg(c[a+20>>2]|0);De(c[a+8>>2]|0);Xf(c[a+4>>2]|0);td(c[a>>2]|0);Eh(c[a+2224>>2]|0);Eh(a);return}function ad(f){f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0;g=i;i=i+3160|0;h=g|0;j=g+1024|0;k=g+2072|0;l=g+2080|0;m=g+2088|0;n=g+3112|0;o=g+3136|0;p=Zd()|0;q=E;r=f+2228|0;if((c[r>>2]|0)==0){i=g;return}s=f+2224|0;t=f+20|0;u=f+4|0;v=f+1208|0;w=f+1080|0;x=f+1210|0;y=f+2218|0;z=f+2220|0;A=m|0;B=m+1|0;C=f+2272|0;D=f+2276|0;F=f+2280|0;G=f+2316|0;H=f+2288|0;I=f+2292|0;J=f+2296|0;K=f+2300|0;L=m+5|0;M=f+2256|0;N=f+2260|0;O=f+2264|0;P=f+2268|0;Q=f+2304|0;R=B;S=f+2308|0;T=f+2336|0;U=f+2340|0;V=f+2244|0;W=f+2240|0;X=m+33|0;Y=g+2048|0;Z=o|0;_=m+2|0;$=_;aa=m+10|0;ba=f+2368|0;ca=f+2372|0;da=m+3|0;ea=m+4|0;m=j|0;fa=j+1|0;ga=j+2|0;j=f+2376|0;ha=f+2380|0;ia=h|0;ja=h+1|0;ka=h+2|0;h=f+2384|0;la=f+2388|0;ma=f+2392|0;na=f+2396|0;oa=0;do{pa=c[s>>2]|0;do{if((a[pa+(oa*14072|0)+52|0]|0)==1){if((zc(c[t>>2]|0,pa+(oa*14072|0)|0,c[pa+(oa*14072|0)+1240>>2]|0,pa+(oa*14072|0)+53|0,e[pa+(oa*14072|0)+1228>>1]|0)|0)<=-1){break}bd(f,oa,2);qa=(c[s>>2]|0)+(oa*14072|0)+40|0;c[qa>>2]=p;c[qa+4>>2]=q}}while(0);pa=c[s>>2]|0;qa=a[pa+(oa*14072|0)+52|0]|0;do{if((qa-2&255)>>>0<2>>>0){do{if(qa<<24>>24==2){ra=pa+(oa*14072|0)+40|0;sa=pa+(oa*14072|0)+48|0;ta=Nh(c[sa>>2]|0,0,c[ra>>2]|0,c[ra+4>>2]|0)|0;ra=E;if(!(ra>>>0<q>>>0|ra>>>0==q>>>0&ta>>>0<p>>>0)){ua=pa;break}bd(f,oa,1);c[sa>>2]=c[sa>>2]<<1;ua=c[s>>2]|0}else{ua=pa}}while(0);sa=ig(c[t>>2]|0,c[ua+(oa*14072|0)+32>>2]|0,n)|0;ta=Sf(c[u>>2]|0,c[(c[s>>2]|0)+(oa*14072|0)+36>>2]|0)|0;if((ta|0)==0){if((sa|0)!=1){break}sa=Of(c[u>>2]|0,(c[s>>2]|0)+(oa*14072|0)|0,n)|0;c[(c[s>>2]|0)+(oa*14072|0)+36>>2]=sa;break}else if((ta|0)==4){Qf(c[u>>2]|0,c[(c[s>>2]|0)+(oa*14072|0)+36>>2]|0)|0;c[(c[s>>2]|0)+(oa*14072|0)+36>>2]=-1;break}else if((ta|0)==3){bd(f,oa,4);a[(c[s>>2]|0)+(oa*14072|0)+1208|0]=0;a[(c[s>>2]|0)+(oa*14072|0)+1224|0]=0;a[(c[s>>2]|0)+(oa*14072|0)+1218|0]=0;ta=(c[s>>2]|0)+(oa*14072|0)+1248|0;c[ta>>2]=p;c[ta+4>>2]=q;break}else{break}}}while(0);pa=c[s>>2]|0;a:do{if((a[pa+(oa*14072|0)+52|0]|0)==4){qa=pa;while(1){do{if((a[qa+(oa*14072|0)+1208|0]|0)==0){ta=b[v>>1]|0;if((ta&65535)>>>0>128>>>0|ta<<16>>16==0){break}if((Rc(f,oa,48,w,ta&65535)|0)==0){break}a[(c[s>>2]|0)+(oa*14072|0)+1208|0]=1}}while(0);do{if((a[(c[s>>2]|0)+(oa*14072|0)+1218|0]|0)==0){if((Rc(f,oa,49,x,e[y>>1]|0)|0)==0){break}a[(c[s>>2]|0)+(oa*14072|0)+1218|0]=1}}while(0);do{if((a[(c[s>>2]|0)+(oa*14072|0)+1224|0]|0)==0){a[l]=c[z>>2];if((Rc(f,oa,50,l,1)|0)==0){break}a[(c[s>>2]|0)+(oa*14072|0)+1224|0]=1}}while(0);ta=c[s>>2]|0;do{if((a[ta+(oa*14072|0)+1226|0]|0)==0){a[k]=a[ta+(oa*14072|0)+1225|0]|0;if((Rc(f,oa,51,k,1)|0)==0){break}a[(c[s>>2]|0)+(oa*14072|0)+1226|0]=1}}while(0);ta=(c[s>>2]|0)+(oa*14072|0)+1256|0;sa=Nh(c[ta>>2]|0,c[ta+4>>2]|0,5,0)|0;ta=E;do{if(ta>>>0<q>>>0|ta>>>0==q>>>0&sa>>>0<p>>>0){if((Rc(f,oa,0,0,0)|0)!=1){break}ra=Zd()|0;wa=(c[s>>2]|0)+(oa*14072|0)+1256|0;c[wa>>2]=ra;c[wa+4>>2]=E}}while(0);sa=Jf(c[u>>2]|0,c[(c[s>>2]|0)+(oa*14072|0)+36>>2]|0,A)|0;if((sa|0)<=0){break}ta=sa-1|0;b:do{switch(d[A]|0){case 80:{if(ta>>>0<10>>>0){break b}wa=a[B]|0;be(_,8);ra=$|0;xa=d[ra]|d[ra+1|0]<<8|d[ra+2|0]<<16|d[ra+3|0]<<24|0;ra=$+4|0;ya=d[ra]|d[ra+1|0]<<8|d[ra+2|0]<<16|d[ra+3|0]<<24|0;ra=wa&255;a[(c[s>>2]|0)+(oa*14072|0)+7408+(ra*24|0)+16|0]=1;za=(c[s>>2]|0)+(oa*14072|0)+7408+(ra*24|0)|0;c[za>>2]=xa;c[za+4>>2]=ya;za=(c[s>>2]|0)+(oa*14072|0)+7408+(ra*24|0)+8|0;c[za>>2]=0;c[za+4>>2]=0;za=sa-10|0;ra=mb()|0;Aa=i;i=i+(sa-9)|0;i=i+7&-8;Kh(Aa|0,aa|0,za)|0;a[Aa+za|0]=0;Ba=c[ba>>2]|0;if((Ba|0)!=0){Hb[Ba&1](f,oa,wa,xa,ya,Aa,za&65535,c[ca>>2]|0)}Ma(ra|0);break};case 50:{if((ta|0)!=1){break b}ra=a[B]|0;if((ra&255)>>>0>2>>>0){break b}za=c[H>>2]|0;if((za|0)!=0){Mb[za&1](f,oa,ra,c[I>>2]|0)}c[(c[s>>2]|0)+(oa*14072|0)+1220>>2]=ra&255;break};case 49:{if((ta|0)==0|ta>>>0>1007>>>0){break b}ra=mb()|0;za=i;i=i+sa|0;i=i+7&-8;Kh(za|0,B|0,ta)|0;a[za+ta|0]=0;Aa=c[F>>2]|0;if((Aa|0)!=0){Bb[Aa&15](f,oa,za,ta&65535,c[G>>2]|0)}if((c[r>>2]|0)>>>0>oa>>>0){Aa=ta&65535;ya=Fh(Aa+1|0,1)|0;Kh(ya|0,za|0,Aa)|0;Eh(c[(c[s>>2]|0)+(oa*14072|0)+1212>>2]|0);c[(c[s>>2]|0)+(oa*14072|0)+1212>>2]=ya;b[(c[s>>2]|0)+(oa*14072|0)+1216>>1]=ta}Ma(ra|0);break};case 65:{if(ta>>>0<4>>>0){break b}ra=c[Q>>2]|0;if((ra|0)==0){break b}ya=va(d[R]|d[R+1|0]<<8|d[R+2|0]<<16|d[R+3|0]<<24|0)|0;Mb[ra&1](f,oa,ya,c[S>>2]|0);break};case 144:{if((ta|0)!=32){break b}ya=c[T>>2]|0;if((ya|0)==0){break b}Mb[ya&1](f,oa,B,c[U>>2]|0);break};case 145:{if((ta|0)!=64){break b}ya=c[V>>2]|0;if((ya|0)==0){break b}else{Ca=0;Da=ya}while(1){ya=c[(c[W>>2]|0)+(Ca<<2)>>2]|0;if((ya|0)==0){Ea=Da}else{if($d(ya+4|0,B)|0){break}Ea=c[V>>2]|0}ya=Ca+1|0;if(ya>>>0<Ea>>>0){Ca=ya;Da=Ea}else{break b}}if((Ca|0)==-1){break b}ya=c[s>>2]|0;ra=b[ya+(oa*14072|0)+13808>>1]|0;Aa=(ra&65535)>>>0<64>>>0?ra&65535:64;ra=Ca+1|0;za=0;while(1){if(za>>>0>=Aa>>>0){break b}if((c[ya+(oa*14072|0)+13552+(za<<2)>>2]|0)==(ra|0)){break}else{za=za+1|0}}Ue(c[(c[W>>2]|0)+(Ca<<2)>>2]|0,X)|0;za=c[(c[W>>2]|0)+(Ca<<2)>>2]|0;Jh(Y|0,0,19)|0;do{if((c[r>>2]|0)>>>0>oa>>>0){ra=c[(c[s>>2]|0)+(oa*14072|0)+36>>2]|0;if((Sf(c[u>>2]|0,ra)|0)==3){ya=c[u>>2]|0;kf(o,c[ya>>2]|0,e[(c[ya+4>>2]|0)+(ra*224|0)+210>>1]|0);break}else{Kh(Z|0,Y|0,19)|0;break}}else{Kh(Z|0,Y|0,19)|0}}while(0);Ye(za,o,X);break};case 0:{ra=(c[s>>2]|0)+(oa*14072|0)+1248|0;c[ra>>2]=p;c[ra+4>>2]=q;break};case 48:{if(ta>>>0>128>>>0|(ta|0)==0){break b}ra=mb()|0;ya=i;i=i+sa|0;i=i+7&-8;Kh(ya|0,B|0,ta)|0;a[ya+ta|0]=0;Aa=c[C>>2]|0;xa=ta&65535;if((Aa|0)!=0){Bb[Aa&15](f,oa,ya,xa,c[D>>2]|0)}Kh((c[s>>2]|0)+(oa*14072|0)+1077|0,ya|0,ta)|0;b[(c[s>>2]|0)+(oa*14072|0)+1206>>1]=xa;Ma(ra|0);break};case 51:{if((ta|0)!=1){break b}ra=a[B]|0;a[(c[s>>2]|0)+(oa*14072|0)+1227|0]=ra;xa=c[J>>2]|0;if((xa|0)==0){break b}Mb[xa&1](f,oa,ra,c[K>>2]|0);break};case 64:{if(ta>>>0<5>>>0){break b}ra=sa+65531|0;xa=ra&65535;ya=mb()|0;Aa=i;i=i+(xa+1)|0;i=i+7&-8;Kh(Aa|0,L|0,xa)|0;a[Aa+xa|0]=0;if((a[(c[s>>2]|0)+(oa*14072|0)+1236|0]|0)!=0){Rc(f,oa,65,B,4)|0}xa=c[M>>2]|0;if((xa|0)!=0){Bb[xa&15](f,oa,Aa,ra&65535,c[N>>2]|0)}Ma(ya|0);break};case 63:{if(ta>>>0<5>>>0){break b}ya=sa+65531|0;ra=ya&65535;Aa=mb()|0;xa=i;i=i+(ra+1)|0;i=i+7&-8;Kh(xa|0,L|0,ra)|0;a[xa+ra|0]=0;if((a[(c[s>>2]|0)+(oa*14072|0)+1236|0]|0)!=0){Rc(f,oa,65,B,4)|0}ra=c[O>>2]|0;if((ra|0)!=0){Bb[ra&15](f,oa,xa,ya&65535,c[P>>2]|0)}Ma(Aa|0);break};case 81:{if(ta>>>0<3>>>0){break b}Aa=a[B]|0;ya=a[_]|0;xa=a[da]|0;ra=sa+65532&65535;if((Aa&255)>>>0>1>>>0){break b}wa=ya&255;Ba=c[s>>2]|0;c:do{if(Aa<<24>>24==0){Fa=Ba+(oa*14072|0)+7408+(wa*24|0)+16|0;Ga=a[Fa]|0;if(Ga<<24>>24==0){a[Fa]=6;do{if((c[r>>2]|0)>>>0>oa>>>0){if((a[(c[s>>2]|0)+(oa*14072|0)+7408+(wa*24|0)+16|0]|0)==0){break}a[m]=1;a[fa]=ya;a[ga]=2;if((Rc(f,oa,81,m,3)|0)==0){break}a[(c[s>>2]|0)+(oa*14072|0)+7408+(wa*24|0)+16|0]=0}}while(0);a[(c[s>>2]|0)+(oa*14072|0)+7408+(wa*24|0)+16|0]=0;break b}Ha=xa&255;if((Ha|0)==0){if(Ga<<24>>24==5){break b}a[Fa]=3;break}else if((Ha|0)==1){if(Ga<<24>>24==5){break b}a[Fa]=2;break}else if((Ha|0)==2|(Ha|0)==3){a[Fa]=0;break}else{break b}}else{Ha=Ba+(oa*14072|0)+1264+(wa*24|0)+16|0;Ia=a[Ha]|0;if(Ia<<24>>24==0){a[Ha]=6;do{if((c[r>>2]|0)>>>0>oa>>>0){if((a[(c[s>>2]|0)+(oa*14072|0)+1264+(wa*24|0)+16|0]|0)==0){break}a[ia]=0;a[ja]=ya;a[ka]=2;if((Rc(f,oa,81,ia,3)|0)==0){break}a[(c[s>>2]|0)+(oa*14072|0)+1264+(wa*24|0)+16|0]=0}}while(0);a[(c[s>>2]|0)+(oa*14072|0)+1264+(wa*24|0)+16|0]=0;break b}switch(xa&255|0){case 0:{if(Ia<<24>>24==5){break b}a[Ha]=3;break c;break};case 1:{if(Ia<<24>>24==5){break c}a[Ha]=2;break c;break};case 2:case 3:{a[Ha]=0;break c;break};case 4:{if(!(Ia<<24>>24==4&ra<<16>>16==8)){break b}a[Ha]=5;be(ea,8);break c;break};default:{break b}}}}while(0);wa=c[j>>2]|0;if((wa|0)==0){break b}Hb[wa&1](f,oa,Aa,ya,xa,ea,ra,c[ha>>2]|0);break};case 82:{if(ta>>>0<2>>>0){break b}wa=a[B]|0;Ba=wa&255;za=c[s>>2]|0;if((a[za+(oa*14072|0)+7408+(Ba*24|0)+16|0]|0)==0){break b}Fa=sa-2|0;Ga=za+(oa*14072|0)+7408+(Ba*24|0)+8|0;Ba=Nh(c[Ga>>2]|0,c[Ga+4>>2]|0,Fa,0)|0;c[Ga>>2]=Ba;c[Ga+4>>2]=E;Ga=c[h>>2]|0;if((Ga|0)==0){break b}Jb[Ga&1](f,oa,wa,_,Fa&65535,c[la>>2]|0);break};case 69:{if((ta|0)==0){break b}Fa=c[ma>>2]|0;if((Fa|0)==0){break b}Bb[Fa&15](f,oa,B,ta&65535,c[na>>2]|0);break};default:{}}}while(0);qa=c[s>>2]|0;if((a[qa+(oa*14072|0)+52|0]|0)!=4){break a}}if((Sf(c[u>>2]|0,c[(c[s>>2]|0)+(oa*14072|0)+36>>2]|0)|0)==4){Qf(c[u>>2]|0,c[(c[s>>2]|0)+(oa*14072|0)+36>>2]|0)|0;c[(c[s>>2]|0)+(oa*14072|0)+36>>2]=-1;bd(f,oa,3)}qa=c[s>>2]|0;ta=qa+(oa*14072|0)+1248|0;sa=Nh(c[ta>>2]|0,c[ta+4>>2]|0,10,0)|0;ta=E;if(!(ta>>>0<q>>>0|ta>>>0==q>>>0&sa>>>0<p>>>0)){break}Qf(c[u>>2]|0,c[qa+(oa*14072|0)+36>>2]|0)|0;c[(c[s>>2]|0)+(oa*14072|0)+36>>2]=-1;bd(f,oa,3)}}while(0);oa=oa+1|0;}while(oa>>>0<(c[r>>2]|0)>>>0);i=g;return}function bd(b,f,g){b=b|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;h=i;i=i+48|0;j=h|0;k=h+24|0;l=b+2224|0;if(g<<24>>24==0){m=c[l>>2]|0;n=m+(f*14072|0)+52|0;a[n]=g;i=h;return}o=c[l>>2]|0;p=(a[o+(f*14072|0)+52|0]|0)==4;q=g<<24>>24==4;r=q&1;jg(c[b+20>>2]|0,c[o+(f*14072|0)+32>>2]|0,r)|0;if(!(q^p)){m=c[l>>2]|0;n=m+(f*14072|0)+52|0;a[n]=g;i=h;return}a:do{if(p){q=0;do{o=c[l>>2]|0;s=o+(f*14072|0)+1264+(q*24|0)+16|0;if((a[s]|0)==0){t=o}else{a[s]=4;t=c[l>>2]|0}s=t+(f*14072|0)+7408+(q*24|0)+16|0;if((a[s]|0)!=0){a[s]=4}q=q+1|0;}while(q>>>0<256>>>0);q=b+2236|0;s=c[q>>2]|0;o=b+2232|0;u=0;while(1){if(u>>>0>=s>>>0){break a}v=c[o>>2]|0;if((c[v+(u*24|0)>>2]|0)==(f|0)){break}else{u=u+1|0}}w=s-1|0;c[q>>2]=w;if((w|0)==(u|0)){x=u;y=v}else{z=v+(u*24|0)|0;A=v+(w*24|0)|0;c[z>>2]=c[A>>2];c[z+4>>2]=c[A+4>>2];c[z+8>>2]=c[A+8>>2];c[z+12>>2]=c[A+12>>2];c[z+16>>2]=c[A+16>>2];c[z+20>>2]=c[A+20>>2];x=c[q>>2]|0;y=c[o>>2]|0}A=y;if((x|0)==0){Eh(A);c[o>>2]=0;break}z=Gh(A,x*24|0)|0;if((z|0)==0){break}c[o>>2]=z}else{z=k|0;if((c[b+2228>>2]|0)>>>0<=f>>>0){break}A=j|0;Jh(A|0,0,19)|0;w=c[(c[l>>2]|0)+(f*14072|0)+36>>2]|0;B=b+4|0;if((Sf(c[B>>2]|0,w)|0)==3){C=c[B>>2]|0;kf(k,c[C>>2]|0,e[(c[C+4>>2]|0)+(w*224|0)+210>>1]|0)}else{Kh(z|0,A|0,19)|0}A=k+17|0;if((d[A]|d[A+1|0]<<8)<<16>>16<<16>>16==0){break}A=b+2236|0;w=c[A>>2]|0;C=b+2232|0;B=c[C>>2]|0;D=0;while(1){if(D>>>0>=w>>>0){break}if((c[B+(D*24|0)>>2]|0)==(f|0)){break a}else{D=D+1|0}}D=Gh(B,(w*24|0)+24|0)|0;o=D;if((D|0)==0){break}c[C>>2]=o;D=c[A>>2]|0;c[o+(D*24|0)>>2]=f;Kh(o+(D*24|0)+4|0,z|0,19)|0;c[A>>2]=D+1}}while(0);k=c[b+2320>>2]|0;if((k|0)!=0){Mb[k&1](b,f,r,c[b+2324>>2]|0)}k=c[b+2328>>2]|0;if((k|0)==0){m=c[l>>2]|0;n=m+(f*14072|0)+52|0;a[n]=g;i=h;return}Mb[k&1](b,f,r,c[b+2332>>2]|0);m=c[l>>2]|0;n=m+(f*14072|0)+52|0;a[n]=g;i=h;return}function cd(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;d=i;i=i+88|0;e=b+4|0;f=d+24|0;g=d|0;h=d+56|0;j=Pf(c[e>>2]|0,f,g,h)|0;if((j|0)==-1){i=d;return}k=b+2228|0;l=c[k>>2]|0;a:do{if((l|0)!=0){m=b+2224|0;n=0;o=l;while(1){p=c[m>>2]|0;if((a[p+(n*14072|0)+52|0]|0)==0){q=o}else{if($d(f,p+(n*14072|0)|0)|0){break}q=c[k>>2]|0}p=n+1|0;if(p>>>0<q>>>0){n=p;o=q}else{break a}}if((n|0)==-1){break}do{if((c[k>>2]|0)>>>0>n>>>0){o=c[m>>2]|0;p=c[e>>2]|0;if((a[o+(n*14072|0)+52|0]|0)!=4){r=p;s=o;break}hf(c[p>>2]|0,j)|0;i=d;return}else{r=c[e>>2]|0;s=c[m>>2]|0}}while(0);Qf(r,c[s+(n*14072|0)+36>>2]|0)|0;p=Rf(c[e>>2]|0,j,f,g,h)|0;c[(c[m>>2]|0)+(n*14072|0)+36>>2]=p;bd(b,n,3);i=d;return}}while(0);hf(c[c[e>>2]>>2]|0,j)|0;i=d;return}function dd(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0;Yd();nd(c[a>>2]|0);b=a+8|0;Ie(c[b>>2]|0);Wf(c[a+4>>2]|0);lg(c[a+20>>2]|0);ad(a);cd(a);d=a+2244|0;e=c[d>>2]|0;if((e|0)!=0){f=a+2240|0;g=0;h=e;while(1){e=c[(c[f>>2]|0)+(g<<2)>>2]|0;if((e|0)==0){i=h}else{We(e);i=c[d>>2]|0}e=g+1|0;if(e>>>0<i>>>0){g=e;h=i}else{break}}}i=a+2248|0;a=Nh(c[i>>2]|0,c[i+4>>2]|0,10,0)|0;h=E;g=Zd()|0;d=E;if(!(h>>>0<d>>>0|h>>>0==d>>>0&a>>>0<g>>>0)){return}g=Ga(-32091|0)|0;Ic(g,c[b>>2]|0)|0;b=Zd()|0;c[i>>2]=b;c[i+4>>2]=E;return}function ed(){return od()|0}function fd(a,b){a=a|0;b=b|0;var d=0;d=c[a>>2]|0;return pd(d,lf(c[c[a+4>>2]>>2]|0)|0,b)|0}function gd(a,b,c){a=a|0;b=b|0;c=c|0;return qd(a,b,c)|0}function hd(a,b){a=a|0;b=b|0;return rd(c[a>>2]|0,b)|0}function id(){var a=0,b=0,d=0,e=0;a=i;i=i+8|0;b=a|0;cb(b|0,0)|0;d=c[b>>2]|0;e=Xh(d,(d|0)<0|0?-1:0,1e6,0)|0;d=c[b+4>>2]|0;b=Nh(e,E,d,(d|0)<0|0?-1:0)|0;d=E;i=a;return(E=d,b)|0}function jd(){var a=0,b=0;a=i;i=i+8|0;b=a|0;Pg(b,4,0);i=a;return c[b>>2]|0}function kd(){var a=0,b=0;a=i;i=i+8|0;b=a|0;Pg(b,8,0);i=a;return(E=c[b+4>>2]|0,c[b>>2]|0)|0}function ld(e,f,g,h){e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;j=i;i=i+136|0;k=f;f=i;i=i+19|0;i=i+7&-8;c[f>>2]=c[k>>2];c[f+4>>2]=c[k+4>>2];c[f+8>>2]=c[k+8>>2];c[f+12>>2]=c[k+12>>2];b[f+16>>1]=b[k+16>>1]|0;a[f+18|0]=a[k+18|0]|0;k=j|0;l=j+8|0;m=b[e+2048>>1]|0;n=a[f|0]|0;do{if(m<<16>>16==2){if(n<<24>>24==2){o=6;break}else{p=-1}i=j;return p|0}else{if((n<<24>>24|0)==10){b[l>>1]=10;q=f+17|0;b[l+2>>1]=(d[q]|d[q+1|0]<<8)<<16>>16;Kh(l+8|0,f+1|0,16)|0;c[l+4>>2]=0;c[l+24>>2]=0;r=28;break}else if((n<<24>>24|0)==2){if(m<<16>>16!=10){o=6;break}b[l>>1]=10;q=f+17|0;b[l+2>>1]=(d[q]|d[q+1|0]<<8)<<16>>16;q=va(65535)|0;s=f+1|0;t=d[s]|d[s+1|0]<<8|d[s+2|0]<<16|d[s+3|0]<<24|0;c[l+8>>2]=0;c[l+12>>2]=0;c[l+16>>2]=q;c[l+20>>2]=t;c[l+4>>2]=0;c[l+24>>2]=0;r=28;break}else{p=-1;i=j;return p|0}}}while(0);if((o|0)==6){b[l>>1]=2;o=f+1|0;c[l+4>>2]=d[o]|d[o+1|0]<<8|d[o+2|0]<<16|d[o+3|0]<<24;o=f+17|0;b[l+2>>1]=(d[o]|d[o+1|0]<<8)<<16>>16;r=16}o=wb(c[e+2052>>2]|0,g|0,h|0,0,l|0,r|0)|0;if((o|0)>-1&(o|0)==(h|0)){r=e+2056|0;c[r>>2]=0;c[r+4>>2]=0;p=h;i=j;return p|0}if((o|0)>=0){p=o;i=j;return p|0}if((c[(qb()|0)>>2]|0)!=11){p=o;i=j;return p|0}cb(k|0,0)|0;h=c[k>>2]|0;r=Xh(h,(h|0)<0|0?-1:0,1e6,0)|0;h=c[k+4>>2]|0;k=Nh(r,E,h,(h|0)<0|0?-1:0)|0;h=e+2056|0;c[h>>2]=k;c[h+4>>2]=E;p=o;i=j;return p|0}function md(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=b&255;c[a+(f<<3)>>2]=d;c[a+(f<<3)+4>>2]=e;return}function nd(e){e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;f=i;i=i+65672|0;g=f|0;h=f+128|0;j=f+136|0;Yd();k=e+2052|0;l=c[k>>2]|0;m=f+160|0;n=j|0;Jh(n|0,0,19)|0;c[h>>2]=128;o=g;p=sb(l|0,m|0,65507,0,o|0,h|0)|0;if((p|0)<1){i=f;return}l=g|0;q=j+1|0;r=g+4|0;s=q;t=g+2|0;u=j+17|0;v=q;x=g+8|0;y=g+2|0;g=s+4|0;z=j+9|0;A=v+9|0;B=v+10|0;C=v+11|0;D=q+12|0;q=p;a:while(1){p=b[l>>1]|0;do{if((p<<16>>16|0)==10){a[n]=10;Kh(v|0,x|0,16)|0;w=b[y>>1]|0;a[u]=w;w=w>>8;a[u+1|0]=w;if((c[s>>2]|0)!=0){break}if((c[g>>2]|0)!=0){break}if((a[z]|0)!=0){break}if((a[A]|0)!=0){break}if((a[B]|0)!=-1){break}if((a[C]|0)!=-1){break}a[n]=2;w=d[D]|d[D+1|0]<<8|d[D+2|0]<<16|d[D+3|0]<<24|0;a[s]=w;w=w>>8;a[s+1|0]=w;w=w>>8;a[s+2|0]=w;w=w>>8;a[s+3|0]=w}else if((p<<16>>16|0)==2){a[n]=2;w=c[r>>2]|0;a[s]=w;w=w>>8;a[s+1|0]=w;w=w>>8;a[s+2|0]=w;w=w>>8;a[s+3|0]=w;w=b[t>>1]|0;a[u]=w;w=w>>8;a[u+1|0]=w}else{E=16;break a}}while(0);do{if((q|0)!=0){p=d[m]|0;F=c[e+(p<<3)>>2]|0;if((F|0)==0){break}Ib[F&63](c[e+(p<<3)+4>>2]|0,j,m,q)|0}}while(0);p=c[k>>2]|0;Jh(n|0,0,19)|0;c[h>>2]=128;F=sb(p|0,m|0,65507,0,o|0,h|0)|0;if((F|0)<1){E=16;break}else{q=F}}if((E|0)==16){i=f;return}}function od(){return 24}function pd(a,d,e){a=a|0;d=d|0;e=e|0;var f=0,g=0;if((e|0)==0){f=0;return f|0}c[e>>2]=c[a+2052>>2];c[e+4>>2]=d;b[e+8>>1]=0;d=a+2056|0;a=c[d+4>>2]|0;g=e+16|0;c[g>>2]=c[d>>2];c[g+4>>2]=a;f=1;return f|0}function qd(a,d,e){a=a|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;f=i;i=i+136|0;g=f|0;h=f+8|0;j=i;i=i+128|0;k=i;i=i+128|0;l=i;i=i+8|0;if((a|0)==0){m=0;i=f;return m|0}n=a+16|0;if((c[n>>2]|0)==0&(c[n+4>>2]|0)==0){o=1}else{cb(g|0,0)|0;p=c[g>>2]|0;q=Xh(p,(p|0)<0|0?-1:0,1e6,0)|0;p=c[g+4>>2]|0;g=Nh(q,E,p,(p|0)<0|0?-1:0)|0;p=Oh(g,E,c[n>>2]|0,c[n+4>>2]|0)|0;n=E;g=0;o=n>>>0>g>>>0|n>>>0==g>>>0&p>>>0>249999>>>0}p=a;g=c[p>>2]|0;Jh(h|0,0,128)|0;n=1<<(g&31);q=g>>>5;r=h+(q<<2)|0;c[r>>2]=n|c[r>>2];Jh(j|0,0,128)|0;if(!o){o=j+(q<<2)|0;c[o>>2]=n|c[o>>2]}Jh(k|0,0,128)|0;o=k+(q<<2)|0;c[o>>2]=n|c[o>>2];if((e|d|0)<0){s=0}else{c[l>>2]=d;c[l+4>>2]=e;s=l}l=Ja(g+1|0,h|0,j|0,0,s|0)|0;s=c[p>>2]|0;if((1<<(s&31)&c[j+(s>>>5<<2)>>2]|0)!=0){b[a+8>>1]=1}m=(l|0)>0?2:1;i=f;return m|0}function rd(a,d){a=a|0;d=d|0;var e=0;if((d|0)==0){e=0;return e|0}if((b[d+8>>1]|0)==0){e=1;return e|0}d=a+2056|0;c[d>>2]=0;c[d+4>>2]=0;e=1;return e|0}function sd(e,f){e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;g=i;i=i+200|0;h=e;e=i;i=i+17|0;i=i+7&-8;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];c[e+8>>2]=c[h+8>>2];c[e+12>>2]=c[h+12>>2];a[e+16|0]=a[h+16|0]|0;h=g|0;j=g+8|0;k=g+16|0;l=g+24|0;m=g+32|0;n=g+40|0;p=g+48|0;q=g+176|0;r=e|0;s=a[r]|0;if(!((s<<24>>24|0)==2|(s<<24>>24|0)==10)){Ca(c[o>>2]|0,1320,(t=i,i=i+8|0,c[t>>2]=s&255,t)|0)|0;i=t;u=0;i=g;return u|0}if((a[10216]|0)==0){kh()|0;cb(l|0,0)|0;nh(((c[l>>2]|0)*1e6|0)+(c[l+4>>2]|0)|0);cb(k|0,0)|0;Za(((c[k>>2]|0)*1e6|0)+(c[k+4>>2]|0)|0);a[10216]=1}k=Fh(1,2064)|0;l=k;if((k|0)==0){u=0;i=g;return u|0}s=a[r]|0;r=s&255;b[k+2048>>1]=r;v=k+2050|0;b[v>>1]=0;w=kb(s&255|0,2,17)|0;c[k+2052>>2]=w;if((w|0)<0){x=c[o>>2]|0;y=c[(qb()|0)>>2]|0;z=rb(y|0)|0;Ca(x|0,1536,(t=i,i=i+16|0,c[t>>2]=y,c[t+8>>2]=z,t)|0)|0;i=t;Eh(k);u=0;i=g;return u|0}c[m>>2]=2097152;z=m;gb(w|0,1,8,z|0,4)|0;gb(w|0,1,7,z|0,4)|0;c[n>>2]=1;gb(w|0,1,6,n|0,4)|0;n=Xa(w|0,4,(t=i,i=i+16|0,c[t>>2]=2048,c[t+8>>2]=1,t)|0)|0;i=t;if((n|0)!=0){Ea(w|0)|0;Eh(k);u=0;i=g;return u|0}if((r<<16>>16|0)==2){b[p>>1]=2;n=p+2|0;b[n>>1]=0;z=e+1|0;c[p+4>>2]=d[z]|d[z+1|0]<<8|d[z+2|0]<<16|d[z+3|0]<<24;A=n;B=16}else if((r<<16>>16|0)==10){b[p>>1]=10;r=p+2|0;b[r>>1]=0;Kh(p+8|0,e+1|0,16)|0;c[p+4>>2]=0;c[p+24>>2]=0;A=r;B=28}else{Eh(k);u=0;i=g;return u|0}if(s<<24>>24==10){a[h]=0;c[j>>2]=1;s=(oh(w,41,26,h,j)|0)==0;if(!(s&(a[h]|0)==0)){a[h]=0;gb(w|0,41,26,h|0,1)|0}h=q;Jh(h|0,0,16)|0;s=q;a[h]=-1;a[s+1|0]=2;a[s+15|0]=1;c[q+16>>2]=0;gb(w|0,41,20,h|0,20)|0}b[A>>1]=Ga(f|0)|0;h=p;p=f;q=33445;while(1){if((ob(w|0,h|0,B|0)|0)==0){break}s=p+1&65535;j=(s&65535)>>>0>33545>>>0?-32091:s;b[A>>1]=Ga(j|0)|0;s=q+1|0;if((s|0)<33546){p=j;q=s}else{C=23;break}}if((C|0)==23){C=c[o>>2]|0;p=c[(qb()|0)>>2]|0;B=rb(p|0)|0;ud(e)|0;Ca(C|0,1256,(t=i,i=i+32|0,c[t>>2]=p,c[t+8>>2]=B,c[t+16>>2]=10224,c[t+24>>2]=f&65535,t)|0)|0;i=t;Ea(w|0)|0;Eh(k);u=0;i=g;return u|0}b[v>>1]=b[A>>1]|0;if((q|0)<=0){u=l;i=g;return u|0}c[(qb()|0)>>2]=0;u=l;i=g;return u|0}function td(a){a=a|0;Ea(c[a+2052>>2]|0)|0;Eh(a);return}function ud(b){b=b|0;var e=0,f=0,g=0,h=0,j=0;e=i;if((b|0)==0){zb(10224,96,1112,(f=i,i=i+1|0,i=i+7&-8,c[f>>2]=0,f)|0)|0;i=f;a[10319]=0;i=e;return 10224}g=b|0;h=a[g]|0;if((h<<24>>24|0)==10){a[10224]=91;Ua(d[g]|0|0,b+1|0,10225,93)|0;j=Lh(10224)|0;a[10224+j|0]=93;a[j+10225|0]=0;a[10319]=0;i=e;return 10224}else if((h<<24>>24|0)==2){a[10224]=0;Ua(d[g]|0|0,b+1|0,10224,96)|0;a[10319]=0;i=e;return 10224}else{zb(10224,96,1184,(f=i,i=i+8|0,c[f>>2]=h&255,f)|0)|0;i=f;a[10319]=0;i=e;return 10224}return 0}function vd(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;if((b|0)==0|(e|0)==0){f=0;return f|0}g=a[b|0]|0;h=a[e|0]|0;i=g<<24>>24==2;if(g<<24>>24==h<<24>>24){if(i){j=b+1|0;k=e+1|0;f=(d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0)==(d[k]|d[k+1|0]<<8|d[k+2|0]<<16|d[k+3|0]<<24|0)|0;return f|0}if(g<<24>>24!=10){f=0;return f|0}k=b+1|0;j=e+1|0;f=((c[k+4>>2]|0)-(c[j+4>>2]|0)|(c[k>>2]|0)-(c[j>>2]|0)|(c[b+9>>2]|0)-(c[e+9>>2]|0)|(c[k+12>>2]|0)-(c[j+12>>2]|0)|0)==0|0;return f|0}if(i&h<<24>>24==10){i=e+1|0;j=i;if((c[j>>2]|0)!=0){f=0;return f|0}if((c[j+4>>2]|0)!=0){f=0;return f|0}j=i;if((a[e+9|0]|0)!=0){f=0;return f|0}if((a[j+9|0]|0)!=0){f=0;return f|0}if((a[j+10|0]|0)!=-1){f=0;return f|0}if((a[j+11|0]|0)!=-1){f=0;return f|0}j=b+1|0;k=i+12|0;f=(d[j]|d[j+1|0]<<8|d[j+2|0]<<16|d[j+3|0]<<24|0)==(d[k]|d[k+1|0]<<8|d[k+2|0]<<16|d[k+3|0]<<24|0)|0;return f|0}if(!(g<<24>>24==10&h<<24>>24==2)){f=0;return f|0}h=b+1|0;g=h;if((c[g>>2]|0)!=0){f=0;return f|0}if((c[g+4>>2]|0)!=0){f=0;return f|0}g=h;if((a[b+9|0]|0)!=0){f=0;return f|0}if((a[g+9|0]|0)!=0){f=0;return f|0}if((a[g+10|0]|0)!=-1){f=0;return f|0}if((a[g+11|0]|0)!=-1){f=0;return f|0}g=h+12|0;h=e+1|0;f=(d[g]|d[g+1|0]<<8|d[g+2|0]<<16|d[g+3|0]<<24|0)==(d[h]|d[h+1|0]<<8|d[h+2|0]<<16|d[h+3|0]<<24|0)|0;return f|0}function wd(a,b){a=a|0;b=b|0;var c=0,e=0,f=0;if((a|0)==0|(b|0)==0){c=0;return c|0}e=a+17|0;f=(d[e]|d[e+1|0]<<8)<<16>>16;if(f<<16>>16==0){c=0;return c|0}e=b+17|0;if(f<<16>>16!=(d[e]|d[e+1|0]<<8)<<16>>16<<16>>16){c=0;return c|0}c=vd(a|0,b|0)|0;return c|0}function xd(a){a=a|0;if((a|0)==0){return}Jh(a|0,0,17)|0;return}function yd(b,c){b=b|0;c=c|0;var d=0;if((b|0)==0){return}d=b|0;Jh(d|0,0,17)|0;a[d]=c<<24>>24!=0?10:2;return}function zd(b){b=b|0;var c=0;if((b|0)==0){c=0;return c|0}c=(a[b|0]|0)!=0|0;return c|0}function Ad(b){b=b|0;var c=0,e=0;if((b|0)==0){c=0;return c|0}e=b+17|0;if((d[e]|d[e+1|0]<<8)<<16>>16<<16>>16==0){c=0;return c|0}c=(a[b|0]|0)!=0|0;return c|0}function Bd(a,b){a=a|0;b=b|0;if((b|0)==0|(a|0)==0){return}Kh(a|0,b|0,17)|0;return}function Cd(a,b){a=a|0;b=b|0;if((b|0)==0|(a|0)==0){return}Kh(a|0,b|0,19)|0;return}function Dd(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,x=0,y=0,z=0;g=i;i=i+72|0;h=g|0;j=g+8|0;k=g+16|0;l=g+24|0;if((b|0)==0|(e|0)==0){m=0;i=g;return m|0}n=e|0;o=a[n]|0;c[k>>2]=0;Jh(l|0,0,32)|0;c[l+4>>2]=o&255;c[l+8>>2]=2;if((a[10216]|0)==0){kh()|0;cb(j|0,0)|0;nh(((c[j>>2]|0)*1e6|0)+(c[j+4>>2]|0)|0);cb(h|0,0)|0;Za(((c[h>>2]|0)*1e6|0)+(c[h+4>>2]|0)|0);a[10216]=1}if((ua(b|0,0,l|0,k|0)|0)!=0){m=0;i=g;return m|0}l=g+56|0;Jh(l|0,0,16)|0;b=c[k>>2]|0;a:do{if((b|0)==0){p=0;q=0}else{k=e+1|0;h=e+1|0;j=0;r=0;s=b;b:while(1){t=c[s+4>>2]|0;do{if((t|0)==10){if(o<<24>>24==10){if((c[s+16>>2]|0)==28){u=14;break b}else{v=r;x=j;break}}if((r&2|0)!=0){v=r;x=j;break}if((c[s+16>>2]|0)!=28){v=r;x=j;break}Kh(l|0,(c[s+20>>2]|0)+8|0,16)|0;v=r|2;x=j}else if((t|0)==2){if(o<<24>>24==2){u=9;break b}if((r&1|0)!=0){v=r;x=j;break}y=(c[s+20>>2]|0)+4|0;v=r|1;x=d[y]|d[y+1|0]<<8|d[y+2|0]<<16|d[y+3|0]<<24|0}else{v=r;x=j}}while(0);t=c[s+28>>2]|0;if((t|0)==0|(v|0)==3){p=x;q=v;break a}else{j=x;r=v;s=t}}if((u|0)==9){r=(c[s+20>>2]|0)+4|0;w=d[r]|d[r+1|0]<<8|d[r+2|0]<<16|d[r+3|0]<<24|0;a[k]=w;w=w>>8;a[k+1|0]=w;w=w>>8;a[k+2|0]=w;w=w>>8;a[k+3|0]=w;p=j;q=3;break}else if((u|0)==14){Kh(h|0,(c[s+20>>2]|0)+8|0,16)|0;p=j;q=3;break}}}while(0);do{if((a[n]|0)==0){if((q&2|0)==0){if((q&1|0)==0){z=0;break}a[n]=2;u=e+1|0;w=p;a[u]=w;w=w>>8;a[u+1|0]=w;w=w>>8;a[u+2|0]=w;w=w>>8;a[u+3|0]=w;z=q;break}else{a[n]=10;Kh(e+1|0,l|0,16)|0;if((q&1|0)==0|(f|0)==0){z=q;break}a[f|0]=2;u=f+1|0;w=p;a[u]=w;w=w>>8;a[u+1|0]=w;w=w>>8;a[u+2|0]=w;w=w>>8;a[u+3|0]=w;z=q;break}}else{z=q}}while(0);Ba(b|0);m=z;i=g;return m|0}function Ed(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0;f=i;i=i+24|0;g=f|0;if((Dd(b,d,e)|0)!=0){h=1;i=f;return h|0}e=f+8|0;if((b|0)==0|(d|0)==0){h=0;i=f;return h|0}if((za(2,b|0,g|0)|0)==1){a[d|0]=2;j=d+1|0;w=c[g>>2]|0;a[j]=w;w=w>>8;a[j+1|0]=w;w=w>>8;a[j+2|0]=w;w=w>>8;a[j+3|0]=w;h=1;i=f;return h|0}if((za(10,b|0,e|0)|0)!=1){h=0;i=f;return h|0}a[d|0]=10;Kh(d+1|0,e|0,16)|0;h=1;i=f;return h|0}function Fd(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0;d=i;i=i+64|0;if((b|0)==0|(c|0)==0){e=-1;i=d;return e|0}zf(c|0,a+14932|0,b|0);Kh(b+96|0,a+14900|0,32)|0;a=d|0;f=d+32|0;Kg(a,f)|0;zf(c+51|0,f,b+32|0);Kh(b+128|0,a|0,32)|0;Kg(a,f)|0;zf(c+102|0,f,b+64|0);Kh(b+160|0,a|0,32)|0;Kh(b+192|0,c+32|0,19)|0;a=b+211|0;Kh(a|0,c+83|0,19)|0;f=b+230|0;Kh(f|0,c+134|0,19)|0;he(a|0);he(f|0);e=0;i=d;return e|0}function Gd(d,e,f,g,h){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;j=i;i=i+24|0;k=f;f=i;i=i+19|0;i=i+7&-8;c[f>>2]=c[k>>2];c[f+4>>2]=c[k+4>>2];c[f+8>>2]=c[k+8>>2];c[f+12>>2]=c[k+12>>2];b[f+16>>1]=b[k+16>>1]|0;a[f+18|0]=a[k+18|0]|0;k=h+226|0;if(k>>>0>1024>>>0|(h|0)==0){l=-1;i=j;return l|0}he(f|0);m=h+19|0;n=mb()|0;o=i;i=i+m|0;i=i+7&-8;Kh(o|0,f|0,19)|0;Kh(o+19|0,g|0,h)|0;g=j|0;Gf(g);f=h+86|0;p=i;i=i+f|0;i=i+7&-8;Kh(p|0,e+230|0,19)|0;Kh(p+19|0,e+160|0,32)|0;do{if((Af(e+64|0,g,o,m,p+51|0)|0)==(h+35|0)){q=h+153|0;r=i;i=i+q|0;i=i+7&-8;Kh(r|0,e+211|0,19)|0;Kh(r+19|0,e+128|0,32)|0;if((Af(e+32|0,g,p,f,r+51|0)|0)!=(h+102|0)){s=-1;break}t=i;i=i+k|0;i=i+7&-8;a[t]=-128;Kh(t+1|0,g|0,24)|0;Kh(t+25|0,e+96|0,32)|0;if((Af(e|0,g,r,q,t+57|0)|0)!=(h+169|0)){s=-1;break}s=((ld(d,e+192|0,t,k)|0)!=(k|0))<<31>>31}else{s=-1}}while(0);Ma(n|0);l=s;i=j;return l|0}function Hd(d,e,f,g,h){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0;j=i;k=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[k>>2];c[e+4>>2]=c[k+4>>2];c[e+8>>2]=c[k+8>>2];c[e+12>>2]=c[k+12>>2];b[e+16>>1]=b[k+16>>1]|0;a[e+18|0]=a[k+18|0]|0;k=g+178|0;l=i;i=i+k|0;i=i+7&-8;a[l]=-116;Kh(l+1|0,h|0,177)|0;Kh(l+178|0,f|0,g)|0;g=((ld(d,e,l,k)|0)!=(k|0))<<31>>31;i=j;return g|0}function Id(a){a=a|0;var b=0,d=0,e=0,f=0;if((a|0)==0){b=0;return b|0}d=Fh(1,245816)|0;if((d|0)==0){b=0;return b|0}c[d>>2]=a;e=d+4|0;c[e>>2]=c[c[c[a>>2]>>2]>>2];Hf(d+8|0);a=Zd()|0;f=d+40|0;c[f>>2]=a;c[f+4>>2]=E;md(c[e>>2]|0,-128,34,d);md(c[e>>2]|0,-127,40,d);md(c[e>>2]|0,-126,42,d);md(c[e>>2]|0,-116,4,d);md(c[e>>2]|0,-115,6,d);md(c[e>>2]|0,-114,8,d);b=d;return b|0}function Jd(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;h=i;i=i+2128|0;j=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[e+12>>2]=c[j+12>>2];b[e+16>>1]=b[j+16>>1]|0;a[e+18|0]=a[j+18|0]|0;j=h|0;k=h+24|0;l=h+1072|0;if((g-227|0)>>>0>797>>>0){m=1;i=h;return m|0}n=d+40|0;if((_d(c[n>>2]|0,c[n+4>>2]|0,3600,0)|0)!=0){Hf(d+8|0);o=Zd()|0;c[n>>2]=o;c[n+4>>2]=E}n=h+2096|0;o=f+1|0;ee(d+48|0,n,(c[d>>2]|0)+14932|0,f+25|0);p=l|0;q=Bf(n,o,f+57|0,g-57|0,p)|0;if((q|0)!=(g-73|0)){m=1;i=h;return m|0}g=h+1048|0;Kh(g|0,e|0,19)|0;e=k|0;Kh(j|0,p|0,19)|0;ie(j|0);a[e]=-127;Kh(k+1|0,o|0,24)|0;Kh(k+25|0,l+19|0,q-19|0)|0;l=k+(q+6)|0;If(l);if((Ef(d+8|0,l,g,19,k+(q+30)|0)|0)!=35){m=1;i=h;return m|0}k=q+65|0;m=(ld(c[d+4>>2]|0,j,e,k)|0)!=(k|0)|0;i=h;return m|0}function Kd(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;h=i;i=i+2184|0;j=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[e+12>>2]=c[j+12>>2];b[e+16>>1]=b[j+16>>1]|0;a[e+18|0]=a[j+18|0]|0;j=h|0;k=h+1056|0;l=h+1080|0;m=h+2104|0;if((g-219|0)>>>0>805>>>0){n=1;i=h;return n|0}o=d+40|0;if((_d(c[o>>2]|0,c[o+4>>2]|0,3600,0)|0)!=0){Hf(d+8|0);p=Zd()|0;c[o>>2]=p;c[o+4>>2]=E}o=h+1024|0;p=f+1|0;ee(d+81968|0,o,(c[d>>2]|0)+14932|0,f+25|0);q=j|0;r=Bf(o,p,f+57|0,g-116|0,q)|0;if((r|0)!=(g-132|0)){n=1;i=h;return n|0}Kh(k|0,q|0,19)|0;ie(k|0);q=l|0;a[q]=-126;Kh(l+1|0,p|0,24)|0;Kh(l+25|0,j+19|0,r-19|0)|0;j=l+(r+6)|0;If(j);p=m|0;Kh(p|0,e|0,19)|0;Kh(m+19|0,f+(g-59)|0,59)|0;if((Ef(d+8|0,j,p,78,l+(r+30)|0)|0)!=94){n=1;i=h;return n|0}l=r+124|0;n=(ld(c[d+4>>2]|0,k,q,l)|0)!=(l|0)|0;i=h;return n|0}function Ld(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;h=i;i=i+2248|0;j=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[e+12>>2]=c[j+12>>2];b[e+16>>1]=b[j+16>>1]|0;a[e+18|0]=a[j+18|0]|0;j=h|0;k=h+1056|0;l=h+1080|0;m=h+2104|0;if((g-211|0)>>>0>813>>>0){n=1;i=h;return n|0}o=d+40|0;if((_d(c[o>>2]|0,c[o+4>>2]|0,3600,0)|0)!=0){Hf(d+8|0);p=Zd()|0;c[o>>2]=p;c[o+4>>2]=E}o=h+1024|0;ee(d+163888|0,o,(c[d>>2]|0)+14932|0,f+25|0);p=j|0;q=Bf(o,f+1|0,f+57|0,g-175|0,p)|0;if((q|0)!=(g-191|0)){n=1;i=h;return n|0}Kh(k|0,p|0,19)|0;ie(k|0);p=l|0;o=q-19|0;Kh(p|0,j+19|0,o)|0;j=l+o|0;If(j);o=m|0;Kh(o|0,e|0,19)|0;Kh(m+19|0,f+(g-118)|0,118)|0;if((Ef(d+8|0,j,o,137,l+(q+5)|0)|0)!=153){n=1;i=h;return n|0}l=q+158|0;n=(ld(c[d+4>>2]|0,k,p,l)|0)!=(l|0)|0;i=h;return n|0}function Md(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0;h=i;i=i+1192|0;j=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[e+12>>2]=c[j+12>>2];b[e+16>>1]=b[j+16>>1]|0;a[e+18|0]=a[j+18|0]|0;j=h|0;e=h+144|0;k=h+168|0;if((g-179|0)>>>0>845>>>0){l=1;i=h;return l|0}m=d+40|0;n=d+8|0;if((_d(c[m>>2]|0,c[m+4>>2]|0,3600,0)|0)!=0){Hf(n);o=Zd()|0;c[m>>2]=o;c[m+4>>2]=E}m=j|0;if((Ff(n,f+1|0,f+25|0,153,m)|0)!=137){l=1;i=h;return l|0}Kh(e|0,m|0,19)|0;m=k|0;a[m]=-115;Kh(k+1|0,j+19|0,118)|0;Kh(k+119|0,f+178|0,g-178|0)|0;f=g-59|0;l=(ld(c[d+4>>2]|0,e,m,f)|0)!=(f|0)|0;i=h;return l|0}function Nd(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0;h=i;i=i+1128|0;j=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[e+12>>2]=c[j+12>>2];b[e+16>>1]=b[j+16>>1]|0;a[e+18|0]=a[j+18|0]|0;j=h|0;e=h+80|0;k=h+104|0;if((g-120|0)>>>0>904>>>0){l=1;i=h;return l|0}m=d+40|0;n=d+8|0;if((_d(c[m>>2]|0,c[m+4>>2]|0,3600,0)|0)!=0){Hf(n);o=Zd()|0;c[m>>2]=o;c[m+4>>2]=E}m=j|0;if((Ff(n,f+1|0,f+25|0,94,m)|0)!=78){l=1;i=h;return l|0}Kh(e|0,m|0,19)|0;m=k|0;a[m]=-114;Kh(k+1|0,j+19|0,59)|0;Kh(k+60|0,f+119|0,g-119|0)|0;f=g-59|0;l=(ld(c[d+4>>2]|0,e,m,f)|0)!=(f|0)|0;i=h;return l|0}function Od(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0;h=i;i=i+24|0;j=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[e+12>>2]=c[j+12>>2];b[e+16>>1]=b[j+16>>1]|0;a[e+18|0]=a[j+18|0]|0;j=h|0;if((g-61|0)>>>0>963>>>0){k=1;i=h;return k|0}e=d+40|0;l=d+8|0;if((_d(c[e>>2]|0,c[e+4>>2]|0,3600,0)|0)!=0){Hf(l);m=Zd()|0;c[e>>2]=m;c[e+4>>2]=E}e=j|0;if((Ff(l,f+1|0,f+25|0,35,e)|0)!=19){k=1;i=h;return k|0}l=g-60|0;g=c[d+245808>>2]|0;do{if((g|0)!=0){m=a[e]|0;if((m<<24>>24|0)==2|(m<<24>>24|0)==10){break}k=Ib[g&63](c[d+245812>>2]|0,j,f+60|0,l&65535)|0;i=h;return k|0}}while(0);k=(ld(c[d+4>>2]|0,j,f+60|0,l)|0)!=(l|0)|0;i=h;return k|0}function Pd(a){a=a|0;var b=0;if((a|0)==0){return}b=a+4|0;md(c[b>>2]|0,-128,0,0);md(c[b>>2]|0,-127,0,0);md(c[b>>2]|0,-126,0,0);md(c[b>>2]|0,-116,0,0);md(c[b>>2]|0,-115,0,0);md(c[b>>2]|0,-114,0,0);Eh(a);return}function Qd(d,e,f){d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;g=i;i=i+152|0;h=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];c[e+8>>2]=c[h+8>>2];c[e+12>>2]=c[h+12>>2];b[e+16>>1]=b[h+16>>1]|0;a[e+18|0]=a[h+18|0]|0;h=g+24|0;j=g+112|0;if((Rd(d,e)|0)!=0){k=1;i=g;return k|0}l=d|0;if($d(f,(c[l>>2]|0)+14900|0)|0){k=1;i=g;return k|0}m=g+120|0;ge(c[l>>2]|0,m,f);f=g|0;Kh(f|0,e|0,19)|0;n=d+36876|0;o=c[n>>2]|0;p=d+36872|0;q=c[p>>2]|0;do{if((q|0)==0){c[p>>2]=0;r=o&511;c[n>>2]=r;s=r;t=0}else{r=d+8+((o&511)*72|0)+32|0;a:do{if((_d(c[r>>2]|0,c[r+4>>2]|0,3,0)|0)==0){u=o;v=q}else{w=q;x=o;y=0;while(1){z=x+1|0;A=w-1|0;B=y+1|0;if(B>>>0>=(c[p>>2]|0)>>>0){u=z;v=A;break a}C=d+8+(((c[n>>2]|0)+B&511)*72|0)+32|0;if((_d(c[C>>2]|0,c[C+4>>2]|0,3,0)|0)==0){u=z;v=A;break}else{w=A;x=z;y=B}}}}while(0);c[p>>2]=v;r=u&511;c[n>>2]=r;if((v|0)!=512){s=r;t=v;break}c[p>>2]=511;r=u+1&511;c[n>>2]=r;s=r;t=511}}while(0);n=s+t&511;Kh(d+8+(n*72|0)|0,f|0,19)|0;f=Zd()|0;t=d+8+(n*72|0)+32|0;c[t>>2]=f;c[t+4>>2]=E;t=kd()|0;f=d+8+(n*72|0)+24|0;c[f>>2]=t;c[f+4>>2]=E;Kh(d+8+(n*72|0)+40|0,m|0,32)|0;c[p>>2]=(c[p>>2]|0)+1;p=c[f+4>>2]|0;c[j>>2]=c[f>>2];c[j+4>>2]=p;p=h|0;a[p]=0;ae(h+1|0,(c[l>>2]|0)+14900|0)|0;f=h+33|0;If(f);if((Af(m,f,j,8,h+57|0)|0)!=24){k=1;i=g;return k|0}k=ld(c[(c[l>>2]|0)+4>>2]|0,e,p,81)|0;i=g;return k|0}function Rd(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;f=i;g=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[g>>2];c[e+4>>2]=c[g+4>>2];c[e+8>>2]=c[g+8>>2];c[e+12>>2]=c[g+12>>2];b[e+16>>1]=b[g+16>>1]|0;a[e+18|0]=a[g+18|0]|0;if(((zd(e|0)|0)&255)<<24>>24==0){h=0;i=f;return h|0}g=d+36876|0;j=c[g>>2]|0;k=d+36872|0;l=c[k>>2]|0;a:do{if((l|0)==0){m=j;n=0}else{o=d+8+((j&511)*72|0)+32|0;if((_d(c[o>>2]|0,c[o+4>>2]|0,3,0)|0)==0){m=j;n=l;break}else{p=l;q=j;r=0}while(1){o=q+1|0;s=p-1|0;t=r+1|0;if(t>>>0>=(c[k>>2]|0)>>>0){m=o;n=s;break a}u=d+8+((t+(c[g>>2]|0)&511)*72|0)+32|0;if((_d(c[u>>2]|0,c[u+4>>2]|0,3,0)|0)==0){m=o;n=s;break}else{p=s;q=o;r=t}}}}while(0);c[k>>2]=n;c[g>>2]=m&511;m=0;r=n;while(1){if(m>>>0>=r>>>0){h=0;v=11;break}w=(c[g>>2]|0)+m&511;if((wd(d+8+(w*72|0)|0,e)|0)!=0){break}m=m+1|0;r=c[k>>2]|0}if((v|0)==11){i=f;return h|0}h=w+1|0;i=f;return h|0}function Sd(d,e,f){d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;g=i;h=f;f=i;i=i+19|0;i=i+7&-8;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];c[f+8>>2]=c[h+8>>2];c[f+12>>2]=c[h+12>>2];b[f+16>>1]=b[h+16>>1]|0;a[f+18|0]=a[h+18|0]|0;if((zd(f|0)|0)==0){j=-1;i=g;return j|0}else{k=0}while(1){if(k>>>0>=8>>>0){l=6;break}m=d+36880+(k*51|0)+32|0;n=d+36880+(k*51|0)|0;if((zd(m|0)|0)==0){l=4;break}if((Mh(n|0,e|0,32)|0)==0){j=-1;l=10;break}else{k=k+1|0}}if((l|0)==4){Kh(n|0,e|0,32)|0;Cd(m,f);j=0;i=g;return j|0}else if((l|0)==6){m=ta()|0;n=d|0;k=0;while(1){if(k>>>0>=8>>>0){j=-1;l=10;break}o=k+m&7;p=d+36880+(o*51|0)|0;if((de((c[n>>2]|0)+14900|0,p,e)|0)==2){break}else{k=k+1|0}}if((l|0)==10){i=g;return j|0}Kh(p|0,e|0,32)|0;Cd(d+36880+(o*51|0)+32|0,f);j=0;i=g;return j|0}else if((l|0)==10){i=g;return j|0}return 0}function Td(a){a=a|0;var b=0,d=0;b=a+37288|0;if((_d(c[b>>2]|0,c[b+4>>2]|0,3,0)|0)==0){return}d=Zd()|0;c[b>>2]=d;c[b+4>>2]=E;b=a+36912|0;d=b|0;if((zd(d)|0)==0){return}Qd(a,b,a+36880|0)|0;xd(d);d=a+36963|0;b=d|0;if((zd(b)|0)==0){return}Qd(a,d,a+36931|0)|0;xd(b);b=a+37014|0;d=b|0;if((zd(d)|0)==0){return}Qd(a,b,a+36982|0)|0;xd(d);d=a+37065|0;b=d|0;if((zd(b)|0)==0){return}Qd(a,d,a+37033|0)|0;xd(b);b=a+37116|0;d=b|0;if((zd(d)|0)==0){return}Qd(a,b,a+37084|0)|0;xd(d);d=a+37167|0;b=d|0;if((zd(b)|0)==0){return}Qd(a,d,a+37135|0)|0;xd(b);b=a+37218|0;d=b|0;if((zd(d)|0)==0){return}Qd(a,b,a+37186|0)|0;xd(d);d=a+37269|0;b=d|0;if((zd(b)|0)==0){return}Qd(a,d,a+37237|0)|0;xd(b);return}function Ud(a){a=a|0;var b=0,d=0,e=0,f=0;b=Fh(1,37296)|0;if((b|0)==0){d=0;return d|0}c[b>>2]=a;e=a+4|0;f=a;md(c[e>>2]|0,0,2,f);md(c[e>>2]|0,1,28,f);d=b;return d|0}function Vd(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;h=i;i=i+160|0;j=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[e+12>>2]=c[j+12>>2];b[e+16>>1]=b[j+16>>1]|0;a[e+18|0]=a[j+18|0]|0;j=h|0;k=h+8|0;l=h+96|0;m=h+120|0;if((g|0)!=81){n=1;i=h;return n|0}g=c[d+178816>>2]|0;o=f+1|0;p=g|0;if($d(o,(c[p>>2]|0)+14900|0)|0){n=1;i=h;return n|0}q=h+128|0;fe(d,q,o);if((Bf(q,f+33|0,f+57|0,24,m)|0)!=8){n=1;i=h;return n|0}f=c[m>>2]|0;d=c[m+4>>2]|0;Kh(l|0,e|0,19)|0;m=k|0;c[j>>2]=f;c[j+4>>2]=d;do{if(!($d(o,(c[p>>2]|0)+14900|0)|0)){a[m]=1;ae(k+1|0,(c[p>>2]|0)+14900|0)|0;d=k+33|0;If(d);if((Af(q,d,j,8,k+57|0)|0)!=24){break}ld(c[(c[p>>2]|0)+4>>2]|0,l,m,81)|0}}while(0);Sd(g,o,e)|0;n=0;i=h;return n|0}function Wd(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0;h=i;i=i+8|0;j=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[e+12>>2]=c[j+12>>2];b[e+16>>1]=b[j+16>>1]|0;a[e+18|0]=a[j+18|0]|0;j=h|0;if((g|0)!=81){k=1;i=h;return k|0}g=c[d+178816>>2]|0;l=f+1|0;if($d(l,(c[g>>2]|0)+14900|0)|0){k=1;i=h;return k|0}m=Rd(g,e)|0;if((m|0)==0){k=1;i=h;return k|0}n=m-1|0;if((Bf(g+8+(n*72|0)+40|0,f+33|0,f+57|0,24,j)|0)!=8){k=1;i=h;return k|0}f=g+8+(n*72|0)+24|0;if(!((c[f>>2]|0)==(c[j>>2]|0)&(c[f+4>>2]|0)==(c[j+4>>2]|0))){k=1;i=h;return k|0}me(d,e,l)|0;k=0;i=h;return k|0}function Xd(a){a=a|0;var b=0;b=a|0;md(c[(c[b>>2]|0)+4>>2]|0,0,0,0);md(c[(c[b>>2]|0)+4>>2]|0,1,0,0);Eh(a);return}function Yd(){var a=0;a=vb(0)|0;c[428]=a;c[429]=(a|0)<0|0?-1:0;return}function Zd(){return(E=c[429]|0,c[428]|0)|0}function _d(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=Nh(d,e,a,b)|0;b=E;a=c[429]|0;return b>>>0<=a>>>0&(b>>>0<a>>>0|f>>>0<=(c[428]|0)>>>0)&1|0}function $d(a,b){a=a|0;b=b|0;return(Mh(a|0,b|0,32)|0)==0|0}function ae(a,b){a=a|0;b=b|0;Kh(a|0,b|0,32)|0;return 32}function be(b,c){b=b|0;c=c|0;var d=0,e=0,f=0,g=0;d=i;e=c&65535;f=i;i=i+e|0;i=i+7&-8;if(c<<16>>16==0){Kh(b|0,f|0,e)|0;i=d;return}c=e-1|0;g=0;do{a[f+g|0]=a[b+(c-g)|0]|0;g=g+1|0;}while(g>>>0<e>>>0);Kh(b|0,f|0,e)|0;i=d;return}function ce(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;d=i;i=i+1856|0;e=d|0;if((b|0)<2){i=d;return}Kh(e|0,a+(((b|0)/2|0)*928|0)|0,928)|0;f=d+928|0;g=a+((b-1|0)*928|0)|0;h=a;a:while(1){j=g;while(1){if(h>>>0>j>>>0){break a}if((Kb[c&15](h,e)|0)==-1){k=j;break}l=j-928|0;if((Kb[c&15](j,e)|0)==1){j=l}else{m=8;break}}if((m|0)==8){m=0;n=h|0;Kh(f|0,n|0,928)|0;o=j|0;Kh(n|0,o|0,928)|0;Kh(o|0,f|0,928)|0;k=l}g=k;h=h+928|0}ce(a,((j-a|0)/928|0)+1|0,c);ce(h,(a+(b*928|0)-h|0)/928|0,c);i=d;return}function de(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=0;while(1){if(e>>>0>=32>>>0){f=0;g=5;break}h=a[b+e|0]|0;i=a[c+e|0]^h;j=i<<24>>24;k=a[d+e|0]^h;h=k<<24>>24;l=(i<<24>>24>-1?j:-j|0)&255;j=(k<<24>>24>-1?h:-h|0)&255;if(l>>>0<j>>>0){f=1;g=5;break}if(l>>>0>j>>>0){f=2;g=5;break}else{e=e+1|0}}if((g|0)==5){return f|0}return 0}function ee(b,e,f,g){b=b|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;h=g+30|0;i=d[h]<<2;do{if((a[b+(i*80|0)+68|0]|0)==0){j=i;k=0;l=6}else{if((Mh(g|0,b+(i*80|0)|0,32)|0)==0){m=i;break}n=b+(i*80|0)+72|0;if((_d(c[n>>2]|0,c[n+4>>2]|0,600,0)|0)!=0){j=i;k=0;l=6;break}n=c[b+(i*80|0)+64>>2]|0;j=(n|0)!=-1?i:0;k=n;l=6}}while(0);a:do{if((l|0)==6){i=d[h]<<2|1;do{if((a[b+(i*80|0)+68|0]|0)==0){o=(k|0)==0?j:i;p=0}else{if((Mh(g|0,b+(i*80|0)|0,32)|0)==0){m=i;break a}if((k|0)==0){o=j;p=0;break}n=b+(i*80|0)+72|0;if((_d(c[n>>2]|0,c[n+4>>2]|0,600,0)|0)!=0){o=i;p=0;break}n=c[b+(i*80|0)+64>>2]|0;q=k>>>0>n>>>0;o=q?i:j;p=q?n:k}}while(0);i=d[h]<<2|2;do{if((a[b+(i*80|0)+68|0]|0)==0){r=(p|0)==0?o:i;s=0}else{if((Mh(g|0,b+(i*80|0)|0,32)|0)==0){m=i;break a}if((p|0)==0){r=o;s=0;break}n=b+(i*80|0)+72|0;if((_d(c[n>>2]|0,c[n+4>>2]|0,600,0)|0)!=0){r=i;s=0;break}n=c[b+(i*80|0)+64>>2]|0;q=p>>>0>n>>>0;r=q?i:o;s=q?n:p}}while(0);i=d[h]<<2|3;do{if((a[b+(i*80|0)+68|0]|0)==0){t=(s|0)==0?r:i;l=25}else{if((Mh(g|0,b+(i*80|0)|0,32)|0)==0){m=i;break a}if((s|0)==0){t=r;l=25;break}n=b+(i*80|0)+72|0;if((_d(c[n>>2]|0,c[n+4>>2]|0,600,0)|0)!=0){t=i;l=25;break}n=c[b+(i*80|0)+64>>2]|0;q=s>>>0>n>>>0;zf(g,f,e);if(((q?n:s)|0)!=-1){u=q?i:r;break}return}}while(0);if((l|0)==25){zf(g,f,e);u=t}a[b+(u*80|0)+68|0]=1;c[b+(u*80|0)+64>>2]=1;Kh(b+(u*80|0)|0,g|0,32)|0;Kh(b+(u*80|0)+32|0,e|0,32)|0;i=Zd()|0;q=b+(u*80|0)+72|0;c[q>>2]=i;c[q+4>>2]=E;return}}while(0);Kh(e|0,b+(m*80|0)+32|0,32)|0;e=b+(m*80|0)+64|0;c[e>>2]=(c[e>>2]|0)+1;e=Zd()|0;u=b+(m*80|0)+72|0;c[u>>2]=e;c[u+4>>2]=E;return}function fe(a,b,c){a=a|0;b=b|0;c=c|0;ee(a+14976|0,b,a+14932|0,c);return}function ge(a,b,c){a=a|0;b=b|0;c=c|0;ee(a+96896|0,b,a+14932|0,c);return}function he(b){b=b|0;var c=0;c=b|0;b=a[c]|0;if((b<<24>>24|0)==2){a[c]=2;return}else if((b<<24>>24|0)==10){a[c]=10;return}else{return}}function ie(b){b=b|0;var c=0;c=b|0;b=a[c]|0;if((b<<24>>24|0)==10){a[c]=10;return}else if((b<<24>>24|0)==2){a[c]=2;return}else{return}}function je(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;g=f&65535;if(f<<16>>16==0){h=0;return h|0}f=c&65535;c=0;i=0;while(1){j=e+(i*51|0)|0;k=a[e+(i*51|0)+32|0]|0;if((k<<24>>24|0)==2){l=c+39|0;if(l>>>0>f>>>0){h=-1;m=9;break}a[b+c|0]=2;n=e+(i*51|0)+33|0;o=b+(c+1)|0;w=d[n]|d[n+1|0]<<8|d[n+2|0]<<16|d[n+3|0]<<24|0;a[o]=w;w=w>>8;a[o+1|0]=w;w=w>>8;a[o+2|0]=w;w=w>>8;a[o+3|0]=w;o=e+(i*51|0)+49|0;n=b+(c+5)|0;w=(d[o]|d[o+1|0]<<8)<<16>>16;a[n]=w;w=w>>8;a[n+1|0]=w;Kh(b+(c+7)|0,j|0,32)|0;p=l}else if((k<<24>>24|0)==10){k=c+51|0;if(k>>>0>f>>>0){h=-1;m=9;break}a[b+c|0]=10;Kh(b+(c+1)|0,e+(i*51|0)+33|0,16)|0;l=e+(i*51|0)+49|0;n=b+(c+17)|0;w=(d[l]|d[l+1|0]<<8)<<16>>16;a[n]=w;w=w>>8;a[n+1|0]=w;Kh(b+(c+19)|0,j|0,32)|0;p=k}else{h=-1;m=9;break}k=i+1|0;if(k>>>0<g>>>0){c=p;i=k}else{h=p;m=9;break}}if((m|0)==9){return h|0}return 0}function ke(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;g=f&65535;h=c&65535;if(c<<16>>16!=0&f<<16>>16!=0){i=0;j=0}else{k=0;return k|0}while(1){f=a[e+i|0]|0;if((f<<24>>24|0)==2){c=i+39|0;if(c>>>0>g>>>0){k=-1;l=8;break}a[b+(j*51|0)+32|0]=2;m=e+(i+1)|0;n=b+(j*51|0)+33|0;w=d[m]|d[m+1|0]<<8|d[m+2|0]<<16|d[m+3|0]<<24|0;a[n]=w;w=w>>8;a[n+1|0]=w;w=w>>8;a[n+2|0]=w;w=w>>8;a[n+3|0]=w;n=b+(j*51|0)+49|0;m=e+(i+5)|0;w=(d[m]|d[m+1|0]<<8)<<16>>16;a[n]=w;w=w>>8;a[n+1|0]=w;Kh(b+(j*51|0)|0,e+(i+7)|0,32)|0;o=c}else if((f<<24>>24|0)==10){f=i+51|0;if(f>>>0>g>>>0){k=-1;l=8;break}a[b+(j*51|0)+32|0]=10;Kh(b+(j*51|0)+33|0,e+(i+1)|0,16)|0;c=b+(j*51|0)+49|0;n=e+(i+17)|0;w=(d[n]|d[n+1|0]<<8)<<16>>16;a[c]=w;w=w>>8;a[c+1|0]=w;Kh(b+(j*51|0)|0,e+(i+19)|0,32)|0;o=f}else{k=-1;l=8;break}f=j+1|0;if(f>>>0<h>>>0&o>>>0<g>>>0){i=o;j=f}else{k=f;l=8;break}}if((l|0)==8){return k|0}return 0}function le(a,d,f,g,h,j){a=a|0;d=d|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0;k=i;i=i+8|0;l=k|0;Jh(f|0,0,408)|0;c[l>>2]=0;Re(d,f,g,a+8|0,32,l,h,j);j=a+14968|0;if((b[j>>1]|0)==0){m=c[l>>2]|0;i=k;return m|0}n=a+14964|0;a=0;do{Re(d,f,g,(c[n>>2]|0)+(a*3808|0)+32|0,8,l,h,0);a=a+1|0;}while(a>>>0<(e[j>>1]|0)>>>0);m=c[l>>2]|0;i=k;return m|0}function me(f,g,h){f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;j=i;i=i+120|0;k=g;g=i;i=i+19|0;i=i+7&-8;c[g>>2]=c[k>>2];c[g+4>>2]=c[k+4>>2];c[g+8>>2]=c[k+8>>2];c[g+12>>2]=c[k+12>>2];b[g+16>>1]=b[k+16>>1]|0;a[g+18|0]=a[k+18|0]|0;k=j|0;l=j+24|0;m=j+48|0;n=j+72|0;o=j+96|0;p=g|0;do{if((a[p]|0)==10){q=g+1|0;r=q;if((c[r>>2]|0)!=0){break}if((c[r+4>>2]|0)!=0){break}s=q;if((a[g+9|0]|0)!=0){break}if((a[s+9|0]|0)!=0){break}if((a[s+10|0]|0)!=-1){break}if((a[s+11|0]|0)!=-1){break}a[p]=2;s=q+12|0;w=d[s]|d[s+1|0]<<8|d[s+2|0]<<16|d[s+3|0]<<24|0;a[r]=w;w=w>>8;a[r+1|0]=w;w=w>>8;a[r+2|0]=w;w=w>>8;a[r+3|0]=w}}while(0);r=f+8|0;a:do{if((ne(r,32,h,g)|0)==0){s=a[p]|0;q=g+1|0;t=o|0;Kh(t|0,q|0,18)|0;do{if((s<<24>>24|0)==2|(s<<24>>24|0)==10){u=0;while(1){v=f+8+(u*464|0)+56|0;if((_d(c[v>>2]|0,c[v+4>>2]|0,122,0)|0)!=0){x=f+8+(u*464|0)+32|0;y=f+8+(u*464|0)+248|0;v=f+8+(u*464|0)+272|0;if((_d(c[v>>2]|0,c[v+4>>2]|0,122,0)|0)!=0){z=14;break}}v=u+1|0;if(v>>>0<32>>>0){u=v}else{z=15;break}}if((z|0)==14){v=s<<24>>24==2;A=v?x:y;Kh(f+8+(u*464|0)|0,h|0,32)|0;a[A|0]=s;Kh(A+1|0,t|0,18)|0;B=Zd()|0;C=A+24|0;c[C>>2]=B;c[C+4>>2]=E;xd(A+184|0);C=A+201|0;w=0;a[C]=w;w=w>>8;a[C+1|0]=w;C=A+208|0;c[C>>2]=0;c[C+4>>2]=0;Jh((v?y:x)|0,0,216)|0;D=1;break a}else if((z|0)==15){F=a[p]|0;break}}else{F=s}}while(0);s=n|0;Kh(s|0,q|0,18)|0;do{if((F<<24>>24|0)==2|(F<<24>>24|0)==10){Pe(r,32,f+14900|0);t=0;while(1){if((((a[f+8+(t*464|0)+120|0]<<1)+(a[f+8+(t*464|0)+72|0]|0)&255)+(a[f+8+(t*464|0)+168|0]<<2)&255)<<24>>24!=2){G=f+8+(t*464|0)+32|0;H=f+8+(t*464|0)+248|0;if((((a[f+8+(t*464|0)+336|0]<<1)+(a[f+8+(t*464|0)+288|0]|0)&255)+(a[f+8+(t*464|0)+384|0]<<2)&255)<<24>>24!=2){z=21;break}}v=t+1|0;if(v>>>0<32>>>0){t=v}else{z=22;break}}if((z|0)==21){u=F<<24>>24==2;v=u?G:H;Kh(f+8+(t*464|0)|0,h|0,32)|0;a[v|0]=F;Kh(v+1|0,s|0,18)|0;C=Zd()|0;A=v+24|0;c[A>>2]=C;c[A+4>>2]=E;xd(v+184|0);A=v+201|0;w=0;a[A]=w;w=w>>8;a[A+1|0]=w;A=v+208|0;c[A>>2]=0;c[A+4>>2]=0;Jh((u?H:G)|0,0,216)|0;D=1;break a}else if((z|0)==22){I=a[p]|0;break}}else{I=F}}while(0);s=m|0;Kh(s|0,q|0,18)|0;if((I<<24>>24|0)==2|(I<<24>>24|0)==10){J=0}else{D=0;break}while(1){if(J>>>0>=32>>>0){D=0;break a}u=a[f+14900+J|0]|0;A=a[f+8+J|0]^u;v=A<<24>>24;C=a[h+J|0]^u;u=C<<24>>24;B=(A<<24>>24>-1?v:-v|0)&255;v=(C<<24>>24>-1?u:-u|0)&255;if(B>>>0<v>>>0){D=0;break a}if(B>>>0>v>>>0){break}else{J=J+1|0}}if(I<<24>>24==2){K=f+256|0;L=f+40|0}else{K=f+40|0;L=f+256|0}Kh(r|0,h|0,32)|0;a[L|0]=I;Kh(L+1|0,s|0,18)|0;q=Zd()|0;v=L+24|0;c[v>>2]=q;c[v+4>>2]=E;xd(L+184|0);v=L+201|0;w=0;a[v]=w;w=w>>8;a[v+1|0]=w;v=L+208|0;c[v>>2]=0;c[v+4>>2]=0;Jh(K|0,0,216)|0;D=1}else{D=1}}while(0);K=f+14968|0;if((b[K>>1]|0)==0){M=D;i=j;return M|0}L=f+14964|0;f=g+1|0;I=l|0;l=k|0;k=0;r=D;while(1){b:do{if((ne((c[L>>2]|0)+(k*3808|0)+32|0,8,h,g)|0)==0){D=c[L>>2]|0;J=a[p]|0;Kh(I|0,f|0,18)|0;do{if((J<<24>>24|0)==2|(J<<24>>24|0)==10){m=0;while(1){F=D+(k*3808|0)+32+(m*464|0)+56|0;if((_d(c[F>>2]|0,c[F+4>>2]|0,122,0)|0)!=0){N=D+(k*3808|0)+32+(m*464|0)+32|0;O=D+(k*3808|0)+32+(m*464|0)+248|0;F=D+(k*3808|0)+32+(m*464|0)+272|0;if((_d(c[F>>2]|0,c[F+4>>2]|0,122,0)|0)!=0){z=49;break}}F=m+1|0;if(F>>>0<8>>>0){m=F}else{z=38;break}}if((z|0)==38){z=0;P=c[L>>2]|0;Q=a[p]|0;break}else if((z|0)==49){z=0;F=J<<24>>24==2;G=F?N:O;Kh(D+(k*3808|0)+32+(m*464|0)|0,h|0,32)|0;a[G|0]=J;Kh(G+1|0,I|0,18)|0;H=Zd()|0;n=G+24|0;c[n>>2]=H;c[n+4>>2]=E;xd(G+184|0);n=G+201|0;w=0;a[n]=w;w=w>>8;a[n+1|0]=w;n=G+208|0;c[n>>2]=0;c[n+4>>2]=0;Jh((F?O:N)|0,0,216)|0;R=r+1|0;break b}}else{P=D;Q=J}}while(0);J=P+(k*3808|0)+32|0;Kh(l|0,f|0,18)|0;c:do{if((Q<<24>>24|0)==2|(Q<<24>>24|0)==10){Pe(J,8,P+(k*3808|0)|0);D=0;while(1){if(D>>>0>=32>>>0){S=0;break c}t=a[P+(k*3808|0)+D|0]|0;F=a[P+(k*3808|0)+32+D|0]^t;n=F<<24>>24;G=a[h+D|0]^t;t=G<<24>>24;H=(F<<24>>24>-1?n:-n|0)&255;n=(G<<24>>24>-1?t:-t|0)&255;if(H>>>0<n>>>0){S=0;break c}if(H>>>0>n>>>0){break}else{D=D+1|0}}if(Q<<24>>24==2){T=P+(k*3808|0)+280|0;U=P+(k*3808|0)+64|0}else{T=P+(k*3808|0)+64|0;U=P+(k*3808|0)+280|0}Kh(J|0,h|0,32)|0;a[U|0]=Q;Kh(U+1|0,l|0,18)|0;D=Zd()|0;m=U+24|0;c[m>>2]=D;c[m+4>>2]=E;xd(U+184|0);m=U+201|0;w=0;a[m]=w;w=w>>8;a[m+1|0]=w;m=U+208|0;c[m>>2]=0;c[m+4>>2]=0;Jh(T|0,0,216)|0;S=1}else{S=0}}while(0);R=S+r|0}else{R=r+1|0}}while(0);s=k+1|0;if(s>>>0<(e[K>>1]|0)>>>0){k=s;r=R}else{M=R;break}}i=j;return M|0}function ne(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;h=i;j=g;g=i;i=i+19|0;i=i+7&-8;c[g>>2]=c[j>>2];c[g+4>>2]=c[j+4>>2];c[g+8>>2]=c[j+8>>2];c[g+12>>2]=c[j+12>>2];b[g+16>>1]=b[j+16>>1]|0;a[g+18|0]=a[j+18|0]|0;j=Zd()|0;k=E;l=0;while(1){if(l>>>0>=e>>>0){break}if($d(d+(l*464|0)|0,f)|0){m=6;break}else{l=l+1|0}}if((m|0)==6){n=g|0;o=g|0;p=a[o]|0;if((p<<24>>24|0)==10){q=d+(l*464|0)+248|0;do{if((Hc(q|0)|0)!=0){if((Hc(n)|0)==0){r=1}else{break}i=h;return r|0}}while(0);Kh(q|0,o|0,19)|0;q=d+(l*464|0)+272|0;c[q>>2]=j;c[q+4>>2]=k;r=1;i=h;return r|0}else if((p<<24>>24|0)==2){p=d+(l*464|0)+32|0;do{if((Hc(p|0)|0)!=0){if((Hc(n)|0)==0){r=1}else{break}i=h;return r|0}}while(0);Kh(p|0,o|0,19)|0;o=d+(l*464|0)+56|0;c[o>>2]=j;c[o+4>>2]=k;r=1;i=h;return r|0}else{r=1;i=h;return r|0}}if((e|0)==0){r=0;i=h;return r|0}o=g|0;l=0;while(1){p=a[o]|0;if(p<<24>>24==2){if((wd(d+(l*464|0)+32|0,g)|0)!=0){m=15;break}s=a[o]|0}else{s=p}if(s<<24>>24==10){if((wd(d+(l*464|0)+248|0,g)|0)!=0){m=19;break}}p=l+1|0;if(p>>>0<e>>>0){l=p}else{r=0;m=21;break}}if((m|0)==15){e=d+(l*464|0)+56|0;c[e>>2]=j;c[e+4>>2]=k;Kh(d+(l*464|0)|0,f|0,32)|0;Jh(d+(l*464|0)+248|0,0,216)|0;r=1;i=h;return r|0}else if((m|0)==19){e=d+(l*464|0)+272|0;c[e>>2]=j;c[e+4>>2]=k;Kh(d+(l*464|0)|0,f|0,32)|0;Jh(d+(l*464|0)+32|0,0,216)|0;r=1;i=h;return r|0}else if((m|0)==21){i=h;return r|0}return 0}function oe(a,d){a=a|0;d=d|0;var f=0,g=0,h=0,i=0,j=0,k=0;f=a+14968|0;g=a+14964|0;a=0;while(1){h=b[f>>1]|0;if(a>>>0>=(h&65535)>>>0){i=h;break}if($d((c[g>>2]|0)+(a*3808|0)|0,d)|0){j=4;break}else{a=a+1|0}}do{if((j|0)==4){if((a|0)==-1){i=b[f>>1]|0;break}else{k=1;return k|0}}}while(0);a=Gh(c[g>>2]|0,((i&65535)*3808|0)+3808|0)|0;i=a;if((a|0)==0){k=1;return k|0}c[g>>2]=i;a=i+((e[f>>1]|0)*3808|0)|0;Jh(a|0,0,3808)|0;Kh(a|0,d|0,32)|0;d=kd()|0;a=(c[g>>2]|0)+((e[f>>1]|0)*3808|0)+3792|0;c[a>>2]=d;c[a+4>>2]=E;b[f>>1]=(b[f>>1]|0)+1;k=0;return k|0}function pe(a,d){a=a|0;d=d|0;var f=0,g=0,h=0,i=0,j=0;f=a+14968|0;g=a+14964|0;a=0;while(1){if(a>>>0>=(e[f>>1]|0)>>>0){h=1;i=10;break}if($d((c[g>>2]|0)+(a*3808|0)|0,d)|0){break}else{a=a+1|0}}if((i|0)==10){return h|0}i=(b[f>>1]|0)-1&65535;b[f>>1]=i;d=i&65535;if((d|0)==(a|0)){j=i}else{i=c[g>>2]|0;Kh(i+(a*3808|0)|0,i+(d*3808|0)|0,3808)|0;j=b[f>>1]|0}f=c[g>>2]|0;if(j<<16>>16==0){Eh(f);c[g>>2]=0;h=0;return h|0}d=Gh(f,(j&65535)*3808|0)|0;if((d|0)==0){h=1;return h|0}c[g>>2]=d;h=0;return h|0}function qe(b,d,f){b=b|0;d=d|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0;xd(f|0);g=f+17|0;w=0;a[g]=w;w=w>>8;a[g+1|0]=w;g=b+14968|0;h=b+14964|0;b=0;while(1){if(b>>>0>=(e[g>>1]|0)>>>0){i=-1;j=9;break}if($d((c[h>>2]|0)+(b*3808|0)|0,d)|0){k=0;break}else{b=b+1|0}}if((j|0)==9){return i|0}while(1){g=c[h>>2]|0;if($d(g+(b*3808|0)+32+(k*464|0)|0,d)|0){l=g+(b*3808|0)+32+(k*464|0)+272|0;if((_d(c[l>>2]|0,c[l+4>>2]|0,122,0)|0)==0){m=g+(b*3808|0)+32+(k*464|0)+248|0;break}l=g+(b*3808|0)+32+(k*464|0)+56|0;if((_d(c[l>>2]|0,c[l+4>>2]|0,122,0)|0)==0){m=g+(b*3808|0)+32+(k*464|0)+32|0;break}}g=k+1|0;if(g>>>0<8>>>0){k=g}else{i=0;j=9;break}}if((j|0)==9){return i|0}Kh(f|0,m|0,19)|0;i=1;return i|0}function re(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;se(a,b,c,d,0)|0;return}function se(d,e,f,g,h){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;j=i;i=i+1056|0;k=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[k>>2];c[e+4>>2]=c[k+4>>2];c[e+8>>2]=c[k+8>>2];c[e+12>>2]=c[k+12>>2];b[e+16>>1]=b[k+16>>1]|0;a[e+18|0]=a[k+18|0]|0;k=j|0;l=j+152|0;m=j+328|0;n=j+384|0;o=j+640|0;p=d+14900|0;if($d(f,p)|0){q=-1;i=j;return q|0}r=k|0;Jh(r|0,0,150)|0;s=j+304|0;If(s);t=l|0;Kh(t|0,s|0,24)|0;u=Zd()|0;v=k;c[v>>2]=u;c[v+4>>2]=E;v=m|0;Kh(v|0,f|0,32)|0;Kh(m+32|0,e|0,19)|0;Kh(k+8|0,v|0,51)|0;v=k+59|0;if((h|0)==0){Jh(v|0,0,51)|0}else{Kh(v|0,h|0,51)|0}if((Ef(d+14868|0,s,r,110,l+24|0)|0)!=126){q=-1;i=j;return q|0}l=o|0;Kh(l|0,g|0,32)|0;Kh(o+32|0,t|0,150)|0;t=j+1024|0;ee(d+96896|0,t,d+14932|0,f);f=j+824|0;if((Af(t,s,l,182,f)|0)!=198){q=-1;i=j;return q|0}l=n|0;a[l]=2;Kh(n+1|0,p|0,32)|0;Kh(n+33|0,s|0,24)|0;Kh(n+57|0,f|0,198)|0;q=ld(c[d+4>>2]|0,e,l,255)|0;i=j;return q|0}function te(d,e,f){d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;h=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];c[e+8>>2]=c[h+8>>2];c[e+12>>2]=c[h+12>>2];b[e+16>>1]=b[h+16>>1]|0;a[e+18|0]=a[h+18|0]|0;se(d,e,f,d+14900|0,0)|0;i=g;return}function ue(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;i=i+96|0;h=g|0;j=g+24|0;k=g+48|0;l=g+72|0;m=k|0;yd(m,d);if(d<<24>>24==0){n=0}else{a[k|0]=0;d=l|0;xd(d);n=d}if((Ed(c,m,n)|0)==0){o=0;i=g;return o|0}m=k+17|0;w=e;a[m]=w;w=w>>8;a[m+1|0]=w;Kh(j|0,k|0,19)|0;k=b+14900|0;se(b,j,f,k,0)|0;if((n|0)==0){o=1;i=g;return o|0}if((zd(n)|0)==0){o=1;i=g;return o|0}n=l+17|0;w=e;a[n]=w;w=w>>8;a[n+1|0]=w;Kh(h|0,l|0,19)|0;se(b,h,f,k,0)|0;o=1;i=g;return o|0}function ve(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=0;while(1){if(f>>>0>=32>>>0){g=-1;h=8;break}if($d(b,a+8+(f*464|0)|0)|0){break}else{f=f+1|0}}if((h|0)==8){return g|0}h=a+8+(f*464|0)+248|0;if((zd(h|0)|0)!=0){g=ld(c[a+4>>2]|0,h,d,e)|0;return g|0}h=a+8+(f*464|0)+32|0;if((zd(h|0)|0)==0){g=-1;return g|0}g=ld(c[a+4>>2]|0,h,d,e)|0;return g|0}function we(b,d,f,g){b=b|0;d=d|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;h=i;i=i+8|0;j=h|0;k=j;l=i;i=i+152|0;m=b+14968|0;n=b+14964|0;o=0;while(1){if(o>>>0>=(e[m>>1]|0)>>>0){p=0;q=13;break}if($d((c[n>>2]|0)+(o*3808|0)|0,d)|0){break}else{o=o+1|0}}if((q|0)==13){i=h;return p|0}if((o|0)==-1){p=0;i=h;return p|0}c[j>>2]=0;c[j+4>>2]=0;if((xe(b,l|0,o&65535)|0)<2){p=0;i=h;return p|0}l=c[n>>2]|0;n=b+4|0;b=0;j=0;while(1){q=k+j|0;do{if((a[q]|0)==0){if((zd(l+(o*3808|0)+32+(j*464|0)+216|0)|0)==0){r=b;break}d=l+(o*3808|0)+32+(j*464|0)+240|0;if((_d(c[d>>2]|0,c[d+4>>2]|0,122,0)|0)!=0){r=b;break}if((ld(c[n>>2]|0,l+(o*3808|0)+32+(j*464|0)+32|0,f,g)|0)!=(g|0)){r=b;break}a[q]=1;r=b+1|0}else{r=b}}while(0);q=j+1|0;if(q>>>0<8>>>0){b=r;j=q}else{s=r;t=0;break}}while(1){r=k+t|0;do{if((a[r]|0)==0){if((zd(l+(o*3808|0)+32+(t*464|0)+432|0)|0)==0){u=s;break}j=l+(o*3808|0)+32+(t*464|0)+456|0;if((_d(c[j>>2]|0,c[j+4>>2]|0,122,0)|0)!=0){u=s;break}if((ld(c[n>>2]|0,l+(o*3808|0)+32+(t*464|0)+248|0,f,g)|0)!=(g|0)){u=s;break}a[r]=1;u=s+1|0}else{u=s}}while(0);r=t+1|0;if(r>>>0<8>>>0){s=u;t=r}else{p=u;break}}i=h;return p|0}function xe(a,b,d){a=a|0;b=b|0;d=d|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;f=i;i=i+304|0;g=f|0;h=f+152|0;if((e[a+14968>>1]|0)>>>0<=(d&65535)>>>0){j=-1;i=f;return j|0}k=d&65535;d=c[a+14964>>2]|0;a=d+(k*3808|0)|0;l=0;m=0;n=0;while(1){o=d+(k*3808|0)+32+(n*464|0)+216|0;do{if((zd(o|0)|0)==0){p=l}else{q=d+(k*3808|0)+32+(n*464|0)+240|0;if((_d(c[q>>2]|0,c[q+4>>2]|0,122,0)|0)!=0){p=l;break}Kh(g+(l*19|0)|0,o|0,19)|0;p=l+1|0}}while(0);o=d+(k*3808|0)+32+(n*464|0)+432|0;do{if((zd(o|0)|0)==0){r=m}else{q=d+(k*3808|0)+32+(n*464|0)+456|0;if((_d(c[q>>2]|0,c[q+4>>2]|0,122,0)|0)!=0){r=m;break}Kh(h+(m*19|0)|0,o|0,19)|0;r=m+1|0}}while(0);if($d(d+(k*3808|0)+32+(n*464|0)|0,a)|0){o=d+(k*3808|0)+32+(n*464|0)+272|0;if((_d(c[o>>2]|0,c[o+4>>2]|0,122,0)|0)==0){j=0;s=16;break}o=d+(k*3808|0)+32+(n*464|0)+56|0;if((_d(c[o>>2]|0,c[o+4>>2]|0,122,0)|0)==0){j=0;s=16;break}}o=n+1|0;if((o|0)<8){l=p;m=r;n=o}else{s=13;break}}if((s|0)==13){n=b|0;if((r|0)<(p|0)){Kh(n|0,g|0,p*19|0)|0;j=p;i=f;return j|0}else{Kh(n|0,h|0,r*19|0)|0;j=r;i=f;return j|0}}else if((s|0)==16){i=f;return j|0}return 0}function ye(a,d,f){a=a|0;d=d|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;i=i+40|0;h=g|0;j=g+8|0;k=i;i=i+408|0;l=j;c[j>>2]=ta()|0;c[j+4>>2]=ta()|0;c[j+8>>2]=ta()|0;c[j+12>>2]=ta()|0;c[j+16>>2]=ta()|0;c[j+20>>2]=ta()|0;c[j+24>>2]=ta()|0;c[j+28>>2]=ta()|0;j=k|0;m=k|0;Jh(j|0,0,408)|0;c[h>>2]=0;Re(l,m,f,d+8|0,32,h,1,0);n=d+14968|0;if((b[n>>1]|0)!=0){o=d+14964|0;d=0;do{Re(l,m,f,(c[o>>2]|0)+(d*3808|0)+32|0,8,h,1,0);d=d+1|0;}while(d>>>0<(e[n>>1]|0)>>>0)}n=c[h>>2]|0;if((n|0)==0){Kh(a|0,j|0,51)|0;i=g;return}else{Kh(a|0,k+((((ta()|0)>>>0)%(n>>>0)|0)*51|0)|0,51)|0;i=g;return}}function ze(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;if(d<<16>>16==0){e=0;return e|0}else{f=32;g=0}a:while(1){h=f;do{if((h|0)==0){e=g;i=11;break a}h=h-1|0;j=a+8+(h*464|0)+56|0;if((_d(c[j>>2]|0,c[j+4>>2]|0,122,0)|0)==0){k=a+8+(h*464|0)+32|0}else{k=0}j=a+8+(h*464|0)+248|0;l=a+8+(h*464|0)+272|0;do{if((_d(c[l>>2]|0,c[l+4>>2]|0,122,0)|0)==0){if((k|0)==0){m=j;break}n=((ta()|0)&1|0)==0;m=n?k:j}else{m=k}}while(0);}while((m|0)==0);j=g&65535;Kh(b+(j*51|0)|0,a+8+(h*464|0)|0,32)|0;Kh(b+(j*51|0)+32|0,m|0,19)|0;j=g+1&65535;if((j&65535)>>>0<(d&65535)>>>0){f=h;g=j}else{e=j;i=11;break}}if((i|0)==11){return e|0}return 0}function Ae(a,d,f){a=a|0;d=d|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;g=i;i=i+128|0;h=g|0;j=g+64|0;k=f&65535;if(f<<16>>16==0){l=0;i=g;return l|0}f=a+14968|0;if((b[f>>1]|0)==0){l=0;i=g;return l|0}m=a+14964|0;a=d+32|0;n=0;o=0;while(1){p=ta()|0;q=((p|0)%(e[f>>1]|0)|0)&65535;p=c[m>>2]|0;r=n&65535;if(n<<16>>16==0){s=0}else{s=(Hc(a)|0)!=0}t=0;u=0;while(1){v=p+(q*3808|0)+32+(u*464|0)|0;w=p+(q*3808|0)+32+(u*464|0)+248|0;x=p+(q*3808|0)+32+(u*464|0)+32|0;y=p+(q*3808|0)+32+(u*464|0)+272|0;z=(_d(c[y>>2]|0,c[y+4>>2]|0,122,0)|0)==0;do{if(s){do{if(z){if((Hc(w|0)|0)==0){A=t;break}c[h+(t<<2)>>2]=v;c[j+(t<<2)>>2]=w;A=t+1|0}else{A=t}}while(0);y=p+(q*3808|0)+32+(u*464|0)+56|0;if((_d(c[y>>2]|0,c[y+4>>2]|0,122,0)|0)!=0){B=A;break}if((Hc(x|0)|0)==0){B=A;break}c[h+(A<<2)>>2]=v;c[j+(A<<2)>>2]=x;B=A+1|0}else{if(z){c[h+(t<<2)>>2]=v;c[j+(t<<2)>>2]=w;C=t+1|0}else{C=t}y=p+(q*3808|0)+32+(u*464|0)+56|0;if((_d(c[y>>2]|0,c[y+4>>2]|0,122,0)|0)!=0){B=C;break}c[h+(C<<2)>>2]=v;c[j+(C<<2)>>2]=x;B=C+1|0}}while(0);x=u+1|0;if(x>>>0<8>>>0){t=B;u=x}else{break}}if((B|0)==0){D=0}else{u=((ta()|0)>>>0)%(B>>>0)|0;Kh(d+(r*51|0)+32|0,c[j+(u<<2)>>2]|0,19)|0;Kh(d+(r*51|0)|0,c[h+(u<<2)>>2]|0,32)|0;D=1}u=D+n&65535;t=o+1|0;if(t>>>0<k>>>0){n=u;o=t}else{l=u;break}}i=g;return l|0}function Be(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;d=i;i=i+1608|0;e=d+1024|0;f=d+1408|0;g=d+1496|0;h=d+1552|0;j=g+32|0;k=g|0;l=h+32|0;m=h|0;h=b+14900|0;n=f|0;o=f+51|0;f=d|0;p=e|0;q=e+1|0;e=b+14932|0;r=b+4|0;s=0;do{t=s>>>1;u=b+8+(t*464|0)|0;if((s&1|0)==0){v=2;w=b+8+(t*464|0)+32|0}else{v=10;w=b+8+(t*464|0)+248|0}t=w+24|0;do{if((_d(c[t>>2]|0,c[t+4>>2]|0,122,0)|0)==0){x=w+88|0;y=w+96|0;z=c[y>>2]|0;A=c[y+4>>2]|0;if((a[x]|0)!=0){if((_d(z,A,1200,0)|0)==0){break}a[x]=0;break}if((_d(z,A,120,0)|0)==0){break}ye(g,b,v);if((Ad(j)|0)==0){break}if($d(u,k)|0){break}Kh(l|0,w|0,19)|0;Kh(m|0,u|0,32)|0;Kh(n|0,m|0,51)|0;Kh(o|0,h|0,32)|0;Jh(p|0,0,384)|0;a[p]=2;Kh(q|0,n|0,83)|0;A=Lf(h,e,f,k,p,384,48)|0;if((A|0)==-1){break}if((ld(c[r>>2]|0,j,f,A)|0)<=0){break}Kh(w+104|0,k|0,32)|0;A=Zd()|0;c[y>>2]=A;c[y+4>>2]=E}}while(0);s=s+1|0;}while(s>>>0<64>>>0);i=d;return}function Ce(a){a=a|0;var d=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;d=i;i=i+32|0;Yd();if((a|0)==0){f=0;i=d;return f|0}g=Fh(1,178832)|0;h=g;if((g|0)==0){f=0;i=d;return f|0}j=g;c[j>>2]=a;k=g+4|0;c[k>>2]=c[c[a>>2]>>2];l=Ud(h)|0;m=g+178816|0;c[m>>2]=l;n=c[k>>2]|0;if((l|0)==0){md(n,2,0,0);md(c[k>>2]|0,3,0,0);md(c[k>>2]|0,4,0,0);Nf(c[j>>2]|0,-2,0,0);Nf(c[j>>2]|0,48,0,0);Xd(c[m>>2]|0);Eh(c[g+14964>>2]|0);Eh(g);f=0;i=d;return f|0}md(n,2,36,g);md(c[k>>2]|0,4,30,g);Uf(g);Nf(a,-2,6,g);Nf(a,48,4,g);Hf(g+14868|0);Kg(g+14900|0,g+14932|0)|0;a=d|0;k=g+14968|0;n=g+14964|0;g=0;while(1){Pg(a,32,0);m=0;while(1){j=b[k>>1]|0;if(m>>>0>=(j&65535)>>>0){o=j;p=11;break}if($d((c[n>>2]|0)+(m*3808|0)|0,a)|0){p=9;break}else{m=m+1|0}}do{if((p|0)==9){p=0;if((m|0)!=-1){break}o=b[k>>1]|0;p=11}}while(0);do{if((p|0)==11){p=0;m=Gh(c[n>>2]|0,((o&65535)*3808|0)+3808|0)|0;j=m;if((m|0)==0){break}c[n>>2]=j;m=j+((e[k>>1]|0)*3808|0)|0;Jh(m|0,0,3808)|0;Kh(m|0,a|0,32)|0;m=kd()|0;j=(c[n>>2]|0)+((e[k>>1]|0)*3808|0)+3792|0;c[j>>2]=m;c[j+4>>2]=E;b[k>>1]=(b[k>>1]|0)+1}}while(0);j=g+1|0;if(j>>>0<4>>>0){g=j}else{f=h;break}}i=d;return f|0}function De(a){a=a|0;var b=0;b=a+4|0;md(c[b>>2]|0,2,0,0);md(c[b>>2]|0,3,0,0);md(c[b>>2]|0,4,0,0);b=a|0;Nf(c[b>>2]|0,-2,0,0);Nf(c[b>>2]|0,48,0,0);Xd(c[a+178816>>2]|0);Eh(c[a+14964>>2]|0);Eh(a);return}function Ee(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0;h=i;i=i+216|0;j=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[e+12>>2]=c[j+12>>2];b[e+16>>1]=b[j+16>>1]|0;a[e+18|0]=a[j+18|0]|0;j=h|0;if((g|0)!=255){k=1;i=h;return k|0}g=f+1|0;if($d(g,d+14900|0)|0){k=1;i=h;return k|0}l=h+184|0;ee(d+14976|0,l,d+14932|0,g);m=j|0;if((Bf(l,f+33|0,f+57|0,198,m)|0)!=182){k=1;i=h;return k|0}Oe(d,e,g,m,j+32|0,l);Sd(c[d+178816>>2]|0,g,e)|0;k=0;i=h;return k|0}function Fe(f,g,h,j){f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0;k=i;i=i+416|0;l=g;g=i;i=i+19|0;i=i+7&-8;c[g>>2]=c[l>>2];c[g+4>>2]=c[l+4>>2];c[g+8>>2]=c[l+8>>2];c[g+12>>2]=c[l+12>>2];b[g+16>>1]=b[l+16>>1]|0;a[g+18|0]=a[l+18|0]|0;l=k|0;m=k+408|0;n=f;if((Me(f,g,h,j,l|0,m)|0)!=0){o=1;i=k;return o|0}j=c[m>>2]|0;if((j|0)==0){o=0;i=k;return o|0}m=f+178816|0;g=h+1|0;h=f+14900|0;p=f+14968|0;q=f+14964|0;f=0;while(1){r=l+(f*51|0)+32|0;a:do{if((Ad(r)|0)!=0){s=l+(f*51|0)|0;Qd(c[m>>2]|0,r,s)|0;t=r|0;u=a[t]|0;v=t+1|0;x=d[v]|d[v+1|0]<<8|d[v+2|0]<<16|d[v+3|0]<<24|0;v=t+5|0;y=d[v]|d[v+1|0]<<8|d[v+2|0]<<16|d[v+3|0]<<24|0;v=a[l+(f*51|0)+41|0]|0;z=a[t+10|0]|0;A=a[t+11|0]|0;B=a[t+12|0]|0;C=t+13|0;t=d[C]|d[C+1|0]<<8|d[C+2|0]<<16|d[C+3|0]<<24|0;C=l+(f*51|0)+49|0;D=(d[C]|d[C+1|0]<<8)<<16>>16;C=Zd()|0;F=E;do{if(u<<24>>24==10){if((x|0)!=0){G=10;H=x;break}if((y|0)!=0){G=10;H=0;break}I=(z|v)<<24>>24==0&A<<24>>24==-1&B<<24>>24==-1;G=I?2:10;H=I?t:0}else{G=u;H=x}}while(0);if($d(s,h)|0){x=0;while(1){if(x>>>0>=32>>>0){break a}if($d(g,n+8+(x*464|0)|0)|0){break}else{x=x+1|0}}if((G<<24>>24|0)==10){u=n+8+(x*464|0)+432|0;a[u]=G;I=u+1|0;w=H;a[I]=w;w=w>>8;a[I+1|0]=w;w=w>>8;a[I+2|0]=w;w=w>>8;a[I+3|0]=w;I=u+5|0;w=y;a[I]=w;w=w>>8;a[I+1|0]=w;w=w>>8;a[I+2|0]=w;w=w>>8;a[I+3|0]=w;a[u+9|0]=v;a[u+10|0]=z;a[u+11|0]=A;a[u+12|0]=B;I=u+13|0;w=t;a[I]=w;w=w>>8;a[I+1|0]=w;w=w>>8;a[I+2|0]=w;w=w>>8;a[I+3|0]=w;I=u+17|0;w=D;a[I]=w;w=w>>8;a[I+1|0]=w;I=n+8+(x*464|0)+456|0;c[I>>2]=C;c[I+4>>2]=F;break}else if((G<<24>>24|0)==2){I=n+8+(x*464|0)+216|0;a[I]=G;u=I+1|0;w=H;a[u]=w;w=w>>8;a[u+1|0]=w;w=w>>8;a[u+2|0]=w;w=w>>8;a[u+3|0]=w;u=I+5|0;w=y;a[u]=w;w=w>>8;a[u+1|0]=w;w=w>>8;a[u+2|0]=w;w=w>>8;a[u+3|0]=w;a[I+9|0]=v;a[I+10|0]=z;a[I+11|0]=A;a[I+12|0]=B;u=I+13|0;w=t;a[u]=w;w=w>>8;a[u+1|0]=w;w=w>>8;a[u+2|0]=w;w=w>>8;a[u+3|0]=w;u=I+17|0;w=D;a[u]=w;w=w>>8;a[u+1|0]=w;u=n+8+(x*464|0)+240|0;c[u>>2]=C;c[u+4>>2]=F;break}else{break}}if((b[p>>1]|0)==0){break}else{J=0}b:while(1){c:do{if($d(s,(c[q>>2]|0)+(J*3808|0)|0)|0){K=0;while(1){if(K>>>0>=8>>>0){break c}if($d(g,(c[q>>2]|0)+(J*3808|0)+32+(K*464|0)|0)|0){break b}else{K=K+1|0}}}}while(0);u=J+1|0;if(u>>>0<(e[p>>1]|0)>>>0){J=u}else{break a}}if((G<<24>>24|0)==2){s=(c[q>>2]|0)+(J*3808|0)+32+(K*464|0)+216|0;a[s]=G;x=s+1|0;w=H;a[x]=w;w=w>>8;a[x+1|0]=w;w=w>>8;a[x+2|0]=w;w=w>>8;a[x+3|0]=w;x=s+5|0;w=y;a[x]=w;w=w>>8;a[x+1|0]=w;w=w>>8;a[x+2|0]=w;w=w>>8;a[x+3|0]=w;a[s+9|0]=v;a[s+10|0]=z;a[s+11|0]=A;a[s+12|0]=B;x=s+13|0;w=t;a[x]=w;w=w>>8;a[x+1|0]=w;w=w>>8;a[x+2|0]=w;w=w>>8;a[x+3|0]=w;x=s+17|0;w=D;a[x]=w;w=w>>8;a[x+1|0]=w;x=(c[q>>2]|0)+(J*3808|0)+32+(K*464|0)+240|0;c[x>>2]=C;c[x+4>>2]=F;break}else if((G<<24>>24|0)==10){x=(c[q>>2]|0)+(J*3808|0)+32+(K*464|0)+432|0;a[x]=G;s=x+1|0;w=H;a[s]=w;w=w>>8;a[s+1|0]=w;w=w>>8;a[s+2|0]=w;w=w>>8;a[s+3|0]=w;s=x+5|0;w=y;a[s]=w;w=w>>8;a[s+1|0]=w;w=w>>8;a[s+2|0]=w;w=w>>8;a[s+3|0]=w;a[x+9|0]=v;a[x+10|0]=z;a[x+11|0]=A;a[x+12|0]=B;s=x+13|0;w=t;a[s]=w;w=w>>8;a[s+1|0]=w;w=w>>8;a[s+2|0]=w;w=w>>8;a[s+3|0]=w;s=x+17|0;w=D;a[s]=w;w=w>>8;a[s+1|0]=w;s=(c[q>>2]|0)+(J*3808|0)+32+(K*464|0)+456|0;c[s>>2]=C;c[s+4>>2]=F;break}else{break}}}while(0);r=f+1|0;if(r>>>0<j>>>0){f=r}else{o=0;break}}i=k;return o|0}function Ge(f,g,h,j,k){f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0;l=i;m=g;g=i;i=i+19|0;i=i+7&-8;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];c[g+8>>2]=c[m+8>>2];c[g+12>>2]=c[m+12>>2];b[g+16>>1]=b[m+16>>1]|0;a[g+18|0]=a[m+18|0]|0;if((k|0)!=9){n=1;i=l;return n|0}k=f;m=j+1|0;g=m|0;o=d[g]|d[g+1|0]<<8|d[g+2|0]<<16|d[g+3|0]<<24|0;g=m+4|0;m=d[g]|d[g+1|0]<<8|d[g+2|0]<<16|d[g+3|0]<<24|0;g=f+14968|0;p=f+14964|0;f=0;while(1){if(f>>>0>=(e[g>>1]|0)>>>0){n=1;q=10;break}if($d((c[p>>2]|0)+(f*3808|0)|0,h)|0){break}else{f=f+1|0}}if((q|0)==10){i=l;return n|0}if((f|0)==-1){n=1;i=l;return n|0}q=c[p>>2]|0;p=a[j]|0;if((p<<24>>24|0)==1){j=q+(f*3808|0)+3792|0;if(!((c[j>>2]|0)==(o|0)&(c[j+4>>2]|0)==(m|0))){n=1;i=l;return n|0}g=kd()|0;c[j>>2]=g;c[j+4>>2]=E;a[q+(f*3808|0)+3760|0]=1;n=0;i=l;return n|0}else if((p<<24>>24|0)==0){Ke(k,h,o,m,1);m=Zd()|0;o=q+(f*3808|0)+3784|0;c[o>>2]=m;c[o+4>>2]=E;n=0;i=l;return n|0}else{n=1;i=l;return n|0}return 0}function He(e,f,g,h,j){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;k=i;i=i+520|0;l=f;f=i;i=i+19|0;i=i+7&-8;c[f>>2]=c[l>>2];c[f+4>>2]=c[l+4>>2];c[f+8>>2]=c[l+8>>2];c[f+12>>2]=c[l+12>>2];b[f+16>>1]=b[l+16>>1]|0;a[f+18|0]=a[l+18|0]|0;l=k|0;m=k+56|0;n=k+112|0;o=e;if(j>>>0<2>>>0){p=1;i=k;return p|0}q=d[h]|0;if((q|0)==3){if((j-34|0)>>>0>407>>>0){p=1;i=k;return p|0}r=j+65503|0;s=h+1|0;t=r&65535;if((r&65535)<<16>>16==0){p=1;i=k;return p|0}else{u=0;v=0}while(1){r=a[h+(u+33)|0]|0;if((r<<24>>24|0)==10){x=u+51|0;if(x>>>0>t>>>0){p=1;y=40;break}a[n+(v*51|0)+32|0]=10;Kh(n+(v*51|0)+33|0,h+(u+34)|0,16)|0;z=n+(v*51|0)+49|0;A=h+(u+50)|0;w=(d[A]|d[A+1|0]<<8)<<16>>16;a[z]=w;w=w>>8;a[z+1|0]=w;Kh(n+(v*51|0)|0,h+(u+52)|0,32)|0;B=x}else if((r<<24>>24|0)==2){r=u+39|0;if(r>>>0>t>>>0){p=1;y=40;break}a[n+(v*51|0)+32|0]=2;x=h+(u+34)|0;z=n+(v*51|0)+33|0;w=d[x]|d[x+1|0]<<8|d[x+2|0]<<16|d[x+3|0]<<24|0;a[z]=w;w=w>>8;a[z+1|0]=w;w=w>>8;a[z+2|0]=w;w=w>>8;a[z+3|0]=w;z=n+(v*51|0)+49|0;x=h+(u+38)|0;w=(d[x]|d[x+1|0]<<8)<<16>>16;a[z]=w;w=w>>8;a[z+1|0]=w;Kh(n+(v*51|0)|0,h+(u+40)|0,32)|0;B=r}else{p=1;y=40;break}C=v+1|0;if(C>>>0<8>>>0&B>>>0<t>>>0){u=B;v=C}else{y=13;break}}if((y|0)==13){if((C|0)<1){p=1;i=k;return p|0}B=C&65535;if((C&65535)<<16>>16==0){D=0}else{C=e+14900|0;e=0;u=0;while(1){t=n+(e*51|0)|0;a:do{if($d(t,C)|0){E=u+1|0}else{r=d[n+(e*51|0)+32|0]|0;if((r<<16>>16|0)==10){z=0;while(1){if((Mh(o+8+(z*464|0)|0,t|0,32)|0)==0){break}x=z+1|0;if(x>>>0<32>>>0){z=x}else{E=u;break a}}F=o+8+(z*464|0)+248|0}else if((r<<16>>16|0)==2){x=0;while(1){if((Mh(o+8+(x*464|0)|0,t|0,32)|0)==0){break}A=x+1|0;if(A>>>0<32>>>0){x=A}else{E=u;break a}}F=o+8+(x*464|0)+32|0}else{E=u;break}if((F|0)==0){E=u;break}r=F+24|0;E=((_d(c[r>>2]|0,c[r+4>>2]|0,122,0)|0)==0)+u|0}}while(0);t=e+1|0;if(t>>>0<B>>>0){e=t;u=E}else{D=E;break}}}if(D>>>0<((v+3|0)/2|0)>>>0){p=1;i=k;return p|0}v=d[n+32|0]|0;do{if((v<<16>>16|0)==10){n=0;while(1){if((Mh(o+8+(n*464|0)|0,s|0,32)|0)==0){y=35;break}D=n+1|0;if(D>>>0<32>>>0){n=D}else{p=1;y=40;break}}if((y|0)==35){G=o+8+(n*464|0)+248|0;break}else if((y|0)==40){i=k;return p|0}}else if((v<<16>>16|0)==2){D=0;while(1){if((Mh(o+8+(D*464|0)|0,s|0,32)|0)==0){y=34;break}E=D+1|0;if(E>>>0<32>>>0){D=E}else{p=1;y=40;break}}if((y|0)==34){G=o+8+(D*464|0)+32|0;break}else if((y|0)==40){i=k;return p|0}}else{p=1;i=k;return p|0}}while(0);if((G|0)==0){p=1;i=k;return p|0}s=G+96|0;if((_d(c[s>>2]|0,c[s+4>>2]|0,120,0)|0)!=0){p=1;i=k;return p|0}if((Mh(G+104|0,g|0,32)|0)!=0){p=1;i=k;return p|0}a[G+88|0]=1;p=0;i=k;return p|0}else if((y|0)==40){i=k;return p|0}}else if((q|0)==2){if((j|0)!=384){p=1;i=k;return p|0}Kh(l+32|0,f|0,19)|0;Kh(l|0,g|0,32)|0;g=m|0;Kh(g|0,h+1|0,51)|0;p=(se(o,m+32|0,g,h+52|0,l)|0)==-1|0;i=k;return p|0}else{p=1;i=k;return p|0}return 0}function Ie(f){f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0;g=i;i=i+1392|0;h=g|0;j=g+24|0;k=g+48|0;l=g+72|0;m=g+96|0;n=g+120|0;o=g+144|0;p=g+160|0;q=g+176|0;r=g+1200|0;s=g+1352|0;t=g+1376|0;Yd();u=f+178824|0;v=c[u>>2]|0;x=c[u+4>>2]|0;y=Zd()|0;if((v|0)==(y|0)&(x|0)==(E|0)){i=g;return}x=f+14900|0;if((Le(f,f+14856|0,x,f+8|0,32,f+14864|0)|0)<<24>>24==0){y=Zd()|0;v=Nh(y,E,-122,-1)|0;y=E;z=0;do{A=f+8+(z*464|0)+56|0;if(!((c[A>>2]|0)==0&(c[A+4>>2]|0)==0)){c[A>>2]=v;c[A+4>>2]=y}A=f+8+(z*464|0)+272|0;if(!((c[A>>2]|0)==0&(c[A+4>>2]|0)==0)){c[A>>2]=v;c[A+4>>2]=y}z=z+1|0;}while(z>>>0<32>>>0)}z=f+14968|0;if((b[z>>1]|0)!=0){y=f+14964|0;v=0;do{A=c[y>>2]|0;Le(f,A+(v*3808|0)+3744|0,A+(v*3808|0)|0,A+(v*3808|0)+32|0,8,A+(v*3808|0)+3752|0)|0;v=v+1|0;}while(v>>>0<(e[z>>1]|0)>>>0)}v=l|0;y=m|0;A=s|0;B=Zd()|0;C=E;if((b[z>>1]|0)==0){D=f+178816|0}else{F=r|0;G=f+14964|0;H=p|0;I=q|0;q=p+1|0;p=f+14932|0;J=n|0;K=o;L=t|0;M=h|0;N=h+17|0;O=f+178816|0;P=k|0;Q=k+17|0;R=j|0;S=j+17|0;T=0;while(1){U=xe(f,F,T&65535)|0;do{if((U|0)>=4){V=c[G>>2]|0;W=V+(T*3808|0)+3800|0;X=Nh(c[W>>2]|0,c[W+4>>2]|0,3,0)|0;W=E;if(W>>>0<C>>>0|W>>>0==C>>>0&X>>>0<B>>>0){X=V+(T*3808|0)|0;W=V+(T*3808|0)+3792|0;Y=c[W>>2]|0;Z=c[W+4>>2]|0;a[H]=0;W=q|0;w=Y;a[W]=w;w=w>>8;a[W+1|0]=w;w=w>>8;a[W+2|0]=w;w=w>>8;a[W+3|0]=w;W=q+4|0;w=Z;a[W]=w;w=w>>8;a[W+1|0]=w;w=w>>8;a[W+2|0]=w;w=w>>8;a[W+3|0]=w;W=Lf(x,p,I,X,H,9,-2)|0;if((W|0)!=-1){we(f,X,I,W)|0}W=(c[G>>2]|0)+(T*3808|0)+3800|0;c[W>>2]=B;c[W+4>>2]=C;_=c[G>>2]|0}else{_=V}if((a[_+(T*3808|0)+3760|0]|0)!=1){break}V=_+(T*3808|0)+3776|0;W=Nh(c[V>>2]|0,c[V+4>>2]|0,3,0)|0;V=E;if(!(V>>>0<C>>>0|V>>>0==C>>>0&W>>>0<B>>>0)){break}W=_+(T*3808|0)+3784|0;V=Nh(c[W>>2]|0,c[W+4>>2]|0,6,0)|0;W=E;if(W>>>0<C>>>0|W>>>0==C>>>0&V>>>0<B>>>0){break}V=U&65535;xd(n);W=U&65535;do{if((V&65535)>>>0>8>>>0){Kh(A|0,J|0,17)|0}else{Jh(K|0,0,16)|0;X=V<<16>>16==0;Z=0;while(1){if(Z>>>0>=W>>>0){$=35;break}if(X){ba=o+(Z<<1)|0}else{Y=r+(Z*19|0)|0;ca=o+(Z<<1)|0;da=0;while(1){if((vd(Y,r+(da*19|0)|0)|0)!=0){b[ca>>1]=(b[ca>>1]|0)+1}ea=da+1|0;if(ea>>>0<W>>>0){da=ea}else{ba=ca;break}}}if((e[ba>>1]|0)>>>0>3>>>0){$=34;break}else{Z=Z+1|0}}if(($|0)==34){$=0;Kh(A|0,r+(Z*19|0)|0,17)|0;break}else if(($|0)==35){$=0;Kh(A|0,J|0,17)|0;break}}}while(0);if((zd(s)|0)==0){break}Kh(y|0,A|0,17)|0;if(V<<16>>16==0){fa=0}else{X=0;ca=0;while(1){if((vd(r+(X*19|0)|0,m)|0)==0){ga=ca}else{da=r+(X*19|0)+17|0;b[t+((ca&65535)<<1)>>1]=Ga((d[da]|d[da+1|0]<<8)<<16>>16|0)|0;ga=ca+1&65535}da=X+1|0;if(da>>>0<W>>>0){X=da;ca=ga}else{fa=ga;break}}}Kh(v|0,A|0,17)|0;ca=fa&65535;if(!((fa&65535)>>>0>8>>>0|fa<<16>>16==0)){X=T&65535;W=c[(c[G>>2]|0)+(X*3808|0)+3764>>2]|0;V=W+48|0;da=b[L>>1]|0;Y=0;while(1){if(Y>>>0>=ca>>>0){break}if(da<<16>>16==(b[t+(Y<<1)>>1]|0)){Y=Y+1|0}else{break}}if((Y|0)==(ca|0)){Bd(M,l);w=Ga(da|0)|0;a[N]=w;w=w>>8;a[N+1|0]=w;Qd(c[O>>2]|0,h,(c[G>>2]|0)+(X*3808|0)|0)|0}else{ea=ca<<1;ha=W;do{ia=(aa((ha<<1&2^2)-1|0,(ha>>>0)/(ea>>>0)|0)|0)+(e[t+(((ha>>>1>>>0)%(ca>>>0)|0)<<1)>>1]|0)&65535;Bd(R,l);w=Ga(ia|0)|0;a[S]=w;w=w>>8;a[S+1|0]=w;Qd(c[O>>2]|0,j,(c[G>>2]|0)+(X*3808|0)|0)|0;ha=ha+1|0;}while((ha|0)!=(V|0));c[(c[G>>2]|0)+(X*3808|0)+3764>>2]=V}ha=c[G>>2]|0;ca=c[ha+(X*3808|0)+3768>>2]|0;if(ca>>>0>5>>>0){ea=c[ha+(X*3808|0)+3772>>2]|0;W=ea+48|0;Bd(P,l);da=c[G>>2]|0;Y=c[da+(X*3808|0)+3772>>2]|0;if((Y|0)==(W|0)){ja=da}else{ia=Y;Y=da;while(1){w=Ga(ia+1024&65535|0)|0;a[Q]=w;w=w>>8;a[Q+1|0]=w;Qd(c[O>>2]|0,k,Y+(X*3808|0)|0)|0;da=ia+1|0;ka=c[G>>2]|0;if((da|0)==(W|0)){ja=ka;break}else{ia=da;Y=ka}}}c[ja+(X*3808|0)+3772>>2]=ea+24;Y=c[G>>2]|0;la=Y;ma=c[Y+(X*3808|0)+3768>>2]|0}else{la=ha;ma=ca}c[la+(X*3808|0)+3768>>2]=ma+1}Y=(c[G>>2]|0)+(T*3808|0)+3776|0;c[Y>>2]=B;c[Y+4>>2]=C;a[(c[G>>2]|0)+(T*3808|0)+3760|0]=0}}while(0);U=T+1|0;if(U>>>0<(e[z>>1]|0)>>>0){T=U}else{D=O;break}}}Td(c[D>>2]|0);Be(f);f=Zd()|0;c[u>>2]=f;c[u+4>>2]=E;i=g;return}function Je(a){a=a|0;var b=0,d=0,e=0,f=0;Yd();b=0;while(1){if(b>>>0>=32>>>0){d=0;e=5;break}f=a+8+(b*464|0)+56|0;if((_d(c[f>>2]|0,c[f+4>>2]|0,122,0)|0)==0){d=1;e=5;break}f=a+8+(b*464|0)+272|0;if((_d(c[f>>2]|0,c[f+4>>2]|0,122,0)|0)==0){d=1;e=5;break}else{b=b+1|0}}if((e|0)==5){return d|0}return 0}function Ke(b,d,f,g,h){b=b|0;d=d|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;j=i;i=i+1344|0;k=j|0;l=j+304|0;m=l|0;a[m]=h;n=l+1|0;l=n|0;w=f;a[l]=w;w=w>>8;a[l+1|0]=w;w=w>>8;a[l+2|0]=w;w=w>>8;a[l+3|0]=w;l=n+4|0;w=g;a[l]=w;w=w>>8;a[l+1|0]=w;w=w>>8;a[l+2|0]=w;w=w>>8;a[l+3|0]=w;l=j+320|0;g=Lf(b+14900|0,b+14932|0,l,d,m,9,-2)|0;if((g|0)==-1){i=j;return}if((h<<24>>24|0)==1){m=b+14968|0;n=b+14964|0;f=0;while(1){if(f>>>0>=(e[m>>1]|0)>>>0){o=19;break}if($d((c[n>>2]|0)+(f*3808|0)|0,d)|0){break}else{f=f+1|0}}if((o|0)==19){i=j;return}if((f|0)==-1){i=j;return}o=c[n>>2]|0;n=0;m=0;while(1){do{if((zd(o+(f*3808|0)+32+(m*464|0)+216|0)|0)==0){p=n}else{q=o+(f*3808|0)+32+(m*464|0)+240|0;if((_d(c[q>>2]|0,c[q+4>>2]|0,122,0)|0)!=0){p=n;break}Kh(k+(n*19|0)|0,o+(f*3808|0)+32+(m*464|0)+32|0,19)|0;p=n+1|0}}while(0);q=m+1|0;if(q>>>0<8>>>0){n=p;m=q}else{r=p;s=0;break}}while(1){do{if((zd(o+(f*3808|0)+32+(s*464|0)+432|0)|0)==0){t=r}else{p=o+(f*3808|0)+32+(s*464|0)+456|0;if((_d(c[p>>2]|0,c[p+4>>2]|0,122,0)|0)!=0){t=r;break}Kh(k+(r*19|0)|0,o+(f*3808|0)+32+(s*464|0)+248|0,19)|0;t=r+1|0}}while(0);p=s+1|0;if(p>>>0<8>>>0){r=t;s=p}else{break}}if((t|0)<1){i=j;return}s=c[b+4>>2]|0;ld(s,k+(((ta()|0)%(t|0)|0)*19|0)|0,l,g)|0;i=j;return}else if((h<<24>>24|0)==0){we(b,d,l,g)|0;i=j;return}else{i=j;return}}function Le(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;h=i;j=Zd()|0;k=E;l=f<<1;m=i;i=i+(l*4|0)|0;i=i+7&-8;n=i;i=i+(l*4|0)|0;i=i+7&-8;if((f|0)==0){o=0;i=h;return o|0}l=a+178816|0;p=0;q=0;r=0;while(1){s=e+(r*464|0)|0;t=e+(r*464|0)+248|0;u=s|0;v=e+(r*464|0)+32|0;w=e+(r*464|0)+272|0;do{if((_d(c[w>>2]|0,c[w+4>>2]|0,300,0)|0)==0){x=q+1&255;y=e+(r*464|0)+280|0;if((_d(c[y>>2]|0,c[y+4>>2]|0,60,0)|0)!=0){Qd(c[l>>2]|0,t|0,u)|0;c[y>>2]=j;c[y+4>>2]=k}if((_d(c[w>>2]|0,c[w+4>>2]|0,122,0)|0)!=0){z=x;A=p;break}c[m+(p<<2)>>2]=s;c[n+(p<<2)>>2]=t;z=x;A=p+1|0}else{z=q;A=p}}while(0);t=e+(r*464|0)+56|0;do{if((_d(c[t>>2]|0,c[t+4>>2]|0,300,0)|0)==0){w=z+1&255;x=e+(r*464|0)+64|0;if((_d(c[x>>2]|0,c[x+4>>2]|0,60,0)|0)!=0){Qd(c[l>>2]|0,v|0,u)|0;c[x>>2]=j;c[x+4>>2]=k}if((_d(c[t>>2]|0,c[t+4>>2]|0,122,0)|0)!=0){B=w;C=A;break}c[m+(A<<2)>>2]=s;c[n+(A<<2)>>2]=v;B=w;C=A+1|0}else{B=z;C=A}}while(0);v=r+1|0;if(v>>>0<f>>>0){p=C;q=B;r=v}else{break}}if((C|0)==0){o=B;i=h;return o|0}do{if((_d(c[b>>2]|0,c[b+4>>2]|0,20,0)|0)==0){if((c[g>>2]|0)>>>0<10>>>0){break}else{o=B}i=h;return o|0}}while(0);r=((ta()|0)>>>0)%(C>>>0)|0;se(a,c[n+(r<<2)>>2]|0,c[m+(r<<2)>>2]|0,d,0)|0;c[b>>2]=j;c[b+4>>2]=k;c[g>>2]=(c[g>>2]|0)+1;o=B;i=h;return o|0}function Me(e,f,g,h,j,k){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;l=i;i=i+320|0;m=f;f=i;i=i+19|0;i=i+7&-8;c[f>>2]=c[m>>2];c[f+4>>2]=c[m+4>>2];c[f+8>>2]=c[m+8>>2];c[f+12>>2]=c[m+12>>2];b[f+16>>1]=b[m+16>>1]|0;a[f+18|0]=a[m+18|0]|0;m=l|0;n=l+152|0;o=l+208|0;p=l+264|0;q=e;if(h>>>0<224>>>0){r=1;i=l;return r|0}s=h-223|0;if((s|0)==0|s>>>0>408>>>0){r=1;i=l;return r|0}t=h-73|0;u=mb()|0;v=i;i=i+t|0;i=i+7&-8;x=l+232|0;y=g+1|0;ee(e+96896|0,x,e+14932|0,y);a:do{if((Bf(x,g+33|0,g+57|0,h-57|0,v)|0)==(t|0)){Kh(o|0,f|0,19)|0;z=n|0;if((Ff(e+14868|0,v+s|0,v+(h-199)|0,126,m|0)|0)!=110){A=1;break}B=m;C=c[B>>2]|0;D=c[B+4>>2]|0;B=Zd()|0;F=E;G=Nh(C,D,3,0)|0;H=E;if(H>>>0<F>>>0|H>>>0==F>>>0&G>>>0<B>>>0|(F>>>0<D>>>0|F>>>0==D>>>0&B>>>0<C>>>0)){A=1;break}Kh(z|0,m+8|0,51)|0;if((wd(n+32|0,o)|0)==0){A=1;break}if((Mh(z|0,y|0,32)|0)!=0){A=1;break}Kh(p|0,m+59|0,51)|0;z=s&65535;C=s&65535;if(z<<16>>16==0){A=1;break}else{I=0;J=0}while(1){B=a[v+I|0]|0;if((B<<24>>24|0)==10){D=I+51|0;if(D>>>0>C>>>0){A=1;break a}a[j+(J*51|0)+32|0]=10;Kh(j+(J*51|0)+33|0,v+(I+1)|0,16)|0;F=j+(J*51|0)+49|0;G=v+(I+17)|0;w=(d[G]|d[G+1|0]<<8)<<16>>16;a[F]=w;w=w>>8;a[F+1|0]=w;Kh(j+(J*51|0)|0,v+(I+19)|0,32)|0;K=D}else if((B<<24>>24|0)==2){B=I+39|0;if(B>>>0>C>>>0){A=1;break a}a[j+(J*51|0)+32|0]=2;D=v+(I+1)|0;F=j+(J*51|0)+33|0;w=d[D]|d[D+1|0]<<8|d[D+2|0]<<16|d[D+3|0]<<24|0;a[F]=w;w=w>>8;a[F+1|0]=w;w=w>>8;a[F+2|0]=w;w=w>>8;a[F+3|0]=w;F=j+(J*51|0)+49|0;D=v+(I+5)|0;w=(d[D]|d[D+1|0]<<8)<<16>>16;a[F]=w;w=w>>8;a[F+1|0]=w;Kh(j+(J*51|0)|0,v+(I+7)|0,32)|0;K=B}else{A=1;break a}L=J+1|0;if(L>>>0<8>>>0&K>>>0<C>>>0){I=K;J=L}else{break}}if((L|0)<1){A=1;break}me(q,f,y)|0;c[k>>2]=L;Ne(q,p,y,v,z);A=0}else{A=1}}while(0);Ma(u|0);r=A;i=l;return r|0}function Ne(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0;h=i;i=i+1024|0;j=d+32|0;if((zd(j|0)|0)==0){i=h;return}k=g&65535;g=k+33|0;l=mb()|0;m=i;i=i+g|0;i=i+7&-8;a[m]=3;Kh(m+1|0,e|0,32)|0;Kh(m+33|0,f|0,k)|0;k=h|0;f=Lf(b+14900|0,b+14932|0,k,d|0,m,g,48)|0;if((f|0)!=-1){ld(c[b+4>>2]|0,j,k,f)|0}Ma(l|0);i=h;return}function Oe(f,g,h,j,k,l){f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;m=i;i=i+440|0;n=g;g=i;i=i+19|0;i=i+7&-8;c[g>>2]=c[n>>2];c[g+4>>2]=c[n+4>>2];c[g+8>>2]=c[n+8>>2];c[g+12>>2]=c[n+12>>2];b[g+16>>1]=b[n+16>>1]|0;a[g+18|0]=a[n+18|0]|0;n=m|0;o=m+8|0;p=m+416|0;q=f+14900|0;if($d(h,q)|0){i=m;return}h=mb()|0;r=i;i=i+631|0;i=i+7&-8;s=r|0;t=o|0;u=(Hc(g|0)|0)==0|0;Jh(o|0,0,408)|0;c[n>>2]=0;Re(j,t,0,f+8|0,32,n,u,1);v=f+14968|0;if((b[v>>1]|0)!=0){x=f+14964|0;y=0;do{Re(j,t,0,(c[x>>2]|0)+(y*3808|0)+32|0,8,n,u,0);y=y+1|0;}while(y>>>0<(e[v>>1]|0)>>>0)}v=c[n>>2]|0;a:do{if((v|0)!=0){n=i;i=i+558|0;i=i+7&-8;y=i;i=i+574|0;i=i+7&-8;u=y|0;y=n|0;x=p|0;If(x);t=v&65535;if((v&65535)<<16>>16==0){break}else{z=0;A=0}while(1){j=o+(A*51|0)|0;B=a[o+(A*51|0)+32|0]|0;if((B<<24>>24|0)==10){C=z+51|0;if(C>>>0>408>>>0){break a}a[n+z|0]=10;Kh(n+(z+1)|0,o+(A*51|0)+33|0,16)|0;D=o+(A*51|0)+49|0;E=n+(z+17)|0;w=(d[D]|d[D+1|0]<<8)<<16>>16;a[E]=w;w=w>>8;a[E+1|0]=w;Kh(n+(z+19)|0,j|0,32)|0;F=C}else if((B<<24>>24|0)==2){B=z+39|0;if(B>>>0>408>>>0){break a}a[n+z|0]=2;C=o+(A*51|0)+33|0;E=n+(z+1)|0;w=d[C]|d[C+1|0]<<8|d[C+2|0]<<16|d[C+3|0]<<24|0;a[E]=w;w=w>>8;a[E+1|0]=w;w=w>>8;a[E+2|0]=w;w=w>>8;a[E+3|0]=w;E=o+(A*51|0)+49|0;C=n+(z+5)|0;w=(d[E]|d[E+1|0]<<8)<<16>>16;a[C]=w;w=w>>8;a[C+1|0]=w;Kh(n+(z+7)|0,j|0,32)|0;F=B}else{break a}B=A+1|0;if(B>>>0<t>>>0){z=F;A=B}else{break}}if((F|0)<1){break}Kh(n+F|0,k|0,150)|0;t=Af(l,x,y,F+150|0,u)|0;if((t|0)!=(F+166|0)){break}a[s]=4;Kh(r+1|0,q|0,32)|0;Kh(r+33|0,x|0,24)|0;Kh(r+57|0,u|0,t)|0;ld(c[f+4>>2]|0,g,s,t+57|0)|0}}while(0);Ma(h|0);i=m;return}function Pe(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0;d=i;i=i+464|0;e=i;i=i+(b*928|0)|0;i=i+7&-8;f=d|0;Kh(f|0,c|0,32)|0;c=(b|0)==0;if(c){ce(e,b,4);i=d;return}else{g=0}do{Kh(e+(g*928|0)|0,f|0,464)|0;Kh(e+(g*928|0)+464|0,a+(g*464|0)|0,464)|0;g=g+1|0;}while(g>>>0<b>>>0);ce(e,b,4);if(c){i=d;return}else{h=0}do{Kh(a+(h*464|0)|0,e+(h*928|0)+464|0,464)|0;h=h+1|0;}while(h>>>0<b>>>0);i=d;return}function Qe(b,c){b=b|0;c=c|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0;d=i;e=b;b=i;i=i+928|0;Kh(b,e,928)|0;e=c;c=i;i=i+928|0;Kh(c,e,928)|0;e=0;while(1){if(e>>>0>=32>>>0){f=0;break}g=a[b+e|0]|0;h=a[b+464+e|0]^g;j=h<<24>>24;k=a[c+464+e|0]^g;g=k<<24>>24;l=(h<<24>>24>-1?j:-j|0)&255;j=(k<<24>>24>-1?g:-g|0)&255;if(l>>>0<j>>>0){f=1;break}if(l>>>0>j>>>0){f=2;break}else{e=e+1|0}}i=d;return((f|0)==2?-1:f)|0}function Re(b,d,e,f,g,h,i,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;if(!((e<<16>>16|0)==2|(e<<16>>16|0)==10|(e<<16>>16|0)==0)){return}k=c[h>>2]|0;if((g|0)==0){l=k}else{m=i<<24>>24==0;i=j<<24>>24==0;j=0;n=k;while(1){k=f+(j*464|0)|0;o=0;while(1){if(o>>>0>=8>>>0){p=7;break}if($d(d+(o*51|0)|0,k)|0){q=n;break}else{o=o+1|0}}a:do{if((p|0)==7){p=0;do{if((e<<16>>16|0)==2){r=f+(j*464|0)+32|0}else if((e<<16>>16|0)==10){r=f+(j*464|0)+248|0}else{o=f+(j*464|0)+56|0;s=c[o+4>>2]|0;t=f+(j*464|0)+272|0;u=c[t+4>>2]|0;if(s>>>0<u>>>0|s>>>0==u>>>0&(c[o>>2]|0)>>>0<(c[t>>2]|0)>>>0){r=f+(j*464|0)+248|0;break}else{r=f+(j*464|0)+32|0;break}}}while(0);t=r+24|0;if((_d(c[t>>2]|0,c[t+4>>2]|0,122,0)|0)!=0){q=n;break}t=r|0;if((Hc(t)|0)==0&m){q=n;break}do{if(!((Hc(t)|0)==0|i)){if((((a[r+88|0]<<1)+(a[r+40|0]|0)&255)+(a[r+136|0]<<2)&255)<<24>>24==2){break}if(!($d(b,k)|0)){q=n;break a}}}while(0);if(n>>>0<8>>>0){Kh(d+(n*51|0)|0,k|0,32)|0;Kh(d+(n*51|0)+32|0,r|0,19)|0;q=n+1|0;break}else{v=0}b:while(1){w=d+(v*51|0)|0;t=0;while(1){if(t>>>0>=32>>>0){break}o=a[b+t|0]|0;u=a[d+(v*51|0)+t|0]^o;s=u<<24>>24;x=a[f+(j*464|0)+t|0]^o;o=x<<24>>24;y=(u<<24>>24>-1?s:-s|0)&255;s=(x<<24>>24>-1?o:-o|0)&255;if(y>>>0<s>>>0){break}if(y>>>0>s>>>0){break b}else{t=t+1|0}}t=v+1|0;if((t|0)<8){v=t}else{q=n;break a}}Kh(w|0,k|0,32)|0;Kh(d+(v*51|0)+32|0,r|0,19)|0;q=n}}while(0);k=j+1|0;if(k>>>0<g>>>0){j=k;n=q}else{l=q;break}}}c[h>>2]=l;return}function Se(e,f,g,h){e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0;j=i;i=i+2872|0;k=f;f=i;i=i+19|0;i=i+7&-8;c[f>>2]=c[k>>2];c[f+4>>2]=c[k+4>>2];c[f+8>>2]=c[k+8>>2];c[f+12>>2]=c[k+12>>2];b[f+16>>1]=b[k+16>>1]|0;a[f+18|0]=a[k+18|0]|0;k=j|0;l=j+320|0;m=j+352|0;n=j+376|0;o=j+400|0;p=j+1424|0;q=j+1448|0;r=j+1768|0;s=j+1792|0;t=j+1848|0;u=t|0;v=t;x=i;i=i+1|0;i=i+7&-8;if(h>>>0>1024>>>0){y=1;i=j;return y|0}z=e+4|0;A=e+36|0;B=j+1816|0;C=t;D=Mf(z,A,B,C,x,g,h&65535)|0;if((D|0)<1){y=1;i=j;return y|0}if($d(z,B)|0){y=1;i=j;return y|0}h=e+456|0;g=e+68|0;F=0;while(1){if(F>>>0>=(c[h>>2]|0)>>>0){y=1;G=77;break}if($d((c[g>>2]|0)+(F*232|0)|0,B)|0){break}else{F=F+1|0}}if((G|0)==77){i=j;return y|0}if((F|0)==-1){y=1;i=j;return y|0}B=d[x]|0;if((B|0)==48){x=s|0;Kh(x|0,f|0,19)|0;H=r|0;if((D|0)!=8){y=1;i=j;return y|0}if((c[h>>2]|0)>>>0<=F>>>0){y=1;i=j;return y|0}r=c[u>>2]|0;I=c[u+4>>2]|0;c[H>>2]=c[x>>2];c[H+4>>2]=c[x+4>>2];c[H+8>>2]=c[x+8>>2];c[H+12>>2]=c[x+12>>2];b[H+16>>1]=b[x+16>>1]|0;a[H+18|0]=a[x+18|0]|0;x=p|0;u=q|0;c[u>>2]=r;c[u+4>>2]=I;I=e+128|0;if((_d(c[I>>2]|0,c[I+4>>2]|0,30,0)|0)==0){ae(q+8|0,e+72|0)|0;I=q+40|0;Kh(I|0,e+104|0,19)|0;he(I|0);J=1}else{J=0}I=e+192|0;if((_d(c[I>>2]|0,c[I+4>>2]|0,30,0)|0)==0){ae(q+8+(J*51|0)|0,e+136|0)|0;I=q+8+(J*51|0)+32|0;Kh(I|0,e+168|0,19)|0;he(I|0);K=J+1|0}else{K=J}J=e+256|0;if((_d(c[J>>2]|0,c[J+4>>2]|0,30,0)|0)==0){ae(q+8+(K*51|0)|0,e+200|0)|0;J=q+8+(K*51|0)+32|0;Kh(J|0,e+232|0,19)|0;he(J|0);L=K+1|0}else{L=K}K=e+320|0;if((_d(c[K>>2]|0,c[K+4>>2]|0,30,0)|0)==0){ae(q+8+(L*51|0)|0,e+264|0)|0;K=q+8+(L*51|0)+32|0;Kh(K|0,e+296|0,19)|0;he(K|0);M=L+1|0}else{M=L}L=e+384|0;if((_d(c[L>>2]|0,c[L+4>>2]|0,30,0)|0)==0){ae(q+8+(M*51|0)|0,e+328|0)|0;L=q+8+(M*51|0)+32|0;Kh(L|0,e+360|0,19)|0;he(L|0);N=M+1|0}else{N=M}M=e+448|0;if((_d(c[M>>2]|0,c[M+4>>2]|0,30,0)|0)==0){ae(q+8+(N*51|0)|0,e+392|0)|0;M=q+8+(N*51|0)+32|0;Kh(M|0,e+424|0,19)|0;he(M|0);O=N+1|0}else{O=N}N=(c[g>>2]|0)+(F*232|0)|0;c[x>>2]=c[H>>2];c[x+4>>2]=c[H+4>>2];c[x+8>>2]=c[H+8>>2];c[x+12>>2]=c[H+12>>2];b[x+16>>1]=b[H+16>>1]|0;a[x+18|0]=a[H+18|0]|0;H=o|0;do{if(!($d(z,N)|0)){x=Lf(z,A,H,N,q,(O*51|0)+8|0,49)|0;a[H]=48;if((x|0)==-1){break}ld(c[e>>2]|0,p,H,x)|0}}while(0);if((cf(e,(c[g>>2]|0)+(F*232|0)|0)|0)<=0){y=0;i=j;return y|0}Ze(e,s,F);y=0;i=j;return y|0}else if((B|0)==50){if(D>>>0<37>>>0){y=1;i=j;return y|0}else{P=0}while(1){if(P>>>0>=(c[h>>2]|0)>>>0){G=47;break}if($d((c[g>>2]|0)+(P*232|0)|0,C)|0){G=46;break}else{P=P+1|0}}if((G|0)==46){if((P|0)==-1){G=47}else{Q=P}}do{if((G|0)==47){if((a[v+36|0]|0)==24){y=1;i=j;return y|0}P=Ve(e,C)|0;if((P|0)==-1){y=1}else{Q=P;break}i=j;return y|0}}while(0);if((a[(c[g>>2]|0)+(Q*232|0)+222|0]|0)!=0){y=1;i=j;return y|0}P=Zd()|0;s=(c[g>>2]|0)+(Q*232|0)+72|0;c[s>>2]=P;c[s+4>>2]=E;s=va(c[t+32>>2]|0)|0;t=c[g>>2]|0;P=t+(Q*232|0)+88|0;H=c[P>>2]|0;do{if((H|0)==0){c[P>>2]=s;R=c[g>>2]|0}else{if((s-H|0)>>>0>64>>>0|(s|0)==(H|0)){y=1}else{R=t;break}i=j;return y|0}}while(0);c[R+(Q*232|0)+88>>2]=s;s=v+37|0;R=D+65499|0;t=R&65535;a:do{switch(d[v+36|0]|0){case 0:{if((R&65535|0)==0){H=Zd()|0;P=(c[g>>2]|0)+(Q*232|0)+80|0;c[P>>2]=H;c[P+4>>2]=E;break a}else{y=1;i=j;return y|0}break};case 16:{if((R&65535|0)!=32){y=1;i=j;return y|0}Ve(e,s)|0;P=e+496|0;H=b[e+624>>1]|0;do{if((H&65535)>>>0<=128>>>0){p=H&65535;O=o|0;q=p+37|0;if(q>>>0>1024>>>0){break}N=e+460|0;A=(c[N>>2]|0)+1|0;x=(A|0)==0?1:A;c[N>>2]=x;N=va(x|0)|0;ae(O,z)|0;x=o+32|0;w=N;a[x]=w;w=w>>8;a[x+1|0]=w;w=w>>8;a[x+2|0]=w;w=w>>8;a[x+3|0]=w;if(H<<16>>16!=0){Kh(o+37|0,P|0,p)|0}a[o+36|0]=48;bf(e,O,q&65535)|0}}while(0);P=e+632|0;c[P>>2]=Nh(Zd()|0,E,-165,-1)|0;c[P+4>>2]=E;break};case 24:{if((R&65535|0)!=0){y=1;i=j;return y|0}if((c[h>>2]|0)>>>0<=Q>>>0){break a}a[(c[g>>2]|0)+(Q*232|0)+222|0]=1;P=Zd()|0;H=(c[g>>2]|0)+(Q*232|0)+224|0;c[H>>2]=P;c[H+4>>2]=E;break};case 48:{H=R&65535;if(H>>>0>128>>>0|(H|0)==0){y=1;i=j;return y|0}if((t&65535)>>>0>128>>>0|t<<16>>16==0){break a}P=c[g>>2]|0;q=P+(Q*232|0)+92|0;if((b[P+(Q*232|0)+220>>1]|0)==t<<16>>16){if((Mh(q|0,s|0,H|0)|0)==0){break a}}Kh(q|0,s|0,H)|0;b[(c[g>>2]|0)+(Q*232|0)+220>>1]=t;H=c[e+480>>2]|0;if((H|0)==0){break a}Mb[H&1](e,Q,2,c[e+484>>2]|0);break};case 64:{H=c[e+464>>2]|0;if((H|0)==0){break a}Bb[H&15](e,Q,s,t,c[e+468>>2]|0);break};case 63:{H=c[e+472>>2]|0;if((H|0)==0){break a}Bb[H&15](e,Q,s,t,c[e+476>>2]|0);break};default:{y=1;i=j;return y|0}}}while(0);bf(e,C,D&65535)|0;y=0;i=j;return y|0}else if((B|0)==49){B=n|0;Kh(B|0,f|0,19)|0;f=l|0;t=m|0;if((c[h>>2]|0)>>>0<=F>>>0){y=1;i=j;return y|0}s=D-8|0;if(!(s>>>0<313>>>0&((s>>>0)%51|0|0)==0)){y=1;i=j;return y|0}Q=(c[g>>2]|0)+(F*232|0)+40|0;if((_d(c[Q>>2]|0,c[Q+4>>2]|0,5,0)|0)!=0){y=1;i=j;return y|0}Kh(k|0,C|0,D)|0;D=k|0;C=(c[g>>2]|0)+(F*232|0)+32|0;if(!((c[D>>2]|0)==(c[C>>2]|0)&(c[D+4>>2]|0)==(c[C+4>>2]|0))){y=1;i=j;return y|0}C=Zd()|0;D=l+24|0;c[D>>2]=C;c[D+4>>2]=E;C=((s>>>0)/51|0)&65535;s=e+640|0;if((C|0)==0){S=0}else{Q=0;while(1){R=k+8+(Q*51|0)|0;do{if((cf(e,R)|0)>0){o=0;while(1){if(o>>>0>=(c[h>>2]|0)>>>0){G=37;break}if($d((c[g>>2]|0)+(o*232|0)|0,R)|0){G=36;break}else{o=o+1|0}}if((G|0)==36){G=0;if((o|0)==-1){G=37}else{T=o}}if((G|0)==37){G=0;z=Ve(e,R)|0;if((z|0)==-1){break}else{T=z}}z=k+8+(Q*51|0)+32|0;ie(z|0);Ze(e,z,T);v=c[s>>2]|0;if((v|0)==0){break}Kh(f|0,z|0,19)|0;xc(v,R,l,0,0)|0}}while(0);R=Q+1|0;if(R>>>0<C>>>0){Q=R}else{S=C;break}}}C=_e(e,(c[g>>2]|0)+(F*232|0)|0,n)|0;n=c[s>>2]|0;if((n|0)==0){y=0;i=j;return y|0}s=c[g>>2]|0;Kh(f|0,s+(F*232|0)+48|0,19)|0;f=s+(F*232|0)+40|0;F=c[f+4>>2]|0;c[D>>2]=c[f>>2];c[D+4>>2]=F;Kh(t|0,B|0,19)|0;xc(n,k+8+(S*51|0)|0,l,m,(C|0)==0|0)|0;y=0;i=j;return y|0}else{y=1;i=j;return y|0}return 0}function Te(d,e,f){d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;i=i+1024|0;h=g|0;j=f&65535;if((f&65535)>>>0>128>>>0|f<<16>>16==0){k=-1;i=g;return k|0}l=d+496|0;Kh(l|0,e|0,j)|0;b[d+624>>1]=f;f=h|0;e=j+37|0;if(e>>>0>1024>>>0){k=0;i=g;return k|0}m=d+460|0;n=(c[m>>2]|0)+1|0;o=(n|0)==0?1:n;c[m>>2]=o;m=va(o|0)|0;ae(f,d+4|0)|0;o=h+32|0;w=m;a[o]=w;w=w>>8;a[o+1|0]=w;w=w>>8;a[o+2|0]=w;w=w>>8;a[o+3|0]=w;Kh(h+37|0,l|0,j)|0;a[h+36|0]=48;bf(d,f,e&65535)|0;k=0;i=g;return k|0}function Ue(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;i=i+1024|0;f=e|0;Ve(b,d)|0;g=f|0;h=b+460|0;j=(c[h>>2]|0)+1|0;k=(j|0)==0?1:j;c[h>>2]=k;h=va(k|0)|0;ae(g,b+4|0)|0;k=f+32|0;w=h;a[k]=w;w=w>>8;a[k+1|0]=w;w=w>>8;a[k+2|0]=w;w=w>>8;a[k+3|0]=w;Kh(f+37|0,d|0,32)|0;a[f+36|0]=16;f=(bf(b,g,69)|0)&255;i=e;return f|0}function Ve(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;d=a+456|0;e=a+68|0;f=0;while(1){g=c[d>>2]|0;if(f>>>0>=g>>>0){h=g;break}if($d((c[e>>2]|0)+(f*232|0)|0,b)|0){i=4;break}else{f=f+1|0}}do{if((i|0)==4){if((f|0)==-1){h=c[d>>2]|0;break}else{j=f;return j|0}}}while(0);f=Gh(c[e>>2]|0,(h*232|0)+232|0)|0;h=f;if((f|0)==0){j=-1;return j|0}f=h+((c[d>>2]|0)*232|0)|0;Jh(f|0,0,232)|0;c[e>>2]=h;ae(f,b)|0;b=Zd()|0;f=(c[e>>2]|0)+((c[d>>2]|0)*232|0)+72|0;c[f>>2]=b;c[f+4>>2]=E;f=Zd()|0;b=(c[e>>2]|0)+((c[d>>2]|0)*232|0)+80|0;c[b>>2]=f;c[b+4>>2]=E;b=c[d>>2]|0;f=b+1|0;c[d>>2]=f;e=c[a+480>>2]|0;if((e|0)==0){k=f}else{Mb[e&1](a,b,0,c[a+484>>2]|0);k=c[d>>2]|0}j=k-1|0;return j|0}function We(d){d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;e=i;i=i+1024|0;f=e|0;Yd();g=d+456|0;h=d+68|0;j=0;do{k=d+72+(j<<6)+56|0;a:do{if((_d(c[k>>2]|0,c[k+4>>2]|0,30,0)|0)==0){l=d+72+(j<<6)|0;m=0;while(1){if(m>>>0>=(c[g>>2]|0)>>>0){break a}if($d((c[h>>2]|0)+(m*232|0)|0,l)|0){break}else{m=m+1|0}}if((m|0)==-1){break}l=(c[h>>2]|0)+(m*232|0)+40|0;if((_d(c[l>>2]|0,c[l+4>>2]|0,10,0)|0)==0){break}Ze(d,d+72+(j<<6)+32|0,m)}}while(0);j=j+1|0;}while(j>>>0<6>>>0);j=d+488|0;do{if((_d(c[j>>2]|0,c[j+4>>2]|0,30,0)|0)!=0){k=f|0;l=d+460|0;n=(c[l>>2]|0)+1|0;o=(n|0)==0?1:n;c[l>>2]=o;l=va(o|0)|0;ae(k,d+4|0)|0;o=f+32|0;w=l;a[o]=w;w=w>>8;a[o+1|0]=w;w=w>>8;a[o+2|0]=w;w=w>>8;a[o+3|0]=w;a[f+36|0]=0;if((bf(d,k,37)|0)<<24>>24==0){break}k=Zd()|0;c[j>>2]=k;c[j+4>>2]=E}}while(0);b:do{if((c[g>>2]|0)!=0){j=0;do{k=(c[h>>2]|0)+(j*232|0)+80|0;if((_d(c[k>>2]|0,c[k+4>>2]|0,120,0)|0)!=0){af(d,j)}k=c[h>>2]|0;if((k|0)==0){break b}if(j>>>0>=(c[g>>2]|0)>>>0){break b}do{if((a[k+(j*232|0)+222|0]|0)!=0){o=k+(j*232|0)+224|0;if((_d(c[o>>2]|0,c[o+4>>2]|0,3,0)|0)==0){break}af(d,j)}}while(0);j=j+1|0;}while(j>>>0<(c[g>>2]|0)>>>0)}}while(0);g=d+632|0;if((_d(c[g>>2]|0,c[g+4>>2]|0,180,0)|0)==0){i=e;return}h=d+496|0;j=b[d+624>>1]|0;if((j&65535)>>>0>128>>>0){i=e;return}k=j&65535;m=f|0;o=k+37|0;do{if(o>>>0<=1024>>>0){l=d+460|0;n=(c[l>>2]|0)+1|0;p=(n|0)==0?1:n;c[l>>2]=p;l=va(p|0)|0;ae(m,d+4|0)|0;p=f+32|0;w=l;a[p]=w;w=w>>8;a[p+1|0]=w;w=w>>8;a[p+2|0]=w;w=w>>8;a[p+3|0]=w;if(j<<16>>16!=0){Kh(f+37|0,h|0,k)|0}a[f+36|0]=48;if((bf(d,m,o&65535)|0)<<24>>24!=0){break}i=e;return}}while(0);o=(c[g>>2]|0)==0&(c[g+4>>2]|0)==0;m=Zd()|0;d=E;if(o){o=Nh(m,d,-170,-1)|0;c[g>>2]=o;c[g+4>>2]=E;i=e;return}else{c[g>>2]=m;c[g+4>>2]=d;i=e;return}}function Xe(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0;d=i;i=i+1024|0;e=d|0;f=e|0;g=b+460|0;h=(c[g>>2]|0)+1|0;j=(h|0)==0?1:h;c[g>>2]=j;g=va(j|0)|0;ae(f,b+4|0)|0;j=e+32|0;w=g;a[j]=w;w=w>>8;a[j+1|0]=w;w=w>>8;a[j+2|0]=w;w=w>>8;a[j+3|0]=w;a[e+36|0]=24;bf(b,f,37)|0;Eh(c[b+68>>2]|0);Eh(b);i=d;return}function Ye(d,e,f){d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;h=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];c[e+8>>2]=c[h+8>>2];c[e+12>>2]=c[h+12>>2];b[e+16>>1]=b[h+16>>1]|0;a[e+18|0]=a[h+18|0]|0;Ze(d,e,Ve(d,f)|0);i=g;return}function Ze(d,e,f){d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;i=i+1088|0;h=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];c[e+8>>2]=c[h+8>>2];c[e+12>>2]=c[h+12>>2];b[e+16>>1]=b[h+16>>1]|0;a[e+18|0]=a[h+18|0]|0;h=g+1024|0;j=g+1048|0;k=g+1056|0;if((c[d+456>>2]|0)>>>0<=f>>>0){i=g;return}l=d+68|0;m=(c[l>>2]|0)+(f*232|0)+40|0;if((_d(c[m>>2]|0,c[m+4>>2]|0,5,0)|0)==0){i=g;return}m=kd()|0;n=j|0;c[n>>2]=m;c[n+4>>2]=E;m=Zd()|0;o=(c[l>>2]|0)+(f*232|0)+40|0;c[o>>2]=m;c[o+4>>2]=E;o=c[n+4>>2]|0;m=(c[l>>2]|0)+(f*232|0)+32|0;c[m>>2]=c[n>>2];c[m+4>>2]=o;o=e|0;Kh((c[l>>2]|0)+(f*232|0)+48|0,o|0,19)|0;e=d+640|0;if((c[e>>2]|0)!=0){m=Zd()|0;n=k+24|0;c[n>>2]=m;c[n+4>>2]=E;Kh(k|0,o|0,19)|0;xc(c[e>>2]|0,(c[l>>2]|0)+(f*232|0)|0,k,0,1)|0}k=(c[l>>2]|0)+(f*232|0)|0;Kh(h|0,o|0,19)|0;o=g|0;f=d+4|0;if($d(f,k)|0){i=g;return}l=Lf(f,d+36|0,o,k,j,8,48)|0;a[o]=48;if((l|0)==-1){i=g;return}ld(c[d>>2]|0,h,o,l)|0;i=g;return}function _e(d,e,f){d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;g=i;h=f;f=i;i=i+19|0;i=i+7&-8;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];c[f+8>>2]=c[h+8>>2];c[f+12>>2]=c[h+12>>2];b[f+16>>1]=b[h+16>>1]|0;a[f+18|0]=a[h+18|0]|0;h=0;while(1){if(h>>>0>=6>>>0){j=0;break}if($d(d+72+(h<<6)|0,e)|0){k=4;break}else{h=h+1|0}}if((k|0)==4){l=Zd()|0;m=d+72+(h<<6)+56|0;c[m>>2]=l;c[m+4>>2]=E;n=0;i=g;return n|0}while(1){if(j>>>0>=6>>>0){o=0;break}p=d+72+(j<<6)+56|0;if((_d(c[p>>2]|0,c[p+4>>2]|0,30,0)|0)==0){j=j+1|0}else{k=7;break}}if((k|0)==7){ae(d+72+(j<<6)|0,e)|0;Kh(d+72+(j<<6)+32|0,f|0,19)|0;j=Zd()|0;c[p>>2]=j;c[p+4>>2]=E;n=0;i=g;return n|0}a:while(1){q=d+72+(o<<6)|0;p=0;while(1){if(p>>>0>=32>>>0){break}j=a[d+4+p|0]|0;m=j-(a[d+72+(o<<6)+p|0]|0)|0;l=j-(a[e+p|0]|0)|0;j=((m|0)>-1?m:-m|0)&255;m=((l|0)>-1?l:-l|0)&255;if(j>>>0<m>>>0){break}if(j>>>0>m>>>0){break a}else{p=p+1|0}}p=o+1|0;if(p>>>0<6>>>0){o=p}else{n=-1;k=14;break}}if((k|0)==14){i=g;return n|0}ae(q,e)|0;Kh(d+72+(o<<6)+32|0,f|0,19)|0;f=Zd()|0;e=d+72+(o<<6)+56|0;c[e>>2]=f;c[e+4>>2]=E;n=0;i=g;return n|0}function $e(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0;e=0;while(1){if(e>>>0>=32>>>0){f=0;g=5;break}h=a[b+e|0]|0;i=h-(a[c+e|0]|0)|0;j=h-(a[d+e|0]|0)|0;h=((i|0)>-1?i:-i|0)&255;i=((j|0)>-1?j:-j|0)&255;if(h>>>0<i>>>0){f=1;g=5;break}if(h>>>0>i>>>0){f=2;g=5;break}else{e=e+1|0}}if((g|0)==5){return f|0}return 0}function af(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=a+456|0;if((c[d>>2]|0)>>>0<=b>>>0){return}e=a+68|0;f=0;while(1){if(f>>>0>=6>>>0){break}if($d(a+72+(f<<6)|0,(c[e>>2]|0)+(b*232|0)|0)|0){g=5;break}else{f=f+1|0}}if((g|0)==5){g=a+72+(f<<6)+56|0;c[g>>2]=0;c[g+4>>2]=0}g=(c[d>>2]|0)-1|0;c[d>>2]=g;if((g|0)==0){Eh(c[e>>2]|0);c[e>>2]=0;return}if((g|0)==(b|0)){h=b}else{f=c[e>>2]|0;Kh(f+(b*232|0)|0,f+(g*232|0)|0,232)|0;h=c[d>>2]|0}d=Gh(c[e>>2]|0,h*232|0)|0;if((d|0)==0){return}c[e>>2]=d;d=c[a+480>>2]|0;if((d|0)==0){return}Mb[d&1](a,b,1,c[a+484>>2]|0);return}function bf(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;f=i;i=i+1048|0;g=f+1024|0;h=g|0;j=f|0;k=b+4|0;l=e&65535;e=b+36|0;m=b|0;n=0;o=0;while(1){p=b+72+(o<<6)+32|0;do{if((zd(p|0)|0)==0){q=n}else{r=b+72+(o<<6)+56|0;if((_d(c[r>>2]|0,c[r+4>>2]|0,30,0)|0)!=0){q=n;break}r=b+72+(o<<6)|0;Kh(h|0,p|0,19)|0;do{if($d(k,r)|0){s=0}else{t=Lf(k,e,j,r,d,l,50)|0;a[j]=48;if((t|0)==-1){s=0;break}s=(ld(c[m>>2]|0,g,j,t)|0)==(t|0)|0}}while(0);q=s+n&65535}}while(0);p=o+1|0;if(p>>>0<6>>>0){n=q;o=p}else{break}}i=f;return q&255|0}function cf(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;d=a+4|0;if($d(d,b)|0){e=-1;return e|0}f=a+128|0;do{if((_d(c[f>>2]|0,c[f+4>>2]|0,30,0)|0)==0){g=a+72|0;if($d(g,b)|0){e=-1;return e|0}else{h=($e(d,g,b)|0)==2|0;break}}else{h=1}}while(0);f=a+192|0;do{if((_d(c[f>>2]|0,c[f+4>>2]|0,30,0)|0)==0){g=a+136|0;if($d(g,b)|0){e=-1;return e|0}else{i=(($e(d,g,b)|0)==2)+h|0;break}}else{i=h+1|0}}while(0);h=a+256|0;do{if((_d(c[h>>2]|0,c[h+4>>2]|0,30,0)|0)==0){f=a+200|0;if($d(f,b)|0){e=-1;return e|0}else{j=(($e(d,f,b)|0)==2)+i|0;break}}else{j=i+1|0}}while(0);i=a+320|0;do{if((_d(c[i>>2]|0,c[i+4>>2]|0,30,0)|0)==0){h=a+264|0;if($d(h,b)|0){e=-1;return e|0}else{k=(($e(d,h,b)|0)==2)+j|0;break}}else{k=j+1|0}}while(0);j=a+384|0;do{if((_d(c[j>>2]|0,c[j+4>>2]|0,30,0)|0)==0){i=a+328|0;if($d(i,b)|0){e=-1;return e|0}else{l=(($e(d,i,b)|0)==2)+k|0;break}}else{l=k+1|0}}while(0);k=a+448|0;if((_d(c[k>>2]|0,c[k+4>>2]|0,30,0)|0)!=0){e=l+1|0;return e|0}k=a+392|0;if($d(k,b)|0){e=-1;return e|0}e=(($e(d,k,b)|0)==2)+l|0;return e|0}function df(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0;f=i;i=i+1112|0;g=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[g>>2];c[e+4>>2]=c[g+4>>2];c[e+8>>2]=c[g+8>>2];c[e+12>>2]=c[g+12>>2];b[e+16>>1]=b[g+16>>1]|0;a[e+18|0]=a[g+18|0]|0;g=f|0;h=f+24|0;j=f+40|0;k=f+56|0;l=f+72|0;m=f+1104|0;n=e|0;Kh(g|0,n|0,19)|0;o=d+4|0;p=d+8|0;q=c[p>>2]|0;a:do{if((q|0)==0){r=0;s=17}else{t=c[o>>2]|0;u=t;v=0;w=t;t=q;while(1){if((a[u+19|0]|0)==0){x=w;y=t}else{if((wd(u|0,g)|0)!=0){s=7;break}x=c[o>>2]|0;y=c[p>>2]|0}z=v+1|0;if(z>>>0<y>>>0){u=x+(z*1160|0)|0;v=z;w=x;t=y}else{A=y;break}}do{if((s|0)==7){t=c[p>>2]|0;if((v|0)==-1){A=t;break}if(t>>>0<=v>>>0){B=v;i=f;return B|0}t=c[o>>2]|0;if((a[t+(v*1160|0)+19|0]|0)==0){B=v;i=f;return B|0}w=t+(v*1160|0)+64|0;c[w>>2]=-1;c[w+4>>2]=-1;a[t+(v*1160|0)+1153|0]=1;a[t+(v*1160|0)+20|0]=0;B=v;i=f;return B|0}}while(0);if((A|0)==0){r=0;s=17;break}v=c[o>>2]|0;t=0;w=v;while(1){if((a[w+19|0]|0)==0){break}u=t+1|0;if(u>>>0<A>>>0){t=u;w=v+(u*1160|0)|0}else{r=A;s=17;break a}}if((t|0)==-1){r=A;s=17;break}C=t;D=c[o>>2]|0}}while(0);do{if((s|0)==17){A=Gh(c[o>>2]|0,aa(r+1|0,c[d+12>>2]|0)|0)|0;if((A|0)==0){B=-1;i=f;return B|0}else{c[o>>2]=A;y=c[p>>2]|0;c[p>>2]=y+1;C=y;D=A;break}}}while(0);p=D;D=p+(C*1160|0)|0;Jh(D|0,0,1160)|0;o=ff(d,e)|0;e=((ta()|0)%5|0)+5&255;d=h|0;Jh(d|0,0,12)|0;h=j;Jh(h|0,0,16)|0;j=k;Jh(j|0,0,12)|0;k=l|0;Jh(k|0,0,1031)|0;l=m|0;Jh(l|0,0,6)|0;m=id()|0;r=E;s=id()|0;A=E;Kh(D|0,n|0,19)|0;a[p+(C*1160|0)+19|0]=1;a[p+(C*1160|0)+20|0]=0;a[D+21|0]=0;b[p+(C*1160|0)+22>>1]=2;c[p+(C*1160|0)+24>>2]=30;n=D+28|0;c[n>>2]=c[d>>2];c[n+4>>2]=c[d+4>>2];c[n+8>>2]=c[d+8>>2];d=p+(C*1160|0)+40|0;c[d>>2]=m;c[d+4>>2]=r;r=p+(C*1160|0)+48|0;c[r>>2]=s;c[r+4>>2]=A;A=p+(C*1160|0)+56|0;c[A>>2]=0;c[A+4>>2]=0;A=p+(C*1160|0)+64|0;c[A>>2]=-1;c[A+4>>2]=-1;A=p+(C*1160|0)+72|0;r=A;c[r>>2]=c[h>>2];c[r+4>>2]=c[h+4>>2];c[r+8>>2]=c[h+8>>2];c[r+12>>2]=c[h+12>>2];c[p+(C*1160|0)+88>>2]=o;h=p+(C*1160|0)+92|0;c[h>>2]=c[j>>2];c[h+4>>2]=c[j+4>>2];c[h+8>>2]=c[j+8>>2];c[p+(C*1160|0)+104>>2]=o;c[p+(C*1160|0)+108>>2]=0;c[p+(C*1160|0)+112>>2]=o;c[p+(C*1160|0)+116>>2]=o;Kh(p+(C*1160|0)+120|0,k|0,1031)|0;a[p+(C*1160|0)+1151|0]=0;a[p+(C*1160|0)+1152|0]=e;a[p+(C*1160|0)+1153|0]=1;e=D+1154|0;b[e>>1]=b[l>>1]|0;b[e+2>>1]=b[l+2>>1]|0;b[e+4>>1]=b[l+4>>1]|0;l=Fh(1,4104)|0;e=l;do{if((l|0)==0){F=-1}else{k=c[A>>2]|0;if((k|0)==0){c[A>>2]=e;F=4;break}else{Eh(k|0);c[A>>2]=e;F=4;break}}}while(0);e=p+(C*1160|0)+76|0;c[e>>2]=F;F=p+(C*1160|0)+80|0;l=Fh(1,4104)|0;k=l;do{if((l|0)==0){c[p+(C*1160|0)+84>>2]=-1}else{o=c[F>>2]|0;if((o|0)!=0){Eh(o|0)}c[F>>2]=k;c[p+(C*1160|0)+84>>2]=4;if((c[e>>2]|0)==-1){break}else{B=C}i=f;return B|0}}while(0);Eh(c[A>>2]|0);Eh(c[F>>2]|0);Jh(D|0,0,1160)|0;B=-1;i=f;return B|0}function ef(b,d){b=b|0;d=d|0;var e=0,f=0;if((c[b+8>>2]|0)>>>0<=d>>>0){e=-1;return e|0}f=c[b+4>>2]|0;if((a[f+(d*1160|0)+19|0]|0)==0){e=-1;return e|0}b=f+(d*1160|0)+64|0;c[b>>2]=-1;c[b+4>>2]=-1;a[f+(d*1160|0)+1153|0]=1;a[f+(d*1160|0)+20|0]=0;e=0;return e|0}function ff(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=i;g=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[g>>2];c[e+4>>2]=c[g+4>>2];c[e+8>>2]=c[g+8>>2];c[e+12>>2]=c[g+12>>2];b[e+16>>1]=b[g+16>>1]|0;a[e+18|0]=a[g+18|0]|0;g=e+17|0;h=yf(d,0,a[g]|0)|0;j=(yf(d,1,a[g+1|0]|0)|0)^h;h=a[e|0]|0;if((h<<24>>24|0)==10){g=e+1|0;k=2;l=j;m=0;while(1){n=(yf(d,k,a[g+m|0]|0)|0)^l;o=m+1|0;if((o|0)<16){k=k+1|0;l=n;m=o}else{p=n;break}}q=(p|0)==0;r=q?1:p;i=f;return r|0}else if((h<<24>>24|0)==2){h=e+1|0;e=h;m=(yf(d,2,a[h]|0)|0)^j;h=(yf(d,3,a[e+1|0]|0)|0)^m;m=(yf(d,4,a[e+2|0]|0)|0)^h;p=(yf(d,5,a[e+3|0]|0)|0)^m;q=(p|0)==0;r=q?1:p;i=f;return r|0}else{p=j;q=(p|0)==0;r=q?1:p;i=f;return r|0}return 0}function gf(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;e=c[b+8>>2]|0;if((e|0)==0){f=-1;return f|0}g=c[b+4>>2]|0;b=g;h=0;while(1){i=b+20|0;if((a[i]|0)==2){if(((c[b+96>>2]|0)-(c[b+120>>2]|0)|0)>>>0>=d>>>0){break}}j=h+1|0;if(j>>>0<e>>>0){b=g+(j*1160|0)|0;h=j}else{f=-1;k=7;break}}if((k|0)==7){return f|0}a[i]=1;f=h;return f|0}function hf(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=i;i=i+24|0;g=f|0;h=b+8|0;if((c[h>>2]|0)>>>0<=e>>>0){j=-1;i=f;return j|0}k=b+4|0;l=c[k>>2]|0;m=l+(e*1160|0)+19|0;if((a[m]|0)==0){j=-1;i=f;return j|0}a[m]=0;m=g|0;n=l+(e*1160|0)|0;Kh(m|0,n|0,19)|0;o=a[m]|0;if((o<<24>>24|0)==10){p=(jd()|0)&15;q=6}else if((o<<24>>24|0)==2){p=(jd()|0)&3;q=6}if((q|0)==6){q=jd()|0;o=p&255;c[b+16+(o+2<<10)+(d[g+1+o|0]<<2)>>2]=q}Eh(c[l+(e*1160|0)+72>>2]|0);Eh(c[l+(e*1160|0)+80>>2]|0);Jh(n|0,0,1160)|0;n=c[h>>2]|0;e=n;while(1){if((e|0)==0){r=0;break}l=e-1|0;if((a[(c[k>>2]|0)+(l*1160|0)+19|0]|0)==0){e=l}else{r=e;break}}if((n|0)==(r|0)){j=0;i=f;return j|0}e=n-r|0;if(n>>>0<e>>>0){j=0;i=f;return j|0}n=c[k>>2]|0;if((r|0)==0){Eh(n);c[k>>2]=0;c[h>>2]=0;j=0;i=f;return j|0}l=Gh(n,aa(c[b+12>>2]|0,r)|0)|0;if((l|0)==0){j=0;i=f;return j|0}c[h>>2]=(c[h>>2]|0)-e;c[k>>2]=l;j=0;i=f;return j|0}function jf(a,b){a=a|0;b=b|0;var e=0;if((c[a+8>>2]|0)>>>0<=b>>>0){e=0;return e|0}e=d[(c[a+4>>2]|0)+(b*1160|0)+19|0]|0;return e|0}function kf(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+24|0;g=f|0;if((c[d+8>>2]|0)>>>0>e>>>0){Kh(b|0,(c[d+4>>2]|0)+(e*1160|0)|0,19)|0;i=f;return}else{xd(g|0);e=g+17|0;w=0;a[e]=w;w=w>>8;a[e+1|0]=w;Kh(b|0,g|0,19)|0;i=f;return}}function lf(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0;d=c[b+8>>2]|0;if((d|0)==0){e=0;return e|0}f=c[b+4>>2]|0;b=0;g=0;while(1){if((a[f+(g*1160|0)+19|0]|0)==0){h=b}else{h=(c[f+(g*1160|0)+112>>2]|0)+b-(c[f+(g*1160|0)+116>>2]|0)|0}i=g+1|0;if(i>>>0<d>>>0){b=h;g=i}else{e=h;break}}return e|0}function mf(b,d){b=b|0;d=d|0;var e=0,f=0;if((c[b+8>>2]|0)>>>0<=d>>>0){e=-1;return e|0}f=c[b+4>>2]|0;if((a[f+(d*1160|0)+19|0]|0)==0){e=-1;return e|0}b=c[f+(d*1160|0)+120>>2]|0;if((c[f+(d*1160|0)+96>>2]|0)==(b|0)){e=-1;return e|0}e=a[(c[f+(d*1160|0)+80>>2]|0)+(((b>>>0)%((c[f+(d*1160|0)+84>>2]|0)>>>0)|0)*1026|0)|0]|0;return e|0}function nf(d,f,g){d=d|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0;if((c[d+8>>2]|0)>>>0<=f>>>0){h=0;return h|0}i=c[d+4>>2]|0;if((a[i+(f*1160|0)+19|0]|0)==0){h=0;return h|0}d=i+(f*1160|0)+120|0;j=c[d>>2]|0;if((c[i+(f*1160|0)+96>>2]|0)==(j|0)){h=0;return h|0}k=((j>>>0)%((c[i+(f*1160|0)+84>>2]|0)>>>0)|0)&65535;j=i+(f*1160|0)+80|0;f=c[j>>2]|0;i=e[f+(k*1026|0)+1024>>1]|0;Kh(g|0,f+(k*1026|0)|0,i)|0;c[d>>2]=(c[d>>2]|0)+1;b[(c[j>>2]|0)+(k*1026|0)+1024>>1]=0;h=i;return h|0}function of(b,d,f){b=b|0;d=d|0;f=f|0;var g=0,h=0,i=0;if((c[b+8>>2]|0)>>>0<=d>>>0){g=0;return g|0}h=c[b+4>>2]|0;if((a[h+(d*1160|0)+19|0]|0)==0){g=0;return g|0}b=c[h+(d*1160|0)+120>>2]|0;if((c[h+(d*1160|0)+96>>2]|0)==(b|0)){g=0;return g|0}i=((b>>>0)%((c[h+(d*1160|0)+84>>2]|0)>>>0)|0)&65535;b=c[h+(d*1160|0)+80>>2]|0;d=e[b+(i*1026|0)+1024>>1]|0;Kh(f|0,b+(i*1026|0)|0,d)|0;g=d;return g|0}function pf(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,i=0;if((c[d+8>>2]|0)>>>0<=e>>>0){f=-1;return f|0}g=c[d+4>>2]|0;if((a[g+(e*1160|0)+19|0]|0)==0){f=-1;return f|0}d=g+(e*1160|0)+120|0;h=c[d>>2]|0;if((c[g+(e*1160|0)+96>>2]|0)==(h|0)){f=-1;return f|0}i=(h>>>0)%((c[g+(e*1160|0)+84>>2]|0)>>>0)|0;c[d>>2]=h+1;b[(c[g+(e*1160|0)+80>>2]|0)+((i&65535)*1026|0)+1024>>1]=0;f=0;return f|0}function qf(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;h=d+8|0;i=c[h>>2]|0;if(i>>>0<=e>>>0){j=0;return j|0}k=d+4|0;d=g>>>0>1024>>>0|(g|0)==0;l=i;a:while(1){m=c[k>>2]|0;if((a[m+(e*1160|0)+19|0]|0)==0|d){j=0;n=19;break}if(!(((c[m+(e*1160|0)+112>>2]|0)-(c[m+(e*1160|0)+116>>2]|0)|0)>>>0<1024>>>0&l>>>0>e>>>0)){j=0;n=19;break}i=~~(+((((c[m+(e*1160|0)+24>>2]|0)>>>0)/20|0)>>>0>>>0)*1.5);o=i>>>0>1024>>>0?1024:i;if((o>>>0<16>>>0?16:o)>>>0<=((c[m+(e*1160|0)+112>>2]|0)-(c[m+(e*1160|0)+116>>2]|0)|0)>>>0){j=0;n=19;break}p=m+(e*1160|0)+76|0;q=c[p>>2]|0;if(((c[m+(e*1160|0)+112>>2]|0)-(c[m+(e*1160|0)+116>>2]|0)|0)>>>0<q>>>0|(q|0)==0){n=18;break}o=m+(e*1160|0)+72|0;i=q<<1;r=c[m+(e*1160|0)+116>>2]|0;s=c[m+(e*1160|0)+112>>2]|0;t=i>>>0>1024>>>0?1024:i;if((s-r|0)>>>0>t>>>0){n=15;break}do{if((t|0)==(q|0)){u=q}else{i=Fh(1,t*1026|0)|0;v=i;if((i|0)==0){n=15;break a}i=c[o>>2]|0;if((i|0)==0){c[o>>2]=v;u=t;break}if((r|0)!=(s|0)){w=r;do{Kh(v+(((w>>>0)%(t>>>0)|0)*1026|0)|0,i+(((w>>>0)%(q>>>0)|0)*1026|0)|0,1026)|0;w=w+1|0;}while((w|0)!=(s|0))}Eh(i|0);c[o>>2]=v;u=t}}while(0);c[p>>2]=u;if((u|0)==-1){j=0;n=19;break}c[p>>2]=u;t=c[h>>2]|0;if(t>>>0>e>>>0){l=t}else{j=0;n=19;break}}if((n|0)==15){c[p>>2]=-1;j=0;return j|0}else if((n|0)==18){p=m+(e*1160|0)+112|0;l=((c[p>>2]|0)>>>0)%(q>>>0)|0;q=m+(e*1160|0)+72|0;Kh((c[q>>2]|0)+(l*1026|0)|0,f|0,g)|0;b[(c[q>>2]|0)+(l*1026|0)+1024>>1]=g;c[p>>2]=(c[p>>2]|0)+1;j=1;return j|0}else if((n|0)==19){return j|0}return 0}function rf(a){a=a|0;var b=0,d=0;if((a|0)==0){b=0;return b|0}d=Fh(1,18448)|0;if((d|0)==0){b=0;return b|0}c[d+8>>2]=0;c[d+12>>2]=1160;c[d+4>>2]=0;c[d>>2]=a;md(a,16,18,d);md(a,17,22,d);md(a,18,10,d);b=d;return b|0}function sf(e,f,g,h){e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,x=0,y=0,z=0,A=0;j=i;i=i+64|0;k=f;f=i;i=i+19|0;i=i+7&-8;c[f>>2]=c[k>>2];c[f+4>>2]=c[k+4>>2];c[f+8>>2]=c[k+8>>2];c[f+12>>2]=c[k+12>>2];b[f+16>>1]=b[k+16>>1]|0;a[f+18|0]=a[k+18|0]|0;k=j|0;l=j+16|0;m=j+40|0;n=e;if((h|0)!=9){o=1;i=j;return o|0}h=f|0;Kh(m|0,h|0,19)|0;p=e+4|0;q=e+8|0;r=c[q>>2]|0;a:do{if((r|0)==0){s=-1}else{t=c[p>>2]|0;u=t;v=0;x=t;t=r;while(1){if((a[u+19|0]|0)==0){y=x;z=t}else{if((wd(u|0,m)|0)!=0){s=v;break a}y=c[p>>2]|0;z=c[q>>2]|0}A=v+1|0;if(A>>>0<z>>>0){u=y+(A*1160|0)|0;v=A;x=y;t=z}else{s=-1;break}}}}while(0);z=g+1|0;y=va(d[z]|d[z+1|0]<<8|d[z+2|0]<<16|d[z+3|0]<<24|0)|0;z=g+5|0;g=va(d[z]|d[z+1|0]<<8|d[z+2|0]<<16|d[z+3|0]<<24|0)|0;z=c[q>>2]|0;do{if((g|0)==0){if(z>>>0>s>>>0){if((a[(c[p>>2]|0)+(s*1160|0)+19|0]|0)==3){break}if((a[(c[p>>2]|0)+(s*1160|0)+19|0]|0)==4){break}}q=ff(n,f)|0;m=c[e>>2]|0;Kh(l|0,h|0,19)|0;r=k|0;a[r]=16;t=k+1|0;w=va(q|0)|0;a[t]=w;w=w>>8;a[t+1|0]=w;w=w>>8;a[t+2|0]=w;w=w>>8;a[t+3|0]=w;t=k+5|0;w=va(y|0)|0;a[t]=w;w=w>>8;a[t+1|0]=w;w=w>>8;a[t+2|0]=w;w=w>>8;a[t+3|0]=w;ld(m,l,r,9)|0;o=0;i=j;return o|0}}while(0);if(z>>>0<=s>>>0){o=1;i=j;return o|0}z=c[p>>2]|0;p=z+(s*1160|0)+19|0;if((a[p]|0)!=1){o=1;i=j;return o|0}if((g|0)!=(c[z+(s*1160|0)+88>>2]|0)){o=0;i=j;return o|0}a[p]=2;c[z+(s*1160|0)+100>>2]=g;c[z+(s*1160|0)+108>>2]=y;c[z+(s*1160|0)+96>>2]=y;c[z+(s*1160|0)+120>>2]=y;o=0;i=j;return o|0}function tf(f,g,h,j){f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0;k=i;i=i+1200|0;l=g;g=i;i=i+19|0;i=i+7&-8;c[g>>2]=c[l>>2];c[g+4>>2]=c[l+4>>2];c[g+8>>2]=c[l+8>>2];c[g+12>>2]=c[l+12>>2];b[g+16>>1]=b[l+16>>1]|0;a[g+18|0]=a[l+18|0]|0;l=k|0;m=k+24|0;n=k+40|0;o=k+1120|0;p=k+1128|0;q=k+1152|0;r=k+1176|0;s=f;if((j-10|0)>>>0>1024>>>0){t=1;i=k;return t|0}if((j+2&3|0)!=0){t=1;i=k;return t|0}u=(j+262134|0)>>>2;j=u&65535;v=u&65535;u=mb()|0;w=i;i=i+(v*4|0)|0;i=i+7&-8;x=a[h+1|0]|0;y=h+2|0;z=va(d[y]|d[y+1|0]<<8|d[y+2|0]<<16|d[y+3|0]<<24|0)|0;y=h+6|0;A=va(d[y]|d[y+1|0]<<8|d[y+2|0]<<16|d[y+3|0]<<24|0)|0;if((v|0)!=0){Kh(w|0,h+10|0,v<<2)|0}h=g|0;Kh(r|0,h|0,19)|0;g=f+4|0;y=f+8|0;B=c[y>>2]|0;a:do{if((B|0)==0){C=12}else{D=c[g>>2]|0;F=D;G=0;H=D;D=B;while(1){if((a[F+19|0]|0)==0){I=H;J=D}else{if((wd(F|0,r)|0)!=0){break}I=c[g>>2]|0;J=c[y>>2]|0}K=G+1|0;if(K>>>0<J>>>0){F=I+(K*1160|0)|0;G=K;H=I;D=J}else{C=12;break a}}if((G|0)==-1){C=12;break}D=c[g>>2]|0;H=D+(G*1160|0)+19|0;F=a[H]|0;if((F<<24>>24|0)==2){if((c[D+(G*1160|0)+100>>2]|0)!=(z|0)){L=1;break}if((c[D+(G*1160|0)+108>>2]|0)!=(A|0)){L=1;break}a[H]=3;a[D+(G*1160|0)+1150|0]=x;H=D+(G*1160|0)+1151|0;a[H]=(a[H]|0)+1;xf(s,G);L=0;break}else if((F<<24>>24|0)!=3){L=0;break}F=D+(G*1160|0)+1150|0;H=a[F]|0;K=D+(G*1160|0)+100|0;M=D+(G*1160|0)+108|0;N=D+(G*1160|0)+76|0;if((z-(c[K>>2]|0)|0)>>>0>(c[N>>2]|0)>>>0){L=1;break}if(!(H<<24>>24!=x<<24>>24&(A-(c[M>>2]|0)|0)>>>0<1025>>>0&(x-H&255)>>>0<8>>>0)){L=1;break}c[K>>2]=z;c[M>>2]=A;M=D+(G*1160|0)+116|0;c[M>>2]=z;K=id()|0;H=D+(G*1160|0)+48|0;c[H>>2]=K;c[H+4>>2]=E;a[F]=x;F=D+(G*1160|0)+1151|0;a[F]=(a[F]|0)+1;if(j<<16>>16!=0){F=0;do{c[D+(G*1160|0)+124+(F<<2)>>2]=va(c[w+(F<<2)>>2]|0)|0;F=F+1|0;}while(F>>>0<v>>>0)}b[D+(G*1160|0)+1148>>1]=j;F=D+(G*1160|0)+24|0;H=c[F>>2]|0;if((c[D+(G*1160|0)+112>>2]|0)==(c[M>>2]|0)){K=H-(H>>>3)|0;c[F>>2]=K;if(K>>>0>=30>>>0){L=0;break}c[F>>2]=30;L=0;break}K=e[D+(G*1160|0)+22>>1]|0;if(!(((H>>>0)/(K>>>0)|0)>>>2>>>0>=v>>>0|(j&65535)>>>0<11>>>0)){c[F>>2]=H-(H>>>3);L=0;break}O=H+1+(H>>>2)|0;c[F>>2]=O;H=aa(c[N>>2]|0,K)|0;if(O>>>0<=H>>>0){L=0;break}c[F>>2]=H;L=0}}while(0);do{if((C|0)==12){j=q|0;Kh(j|0,h|0,19)|0;v=p|0;if((ff(s,q)|0)!=(z|0)){L=-1;break}c[v>>2]=c[j>>2];c[v+4>>2]=c[j+4>>2];c[v+8>>2]=c[j+8>>2];c[v+12>>2]=c[j+12>>2];b[v+16>>1]=b[j+16>>1]|0;a[v+18|0]=a[j+18|0]|0;w=l|0;x=m|0;J=n|0;I=o|0;c[w>>2]=c[j>>2];c[w+4>>2]=c[j+4>>2];c[w+8>>2]=c[j+8>>2];c[w+12>>2]=c[j+12>>2];b[w+16>>1]=b[j+16>>1]|0;a[w+18|0]=a[j+18|0]|0;j=c[y>>2]|0;b:do{if((j|0)==0){C=22}else{w=c[g>>2]|0;r=w;B=0;H=w;w=j;while(1){if((a[r+19|0]|0)==0){P=H;Q=w}else{if((wd(r|0,l)|0)!=0){C=19;break}P=c[g>>2]|0;Q=c[y>>2]|0}F=B+1|0;if(F>>>0<Q>>>0){r=P+(F*1160|0)|0;B=F;H=P;w=Q}else{R=Q;break}}if((C|0)==19){if((B|0)!=-1){S=-1;break}R=c[y>>2]|0}if((R|0)==0){C=22;break}w=c[g>>2]|0;H=w;r=0;F=H;while(1){if((a[F+19|0]|0)==0){break}O=r+1|0;if(O>>>0<R>>>0){r=O;F=H+(O*1160|0)|0}else{T=w;U=R;C=27;break b}}if((r|0)==-1){T=w;U=R;C=27}else{V=r;W=w;C=29}}}while(0);if((C|0)==22){T=c[g>>2]|0;U=0;C=27}do{if((C|0)==27){j=Gh(T,aa(c[f+12>>2]|0,U+1|0)|0)|0;if((j|0)==0){S=-1;break}c[g>>2]=j;N=c[y>>2]|0;c[y>>2]=N+1;V=N;W=j;C=29}}while(0);do{if((C|0)==29){j=W;N=j+(V*1160|0)|0;Jh(N|0,0,1160)|0;G=((ta()|0)%5|0)+5|0;Jh(x|0,0,12)|0;Jh(J|0,0,1079)|0;Jh(I|0,0,6)|0;D=id()|0;M=E;H=id()|0;F=E;B=id()|0;O=E;K=Xh(G&255,0,1e6,0)|0;X=Nh(B,O,K,E)|0;K=E;Kh(N|0,v|0,19)|0;a[j+(V*1160|0)+19|0]=2;a[j+(V*1160|0)+20|0]=2;a[N+21|0]=0;b[j+(V*1160|0)+22>>1]=2;c[j+(V*1160|0)+24>>2]=30;O=N+28|0;c[O>>2]=c[x>>2];c[O+4>>2]=c[x+4>>2];c[O+8>>2]=c[x+8>>2];O=j+(V*1160|0)+40|0;c[O>>2]=D;c[O+4>>2]=M;M=j+(V*1160|0)+48|0;c[M>>2]=H;c[M+4>>2]=F;F=j+(V*1160|0)+56|0;c[F>>2]=0;c[F+4>>2]=0;F=j+(V*1160|0)+64|0;c[F>>2]=X;c[F+4>>2]=K;K=j+(V*1160|0)+72|0;Kh(K|0,J|0,1079)|0;a[j+(V*1160|0)+1151|0]=127;a[j+(V*1160|0)+1152|0]=G;a[j+(V*1160|0)+1153|0]=0;G=N+1154|0;b[G>>1]=b[I>>1]|0;b[G+2>>1]=b[I+2>>1]|0;b[G+4>>1]=b[I+4>>1]|0;G=Fh(1,4104)|0;F=G;do{if((G|0)==0){Y=-1}else{X=c[K>>2]|0;if((X|0)==0){c[K>>2]=F;Y=4;break}else{Eh(X|0);c[K>>2]=F;Y=4;break}}}while(0);F=j+(V*1160|0)+76|0;c[F>>2]=Y;G=j+(V*1160|0)+80|0;w=Fh(1,4104)|0;r=w;if((w|0)==0){c[j+(V*1160|0)+84>>2]=-1}else{w=c[G>>2]|0;if((w|0)!=0){Eh(w|0)}c[G>>2]=r;c[j+(V*1160|0)+84>>2]=4;if((c[F>>2]|0)!=-1){S=V;break}}Eh(c[K>>2]|0);Eh(c[G>>2]|0);Jh(N|0,0,1160)|0;S=-1}}while(0);if((S|0)==-1){L=-1;break}I=c[g>>2]|0;c[I+(S*1160|0)+100>>2]=z;c[I+(S*1160|0)+104>>2]=z;c[I+(S*1160|0)+112>>2]=z;c[I+(S*1160|0)+116>>2]=z;c[I+(S*1160|0)+108>>2]=A;c[I+(S*1160|0)+96>>2]=A;c[I+(S*1160|0)+120>>2]=A;L=S}}while(0);Ma(u|0);t=L;i=k;return t|0}function uf(e,f,g,h){e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0;j=i;i=i+24|0;k=f;f=i;i=i+19|0;i=i+7&-8;c[f>>2]=c[k>>2];c[f+4>>2]=c[k+4>>2];c[f+8>>2]=c[k+8>>2];c[f+12>>2]=c[k+12>>2];b[f+16>>1]=b[k+16>>1]|0;a[f+18|0]=a[k+18|0]|0;k=j|0;Kh(k|0,f|0,19)|0;f=e+4|0;l=e+8|0;e=c[l>>2]|0;if((e|0)==0){m=1;i=j;return m|0}n=c[f>>2]|0;o=n;p=0;q=n;n=e;while(1){if((a[o+19|0]|0)==0){r=q;s=n}else{if((wd(o|0,k)|0)!=0){break}r=c[f>>2]|0;s=c[l>>2]|0}e=p+1|0;if(e>>>0<s>>>0){o=r+(e*1160|0)|0;p=e;q=r;n=s}else{m=1;t=34;break}}if((t|0)==34){i=j;return m|0}if((p|0)==-1){m=1;i=j;return m|0}s=c[f>>2]|0;if((a[s+(p*1160|0)+19|0]|0)!=3){m=1;i=j;return m|0}if((h-6|0)>>>0>1023>>>0){m=1;i=j;return m|0}f=h+65531|0;h=f&65535;n=g+1|0;r=va(d[n]|d[n+1|0]<<8|d[n+2|0]<<16|d[n+3|0]<<24|0)|0;n=g+5|0;g=f&65535;if((h&65535)>>>0>1024>>>0){m=1;i=j;return m|0}f=s+(p*1160|0)+96|0;q=c[f>>2]|0;o=r-q|0;if(o>>>0>1024>>>0){m=0;i=j;return m|0}l=s+(p*1160|0)+84|0;k=c[l>>2]|0;do{if(o>>>0>k>>>0){if((a[s+(p*1160|0)+1153|0]|0)==0){m=0;i=j;return m|0}e=s+(p*1160|0)+80|0;u=o<<1;v=s+(p*1160|0)+120|0;w=c[v>>2]|0;x=w+k|0;y=u>>>0>1024>>>0?1024:u;if(k>>>0>y>>>0){m=0;i=j;return m|0}do{if((y|0)==(k|0)){z=k}else{u=Fh(1,y*1026|0)|0;A=u;if((u|0)==0){m=0;i=j;return m|0}u=c[e>>2]|0;if((u|0)==0){c[e>>2]=A;z=y;break}if((k|0)!=0){B=w;do{Kh(A+(((B>>>0)%(y>>>0)|0)*1026|0)|0,u+(((B>>>0)%(k>>>0)|0)*1026|0)|0,1026)|0;B=B+1|0;}while((B|0)!=(x|0))}Eh(u|0);c[e>>2]=A;z=y}}while(0);if((z|0)==-1){m=0;i=j;return m|0}else{c[l>>2]=z;C=z;D=c[f>>2]|0;F=v;break}}else{C=k;D=q;F=s+(p*1160|0)+120|0}}while(0);q=(c[F>>2]|0)+C|0;F=s+(p*1160|0)+108|0;k=r-(c[F>>2]|0)|0;z=D;while(1){if((z|0)==(q|0)){G=C;break}if((z|0)==(r|0)){t=28;break}else{z=z+1|0}}do{if((t|0)==28){z=s+(p*1160|0)+80|0;Kh((c[z>>2]|0)+(((r>>>0)%(C>>>0)|0)*1026|0)|0,n|0,g)|0;b[(c[z>>2]|0)+(((r>>>0)%((c[l>>2]|0)>>>0)|0)*1026|0)+1024>>1]=h;z=id()|0;D=s+(p*1160|0)+56|0;c[D>>2]=z;c[D+4>>2]=E;D=c[l>>2]|0;if(k>>>0>=D>>>0){G=D;break}c[F>>2]=r;G=D}}while(0);r=c[f>>2]|0;if((r|0)==(q|0)){m=0;i=j;return m|0}F=c[s+(p*1160|0)+80>>2]|0;p=r;while(1){if((b[F+(((p>>>0)%(G>>>0)|0)*1026|0)+1024>>1]|0)==0){m=0;t=34;break}c[f>>2]=p;r=p+1|0;if((r|0)==(q|0)){m=0;t=34;break}else{p=r}}if((t|0)==34){i=j;return m|0}return 0}function vf(f){f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;g=i;i=i+2096|0;h=g|0;j=g+1032|0;k=g+2056|0;l=g+2072|0;m=l|0;n=id()|0;o=E;p=f+4|0;q=f+8|0;if((c[q>>2]|0)!=0){r=f|0;s=k|0;t=k+1|0;u=k+5|0;k=c[p>>2]|0;v=0;while(1){x=k+19|0;y=a[x]|0;do{if(y<<24>>24==1){z=k+40|0;A=c[z>>2]|0;B=c[z+4>>2]|0;C=Yh(1e6,0,e[k+22>>1]|0,0)|0;D=Nh(C,E,A,B)|0;B=E;if(B>>>0>o>>>0|B>>>0==o>>>0&D>>>0>n>>>0){F=1;G=7;break}D=c[k+88>>2]|0;B=c[r>>2]|0;Kh(m|0,k|0,19)|0;a[s]=16;w=va(D|0)|0;a[t]=w;w=w>>8;a[t+1|0]=w;w=w>>8;a[t+2|0]=w;w=w>>8;a[t+3|0]=w;w=va(0)|0;a[u]=w;w=w>>8;a[u+1|0]=w;w=w>>8;a[u+2|0]=w;w=w>>8;a[u+3|0]=w;ld(B,l,s,9)|0;c[z>>2]=n;c[z+4>>2]=o;H=a[x]|0;G=6}else{H=y;G=6}}while(0);if((G|0)==6){G=0;if(H<<24>>24!=0){F=H;G=7}}do{if((G|0)==7){G=0;y=k+48|0;z=c[y>>2]|0;B=c[y+4>>2]|0;y=Xh(d[k+1152|0]|0,0,1e6,0)|0;D=Nh(y,E,z,B)|0;B=E;if(B>>>0>=o>>>0&(B>>>0>o>>>0|D>>>0>=n>>>0)|F<<24>>24==4){I=F}else{a[x]=4;I=4}D=k+64|0;B=c[D+4>>2]|0;if(B>>>0<o>>>0|B>>>0==o>>>0&(c[D>>2]|0)>>>0<n>>>0){a[x]=4;J=4}else{J=I}if(!((a[k+20|0]|0)==2&J<<24>>24==4)){break}hf(f,v)|0}}while(0);x=v+1|0;if(x>>>0<(c[q>>2]|0)>>>0){k=(c[p>>2]|0)+(x*1160|0)|0;v=x}else{break}}}v=id()|0;k=E;J=c[q>>2]|0;if((J|0)!=0){I=c[p>>2]|0;n=I;o=0;F=I;I=J;while(1){do{if(((a[n+19|0]|0)-2&255)>>>0<2>>>0){J=n+32|0;G=c[J>>2]|0;H=c[J+4>>2]|0;s=Yh(1e6,0,e[n+22>>1]|0,0)|0;l=Nh(s,E,G,H)|0;H=E;if(H>>>0>k>>>0|H>>>0==k>>>0&l>>>0>v>>>0){K=F;L=I;break}xf(f,o);c[J>>2]=v;c[J+4>>2]=k;K=c[p>>2]|0;L=c[q>>2]|0}else{K=F;L=I}}while(0);J=o+1|0;if(J>>>0<L>>>0){n=K+(J*1160|0)|0;o=J;F=K;I=L}else{break}}}L=id()|0;I=E;K=c[q>>2]|0;if((K|0)!=0){F=c[p>>2]|0;o=f|0;f=h|0;n=h+1|0;k=h+5|0;h=j;j=F;v=0;J=F;F=K;while(1){do{if((a[j+19|0]|0)==3){K=J;if((a[K+(v*1160|0)+19|0]|0)==0){M=J;N=F;break}if((c[K+(v*1160|0)+112>>2]|0)==(c[K+(v*1160|0)+116>>2]|0)){M=J;N=F;break}K=j+40|0;l=c[K>>2]|0;H=c[K+4>>2]|0;G=j+24|0;s=Yh(1e6,0,c[G>>2]|0,0)|0;u=Nh(s,E,l,H)|0;s=E;if(s>>>0>I>>>0|s>>>0==I>>>0&u>>>0>L>>>0){M=J;N=F;break}a:do{if(H>>>0<I>>>0|H>>>0==I>>>0&l>>>0<L>>>0){u=H;s=l;t=J;while(1){m=t;r=m+(v*1160|0)+1148|0;if((b[r>>1]|0)==0){x=m+(v*1160|0)+104|0;D=c[x>>2]|0;if((c[m+(v*1160|0)+112>>2]|0)==(D|0)){break a}B=c[o>>2]|0;z=(D>>>0)%((c[m+(v*1160|0)+76>>2]|0)>>>0)|0;a[f]=18;w=va(D|0)|0;a[n]=w;w=w>>8;a[n+1|0]=w;w=w>>8;a[n+2|0]=w;w=w>>8;a[n+3|0]=w;D=c[m+(v*1160|0)+72>>2]|0;y=D+(z*1026|0)+1024|0;Kh(k|0,D+(z*1026|0)|0,e[y>>1]|0)|0;z=ld(B,m+(v*1160|0)|0,f,(e[y>>1]|0)+5|0)|0;c[x>>2]=(c[x>>2]|0)+1;O=z}else{z=m+(v*1160|0)+124|0;x=c[z>>2]|0;y=c[o>>2]|0;B=(x>>>0)%((c[m+(v*1160|0)+76>>2]|0)>>>0)|0;a[f]=18;w=va(x|0)|0;a[n]=w;w=w>>8;a[n+1|0]=w;w=w>>8;a[n+2|0]=w;w=w>>8;a[n+3|0]=w;x=c[m+(v*1160|0)+72>>2]|0;D=x+(B*1026|0)+1024|0;Kh(k|0,x+(B*1026|0)|0,e[D>>1]|0)|0;B=ld(y,m+(v*1160|0)|0,f,(e[D>>1]|0)+5|0)|0;D=(b[r>>1]|0)-1&65535;b[r>>1]=D;r=(D&65535)<<2;Kh(h|0,m+(v*1160|0)+128|0,r)|0;Kh(z|0,h|0,r)|0;O=B}if((O|0)<1){break a}B=Yh(1e6,0,c[G>>2]|0,0)|0;r=Nh(B,E,s,u)|0;B=E;if(!(B>>>0<I>>>0|B>>>0==I>>>0&r>>>0<L>>>0)){break a}u=B;s=r;t=c[p>>2]|0}}}while(0);c[K>>2]=L;c[K+4>>2]=I;M=c[p>>2]|0;N=c[q>>2]|0}else{M=J;N=F}}while(0);G=v+1|0;if(G>>>0<N>>>0){j=M+(G*1160|0)|0;v=G;J=M;F=N}else{break}}}N=id()|0;F=E;M=c[q>>2]|0;if((M|0)==0){i=g;return}J=c[p>>2]|0;v=J;j=0;I=M;M=J;while(1){J=a[v+19|0]|0;b:do{if((J-1&255)>>>0<2>>>0){b[v+22>>1]=20}else{if(J<<24>>24!=3){break}do{if(I>>>0>j>>>0){L=M;if((a[L+(j*1160|0)+19|0]|0)==0){break}if((c[L+(j*1160|0)+112>>2]|0)==(c[L+(j*1160|0)+116>>2]|0)){break}b[v+22>>1]=20;break b}}while(0);K=v+56|0;L=Nh(c[K>>2]|0,c[K+4>>2]|0,2e5,0)|0;K=E;O=v+22|0;if(K>>>0>F>>>0|K>>>0==F>>>0&L>>>0>N>>>0){b[O>>1]=20;break}else{b[O>>1]=2;break}}}while(0);J=j+1|0;O=c[p>>2]|0;L=c[q>>2]|0;if(J>>>0<L>>>0){v=O+(J*1160|0)|0;j=J;I=L;M=O}else{break}}i=g;return}function wf(a){a=a|0;var b=0,d=0;b=a+8|0;if((c[b>>2]|0)!=0){d=0;do{hf(a,d)|0;d=d+1|0;}while(d>>>0<(c[b>>2]|0)>>>0)}Eh(c[a+4>>2]|0);Eh(a);return}function xf(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,x=0,y=0;f=i;i=i+2088|0;g=f|0;h=f+1040|0;j=f+1064|0;k=c[d+4>>2]|0;Kh(h|0,k+(e*1160|0)|0,19)|0;l=a[k+(e*1160|0)+1151|0]|0;m=k+(e*1160|0)+96|0;n=c[m>>2]|0;o=va(n|0)|0;p=va(c[k+(e*1160|0)+104>>2]|0)|0;a:do{if((c[d+8>>2]|0)>>>0>e>>>0){if((a[k+(e*1160|0)+19|0]|0)==0){q=0}else{q=n-(c[k+(e*1160|0)+120>>2]|0)|0}r=c[k+(e*1160|0)+84>>2]|0;if(q>>>0>=(r-1|0)>>>0){s=0;break}t=k+(e*1160|0)+80|0;u=c[k+(e*1160|0)+108>>2]|0;v=n;x=0;while(1){if((v|0)==(u|0)){break}if((b[(c[t>>2]|0)+(((v>>>0)%(r>>>0)|0)*1026|0)+1024>>1]|0)==0){c[j+(x<<2)>>2]=va(v|0)|0;y=x+1|0}else{y=x}if(y>>>0>255>>>0){s=y;break a}else{v=v+1|0;x=y}}if((x|0)!=0){s=x;break}c[m>>2]=u;s=0}else{s=0}}while(0);m=g|0;a[m]=17;a[g+1|0]=l;l=g+2|0;w=o;a[l]=w;w=w>>8;a[l+1|0]=w;w=w>>8;a[l+2|0]=w;w=w>>8;a[l+3|0]=w;l=g+6|0;w=p;a[l]=w;w=w>>8;a[l+1|0]=w;w=w>>8;a[l+2|0]=w;w=w>>8;a[l+3|0]=w;l=s<<2;Kh(g+10|0,j|0,l)|0;ld(c[d>>2]|0,h,m,l+10|0)|0;i=f;return}function yf(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e=a+16+(b<<10)+((d&255)<<2)|0;d=c[e>>2]|0;if((d|0)!=0){f=d;return f|0}d=jd()|0;c[e>>2]=d;f=d;return f|0}function zf(a,b,c){a=a|0;b=b|0;c=c|0;Lg(c,a,b)|0;return}function Af(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;i=i+2096|0;h=g|0;j=g+1056|0;k=e+16|0;if(k>>>0>1024>>>0|(e|0)==0){l=-1;i=g;return l|0}m=h|0;Jh(m|0,0,1056)|0;Kh(h+32|0,d|0,e)|0;d=j|0;Mg(d,m,e+32|0,0,c,b)|0;if((a[j+15|0]|(a[j+14|0]|(a[j+13|0]|(a[j+12|0]|(a[j+11|0]|(a[j+10|0]|(a[j+9|0]|(a[j+8|0]|(a[j+7|0]|(a[j+6|0]|(a[j+5|0]|(a[j+4|0]|(a[j+3|0]|(a[j+2|0]|(a[j+1|0]|a[d])))))))))))))))<<24>>24!=0){l=-1;i=g;return l|0}Kh(f|0,j+16|0,k)|0;l=k;i=g;return l|0}



function Bf(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;g=i;i=i+2096|0;h=g|0;j=g+1056|0;if((e-17|0)>>>0>1007>>>0){k=-1;i=g;return k|0}l=j|0;Jh(l|0,0,1040)|0;Kh(j+16|0,d|0,e)|0;if((Ng(h|0,l,e+16|0,0,c,b)|0)==-1){k=-1;i=g;return k|0}else{m=0;n=0}do{m=a[h+n|0]|m;n=n+1|0;}while(n>>>0<32>>>0);if(m<<24>>24!=0){k=-1;i=g;return k|0}m=e-16|0;Kh(f|0,h+32|0,m)|0;k=m;i=g;return k|0}function Cf(b,c,d,e,f,g){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0;h=i;i=i+2128|0;j=h|0;k=h+1056|0;l=h+2096|0;Lg(l,b,c)|0;c=j|0;b=k|0;m=f+16|0;if(m>>>0>1024>>>0|(f|0)==0){n=-1;i=h;return n|0}Jh(c|0,0,1056)|0;Kh(j+32|0,e|0,f)|0;Mg(b,c,f+32|0,0,d,l)|0;if((a[k+1|0]|a[b]|a[k+2|0]|a[k+3|0]|a[k+4|0]|a[k+5|0]|a[k+6|0]|a[k+7|0]|a[k+8|0]|a[k+9|0]|a[k+10|0]|a[k+11|0]|a[k+12|0]|a[k+13|0]|a[k+14|0]|a[k+15|0])<<24>>24!=0){n=-1;i=h;return n|0}Kh(g|0,k+16|0,m)|0;n=m;i=h;return n|0}function Df(b,c,d,e,f,g){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0;h=i;i=i+2128|0;j=h|0;k=h+1056|0;l=h+2096|0;Lg(l,b,c)|0;c=k|0;if((f-17|0)>>>0>1007>>>0){m=-1;i=h;return m|0}Jh(c|0,0,1040)|0;Kh(k+16|0,e|0,f)|0;if((Ng(j|0,c,f+16|0,0,d,l)|0)==-1){m=-1;i=h;return m|0}else{n=0;o=0}do{n=a[j+o|0]|n;o=o+1|0;}while(o>>>0<32>>>0);if(n<<24>>24!=0){m=-1;i=h;return m|0}n=f-16|0;Kh(g|0,j+32|0,n)|0;m=n;i=h;return m|0}function Ef(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;if((d|0)==0){g=-1;i=f;return g|0}h=d+32|0;j=mb()|0;k=i;i=i+h|0;i=i+7&-8;l=d+16|0;m=i;i=i+h|0;i=i+7&-8;Jh(k|0,0,32)|0;Kh(k+32|0,c|0,d)|0;Yg(m,k,h,0,b,a)|0;Kh(e|0,m+16|0,l)|0;Ma(j|0);g=l;i=f;return g|0}function Ff(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;if(d>>>0<17>>>0){g=-1;i=f;return g|0}h=mb()|0;j=i;i=i+(d+32)|0;i=i+7&-8;k=d+16|0;l=i;i=i+k|0;i=i+7&-8;Jh(j|0,0,16)|0;Kh(l+16|0,c|0,d)|0;if((Zg(j,l,k,0,b,a)|0)==-1){m=-1}else{a=d-16|0;Kh(e|0,j+32|0,a)|0;m=a}Ma(h|0);g=m;i=f;return g|0}function Gf(a){a=a|0;Pg(a,24,0);return}function Hf(a){a=a|0;Pg(a,32,0);return}function If(b){b=b|0;var c=0,d=0,e=0,f=0,g=0;if(a[152]|0){c=24}else{Pg(10192,24,0);a[152]=1;c=24}while(1){if((c|0)==0){d=5;break}e=c-1|0;f=10192+e|0;g=(a[f]|0)+1&255;a[f]=g;if(g<<24>>24==0){c=e}else{d=5;break}}if((d|0)==5){Kh(b|0,10192,24)|0;return}}function Jf(b,d,f){b=b|0;d=d|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;g=i;i=i+3120|0;h=g|0;j=g+1056|0;k=g+2096|0;if((c[b+8>>2]|0)>>>0<=d>>>0){l=0;i=g;return l|0}m=b+4|0;n=c[m>>2]|0;if((a[n+(d*224|0)+208|0]|0)!=3){l=0;i=g;return l|0}o=k|0;p=nf(c[b>>2]|0,e[n+(d*224|0)+210>>1]|0,o)|0;if((p|0)==0){l=0;i=g;return l|0}if((a[o]|0)!=3){l=-1;i=g;return l|0}o=c[m>>2]|0;n=j|0;if((p-18|0)>>>0>1007>>>0){l=-1;i=g;return l|0}Jh(n|0,0,1040)|0;Kh(j+16|0,k+1|0,p-1|0)|0;if((Ng(h|0,n,p+15|0,0,o+(d*224|0)+32|0,o+(d*224|0)+176|0)|0)==-1){l=-1;i=g;return l|0}else{q=0;r=0}do{q=a[h+r|0]|q;r=r+1|0;}while(r>>>0<32>>>0);if(q<<24>>24!=0){l=-1;i=g;return l|0}q=p-17|0;Kh(f|0,h+32|0,q)|0;if((q|0)==-1){l=-1;i=g;return l|0}h=c[m>>2]|0;m=24;while(1){if((m|0)==0){l=q;s=13;break}f=m-1|0;p=h+(d*224|0)+32+f|0;r=(a[p]|0)+1&255;a[p]=r;if(r<<24>>24==0){m=f}else{l=q;s=13;break}}if((s|0)==13){i=g;return l|0}return 0}function Kf(b,d,f,g){b=b|0;d=d|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;h=i;i=i+3120|0;j=h|0;k=h+1056|0;l=h+2096|0;if((c[b+8>>2]|0)>>>0<=d>>>0){m=0;i=h;return m|0}n=g+16|0;if(n>>>0>1023>>>0){m=0;i=h;return m|0}o=b+4|0;p=c[o>>2]|0;if((a[p+(d*224|0)+208|0]|0)!=3){m=0;i=h;return m|0}q=l|0;r=j|0;s=k|0;if(n>>>0>1024>>>0|(g|0)==0){m=0;i=h;return m|0}Jh(r|0,0,1056)|0;Kh(j+32|0,f|0,g)|0;Mg(s,r,g+32|0,0,p+(d*224|0)+56|0,p+(d*224|0)+176|0)|0;if((a[k+1|0]|a[s]|a[k+2|0]|a[k+3|0]|a[k+4|0]|a[k+5|0]|a[k+6|0]|a[k+7|0]|a[k+8|0]|a[k+9|0]|a[k+10|0]|a[k+11|0]|a[k+12|0]|a[k+13|0]|a[k+14|0]|a[k+15|0])<<24>>24!=0){m=0;i=h;return m|0}Kh(l+1|0,k+16|0,n)|0;if((n|0)==-1){m=0;i=h;return m|0}a[q]=3;if((qf(c[b>>2]|0,e[(c[o>>2]|0)+(d*224|0)+210>>1]|0,q,g+17|0)|0)==0){m=0;i=h;return m|0}g=c[o>>2]|0;o=24;while(1){if((o|0)==0){m=1;t=11;break}q=o-1|0;b=g+(d*224|0)+56+q|0;n=(a[b]|0)+1&255;a[b]=n;if(n<<24>>24==0){o=q}else{m=1;t=11;break}}if((t|0)==11){i=h;return m|0}return 0}function Lf(b,c,d,e,f,g,h){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0;j=i;i=i+1048|0;k=j+24|0;if((g+106|0)>>>0>1024>>>0){l=-1;i=j;return l|0}m=g+1|0;n=k|0;Kh(k+1|0,f|0,g)|0;a[n]=h;h=j|0;if(a[152]|0){o=24}else{Pg(10192,24,0);a[152]=1;o=24}do{if((o|0)==0){break}o=o-1|0;g=10192+o|0;f=(a[g]|0)+1&255;a[g]=f;}while(f<<24>>24==0);Kh(h|0,10192,24)|0;o=Cf(e,c,h,n,m,d+89|0)|0;if((o|0)==-1){l=-1;i=j;return l|0}a[d]=32;Kh(d+1|0,e|0,32)|0;Kh(d+33|0,b|0,32)|0;Kh(d+65|0,h|0,24)|0;l=o+89|0;i=j;return l|0}function Mf(b,c,d,e,f,g,h){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;j=i;i=i+3176|0;k=j|0;l=j+1056|0;m=j+2152|0;n=h&65535;if((h-106&65535)>>>0>=919>>>0){o=-1;i=j;return o|0}if((Mh(g+1|0,b|0,32)|0)!=0){o=-1;i=j;return o|0}Kh(d|0,g+33|0,32)|0;b=j+2128|0;Kh(b|0,g+65|0,24)|0;h=j+2096|0;Lg(h,d,c)|0;c=l|0;d=n-106|0;if(d>>>0>1007>>>0){o=-1;i=j;return o|0}Jh(c|0,0,1040)|0;Kh(l+16|0,g+89|0,n-89|0)|0;if((Ng(k|0,c,n-73|0,0,b,h)|0)==-1){o=-1;i=j;return o|0}else{p=0;q=0}do{p=a[k+q|0]|p;q=q+1|0;}while(q>>>0<32>>>0);if(p<<24>>24!=0){o=-1;i=j;return o|0}p=m|0;Kh(p|0,k+32|0,n-105|0)|0;if((n-104|0)>>>0<2>>>0){o=-1;i=j;return o|0}a[f]=a[p]|0;Kh(e|0,m+1|0,d)|0;o=d;i=j;return o|0}function Nf(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=b&255;c[a+76+(f<<3)>>2]=d;c[a+76+(f<<3)+4>>2]=e;return}function Of(d,f,g){d=d|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;h=i;i=i+1128|0;j=g;g=i;i=i+19|0;i=i+7&-8;c[g>>2]=c[j>>2];c[g+4>>2]=c[j+4>>2];c[g+8>>2]=c[j+8>>2];c[g+12>>2]=c[j+12>>2];b[g+16>>1]=b[j+16>>1]|0;a[g+18|0]=a[j+18|0]|0;j=h|0;k=h+1024|0;l=h+1080|0;m=h+1104|0;n=d+8|0;o=c[n>>2]|0;p=d+4|0;q=c[p>>2]|0;do{if((o|0)==0){r=1;s=q|0}else{t=0;while(1){if((a[q+(t*224|0)+208|0]|0)!=0){if((Mh(f|0,q+(t*224|0)|0,32)|0)==0){u=6;break}}v=t+1|0;if(v>>>0<o>>>0){t=v}else{w=o;break}}do{if((u|0)==6){if((t|0)==-1){w=o;break}kf(m,c[d>>2]|0,e[q+(t*224|0)+210>>1]|0);if((wd(m,g)|0)==0){w=c[n>>2]|0;break}else{x=-1;i=h;return x|0}}}while(0);t=w+1|0;v=c[p>>2]|0;if((t|0)!=0){r=t;s=v;break}Eh(v);c[p>>2]=0;x=-1;i=h;return x|0}}while(0);w=Gh(s,r*224|0)|0;if((w|0)==0){x=-1;i=h;return x|0}r=w;c[p>>2]=r;w=c[n>>2]|0;Jh(r+(w*224|0)|0,0,224)|0;b[r+(w*224|0)+210>>1]=-1;s=0;while(1){if(s>>>0>w>>>0){x=-1;u=27;break}y=s+1|0;if((a[r+(s*224|0)+208|0]|0)==0){break}else{s=y}}if((u|0)==27){i=h;return x|0}r=d|0;w=df(c[r>>2]|0,g)|0;if((w|0)==-1){x=-1;i=h;return x|0}b[(c[p>>2]|0)+(s*224|0)+210>>1]=w;a[(c[p>>2]|0)+(s*224|0)+208|0]=1;Pg((c[p>>2]|0)+(s*224|0)+32|0,24,0);Kh((c[p>>2]|0)+(s*224|0)|0,f|0,32)|0;g=c[p>>2]|0;Kg(g+(s*224|0)+80|0,g+(s*224|0)+112|0)|0;g=Zd()|0;m=Nh(g,E,10,0)|0;g=(c[p>>2]|0)+(s*224|0)+216|0;c[g>>2]=m;c[g+4>>2]=E;if((c[n>>2]|0)==(s|0)){c[n>>2]=y}y=c[p>>2]|0;n=y+(s*224|0)+32|0;g=y+(s*224|0)+80|0;y=j|0;m=k|0;q=l|0;if(a[152]|0){z=24}else{Pg(10192,24,0);a[152]=1;z=24}do{if((z|0)==0){break}z=z-1|0;l=10192+z|0;o=(a[l]|0)+1&255;a[l]=o;}while(o<<24>>24==0);Kh(q|0,10192,24)|0;Kh(m|0,n|0,24)|0;Kh(k+24|0,g|0,32)|0;g=Cf(f,d+44|0,q,m,56,j+57|0)|0;if((g|0)==-1){x=-1;i=h;return x|0}a[y]=2;Kh(j+1|0,d+12|0,32)|0;Kh(j+33|0,q|0,24)|0;if((qf(c[r>>2]|0,w,y,g+57|0)|0)!=1){x=-1;i=h;return x|0}g=c[p>>2]|0;p=24;while(1){if((p|0)==0){x=s;u=27;break}y=p-1|0;w=g+(s*224|0)+32+y|0;r=(a[w]|0)+1&255;a[w]=r;if(r<<24>>24==0){p=y}else{x=s;u=27;break}}if((u|0)==27){i=h;return x|0}return 0}function Pf(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;g=i;i=i+3208|0;h=g|0;j=g+1056|0;k=g+2128|0;l=g+2184|0;m=b|0;n=gf(c[m>>2]|0,1)|0;if((n|0)==-1){o=-1;i=g;return o|0}p=l|0;q=k|0;r=l+1|0;s=b+44|0;b=l+33|0;t=l+57|0;l=g+2096|0;u=h|0;v=j|0;w=j+16|0;j=n;a:while(1){n=(jf(c[m>>2]|0,j)|0)==4;x=c[m>>2]|0;do{if(n){hf(x,j)|0}else{y=(mf(x,j)|0)<<24>>24==2;z=c[m>>2]|0;if(!y){hf(z,j)|0;break}y=((of(z,j,p)|0)&65535)<<16>>16==129;do{if(y&(a[p]|0)==2){Kh(d|0,r|0,32)|0;Lg(l,d,s)|0;Jh(v|0,0,1040)|0;Kh(w|0,t|0,72)|0;if((Ng(u,v,88,0,b,l)|0)==-1){break}else{A=0;B=0}do{A=a[h+B|0]|A;B=B+1|0;}while(B>>>0<32>>>0);if(A<<24>>24==0){break a}}}while(0);hf(c[m>>2]|0,j)|0}}while(0);x=gf(c[m>>2]|0,1)|0;if((x|0)==-1){o=-1;C=14;break}else{j=x}}if((C|0)==14){i=g;return o|0}Kh(q|0,h+32|0,56)|0;Kh(e|0,q|0,24)|0;Kh(f|0,k+24|0,32)|0;o=j;i=g;return o|0}function Qf(d,f){d=d|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;g=d+8|0;if((c[g>>2]|0)>>>0<=f>>>0){h=1;return h|0}i=d+4|0;j=(c[i>>2]|0)+(f*224|0)+208|0;if((a[j]|0)==0){h=1;return h|0}a[j]=0;hf(c[d>>2]|0,e[(c[i>>2]|0)+(f*224|0)+210>>1]|0)|0;Jh((c[i>>2]|0)+(f*224|0)|0,0,224)|0;b[(c[i>>2]|0)+(f*224|0)+210>>1]=-1;f=c[g>>2]|0;d=f;while(1){if((d|0)==0){k=0;l=1;break}j=d-1|0;if((a[(c[i>>2]|0)+(j*224|0)+208|0]|0)==0){d=j}else{k=d;l=0;break}}if((f|0)==(k|0)){h=0;return h|0}c[g>>2]=k;g=c[i>>2]|0;if(l){Eh(g);c[i>>2]=0;h=0;return h|0}l=Gh(g,k*224|0)|0;if((l|0)==0){h=0;return h|0}c[i>>2]=l;h=0;return h|0}function Rf(d,e,f,g,h){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;j=i;i=i+1112|0;k=j|0;l=j+1024|0;m=j+1080|0;n=j+1104|0;o=d|0;if((pf(c[o>>2]|0,e)|0)==-1){p=-1;i=j;return p|0}q=d+8|0;r=(c[q>>2]|0)+1|0;s=d+4|0;t=c[s>>2]|0;if((r|0)==0){Eh(t);c[s>>2]=0;p=-1;i=j;return p|0}u=Gh(t,r*224|0)|0;if((u|0)==0){p=-1;i=j;return p|0}r=u;c[s>>2]=r;u=c[q>>2]|0;Jh(r+(u*224|0)|0,0,224)|0;b[r+(u*224|0)+210>>1]=-1;t=0;while(1){if(t>>>0>u>>>0){p=-1;v=23;break}w=r+(t*224|0)+208|0;x=t+1|0;if((a[w]|0)==0){break}else{t=x}}if((v|0)==23){i=j;return p|0}b[r+(t*224|0)+210>>1]=e;a[w]=2;w=Zd()|0;r=Nh(w,E,10,0)|0;w=(c[s>>2]|0)+(t*224|0)+216|0;c[w>>2]=r;c[w+4>>2]=E;Pg((c[s>>2]|0)+(t*224|0)+32|0,24,0);Kh((c[s>>2]|0)+(t*224|0)+56|0,g|0,24)|0;Kh((c[s>>2]|0)+(t*224|0)+144|0,h|0,32)|0;h=c[s>>2]|0;g=24;do{if((g|0)==0){break}g=g-1|0;w=h+(t*224|0)+56+g|0;r=(a[w]|0)+1&255;a[w]=r;}while(r<<24>>24==0);Kh((c[s>>2]|0)+(t*224|0)|0,f|0,32)|0;g=c[s>>2]|0;Kg(g+(t*224|0)+80|0,g+(t*224|0)+112|0)|0;if((c[q>>2]|0)==(t|0)){c[q>>2]=x}x=c[s>>2]|0;q=x+(t*224|0)+32|0;g=x+(t*224|0)+80|0;x=k|0;h=l|0;r=m|0;if(a[152]|0){y=24}else{Pg(10192,24,0);a[152]=1;y=24}do{if((y|0)==0){break}y=y-1|0;m=10192+y|0;w=(a[m]|0)+1&255;a[m]=w;}while(w<<24>>24==0);Kh(r|0,10192,24)|0;Kh(h|0,q|0,24)|0;Kh(l+24|0,g|0,32)|0;g=Cf(f,d+44|0,r,h,56,k+57|0)|0;if((g|0)==-1){p=-1;i=j;return p|0}a[x]=2;Kh(k+1|0,d+12|0,32)|0;Kh(k+33|0,r|0,24)|0;if((qf(c[o>>2]|0,e,x,g+57|0)|0)!=1){p=-1;i=j;return p|0}g=c[s>>2]|0;x=24;do{if((x|0)==0){break}x=x-1|0;e=g+(t*224|0)+32+x|0;o=(a[e]|0)+1&255;a[e]=o;}while(o<<24>>24==0);c[n>>2]=0;x=c[s>>2]|0;Lg(x+(t*224|0)+176|0,x+(t*224|0)+144|0,x+(t*224|0)+112|0)|0;a[(c[s>>2]|0)+(t*224|0)+208|0]=3;Kf(d,t,n,4)|0;a[(c[s>>2]|0)+(t*224|0)+208|0]=2;p=t;i=j;return p|0}function Sf(a,b){a=a|0;b=b|0;var e=0;if((c[a+8>>2]|0)>>>0<=b>>>0){e=0;return e|0}e=d[(c[a+4>>2]|0)+(b*224|0)+208|0]|0;return e|0}function Tf(a){a=a|0;var b=0,d=0,e=0;Yd();do{if((a|0)==0){b=0}else{d=Fh(1,2124)|0;if((d|0)==0){b=0;break}e=rf(a)|0;c[d>>2]=e;if((e|0)==0){Eh(d);b=0;break}else{Kg(d+12|0,d+44|0)|0;b=d;break}}}while(0);return b|0}function Uf(a){a=a|0;md(c[c[c[a>>2]>>2]>>2]|0,32,24,a);return}function Vf(e,f,g,h){e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;j=i;i=i+1064|0;k=f;f=i;i=i+19|0;i=i+7&-8;c[f>>2]=c[k>>2];c[f+4>>2]=c[k+4>>2];c[f+8>>2]=c[k+8>>2];c[f+12>>2]=c[k+12>>2];b[f+16>>1]=b[k+16>>1]|0;a[f+18|0]=a[k+18|0]|0;k=j|0;l=j+32|0;m=j+1056|0;n=e;do{if((a[g]|0)==32){if((h-106|0)>>>0>934>>>0){o=1;i=j;return o|0}p=g+1|0;q=e+14900|0;if((Mh(p|0,q|0,32)|0)!=0){if((ve(n,p,g,h)|0)==(h|0)){o=0}else{break}i=j;return o|0}p=k|0;r=l|0;s=Mf(q,e+14932|0,p,r,m,g,h&65535)|0;if((s|0)==(-1|0)|(s|0)==0){o=1;i=j;return o|0}q=d[m]|0;t=c[e>>2]|0;u=c[t+76+(q<<3)>>2]|0;if((u|0)==0){o=1;i=j;return o|0}o=Lb[u&15](c[t+76+(q<<3)+4>>2]|0,f,p,r,s)|0;i=j;return o|0}}while(0);o=1;i=j;return o|0}function Wf(b){b=b|0;var d=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0;d=i;i=i+5360|0;f=d|0;g=d+1056|0;h=d+2096|0;j=d+2128|0;k=d+2184|0;l=d+3208|0;m=d+3232|0;n=d+3264|0;o=d+3296|0;p=d+3304|0;q=d+4328|0;r=d+5352|0;Yd();s=b|0;vf(c[s>>2]|0);t=b+8|0;if((c[t>>2]|0)!=0){u=b+4|0;v=0;do{w=c[u>>2]|0;do{if((a[w+(v*224|0)+208|0]|0)!=0){if((jf(c[s>>2]|0,e[w+(v*224|0)+210>>1]|0)|0)!=4){break}a[(c[u>>2]|0)+(v*224|0)+208|0]=4}}while(0);v=v+1|0;}while(v>>>0<(c[t>>2]|0)>>>0)}v=k|0;u=l|0;l=m|0;m=n|0;n=o;w=p|0;x=q|0;q=r;y=Zd()|0;z=E;if((c[t>>2]|0)==0){A=24;B=0;C=32;D=0;i=d;return}F=b+4|0;G=h|0;h=f|0;H=g|0;I=p+1|0;p=g+16|0;g=f+32|0;J=j|0;K=k+1|0;L=b+44|0;M=k+33|0;N=k+57|0;k=j+24|0;j=0;do{O=c[F>>2]|0;P=a[O+(j*224|0)+208|0]|0;a:do{if((P<<24>>24|0)==1){Q=(mf(c[s>>2]|0,e[O+(j*224|0)+210>>1]|0)|0)<<24>>24==2;R=c[s>>2]|0;S=e[(c[F>>2]|0)+(j*224|0)+210>>1]|0;if(!Q){if((mf(R,S)|0)<<24>>24==-1){T=24;break}a[(c[F>>2]|0)+(j*224|0)+208|0]=4;T=24;break}Q=((nf(R,S,v)|0)&65535)<<16>>16==129;do{if(Q&(a[v]|0)==2){Kh(l|0,K|0,32)|0;Lg(G,l,L)|0;Jh(H|0,0,1040)|0;Kh(p|0,N|0,72)|0;if((Ng(h,H,88,0,M,G)|0)==-1){break}else{U=0;V=0}do{U=a[f+V|0]|U;V=V+1|0;}while(V>>>0<32>>>0);if(U<<24>>24!=0){break}Kh(J|0,g|0,56)|0;Kh(u|0,J|0,24)|0;Kh(m|0,k|0,32)|0;S=c[F>>2]|0;if((Mh(l|0,S+(j*224|0)|0,32)|0)!=0){a[S+(j*224|0)+208|0]=4;T=24;break a}Kh(S+(j*224|0)+56|0,u|0,24)|0;Kh((c[F>>2]|0)+(j*224|0)+144|0,m|0,32)|0;S=c[F>>2]|0;R=24;do{if((R|0)==0){break}R=R-1|0;W=S+(j*224|0)+56+R|0;X=(a[W]|0)+1&255;a[W]=X;}while(X<<24>>24==0);c[o>>2]=0;R=c[F>>2]|0;Lg(R+(j*224|0)+176|0,R+(j*224|0)+144|0,R+(j*224|0)+112|0)|0;a[(c[F>>2]|0)+(j*224|0)+208|0]=3;Kf(b,j,n,4)|0;a[(c[F>>2]|0)+(j*224|0)+208|0]=2;T=24;break a}}while(0);a[(c[F>>2]|0)+(j*224|0)+208|0]=4;T=24}else if((P<<24>>24|0)!=0){T=24}}while(0);do{if((T|0)==24){T=0;P=c[F>>2]|0;b:do{if((a[P+(j*224|0)+208|0]|0)==2){O=(mf(c[s>>2]|0,e[P+(j*224|0)+210>>1]|0)|0)<<24>>24==3;Q=c[s>>2]|0;R=e[(c[F>>2]|0)+(j*224|0)+210>>1]|0;if(!O){if((mf(Q,R)|0)<<24>>24==-1){break}a[(c[F>>2]|0)+(j*224|0)+208|0]=4;break}O=nf(Q,R,w)|0;R=c[F>>2]|0;Lg(G,R+(j*224|0)+144|0,R+(j*224|0)+112|0)|0;do{if((O-18|0)>>>0>1007>>>0){c[r>>2]=0}else{Jh(H|0,0,1040)|0;Kh(p|0,I|0,O-1|0)|0;if((Ng(h,H,O+15|0,0,R+(j*224|0)+32|0,G)|0)==-1){c[r>>2]=0;break}else{Y=0;Z=0}do{Y=a[f+Z|0]|Y;Z=Z+1|0;}while(Z>>>0<32>>>0);if(Y<<24>>24!=0){c[r>>2]=0;break}Q=O-17|0;Kh(x|0,g|0,Q)|0;c[r>>2]=0;if((Q|0)!=4){break}if((Mh(q|0,x|0,4)|0)!=0){break}Q=c[F>>2]|0;S=24;do{if((S|0)==0){break}S=S-1|0;X=Q+(j*224|0)+32+S|0;W=(a[X]|0)+1&255;a[X]=W;}while(W<<24>>24==0);S=c[F>>2]|0;Lg(S+(j*224|0)+176|0,S+(j*224|0)+144|0,S+(j*224|0)+112|0)|0;a[(c[F>>2]|0)+(j*224|0)+208|0]=3;S=(c[F>>2]|0)+(j*224|0)+216|0;c[S>>2]=-1;c[S+4>>2]=-1;ef(c[s>>2]|0,e[(c[F>>2]|0)+(j*224|0)+210>>1]|0)|0;break b}}while(0);a[(c[F>>2]|0)+(j*224|0)+208|0]=4}}while(0);P=c[F>>2]|0;O=P+(j*224|0)+216|0;R=c[O+4>>2]|0;if(!(z>>>0>R>>>0|z>>>0==R>>>0&y>>>0>(c[O>>2]|0)>>>0)){break}a[P+(j*224|0)+208|0]=4}}while(0);j=j+1|0;}while(j>>>0<(c[t>>2]|0)>>>0);A=24;B=0;C=32;D=0;i=d;return}function Xf(a){a=a|0;var b=0,d=0;b=a+8|0;if((c[b>>2]|0)!=0){d=0;do{Qf(a,d)|0;d=d+1|0;}while(d>>>0<(c[b>>2]|0)>>>0)}wf(c[a>>2]|0);Eh(a);return}function Yf(b,c,d,e,f,g,h,j,k){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0;l=i;i=i+472|0;m=d;d=i;i=i+51|0;i=i+7&-8;Kh(d,m,51)|0;m=l|0;n=l+200|0;o=m|0;Kh(o|0,g|0,32)|0;Kh(m+32|0,h|0,32)|0;Kh(m+64|0,j|0,32)|0;Kh(m+96|0,k|0,103)|0;k=n|0;a[k]=-125;m=n+1|0;Gf(m);if((Cf(d|0,f,m,o,199,n+57|0)|0)!=215){p=-1;i=l;return p|0}Kh(n+25|0,e|0,32)|0;p=Gd(b,c,d+32|0,k,272)|0;i=l;return p|0}function Zf(d,e,f,g,h,j,k,l){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0;m=i;i=i+64|0;n=f;f=i;i=i+19|0;i=i+7&-8;c[f>>2]=c[n>>2];c[f+4>>2]=c[n+4>>2];c[f+8>>2]=c[n+8>>2];c[f+12>>2]=c[n+12>>2];b[f+16>>1]=b[n+16>>1]|0;a[f+18|0]=a[n+18|0]|0;n=l&65535;l=n+105|0;o=i;i=i+l|0;i=i+7&-8;a[o]=-123;Kh(o+1|0,g|0,32)|0;g=o+33|0;Kh(g|0,j|0,24)|0;j=m|0;p=m+32|0;Kg(j,p)|0;Kh(o+57|0,j|0,32)|0;if(((Cf(h,p,g,k,n,o+89|0)|0)+89|0)!=(l|0)){q=-1;i=m;return q|0}q=Gd(d,e,f,o,l)|0;i=m;return q|0}function _f(a){a=a|0;var b=0,d=0,e=0;if((a|0)==0){b=0;return b|0}d=Fh(1,95016)|0;if((d|0)==0){b=0;return b|0}c[d>>2]=a;e=d+4|0;c[e>>2]=c[a+4>>2];Hf(d+13064|0);md(c[e>>2]|0,-125,26,d);md(c[e>>2]|0,-123,20,d);b=d;return b|0}function $f(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;h=i;i=i+1888|0;j=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[e+12>>2]=c[j+12>>2];b[e+16>>1]=b[j+16>>1]|0;a[e+18|0]=a[j+18|0]|0;j=h|0;k=h+24|0;l=h+152|0;m=h+416|0;n=h+824|0;o=h+848|0;p=h+1296|0;q=d;if((g|0)!=449){r=1;i=h;return r|0}g=f+25|0;s=h+120|0;t=d;ee(d+13096|0,s,(c[t>>2]|0)+14932|0,g);u=l|0;if((Bf(s,f+1|0,f+57|0,215,u)|0)!=199){r=1;i=h;return r|0}v=Zd()|0;x=h+352|0;y=e|0;z=k|0;A=Yh(v,E,20,0)|0;v=E;B=d+13064|0;Kh(z|0,B|0,32)|0;C=k+32|0;D=C|0;w=A;a[D]=w;w=w>>8;a[D+1|0]=w;w=w>>8;a[D+2|0]=w;w=w>>8;a[D+3|0]=w;D=C+4|0;w=v;a[D]=w;w=w>>8;a[D+1|0]=w;w=w>>8;a[D+2|0]=w;w=w>>8;a[D+3|0]=w;D=k+40|0;Kh(D|0,g|0,32)|0;v=k+72|0;Kh(v|0,y|0,19)|0;bh(x,z,91,0)|0;k=Zd()|0;A=Nh(k,E,20,0)|0;k=h+384|0;F=Yh(A,E,20,0)|0;A=E;Kh(z|0,B|0,32)|0;B=C|0;w=F;a[B]=w;w=w>>8;a[B+1|0]=w;w=w>>8;a[B+2|0]=w;w=w>>8;a[B+3|0]=w;B=C+4|0;w=A;a[B]=w;w=w>>8;a[B+1|0]=w;w=w>>8;a[B+2|0]=w;w=w>>8;a[B+3|0]=w;Kh(D|0,g|0,32)|0;Kh(v|0,y|0,19)|0;bh(k,z,91,0)|0;z=l+32|0;v=l+64|0;a:do{if((Mh(x|0,u|0,32)|0)==0){G=5}else{if((Mh(k|0,u|0,32)|0)==0){G=5;break}else{H=0}while(1){D=q+8+(H*272|0)+264|0;if((_d(c[D>>2]|0,c[D+4>>2]|0,300,0)|0)==0){if((Mh(q+8+(H*272|0)|0,z|0,32)|0)==0){I=H;break a}}D=H+1|0;if(D>>>0<48>>>0){H=D}else{I=-1;break}}}}while(0);b:do{if((G|0)==5){H=f+272|0;u=j|0;Kh(u|0,y|0,19)|0;x=0;while(1){D=q+8+(x*272|0)+264|0;if((_d(c[D>>2]|0,c[D+4>>2]|0,300,0)|0)==0){if((Mh(q+8+(x*272|0)|0,g|0,32)|0)==0){G=9;break}}D=x+1|0;if(D>>>0<48>>>0){x=D}else{J=-1;K=0;G=10;break}}if((G|0)==9){if((x|0)==-1){J=-1;K=0;G=10}else{L=x}}do{if((G|0)==10){while(1){G=0;D=q+8+(K*272|0)+264|0;B=(_d(c[D>>2]|0,c[D+4>>2]|0,300,0)|0)==0;M=B?J:K;B=K+1|0;if(B>>>0<48>>>0){J=M;K=B;G=10}else{break}}if((M|0)!=-1){L=M;break}B=(de((c[t>>2]|0)+14900|0,g,d+8|0)|0)!=1;if(B){I=-1;break b}else{L=B<<31>>31}}}while(0);Kh(q+8+(L*272|0)|0,g|0,32)|0;Kh(q+8+(L*272|0)+32|0,u|0,19)|0;Kh(q+8+(L*272|0)+51|0,H|0,177)|0;Kh(q+8+(L*272|0)+228|0,v|0,32)|0;x=Zd()|0;B=q+8+(L*272|0)+264|0;c[B>>2]=x;c[B+4>>2]=E;Kh(10120,(c[t>>2]|0)+14900|0,32)|0;Ra(d+8|0,48,272,8);B=0;while(1){x=q+8+(B*272|0)+264|0;if((_d(c[x>>2]|0,c[x+4>>2]|0,300,0)|0)==0){if((Mh(q+8+(B*272|0)|0,g|0,32)|0)==0){I=B;break b}}x=B+1|0;if(x>>>0<48>>>0){B=x}else{I=-1;break}}}}while(0);q=c[t>>2]|0;t=m|0;m=le(q,z,t,0,(Hc(e|0)|0)==0|0,1)|0;z=n|0;Gf(z);c:do{if((I|0)==-1){a[o|0]=0;Kh(o+1|0,k|0,32)|0}else{n=d+8|0;q=n+(I*272|0)+228|0;do{if((Mh(n+(I*272|0)|0,g|0,32)|0)==0){if((Mh(q|0,v|0,32)|0)==0){break}a[o|0]=0;Kh(o+1|0,k|0,32)|0;break c}}while(0);a[o|0]=1;Kh(o+1|0,q|0,32)|0}}while(0);do{if((m|0)==0){N=0}else{k=je(o+33|0,408,t,m&65535)|0;if((k|0)<1){r=1}else{N=k;break}i=h;return r|0}}while(0);m=p|0;t=Af(s,z,o|0,N+33|0,p+128|0)|0;if((t|0)!=(N+49|0)){r=1;i=h;return r|0}a[m]=-124;Kh(p+1|0,l+96|0,103)|0;Kh(p+104|0,z|0,24)|0;r=(Hd(c[d+4>>2]|0,e,m,t+128|0,f+272|0)|0)==-1|0;i=h;return r|0}function ag(d,e,f,g){d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0;h=i;j=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];c[e+12>>2]=c[j+12>>2];b[e+16>>1]=b[j+16>>1]|0;a[e+18|0]=a[j+18|0]|0;j=d;if((g-283|0)>>>0>740>>>0){k=1;i=h;return k|0}e=f+1|0;l=0;while(1){m=j+8+(l*272|0)+264|0;if((_d(c[m>>2]|0,c[m+4>>2]|0,300,0)|0)==0){if((Mh(j+8+(l*272|0)|0,e|0,32)|0)==0){break}}m=l+1|0;if(m>>>0<48>>>0){l=m}else{k=1;n=8;break}}if((n|0)==8){i=h;return k|0}if((l|0)==-1){k=1;i=h;return k|0}n=g-209|0;e=mb()|0;j=i;i=i+n|0;i=i+7&-8;a[j]=-122;Kh(j+1|0,f+33|0,g-210|0)|0;g=d+8|0;f=(Hd(c[d+4>>2]|0,g+(l*272|0)+32|0,j,n,g+(l*272|0)+51|0)|0)==-1|0;Ma(e|0);k=f;i=h;return k|0}function bg(a){a=a|0;var b=0;if((a|0)==0){return}b=a+4|0;md(c[b>>2]|0,-125,0,0);md(c[b>>2]|0,-123,0,0);Eh(a);return}function cg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;i=i+544|0;e=d|0;f=d+272|0;g=e|0;Kh(g|0,a|0,272)|0;a=f|0;Kh(a|0,b|0,272)|0;b=e+264|0;e=_d(c[b>>2]|0,c[b+4>>2]|0,300,0)|0;b=f+264|0;f=(e|0)!=0;e=(_d(c[b>>2]|0,c[b+4>>2]|0,300,0)|0)==0;if(f|e^1){h=f?(e|f^1)<<31>>31:1;i=d;return h|0}f=de(10120,g,a)|0;if((f|0)==1){h=1;i=d;return h|0}else if((f|0)==2){h=-1;i=d;return h|0}else{h=0;i=d;return h|0}return 0}function dg(b,d,f,g){b=b|0;d=d|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;h=i;i=i+2048|0;j=h+24|0;k=h+56|0;if((e[b+12>>1]|0)>>>0<=d>>>0){l=-1;i=h;return l|0}m=g+48|0;if((g+346|0)>>>0>1024>>>0|(g|0)==0){l=-1;i=h;return l|0}n=h|0;Gf(n);o=mb()|0;p=i;i=i+m|0;i=i+7&-8;q=b|0;r=c[q>>2]|0;Kh(p|0,(c[r>>2]|0)+12|0,32)|0;s=b+8|0;do{if(((Cf((c[s>>2]|0)+(d*2496|0)+35|0,(c[r>>2]|0)+44|0,n,f,g,p+32|0)|0)+32|0)==(m|0)){t=c[s>>2]|0;u=0;v=0;w=0;while(1){x=t+(d*2496|0)+72+(u*144|0)+120|0;do{if((_d(c[x>>2]|0,c[x+4>>2]|0,120,0)|0)==0){y=w+1|0;if((a[t+(d*2496|0)+72+(u*144|0)+115|0]|0)==0){z=y;A=v;break}if((eg(c[q>>2]|0,(c[s>>2]|0)+(d*2496|0)+1320|0,-1,k+(v*249|0)|0)|0)==-1){z=y;A=v;break}c[j+(v<<2)>>2]=u;z=y;A=v+1|0}else{z=w;A=v}}while(0);x=u+1|0;if(x>>>0<8>>>0){u=x;v=A;w=z}else{break}}if(A>>>0<((z>>>2)+1|0)>>>0){B=-1;break}if((A|0)==0){B=0;break}w=b+4|0;v=m&65535;u=0;x=0;while(1){y=c[j+(u<<2)>>2]|0;C=((Zf(c[w>>2]|0,k+(u*249|0)|0,t+(d*2496|0)+72+(y*144|0)+32|0,(c[s>>2]|0)+(d*2496|0)+35|0,t+(d*2496|0)+72+(y*144|0)+83|0,n,p,v)|0)==0)+x|0;y=u+1|0;if(y>>>0<A>>>0){u=y;x=C}else{B=C;break}}}else{B=-1}}while(0);Ma(o|0);l=B;i=h;return l|0}function eg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+160|0;g=f|0;if(d>>>0>2>>>0){h=(ta()|0)%3|0}else{h=d}d=b+752+(h<<3)|0;if((_d(c[d>>2]|0,c[d+4>>2]|0,30,0)|0)==0){j=b+776+(h<<3)|0;if((_d(c[j>>2]|0,c[j+4>>2]|0,600,0)|0)!=0){k=5}}else{k=5}do{if((k|0)==5){j=g|0;if((Ae(a,j,3)|0)<<16>>16!=3){l=-1;i=f;return l|0}if((Fd(a,b+(h*249|0)|0,j)|0)==-1){l=-1;i=f;return l|0}else{j=Zd()|0;m=Nh(j,E,-25,-1)|0;c[d>>2]=m;c[d+4>>2]=E;m=Zd()|0;j=b+776+(h<<3)|0;c[j>>2]=m;c[j+4>>2]=E;break}}}while(0);Kh(e|0,b+(h*249|0)|0,249)|0;l=0;i=f;return l|0}function fg(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;f=b[d+12>>1]|0;if(f<<16>>16==0){g=-1;return g|0}h=c[d+8>>2]|0;d=0;while(1){if((a[h+(d*2496|0)|0]|0)!=0){if((Mh(e|0,h+(d*2496|0)+35|0,32)|0)==0){g=d;i=6;break}}j=d+1|0;if(j>>>0<(f&65535)>>>0){d=j}else{g=-1;i=6;break}}if((i|0)==6){return g|0}return 0}function gg(d,e){d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;f=d+12|0;g=b[f>>1]|0;a:do{if(g<<16>>16==0){h=g&65535;i=d+8|0}else{j=d+8|0;k=c[j>>2]|0;l=g&65535;m=0;while(1){if((a[k+(m*2496|0)|0]|0)!=0){if((Mh(e|0,k+(m*2496|0)+35|0,32)|0)==0){break}}n=m+1|0;if(n>>>0<l>>>0){m=n}else{h=l;i=j;break a}}if((m|0)==-1){h=l;i=j;break}else{o=m}return o|0}}while(0);g=0;while(1){p=c[i>>2]|0;if(g>>>0>=h>>>0){q=12;break}if((a[p+(g*2496|0)|0]|0)==0){q=11;break}else{g=g+1|0}}if((q|0)==11){if((g|0)==-1){q=12}else{r=g;s=p}}do{if((q|0)==12){g=Gh(p|0,(h*2496|0)+2496|0)|0;if((g|0)==0){o=-1;return o|0}else{d=g;c[i>>2]=d;g=b[f>>1]|0;k=g&65535;Jh(d+(k*2496|0)|0,0,2496)|0;b[f>>1]=g+1;r=k;s=d;break}}}while(0);a[s+(r*2496|0)|0]=1;Kh((c[i>>2]|0)+(r*2496|0)+35|0,e|0,32)|0;e=c[i>>2]|0;Kg(e+(r*2496|0)+1224|0,e+(r*2496|0)+1256|0)|0;o=r;return o|0}function hg(d,f){d=d|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;g=d+12|0;if((e[g>>1]|0)>>>0<=f>>>0){h=-1;return h|0}i=d+8|0;j=c[i>>2]|0;if((a[j+(f*2496|0)+2|0]|0)==0){k=j}else{pe(c[d>>2]|0,j+(f*2496|0)+3|0)|0;k=c[i>>2]|0}Jh(k+(f*2496|0)|0,0,2496)|0;k=e[g>>1]|0;j=k;while(1){if((j|0)==0){l=0;break}if((a[(c[i>>2]|0)+(j*2496|0)|0]|0)==0){j=j-1|0}else{l=j;break}}if((k|0)==(l|0)){h=f;return h|0}b[g>>1]=l;g=l&65535;l=c[i>>2]|0;if((g|0)==0){Eh(l);c[i>>2]=0;h=f;return h|0}k=Gh(l,g*2496|0)|0;if((k|0)==0){h=f;return h|0}c[i>>2]=k;h=f;return h|0}function ig(b,d,f){b=b|0;d=d|0;f=f|0;var g=0,h=0;if((e[b+12>>1]|0)>>>0<=d>>>0){g=-1;return g|0}h=c[b+8>>2]|0;if((a[h+(d*2496|0)|0]|0)==0){g=-1;return g|0}if((a[h+(d*2496|0)+2|0]|0)==0){g=-1;return g|0}g=qe(c[b>>2]|0,h+(d*2496|0)+3|0,f)|0;return g|0}function jg(b,d,f){b=b|0;d=d|0;f=f|0;var g=0,h=0,i=0;if((e[b+12>>1]|0)>>>0<=d>>>0){g=-1;return g|0}h=b+8|0;b=(c[h>>2]|0)+(d*2496|0)+1|0;if(f<<24>>24!=0){a[b]=f;g=0;return g|0}if((a[b]|0)==1){f=Zd()|0;i=(c[h>>2]|0)+(d*2496|0)+1312|0;c[i>>2]=f;c[i+4>>2]=E;a[(c[h>>2]|0)+(d*2496|0)+1|0]=0}else{a[b]=0}b=(c[h>>2]|0)+(d*2496|0)+1304|0;c[b>>2]=0;c[b+4>>2]=0;g=0;return g|0}function kg(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0;f=b&255;c[a+2444+(f<<3)>>2]=d;c[a+2444+(f<<3)+4>>2]=e;return}function lg(d){d=d|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;f=i;i=i+408|0;g=f|0;h=d+2e3|0;j=c[h>>2]|0;k=c[h+4>>2]|0;l=Zd()|0;if((j|0)==(l|0)&(k|0)==(E|0)){i=f;return}k=0;l=0;while(1){j=d+16+(l*144|0)+120|0;do{if((_d(c[j>>2]|0,c[j+4>>2]|0,120,0)|0)==0){m=k+1|0;n=d+16+(l*144|0)+128|0;o=c[n>>2]|0;p=c[n+4>>2]|0;if((o|0)==0&(p|0)==0){c[n>>2]=1;c[n+4>>2]=0;q=m;break}r=(a[d+16+(l*144|0)+115|0]|0)==0;if((_d(o,p,r?10:30,r?0:0)|0)==0){q=m;break}if((sg(d,0,d+16+(l*144|0)+32|0,d+16+(l*144|0)|0,d+16+(l*144|0)+51|0,c[d+16+(l*144|0)+136>>2]|0)|0)!=0){q=m;break}r=Zd()|0;c[n>>2]=r;c[n+4>>2]=E;q=m}else{q=k}}while(0);j=l+1|0;if(j>>>0<8>>>0){k=q;l=j}else{break}}do{if((q|0)!=8){if(q>>>0>=((ta()|0)&7)>>>0){break}l=c[d>>2]|0;k=(c[l>>2]|0)+12|0;j=le(l,k,g|0,((ta()|0)<<3&8^10)&65535,1,0)|0;if((j|0)==0){break}else{s=0}do{sg(d,0,g+(s*51|0)+32|0,g+(s*51|0)|0,0,-1)|0;s=s+1|0;}while(s>>>0<j>>>0)}}while(0);s=d+12|0;q=b[s>>1]|0;if(q<<16>>16!=0){j=d+8|0;k=d|0;l=g|0;m=0;n=q;do{q=m&65535;r=m&65535;do{if((n&65535)>>>0>(q&65535)>>>0){p=c[j>>2]|0;if((a[p+(r*2496|0)|0]|0)==0){break}if((a[p+(r*2496|0)+1|0]|0)!=0){break}o=r+1|0;t=0;u=0;while(1){v=p+(r*2496|0)+72+(u*144|0)+120|0;do{if((_d(c[v>>2]|0,c[v+4>>2]|0,120,0)|0)==0){w=t+1|0;x=p+(r*2496|0)+72+(u*144|0)+128|0;y=c[x>>2]|0;z=c[x+4>>2]|0;if((y|0)==0&(z|0)==0){A=Zd()|0;c[x>>2]=A;c[x+4>>2]=E;B=w;break}if((_d(y,z,30,0)|0)==0){B=w;break}if((sg(d,o,p+(r*2496|0)+72+(u*144|0)+32|0,p+(r*2496|0)+72+(u*144|0)|0,0,-1)|0)!=0){B=w;break}z=Zd()|0;c[x>>2]=z;c[x+4>>2]=E;B=w}else{B=t}}while(0);v=u+1|0;if(v>>>0<8>>>0){t=B;u=v}else{break}}do{if((B|0)!=8){if(B>>>0>=((ta()|0)&7)>>>0){break}u=c[k>>2]|0;t=(c[j>>2]|0)+(r*2496|0)+35|0;p=le(u,t,l,((ta()|0)<<3&8^10)&65535,1,0)|0;if((p|0)==0){break}else{C=0}do{sg(d,o,g+(C*51|0)+32|0,g+(C*51|0)|0,0,-1)|0;C=C+1|0;}while(C>>>0<p>>>0)}}while(0);o=(c[j>>2]|0)+(r*2496|0)+1288|0;do{if((_d(c[o>>2]|0,c[o+4>>2]|0,30,0)|0)!=0){if((ug(d,q,0)|0)<=0){break}p=Zd()|0;t=(c[j>>2]|0)+(r*2496|0)+1288|0;c[t>>2]=p;c[t+4>>2]=E}}while(0);o=(c[j>>2]|0)+(r*2496|0)+1296|0;if((_d(c[o>>2]|0,c[o+4>>2]|0,20,0)|0)==0){break}if((ug(d,q,1)|0)<=0){break}o=Zd()|0;t=(c[j>>2]|0)+(r*2496|0)+1296|0;c[t>>2]=o;c[t+4>>2]=E}}while(0);do{if((e[s>>1]|0)>>>0>(q&65535)>>>0){t=c[j>>2]|0;if((a[t+(r*2496|0)|0]|0)==0){break}if((a[t+(r*2496|0)+2|0]|0)==0){break}if((a[t+(r*2496|0)+1|0]|0)!=0){break}o=t+(r*2496|0)+1312|0;if((_d(c[o>>2]|0,c[o+4>>2]|0,600,0)|0)==0){break}a[(c[j>>2]|0)+(r*2496|0)+2|0]=0;pe(c[k>>2]|0,(c[j>>2]|0)+(r*2496|0)+3|0)|0}}while(0);c[(c[j>>2]|0)+(m*2496|0)+2120>>2]=0;m=m+1|0;n=b[s>>1]|0;}while(m>>>0<(n&65535)>>>0)}c[d+2072>>2]=0;d=Zd()|0;c[h>>2]=d;c[h+4>>2]=E;i=f;return}function mg(a){a=a|0;var b=0,d=0,e=0,f=0;if((a|0)==0){b=0;return b|0}d=Fh(1,4496)|0;if((d|0)==0){b=0;return b|0}e=d;c[e>>2]=a;f=d+4|0;c[f>>2]=c[c[c[a>>2]>>2]>>2];Hf(d+1968|0);Kg(d+2008|0,d+2040|0)|0;md(c[f>>2]|0,-124,14,d);md(c[f>>2]|0,-122,44,d);c[d+3692>>2]=32;c[d+3696>>2]=d;Nf(c[c[e>>2]>>2]|0,-100,10,d);b=d;return b|0}function ng(f,g,h,j){f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0;k=i;i=i+624|0;l=g;g=i;i=i+19|0;i=i+7&-8;c[g>>2]=c[l>>2];c[g+4>>2]=c[l+4>>2];c[g+8>>2]=c[l+8>>2];c[g+12>>2]=c[l+12>>2];b[g+16>>1]=b[l+16>>1]|0;a[g+18|0]=a[l+18|0]|0;l=k|0;m=k+24|0;n=k+48|0;o=k+72|0;p=k+96|0;q=k+216|0;r=f;if((j-177|0)>>>0>408>>>0){s=1;i=k;return s|0}t=j+65359|0;u=t&65535;v=k+160|0;if((Ff(f+1968|0,h+1|0,h+25|0,79,p|0)|0)!=63){s=1;i=k;return s|0}w=p+4|0;x=c[w>>2]|0;y=c[w+4>>2]|0;w=Zd()|0;z=E;A=Nh(x,y,10,0)|0;B=E;if(B>>>0<z>>>0|B>>>0==z>>>0&A>>>0<w>>>0|(z>>>0<y>>>0|z>>>0==y>>>0&w>>>0<x>>>0)){s=1;i=k;return s|0}Kh(v|0,p+12|0,32)|0;x=k+192|0;Kh(x|0,p+44|0,19)|0;w=c[p>>2]|0;p=f+12|0;if(w>>>0>(e[p>>1]|0)>>>0){s=1;i=k;return s|0}y=t&65535;t=y+33|0;z=mb()|0;A=i;i=i+t|0;i=i+7&-8;B=(w|0)==0;do{if(B){C=Df(v,(c[c[f>>2]>>2]|0)+44|0,h+104|0,h+128|0,j-128|0,A)|0;D=9}else{F=w-1|0;G=c[f+8>>2]|0;if((a[G+(F*2496|0)|0]|0)==0){H=1;break}C=Df(v,G+(F*2496|0)+1256|0,h+104|0,h+128|0,j-128|0,A)|0;D=9}}while(0);a:do{if((D|0)==9){if((C|0)!=(t|0)){H=1;break}j=a[A]|0;h=A+1|0;F=o|0;Kh(F|0,x|0,19)|0;G=n|0;I=g|0;Kh(G|0,I|0,19)|0;J=m|0;if((e[p>>1]|0)>>>0<w>>>0){H=1;break}do{if(B){K=f+16|0;L=(c[c[f>>2]>>2]|0)+12|0;if(j<<24>>24==0){M=L;N=K;O=0;break}P=(Mh(h|0,f+2008|0,32)|0)==0;M=L;N=K;O=P?j:0}else{P=w-1|0;K=c[f+8>>2]|0;M=K+(P*2496|0)+35|0;N=K+(P*2496|0)+72|0;O=j}}while(0);Kh(10088,M|0,32)|0;j=N|0;Ra(j|0,8,144,2);P=N+120|0;if((_d(c[P>>2]|0,c[P+4>>2]|0,120,0)|0)==0){if((de(M,j,v)|0)==2){D=33}else{Q=-1}}else{D=33}do{if((D|0)==33){j=N+264|0;if((_d(c[j>>2]|0,c[j+4>>2]|0,120,0)|0)==0){if((de(M,N+144|0,v)|0)!=2){Q=0;break}}Q=1}}while(0);j=0;while(1){if(j>>>0>=8>>>0){R=Q;break}if((Mh(N+(j*144|0)|0,v|0,32)|0)==0){R=j;break}else{j=j+1|0}}if((R|0)!=-1){Kh(N+(R*144|0)|0,v|0,32)|0;Kh(N+(R*144|0)+32|0,F|0,19)|0;if(O<<24>>24==0){Kh(N+(R*144|0)+51|0,h|0,32)|0}else{Kh(N+(R*144|0)+83|0,h|0,32)|0}a[N+(R*144|0)+115|0]=O;j=Zd()|0;P=N+(R*144|0)+120|0;c[P>>2]=j;c[P+4>>2]=E;P=N+(R*144|0)+128|0;c[P>>2]=0;c[P+4>>2]=0;c[J>>2]=c[G>>2];c[J+4>>2]=c[G+4>>2];c[J+8>>2]=c[G+8>>2];c[J+12>>2]=c[G+12>>2];b[J+16>>1]=b[G+16>>1]|0;a[J+18|0]=a[G+18|0]|0;b:do{if((e[p>>1]|0)>>>0<w>>>0){S=-1}else{if(B){T=f+1168|0}else{T=(c[f+8>>2]|0)+((w-1|0)*2496|0)+1320|0}P=0;while(1){if(P>>>0>=3>>>0){S=-1;break b}if((wd(T+(P*249|0)+192|0,m)|0)==0){P=P+1|0}else{break}}j=Zd()|0;K=T+752+(P<<3)|0;c[K>>2]=j;c[K+4>>2]=E;S=P}}while(0);c[N+(R*144|0)+136>>2]=S}if((y|0)==0){H=0;break}G=ke(q|0,8,A+33|0,u)|0;if((G|0)<1){H=1;break}Kh(l|0,I|0,19)|0;if((e[p>>1]|0)>>>0<w>>>0){H=1;break}J=G&65535;if((G&65535)<<16>>16==0){H=0;break}if(B){U=f+2440|0;V=f+2080|0;W=f+2072|0;X=(c[c[f>>2]>>2]|0)+12|0;Y=f+16|0}else{G=w-1|0;h=c[f+8>>2]|0;U=h+(G*2496|0)+2488|0;V=h+(G*2496|0)+2128|0;W=h+(G*2496|0)+2120|0;X=h+(G*2496|0)+35|0;Y=h+(G*2496|0)+72|0}G=Y+120|0;h=Y|0;if((Hc(l|0)|0)==0){F=0;while(1){if((c[W>>2]|0)>>>0>5>>>0){H=0;break a}K=q+(F*51|0)|0;if((_d(c[G>>2]|0,c[G+4>>2]|0,120,0)|0)==0){if((de(X,h,K)|0)==2){Z=0;D=47}}else{Z=0;D=47}c:do{if((D|0)==47){while(1){D=0;if(Z>>>0>=8>>>0){break}if((Mh(Y+(Z*144|0)|0,K|0,32)|0)==0){break}else{Z=Z+1|0;D=47}}if((Z|0)==8){_=0}else{break}do{j=V+(_*40|0)+32|0;if((_d(c[j>>2]|0,c[j+4>>2]|0,10,0)|0)==0){if((Mh(V+(_*40|0)|0,K|0,32)|0)==0){break c}}_=_+1|0;}while(_>>>0<9>>>0);Kh(V+((((d[U]|0)%9|0)&255)*40|0)|0,K|0,32)|0;j=Zd()|0;L=V+((((d[U]|0)%9|0)&255)*40|0)+32|0;c[L>>2]=j;c[L+4>>2]=E;a[U]=(a[U]|0)+1;if((sg(r,w,q+(F*51|0)+32|0,K,0,-1)|0)!=0){break}c[W>>2]=(c[W>>2]|0)+1}}while(0);K=F+1|0;if(K>>>0<J>>>0){F=K}else{H=0;break a}}}else{$=0}while(1){if((c[W>>2]|0)>>>0>5>>>0){H=0;break a}d:do{if((Hc(q+($*51|0)+32|0)|0)!=0){F=q+($*51|0)|0;if((_d(c[G>>2]|0,c[G+4>>2]|0,120,0)|0)==0){if((de(X,h,F)|0)==2){aa=0}else{break}}else{aa=0}while(1){if(aa>>>0>=8>>>0){break}if((Mh(Y+(aa*144|0)|0,F|0,32)|0)==0){break}else{aa=aa+1|0}}if((aa|0)==8){ba=0}else{break}do{I=V+(ba*40|0)+32|0;if((_d(c[I>>2]|0,c[I+4>>2]|0,10,0)|0)==0){if((Mh(V+(ba*40|0)|0,F|0,32)|0)==0){break d}}ba=ba+1|0;}while(ba>>>0<9>>>0);Kh(V+((((d[U]|0)%9|0)&255)*40|0)|0,F|0,32)|0;I=Zd()|0;K=V+((((d[U]|0)%9|0)&255)*40|0)+32|0;c[K>>2]=I;c[K+4>>2]=E;a[U]=(a[U]|0)+1;if((sg(r,w,q+($*51|0)+32|0,F,0,-1)|0)!=0){break}c[W>>2]=(c[W>>2]|0)+1}}while(0);K=$+1|0;if(K>>>0<J>>>0){$=K}else{H=0;break}}}}while(0);Ma(z|0);s=H;i=k;return s|0}function og(e,f,g,h){e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;j=i;k=f;f=i;i=i+19|0;i=i+7&-8;c[f>>2]=c[k>>2];c[f+4>>2]=c[k+4>>2];c[f+8>>2]=c[k+8>>2];c[f+12>>2]=c[k+12>>2];b[f+16>>1]=b[k+16>>1]|0;a[f+18|0]=a[k+18|0]|0;if((h-122|0)>>>0>902>>>0){l=1;i=j;return l|0}k=h-73|0;f=mb()|0;m=i;i=i+k|0;i=i+7&-8;n=g+1|0;do{if((Df(g+25|0,e+2040|0,n,g+57|0,h-57|0,m)|0)==(k|0)){o=h-121|0;p=i;i=i+o|0;i=i+7&-8;if((Df(m,(c[c[e>>2]>>2]|0)+44|0,n,m+32|0,h-105|0,p)|0)!=(o|0)){q=1;break}r=d[p]|0;s=e+2444|0;t=c[s+(r<<3)>>2]|0;if((t|0)==0){q=1;break}q=Ib[t&63](c[s+(r<<3)+4>>2]|0,m,p,o)|0}else{q=1}}while(0);Ma(f|0);l=q;i=j;return l|0}function pg(e,f,g,h){e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;j=i;i=i+408|0;k=j|0;if((h-41|0)>>>0>408>>>0){l=1;i=j;return l|0}m=b[e+12>>1]|0;if(m<<16>>16==0){l=1;i=j;return l|0}n=e+8|0;o=c[n>>2]|0;p=m&65535;m=0;while(1){if((a[o+(m*2496|0)|0]|0)!=0){if((Mh(f|0,o+(m*2496|0)+35|0,32)|0)==0){break}}q=m+1|0;if(q>>>0<p>>>0){m=q}else{l=1;r=16;break}}if((r|0)==16){i=j;return l|0}if((m|0)==-1){l=1;i=j;return l|0}r=g+1|0;be(r,8);p=r;r=p|0;o=d[r]|d[r+1|0]<<8|d[r+2|0]<<16|d[r+3|0]<<24|0;r=p+4|0;p=d[r]|d[r+1|0]<<8|d[r+2|0]<<16|d[r+3|0]<<24|0;r=(c[n>>2]|0)+(m*2496|0)+1304|0;f=c[r+4>>2]|0;if(!(p>>>0>f>>>0|p>>>0==f>>>0&o>>>0>(c[r>>2]|0)>>>0)){l=1;i=j;return l|0}c[r>>2]=o;c[r+4>>2]=p;p=g+9|0;r=(c[n>>2]|0)+(m*2496|0)+3|0;do{if((Mh(p|0,r|0,32)|0)!=0){o=e;pe(c[o>>2]|0,r)|0;f=Zd()|0;q=(c[n>>2]|0)+(m*2496|0)+1312|0;c[q>>2]=f;c[q+4>>2]=E;if((oe(c[o>>2]|0,p)|0)==1){l=1;i=j;return l|0}else{a[(c[n>>2]|0)+(m*2496|0)+2|0]=1;Kh((c[n>>2]|0)+(m*2496|0)+3|0,p|0,32)|0;break}}}while(0);p=h+65495|0;if((p&65535|0)==0){l=0;i=j;return l|0}h=ke(k|0,8,g+41|0,p&65535)|0;if((h|0)<1){l=1;i=j;return l|0}p=e;e=0;while(1){re(c[p>>2]|0,k+(e*51|0)+32|0,k+(e*51|0)|0,(c[n>>2]|0)+(m*2496|0)+3|0);g=e+1|0;if((g|0)<(h|0)){e=g}else{l=0;break}}i=j;return l|0}function qg(d,e,f,g,h){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0;j=i;i=i+456|0;k=e;e=i;i=i+19|0;i=i+7&-8;c[e>>2]=c[k>>2];c[e+4>>2]=c[k+4>>2];c[e+8>>2]=c[k+8>>2];c[e+12>>2]=c[k+12>>2];b[e+16>>1]=b[k+16>>1]|0;a[e+18|0]=a[k+18|0]|0;if((h-113|0)>>>0>408>>>0){l=1;i=j;return l|0}k=j|0;e=Df(g,(c[c[d>>2]>>2]|0)+44|0,g+32|0,g+56|0,h-56|0,k)|0;if((e|0)!=(h-72|0)){l=1;i=j;return l|0}Kh(f|0,g|0,32)|0;if((f|0)!=0){l=1;i=j;return l|0}l=pg(d,g,k,e)|0;i=j;return l|0}function rg(a){a=a|0;var b=0;if((a|0)==0){return}b=a+8|0;Eh(c[b>>2]|0);c[b>>2]=0;b=a+4|0;md(c[b>>2]|0,-124,0,0);md(c[b>>2]|0,-122,0,0);c[a+3692>>2]=0;c[a+3696>>2]=0;Nf(c[c[a>>2]>>2]|0,-100,0,0);Eh(a);return}function sg(d,f,g,h,j,k){d=d|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;l=i;i=i+512|0;m=g;g=i;i=i+19|0;i=i+7&-8;c[g>>2]=c[m>>2];c[g+4>>2]=c[m+4>>2];c[g+8>>2]=c[m+8>>2];c[g+12>>2]=c[m+12>>2];b[g+16>>1]=b[m+16>>1]|0;a[g+18|0]=a[m+18|0]|0;m=l|0;n=l+64|0;o=l+200|0;p=l+456|0;if((e[d+12>>1]|0)>>>0<f>>>0){q=-1;i=l;return q|0}r=n|0;s=g|0;g=Zd()|0;t=E;Gf(r);c[m>>2]=f;u=m+4|0;c[u>>2]=g;c[u+4>>2]=t;Kh(m+12|0,h|0,32)|0;Kh(m+44|0,s|0,19)|0;if((Ef(d+1968|0,r,m|0,63,n+24|0)|0)!=79){q=-1;i=l;return q|0}n=l+168|0;Jh(n|0,0,32)|0;m=(j|0)==0?n:j;Kh(p+32|0,s|0,19)|0;Kh(p|0,h|0,32)|0;h=d|0;s=c[h>>2]|0;if((f|0)==0){if((eg(s,d+1168|0,k,o)|0)==-1){q=-1;i=l;return q|0}j=c[c[h>>2]>>2]|0;h=j+12|0;q=Yf(c[d+4>>2]|0,o,p,h,j+44|0,m,h,d+2008|0,r)|0;i=l;return q|0}else{h=f-1|0;f=d+8|0;if((eg(s,(c[f>>2]|0)+(h*2496|0)+1320|0,k,o)|0)==-1){q=-1;i=l;return q|0}k=c[f>>2]|0;q=Yf(c[d+4>>2]|0,o,p,k+(h*2496|0)+1224|0,k+(h*2496|0)+1256|0,m,k+(h*2496|0)+35|0,n,r)|0;i=l;return q|0}return 0}function tg(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;i=i+288|0;e=d|0;f=d+144|0;g=e|0;Kh(g|0,a|0,144)|0;a=f|0;Kh(a|0,b|0,144)|0;b=e+120|0;e=_d(c[b>>2]|0,c[b+4>>2]|0,120,0)|0;b=f+120|0;f=(e|0)!=0;e=(_d(c[b>>2]|0,c[b+4>>2]|0,120,0)|0)==0;if(f|e^1){h=f?(e|f^1)<<31>>31:1;i=d;return h|0}f=de(10088,g,a)|0;if((f|0)==1){h=1;i=d;return h|0}else if((f|0)==2){h=-1;i=d;return h|0}else{h=0;i=d;return h|0}return 0}function ug(b,d,f){b=b|0;d=d|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;g=i;i=i+872|0;h=g|0;j=g+456|0;k=d&65535;if((e[b+12>>1]|0)>>>0<=(d&65535)>>>0){l=-1;i=g;return l|0}d=h|0;a[d]=-100;m=Zd()|0;c[j>>2]=m;c[j+4>>2]=E;be(j,8);m=h+1|0;n=c[j+4>>2]|0;o=m|0;w=c[j>>2]|0;a[o]=w;w=w>>8;a[o+1|0]=w;w=w>>8;a[o+2|0]=w;w=w>>8;a[o+3|0]=w;o=m+4|0;w=n;a[o]=w;w=w>>8;a[o+1|0]=w;w=w>>8;a[o+2|0]=w;w=w>>8;a[o+3|0]=w;o=c[b>>2]|0;Kh(h+9|0,o+14900|0,32)|0;n=g+464|0;m=ze(o,n,8)|0;do{if(m<<16>>16==0){p=0}else{o=je(h+41|0,408,n,m)|0;if((o|0)<1){l=-1}else{p=o;break}i=g;return l|0}}while(0);m=p+41|0;if(f<<24>>24==1){q=-1;r=6}else{p=dg(b,k,d,m)|0;if(f<<24>>24==0){s=-1;t=p}else{q=p;r=6}}if((r|0)==6){s=vg(b,k,d,m)|0;t=q}if((t|0)==-1){l=s;i=g;return l|0}else{i=g;return((s|0)==-1?0:s)+t|0}return 0}function vg(b,d,f,g){b=b|0;d=d|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;h=i;i=i+1048|0;if((e[b+12>>1]|0)>>>0<=d>>>0){j=-1;i=h;return j|0}k=b+8|0;if((a[(c[k>>2]|0)+(d*2496|0)+2|0]|0)==0){j=-1;i=h;return j|0}l=h|0;If(l);m=g+72|0;n=mb()|0;o=i;i=i+m|0;i=i+7&-8;p=b|0;b=c[p>>2]|0;Kh(o|0,(c[b>>2]|0)+12|0,32)|0;Kh(o+32|0,l|0,24)|0;do{if(((Cf((c[k>>2]|0)+(d*2496|0)+35|0,(c[b>>2]|0)+44|0,l,f,g,o+56|0)|0)+56|0)==(m|0)){q=c[p>>2]|0;r=h+24|0;s=Lf(q+14900|0,q+14932|0,r,(c[k>>2]|0)+(d*2496|0)+3|0,o,m,-100)|0;if((s|0)==-1){t=-1;break}t=we(c[p>>2]|0,(c[k>>2]|0)+(d*2496|0)+3|0,r,s)|0}else{t=-1}}while(0);Ma(n|0);j=t;i=h;return j|0}function wg(){var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0;do{if((Ag(416)|0)==0){c[2520]=lh(10056,16)|0;c[2494]=lh(9952,1e4)|0;c[2512]=lh(10024,32)|0;c[2518]=lh(10064,16)|0;c[2492]=lh(9960,10016)|0;b=lh(10032,48)|0;c[2510]=b;if((c[2520]|0)!=0&(c[2494]|0)!=0&(c[2512]|0)!=0&(c[2518]|0)!=0&(c[2492]|0)!=0&(b|0)!=0){d=0;e=0}else{f=0;return f|0}a:while(1){b=(ta()|0)&255;a[(c[2520]|0)-16|0]=b;b=(ta()|0)&255;a[(c[2520]|0)-15|0]=b;b=(ta()|0)&255;a[(c[2520]|0)-14|0]=b;b=(ta()|0)&255;a[(c[2520]|0)-13|0]=b;b=(ta()|0)&255;a[(c[2520]|0)-12|0]=b;b=(ta()|0)&255;a[(c[2520]|0)-11|0]=b;b=(ta()|0)&255;a[(c[2520]|0)-10|0]=b;b=(ta()|0)&255;a[(c[2520]|0)-9|0]=b;b=(ta()|0)&255;a[(c[2520]|0)-8|0]=b;b=(ta()|0)&255;a[(c[2520]|0)-7|0]=b;b=(ta()|0)&255;a[(c[2520]|0)-6|0]=b;b=(ta()|0)&255;a[(c[2520]|0)-5|0]=b;b=(ta()|0)&255;a[(c[2520]|0)-4|0]=b;b=(ta()|0)&255;a[(c[2520]|0)-3|0]=b;b=(ta()|0)&255;a[(c[2520]|0)-2|0]=b;b=(ta()|0)&255;a[(c[2520]|0)-1|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-16|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-15|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-14|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-13|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-12|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-11|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-10|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-9|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-8|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-7|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-6|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-5|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-4|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-3|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-2|0]=b;b=(ta()|0)&255;a[(c[2512]|0)-1|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-16|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-15|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-14|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-13|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-12|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-11|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-10|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-9|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-8|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-7|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-6|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-5|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-4|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-3|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-2|0]=b;b=(ta()|0)&255;a[(c[2494]|0)-1|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+16|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+17|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+18|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+19|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+20|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+21|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+22|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+23|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+24|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+25|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+26|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+27|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+28|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+29|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+30|0]=b;b=(ta()|0)&255;a[(c[2520]|0)+31|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+32|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+33|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+34|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+35|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+36|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+37|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+38|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+39|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+40|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+41|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+42|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+43|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+44|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+45|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+46|0]=b;b=(ta()|0)&255;a[(c[2512]|0)+47|0]=b;b=Nh(e,d,16,0)|0;g=E;h=d;i=e;while(1){j=(ta()|0)&255;a[(c[2494]|0)+i|0]=j;j=Nh(i,h,1,0)|0;k=E;if((k|0)<(g|0)|(k|0)==(g|0)&j>>>0<b>>>0){h=k;i=j}else{l=-1;m=-16;break}}while(1){i=m;a[(c[2518]|0)+i|0]=a[(c[2520]|0)+i|0]|0;i=Nh(m,l,1,0)|0;h=E;j=0;if((h|0)<(j|0)|(h|0)==(j|0)&i>>>0<32>>>0){l=h;m=i}else{n=-1;o=-16;break}}while(1){i=o;a[(c[2510]|0)+i|0]=a[(c[2512]|0)+i|0]|0;i=Nh(o,n,1,0)|0;h=E;j=0;if((h|0)<(j|0)|(h|0)==(j|0)&i>>>0<48>>>0){n=h;o=i}else{p=-1;q=-16;break}}do{i=q;a[(c[2492]|0)+i|0]=a[(c[2494]|0)+i|0]|0;q=Nh(q,p,1,0)|0;p=E;}while((p|0)<(g|0)|(p|0)==(g|0)&q>>>0<b>>>0);if((Dg(c[2520]|0,c[2494]|0,e,d,c[2512]|0)|0)!=0){r=1416;break}i=c[2512]|0;h=c[2510]|0;j=-1;k=-16;while(1){s=0;if(!((j|0)<(s|0)|(j|0)==(s|0)&k>>>0<48>>>0)){break}s=k;t=(a[i+s|0]|0)==(a[h+s|0]|0);s=Nh(k,j,1,0)|0;if(t){j=E;k=s}else{r=1224;break a}}k=c[2494]|0;j=c[2492]|0;h=-1;i=-16;while(1){if(!((h|0)<(g|0)|(h|0)==(g|0)&i>>>0<b>>>0)){break}s=i;t=(a[k+s|0]|0)==(a[j+s|0]|0);s=Nh(i,h,1,0)|0;if(t){h=E;i=s}else{r=1152;break a}}i=c[2520]|0;h=c[2518]|0;j=-1;k=-16;while(1){s=0;if(!((j|0)<(s|0)|(j|0)==(s|0)&k>>>0<0>>>0)){u=0;v=16;break}s=k;t=(a[i+s|0]|0)==(a[h+s|0]|0);s=Nh(k,j,1,0)|0;if(t){j=E;k=s}else{r=1024;break a}}while(1){k=0;if(!((u|0)<(k|0)|(u|0)==(k|0)&v>>>0<32>>>0)){break}k=v;j=(a[i+k|0]|0)==(a[h+k|0]|0);k=Nh(v,u,1,0)|0;if(j){u=E;v=k}else{r=960;break a}}h=(ta()|0)&255;a[(c[2520]|0)-16|0]=h;h=(ta()|0)&255;a[(c[2520]|0)-15|0]=h;h=(ta()|0)&255;a[(c[2520]|0)-14|0]=h;h=(ta()|0)&255;a[(c[2520]|0)-13|0]=h;h=(ta()|0)&255;a[(c[2520]|0)-12|0]=h;h=(ta()|0)&255;a[(c[2520]|0)-11|0]=h;h=(ta()|0)&255;a[(c[2520]|0)-10|0]=h;h=(ta()|0)&255;a[(c[2520]|0)-9|0]=h;h=(ta()|0)&255;a[(c[2520]|0)-8|0]=h;h=(ta()|0)&255;a[(c[2520]|0)-7|0]=h;h=(ta()|0)&255;a[(c[2520]|0)-6|0]=h;h=(ta()|0)&255;a[(c[2520]|0)-5|0]=h;h=(ta()|0)&255;a[(c[2520]|0)-4|0]=h;h=(ta()|0)&255;a[(c[2520]|0)-3|0]=h;h=(ta()|0)&255;a[(c[2520]|0)-2|0]=h;h=(ta()|0)&255;a[(c[2520]|0)-1|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-16|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-15|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-14|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-13|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-12|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-11|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-10|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-9|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-8|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-7|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-6|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-5|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-4|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-3|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-2|0]=h;h=(ta()|0)&255;a[(c[2512]|0)-1|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-16|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-15|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-14|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-13|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-12|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-11|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-10|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-9|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-8|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-7|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-6|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-5|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-4|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-3|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-2|0]=h;h=(ta()|0)&255;a[(c[2494]|0)-1|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+16|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+17|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+18|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+19|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+20|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+21|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+22|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+23|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+24|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+25|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+26|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+27|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+28|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+29|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+30|0]=h;h=(ta()|0)&255;a[(c[2520]|0)+31|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+32|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+33|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+34|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+35|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+36|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+37|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+38|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+39|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+40|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+41|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+42|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+43|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+44|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+45|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+46|0]=h;h=(ta()|0)&255;a[(c[2512]|0)+47|0]=h;h=d;i=e;while(1){k=(ta()|0)&255;a[(c[2494]|0)+i|0]=k;k=Nh(i,h,1,0)|0;j=E;if((j|0)<(g|0)|(j|0)==(g|0)&k>>>0<b>>>0){h=j;i=k}else{w=-1;x=-16;break}}while(1){i=x;a[(c[2518]|0)+i|0]=a[(c[2520]|0)+i|0]|0;i=Nh(x,w,1,0)|0;h=E;k=0;if((h|0)<(k|0)|(h|0)==(k|0)&i>>>0<32>>>0){w=h;x=i}else{y=-1;z=-16;break}}while(1){i=z;a[(c[2510]|0)+i|0]=a[(c[2512]|0)+i|0]|0;i=Nh(z,y,1,0)|0;h=E;k=0;if((h|0)<(k|0)|(h|0)==(k|0)&i>>>0<48>>>0){y=h;z=i}else{A=-1;B=-16;break}}do{i=B;a[(c[2492]|0)+i|0]=a[(c[2494]|0)+i|0]|0;B=Nh(B,A,1,0)|0;A=E;}while((A|0)<(g|0)|(A|0)==(g|0)&B>>>0<b>>>0);i=c[2492]|0;if((Dg(i,i,e,d,c[2512]|0)|0)!=0){r=1416;break}i=c[2492]|0;h=c[2520]|0;k=0;j=0;while(1){s=0;if(!((k|0)<(s|0)|(k|0)==(s|0)&j>>>0<16>>>0)){break}s=j;t=(a[i+s|0]|0)==(a[h+s|0]|0);s=Nh(j,k,1,0)|0;if(t){k=E;j=s}else{r=848;break a}}a[i]=a[c[2494]|0]|0;a[(c[2492]|0)+1|0]=a[(c[2494]|0)+1|0]|0;a[(c[2492]|0)+2|0]=a[(c[2494]|0)+2|0]|0;a[(c[2492]|0)+3|0]=a[(c[2494]|0)+3|0]|0;a[(c[2492]|0)+4|0]=a[(c[2494]|0)+4|0]|0;a[(c[2492]|0)+5|0]=a[(c[2494]|0)+5|0]|0;a[(c[2492]|0)+6|0]=a[(c[2494]|0)+6|0]|0;a[(c[2492]|0)+7|0]=a[(c[2494]|0)+7|0]|0;a[(c[2492]|0)+8|0]=a[(c[2494]|0)+8|0]|0;a[(c[2492]|0)+9|0]=a[(c[2494]|0)+9|0]|0;a[(c[2492]|0)+10|0]=a[(c[2494]|0)+10|0]|0;a[(c[2492]|0)+11|0]=a[(c[2494]|0)+11|0]|0;a[(c[2492]|0)+12|0]=a[(c[2494]|0)+12|0]|0;a[(c[2492]|0)+13|0]=a[(c[2494]|0)+13|0]|0;a[(c[2492]|0)+14|0]=a[(c[2494]|0)+14|0]|0;a[(c[2492]|0)+15|0]=a[(c[2494]|0)+15|0]|0;j=c[2510]|0;if((Dg(j,c[2492]|0,e,d,j)|0)!=0){r=1416;break}j=c[2510]|0;k=c[2520]|0;h=0;s=0;while(1){t=0;if(!((h|0)<(t|0)|(h|0)==(t|0)&s>>>0<16>>>0)){break}t=s;C=(a[j+t|0]|0)==(a[k+t|0]|0);t=Nh(s,h,1,0)|0;if(C){h=E;s=t}else{r=736;break a}}a[j]=a[c[2512]|0]|0;a[(c[2510]|0)+1|0]=a[(c[2512]|0)+1|0]|0;a[(c[2510]|0)+2|0]=a[(c[2512]|0)+2|0]|0;a[(c[2510]|0)+3|0]=a[(c[2512]|0)+3|0]|0;a[(c[2510]|0)+4|0]=a[(c[2512]|0)+4|0]|0;a[(c[2510]|0)+5|0]=a[(c[2512]|0)+5|0]|0;a[(c[2510]|0)+6|0]=a[(c[2512]|0)+6|0]|0;a[(c[2510]|0)+7|0]=a[(c[2512]|0)+7|0]|0;a[(c[2510]|0)+8|0]=a[(c[2512]|0)+8|0]|0;a[(c[2510]|0)+9|0]=a[(c[2512]|0)+9|0]|0;a[(c[2510]|0)+10|0]=a[(c[2512]|0)+10|0]|0;a[(c[2510]|0)+11|0]=a[(c[2512]|0)+11|0]|0;a[(c[2510]|0)+12|0]=a[(c[2512]|0)+12|0]|0;a[(c[2510]|0)+13|0]=a[(c[2512]|0)+13|0]|0;a[(c[2510]|0)+14|0]=a[(c[2512]|0)+14|0]|0;a[(c[2510]|0)+15|0]=a[(c[2512]|0)+15|0]|0;if((Eg(c[2520]|0,c[2494]|0,e,d,c[2512]|0)|0)!=0){r=632;break}s=c[2520]|0;h=c[2518]|0;k=-1;i=-16;while(1){t=0;if(!((k|0)<(t|0)|(k|0)==(t|0)&i>>>0<32>>>0)){break}t=i;C=(a[s+t|0]|0)==(a[h+t|0]|0);t=Nh(i,k,1,0)|0;if(C){k=E;i=t}else{r=536;break a}}i=c[2512]|0;k=c[2510]|0;j=-1;t=-16;while(1){C=0;if(!((j|0)<(C|0)|(j|0)==(C|0)&t>>>0<48>>>0)){break}C=t;D=(a[i+C|0]|0)==(a[k+C|0]|0);C=Nh(t,j,1,0)|0;if(D){j=E;t=C}else{r=1224;break a}}t=c[2494]|0;j=c[2492]|0;k=-1;i=-16;while(1){if(!((k|0)<(g|0)|(k|0)==(g|0)&i>>>0<b>>>0)){break}C=i;D=(a[t+C|0]|0)==(a[j+C|0]|0);C=Nh(i,k,1,0)|0;if(D){k=E;i=C}else{r=1152;break a}}bh(h,s,16,0)|0;i=0;k=0;do{j=k;t=(c[2512]|0)+j|0;a[t]=a[t]^a[(c[2518]|0)+j|0];k=Nh(k,i,1,0)|0;i=E;j=0;}while((i|0)<(j|0)|(i|0)==(j|0)&k>>>0<32>>>0);if((Dg(c[2520]|0,c[2494]|0,e,d,c[2512]|0)|0)!=0){r=1416;break}if((Eg(c[2520]|0,c[2494]|0,e,d,c[2512]|0)|0)!=0){r=632;break}bh(c[2518]|0,c[2520]|0,16,0)|0;k=0;if((d|0)>(k|0)|(d|0)==(k|0)&e>>>0>0>>>0){k=0;i=0;do{s=Wh(i,k,32,0)|0;h=(c[2494]|0)+i|0;a[h]=a[h]^a[(c[2518]|0)+s|0];i=Nh(i,k,1,0)|0;k=E;}while((k|0)<(d|0)|(k|0)==(d|0)&i>>>0<e>>>0)}a[(c[2494]|0)+e|0]=a[c[2518]|0]|0;i=Nh(e,d,1,0)|0;k=E;s=0;if((k|0)<(s|0)|(k|0)==(s|0)&i>>>0<4096>>>0){d=k;e=i}else{F=50;break}}do{if((F|0)==50){if((Dg(c[2520]|0,c[2494]|0,4096,0,c[2512]|0)|0)!=0){r=1416;break}if((Eg(c[2520]|0,c[2494]|0,4096,0,c[2512]|0)|0)!=0){r=632;break}mh(10152,33,c[2520]|0,16)|0;r=0}}while(0);Eh(c[2514]|0);Eh(c[2488]|0);Eh(c[2506]|0);Eh(c[2516]|0);Eh(c[2490]|0);Eh(c[2508]|0);if((r|0)==0){if((yb(10152,1072)|0)==0){G=0;break}}G=1}else{G=1}}while(0);f=c[432+(G<<2)>>2]|0;return f|0}function xg(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0;j=i;i=i+216|0;k=j|0;l=j+72|0;m=j+144|0;n=m;o=i;i=i+68|0;i=i+7&-8;c[l>>2]=d[h]|0;c[l+4>>2]=d[h+1|0]|0;c[l+8>>2]=d[h+2|0]|0;c[l+12>>2]=a[h+3|0]&15;c[l+16>>2]=a[h+4|0]&252;c[l+20>>2]=d[h+5|0]|0;c[l+24>>2]=d[h+6|0]|0;c[l+28>>2]=a[h+7|0]&15;c[l+32>>2]=a[h+8|0]&252;c[l+36>>2]=d[h+9|0]|0;c[l+40>>2]=d[h+10|0]|0;c[l+44>>2]=a[h+11|0]&15;c[l+48>>2]=a[h+12|0]&252;c[l+52>>2]=d[h+13|0]|0;c[l+56>>2]=d[h+14|0]|0;c[l+60>>2]=a[h+15|0]&15;c[l+64>>2]=0;Jh(n|0,0,68)|0;p=o;if((f|0)==0&(g|0)==0){q=0;r=k}else{s=m|0;t=k;u=m+4|0;v=m+8|0;w=m+12|0;x=m+16|0;y=m+20|0;z=m+24|0;A=m+28|0;B=m+32|0;C=m+36|0;D=m+40|0;F=m+44|0;G=m+48|0;H=m+52|0;I=m+56|0;J=m+60|0;K=m+64|0;L=g;g=f;f=e;e=0;while(1){Jh(p|0,0,68)|0;if((g|0)==0&(L|0)==0){M=0;N=0;O=0}else{P=0;while(1){c[o+(P<<2)>>2]=d[f+P|0]|0;Q=P+1|0;R=Q;S=0;if(Q>>>0<16>>>0&(S>>>0<L>>>0|S>>>0==L>>>0&R>>>0<g>>>0)){P=Q}else{M=Q;N=S;O=R;break}}}c[o+(M<<2)>>2]=1;P=f+M|0;R=0;S=0;Q=e;while(1){T=Q+S+(c[o+(R<<2)>>2]|0)|0;c[m+(R<<2)>>2]=T&255;U=R+1|0;if(U>>>0>=17>>>0){break}R=U;S=T>>>8;Q=c[m+(U<<2)>>2]|0}Q=Oh(g,L,O,N)|0;S=E;R=0;while(1){U=0;V=0;do{V=(aa(c[l+(R-U<<2)>>2]|0,c[m+(U<<2)>>2]|0)|0)+V|0;U=U+1|0;}while(U>>>0<=R>>>0);U=R+1|0;if(U>>>0>=17>>>0){break}T=R+17|0;W=U;X=V;do{X=(aa((c[m+(W<<2)>>2]|0)*320|0,c[l+(T-W<<2)>>2]|0)|0)+X|0;W=W+1|0;}while(W>>>0<17>>>0);c[k+(R<<2)>>2]=X;R=U}c[k+(R<<2)>>2]=V;Kh(n|0,t|0,68)|0;W=c[s>>2]|0;T=(c[u>>2]|0)+(W>>>8)|0;Y=(T>>>8)+(c[v>>2]|0)|0;Z=(Y>>>8)+(c[w>>2]|0)|0;_=(Z>>>8)+(c[x>>2]|0)|0;$=(_>>>8)+(c[y>>2]|0)|0;ba=($>>>8)+(c[z>>2]|0)|0;ca=(ba>>>8)+(c[A>>2]|0)|0;da=(ca>>>8)+(c[B>>2]|0)|0;ea=(da>>>8)+(c[C>>2]|0)|0;fa=(ea>>>8)+(c[D>>2]|0)|0;ga=(fa>>>8)+(c[F>>2]|0)|0;ha=(ga>>>8)+(c[G>>2]|0)|0;ia=(ha>>>8)+(c[H>>2]|0)|0;ja=(ia>>>8)+(c[I>>2]|0)|0;ka=(ja>>>8)+(c[J>>2]|0)|0;la=(ka>>>8)+(c[K>>2]|0)|0;ma=(la>>>2)*5|0;na=ma+W&255;c[s>>2]=na;oa=(ma+(W&255)|0)>>>8;c[u>>2]=oa+T&255;W=(oa+(T&255)|0)>>>8;c[v>>2]=W+Y&255;T=(W+(Y&255)|0)>>>8;c[w>>2]=T+Z&255;Y=(T+(Z&255)|0)>>>8;c[x>>2]=Y+_&255;Z=(Y+(_&255)|0)>>>8;c[y>>2]=Z+$&255;_=(Z+($&255)|0)>>>8;c[z>>2]=_+ba&255;$=(_+(ba&255)|0)>>>8;c[A>>2]=$+ca&255;ba=($+(ca&255)|0)>>>8;c[B>>2]=ba+da&255;ca=(ba+(da&255)|0)>>>8;c[C>>2]=ca+ea&255;da=(ca+(ea&255)|0)>>>8;c[D>>2]=da+fa&255;ea=(da+(fa&255)|0)>>>8;c[F>>2]=ea+ga&255;fa=(ea+(ga&255)|0)>>>8;c[G>>2]=fa+ha&255;ga=(fa+(ha&255)|0)>>>8;c[H>>2]=ga+ia&255;ha=(ga+(ia&255)|0)>>>8;c[I>>2]=ha+ja&255;ia=(ha+(ja&255)|0)>>>8;c[J>>2]=ia+ka&255;c[K>>2]=((ia+(ka&255)|0)>>>8)+(la&3);if((g|0)==(O|0)&(L|0)==(N|0)){q=na;r=t;break}else{L=S;g=Q;f=P;e=na}}}Kh(r|0,n|0,68)|0;n=0;r=0;e=q;while(1){q=e+r+(c[288+(n<<2)>>2]|0)|0;c[m+(n<<2)>>2]=q&255;f=n+1|0;if(f>>>0>=17>>>0){break}n=f;r=q>>>8;e=c[m+(f<<2)>>2]|0}e=-((c[m+64>>2]|0)>>>7)|0;r=0;do{n=m+(r<<2)|0;f=c[n>>2]|0;c[n>>2]=(f^c[k+(r<<2)>>2])&e^f;r=r+1|0;}while(r>>>0<17>>>0);r=d[h+16|0]|0;c[o>>2]=r;c[o+4>>2]=d[h+17|0]|0;c[o+8>>2]=d[h+18|0]|0;c[o+12>>2]=d[h+19|0]|0;c[o+16>>2]=d[h+20|0]|0;c[o+20>>2]=d[h+21|0]|0;c[o+24>>2]=d[h+22|0]|0;c[o+28>>2]=d[h+23|0]|0;c[o+32>>2]=d[h+24|0]|0;c[o+36>>2]=d[h+25|0]|0;c[o+40>>2]=d[h+26|0]|0;c[o+44>>2]=d[h+27|0]|0;c[o+48>>2]=d[h+28|0]|0;c[o+52>>2]=d[h+29|0]|0;c[o+56>>2]=d[h+30|0]|0;c[o+60>>2]=d[h+31|0]|0;c[o+64>>2]=0;h=0;e=0;k=r;while(1){r=m+(h<<2)|0;f=(c[r>>2]|0)+e+k|0;c[r>>2]=f&255;r=h+1|0;if(r>>>0>=17>>>0){break}h=r;e=f>>>8;k=c[o+(r<<2)>>2]|0}a[b]=c[m>>2];a[b+1|0]=c[m+4>>2];a[b+2|0]=c[m+8>>2];a[b+3|0]=c[m+12>>2];a[b+4|0]=c[m+16>>2];a[b+5|0]=c[m+20>>2];a[b+6|0]=c[m+24>>2];a[b+7|0]=c[m+28>>2];a[b+8|0]=c[m+32>>2];a[b+9|0]=c[m+36>>2];a[b+10|0]=c[m+40>>2];a[b+11|0]=c[m+44>>2];a[b+12|0]=c[m+48>>2];a[b+13|0]=c[m+52>>2];a[b+14|0]=c[m+56>>2];a[b+15|0]=c[m+60>>2];i=j;return 0}function yg(){return 1064}function zg(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+16|0;g=f|0;xg(g,b,c,d,e)|0;e=Fg(a,g)|0;i=f;return e|0}function Ag(a){a=a|0;c[102]=a;return 0}function Bg(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;return Lb[c[(c[102]|0)+4>>2]&15](a,b,d,e,f)|0}function Cg(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;return Lb[c[(c[102]|0)+8>>2]&15](a,b,d,e,f)|0}function Dg(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Bg(a,b,c,d,e)|0}function Eg(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Cg(a,b,c,d,e)|0}function Fg(b,c){b=b|0;c=c|0;return((((a[c+1|0]^a[b+1|0]|a[c]^a[b]|a[c+2|0]^a[b+2|0]|a[c+3|0]^a[b+3|0]|a[c+4|0]^a[b+4|0]|a[c+5|0]^a[b+5|0]|a[c+6|0]^a[b+6|0]|a[c+7|0]^a[b+7|0]|a[c+8|0]^a[b+8|0]|a[c+9|0]^a[b+9|0]|a[c+10|0]^a[b+10|0]|a[c+11|0]^a[b+11|0]|a[c+12|0]^a[b+12|0]|a[c+13|0]^a[b+13|0]|a[c+14|0]^a[b+14|0]|a[c+15|0]^a[b+15|0])&255)+511|0)>>>8&1)-1|0}function Gg(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;i=i+32|0;e=d|0;gh(e,c,b)|0;b=Xg(a,9912,e,96)|0;i=d;return b|0}function Hg(a,b){a=a|0;b=b|0;Pg(b,32,0);return jh(a,b)|0}function Ig(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return _g(a,b,c,d,e,f)|0}function Jg(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return $g(a,b,c,d,e,f)|0}function Kg(a,b){a=a|0;b=b|0;return Hg(a,b)|0}function Lg(a,b,c){a=a|0;b=b|0;c=c|0;return Gg(a,b,c)|0}function Mg(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Ig(a,b,c,d,e,f)|0}function Ng(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Jg(a,b,c,d,e,f)|0}function Og(){Cb[c[(c[100]|0)+8>>2]&3]();return}function Pg(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;e=1;if(d>>>0<e>>>0|d>>>0==e>>>0&b>>>0<0>>>0){Fb[c[(c[100]|0)+16>>2]&3](a,b);return}else{wa(936,1368,62,1680)}}function Qg(){var b=0,d=0,e=0;b=i;if((a[12]&1)!=0){i=b;return}do{if((Ka(1352,4)|0)==0){d=112}else{if((Ka(1208,4)|0)==0){d=116;break}if((Ka(1136,4)|0)==0){d=120;break}c[2]=-1;ub()}}while(0);e=Na(c[d>>2]|0,0,(d=i,i=i+1|0,i=i+7&-8,c[d>>2]=0,d)|0)|0;i=d;c[2]=e;if((e|0)==-1){ub()}a[12]=1;i=b;return}function Rg(){var b=0,d=0;b=c[2]|0;do{if((b|0)==-1){d=-1}else{if((Ea(b|0)|0)!=0){d=-1;break}c[2]=-1;a[12]=0;d=0}}while(0);return d|0}function Sg(){var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0;b=i;i=i+8|0;d=b|0;if((a[12]&1)==0){Qg()}e=c[2]|0;f=d;g=4;a:while(1){while(1){h=$a(e|0,f|0,g|0)|0;if((h|0)>=0){break}if((c[(qb()|0)>>2]|0)!=4){j=10;break a}}if((h|0)==0){k=f;break}l=f+h|0;if((g|0)==(h|0)){k=l;break}else{f=l;g=g-h|0}}if((j|0)==10){ub();return 0}if((k-d|0)==4){i=b;return c[d>>2]|0}else{ub();return 0}return 0}function Tg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;if((a[12]&1)==0){Qg()}e=c[2]|0;f=b;g=d;a:while(1){while(1){h=$a(e|0,f|0,g|0)|0;if((h|0)>=0){break}if((c[(qb()|0)>>2]|0)!=4){i=h;break a}}if((h|0)==0){j=f;k=9;break}l=f+h|0;if((g|0)==(h|0)){j=l;k=9;break}else{f=l;g=g-h|0}}if((k|0)==9){i=j-b|0}if((i|0)==(d|0)){return}else{ub()}}function Ug(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;d=i;i=i+8|0;e=d|0;if(b>>>0<2>>>0){f=0;i=d;return f|0}g=((-b|0)>>>0)%(b>>>0)|0;h=e;j=e;a:while(1){if((a[12]&1)==0){Qg()}k=c[2]|0;l=h;m=4;while(1){while(1){n=$a(k|0,l|0,m|0)|0;if((n|0)>=0){break}if((c[(qb()|0)>>2]|0)!=4){o=12;break a}}if((n|0)==0){p=l;break}q=l+n|0;if((m|0)==(n|0)){p=q;break}else{l=q;m=m-n|0}}if((p-j|0)!=4){o=12;break}r=c[e>>2]|0;if(r>>>0>=g>>>0){o=14;break}}if((o|0)==12){ub();return 0}else if((o|0)==14){f=(r>>>0)%(b>>>0)|0;i=d;return f|0}return 0}function Vg(){return 920}function Wg(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0;g=(d[f+1|0]|0)<<8|(d[f]|0)|(d[f+2|0]|0)<<16|(d[f+3|0]|0)<<24;h=(d[e+1|0]|0)<<8|(d[e]|0)|(d[e+2|0]|0)<<16|(d[e+3|0]|0)<<24;i=(d[e+5|0]|0)<<8|(d[e+4|0]|0)|(d[e+6|0]|0)<<16|(d[e+7|0]|0)<<24;j=(d[e+9|0]|0)<<8|(d[e+8|0]|0)|(d[e+10|0]|0)<<16|(d[e+11|0]|0)<<24;k=(d[e+13|0]|0)<<8|(d[e+12|0]|0)|(d[e+14|0]|0)<<16|(d[e+15|0]|0)<<24;l=(d[f+5|0]|0)<<8|(d[f+4|0]|0)|(d[f+6|0]|0)<<16|(d[f+7|0]|0)<<24;m=(d[c+1|0]|0)<<8|(d[c]|0)|(d[c+2|0]|0)<<16|(d[c+3|0]|0)<<24;n=(d[c+5|0]|0)<<8|(d[c+4|0]|0)|(d[c+6|0]|0)<<16|(d[c+7|0]|0)<<24;o=(d[c+9|0]|0)<<8|(d[c+8|0]|0)|(d[c+10|0]|0)<<16|(d[c+11|0]|0)<<24;p=(d[c+13|0]|0)<<8|(d[c+12|0]|0)|(d[c+14|0]|0)<<16|(d[c+15|0]|0)<<24;c=(d[f+9|0]|0)<<8|(d[f+8|0]|0)|(d[f+10|0]|0)<<16|(d[f+11|0]|0)<<24;q=(d[e+17|0]|0)<<8|(d[e+16|0]|0)|(d[e+18|0]|0)<<16|(d[e+19|0]|0)<<24;r=(d[e+21|0]|0)<<8|(d[e+20|0]|0)|(d[e+22|0]|0)<<16|(d[e+23|0]|0)<<24;s=(d[e+25|0]|0)<<8|(d[e+24|0]|0)|(d[e+26|0]|0)<<16|(d[e+27|0]|0)<<24;t=(d[e+29|0]|0)<<8|(d[e+28|0]|0)|(d[e+30|0]|0)<<16|(d[e+31|0]|0)<<24;e=(d[f+13|0]|0)<<8|(d[f+12|0]|0)|(d[f+14|0]|0)<<16|(d[f+15|0]|0)<<24;f=e;u=t;v=s;w=r;x=q;y=c;z=p;A=o;B=n;C=m;D=l;E=k;F=j;G=i;H=h;I=g;J=20;do{K=I+w|0;L=(K>>>25|K<<7)^E;K=L+I|0;M=(K>>>23|K<<9)^A;K=M+L|0;N=(K>>>19|K<<13)^w;K=N+M|0;O=(K>>>14|K<<18)^I;K=H+D|0;P=(K>>>25|K<<7)^z;K=P+D|0;Q=(K>>>23|K<<9)^v;K=Q+P|0;R=(K>>>19|K<<13)^H;K=R+Q|0;S=(K>>>14|K<<18)^D;K=C+y|0;T=(K>>>25|K<<7)^u;K=T+y|0;U=(K>>>23|K<<9)^G;K=U+T|0;V=(K>>>19|K<<13)^C;K=V+U|0;W=(K>>>14|K<<18)^y;K=x+f|0;X=F^(K>>>25|K<<7);K=X+f|0;Y=(K>>>23|K<<9)^B;K=Y+X|0;Z=(K>>>19|K<<13)^x;K=Z+Y|0;_=(K>>>14|K<<18)^f;K=O+X|0;H=(K>>>25|K<<7)^R;R=H+O|0;G=(R>>>23|R<<9)^U;U=G+H|0;F=(U>>>19|U<<13)^X;X=F+G|0;I=(X>>>14|X<<18)^O;O=S+L|0;C=(O>>>25|O<<7)^V;V=C+S|0;B=(V>>>23|V<<9)^Y;Y=B+C|0;E=(Y>>>19|Y<<13)^L;L=E+B|0;D=(L>>>14|L<<18)^S;S=W+P|0;x=(S>>>25|S<<7)^Z;Z=x+W|0;A=(Z>>>23|Z<<9)^M;M=A+x|0;z=(M>>>19|M<<13)^P;P=z+A|0;y=(P>>>14|P<<18)^W;W=_+T|0;w=(W>>>25|W<<7)^N;N=w+_|0;v=(N>>>23|N<<9)^Q;Q=v+w|0;u=(Q>>>19|Q<<13)^T;T=u+v|0;f=(T>>>14|T<<18)^_;J=J-2|0;}while((J|0)>0);J=I+g|0;g=H+h|0;h=G+i|0;i=F+j|0;j=E+k|0;k=D+l|0;l=C+m|0;m=B+n|0;n=A+o|0;o=z+p|0;p=y+c|0;c=x+q|0;q=w+r|0;r=v+s|0;s=u+t|0;t=f+e|0;a[b]=J;a[b+1|0]=J>>>8;a[b+2|0]=J>>>16;a[b+3|0]=J>>>24;a[b+4|0]=g;a[b+5|0]=g>>>8;a[b+6|0]=g>>>16;a[b+7|0]=g>>>24;a[b+8|0]=h;a[b+9|0]=h>>>8;a[b+10|0]=h>>>16;a[b+11|0]=h>>>24;a[b+12|0]=i;a[b+13|0]=i>>>8;a[b+14|0]=i>>>16;a[b+15|0]=i>>>24;a[b+16|0]=j;a[b+17|0]=j>>>8;a[b+18|0]=j>>>16;a[b+19|0]=j>>>24;a[b+20|0]=k;a[b+21|0]=k>>>8;a[b+22|0]=k>>>16;a[b+23|0]=k>>>24;a[b+24|0]=l;a[b+25|0]=l>>>8;a[b+26|0]=l>>>16;a[b+27|0]=l>>>24;a[b+28|0]=m;a[b+29|0]=m>>>8;a[b+30|0]=m>>>16;a[b+31|0]=m>>>24;a[b+32|0]=n;a[b+33|0]=n>>>8;a[b+34|0]=n>>>16;a[b+35|0]=n>>>24;a[b+36|0]=o;a[b+37|0]=o>>>8;a[b+38|0]=o>>>16;a[b+39|0]=o>>>24;a[b+40|0]=p;a[b+41|0]=p>>>8;a[b+42|0]=p>>>16;a[b+43|0]=p>>>24;a[b+44|0]=c;a[b+45|0]=c>>>8;a[b+46|0]=c>>>16;a[b+47|0]=c>>>24;a[b+48|0]=q;a[b+49|0]=q>>>8;a[b+50|0]=q>>>16;a[b+51|0]=q>>>24;a[b+52|0]=r;a[b+53|0]=r>>>8;a[b+54|0]=r>>>16;a[b+55|0]=r>>>24;a[b+56|0]=s;a[b+57|0]=s>>>8;a[b+58|0]=s>>>16;a[b+59|0]=s>>>24;a[b+60|0]=t;a[b+61|0]=t>>>8;a[b+62|0]=t>>>16;a[b+63|0]=t>>>24;return 0}function Xg(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0;g=(d[f+1|0]|0)<<8|(d[f]|0)|(d[f+2|0]|0)<<16|(d[f+3|0]|0)<<24;h=(d[e+1|0]|0)<<8|(d[e]|0)|(d[e+2|0]|0)<<16|(d[e+3|0]|0)<<24;i=(d[e+5|0]|0)<<8|(d[e+4|0]|0)|(d[e+6|0]|0)<<16|(d[e+7|0]|0)<<24;j=(d[e+9|0]|0)<<8|(d[e+8|0]|0)|(d[e+10|0]|0)<<16|(d[e+11|0]|0)<<24;k=(d[e+13|0]|0)<<8|(d[e+12|0]|0)|(d[e+14|0]|0)<<16|(d[e+15|0]|0)<<24;l=(d[f+5|0]|0)<<8|(d[f+4|0]|0)|(d[f+6|0]|0)<<16|(d[f+7|0]|0)<<24;m=(d[c+1|0]|0)<<8|(d[c]|0)|(d[c+2|0]|0)<<16|(d[c+3|0]|0)<<24;n=(d[c+5|0]|0)<<8|(d[c+4|0]|0)|(d[c+6|0]|0)<<16|(d[c+7|0]|0)<<24;o=(d[c+9|0]|0)<<8|(d[c+8|0]|0)|(d[c+10|0]|0)<<16|(d[c+11|0]|0)<<24;p=(d[c+13|0]|0)<<8|(d[c+12|0]|0)|(d[c+14|0]|0)<<16|(d[c+15|0]|0)<<24;c=(d[f+9|0]|0)<<8|(d[f+8|0]|0)|(d[f+10|0]|0)<<16|(d[f+11|0]|0)<<24;q=(d[e+17|0]|0)<<8|(d[e+16|0]|0)|(d[e+18|0]|0)<<16|(d[e+19|0]|0)<<24;r=(d[e+21|0]|0)<<8|(d[e+20|0]|0)|(d[e+22|0]|0)<<16|(d[e+23|0]|0)<<24;s=(d[e+25|0]|0)<<8|(d[e+24|0]|0)|(d[e+26|0]|0)<<16|(d[e+27|0]|0)<<24;t=(d[e+29|0]|0)<<8|(d[e+28|0]|0)|(d[e+30|0]|0)<<16|(d[e+31|0]|0)<<24;e=(d[f+13|0]|0)<<8|(d[f+12|0]|0)|(d[f+14|0]|0)<<16|(d[f+15|0]|0)<<24;f=20;do{u=r+g|0;v=(u>>>25|u<<7)^k;u=v+g|0;w=(u>>>23|u<<9)^o;u=w+v|0;x=(u>>>19|u<<13)^r;u=x+w|0;y=(u>>>14|u<<18)^g;u=l+h|0;z=p^(u>>>25|u<<7);u=z+l|0;A=s^(u>>>23|u<<9);u=A+z|0;B=(u>>>19|u<<13)^h;u=B+A|0;C=(u>>>14|u<<18)^l;u=c+m|0;D=t^(u>>>25|u<<7);u=D+c|0;E=(u>>>23|u<<9)^i;u=E+D|0;F=(u>>>19|u<<13)^m;u=F+E|0;G=(u>>>14|u<<18)^c;u=e+q|0;H=(u>>>25|u<<7)^j;u=H+e|0;I=(u>>>23|u<<9)^n;u=I+H|0;J=(u>>>19|u<<13)^q;u=J+I|0;K=(u>>>14|u<<18)^e;u=y+H|0;h=(u>>>25|u<<7)^B;B=h+y|0;i=(B>>>23|B<<9)^E;E=i+h|0;j=(E>>>19|E<<13)^H;H=j+i|0;g=(H>>>14|H<<18)^y;y=C+v|0;m=(y>>>25|y<<7)^F;F=m+C|0;n=(F>>>23|F<<9)^I;I=n+m|0;k=(I>>>19|I<<13)^v;v=k+n|0;l=(v>>>14|v<<18)^C;C=G+z|0;q=(C>>>25|C<<7)^J;J=q+G|0;o=(J>>>23|J<<9)^w;w=o+q|0;p=(w>>>19|w<<13)^z;z=p+o|0;c=(z>>>14|z<<18)^G;G=K+D|0;r=(G>>>25|G<<7)^x;x=r+K|0;s=(x>>>23|x<<9)^A;A=s+r|0;t=(A>>>19|A<<13)^D;D=t+s|0;e=(D>>>14|D<<18)^K;f=f-2|0;}while((f|0)>0);a[b]=g;a[b+1|0]=g>>>8;a[b+2|0]=g>>>16;a[b+3|0]=g>>>24;a[b+4|0]=l;a[b+5|0]=l>>>8;a[b+6|0]=l>>>16;a[b+7|0]=l>>>24;a[b+8|0]=c;a[b+9|0]=c>>>8;a[b+10|0]=c>>>16;a[b+11|0]=c>>>24;a[b+12|0]=e;a[b+13|0]=e>>>8;a[b+14|0]=e>>>16;a[b+15|0]=e>>>24;a[b+16|0]=m;a[b+17|0]=m>>>8;a[b+18|0]=m>>>16;a[b+19|0]=m>>>24;a[b+20|0]=n;a[b+21|0]=n>>>8;a[b+22|0]=n>>>16;a[b+23|0]=n>>>24;a[b+24|0]=o;a[b+25|0]=o>>>8;a[b+26|0]=o>>>16;a[b+27|0]=o>>>24;a[b+28|0]=p;a[b+29|0]=p>>>8;a[b+30|0]=p>>>16;a[b+31|0]=p>>>24;return 0}function Yg(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return _g(a,b,c,d,e,f)|0}function Zg(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return $g(a,b,c,d,e,f)|0}function _g(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=0;if(d>>>0<g>>>0|d>>>0==g>>>0&c>>>0<32>>>0){h=-1;return h|0}dh(a,b,c,d,e,f)|0;f=Nh(c,d,-32,-1)|0;Bg(a+16|0,a+32|0,f,E,a)|0;Jh(a|0,0,16)|0;h=0;return h|0}function $g(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0;g=i;i=i+32|0;h=0;if(d>>>0<h>>>0|d>>>0==h>>>0&c>>>0<32>>>0){j=-1;i=g;return j|0}h=g|0;ch(h,32,0,e,f)|0;k=Nh(c,d,-32,-1)|0;if((Cg(b+16|0,b+32|0,k,E,h)|0)!=0){j=-1;i=g;return j|0}dh(a,b,c,d,e,f)|0;Jh(a|0,0,32)|0;j=0;i=g;return j|0}function ah(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0,cb=0,db=0,eb=0,fb=0,gb=0,hb=0,ib=0,jb=0,kb=0,lb=0,mb=0,nb=0,ob=0,pb=0,qb=0,rb=0,sb=0,tb=0,ub=0,vb=0,wb=0,xb=0,yb=0,zb=0,Ab=0,Bb=0,Cb=0,Db=0,Eb=0,Fb=0,Gb=0,Hb=0,Ib=0;g=b+3|0;h=a[g]|0;i=b+2|0;j=a[i]|0;k=b+1|0;l=a[k]|0;m=a[b]|0;n=b+4|0;o=b+7|0;p=a[o]|0;q=b+6|0;r=a[q]|0;s=b+5|0;t=a[s]|0;u=a[n]|0;v=b+8|0;w=b+11|0;x=a[w]|0;y=b+10|0;z=a[y]|0;A=b+9|0;B=a[A]|0;C=a[v]|0;D=b+12|0;F=b+15|0;G=a[F]|0;H=b+14|0;I=a[H]|0;J=b+13|0;K=a[J]|0;L=a[D]|0;M=b+16|0;N=b+19|0;O=a[N]|0;P=b+18|0;Q=a[P]|0;R=b+17|0;S=a[R]|0;T=a[M]|0;U=b+20|0;V=b+23|0;W=a[V]|0;X=b+22|0;Y=a[X]|0;Z=b+21|0;_=a[Z]|0;$=a[U]|0;aa=b+24|0;ba=b+27|0;ca=a[ba]|0;da=b+26|0;ea=a[da]|0;fa=b+25|0;ga=a[fa]|0;ha=a[aa]|0;ia=b+28|0;ja=b+31|0;ka=a[ja]|0;la=b+30|0;ma=a[la]|0;na=b+29|0;oa=a[na]|0;pa=a[ia]|0;qa=0;if(!(f>>>0>qa>>>0|f>>>0==qa>>>0&e>>>0>63>>>0)){ra=pa;sa=oa;ta=ma;ua=ka;va=ha;wa=ga;xa=ea;ya=ca;za=$;Aa=_;Ba=Y;Ca=W;Da=T;Ea=S;Fa=Q;Ga=O;Ha=L;Ia=K;Ja=I;Ka=G;La=C;Ma=B;Na=z;Oa=x;Pa=u;Qa=t;Ra=r;Sa=p;Ta=m;Ua=l;Va=j;Wa=h;a[g]=Wa;a[i]=Va;a[k]=Ua;a[b]=Ta;a[o]=Sa;a[q]=Ra;a[s]=Qa;a[n]=Pa;a[w]=Oa;a[y]=Na;a[A]=Ma;a[v]=La;a[F]=Ka;a[H]=Ja;a[J]=Ia;a[D]=Ha;a[N]=Ga;a[P]=Fa;a[R]=Ea;a[M]=Da;a[V]=Ca;a[X]=Ba;a[Z]=Aa;a[U]=za;a[ba]=ya;a[da]=xa;a[fa]=wa;a[aa]=va;a[ja]=ua;a[la]=ta;a[na]=sa;a[ia]=ra;return 0}qa=(ma&255)<<8|ka&255|(oa&255)<<16|(pa&255)<<24;pa=(ea&255)<<8|ca&255|(ga&255)<<16|(ha&255)<<24;ha=(Y&255)<<8|W&255|(_&255)<<16|($&255)<<24;$=(Q&255)<<8|O&255|(S&255)<<16|(T&255)<<24;T=(I&255)<<8|G&255|(K&255)<<16|(L&255)<<24;L=(z&255)<<8|x&255|(B&255)<<16|(C&255)<<24;C=(r&255)<<8|p&255|(t&255)<<16|(u&255)<<24;u=(j&255)<<8|h&255|(l&255)<<16|(m&255)<<24;m=f;f=e;e=c;while(1){c=(d[e+2|0]|0)<<8|(d[e+3|0]|0)|(d[e+1|0]|0)<<16|(d[e]|0)<<24;l=d[e+7|0]|0;h=(d[e+6|0]|0)<<8|l|(d[e+5|0]|0)<<16;j=h|(d[e+4|0]|0)<<24;t=d[e+11|0]|0;p=(d[e+10|0]|0)<<8|t|(d[e+9|0]|0)<<16;r=p|(d[e+8|0]|0)<<24;B=d[e+15|0]|0;x=(d[e+14|0]|0)<<8|B|(d[e+13|0]|0)<<16;z=x|(d[e+12|0]|0)<<24;K=d[e+19|0]|0;G=(d[e+18|0]|0)<<8|K|(d[e+17|0]|0)<<16;I=G|(d[e+16|0]|0)<<24;S=d[e+23|0]|0;O=(d[e+22|0]|0)<<8|S|(d[e+21|0]|0)<<16;Q=O|(d[e+20|0]|0)<<24;_=d[e+27|0]|0;W=(d[e+26|0]|0)<<8|_|(d[e+25|0]|0)<<16;Y=W|(d[e+24|0]|0)<<24;ga=d[e+31|0]|0;ca=(d[e+30|0]|0)<<8|ga|(d[e+29|0]|0)<<16;ea=ca|(d[e+28|0]|0)<<24;oa=d[e+35|0]|0;ka=(d[e+34|0]|0)<<8|oa|(d[e+33|0]|0)<<16;ma=ka|(d[e+32|0]|0)<<24;Xa=d[e+39|0]|0;Ya=(d[e+38|0]|0)<<8|Xa|(d[e+37|0]|0)<<16;Za=Ya|(d[e+36|0]|0)<<24;_a=d[e+43|0]|0;$a=(d[e+42|0]|0)<<8|_a|(d[e+41|0]|0)<<16;ab=$a|(d[e+40|0]|0)<<24;bb=d[e+47|0]|0;cb=(d[e+46|0]|0)<<8|bb|(d[e+45|0]|0)<<16;db=cb|(d[e+44|0]|0)<<24;eb=d[e+51|0]|0;fb=(d[e+50|0]|0)<<8|eb|(d[e+49|0]|0)<<16;gb=fb|(d[e+48|0]|0)<<24;hb=d[e+55|0]|0;ib=(d[e+54|0]|0)<<8|hb|(d[e+53|0]|0)<<16;jb=ib|(d[e+52|0]|0)<<24;kb=d[e+59|0]|0;lb=(d[e+58|0]|0)<<8|kb|(d[e+57|0]|0)<<16;mb=lb|(d[e+56|0]|0)<<24;nb=d[e+63|0]|0;ob=(d[e+62|0]|0)<<8|nb|(d[e+61|0]|0)<<16;pb=ob|(d[e+60|0]|0)<<24;qb=qa+1116352408+($&ha^pa&~$)+(($>>>6|$<<26)^($>>>11|$<<21)^($>>>25|$<<7))+c|0;rb=u&C;sb=qb+T|0;tb=((u>>>2|u<<30)^(u>>>13|u<<19)^(u>>>22|u<<10))+((u^C)&L^rb)+qb|0;qb=pa+1899447441+(sb&$^ha&~sb)+j+((sb>>>6|sb<<26)^(sb>>>11|sb<<21)^(sb>>>25|sb<<7))|0;ub=tb&u;vb=qb+L|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&C^rb^ub)+qb|0;qb=ha-1245643825+r+(vb&sb^$&~vb)+((vb>>>6|vb<<26)^(vb>>>11|vb<<21)^(vb>>>25|vb<<7))|0;rb=wb&tb;xb=qb+C|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&u^ub^rb)+qb|0;qb=$-373957723+z+(xb&vb^sb&~xb)+((xb>>>6|xb<<26)^(xb>>>11|xb<<21)^(xb>>>25|xb<<7))|0;ub=yb&wb;zb=qb+u|0;Ab=((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+(yb&tb^rb^ub)+qb|0;qb=sb+961987163+I+(zb&xb^vb&~zb)+((zb>>>6|zb<<26)^(zb>>>11|zb<<21)^(zb>>>25|zb<<7))|0;sb=Ab&yb;rb=qb+tb|0;tb=((Ab>>>2|Ab<<30)^(Ab>>>13|Ab<<19)^(Ab>>>22|Ab<<10))+(Ab&wb^ub^sb)+qb|0;qb=vb+1508970993+Q+(rb&zb^xb&~rb)+((rb>>>6|rb<<26)^(rb>>>11|rb<<21)^(rb>>>25|rb<<7))|0;vb=tb&Ab;ub=qb+wb|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&yb^sb^vb)+qb|0;qb=xb-1841331548+Y+(ub&rb^zb&~ub)+((ub>>>6|ub<<26)^(ub>>>11|ub<<21)^(ub>>>25|ub<<7))|0;xb=wb&tb;sb=qb+yb|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&Ab^vb^xb)+qb|0;qb=zb-1424204075+ea+(sb&ub^rb&~sb)+((sb>>>6|sb<<26)^(sb>>>11|sb<<21)^(sb>>>25|sb<<7))|0;zb=yb&wb;vb=qb+Ab|0;Ab=((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+(yb&tb^xb^zb)+qb|0;qb=rb-670586216+ma+(vb&sb^ub&~vb)+((vb>>>6|vb<<26)^(vb>>>11|vb<<21)^(vb>>>25|vb<<7))|0;rb=Ab&yb;xb=qb+tb|0;tb=((Ab>>>2|Ab<<30)^(Ab>>>13|Ab<<19)^(Ab>>>22|Ab<<10))+(Ab&wb^zb^rb)+qb|0;qb=ub+310598401+Za+(xb&vb^sb&~xb)+((xb>>>6|xb<<26)^(xb>>>11|xb<<21)^(xb>>>25|xb<<7))|0;ub=tb&Ab;zb=qb+wb|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&yb^rb^ub)+qb|0;qb=sb+607225278+ab+(zb&xb^vb&~zb)+((zb>>>6|zb<<26)^(zb>>>11|zb<<21)^(zb>>>25|zb<<7))|0;sb=wb&tb;rb=qb+yb|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&Ab^ub^sb)+qb|0;qb=vb+1426881987+db+(rb&zb^xb&~rb)+((rb>>>6|rb<<26)^(rb>>>11|rb<<21)^(rb>>>25|rb<<7))|0;vb=yb&wb;ub=qb+Ab|0;Ab=((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+(yb&tb^sb^vb)+qb|0;qb=gb+1925078388+xb+(ub&rb^zb&~ub)+((ub>>>6|ub<<26)^(ub>>>11|ub<<21)^(ub>>>25|ub<<7))|0;xb=Ab&yb;sb=qb+tb|0;tb=((Ab>>>2|Ab<<30)^(Ab>>>13|Ab<<19)^(Ab>>>22|Ab<<10))+(Ab&wb^vb^xb)+qb|0;qb=jb-2132889090+zb+(sb&ub^rb&~sb)+((sb>>>6|sb<<26)^(sb>>>11|sb<<21)^(sb>>>25|sb<<7))|0;zb=tb&Ab;vb=qb+wb|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&yb^xb^zb)+qb|0;qb=mb-1680079193+rb+(vb&sb^ub&~vb)+((vb>>>6|vb<<26)^(vb>>>11|vb<<21)^(vb>>>25|vb<<7))|0;rb=wb&tb;xb=qb+yb|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&Ab^zb^rb)+qb|0;qb=pb-1046744716+ub+(xb&vb^sb&~xb)+((xb>>>6|xb<<26)^(xb>>>11|xb<<21)^(xb>>>25|xb<<7))|0;ub=yb&wb;zb=qb+Ab|0;Ab=((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+(yb&tb^rb^ub)+qb|0;qb=((j>>>18|h<<14)^j>>>3^(j>>>7|l<<25))+c+Za+((mb>>>19|lb<<13)^mb>>>10^(mb>>>17|lb<<15))|0;c=((r>>>18|p<<14)^r>>>3^(r>>>7|t<<25))+j+ab+((pb>>>19|ob<<13)^pb>>>10^(pb>>>17|ob<<15))|0;j=((z>>>18|x<<14)^z>>>3^(z>>>7|B<<25))+r+db+((qb>>>19|qb<<13)^qb>>>10^(qb>>>17|qb<<15))|0;r=((I>>>18|G<<14)^I>>>3^(I>>>7|K<<25))+z+gb+((c>>>19|c<<13)^c>>>10^(c>>>17|c<<15))|0;z=((Q>>>18|O<<14)^Q>>>3^(Q>>>7|S<<25))+I+jb+((j>>>19|j<<13)^j>>>10^(j>>>17|j<<15))|0;I=((Y>>>18|W<<14)^Y>>>3^(Y>>>7|_<<25))+Q+mb+((r>>>19|r<<13)^r>>>10^(r>>>17|r<<15))|0;Q=((ea>>>18|ca<<14)^ea>>>3^(ea>>>7|ga<<25))+Y+pb+((z>>>19|z<<13)^z>>>10^(z>>>17|z<<15))|0;Y=((ma>>>18|ka<<14)^ma>>>3^(ma>>>7|oa<<25))+ea+qb+((I>>>19|I<<13)^I>>>10^(I>>>17|I<<15))|0;ea=((Za>>>18|Ya<<14)^Za>>>3^(Za>>>7|Xa<<25))+ma+c+((Q>>>19|Q<<13)^Q>>>10^(Q>>>17|Q<<15))|0;ma=((ab>>>18|$a<<14)^ab>>>3^(ab>>>7|_a<<25))+Za+j+((Y>>>19|Y<<13)^Y>>>10^(Y>>>17|Y<<15))|0;Za=((db>>>18|cb<<14)^db>>>3^(db>>>7|bb<<25))+ab+r+((ea>>>19|ea<<13)^ea>>>10^(ea>>>17|ea<<15))|0;ab=((gb>>>18|fb<<14)^gb>>>3^(gb>>>7|eb<<25))+db+z+((ma>>>19|ma<<13)^ma>>>10^(ma>>>17|ma<<15))|0;db=((jb>>>18|ib<<14)^jb>>>3^(jb>>>7|hb<<25))+gb+I+((Za>>>19|Za<<13)^Za>>>10^(Za>>>17|Za<<15))|0;gb=((mb>>>18|lb<<14)^mb>>>3^(mb>>>7|kb<<25))+jb+Q+((ab>>>19|ab<<13)^ab>>>10^(ab>>>17|ab<<15))|0;jb=((pb>>>18|ob<<14)^pb>>>3^(pb>>>7|nb<<25))+mb+Y+((db>>>19|db<<13)^db>>>10^(db>>>17|db<<15))|0;mb=((qb>>>18|qb<<14)^qb>>>3^(qb>>>7|qb<<25))+pb+ea+((gb>>>19|gb<<13)^gb>>>10^(gb>>>17|gb<<15))|0;pb=qb-459576895+sb+(zb&xb^vb&~zb)+((zb>>>6|zb<<26)^(zb>>>11|zb<<21)^(zb>>>25|zb<<7))|0;sb=Ab&yb;nb=pb+tb|0;tb=((Ab>>>2|Ab<<30)^(Ab>>>13|Ab<<19)^(Ab>>>22|Ab<<10))+(Ab&wb^ub^sb)+pb|0;pb=c-272742522+vb+(nb&zb^xb&~nb)+((nb>>>6|nb<<26)^(nb>>>11|nb<<21)^(nb>>>25|nb<<7))|0;vb=tb&Ab;ub=pb+wb|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&yb^sb^vb)+pb|0;pb=j+264347078+xb+(ub&nb^zb&~ub)+((ub>>>6|ub<<26)^(ub>>>11|ub<<21)^(ub>>>25|ub<<7))|0;xb=wb&tb;sb=pb+yb|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&Ab^vb^xb)+pb|0;pb=r+604807628+zb+(sb&ub^nb&~sb)+((sb>>>6|sb<<26)^(sb>>>11|sb<<21)^(sb>>>25|sb<<7))|0;zb=yb&wb;vb=pb+Ab|0;Ab=((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+(yb&tb^xb^zb)+pb|0;pb=z+770255983+nb+(vb&sb^ub&~vb)+((vb>>>6|vb<<26)^(vb>>>11|vb<<21)^(vb>>>25|vb<<7))|0;nb=Ab&yb;xb=pb+tb|0;tb=((Ab>>>2|Ab<<30)^(Ab>>>13|Ab<<19)^(Ab>>>22|Ab<<10))+(Ab&wb^zb^nb)+pb|0;pb=I+1249150122+ub+(xb&vb^sb&~xb)+((xb>>>6|xb<<26)^(xb>>>11|xb<<21)^(xb>>>25|xb<<7))|0;ub=tb&Ab;zb=pb+wb|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&yb^nb^ub)+pb|0;pb=Q+1555081692+sb+(zb&xb^vb&~zb)+((zb>>>6|zb<<26)^(zb>>>11|zb<<21)^(zb>>>25|zb<<7))|0;sb=wb&tb;nb=pb+yb|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&Ab^ub^sb)+pb|0;pb=Y+1996064986+vb+(nb&zb^xb&~nb)+((nb>>>6|nb<<26)^(nb>>>11|nb<<21)^(nb>>>25|nb<<7))|0;vb=yb&wb;ub=pb+Ab|0;Ab=((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+(yb&tb^sb^vb)+pb|0;pb=ea-1740746414+xb+(ub&nb^zb&~ub)+((ub>>>6|ub<<26)^(ub>>>11|ub<<21)^(ub>>>25|ub<<7))|0;xb=Ab&yb;sb=pb+tb|0;tb=((Ab>>>2|Ab<<30)^(Ab>>>13|Ab<<19)^(Ab>>>22|Ab<<10))+(Ab&wb^vb^xb)+pb|0;pb=ma-1473132947+zb+(sb&ub^nb&~sb)+((sb>>>6|sb<<26)^(sb>>>11|sb<<21)^(sb>>>25|sb<<7))|0;zb=tb&Ab;vb=pb+wb|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&yb^xb^zb)+pb|0;pb=Za-1341970488+nb+(vb&sb^ub&~vb)+((vb>>>6|vb<<26)^(vb>>>11|vb<<21)^(vb>>>25|vb<<7))|0;nb=wb&tb;xb=pb+yb|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&Ab^zb^nb)+pb|0;pb=ab-1084653625+ub+(xb&vb^sb&~xb)+((xb>>>6|xb<<26)^(xb>>>11|xb<<21)^(xb>>>25|xb<<7))|0;ub=yb&wb;zb=pb+Ab|0;Ab=((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+(yb&tb^nb^ub)+pb|0;pb=db-958395405+sb+(zb&xb^vb&~zb)+((zb>>>6|zb<<26)^(zb>>>11|zb<<21)^(zb>>>25|zb<<7))|0;sb=Ab&yb;nb=pb+tb|0;tb=((Ab>>>2|Ab<<30)^(Ab>>>13|Ab<<19)^(Ab>>>22|Ab<<10))+(Ab&wb^ub^sb)+pb|0;pb=gb-710438585+vb+(nb&zb^xb&~nb)+((nb>>>6|nb<<26)^(nb>>>11|nb<<21)^(nb>>>25|nb<<7))|0;vb=tb&Ab;ub=pb+wb|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&yb^sb^vb)+pb|0;pb=jb+113926993+xb+(ub&nb^zb&~ub)+((ub>>>6|ub<<26)^(ub>>>11|ub<<21)^(ub>>>25|ub<<7))|0;xb=wb&tb;sb=pb+yb|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&Ab^vb^xb)+pb|0;pb=mb+338241895+zb+(sb&ub^nb&~sb)+((sb>>>6|sb<<26)^(sb>>>11|sb<<21)^(sb>>>25|sb<<7))|0;zb=yb&wb;vb=pb+Ab|0;Ab=((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+(yb&tb^xb^zb)+pb|0;pb=((c>>>18|c<<14)^c>>>3^(c>>>7|c<<25))+qb+ma+((jb>>>19|jb<<13)^jb>>>10^(jb>>>17|jb<<15))|0;qb=((j>>>18|j<<14)^j>>>3^(j>>>7|j<<25))+c+Za+((mb>>>19|mb<<13)^mb>>>10^(mb>>>17|mb<<15))|0;c=((r>>>18|r<<14)^r>>>3^(r>>>7|r<<25))+j+ab+((pb>>>19|pb<<13)^pb>>>10^(pb>>>17|pb<<15))|0;j=((z>>>18|z<<14)^z>>>3^(z>>>7|z<<25))+r+db+((qb>>>19|qb<<13)^qb>>>10^(qb>>>17|qb<<15))|0;r=((I>>>18|I<<14)^I>>>3^(I>>>7|I<<25))+z+gb+((c>>>19|c<<13)^c>>>10^(c>>>17|c<<15))|0;z=((Q>>>18|Q<<14)^Q>>>3^(Q>>>7|Q<<25))+I+jb+((j>>>19|j<<13)^j>>>10^(j>>>17|j<<15))|0;I=((Y>>>18|Y<<14)^Y>>>3^(Y>>>7|Y<<25))+Q+mb+((r>>>19|r<<13)^r>>>10^(r>>>17|r<<15))|0;Q=((ea>>>18|ea<<14)^ea>>>3^(ea>>>7|ea<<25))+Y+pb+((z>>>19|z<<13)^z>>>10^(z>>>17|z<<15))|0;Y=((ma>>>18|ma<<14)^ma>>>3^(ma>>>7|ma<<25))+ea+qb+((I>>>19|I<<13)^I>>>10^(I>>>17|I<<15))|0;ea=((Za>>>18|Za<<14)^Za>>>3^(Za>>>7|Za<<25))+ma+c+((Q>>>19|Q<<13)^Q>>>10^(Q>>>17|Q<<15))|0;ma=((ab>>>18|ab<<14)^ab>>>3^(ab>>>7|ab<<25))+Za+j+((Y>>>19|Y<<13)^Y>>>10^(Y>>>17|Y<<15))|0;Za=((db>>>18|db<<14)^db>>>3^(db>>>7|db<<25))+ab+r+((ea>>>19|ea<<13)^ea>>>10^(ea>>>17|ea<<15))|0;ab=((gb>>>18|gb<<14)^gb>>>3^(gb>>>7|gb<<25))+db+z+((ma>>>19|ma<<13)^ma>>>10^(ma>>>17|ma<<15))|0;db=((jb>>>18|jb<<14)^jb>>>3^(jb>>>7|jb<<25))+gb+I+((Za>>>19|Za<<13)^Za>>>10^(Za>>>17|Za<<15))|0;gb=((mb>>>18|mb<<14)^mb>>>3^(mb>>>7|mb<<25))+jb+Q+((ab>>>19|ab<<13)^ab>>>10^(ab>>>17|ab<<15))|0;jb=((pb>>>18|pb<<14)^pb>>>3^(pb>>>7|pb<<25))+mb+Y+((db>>>19|db<<13)^db>>>10^(db>>>17|db<<15))|0;mb=pb+666307205+nb+(vb&sb^ub&~vb)+((vb>>>6|vb<<26)^(vb>>>11|vb<<21)^(vb>>>25|vb<<7))|0;nb=Ab&yb;xb=mb+tb|0;tb=((Ab>>>2|Ab<<30)^(Ab>>>13|Ab<<19)^(Ab>>>22|Ab<<10))+(Ab&wb^zb^nb)+mb|0;mb=qb+773529912+ub+(xb&vb^sb&~xb)+((xb>>>6|xb<<26)^(xb>>>11|xb<<21)^(xb>>>25|xb<<7))|0;ub=tb&Ab;zb=mb+wb|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&yb^nb^ub)+mb|0;mb=c+1294757372+sb+(zb&xb^vb&~zb)+((zb>>>6|zb<<26)^(zb>>>11|zb<<21)^(zb>>>25|zb<<7))|0;sb=wb&tb;nb=mb+yb|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&Ab^ub^sb)+mb|0;mb=j+1396182291+vb+(nb&zb^xb&~nb)+((nb>>>6|nb<<26)^(nb>>>11|nb<<21)^(nb>>>25|nb<<7))|0;vb=yb&wb;ub=mb+Ab|0;Ab=((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+(yb&tb^sb^vb)+mb|0;mb=r+1695183700+xb+(ub&nb^zb&~ub)+((ub>>>6|ub<<26)^(ub>>>11|ub<<21)^(ub>>>25|ub<<7))|0;xb=Ab&yb;sb=mb+tb|0;tb=((Ab>>>2|Ab<<30)^(Ab>>>13|Ab<<19)^(Ab>>>22|Ab<<10))+(Ab&wb^vb^xb)+mb|0;mb=z+1986661051+zb+(sb&ub^nb&~sb)+((sb>>>6|sb<<26)^(sb>>>11|sb<<21)^(sb>>>25|sb<<7))|0;zb=tb&Ab;vb=mb+wb|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&yb^xb^zb)+mb|0;mb=I-2117940946+nb+(vb&sb^ub&~vb)+((vb>>>6|vb<<26)^(vb>>>11|vb<<21)^(vb>>>25|vb<<7))|0;nb=wb&tb;xb=mb+yb|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&Ab^zb^nb)+mb|0;mb=Q-1838011259+ub+(xb&vb^sb&~xb)+((xb>>>6|xb<<26)^(xb>>>11|xb<<21)^(xb>>>25|xb<<7))|0;ub=yb&wb;zb=mb+Ab|0;Ab=((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+(yb&tb^nb^ub)+mb|0;mb=Y-1564481375+sb+(zb&xb^vb&~zb)+((zb>>>6|zb<<26)^(zb>>>11|zb<<21)^(zb>>>25|zb<<7))|0;sb=Ab&yb;nb=mb+tb|0;tb=((Ab>>>2|Ab<<30)^(Ab>>>13|Ab<<19)^(Ab>>>22|Ab<<10))+(Ab&wb^ub^sb)+mb|0;mb=ea-1474664885+vb+(nb&zb^xb&~nb)+((nb>>>6|nb<<26)^(nb>>>11|nb<<21)^(nb>>>25|nb<<7))|0;vb=tb&Ab;ub=mb+wb|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&yb^sb^vb)+mb|0;mb=ma-1035236496+xb+(ub&nb^zb&~ub)+((ub>>>6|ub<<26)^(ub>>>11|ub<<21)^(ub>>>25|ub<<7))|0;xb=wb&tb;sb=mb+yb|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&Ab^vb^xb)+mb|0;mb=Za-949202525+zb+(sb&ub^nb&~sb)+((sb>>>6|sb<<26)^(sb>>>11|sb<<21)^(sb>>>25|sb<<7))|0;zb=yb&wb;vb=mb+Ab|0;Ab=((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+(yb&tb^xb^zb)+mb|0;mb=ab-778901479+nb+(vb&sb^ub&~vb)+((vb>>>6|vb<<26)^(vb>>>11|vb<<21)^(vb>>>25|vb<<7))|0;nb=Ab&yb;xb=mb+tb|0;tb=((Ab>>>2|Ab<<30)^(Ab>>>13|Ab<<19)^(Ab>>>22|Ab<<10))+(Ab&wb^zb^nb)+mb|0;mb=db-694614492+ub+(xb&vb^sb&~xb)+((xb>>>6|xb<<26)^(xb>>>11|xb<<21)^(xb>>>25|xb<<7))|0;ub=tb&Ab;zb=mb+wb|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&yb^nb^ub)+mb|0;mb=gb-200395387+sb+(zb&xb^vb&~zb)+((zb>>>6|zb<<26)^(zb>>>11|zb<<21)^(zb>>>25|zb<<7))|0;sb=wb&tb;nb=mb+yb|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&Ab^ub^sb)+mb|0;mb=jb+275423344+vb+(nb&zb^xb&~nb)+((nb>>>6|nb<<26)^(nb>>>11|nb<<21)^(nb>>>25|nb<<7))|0;vb=yb&wb;ub=mb+Ab|0;Ab=((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+(yb&tb^sb^vb)+mb|0;mb=((qb>>>18|qb<<14)^qb>>>3^(qb>>>7|qb<<25))+pb+ea+((gb>>>19|gb<<13)^gb>>>10^(gb>>>17|gb<<15))|0;pb=((c>>>18|c<<14)^c>>>3^(c>>>7|c<<25))+qb+ma+((jb>>>19|jb<<13)^jb>>>10^(jb>>>17|jb<<15))|0;qb=((j>>>18|j<<14)^j>>>3^(j>>>7|j<<25))+c+Za+((mb>>>19|mb<<13)^mb>>>10^(mb>>>17|mb<<15))|0;c=((r>>>18|r<<14)^r>>>3^(r>>>7|r<<25))+j+ab+((pb>>>19|pb<<13)^pb>>>10^(pb>>>17|pb<<15))|0;j=((z>>>18|z<<14)^z>>>3^(z>>>7|z<<25))+r+db+((qb>>>19|qb<<13)^qb>>>10^(qb>>>17|qb<<15))|0;r=((I>>>18|I<<14)^I>>>3^(I>>>7|I<<25))+z+gb+((c>>>19|c<<13)^c>>>10^(c>>>17|c<<15))|0;z=((Q>>>18|Q<<14)^Q>>>3^(Q>>>7|Q<<25))+I+jb+((j>>>19|j<<13)^j>>>10^(j>>>17|j<<15))|0;I=((Y>>>18|Y<<14)^Y>>>3^(Y>>>7|Y<<25))+Q+mb+((r>>>19|r<<13)^r>>>10^(r>>>17|r<<15))|0;Q=((ea>>>18|ea<<14)^ea>>>3^(ea>>>7|ea<<25))+Y+pb+((z>>>19|z<<13)^z>>>10^(z>>>17|z<<15))|0;Y=((ma>>>18|ma<<14)^ma>>>3^(ma>>>7|ma<<25))+ea+qb+((I>>>19|I<<13)^I>>>10^(I>>>17|I<<15))|0;ea=((Za>>>18|Za<<14)^Za>>>3^(Za>>>7|Za<<25))+ma+c+((Q>>>19|Q<<13)^Q>>>10^(Q>>>17|Q<<15))|0;ma=((ab>>>18|ab<<14)^ab>>>3^(ab>>>7|ab<<25))+Za+j+((Y>>>19|Y<<13)^Y>>>10^(Y>>>17|Y<<15))|0;Za=((db>>>18|db<<14)^db>>>3^(db>>>7|db<<25))+ab+r+((ea>>>19|ea<<13)^ea>>>10^(ea>>>17|ea<<15))|0;ab=((gb>>>18|gb<<14)^gb>>>3^(gb>>>7|gb<<25))+db+z+((ma>>>19|ma<<13)^ma>>>10^(ma>>>17|ma<<15))|0;db=mb+430227734+xb+(ub&nb^zb&~ub)+((ub>>>6|ub<<26)^(ub>>>11|ub<<21)^(ub>>>25|ub<<7))|0;xb=Ab&yb;sb=db+tb|0;tb=((Ab>>>2|Ab<<30)^(Ab>>>13|Ab<<19)^(Ab>>>22|Ab<<10))+(Ab&wb^vb^xb)+db|0;db=pb+506948616+zb+(sb&ub^nb&~sb)+((sb>>>6|sb<<26)^(sb>>>11|sb<<21)^(sb>>>25|sb<<7))|0;zb=tb&Ab;pb=db+wb|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&yb^xb^zb)+db|0;db=qb+659060556+nb+(pb&sb^ub&~pb)+((pb>>>6|pb<<26)^(pb>>>11|pb<<21)^(pb>>>25|pb<<7))|0;nb=wb&tb;qb=db+yb|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&Ab^zb^nb)+db|0;db=c+883997877+ub+(qb&pb^sb&~qb)+((qb>>>6|qb<<26)^(qb>>>11|qb<<21)^(qb>>>25|qb<<7))|0;ub=yb&wb;c=db+Ab|0;Ab=((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+(yb&tb^nb^ub)+db|0;db=j+958139571+sb+(c&qb^pb&~c)+((c>>>6|c<<26)^(c>>>11|c<<21)^(c>>>25|c<<7))|0;sb=Ab&yb;j=db+tb|0;tb=((Ab>>>2|Ab<<30)^(Ab>>>13|Ab<<19)^(Ab>>>22|Ab<<10))+(Ab&wb^ub^sb)+db|0;db=r+1322822218+pb+(j&c^qb&~j)+((j>>>6|j<<26)^(j>>>11|j<<21)^(j>>>25|j<<7))|0;pb=tb&Ab;r=db+wb|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&yb^sb^pb)+db|0;db=z+1537002063+qb+(r&j^c&~r)+((r>>>6|r<<26)^(r>>>11|r<<21)^(r>>>25|r<<7))|0;qb=wb&tb;z=db+yb|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&Ab^pb^qb)+db|0;db=I+1747873779+c+(z&r^j&~z)+((z>>>6|z<<26)^(z>>>11|z<<21)^(z>>>25|z<<7))|0;c=yb&wb;pb=db+Ab|0;Ab=((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+(yb&tb^qb^c)+db|0;db=Q+1955562222+j+(pb&z^r&~pb)+((pb>>>6|pb<<26)^(pb>>>11|pb<<21)^(pb>>>25|pb<<7))|0;j=Ab&yb;qb=db+tb|0;tb=((Ab>>>2|Ab<<30)^(Ab>>>13|Ab<<19)^(Ab>>>22|Ab<<10))+(Ab&wb^c^j)+db|0;db=Y+2024104815+r+(qb&pb^z&~qb)+((qb>>>6|qb<<26)^(qb>>>11|qb<<21)^(qb>>>25|qb<<7))|0;r=tb&Ab;Y=db+wb|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&yb^j^r)+db|0;db=ea-2067236844+z+(Y&qb^pb&~Y)+((Y>>>6|Y<<26)^(Y>>>11|Y<<21)^(Y>>>25|Y<<7))|0;z=wb&tb;ea=db+yb|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&Ab^r^z)+db|0;db=ma-1933114872+pb+(ea&Y^qb&~ea)+((ea>>>6|ea<<26)^(ea>>>11|ea<<21)^(ea>>>25|ea<<7))|0;pb=yb&wb;ma=db+Ab|0;Ab=((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+(yb&tb^z^pb)+db|0;db=Za-1866530822+qb+(ma&ea^Y&~ma)+((ma>>>6|ma<<26)^(ma>>>11|ma<<21)^(ma>>>25|ma<<7))|0;qb=Ab&yb;z=db+tb|0;tb=((Ab>>>2|Ab<<30)^(Ab>>>13|Ab<<19)^(Ab>>>22|Ab<<10))+(Ab&wb^pb^qb)+db|0;db=ab-1538233109+Y+(z&ma^ea&~z)+((z>>>6|z<<26)^(z>>>11|z<<21)^(z>>>25|z<<7))|0;Y=tb&Ab;pb=db+wb|0;wb=((tb>>>2|tb<<30)^(tb>>>13|tb<<19)^(tb>>>22|tb<<10))+(tb&yb^qb^Y)+db|0;db=gb-1090935817+((jb>>>18|jb<<14)^jb>>>3^(jb>>>7|jb<<25))+I+((Za>>>19|Za<<13)^Za>>>10^(Za>>>17|Za<<15))+ea+(pb&z^ma&~pb)+((pb>>>6|pb<<26)^(pb>>>11|pb<<21)^(pb>>>25|pb<<7))|0;ea=wb&tb;Za=db+yb|0;yb=((wb>>>2|wb<<30)^(wb>>>13|wb<<19)^(wb>>>22|wb<<10))+(wb&Ab^Y^ea)+db|0;db=jb-965641998+((mb>>>18|mb<<14)^mb>>>3^(mb>>>7|mb<<25))+Q+((ab>>>19|ab<<13)^ab>>>10^(ab>>>17|ab<<15))+ma+(Za&pb^z&~Za)+((Za>>>6|Za<<26)^(Za>>>11|Za<<21)^(Za>>>25|Za<<7))|0;Bb=(yb&(wb^tb)^ea)+u+((yb>>>2|yb<<30)^(yb>>>13|yb<<19)^(yb>>>22|yb<<10))+db|0;Cb=yb+C|0;Db=wb+L|0;Eb=tb+T|0;Fb=Ab+$+db|0;Gb=Za+ha|0;Hb=pb+pa|0;Ib=z+qa|0;z=Nh(f,m,-64,-1)|0;pb=E;Za=0;if(pb>>>0>Za>>>0|pb>>>0==Za>>>0&z>>>0>63>>>0){qa=Ib;pa=Hb;ha=Gb;$=Fb;T=Eb;L=Db;C=Cb;u=Bb;m=pb;f=z;e=e+64|0}else{break}}ra=Ib>>>24&255;sa=Ib>>>16&255;ta=Ib>>>8&255;ua=Ib&255;va=Hb>>>24&255;wa=Hb>>>16&255;xa=Hb>>>8&255;ya=Hb&255;za=Gb>>>24&255;Aa=Gb>>>16&255;Ba=Gb>>>8&255;Ca=Gb&255;Da=Fb>>>24&255;Ea=Fb>>>16&255;Fa=Fb>>>8&255;Ga=Fb&255;Ha=Eb>>>24&255;Ia=Eb>>>16&255;Ja=Eb>>>8&255;Ka=Eb&255;La=Db>>>24&255;Ma=Db>>>16&255;Na=Db>>>8&255;Oa=Db&255;Pa=Cb>>>24&255;Qa=Cb>>>16&255;Ra=Cb>>>8&255;Sa=Cb&255;Ta=Bb>>>24&255;Ua=Bb>>>16&255;Va=Bb>>>8&255;Wa=Bb&255;a[g]=Wa;a[i]=Va;a[k]=Ua;a[b]=Ta;a[o]=Sa;a[q]=Ra;a[s]=Qa;a[n]=Pa;a[w]=Oa;a[y]=Na;a[A]=Ma;a[v]=La;a[F]=Ka;a[H]=Ja;a[J]=Ia;a[D]=Ha;a[N]=Ga;a[P]=Fa;a[R]=Ea;a[M]=Da;a[V]=Ca;a[X]=Ba;a[Z]=Aa;a[U]=za;a[ba]=ya;a[da]=xa;a[fa]=wa;a[aa]=va;a[ja]=ua;a[la]=ta;a[na]=sa;a[ia]=ra;return 0}function bh(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;f=i;i=i+32|0;g=f|0;h=g|0;j=i;i=i+128|0;Kh(h|0,360,32)|0;k=d<<3|0>>>29;l=g|0;ah(l,c,d,e)|0;g=d&63;m=e&0;n=g;do{if((g|0)==0&(m|0)==0){a[j+n|0]=-128;o=Nh(g,m,1,0)|0;p=E;q=o}else{o=d&63;Kh(j|0,c+(d-o)|0,o)|0;a[j+n|0]=-128;o=0;r=Nh(g,m,1,0)|0;s=E;if(m>>>0<o>>>0|m>>>0==o>>>0&g>>>0<56>>>0){p=s;q=r;break}o=0;if(s>>>0<o>>>0|s>>>0==o>>>0&r>>>0<120>>>0){r=d&63;Jh(j+(r+1)|0,0,119-r|0)|0}a[j+120|0]=e>>>21|0<<11;a[j+121|0]=e>>>13|0<<19;a[j+122|0]=e>>>5|0<<27;a[j+123|0]=d>>>29|e<<3;a[j+124|0]=d>>>21|e<<11;a[j+125|0]=d>>>13|e<<19;a[j+126|0]=d>>>5|e<<27;a[j+127|0]=k;ah(l,j|0,128,0)|0;Kh(b|0,h|0,32)|0;i=f;return 0}}while(0);g=0;if(p>>>0<g>>>0|p>>>0==g>>>0&q>>>0<56>>>0){q=d&63;Jh(j+(q+1)|0,0,55-q|0)|0}a[j+56|0]=e>>>21|0<<11;a[j+57|0]=e>>>13|0<<19;a[j+58|0]=e>>>5|0<<27;a[j+59|0]=d>>>29|e<<3;a[j+60|0]=d>>>21|e<<11;a[j+61|0]=d>>>13|e<<19;a[j+62|0]=d>>>5|e<<27;a[j+63|0]=k;ah(l,j|0,64,0)|0;Kh(b|0,h|0,32)|0;i=f;return 0}function ch(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+32|0;g=f|0;Xg(g,d,e,80)|0;e=fh(a,b,c,d+16|0,g)|0;i=f;return e|0}function dh(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;i=i+32|0;h=g|0;Xg(h,e,f,64)|0;f=eh(a,b,c,d,e+16|0,h)|0;i=g;return f|0}function eh(b,e,f,g,h,j){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;k=i;i=i+16|0;l=k|0;m=l;n=i;i=i+64|0;if((f|0)==0&(g|0)==0){i=k;return 0}o=l|0;p=h;h=p|0;q=p+4|0;p=d[q]|d[q+1|0]<<8|d[q+2|0]<<16|d[q+3|0]<<24|0;c[o>>2]=d[h]|d[h+1|0]<<8|d[h+2|0]<<16|d[h+3|0]<<24;c[o+4>>2]=p;p=l+8|0;o=p;c[p>>2]=0;c[p+4>>2]=0;p=0;do{if(g>>>0>p>>>0|g>>>0==p>>>0&f>>>0>63>>>0){h=n|0;q=l;r=e;s=g;t=f;u=b;do{Wg(h,q,j,48)|0;v=0;w=0;do{x=w;a[u+x|0]=a[n+x|0]^a[r+x|0];w=Nh(w,v,1,0)|0;v=E;x=0;}while(v>>>0<x>>>0|v>>>0==x>>>0&w>>>0<64>>>0);w=(d[o]|0)+1|0;a[o]=w;v=m+9|0;x=(d[v]|0)+(w>>>8)|0;a[v]=x;v=m+10|0;w=(d[v]|0)+(x>>>8)|0;a[v]=w;v=m+11|0;x=(d[v]|0)+(w>>>8)|0;a[v]=x;v=m+12|0;w=(d[v]|0)+(x>>>8)|0;a[v]=w;v=m+13|0;x=(d[v]|0)+(w>>>8)|0;a[v]=x;v=m+14|0;w=(d[v]|0)+(x>>>8)|0;a[v]=w;v=m+15|0;a[v]=(d[v]|0)+(w>>>8);t=Nh(t,s,-64,-1)|0;s=E;u=u+64|0;r=r+64|0;w=0;}while(s>>>0>w>>>0|s>>>0==w>>>0&t>>>0>63>>>0);if(!((t|0)==0&(s|0)==0)){y=u;z=s;A=t;B=r;break}i=k;return 0}else{y=b;z=g;A=f;B=e}}while(0);Wg(n|0,l,j,48)|0;j=0;l=0;do{e=l;a[y+e|0]=a[n+e|0]^a[B+e|0];l=Nh(l,j,1,0)|0;j=E;}while(j>>>0<z>>>0|j>>>0==z>>>0&l>>>0<A>>>0);i=k;return 0}function fh(b,e,f,g,h){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;j=i;i=i+16|0;k=j|0;l=k;m=i;i=i+64|0;if((e|0)==0&(f|0)==0){i=j;return 0}n=k|0;o=g;g=o|0;p=o+4|0;o=d[p]|d[p+1|0]<<8|d[p+2|0]<<16|d[p+3|0]<<24|0;c[n>>2]=d[g]|d[g+1|0]<<8|d[g+2|0]<<16|d[g+3|0]<<24;c[n+4>>2]=o;o=k+8|0;n=o;c[o>>2]=0;c[o+4>>2]=0;o=0;do{if(f>>>0>o>>>0|f>>>0==o>>>0&e>>>0>63>>>0){g=k;p=f;q=e;r=b;do{Wg(r,g,h,32)|0;s=(d[n]|0)+1|0;a[n]=s;t=l+9|0;u=(d[t]|0)+(s>>>8)|0;a[t]=u;t=l+10|0;s=(d[t]|0)+(u>>>8)|0;a[t]=s;t=l+11|0;u=(d[t]|0)+(s>>>8)|0;a[t]=u;t=l+12|0;s=(d[t]|0)+(u>>>8)|0;a[t]=s;t=l+13|0;u=(d[t]|0)+(s>>>8)|0;a[t]=u;t=l+14|0;s=(d[t]|0)+(u>>>8)|0;a[t]=s;t=l+15|0;a[t]=(d[t]|0)+(s>>>8);q=Nh(q,p,-64,-1)|0;p=E;r=r+64|0;s=0;}while(p>>>0>s>>>0|p>>>0==s>>>0&q>>>0>63>>>0);if(!((q|0)==0&(p|0)==0)){v=r;w=p;x=q;break}i=j;return 0}else{v=b;w=f;x=e}}while(0);Wg(m|0,k,h,32)|0;h=0;k=0;do{e=k;a[v+e|0]=a[m+e|0]|0;k=Nh(k,h,1,0)|0;h=E;}while(h>>>0<w>>>0|h>>>0==w>>>0&k>>>0<x>>>0);i=j;return 0}function gh(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0,Ha=0,Ia=0,Ja=0,Ka=0,La=0,Ma=0,Na=0,Oa=0,Pa=0,Qa=0,Ra=0,Sa=0,Ta=0,Ua=0,Va=0,Wa=0,Xa=0,Ya=0,Za=0,_a=0,$a=0,ab=0,bb=0;g=i;i=i+4512|0;h=g|0;j=g+128|0;k=g+256|0;l=g+384|0;m=g+512|0;n=g+640|0;o=g+768|0;p=g+1024|0;q=g+1280|0;r=g+1536|0;s=g+1792|0;t=g+2048|0;u=g+2304|0;v=g+2560|0;w=g+2816|0;x=g+3072|0;y=g+3328|0;z=g+3584|0;A=g+3712|0;B=g+3840|0;C=g+3968|0;D=g+4096|0;E=g+4480|0;Kh(E|0,e|0,32)|0;e=E|0;a[e]=a[e]&-8;e=E+31|0;a[e]=a[e]&63|64;e=0;do{c[D+(e<<2)>>2]=d[f+e|0]|0;e=e+1|0;}while(e>>>0<32>>>0);e=p;f=z;F=D;Kh(o|0,F|0,128)|0;c[o+128>>2]=1;Jh(o+132|0,0,124)|0;c[p>>2]=1;Jh(p+4|0,0,252)|0;G=u|0;H=q+124|0;I=q+252|0;J=u+124|0;K=u+128|0;L=u+252|0;M=r+124|0;N=r+252|0;O=v+124|0;P=v+252|0;Q=w|0;R=w+128|0;S=x+124|0;T=x+252|0;U=y|0;V=y+124|0;W=y+128|0;X=y+252|0;Y=z|0;Z=w+124|0;_=w+252|0;$=A+124|0;ba=B|0;ca=B+124|0;da=C+124|0;ea=s+124|0;fa=s+252|0;ga=t|0;ha=t+252|0;ia=254;while(1){ja=((d[E+((ia|0)/8|0)|0]|0)>>>((ia&7)>>>0)&1)-1|0;ka=0;while(1){la=c[p+(ka<<2)>>2]|0;ma=c[o+(ka<<2)>>2]|0;na=(ma^la)&ja;c[q+(ka<<2)>>2]=na^ma;c[r+(ka<<2)>>2]=na^la;la=ka+1|0;if(la>>>0<64>>>0){ka=la}else{oa=0;pa=0;break}}do{ka=(c[q+(oa<<2)>>2]|0)+pa+(c[q+(oa+32<<2)>>2]|0)|0;c[u+(oa<<2)>>2]=ka&255;pa=ka>>>8;oa=oa+1|0;}while(oa>>>0<31>>>0);ka=c[H>>2]|0;la=c[I>>2]|0;c[J>>2]=ka+pa+la;na=0;ma=218;do{qa=na+32|0;ra=ma+65280+(c[q+(na<<2)>>2]|0)-(c[q+(qa<<2)>>2]|0)|0;c[u+(qa<<2)>>2]=ra&255;ma=ra>>>8;na=na+1|0;}while(na>>>0<31>>>0);c[L>>2]=ka-la+ma;na=0;ra=0;do{qa=(c[r+(na<<2)>>2]|0)+ra+(c[r+(na+32<<2)>>2]|0)|0;c[v+(na<<2)>>2]=qa&255;ra=qa>>>8;na=na+1|0;}while(na>>>0<31>>>0);na=c[M>>2]|0;ma=c[N>>2]|0;c[O>>2]=na+ra+ma;la=0;ka=218;do{qa=la+32|0;sa=ka+65280+(c[r+(la<<2)>>2]|0)-(c[r+(qa<<2)>>2]|0)|0;c[v+(qa<<2)>>2]=sa&255;ka=sa>>>8;la=la+1|0;}while(la>>>0<31>>>0);c[P>>2]=na-ma+ka;ih(Q,G);ih(R,K);la=0;while(1){ra=la+32|0;sa=0;ta=0;do{ta=(aa(c[u+(ra-sa<<2)>>2]|0,c[v+(sa<<2)>>2]|0)|0)+ta|0;sa=sa+1|0;}while(sa>>>0<=la>>>0);sa=la+1|0;if(sa>>>0>=32>>>0){break}ra=la+64|0;qa=sa;ua=ta;do{ua=(aa((c[v+(qa<<2)>>2]|0)*38|0,c[u+(ra-qa<<2)>>2]|0)|0)+ua|0;qa=qa+1|0;}while(qa>>>0<32>>>0);c[x+(la<<2)>>2]=ua;la=sa}c[x+(la<<2)>>2]=ta;ka=0;ma=0;do{na=x+(ka<<2)|0;qa=(c[na>>2]|0)+ma|0;c[na>>2]=qa&255;ma=qa>>>8;ka=ka+1|0;}while(ka>>>0<31>>>0);ka=(c[S>>2]|0)+ma|0;c[S>>2]=ka&127;la=0;qa=(ka>>>7)*19|0;do{ka=x+(la<<2)|0;na=(c[ka>>2]|0)+qa|0;c[ka>>2]=na&255;qa=na>>>8;la=la+1|0;}while(la>>>0<31>>>0);c[S>>2]=(c[S>>2]|0)+qa;la=0;while(1){ma=0;va=0;do{va=(aa(c[u+(la-ma<<2)>>2]|0,c[v+(ma+32<<2)>>2]|0)|0)+va|0;ma=ma+1|0;}while(ma>>>0<=la>>>0);ma=la+1|0;wa=la+32|0;if(ma>>>0<32>>>0){xa=ma;ya=va}else{break}do{ya=(aa((c[v+(xa+32<<2)>>2]|0)*38|0,c[u+(wa-xa<<2)>>2]|0)|0)+ya|0;xa=xa+1|0;}while(xa>>>0<32>>>0);c[x+(wa<<2)>>2]=ya;la=ma}c[x+(wa<<2)>>2]=va;la=0;qa=0;do{sa=x+(la+32<<2)|0;ua=(c[sa>>2]|0)+qa|0;c[sa>>2]=ua&255;qa=ua>>>8;la=la+1|0;}while(la>>>0<31>>>0);la=(c[T>>2]|0)+qa|0;c[T>>2]=la&127;ua=0;sa=(la>>>7)*19|0;do{la=x+(ua+32<<2)|0;na=(c[la>>2]|0)+sa|0;c[la>>2]=na&255;sa=na>>>8;ua=ua+1|0;}while(ua>>>0<31>>>0);ua=(c[T>>2]|0)+sa|0;c[T>>2]=ua;qa=0;na=0;do{la=(c[x+(qa<<2)>>2]|0)+na+(c[x+(qa+32<<2)>>2]|0)|0;c[y+(qa<<2)>>2]=la&255;na=la>>>8;qa=qa+1|0;}while(qa>>>0<31>>>0);qa=c[S>>2]|0;c[V>>2]=na+ua+qa;sa=0;la=218;do{ka=sa+32|0;ra=la+65280+(c[x+(sa<<2)>>2]|0)-(c[x+(ka<<2)>>2]|0)|0;c[y+(ka<<2)>>2]=ra&255;la=ra>>>8;sa=sa+1|0;}while(sa>>>0<31>>>0);c[X>>2]=qa-ua+la;ih(Y,W);sa=0;na=218;do{ra=na+65280+(c[w+(sa<<2)>>2]|0)-(c[w+(sa+32<<2)>>2]|0)|0;c[A+(sa<<2)>>2]=ra&255;na=ra>>>8;sa=sa+1|0;}while(sa>>>0<31>>>0);sa=c[Z>>2]|0;la=sa+na-(c[_>>2]|0)|0;c[$>>2]=la;ua=0;qa=0;do{ra=((c[A+(ua<<2)>>2]|0)*121665|0)+qa|0;c[B+(ua<<2)>>2]=ra&255;qa=ra>>>8;ua=ua+1|0;}while(ua>>>0<31>>>0);ua=qa+(la*121665|0)|0;c[ca>>2]=ua&127;na=0;ra=ba;ka=(c[ba>>2]|0)+((ua>>>7)*19|0)|0;do{c[ra>>2]=ka&255;na=na+1|0;ra=B+(na<<2)|0;ka=(c[ra>>2]|0)+(ka>>>8)|0}while(na>>>0<31>>>0);c[ca>>2]=ka;na=0;ra=0;do{la=(c[B+(na<<2)>>2]|0)+ra+(c[w+(na<<2)>>2]|0)|0;c[C+(na<<2)>>2]=la&255;ra=la>>>8;na=na+1|0;}while(na>>>0<31>>>0);c[da>>2]=ka+sa+ra;na=0;while(1){la=na+32|0;qa=0;za=0;do{za=(aa(c[w+(la-qa<<2)>>2]|0,c[w+(qa<<2)>>2]|0)|0)+za|0;qa=qa+1|0;}while(qa>>>0<=na>>>0);qa=na+1|0;if(qa>>>0>=32>>>0){break}la=na+64|0;ma=qa;ua=za;do{ua=(aa((c[w+(ma<<2)>>2]|0)*38|0,c[w+(la-ma<<2)>>2]|0)|0)+ua|0;ma=ma+1|0;}while(ma>>>0<32>>>0);c[s+(na<<2)>>2]=ua;na=qa}c[s+(na<<2)>>2]=za;ra=0;sa=0;do{ka=s+(ra<<2)|0;ma=(c[ka>>2]|0)+sa|0;c[ka>>2]=ma&255;sa=ma>>>8;ra=ra+1|0;}while(ra>>>0<31>>>0);ra=(c[ea>>2]|0)+sa|0;c[ea>>2]=ra&127;na=0;ma=(ra>>>7)*19|0;do{ra=s+(na<<2)|0;ka=(c[ra>>2]|0)+ma|0;c[ra>>2]=ka&255;ma=ka>>>8;na=na+1|0;}while(na>>>0<31>>>0);c[ea>>2]=(c[ea>>2]|0)+ma;na=0;while(1){sa=0;Aa=0;do{Aa=(aa(c[C+(na-sa<<2)>>2]|0,c[A+(sa<<2)>>2]|0)|0)+Aa|0;sa=sa+1|0;}while(sa>>>0<=na>>>0);sa=na+1|0;Ba=na+32|0;if(sa>>>0<32>>>0){Ca=sa;Da=Aa}else{break}do{Da=(aa((c[A+(Ca<<2)>>2]|0)*38|0,c[C+(Ba-Ca<<2)>>2]|0)|0)+Da|0;Ca=Ca+1|0;}while(Ca>>>0<32>>>0);c[s+(Ba<<2)>>2]=Da;na=sa}c[s+(Ba<<2)>>2]=Aa;na=0;ma=0;do{qa=s+(na+32<<2)|0;ua=(c[qa>>2]|0)+ma|0;c[qa>>2]=ua&255;ma=ua>>>8;na=na+1|0;}while(na>>>0<31>>>0);na=(c[fa>>2]|0)+ma|0;c[fa>>2]=na&127;ua=0;qa=(na>>>7)*19|0;do{na=s+(ua+32<<2)|0;ka=(c[na>>2]|0)+qa|0;c[na>>2]=ka&255;qa=ka>>>8;ua=ua+1|0;}while(ua>>>0<31>>>0);c[fa>>2]=(c[fa>>2]|0)+qa;ih(ga,U);ua=0;while(1){ma=0;Ea=0;do{Ea=(aa(c[D+(ua-ma<<2)>>2]|0,c[z+(ma<<2)>>2]|0)|0)+Ea|0;ma=ma+1|0;}while(ma>>>0<=ua>>>0);ma=ua+1|0;Fa=ua+32|0;if(ma>>>0<32>>>0){Ga=ma;Ha=Ea}else{break}do{Ha=(aa((c[z+(Ga<<2)>>2]|0)*38|0,c[D+(Fa-Ga<<2)>>2]|0)|0)+Ha|0;Ga=Ga+1|0;}while(Ga>>>0<32>>>0);c[t+(Fa<<2)>>2]=Ha;ua=ma}c[t+(Fa<<2)>>2]=Ea;ua=0;qa=0;do{sa=t+(ua+32<<2)|0;ka=(c[sa>>2]|0)+qa|0;c[sa>>2]=ka&255;qa=ka>>>8;ua=ua+1|0;}while(ua>>>0<31>>>0);ua=(c[ha>>2]|0)+qa|0;c[ha>>2]=ua&127;ka=0;sa=(ua>>>7)*19|0;do{ua=t+(ka+32<<2)|0;na=(c[ua>>2]|0)+sa|0;c[ua>>2]=na&255;sa=na>>>8;ka=ka+1|0;}while(ka>>>0<31>>>0);c[ha>>2]=(c[ha>>2]|0)+sa;ka=0;do{qa=c[s+(ka<<2)>>2]|0;na=c[t+(ka<<2)>>2]|0;ua=(na^qa)&ja;c[p+(ka<<2)>>2]=ua^na;c[o+(ka<<2)>>2]=ua^qa;ka=ka+1|0;}while(ka>>>0<64>>>0);if((ia|0)>0){ia=ia-1|0}else{break}}Kh(F|0,e|0,256)|0;ih(Y,D+128|0);e=n|0;ih(e,Y);Y=m|0;ih(Y,e);F=0;while(1){ia=F+32|0;o=0;Ia=0;do{Ia=(aa(c[D+(ia-o<<2)>>2]|0,c[m+(o<<2)>>2]|0)|0)+Ia|0;o=o+1|0;}while(o>>>0<=F>>>0);o=F+1|0;if(o>>>0>=32>>>0){break}ia=F+64|0;p=o;t=Ia;do{t=(aa((c[m+(p<<2)>>2]|0)*38|0,c[D+(ia-p<<2)>>2]|0)|0)+t|0;p=p+1|0;}while(p>>>0<32>>>0);c[A+(F<<2)>>2]=t;F=o}c[A+(F<<2)>>2]=Ia;Ia=0;F=0;do{p=A+(Ia<<2)|0;ia=(c[p>>2]|0)+F|0;c[p>>2]=ia&255;F=ia>>>8;Ia=Ia+1|0;}while(Ia>>>0<31>>>0);Ia=(c[$>>2]|0)+F|0;c[$>>2]=Ia&127;F=0;ia=(Ia>>>7)*19|0;do{Ia=A+(F<<2)|0;p=(c[Ia>>2]|0)+ia|0;c[Ia>>2]=p&255;ia=p>>>8;F=F+1|0;}while(F>>>0<31>>>0);c[$>>2]=(c[$>>2]|0)+ia;ia=0;while(1){$=0;Ja=0;do{Ja=(aa(c[z+(ia-$<<2)>>2]|0,c[A+($<<2)>>2]|0)|0)+Ja|0;$=$+1|0;}while($>>>0<=ia>>>0);$=ia+1|0;if($>>>0>=32>>>0){break}o=ia+32|0;t=$;F=Ja;do{F=(aa((c[A+(t<<2)>>2]|0)*38|0,c[z+(o-t<<2)>>2]|0)|0)+F|0;t=t+1|0;}while(t>>>0<32>>>0);c[B+(ia<<2)>>2]=F;ia=$}c[B+(ia<<2)>>2]=Ja;Ja=0;ia=0;do{t=B+(Ja<<2)|0;o=(c[t>>2]|0)+ia|0;c[t>>2]=o&255;ia=o>>>8;Ja=Ja+1|0;}while(Ja>>>0<31>>>0);Ja=(c[ca>>2]|0)+ia|0;c[ca>>2]=Ja&127;ia=0;o=(Ja>>>7)*19|0;do{Ja=B+(ia<<2)|0;t=(c[Ja>>2]|0)+o|0;c[Ja>>2]=t&255;o=t>>>8;ia=ia+1|0;}while(ia>>>0<31>>>0);c[ca>>2]=(c[ca>>2]|0)+o;ih(Y,ba);ba=0;while(1){o=0;Ka=0;do{Ka=(aa(c[A+(ba-o<<2)>>2]|0,c[m+(o<<2)>>2]|0)|0)+Ka|0;o=o+1|0;}while(o>>>0<=ba>>>0);o=ba+1|0;if(o>>>0>=32>>>0){break}$=ba+32|0;F=o;ca=Ka;do{ca=(aa((c[m+(F<<2)>>2]|0)*38|0,c[A+($-F<<2)>>2]|0)|0)+ca|0;F=F+1|0;}while(F>>>0<32>>>0);c[C+(ba<<2)>>2]=ca;ba=o}A=C|0;c[C+(ba<<2)>>2]=Ka;Ka=0;ba=0;do{F=C+(Ka<<2)|0;$=(c[F>>2]|0)+ba|0;c[F>>2]=$&255;ba=$>>>8;Ka=Ka+1|0;}while(Ka>>>0<31>>>0);Ka=(c[da>>2]|0)+ba|0;c[da>>2]=Ka&127;ba=0;$=(Ka>>>7)*19|0;do{Ka=C+(ba<<2)|0;F=(c[Ka>>2]|0)+$|0;c[Ka>>2]=F&255;$=F>>>8;ba=ba+1|0;}while(ba>>>0<31>>>0);c[da>>2]=(c[da>>2]|0)+$;ih(Y,A);ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);A=0;while(1){$=0;La=0;do{La=(aa(c[C+(A-$<<2)>>2]|0,c[m+($<<2)>>2]|0)|0)+La|0;$=$+1|0;}while($>>>0<=A>>>0);$=A+1|0;if($>>>0>=32>>>0){break}o=A+32|0;ca=$;da=La;do{da=(aa((c[m+(ca<<2)>>2]|0)*38|0,c[C+(o-ca<<2)>>2]|0)|0)+da|0;ca=ca+1|0;}while(ca>>>0<32>>>0);c[h+(A<<2)>>2]=da;A=$}C=h|0;c[h+(A<<2)>>2]=La;La=0;A=0;do{ca=h+(La<<2)|0;o=(c[ca>>2]|0)+A|0;c[ca>>2]=o&255;A=o>>>8;La=La+1|0;}while(La>>>0<31>>>0);La=h+124|0;o=(c[La>>2]|0)+A|0;c[La>>2]=o&127;A=0;ca=(o>>>7)*19|0;do{o=h+(A<<2)|0;ba=(c[o>>2]|0)+ca|0;c[o>>2]=ba&255;ca=ba>>>8;A=A+1|0;}while(A>>>0<31>>>0);c[La>>2]=(c[La>>2]|0)+ca;ih(Y,C);ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);ih(e,Y);C=0;while(1){ca=0;Ma=0;do{Ma=(aa(c[h+(C-ca<<2)>>2]|0,c[n+(ca<<2)>>2]|0)|0)+Ma|0;ca=ca+1|0;}while(ca>>>0<=C>>>0);ca=C+1|0;if(ca>>>0>=32>>>0){break}$=C+32|0;da=ca;La=Ma;do{La=(aa((c[n+(da<<2)>>2]|0)*38|0,c[h+($-da<<2)>>2]|0)|0)+La|0;da=da+1|0;}while(da>>>0<32>>>0);c[j+(C<<2)>>2]=La;C=ca}da=j|0;c[j+(C<<2)>>2]=Ma;Ma=0;C=0;do{$=j+(Ma<<2)|0;A=(c[$>>2]|0)+C|0;c[$>>2]=A&255;C=A>>>8;Ma=Ma+1|0;}while(Ma>>>0<31>>>0);Ma=j+124|0;A=(c[Ma>>2]|0)+C|0;c[Ma>>2]=A&127;C=0;$=(A>>>7)*19|0;do{A=j+(C<<2)|0;ba=(c[A>>2]|0)+$|0;c[A>>2]=ba&255;$=ba>>>8;C=C+1|0;}while(C>>>0<31>>>0);c[Ma>>2]=(c[Ma>>2]|0)+$;ih(Y,da);ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);ih(e,Y);da=0;while(1){$=0;Na=0;do{Na=(aa(c[j+(da-$<<2)>>2]|0,c[n+($<<2)>>2]|0)|0)+Na|0;$=$+1|0;}while($>>>0<=da>>>0);$=da+1|0;if($>>>0>=32>>>0){break}ca=da+32|0;La=$;Ma=Na;do{Ma=(aa((c[n+(La<<2)>>2]|0)*38|0,c[j+(ca-La<<2)>>2]|0)|0)+Ma|0;La=La+1|0;}while(La>>>0<32>>>0);c[m+(da<<2)>>2]=Ma;da=$}c[m+(da<<2)>>2]=Na;Na=0;da=0;do{j=m+(Na<<2)|0;La=(c[j>>2]|0)+da|0;c[j>>2]=La&255;da=La>>>8;Na=Na+1|0;}while(Na>>>0<31>>>0);Na=m+124|0;La=(c[Na>>2]|0)+da|0;c[Na>>2]=La&127;da=0;j=(La>>>7)*19|0;do{La=m+(da<<2)|0;ca=(c[La>>2]|0)+j|0;c[La>>2]=ca&255;j=ca>>>8;da=da+1|0;}while(da>>>0<31>>>0);c[Na>>2]=(c[Na>>2]|0)+j;ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);j=0;while(1){da=0;Oa=0;do{Oa=(aa(c[h+(j-da<<2)>>2]|0,c[m+(da<<2)>>2]|0)|0)+Oa|0;da=da+1|0;}while(da>>>0<=j>>>0);da=j+1|0;if(da>>>0>=32>>>0){break}$=j+32|0;Ma=da;ca=Oa;do{ca=(aa((c[m+(Ma<<2)>>2]|0)*38|0,c[h+($-Ma<<2)>>2]|0)|0)+ca|0;Ma=Ma+1|0;}while(Ma>>>0<32>>>0);c[k+(j<<2)>>2]=ca;j=da}h=k|0;c[k+(j<<2)>>2]=Oa;Oa=0;j=0;do{Ma=k+(Oa<<2)|0;$=(c[Ma>>2]|0)+j|0;c[Ma>>2]=$&255;j=$>>>8;Oa=Oa+1|0;}while(Oa>>>0<31>>>0);Oa=k+124|0;$=(c[Oa>>2]|0)+j|0;c[Oa>>2]=$&127;j=0;Ma=($>>>7)*19|0;do{$=k+(j<<2)|0;La=(c[$>>2]|0)+Ma|0;c[$>>2]=La&255;Ma=La>>>8;j=j+1|0;}while(j>>>0<31>>>0);c[Oa>>2]=(c[Oa>>2]|0)+Ma;ih(Y,h);ih(e,Y);h=2;while(1){ih(Y,e);ih(e,Y);Ma=h+2|0;if((Ma|0)<50){h=Ma}else{Pa=0;break}}while(1){h=0;Qa=0;do{Qa=(aa(c[k+(Pa-h<<2)>>2]|0,c[n+(h<<2)>>2]|0)|0)+Qa|0;h=h+1|0;}while(h>>>0<=Pa>>>0);h=Pa+1|0;if(h>>>0>=32>>>0){break}da=Pa+32|0;ca=h;Ma=Qa;do{Ma=(aa((c[n+(ca<<2)>>2]|0)*38|0,c[k+(da-ca<<2)>>2]|0)|0)+Ma|0;ca=ca+1|0;}while(ca>>>0<32>>>0);c[l+(Pa<<2)>>2]=Ma;Pa=h}ca=l|0;c[l+(Pa<<2)>>2]=Qa;Qa=0;Pa=0;do{da=l+(Qa<<2)|0;Oa=(c[da>>2]|0)+Pa|0;c[da>>2]=Oa&255;Pa=Oa>>>8;Qa=Qa+1|0;}while(Qa>>>0<31>>>0);Qa=l+124|0;Oa=(c[Qa>>2]|0)+Pa|0;c[Qa>>2]=Oa&127;Pa=0;da=(Oa>>>7)*19|0;do{Oa=l+(Pa<<2)|0;j=(c[Oa>>2]|0)+da|0;c[Oa>>2]=j&255;da=j>>>8;Pa=Pa+1|0;}while(Pa>>>0<31>>>0);c[Qa>>2]=(c[Qa>>2]|0)+da;ih(e,ca);ih(Y,e);ca=2;while(1){ih(e,Y);ih(Y,e);da=ca+2|0;if((da|0)<100){ca=da}else{Ra=0;break}}while(1){ca=0;Sa=0;do{Sa=(aa(c[l+(Ra-ca<<2)>>2]|0,c[m+(ca<<2)>>2]|0)|0)+Sa|0;ca=ca+1|0;}while(ca>>>0<=Ra>>>0);ca=Ra+1|0;if(ca>>>0>=32>>>0){break}h=Ra+32|0;Ma=ca;da=Sa;do{da=(aa((c[m+(Ma<<2)>>2]|0)*38|0,c[l+(h-Ma<<2)>>2]|0)|0)+da|0;Ma=Ma+1|0;}while(Ma>>>0<32>>>0);c[n+(Ra<<2)>>2]=da;Ra=ca}c[n+(Ra<<2)>>2]=Sa;Sa=0;Ra=0;do{l=n+(Sa<<2)|0;Ma=(c[l>>2]|0)+Ra|0;c[l>>2]=Ma&255;Ra=Ma>>>8;Sa=Sa+1|0;}while(Sa>>>0<31>>>0);Sa=n+124|0;Ma=(c[Sa>>2]|0)+Ra|0;c[Sa>>2]=Ma&127;Ra=0;l=(Ma>>>7)*19|0;do{Ma=n+(Ra<<2)|0;h=(c[Ma>>2]|0)+l|0;c[Ma>>2]=h&255;l=h>>>8;Ra=Ra+1|0;}while(Ra>>>0<31>>>0);c[Sa>>2]=(c[Sa>>2]|0)+l;ih(Y,e);ih(e,Y);l=2;while(1){ih(Y,e);ih(e,Y);Sa=l+2|0;if((Sa|0)<50){l=Sa}else{Ta=0;break}}while(1){l=0;Ua=0;do{Ua=(aa(c[k+(Ta-l<<2)>>2]|0,c[n+(l<<2)>>2]|0)|0)+Ua|0;l=l+1|0;}while(l>>>0<=Ta>>>0);l=Ta+1|0;if(l>>>0>=32>>>0){break}ca=Ta+32|0;da=l;Sa=Ua;do{Sa=(aa((c[n+(da<<2)>>2]|0)*38|0,c[k+(ca-da<<2)>>2]|0)|0)+Sa|0;da=da+1|0;}while(da>>>0<32>>>0);c[m+(Ta<<2)>>2]=Sa;Ta=l}c[m+(Ta<<2)>>2]=Ua;Ua=0;Ta=0;do{k=m+(Ua<<2)|0;da=(c[k>>2]|0)+Ta|0;c[k>>2]=da&255;Ta=da>>>8;Ua=Ua+1|0;}while(Ua>>>0<31>>>0);Ua=(c[Na>>2]|0)+Ta|0;c[Na>>2]=Ua&127;Ta=0;da=(Ua>>>7)*19|0;do{Ua=m+(Ta<<2)|0;k=(c[Ua>>2]|0)+da|0;c[Ua>>2]=k&255;da=k>>>8;Ta=Ta+1|0;}while(Ta>>>0<31>>>0);c[Na>>2]=(c[Na>>2]|0)+da;ih(e,Y);ih(Y,e);ih(e,Y);ih(Y,e);ih(e,Y);Y=0;while(1){e=0;Va=0;do{Va=(aa(c[B+(Y-e<<2)>>2]|0,c[n+(e<<2)>>2]|0)|0)+Va|0;e=e+1|0;}while(e>>>0<=Y>>>0);e=Y+1|0;Wa=Y+32|0;if(e>>>0<32>>>0){Xa=e;Ya=Va}else{break}do{Ya=(aa((c[n+(Xa<<2)>>2]|0)*38|0,c[B+(Wa-Xa<<2)>>2]|0)|0)+Ya|0;Xa=Xa+1|0;}while(Xa>>>0<32>>>0);c[D+(Wa<<2)>>2]=Ya;Y=e}c[D+(Wa<<2)>>2]=Va;Va=0;Wa=0;do{Y=D+(Va+32<<2)|0;Ya=(c[Y>>2]|0)+Wa|0;c[Y>>2]=Ya&255;Wa=Ya>>>8;Va=Va+1|0;}while(Va>>>0<31>>>0);Va=D+252|0;Ya=(c[Va>>2]|0)+Wa|0;c[Va>>2]=Ya&127;Wa=0;Y=(Ya>>>7)*19|0;do{Ya=D+(Wa+32<<2)|0;Xa=(c[Ya>>2]|0)+Y|0;c[Ya>>2]=Xa&255;Y=Xa>>>8;Wa=Wa+1|0;}while(Wa>>>0<31>>>0);c[Va>>2]=(c[Va>>2]|0)+Y;Y=D+256|0;Va=0;while(1){Wa=Va+32|0;Xa=0;Za=0;do{Za=(aa(c[D+(Wa-Xa<<2)>>2]|0,c[D+(Xa<<2)>>2]|0)|0)+Za|0;Xa=Xa+1|0;}while(Xa>>>0<=Va>>>0);Xa=Va+1|0;_a=Va+64|0;if(Xa>>>0<32>>>0){$a=Xa;ab=Za}else{break}do{ab=(aa((c[D+($a<<2)>>2]|0)*38|0,c[D+(_a-$a<<2)>>2]|0)|0)+ab|0;$a=$a+1|0;}while($a>>>0<32>>>0);c[D+(_a<<2)>>2]=ab;Va=Xa}c[D+(_a<<2)>>2]=Za;Za=0;_a=0;do{Va=D+(Za+64<<2)|0;ab=(c[Va>>2]|0)+_a|0;c[Va>>2]=ab&255;_a=ab>>>8;Za=Za+1|0;}while(Za>>>0<31>>>0);Za=D+380|0;ab=(c[Za>>2]|0)+_a|0;c[Za>>2]=ab&127;_a=0;Va=(ab>>>7)*19|0;do{ab=D+(_a+64<<2)|0;$a=(c[ab>>2]|0)+Va|0;c[ab>>2]=$a&255;Va=$a>>>8;_a=_a+1|0;}while(_a>>>0<31>>>0);c[Za>>2]=(c[Za>>2]|0)+Va;Kh(f|0,Y|0,128)|0;Y=0;f=0;do{Va=D+(Y+64<<2)|0;_a=(c[Va>>2]|0)+f+(c[160+(Y<<2)>>2]|0)|0;c[Va>>2]=_a&255;f=_a>>>8;Y=Y+1|0;}while(Y>>>0<31>>>0);Y=f+128+(c[Za>>2]|0)|0;c[Za>>2]=Y;Za=-(Y>>>7&1)|0;Y=0;while(1){f=D+(Y+64<<2)|0;_a=c[f>>2]|0;c[f>>2]=(_a^c[z+(Y<<2)>>2])&Za^_a;_a=Y+1|0;if(_a>>>0<32>>>0){Y=_a}else{bb=0;break}}do{a[b+bb|0]=c[D+(bb+64<<2)>>2];bb=bb+1|0;}while(bb>>>0<32>>>0);i=g;return 0}function hh(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;b=0;d=0;do{e=a+(b<<2)|0;f=(c[e>>2]|0)+d|0;c[e>>2]=f&255;d=f>>>8;b=b+1|0;}while(b>>>0<31>>>0);b=a+124|0;f=(c[b>>2]|0)+d|0;c[b>>2]=f&127;d=0;e=(f>>>7)*19|0;do{f=a+(d<<2)|0;g=(c[f>>2]|0)+e|0;c[f>>2]=g&255;e=g>>>8;d=d+1|0;}while(d>>>0<31>>>0);c[b>>2]=(c[b>>2]|0)+e;return}function ih(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;d=0;while(1){if((d|0)==0){e=0;f=1;g=32;h=5}else{i=0;j=0;k=d;do{j=(aa(c[b+(k<<2)>>2]|0,c[b+(i<<2)>>2]|0)|0)+j|0;i=i+1|0;k=d-i|0;}while(i>>>0<k>>>0);k=d+1|0;if(k>>>0<31>>>0){e=j;f=k;g=d+32|0;h=5}else{l=j;m=k}}if((h|0)==5){h=0;k=f;i=e;n=31;while(1){o=(aa((c[b+(k<<2)>>2]|0)*38|0,c[b+(n<<2)>>2]|0)|0)+i|0;p=k+1|0;q=g+~k|0;if(p>>>0<q>>>0){k=p;i=o;n=q}else{l=o;m=f;break}}}n=l<<1;if((d&1|0)==0){i=d>>>1;k=c[b+(i<<2)>>2]|0;j=(aa(k,k)|0)+n|0;k=c[b+(i+16<<2)>>2]|0;r=j+(aa(k*38|0,k)|0)|0}else{r=n}c[a+(d<<2)>>2]=r;if(m>>>0<32>>>0){d=m}else{break}}hh(a);return}function jh(a,b){a=a|0;b=b|0;return gh(a,b,440)|0}function kh(){var b=0;do{if(a[392]|0){b=1}else{if((wg()|0)==0){b=-1;break}Og();a[392]=1;b=0}}while(0);return b|0}function lh(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;do{if(d>>>0<=4294967039>>>0){e=d+256|0;f=Dh(e)|0;if((f|0)==0){break}c[b>>2]=f;if((e|0)!=0){g=0;do{a[f+g|0]=ta()|0;g=g+1|0;}while(g>>>0<e>>>0)}e=f+(-(f+64|0)&63|64)|0;Jh(e|0,0,d|0)|0;h=e;return h|0}}while(0);c[b>>2]=0;h=0;return h|0}function mh(b,c,e,f){b=b|0;c=c|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;if(f>>>0>2147483646>>>0|f<<1>>>0>c>>>0){ub();return 0}if((f|0)==0){g=0;h=b+g|0;a[h]=0;return b|0}else{i=0;j=0}while(1){c=e+i|0;a[b+j|0]=a[16+((d[c]|0)>>>4)|0]|0;a[b+(j|1)|0]=a[16+(a[c]&15)|0]|0;c=i+1|0;if(c>>>0<f>>>0){i=c;j=j+2|0}else{break}}g=f<<1;h=b+g|0;a[h]=0;return b|0}function nh(a){a=a|0;Pa(1e3,20,1,c[o>>2]|0)|0;return}function oh(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;Pa(896,23,1,c[o>>2]|0)|0;return 0}function ph(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;La(792);return}function qh(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;fc(a,b,9872)|0;La(680);return}function rh(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;fc(a,b,9872)|0;La(568);return}function sh(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;fc(a,b,9872)|0;La(472);return}function th(){var a=0,b=0,d=0,e=0,f=0;a=i;b=uc(c[432]|0,c[430]|0)|0;d=c[o>>2]|0;Ca(d|0,1592,(e=i,i=i+8|0,c[e>>2]=b&1,e)|0)|0;i=e;f=(vc(c[430]|0,0,1e5)|0)>0&b;Ca(d|0,1576,(e=i,i=i+8|0,c[e>>2]=f,e)|0)|0;i=e;b=(wc(c[432]|0,c[430]|0)|0)&f;Ca(d|0,1520,(e=i,i=i+8|0,c[e>>2]=b,e)|0)|0;i=e;sc(c[432]|0);f=(pc(c[432]|0)|0)&b;Ca(d|0,1504,(e=i,i=i+8|0,c[e>>2]=f,e)|0)|0;i=e;i=a;return f|0}function uh(){var a=0,b=0;a=qc(0)|0;c[432]=a;if((a|0)==0){Pa(1456,42,1,c[o>>2]|0)|0;b=1;return b|0}a=Dh(tc()|0)|0;c[430]=a;if((a|0)==0){b=1;return b|0}kc(c[432]|0,2,0);lc(c[432]|0,8,0);mc(c[432]|0,4,0);nc(c[432]|0,6,0);b=0;return b|0}function vh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;f=(Lh(d|0)|0)>>>1;g=Dh(f)|0;if((f|0)!=0){h=0;j=d;while(1){xb(j|0,840,(d=i,i=i+8|0,c[d>>2]=g+h,d)|0)|0;i=d;d=h+1|0;if(d>>>0<f>>>0){h=d;j=j+2|0}else{break}}}j=c[432]|0;h=oc(j,a,1,Ga(b&65535|0)|0,g)|0;Eh(g);i=e;return h|0}function wh(){var b=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;cc(c[432]|0,9872);e=0;f=0;g=0;h=0;a:while(1){j=g+64|0;k=e;l=f;m=h;while(1){n=1736+((m<<1)+g)|0;if(m>>>0>=38>>>0){break a}o=9872+m|0;Wa(n|0,1408,(p=i,i=i+8|0,c[p>>2]=d[o]|0,p)|0)|0;i=p;q=m+1|0;r=(q|0)==32?j:l;if(m>>>0>31>>>0){s=d[o]|0|k}else{s=k}if((q&7|0)==0){break}else{k=s;l=r;m=q}}a[1736+((q<<1)+g)|0]=32;e=s;f=r;g=g+1|0;h=q}a[n]=0;if((k|0)!=0){a[9910]=0;i=b;return 1736}a[1736+l|0]=0;a[9910]=0;i=b;return 1736}function xh(){rc(c[432]|0);return}function yh(a,b){a=a|0;b=b|0;var d=0;d=c[432]|0;return dc(d,a,b,(Lh(b|0)|0)&65535)|0}function zh(a){a=a|0;var b=0;b=ec(c[432]|0,a)|0;return gc(c[432]|0,b)|0}function Ah(a,b){a=a|0;b=b|0;var d=0;d=ec(c[432]|0,a)|0;a=c[432]|0;return hc(a,d,b,Lh(b|0)|0)|0}function Bh(a){a=a|0;var b=0;b=c[432]|0;return(ic(b,a,(Lh(a|0)|0)&65535)|0)==0|0}function Ch(){a[9736+((jc(c[432]|0,9736)|0)&65535)|0]=0;return 9736}



function Dh(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ba=0,ca=0,da=0,ea=0,fa=0,ga=0,ha=0,ia=0,ja=0,ka=0,la=0,ma=0,na=0,oa=0,pa=0,qa=0,ra=0,sa=0,ta=0,ua=0,va=0,wa=0,xa=0,ya=0,za=0,Aa=0,Ba=0,Ca=0,Da=0,Ea=0,Fa=0,Ga=0;do{if(a>>>0<245>>>0){if(a>>>0<11>>>0){b=16}else{b=a+11&-8}d=b>>>3;e=c[2580]|0;f=e>>>(d>>>0);if((f&3|0)!=0){g=(f&1^1)+d|0;h=g<<1;i=10360+(h<<2)|0;j=10360+(h+2<<2)|0;h=c[j>>2]|0;k=h+8|0;l=c[k>>2]|0;do{if((i|0)==(l|0)){c[2580]=e&~(1<<g)}else{if(l>>>0<(c[2584]|0)>>>0){ub();return 0}m=l+12|0;if((c[m>>2]|0)==(h|0)){c[m>>2]=i;c[j>>2]=l;break}else{ub();return 0}}}while(0);l=g<<3;c[h+4>>2]=l|3;j=h+(l|4)|0;c[j>>2]=c[j>>2]|1;n=k;return n|0}if(b>>>0<=(c[2582]|0)>>>0){o=b;break}if((f|0)!=0){j=2<<d;l=f<<d&(j|-j);j=(l&-l)-1|0;l=j>>>12&16;i=j>>>(l>>>0);j=i>>>5&8;m=i>>>(j>>>0);i=m>>>2&4;p=m>>>(i>>>0);m=p>>>1&2;q=p>>>(m>>>0);p=q>>>1&1;r=(j|l|i|m|p)+(q>>>(p>>>0))|0;p=r<<1;q=10360+(p<<2)|0;m=10360+(p+2<<2)|0;p=c[m>>2]|0;i=p+8|0;l=c[i>>2]|0;do{if((q|0)==(l|0)){c[2580]=e&~(1<<r)}else{if(l>>>0<(c[2584]|0)>>>0){ub();return 0}j=l+12|0;if((c[j>>2]|0)==(p|0)){c[j>>2]=q;c[m>>2]=l;break}else{ub();return 0}}}while(0);l=r<<3;m=l-b|0;c[p+4>>2]=b|3;q=p;e=q+b|0;c[q+(b|4)>>2]=m|1;c[q+l>>2]=m;l=c[2582]|0;if((l|0)!=0){q=c[2585]|0;d=l>>>3;l=d<<1;f=10360+(l<<2)|0;k=c[2580]|0;h=1<<d;do{if((k&h|0)==0){c[2580]=k|h;s=f;t=10360+(l+2<<2)|0}else{d=10360+(l+2<<2)|0;g=c[d>>2]|0;if(g>>>0>=(c[2584]|0)>>>0){s=g;t=d;break}ub();return 0}}while(0);c[t>>2]=q;c[s+12>>2]=q;c[q+8>>2]=s;c[q+12>>2]=f}c[2582]=m;c[2585]=e;n=i;return n|0}l=c[2581]|0;if((l|0)==0){o=b;break}h=(l&-l)-1|0;l=h>>>12&16;k=h>>>(l>>>0);h=k>>>5&8;p=k>>>(h>>>0);k=p>>>2&4;r=p>>>(k>>>0);p=r>>>1&2;d=r>>>(p>>>0);r=d>>>1&1;g=c[10624+((h|l|k|p|r)+(d>>>(r>>>0))<<2)>>2]|0;r=g;d=g;p=(c[g+4>>2]&-8)-b|0;while(1){g=c[r+16>>2]|0;if((g|0)==0){k=c[r+20>>2]|0;if((k|0)==0){break}else{u=k}}else{u=g}g=(c[u+4>>2]&-8)-b|0;k=g>>>0<p>>>0;r=u;d=k?u:d;p=k?g:p}r=d;i=c[2584]|0;if(r>>>0<i>>>0){ub();return 0}e=r+b|0;m=e;if(r>>>0>=e>>>0){ub();return 0}e=c[d+24>>2]|0;f=c[d+12>>2]|0;do{if((f|0)==(d|0)){q=d+20|0;g=c[q>>2]|0;if((g|0)==0){k=d+16|0;l=c[k>>2]|0;if((l|0)==0){v=0;break}else{w=l;x=k}}else{w=g;x=q}while(1){q=w+20|0;g=c[q>>2]|0;if((g|0)!=0){w=g;x=q;continue}q=w+16|0;g=c[q>>2]|0;if((g|0)==0){break}else{w=g;x=q}}if(x>>>0<i>>>0){ub();return 0}else{c[x>>2]=0;v=w;break}}else{q=c[d+8>>2]|0;if(q>>>0<i>>>0){ub();return 0}g=q+12|0;if((c[g>>2]|0)!=(d|0)){ub();return 0}k=f+8|0;if((c[k>>2]|0)==(d|0)){c[g>>2]=f;c[k>>2]=q;v=f;break}else{ub();return 0}}}while(0);a:do{if((e|0)!=0){f=d+28|0;i=10624+(c[f>>2]<<2)|0;do{if((d|0)==(c[i>>2]|0)){c[i>>2]=v;if((v|0)!=0){break}c[2581]=c[2581]&~(1<<c[f>>2]);break a}else{if(e>>>0<(c[2584]|0)>>>0){ub();return 0}q=e+16|0;if((c[q>>2]|0)==(d|0)){c[q>>2]=v}else{c[e+20>>2]=v}if((v|0)==0){break a}}}while(0);if(v>>>0<(c[2584]|0)>>>0){ub();return 0}c[v+24>>2]=e;f=c[d+16>>2]|0;do{if((f|0)!=0){if(f>>>0<(c[2584]|0)>>>0){ub();return 0}else{c[v+16>>2]=f;c[f+24>>2]=v;break}}}while(0);f=c[d+20>>2]|0;if((f|0)==0){break}if(f>>>0<(c[2584]|0)>>>0){ub();return 0}else{c[v+20>>2]=f;c[f+24>>2]=v;break}}}while(0);if(p>>>0<16>>>0){e=p+b|0;c[d+4>>2]=e|3;f=r+(e+4)|0;c[f>>2]=c[f>>2]|1}else{c[d+4>>2]=b|3;c[r+(b|4)>>2]=p|1;c[r+(p+b)>>2]=p;f=c[2582]|0;if((f|0)!=0){e=c[2585]|0;i=f>>>3;f=i<<1;q=10360+(f<<2)|0;k=c[2580]|0;g=1<<i;do{if((k&g|0)==0){c[2580]=k|g;y=q;z=10360+(f+2<<2)|0}else{i=10360+(f+2<<2)|0;l=c[i>>2]|0;if(l>>>0>=(c[2584]|0)>>>0){y=l;z=i;break}ub();return 0}}while(0);c[z>>2]=e;c[y+12>>2]=e;c[e+8>>2]=y;c[e+12>>2]=q}c[2582]=p;c[2585]=m}f=d+8|0;if((f|0)==0){o=b;break}else{n=f}return n|0}else{if(a>>>0>4294967231>>>0){o=-1;break}f=a+11|0;g=f&-8;k=c[2581]|0;if((k|0)==0){o=g;break}r=-g|0;i=f>>>8;do{if((i|0)==0){A=0}else{if(g>>>0>16777215>>>0){A=31;break}f=(i+1048320|0)>>>16&8;l=i<<f;h=(l+520192|0)>>>16&4;j=l<<h;l=(j+245760|0)>>>16&2;B=14-(h|f|l)+(j<<l>>>15)|0;A=g>>>((B+7|0)>>>0)&1|B<<1}}while(0);i=c[10624+(A<<2)>>2]|0;b:do{if((i|0)==0){C=0;D=r;E=0}else{if((A|0)==31){F=0}else{F=25-(A>>>1)|0}d=0;m=r;p=i;q=g<<F;e=0;while(1){B=c[p+4>>2]&-8;l=B-g|0;if(l>>>0<m>>>0){if((B|0)==(g|0)){C=p;D=l;E=p;break b}else{G=p;H=l}}else{G=d;H=m}l=c[p+20>>2]|0;B=c[p+16+(q>>>31<<2)>>2]|0;j=(l|0)==0|(l|0)==(B|0)?e:l;if((B|0)==0){C=G;D=H;E=j;break}else{d=G;m=H;p=B;q=q<<1;e=j}}}}while(0);if((E|0)==0&(C|0)==0){i=2<<A;r=k&(i|-i);if((r|0)==0){o=g;break}i=(r&-r)-1|0;r=i>>>12&16;e=i>>>(r>>>0);i=e>>>5&8;q=e>>>(i>>>0);e=q>>>2&4;p=q>>>(e>>>0);q=p>>>1&2;m=p>>>(q>>>0);p=m>>>1&1;I=c[10624+((i|r|e|q|p)+(m>>>(p>>>0))<<2)>>2]|0}else{I=E}if((I|0)==0){J=D;K=C}else{p=I;m=D;q=C;while(1){e=(c[p+4>>2]&-8)-g|0;r=e>>>0<m>>>0;i=r?e:m;e=r?p:q;r=c[p+16>>2]|0;if((r|0)!=0){p=r;m=i;q=e;continue}r=c[p+20>>2]|0;if((r|0)==0){J=i;K=e;break}else{p=r;m=i;q=e}}}if((K|0)==0){o=g;break}if(J>>>0>=((c[2582]|0)-g|0)>>>0){o=g;break}q=K;m=c[2584]|0;if(q>>>0<m>>>0){ub();return 0}p=q+g|0;k=p;if(q>>>0>=p>>>0){ub();return 0}e=c[K+24>>2]|0;i=c[K+12>>2]|0;do{if((i|0)==(K|0)){r=K+20|0;d=c[r>>2]|0;if((d|0)==0){j=K+16|0;B=c[j>>2]|0;if((B|0)==0){L=0;break}else{M=B;N=j}}else{M=d;N=r}while(1){r=M+20|0;d=c[r>>2]|0;if((d|0)!=0){M=d;N=r;continue}r=M+16|0;d=c[r>>2]|0;if((d|0)==0){break}else{M=d;N=r}}if(N>>>0<m>>>0){ub();return 0}else{c[N>>2]=0;L=M;break}}else{r=c[K+8>>2]|0;if(r>>>0<m>>>0){ub();return 0}d=r+12|0;if((c[d>>2]|0)!=(K|0)){ub();return 0}j=i+8|0;if((c[j>>2]|0)==(K|0)){c[d>>2]=i;c[j>>2]=r;L=i;break}else{ub();return 0}}}while(0);c:do{if((e|0)!=0){i=K+28|0;m=10624+(c[i>>2]<<2)|0;do{if((K|0)==(c[m>>2]|0)){c[m>>2]=L;if((L|0)!=0){break}c[2581]=c[2581]&~(1<<c[i>>2]);break c}else{if(e>>>0<(c[2584]|0)>>>0){ub();return 0}r=e+16|0;if((c[r>>2]|0)==(K|0)){c[r>>2]=L}else{c[e+20>>2]=L}if((L|0)==0){break c}}}while(0);if(L>>>0<(c[2584]|0)>>>0){ub();return 0}c[L+24>>2]=e;i=c[K+16>>2]|0;do{if((i|0)!=0){if(i>>>0<(c[2584]|0)>>>0){ub();return 0}else{c[L+16>>2]=i;c[i+24>>2]=L;break}}}while(0);i=c[K+20>>2]|0;if((i|0)==0){break}if(i>>>0<(c[2584]|0)>>>0){ub();return 0}else{c[L+20>>2]=i;c[i+24>>2]=L;break}}}while(0);do{if(J>>>0<16>>>0){e=J+g|0;c[K+4>>2]=e|3;i=q+(e+4)|0;c[i>>2]=c[i>>2]|1}else{c[K+4>>2]=g|3;c[q+(g|4)>>2]=J|1;c[q+(J+g)>>2]=J;i=J>>>3;if(J>>>0<256>>>0){e=i<<1;m=10360+(e<<2)|0;r=c[2580]|0;j=1<<i;do{if((r&j|0)==0){c[2580]=r|j;O=m;P=10360+(e+2<<2)|0}else{i=10360+(e+2<<2)|0;d=c[i>>2]|0;if(d>>>0>=(c[2584]|0)>>>0){O=d;P=i;break}ub();return 0}}while(0);c[P>>2]=k;c[O+12>>2]=k;c[q+(g+8)>>2]=O;c[q+(g+12)>>2]=m;break}e=p;j=J>>>8;do{if((j|0)==0){Q=0}else{if(J>>>0>16777215>>>0){Q=31;break}r=(j+1048320|0)>>>16&8;i=j<<r;d=(i+520192|0)>>>16&4;B=i<<d;i=(B+245760|0)>>>16&2;l=14-(d|r|i)+(B<<i>>>15)|0;Q=J>>>((l+7|0)>>>0)&1|l<<1}}while(0);j=10624+(Q<<2)|0;c[q+(g+28)>>2]=Q;c[q+(g+20)>>2]=0;c[q+(g+16)>>2]=0;m=c[2581]|0;l=1<<Q;if((m&l|0)==0){c[2581]=m|l;c[j>>2]=e;c[q+(g+24)>>2]=j;c[q+(g+12)>>2]=e;c[q+(g+8)>>2]=e;break}if((Q|0)==31){R=0}else{R=25-(Q>>>1)|0}l=J<<R;m=c[j>>2]|0;while(1){if((c[m+4>>2]&-8|0)==(J|0)){break}S=m+16+(l>>>31<<2)|0;j=c[S>>2]|0;if((j|0)==0){T=151;break}else{l=l<<1;m=j}}if((T|0)==151){if(S>>>0<(c[2584]|0)>>>0){ub();return 0}else{c[S>>2]=e;c[q+(g+24)>>2]=m;c[q+(g+12)>>2]=e;c[q+(g+8)>>2]=e;break}}l=m+8|0;j=c[l>>2]|0;i=c[2584]|0;if(m>>>0<i>>>0){ub();return 0}if(j>>>0<i>>>0){ub();return 0}else{c[j+12>>2]=e;c[l>>2]=e;c[q+(g+8)>>2]=j;c[q+(g+12)>>2]=m;c[q+(g+24)>>2]=0;break}}}while(0);q=K+8|0;if((q|0)==0){o=g;break}else{n=q}return n|0}}while(0);K=c[2582]|0;if(o>>>0<=K>>>0){S=K-o|0;J=c[2585]|0;if(S>>>0>15>>>0){R=J;c[2585]=R+o;c[2582]=S;c[R+(o+4)>>2]=S|1;c[R+K>>2]=S;c[J+4>>2]=o|3}else{c[2582]=0;c[2585]=0;c[J+4>>2]=K|3;S=J+(K+4)|0;c[S>>2]=c[S>>2]|1}n=J+8|0;return n|0}J=c[2583]|0;if(o>>>0<J>>>0){S=J-o|0;c[2583]=S;J=c[2586]|0;K=J;c[2586]=K+o;c[K+(o+4)>>2]=S|1;c[J+4>>2]=o|3;n=J+8|0;return n|0}do{if((c[2482]|0)==0){J=Ya(30)|0;if((J-1&J|0)==0){c[2484]=J;c[2483]=J;c[2485]=-1;c[2486]=-1;c[2487]=0;c[2691]=0;c[2482]=(vb(0)|0)&-16^1431655768;break}else{ub();return 0}}}while(0);J=o+48|0;S=c[2484]|0;K=o+47|0;R=S+K|0;Q=-S|0;S=R&Q;if(S>>>0<=o>>>0){n=0;return n|0}O=c[2690]|0;do{if((O|0)!=0){P=c[2688]|0;L=P+S|0;if(L>>>0<=P>>>0|L>>>0>O>>>0){n=0}else{break}return n|0}}while(0);d:do{if((c[2691]&4|0)==0){O=c[2586]|0;e:do{if((O|0)==0){T=181}else{L=O;P=10768;while(1){U=P|0;M=c[U>>2]|0;if(M>>>0<=L>>>0){V=P+4|0;if((M+(c[V>>2]|0)|0)>>>0>L>>>0){break}}M=c[P+8>>2]|0;if((M|0)==0){T=181;break e}else{P=M}}if((P|0)==0){T=181;break}L=R-(c[2583]|0)&Q;if(L>>>0>=2147483647>>>0){W=0;break}m=lb(L|0)|0;e=(m|0)==((c[U>>2]|0)+(c[V>>2]|0)|0);X=e?m:-1;Y=e?L:0;Z=m;_=L;T=190}}while(0);do{if((T|0)==181){O=lb(0)|0;if((O|0)==-1){W=0;break}g=O;L=c[2483]|0;m=L-1|0;if((m&g|0)==0){$=S}else{$=S-g+(m+g&-L)|0}L=c[2688]|0;g=L+$|0;if(!($>>>0>o>>>0&$>>>0<2147483647>>>0)){W=0;break}m=c[2690]|0;if((m|0)!=0){if(g>>>0<=L>>>0|g>>>0>m>>>0){W=0;break}}m=lb($|0)|0;g=(m|0)==(O|0);X=g?O:-1;Y=g?$:0;Z=m;_=$;T=190}}while(0);f:do{if((T|0)==190){m=-_|0;if((X|0)!=-1){aa=Y;ba=X;T=201;break d}do{if((Z|0)!=-1&_>>>0<2147483647>>>0&_>>>0<J>>>0){g=c[2484]|0;O=K-_+g&-g;if(O>>>0>=2147483647>>>0){ca=_;break}if((lb(O|0)|0)==-1){lb(m|0)|0;W=Y;break f}else{ca=O+_|0;break}}else{ca=_}}while(0);if((Z|0)==-1){W=Y}else{aa=ca;ba=Z;T=201;break d}}}while(0);c[2691]=c[2691]|4;da=W;T=198}else{da=0;T=198}}while(0);do{if((T|0)==198){if(S>>>0>=2147483647>>>0){break}W=lb(S|0)|0;Z=lb(0)|0;if(!((Z|0)!=-1&(W|0)!=-1&W>>>0<Z>>>0)){break}ca=Z-W|0;Z=ca>>>0>(o+40|0)>>>0;Y=Z?W:-1;if((Y|0)!=-1){aa=Z?ca:da;ba=Y;T=201}}}while(0);do{if((T|0)==201){da=(c[2688]|0)+aa|0;c[2688]=da;if(da>>>0>(c[2689]|0)>>>0){c[2689]=da}da=c[2586]|0;g:do{if((da|0)==0){S=c[2584]|0;if((S|0)==0|ba>>>0<S>>>0){c[2584]=ba}c[2692]=ba;c[2693]=aa;c[2695]=0;c[2589]=c[2482];c[2588]=-1;S=0;do{Y=S<<1;ca=10360+(Y<<2)|0;c[10360+(Y+3<<2)>>2]=ca;c[10360+(Y+2<<2)>>2]=ca;S=S+1|0;}while(S>>>0<32>>>0);S=ba+8|0;if((S&7|0)==0){ea=0}else{ea=-S&7}S=aa-40-ea|0;c[2586]=ba+ea;c[2583]=S;c[ba+(ea+4)>>2]=S|1;c[ba+(aa-36)>>2]=40;c[2587]=c[2486]}else{S=10768;while(1){fa=c[S>>2]|0;ga=S+4|0;ha=c[ga>>2]|0;if((ba|0)==(fa+ha|0)){T=213;break}ca=c[S+8>>2]|0;if((ca|0)==0){break}else{S=ca}}do{if((T|0)==213){if((c[S+12>>2]&8|0)!=0){break}ca=da;if(!(ca>>>0>=fa>>>0&ca>>>0<ba>>>0)){break}c[ga>>2]=ha+aa;ca=c[2586]|0;Y=(c[2583]|0)+aa|0;Z=ca;W=ca+8|0;if((W&7|0)==0){ia=0}else{ia=-W&7}W=Y-ia|0;c[2586]=Z+ia;c[2583]=W;c[Z+(ia+4)>>2]=W|1;c[Z+(Y+4)>>2]=40;c[2587]=c[2486];break g}}while(0);if(ba>>>0<(c[2584]|0)>>>0){c[2584]=ba}S=ba+aa|0;Y=10768;while(1){ja=Y|0;if((c[ja>>2]|0)==(S|0)){T=223;break}Z=c[Y+8>>2]|0;if((Z|0)==0){break}else{Y=Z}}do{if((T|0)==223){if((c[Y+12>>2]&8|0)!=0){break}c[ja>>2]=ba;S=Y+4|0;c[S>>2]=(c[S>>2]|0)+aa;S=ba+8|0;if((S&7|0)==0){ka=0}else{ka=-S&7}S=ba+(aa+8)|0;if((S&7|0)==0){la=0}else{la=-S&7}S=ba+(la+aa)|0;Z=S;W=ka+o|0;ca=ba+W|0;_=ca;K=S-(ba+ka)-o|0;c[ba+(ka+4)>>2]=o|3;do{if((Z|0)==(c[2586]|0)){J=(c[2583]|0)+K|0;c[2583]=J;c[2586]=_;c[ba+(W+4)>>2]=J|1}else{if((Z|0)==(c[2585]|0)){J=(c[2582]|0)+K|0;c[2582]=J;c[2585]=_;c[ba+(W+4)>>2]=J|1;c[ba+(J+W)>>2]=J;break}J=aa+4|0;X=c[ba+(J+la)>>2]|0;if((X&3|0)==1){$=X&-8;V=X>>>3;h:do{if(X>>>0<256>>>0){U=c[ba+((la|8)+aa)>>2]|0;Q=c[ba+(aa+12+la)>>2]|0;R=10360+(V<<1<<2)|0;do{if((U|0)!=(R|0)){if(U>>>0<(c[2584]|0)>>>0){ub();return 0}if((c[U+12>>2]|0)==(Z|0)){break}ub();return 0}}while(0);if((Q|0)==(U|0)){c[2580]=c[2580]&~(1<<V);break}do{if((Q|0)==(R|0)){ma=Q+8|0}else{if(Q>>>0<(c[2584]|0)>>>0){ub();return 0}m=Q+8|0;if((c[m>>2]|0)==(Z|0)){ma=m;break}ub();return 0}}while(0);c[U+12>>2]=Q;c[ma>>2]=U}else{R=S;m=c[ba+((la|24)+aa)>>2]|0;P=c[ba+(aa+12+la)>>2]|0;do{if((P|0)==(R|0)){O=la|16;g=ba+(J+O)|0;L=c[g>>2]|0;if((L|0)==0){e=ba+(O+aa)|0;O=c[e>>2]|0;if((O|0)==0){na=0;break}else{oa=O;pa=e}}else{oa=L;pa=g}while(1){g=oa+20|0;L=c[g>>2]|0;if((L|0)!=0){oa=L;pa=g;continue}g=oa+16|0;L=c[g>>2]|0;if((L|0)==0){break}else{oa=L;pa=g}}if(pa>>>0<(c[2584]|0)>>>0){ub();return 0}else{c[pa>>2]=0;na=oa;break}}else{g=c[ba+((la|8)+aa)>>2]|0;if(g>>>0<(c[2584]|0)>>>0){ub();return 0}L=g+12|0;if((c[L>>2]|0)!=(R|0)){ub();return 0}e=P+8|0;if((c[e>>2]|0)==(R|0)){c[L>>2]=P;c[e>>2]=g;na=P;break}else{ub();return 0}}}while(0);if((m|0)==0){break}P=ba+(aa+28+la)|0;U=10624+(c[P>>2]<<2)|0;do{if((R|0)==(c[U>>2]|0)){c[U>>2]=na;if((na|0)!=0){break}c[2581]=c[2581]&~(1<<c[P>>2]);break h}else{if(m>>>0<(c[2584]|0)>>>0){ub();return 0}Q=m+16|0;if((c[Q>>2]|0)==(R|0)){c[Q>>2]=na}else{c[m+20>>2]=na}if((na|0)==0){break h}}}while(0);if(na>>>0<(c[2584]|0)>>>0){ub();return 0}c[na+24>>2]=m;R=la|16;P=c[ba+(R+aa)>>2]|0;do{if((P|0)!=0){if(P>>>0<(c[2584]|0)>>>0){ub();return 0}else{c[na+16>>2]=P;c[P+24>>2]=na;break}}}while(0);P=c[ba+(J+R)>>2]|0;if((P|0)==0){break}if(P>>>0<(c[2584]|0)>>>0){ub();return 0}else{c[na+20>>2]=P;c[P+24>>2]=na;break}}}while(0);qa=ba+(($|la)+aa)|0;ra=$+K|0}else{qa=Z;ra=K}J=qa+4|0;c[J>>2]=c[J>>2]&-2;c[ba+(W+4)>>2]=ra|1;c[ba+(ra+W)>>2]=ra;J=ra>>>3;if(ra>>>0<256>>>0){V=J<<1;X=10360+(V<<2)|0;P=c[2580]|0;m=1<<J;do{if((P&m|0)==0){c[2580]=P|m;sa=X;ta=10360+(V+2<<2)|0}else{J=10360+(V+2<<2)|0;U=c[J>>2]|0;if(U>>>0>=(c[2584]|0)>>>0){sa=U;ta=J;break}ub();return 0}}while(0);c[ta>>2]=_;c[sa+12>>2]=_;c[ba+(W+8)>>2]=sa;c[ba+(W+12)>>2]=X;break}V=ca;m=ra>>>8;do{if((m|0)==0){ua=0}else{if(ra>>>0>16777215>>>0){ua=31;break}P=(m+1048320|0)>>>16&8;$=m<<P;J=($+520192|0)>>>16&4;U=$<<J;$=(U+245760|0)>>>16&2;Q=14-(J|P|$)+(U<<$>>>15)|0;ua=ra>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);m=10624+(ua<<2)|0;c[ba+(W+28)>>2]=ua;c[ba+(W+20)>>2]=0;c[ba+(W+16)>>2]=0;X=c[2581]|0;Q=1<<ua;if((X&Q|0)==0){c[2581]=X|Q;c[m>>2]=V;c[ba+(W+24)>>2]=m;c[ba+(W+12)>>2]=V;c[ba+(W+8)>>2]=V;break}if((ua|0)==31){va=0}else{va=25-(ua>>>1)|0}Q=ra<<va;X=c[m>>2]|0;while(1){if((c[X+4>>2]&-8|0)==(ra|0)){break}wa=X+16+(Q>>>31<<2)|0;m=c[wa>>2]|0;if((m|0)==0){T=296;break}else{Q=Q<<1;X=m}}if((T|0)==296){if(wa>>>0<(c[2584]|0)>>>0){ub();return 0}else{c[wa>>2]=V;c[ba+(W+24)>>2]=X;c[ba+(W+12)>>2]=V;c[ba+(W+8)>>2]=V;break}}Q=X+8|0;m=c[Q>>2]|0;$=c[2584]|0;if(X>>>0<$>>>0){ub();return 0}if(m>>>0<$>>>0){ub();return 0}else{c[m+12>>2]=V;c[Q>>2]=V;c[ba+(W+8)>>2]=m;c[ba+(W+12)>>2]=X;c[ba+(W+24)>>2]=0;break}}}while(0);n=ba+(ka|8)|0;return n|0}}while(0);Y=da;W=10768;while(1){xa=c[W>>2]|0;if(xa>>>0<=Y>>>0){ya=c[W+4>>2]|0;za=xa+ya|0;if(za>>>0>Y>>>0){break}}W=c[W+8>>2]|0}W=xa+(ya-39)|0;if((W&7|0)==0){Aa=0}else{Aa=-W&7}W=xa+(ya-47+Aa)|0;ca=W>>>0<(da+16|0)>>>0?Y:W;W=ca+8|0;_=ba+8|0;if((_&7|0)==0){Ba=0}else{Ba=-_&7}_=aa-40-Ba|0;c[2586]=ba+Ba;c[2583]=_;c[ba+(Ba+4)>>2]=_|1;c[ba+(aa-36)>>2]=40;c[2587]=c[2486];c[ca+4>>2]=27;c[W>>2]=c[2692];c[W+4>>2]=c[2693];c[W+8>>2]=c[2694];c[W+12>>2]=c[2695];c[2692]=ba;c[2693]=aa;c[2695]=0;c[2694]=W;W=ca+28|0;c[W>>2]=7;if((ca+32|0)>>>0<za>>>0){_=W;while(1){W=_+4|0;c[W>>2]=7;if((_+8|0)>>>0<za>>>0){_=W}else{break}}}if((ca|0)==(Y|0)){break}_=ca-da|0;W=Y+(_+4)|0;c[W>>2]=c[W>>2]&-2;c[da+4>>2]=_|1;c[Y+_>>2]=_;W=_>>>3;if(_>>>0<256>>>0){K=W<<1;Z=10360+(K<<2)|0;S=c[2580]|0;m=1<<W;do{if((S&m|0)==0){c[2580]=S|m;Ca=Z;Da=10360+(K+2<<2)|0}else{W=10360+(K+2<<2)|0;Q=c[W>>2]|0;if(Q>>>0>=(c[2584]|0)>>>0){Ca=Q;Da=W;break}ub();return 0}}while(0);c[Da>>2]=da;c[Ca+12>>2]=da;c[da+8>>2]=Ca;c[da+12>>2]=Z;break}K=da;m=_>>>8;do{if((m|0)==0){Ea=0}else{if(_>>>0>16777215>>>0){Ea=31;break}S=(m+1048320|0)>>>16&8;Y=m<<S;ca=(Y+520192|0)>>>16&4;W=Y<<ca;Y=(W+245760|0)>>>16&2;Q=14-(ca|S|Y)+(W<<Y>>>15)|0;Ea=_>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);m=10624+(Ea<<2)|0;c[da+28>>2]=Ea;c[da+20>>2]=0;c[da+16>>2]=0;Z=c[2581]|0;Q=1<<Ea;if((Z&Q|0)==0){c[2581]=Z|Q;c[m>>2]=K;c[da+24>>2]=m;c[da+12>>2]=da;c[da+8>>2]=da;break}if((Ea|0)==31){Fa=0}else{Fa=25-(Ea>>>1)|0}Q=_<<Fa;Z=c[m>>2]|0;while(1){if((c[Z+4>>2]&-8|0)==(_|0)){break}Ga=Z+16+(Q>>>31<<2)|0;m=c[Ga>>2]|0;if((m|0)==0){T=331;break}else{Q=Q<<1;Z=m}}if((T|0)==331){if(Ga>>>0<(c[2584]|0)>>>0){ub();return 0}else{c[Ga>>2]=K;c[da+24>>2]=Z;c[da+12>>2]=da;c[da+8>>2]=da;break}}Q=Z+8|0;_=c[Q>>2]|0;m=c[2584]|0;if(Z>>>0<m>>>0){ub();return 0}if(_>>>0<m>>>0){ub();return 0}else{c[_+12>>2]=K;c[Q>>2]=K;c[da+8>>2]=_;c[da+12>>2]=Z;c[da+24>>2]=0;break}}}while(0);da=c[2583]|0;if(da>>>0<=o>>>0){break}_=da-o|0;c[2583]=_;da=c[2586]|0;Q=da;c[2586]=Q+o;c[Q+(o+4)>>2]=_|1;c[da+4>>2]=o|3;n=da+8|0;return n|0}}while(0);c[(qb()|0)>>2]=12;n=0;return n|0}function Eh(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;if((a|0)==0){return}b=a-8|0;d=b;e=c[2584]|0;if(b>>>0<e>>>0){ub()}f=c[a-4>>2]|0;g=f&3;if((g|0)==1){ub()}h=f&-8;i=a+(h-8)|0;j=i;a:do{if((f&1|0)==0){k=c[b>>2]|0;if((g|0)==0){return}l=-8-k|0;m=a+l|0;n=m;o=k+h|0;if(m>>>0<e>>>0){ub()}if((n|0)==(c[2585]|0)){p=a+(h-4)|0;if((c[p>>2]&3|0)!=3){q=n;r=o;break}c[2582]=o;c[p>>2]=c[p>>2]&-2;c[a+(l+4)>>2]=o|1;c[i>>2]=o;return}p=k>>>3;if(k>>>0<256>>>0){k=c[a+(l+8)>>2]|0;s=c[a+(l+12)>>2]|0;t=10360+(p<<1<<2)|0;do{if((k|0)!=(t|0)){if(k>>>0<e>>>0){ub()}if((c[k+12>>2]|0)==(n|0)){break}ub()}}while(0);if((s|0)==(k|0)){c[2580]=c[2580]&~(1<<p);q=n;r=o;break}do{if((s|0)==(t|0)){u=s+8|0}else{if(s>>>0<e>>>0){ub()}v=s+8|0;if((c[v>>2]|0)==(n|0)){u=v;break}ub()}}while(0);c[k+12>>2]=s;c[u>>2]=k;q=n;r=o;break}t=m;p=c[a+(l+24)>>2]|0;v=c[a+(l+12)>>2]|0;do{if((v|0)==(t|0)){w=a+(l+20)|0;x=c[w>>2]|0;if((x|0)==0){y=a+(l+16)|0;z=c[y>>2]|0;if((z|0)==0){A=0;break}else{B=z;C=y}}else{B=x;C=w}while(1){w=B+20|0;x=c[w>>2]|0;if((x|0)!=0){B=x;C=w;continue}w=B+16|0;x=c[w>>2]|0;if((x|0)==0){break}else{B=x;C=w}}if(C>>>0<e>>>0){ub()}else{c[C>>2]=0;A=B;break}}else{w=c[a+(l+8)>>2]|0;if(w>>>0<e>>>0){ub()}x=w+12|0;if((c[x>>2]|0)!=(t|0)){ub()}y=v+8|0;if((c[y>>2]|0)==(t|0)){c[x>>2]=v;c[y>>2]=w;A=v;break}else{ub()}}}while(0);if((p|0)==0){q=n;r=o;break}v=a+(l+28)|0;m=10624+(c[v>>2]<<2)|0;do{if((t|0)==(c[m>>2]|0)){c[m>>2]=A;if((A|0)!=0){break}c[2581]=c[2581]&~(1<<c[v>>2]);q=n;r=o;break a}else{if(p>>>0<(c[2584]|0)>>>0){ub()}k=p+16|0;if((c[k>>2]|0)==(t|0)){c[k>>2]=A}else{c[p+20>>2]=A}if((A|0)==0){q=n;r=o;break a}}}while(0);if(A>>>0<(c[2584]|0)>>>0){ub()}c[A+24>>2]=p;t=c[a+(l+16)>>2]|0;do{if((t|0)!=0){if(t>>>0<(c[2584]|0)>>>0){ub()}else{c[A+16>>2]=t;c[t+24>>2]=A;break}}}while(0);t=c[a+(l+20)>>2]|0;if((t|0)==0){q=n;r=o;break}if(t>>>0<(c[2584]|0)>>>0){ub()}else{c[A+20>>2]=t;c[t+24>>2]=A;q=n;r=o;break}}else{q=d;r=h}}while(0);d=q;if(d>>>0>=i>>>0){ub()}A=a+(h-4)|0;e=c[A>>2]|0;if((e&1|0)==0){ub()}do{if((e&2|0)==0){if((j|0)==(c[2586]|0)){B=(c[2583]|0)+r|0;c[2583]=B;c[2586]=q;c[q+4>>2]=B|1;if((q|0)!=(c[2585]|0)){return}c[2585]=0;c[2582]=0;return}if((j|0)==(c[2585]|0)){B=(c[2582]|0)+r|0;c[2582]=B;c[2585]=q;c[q+4>>2]=B|1;c[d+B>>2]=B;return}B=(e&-8)+r|0;C=e>>>3;b:do{if(e>>>0<256>>>0){u=c[a+h>>2]|0;g=c[a+(h|4)>>2]|0;b=10360+(C<<1<<2)|0;do{if((u|0)!=(b|0)){if(u>>>0<(c[2584]|0)>>>0){ub()}if((c[u+12>>2]|0)==(j|0)){break}ub()}}while(0);if((g|0)==(u|0)){c[2580]=c[2580]&~(1<<C);break}do{if((g|0)==(b|0)){D=g+8|0}else{if(g>>>0<(c[2584]|0)>>>0){ub()}f=g+8|0;if((c[f>>2]|0)==(j|0)){D=f;break}ub()}}while(0);c[u+12>>2]=g;c[D>>2]=u}else{b=i;f=c[a+(h+16)>>2]|0;t=c[a+(h|4)>>2]|0;do{if((t|0)==(b|0)){p=a+(h+12)|0;v=c[p>>2]|0;if((v|0)==0){m=a+(h+8)|0;k=c[m>>2]|0;if((k|0)==0){E=0;break}else{F=k;G=m}}else{F=v;G=p}while(1){p=F+20|0;v=c[p>>2]|0;if((v|0)!=0){F=v;G=p;continue}p=F+16|0;v=c[p>>2]|0;if((v|0)==0){break}else{F=v;G=p}}if(G>>>0<(c[2584]|0)>>>0){ub()}else{c[G>>2]=0;E=F;break}}else{p=c[a+h>>2]|0;if(p>>>0<(c[2584]|0)>>>0){ub()}v=p+12|0;if((c[v>>2]|0)!=(b|0)){ub()}m=t+8|0;if((c[m>>2]|0)==(b|0)){c[v>>2]=t;c[m>>2]=p;E=t;break}else{ub()}}}while(0);if((f|0)==0){break}t=a+(h+20)|0;u=10624+(c[t>>2]<<2)|0;do{if((b|0)==(c[u>>2]|0)){c[u>>2]=E;if((E|0)!=0){break}c[2581]=c[2581]&~(1<<c[t>>2]);break b}else{if(f>>>0<(c[2584]|0)>>>0){ub()}g=f+16|0;if((c[g>>2]|0)==(b|0)){c[g>>2]=E}else{c[f+20>>2]=E}if((E|0)==0){break b}}}while(0);if(E>>>0<(c[2584]|0)>>>0){ub()}c[E+24>>2]=f;b=c[a+(h+8)>>2]|0;do{if((b|0)!=0){if(b>>>0<(c[2584]|0)>>>0){ub()}else{c[E+16>>2]=b;c[b+24>>2]=E;break}}}while(0);b=c[a+(h+12)>>2]|0;if((b|0)==0){break}if(b>>>0<(c[2584]|0)>>>0){ub()}else{c[E+20>>2]=b;c[b+24>>2]=E;break}}}while(0);c[q+4>>2]=B|1;c[d+B>>2]=B;if((q|0)!=(c[2585]|0)){H=B;break}c[2582]=B;return}else{c[A>>2]=e&-2;c[q+4>>2]=r|1;c[d+r>>2]=r;H=r}}while(0);r=H>>>3;if(H>>>0<256>>>0){d=r<<1;e=10360+(d<<2)|0;A=c[2580]|0;E=1<<r;do{if((A&E|0)==0){c[2580]=A|E;I=e;J=10360+(d+2<<2)|0}else{r=10360+(d+2<<2)|0;h=c[r>>2]|0;if(h>>>0>=(c[2584]|0)>>>0){I=h;J=r;break}ub()}}while(0);c[J>>2]=q;c[I+12>>2]=q;c[q+8>>2]=I;c[q+12>>2]=e;return}e=q;I=H>>>8;do{if((I|0)==0){K=0}else{if(H>>>0>16777215>>>0){K=31;break}J=(I+1048320|0)>>>16&8;d=I<<J;E=(d+520192|0)>>>16&4;A=d<<E;d=(A+245760|0)>>>16&2;r=14-(E|J|d)+(A<<d>>>15)|0;K=H>>>((r+7|0)>>>0)&1|r<<1}}while(0);I=10624+(K<<2)|0;c[q+28>>2]=K;c[q+20>>2]=0;c[q+16>>2]=0;r=c[2581]|0;d=1<<K;do{if((r&d|0)==0){c[2581]=r|d;c[I>>2]=e;c[q+24>>2]=I;c[q+12>>2]=q;c[q+8>>2]=q}else{if((K|0)==31){L=0}else{L=25-(K>>>1)|0}A=H<<L;J=c[I>>2]|0;while(1){if((c[J+4>>2]&-8|0)==(H|0)){break}M=J+16+(A>>>31<<2)|0;E=c[M>>2]|0;if((E|0)==0){N=129;break}else{A=A<<1;J=E}}if((N|0)==129){if(M>>>0<(c[2584]|0)>>>0){ub()}else{c[M>>2]=e;c[q+24>>2]=J;c[q+12>>2]=q;c[q+8>>2]=q;break}}A=J+8|0;B=c[A>>2]|0;E=c[2584]|0;if(J>>>0<E>>>0){ub()}if(B>>>0<E>>>0){ub()}else{c[B+12>>2]=e;c[A>>2]=e;c[q+8>>2]=B;c[q+12>>2]=J;c[q+24>>2]=0;break}}}while(0);q=(c[2588]|0)-1|0;c[2588]=q;if((q|0)==0){O=10776}else{return}while(1){q=c[O>>2]|0;if((q|0)==0){break}else{O=q+8|0}}c[2588]=-1;return}function Fh(a,b){a=a|0;b=b|0;var d=0,e=0;do{if((a|0)==0){d=0}else{e=aa(b,a)|0;if((b|a)>>>0<=65535>>>0){d=e;break}d=((e>>>0)/(a>>>0)|0|0)==(b|0)?e:-1}}while(0);b=Dh(d)|0;if((b|0)==0){return b|0}if((c[b-4>>2]&3|0)==0){return b|0}Jh(b|0,0,d|0)|0;return b|0}function Gh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;if((a|0)==0){d=Dh(b)|0;return d|0}if(b>>>0>4294967231>>>0){c[(qb()|0)>>2]=12;d=0;return d|0}if(b>>>0<11>>>0){e=16}else{e=b+11&-8}f=Hh(a-8|0,e)|0;if((f|0)!=0){d=f+8|0;return d|0}f=Dh(b)|0;if((f|0)==0){d=0;return d|0}e=c[a-4>>2]|0;g=(e&-8)-((e&3|0)==0?8:4)|0;Kh(f|0,a|0,g>>>0<b>>>0?g:b)|0;Eh(a);d=f;return d|0}function Hh(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;d=a+4|0;e=c[d>>2]|0;f=e&-8;g=a;h=g+f|0;i=h;j=c[2584]|0;if(g>>>0<j>>>0){ub();return 0}k=e&3;if(!((k|0)!=1&g>>>0<h>>>0)){ub();return 0}l=g+(f|4)|0;m=c[l>>2]|0;if((m&1|0)==0){ub();return 0}if((k|0)==0){if(b>>>0<256>>>0){n=0;return n|0}do{if(f>>>0>=(b+4|0)>>>0){if((f-b|0)>>>0>c[2484]<<1>>>0){break}else{n=a}return n|0}}while(0);n=0;return n|0}if(f>>>0>=b>>>0){k=f-b|0;if(k>>>0<=15>>>0){n=a;return n|0}c[d>>2]=e&1|b|2;c[g+(b+4)>>2]=k|3;c[l>>2]=c[l>>2]|1;Ih(g+b|0,k);n=a;return n|0}if((i|0)==(c[2586]|0)){k=(c[2583]|0)+f|0;if(k>>>0<=b>>>0){n=0;return n|0}l=k-b|0;c[d>>2]=e&1|b|2;c[g+(b+4)>>2]=l|1;c[2586]=g+b;c[2583]=l;n=a;return n|0}if((i|0)==(c[2585]|0)){l=(c[2582]|0)+f|0;if(l>>>0<b>>>0){n=0;return n|0}k=l-b|0;if(k>>>0>15>>>0){c[d>>2]=e&1|b|2;c[g+(b+4)>>2]=k|1;c[g+l>>2]=k;o=g+(l+4)|0;c[o>>2]=c[o>>2]&-2;p=g+b|0;q=k}else{c[d>>2]=e&1|l|2;e=g+(l+4)|0;c[e>>2]=c[e>>2]|1;p=0;q=0}c[2582]=q;c[2585]=p;n=a;return n|0}if((m&2|0)!=0){n=0;return n|0}p=(m&-8)+f|0;if(p>>>0<b>>>0){n=0;return n|0}q=p-b|0;e=m>>>3;a:do{if(m>>>0<256>>>0){l=c[g+(f+8)>>2]|0;k=c[g+(f+12)>>2]|0;o=10360+(e<<1<<2)|0;do{if((l|0)!=(o|0)){if(l>>>0<j>>>0){ub();return 0}if((c[l+12>>2]|0)==(i|0)){break}ub();return 0}}while(0);if((k|0)==(l|0)){c[2580]=c[2580]&~(1<<e);break}do{if((k|0)==(o|0)){r=k+8|0}else{if(k>>>0<j>>>0){ub();return 0}s=k+8|0;if((c[s>>2]|0)==(i|0)){r=s;break}ub();return 0}}while(0);c[l+12>>2]=k;c[r>>2]=l}else{o=h;s=c[g+(f+24)>>2]|0;t=c[g+(f+12)>>2]|0;do{if((t|0)==(o|0)){u=g+(f+20)|0;v=c[u>>2]|0;if((v|0)==0){w=g+(f+16)|0;x=c[w>>2]|0;if((x|0)==0){y=0;break}else{z=x;A=w}}else{z=v;A=u}while(1){u=z+20|0;v=c[u>>2]|0;if((v|0)!=0){z=v;A=u;continue}u=z+16|0;v=c[u>>2]|0;if((v|0)==0){break}else{z=v;A=u}}if(A>>>0<j>>>0){ub();return 0}else{c[A>>2]=0;y=z;break}}else{u=c[g+(f+8)>>2]|0;if(u>>>0<j>>>0){ub();return 0}v=u+12|0;if((c[v>>2]|0)!=(o|0)){ub();return 0}w=t+8|0;if((c[w>>2]|0)==(o|0)){c[v>>2]=t;c[w>>2]=u;y=t;break}else{ub();return 0}}}while(0);if((s|0)==0){break}t=g+(f+28)|0;l=10624+(c[t>>2]<<2)|0;do{if((o|0)==(c[l>>2]|0)){c[l>>2]=y;if((y|0)!=0){break}c[2581]=c[2581]&~(1<<c[t>>2]);break a}else{if(s>>>0<(c[2584]|0)>>>0){ub();return 0}k=s+16|0;if((c[k>>2]|0)==(o|0)){c[k>>2]=y}else{c[s+20>>2]=y}if((y|0)==0){break a}}}while(0);if(y>>>0<(c[2584]|0)>>>0){ub();return 0}c[y+24>>2]=s;o=c[g+(f+16)>>2]|0;do{if((o|0)!=0){if(o>>>0<(c[2584]|0)>>>0){ub();return 0}else{c[y+16>>2]=o;c[o+24>>2]=y;break}}}while(0);o=c[g+(f+20)>>2]|0;if((o|0)==0){break}if(o>>>0<(c[2584]|0)>>>0){ub();return 0}else{c[y+20>>2]=o;c[o+24>>2]=y;break}}}while(0);if(q>>>0<16>>>0){c[d>>2]=p|c[d>>2]&1|2;y=g+(p|4)|0;c[y>>2]=c[y>>2]|1;n=a;return n|0}else{c[d>>2]=c[d>>2]&1|b|2;c[g+(b+4)>>2]=q|3;d=g+(p|4)|0;c[d>>2]=c[d>>2]|1;Ih(g+b|0,q);n=a;return n|0}return 0}function Ih(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;d=a;e=d+b|0;f=e;g=c[a+4>>2]|0;a:do{if((g&1|0)==0){h=c[a>>2]|0;if((g&3|0)==0){return}i=d+(-h|0)|0;j=i;k=h+b|0;l=c[2584]|0;if(i>>>0<l>>>0){ub()}if((j|0)==(c[2585]|0)){m=d+(b+4)|0;if((c[m>>2]&3|0)!=3){n=j;o=k;break}c[2582]=k;c[m>>2]=c[m>>2]&-2;c[d+(4-h)>>2]=k|1;c[e>>2]=k;return}m=h>>>3;if(h>>>0<256>>>0){p=c[d+(8-h)>>2]|0;q=c[d+(12-h)>>2]|0;r=10360+(m<<1<<2)|0;do{if((p|0)!=(r|0)){if(p>>>0<l>>>0){ub()}if((c[p+12>>2]|0)==(j|0)){break}ub()}}while(0);if((q|0)==(p|0)){c[2580]=c[2580]&~(1<<m);n=j;o=k;break}do{if((q|0)==(r|0)){s=q+8|0}else{if(q>>>0<l>>>0){ub()}t=q+8|0;if((c[t>>2]|0)==(j|0)){s=t;break}ub()}}while(0);c[p+12>>2]=q;c[s>>2]=p;n=j;o=k;break}r=i;m=c[d+(24-h)>>2]|0;t=c[d+(12-h)>>2]|0;do{if((t|0)==(r|0)){u=16-h|0;v=d+(u+4)|0;w=c[v>>2]|0;if((w|0)==0){x=d+u|0;u=c[x>>2]|0;if((u|0)==0){y=0;break}else{z=u;A=x}}else{z=w;A=v}while(1){v=z+20|0;w=c[v>>2]|0;if((w|0)!=0){z=w;A=v;continue}v=z+16|0;w=c[v>>2]|0;if((w|0)==0){break}else{z=w;A=v}}if(A>>>0<l>>>0){ub()}else{c[A>>2]=0;y=z;break}}else{v=c[d+(8-h)>>2]|0;if(v>>>0<l>>>0){ub()}w=v+12|0;if((c[w>>2]|0)!=(r|0)){ub()}x=t+8|0;if((c[x>>2]|0)==(r|0)){c[w>>2]=t;c[x>>2]=v;y=t;break}else{ub()}}}while(0);if((m|0)==0){n=j;o=k;break}t=d+(28-h)|0;l=10624+(c[t>>2]<<2)|0;do{if((r|0)==(c[l>>2]|0)){c[l>>2]=y;if((y|0)!=0){break}c[2581]=c[2581]&~(1<<c[t>>2]);n=j;o=k;break a}else{if(m>>>0<(c[2584]|0)>>>0){ub()}i=m+16|0;if((c[i>>2]|0)==(r|0)){c[i>>2]=y}else{c[m+20>>2]=y}if((y|0)==0){n=j;o=k;break a}}}while(0);if(y>>>0<(c[2584]|0)>>>0){ub()}c[y+24>>2]=m;r=16-h|0;t=c[d+r>>2]|0;do{if((t|0)!=0){if(t>>>0<(c[2584]|0)>>>0){ub()}else{c[y+16>>2]=t;c[t+24>>2]=y;break}}}while(0);t=c[d+(r+4)>>2]|0;if((t|0)==0){n=j;o=k;break}if(t>>>0<(c[2584]|0)>>>0){ub()}else{c[y+20>>2]=t;c[t+24>>2]=y;n=j;o=k;break}}else{n=a;o=b}}while(0);a=c[2584]|0;if(e>>>0<a>>>0){ub()}y=d+(b+4)|0;z=c[y>>2]|0;do{if((z&2|0)==0){if((f|0)==(c[2586]|0)){A=(c[2583]|0)+o|0;c[2583]=A;c[2586]=n;c[n+4>>2]=A|1;if((n|0)!=(c[2585]|0)){return}c[2585]=0;c[2582]=0;return}if((f|0)==(c[2585]|0)){A=(c[2582]|0)+o|0;c[2582]=A;c[2585]=n;c[n+4>>2]=A|1;c[n+A>>2]=A;return}A=(z&-8)+o|0;s=z>>>3;b:do{if(z>>>0<256>>>0){g=c[d+(b+8)>>2]|0;t=c[d+(b+12)>>2]|0;h=10360+(s<<1<<2)|0;do{if((g|0)!=(h|0)){if(g>>>0<a>>>0){ub()}if((c[g+12>>2]|0)==(f|0)){break}ub()}}while(0);if((t|0)==(g|0)){c[2580]=c[2580]&~(1<<s);break}do{if((t|0)==(h|0)){B=t+8|0}else{if(t>>>0<a>>>0){ub()}m=t+8|0;if((c[m>>2]|0)==(f|0)){B=m;break}ub()}}while(0);c[g+12>>2]=t;c[B>>2]=g}else{h=e;m=c[d+(b+24)>>2]|0;l=c[d+(b+12)>>2]|0;do{if((l|0)==(h|0)){i=d+(b+20)|0;p=c[i>>2]|0;if((p|0)==0){q=d+(b+16)|0;v=c[q>>2]|0;if((v|0)==0){C=0;break}else{D=v;E=q}}else{D=p;E=i}while(1){i=D+20|0;p=c[i>>2]|0;if((p|0)!=0){D=p;E=i;continue}i=D+16|0;p=c[i>>2]|0;if((p|0)==0){break}else{D=p;E=i}}if(E>>>0<a>>>0){ub()}else{c[E>>2]=0;C=D;break}}else{i=c[d+(b+8)>>2]|0;if(i>>>0<a>>>0){ub()}p=i+12|0;if((c[p>>2]|0)!=(h|0)){ub()}q=l+8|0;if((c[q>>2]|0)==(h|0)){c[p>>2]=l;c[q>>2]=i;C=l;break}else{ub()}}}while(0);if((m|0)==0){break}l=d+(b+28)|0;g=10624+(c[l>>2]<<2)|0;do{if((h|0)==(c[g>>2]|0)){c[g>>2]=C;if((C|0)!=0){break}c[2581]=c[2581]&~(1<<c[l>>2]);break b}else{if(m>>>0<(c[2584]|0)>>>0){ub()}t=m+16|0;if((c[t>>2]|0)==(h|0)){c[t>>2]=C}else{c[m+20>>2]=C}if((C|0)==0){break b}}}while(0);if(C>>>0<(c[2584]|0)>>>0){ub()}c[C+24>>2]=m;h=c[d+(b+16)>>2]|0;do{if((h|0)!=0){if(h>>>0<(c[2584]|0)>>>0){ub()}else{c[C+16>>2]=h;c[h+24>>2]=C;break}}}while(0);h=c[d+(b+20)>>2]|0;if((h|0)==0){break}if(h>>>0<(c[2584]|0)>>>0){ub()}else{c[C+20>>2]=h;c[h+24>>2]=C;break}}}while(0);c[n+4>>2]=A|1;c[n+A>>2]=A;if((n|0)!=(c[2585]|0)){F=A;break}c[2582]=A;return}else{c[y>>2]=z&-2;c[n+4>>2]=o|1;c[n+o>>2]=o;F=o}}while(0);o=F>>>3;if(F>>>0<256>>>0){z=o<<1;y=10360+(z<<2)|0;C=c[2580]|0;b=1<<o;do{if((C&b|0)==0){c[2580]=C|b;G=y;H=10360+(z+2<<2)|0}else{o=10360+(z+2<<2)|0;d=c[o>>2]|0;if(d>>>0>=(c[2584]|0)>>>0){G=d;H=o;break}ub()}}while(0);c[H>>2]=n;c[G+12>>2]=n;c[n+8>>2]=G;c[n+12>>2]=y;return}y=n;G=F>>>8;do{if((G|0)==0){I=0}else{if(F>>>0>16777215>>>0){I=31;break}H=(G+1048320|0)>>>16&8;z=G<<H;b=(z+520192|0)>>>16&4;C=z<<b;z=(C+245760|0)>>>16&2;o=14-(b|H|z)+(C<<z>>>15)|0;I=F>>>((o+7|0)>>>0)&1|o<<1}}while(0);G=10624+(I<<2)|0;c[n+28>>2]=I;c[n+20>>2]=0;c[n+16>>2]=0;o=c[2581]|0;z=1<<I;if((o&z|0)==0){c[2581]=o|z;c[G>>2]=y;c[n+24>>2]=G;c[n+12>>2]=n;c[n+8>>2]=n;return}if((I|0)==31){J=0}else{J=25-(I>>>1)|0}I=F<<J;J=c[G>>2]|0;while(1){if((c[J+4>>2]&-8|0)==(F|0)){break}K=J+16+(I>>>31<<2)|0;G=c[K>>2]|0;if((G|0)==0){L=126;break}else{I=I<<1;J=G}}if((L|0)==126){if(K>>>0<(c[2584]|0)>>>0){ub()}c[K>>2]=y;c[n+24>>2]=J;c[n+12>>2]=n;c[n+8>>2]=n;return}K=J+8|0;L=c[K>>2]|0;I=c[2584]|0;if(J>>>0<I>>>0){ub()}if(L>>>0<I>>>0){ub()}c[L+12>>2]=y;c[K>>2]=y;c[n+8>>2]=L;c[n+12>>2]=J;c[n+24>>2]=0;return}function Jh(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b+e|0;if((e|0)>=20){d=d&255;g=b&3;h=d|d<<8|d<<16|d<<24;i=f&~3;if(g){g=b+4-g|0;while((b|0)<(g|0)){a[b]=d;b=b+1|0}}while((b|0)<(i|0)){c[b>>2]=h;b=b+4|0}}while((b|0)<(f|0)){a[b]=d;b=b+1|0}return b-e|0}function Kh(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;f=b|0;if((b&3)==(d&3)){while(b&3){if((e|0)==0)return f|0;a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function Lh(b){b=b|0;var c=0;c=b;while(a[c]|0){c=c+1|0}return c-b|0}function Mh(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,f=0,g=0;while((e|0)<(c|0)){f=d[a+e|0]|0;g=d[b+e|0]|0;if((f|0)!=(g|0))return((f|0)>(g|0)?1:-1)|0;e=e+1|0}return 0}function Nh(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=a+c>>>0;return(E=b+d+(e>>>0<a>>>0|0)>>>0,e|0)|0}function Oh(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=b-d>>>0;e=b-d-(c>>>0>a>>>0|0)>>>0;return(E=e,a-c>>>0|0)|0}function Ph(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){E=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}E=a<<c-32;return 0}function Qh(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){E=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}E=0;return b>>>c-32|0}function Rh(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){E=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}E=(b|0)<0?-1:0;return b>>c-32|0}function Sh(b){b=b|0;var c=0;c=a[n+(b>>>24)|0]|0;if((c|0)<8)return c|0;c=a[n+(b>>16&255)|0]|0;if((c|0)<8)return c+8|0;c=a[n+(b>>8&255)|0]|0;if((c|0)<8)return c+16|0;return(a[n+(b&255)|0]|0)+24|0}function Th(b){b=b|0;var c=0;c=a[m+(b&255)|0]|0;if((c|0)<8)return c|0;c=a[m+(b>>8&255)|0]|0;if((c|0)<8)return c+8|0;c=a[m+(b>>16&255)|0]|0;if((c|0)<8)return c+16|0;return(a[m+(b>>>24)|0]|0)+24|0}function Uh(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=a&65535;d=b&65535;e=aa(d,c)|0;f=a>>>16;a=(e>>>16)+(aa(d,f)|0)|0;d=b>>>16;b=aa(d,c)|0;return(E=(a>>>16)+(aa(d,f)|0)+(((a&65535)+b|0)>>>16)|0,a+b<<16|e&65535|0)|0}function Vh(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=b>>31|((b|0)<0?-1:0)<<1;f=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;g=d>>31|((d|0)<0?-1:0)<<1;h=((d|0)<0?-1:0)>>31|((d|0)<0?-1:0)<<1;i=Oh(e^a,f^b,e,f)|0;b=E;a=g^e;e=h^f;f=Oh((_h(i,b,Oh(g^c,h^d,g,h)|0,E,0)|0)^a,E^e,a,e)|0;return(E=E,f)|0}function Wh(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+8|0;g=f|0;h=b>>31|((b|0)<0?-1:0)<<1;j=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;k=e>>31|((e|0)<0?-1:0)<<1;l=((e|0)<0?-1:0)>>31|((e|0)<0?-1:0)<<1;m=Oh(h^a,j^b,h,j)|0;b=E;_h(m,b,Oh(k^d,l^e,k,l)|0,E,g)|0;l=Oh(c[g>>2]^h,c[g+4>>2]^j,h,j)|0;j=E;i=f;return(E=j,l)|0}function Xh(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=a;a=c;c=Uh(e,a)|0;f=E;return(E=(aa(b,a)|0)+(aa(d,e)|0)+f|f&0,c|0|0)|0}function Yh(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=_h(a,b,c,d,0)|0;return(E=E,e)|0}function Zh(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+8|0;g=f|0;_h(a,b,d,e,g)|0;i=f;return(E=c[g+4>>2]|0,c[g>>2]|0)|0}function _h(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;g=a;h=b;i=h;j=d;k=e;l=k;if((i|0)==0){m=(f|0)!=0;if((l|0)==0){if(m){c[f>>2]=(g>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(g>>>0)/(j>>>0)>>>0;return(E=n,o)|0}else{if(!m){n=0;o=0;return(E=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=b&0;n=0;o=0;return(E=n,o)|0}}m=(l|0)==0;do{if((j|0)==0){if(m){if((f|0)!=0){c[f>>2]=(i>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(i>>>0)/(j>>>0)>>>0;return(E=n,o)|0}if((g|0)==0){if((f|0)!=0){c[f>>2]=0;c[f+4>>2]=(i>>>0)%(l>>>0)}n=0;o=(i>>>0)/(l>>>0)>>>0;return(E=n,o)|0}p=l-1|0;if((p&l|0)==0){if((f|0)!=0){c[f>>2]=a|0;c[f+4>>2]=p&i|b&0}n=0;o=i>>>((Th(l|0)|0)>>>0);return(E=n,o)|0}p=(Sh(l|0)|0)-(Sh(i|0)|0)|0;if(p>>>0<=30){q=p+1|0;r=31-p|0;s=q;t=i<<r|g>>>(q>>>0);u=i>>>(q>>>0);v=0;w=g<<r;break}if((f|0)==0){n=0;o=0;return(E=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=h|b&0;n=0;o=0;return(E=n,o)|0}else{if(!m){r=(Sh(l|0)|0)-(Sh(i|0)|0)|0;if(r>>>0<=31){q=r+1|0;p=31-r|0;x=r-31>>31;s=q;t=g>>>(q>>>0)&x|i<<p;u=i>>>(q>>>0)&x;v=0;w=g<<p;break}if((f|0)==0){n=0;o=0;return(E=n,o)|0}c[f>>2]=a|0;c[f+4>>2]=h|b&0;n=0;o=0;return(E=n,o)|0}p=j-1|0;if((p&j|0)!=0){x=(Sh(j|0)|0)+33-(Sh(i|0)|0)|0;q=64-x|0;r=32-x|0;y=r>>31;z=x-32|0;A=z>>31;s=x;t=r-1>>31&i>>>(z>>>0)|(i<<r|g>>>(x>>>0))&A;u=A&i>>>(x>>>0);v=g<<q&y;w=(i<<q|g>>>(z>>>0))&y|g<<r&x-33>>31;break}if((f|0)!=0){c[f>>2]=p&g;c[f+4>>2]=0}if((j|0)==1){n=h|b&0;o=a|0|0;return(E=n,o)|0}else{p=Th(j|0)|0;n=i>>>(p>>>0)|0;o=i<<32-p|g>>>(p>>>0)|0;return(E=n,o)|0}}}while(0);if((s|0)==0){B=w;C=v;D=u;F=t;G=0;H=0}else{g=d|0|0;d=k|e&0;e=Nh(g,d,-1,-1)|0;k=E;i=w;w=v;v=u;u=t;t=s;s=0;while(1){I=w>>>31|i<<1;J=s|w<<1;j=u<<1|i>>>31|0;a=u>>>31|v<<1|0;Oh(e,k,j,a)|0;b=E;h=b>>31|((b|0)<0?-1:0)<<1;K=h&1;L=Oh(j,a,h&g,(((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1)&d)|0;M=E;b=t-1|0;if((b|0)==0){break}else{i=I;w=J;v=M;u=L;t=b;s=K}}B=I;C=J;D=M;F=L;G=0;H=K}K=C;C=0;if((f|0)!=0){c[f>>2]=F;c[f+4>>2]=D}n=(K|0)>>>31|(B|C)<<1|(C<<1|K>>>31)&0|G;o=(K<<1|0>>>31)&-2|H;return(E=n,o)|0}function $h(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;Bb[a&15](b|0,c|0,d|0,e|0,f|0)}function ai(a){a=a|0;Cb[a&3]()}function bi(a){a=a|0;return Db[a&15]()|0}function ci(a,b){a=a|0;b=b|0;Eb[a&1](b|0)}function di(a,b,c){a=a|0;b=b|0;c=c|0;Fb[a&3](b|0,c|0)}function ei(a,b){a=a|0;b=b|0;return Gb[a&3](b|0)|0}function fi(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;Hb[a&1](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0)}function gi(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return Ib[a&63](b|0,c|0,d|0,e|0)|0}function hi(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;Jb[a&1](b|0,c|0,d|0,e|0,f|0,g|0)}function ii(a,b,c){a=a|0;b=b|0;c=c|0;return Kb[a&15](b|0,c|0)|0}function ji(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return Lb[a&15](b|0,c|0,d|0,e|0,f|0)|0}function ki(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;Mb[a&1](b|0,c|0,d|0,e|0)}function li(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ba(0)}function mi(){ba(1)}function ni(){ba(2);return 0}function oi(a){a=a|0;ba(3)}function pi(a,b){a=a|0;b=b|0;ba(4)}function qi(a){a=a|0;ba(5);return 0}function ri(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;ba(6)}function si(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ba(7);return 0}function ti(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;ba(8)}function ui(a,b){a=a|0;b=b|0;ba(9);return 0}function vi(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ba(10);return 0}function wi(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ba(11)}




// EMSCRIPTEN_END_FUNCS
var Bb=[li,li,ph,li,rh,li,sh,li,qh,li,li,li,li,li,li,li];var Cb=[mi,mi,Qg,mi];var Db=[ni,ni,Vg,ni,yg,ni,Sg,ni,Rg,ni,ni,ni,ni,ni,ni,ni];var Eb=[oi,oi];var Fb=[pi,pi,Tg,pi];var Gb=[qi,qi,Ug,qi];var Hb=[ri,ri];var Ib=[si,si,Vd,si,Md,si,Nd,si,Od,si,uf,si,Kc,si,ng,si,Gc,si,sf,si,ag,si,tf,si,Vf,si,$f,si,Wd,si,Fe,si,pg,si,Jd,si,Ee,si,_c,si,Kd,si,Ld,si,og,si,si,si,si,si,si,si,si,si,si,si,si,si,si,si,si,si,si,si];var Jb=[ti,ti];var Kb=[ui,ui,tg,ui,Qe,ui,Zc,ui,cg,ui,ui,ui,ui,ui,ui,ui];var Lb=[vi,vi,zg,vi,He,vi,Ge,vi,xg,vi,qg,vi,vi,vi,vi,vi];var Mb=[wi,wi];return{_getId:wh,_memcmp:Mh,_strlen:Lh,_update:th,_free:Eh,_cleanup:xh,_realloc:Gh,_setup:uh,_memset:Jh,_addContact:yh,_malloc:Dh,_bootstrap:vh,_memcpy:Kh,_sendMessage:Ah,_setName:Bh,_getName:Ch,_calloc:Fh,_removeContact:zh,runPostSets:bc,stackAlloc:Nb,stackSave:Ob,stackRestore:Pb,setThrew:Qb,setTempRet0:Tb,setTempRet1:Ub,setTempRet2:Vb,setTempRet3:Wb,setTempRet4:Xb,setTempRet5:Yb,setTempRet6:Zb,setTempRet7:_b,setTempRet8:$b,setTempRet9:ac,dynCall_viiiii:$h,dynCall_v:ai,dynCall_i:bi,dynCall_vi:ci,dynCall_vii:di,dynCall_ii:ei,dynCall_viiiiiiii:fi,dynCall_iiiii:gi,dynCall_viiiiii:hi,dynCall_iii:ii,dynCall_iiiiii:ji,dynCall_viiii:ki}})


// EMSCRIPTEN_END_ASM
({ "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array }, { "abort": abort, "assert": assert, "asmPrintInt": asmPrintInt, "asmPrintFloat": asmPrintFloat, "min": Math_min, "invoke_viiiii": invoke_viiiii, "invoke_v": invoke_v, "invoke_i": invoke_i, "invoke_vi": invoke_vi, "invoke_vii": invoke_vii, "invoke_ii": invoke_ii, "invoke_viiiiiiii": invoke_viiiiiiii, "invoke_iiiii": invoke_iiiii, "invoke_viiiiii": invoke_viiiiii, "invoke_iii": invoke_iii, "invoke_iiiiii": invoke_iiiiii, "invoke_viiii": invoke_viiii, "_llvm_lifetime_end": _llvm_lifetime_end, "_rand": _rand, "_getaddrinfo": _getaddrinfo, "_htonl": _htonl, "___assert_fail": ___assert_fail, "__scanString": __scanString, "__inet_pton4_raw": __inet_pton4_raw, "_inet_pton": _inet_pton, "__getFloat": __getFloat, "_freeaddrinfo": _freeaddrinfo, "_fprintf": _fprintf, "__read_sockaddr": __read_sockaddr, "_close": _close, "_fflush": _fflush, "_htons": _htons, "__reallyNegative": __reallyNegative, "__write_sockaddr": __write_sockaddr, "_select": _select, "_access": _access, "_emscripten_asm_const": _emscripten_asm_const, "_llvm_stackrestore": _llvm_stackrestore, "_open": _open, "___setErrNo": ___setErrNo, "_fwrite": _fwrite, "__inet_ntop4": __inet_ntop4, "_qsort": _qsort, "_send": _send, "_write": _write, "_inet_ntop": _inet_ntop, "__inet_pton6_raw": __inet_pton6_raw, "_sprintf": _sprintf, "_fcntl": _fcntl, "_sysconf": _sysconf, "_srand": _srand, "__inet_ntop4_raw": __inet_ntop4_raw, "_read": _read, "__inet_ntop6_raw": __inet_ntop6_raw, "__formatString": __formatString, "_gettimeofday": _gettimeofday, "__inet_ntop6": __inet_ntop6, "_strncmp": _strncmp, "__inet_pton6": __inet_pton6, "_setsockopt": _setsockopt, "__inet_pton4": __inet_pton4, "_pwrite": _pwrite, "_recv": _recv, "_socket": _socket, "_sbrk": _sbrk, "_llvm_stacksave": _llvm_stacksave, "_strerror_r": _strerror_r, "_bind": _bind, "_pread": _pread, "___errno_location": ___errno_location, "_strerror": _strerror, "_recvfrom": _recvfrom, "_llvm_lifetime_start": _llvm_lifetime_start, "_abort": _abort, "_time": _time, "_sendto": _sendto, "_sscanf": _sscanf, "_strcmp": _strcmp, "_snprintf": _snprintf, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "cttz_i8": cttz_i8, "ctlz_i8": ctlz_i8, "NaN": NaN, "Infinity": Infinity, "_stderr": _stderr }, buffer);
var _getId = Module["_getId"] = asm["_getId"];
var _memcmp = Module["_memcmp"] = asm["_memcmp"];
var _strlen = Module["_strlen"] = asm["_strlen"];
var _update = Module["_update"] = asm["_update"];
var _free = Module["_free"] = asm["_free"];
var _cleanup = Module["_cleanup"] = asm["_cleanup"];
var _realloc = Module["_realloc"] = asm["_realloc"];
var _setup = Module["_setup"] = asm["_setup"];
var _memset = Module["_memset"] = asm["_memset"];
var _addContact = Module["_addContact"] = asm["_addContact"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _bootstrap = Module["_bootstrap"] = asm["_bootstrap"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _sendMessage = Module["_sendMessage"] = asm["_sendMessage"];
var _setName = Module["_setName"] = asm["_setName"];
var _getName = Module["_getName"] = asm["_getName"];
var _calloc = Module["_calloc"] = asm["_calloc"];
var _removeContact = Module["_removeContact"] = asm["_removeContact"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var dynCall_viiiii = Module["dynCall_viiiii"] = asm["dynCall_viiiii"];
var dynCall_v = Module["dynCall_v"] = asm["dynCall_v"];
var dynCall_i = Module["dynCall_i"] = asm["dynCall_i"];
var dynCall_vi = Module["dynCall_vi"] = asm["dynCall_vi"];
var dynCall_vii = Module["dynCall_vii"] = asm["dynCall_vii"];
var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
var dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = asm["dynCall_viiiiiiii"];
var dynCall_iiiii = Module["dynCall_iiiii"] = asm["dynCall_iiiii"];
var dynCall_viiiiii = Module["dynCall_viiiiii"] = asm["dynCall_viiiiii"];
var dynCall_iii = Module["dynCall_iii"] = asm["dynCall_iii"];
var dynCall_iiiiii = Module["dynCall_iiiiii"] = asm["dynCall_iiiiii"];
var dynCall_viiii = Module["dynCall_viiii"] = asm["dynCall_viiii"];

Runtime.stackAlloc = function(size) { return asm['stackAlloc'](size) };
Runtime.stackSave = function() { return asm['stackSave']() };
Runtime.stackRestore = function(top) { asm['stackRestore'](top) };

// TODO: strip out parts of this we do not need

//======= begin closure i64 code =======

// Copyright 2009 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Defines a Long class for representing a 64-bit two's-complement
 * integer value, which faithfully simulates the behavior of a Java "long". This
 * implementation is derived from LongLib in GWT.
 *
 */

var i64Math = (function() { // Emscripten wrapper
  var goog = { math: {} };


  /**
   * Constructs a 64-bit two's-complement integer, given its low and high 32-bit
   * values as *signed* integers.  See the from* functions below for more
   * convenient ways of constructing Longs.
   *
   * The internal representation of a long is the two given signed, 32-bit values.
   * We use 32-bit pieces because these are the size of integers on which
   * Javascript performs bit-operations.  For operations like addition and
   * multiplication, we split each number into 16-bit pieces, which can easily be
   * multiplied within Javascript's floating-point representation without overflow
   * or change in sign.
   *
   * In the algorithms below, we frequently reduce the negative case to the
   * positive case by negating the input(s) and then post-processing the result.
   * Note that we must ALWAYS check specially whether those values are MIN_VALUE
   * (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
   * a positive number, it overflows back into a negative).  Not handling this
   * case would often result in infinite recursion.
   *
   * @param {number} low  The low (signed) 32 bits of the long.
   * @param {number} high  The high (signed) 32 bits of the long.
   * @constructor
   */
  goog.math.Long = function(low, high) {
    /**
     * @type {number}
     * @private
     */
    this.low_ = low | 0;  // force into 32 signed bits.

    /**
     * @type {number}
     * @private
     */
    this.high_ = high | 0;  // force into 32 signed bits.
  };


  // NOTE: Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the
  // from* methods on which they depend.


  /**
   * A cache of the Long representations of small integer values.
   * @type {!Object}
   * @private
   */
  goog.math.Long.IntCache_ = {};


  /**
   * Returns a Long representing the given (32-bit) integer value.
   * @param {number} value The 32-bit integer in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromInt = function(value) {
    if (-128 <= value && value < 128) {
      var cachedObj = goog.math.Long.IntCache_[value];
      if (cachedObj) {
        return cachedObj;
      }
    }

    var obj = new goog.math.Long(value | 0, value < 0 ? -1 : 0);
    if (-128 <= value && value < 128) {
      goog.math.Long.IntCache_[value] = obj;
    }
    return obj;
  };


  /**
   * Returns a Long representing the given value, provided that it is a finite
   * number.  Otherwise, zero is returned.
   * @param {number} value The number in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromNumber = function(value) {
    if (isNaN(value) || !isFinite(value)) {
      return goog.math.Long.ZERO;
    } else if (value <= -goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MIN_VALUE;
    } else if (value + 1 >= goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MAX_VALUE;
    } else if (value < 0) {
      return goog.math.Long.fromNumber(-value).negate();
    } else {
      return new goog.math.Long(
          (value % goog.math.Long.TWO_PWR_32_DBL_) | 0,
          (value / goog.math.Long.TWO_PWR_32_DBL_) | 0);
    }
  };


  /**
   * Returns a Long representing the 64-bit integer that comes by concatenating
   * the given high and low bits.  Each is assumed to use 32 bits.
   * @param {number} lowBits The low 32-bits.
   * @param {number} highBits The high 32-bits.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromBits = function(lowBits, highBits) {
    return new goog.math.Long(lowBits, highBits);
  };


  /**
   * Returns a Long representation of the given string, written using the given
   * radix.
   * @param {string} str The textual representation of the Long.
   * @param {number=} opt_radix The radix in which the text is written.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromString = function(str, opt_radix) {
    if (str.length == 0) {
      throw Error('number format error: empty string');
    }

    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }

    if (str.charAt(0) == '-') {
      return goog.math.Long.fromString(str.substring(1), radix).negate();
    } else if (str.indexOf('-') >= 0) {
      throw Error('number format error: interior "-" character: ' + str);
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 8));

    var result = goog.math.Long.ZERO;
    for (var i = 0; i < str.length; i += 8) {
      var size = Math.min(8, str.length - i);
      var value = parseInt(str.substring(i, i + size), radix);
      if (size < 8) {
        var power = goog.math.Long.fromNumber(Math.pow(radix, size));
        result = result.multiply(power).add(goog.math.Long.fromNumber(value));
      } else {
        result = result.multiply(radixToPower);
        result = result.add(goog.math.Long.fromNumber(value));
      }
    }
    return result;
  };


  // NOTE: the compiler should inline these constant values below and then remove
  // these variables, so there should be no runtime penalty for these.


  /**
   * Number used repeated below in calculations.  This must appear before the
   * first call to any from* function below.
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_16_DBL_ = 1 << 16;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_32_DBL_ =
      goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_31_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ / 2;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_48_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_64_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_63_DBL_ =
      goog.math.Long.TWO_PWR_64_DBL_ / 2;


  /** @type {!goog.math.Long} */
  goog.math.Long.ZERO = goog.math.Long.fromInt(0);


  /** @type {!goog.math.Long} */
  goog.math.Long.ONE = goog.math.Long.fromInt(1);


  /** @type {!goog.math.Long} */
  goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1);


  /** @type {!goog.math.Long} */
  goog.math.Long.MAX_VALUE =
      goog.math.Long.fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0);


  /** @type {!goog.math.Long} */
  goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, 0x80000000 | 0);


  /**
   * @type {!goog.math.Long}
   * @private
   */
  goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24);


  /** @return {number} The value, assuming it is a 32-bit integer. */
  goog.math.Long.prototype.toInt = function() {
    return this.low_;
  };


  /** @return {number} The closest floating-point representation to this value. */
  goog.math.Long.prototype.toNumber = function() {
    return this.high_ * goog.math.Long.TWO_PWR_32_DBL_ +
           this.getLowBitsUnsigned();
  };


  /**
   * @param {number=} opt_radix The radix in which the text should be written.
   * @return {string} The textual representation of this value.
   */
  goog.math.Long.prototype.toString = function(opt_radix) {
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }

    if (this.isZero()) {
      return '0';
    }

    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        // We need to change the Long value before it can be negated, so we remove
        // the bottom-most digit in this base and then recurse to do the rest.
        var radixLong = goog.math.Long.fromNumber(radix);
        var div = this.div(radixLong);
        var rem = div.multiply(radixLong).subtract(this);
        return div.toString(radix) + rem.toInt().toString(radix);
      } else {
        return '-' + this.negate().toString(radix);
      }
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 6));

    var rem = this;
    var result = '';
    while (true) {
      var remDiv = rem.div(radixToPower);
      var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
      var digits = intval.toString(radix);

      rem = remDiv;
      if (rem.isZero()) {
        return digits + result;
      } else {
        while (digits.length < 6) {
          digits = '0' + digits;
        }
        result = '' + digits + result;
      }
    }
  };


  /** @return {number} The high 32-bits as a signed value. */
  goog.math.Long.prototype.getHighBits = function() {
    return this.high_;
  };


  /** @return {number} The low 32-bits as a signed value. */
  goog.math.Long.prototype.getLowBits = function() {
    return this.low_;
  };


  /** @return {number} The low 32-bits as an unsigned value. */
  goog.math.Long.prototype.getLowBitsUnsigned = function() {
    return (this.low_ >= 0) ?
        this.low_ : goog.math.Long.TWO_PWR_32_DBL_ + this.low_;
  };


  /**
   * @return {number} Returns the number of bits needed to represent the absolute
   *     value of this Long.
   */
  goog.math.Long.prototype.getNumBitsAbs = function() {
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        return 64;
      } else {
        return this.negate().getNumBitsAbs();
      }
    } else {
      var val = this.high_ != 0 ? this.high_ : this.low_;
      for (var bit = 31; bit > 0; bit--) {
        if ((val & (1 << bit)) != 0) {
          break;
        }
      }
      return this.high_ != 0 ? bit + 33 : bit + 1;
    }
  };


  /** @return {boolean} Whether this value is zero. */
  goog.math.Long.prototype.isZero = function() {
    return this.high_ == 0 && this.low_ == 0;
  };


  /** @return {boolean} Whether this value is negative. */
  goog.math.Long.prototype.isNegative = function() {
    return this.high_ < 0;
  };


  /** @return {boolean} Whether this value is odd. */
  goog.math.Long.prototype.isOdd = function() {
    return (this.low_ & 1) == 1;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long equals the other.
   */
  goog.math.Long.prototype.equals = function(other) {
    return (this.high_ == other.high_) && (this.low_ == other.low_);
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long does not equal the other.
   */
  goog.math.Long.prototype.notEquals = function(other) {
    return (this.high_ != other.high_) || (this.low_ != other.low_);
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than the other.
   */
  goog.math.Long.prototype.lessThan = function(other) {
    return this.compare(other) < 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than or equal to the other.
   */
  goog.math.Long.prototype.lessThanOrEqual = function(other) {
    return this.compare(other) <= 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than the other.
   */
  goog.math.Long.prototype.greaterThan = function(other) {
    return this.compare(other) > 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than or equal to the other.
   */
  goog.math.Long.prototype.greaterThanOrEqual = function(other) {
    return this.compare(other) >= 0;
  };


  /**
   * Compares this Long with the given one.
   * @param {goog.math.Long} other Long to compare against.
   * @return {number} 0 if they are the same, 1 if the this is greater, and -1
   *     if the given one is greater.
   */
  goog.math.Long.prototype.compare = function(other) {
    if (this.equals(other)) {
      return 0;
    }

    var thisNeg = this.isNegative();
    var otherNeg = other.isNegative();
    if (thisNeg && !otherNeg) {
      return -1;
    }
    if (!thisNeg && otherNeg) {
      return 1;
    }

    // at this point, the signs are the same, so subtraction will not overflow
    if (this.subtract(other).isNegative()) {
      return -1;
    } else {
      return 1;
    }
  };


  /** @return {!goog.math.Long} The negation of this value. */
  goog.math.Long.prototype.negate = function() {
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.MIN_VALUE;
    } else {
      return this.not().add(goog.math.Long.ONE);
    }
  };


  /**
   * Returns the sum of this and the given Long.
   * @param {goog.math.Long} other Long to add to this one.
   * @return {!goog.math.Long} The sum of this and the given Long.
   */
  goog.math.Long.prototype.add = function(other) {
    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;

    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };


  /**
   * Returns the difference of this and the given Long.
   * @param {goog.math.Long} other Long to subtract from this.
   * @return {!goog.math.Long} The difference of this and the given Long.
   */
  goog.math.Long.prototype.subtract = function(other) {
    return this.add(other.negate());
  };


  /**
   * Returns the product of this and the given long.
   * @param {goog.math.Long} other Long to multiply with this.
   * @return {!goog.math.Long} The product of this and the other.
   */
  goog.math.Long.prototype.multiply = function(other) {
    if (this.isZero()) {
      return goog.math.Long.ZERO;
    } else if (other.isZero()) {
      return goog.math.Long.ZERO;
    }

    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return other.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    }

    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().multiply(other.negate());
      } else {
        return this.negate().multiply(other).negate();
      }
    } else if (other.isNegative()) {
      return this.multiply(other.negate()).negate();
    }

    // If both longs are small, use float multiplication
    if (this.lessThan(goog.math.Long.TWO_PWR_24_) &&
        other.lessThan(goog.math.Long.TWO_PWR_24_)) {
      return goog.math.Long.fromNumber(this.toNumber() * other.toNumber());
    }

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;

    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };


  /**
   * Returns this Long divided by the given one.
   * @param {goog.math.Long} other Long by which to divide.
   * @return {!goog.math.Long} This Long divided by the given one.
   */
  goog.math.Long.prototype.div = function(other) {
    if (other.isZero()) {
      throw Error('division by zero');
    } else if (this.isZero()) {
      return goog.math.Long.ZERO;
    }

    if (this.equals(goog.math.Long.MIN_VALUE)) {
      if (other.equals(goog.math.Long.ONE) ||
          other.equals(goog.math.Long.NEG_ONE)) {
        return goog.math.Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
      } else if (other.equals(goog.math.Long.MIN_VALUE)) {
        return goog.math.Long.ONE;
      } else {
        // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
        var halfThis = this.shiftRight(1);
        var approx = halfThis.div(other).shiftLeft(1);
        if (approx.equals(goog.math.Long.ZERO)) {
          return other.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
        } else {
          var rem = this.subtract(other.multiply(approx));
          var result = approx.add(rem.div(other));
          return result;
        }
      }
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.ZERO;
    }

    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().div(other.negate());
      } else {
        return this.negate().div(other).negate();
      }
    } else if (other.isNegative()) {
      return this.div(other.negate()).negate();
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    var res = goog.math.Long.ZERO;
    var rem = this;
    while (rem.greaterThanOrEqual(other)) {
      // Approximate the result of division. This may be a little greater or
      // smaller than the actual value.
      var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));

      // We will tweak the approximate result by changing it in the 48-th digit or
      // the smallest non-fractional digit, whichever is larger.
      var log2 = Math.ceil(Math.log(approx) / Math.LN2);
      var delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48);

      // Decrease the approximation until it is smaller than the remainder.  Note
      // that if it is too large, the product overflows and is negative.
      var approxRes = goog.math.Long.fromNumber(approx);
      var approxRem = approxRes.multiply(other);
      while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
        approx -= delta;
        approxRes = goog.math.Long.fromNumber(approx);
        approxRem = approxRes.multiply(other);
      }

      // We know the answer can't be zero... and actually, zero would cause
      // infinite recursion since we would make no progress.
      if (approxRes.isZero()) {
        approxRes = goog.math.Long.ONE;
      }

      res = res.add(approxRes);
      rem = rem.subtract(approxRem);
    }
    return res;
  };


  /**
   * Returns this Long modulo the given one.
   * @param {goog.math.Long} other Long by which to mod.
   * @return {!goog.math.Long} This Long modulo the given one.
   */
  goog.math.Long.prototype.modulo = function(other) {
    return this.subtract(this.div(other).multiply(other));
  };


  /** @return {!goog.math.Long} The bitwise-NOT of this value. */
  goog.math.Long.prototype.not = function() {
    return goog.math.Long.fromBits(~this.low_, ~this.high_);
  };


  /**
   * Returns the bitwise-AND of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to AND.
   * @return {!goog.math.Long} The bitwise-AND of this and the other.
   */
  goog.math.Long.prototype.and = function(other) {
    return goog.math.Long.fromBits(this.low_ & other.low_,
                                   this.high_ & other.high_);
  };


  /**
   * Returns the bitwise-OR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to OR.
   * @return {!goog.math.Long} The bitwise-OR of this and the other.
   */
  goog.math.Long.prototype.or = function(other) {
    return goog.math.Long.fromBits(this.low_ | other.low_,
                                   this.high_ | other.high_);
  };


  /**
   * Returns the bitwise-XOR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to XOR.
   * @return {!goog.math.Long} The bitwise-XOR of this and the other.
   */
  goog.math.Long.prototype.xor = function(other) {
    return goog.math.Long.fromBits(this.low_ ^ other.low_,
                                   this.high_ ^ other.high_);
  };


  /**
   * Returns this Long with bits shifted to the left by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the left by the given amount.
   */
  goog.math.Long.prototype.shiftLeft = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var low = this.low_;
      if (numBits < 32) {
        var high = this.high_;
        return goog.math.Long.fromBits(
            low << numBits,
            (high << numBits) | (low >>> (32 - numBits)));
      } else {
        return goog.math.Long.fromBits(0, low << (numBits - 32));
      }
    }
  };


  /**
   * Returns this Long with bits shifted to the right by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount.
   */
  goog.math.Long.prototype.shiftRight = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >> numBits);
      } else {
        return goog.math.Long.fromBits(
            high >> (numBits - 32),
            high >= 0 ? 0 : -1);
      }
    }
  };


  /**
   * Returns this Long with bits shifted to the right by the given amount, with
   * the new top bits matching the current sign bit.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount, with
   *     zeros placed into the new leading bits.
   */
  goog.math.Long.prototype.shiftRightUnsigned = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >>> numBits);
      } else if (numBits == 32) {
        return goog.math.Long.fromBits(high, 0);
      } else {
        return goog.math.Long.fromBits(high >>> (numBits - 32), 0);
      }
    }
  };

  //======= begin jsbn =======

  var navigator = { appName: 'Modern Browser' }; // polyfill a little

  // Copyright (c) 2005  Tom Wu
  // All Rights Reserved.
  // http://www-cs-students.stanford.edu/~tjw/jsbn/

  /*
   * Copyright (c) 2003-2005  Tom Wu
   * All Rights Reserved.
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
   * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
   * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
   *
   * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
   * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
   * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
   * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
   * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * In addition, the following condition applies:
   *
   * All redistributions must retain an intact copy of this copyright notice
   * and disclaimer.
   */

  // Basic JavaScript BN library - subset useful for RSA encryption.

  // Bits per digit
  var dbits;

  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = ((canary&0xffffff)==0xefcafe);

  // (public) Constructor
  function BigInteger(a,b,c) {
    if(a != null)
      if("number" == typeof a) this.fromNumber(a,b,c);
      else if(b == null && "string" != typeof a) this.fromString(a,256);
      else this.fromString(a,b);
  }

  // return new, unset BigInteger
  function nbi() { return new BigInteger(null); }

  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.

  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i,x,w,j,c,n) {
    while(--n >= 0) {
      var v = x*this[i++]+w[j]+c;
      c = Math.floor(v/0x4000000);
      w[j++] = v&0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i,x,w,j,c,n) {
    var xl = x&0x7fff, xh = x>>15;
    while(--n >= 0) {
      var l = this[i]&0x7fff;
      var h = this[i++]>>15;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
      c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
      w[j++] = l&0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i,x,w,j,c,n) {
    var xl = x&0x3fff, xh = x>>14;
    while(--n >= 0) {
      var l = this[i]&0x3fff;
      var h = this[i++]>>14;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x3fff)<<14)+w[j]+c;
      c = (l>>28)+(m>>14)+xh*h;
      w[j++] = l&0xfffffff;
    }
    return c;
  }
  if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
  }
  else if(j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
  }
  else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }

  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = ((1<<dbits)-1);
  BigInteger.prototype.DV = (1<<dbits);

  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2,BI_FP);
  BigInteger.prototype.F1 = BI_FP-dbits;
  BigInteger.prototype.F2 = 2*dbits-BI_FP;

  // Digit conversions
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = new Array();
  var rr,vv;
  rr = "0".charCodeAt(0);
  for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
  rr = "a".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  rr = "A".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

  function int2char(n) { return BI_RM.charAt(n); }
  function intAt(s,i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c==null)?-1:c;
  }

  // (protected) copy this to r
  function bnpCopyTo(r) {
    for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
  }

  // (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt(x) {
    this.t = 1;
    this.s = (x<0)?-1:0;
    if(x > 0) this[0] = x;
    else if(x < -1) this[0] = x+DV;
    else this.t = 0;
  }

  // return bigint initialized to value
  function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

  // (protected) set from string and radix
  function bnpFromString(s,b) {
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 256) k = 8; // byte array
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else { this.fromRadix(s,b); return; }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while(--i >= 0) {
      var x = (k==8)?s[i]&0xff:intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if(sh == 0)
        this[this.t++] = x;
      else if(sh+k > this.DB) {
        this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
        this[this.t++] = (x>>(this.DB-sh));
      }
      else
        this[this.t-1] |= x<<sh;
      sh += k;
      if(sh >= this.DB) sh -= this.DB;
    }
    if(k == 8 && (s[0]&0x80) != 0) {
      this.s = -1;
      if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
    }
    this.clamp();
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

  // (protected) clamp off excess high words
  function bnpClamp() {
    var c = this.s&this.DM;
    while(this.t > 0 && this[this.t-1] == c) --this.t;
  }

  // (public) return string representation in given radix
  function bnToString(b) {
    if(this.s < 0) return "-"+this.negate().toString(b);
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else return this.toRadix(b);
    var km = (1<<k)-1, d, m = false, r = "", i = this.t;
    var p = this.DB-(i*this.DB)%k;
    if(i-- > 0) {
      if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
      while(i >= 0) {
        if(p < k) {
          d = (this[i]&((1<<p)-1))<<(k-p);
          d |= this[--i]>>(p+=this.DB-k);
        }
        else {
          d = (this[i]>>(p-=k))&km;
          if(p <= 0) { p += this.DB; --i; }
        }
        if(d > 0) m = true;
        if(m) r += int2char(d);
      }
    }
    return m?r:"0";
  }

  // (public) -this
  function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

  // (public) |this|
  function bnAbs() { return (this.s<0)?this.negate():this; }

  // (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo(a) {
    var r = this.s-a.s;
    if(r != 0) return r;
    var i = this.t;
    r = i-a.t;
    if(r != 0) return (this.s<0)?-r:r;
    while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
    return 0;
  }

  // returns bit length of the integer x
  function nbits(x) {
    var r = 1, t;
    if((t=x>>>16) != 0) { x = t; r += 16; }
    if((t=x>>8) != 0) { x = t; r += 8; }
    if((t=x>>4) != 0) { x = t; r += 4; }
    if((t=x>>2) != 0) { x = t; r += 2; }
    if((t=x>>1) != 0) { x = t; r += 1; }
    return r;
  }

  // (public) return the number of bits in "this"
  function bnBitLength() {
    if(this.t <= 0) return 0;
    return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
  }

  // (protected) r = this << n*DB
  function bnpDLShiftTo(n,r) {
    var i;
    for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
    for(i = n-1; i >= 0; --i) r[i] = 0;
    r.t = this.t+n;
    r.s = this.s;
  }

  // (protected) r = this >> n*DB
  function bnpDRShiftTo(n,r) {
    for(var i = n; i < this.t; ++i) r[i-n] = this[i];
    r.t = Math.max(this.t-n,0);
    r.s = this.s;
  }

  // (protected) r = this << n
  function bnpLShiftTo(n,r) {
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<cbs)-1;
    var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
    for(i = this.t-1; i >= 0; --i) {
      r[i+ds+1] = (this[i]>>cbs)|c;
      c = (this[i]&bm)<<bs;
    }
    for(i = ds-1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t+ds+1;
    r.s = this.s;
    r.clamp();
  }

  // (protected) r = this >> n
  function bnpRShiftTo(n,r) {
    r.s = this.s;
    var ds = Math.floor(n/this.DB);
    if(ds >= this.t) { r.t = 0; return; }
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<bs)-1;
    r[0] = this[ds]>>bs;
    for(var i = ds+1; i < this.t; ++i) {
      r[i-ds-1] |= (this[i]&bm)<<cbs;
      r[i-ds] = this[i]>>bs;
    }
    if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
    r.t = this.t-ds;
    r.clamp();
  }

  // (protected) r = this - a
  function bnpSubTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]-a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c -= a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c -= a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = (c<0)?-1:0;
    if(c < -1) r[i++] = this.DV+c;
    else if(c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }

  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  function bnpMultiplyTo(a,r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i+y.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
    r.s = 0;
    r.clamp();
    if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
  }

  // (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2*x.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < x.t-1; ++i) {
      var c = x.am(i,x[i],r,2*i,0,1);
      if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
        r[i+x.t] -= x.DV;
        r[i+x.t+1] = 1;
      }
    }
    if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
    r.s = 0;
    r.clamp();
  }

  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  function bnpDivRemTo(m,q,r) {
    var pm = m.abs();
    if(pm.t <= 0) return;
    var pt = this.abs();
    if(pt.t < pm.t) {
      if(q != null) q.fromInt(0);
      if(r != null) this.copyTo(r);
      return;
    }
    if(r == null) r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
    if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
    else { pm.copyTo(y); pt.copyTo(r); }
    var ys = y.t;
    var y0 = y[ys-1];
    if(y0 == 0) return;
    var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
    var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
    var i = r.t, j = i-ys, t = (q==null)?nbi():q;
    y.dlShiftTo(j,t);
    if(r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t,r);
    }
    BigInteger.ONE.dlShiftTo(ys,t);
    t.subTo(y,y);	// "negative" y so we can replace sub with am later
    while(y.t < ys) y[y.t++] = 0;
    while(--j >= 0) {
      // Estimate quotient digit
      var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
      if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
        y.dlShiftTo(j,t);
        r.subTo(t,r);
        while(r[i] < --qd) r.subTo(t,r);
      }
    }
    if(q != null) {
      r.drShiftTo(ys,q);
      if(ts != ms) BigInteger.ZERO.subTo(q,q);
    }
    r.t = ys;
    r.clamp();
    if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
    if(ts < 0) BigInteger.ZERO.subTo(r,r);
  }

  // (public) this mod a
  function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a,null,r);
    if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
    return r;
  }

  // Modular reduction using "classic" algorithm
  function Classic(m) { this.m = m; }
  function cConvert(x) {
    if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
    else return x;
  }
  function cRevert(x) { return x; }
  function cReduce(x) { x.divRemTo(this.m,null,x); }
  function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;

  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  function bnpInvDigit() {
    if(this.t < 1) return 0;
    var x = this[0];
    if((x&1) == 0) return 0;
    var y = x&3;		// y == 1/x mod 2^2
    y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
    y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
    y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y>0)?this.DV-y:-y;
  }

  // Montgomery reduction
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp&0x7fff;
    this.mph = this.mp>>15;
    this.um = (1<<(m.DB-15))-1;
    this.mt2 = 2*m.t;
  }

  // xR mod m
  function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t,r);
    r.divRemTo(this.m,null,r);
    if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
    return r;
  }

  // x/R mod m
  function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }

  // x = x/R mod m (HAC 14.32)
  function montReduce(x) {
    while(x.t <= this.mt2)	// pad x so am has enough room later
      x[x.t++] = 0;
    for(var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i]&0x7fff;
      var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i+this.m.t;
      x[j] += this.m.am(0,u0,x,i,0,this.m.t);
      // propagate carry
      while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
    }
    x.clamp();
    x.drShiftTo(this.m.t,x);
    if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
  }

  // r = "x^2/R mod m"; x != r
  function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

  // r = "xy/R mod m"; x,y != r
  function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;

  // (protected) true iff this is even
  function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp(e,z) {
    if(e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
    g.copyTo(r);
    while(--i >= 0) {
      z.sqrTo(r,r2);
      if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
      else { var t = r; r = r2; r2 = t; }
    }
    return z.revert(r);
  }

  // (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt(e,m) {
    var z;
    if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
    return this.exp(e,z);
  }

  // protected
  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;

  // public
  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;

  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);

  // jsbn2 stuff

  // (protected) convert from radix string
  function bnpFromRadix(s,b) {
    this.fromInt(0);
    if(b == null) b = 10;
    var cs = this.chunkSize(b);
    var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
    for(var i = 0; i < s.length; ++i) {
      var x = intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
        continue;
      }
      w = b*w+x;
      if(++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w,0);
        j = 0;
        w = 0;
      }
    }
    if(j > 0) {
      this.dMultiply(Math.pow(b,j));
      this.dAddOffset(w,0);
    }
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

  // (protected) return x s.t. r^x < DV
  function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

  // (public) 0 if this == 0, 1 if this > 0
  function bnSigNum() {
    if(this.s < 0) return -1;
    else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
    else return 1;
  }

  // (protected) this *= n, this >= 0, 1 < n < DV
  function bnpDMultiply(n) {
    this[this.t] = this.am(0,n-1,this,0,0,this.t);
    ++this.t;
    this.clamp();
  }

  // (protected) this += n << w words, this >= 0
  function bnpDAddOffset(n,w) {
    if(n == 0) return;
    while(this.t <= w) this[this.t++] = 0;
    this[w] += n;
    while(this[w] >= this.DV) {
      this[w] -= this.DV;
      if(++w >= this.t) this[this.t++] = 0;
      ++this[w];
    }
  }

  // (protected) convert to radix string
  function bnpToRadix(b) {
    if(b == null) b = 10;
    if(this.signum() == 0 || b < 2 || b > 36) return "0";
    var cs = this.chunkSize(b);
    var a = Math.pow(b,cs);
    var d = nbv(a), y = nbi(), z = nbi(), r = "";
    this.divRemTo(d,y,z);
    while(y.signum() > 0) {
      r = (a+z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d,y,z);
    }
    return z.intValue().toString(b) + r;
  }

  // (public) return value as integer
  function bnIntValue() {
    if(this.s < 0) {
      if(this.t == 1) return this[0]-this.DV;
      else if(this.t == 0) return -1;
    }
    else if(this.t == 1) return this[0];
    else if(this.t == 0) return 0;
    // assumes 16 < DB < 32
    return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
  }

  // (protected) r = this + a
  function bnpAddTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]+a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c += a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c += a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = (c<0)?-1:0;
    if(c > 0) r[i++] = c;
    else if(c < -1) r[i++] = this.DV+c;
    r.t = i;
    r.clamp();
  }

  BigInteger.prototype.fromRadix = bnpFromRadix;
  BigInteger.prototype.chunkSize = bnpChunkSize;
  BigInteger.prototype.signum = bnSigNum;
  BigInteger.prototype.dMultiply = bnpDMultiply;
  BigInteger.prototype.dAddOffset = bnpDAddOffset;
  BigInteger.prototype.toRadix = bnpToRadix;
  BigInteger.prototype.intValue = bnIntValue;
  BigInteger.prototype.addTo = bnpAddTo;

  //======= end jsbn =======

  // Emscripten wrapper
  var Wrapper = {
    abs: function(l, h) {
      var x = new goog.math.Long(l, h);
      var ret;
      if (x.isNegative()) {
        ret = x.negate();
      } else {
        ret = x;
      }
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
    },
    ensureTemps: function() {
      if (Wrapper.ensuredTemps) return;
      Wrapper.ensuredTemps = true;
      Wrapper.two32 = new BigInteger();
      Wrapper.two32.fromString('4294967296', 10);
      Wrapper.two64 = new BigInteger();
      Wrapper.two64.fromString('18446744073709551616', 10);
      Wrapper.temp1 = new BigInteger();
      Wrapper.temp2 = new BigInteger();
    },
    lh2bignum: function(l, h) {
      var a = new BigInteger();
      a.fromString(h.toString(), 10);
      var b = new BigInteger();
      a.multiplyTo(Wrapper.two32, b);
      var c = new BigInteger();
      c.fromString(l.toString(), 10);
      var d = new BigInteger();
      c.addTo(b, d);
      return d;
    },
    stringify: function(l, h, unsigned) {
      var ret = new goog.math.Long(l, h).toString();
      if (unsigned && ret[0] == '-') {
        // unsign slowly using jsbn bignums
        Wrapper.ensureTemps();
        var bignum = new BigInteger();
        bignum.fromString(ret, 10);
        ret = new BigInteger();
        Wrapper.two64.addTo(bignum, ret);
        ret = ret.toString(10);
      }
      return ret;
    },
    fromString: function(str, base, min, max, unsigned) {
      Wrapper.ensureTemps();
      var bignum = new BigInteger();
      bignum.fromString(str, base);
      var bigmin = new BigInteger();
      bigmin.fromString(min, 10);
      var bigmax = new BigInteger();
      bigmax.fromString(max, 10);
      if (unsigned && bignum.compareTo(BigInteger.ZERO) < 0) {
        var temp = new BigInteger();
        bignum.addTo(Wrapper.two64, temp);
        bignum = temp;
      }
      var error = false;
      if (bignum.compareTo(bigmin) < 0) {
        bignum = bigmin;
        error = true;
      } else if (bignum.compareTo(bigmax) > 0) {
        bignum = bigmax;
        error = true;
      }
      var ret = goog.math.Long.fromString(bignum.toString()); // min-max checks should have clamped this to a range goog.math.Long can handle well
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
      if (error) throw 'range error';
    }
  };
  return Wrapper;
})();

//======= end closure i64 code =======



// === Auto-generated postamble setup entry stuff ===

if (memoryInitializer) {
  function applyData(data) {
    HEAPU8.set(data, STATIC_BASE);
  }
  if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
    applyData(Module['readBinary'](memoryInitializer));
  } else {
    addRunDependency('memory initializer');
    Browser.asyncLoad(memoryInitializer, function(data) {
      applyData(data);
      removeRunDependency('memory initializer');
    }, function(data) {
      throw 'could not load memory initializer ' + memoryInitializer;
    });
  }
}

function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;

var initialStackTop;
var preloadStartTime = null;
var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun'] && shouldRunNow) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}

Module['callMain'] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  args = args || [];

  if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
    Module.printErr('preload time: ' + (Date.now() - preloadStartTime) + ' ms');
  }

  ensureInitRuntime();

  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);

  initialStackTop = STACKTOP;

  try {

    var ret = Module['_main'](argc, argv, 0);


    // if we're not running an evented main loop, it's time to exit
    if (!Module['noExitRuntime']) {
      exit(ret);
    }
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
      throw e;
    }
  } finally {
    calledMain = true;
  }
}




function run(args) {
  args = args || Module['arguments'];

  if (preloadStartTime === null) preloadStartTime = Date.now();

  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return;
  }

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
  if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

  function doRun() {
    if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
    Module['calledRun'] = true;

    ensureInitRuntime();

    preMain();

    if (Module['_main'] && shouldRunNow) {
      Module['callMain'](args);
    }

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      if (!ABORT) doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module['run'] = Module.run = run;

function exit(status) {
  ABORT = true;
  EXITSTATUS = status;
  STACKTOP = initialStackTop;

  // exit the runtime
  exitRuntime();

  // TODO We should handle this differently based on environment.
  // In the browser, the best we can do is throw an exception
  // to halt execution, but in node we could process.exit and
  // I'd imagine SM shell would have something equivalent.
  // This would let us set a proper exit status (which
  // would be great for checking test exit statuses).
  // https://github.com/kripken/emscripten/issues/1371

  // throw an exception to halt the current execution
  throw new ExitStatus(status);
}
Module['exit'] = Module.exit = exit;

function abort(text) {
  if (text) {
    Module.print(text);
    Module.printErr(text);
  }

  ABORT = true;
  EXITSTATUS = 1;

  throw 'abort() at ' + stackTrace();
}
Module['abort'] = Module.abort = abort;

// {{PRE_RUN_ADDITIONS}}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}

run();

// {{POST_RUN_ADDITIONS}}






// {{MODULE_ADDITIONS}}






