(function() {
  function extendC(subclass, superclass) {
    function Dummy() {}
    Dummy.prototype = superclass.prototype;
    subclass.prototype = new Dummy();
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass;
    subclass.superproto = superclass.prototype;
  }
  var f, C = {};
  C.deepExtend = function(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];
      if (!obj) continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') C.deepExtend(out[key], obj[key]);
          else out[key] = obj[key];
        }
      }
    }
    return out;
  };
  C.proxy = function(fn, context) {
    return fn.bind(context);
  };
  C.inArray = function(item, array) {
    return array.indexOf(item);
  };
  C.isArray = function(arr) {
    return Array.isArray(arr);
  };
  C.map = function(array) {
    return array.map(function(value, index) {});
  };
  C.now = function() {
    return Date.now();
  };
  C.parseHtml = function(h) {
    var parseHTML = function(str) {
      var tmp = document.implementation.createHTMLDocument();
      tmp.body.innerHTML = str;
      return tmp.body.children;
    };
    return parseHTML(h);
  };
  C.e = function(s) {
    return ppp(s);
  };
  C.isNode = function(o) {
    return (typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
  };
  C.isElement = function(o) {
    return (typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string");
  };
  C.g = function(a, b, c) {
    if (!a) {
      throw Error();
    }
    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function() {
        var c = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(c, d);
        return a.apply(b, c);
      };
    }
    return function() {
      return a.apply(b, arguments);
    };
  };
  var deletedIds = [],
    slice = deletedIds.slice,
    concat = deletedIds.concat,
    push = deletedIds.push,
    indexOf = deletedIds.indexOf,
    class2type = {},
    toString = class2type.toString,
    hasOwn = class2type.hasOwnProperty,
    support = {},
    rootjQuery,
    ppp = function(selector, context) {
      return new ppp.pp.run(selector, context);
    };
  f = ppp.pp = ppp.prototype = {
    ppp: "1",
    constructor: ppp,
    selector: "",
    length: 0,
    toArray: function() {
      return slice.call(this);
    },
    pushStack: function(elems) {
      // console.log(this.constructor());
      var ret = this.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    merge: function(first, second) {
      var len = +second.length,
        j = 0,
        i = first.length;
      while (j < len) {
        first[i++] = second[j++];
      }
      if (len !== len) {
        while (second[j] !== undefined) {
          first[i++] = second[j++];
        }
      }
      first.length = i;
      return first;
    },
    slice: function() {
      return this.pushStack(slice.apply(this, arguments));
    },
    push: push,
    sort: deletedIds.sort,
    splice: deletedIds.splice
  };
  var document = window.document;
  var run = ppp.pp.run = function(selector, context) {
    if (!selector) {
      return this;
    }
    // console.log(selector);
    if (typeof selector == "string") {
      if (!context || context.ppp) {
        return (context || rootjQuery).find(selector);
      } else {
        return this.constructor(context).find(selector);
      }
    } else if (selector.nodeType) {
      // console.log("run here");
      this.context = this[0] = selector;
      this.length = 1;
      return this;
    }
    if (selector.selector !== undefined) {
      this.selector = selector.selector;
      this.context = selector.context;
    }
    // return jQuery.makeArray(selector, this);
  };
  run.prototype = ppp.pp;
  rootjQuery = ppp(document);
  f = ppp.prototype;
  f.find = function(selector) {
    var i,
      ret = [],
      self = this,
      len = self.length;
    if (typeof selector !== "string") {
      return this.pushStack(ppp(selector).filter(function() {
        for (i = 0; i < len; i++) {
          if (ppp.contains(self[i], this)) {
            return true;
          }
        }
      }));
    }

    function NLtoArray(nl) {
      for (var a = [], l = nl.length; l--; a[l] = nl[l]);
      return a;
    }
    for (i = 0; i < len; i++) {
      // console.log(selector);
      // console.log(self[ i ]);
      //ret = document.getElementsByClassName(selector);
      // console.log(self[i].querySelectorAll( selector ));
      ret = NLtoArray(this.query(selector));
      // console.log(ret);
    }
    ret = this.pushStack(ret);
    ret.selector = this.selector ? this.selector + " " + selector : selector;
    return ret;
    // var a = document.querySelectorAll(selector),
    // tr;
    // for (var i = 0, il = a.length; i < il; ++i) {
    // tr = this.pushStack(a);
    // }
    // return tr;
  };
  // http://ryanmorr.com/abstract-away-the-performance-faults-of-queryselectorall/
  f.query = function(selector, doc) {
    'use strict';
    var doc = doc || document,
      simpleRe = /^(#?[\w-]+|\.[\w-.]+)$/,
      periodRe = /\./g,
      slice = [].slice,
      classes;
    return function(selector, context) {
      context = context || doc;
      // Redirect simple selectors to the more performant function
      if (simpleRe.test(selector)) {
        switch (selector.charAt(0)) {
          case '#':
            // Handle ID-based selectors
            return [context.getElementById(selector.substr(1))];
          case '.':
            // Handle class-based selectors
            // Query by multiple classes by converting the selector
            // string into single spaced class names
            classes = selector.substr(1).replace(periodRe, ' ');
            return slice.call(context.getElementsByClassName(classes));
          default:
            // Handle tag-based selectors
            return slice.call(context.getElementsByTagName(selector));
        }
      }
      // Default to `querySelectorAll`
      return slice.call(context.querySelectorAll(selector));
    }(selector, doc);
  };
  f.queryByClass = function(cl) {
    // ppp
    // $('.class');
    // Native
    return document.querySelectorAll("." + cl);
    // or
    return document.getElementsByClassName(cl);
  };
  f.queryById = function(id) {
    // ppp
    // $('#id');
    // Native
    return document.querySelector(id);
    // or
    return document.getElementById(id);
  };
  f.queryByAttribute = function(query) {
    // ppp
    // $('a[target=_blank]');
    // Native
    return document.querySelectorAll(query);
  };
  f.findNode = function(node) {
    // ppp
    // $el.find('li');
    // Native
    return this._element.querySelectorAll(node);
  };
  f.findBody = function() {
    // ppp
    // $('body');
    // Native
    return document.body;
  };
  f.getAttribute = function(attr) {
    // ppp
    // $el.attr('foo');
    // Native
    return this._element.getAttribute(attr);
  };
  f.data = function(key) {
    // ppp
    // $el.data('foo');
    // Native
    // using getAttribute
    return this._element.getAttribute(key);
    // you can also use `dataset` if only need to support IE 11+
    return this._element.dataset[key];
  };
  f.previous = function() {
    // ppp
    //$el.prev();
    // Native
    return this.pushStack(ppp(this[0].previousElementSibling));
  };
  f.next = function() {
    // ppp
    // $el.next();
    // Native
    return this.pushStack(ppp(this[0].nextElementSibling));
  };
  f.closest = function(selector) {
    // ppp
    //$el.closest(queryString);
    // Native
    const matchesSelector = this._element.matches || this._element.webkitMatchesSelector || this._element.mozMatchesSelector || this._element.msMatchesSelector;
    while (this._element) {
      if (matchesSelector.call(this._element, selector)) {
        return this._element;
      } else {
        this._element = this._element.parentElement;
      }
    }
    return null;
  };
  f.parentsUntil = function(selector, filter) {
    // ppp
    //$el.parentsUntil(selector, filter);
    const result = [];
    const matchesSelector = this._element.matches || this._element.webkitMatchesSelector || this._element.mozMatchesSelector || this._element.msMatchesSelector;
    // match start from parent
    this._element = this._element.parentElement;
    while (this._element && !matchesSelector.call(this._element, selector)) {
      if (!filter) {
        result.push(this._element);
      } else {
        if (matchesSelector.call(this._element, filter)) {
          result.push(this._element);
        }
      }
      this._element = this._element.parentElement;
    }
    return result;
  };
  f.val = function() {
    // ppp
    // $('#my-input').val();
    // Native
    return this._element.value;
  };
  f.index = function() {
    // ppp
    // $(e.currentTarget).index('.radio');
    // Native
    return [].indexOf.call(document.querySelectAll('.radio'), this._element.currentTarget);
  };
  f.contents = function() {
    // ppp
    // $iframe.contents();
    // Native
    return this._element.contentDocument;
  };
  f.findCss = function() {
    // ppp
    // $iframe.contents().find('.css');
    // Native
    return this._element.contentDocument.querySelectorAll('.css');
  };
  f.css = function(attr) {
    if (attr !== null && typeof attr != 'object') {
      // ppp
      // $el.css("color");
      // Native
      // NOTE: Known bug, will return 'auto' if style value is 'auto'
      const win = this._element.ownerDocument.defaultView;
      // null means not return pseudo styles
      return win.getComputedStyle(this._element, null)[attr];
    }
    // ppp
    // $el.css({ color: "#ff0011" });
    // Native
    for (var i in attr) {
      for (var j = 0; il = this.length; ++j) {
        this[j].style[i] = attr[i];
      }
    }
    return this;
  };
  f.addClass = function(className) {
    // console.log(this);
    for (var i = 0, il = this.length; i < il; ++i) {
      this[i].classList.add(className);
    }
    // ppp
    // $el.addClass(className);
    return this;
  };
  f.removeClass = function(className) {
    // ppp
    // $el.removeClass(className);
    // Native
    this._element.classList.remove(className);
    return this;
  };
  f.hasClass = function(className) {
    // ppp
    // $el.hasClass(className);
    // Native
    if (this[0].classList){
      return this[0].classList.contains(className);
    }
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(this[0].className);
  };
  f.toggleClass = function() {
    // ppp
    // $el.toggleClass(className);
    // Native
    this[0].classList.toggle(className);
    return this;
  };
  f.height = function() {
    // ppp
    // $el.height();
    // Native
    const styles = this.getComputedStyles(this._element);
    const height = this._element.offsetHeight;
    const borderTopWidth = parseFloat(styles.borderTopWidth);
    const borderBottomWidth = parseFloat(styles.borderBottomWidth);
    const paddingTop = parseFloat(styles.paddingTop);
    const paddingBottom = parseFloat(styles.paddingBottom);
    return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
    // accurate to integer(when `border-box`, it's `height`; when `content-box`, it's `height + padding + border`)
    return this._element.clientHeight;
    // accurate to decimal(when `border-box`, it's `height`; when `content-box`, it's `height + padding + border`)
    return this._element.getBoundingClientRect().height;
  };
  f.position = function() {
    // ppp
    // $el.position();
    // Native
    return {
      left: this._element.offsetLeft,
      top: this._element.offsetTop
    };
  };
  f.offset = function() {
    // ppp
    // $el.offset();
    // Native
    const box = this._element.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft
    }
  };
  f.remove = function() {
    // ppp
    // $el.remove();
    // Native
    return this._element.parentNode.removeChild(this._element);
  };
  f.text = function(t) {
    if (t) {
      // ppp
      // $el.text(string);
      // Native
      return this._element.textContent = t;
    }
    // ppp
    // $el.text();
    // Native
    return this._element.textContent;
  };
  f.html = function(h) {
    if (h) {
      // ppp
      //$el.html(htmlString);
      // Native
      for (var i = 0, il = this.length; i < il; ++i) {
        this[i].innerHTML = h;
      }
      return this;
    }
    // ppp
    // $el.html();
    // Native
    return this[0].innerHTML;
  };
  f.append = function() {
    this._bn(arguments, function(a){
      console.log(this, a);
      var gg = document.createDocumentFragment();
      gg.appendChild(a);
      this.appendChild(gg);
    });
    // ppp
    // $el.append("<div id='container'>hello</div>");
    // Native
    // let newEl = document.createElement('div');
    // newEl.setAttribute('id', 'container');
    // newEl.innerHTML = 'hello';
    //this._element.appendChild(j);
    return this;
  };
  f._bn = function(j, callback){
    var self = this;

    for(var i = 0, il = j.length; i< il;++i){
      for(var a = 0, al = this.length; a< al; ++a){
        (function(a, j){
          callback.call(a, self.__bn(j));
        })(this[a], j[i]);
      }
    }

    // return callback.call(this[0], j[0]);
    return this;
  };
  f.__bn = function(b){
    if(b instanceof ppp){
      return b[0];
    }
    return document.createTextNode(b);
  };
  f.prepend = function(j) {
    // ppp
    // $el.prepend("<div id='container'>hello</div>");
    // Native
    // let newEl = document.createElement('div');
    // newEl.setAttribute('id', 'container');
    // newEl.innerHTML = 'hello';
    this._element.insertBefore(j, this._element.firstChild);
    return this;
  };
  f.insertBefore = function(j) {
    // ppp
    // $newEl.insertBefore(queryString);
    // Native
    this._element.parentNode.insertBefore(j, this._element);
    return this;
  };
  f.insertAfter = function(j) {
    // ppp
    // $newEl.insertAfter(queryString);
    // Native
    this._element.parentNode.insertBefore(j, this._element.nextSibling);
    return this;
  };
  f.on = function(eventName, eventHandler) {
    // ppp
    // $el.on(eventName, eventHandler);
    // Native
    this._element.addEventListener(eventName, eventHandler);
  };
  f.off = function(eventName, eventHandler) {
    // ppp
    // $el.off(eventName, eventHandler);
    // Native
    this._element.removeEventListener(eventName, eventHandler);
  };
  f.trigger = function(eventName, dt) {
    // ppp
    // $(el).trigger('custom-event', {key1: 'data'});
    // Native
    if (window.CustomEvent) {
      const event = new CustomEvent(eventName, {
        detail: dt
      });
    } else {
      const event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, true, true, dt);
    }
    this._element.dispatchEvent(event);
    return this;
  };
  f.fadeIn = function() {
    var el = this._element;
    el.style.opacity = 0;
    var last = +new Date();
    var tick = function() {
      el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
      last = +new Date();
      if (+el.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
      }
    };
    tick();
    return this;
  };
  f.hide = function() {
    console.log(this._element.length);
    this._element.style.display = 'none';
    return this;
  };
  f.show = function() {
    this._element.style.display = '';
    return this;
  };
  f.children = function() {
    return this._element.children;
  };
  f.clone = function() {
    this._element.cloneNode(true);
    return this;
  };
  f.contains = function(child) {
    return this._element !== child && this._element.contains(child);
  };
  f.containsSelector = function() {
    return this._element.querySelector(selector) !== null;
  };
  f.each = function() {
    var elements = this._element;
    Array.prototype.forEach.call(this._element, function(el, i) {});
    return this;
  };
  f.empty = function() {
    this._element.innerHTML = '';
    return this;
  };
  f.filter = function(filterFn) {
    Array.prototype.filter.call(document.querySelectorAll(selector), filterFn);
    return this;
  };
  // f.find = function(selector) {
  // return this._element.querySelectorAll(selector);
  // };
  f.outerHTML = function() {
    return this._element.outerHTML
  };
  f.is = function(otherEl) {
    return this._element == otherEl;
    var matches = function(el, selector) {
      return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
    };
    matches(this._element, '.my-class');
  };
  f.offsetParent = function() {
    return this._element.offsetParent || this._element;
  };
  f.outerHeight = function(margin) {
    if (margin) {
      function outerHeight(el) {
        var height = el.offsetHeight;
        var style = getComputedStyle(el);
        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        return height;
      }
      return outerHeight(this._element);
    }
    return this._element.offsetHeight;
  };
  f.outerWidth = function(margin) {
    if (margin) {
      function outerWidth(el) {
        var width = el.offsetWidth;
        var style = getComputedStyle(el);
        width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        return width;
      }
      return outerWidth(this._element);
    }
    return this._element.offsetWidth;
  };
  f.parent = function() {
    return this._element.parentNode;
  };
  f.replaceWith = function(str) {
    this._element.outerHTML = str;
  };
  f.ready = function(fn) {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  };
  this.onload = function() {
    // console.log( document.getElementsByTagName( 'div' ));
    // var vs = C.e(".content_section_text");
    // console.log(vs);
    // vs.hide();
    //console.log(ppp(".content_section_text").css({"background": "red"}));
    // console.log(ppp(".content_section_text").html("absc"));
    // console.log($(".section_header_red").append( "24234234233333333" ));
    // console.log($(".section_header_red").append( "24234234233333333" ));
    console.log(ppp(".section_header").append(ppp("#validator")));
  };
})();