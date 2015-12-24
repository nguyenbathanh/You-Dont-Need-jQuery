(function() {

  function extendC(subclass, superclass) {
      function Dummy(){}
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

      if (!obj)
        continue;

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object')
            C.deepExtend(out[key], obj[key]);
          else
            out[key] = obj[key];
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
    return array.map(function(value, index) {

    });
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

  C.e = function(s){
    var sf = new domNode(s);

    // extendC(person, sf);
    // console.log(person);
    // person.push(new domNode(s));
    // person[0] = new domNode(s);
    return person;
  };

  function isNode(o){
      return (
        typeof Node === "object" ? o instanceof Node :
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
      );
    }

    //Returns true if it is a DOM element
    function isElement(o){
      return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
    }

  function domNodeWindow(w) {
    this._element = window;
    return this;
  };

  f = domNodeWindow.prototype;
  f.height = function() {
    // window height
    // $(window).height();

    // without scrollbar, behaves like ppp
    return this._element.document.documentElement.clientHeight;
    // with scrollbar
    return this._element.innerHeight;
  };

  f.scrollTop = function() {
    // ppp
    // $(window).scrollTop();

    // Native
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  };
  var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};


  var ppp = function(selector){
    return ppp.fn.init(selector);
  };

  f = ppp.fn = ppp.prototype = {

	// The current version of ppp being used
	ppp: "1234",

	constructor: ppp,

	// Start with an empty selector
	selector: "",

	// The default length of a ppp object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new ppp matched element set
		var ret = ppp.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return ppp.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( ppp.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a ppp method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

  ppp.fn.init = function(selector){
    return this;
  }
  f.queryBySelector = function(selector) {
    return document.querySelectorAll(selector);
    // // ppp
    // // $('selector');

    // // Native
    // var a = document.querySelectorAll(selector), tr = [];
    // console.log(a);
    // for(var i = 0, il = a.length; i < il; ++i){
      // tr.push(a[i]);
    // }
    // return a;
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
    return this._element.previousElementSibling;
  };

  f.next = function() {
    // ppp
    // $el.next();

    // Native
    return this._element.nextElementSibling;
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
    for (var i = 0, il = attr.length; i < il; ++i) {
      el.style[i] = attr[i];
    }
    return this;
  };

  f.addClass = function(className) {
    // ppp
    // $el.addClass(className);

    // Native
    this._element.classList.add(className);
    return this;
  };

  f.removeClass = function(className) {
    // ppp
    // $el.removeClass(className);

    // Native
    this._element.classList.remove(className);
    return this;
  };

  f.hasClass = function() {
    // ppp
    // $el.hasClass(className);

    // Native
    if (el.classList)
      return this._element.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  };

  f.toggleClass = function() {
    // ppp
    // $el.toggleClass(className);

    // Native
    this._element.classList.toggle(className);
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
      return this._element.innerHTML = h;
    }
    // ppp
    // $el.html();

    // Native
    return this._element.innerHTML;
  };

  f.append = function(j) {
    // ppp
    // $el.append("<div id='container'>hello</div>");

    // Native
    // let newEl = document.createElement('div');
    // newEl.setAttribute('id', 'container');
    // newEl.innerHTML = 'hello';
    this._element.appendChild(j);
    return this;
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

  f.on = function(eventName, eventHandler) {
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
    Array.prototype.forEach.call(this._element, function(el, i) {

    });
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

  f.find = function(selector) {
    return this._element.querySelectorAll(selector);
  };

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

  f.ready = function() {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  };

  f.test = function(){
    console.log("sdad");
  };

  this.onload = function() {
    // console.log( document.getElementsByTagName( 'div' ));
    // var vs = C.e(".content_section_text");

    console.log($(".content_section_text"));
    // console.log(vs);
    // console.log($(".validator"));

    // vs.hide();

    console.log(ppp("se"));
  };
})();

(function(){



  // console.log(ppp("sc"));

})();