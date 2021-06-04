// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1yWRd":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "88c4e112751b41a35af6d0652aeafb3f";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"BvQis":[function(require,module,exports) {
var _modelJs = require("./model.js");
var _viewMapViewJs = require("./view/mapView.js");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _viewMapViewJsDefault = _parcelHelpers.interopDefault(_viewMapViewJs);
var _viewSearchViewJs = require("./view/searchView.js");
var _viewSearchViewJsDefault = _parcelHelpers.interopDefault(_viewSearchViewJs);
var _viewCurrentViewJs = require("./view/currentView.js");
var _viewCurrentViewJsDefault = _parcelHelpers.interopDefault(_viewCurrentViewJs);
var _viewHourlyViewJs = require("./view/hourlyView.js");
var _viewHourlyViewJsDefault = _parcelHelpers.interopDefault(_viewHourlyViewJs);
var _viewFiveDayForecastViewJs = require("./view/fiveDayForecastView.js");
var _viewFiveDayForecastViewJsDefault = _parcelHelpers.interopDefault(_viewFiveDayForecastViewJs);
if (module.hot) {
  module.hot.accept(function () {
    window.location.reload();
  });
}
const displayMarker = function (latlng) {
  if (_viewMapViewJsDefault.default.marker) {
    _viewMapViewJsDefault.default.map.removeLayer(_viewMapViewJsDefault.default.marker);
  }
  _viewMapViewJsDefault.default.marker = new L.Marker(latlng).addTo(_viewMapViewJsDefault.default.map);
  _viewMapViewJsDefault.default.map.setView(latlng, 10, {
    animate: true,
    pan: {
      duration: 1
    }
  });
};
const controlWeather = async function (city) {
  try {
    // Render spinners
    _viewCurrentViewJsDefault.default.renderSpinner();
    _viewHourlyViewJsDefault.default.renderSpinner();
    _viewFiveDayForecastViewJsDefault.default.renderSpinner();
    // Get data
    await _modelJs.loadForecast(city);
    // Render data
    _viewCurrentViewJsDefault.default.render(_modelJs.state.forecast.current[0]);
    _viewHourlyViewJsDefault.default.render(_modelJs.state.forecast.hourly);
    _viewFiveDayForecastViewJsDefault.default.render(_modelJs.state.forecast.days);
    console.log(_modelJs.state.forecast.hourly);
    displayMarker(_modelJs.state.city.coord);
  } catch (err) {
    _viewCurrentViewJsDefault.default.renderError(err.message);
    _viewHourlyViewJsDefault.default.renderError(err.message);
    _viewFiveDayForecastViewJsDefault.default.renderError(err.message);
  }
};
const controlMap = async function (latlng) {
  const {lat, lng} = latlng;
  _viewCurrentViewJsDefault.default.renderSpinner();
  _viewHourlyViewJsDefault.default.renderSpinner();
  _viewFiveDayForecastViewJsDefault.default.renderSpinner();
  await _modelJs.loadForecastByCoords(lat, lng);
  _viewCurrentViewJsDefault.default.render(_modelJs.state.forecast.current[0]);
  _viewHourlyViewJsDefault.default.render(_modelJs.state.forecast.hourly);
  _viewFiveDayForecastViewJsDefault.default.render(_modelJs.state.forecast.days);
  displayMarker(latlng);
};
const control3HourForecast = function (date) {
  _modelJs.createCurrentObj(date);
  _viewCurrentViewJsDefault.default.render(_modelJs.state.forecast.current[0]);
  _modelJs.loadHourResults(date);
  _viewHourlyViewJsDefault.default.render(_modelJs.state.forecast.hourly);
};
const init = function () {
  _viewSearchViewJsDefault.default.addHandlerFormSubmit(controlWeather);
  _viewMapViewJsDefault.default.addHandlerClick(controlMap);
  _viewFiveDayForecastViewJsDefault.default.addHandlerClick(control3HourForecast);
};
init();

},{"./model.js":"53sO2","./view/mapView.js":"6SY19","./view/searchView.js":"6MvEX","./view/currentView.js":"3BGsU","./view/hourlyView.js":"3mJKf","./view/fiveDayForecastView.js":"ae2ri","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"53sO2":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "state", function () {
  return state;
});
_parcelHelpers.export(exports, "loadForecastByCoords", function () {
  return loadForecastByCoords;
});
_parcelHelpers.export(exports, "loadForecast", function () {
  return loadForecast;
});
_parcelHelpers.export(exports, "loadHourResults", function () {
  return loadHourResults;
});
_parcelHelpers.export(exports, "createCurrentObj", function () {
  return createCurrentObj;
});
var _configJs = require("./config.js");
var _helpersJs = require("./helpers.js");
const state = {
  city: {},
  list: [],
  forecast: {
    days: [],
    hourly: [],
    current: {}
  }
};
const loadForecastByCoords = async function (lat, lng) {
  try {
    const data = await _helpersJs.getJSON(`${_configJs.API_FORECAST}lat=${lat}&lon=${lng}&units=metric&appid=${_configJs.API_KEY}`);
    const {city} = data;
    state.city = city;
    state.forecast.days = [];
    state.list = data.list;
    for (let i = 0; i < data.list.length; i += 8) {
      state.forecast.days.push({
        main: data.list[i].main,
        dt: data.list[i].dt,
        dt_txt: data.list[i].dt_txt,
        weather: data.list[i].weather[0]
      });
    }
    loadHourResults(state.forecast.days[0].dt_txt.split(" ")[0]);
    createCurrentObj(state.forecast.days[0].dt_txt.split(" ")[0]);
  } catch (err) {
    console.error(`${err} !!!`);
    throw err;
  }
};
const loadForecast = async function (place) {
  try {
    const data = await _helpersJs.getJSON(`${_configJs.API_FORECAST}q=${place}&units=metric&appid=${_configJs.API_KEY}`);
    const {city} = data;
    state.city = city;
    state.forecast.days = [];
    state.list = data.list;
    for (let i = 0; i < data.list.length; i += 8) {
      state.forecast.days.push({
        main: data.list[i].main,
        dt: data.list[i].dt,
        dt_txt: data.list[i].dt_txt,
        weather: data.list[i].weather[0]
      });
    }
    loadHourResults(state.forecast.days[0].dt_txt.split(" ")[0]);
    createCurrentObj(state.forecast.days[0].dt_txt.split(" ")[0]);
  } catch (err) {
    console.error(`${err} !!!`);
    throw err;
  }
};
const loadHourResults = function (date) {
  state.forecast.hourly = state.list.filter(weather => {
    if (weather.dt_txt.split(" ")[0] === date) {
      return weather;
    }
  });
};
const createCurrentObj = function (date) {
  state.forecast.current = state.forecast.days.filter(day => {
    if (day.dt_txt.split(" ")[0] === date) {
      return day;
    }
  });
  state.forecast.current[0].name = state.city.name;
};

},{"./config.js":"5yJJr","./helpers.js":"1K0Ha","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5yJJr":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "API_KEY", function () {
  return API_KEY;
});
_parcelHelpers.export(exports, "API_FORECAST", function () {
  return API_FORECAST;
});
_parcelHelpers.export(exports, "ICONS_URL", function () {
  return ICONS_URL;
});
_parcelHelpers.export(exports, "WEEKDAYS", function () {
  return WEEKDAYS;
});
_parcelHelpers.export(exports, "TIMEOUT_SEC", function () {
  return TIMEOUT_SEC;
});
const API_KEY = "f5f020080e0a829ea7030c7f024953d2";
const API_FORECAST = "http://api.openweathermap.org/data/2.5/forecast?";
const ICONS_URL = "http://openweathermap.org/img/wn/";
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMEOUT_SEC = 10;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"1K0Ha":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "getJSON", function () {
  return getJSON;
});
var _configJs = require("./config.js");
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(_configJs.TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

},{"./config.js":"5yJJr","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6SY19":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./view.js");
var _viewJsDefault = _parcelHelpers.interopDefault(_viewJs);
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class MapView extends _viewJsDefault.default {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "_parentElement", document.querySelector(".search"));
    _defineProperty(this, "_titleLayer", new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }));
    _defineProperty(this, "map", new L.map("map", {
      center: [0, 0],
      zoom: 3,
      layers: [this._titleLayer]
    }));
    _defineProperty(this, "marker", void 0);
  }
  addHandlerClick(handler) {
    this.map.on("click", function (e) {
      handler(e.latlng);
    });
  }
}
exports.default = new MapView();

},{"./view.js":"6dyOt","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6dyOt":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class View {
  constructor() {
    _defineProperty(this, "_data", void 0);
  }
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderSpinner() {
    const markup = `
  <div class="spinner">
   <h2>X</h2>
  </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
  <div class="error">
    <div>
       <h2>Something went wrong :(</h2>
    </div>
    <p>${message}</p>
  </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
exports.default = View;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6MvEX":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./view.js");
var _viewJsDefault = _parcelHelpers.interopDefault(_viewJs);
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class SearchView extends _viewJsDefault.default {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "_parentElement", document.querySelector(".search"));
    _defineProperty(this, "_form", document.querySelector(".search-box"));
    _defineProperty(this, "_input", document.querySelector(".search-input"));
  }
  _generateMarkup() {}
  addHandlerFormSubmit(handler) {
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();
      const inputEl = Array.from(e.target.childNodes).find(e => {
        if (e.classList) {
          return e.classList.contains("search-input");
        }
      });
      handler(inputEl.value);
    });
  }
}
exports.default = new SearchView();

},{"./view.js":"6dyOt","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"3BGsU":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _view = require("./view");
var _viewDefault = _parcelHelpers.interopDefault(_view);
var _configJs = require("../config.js");
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class CurrentView extends _viewDefault.default {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "_parentElement", document.querySelector(".forecast-current"));
  }
  _generateMarkup() {
    return `
  <div class="forecast-current-left">
    <img src="http://openweathermap.org/img/wn/${this._data.weather.icon}@2x.png" alt="" />
    <div class="desc-curr">
      <h2>${this._data.weather.main}</h2>
      <h2>${this._data.main.temp}°C</h2>
    </div>
  </div>
  <div class="forecast-current-right">
    <h2>${this._data.name}</h2>
    <h3>${_configJs.WEEKDAYS[new Date(this._data.dt * 1000).getDay()]} ${new Date(this._data.dt * 1000).toLocaleString().slice(11, 15) + new Date(this._data.dt * 1000).toLocaleString().slice(18)}</h3>
    <h3>${this._data.weather.description}</h3>
  </div>
    `;
  }
}
exports.default = new CurrentView();

},{"./view":"6dyOt","../config.js":"5yJJr","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"3mJKf":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./view.js");
var _viewJsDefault = _parcelHelpers.interopDefault(_viewJs);
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class HourlyView extends _viewJsDefault.default {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "_parentElement", document.querySelector(".forecast-hour"));
  }
  _generateMarkup() {
    return this._data.map(result => {
      return `
    <li class="forecast-hour-item">
      <div class="forecast-hour-result">
        <h2>${result.dt_txt.slice(-8).slice(0, 5)}</h2>
      
        <img src="http://openweathermap.org/img/wn/${result.weather[0].icon}.png" alt="" />
        
        <h2>${result.main.temp}°C</h2>
      </div>
    </li>
        `;
    }).join("");
  }
}
exports.default = new HourlyView();

},{"./view.js":"6dyOt","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"ae2ri":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
var _viewJs = require("./view.js");
var _viewJsDefault = _parcelHelpers.interopDefault(_viewJs);
var _configJs = require("../config.js");
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
class fiveDayForecastView extends _viewJsDefault.default {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "_parentElement", document.querySelector(".forecast-week"));
  }
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const el = e.target.closest(".forecast-week-item");
      if (!el) return;
      Array.from(el.parentElement.children).forEach(e => e.classList.remove("active"));
      el.classList.add("active");
      handler(el.dataset.date);
    });
  }
  _generateMarkup() {
    return this._data.map((result, i) => {
      return `
      <li class="forecast-week-item ${i === 0 ? "active" : ""}" data-date="${result.dt_txt.split(" ")[0]}">
        <div class="forecast-week-result">
          <img src="http://openweathermap.org/img/wn/${result.weather.icon}.png" alt="" />
          <div class="desc-week">
            <h2>${_configJs.WEEKDAYS[new Date(result.dt * 1000).getDay()]}</h2>
            <span>${result.weather.main}</span>
            <h2>${result.main.temp}°C</h2>
          </div>
        </div>
      </li>
        `;
    }).join("");
  }
}
exports.default = new fiveDayForecastView();

},{"./view.js":"6dyOt","../config.js":"5yJJr","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["1yWRd","BvQis"], "BvQis", "parcelRequired309")

//# sourceMappingURL=index.2aeafb3f.js.map
