const { EventTarget } = require("sdk/event/target");
const tabs = require("sdk/tabs");
const self = require("sdk/self");
const { Class } = require('sdk/core/heritage');
var { on, once, off, emit } = require('sdk/event/core');

exports.assert = function (cond) {
  if (! cond) {
    var args = Array.prototype.slice.call(arguments, 1);
    console.warn(["Assertion Error:"].concat(args));
    throw new Error("Assertion Error: " + args.join(" "));
  }
};

exports.openData = function (base, params) {
  var url = self.data.url(base) + "?";
  var first = true;
  for (var name in params) {
    if (first) {
      first = false;
    } else {
      url += "&";
    }
    url += name + "=" + encodeURIComponent(params[name]);
  }
  tabs.open(url);
};

/* Like sdk/core/heritage EventTarget, but also adds relevent
   methods */
exports.EventMethods = Class({
  extends: EventTarget,

  on: function (type, handler) {
    return on(this, type, handler);
  },

  off: function (type, handler) {
    return off(this, type, handler);
  },

  once: function (type, handler) {
    return once(this, type, handler);
  },

  emit: function (type, event) {
    return emit.apply(null, [this].concat(Array.prototype.slice.call(arguments)));
  }
});

exports.cleanForId = function (s) {
  s = s.replace(/[^a-zA-Z0-9_-]/g, "");
  return s;
};

exports.bind = function (this_, methods) {
  if (typeof methods == "string") {
    methods = methods.split(/\s+/g);
  }
  methods.forEach(function (m) {
    if (! this_[m]) {
      throw new Error("Object " + this_ + " has no method " + m);
    }
    this_[m] = this_[m].bind(this_);
  });
};
