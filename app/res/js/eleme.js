angular.module("batchrequest", ["httphook"]).factory("batchrequest.BatchHandler", ["$http", "$q",
function(a, b) {
	return function(c, d) {
		var e, f = [],
		g = function() {
			var b = f.splice(0);
			if (e = null, 1 === b.length) return b[0].promise.resolve();
			var g = {
				timeout: 1e4,
				requests: []
			};
			angular.forEach(b,
			function(a) {
				var b = {
					method: a.req.method,
					url: a.req.url
				};
				"function" == typeof d && d(b),
				g.requests.push(b)
			}),
			a.post(c, g).then(function(a) {
				angular.forEach(a.data,
				function(a, c) {
					var d = b[c];
					d.res.status = a.code,
					d.res.data = a.body,
					d.promise.resolve(!1)
				})
			},
			function() {
				angular.forEach(b,
				function(a, c) {
					b[c].promise.resolve()
				});
				var a = location.host.replace(/^.*?(?=[^.\d]+\.[^.\d]+$)/, "");
				document.cookie = "BATCH=false; Domain=" + a + "; Path=/; Expires=" + new Date(Date.now() + 864e5).toGMTString()
			})
		},
		h = function(a) {
			f.push(a),
			e || (e = setTimeout(g))
		};
		return function(a, c) {
			if ("false" !== document.cookie.match(/(?:; |^)BATCH=([^;]*)|$/)[1]) {
				var d = b.defer();
				return h({
					req: a,
					res: c,
					promise: d
				}),
				d.promise
			}
		}
	}
}]),
angular.module("UBT").config(["$httpProvider",
function(a) {
	a.interceptors.push(["tracking", "$q",
	function(a, b) {
		var c = /^\/restapi\/v1\/user$|^\/v1\/restaurant$/,
		d = [],
		e = function(a) {
			return d.push({
				beginstamp: Date.now(),
				config: a
			}),
			a
		},
		f = function(e) {
			for (var f = function(b) {
				return function() {
					a.send("API", {
						status: e.status,
						url: e.config.url,
						duration: Date.now() - b.beginstamp
					})
				}
			},
			g = 0; g < d.length; g++) if (d[g].config === e.config) {
				c.test(e.config.url) && setTimeout(f(d[g])),
				d.splice(g, 1);
				break
			}
			var h = b.defer();
			return 2 === (e.status / 100 | 0) ? h.resolve(e) : h.reject(e),
			h.promise
		};
		return {
			request: e,
			response: f,
			responseError: f
		}
	}])
}]).factory("tracking", ["$rootScope", "UBT",
function(a, b) {
	var c = b.bindData({
		geohash: function() {
			return localStorage.getItem("GEOHASH") || ""
		},
		user_id: function() {
			return a.user.id
		}
	}),
	d = document.referrer,
	e = document.documentElement;
	return a.$on("$routeChangeStart",
	function() {
		c.send("PV", {
			resolution: Math.max(e.clientWidth, window.innerWidth || 0) + "x" + Math.max(e.clientHeight, window.innerHeight || 0),
			location: location.href,
			referrer: d
		}),
		d = location.href
	}),
	c
}]),
void
function() {
	for (var a = 0,
	b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"],
	window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
	window.requestAnimationFrame || (window.requestAnimationFrame = function(b) {
		var c = (new Date).getTime(),
		d = Math.max(0, 16 - (c - a)),
		e = window.setTimeout(function() {
			b(window.performance && window.performance.now ? window.performance.now() + d: c + d)
		},
		d);
		return a = c + d,
		e
	}),
	window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
		clearTimeout(a)
	}),
	TWEEN.startAnimation = function() {
		var a = function(b) {
			TWEEN.getAll().length > 0 && (requestAnimationFrame(a), TWEEN.update(b))
		};
		a()
	};
	var d = TWEEN.Easing;
	d.Swing = {
		None: function(a) {
			return.5 - Math.cos(a * Math.PI) / 2
		}
	};
	var e = {
		linear: d.Linear.None,
		swing: d.Swing.None,
		easeInQuad: d.Quadratic.In,
		easeOutQuad: d.Quadratic.Out,
		easeInOutQuad: d.Quadratic.InOut,
		easeInCubic: d.Cubic.In,
		easeOutCubic: d.Cubic.Out,
		easeInOutCubic: d.Cubic.InOut,
		easeInQuart: d.Quartic.In,
		easeOutQuart: d.Quartic.Out,
		easeInOutQuart: d.Quartic.InOut,
		easeInQuint: d.Quintic.In,
		easeOutQuint: d.Quintic.Out,
		easeInOutQuint: d.Quintic.InOut,
		easeInExpo: d.Exponential.In,
		easeOutExpo: d.Exponential.Out,
		easeInOutExpo: d.Exponential.InOut,
		easeInSine: d.Sinusoidal.In,
		easeOutSine: d.Sinusoidal.Out,
		easeInOutSine: d.Sinusoidal.InOut,
		easeInCirc: d.Circular.In,
		easeOutCirc: d.Circular.Out,
		easeInOutCirc: d.Circular.InOut,
		easeInElastic: d.Elastic.In,
		easeOutElastic: d.Elastic.Out,
		easeInOutElastic: d.Elastic.InOut,
		easeInBack: d.Back.In,
		easeOutBack: d.Back.Out,
		easeInOutBack: d.Back.InOut,
		easeInBounce: d.Bounce.In,
		easeOutBounce: d.Bounce.Out,
		easeInOutBounce: d.Bounce.InOut
	},
	f = function(a, b, c) {
		var d = /^(-?\d*\.?\d*)(em|ex|px|in|cm|mm|pt|pc|%)*$/,
		e = d.exec(c);
		c = e ? parseInt(e[1], 10) : c;
		var f = d.exec(b);
		b = f ? parseInt(f[1], 10) : b;
		var g = e ? e[2] : "";
		return g || (g = f ? f[2] : ""),
		!g && /^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i.test(a) && (g = "px"),
		{
			begin: b,
			end: c,
			unit: g
		}
	};
	angular.element.prototype.animate = function(a, b, c, d) {
		var g, h, i, j = this;
		if (a = a || {},
		"object" == typeof b) {
			var k = b;
			b = k.duration || 400,
			c = k.easing,
			d = k.complete,
			g = k.start,
			h = k.step,
			i = k.updateElement
		}
		b || (b = 400),
		c || (c = "swing");
		var l = {},
		m = {},
		n = {};
		for (var o in a) if (a.hasOwnProperty(o)) {
			var p, q, r = a[o];
			r instanceof Array ? (p = r[0], q = r[1]) : (p = DomUtil.getStyle(j[0], o), q = r);
			var s = f(o, p, q);
			l[o] = s.begin,
			m[o] = s.end,
			n[o] = s.unit
		}
		new TWEEN.Tween(l).to(m, b).easing(e[c]).onStart(function() {
			"function" == typeof g && g.call(j, this)
		}).onUpdate(function() {
			if ("function" == typeof h && h.call(j, this), i !== !1) for (var a in m) m.hasOwnProperty(a) && ("scrollTop" === a || "scrollLeft" === a ? j[0][a] = this[a] : j.css(a, this[a] + n[a]))
		}).onComplete(function() {
			"function" == typeof d && d.call(j, this)
		}).start(),
		TWEEN.startAnimation()
	}
} (),
function(a, b, c) {
	"use strict";
	var d = function(b, c) {
		this.host = b.replace(/^https?:/, a.location.protocol),
		this.machine = c
	},
	e = d.prototype;
	e._fetch = function() {
		var a = [].slice.call(arguments);
		return a[0] = this.host + a[0],
		this.machine.apply(this, a)
	},
	e.registerProvider = function() {
		return this.loginProvider("register")
	},
	e.loginProvider = function(a) {
		return a = a || "login",
		this._fetch("v1/" + a + "/:mobile", {
			mobile: "@mobile"
		})
	},
	e.logoutProvider = function() {
		return this.loginProvider("logout")
	},
	e.profileProvider = function() {
		return this._fetch("v1/user")
	},
	e.messageProvider = function() {
		return this._fetch("v1/users/:userId/messages/:messageId/:action", {
			userId: "@userId",
			messageId: "@messageId"
		})
	},
	e.activityProvider = function() {
		return this._fetch("v1/activities/:nameForUrl", {},
		{
			query: {
				method: "GET",
				cache: 1,
				isArray: 1
			}
		})
	},
	e.foodProvider = function() {
		return this._fetch("v1/foods/:nameForUrl")
	},
	e.addressProvider = function() {
		return this._fetch("v1/users/:userId/addresses/:addressId")
	},
	e.placeProvider = function() {
		return this._fetch("v1/users/:userId/places/", {
			userId: "@userId"
		},
		{
			query: {
				method: "GET",
				cache: 1,
				isArray: 1
			}
		})
	},
	e.poiProvider = function() {
		return this._fetch("v1/pois/", {},
		{
			query: {
				method: "GET",
				cache: 1,
				isArray: 1
			}
		})
	},
	e.orderProvider = function() {
		return this._fetch("v1/users/:userId/orders/:filter")
	},
	e.complaintProvider = function() {
		return this._fetch("v1/users/:userId/orders/:orderId/complaint")
	},
	e.ratingProvider = function() {
		return this._fetch("v1/users/:userId/orders/:orderId/rating")
	},
	e.favorProvider = function() {
		return this._fetch("v1/users/:userId/favor/:filter/:foodId", {},
		{
			query: {
				method: "GET",
				cache: 1,
				isArray: 1
			}
		})
	},
	e.cityProvider = function() {
		return this._fetch("v1/cities/:cityId")
	},
	e.restaurantProvider = function() {
		return this._fetch(":version/restaurants/:nameForUrl/:action", {
			version: "v1"
		})
	},
	e.cartProvider = function() {
		return this._fetch("v1/carts/:cartId/:listName/:action", {
			cartId: "@cartId",
			_method: "@_method"
		})
	},
	e.historyProvider = function() {
		return this._fetch("v1/users/:userId/places")
	},
	e.csrfProvider = function() {
		return this._fetch("v1/csrf_token")
	};
	var f = b.module("eleme.zero", ["ngResource"]);
	f.config(["$resourceProvider",
	function(a) {
		a.defaults.actions.put = {
			method: "PUT"
		},
		a.defaults.actions.post = {
			method: "POST"
		},
		a.defaults.actions.patch = {
			method: "PATCH"
		}
	}]).provider("Zero", {
		host: "http://restapi.ele.me/",
		setHost: function(a) {
			a && (this.host = a)
		},
		$get: ["$resource",
		function(a) {
			var b = new d(this.host, a),
			c = {};
			for (var e in b) / Provider$ / .test(e) && (c[e.slice(0, -8)] = b[e]());
			return c
		}]
	})
} (window, window.angular),
angular.module("eleme.ui", []).directive("ie8wide",
function() {
	return function() {
		if (navigator.userAgent.match(/MSIE 8/)) {
			var a = document.body,
			b = angular.$(a);
			a.clientWidth >= 1200 && b.addClass("ie8wide"),
			angular.$(window).on("resize",
			function() {
				return a.clientWidth < 1200 ? b.removeClass("ie8wide") : void b.addClass("ie8wide")
			})
		}
	}
}),
angular.$ = function(a) {
	return a = angular.isString(a) ? document.querySelectorAll(a) : a,
	angular.element(a)
},
angular.element.prototype.parents = function(a) {
	if (!a) return angular.$(this[0].parentNode);
	for (var b = document.querySelectorAll(a), c = [], d = 0; d < b.length; d++) c.push(b[d]);
	for (var e, f = this[0]; f && "HTML" !== f.nodeName;) {
		f = f.parentNode;
		var g = c.indexOf(f); - 1 === g || (e = f, f = document.documentElement)
	}
	return angular.$(e)
},
angular.element.prototype.param = function(a) {
	if (a) {
		var b = "";
		for (var c in a) / ^\$ / .test(c) || (b += encodeURIComponent(c) + "=" + encodeURIComponent(a[c]) + "&");
		return b.slice(0, -1)
	}
},
angular.element.prototype.find = function(a) {
	if (!a) return angular.$();
	var b, c = document.querySelectorAll(a),
	d = [];
	for (b = 0; b < c.length; b++) d.push(c[b]);
	var e = this[0].getElementsByTagName("*"),
	f = [];
	for (b = 0; b < e.length; b++) f.push(e[b]);
	var g = [];
	for (b = 0; b < d.length; b++) - 1 !== f.indexOf(d[b]) && g.push(d[b]);
	return angular.$(g)
},
void
function() {
	function a(a) {
		return a.replace(b,
		function(a, b, c, d) {
			return d ? c.toUpperCase() : c
		}).replace(c, "Moz$1")
	}
	var b = /([\:\-\_]+(.))/g,
	c = /^moz([A-Z])/,
	d = Number(document.documentMode),
	e = 9 > d ?
	function(b, c) {
		if (!b || !c) return null;
		c = a(c),
		"float" === c && (c = "styleFloat");
		try {
			switch (c) {
			case "opacity":
				try {
					return b.filters.item("alpha").opacity / 100
				} catch(d) {
					return 1
				}
				break;
			default:
				return b.style[c] || b.currentStyle ? b.currentStyle[c] : null
			}
		} catch(d) {
			return b.style[c]
		}
	}: function(b, c) {
		if (!b || !c) return null;
		c = a(c),
		"float" === c && (c = "cssFloat");
		try {
			var d = document.defaultView.getComputedStyle(b, "");
			return b.style[c] || d ? d[c] : null
		} catch(e) {
			return b.style[c]
		}
	},
	f = function(a) {
		var b = a.getBoundingClientRect();
		return b.top >= 0 && b.left >= 0 && b.bottom <= (window.innerHeight || document.documentElement.clientHeight) && b.right <= (window.innerWidth || document.documentElement.clientWidth)
	},
	g = function(a, b) {
		var c;
		return function() {
			var d = this,
			e = arguments;
			c && (clearTimeout(c), c = null),
			c = setTimeout(function() {
				a.apply(d, e),
				c = null
			},
			b)
		}
	},
	h = function(a, b) {
		function c() {
			a.apply(g, h),
			e = d
		}
		var d, e, f, g, h;
		return function() {
			if (g = this, h = arguments, d = Date.now(), f && (clearTimeout(f), f = null), e) {
				var a = b - (d - e);
				0 > a ? c() : f = setTimeout(function() {
					c()
				},
				a)
			} else c()
		}
	};
	window.DomUtil = {
		msieVersion: d,
		debounce: g,
		throttle: h,
		getStyle: e,
		isElementInViewport: f
	}
} (),
angular.module("eleme.ui").directive("modal", ["$compile", "$http", "$templateCache",
function(a, b, c) {
	var d = b.get("/pc/common/ui/_block/modal/modal.html", {
		cache: c
	});
	return {
		scope: !0,
		link: function(b, c, e) {
			c.on("click",
			function() {
				c.hasClass("modal-hide") || d.then(function(c) {
					var d = b.$new(),
					f = a(c.data)(d),
					g = "/pc/page/" + e.modal + ".html";
					d.templateUrl = g,
					d.display = 1,
					d.classes = {},
					d.classes[e.modalSize ? "modal-" + e.modalSize: "modal-small"] = 1,
					d.close = function() {
						document.body.removeChild(f[0]),
						f.remove(),
						d.$destroy()
					},
					document.body.appendChild(f[0]),
					setTimeout(function() {
						b.$apply()
					})
				})
			})
		}
	}
}]),
void
function(a) {
	var b = angular.module("eleme.ui");
	b.directive("modalCancel", a),
	b.directive("modalShade", a)
} (function() {
	return {
		restrict: "C",
		link: function(a, b) {
			b.on("click",
			function() {
				a.close()
			})
		}
	}
}),
void
function() {
	angular.module("eleme.ui").directive("carousel",
	function() {
		return {
			restrict: "EA",
			transclude: !0,
			scope: {},
			controller: ["$scope", "$element",
			function(a, b) {
				var c, d = a.slides = [],
				e = 0,
				f = function() {
					c = setTimeout(function() {
						var b = e + 1;
						b > d.length - 1 && (b = 0),
						a.setActiveSlide(b),
						a.$digest(),
						f()
					},
					5e3)
				},
				g = function() {
					clearTimeout(c),
					c = null
				};
				setTimeout(function() {
					f()
				},
				0),
				b.bind("mouseenter",
				function() {
					g()
				}),
				b.bind("mouseleave",
				function() {
					f()
				});
				var h = b.find("ul");
				a.setActiveSlide = function(a, b) {
					angular.forEach(d,
					function(a) {
						a.active = !1
					});
					var c;
					"number" == typeof a ? (c = a, a = d[c], a && (a.active = !0)) : (c = d.indexOf(a), a.active = !0),
					c >= 0 && c < d.length && (e = c);
					var f = h.parent()[0].clientHeight;
					b !== !1 && DomUtil.msieVersion < 10 ? h.animate({
						top: -1 * f * e
					}) : h.css("top", -1 * f * e + "px")
				},
				angular.$(window).on("resize", DomUtil.debounce(function() {
					var a = h.parent()[0].clientHeight;
					h.css("top", -1 * a * e + "px")
				},
				300)),
				this.addSlide = function(b) {
					0 === d.length && a.setActiveSlide(b, !1),
					d.push(b)
				}
			}],
			template: '<div class="carousel-wrapper"><ul class="carousel-list" ng-transclude></ul><ol class="carousel-pager"><li class="page-number" ng-repeat="slide in slides" ng-class="{active: slide.active}" ng-click="setActiveSlide($index)">{{$index + 1}}</li></ol></div>',
			replace: !0
		}
	}).directive("slide",
	function() {
		return {
			require: "^carousel",
			restrict: "EA",
			transclude: !0,
			scope: {},
			link: function(a, b, c, d) {
				d.addSlide(a)
			},
			template: '<li class="carousel-block" ng-transclude></li>',
			replace: !0
		}
	})
} (),
angular.module("eleme.ui").directive("dropdown", ["$document",
function(a) {
	var b = [],
	c = function(a, b) {
		for (var c = a; c && "HTML" !== c.nodeName;) {
			if (c === b) return ! 0;
			c = c.parentNode
		}
		return ! 1
	};
	return a.on("click",
	function(a) {
		b.forEach(function(b) {
			var d = c(a.target || a.srcElement, b.element[0]);
			d || b.close()
		})
	}),
	{
		restrict: "A",
		controller: ["$scope", "$element",
		function(a, c) {
			var d = this;
			d.element = c,
			d.isOpened = !1;
			var e = function(a) {
				a.stopPropagation(),
				d.isOpened ? d.close() : d.open()
			};
			d.initToggleElement = function(a) {
				d.toggleElement = a,
				a.on("click", e)
			},
			d.open = function() {
				d.isOpened = !0,
				c.addClass("open"),
				b.push(d)
			},
			d.close = function() {
				d.isOpened = !1;
				var a = b.indexOf(this); - 1 !== a && (d.element.removeClass("open"), b.splice(a, 1))
			},
			a.$on("$destroy",
			function() {
				d.toggleElement && d.toggleElement.off("click", e)
			})
		}]
	}
}]).directive("dropdownToggle",
function() {
	return {
		require: "^dropdown",
		restrict: "A",
		link: function(a, b, c, d) {
			d.initToggleElement(b)
		}
	}
}),
angular.module("eleme.ui").directive("sticky",
function() {
	function a(a) {
		var b = a.element;
		a.stickyBodyClass && c.removeClass(a.stickyBodyClass),
		a.stickyClass && b.removeClass(a.stickyClass),
		a.active = !1,
		a.deactiveScrollTop = null
	}
	var b = [],
	c = angular.element(document.body);
	return angular.element(window).on("scroll", DomUtil.throttle(function() {
		for (var d = Math.max(window.scrollY || 0, document.documentElement.scrollTop || 0), e = 0, f = b.length; f > e; e++) {
			var g = b[e],
			h = g.element,
			i = h[0].getBoundingClientRect(); ! g.active && i.top < 0 ? (g.stickyBodyClass && c.addClass(g.stickyBodyClass), g.stickyClass && h.addClass(g.stickyClass), g.active = !0, g.deactiveScrollTop = d + i.top) : d < g.deactiveScrollTop && a(g)
		}
	},
	100)),
	{
		restrict: "A",
		scope: {},
		link: function(c, d, e) {
			b.push({
				element: d,
				active: !1,
				scope: c,
				stickyBodyClass: e.stickyBodyClass,
				stickyClass: e.stickyClass
			}),
			c.$on("$destroy",
			function() {
				for (var c = 0,
				e = b.length; e > c; c++) {
					var f = b[c];
					if (f.element === d) {
						a(f),
						b.splice(c, 1);
						break
					}
				}
			})
		}
	}
}),
angular.module("eleme.ui").factory("templateParser", ["$parse", "$interpolate",
function(a, b) {
	function c(e) {
		if (1 === e.nodeType) {
			var f, g, h, i, j = [],
			k = {
				tagName: e.tagName.toLowerCase()
			},
			l = e.attributes;
			for (h = 0, i = l.length; i > h; h++) {
				var m = l[h],
				n = m.name,
				o = m.nodeValue;
				if (n && "ng-" === n.substr(0, 3)) if (g || (g = {}), n.length > 8 && "ng-attr-" === n.substr(0, 8)) f || (f = {}),
				f[n.substr(9)] = a(o);
				else if ("ng-repeat" === n) {
					var p = /(\w+)\s+in(.*?)$/.exec(o);
					p && (g[n] = {
						itemName: p[1],
						getArray: a(p[2])
					})
				} else g[n] = d[n] ? b(o) : a(o);
				else f || (f = {}),
				/\s*({{\s*(.+?)\s*}})\s*/gi.test(o) ? f[n] = b(o) : f[n] = o
			}
			var q = e.childNodes;
			for (h = 0, i = q.length; i > h; h++) {
				var r = q[h];
				if (3 !== r.nodeType) j.push(c(r));
				else {
					var s = r.nodeValue;
					s && (/\s*({{\s*(.+?)\s*}})\s*/gi.test(s) ? j.push(b(s)) : (s = s.replace(/(\r\n|\n|\r|\s)/gm, ""), s.length && j.push(s)))
				}
			}
			return j.length > 0 && (k.children = j),
			f && (k.attrs = f),
			g && (k.dirs = g),
			k
		}
	}
	var d = {
		"ng-src": !0,
		"ng-href": !0
	};
	return {
		parse: function(a) {
			var b = document.createElement("div");
			return b.innerHTML = a,
			c(b).children
		}
	}
}]).factory("templateBuilder", [function() {
	function a(a) {
		var b = {};
		for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
		return b
	}
	function b(a) {
		var b = function() {};
		return b.prototype = a,
		new b
	}
	function c(a) {
		var b = "";
		for (var c in a) a.hasOwnProperty(c) && (b += c + ":" + a[c] + ";");
		return b
	}
	function d(a) {
		var b = [];
		for (var c in a) a.hasOwnProperty(c) && a[c] && b.push(c);
		return b.join(" ")
	}
	function e(b) {
		var c = a(b);
		return c.dirs = a(b.dirs),
		c.dirs["ng-repeat"] = null,
		delete c.dirs["ng-repeat"],
		c
	}
	function f(a, j) {
		var k, l, m;
		if (a instanceof Array) {
			for (k = "", l = 0, m = a.length; m > l; l++) k += f(a[l], j);
			return k
		}
		if ("string" == typeof a) return a;
		if ("function" == typeof a) return a(j);
		var n = a.tagName,
		o = a.children,
		p = a.attrs,
		q = a.dirs,
		r = a.textContent,
		s = "",
		t = "";
		if (q && q["ng-repeat"]) {
			var u = e(a),
			v = q["ng-repeat"],
			w = v.getArray(j) || i,
			x = v.itemName;
			for (k = "", l = 0, m = w.length; m > l; l++) {
				var y = b(j);
				y.$index = l,
				y.$first = 0 === l,
				y.$last = l === m - 1,
				y.$middle = !(y.$first || y.$last),
				y[x] = w[l],
				k += f(u, y)
			}
			return k
		}
		k = "<" + n;
		for (var z in q) if (q.hasOwnProperty(z)) {
			var A, B = q[z];
			if ("function" == typeof B && (A = B(j)), "ng-if" === z) {
				if (!A) return ""
			} else g[z] ? k += " " + z.substr(3) + '="' + A + '"': h[z] ? r = A: "ng-style" === z ? t = c(A) + t: "ng-class" === z ? s += d(A) : ("ng-show" === z || "ng-hide" === z) && A && (s += " " + z)
		}
		for (var C in p) if (p.hasOwnProperty(C)) {
			var D = p[C];
			"function" == typeof D && (D = D(j)),
			"class" === C ? s += " " + D: k += " " + C + '="' + D + '"'
		}
		if (s && (k += ' class="' + s.trim() + '"'), t && (k += ' style="' + t + '"'), k += ">", r && (k += r), o) for (l = 0, m = o.length; m > l; l++) {
			var E = o[l];
			k += f(E, j)
		}
		return k += "</" + n + ">"
	}
	var g = {
		"ng-src": !0,
		"ng-href": !0,
		"ng-alt": !0,
		"ng-title": !0,
		"ng-id": !0,
		"ng-disabled": !0,
		"ng-value": !0
	},
	h = {
		"ng-html": !0,
		"ng-bind": !0,
		"ng-text": !0
	},
	i = [];
	return {
		build: f
	}
}]),
void
function() {
	angular.module("eleme.ui").directive("tooltip", ["Popover",
	function(a) {
		var b = {
			left: !0,
			right: !0,
			top: !0,
			bottom: !0
		},
		c = {
			mouseenter: !0,
			click: !0,
			focus: !0
		},
		d = "tooltip-placetop tooltip-placebottom tooltip-placeleft tooltip-placeright",
		e = a.extend({
			defaults: {
				content: null,
				enable: !0,
				showDelay: 200,
				animation: "fade"
			},
			render: function() {
				var a = document.createElement("div"),
				b = document.createElement("div"),
				c = document.createElement("div");
				return a.className = "tooltip",
				b.className = "tooltip-arrow",
				c.className = "tooltip-content",
				a.appendChild(b),
				a.appendChild(c),
				c.innerHTML = this.get("content"),
				this.dom = a,
				this.contentDom = c,
				a
			},
			willShow: function() {
				var a = this;
				if (a.get("enable")) {
					var b = a.get("content");
					return void 0 !== b && null !== b && "" !== b
				}
			},
			afterLocate: function(a) {
				var b = this,
				c = b.dom;
				angular.$(c).removeClass(d).addClass("tooltip-place" + a)
			},
			refresh: function() {
				var a = this,
				b = a.dom;
				a.contentDom.innerHTML = a.get("content");
				var c = a.get("placement");
				angular.$(b).addClass("tooltip-place" + c)
			}
		});
		return {
			restrict: "EA",
			link: function(a, d, f) {
				var g = parseInt(f.tooltipShowDelay, 10),
				h = f.tooltipPlacement,
				i = f.tooltipTrigger,
				j = {
					content: f.tooltip,
					animation: "false" !== f.tooltipAnimation ? "fade": !1,
					enable: "false" !== f.tooltipEnable,
					placement: b[h] ? h: void 0,
					showDelay: isNaN(g) ? void 0 : g,
					trigger: c[i] ? i: void 0,
					target: d[0]
				},
				k = new e(j);
				f.$observe("tooltip",
				function(a) {
					k.set("content", a)
				}),
				f.$observe("tooltipEnable",
				function(a) {
					"string" == typeof a && (a = "false" !== a),
					void 0 !== a && k.set("enable", a)
				}),
				a.$on("$destroy",
				function() {
					k.destroy()
				})
			}
		}
	}])
} (),
angular.module("eleme.page", []),
angular.module("page.place", []),
angular.module("eleme", ["ngRoute", "ngCookies", "eleme.ui", "eleme.zero", "eleme.page", "page.place", "batchrequest", "ie8provider", "httphook", "popover.js", "UBT"])
.config(["$routeProvider", "$locationProvider", "$interpolateProvider", "$provide", "ZeroProvider", "ie8Provider",
function(a, b, c, d, e, f) {
	e.setHost("/restapi/"),
	b.html5Mode(!0),
	d.decorator("$sniffer", ["$delegate",
	function(a) {
		var b = Number(document.documentMode),
		c = document.createElement("div"),
		d = {};
		return a.hasEvent = function(a) {
			return "input" === a && 11 >= b ? !1 : (angular.isUndefined(d[a]) && (d[a] = "on" + a in c), d[a])
		},
		a
	}]),
	a.when("/", {
		redirectTo: "/place"
	}),
	a.when("/:page", {
		template: "<div></div>",
		controller: ["$rootScope", "$location", "$routeParams",
		function(a, b, c) {
			var d = ["place", "premium"],
			e = c.page,
			f = localStorage.getItem("GEOHASH");
			return - 1 !== d.indexOf(e) && f ? b.url(c.page + "/" + f) : void(location.href = a.MAINBASE + "/?force")
		}]
	}),
	a.when("/place/:geohash", {
		templateUrl: "/pc/page/place/place.html",
		controller: "placeCtrl"
	}),
	a.when("/premium/:geohash", {
		templateUrl: "/pc/page/place/premium/premium.html",
		controller: "premiumCtrl"
	}),
	a.when("/mix/:geohash", {
		templateUrl: "/pc/page/place/mix/mix.html",
		controller: "mixCtrl"
	}),
	a.when("/activity/:name_for_url", {
		templateUrl: "/pc/page/activity/activity.html",
		controller: "activityCtrl"
	}),
	a.when("/place/:geohash/search/:keyword", {
		templateUrl: "/pc/page/place/search/search.html",
		controller: "searchCtrl"
	}),
	f.customTags.push("header", "footer", "location", "eleme-sidebar", "eleme-topbar", "excavator", "rst-block", "carousel", "slide", "search-input", "rst-view")
}]).run(["httphook", "batchrequest.BatchHandler", "$rootScope", "$q",
function(a, b, c, d) {
	var e = "restapi." + c.ROOTHOST;
	a.get(/^\/restapi\/\w+\/(?!user|captchas|premium_vips|hongbao_groups|carts)/,
	function(a) {
		a.url = a.url.replace(/^\/restapi/, "//" + e)
	}),
	a.get(new RegExp("^//" + e + "/\\w+/"), b("//" + e + "/batch",
	function(a) {
		a.url = a.url.replace(new RegExp("^//" + e), "")
	})),
	a.get(/^\/restapi\/\w+\//, b("/restapi/batch",
	function(a) {
		a.url = a.url.replace(/^\/restapi/, "")
	}));
	var f = [];
	Number(document.documentMode) < 10 && window.XDomainRequest && a.get(new RegExp("//" + e),
	function(a, b) {
		var c = d.defer(),
		e = new XDomainRequest;
		e.open(a.method, a.url, !0),
		f.push(e);
		var g = f.length - 1;
		return e.onload = function() {
			delete f[g],
			b.data = JSON.parse(e.responseText),
			b.status = 200,
			c.resolve(!1)
		},
		e.onerror = function() {
			b.data = JSON.parse(e.responseText || "{}"),
			b.status = 500,
			c.resolve(!1)
		},
		e.send(JSON.stringify(a.data)),
		c.promise
	})
}]),
angular.module("eleme").run(["$templateCache",
function(a) {
	"use strict";
	a.put("/pc/common/ui/_block/modal/modal.html", '<div ng-show="display">\n  <div ng-include="templateUrl" class="modal-content" ng-class="classes"></div>\n  <div class="modal-shade"></div>\n</div>\n'),
	a.put("/pc/common/ui/scss/base/iconfont.html", '<link rel="stylesheet" href="/pc/dist/css/eleme.lib.css" />\n<style>\nbody {\n  padding: 10px;\n}\ni {\n  display: inline-block;\n  margin: 10px;\n  font-size: 100px;\n  border: 1px solid #ccf;\n  color: #006bc7;\n  cursor: pointer;\n  transition: background-color 200ms ease;\n}\ni:hover {\n  background-color: #eef;\n}\n</style>\n<script>\nvar xhr = new XMLHttpRequest();\n' + "xhr.open('GET', 'font.scss');\nxhr.onload = function() {\n  xhr.responseText.replace(/\\.(icon-[^:]+)/g, function($0, name) {\n    var i = document.createElement('i');\n    i.title = i.className = name;\n    i.onclick = function() {\n      alert($0);\n    }\n    document.body.appendChild(i);\n  });\n};\nxhr.send();\n</script>\n\n"),
	a.put("/pc/page/_block/footer/footer.html", '<footer class="footer">\n  <div class="container clearfix">\n    <div class="footer-link">\n      <h3 class="footer-link-title">用户帮助</h3>\n      <a class="footer-link-item" href="/support" target="_blank">服务中心</a>\n      <a class="footer-link-item" href="/help" target="_blank">常见问题</a>\n      <a class="footer-link-item" href="/feedback" target="_blank">意见反馈</a>\n      <a class="footer-link-item" href="/customerservice?jid=1820947377&companyID=402791&configID=123801&title=%E9%A5%BF%E4%BA%86%E4%B9%88" target="_blank">在线客服</a>\n    </div>\n    <div class="footer-link">\n      <h3 class="footer-link-title">商务合作</h3>\n      <a class="footer-link-item" href="//kaidian.ele.me" target="_blank">我要开店</a>\n      <a class="footer-link-item" href="/about/jiameng" target="_blank">加盟指南</a>\n      <a class="footer-link-item" href="/about/contact" target="_blank">市场合作</a>\n    </div>\n    <div class="footer-link">\n      <h3 class="footer-link-title">关于我们</h3>\n      <a class="footer-link-item" href="/about" target="_blank">饿了么介绍</a>\n      <a class="footer-link-item" href="http://jobs.ele.me/" target="_blank">加入我们</a>\n      <a class="footer-link-item" href="/about/contact" target="_blank">联系我们</a>\n      <a class="footer-link-item" href="/about/agreement" target="_blank">服务协议</a>\n    </div>\n    <div class="footer-contect">\n      <div class="footer-contect-item">24小时客服热线 : <strong>10105757</strong></div>\n      <div class="footer-contect-item">意见反馈 : <strong>eleme.pm@ele.me</strong></div>\n      <div class="footer-contect-item">关注我们 :\n        <div href="JavaScript:" class="elemeicon elemeicon-wechat">\n          <div class="dropbox dropbox-bottom footer-contect-dropbox">\n            <img src="http://static11.elemecdn.com/eleme/desktop/media/img/190bd870.wexinqc100@2x.png">\n            <p>微信号: elemeorder</p>\n            <p>饿了么网上订餐</p>\n          </div>\n        </div>\n        <a href="http://e.weibo.com/elemeorder" class="elemeicon elemeicon-weibo" target="_blank"></a>\n        <a href="http://page.renren.com/elemeorder" class="elemeicon elemeicon-renren" target="_blank"></a>\n      </div>\n    </div>\n    <div class="footer-mobile">\n      <a href="/mobile" target="_blank">\n        <img src="http://static11.elemecdn.com/eleme/desktop/media/img/64620018.appqc.png" class="footer-mobile-icon"></img>\n      </a>\n      <div class="footer-mobile-content">\n        <h3>下载手机版</h3>\n        <p>扫一扫,手机订餐方便</p>\n        <a ng-href="{{MOBILEBASE}}/download/ios/eleme" target="_blank" class="icon-phone">iPhone</a>\n        <a ng-href="{{MOBILEBASE}}/download/android/eleme" target="_blank" class="icon-android">Android</a>\n      </div>\n    </div>\n    <div class="footer-copyright serif">\n      增值电信业务许可证 : <a href="http://www.shca.gov.cn/" target="_blank">沪B2-20150033</a> | <a href="http://www.miibeian.gov.cn/" target="_blank">沪ICP备 09007032</a> | <a href="http://www.sgs.gov.cn/lz/licenseLink.do?method=licenceView&entyId=20120305173227823" target="_blank">上海工商行政管理</a> Copyright ©2008-2015 ele.me, All Right Reserved.\n    </div>\n  </div>\n</footer>\n\n'),
	a.put("/pc/page/_block/importantnotification/importantnotification.html", '<div class="importantnotification container">\n  <div ng-if="enable">\n    饿了么将于 2015 年 04 月 23 日 00:00 - 02:00 进行维护，维护期间网站暂时不可访问，由此给您带来不便，敬请谅解。\n  </div>\n</div>\n\n'),
	a.put("/pc/page/_block/location/location.html", '<div class="location" ng-style="{visibility: geohash ? \'\' : \'hidden\'}">\n  <span>当前位置:</span>\n  <span class="location-current"><a ng-href="/place/{{geohash}}" ubt-click="top_nav_click">{{place.name || place.address}}</a></span>\n  <span class="location-change" ng-class="{ \'location-hashistory\': user.username && userPlaces && userPlaces.length > 0 }">\n    <a ng-if="!user.username || !userPlaces || userPlaces.length === 0" href="{{MAINBASE}}/?force=1" ubt-click="location_enter">[切换地址]</a>\n    <a ng-if="user.username && userPlaces && userPlaces.length > 0" href="JavaScript:" ubt-click="location_enter">[切换地址]</a>\n    <ul class="dropbox location-dropbox">\n      <li class="arrow"></li>\n      <li ng-repeat="userPlace in userPlaces | filter:filterPlace | limitTo: 4"><a ng-href="/place/{{userPlace.geohash}}" ng-bind="userPlace.name" ubt-click="location_layer_switch"></a></li>\n      <li class="changelocation"><a href="{{MAINBASE}}/?force=1">修改送餐地址<span class="icon-pin"></span></a></li>\n    </ul>\n  </span>\n  <span ng-transclude></span>\n</div>\n'),
	a.put("/pc/page/_block/modal/modal-login.html", '<iframe class="modallogin" ng-src="{{LOGINFRAME}}"></iframe>\n<i class="modal-cancel icon-close"></i>\n'),
	a.put("/pc/page/_block/sidebar/sidebar-cart/sidebar-cart.html", '<div ng-controller="sidebarCartCtrl">\n  <div class="sidebarcart-caption">\n    <a ng-href="{{RESTAURANTBASE + \'/\' + cart.restaurant_info.name_for_url }}" ng-bind="cart.restaurant_info.name || \'美食篮子\'" target="_blank" ubt-click="restaurant_basket"></a>\n    <span class="icon-angle-double-right" ng-click="toggleSidebar()"></span>\n  </div>\n  <!-- loading -->\n  <div class="sidebarcart-loading" ng-if="!cart.$resolved">\n    <img src="http://static11.elemecdn.com/eleme/desktop/media/img/00445319.loading.gif">\n  </div>\n  <!-- 篮子列表 -->\n  <div ng-if="cart && cart.group.length" class="sidebarcart">\n    <!-- 篮子 -->\n    <dl ng-if="basket.length" ng-repeat="basket in cart.group">\n      <dt>\n        <span ng-bind="$index + 1 + \'号篮子\'"></span>\n        <a ng-if="basket.length" ng-click="basket.remove()" href="JavaScript:" class="sidebarcart-clear">[清空] </a>\n      </dt>\n      <!-- 食物 -->\n      <dd ng-repeat="item in basket">\n        <ul>\n          <li class="clearfix">\n            <div class="sidebarcart-name" ng-bind="item.name" title="{{item.name}}"></div>\n            <div class="sidebarcart-quantity">\n              <span ng-click="item.sub()">-</span>\n              <input ng-model="item.quantity" ng-change="item.update()" type="text">\n              <span ng-click="item.add()">+</span>\n            </div>\n            <div class="sidebarcart-price" ng-bind="item.price"></div>\n          </li>\n        </ul>\n        <!-- 配菜 -->\n        <ul ng-if="item.garnish.length" class="sidebarcart-garnish">\n          <li ng-repeat="gar in item.garnish" class="clearfix">\n            <div class="sidebarcart-name" ng-bind="gar.name" title="{{gar.name}}"></div>\n            <div class="sidebarcart-quantity">\n              <span ng-click="gar.sub()">-</span>\n              <input ng-model="gar.quantity" ng-change="gar.update()" type="text">\n              <span ng-click="gar.add()">+</span>\n            </div>\n            <div class="sidebarcart-price" ng-bind="item.price"></div>\n          </li>\n        </ul>\n      </dd>\n    </dl>\n    <dl class="sidebarcart-extra" ng-if="cart.extra">\n      <dt>其他费用</dt>\n      <dd>\n        <ul>\n          <li ng-repeat="item in cart.extra" class="clearfix">\n            <div class="sidebarcart-name" ng-bind="item.name" title="{{item.name}}"></div>\n            <div class="sidebarcart-price" ng-bind="item.price"></div>\n          </li>\n        </ul>\n      </dd>\n    </dl>\n  </div>\n  <div class="sidebarcart-summary" ng-show="cart && cart.group.length">\n    <p>共 <span ng-bind="cart.pieces"></span> 份，总计 <span ng-bind="cart.total" class="sidebarcart-total"></span></p>\n    <button ng-click="settle()" class="sidebarcart-submit" ng-class="{ \'sidebarcart-hasagio\': submitionButtonDisabled }" ng-bind="submitionButtonText" ubt-click="toolbar_order_confirm"></button>\n  </div>\n  <div ng-if="cart.$resolved && !cart.group.length" class="sidebarcart-notice">\n    <i class="icon-history"></i>\n    <h3>美食篮子空空如也</h3>\n    <p>快去订餐吧，总有你心仪的美食</p>\n  </div>\n</div>\n\n'),
	a.put("/pc/page/_block/sidebar/sidebar-history/sidebar-history.html", '<div ng-controller="sidebarHistoryCtrl" class="sidebarhistory">\n  <div class="sidebarhistory-title">我查看过的餐厅<span class="icon-angle-double-right" ng-click="toggleSidebar()"></span></div>\n  <div class="sidebarhistory-loading" ng-if="!restaurants">\n    <img src="http://static11.elemecdn.com/eleme/desktop/media/img/00445319.loading.gif">\n  </div>\n  <rst-block ng-repeat="restaurant in restaurants | orderBy: \'-is_opening\' | limitTo: 20" data="{ $restaurant: restaurant }" ubt-click="restaurant_mypath"></rst-block>\n  <div ng-show="restaurants && !restaurants.length" class="sidebarhistory-nocontent">\n    <div class="sidebarhistory-image icon-visit-history"></div>\n    <p class="sidebarhistory-notice">哎呀，你都没有查过附近餐厅吗</p>\n    <p class="sidebarhistory-notice small">赶快开始你的美食探索吧！</p>\n  </div>\n</div>\n\n'),
	a.put("/pc/page/_block/sidebar/sidebar-message/sidebar-message.html", '<div ng-controller="sidebarMessageCtrl">\n  <div class="sidebarmessage-title">我的消息<span class="icon-angle-double-right" ng-click="toggleSidebar()"></span><a href="JavaScript:" class="sidebarmessage-btn" ng-click="MessageManager.markAllAsRead()" ng-if="messageList.$resolved && messageList.length">清空消息</a></div>\n  <div class="sidebarmessage-loading" ng-if="!messageList.$resolved">\n    <img src="http://static11.elemecdn.com/eleme/desktop/media/img/00445319.loading.gif">\n  </div>\n  <div ng-show="messageList.$resolved && !messageList.length" class="sidebarmessage-notice">\n    <i class="icon-notice"></i>\n    您没有新的消息哦\n  </div>\n  <div class="sidebarmessage-list" ng-repeat="item in messageList" ng-class="{\'sidebarmessage-list-even\': $index % 2}">\n    <small class="sidebarmessage-list-time" ng-bind="item.created_at | date: \'MM月dd日 hh:ss\'"></small>\n    <strong class="sidebarmessage-list-title" ng-bind="item.abstract"></strong>\n    <p class="sidebarmessage-list-content" ng-bind="item.content"></p>\n  </div>\n</div>\n'),
	a.put("/pc/page/_block/sidebar/sidebar.html", '<div class="sidebar">\n  <div class="sidebar-tabs">\n    <div class="toolbar-tabs-middle">\n      <a class="toolbar-btn icon-order" href="/profile/order" tooltip="我的饿单" target="_blank" tooltip-placement="left" ubt-click="toolbar_order"><i class="toolbar-btn-dot icon-primitive-dot" ng-if="sidebarCount.uncompletedOrder > 0"></i></a>\n      <div class="toolbar-separator"></div>\n      <a class="toolbar-cartbtn icon-cart toolbar-open" href="JavaScript:" template="cart" ng-class="{\'focus\': (activeTemplate === \'cart\' && isSidebarOpen), \'toolbar-cartbtn-shownum\': foodCount.count}" ubt-click="toolbar_basket">\n        美食篮子<i class="toolbar-cartnum" ng-if="foodCount.count" ng-bind="foodCount.count"></i>\n      </a>\n      <div class="toolbar-separator"></div>\n      <a class="toolbar-btn icon-notice" href="JavaScript:" template="message" ng-class="{\'focus\': (activeTemplate === \'message\' && isSidebarOpen), \'toolbar-open\': user, \'modal-hide\': user}" tooltip="我的信息" tooltip-placement="left" modal="_block/modal/modal-login" ubt-click="toolbar_msg">\n        <i class="toolbar-btn-dot icon-primitive-dot" ng-if="messageCount.count"></i>\n      </a>\n      <a class="toolbar-btn icon-history toolbar-open" href="JavaScript:" template="history" ng-class="{\'focus\': (activeTemplate === \'history\' && isSidebarOpen)}" tooltip="浏览历史" tooltip-placement="left" ubt-click="toolbar_mypath">\n        <!--<i class="toolbar-btn-dot icon-primitive-dot" ng-if="hasHistory"></i>-->\n      </a>\n    </div>\n    <div class="toolbar-tabs-bottom">\n      <div class="toolbar-btn icon-QR-code">\n        <div class="dropbox toolbar-tabs-dropbox">\n          <a href="/mobile" target="_blank">\n            <img src="http://static11.elemecdn.com/eleme/desktop/media/img/64620018.appqc.png">\n            <p>下载手机应用</p>\n            <p class="icon-QR-code-bonus">即可参加分享红包活动</p>\n          </a>\n        </div>\n      </div>\n      <a class="toolbar-btn icon-service" online-service  tooltip="在线客服" tooltip-placement="left" id="live800iconlink" target="_blank" href="JavaScript:"></a>\n      <a class="toolbar-btn icon-feedback" href="/feedback" target="_blank" tooltip="意见反馈" tooltip-placement="left"></a>\n      <a class="toolbar-btn sidebar-btn-backtop icon-top" tooltip="回到顶部" href="JavaScript:" tooltip-placement="left"></a>\n    </div>\n  </div>\n  <div class="sidebar-content">\n' + "    <div ng-include=\"activeTemplate ? ('/pc/page/_block/sidebar/sidebar-'+ activeTemplate + '/sidebar-'+ activeTemplate + '.html') : ''\"></div>\n  </div>\n</div>\n\n"),
	a.put("/pc/page/_block/topbar/topbar.html", '<header class="topbar">\n  <div class="container clearfix">\n    <a href="/" class="topbar-logo icon-logo"></a>\n    <a href="/" class="topbar-item topbar-homepage" ng-class="{\'focus\': locationpath[0] === \'place\'}">首页</a>\n    <a ng-if="$root.place.premiumCount > 0" ng-href="/premium/{{$root.geohash}}" class="topbar-item" ng-class="{\'focus\': locationpath[0] === \'premium\'}">品牌餐厅<i class="elemeicon elemeicon-hot"></i></a>\n    <a href="/profile/order" class="topbar-item" target="_blank">我的饿单</a>\n    <nav class="topbar-nav">\n      <a href="/gift" class="topbar-nav-link" target="_blank"><i class="topbar-nav-icon icon-gift"></i>积分商城</a>\n      <a href="/support" class="topbar-nav-link" target="_blank"><i class="topbar-nav-icon icon-service"></i>客服中心</a>\n      <div class="topbar-nav-link"><i class="topbar-nav-icon icon-mobile"></i>手机应用\n        <div class="dropbox topbar-mobile-dropbox">\n          <span>扫一扫, 手机订餐更方便</span>\n          <img src="http://static11.elemecdn.com/eleme/desktop/media/img/64620018.appqc.png" class="topbar-nav-qrcode">\n          <a ng-href="{{MOBILEBASE}}/download/ios/eleme" class="topbar-nav-iosbtn" target="_blank"></a>\n          <a ng-href="{{MOBILEBASE}}/download/android/eleme" class="topbar-nav-androidbtn" target="_blank"></a>\n        </div>\n      </div>\n      <div class="topbar-profilebox">\n        <img class="topbar-profilebox-avatar" ng-src="{{FUSSBASE + user.avatar}}" ng-show="user.avatar">\n        <span class="topbar-profilebox-avatar icon-profile" ng-show="!user.username"></span>\n        <span ng-show="!user.username"><a ng-href="{{ACCOUNTBASE}}/login" target="_blank">登录</a>/<a href="{{ACCOUNTBASE}}/register" target="_blank">注册</a></span>\n        <span class="topbar-profilebox-wrapper" ng-show="user.username">\n          <span class="topbar-profilebox-username">{{user.username}}</span>\n          <span class="topbar-profilebox-btn icon-arrow-down"></span>\n          <div class="dropbox topbar-profilebox-dropbox">\n            <a class="icon-profile" href="/profile" target="_blank">个人中心</a>\n            <a class="icon-star" href="/profile/favor_restaurant" target="_blank">我的收藏</a>\n            <a class="icon-location" href="/profile/address" target="_blank">我的地址</a>\n            <a class="icon-setting" href="/profile/security" target="_blank">安全设置</a>\n            <a class="icon-logout" href="JavaScript:" ng-click="logout()">退出登录</a>\n          </div>\n        </span>\n      </div>\n    </nav>\n  </div>\n</header>\n\n'),
	a.put("/pc/page/activity/activity.html", '<div location ng-if="geohash"><i class="icon-arrow-right"></i>{{activity.name}}</div>\n\n<div class="activity" activity-body>\n  <div class="activity-banner"  ng-style="{ visibility: activity.detail_image_path ? \'\' : \'hidden\' }">\n    <img ng-src="{{activity.detail_image_path ? FUSSBASE + activity.detail_image_path : \'\'}}"/>\n  </div>\n  <div class="activity-list">\n    <h1>活动列表</h1>\n    <ul>\n      <li ng-repeat="act in activities" ng-class="{active: activity && act.name_for_url === activity.name_for_url}">\n        <a href="/activity/{{act.name_for_url}}">{{act.name}}</a>\n      </li>\n    </ul>\n  </div>\n  <div class="activity-content typo">\n    <div class="activity-entry">\n      <div ng-bind-html="activity.summary">{{activity.summary}}</div>\n      <h1 ng-if="activity.notice">注意事项：</h1>\n      <div ng-bind-html="activity.notice"></div>\n    </div>\n  </div>\n</div>\n\n'),
	a.put("/pc/page/place/_block/excavator/excavator.html", '<div class="excavator">\n  <div class="excavator-filter" ng-if="link.flavors.length">\n    <span class="excavator-filter-name">餐厅分类:</span>\n    <span class="excavator-filter-item" ng-class="{\'focus\':!clickedFlavor }" ng-click="changeFlavor()" ubt-click="taste_type">不限</span>\n    <span class="excavator-filter-item" ng-repeat="flavor in link.flavors" ng-class="{\'focus\': clickedFlavor === flavor}" ng-bind="flavor" ng-click="changeFlavor(flavor)" ubt-click="taste_type"></span>\n  </div>\n  <div class="excavator-filter excavator-line" ng-if="link.activityNames.length">\n    <span class="excavator-filter-name">优惠活动:</span>\n    <span class="excavator-filter-item" ng-class="{\'focus\':!clickedActivity }" ng-click="changeActivity()" ubt-click="activity_type">不限</span>\n    <span class="excavator-filter-item" ng-class="{\'focus\': clickedActivity === \'$any\' }" ng-click="changeActivity(\'$any\')" ubt-click="activity_type">全部优惠活动</span>\n    <span class="excavator-filter-item" ng-repeat="activity in link.activityNames" ng-class="{\'focus\': clickedActivity === activity}" ng-bind="activity" ng-click="changeActivity(activity)" ubt-click="activity_type"></span>\n  </div>\n  <div class="excavator-bgbar clearfix" ng-if="link.restaurants.length" sticky sticky-body-class="excavator-sticky">\n    <div search-input></div>\n    <div class="excavator-sort">\n      <a href="JavaScript:" class="excavator-sort-item focus" ng-class="{\'focus\': !link.orderBy}" ng-click="changeOrder()" ubt-click="sort_type">默认排序</a>\n      <a href="JavaScript:" class="excavator-sort-item" ng-class="{\'focus\': link.orderBy === \'-month_sales\'}" ng-click="changeOrder(\'-month_sales\')" ubt-click="sort_type">销量</a>\n      <a href="JavaScript:" class="excavator-sort-item" ng-class="{\'focus\': link.orderBy === \'-rating\'}" ng-click="changeOrder(\'-rating\')" ubt-click="sort_type">评价</a>\n      <div class="excavator-sort-item" ng-class="{\'focus\': otherOrder}">\n        <a href="JavaScript:" ng-class="{\'focus\': otherOrder}">\n          <span ng-bind="otherOrder || \'其他排序\'"></span>\n          <i class="icon-arrow-down"></i><i class="icon-arrow-up"></i>\n        </a>\n        <div class="excavator-sort-dropdown">\n          <a href="JavaScript:" ng-class="{\'focus\': link.orderBy === \'order_lead_time\'}" ng-show="orderWay !== \'order_lead_time\'" ng-click="changeOrder(\'order_lead_time\')" ubt-click="sort_type">配送速度</a>\n          <a href="JavaScript:" ng-class="{\'focus\': link.orderBy === \'minimum_order_amount\'}" ng-show="orderWay !== \'minimum_order_amount\'" ng-click="changeOrder(\'minimum_order_amount\')" ubt-click="sort_type">起送金额</a>\n          <a href="JavaScript:" ng-class="{\'focus\': link.orderBy === \'-id\'}" ng-show="orderWay !== \'-id\'" ng-click="changeOrder(\'-id\')" ubt-click="sort_type">新开餐厅</a>\n        </div>\n      </div>\n      <div class="excavator-sort-item">\n        <a href="JavaScript:" ng-class="{\'focus\': option.mimOrder}">\n          <span ng-class="{\'focus\': option.mimOrder}" ng-bind="option.mimOrder ? \'起送价格: \' + option.mimOrder + \' 元\' : \'起送价格: 不限\'"></span>\n          <i class="icon-arrow-down"></i><i class="icon-arrow-up"></i>\n        </a>\n        <div class="excavator-sort-dropdown wide">\n          <a href="JavaScript:" ng-class="{\'focus\': !option.mimOrder}" ng-click="option.mimOrder = \'\'" ubt-click="price_type">不限</a>\n          <a href="JavaScript:" ng-repeat="i in [15, 20, 30, 40]" ng-class="{\'focus\': option.mimOrder === i}" ng-click="option.mimOrder = i" ubt-click="price_type">{{i}}元以下</a>\n        </div>\n      </div>\n    </div>\n    <div class="excavator-option">\n      <label class="excavator-option-item"><input ng-model="option.freeDeliver" type="checkbox" ubt-click="service_type">免配送费</label>\n      <label class="excavator-option-item"><input ng-model="option.cash" type="checkbox" ubt-click="service_type">超时赔付</label>\n      <label class="excavator-option-item"><input ng-model="option.receipt" type="checkbox" ubt-click="service_type">可开发票</label>\n      <label class="excavator-option-item"><input ng-model="option.payOnline" type="checkbox" ubt-click="service_type">在线支付</label>\n    </div>\n  </div>\n</div>\n\n'),
	a.put("/pc/page/place/_block/fetch-takeout/fetch-takeout.html", '<div class="fetchtakeout-dialog">\n  <div class="fetchtakeout-dialog-header">\n    <a href="JavaScript:" class="fetchtakeout-close icon-close" ng-click="hide()"></a>\n    <h3>谁去拿外卖</h3>\n  </div>\n  <div class="fetchtakeout-dialog-body">\n    <div class="fetchtakeout-wrapper">\n      <h2 class="fetchtakeout-badge"></h2>\n      <button class="fetchtakeout-btn" ng-click="dice()" ng-class="{ active: btnActive }"></button>\n      <div class="fetchtakeout-rules">随机到最小数字的人去拿外卖</div>\n      <div class="fetchtakeout-emptytext" ng-show="diceList.length === 0">↓ Start</div>\n      <ul class="fetchtakeout-list">\n        <li ng-repeat="item in diceList track by $index" ng-class="{ \'selected\': item === minDice }">扔出了一个 {{item}}</li>\n      </ul>\n    </div>\n  </div>\n</div>\n'),
	a.put("/pc/page/place/_block/rst-block/rst-block.html", '<a class="rstblock" data-rst-id="{{restaurant.id}}" ng-class="{\'rstblock-closed\': !restaurant.is_opening || restaurant.in_delivery_area === false}" ng-href="{{restaurant.in_delivery_area === false ? \'JavaScript:\' : (($root || $rootScope).RESTAURANTBASE + \'/\' + restaurant.name_for_url)}}" target="{{restaurant.in_delivery_area === false ? \'\' : \'_blank\'}}">\n  <div class="rstblock-logo">\n    <img width="70" height="70" class="rstblock-logo-icon" ng-src="{{ !restaurant.image_path ? \'http://static11.elemecdn.com/eleme/desktop/media/img/36136340.rst-logo.png\' : (($root || $rootScope).FUSSBASE + restaurant.image_path + (($root || $rootScope).isRetina ? \'\' : \'?w=70&h=70\')) }}">\n    <span ng-if="restaurant.order_lead_time_text" ng-bind="restaurant.order_lead_time_text + \' 分钟\'" ng-class="{\'rstblock-left-timeout\': restaurant.order_lead_time === \'45+\'}"></span>\n    <div ng-if="restaurant.is_premium" class="elemeicon elemeicon-premiumsign rstblock-logo-premiumsign"></div>\n    <img ng-if="restaurant.certification === 1" class="rstblock-logo-passicon" src="http://static11.elemecdn.com/eleme/desktop/media/img/25ee65b1.passIcon_01.png">\n    <img ng-if="restaurant.certification === 2" class="rstblock-logo-passicon" src="http://static11.elemecdn.com/eleme/desktop/media/img/1ab4bb7d.passIcon_02.png">\n  </div>\n  <div class="rstblock-content">\n    <div class="rstblock-title" ng-bind="restaurant.name"></div>\n    <div class="rstblock-starrating icon-star">\n      <span class="icon-star" ng-style="{ width: (restaurant.rating * 20) + \'%\' }"></span>\n    </div>\n    <span class="rstblock-monthsales" ng-bind="\'月销\' + restaurant.month_sales + \'份\'"></span>\n    <div class="rstblock-cost" ng-bind="restaurant.minimum_order_amount + \'元起送 / \'+ (restaurant.delivery_fee ? (\'配送费\' + restaurant.delivery_fee + \'元\') : \'免费配送\')"></div>\n    <div ng-if="restaurant.status === 1 && restaurant.in_delivery_area !== false" class="rstblock-activity">\n      <i ng-repeat="activity in restaurant.activities | limitTo: 8" ng-bind="activity.icon_name" ng-style="activity.icon_color ? {background: (\'#\' + activity.icon_color)} : \'\'"></i>\n    </div>\n    <div ng-if="restaurant.in_delivery_area === false" class="rstblock-relaxing">餐厅超出配送范围</div>\n    <div ng-if="!restaurant.is_opening && restaurant.in_delivery_area !== false" class="rstblock-relaxing" ng-bind="restaurant.status === 2 ? \'餐厅繁忙,不接受新单\' : \'餐厅休息,暂不接单\'"></div>\n    <div ng-if="restaurant.status === 5 && restaurant.in_delivery_area !== false" class="rstblock-schedule" ng-bind="\'可预订，\' + restaurant.next_time + \'后送餐\'"></div>\n    <div ng-if="(restaurant.status === 3 || restaurant.status === 6) && restaurant.in_delivery_area !== false" class="rstblock-phone">暂时只能通过电话订购</div>\n  </div>\n</a>\n\n'),
	a.put("/pc/page/place/_block/rst-popover/rst-popover.html", '<div class="rstpopover-arrow"></div>\n<div class="rstpopover-title">{{restaurant.name}}</div>\n<div class="rstpopover-flavors">{{restaurant.flavors}}</div>\n<ul class="rstpopover-activities">\n  <li ng-repeat="activity in restaurant.activities" ><i ng-bind="activity.icon_name" ng-style="activity.icon_color ? {background: (\'#\' + activity.icon_color)} : \'\'"></i>{{activity.description || activity.name}}</li>\n</ul>\n<div class="rstpopover-certification" ng-if="restaurant.certification && restaurant.certification !== 0">\n  <img ng-src="{{restaurant.certification === 1 ? \'http://static11.elemecdn.com/eleme/desktop/media/img/25ee65b1.passIcon_01.png\' : \'http://static11.elemecdn.com/eleme/desktop/media/img/1ab4bb7d.passIcon_02.png\' }}">\n  <span>{{restaurant.certification === 1 ? \'该商家已通过个人身份认证\' : \'该商家已通过企业营业资质认证\' }}</span>\n</div>\n<ul class="rstpopover-delivery" ng-class="{ \'hidetime\': !restaurant.order_lead_time_text }">\n  <li class="rstpopover-delivery-minimumamount"><strong>{{restaurant.minimum_order_amount}}</strong>元起送</li>\n  <li class="rstpopover-delivery-fee" ng-if="restaurant.is_free_delivery">免费配送</li>\n  <li class="rstpopover-delivery-fee" ng-if="!restaurant.is_free_delivery">配送费<strong>{{restaurant.delivery_fee}}</strong>元</li>\n  <li class="rstpopover-delivery-time">平均<strong>{{restaurant.order_lead_time_text}}</strong>分钟送达</li>\n</ul>\n<div class="rstpopover-notice">{{restaurant.promotion_info}}</div>\n'),
	a.put("/pc/page/place/_block/search-input/search-input.html", '<div class="place-search">\n  <a class="place-search-btn icon-search"></a>\n  <input class="place-search-input" ng-model="searchText" autocomplete placeholder="搜索餐厅,美食...">\n  <div class="searchbox">\n    <div class="searchbox-list searchbox-rstlist" ng-show="searchRestaurants && searchRestaurants.length > 0" ng-class="{ \'show-separator\': searchFoods && searchFoods.length > 0 }">\n      <ul>\n        <li ng-repeat="restaurant in searchRestaurants | orderBy: [ \'-is_opening\', \'order_lead_time\' ] | limitTo: 5">\n          <a ng-href="{{RESTAURANTBASE}}/{{restaurant.name_for_url}}" target="_blank"><span class="name">{{restaurant.name}}</span>\n          <span class="time" ng-if="restaurant.order_lead_time_text">{{restaurant.order_lead_time_text}}分钟</span></a>\n        </li>\n      </ul>\n    </div>\n    <div class="searchbox-list searchbox-foodlist" ng-show="searchFoods && searchFoods.length > 0">\n      <ul>\n        <li ng-repeat="food in searchFoods  | limitTo: 5">\n          <span class="price">&yen; {{food.price}}</span><span class="food-wrapper"><a ng-href="{{RESTAURANTBASE}}/{{food.restaurant.name_for_url}}#food/{{food.id}}" class="name" target="_blank">{{food.name}}</a><a ng-href="{{RESTAURANTBASE}}/{{food.restaurant.name_for_url}}" class="restaurant" target="_blank">{{food.restaurant.name}}</a></span>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n'),
	a.put("/pc/page/place/mix/mix.html", '<div search-input></div>\n\n<div location></div>\n\n<div class="place-ad">\n  <div carousel class="activity-carousel">\n    <div slide ng-repeat="activity in activities">\n      <a rel="nofollow" href="/activity/{{activity.name_for_url}}" data-id="promotion_banner_{{activity.name_for_url}}">\n        <img ng-src="{{activity.image_path ? FUSSBASE + activity.image_path : \'\'}}">\n      </a>\n    </div>\n  </div>\n</div>\n\n<!-- 选项卡 -->\n<div class="place-tab clearfix">\n  <a href="JavaScript:" class="place-tab-item" ng-class="{ \'focus\': !recentBoughtOnly }" ng-click="recentBoughtOnly=0" ubt-click="tab_all">外卖餐厅</a>\n  <span class="place-tab-line"></span>\n  <a href="JavaScript:" class="place-tab-item" ng-class="{ \'focus\': recentBoughtOnly }" ng-click="recentBoughtOnly=1" ubt-click="tab_favorite">购买过的餐厅</a>\n  <span class="place-tab-line"></span>\n  <a ng-href="{{dianping}}" target="_blank" class="place-tab-item" ubt-click="groupon_enter">附近的团购</a>\n  <div class="place-fetchtakeout" show-fetch-takeout-dialog><img ng-src="http://static11.elemecdn.com/eleme/desktop/media/img/78ec547a.takeout.png{{isRetina ? \'\' : \'?w=186&h=55\'}}" /></div>\n</div>\n\n<div ng-show="!recentBoughtOnly">\n  <!-- 筛选与排序 -->\n  <excavator link="rstStream"></excavator>\n  <!-- TIP -->\n  <div class="place-tips" ng-if="recentBought.length || place.premiumCount">\n    <!-- 购买过的餐厅 -->\n    <span ng-if="recentBought.length">在附近找到 <var>{{recentBought.length}} 家</var> 您购买或收藏过的餐厅，<a href="JavaScript:" ng-click="viewBoughtOnly(1)" ubt-click="tips_fav_enter">是否立即查看</a></span>\n    <!-- 品牌馆 -->\n    <span ng-if="place.premiumCount">想吃好点的，看看附近 <var>{{place.premiumCount}} 家</var> 品牌餐厅吧，<a href="/premium" ubt-click="brand_more">是否立即查看</a></span>\n  </div>\n\n  <!-- 餐厅列表 -->\n  <ul class="place-rstbox clearfix">\n    <rst-view data="filteredRestaurants = (rstStream.restaurants | filter: rstStream.filter | filter: otherFilter | orderBy: [ \'-is_opening\', rstStream.orderBy || \'index\' ])"></rst-view>\n    <div class="place-rstbox-loading" ng-show="rstStream.status === \'LOADING\'">\n      <img src="http://static11.elemecdn.com/eleme/desktop/media/img/00445319.loading.gif">正在载入更多餐厅...\n    </div>\n    <div class="place-rstbox-nodata" ng-show="rstStream.status === \'COMPLETE\' && !rstStream.getFilteredCount()">\n      <img class="nodata" width="100" src="http://static11.elemecdn.com/eleme/desktop/media/img/45807d99.icon-restaurant.png">\n      <div class="typo-small">附近没有找到符合条件的餐厅，换个筛选条件试试吧</div>\n    </div>\n  </ul>\n</div>\n\n<!-- 最近购买 -->\n<div ng-show="recentBoughtOnly">\n\n  <!-- TIP -->\n  <div class="place-tips" ng-if="recentBought.length">\n    <!-- 返回 -->\n    <span>以下是您购买或收藏过的 <var>{{recentBought.length}} 家</var> 家餐厅，您也可以查看附近 <a href="JavaScript:" ng-click="viewBoughtOnly(0)" ubt-click="tips_fav_exit">全部餐厅</a></span>\n  </div>\n\n  <ul class="place-rstbox recentbought clearfix">\n    <rst-block ng-repeat="restaurant in recentBought | orderBy: [ \'-is_opening\' ]" data="{ $restaurant: restaurant }" rst-popover ubt-click="restaurant_favorite"></rst-block>\n    <div class="place-rstbox-loading" ng-show="rstStream.status === \'LOADING\' && !recentBought.length">\n      <img src="http://static11.elemecdn.com/eleme/desktop/media/img/00445319.loading.gif">\n    </div>\n    <div class="place-rstbox-nodata" ng-show="rstStream.status === \'COMPLETE\' && !recentBought.length">\n      <img class="nodata" width="100" src="http://static11.elemecdn.com/eleme/desktop/media/img/45807d99.icon-restaurant.png">\n      <div class="typo-small">附近没有你购买或收藏过的餐厅，换个筛选条件试试吧</div>\n    </div>\n  </ul>\n\n</div>\n\n'),
	a.put("/pc/page/place/place.html", '<div search-input></div>\n\n<div location></div>\n\n<div class="place-ad">\n  <div carousel class="activity-carousel">\n    <div slide ng-repeat="activity in activities">\n      <a rel="nofollow" ng-href="{{activity.href}}" target="_blank" data-id="promotion_banner_{{activity.name_for_url}}">\n        <img ng-src="{{activity.image_path ? FUSSBASE + activity.image_path : \'\'}}">\n      </a>\n    </div>\n  </div>\n</div>\n\n<!-- 选项卡 -->\n<div class="place-tab clearfix">\n  <a href="JavaScript:" class="place-tab-item" ng-class="{ \'focus\': !recentBoughtOnly }" ng-click="recentBoughtOnly=0" ubt-click="tab_all">外卖餐厅</a>\n  <span class="place-tab-line"></span>\n  <a href="JavaScript:" class="place-tab-item" ng-class="{ \'focus\': recentBoughtOnly }" ng-click="recentBoughtOnly=1" ubt-click="tab_favorite">购买过的餐厅</a>\n  <span class="place-tab-line"></span>\n  <a ng-href="{{dianping}}" target="_blank" class="place-tab-item" ubt-click="groupon_enter">附近的团购</a>\n  <div class="place-fetchtakeout" show-fetch-takeout-dialog><img ng-src="http://static11.elemecdn.com/eleme/desktop/media/img/78ec547a.takeout.png{{isRetina ? \'\' : \'?w=186&h=55\'}}" /></div>\n</div>\n\n<div ng-show="!recentBoughtOnly">\n  <!-- 筛选与排序 -->\n  <excavator link="rstStream"></excavator>\n\n  <!-- TIP -->\n  <div class="place-tips" ng-if="recentBought.length || (premiumCountWhereOpening === 0 && place.premiumCount)">\n    <!-- 购买过的餐厅 -->\n    <span ng-if="recentBought.length">在附近找到 <var>{{recentBought.length}} 家</var> 您购买或收藏过的餐厅，<a href="JavaScript:" ng-click="viewBoughtOnly(1)" ubt-click="tips_fav_enter">是否立即查看</a></span>\n    <!-- 品牌馆 -->\n    <span ng-if="premiumCountWhereOpening === 0 && place.premiumCount">想吃好点的，看看附近 <var>{{place.premiumCount}} 家</var> 品牌餐厅吧，<a href="/premium" ubt-click="brand_more">是否立即查看</a></span>\n  </div>\n\n  <!-- 品牌馆 -->\n  <div class="place-premiumrstbox clearfix" ng-if="premium.length && premiumCountWhereOpening">\n    <a ng-href="/premium/{{geohash}}" class="viewmore" ubt-click="brand_more">查看全部 <strong ng-bind="place.premiumCount"></strong> 家品牌餐厅<span class="icon-arrow-right"></span></a>\n    <div class="place-rstbox-premium elemeicon elemeicon-premium">吃点好的，看看附近的品牌餐厅吧</div>\n    <div class="place-premiumrstbox-content">\n      <rst-block class="noline" ng-repeat="restaurant in premium" data="{ $restaurant: restaurant }" rst-popover></rst-block>\n    </div>\n  </div>\n\n  <!-- 餐厅列表 -->\n  <ul class="place-rstbox clearfix">\n    <rst-view data="filteredRestaurants = (rstStream.restaurants | filter: rstStream.filter | filter: otherFilter | orderBy: [ \'-is_opening\', rstStream.orderBy || \'index\' ])"></rst-view>\n    <div class="place-rstbox-loading" ng-show="rstStream.status === \'LOADING\'">\n      <img src="http://static11.elemecdn.com/eleme/desktop/media/img/00445319.loading.gif">正在载入更多餐厅...\n    </div>\n    <div class="place-rstbox-nodata" ng-show="rstStream.status === \'COMPLETE\' && !rstStream.getFilteredCount()">\n      <img class="nodata" width="100" src="http://static11.elemecdn.com/eleme/desktop/media/img/45807d99.icon-restaurant.png">\n      <div class="typo-small">附近没有找到符合条件的餐厅，换个筛选条件试试吧</div>\n    </div>\n  </ul>\n</div>\n\n<!-- 最近购买 -->\n<div ng-show="recentBoughtOnly">\n\n  <!-- TIP -->\n  <div class="place-tips" ng-if="recentBought.length">\n    <!-- 返回 -->\n    <span>以下是您购买或收藏过的 <var>{{recentBought.length}} 家</var> 家餐厅，您也可以查看附近 <a href="JavaScript:" ng-click="viewBoughtOnly(0)" ubt-click="tips_fav_exit">全部餐厅</a></span>\n  </div>\n\n  <ul class="place-rstbox recentbought clearfix">\n    <rst-block ng-repeat="restaurant in recentBought | orderBy: [ \'-is_opening\' ]" data="{ $restaurant: restaurant }" rst-popover ubt-click="restaurant_favorite"></rst-block>\n    <div class="place-rstbox-loading" ng-show="rstStream.status === \'LOADING\' && !recentBought.length">\n      <img src="http://static11.elemecdn.com/eleme/desktop/media/img/00445319.loading.gif">\n    </div>\n    <div class="place-rstbox-nodata" ng-show="rstStream.status === \'COMPLETE\' && !recentBought.length">\n      <img class="nodata" width="100" src="http://static11.elemecdn.com/eleme/desktop/media/img/45807d99.icon-restaurant.png">\n      <div class="typo-small">附近没有你购买或收藏过的餐厅，换个筛选条件试试吧</div>\n    </div>\n  </ul>\n\n</div>\n\n'),
	a.put("/pc/page/place/premium/premium.html", '<div search-input></div>\n<div location><i class="icon-arrow-right"></i>品牌餐厅</div>\n<div class="place-tab clearfix">\n  <span class="premium-title">品牌餐厅</span>\n  <span class="premium-desc">吃的更安心, 服务更贴心</span>\n</div>\n<excavator link="pumStream" ng-if="pumStream.restaurants.length"></excavator>\n<div class="place-rstbox clearfix">\n  <rst-block ng-repeat="restaurant in pumStream.restaurants | orderBy:[\'-is_opening\', pumStream.orderBy || \'index\']" data="{ $restaurant: restaurant }" ng-show="pumStream.filter(restaurant)" rst-popover></rst-block>\n  <div class="place-rstbox-loading" ng-if="pumStream.status === \'LOADING\'">\n    <img src="http://static11.elemecdn.com/eleme/desktop/media/img/00445319.loading.gif">\n  </div>\n  <div class="place-rstbox-nodata" ng-if="pumStream.status === \'COMPLETE\' && !pumStream.getFilteredCount()">\n    <img class="nodata" width="100" src="http://static11.elemecdn.com/eleme/desktop/media/img/45807d99.icon-restaurant.png">\n    <div class="typo-small">附近没有符合您的筛选的品牌馆餐厅，换个筛选条件试试吧</div>\n  </div>\n</div>\n\n'),
	a.put("/pc/page/place/search/search.html", '<div search-input></div>\n<div class="search-location" location><i class="icon-arrow-right"></i>搜索结果</div>\n\n<div ng-if="outsideRstsVisible && outsideRsts.length">\n  <div class="search-filterbar">\n    超出配送范围的餐厅\n    <button ng-click="hideOutsideRsts()" class="btn btn-sm">返回</button>\n  </div>\n  <div class="search-rstbox">\n    <rst-view data="outsideRsts | orderBy: [ \'-is_opening\' ] | limitTo: 48"></rst-view>\n  </div>\n</div>\n\n<div ng-show="!outsideRstsVisible">\n  <div class="search-filterbar">\n    搜索<strong>「{{keyword}}」</strong>的结果\n    <div class="search-filterbar-filterbtns" ng-show="rstGroups.length && restaurants.length">\n      <span ng-click="resultFilter = \'\'" ng-class="{ \'active\': resultFilter === \'\' }">全部</span>\n      <span ng-click="resultFilter = \'restaurant\'" ng-class="{ \'active\': resultFilter === \'restaurant\' }">餐厅</span>\n      <span ng-click="resultFilter = \'food\'" ng-class="{ \'active\': resultFilter === \'food\' }">美食</span>\n    </div>\n  </div>\n\n  <div class="search-loading" ng-if="status === \'LOADING\'">\n    <img src="http://static11.elemecdn.com/eleme/desktop/media/img/00445319.loading.gif">\n  </div>\n\n  <div class="search-rstbox" ng-show="restaurants.length && resultFilter != \'food\'">\n    <rst-view data="(resultFilter === \'restaurant\' ? mixedRsts : restaurants) | orderBy: [ \'-is_opening\' ]"></rst-view>\n  </div>\n\n  <div class="search-outsidetip" ng-show="outsideRst.name && resultFilter != \'food\'" ng-class="{ standalone: restaurants.length === 0}">\n    另有<span>{{ outsideRst.name }}</span>等<strong>{{outsideRsts.length}}</strong>家与<strong>「{{keyword}}」</strong>相关的餐厅不在配送范围内<a href="JavaScript:" ng-click="outsideRstsVisible = true">立即查看</a>\n  </div>\n\n  <div class="search-nodata" ng-if="status === \'COMPLETE\' && !restaurants.length && !rstGroups.length">\n    <img class="nodata" width="100" src="http://static11.elemecdn.com/eleme/desktop/media/img/45807d99.icon-restaurant.png">\n    <div class="typo-small">附近没有符合您的关键字的餐厅和美食，换个关键字试试吧</div>\n  </div>\n\n  <table ng-repeat="rst in rstGroups | orderBy: [ \'-is_opening\', \'status\' ] track by rst.id" class="typo-table search-foodtable" ng-show="resultFilter != \'restaurant\'">\n    <tr>\n      <th colspan="4">\n        <div ng-if="rst.status === 5" class="search-rststatus search-rststatus-bookonly" ng-bind="\'可预订，\' + rst.next_time + \'后送餐\'"></div>\n        <div ng-if="!rst.is_opening" class="search-rststatus search-rststatus-relaxing" ng-bind="rst.status === 2 ? \'餐厅繁忙,不接受新单\' : \'餐厅休息,暂不接单\'"></div>\n        <h4 class="typo-h5">\n          <a ng-href="{{($root || $rootScope).RESTAURANTBASE + \'/\' + rst.name_for_url}}" target="_blank">{{rst.name}}</a>\n          <div class="rstblock-activity">\n            <i ng-repeat="activity in rst.activities" ng-bind="activity.icon_name" ng-style="activity.icon_color ? {background: (\'#\' + activity.icon_color)} : \'\'"></i>\n          </div>\n        </h4>\n        <span class="rstblock-starrating icon-star">\n          <span class="icon-star" ng-style="{ width: (rst.rating * 20) + \'%\' }"></span>\n        </span>\n        <small class="search-sales">月售<strong>{{rst.month_sales}}</strong></small>\n        <small class="first"><strong class="">{{rst.minimum_order_amount}}</strong>元起送</small>\n        <small ng-if="rst.is_free_delivery">免费配送</small>\n        <small ng-if="!rst.is_free_delivery">配送费<strong>{{rst.delivery_fee}}</strong>元</small>\n        <small ng-if="rst.order_lead_time_text">平均<strong class="highlight">{{rst.order_lead_time_text}}</strong>分钟送达</small>\n      </th>\n    </tr>\n\n    <tr ng-repeat="food in rst.foods | limitTo: rst.limitTo track by $index">\n      <td>\n        <a ng-if="rst.is_opening" target="_blank" ng-href="{{RESTAURANTBASE}}/{{food.restaurant.name_for_url}}#food/{{food.id}}">\n          <span>{{food.name}} <br>\n            <small>{{food.description}}</small>\n          </span>\n        </a>\n        <span ng-if="!rst.is_opening">{{food.name}} <br>\n          <small>{{food.description}}</small>\n        </span>\n      </td>\n      <td class="search-col2">\n        <a ng-if="rst.is_opening" target="_blank" ng-href="{{RESTAURANTBASE}}/{{food.restaurant.name_for_url}}#food/{{food.id}}">&yen; {{food.price}}</a>\n        <span ng-if="!rst.is_opening">&yen; {{food.price}}</span>\n      </td>\n      <td class="search-col3">\n        <small ng-if="!rst.is_opening" ng-bind="rst.status === 2 ? \'餐厅繁忙\' : \'餐厅休息\'"></small>\n        <a class="btn btn-sm" ng-class="{ \'bookonly\': rst.status === 5 }" ng-if="rst.is_opening" target="_blank" ng-href="{{RESTAURANTBASE}}/{{food.restaurant.name_for_url}}#food/{{food.id}}" ng-bind="rst.status === 1 ? \'去购买\' : \'可预订\'"></a>\n      </td>\n      <td class="search-col4">\n        <span class="rstblock-starrating icon-star">\n          <span class="icon-star" ng-style="{ width: (food.rating * 20) + \'%\' }"></span>\n        </span>\n        <span class="search-food-ratingcount" ng-if="food.rating_count > 0">({{food.rating_count}})</span>\n\n        <div>月售{{food.month_sales}}份</div>\n      </td>\n    </tr>\n    <tr ng-if="rst.limitTo === 3 && rst.foods.length > 3" class="search-foodtable-expandrow">\n      <td colspan="4">\n        本餐厅还有<strong class="highlight">{{rst.foods.length - 3}}</strong>份相关美食，\n        <a class="search-foodtable-showmore" ng-click="rst.limitTo = rst.foods.length" href="JavaScript:">显示全部相关美食<i class="icon-arrow-down"></i></a>\n      </td>\n    </tr>\n  </table>\n</div>')
}]),
angular.module("eleme.page").factory("SEO",
function() {
	return {
		title: "饿了么 - 中国最专业的网上订餐平台",
		description: "饿了么是中国最专业的网上订餐平台，提供各类中式、日式、韩式、西式等优质美食。"
	}
}).controller("globalCtrl", ["$rootScope", "$location", "User", "Zero", "$q", "SEO", "$sce", "PlaceStorage",
function(a, b, c, d, e, f, g, h) {
	a.geohash = localStorage.getItem("GEOHASH"),
	a.$watch("geohash",
	function(b) {
		a.place = h(b)
	}),
	a.isRetina = document.defaultView && document.defaultView.devicePixelRatio > 1,
	a.SEO = f,
	a.$on("$routeChangeSuccess",
	function() {}),
	a.user = c,
	a.$on("$routeChangeStart",
	function(c, d) {
		a.routepath = d.$$route ? d.$$route.originalPath.slice(1).split(/\W+/g) : [],
		a.locationpath = b.path().slice(1).split(/\W+/g)
	})
}]).run(["$rootScope", "$sce",
function(a, b) {
	var c = location.protocol;
	a.ROOTHOST = document.domain.replace(/^(.+?\.)??(?=(test\.)?[^.]+\.\w+$)/, ""),
	a.ROOTBASE = c + "//" + a.ROOTHOST,
	a.FUSSBASE = c + "//fuss10.elemecdn.com",
	a.RESTAURANTBASE = c + "//r." + a.ROOTHOST,
	a.PAYMENTBASE = c + "//p." + a.ROOTHOST,
	a.MOBILEBASE = c + "//m." + a.ROOTHOST,
	a.MAINBASE = c + "//v5." + a.ROOTHOST,
	a.ACCOUNTBASE = "https://account." + a.ROOTHOST,
	a.LOGINFRAME = b.trustAsResourceUrl(a.ACCOUNTBASE + "/login/iframe")
}]),
angular.module("eleme.page").service("CartManager", ["$cookies", "$q", "Zero", "CartManager.Cart",
function(a, b, c, d) {
	var e, f, g = this;
	this.$getCartToken = function() {
		var b = (a.cart || "").split(":");
		return {
			cartId: b[0],
			sig: b[1]
		}
	},
	this.getCart = function() {
		return e ? e: (e = new d(g), e.$notification.then(null, null,
		function(a) {
			f && (f.count = a.pieces)
		}), e)
	},
	this.getCount = function() {
		if (f) return f;
		if (f = {},
		e) f.$promise = e.$promise.then(function(a) {
			return f.count = a.pieces,
			f
		});
		else {
			var a = g.$getCartToken();
			a.cartId && a.sig ? f = c.cart.get(angular.extend({
				listName: "entities",
				action: "count"
			},
			a)) : f.$promise = b.reject()
		}
		return f
	}
}]).factory("CartManager.Cart", ["Zero", "CartManager.Group", "$q",
function(a, b, c) {
	return function(d) {
		var e = this;
		this.$manager = d;
		var f = c.all().then(function() {
			var b = d.$getCartToken();
			if (!b.cartId || !b.sig) return c.reject();
			e.sig = b.sig;
			var f = angular.extend({
				"extras[]": "restaurant_info",
				geohash: localStorage.getItem("GEOHASH")
			},
			b);
			return a.cart.get(f).$promise
		}).then(null,
		function() {
			return a.cart.post({
				come_from: "web",
				geohash: localStorage.getItem("GEOHASH")
			}).$promise.then(function(a) {
				return e.sig = a.sig,
				a.cart
			})
		}).then(function(a) {
			return delete a.$promise,
			angular.extend(e, a),
			e.group = e.group.map(function(a) {
				return new b(a, e)
			}),
			e.$calculate(a),
			e.$resolved = !0,
			e
		}).then(null,
		function(a) {
			throw a
		});
		this.$promise = f,
		e.$resolved = !1;
		var g = c.defer();
		this.$notification = g.promise,
		this.$calculate = function(a) {
			var b = this,
			c = 0;
			a.group.forEach(function(a) {
				var b = function(a) {
					c += a.quantity,
					a.garnish && a.garnish.forEach(b)
				};
				a.forEach(b)
			}),
			b.pieces = c,
			delete a.group,
			b.agio = Math.max(a.restaurant_minimum_order_amount - a.total, 0),
			angular.extend(b, a),
			g.notify(b)
		}
	}
}]).factory("CartManager.Group", ["Zero", "CartManager.Food",
function(a, b) {
	var c = function(a, c) {
		this.$cart = c;
		for (var d = 0; d < a.length; d++) this.push(new b(a[d], this))
	};
	return c.prototype = [],
	c.prototype.$patch = function(b) {
		var c = this;
		return a.cart.patch(this.$getParams(b)).$promise.then(function(a) {
			c.$cart.$calculate(a)
		})
	},
	c.prototype.$getParams = function(a) {
		return angular.extend({
			geohash: localStorage.getItem("GEOHASH"),
			cartId: this.$cart.id,
			sig: this.$cart.sig,
			group_index: this.$getIndex()
		},
		a)
	},
	c.prototype.$getIndex = function() {
		return this.$cart.group.indexOf(this)
	},
	c.prototype.$remove = function() {
		this.$cart.group.splice(this.$getIndex(), 1)
	},
	c.prototype.$removeChild = function(a) {
		this.splice(this.indexOf(a), 1),
		this.length || this.$remove()
	},
	c.prototype.remove = function() {
		var b = this,
		c = this.$getParams({
			_method: "delete",
			type: "group"
		});
		return a.cart.post(c).$promise.then(function(a) {
			b.$remove(),
			b.$cart.$calculate(a)
		})
	},
	c.prototype.add = function(a) {
		return this.$patch(angular.extend({
			type: "entity_add"
		},
		a))
	},
	c.prototype.sub = function(a) {
		return this.$patch(angular.extend({
			type: "entity_decrease"
		},
		a))
	},
	c.prototype.set = function(a) {
		return this.$patch(angular.extend({
			type: "entity_set_quantity"
		},
		a))
	},
	c
}]).factory("CartManager.Food", [function() {
	var a = function(b, c, d) {
		var e = this;
		this.$group = c,
		this.$parent = d,
		this.$parent_id = d && d.id,
		this.$quantity = b.quantity,
		angular.extend(this, b),
		angular.isArray(this.garnish) && (this.garnish = this.garnish.map(function(b) {
			return new a(b, c, e)
		}))
	};
	return a.prototype.$remove = function() { (this.$parent || this.$group).$removeChild(this)
	},
	a.prototype.$removeChild = function(a) {
		this.garnish.splice(this.garnish.indexOf(a), 1)
	},
	a.prototype.add = function() {
		var a = this;
		return this.$group.add({
			entity_id: this.id,
			parent_id: this.$parent_id
		}).then(function() {
			a.$quantity = ++a.quantity
		},
		function() {
			a.quantity = a.$quantity
		})
	},
	a.prototype.sub = function() {
		var a = this;
		return this.$group.sub({
			entity_id: this.id,
			parent_id: this.$parent_id
		}).then(function() {
			a.$quantity = --a.quantity,
			0 === +a.quantity && a.$remove()
		},
		function() {
			a.quantity = a.$quantity
		})
	},
	a.prototype.update = function() {
		var a = this;
		return this.$group.set({
			entity_id: this.id,
			quantity: a.quantity,
			parent_id: this.$parent_id
		}).then(function() {
			a.$quantity = a.quantity,
			0 === +a.quantity && a.$remove()
		},
		function() {
			a.quantity = a.$quantity
		})
	},
	a
}]),
angular.module("eleme.page").directive("goto", ["$location",
function(a) {
	return function(b, c, d) {
		c.on("click",
		function() {
			if (/force=1/.test(d["goto"])) return localStorage.removeItem("goto"),
			b.$apply(function() {
				a.url(d["goto"])
			});
			var c = d["goto"];
			return /^https?:/.test(d["goto"]) ? void(location.href = d["goto"]) : void("undefined" != typeof c && (c = c || -1, b.$apply(function() {
				return - 1 === c ? history.back( - 1) : -1 != c.indexOf("http") ? void(location.href = c) : void a.url(c)
			})))
		})
	}
}]),
void
function() {
	function a(a) {
		var b = a.getBoundingClientRect();
		return b.top >= 0 && b.top <= (window.innerHeight || document.documentElement.clientHeight) || b.top < 0 && b.bottom >= 0
	}
	function b() {
		c = c.filter(function(b) {
			var c = b[0],
			d = b[1];
			return a(c[0]) ? (c.attr("src", d), 0) : 1
		})
	}
	var c = [],
	d = DomUtil.throttle(b, 50);
	angular.$(window).on("scroll", d),
	angular.$(window).on("resize", d),
	angular.module("eleme.page").directive("lazySrc", [function() {
		return function(b, d, e) {
			var f = e.lazySrc.trim();
			f && (a(d[0]) ? d.attr("src", f) : c.push([d, f]))
		}
	}])
} (),
angular.module("eleme.page"),
angular.module("eleme.page").factory("MessageManager", ["Zero", "User", "MessageManager.Message",
function(a, b, c) {
	var d, e, f = {
		$user: b
	};
	return f.$invoke = function(c, d) {
		return b.$promise.then(function(b) {
			return d = angular.extend({
				userId: b.user_id || "anonymous"
			},
			d),
			a.message[c](d).$promise
		})
	},
	f.$removeChild = function(a) {
		d.splice(d.indexOf(a), 1),
		e.count--
	},
	f.getMessageList = function() {
		return d ? d: (d = [], d.$resolved = !1, d.$promise = f.$invoke("query", {
			is_read: 0
		}).then(function(a) {
			return d.$resolved = !0,
			a.forEach(function(a) {
				d.push(new c(a, f))
			}),
			d
		},
		function() {
			return d.$resolved = !0,
			d
		}), d)
	},
	f.getMessageCount = function() {
		return e ? e: (e = {},
		e.$resolved = !1, e.$promise = f.$invoke("get", {
			action: "count"
		}).then(function(a) {
			return e.$resolved = !0,
			e.count = a.count,
			e
		},
		function() {
			return e.$resolved = !0,
			e.count = 0,
			e
		}), e)
	},
	f.markAllAsRead = function() {
		return f.$invoke("patch", {
			is_read: 1
		}).then(function() {
			d.length = e.count = 0
		})
	},
	f
}]).factory("MessageManager.Message", [function() {
	var a = function(a, b) {
		this.$manager = b,
		angular.extend(this, a)
	};
	return a.prototype.markAsRead = function() {
		var a = this;
		return this.$manager.$invoke("patch", {
			messageId: this.id,
			is_read: 1
		}).then(function() {
			a.$manager.$removeChild(a)
		})
	},
	a
}]),
angular.module("eleme.page").factory("PlaceStorage", ["$q", "Zero",
function(a, b) {
	var c = "PLACESTORAGE",
	d = {},
	e = function(e) {
		var f = c + "[" + e + "]";
		if (e in d) return d[e];
		var g = d[e] = objectStorage(f);
		if (g.$resolved = !1, "name" in g && "address" in g && "plainCount" in g && "premiumCount" in g) g.$promise = a.all();
		else {
			var h = {
				type: "geohash",
				geohash: e
			};
			g.$promise = a.all([b.poi.query(h).$promise, b.restaurant.get(angular.extend({
				is_premium: 0,
				action: "count"
			},
			h)).$promise, b.restaurant.get(angular.extend({
				is_premium: 1,
				action: "count"
			},
			h)).$promise]).then(function(a) {
				var b = a[0];
				if (0 !== b.length) {
					var c = b[0],
					d = objectStorage(f);
					d.name = c.name,
					d.address = c.address,
					d.geohash = c.geohash,
					d.plainCount = a[1].count,
					d.premiumCount = a[2].count,
					angular.extend(g, d)
				}
			})
		}
		return g.$promise = g.$promise.then(function() {
			return g.$resolved = !0,
			g
		}),
		g
	};
	return e
}]),
angular.module("eleme.page").factory("RestaurantWrapper", [function() {
	var a = function(b) {
		if (b instanceof Array) angular.forEach(b, a);
		else for (var c in a) b[c] = a[c](b)
	};
	return a.activities = function(a) {
		var b = a.supports.filter(function(a) {
			return "配" !== a.icon_name
		});
		return b.sort(function(a, b) {
			return "保" === a.icon_name ? -1 : "保" === b.icon_name ? 1 : 0
		}),
		[].concat(b || [], a.restaurant_activity || [], a.food_activity || [])
	},
	a.is_opening = function(a) {
		return /^[1356]$/.test(a.status)
	},
	a.order_lead_time = function(a) {
		return a.order_lead_time || 1 / 0
	},
	a.order_lead_time_text = function(a) {
		return a.order_lead_time && isFinite(a.order_lead_time) ? a.order_lead_time > 45 ? "45+": a.order_lead_time: ""
	},
	a.next_time = function(a) {
		var b, c = a.opening_hours,
		d = new Date(Date.now() + 288e6).toISOString().match(/..:../)[0];
		if (c.some(function(a) {
			return a > d ? (b = a.match(/..:../)[0], !0) : void 0
		}), b) return b;
		var e = c.length && c[0].match(/..:../)[0];
		return e ? e: void setTimeout(function() {
			throw new Error('Dirty Data: "opening_hours" on restaurant id ' + a.id)
		})
	},
	a
}]),
angular.module("eleme.page").factory("User", ["$q", "Zero", "httphook",
function(a, b, c) {
	var d = "USER",
	e = function() {
		var b = this,
		e = /(?:^|; )USERID=/.test(document.cookie);
		e || localStorage.removeItem(d),
		this.$promise = a.all().then(function() {
			var c = JSON.parse(localStorage.getItem(d));
			return c && c.user_id ? angular.extend(b, c) : a.reject()
		}).then(null,
		function() {
			return e ? b.fetch().$promise: a.reject()
		}),
		c.get(/^\/restapi\/v1\/users/, null,
		function(a, c) {
			401 === c.status && b.reset()
		})
	};
	return e.prototype.reset = function() {
		localStorage.removeItem(d);
		for (var a in this)"$promise" !== a && this.hasOwnProperty(a) && delete this[a];
		return this
	},
	e.prototype.fetch = function() {
		var c = this;
		return this.$promise = b.profile.get().$promise.then(function(a) {
			return delete a.$promise,
			localStorage.setItem(d, JSON.stringify(a)),
			angular.extend(c, a)
		},
		function(b) {
			return c.reset(),
			a.reject(b)
		}),
		this
	},
	new e
}]),
angular.module("eleme.page").directive("elemeFooter",
function() {
	return {
		restrict: "E",
		replace: !0,
		templateUrl: "/pc/page/_block/footer/footer.html"
	}
}),
angular.module("eleme.page").directive("elemeImportantnotification",
function() {
	return {
		restrict: "E",
		replace: !0,
		templateUrl: "/pc/page/_block/importantnotification/importantnotification.html",
		link: function(a) {
			a.enable = (new Date).getTime() < new Date(2015, 3, 23, 2, 0).getTime()
		}
	}
}),
angular.module("eleme.page").directive("location",
function() {
	return {
		restrict: "EA",
		replace: !0,
		transclude: !0,
		templateUrl: "/pc/page/_block/location/location.html",
		controller: ["$scope", "$rootScope", "$q", "Zero",
		function(a, b, c, d) {
			c.all([a.place.$promise, a.user.$promise]).then(function() {
				d.place.post({
					userId: a.user.user_id,
					geohash: a.place.geohash,
					name: a.place.name
				})
			}),
			a.filterPlace = function(b) {
				return b.geohash !== a.geohash
			},
			a.user.$promise.then(function(b) {
				b.user_id && d.place.query({
					userId: b.user_id,
					"extras[]": ["geohash"]
				},
				function(b) {
					for (var c = [], d = 0, e = b.length; e > d; d++) {
						var f = b[d];
						f.geohash !== a.geohash && c.push(f)
					}
					a.userPlaces = c
				})
			})
		}]
	}
}),
angular.module("eleme.page").directive("onlineService", [function() {
	window.live800_companyID = "402791",
	window.jsessionId = ";jsessionid=B7EE2BF1C99FCB7395845BDF935A3478";
	try {
		navigator.cookieEnabled && (window.jsessionId = "")
	} catch(a) {}
	return window.enterurl = null,
	window.isOldSkin = !1,
	window.server_prefix_list = ["https://v2.live800.com/live800"],
	window.isNeedCheckDomainBinding = !1,
	window.globalWindowAttribute = "toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=920,height=620",
	window.live800_chatVersion = "5",
	window.jid = "1820947377",
	window.live800_baseUrl = "v2.live800.com",
	window.live800_baseHtmlUrl = "v2.live800.com",
	window.live800_baseWebApp = "/live800",
	window.live800_baseChatHtmlDir = "/chatClient",
	window.live800_Language = "en",
	window.live800_configID = "123801",
	window.live800_codeType = "custom",
	window.live800_configContent = "live800_text=%25u5728%25u7ebf%25u5ba2%25u670d",
	window.live800_companyID = "402791",
	function(a, b) {
		b.css("visibility", "hidden");
		var c = document.createElement("script");
		c.src = "http://v2.live800.com/live800/chatClient/textStatic.js";
		var d = function() {
			b.css("visibility", "visible"),
			b.on("click",
			function() {
				return window.open("http://v2.live800.com/live800/chatClient/chatbox.jsp?companyID=402791&configID=123801&jid=1820947377&enterurl=http%3A%2F%2Fr.ele.me%2Ftest-restaurant-01&pagetitle=test%5Frestaurant%5F01+%2D+%E4%B8%8A%E6%B5%B7%E5%B8%82%E6%B9%96%E5%8D%97%E5%B7%A5%E4%B8%9A%E5%A4%A7%E5%AD%A620%E6%A0%8B3%2E%2E%2E+%2D+%E5%8F%AB%E5%A4%96%E5%8D%96%E4%B8%8Aele%2Eme&pagereferrer=http%3A%2F%2Fele%2Eme%2Fpremium%2Fgeohash%2Fwtw3djeuu587&firstEnterUrl=http%3A%2F%2Fr%2Eele%2Eme%2Fbigmama", "chatbox402791", globalWindowAttribute, this)
			})
		};
		angular.$(c).on("load", d),
		document.documentMode && (c.onreadystatechange = function() {
			"loaded" === c.readyState && d()
		}),
		document.body.appendChild(c)
	}
}]),
angular.module("eleme.page").controller("sidebarCartCtrl", ["$scope", "CartManager", "RestaurantWrapper",
function(a, b, c) {
	a.cart = b.getCart(),
	a.submitionButtonText = "加载中···",
	a.submitionButtonDisabled = !0,
	a.$watch("cart",
	function(b) {
		if (b && b.restaurant_info) {
			var d = b.restaurant_info;
			switch (d.status) {
			case 1:
			case 5:
				b.agio ? (a.submitionButtonText = "还差 " + b.agio + " 元起送", a.submitionButtonDisabled = !0) : (a.submitionButtonText = "去结算", a.submitionButtonDisabled = !1);
				break;
			case 2:
				a.submitionButtonText = "当前过于繁忙，不支持下单",
				a.submitionButtonDisabled = !0;
				break;
			case 8:
				a.submitionButtonText = "休息中 " + c.next_time(d) + " 营业",
				a.submitionButtonDisabled = !0;
				break;
			case 3:
			case 6:
				a.submitionButtonText = "暂时只能通过手机订购",
				a.submitionButtonDisabled = !0;
				break;
			case 4:
				a.submitionButtonText = "餐厅已歇业",
				a.submitionButtonDisabled = !0
			}
		}
	},
	!0),
	a.settle = function() {
		return a.submitionButtonDisabled ? !1 : void(location.href = a.MAINBASE + "/cart/checkout")
	}
}]),
angular.module("eleme.page").controller("sidebarHistoryCtrl", ["$scope", "Zero", "RestaurantWrapper",
function(a, b, c) {
	var d = localStorage.getItem("MYFOOTPRINT");
	try {
		if (d = JSON.parse(d || "[]"), !(d instanceof Array)) throw 0
	} catch(e) {
		d = []
	}
	d.length ? b.restaurant.query({
		type: "ids",
		"ids[]": d
	},
	function(b) {
		c(b),
		a.restaurants = b
	}) : a.restaurants = []
}]),
angular.module("eleme.page").controller("sidebarMessageCtrl", ["$scope", "MessageManager",
function(a, b) {
	a.MessageManager = b,
	a.messageList = b.getMessageList()
}]),
angular.module("eleme.page").directive("elemeSidebar", ["$rootScope", "Zero", "MessageManager", "CartManager",
function(a, b, c, d) {
	return {
		restrict: "E",
		replace: !0,
		templateUrl: "/pc/page/_block/sidebar/sidebar.html",
		link: function(a, b) {
			var e = function() {
				return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
			},
			f = function() {
				return Math.max(document.documentElement.scrollTop || 0, window.scrollY || 0)
			},
			g = angular.$(window);
			if (a.activeTemplate = null, a.isSidebarOpen = !1, void
			function() {
				var b = localStorage.getItem("MYFOOTPRINT");
				a.hasHistory = b && "[]" !== b
			} (), a.sidebarCount = {
				uncompletedOrder: 0
			},
			a.messageCount = c.getMessageCount(), a.foodCount = d.getCount(), angular.$("body").css({
				"-ms-overflow-style": "scrollbar",
				position: "relative"
			}), Number(document.documentMode) < 9) {
				var h = function() {
					b.toggleClass("sidebar-minimum", e() < 520)
				};
				h(),
				g.on("resize", DomUtil.debounce(h, 300))
			}
			var i = b.find(".sidebar-btn-backtop"),
			j = function() {
				i.css("visibility", f() > 300 ? "visible": "hidden"),
				DomUtil.msieVersion < 9 && void i[0].offsetWidth
			};
			j(),
			g.on("scroll", DomUtil.throttle(j, 200)),
			i.on("click",
			function() {
				angular.$(0 === document.body.scrollTop ? document.documentElement: document.body).animate({
					scrollTop: [f(), 0]
				},
				300)
			});
			var k = function() {
				if (Number(document.documentMode) < 10) b.animate({
					right: [a.isSidebarOpen ? 0 : -295, a.isSidebarOpen ? -295 : 0]
				},
				300);
				else {
					var c, d = b[0];
					c = a.isSidebarOpen ? "translate3d(0, 0, 0)": "translate3d(-295px, 0, 0)",
					d.style.webkitTransform = c,
					d.style.msTransform = c,
					d.style.transform = c
				}
				a.isSidebarOpen = !a.isSidebarOpen
			};
			angular.$(".toolbar-btn,.toolbar-cartbtn").on("click",
			function(b) {
				var c = angular.$(b.target);
				if (c.hasClass("toolbar-open")) {
					var d = c.attr("template");
					d === a.activeTemplate ? (k(), a.activeTemplate = d) : a.isSidebarOpen ? a.activeTemplate = d: (a.activeTemplate = d, k()),
					a.$apply()
				}
			}),
			a.toggleSidebar = k,
			angular.$(document).on("click",
			function(b) {
				a.isSidebarOpen && !angular.$(b.target).parents(".sidebar").length && (k(), a.$apply())
			})
		}
	}
}]),
angular.module("eleme.page").directive("elemeTopbar", ["$rootScope", "Zero",
function(a, b) {
	return {
		restrict: "E",
		replace: !0,
		templateUrl: "/pc/page/_block/topbar/topbar.html",
		link: function(c) {
			c.logout = function() {
				b.logout.post(function() {
					document.cookie = "USERID=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=" + a.ROOTHOST,
					c.user.reset()
				})
			}
		}
	}
}]),
angular.module("page.place").directive("activityBody",
function() {
	return function(a) {
		var b = document.body;
		b.className = b.className + " activitybody",
		a.$on("$destroy",
		function() {
			var a = b.className;
			b.className = a.replace(/\s?activitybody\s?/, "")
		})
	}
}).controller("activityCtrl", ["$scope", "$routeParams", "$sce", "Zero",
function(a, b, c, d) {
	function e() {
		d.activity.get({
			nameForUrl: f
		}).$promise.then(function(b) {
			b && (b.summary = c.trustAsHtml(b.summary), b.notice = c.trustAsHtml(b.notice), a.activity = b)
		})
	}
	var f = b.name_for_url;
	a.geohash ? d.activity.query({
		type: "geohash",
		geohash: a.geohash
	},
	function(b) {
		a.activities = b,
		b.forEach(function(b) {
			b.summary = c.trustAsHtml(b.summary),
			b.notice = c.trustAsHtml(b.notice),
			b.name_for_url === f && (a.activity = b)
		}),
		a.activity || e()
	}) : e()
}]),
angular.module("page.place").controller("placeCtrl", ["$scope", "$routeParams", "$rootScope", "RecentBought", "RestaurantStream", "Zero", "RestaurantWrapper",
function(a, b, c, d, e, f, g) {
	c.geohash = a.geohash = b.geohash,
	a.searchRestaurants = [],
	a.searchFoods = [];
	var h = function() {
		localStorage.removeItem("GEOHASH"),
		location.href = "//v5.ele.me/?force=1",
		document.cookie = "geohash=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=" + a.ROOTHOST + "; path=/"
	};
	if (/[\Wailo_]|^$/.test(c.geohash || "")) return h();
	localStorage.setItem("GEOHASH", a.geohash),
	document.cookie = "geohash=" + a.geohash + "; expires=" + new Date(Date.now() + 31536e6).toUTCString() + "; DOMAIN=" + a.ROOTHOST + "; path=/;",
	a.recentBought = [];
	var i = function() {
		var b = d();
		return b.then(function(b) {
			a.sidebarCount.uncompletedOrder = b.uncompletedOrder,
			a.recentBought.push.apply(a.recentBought, b.favorRestaurants)
		}),
		function(c) {
			b.then(function(b) {
				var d = b.restaurantMap;
				c.forEach(function(b) {
					b.id in d && a.recentBought.push(b)
				})
			})
		}
	} ();
	a.viewBoughtOnly = function(b) {
		a.recentBoughtOnly = b
	},
	a.rstStream = e({
		is_premium: 0,
		geohash: a.geohash
	}),
	a.rstStream.$promise.then(null, null,
	function(a) {
		i(a)
	}),
	a.premium = f.restaurant.query({
		type: "geohash",
		geohash: a.geohash,
		is_premium: 1,
		limit: 4,
		"extras[]": ["food_activity", "restaurant_activity"]
	},
	g),
	f.restaurant.query({
		type: "geohash",
		geohash: a.geohash,
		is_premium: 1,
		"fields[]": "status"
	},
	function(b) {
		a.premiumCountWhereOpening = b.filter(function(a) {
			return g.is_opening(a)
		}).length
	}),
	f.activity.query({
		type: "geohash",
		geohash: c.geohash,
		"fields[]": ["link", "image_path", "name_for_url", "status", "is_valid"]
	},
	function(b) {
		a.activities = b.filter(function(a) {
			switch (a.status) {
			case "NO_INFO":
				a.href = "#";
				break;
			case "WITH_LINK":
				a.href = a.link;
				break;
			case "WITH_PAGE":
				a.href = "/activity/" + a.name_for_url
			}
			return a.is_valid
		})
	});
	var j;
	try {
		j = Geohash.decode(c.geohash)
	} catch(k) {
		return h()
	}
	a.dianping = "http://t.dianping.com/home?latitude=" + j[0] + "&longitude=" + j[1] + "&distance=500&utm_source=eleme1&utm_medium=eleme&utm_term=pc&utm_content=1&utm_campaign=f"
}]),
angular.module("page.place").directive("excavator",
function() {
	return {
		restrict: "E",
		replace: !0,
		templateUrl: "/pc/page/place/_block/excavator/excavator.html",
		scope: {
			link: "="
		},
		link: function(a) {
			a.option = {},
			a.changeOrder = function(b) {
				switch (a.link.orderBy = b, b) {
				case "order_lead_time":
					a.otherOrder = "配送速度";
					break;
				case "minimum_order_amount":
					a.otherOrder = "起送价格";
					break;
				case "-id":
					a.otherOrder = "新开餐厅";
					break;
				default:
					a.otherOrder = ""
				}
			},
			a.changeFlavor = function(b) {
				a.clickedFlavor === b && (b = ""),
				a.clickedFlavor = b
			},
			a.changeActivity = function(b) {
				a.clickedActivity === b && (b = ""),
				a.clickedActivity = b
			};
			var b = [],
			c = null,
			d = [];
			a.link.filter = function(e) {
				if (c = null, b[e.index] = !1, a.option.mimOrder && e.minimum_order_amount > a.option.mimOrder) return ! 1;
				if (a.option.freeDeliver && 0 !== e.delivery_fee) return ! 1;
				if (a.option.cash && !e.is_time_ensure) return ! 1;
				if (a.option.receipt && !e.is_support_invoice) return ! 1;
				if (a.option.payOnline && !e.is_online_payment) return ! 1;
				if (a.clickedFlavor && -1 === e.flavors.indexOf(a.clickedFlavor)) return ! 1;
				if (a.clickedActivity) {
					var f = !1,
					g = e.restaurant_activity || d,
					h = e.food_activity || d;
					if ("$any" === a.clickedActivity) f = g.length > 0 || h.length > 0;
					else {
						var i, j;
						for (i = 0, j = g.length; j > i; i++) if (g[i].name === a.clickedActivity) {
							f = !0;
							break
						}
						for (i = 0, j = h.length; j > i; i++) if (h[i].name === a.clickedActivity) {
							f = !0;
							break
						}
					}
					if (!f) return ! 1
				}
				return b[e.index] = !0,
				!0
			},
			a.link.getFilteredCount = function() {
				if (null !== c) return c;
				c = 0;
				for (var a = 0; a < b.length; a++) c += b[a] ? 1 : 0;
				return c
			}
		}
	}
}),
angular.module("page.place").directive("showFetchTakeoutDialog", ["$rootScope", "$http", "$templateCache", "$compile", "Popup",
function(a, b, c, d, e) {
	var f, g = "/pc/page/place/_block/fetch-takeout/fetch-takeout.html",
	h = b.get(g, {
		cache: c
	});
	return {
		restrict: "A",
		scope: {},
		link: function(a, b) {
			var c = 10,
			g = e.extend({
				defaults: {
					modal: !0,
					animation: !1,
					target: "center"
				},
				onKeydown: function(b) {
					var c = b.keyCode;
					32 === c ? (a.$apply(function() {
						a.dice(),
						a.btnActive = !0
					}), setTimeout(function() {
						a.$apply(function() {
							a.btnActive = !1
						})
					},
					100)) : 27 === c && this.hide(),
					b.preventDefault()
				},
				doHide: function() {
					e.prototype.doHide.apply(this, arguments),
					this.keyDownHandler && (angular.element(document).off("keydown", this.keyDownHandler), this.keyDownHandler = null)
				},
				doShow: function() {
					e.prototype.doShow.apply(this, arguments),
					a.$apply(function() {
						a.minDice = -1,
						a.diceList.splice(0, a.diceList.length)
					});
					var b = this.keyDownHandler = this.onKeydown.bind(this);
					angular.element(document).on("keydown", b)
				},
				render: function() {
					var b = this,
					e = d(f)(a)[0],
					g = a.diceList = [];
					a.minDice = -1,
					a.hide = function() {
						b.hide()
					},
					a.btnActive = !1;
					var h = function() {
						var a = Math.round(100 * Math.random());
						return - 1 === g.indexOf(a) ? a: h()
					};
					return a.dice = function() {
						var b = h();
						g.push(b),
						a.minDice = Math.min.apply(null, g),
						g.length > c && (g[0] === a.minDice ? g.splice(1, 1) : g.splice(0, 1))
					},
					e
				}
			});
			h.then(function(a) {
				f = a.data;
				var c = new g;
				b.on("click",
				function() {
					c.show()
				})
			})
		}
	}
}]),
angular.module("page.place").directive("rstBlock",
function() {
	var a = DomUtil.debounce(function() {
		var a = Math.max(document.documentElement.scrollTop, window.scrollY || 0);
		window.scroll(0, a + 1),
		window.scroll(0, a)
	},
	50);
	return {
		restrict: "E",
		replace: !0,
		scope: {
			data: "="
		},
		templateUrl: "/pc/page/place/_block/rst-block/rst-block.html",
		controller: ["$scope",
		function(b) {
			b.data && (b.restaurant = b.data.$restaurant, b.$$postDigest(function() {
				b.$$watchers.splice(0),
				b.$watch("$index", a)
			}))
		}]
	}
}),
void
function() {
	angular.module("page.place").factory("RstPopOver", ["$http", "$templateCache", "templateParser", "templateBuilder", "Popover",
	function(a, b, c, d, e) {
		var f, g, h = "placeleft placeright alignbottom",
		i = "/pc/page/place/_block/rst-popover/rst-popover.html",
		j = a.get(i, {
			cache: b
		});
		return j.then(function(a) {
			f = a.data,
			g || (g = c.parse(f))
		}),
		e.extend({
			defaults: {
				appendToBody: !0,
				showDelay: 300,
				animation: !1,
				placement: "right",
				alignment: "start"
			},
			render: function() {
				var a = document.createElement("div");
				return a.className = "rstpopover",
				this.dom = a,
				a
			},
			afterLocate: function(a, b) {
				var c = angular.$(this.dom);
				c.removeClass(h).addClass("place" + a),
				"end" === b && c.addClass("alignbottom")
			},
			willShow: function() {
				var a = this.get("target");
				return a && a.parentNode
			},
			refresh: function() {
				var a = this.dom;
				this.rstChanged && (a.innerHTML = d.build(g, {
					restaurant: this.rst
				}), this.rstChanged = !1);
				var b = this.get("target");
				if (b) {
					var c = parseInt(DomUtil.getStyle(a, "paddingLeft"), 10) + parseInt(DomUtil.getStyle(a, "paddingLeft"), 10) + parseInt(DomUtil.getStyle(a, "borderLeftWidth"), 10) + parseInt(DomUtil.getStyle(a, "borderRightWidth"), 10);
					a.style.width = b.clientWidth - c + "px"
				}
			},
			setRst: function(a) {
				var b = this.rst;
				b !== a && (this.rstChanged = !0),
				this.rst = a
			},
			reset: function() {
				this.options.target = null,
				this.showTimer = null,
				this.visible = !1
			}
		})
	}]).directive("rstPopover", ["RstPopOver",
	function(a) {
		return {
			restrict: "A",
			link: function(b, c) {
				var d = new a({
					target: c[0]
				});
				d.setRst(b.restaurant),
				b.$on("$destroy",
				function() {
					d.destroy()
				})
			}
		}
	}])
} (),
angular.module("page.place").directive("rstView", ["$rootScope", "$filter", "$http", "$templateCache", "templateParser", "templateBuilder", "RstPopOver",
function(a, b, c, d, e, f, g) {
	return {
		restrict: "EA",
		replace: !0,
		template: '<div class="clearfix"></div>',
		link: function(b, h, i) {
			var j, k = "/pc/page/place/_block/rst-block/rst-block.html",
			l = c.get(k, {
				cache: d
			}),
			m = !1;
			l.then(function(a) {
				var b = a.data;
				j = e.parse(b),
				m && (H(), m = !1)
			});
			var n = {},
			o = function(b, c, d) {
				var e = {
					restaurant: c,
					$rootScope: a,
					$index: d
				},
				g = n[c.id];
				return g || (g = f.build(b, e), n[c.id] = g),
				g
			},
			p = !1,
			q = function() {
				p = !0,
				u && !u.visible && u.show()
			},
			r = function() {
				p = !1,
				u && u.hide()
			},
			s = "undefined" == typeof h[0].addEventListener;
			s ? (h[0].attachEvent("onmouseleave", r), h[0].attachEvent("onmouseenter", q)) : (h.on("mouseleave", r), h.on("mouseenter", q));
			var t, u = new g;
			h.on("mouseover", DomUtil.throttle(function(a) {
				if (s || p) {
					var b, c = a.target || a.srcElement,
					d = angular.$(c).parents(".rstblock"),
					e = d[0];
					e && (b = e.getAttribute("data-rst-id")),
					b != t && (u.hide(), u.reset(), u.set("target", e), u.setRst(E[G[b]]), u.show(), t = b)
				}
			},
			100));
			var v, w = 141,
			x = 0,
			y = function(a, b) {
				var c = "";
				if (E) {
					for (var d = Math.min(E.length, a + b), e = a; d > e; e++) {
						var f = E[e];
						c += o(j, f, e)
					}
					x = d
				}
				return c
			},
			z = function() {
				var a = h[0].getBoundingClientRect(),
				b = document.documentElement.clientHeight || window.innerHeight;
				return a.top > b ? 0 : Math.ceil((b - a.top) / w) * B
			},
			A = function() {
				if (v > x) {
					var a = z();
					if (a > x) {
						var b = y(x, Math.max(16, a - x));
						h[0].insertAdjacentHTML("beforeend", b)
					}
				}
			},
			B = 4;
			h[0].offsetWidth < 1e3 && (B = 3);
			var C = function() {
				var a = h[0].offsetWidth < 1e3 ? 3 : 4;
				a !== B && (B = a, D(), A())
			},
			D = function() {
				h.css("height", Math.ceil(v / B) * w + "px")
			};
			angular.element(window).on("resize", DomUtil.debounce(C, 50)).on("scroll", DomUtil.throttle(A, 50));
			var E, F, G = {},
			H = function(a) {
				if (!j) return void(m = !0);
				E.forEach(function(a, b) {
					G[a.id] = b
				}),
				v = E.length,
				D();
				var b, c = Math.max(16, z());
				if (a && E) for (var d = Math.min(c, Math.max(a.length, E.length)), e = 0; d > e; e++) {
					var f = a[e],
					g = E[e];
					if (f && !g || !f && g) {
						b = !0;
						break
					}
					if (f && g && f.id !== g.id) {
						b = !0;
						break
					}
				} else b = !0;
				b && (t = null, u.set("target", null), h.html(y(0, c)))
			};
			b.$watchCollection(i.data,
			function(a) {
				var b = E;
				E = a || [],
				H(b)
			}),
			b.$watch("rstStream.orderBy",
			function(a) {
				F = a,
				H()
			})
		}
	}
}]),
angular.module("page.place").directive("searchInput", ["$rootScope",
function(a) {
	return {
		restrict: "EA",
		replace: !0,
		templateUrl: "/pc/page/place/_block/search-input/search-input.html",
		link: function(b) {
			b.RESTAURANTBASE = a.RESTAURANTBASE
		}
	}
}]),
angular.module("page.place").directive("autocomplete", ["Search", "$rootScope",
function(a, b) {
	return {
		restrict: "A",
		link: function(c, d) {
			var e = d.parent().find(".searchbox"),
			f = d.parent().find(".place-search-btn");
			if (0 !== e.length) {
				var g = function() {
					return (c.searchRestaurants || []).length + (c.searchFoods || []).length
				},
				h = function() {
					var a = g();
					a > 0 && e.css("display", "block")
				},
				i = function(a) {
					a > 0 ? setTimeout(function() {
						e.css("display", "")
					},
					a) : e.css("display", "")
				},
				j = function() {
					var a = g();
					a > 0 ? h() : i()
				};
				d.on("focus",
				function() {
					h()
				}),
				d.on("blur",
				function() {
					i(300)
				});
				var k, l, m = null,
				n = 300;
				f.on("click",
				function() {
					l && (location.href = encodeURI("/place/" + b.geohash + "/search/" + l))
				});
				var o = function(a) {
					var b = e.find("li");
					b.removeClass("active");
					var c = g();
					"next" === a ? null === m ? m = 0 : (m++, m >= c && (m = 0)) : "prev" === a && (null === m ? m = c - 1 : (m--, 0 > m && (m = c - 1))),
					angular.$(b[m]).addClass("active")
				};
				d.bind("keyup",
				function(g) {
					var h = g.which || g.keyCode;
					if (40 === h) return void o("next");
					if (38 === h) return void o("prev");
					if (13 === h) {
						var p = e.find("li.active a");
						return void(p.length > 0 ? p[0].click() : f[0].click())
					}
					if (27 === h) return i(),
					void d[0].blur();
					var q = d.val();
					if (q) {
						if (l === q) return;
						k && (clearTimeout(k), k = null),
						k = setTimeout(function() {
							a(b.geohash, q, {
								limit: 10
							}).$promise.then(function(a) {
								return q = d.val(),
								"" !== q && (c.searchRestaurants = a[0], c.searchFoods = a[1]),
								m = null,
								j(),
								a
							}),
							k = null
						},
						n)
					} else k && (clearTimeout(k), k = null),
					c.searchRestaurants = [],
					c.searchFoods = [],
					j();
					l = q,
					b.searchText = q
				})
			}
		}
	}
}]),
angular.module("page.place"),
angular.module("page.place").factory("RestaurantStream", ["Zero", "$rootScope", "$q", "RestaurantWrapper",
function(a, b, c, d) {
	return function(b) {
		var e = c.defer(),
		f = [],
		g = [],
		h = [],
		i = function(a) {
			angular.forEach(a,
			function(a) {
				angular.forEach(a.flavors.match(/[^\s,]+/g),
				function(a) { - 1 === g.indexOf(a) && g.push(a)
				}),
				angular.forEach(a.restaurant_activity,
				function(a) { - 1 === h.indexOf(a.name) && h.push(a.name)
				}),
				angular.forEach(a.food_activity,
				function(a) { - 1 === h.indexOf(a.name) && h.push(a.name)
				})
			})
		},
		j = function(c, g) {
			return a.restaurant.query(angular.extend({
				type: "geohash",
				"fields[]": ["id", "name", "phone", "promotion_info", "name_for_url", "flavors", "is_time_ensure", "is_premium", "image_path", "rating", "is_free_delivery", "minimum_order_amount", "order_lead_time", "is_support_invoice", "is_new", "is_third_party_delivery", "is_in_book_time", "rating_count", "address", "month_sales", "delivery_fee", "minimum_free_delivery_amount", "minimum_order_description", "minimum_invoice_amount", "opening_hours", "is_online_payment", "status", "supports", "in_delivery_area"],
				"extras[]": ["food_activity", "restaurant_activity", "certification"],
				limit: g,
				offset: c
			},
			b),
			function(a) {
				d(a),
				i(a),
				angular.forEach(a,
				function(a) {
					a.index = f.push(a)
				}),
				e.notify(a),
				a.length < g && (k.status = "COMPLETE", e.resolve(k))
			},
			function(a) {
				k.status = "ERROR",
				e.reject(a)
			})
		};
		j(0, 24).$promise.then(function() {
			j(24, 1e3)
		});
		var k = {
			$promise: e.promise,
			status: "LOADING",
			restaurants: f,
			flavors: g,
			activityNames: h
		};
		return k
	}
}]).factory("RecentBought", ["Zero", "$rootScope", "$q", "RestaurantWrapper",
function(a, b, c, d) {
	return function() {
		return b.user.$promise.then(function(e) {
			var f = e.user_id || "anonymous",
			g = {
				userId: f,
				"fields[]": ["restaurant_id", "status_code"]
			},
			h = a.favor.query({
				userId: f,
				filter: "restaurants",
				type: "user_favor_in_geohash",
				geohash: b.geohash,
				"extras[]": ["food_activity", "restaurant_activity", "certification"]
			}).$promise;
			return c.all(["last_month", "before_month", "unrated"].map(function(b) {
				return a.order.query(angular.extend({
					type: b
				},
				g)).$promise
			}).concat(h)).then(function(a) {
				var b = {},
				c = a[3];
				d(c);
				var e = function(a) {
					var c = a.restaurant_id;
					c in b || (b[c] = !0)
				},
				f = function(a) {
					b[a.id] && delete b[a.id]
				},
				g = a[0];
				angular.forEach(g, e),
				angular.forEach(a[1], e),
				angular.forEach(c, f);
				var h = {},
				i = a[2],
				j = i.length;
				return angular.forEach(i,
				function(a) {
					h[a.restaurant_id] = !0
				}),
				angular.forEach(g,
				function(a) {
					h[a.restaurant_id] || -8 !== a.status_code && -4 !== a.status_code && -1 !== a.status_code && 11 !== a.status_code && j++
				}),
				{
					restaurantMap: b,
					favorRestaurants: c,
					uncompletedOrder: j
				}
			})
		})
	}
}]).factory("Search", ["Zero", "$q", "RestaurantWrapper",
function(a, b, c) {
	return function(d, e, f) {
		var g = b.defer();
		f = f || {};
		var h = f.limit,
		i = {
			type: "search",
			geohash: d,
			keyword: e
		},
		j = {
			type: "search",
			geohash: d,
			keyword: e
		};
		void 0 !== h && (i.limit = h, j.limit = h),
		f.activities ? (i["extras[]"] = ["food_activity", "restaurant_activity", "certification"], j["extras[]"] = ["restaurant", "food_activity"]) : j["extras[]"] = ["restaurant"],
		f.hasOutside && (i.has_outside = 1);
		var k = a.restaurant.query(i),
		l = a.food.query(j);
		return b.all([k.$promise, l.$promise]).then(function(a) {
			return c(a[0]),
			g.resolve(a),
			a
		}),
		g.$promise = g.promise,
		g
	}
}]),
angular.module("page.place").controller("mixCtrl", ["$scope", "$routeParams", "$rootScope", "RecentBought", "RestaurantStream", "Zero",
function(a, b, c, d, e, f) {
	c.geohash = a.geohash = b.geohash,
	a.searchRestaurants = [],
	a.searchFoods = [];
	var g = function() {
		localStorage.removeItem("GEOHASH"),
		location.href = "//v5.ele.me/?force=1",
		document.cookie = "geohash=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=" + a.ROOTHOST + "; path=/"
	};
	if (/[\Wailo_]|^$/.test(c.geohash || "")) return g();
	localStorage.setItem("GEOHASH", a.geohash),
	document.cookie = "geohash=" + a.geohash + "; expires=" + new Date(Date.now() + 31536e6).toUTCString() + "; DOMAIN=" + a.ROOTHOST + "; path=/;",
	a.recentBought = [];
	var h = function() {
		var b = d();
		return b.then(function(b) {
			a.sidebarCount.uncompletedOrder = b.uncompletedOrder,
			a.recentBought.push.apply(a.recentBought, b.favorRestaurants)
		}),
		function(c) {
			b.then(function(b) {
				var d = b.restaurantMap;
				c.forEach(function(b) {
					b.id in d && a.recentBought.push(b)
				})
			})
		}
	} ();
	a.viewBoughtOnly = function(b) {
		a.recentBoughtOnly = b
	},
	a.rstStream = e({
		version: "v2",
		geohash: a.geohash
	}),
	a.rstStream.$promise.then(null, null,
	function(a) {
		h(a)
	}),
	f.activity.query({
		type: "geohash",
		geohash: c.geohash,
		"fields[]": ["link", "image_path", "name_for_url", "status", "is_valid"]
	},
	function(b) {
		a.activities = b.filter(function(a) {
			switch (a.status) {
			case "NO_INFO":
				a.href = "#";
				break;
			case "WITH_LINK":
				a.href = a.link;
				break;
			case "WITH_PAGE":
				a.href = "/activity/" + a.name_for_url
			}
			return a.is_valid
		})
	});
	var i;
	try {
		i = Geohash.decode(c.geohash)
	} catch(j) {
		return g()
	}
	a.dianping = "http://t.dianping.com/home?latitude=" + i[0] + "&longitude=" + i[1] + "&distance=500&utm_source=eleme1&utm_medium=eleme&utm_term=pc&utm_content=1&utm_campaign=f"
}]),
angular.module("page.place").controller("premiumCtrl", ["$scope", "$routeParams", "$rootScope", "RestaurantStream",
function(a, b, c, d) {
	return c.geohash = a.geohash = b.geohash,
	/[\Wailo_]|^$/.test(c.geohash || "") ? (localStorage.removeItem("GEOHASH"), location.href = "//v5.ele.me/?force=1", void(document.cookie = "geohash=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Domain=" + a.ROOTHOST + "; path=/")) : (localStorage.setItem("GEOHASH", a.geohash), void(a.pumStream = d({
		is_premium: 1,
		geohash: a.geohash
	})))
}]),
angular.module("page.place").controller("searchCtrl", ["$scope", "$routeParams", "Search", "RestaurantWrapper", "Zero",
function(a, b, c, d, e) {
	var f = b.geohash,
	g = b.keyword;
	a.keyword = g,
	a.geohash = f,
	a.status = "LOADING",
	a.resultFilter = "",
	a.outsideRstsVisible = !1,
	a.hideOutsideRsts = function() {
		a.outsideRstsVisible = !1
	},
	c(f, g, {
		activities: !0,
		limit: 300,
		hasOutside: 1
	}).$promise.then(function(b) {
		var c = b[0];
		d(c);
		for (var h = 0,
		i = c.length; i > h; h++) {
			var j = c[h];
			if (!j.in_delivery_area) {
				a.outsideRst = j,
				c.splice(h, 1);
				break
			}
		}
		a.outsideRst && e.restaurant.query({
			type: "search",
			geohash: f,
			keyword: g,
			"extras[]": ["food_activity", "restaurant_activity", "certification"],
			in_delivery_area: 0
		}).$promise.then(function(b) {
			d(b),
			a.outsideRsts = b
		}),
		a.restaurants = c,
		a.foods = b[1],
		a.mixedRsts = c.slice();
		var k = b[1],
		l = {},
		m = [],
		n = [],
		o = c.map(function(a) {
			return a.id
		});
		k.forEach(function(b) {
			if (0 !== b.is_valid) {
				var c = b.restaurant,
				d = b.ratings;
				b.rating_count = d[1] + d[2] + d[3] + d[4] + d[5],
				l[c.id] ? c = l[c.id] : (l[c.id] = c, n.push(c.id), m.push(c), -1 === o.indexOf(c.id) && a.mixedRsts.push(c), c.foods = [], c.limitTo = 3),
				c.foods.push(b)
			}
		}),
		d(m),
		a.rstGroups = m,
		a.status = "COMPLETE",
		n.length && e.restaurant.query({
			type: "ids",
			is_premium: 0,
			"extras[]": ["food_activity", "restaurant_activity"],
			"ids[]": n
		},
		function(a) {
			d(a),
			m.forEach(function(b, c) {
				b.activities = a[c].activities
			})
		})
	})
}]);