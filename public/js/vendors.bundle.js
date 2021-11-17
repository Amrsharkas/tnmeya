! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Popper = e()
}(this, function() {
    "use strict";
    for (var t = "undefined" != typeof window && "undefined" != typeof document, e = ["Edge", "Trident", "Firefox"], n = 0, i = 0; i < e.length; i += 1)
        if (t && 0 <= navigator.userAgent.indexOf(e[i])) {
            n = 1;
            break
        } var s = t && window.Promise ? function(t) {
        var e = !1;
        return function() {
            e || (e = !0, window.Promise.resolve().then(function() {
                e = !1, t()
            }))
        }
    } : function(t) {
        var e = !1;
        return function() {
            e || (e = !0, setTimeout(function() {
                e = !1, t()
            }, n))
        }
    };

    function a(t) {
        return t && "[object Function]" === {}.toString.call(t)
    }

    function b(t, e) {
        if (1 !== t.nodeType) return [];
        var n = getComputedStyle(t, null);
        return e ? n[e] : n
    }

    function f(t) {
        return "HTML" === t.nodeName ? t : t.parentNode || t.host
    }

    function p(t) {
        if (!t) return document.body;
        switch (t.nodeName) {
            case "HTML":
            case "BODY":
                return t.ownerDocument.body;
            case "#document":
                return t.body
        }
        var e = b(t),
            n = e.overflow,
            i = e.overflowX,
            r = e.overflowY;
        return /(auto|scroll|overlay)/.test(n + r + i) ? t : p(f(t))
    }
    var r = t && !(!window.MSInputMethodContext || !document.documentMode),
        o = t && /MSIE 10/.test(navigator.userAgent);

    function m(t) {
        return 11 === t ? r : 10 === t ? o : r || o
    }

    function y(t) {
        if (!t) return document.documentElement;
        for (var e = m(10) ? document.body : null, n = t.offsetParent; n === e && t.nextElementSibling;) n = (t = t.nextElementSibling).offsetParent;
        var i = n && n.nodeName;
        return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TD", "TABLE"].indexOf(n.nodeName) && "static" === b(n, "position") ? y(n) : n : t ? t.ownerDocument.documentElement : document.documentElement
    }

    function u(t) {
        return null !== t.parentNode ? u(t.parentNode) : t
    }

    function g(t, e) {
        if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
        var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = n ? t : e,
            r = n ? e : t,
            o = document.createRange();
        o.setStart(i, 0), o.setEnd(r, 0);
        var s, a, l = o.commonAncestorContainer;
        if (t !== l && e !== l || i.contains(r)) return "BODY" === (a = (s = l).nodeName) || "HTML" !== a && y(s.firstElementChild) !== s ? y(l) : l;
        var c = u(t);
        return c.host ? g(c.host, e) : g(t, u(e).host)
    }

    function _(t) {
        var e = "top" === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
            n = t.nodeName;
        if ("BODY" === n || "HTML" === n) {
            var i = t.ownerDocument.documentElement;
            return (t.ownerDocument.scrollingElement || i)[e]
        }
        return t[e]
    }

    function h(t, e) {
        var n = "x" === e ? "Left" : "Top",
            i = "Left" === n ? "Right" : "Bottom";
        return parseFloat(t["border" + n + "Width"], 10) + parseFloat(t["border" + i + "Width"], 10)
    }

    function l(t, e, n, i) {
        return Math.max(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], m(10) ? parseInt(n["offset" + t]) + parseInt(i["margin" + ("Height" === t ? "Top" : "Left")]) + parseInt(i["margin" + ("Height" === t ? "Bottom" : "Right")]) : 0)
    }

    function v(t) {
        var e = t.body,
            n = t.documentElement,
            i = m(10) && getComputedStyle(n);
        return {
            height: l("Height", e, n, i),
            width: l("Width", e, n, i)
        }
    }
    var c = function() {
            function i(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            return function(t, e, n) {
                return e && i(t.prototype, e), n && i(t, n), t
            }
        }(),
        w = function(t, e, n) {
            return e in t ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t
        },
        S = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
            }
            return t
        };

    function E(t) {
        return S({}, t, {
            right: t.left + t.width,
            bottom: t.top + t.height
        })
    }

    function T(t) {
        var e = {};
        try {
            if (m(10)) {
                e = t.getBoundingClientRect();
                var n = _(t, "top"),
                    i = _(t, "left");
                e.top += n, e.left += i, e.bottom += n, e.right += i
            } else e = t.getBoundingClientRect()
        } catch (t) {}
        var r = {
                left: e.left,
                top: e.top,
                width: e.right - e.left,
                height: e.bottom - e.top
            },
            o = "HTML" === t.nodeName ? v(t.ownerDocument) : {},
            s = o.width || t.clientWidth || r.right - r.left,
            a = o.height || t.clientHeight || r.bottom - r.top,
            l = t.offsetWidth - s,
            c = t.offsetHeight - a;
        if (l || c) {
            var u = b(t);
            l -= h(u, "x"), c -= h(u, "y"), r.width -= l, r.height -= c
        }
        return E(r)
    }

    function D(t, e) {
        var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            i = m(10),
            r = "HTML" === e.nodeName,
            o = T(t),
            s = T(e),
            a = p(t),
            l = b(e),
            c = parseFloat(l.borderTopWidth, 10),
            u = parseFloat(l.borderLeftWidth, 10);
        n && r && (s.top = Math.max(s.top, 0), s.left = Math.max(s.left, 0));
        var h = E({
            top: o.top - s.top - c,
            left: o.left - s.left - u,
            width: o.width,
            height: o.height
        });
        if (h.marginTop = 0, h.marginLeft = 0, !i && r) {
            var d = parseFloat(l.marginTop, 10),
                f = parseFloat(l.marginLeft, 10);
            h.top -= c - d, h.bottom -= c - d, h.left -= u - f, h.right -= u - f, h.marginTop = d, h.marginLeft = f
        }
        return (i && !n ? e.contains(a) : e === a && "BODY" !== a.nodeName) && (h = function(t, e) {
            var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
                i = _(e, "top"),
                r = _(e, "left"),
                o = n ? -1 : 1;
            return t.top += i * o, t.bottom += i * o, t.left += r * o, t.right += r * o, t
        }(h, e)), h
    }

    function k(t) {
        if (!t || !t.parentElement || m()) return document.documentElement;
        for (var e = t.parentElement; e && "none" === b(e, "transform");) e = e.parentElement;
        return e || document.documentElement
    }

    function d(t, e, n, i) {
        var r = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
            o = {
                top: 0,
                left: 0
            },
            s = r ? k(t) : g(t, e);
        if ("viewport" === i) o = function(t) {
            var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
                n = t.ownerDocument.documentElement,
                i = D(t, n),
                r = Math.max(n.clientWidth, window.innerWidth || 0),
                o = Math.max(n.clientHeight, window.innerHeight || 0),
                s = e ? 0 : _(n),
                a = e ? 0 : _(n, "left");
            return E({
                top: s - i.top + i.marginTop,
                left: a - i.left + i.marginLeft,
                width: r,
                height: o
            })
        }(s, r);
        else {
            var a = void 0;
            "scrollParent" === i ? "BODY" === (a = p(f(e))).nodeName && (a = t.ownerDocument.documentElement) : a = "window" === i ? t.ownerDocument.documentElement : i;
            var l = D(a, s, r);
            if ("HTML" !== a.nodeName || function t(e) {
                    var n = e.nodeName;
                    return "BODY" !== n && "HTML" !== n && ("fixed" === b(e, "position") || t(f(e)))
                }(s)) o = l;
            else {
                var c = v(t.ownerDocument),
                    u = c.height,
                    h = c.width;
                o.top += l.top - l.marginTop, o.bottom = u + l.top, o.left += l.left - l.marginLeft, o.right = h + l.left
            }
        }
        var d = "number" == typeof(n = n || 0);
        return o.left += d ? n : n.left || 0, o.top += d ? n : n.top || 0, o.right -= d ? n : n.right || 0, o.bottom -= d ? n : n.bottom || 0, o
    }

    function C(t, e, i, n, r) {
        var o = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === t.indexOf("auto")) return t;
        var s = d(i, n, o, r),
            a = {
                top: {
                    width: s.width,
                    height: e.top - s.top
                },
                right: {
                    width: s.right - e.right,
                    height: s.height
                },
                bottom: {
                    width: s.width,
                    height: s.bottom - e.bottom
                },
                left: {
                    width: e.left - s.left,
                    height: s.height
                }
            },
            l = Object.keys(a).map(function(t) {
                return S({
                    key: t
                }, a[t], {
                    area: (e = a[t], e.width * e.height)
                });
                var e
            }).sort(function(t, e) {
                return e.area - t.area
            }),
            c = l.filter(function(t) {
                var e = t.width,
                    n = t.height;
                return e >= i.clientWidth && n >= i.clientHeight
            }),
            u = 0 < c.length ? c[0].key : l[0].key,
            h = t.split("-")[1];
        return u + (h ? "-" + h : "")
    }

    function O(t, e, n) {
        var i = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return D(n, i ? k(e) : g(e, n), i)
    }

    function M(t) {
        var e = getComputedStyle(t),
            n = parseFloat(e.marginTop) + parseFloat(e.marginBottom),
            i = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
        return {
            width: t.offsetWidth + i,
            height: t.offsetHeight + n
        }
    }

    function Y(t) {
        var e = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return t.replace(/left|right|bottom|top/g, function(t) {
            return e[t]
        })
    }

    function A(t, e, n) {
        n = n.split("-")[0];
        var i = M(t),
            r = {
                width: i.width,
                height: i.height
            },
            o = -1 !== ["right", "left"].indexOf(n),
            s = o ? "top" : "left",
            a = o ? "left" : "top",
            l = o ? "height" : "width",
            c = o ? "width" : "height";
        return r[s] = e[s] + e[l] / 2 - i[l] / 2, r[a] = n === a ? e[a] - i[c] : e[Y(a)], r
    }

    function I(t, e) {
        return Array.prototype.find ? t.find(e) : t.filter(e)[0]
    }

    function x(t, n, e) {
        return (void 0 === e ? t : t.slice(0, function(t, e, n) {
            if (Array.prototype.findIndex) return t.findIndex(function(t) {
                return t[e] === n
            });
            var i = I(t, function(t) {
                return t[e] === n
            });
            return t.indexOf(i)
        }(t, "name", e))).forEach(function(t) {
            t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var e = t.function || t.fn;
            t.enabled && a(e) && (n.offsets.popper = E(n.offsets.popper), n.offsets.reference = E(n.offsets.reference), n = e(n, t))
        }), n
    }

    function N(t, n) {
        return t.some(function(t) {
            var e = t.name;
            return t.enabled && e === n
        })
    }

    function L(t) {
        for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < e.length; i++) {
            var r = e[i],
                o = r ? "" + r + n : t;
            if (void 0 !== document.body.style[o]) return o
        }
        return null
    }

    function W(t) {
        var e = t.ownerDocument;
        return e ? e.defaultView : window
    }

    function P(t, e, n, i) {
        n.updateBound = i, W(t).addEventListener("resize", n.updateBound, {
            passive: !0
        });
        var r = p(t);
        return function t(e, n, i, r) {
            var o = "BODY" === e.nodeName,
                s = o ? e.ownerDocument.defaultView : e;
            s.addEventListener(n, i, {
                passive: !0
            }), o || t(p(s.parentNode), n, i, r), r.push(s)
        }(r, "scroll", n.updateBound, n.scrollParents), n.scrollElement = r, n.eventsEnabled = !0, n
    }

    function H() {
        var t, e;
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (t = this.reference, e = this.state, W(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function(t) {
            t.removeEventListener("scroll", e.updateBound)
        }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e))
    }

    function R(t) {
        return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
    }

    function j(n, i) {
        Object.keys(i).forEach(function(t) {
            var e = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(t) && R(i[t]) && (e = "px"), n.style[t] = i[t] + e
        })
    }

    function F(t, e, n) {
        var i = I(t, function(t) {
                return t.name === e
            }),
            r = !!i && t.some(function(t) {
                return t.name === n && t.enabled && t.order < i.order
            });
        if (!r) {
            var o = "`" + e + "`",
                s = "`" + n + "`";
            console.warn(s + " modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!")
        }
        return r
    }
    var U = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        X = U.slice(3);

    function B(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            n = X.indexOf(t),
            i = X.slice(n + 1).concat(X.slice(0, n));
        return e ? i.reverse() : i
    }
    var V = "flip",
        q = "clockwise",
        G = "counterclockwise";

    function K(t, r, o, e) {
        var s = [0, 0],
            a = -1 !== ["right", "left"].indexOf(e),
            n = t.split(/(\+|\-)/).map(function(t) {
                return t.trim()
            }),
            i = n.indexOf(I(n, function(t) {
                return -1 !== t.search(/,|\s/)
            }));
        n[i] && -1 === n[i].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var l = /\s*,\s*|\s+/,
            c = -1 !== i ? [n.slice(0, i).concat([n[i].split(l)[0]]), [n[i].split(l)[1]].concat(n.slice(i + 1))] : [n];
        return (c = c.map(function(t, e) {
            var n = (1 === e ? !a : a) ? "height" : "width",
                i = !1;
            return t.reduce(function(t, e) {
                return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, i = !0, t) : i ? (t[t.length - 1] += e, i = !1, t) : t.concat(e)
            }, []).map(function(t) {
                return function(t, e, n, i) {
                    var r = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                        o = +r[1],
                        s = r[2];
                    if (!o) return t;
                    if (0 === s.indexOf("%")) {
                        var a = void 0;
                        switch (s) {
                            case "%p":
                                a = n;
                                break;
                            case "%":
                            case "%r":
                            default:
                                a = i
                        }
                        return E(a)[e] / 100 * o
                    }
                    if ("vh" === s || "vw" === s) return ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * o;
                    return o
                }(t, n, r, o)
            })
        })).forEach(function(n, i) {
            n.forEach(function(t, e) {
                R(t) && (s[i] += t * ("-" === n[e - 1] ? -1 : 1))
            })
        }), s
    }
    var Q = {
            placement: "bottom",
            positionFixed: !1,
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function() {},
            onUpdate: function() {},
            modifiers: {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: function(t) {
                        var e = t.placement,
                            n = e.split("-")[0],
                            i = e.split("-")[1];
                        if (i) {
                            var r = t.offsets,
                                o = r.reference,
                                s = r.popper,
                                a = -1 !== ["bottom", "top"].indexOf(n),
                                l = a ? "left" : "top",
                                c = a ? "width" : "height",
                                u = {
                                    start: w({}, l, o[l]),
                                    end: w({}, l, o[l] + o[c] - s[c])
                                };
                            t.offsets.popper = S({}, s, u[i])
                        }
                        return t
                    }
                },
                offset: {
                    order: 200,
                    enabled: !0,
                    fn: function(t, e) {
                        var n = e.offset,
                            i = t.placement,
                            r = t.offsets,
                            o = r.popper,
                            s = r.reference,
                            a = i.split("-")[0],
                            l = void 0;
                        return l = R(+n) ? [+n, 0] : K(n, o, s, a), "left" === a ? (o.top += l[0], o.left -= l[1]) : "right" === a ? (o.top += l[0], o.left += l[1]) : "top" === a ? (o.left += l[0], o.top -= l[1]) : "bottom" === a && (o.left += l[0], o.top += l[1]), t.popper = o, t
                    },
                    offset: 0
                },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function(t, i) {
                        var e = i.boundariesElement || y(t.instance.popper);
                        t.instance.reference === e && (e = y(e));
                        var n = L("transform"),
                            r = t.instance.popper.style,
                            o = r.top,
                            s = r.left,
                            a = r[n];
                        r.top = "", r.left = "", r[n] = "";
                        var l = d(t.instance.popper, t.instance.reference, i.padding, e, t.positionFixed);
                        r.top = o, r.left = s, r[n] = a, i.boundaries = l;
                        var c = i.priority,
                            u = t.offsets.popper,
                            h = {
                                primary: function(t) {
                                    var e = u[t];
                                    return u[t] < l[t] && !i.escapeWithReference && (e = Math.max(u[t], l[t])), w({}, t, e)
                                },
                                secondary: function(t) {
                                    var e = "right" === t ? "left" : "top",
                                        n = u[e];
                                    return u[t] > l[t] && !i.escapeWithReference && (n = Math.min(u[e], l[t] - ("right" === t ? u.width : u.height))), w({}, e, n)
                                }
                            };
                        return c.forEach(function(t) {
                            var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
                            u = S({}, u, h[e](t))
                        }), t.offsets.popper = u, t
                    },
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent"
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function(t) {
                        var e = t.offsets,
                            n = e.popper,
                            i = e.reference,
                            r = t.placement.split("-")[0],
                            o = Math.floor,
                            s = -1 !== ["top", "bottom"].indexOf(r),
                            a = s ? "right" : "bottom",
                            l = s ? "left" : "top",
                            c = s ? "width" : "height";
                        return n[a] < o(i[l]) && (t.offsets.popper[l] = o(i[l]) - n[c]), n[l] > o(i[a]) && (t.offsets.popper[l] = o(i[a])), t
                    }
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function(t, e) {
                        var n;
                        if (!F(t.instance.modifiers, "arrow", "keepTogether")) return t;
                        var i = e.element;
                        if ("string" == typeof i) {
                            if (!(i = t.instance.popper.querySelector(i))) return t
                        } else if (!t.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
                        var r = t.placement.split("-")[0],
                            o = t.offsets,
                            s = o.popper,
                            a = o.reference,
                            l = -1 !== ["left", "right"].indexOf(r),
                            c = l ? "height" : "width",
                            u = l ? "Top" : "Left",
                            h = u.toLowerCase(),
                            d = l ? "left" : "top",
                            f = l ? "bottom" : "right",
                            p = M(i)[c];
                        a[f] - p < s[h] && (t.offsets.popper[h] -= s[h] - (a[f] - p)), a[h] + p > s[f] && (t.offsets.popper[h] += a[h] + p - s[f]), t.offsets.popper = E(t.offsets.popper);
                        var m = a[h] + a[c] / 2 - p / 2,
                            g = b(t.instance.popper),
                            _ = parseFloat(g["margin" + u], 10),
                            v = parseFloat(g["border" + u + "Width"], 10),
                            y = m - t.offsets.popper[h] - _ - v;
                        return y = Math.max(Math.min(s[c] - p, y), 0), t.arrowElement = i, t.offsets.arrow = (w(n = {}, h, Math.round(y)), w(n, d, ""), n), t
                    },
                    element: "[x-arrow]"
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: function(p, m) {
                        if (N(p.instance.modifiers, "inner")) return p;
                        if (p.flipped && p.placement === p.originalPlacement) return p;
                        var g = d(p.instance.popper, p.instance.reference, m.padding, m.boundariesElement, p.positionFixed),
                            _ = p.placement.split("-")[0],
                            v = Y(_),
                            y = p.placement.split("-")[1] || "",
                            b = [];
                        switch (m.behavior) {
                            case V:
                                b = [_, v];
                                break;
                            case q:
                                b = B(_);
                                break;
                            case G:
                                b = B(_, !0);
                                break;
                            default:
                                b = m.behavior
                        }
                        return b.forEach(function(t, e) {
                            if (_ !== t || b.length === e + 1) return p;
                            _ = p.placement.split("-")[0], v = Y(_);
                            var n, i = p.offsets.popper,
                                r = p.offsets.reference,
                                o = Math.floor,
                                s = "left" === _ && o(i.right) > o(r.left) || "right" === _ && o(i.left) < o(r.right) || "top" === _ && o(i.bottom) > o(r.top) || "bottom" === _ && o(i.top) < o(r.bottom),
                                a = o(i.left) < o(g.left),
                                l = o(i.right) > o(g.right),
                                c = o(i.top) < o(g.top),
                                u = o(i.bottom) > o(g.bottom),
                                h = "left" === _ && a || "right" === _ && l || "top" === _ && c || "bottom" === _ && u,
                                d = -1 !== ["top", "bottom"].indexOf(_),
                                f = !!m.flipVariations && (d && "start" === y && a || d && "end" === y && l || !d && "start" === y && c || !d && "end" === y && u);
                            (s || h || f) && (p.flipped = !0, (s || h) && (_ = b[e + 1]), f && (y = "end" === (n = y) ? "start" : "start" === n ? "end" : n), p.placement = _ + (y ? "-" + y : ""), p.offsets.popper = S({}, p.offsets.popper, A(p.instance.popper, p.offsets.reference, p.placement)), p = x(p.instance.modifiers, p, "flip"))
                        }), p
                    },
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport"
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: function(t) {
                        var e = t.placement,
                            n = e.split("-")[0],
                            i = t.offsets,
                            r = i.popper,
                            o = i.reference,
                            s = -1 !== ["left", "right"].indexOf(n),
                            a = -1 === ["top", "left"].indexOf(n);
                        return r[s ? "left" : "top"] = o[n] - (a ? r[s ? "width" : "height"] : 0), t.placement = Y(e), t.offsets.popper = E(r), t
                    }
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: function(t) {
                        if (!F(t.instance.modifiers, "hide", "preventOverflow")) return t;
                        var e = t.offsets.reference,
                            n = I(t.instance.modifiers, function(t) {
                                return "preventOverflow" === t.name
                            }).boundaries;
                        if (e.bottom < n.top || e.left > n.right || e.top > n.bottom || e.right < n.left) {
                            if (!0 === t.hide) return t;
                            t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
                        } else {
                            if (!1 === t.hide) return t;
                            t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
                        }
                        return t
                    }
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function(t, e) {
                        var n = e.x,
                            i = e.y,
                            r = t.offsets.popper,
                            o = I(t.instance.modifiers, function(t) {
                                return "applyStyle" === t.name
                            }).gpuAcceleration;
                        void 0 !== o && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                        var s = void 0 !== o ? o : e.gpuAcceleration,
                            a = y(t.instance.popper),
                            l = T(a),
                            c = {
                                position: r.position
                            },
                            u = {
                                left: Math.floor(r.left),
                                top: Math.round(r.top),
                                bottom: Math.round(r.bottom),
                                right: Math.floor(r.right)
                            },
                            h = "bottom" === n ? "top" : "bottom",
                            d = "right" === i ? "left" : "right",
                            f = L("transform"),
                            p = void 0,
                            m = void 0;
                        if (m = "bottom" === h ? "HTML" === a.nodeName ? -a.clientHeight + u.bottom : -l.height + u.bottom : u.top, p = "right" === d ? "HTML" === a.nodeName ? -a.clientWidth + u.right : -l.width + u.right : u.left, s && f) c[f] = "translate3d(" + p + "px, " + m + "px, 0)", c[h] = 0, c[d] = 0, c.willChange = "transform";
                        else {
                            var g = "bottom" === h ? -1 : 1,
                                _ = "right" === d ? -1 : 1;
                            c[h] = m * g, c[d] = p * _, c.willChange = h + ", " + d
                        }
                        var v = {
                            "x-placement": t.placement
                        };
                        return t.attributes = S({}, v, t.attributes), t.styles = S({}, c, t.styles), t.arrowStyles = S({}, t.offsets.arrow, t.arrowStyles), t
                    },
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right"
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function(t) {
                        var e, n;
                        return j(t.instance.popper, t.styles), e = t.instance.popper, n = t.attributes, Object.keys(n).forEach(function(t) {
                            !1 !== n[t] ? e.setAttribute(t, n[t]) : e.removeAttribute(t)
                        }), t.arrowElement && Object.keys(t.arrowStyles).length && j(t.arrowElement, t.arrowStyles), t
                    },
                    onLoad: function(t, e, n, i, r) {
                        var o = O(r, e, t, n.positionFixed),
                            s = C(n.placement, o, e, t, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                        return e.setAttribute("x-placement", s), j(e, {
                            position: n.positionFixed ? "fixed" : "absolute"
                        }), n
                    },
                    gpuAcceleration: void 0
                }
            }
        },
        z = function() {
            function o(t, e) {
                var n = this,
                    i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, o), this.scheduleUpdate = function() {
                    return requestAnimationFrame(n.update)
                }, this.update = s(this.update.bind(this)), this.options = S({}, o.Defaults, i), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = t && t.jquery ? t[0] : t, this.popper = e && e.jquery ? e[0] : e, this.options.modifiers = {}, Object.keys(S({}, o.Defaults.modifiers, i.modifiers)).forEach(function(t) {
                    n.options.modifiers[t] = S({}, o.Defaults.modifiers[t] || {}, i.modifiers ? i.modifiers[t] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(t) {
                    return S({
                        name: t
                    }, n.options.modifiers[t])
                }).sort(function(t, e) {
                    return t.order - e.order
                }), this.modifiers.forEach(function(t) {
                    t.enabled && a(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state)
                }), this.update();
                var r = this.options.eventsEnabled;
                r && this.enableEventListeners(), this.state.eventsEnabled = r
            }
            return c(o, [{
                key: "update",
                value: function() {
                    return function() {
                        if (!this.state.isDestroyed) {
                            var t = {
                                instance: this,
                                styles: {},
                                arrowStyles: {},
                                attributes: {},
                                flipped: !1,
                                offsets: {}
                            };
                            t.offsets.reference = O(this.state, this.popper, this.reference, this.options.positionFixed), t.placement = C(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.positionFixed = this.options.positionFixed, t.offsets.popper = A(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", t = x(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t))
                        }
                    }.call(this)
                }
            }, {
                key: "destroy",
                value: function() {
                    return function() {
                        return this.state.isDestroyed = !0, N(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[L("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
                    }.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function() {
                    return function() {
                        this.state.eventsEnabled || (this.state = P(this.reference, this.options, this.state, this.scheduleUpdate))
                    }.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function() {
                    return H.call(this)
                }
            }]), o
        }();
    return z.Utils = ("undefined" != typeof window ? window : global).PopperUtils, z.placements = U, z.Defaults = Q, z
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e(t.bootstrap = {}, t.jQuery, t.Popper)
}(this, function(t, e, u) {
    "use strict";

    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function s(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }

    function l(r) {
        for (var t = 1; t < arguments.length; t++) {
            var o = null != arguments[t] ? arguments[t] : {},
                e = Object.keys(o);
            "function" == typeof Object.getOwnPropertySymbols && (e = e.concat(Object.getOwnPropertySymbols(o).filter(function(t) {
                return Object.getOwnPropertyDescriptor(o, t).enumerable
            }))), e.forEach(function(t) {
                var e, n, i;
                e = r, i = o[n = t], n in e ? Object.defineProperty(e, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[n] = i
            })
        }
        return r
    }
    e = e && e.hasOwnProperty("default") ? e.default : e, u = u && u.hasOwnProperty("default") ? u.default : u;
    var r, n, o, a, c, h, d, f, p, m, g, _, v, y, b, w, S, E, T, D, k, C, O, M, Y, A, I, x, N, L, W, P, H, R, j, F, U, X, B, V, q, G, K, Q, z, Z, $, J, tt, et, nt, it, rt, ot, st, at, lt, ct, ut, ht, dt, ft, pt, mt, gt, _t, vt, yt, bt, wt, St, Et, Tt, Dt, kt, Ct, Ot, Mt, Yt, At, It, xt, Nt, Lt, Wt, Pt, Ht, Rt, jt, Ft, Ut, Xt, Bt, Vt, qt, Gt, Kt, Qt, zt, Zt, $t, Jt, te, ee, ne, ie, re, oe, se, ae, le, ce, ue, he, de, fe, pe, me, ge, _e, ve, ye, be, we, Se, Ee, Te, De, ke, Ce = (De = "transitionend", ke = {
            TRANSITION_END: "bsTransitionEnd",
            getUID: function(t) {
                for (; t += ~~(1e6 * Math.random()), document.getElementById(t););
                return t
            },
            getSelectorFromElement: function(t) {
                var e = t.getAttribute("data-target");
                e && "#" !== e || (e = t.getAttribute("href") || "");
                try {
                    return document.querySelector(e) ? e : null
                } catch (t) {
                    return null
                }
            },
            getTransitionDurationFromElement: function(t) {
                if (!t) return 0;
                var e = Te(t).css("transition-duration");
                return parseFloat(e) ? (e = e.split(",")[0], 1e3 * parseFloat(e)) : 0
            },
            reflow: function(t) {
                return t.offsetHeight
            },
            triggerTransitionEnd: function(t) {
                Te(t).trigger(De)
            },
            supportsTransitionEnd: function() {
                return Boolean(De)
            },
            isElement: function(t) {
                return (t[0] || t).nodeType
            },
            typeCheckConfig: function(t, e, n) {
                for (var i in n)
                    if (Object.prototype.hasOwnProperty.call(n, i)) {
                        var r = n[i],
                            o = e[i],
                            s = o && ke.isElement(o) ? "element" : (a = o, {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());
                        if (!new RegExp(r).test(s)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + r + '".')
                    } var a
            }
        }, (Te = e).fn.emulateTransitionEnd = function(t) {
            var e = this,
                n = !1;
            return Te(this).one(ke.TRANSITION_END, function() {
                n = !0
            }), setTimeout(function() {
                n || ke.triggerTransitionEnd(e)
            }, t), this
        }, Te.event.special[ke.TRANSITION_END] = {
            bindType: De,
            delegateType: De,
            handle: function(t) {
                if (Te(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
            }
        }, ke),
        Oe = (n = "alert", a = "." + (o = "bs.alert"), c = (r = e).fn[n], h = {
            CLOSE: "close" + a,
            CLOSED: "closed" + a,
            CLICK_DATA_API: "click" + a + ".data-api"
        }, "alert", "fade", "show", d = function() {
            function i(t) {
                this._element = t
            }
            var t = i.prototype;
            return t.close = function(t) {
                var e = this._element;
                t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, t.dispose = function() {
                r.removeData(this._element, o), this._element = null
            }, t._getRootElement = function(t) {
                var e = Ce.getSelectorFromElement(t),
                    n = !1;
                return e && (n = document.querySelector(e)), n || (n = r(t).closest(".alert")[0]), n
            }, t._triggerCloseEvent = function(t) {
                var e = r.Event(h.CLOSE);
                return r(t).trigger(e), e
            }, t._removeElement = function(e) {
                var n = this;
                if (r(e).removeClass("show"), r(e).hasClass("fade")) {
                    var t = Ce.getTransitionDurationFromElement(e);
                    r(e).one(Ce.TRANSITION_END, function(t) {
                        return n._destroyElement(e, t)
                    }).emulateTransitionEnd(t)
                } else this._destroyElement(e)
            }, t._destroyElement = function(t) {
                r(t).detach().trigger(h.CLOSED).remove()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = r(this),
                        e = t.data(o);
                    e || (e = new i(this), t.data(o, e)), "close" === n && e[n](this)
                })
            }, i._handleDismiss = function(e) {
                return function(t) {
                    t && t.preventDefault(), e.close(this)
                }
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }]), i
        }(), r(document).on(h.CLICK_DATA_API, '[data-dismiss="alert"]', d._handleDismiss(new d)), r.fn[n] = d._jQueryInterface, r.fn[n].Constructor = d, r.fn[n].noConflict = function() {
            return r.fn[n] = c, d._jQueryInterface
        }, d),
        Me = (p = "button", g = "." + (m = "bs.button"), _ = ".data-api", v = (f = e).fn[p], y = "active", "btn", b = '[data-toggle^="button"]', '[data-toggle="buttons"]', "input", ".active", ".btn", w = {
            CLICK_DATA_API: "click" + g + _,
            FOCUS_BLUR_DATA_API: "focus" + g + _ + " blur" + g + _
        }, S = function() {
            function n(t) {
                this._element = t
            }
            var t = n.prototype;
            return t.toggle = function() {
                var t = !0,
                    e = !0,
                    n = f(this._element).closest('[data-toggle="buttons"]')[0];
                if (n) {
                    var i = this._element.querySelector("input");
                    if (i) {
                        if ("radio" === i.type)
                            if (i.checked && this._element.classList.contains(y)) t = !1;
                            else {
                                var r = n.querySelector(".active");
                                r && f(r).removeClass(y)
                            } if (t) {
                            if (i.hasAttribute("disabled") || n.hasAttribute("disabled") || i.classList.contains("disabled") || n.classList.contains("disabled")) return;
                            i.checked = !this._element.classList.contains(y), f(i).trigger("change")
                        }
                        i.focus(), e = !1
                    }
                }
                e && this._element.setAttribute("aria-pressed", !this._element.classList.contains(y)), t && f(this._element).toggleClass(y)
            }, t.dispose = function() {
                f.removeData(this._element, m), this._element = null
            }, n._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = f(this).data(m);
                    t || (t = new n(this), f(this).data(m, t)), "toggle" === e && t[e]()
                })
            }, s(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }]), n
        }(), f(document).on(w.CLICK_DATA_API, b, function(t) {
            t.preventDefault();
            var e = t.target;
            f(e).hasClass("btn") || (e = f(e).closest(".btn")), S._jQueryInterface.call(f(e), "toggle")
        }).on(w.FOCUS_BLUR_DATA_API, b, function(t) {
            var e = f(t.target).closest(".btn")[0];
            f(e).toggleClass("focus", /^focus(in)?$/.test(t.type))
        }), f.fn[p] = S._jQueryInterface, f.fn[p].Constructor = S, f.fn[p].noConflict = function() {
            return f.fn[p] = v, S._jQueryInterface
        }, S),
        Ye = (T = "carousel", k = "." + (D = "bs.carousel"), C = ".data-api", O = (E = e).fn[T], M = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0
        }, Y = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean"
        }, A = "next", I = "prev", "left", "right", x = {
            SLIDE: "slide" + k,
            SLID: "slid" + k,
            KEYDOWN: "keydown" + k,
            MOUSEENTER: "mouseenter" + k,
            MOUSELEAVE: "mouseleave" + k,
            TOUCHEND: "touchend" + k,
            LOAD_DATA_API: "load" + k + C,
            CLICK_DATA_API: "click" + k + C
        }, "carousel", N = "active", "slide", "carousel-item-right", "carousel-item-left", "carousel-item-next", "carousel-item-prev", ".active", L = ".active.carousel-item", ".carousel-item", ".carousel-item-next, .carousel-item-prev", ".carousel-indicators", "[data-slide], [data-slide-to]", '[data-ride="carousel"]', W = function() {
            function o(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(e), this._element = E(t)[0], this._indicatorsElement = this._element.querySelector(".carousel-indicators"), this._addEventListeners()
            }
            var t = o.prototype;
            return t.next = function() {
                this._isSliding || this._slide(A)
            }, t.nextWhenVisible = function() {
                !document.hidden && E(this._element).is(":visible") && "hidden" !== E(this._element).css("visibility") && this.next()
            }, t.prev = function() {
                this._isSliding || this._slide(I)
            }, t.pause = function(t) {
                t || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (Ce.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, t.cycle = function(t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, t.to = function(t) {
                var e = this;
                this._activeElement = this._element.querySelector(L);
                var n = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                    if (this._isSliding) E(this._element).one(x.SLID, function() {
                        return e.to(t)
                    });
                    else {
                        if (n === t) return this.pause(), void this.cycle();
                        var i = n < t ? A : I;
                        this._slide(i, this._items[t])
                    }
            }, t.dispose = function() {
                E(this._element).off(k), E.removeData(this._element, D), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, t._getConfig = function(t) {
                return t = l({}, M, t), Ce.typeCheckConfig(T, t, Y), t
            }, t._addEventListeners = function() {
                var e = this;
                this._config.keyboard && E(this._element).on(x.KEYDOWN, function(t) {
                    return e._keydown(t)
                }), "hover" === this._config.pause && (E(this._element).on(x.MOUSEENTER, function(t) {
                    return e.pause(t)
                }).on(x.MOUSELEAVE, function(t) {
                    return e.cycle(t)
                }), "ontouchstart" in document.documentElement && E(this._element).on(x.TOUCHEND, function() {
                    e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function(t) {
                        return e.cycle(t)
                    }, 500 + e._config.interval)
                }))
            }, t._keydown = function(t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next()
                }
            }, t._getItemIndex = function(t) {
                return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(t)
            }, t._getItemByDirection = function(t, e) {
                var n = t === A,
                    i = t === I,
                    r = this._getItemIndex(e),
                    o = this._items.length - 1;
                if ((i && 0 === r || n && r === o) && !this._config.wrap) return e;
                var s = (r + (t === I ? -1 : 1)) % this._items.length;
                return -1 === s ? this._items[this._items.length - 1] : this._items[s]
            }, t._triggerSlideEvent = function(t, e) {
                var n = this._getItemIndex(t),
                    i = this._getItemIndex(this._element.querySelector(L)),
                    r = E.Event(x.SLIDE, {
                        relatedTarget: t,
                        direction: e,
                        from: i,
                        to: n
                    });
                return E(this._element).trigger(r), r
            }, t._setActiveIndicatorElement = function(t) {
                if (this._indicatorsElement) {
                    var e = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
                    E(e).removeClass(N);
                    var n = this._indicatorsElement.children[this._getItemIndex(t)];
                    n && E(n).addClass(N)
                }
            }, t._slide = function(t, e) {
                var n, i, r, o = this,
                    s = this._element.querySelector(L),
                    a = this._getItemIndex(s),
                    l = e || s && this._getItemByDirection(t, s),
                    c = this._getItemIndex(l),
                    u = Boolean(this._interval);
                if (t === A ? (n = "carousel-item-left", i = "carousel-item-next", r = "left") : (n = "carousel-item-right", i = "carousel-item-prev", r = "right"), l && E(l).hasClass(N)) this._isSliding = !1;
                else if (!this._triggerSlideEvent(l, r).isDefaultPrevented() && s && l) {
                    this._isSliding = !0, u && this.pause(), this._setActiveIndicatorElement(l);
                    var h = E.Event(x.SLID, {
                        relatedTarget: l,
                        direction: r,
                        from: a,
                        to: c
                    });
                    if (E(this._element).hasClass("slide")) {
                        E(l).addClass(i), Ce.reflow(l), E(s).addClass(n), E(l).addClass(n);
                        var d = Ce.getTransitionDurationFromElement(s);
                        E(s).one(Ce.TRANSITION_END, function() {
                            E(l).removeClass(n + " " + i).addClass(N), E(s).removeClass(N + " " + i + " " + n), o._isSliding = !1, setTimeout(function() {
                                return E(o._element).trigger(h)
                            }, 0)
                        }).emulateTransitionEnd(d)
                    } else E(s).removeClass(N), E(l).addClass(N), this._isSliding = !1, E(this._element).trigger(h);
                    u && this.cycle()
                }
            }, o._jQueryInterface = function(i) {
                return this.each(function() {
                    var t = E(this).data(D),
                        e = l({}, M, E(this).data());
                    "object" == typeof i && (e = l({}, e, i));
                    var n = "string" == typeof i ? i : e.slide;
                    if (t || (t = new o(this, e), E(this).data(D, t)), "number" == typeof i) t.to(i);
                    else if ("string" == typeof n) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    } else e.interval && (t.pause(), t.cycle())
                })
            }, o._dataApiClickHandler = function(t) {
                var e = Ce.getSelectorFromElement(this);
                if (e) {
                    var n = E(e)[0];
                    if (n && E(n).hasClass("carousel")) {
                        var i = l({}, E(n).data(), E(this).data()),
                            r = this.getAttribute("data-slide-to");
                        r && (i.interval = !1), o._jQueryInterface.call(E(n), i), r && E(n).data(D).to(r), t.preventDefault()
                    }
                }
            }, s(o, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }, {
                key: "Default",
                get: function() {
                    return M
                }
            }]), o
        }(), E(document).on(x.CLICK_DATA_API, "[data-slide], [data-slide-to]", W._dataApiClickHandler), E(window).on(x.LOAD_DATA_API, function() {
            for (var t = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), e = 0, n = t.length; e < n; e++) {
                var i = E(t[e]);
                W._jQueryInterface.call(i, i.data())
            }
        }), E.fn[T] = W._jQueryInterface, E.fn[T].Constructor = W, E.fn[T].noConflict = function() {
            return E.fn[T] = O, W._jQueryInterface
        }, W),
        Ae = (H = "collapse", j = "." + (R = "bs.collapse"), F = (P = e).fn[H], U = {
            toggle: !0,
            parent: ""
        }, X = {
            toggle: "boolean",
            parent: "(string|element)"
        }, B = {
            SHOW: "show" + j,
            SHOWN: "shown" + j,
            HIDE: "hide" + j,
            HIDDEN: "hidden" + j,
            CLICK_DATA_API: "click" + j + ".data-api"
        }, V = "show", q = "collapse", G = "collapsing", K = "collapsed", "width", "height", ".show, .collapsing", Q = '[data-toggle="collapse"]', z = function() {
            function a(e, t) {
                this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = P.makeArray(document.querySelectorAll('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(Q)), i = 0, r = n.length; i < r; i++) {
                    var o = n[i],
                        s = Ce.getSelectorFromElement(o),
                        a = [].slice.call(document.querySelectorAll(s)).filter(function(t) {
                            return t === e
                        });
                    null !== s && 0 < a.length && (this._selector = s, this._triggerArray.push(o))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            var t = a.prototype;
            return t.toggle = function() {
                P(this._element).hasClass(V) ? this.hide() : this.show()
            }, t.show = function() {
                var t, e, n = this;
                if (!(this._isTransitioning || P(this._element).hasClass(V) || (this._parent && 0 === (t = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function(t) {
                        return t.getAttribute("data-parent") === n._config.parent
                    })).length && (t = null), t && (e = P(t).not(this._selector).data(R)) && e._isTransitioning))) {
                    var i = P.Event(B.SHOW);
                    if (P(this._element).trigger(i), !i.isDefaultPrevented()) {
                        t && (a._jQueryInterface.call(P(t).not(this._selector), "hide"), e || P(t).data(R, null));
                        var r = this._getDimension();
                        P(this._element).removeClass(q).addClass(G), this._element.style[r] = 0, this._triggerArray.length && P(this._triggerArray).removeClass(K).attr("aria-expanded", !0), this.setTransitioning(!0);
                        var o = "scroll" + (r[0].toUpperCase() + r.slice(1)),
                            s = Ce.getTransitionDurationFromElement(this._element);
                        P(this._element).one(Ce.TRANSITION_END, function() {
                            P(n._element).removeClass(G).addClass(q).addClass(V), n._element.style[r] = "", n.setTransitioning(!1), P(n._element).trigger(B.SHOWN)
                        }).emulateTransitionEnd(s), this._element.style[r] = this._element[o] + "px"
                    }
                }
            }, t.hide = function() {
                var t = this;
                if (!this._isTransitioning && P(this._element).hasClass(V)) {
                    var e = P.Event(B.HIDE);
                    if (P(this._element).trigger(e), !e.isDefaultPrevented()) {
                        var n = this._getDimension();
                        this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", Ce.reflow(this._element), P(this._element).addClass(G).removeClass(q).removeClass(V);
                        var i = this._triggerArray.length;
                        if (0 < i)
                            for (var r = 0; r < i; r++) {
                                var o = this._triggerArray[r],
                                    s = Ce.getSelectorFromElement(o);
                                null !== s && (P([].slice.call(document.querySelectorAll(s))).hasClass(V) || P(o).addClass(K).attr("aria-expanded", !1))
                            }
                        this.setTransitioning(!0), this._element.style[n] = "";
                        var a = Ce.getTransitionDurationFromElement(this._element);
                        P(this._element).one(Ce.TRANSITION_END, function() {
                            t.setTransitioning(!1), P(t._element).removeClass(G).addClass(q).trigger(B.HIDDEN)
                        }).emulateTransitionEnd(a)
                    }
                }
            }, t.setTransitioning = function(t) {
                this._isTransitioning = t
            }, t.dispose = function() {
                P.removeData(this._element, R), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, t._getConfig = function(t) {
                return (t = l({}, U, t)).toggle = Boolean(t.toggle), Ce.typeCheckConfig(H, t, X), t
            }, t._getDimension = function() {
                return P(this._element).hasClass("width") ? "width" : "height"
            }, t._getParent = function() {
                var n = this,
                    t = null;
                Ce.isElement(this._config.parent) ? (t = this._config.parent, void 0 !== this._config.parent.jquery && (t = this._config.parent[0])) : t = document.querySelector(this._config.parent);
                var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]',
                    i = [].slice.call(t.querySelectorAll(e));
                return P(i).each(function(t, e) {
                    n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e])
                }), t
            }, t._addAriaAndCollapsedClass = function(t, e) {
                if (t) {
                    var n = P(t).hasClass(V);
                    e.length && P(e).toggleClass(K, !n).attr("aria-expanded", n)
                }
            }, a._getTargetFromElement = function(t) {
                var e = Ce.getSelectorFromElement(t);
                return e ? document.querySelector(e) : null
            }, a._jQueryInterface = function(i) {
                return this.each(function() {
                    var t = P(this),
                        e = t.data(R),
                        n = l({}, U, t.data(), "object" == typeof i && i ? i : {});
                    if (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1), e || (e = new a(this, n), t.data(R, e)), "string" == typeof i) {
                        if (void 0 === e[i]) throw new TypeError('No method named "' + i + '"');
                        e[i]()
                    }
                })
            }, s(a, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }, {
                key: "Default",
                get: function() {
                    return U
                }
            }]), a
        }(), P(document).on(B.CLICK_DATA_API, Q, function(t) {
            "A" === t.currentTarget.tagName && t.preventDefault();
            var n = P(this),
                e = Ce.getSelectorFromElement(this),
                i = [].slice.call(document.querySelectorAll(e));
            P(i).each(function() {
                var t = P(this),
                    e = t.data(R) ? "toggle" : n.data();
                z._jQueryInterface.call(t, e)
            })
        }), P.fn[H] = z._jQueryInterface, P.fn[H].Constructor = z, P.fn[H].noConflict = function() {
            return P.fn[H] = F, z._jQueryInterface
        }, z),
        Ie = ($ = "dropdown", tt = "." + (J = "bs.dropdown"), et = ".data-api", nt = (Z = e).fn[$], it = new RegExp("38|40|27"), rt = {
            HIDE: "hide" + tt,
            HIDDEN: "hidden" + tt,
            SHOW: "show" + tt,
            SHOWN: "shown" + tt,
            CLICK: "click" + tt,
            CLICK_DATA_API: "click" + tt + et,
            KEYDOWN_DATA_API: "keydown" + tt + et,
            KEYUP_DATA_API: "keyup" + tt + et
        }, ot = "disabled", st = "show", "dropup", "dropright", "dropleft", at = "dropdown-menu-right", "position-static", lt = '[data-toggle="dropdown"]', ".dropdown form", ct = ".dropdown-menu", ".navbar-nav", ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", "top-start", "top-end", "bottom-start", "bottom-end", "right-start", "left-start", ut = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic"
        }, ht = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string"
        }, dt = function() {
            function c(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }
            var t = c.prototype;
            return t.toggle = function() {
                if (!this._element.disabled && !Z(this._element).hasClass(ot)) {
                    var t = c._getParentFromElement(this._element),
                        e = Z(this._menu).hasClass(st);
                    if (c._clearMenus(), !e) {
                        var n = {
                                relatedTarget: this._element
                            },
                            i = Z.Event(rt.SHOW, n);
                        if (Z(t).trigger(i), !i.isDefaultPrevented()) {
                            if (!this._inNavbar) {
                                if (void 0 === u) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                                var r = this._element;
                                "parent" === this._config.reference ? r = t : Ce.isElement(this._config.reference) && (r = this._config.reference, void 0 !== this._config.reference.jquery && (r = this._config.reference[0])), "scrollParent" !== this._config.boundary && Z(t).addClass("position-static"), this._popper = new u(r, this._menu, this._getPopperConfig())
                            }
                            "ontouchstart" in document.documentElement && 0 === Z(t).closest(".navbar-nav").length && Z(document.body).children().on("mouseover", null, Z.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), Z(this._menu).toggleClass(st), Z(t).toggleClass(st).trigger(Z.Event(rt.SHOWN, n))
                        }
                    }
                }
            }, t.dispose = function() {
                Z.removeData(this._element, J), Z(this._element).off(tt), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
            }, t.update = function() {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, t._addEventListeners = function() {
                var e = this;
                Z(this._element).on(rt.CLICK, function(t) {
                    t.preventDefault(), t.stopPropagation(), e.toggle()
                })
            }, t._getConfig = function(t) {
                return t = l({}, this.constructor.Default, Z(this._element).data(), t), Ce.typeCheckConfig($, t, this.constructor.DefaultType), t
            }, t._getMenuElement = function() {
                if (!this._menu) {
                    var t = c._getParentFromElement(this._element);
                    t && (this._menu = t.querySelector(ct))
                }
                return this._menu
            }, t._getPlacement = function() {
                var t = Z(this._element.parentNode),
                    e = "bottom-start";
                return t.hasClass("dropup") ? (e = "top-start", Z(this._menu).hasClass(at) && (e = "top-end")) : t.hasClass("dropright") ? e = "right-start" : t.hasClass("dropleft") ? e = "left-start" : Z(this._menu).hasClass(at) && (e = "bottom-end"), e
            }, t._detectNavbar = function() {
                return 0 < Z(this._element).closest(".navbar").length
            }, t._getPopperConfig = function() {
                var e = this,
                    t = {};
                "function" == typeof this._config.offset ? t.fn = function(t) {
                    return t.offsets = l({}, t.offsets, e._config.offset(t.offsets) || {}), t
                } : t.offset = this._config.offset;
                var n = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: t,
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (n.modifiers.applyStyle = {
                    enabled: !1
                }), n
            }, c._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = Z(this).data(J);
                    if (t || (t = new c(this, "object" == typeof e ? e : null), Z(this).data(J, t)), "string" == typeof e) {
                        if (void 0 === t[e]) throw new TypeError('No method named "' + e + '"');
                        t[e]()
                    }
                })
            }, c._clearMenus = function(t) {
                if (!t || 3 !== t.which && ("keyup" !== t.type || 9 === t.which))
                    for (var e = [].slice.call(document.querySelectorAll(lt)), n = 0, i = e.length; n < i; n++) {
                        var r = c._getParentFromElement(e[n]),
                            o = Z(e[n]).data(J),
                            s = {
                                relatedTarget: e[n]
                            };
                        if (t && "click" === t.type && (s.clickEvent = t), o) {
                            var a = o._menu;
                            if (Z(r).hasClass(st) && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && 9 === t.which) && Z.contains(r, t.target))) {
                                var l = Z.Event(rt.HIDE, s);
                                Z(r).trigger(l), l.isDefaultPrevented() || ("ontouchstart" in document.documentElement && Z(document.body).children().off("mouseover", null, Z.noop), e[n].setAttribute("aria-expanded", "false"), Z(a).removeClass(st), Z(r).removeClass(st).trigger(Z.Event(rt.HIDDEN, s)))
                            }
                        }
                    }
            }, c._getParentFromElement = function(t) {
                var e, n = Ce.getSelectorFromElement(t);
                return n && (e = document.querySelector(n)), e || t.parentNode
            }, c._dataApiKeydownHandler = function(t) {
                if ((/input|textarea/i.test(t.target.tagName) ? !(32 === t.which || 27 !== t.which && (40 !== t.which && 38 !== t.which || Z(t.target).closest(ct).length)) : it.test(t.which)) && (t.preventDefault(), t.stopPropagation(), !this.disabled && !Z(this).hasClass(ot))) {
                    var e = c._getParentFromElement(this),
                        n = Z(e).hasClass(st);
                    if ((n || 27 === t.which && 32 === t.which) && (!n || 27 !== t.which && 32 !== t.which)) {
                        var i = [].slice.call(e.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"));
                        if (0 !== i.length) {
                            var r = i.indexOf(t.target);
                            38 === t.which && 0 < r && r--, 40 === t.which && r < i.length - 1 && r++, r < 0 && (r = 0), i[r].focus()
                        }
                    } else {
                        if (27 === t.which) {
                            var o = e.querySelector(lt);
                            Z(o).trigger("focus")
                        }
                        Z(this).trigger("click")
                    }
                }
            }, s(c, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }, {
                key: "Default",
                get: function() {
                    return ut
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return ht
                }
            }]), c
        }(), Z(document).on(rt.KEYDOWN_DATA_API, lt, dt._dataApiKeydownHandler).on(rt.KEYDOWN_DATA_API, ct, dt._dataApiKeydownHandler).on(rt.CLICK_DATA_API + " " + rt.KEYUP_DATA_API, dt._clearMenus).on(rt.CLICK_DATA_API, lt, function(t) {
            t.preventDefault(), t.stopPropagation(), dt._jQueryInterface.call(Z(this), "toggle")
        }).on(rt.CLICK_DATA_API, ".dropdown form", function(t) {
            t.stopPropagation()
        }), Z.fn[$] = dt._jQueryInterface, Z.fn[$].Constructor = dt, Z.fn[$].noConflict = function() {
            return Z.fn[$] = nt, dt._jQueryInterface
        }, dt),
        xe = (pt = "modal", gt = "." + (mt = "bs.modal"), _t = (ft = e).fn[pt], vt = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        }, yt = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        }, bt = {
            HIDE: "hide" + gt,
            HIDDEN: "hidden" + gt,
            SHOW: "show" + gt,
            SHOWN: "shown" + gt,
            FOCUSIN: "focusin" + gt,
            RESIZE: "resize" + gt,
            CLICK_DISMISS: "click.dismiss" + gt,
            KEYDOWN_DISMISS: "keydown.dismiss" + gt,
            MOUSEUP_DISMISS: "mouseup.dismiss" + gt,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + gt,
            CLICK_DATA_API: "click" + gt + ".data-api"
        }, "modal-scrollbar-measure", "modal-backdrop", wt = "modal-open", St = "fade", Et = "show", ".modal-dialog", '[data-toggle="modal"]', '[data-dismiss="modal"]', Tt = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Dt = ".sticky-top", kt = function() {
            function r(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(".modal-dialog"), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._scrollbarWidth = 0
            }
            var t = r.prototype;
            return t.toggle = function(t) {
                return this._isShown ? this.hide() : this.show(t)
            }, t.show = function(t) {
                var e = this;
                if (!this._isTransitioning && !this._isShown) {
                    ft(this._element).hasClass(St) && (this._isTransitioning = !0);
                    var n = ft.Event(bt.SHOW, {
                        relatedTarget: t
                    });
                    ft(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), ft(document.body).addClass(wt), this._setEscapeEvent(), this._setResizeEvent(), ft(this._element).on(bt.CLICK_DISMISS, '[data-dismiss="modal"]', function(t) {
                        return e.hide(t)
                    }), ft(this._dialog).on(bt.MOUSEDOWN_DISMISS, function() {
                        ft(e._element).one(bt.MOUSEUP_DISMISS, function(t) {
                            ft(t.target).is(e._element) && (e._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function() {
                        return e._showElement(t)
                    }))
                }
            }, t.hide = function(t) {
                var e = this;
                if (t && t.preventDefault(), !this._isTransitioning && this._isShown) {
                    var n = ft.Event(bt.HIDE);
                    if (ft(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
                        this._isShown = !1;
                        var i = ft(this._element).hasClass(St);
                        if (i && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), ft(document).off(bt.FOCUSIN), ft(this._element).removeClass(Et), ft(this._element).off(bt.CLICK_DISMISS), ft(this._dialog).off(bt.MOUSEDOWN_DISMISS), i) {
                            var r = Ce.getTransitionDurationFromElement(this._element);
                            ft(this._element).one(Ce.TRANSITION_END, function(t) {
                                return e._hideModal(t)
                            }).emulateTransitionEnd(r)
                        } else this._hideModal()
                    }
                }
            }, t.dispose = function() {
                ft.removeData(this._element, mt), ft(window, document, this._element, this._backdrop).off(gt), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
            }, t.handleUpdate = function() {
                this._adjustDialog()
            }, t._getConfig = function(t) {
                return t = l({}, vt, t), Ce.typeCheckConfig(pt, t, yt), t
            }, t._showElement = function(t) {
                var e = this,
                    n = ft(this._element).hasClass(St);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, n && Ce.reflow(this._element), ft(this._element).addClass(Et), this._config.focus && this._enforceFocus();
                var i = ft.Event(bt.SHOWN, {
                        relatedTarget: t
                    }),
                    r = function() {
                        e._config.focus && e._element.focus(), e._isTransitioning = !1, ft(e._element).trigger(i)
                    };
                if (n) {
                    var o = Ce.getTransitionDurationFromElement(this._element);
                    ft(this._dialog).one(Ce.TRANSITION_END, r).emulateTransitionEnd(o)
                } else r()
            }, t._enforceFocus = function() {
                var e = this;
                ft(document).off(bt.FOCUSIN).on(bt.FOCUSIN, function(t) {
                    document !== t.target && e._element !== t.target && 0 === ft(e._element).has(t.target).length && e._element.focus()
                })
            }, t._setEscapeEvent = function() {
                var e = this;
                this._isShown && this._config.keyboard ? ft(this._element).on(bt.KEYDOWN_DISMISS, function(t) {
                    27 === t.which && (t.preventDefault(), e.hide())
                }) : this._isShown || ft(this._element).off(bt.KEYDOWN_DISMISS)
            }, t._setResizeEvent = function() {
                var e = this;
                this._isShown ? ft(window).on(bt.RESIZE, function(t) {
                    return e.handleUpdate(t)
                }) : ft(window).off(bt.RESIZE)
            }, t._hideModal = function() {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function() {
                    ft(document.body).removeClass(wt), t._resetAdjustments(), t._resetScrollbar(), ft(t._element).trigger(bt.HIDDEN)
                })
            }, t._removeBackdrop = function() {
                this._backdrop && (ft(this._backdrop).remove(), this._backdrop = null)
            }, t._showBackdrop = function(t) {
                var e = this,
                    n = ft(this._element).hasClass(St) ? St : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", n && this._backdrop.classList.add(n), ft(this._backdrop).appendTo(document.body), ft(this._element).on(bt.CLICK_DISMISS, function(t) {
                            e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide())
                        }), n && Ce.reflow(this._backdrop), ft(this._backdrop).addClass(Et), !t) return;
                    if (!n) return void t();
                    var i = Ce.getTransitionDurationFromElement(this._backdrop);
                    ft(this._backdrop).one(Ce.TRANSITION_END, t).emulateTransitionEnd(i)
                } else if (!this._isShown && this._backdrop) {
                    ft(this._backdrop).removeClass(Et);
                    var r = function() {
                        e._removeBackdrop(), t && t()
                    };
                    if (ft(this._element).hasClass(St)) {
                        var o = Ce.getTransitionDurationFromElement(this._backdrop);
                        ft(this._backdrop).one(Ce.TRANSITION_END, r).emulateTransitionEnd(o)
                    } else r()
                } else t && t()
            }, t._adjustDialog = function() {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, t._resetAdjustments = function() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, t._checkScrollbar = function() {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, t._setScrollbar = function() {
                var r = this;
                if (this._isBodyOverflowing) {
                    var t = [].slice.call(document.querySelectorAll(Tt)),
                        e = [].slice.call(document.querySelectorAll(Dt));
                    ft(t).each(function(t, e) {
                        var n = e.style.paddingRight,
                            i = ft(e).css("padding-right");
                        ft(e).data("padding-right", n).css("padding-right", parseFloat(i) + r._scrollbarWidth + "px")
                    }), ft(e).each(function(t, e) {
                        var n = e.style.marginRight,
                            i = ft(e).css("margin-right");
                        ft(e).data("margin-right", n).css("margin-right", parseFloat(i) - r._scrollbarWidth + "px")
                    });
                    var n = document.body.style.paddingRight,
                        i = ft(document.body).css("padding-right");
                    ft(document.body).data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
                }
            }, t._resetScrollbar = function() {
                var t = [].slice.call(document.querySelectorAll(Tt));
                ft(t).each(function(t, e) {
                    var n = ft(e).data("padding-right");
                    ft(e).removeData("padding-right"), e.style.paddingRight = n || ""
                });
                var e = [].slice.call(document.querySelectorAll("" + Dt));
                ft(e).each(function(t, e) {
                    var n = ft(e).data("margin-right");
                    void 0 !== n && ft(e).css("margin-right", n).removeData("margin-right")
                });
                var n = ft(document.body).data("padding-right");
                ft(document.body).removeData("padding-right"), document.body.style.paddingRight = n || ""
            }, t._getScrollbarWidth = function() {
                var t = document.createElement("div");
                t.className = "modal-scrollbar-measure", document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, r._jQueryInterface = function(n, i) {
                return this.each(function() {
                    var t = ft(this).data(mt),
                        e = l({}, vt, ft(this).data(), "object" == typeof n && n ? n : {});
                    if (t || (t = new r(this, e), ft(this).data(mt, t)), "string" == typeof n) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n](i)
                    } else e.show && t.show(i)
                })
            }, s(r, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }, {
                key: "Default",
                get: function() {
                    return vt
                }
            }]), r
        }(), ft(document).on(bt.CLICK_DATA_API, '[data-toggle="modal"]', function(t) {
            var e, n = this,
                i = Ce.getSelectorFromElement(this);
            i && (e = document.querySelector(i));
            var r = ft(e).data(mt) ? "toggle" : l({}, ft(e).data(), ft(this).data());
            "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
            var o = ft(e).one(bt.SHOW, function(t) {
                t.isDefaultPrevented() || o.one(bt.HIDDEN, function() {
                    ft(n).is(":visible") && n.focus()
                })
            });
            kt._jQueryInterface.call(ft(e), r, this)
        }), ft.fn[pt] = kt._jQueryInterface, ft.fn[pt].Constructor = kt, ft.fn[pt].noConflict = function() {
            return ft.fn[pt] = _t, kt._jQueryInterface
        }, kt),
        Ne = (Ot = "tooltip", Yt = "." + (Mt = "bs.tooltip"), At = (Ct = e).fn[Ot], It = "bs-tooltip", xt = new RegExp("(^|\\s)" + It + "\\S+", "g"), Wt = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: (Lt = {
                AUTO: "auto",
                TOP: "top",
                RIGHT: "right",
                BOTTOM: "bottom",
                LEFT: "left"
            }, !1),
            selector: (Nt = {
                animation: "boolean",
                template: "string",
                title: "(string|element|function)",
                trigger: "string",
                delay: "(number|object)",
                html: "boolean",
                selector: "(string|boolean)",
                placement: "(string|function)",
                offset: "(number|string)",
                container: "(string|element|boolean)",
                fallbackPlacement: "(string|array)",
                boundary: "(string|element)"
            }, !1),
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent"
        }, "out", Ht = {
            HIDE: "hide" + Yt,
            HIDDEN: "hidden" + Yt,
            SHOW: (Pt = "show") + Yt,
            SHOWN: "shown" + Yt,
            INSERTED: "inserted" + Yt,
            CLICK: "click" + Yt,
            FOCUSIN: "focusin" + Yt,
            FOCUSOUT: "focusout" + Yt,
            MOUSEENTER: "mouseenter" + Yt,
            MOUSELEAVE: "mouseleave" + Yt
        }, Rt = "fade", jt = "show", ".tooltip-inner", ".arrow", Ft = "hover", Ut = "focus", "click", "manual", Xt = function() {
            function i(t, e) {
                if (void 0 === u) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
            }
            var t = i.prototype;
            return t.enable = function() {
                this._isEnabled = !0
            }, t.disable = function() {
                this._isEnabled = !1
            }, t.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled
            }, t.toggle = function(t) {
                if (this._isEnabled)
                    if (t) {
                        var e = this.constructor.DATA_KEY,
                            n = Ct(t.currentTarget).data(e);
                        n || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), Ct(t.currentTarget).data(e, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                    } else {
                        if (Ct(this.getTipElement()).hasClass(jt)) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, t.dispose = function() {
                clearTimeout(this._timeout), Ct.removeData(this.element, this.constructor.DATA_KEY), Ct(this.element).off(this.constructor.EVENT_KEY), Ct(this.element).closest(".modal").off("hide.bs.modal"), this.tip && Ct(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, t.show = function() {
                var e = this;
                if ("none" === Ct(this.element).css("display")) throw new Error("Please use show on visible elements");
                var t = Ct.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    Ct(this.element).trigger(t);
                    var n = Ct.contains(this.element.ownerDocument.documentElement, this.element);
                    if (t.isDefaultPrevented() || !n) return;
                    var i = this.getTipElement(),
                        r = Ce.getUID(this.constructor.NAME);
                    i.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && Ct(i).addClass(Rt);
                    var o = "function" == typeof this.config.placement ? this.config.placement.call(this, i, this.element) : this.config.placement,
                        s = this._getAttachment(o);
                    this.addAttachmentClass(s);
                    var a = !1 === this.config.container ? document.body : Ct(document).find(this.config.container);
                    Ct(i).data(this.constructor.DATA_KEY, this), Ct.contains(this.element.ownerDocument.documentElement, this.tip) || Ct(i).appendTo(a), Ct(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new u(this.element, i, {
                        placement: s,
                        modifiers: {
                            offset: {
                                offset: this.config.offset
                            },
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: ".arrow"
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function(t) {
                            t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                        },
                        onUpdate: function(t) {
                            e._handlePopperPlacementChange(t)
                        }
                    }), Ct(i).addClass(jt), "ontouchstart" in document.documentElement && Ct(document.body).children().on("mouseover", null, Ct.noop);
                    var l = function() {
                        e.config.animation && e._fixTransition();
                        var t = e._hoverState;
                        e._hoverState = null, Ct(e.element).trigger(e.constructor.Event.SHOWN), "out" === t && e._leave(null, e)
                    };
                    if (Ct(this.tip).hasClass(Rt)) {
                        var c = Ce.getTransitionDurationFromElement(this.tip);
                        Ct(this.tip).one(Ce.TRANSITION_END, l).emulateTransitionEnd(c)
                    } else l()
                }
            }, t.hide = function(t) {
                var e = this,
                    n = this.getTipElement(),
                    i = Ct.Event(this.constructor.Event.HIDE),
                    r = function() {
                        e._hoverState !== Pt && n.parentNode && n.parentNode.removeChild(n), e._cleanTipClass(), e.element.removeAttribute("aria-describedby"), Ct(e.element).trigger(e.constructor.Event.HIDDEN), null !== e._popper && e._popper.destroy(), t && t()
                    };
                if (Ct(this.element).trigger(i), !i.isDefaultPrevented()) {
                    if (Ct(n).removeClass(jt), "ontouchstart" in document.documentElement && Ct(document.body).children().off("mouseover", null, Ct.noop), this._activeTrigger.click = !1, this._activeTrigger[Ut] = !1, this._activeTrigger[Ft] = !1, Ct(this.tip).hasClass(Rt)) {
                        var o = Ce.getTransitionDurationFromElement(n);
                        Ct(n).one(Ce.TRANSITION_END, r).emulateTransitionEnd(o)
                    } else r();
                    this._hoverState = ""
                }
            }, t.update = function() {
                null !== this._popper && this._popper.scheduleUpdate()
            }, t.isWithContent = function() {
                return Boolean(this.getTitle())
            }, t.addAttachmentClass = function(t) {
                Ct(this.getTipElement()).addClass(It + "-" + t)
            }, t.getTipElement = function() {
                return this.tip = this.tip || Ct(this.config.template)[0], this.tip
            }, t.setContent = function() {
                var t = this.getTipElement();
                this.setElementContent(Ct(t.querySelectorAll(".tooltip-inner")), this.getTitle()), Ct(t).removeClass(Rt + " " + jt)
            }, t.setElementContent = function(t, e) {
                var n = this.config.html;
                "object" == typeof e && (e.nodeType || e.jquery) ? n ? Ct(e).parent().is(t) || t.empty().append(e) : t.text(Ct(e).text()) : t[n ? "html" : "text"](e)
            }, t.getTitle = function() {
                var t = this.element.getAttribute("data-original-title");
                return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
            }, t._getAttachment = function(t) {
                return Lt[t.toUpperCase()]
            }, t._setListeners = function() {
                var i = this;
                this.config.trigger.split(" ").forEach(function(t) {
                    if ("click" === t) Ct(i.element).on(i.constructor.Event.CLICK, i.config.selector, function(t) {
                        return i.toggle(t)
                    });
                    else if ("manual" !== t) {
                        var e = t === Ft ? i.constructor.Event.MOUSEENTER : i.constructor.Event.FOCUSIN,
                            n = t === Ft ? i.constructor.Event.MOUSELEAVE : i.constructor.Event.FOCUSOUT;
                        Ct(i.element).on(e, i.config.selector, function(t) {
                            return i._enter(t)
                        }).on(n, i.config.selector, function(t) {
                            return i._leave(t)
                        })
                    }
                    Ct(i.element).closest(".modal").on("hide.bs.modal", function() {
                        return i.hide()
                    })
                }), this.config.selector ? this.config = l({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, t._fixTitle = function() {
                var t = typeof this.element.getAttribute("data-original-title");
                (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, t._enter = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || Ct(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), Ct(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusin" === t.type ? Ut : Ft] = !0), Ct(e.getTipElement()).hasClass(jt) || e._hoverState === Pt ? e._hoverState = Pt : (clearTimeout(e._timeout), e._hoverState = Pt, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function() {
                    e._hoverState === Pt && e.show()
                }, e.config.delay.show) : e.show())
            }, t._leave = function(t, e) {
                var n = this.constructor.DATA_KEY;
                (e = e || Ct(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), Ct(t.currentTarget).data(n, e)), t && (e._activeTrigger["focusout" === t.type ? Ut : Ft] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = "out", e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function() {
                    "out" === e._hoverState && e.hide()
                }, e.config.delay.hide) : e.hide())
            }, t._isWithActiveTrigger = function() {
                for (var t in this._activeTrigger)
                    if (this._activeTrigger[t]) return !0;
                return !1
            }, t._getConfig = function(t) {
                return "number" == typeof(t = l({}, this.constructor.Default, Ct(this.element).data(), "object" == typeof t && t ? t : {})).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), Ce.typeCheckConfig(Ot, t, this.constructor.DefaultType), t
            }, t._getDelegateConfig = function() {
                var t = {};
                if (this.config)
                    for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, t._cleanTipClass = function() {
                var t = Ct(this.getTipElement()),
                    e = t.attr("class").match(xt);
                null !== e && e.length && t.removeClass(e.join(""))
            }, t._handlePopperPlacementChange = function(t) {
                var e = t.instance;
                this.tip = e.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, t._fixTransition = function() {
                var t = this.getTipElement(),
                    e = this.config.animation;
                null === t.getAttribute("x-placement") && (Ct(t).removeClass(Rt), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = Ct(this).data(Mt),
                        e = "object" == typeof n && n;
                    if ((t || !/dispose|hide/.test(n)) && (t || (t = new i(this, e), Ct(this).data(Mt, t)), "string" == typeof n)) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }, {
                key: "Default",
                get: function() {
                    return Wt
                }
            }, {
                key: "NAME",
                get: function() {
                    return Ot
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return Mt
                }
            }, {
                key: "Event",
                get: function() {
                    return Ht
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return Yt
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return Nt
                }
            }]), i
        }(), Ct.fn[Ot] = Xt._jQueryInterface, Ct.fn[Ot].Constructor = Xt, Ct.fn[Ot].noConflict = function() {
            return Ct.fn[Ot] = At, Xt._jQueryInterface
        }, Xt),
        Le = (Vt = "popover", Gt = "." + (qt = "bs.popover"), Kt = (Bt = e).fn[Vt], Qt = "bs-popover", zt = new RegExp("(^|\\s)" + Qt + "\\S+", "g"), Zt = l({}, Ne.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }), $t = l({}, Ne.DefaultType, {
            content: "(string|element|function)"
        }), "fade", ".popover-header", ".popover-body", Jt = {
            HIDE: "hide" + Gt,
            HIDDEN: "hidden" + Gt,
            SHOW: "show" + Gt,
            SHOWN: "shown" + Gt,
            INSERTED: "inserted" + Gt,
            CLICK: "click" + Gt,
            FOCUSIN: "focusin" + Gt,
            FOCUSOUT: "focusout" + Gt,
            MOUSEENTER: "mouseenter" + Gt,
            MOUSELEAVE: "mouseleave" + Gt
        }, te = function(t) {
            var e, n;

            function i() {
                return t.apply(this, arguments) || this
            }
            n = t, (e = i).prototype = Object.create(n.prototype), (e.prototype.constructor = e).__proto__ = n;
            var r = i.prototype;
            return r.isWithContent = function() {
                return this.getTitle() || this._getContent()
            }, r.addAttachmentClass = function(t) {
                Bt(this.getTipElement()).addClass(Qt + "-" + t)
            }, r.getTipElement = function() {
                return this.tip = this.tip || Bt(this.config.template)[0], this.tip
            }, r.setContent = function() {
                var t = Bt(this.getTipElement());
                this.setElementContent(t.find(".popover-header"), this.getTitle());
                var e = this._getContent();
                "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(".popover-body"), e), t.removeClass("fade show")
            }, r._getContent = function() {
                return this.element.getAttribute("data-content") || this.config.content
            }, r._cleanTipClass = function() {
                var t = Bt(this.getTipElement()),
                    e = t.attr("class").match(zt);
                null !== e && 0 < e.length && t.removeClass(e.join(""))
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = Bt(this).data(qt),
                        e = "object" == typeof n ? n : null;
                    if ((t || !/destroy|hide/.test(n)) && (t || (t = new i(this, e), Bt(this).data(qt, t)), "string" == typeof n)) {
                        if (void 0 === t[n]) throw new TypeError('No method named "' + n + '"');
                        t[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }, {
                key: "Default",
                get: function() {
                    return Zt
                }
            }, {
                key: "NAME",
                get: function() {
                    return Vt
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return qt
                }
            }, {
                key: "Event",
                get: function() {
                    return Jt
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return Gt
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return $t
                }
            }]), i
        }(Ne), Bt.fn[Vt] = te._jQueryInterface, Bt.fn[Vt].Constructor = te, Bt.fn[Vt].noConflict = function() {
            return Bt.fn[Vt] = Kt, te._jQueryInterface
        }, te),
        We = (ne = "scrollspy", re = "." + (ie = "bs.scrollspy"), oe = (ee = e).fn[ne], se = {
            offset: 10,
            method: "auto",
            target: ""
        }, ae = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        }, le = {
            ACTIVATE: "activate" + re,
            SCROLL: "scroll" + re,
            LOAD_DATA_API: "load" + re + ".data-api"
        }, "dropdown-item", ce = "active", '[data-spy="scroll"]', ".active", ue = ".nav, .list-group", he = ".nav-link", ".nav-item", de = ".list-group-item", ".dropdown", ".dropdown-item", ".dropdown-toggle", "offset", fe = "position", pe = function() {
            function n(t, e) {
                var n = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + he + "," + this._config.target + " " + de + "," + this._config.target + " .dropdown-item", this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, ee(this._scrollElement).on(le.SCROLL, function(t) {
                    return n._process(t)
                }), this.refresh(), this._process()
            }
            var t = n.prototype;
            return t.refresh = function() {
                var e = this,
                    t = this._scrollElement === this._scrollElement.window ? "offset" : fe,
                    r = "auto" === this._config.method ? t : this._config.method,
                    o = r === fe ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map(function(t) {
                    var e, n = Ce.getSelectorFromElement(t);
                    if (n && (e = document.querySelector(n)), e) {
                        var i = e.getBoundingClientRect();
                        if (i.width || i.height) return [ee(e)[r]().top + o, n]
                    }
                    return null
                }).filter(function(t) {
                    return t
                }).sort(function(t, e) {
                    return t[0] - e[0]
                }).forEach(function(t) {
                    e._offsets.push(t[0]), e._targets.push(t[1])
                })
            }, t.dispose = function() {
                ee.removeData(this._element, ie), ee(this._scrollElement).off(re), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, t._getConfig = function(t) {
                if ("string" != typeof(t = l({}, se, "object" == typeof t && t ? t : {})).target) {
                    var e = ee(t.target).attr("id");
                    e || (e = Ce.getUID(ne), ee(t.target).attr("id", e)), t.target = "#" + e
                }
                return Ce.typeCheckConfig(ne, t, ae), t
            }, t._getScrollTop = function() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, t._getScrollHeight = function() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, t._getOffsetHeight = function() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, t._process = function() {
                var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), n <= t) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                    for (var r = this._offsets.length; r--;) this._activeTarget !== this._targets[r] && t >= this._offsets[r] && (void 0 === this._offsets[r + 1] || t < this._offsets[r + 1]) && this._activate(this._targets[r])
                }
            }, t._activate = function(e) {
                this._activeTarget = e, this._clear();
                var t = this._selector.split(",");
                t = t.map(function(t) {
                    return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                });
                var n = ee([].slice.call(document.querySelectorAll(t.join(","))));
                n.hasClass("dropdown-item") ? (n.closest(".dropdown").find(".dropdown-toggle").addClass(ce), n.addClass(ce)) : (n.addClass(ce), n.parents(ue).prev(he + ", " + de).addClass(ce), n.parents(ue).prev(".nav-item").children(he).addClass(ce)), ee(this._scrollElement).trigger(le.ACTIVATE, {
                    relatedTarget: e
                })
            }, t._clear = function() {
                var t = [].slice.call(document.querySelectorAll(this._selector));
                ee(t).filter(".active").removeClass(ce)
            }, n._jQueryInterface = function(e) {
                return this.each(function() {
                    var t = ee(this).data(ie);
                    if (t || (t = new n(this, "object" == typeof e && e), ee(this).data(ie, t)), "string" == typeof e) {
                        if (void 0 === t[e]) throw new TypeError('No method named "' + e + '"');
                        t[e]()
                    }
                })
            }, s(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }, {
                key: "Default",
                get: function() {
                    return se
                }
            }]), n
        }(), ee(window).on(le.LOAD_DATA_API, function() {
            for (var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), e = t.length; e--;) {
                var n = ee(t[e]);
                pe._jQueryInterface.call(n, n.data())
            }
        }), ee.fn[ne] = pe._jQueryInterface, ee.fn[ne].Constructor = pe, ee.fn[ne].noConflict = function() {
            return ee.fn[ne] = oe, pe._jQueryInterface
        }, pe),
        Pe = (_e = "." + (ge = "bs.tab"), ve = (me = e).fn.tab, ye = {
            HIDE: "hide" + _e,
            HIDDEN: "hidden" + _e,
            SHOW: "show" + _e,
            SHOWN: "shown" + _e,
            CLICK_DATA_API: "click" + _e + ".data-api"
        }, "dropdown-menu", be = "active", "disabled", "fade", "show", ".dropdown", ".nav, .list-group", we = ".active", Se = "> li > .active", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', ".dropdown-toggle", "> .dropdown-menu .active", Ee = function() {
            function i(t) {
                this._element = t
            }
            var t = i.prototype;
            return t.show = function() {
                var n = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && me(this._element).hasClass(be) || me(this._element).hasClass("disabled"))) {
                    var t, i, e = me(this._element).closest(".nav, .list-group")[0],
                        r = Ce.getSelectorFromElement(this._element);
                    if (e) {
                        var o = "UL" === e.nodeName ? Se : we;
                        i = (i = me.makeArray(me(e).find(o)))[i.length - 1]
                    }
                    var s = me.Event(ye.HIDE, {
                            relatedTarget: this._element
                        }),
                        a = me.Event(ye.SHOW, {
                            relatedTarget: i
                        });
                    if (i && me(i).trigger(s), me(this._element).trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                        r && (t = document.querySelector(r)), this._activate(this._element, e);
                        var l = function() {
                            var t = me.Event(ye.HIDDEN, {
                                    relatedTarget: n._element
                                }),
                                e = me.Event(ye.SHOWN, {
                                    relatedTarget: i
                                });
                            me(i).trigger(t), me(n._element).trigger(e)
                        };
                        t ? this._activate(t, t.parentNode, l) : l()
                    }
                }
            }, t.dispose = function() {
                me.removeData(this._element, ge), this._element = null
            }, t._activate = function(t, e, n) {
                var i = this,
                    r = ("UL" === e.nodeName ? me(e).find(Se) : me(e).children(we))[0],
                    o = n && r && me(r).hasClass("fade"),
                    s = function() {
                        return i._transitionComplete(t, r, n)
                    };
                if (r && o) {
                    var a = Ce.getTransitionDurationFromElement(r);
                    me(r).one(Ce.TRANSITION_END, s).emulateTransitionEnd(a)
                } else s()
            }, t._transitionComplete = function(t, e, n) {
                if (e) {
                    me(e).removeClass("show " + be);
                    var i = me(e.parentNode).find("> .dropdown-menu .active")[0];
                    i && me(i).removeClass(be), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
                }
                if (me(t).addClass(be), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), Ce.reflow(t), me(t).addClass("show"), t.parentNode && me(t.parentNode).hasClass("dropdown-menu")) {
                    var r = me(t).closest(".dropdown")[0];
                    if (r) {
                        var o = [].slice.call(r.querySelectorAll(".dropdown-toggle"));
                        me(o).addClass(be)
                    }
                    t.setAttribute("aria-expanded", !0)
                }
                n && n()
            }, i._jQueryInterface = function(n) {
                return this.each(function() {
                    var t = me(this),
                        e = t.data(ge);
                    if (e || (e = new i(this), t.data(ge, e)), "string" == typeof n) {
                        if (void 0 === e[n]) throw new TypeError('No method named "' + n + '"');
                        e[n]()
                    }
                })
            }, s(i, null, [{
                key: "VERSION",
                get: function() {
                    return "4.1.3"
                }
            }]), i
        }(), me(document).on(ye.CLICK_DATA_API, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function(t) {
            t.preventDefault(), Ee._jQueryInterface.call(me(this), "show")
        }), me.fn.tab = Ee._jQueryInterface, me.fn.tab.Constructor = Ee, me.fn.tab.noConflict = function() {
            return me.fn.tab = ve, Ee._jQueryInterface
        }, Ee);
    ! function(t) {
        if (void 0 === t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var e = t.fn.jquery.split(" ")[0].split(".");
        if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || 4 <= e[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
    }(e), t.Util = Ce, t.Alert = Oe, t.Button = Me, t.Carousel = Ye, t.Collapse = Ae, t.Dropdown = Ie, t.Modal = xe, t.Popover = Le, t.Scrollspy = We, t.Tab = Pe, t.Tooltip = Ne, Object.defineProperty(t, "__esModule", {
        value: !0
    })
}),
function(t) {
    var e = !1;
    if ("function" == typeof define && define.amd && (define(t), e = !0), "object" == typeof exports && (module.exports = t(), e = !0), !e) {
        var n = window.Cookies,
            i = window.Cookies = t();
        i.noConflict = function() {
            return window.Cookies = n, i
        }
    }
}(function() {
    function m() {
        for (var t = 0, e = {}; t < arguments.length; t++) {
            var n = arguments[t];
            for (var i in n) e[i] = n[i]
        }
        return e
    }
    return function t(f) {
        function p(t, e, n) {
            var i;
            if ("undefined" != typeof document) {
                if (1 < arguments.length) {
                    if ("number" == typeof(n = m({
                            path: "/"
                        }, p.defaults, n)).expires) {
                        var r = new Date;
                        r.setMilliseconds(r.getMilliseconds() + 864e5 * n.expires), n.expires = r
                    }
                    n.expires = n.expires ? n.expires.toUTCString() : "";
                    try {
                        i = JSON.stringify(e), /^[\{\[]/.test(i) && (e = i)
                    } catch (t) {}
                    e = f.write ? f.write(e, t) : encodeURIComponent(String(e)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), t = (t = (t = encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                    var o = "";
                    for (var s in n) n[s] && (o += "; " + s, !0 !== n[s] && (o += "=" + n[s]));
                    return document.cookie = t + "=" + e + o
                }
                t || (i = {});
                for (var a = document.cookie ? document.cookie.split("; ") : [], l = /(%[0-9A-Z]{2})+/g, c = 0; c < a.length; c++) {
                    var u = a[c].split("="),
                        h = u.slice(1).join("=");
                    this.json || '"' !== h.charAt(0) || (h = h.slice(1, -1));
                    try {
                        var d = u[0].replace(l, decodeURIComponent);
                        if (h = f.read ? f.read(h, d) : f(h, d) || h.replace(l, decodeURIComponent), this.json) try {
                            h = JSON.parse(h)
                        } catch (t) {}
                        if (t === d) {
                            i = h;
                            break
                        }
                        t || (i[d] = h)
                    } catch (t) {}
                }
                return i
            }
        }
        return (p.set = p).get = function(t) {
            return p.call(p, t)
        }, p.getJSON = function() {
            return p.apply({
                json: !0
            }, [].slice.call(arguments))
        }, p.defaults = {}, p.remove = function(t, e) {
            p(t, "", m(e, {
                expires: -1
            }))
        }, p.withConverter = t, p
    }(function() {})
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.moment = e()
}(this, function() {
    "use strict";
    var t, r;

    function v() {
        return t.apply(null, arguments)
    }

    function a(t) {
        return t instanceof Array || "[object Array]" === Object.prototype.toString.call(t)
    }

    function l(t) {
        return null != t && "[object Object]" === Object.prototype.toString.call(t)
    }

    function c(t) {
        return void 0 === t
    }

    function u(t) {
        return "number" == typeof t || "[object Number]" === Object.prototype.toString.call(t)
    }

    function h(t) {
        return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t)
    }

    function d(t, e) {
        var n, i = [];
        for (n = 0; n < t.length; ++n) i.push(e(t[n], n));
        return i
    }

    function y(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }

    function f(t, e) {
        for (var n in e) y(e, n) && (t[n] = e[n]);
        return y(e, "toString") && (t.toString = e.toString), y(e, "valueOf") && (t.valueOf = e.valueOf), t
    }

    function p(t, e, n, i) {
        return Te(t, e, n, i, !0).utc()
    }

    function b(t) {
        return null == t._pf && (t._pf = {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1,
            parsedDateParts: [],
            meridiem: null,
            rfc2822: !1,
            weekdayMismatch: !1
        }), t._pf
    }

    function m(t) {
        if (null == t._isValid) {
            var e = b(t),
                n = r.call(e.parsedDateParts, function(t) {
                    return null != t
                }),
                i = !isNaN(t._d.getTime()) && e.overflow < 0 && !e.empty && !e.invalidMonth && !e.invalidWeekday && !e.weekdayMismatch && !e.nullInput && !e.invalidFormat && !e.userInvalidated && (!e.meridiem || e.meridiem && n);
            if (t._strict && (i = i && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour), null != Object.isFrozen && Object.isFrozen(t)) return i;
            t._isValid = i
        }
        return t._isValid
    }

    function g(t) {
        var e = p(NaN);
        return null != t ? f(b(e), t) : b(e).userInvalidated = !0, e
    }
    r = Array.prototype.some ? Array.prototype.some : function(t) {
        for (var e = Object(this), n = e.length >>> 0, i = 0; i < n; i++)
            if (i in e && t.call(this, e[i], i, e)) return !0;
        return !1
    };
    var o = v.momentProperties = [];

    function _(t, e) {
        var n, i, r;
        if (c(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), c(e._i) || (t._i = e._i), c(e._f) || (t._f = e._f), c(e._l) || (t._l = e._l), c(e._strict) || (t._strict = e._strict), c(e._tzm) || (t._tzm = e._tzm), c(e._isUTC) || (t._isUTC = e._isUTC), c(e._offset) || (t._offset = e._offset), c(e._pf) || (t._pf = b(e)), c(e._locale) || (t._locale = e._locale), 0 < o.length)
            for (n = 0; n < o.length; n++) c(r = e[i = o[n]]) || (t[i] = r);
        return t
    }
    var e = !1;

    function w(t) {
        _(this, t), this._d = new Date(null != t._d ? t._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === e && (e = !0, v.updateOffset(this), e = !1)
    }

    function S(t) {
        return t instanceof w || null != t && null != t._isAMomentObject
    }

    function E(t) {
        return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
    }

    function T(t) {
        var e = +t,
            n = 0;
        return 0 !== e && isFinite(e) && (n = E(e)), n
    }

    function s(t, e, n) {
        var i, r = Math.min(t.length, e.length),
            o = Math.abs(t.length - e.length),
            s = 0;
        for (i = 0; i < r; i++)(n && t[i] !== e[i] || !n && T(t[i]) !== T(e[i])) && s++;
        return s + o
    }

    function D(t) {
        !1 === v.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
    }

    function n(r, o) {
        var s = !0;
        return f(function() {
            if (null != v.deprecationHandler && v.deprecationHandler(null, r), s) {
                for (var t, e = [], n = 0; n < arguments.length; n++) {
                    if (t = "", "object" == typeof arguments[n]) {
                        for (var i in t += "\n[" + n + "] ", arguments[0]) t += i + ": " + arguments[0][i] + ", ";
                        t = t.slice(0, -2)
                    } else t = arguments[n];
                    e.push(t)
                }
                D(r + "\nArguments: " + Array.prototype.slice.call(e).join("") + "\n" + (new Error).stack), s = !1
            }
            return o.apply(this, arguments)
        }, o)
    }
    var i, k = {};

    function C(t, e) {
        null != v.deprecationHandler && v.deprecationHandler(t, e), k[t] || (D(e), k[t] = !0)
    }

    function O(t) {
        return t instanceof Function || "[object Function]" === Object.prototype.toString.call(t)
    }

    function M(t, e) {
        var n, i = f({}, t);
        for (n in e) y(e, n) && (l(t[n]) && l(e[n]) ? (i[n] = {}, f(i[n], t[n]), f(i[n], e[n])) : null != e[n] ? i[n] = e[n] : delete i[n]);
        for (n in t) y(t, n) && !y(e, n) && l(t[n]) && (i[n] = f({}, i[n]));
        return i
    }

    function Y(t) {
        null != t && this.set(t)
    }
    v.suppressDeprecationWarnings = !1, v.deprecationHandler = null, i = Object.keys ? Object.keys : function(t) {
        var e, n = [];
        for (e in t) y(t, e) && n.push(e);
        return n
    };
    var A = {};

    function I(t, e) {
        var n = t.toLowerCase();
        A[n] = A[n + "s"] = A[e] = t
    }

    function x(t) {
        return "string" == typeof t ? A[t] || A[t.toLowerCase()] : void 0
    }

    function N(t) {
        var e, n, i = {};
        for (n in t) y(t, n) && (e = x(n)) && (i[e] = t[n]);
        return i
    }
    var L = {};

    function W(t, e) {
        L[t] = e
    }

    function P(t, e, n) {
        var i = "" + Math.abs(t),
            r = e - i.length;
        return (0 <= t ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + i
    }
    var H = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        R = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        j = {},
        F = {};

    function U(t, e, n, i) {
        var r = i;
        "string" == typeof i && (r = function() {
            return this[i]()
        }), t && (F[t] = r), e && (F[e[0]] = function() {
            return P(r.apply(this, arguments), e[1], e[2])
        }), n && (F[n] = function() {
            return this.localeData().ordinal(r.apply(this, arguments), t)
        })
    }

    function X(t, e) {
        return t.isValid() ? (e = B(e, t.localeData()), j[e] = j[e] || function(i) {
            var t, r, e, o = i.match(H);
            for (t = 0, r = o.length; t < r; t++) F[o[t]] ? o[t] = F[o[t]] : o[t] = (e = o[t]).match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
            return function(t) {
                var e, n = "";
                for (e = 0; e < r; e++) n += O(o[e]) ? o[e].call(t, i) : o[e];
                return n
            }
        }(e), j[e](t)) : t.localeData().invalidDate()
    }

    function B(t, e) {
        var n = 5;

        function i(t) {
            return e.longDateFormat(t) || t
        }
        for (R.lastIndex = 0; 0 <= n && R.test(t);) t = t.replace(R, i), R.lastIndex = 0, n -= 1;
        return t
    }
    var V = /\d/,
        q = /\d\d/,
        G = /\d{3}/,
        K = /\d{4}/,
        Q = /[+-]?\d{6}/,
        z = /\d\d?/,
        Z = /\d\d\d\d?/,
        $ = /\d\d\d\d\d\d?/,
        J = /\d{1,3}/,
        tt = /\d{1,4}/,
        et = /[+-]?\d{1,6}/,
        nt = /\d+/,
        it = /[+-]?\d+/,
        rt = /Z|[+-]\d\d:?\d\d/gi,
        ot = /Z|[+-]\d\d(?::?\d\d)?/gi,
        st = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
        at = {};

    function lt(t, n, i) {
        at[t] = O(n) ? n : function(t, e) {
            return t && i ? i : n
        }
    }

    function ct(t) {
        return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }
    var ut = {};

    function ht(t, n) {
        var e, i = n;
        for ("string" == typeof t && (t = [t]), u(n) && (i = function(t, e) {
                e[n] = T(t)
            }), e = 0; e < t.length; e++) ut[t[e]] = i
    }

    function dt(t, r) {
        ht(t, function(t, e, n, i) {
            n._w = n._w || {}, r(t, n._w, n, i)
        })
    }
    var ft = 0,
        pt = 1,
        mt = 2,
        gt = 3,
        _t = 4,
        vt = 5,
        yt = 6,
        bt = 7,
        wt = 8;

    function St(t) {
        return Et(t) ? 366 : 365
    }

    function Et(t) {
        return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
    }
    U("Y", 0, 0, function() {
        var t = this.year();
        return t <= 9999 ? "" + t : "+" + t
    }), U(0, ["YY", 2], 0, function() {
        return this.year() % 100
    }), U(0, ["YYYY", 4], 0, "year"), U(0, ["YYYYY", 5], 0, "year"), U(0, ["YYYYYY", 6, !0], 0, "year"), I("year", "y"), W("year", 1), lt("Y", it), lt("YY", z, q), lt("YYYY", tt, K), lt("YYYYY", et, Q), lt("YYYYYY", et, Q), ht(["YYYYY", "YYYYYY"], ft), ht("YYYY", function(t, e) {
        e[ft] = 2 === t.length ? v.parseTwoDigitYear(t) : T(t)
    }), ht("YY", function(t, e) {
        e[ft] = v.parseTwoDigitYear(t)
    }), ht("Y", function(t, e) {
        e[ft] = parseInt(t, 10)
    }), v.parseTwoDigitYear = function(t) {
        return T(t) + (68 < T(t) ? 1900 : 2e3)
    };
    var Tt, Dt = kt("FullYear", !0);

    function kt(e, n) {
        return function(t) {
            return null != t ? (Ot(this, e, t), v.updateOffset(this, n), this) : Ct(this, e)
        }
    }

    function Ct(t, e) {
        return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN
    }

    function Ot(t, e, n) {
        t.isValid() && !isNaN(n) && ("FullYear" === e && Et(t.year()) && 1 === t.month() && 29 === t.date() ? t._d["set" + (t._isUTC ? "UTC" : "") + e](n, t.month(), Mt(n, t.month())) : t._d["set" + (t._isUTC ? "UTC" : "") + e](n))
    }

    function Mt(t, e) {
        if (isNaN(t) || isNaN(e)) return NaN;
        var n = (e % 12 + 12) % 12;
        return t += (e - n) / 12, 1 === n ? Et(t) ? 29 : 28 : 31 - n % 7 % 2
    }
    Tt = Array.prototype.indexOf ? Array.prototype.indexOf : function(t) {
        var e;
        for (e = 0; e < this.length; ++e)
            if (this[e] === t) return e;
        return -1
    }, U("M", ["MM", 2], "Mo", function() {
        return this.month() + 1
    }), U("MMM", 0, 0, function(t) {
        return this.localeData().monthsShort(this, t)
    }), U("MMMM", 0, 0, function(t) {
        return this.localeData().months(this, t)
    }), I("month", "M"), W("month", 8), lt("M", z), lt("MM", z, q), lt("MMM", function(t, e) {
        return e.monthsShortRegex(t)
    }), lt("MMMM", function(t, e) {
        return e.monthsRegex(t)
    }), ht(["M", "MM"], function(t, e) {
        e[pt] = T(t) - 1
    }), ht(["MMM", "MMMM"], function(t, e, n, i) {
        var r = n._locale.monthsParse(t, i, n._strict);
        null != r ? e[pt] = r : b(n).invalidMonth = t
    });
    var Yt = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        At = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        It = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");

    function xt(t, e) {
        var n;
        if (!t.isValid()) return t;
        if ("string" == typeof e)
            if (/^\d+$/.test(e)) e = T(e);
            else if (!u(e = t.localeData().monthsParse(e))) return t;
        return n = Math.min(t.date(), Mt(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, n), t
    }

    function Nt(t) {
        return null != t ? (xt(this, t), v.updateOffset(this, !0), this) : Ct(this, "Month")
    }
    var Lt = st,
        Wt = st;

    function Pt() {
        function t(t, e) {
            return e.length - t.length
        }
        var e, n, i = [],
            r = [],
            o = [];
        for (e = 0; e < 12; e++) n = p([2e3, e]), i.push(this.monthsShort(n, "")), r.push(this.months(n, "")), o.push(this.months(n, "")), o.push(this.monthsShort(n, ""));
        for (i.sort(t), r.sort(t), o.sort(t), e = 0; e < 12; e++) i[e] = ct(i[e]), r[e] = ct(r[e]);
        for (e = 0; e < 24; e++) o[e] = ct(o[e]);
        this._monthsRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i")
    }

    function Ht(t) {
        var e = new Date(Date.UTC.apply(null, arguments));
        return t < 100 && 0 <= t && isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t), e
    }

    function Rt(t, e, n) {
        var i = 7 + e - n;
        return -(7 + Ht(t, 0, i).getUTCDay() - e) % 7 + i - 1
    }

    function jt(t, e, n, i, r) {
        var o, s, a = 1 + 7 * (e - 1) + (7 + n - i) % 7 + Rt(t, i, r);
        return a <= 0 ? s = St(o = t - 1) + a : a > St(t) ? (o = t + 1, s = a - St(t)) : (o = t, s = a), {
            year: o,
            dayOfYear: s
        }
    }

    function Ft(t, e, n) {
        var i, r, o = Rt(t.year(), e, n),
            s = Math.floor((t.dayOfYear() - o - 1) / 7) + 1;
        return s < 1 ? i = s + Ut(r = t.year() - 1, e, n) : s > Ut(t.year(), e, n) ? (i = s - Ut(t.year(), e, n), r = t.year() + 1) : (r = t.year(), i = s), {
            week: i,
            year: r
        }
    }

    function Ut(t, e, n) {
        var i = Rt(t, e, n),
            r = Rt(t + 1, e, n);
        return (St(t) - i + r) / 7
    }
    U("w", ["ww", 2], "wo", "week"), U("W", ["WW", 2], "Wo", "isoWeek"), I("week", "w"), I("isoWeek", "W"), W("week", 5), W("isoWeek", 5), lt("w", z), lt("ww", z, q), lt("W", z), lt("WW", z, q), dt(["w", "ww", "W", "WW"], function(t, e, n, i) {
        e[i.substr(0, 1)] = T(t)
    }), U("d", 0, "do", "day"), U("dd", 0, 0, function(t) {
        return this.localeData().weekdaysMin(this, t)
    }), U("ddd", 0, 0, function(t) {
        return this.localeData().weekdaysShort(this, t)
    }), U("dddd", 0, 0, function(t) {
        return this.localeData().weekdays(this, t)
    }), U("e", 0, 0, "weekday"), U("E", 0, 0, "isoWeekday"), I("day", "d"), I("weekday", "e"), I("isoWeekday", "E"), W("day", 11), W("weekday", 11), W("isoWeekday", 11), lt("d", z), lt("e", z), lt("E", z), lt("dd", function(t, e) {
        return e.weekdaysMinRegex(t)
    }), lt("ddd", function(t, e) {
        return e.weekdaysShortRegex(t)
    }), lt("dddd", function(t, e) {
        return e.weekdaysRegex(t)
    }), dt(["dd", "ddd", "dddd"], function(t, e, n, i) {
        var r = n._locale.weekdaysParse(t, i, n._strict);
        null != r ? e.d = r : b(n).invalidWeekday = t
    }), dt(["d", "e", "E"], function(t, e, n, i) {
        e[i] = T(t)
    });
    var Xt = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        Bt = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        Vt = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        qt = st,
        Gt = st,
        Kt = st;

    function Qt() {
        function t(t, e) {
            return e.length - t.length
        }
        var e, n, i, r, o, s = [],
            a = [],
            l = [],
            c = [];
        for (e = 0; e < 7; e++) n = p([2e3, 1]).day(e), i = this.weekdaysMin(n, ""), r = this.weekdaysShort(n, ""), o = this.weekdays(n, ""), s.push(i), a.push(r), l.push(o), c.push(i), c.push(r), c.push(o);
        for (s.sort(t), a.sort(t), l.sort(t), c.sort(t), e = 0; e < 7; e++) a[e] = ct(a[e]), l[e] = ct(l[e]), c[e] = ct(c[e]);
        this._weekdaysRegex = new RegExp("^(" + c.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + s.join("|") + ")", "i")
    }

    function zt() {
        return this.hours() % 12 || 12
    }

    function Zt(t, e) {
        U(t, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), e)
        })
    }

    function $t(t, e) {
        return e._meridiemParse
    }
    U("H", ["HH", 2], 0, "hour"), U("h", ["hh", 2], 0, zt), U("k", ["kk", 2], 0, function() {
        return this.hours() || 24
    }), U("hmm", 0, 0, function() {
        return "" + zt.apply(this) + P(this.minutes(), 2)
    }), U("hmmss", 0, 0, function() {
        return "" + zt.apply(this) + P(this.minutes(), 2) + P(this.seconds(), 2)
    }), U("Hmm", 0, 0, function() {
        return "" + this.hours() + P(this.minutes(), 2)
    }), U("Hmmss", 0, 0, function() {
        return "" + this.hours() + P(this.minutes(), 2) + P(this.seconds(), 2)
    }), Zt("a", !0), Zt("A", !1), I("hour", "h"), W("hour", 13), lt("a", $t), lt("A", $t), lt("H", z), lt("h", z), lt("k", z), lt("HH", z, q), lt("hh", z, q), lt("kk", z, q), lt("hmm", Z), lt("hmmss", $), lt("Hmm", Z), lt("Hmmss", $), ht(["H", "HH"], gt), ht(["k", "kk"], function(t, e, n) {
        var i = T(t);
        e[gt] = 24 === i ? 0 : i
    }), ht(["a", "A"], function(t, e, n) {
        n._isPm = n._locale.isPM(t), n._meridiem = t
    }), ht(["h", "hh"], function(t, e, n) {
        e[gt] = T(t), b(n).bigHour = !0
    }), ht("hmm", function(t, e, n) {
        var i = t.length - 2;
        e[gt] = T(t.substr(0, i)), e[_t] = T(t.substr(i)), b(n).bigHour = !0
    }), ht("hmmss", function(t, e, n) {
        var i = t.length - 4,
            r = t.length - 2;
        e[gt] = T(t.substr(0, i)), e[_t] = T(t.substr(i, 2)), e[vt] = T(t.substr(r)), b(n).bigHour = !0
    }), ht("Hmm", function(t, e, n) {
        var i = t.length - 2;
        e[gt] = T(t.substr(0, i)), e[_t] = T(t.substr(i))
    }), ht("Hmmss", function(t, e, n) {
        var i = t.length - 4,
            r = t.length - 2;
        e[gt] = T(t.substr(0, i)), e[_t] = T(t.substr(i, 2)), e[vt] = T(t.substr(r))
    });
    var Jt, te = kt("Hours", !0),
        ee = {
            calendar: {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            longDateFormat: {
                LTS: "h:mm:ss A",
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY h:mm A",
                LLLL: "dddd, MMMM D, YYYY h:mm A"
            },
            invalidDate: "Invalid date",
            ordinal: "%d",
            dayOfMonthOrdinalParse: /\d{1,2}/,
            relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                ss: "%d seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            months: At,
            monthsShort: It,
            week: {
                dow: 0,
                doy: 6
            },
            weekdays: Xt,
            weekdaysMin: Vt,
            weekdaysShort: Bt,
            meridiemParse: /[ap]\.?m?\.?/i
        },
        ne = {},
        ie = {};

    function re(t) {
        return t ? t.toLowerCase().replace("_", "-") : t
    }

    function oe(t) {
        var e = null;
        if (!ne[t] && "undefined" != typeof module && module && module.exports) try {
            e = Jt._abbr, require("./locale/" + t), se(e)
        } catch (t) {}
        return ne[t]
    }

    function se(t, e) {
        var n;
        return t && ((n = c(e) ? le(t) : ae(t, e)) ? Jt = n : "undefined" != typeof console && console.warn && console.warn("Locale " + t + " not found. Did you forget to load it?")), Jt._abbr
    }

    function ae(t, e) {
        if (null !== e) {
            var n, i = ee;
            if (e.abbr = t, null != ne[t]) C("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), i = ne[t]._config;
            else if (null != e.parentLocale)
                if (null != ne[e.parentLocale]) i = ne[e.parentLocale]._config;
                else {
                    if (null == (n = oe(e.parentLocale))) return ie[e.parentLocale] || (ie[e.parentLocale] = []), ie[e.parentLocale].push({
                        name: t,
                        config: e
                    }), null;
                    i = n._config
                } return ne[t] = new Y(M(i, e)), ie[t] && ie[t].forEach(function(t) {
                ae(t.name, t.config)
            }), se(t), ne[t]
        }
        return delete ne[t], null
    }

    function le(t) {
        var e;
        if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return Jt;
        if (!a(t)) {
            if (e = oe(t)) return e;
            t = [t]
        }
        return function(t) {
            for (var e, n, i, r, o = 0; o < t.length;) {
                for (e = (r = re(t[o]).split("-")).length, n = (n = re(t[o + 1])) ? n.split("-") : null; 0 < e;) {
                    if (i = oe(r.slice(0, e).join("-"))) return i;
                    if (n && n.length >= e && s(r, n, !0) >= e - 1) break;
                    e--
                }
                o++
            }
            return Jt
        }(t)
    }

    function ce(t) {
        var e, n = t._a;
        return n && -2 === b(t).overflow && (e = n[pt] < 0 || 11 < n[pt] ? pt : n[mt] < 1 || n[mt] > Mt(n[ft], n[pt]) ? mt : n[gt] < 0 || 24 < n[gt] || 24 === n[gt] && (0 !== n[_t] || 0 !== n[vt] || 0 !== n[yt]) ? gt : n[_t] < 0 || 59 < n[_t] ? _t : n[vt] < 0 || 59 < n[vt] ? vt : n[yt] < 0 || 999 < n[yt] ? yt : -1, b(t)._overflowDayOfYear && (e < ft || mt < e) && (e = mt), b(t)._overflowWeeks && -1 === e && (e = bt), b(t)._overflowWeekday && -1 === e && (e = wt), b(t).overflow = e), t
    }

    function ue(t, e, n) {
        return null != t ? t : null != e ? e : n
    }

    function he(t) {
        var e, n, i, r, o, s = [];
        if (!t._d) {
            var a, l;
            for (a = t, l = new Date(v.now()), i = a._useUTC ? [l.getUTCFullYear(), l.getUTCMonth(), l.getUTCDate()] : [l.getFullYear(), l.getMonth(), l.getDate()], t._w && null == t._a[mt] && null == t._a[pt] && function(t) {
                    var e, n, i, r, o, s, a, l;
                    if (null != (e = t._w).GG || null != e.W || null != e.E) o = 1, s = 4, n = ue(e.GG, t._a[ft], Ft(De(), 1, 4).year), i = ue(e.W, 1), ((r = ue(e.E, 1)) < 1 || 7 < r) && (l = !0);
                    else {
                        o = t._locale._week.dow, s = t._locale._week.doy;
                        var c = Ft(De(), o, s);
                        n = ue(e.gg, t._a[ft], c.year), i = ue(e.w, c.week), null != e.d ? ((r = e.d) < 0 || 6 < r) && (l = !0) : null != e.e ? (r = e.e + o, (e.e < 0 || 6 < e.e) && (l = !0)) : r = o
                    }
                    i < 1 || i > Ut(n, o, s) ? b(t)._overflowWeeks = !0 : null != l ? b(t)._overflowWeekday = !0 : (a = jt(n, i, r, o, s), t._a[ft] = a.year, t._dayOfYear = a.dayOfYear)
                }(t), null != t._dayOfYear && (o = ue(t._a[ft], i[ft]), (t._dayOfYear > St(o) || 0 === t._dayOfYear) && (b(t)._overflowDayOfYear = !0), n = Ht(o, 0, t._dayOfYear), t._a[pt] = n.getUTCMonth(), t._a[mt] = n.getUTCDate()), e = 0; e < 3 && null == t._a[e]; ++e) t._a[e] = s[e] = i[e];
            for (; e < 7; e++) t._a[e] = s[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
            24 === t._a[gt] && 0 === t._a[_t] && 0 === t._a[vt] && 0 === t._a[yt] && (t._nextDay = !0, t._a[gt] = 0), t._d = (t._useUTC ? Ht : function(t, e, n, i, r, o, s) {
                var a = new Date(t, e, n, i, r, o, s);
                return t < 100 && 0 <= t && isFinite(a.getFullYear()) && a.setFullYear(t), a
            }).apply(null, s), r = t._useUTC ? t._d.getUTCDay() : t._d.getDay(), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), t._nextDay && (t._a[gt] = 24), t._w && void 0 !== t._w.d && t._w.d !== r && (b(t).weekdayMismatch = !0)
        }
    }
    var de = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        fe = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        pe = /Z|[+-]\d\d(?::?\d\d)?/,
        me = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
            ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
            ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
            ["YYYY-DDD", /\d{4}-\d{3}/],
            ["YYYY-MM", /\d{4}-\d\d/, !1],
            ["YYYYYYMMDD", /[+-]\d{10}/],
            ["YYYYMMDD", /\d{8}/],
            ["GGGG[W]WWE", /\d{4}W\d{3}/],
            ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
            ["YYYYDDD", /\d{7}/]
        ],
        ge = [
            ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
            ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
            ["HH:mm:ss", /\d\d:\d\d:\d\d/],
            ["HH:mm", /\d\d:\d\d/],
            ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
            ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
            ["HHmmss", /\d\d\d\d\d\d/],
            ["HHmm", /\d\d\d\d/],
            ["HH", /\d\d/]
        ],
        _e = /^\/?Date\((\-?\d+)/i;

    function ve(t) {
        var e, n, i, r, o, s, a = t._i,
            l = de.exec(a) || fe.exec(a);
        if (l) {
            for (b(t).iso = !0, e = 0, n = me.length; e < n; e++)
                if (me[e][1].exec(l[1])) {
                    r = me[e][0], i = !1 !== me[e][2];
                    break
                } if (null == r) return void(t._isValid = !1);
            if (l[3]) {
                for (e = 0, n = ge.length; e < n; e++)
                    if (ge[e][1].exec(l[3])) {
                        o = (l[2] || " ") + ge[e][0];
                        break
                    } if (null == o) return void(t._isValid = !1)
            }
            if (!i && null != o) return void(t._isValid = !1);
            if (l[4]) {
                if (!pe.exec(l[4])) return void(t._isValid = !1);
                s = "Z"
            }
            t._f = r + (o || "") + (s || ""), Se(t)
        } else t._isValid = !1
    }
    var ye = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
    var be = {
        UT: 0,
        GMT: 0,
        EDT: -240,
        EST: -300,
        CDT: -300,
        CST: -360,
        MDT: -360,
        MST: -420,
        PDT: -420,
        PST: -480
    };

    function we(t) {
        var e, n, i, r, o, s, a, l, c, u, h, d = ye.exec(t._i.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""));
        if (d) {
            var f = (r = d[4], o = d[3], s = d[2], a = d[5], l = d[6], c = d[7], h = [(u = parseInt(r, 10), u <= 49 ? 2e3 + u : u <= 999 ? 1900 + u : u), It.indexOf(o), parseInt(s, 10), parseInt(a, 10), parseInt(l, 10)], c && h.push(parseInt(c, 10)), h);
            if (n = f, i = t, (e = d[1]) && Bt.indexOf(e) !== new Date(n[0], n[1], n[2]).getDay() && (b(i).weekdayMismatch = !0, !(i._isValid = !1))) return;
            t._a = f, t._tzm = function(t, e, n) {
                if (t) return be[t];
                if (e) return 0;
                var i = parseInt(n, 10),
                    r = i % 100;
                return (i - r) / 100 * 60 + r
            }(d[8], d[9], d[10]), t._d = Ht.apply(null, t._a), t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), b(t).rfc2822 = !0
        } else t._isValid = !1
    }

    function Se(t) {
        if (t._f !== v.ISO_8601)
            if (t._f !== v.RFC_2822) {
                t._a = [], b(t).empty = !0;
                var e, n, i, r, o, s, a, l, c = "" + t._i,
                    u = c.length,
                    h = 0;
                for (i = B(t._f, t._locale).match(H) || [], e = 0; e < i.length; e++) r = i[e], (n = (c.match((g = r, _ = t, y(at, g) ? at[g](_._strict, _._locale) : new RegExp(ct(g.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(t, e, n, i, r) {
                    return e || n || i || r
                }))))) || [])[0]) && (0 < (o = c.substr(0, c.indexOf(n))).length && b(t).unusedInput.push(o), c = c.slice(c.indexOf(n) + n.length), h += n.length), F[r] ? (n ? b(t).empty = !1 : b(t).unusedTokens.push(r), s = r, l = t, null != (a = n) && y(ut, s) && ut[s](a, l._a, l, s)) : t._strict && !n && b(t).unusedTokens.push(r);
                b(t).charsLeftOver = u - h, 0 < c.length && b(t).unusedInput.push(c), t._a[gt] <= 12 && !0 === b(t).bigHour && 0 < t._a[gt] && (b(t).bigHour = void 0), b(t).parsedDateParts = t._a.slice(0), b(t).meridiem = t._meridiem, t._a[gt] = (d = t._locale, f = t._a[gt], null == (p = t._meridiem) ? f : null != d.meridiemHour ? d.meridiemHour(f, p) : (null != d.isPM && ((m = d.isPM(p)) && f < 12 && (f += 12), m || 12 !== f || (f = 0)), f)), he(t), ce(t)
            } else we(t);
        else ve(t);
        var d, f, p, m, g, _
    }

    function Ee(t) {
        var e, n, i, r, o = t._i,
            s = t._f;
        return t._locale = t._locale || le(t._l), null === o || void 0 === s && "" === o ? g({
            nullInput: !0
        }) : ("string" == typeof o && (t._i = o = t._locale.preparse(o)), S(o) ? new w(ce(o)) : (h(o) ? t._d = o : a(s) ? function(t) {
            var e, n, i, r, o;
            if (0 === t._f.length) return b(t).invalidFormat = !0, t._d = new Date(NaN);
            for (r = 0; r < t._f.length; r++) o = 0, e = _({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[r], Se(e), m(e) && (o += b(e).charsLeftOver, o += 10 * b(e).unusedTokens.length, b(e).score = o, (null == i || o < i) && (i = o, n = e));
            f(t, n || e)
        }(t) : s ? Se(t) : c(n = (e = t)._i) ? e._d = new Date(v.now()) : h(n) ? e._d = new Date(n.valueOf()) : "string" == typeof n ? (i = e, null === (r = _e.exec(i._i)) ? (ve(i), !1 === i._isValid && (delete i._isValid, we(i), !1 === i._isValid && (delete i._isValid, v.createFromInputFallback(i)))) : i._d = new Date(+r[1])) : a(n) ? (e._a = d(n.slice(0), function(t) {
            return parseInt(t, 10)
        }), he(e)) : l(n) ? function(t) {
            if (!t._d) {
                var e = N(t._i);
                t._a = d([e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], function(t) {
                    return t && parseInt(t, 10)
                }), he(t)
            }
        }(e) : u(n) ? e._d = new Date(n) : v.createFromInputFallback(e), m(t) || (t._d = null), t))
    }

    function Te(t, e, n, i, r) {
        var o, s = {};
        return !0 !== n && !1 !== n || (i = n, n = void 0), (l(t) && function(t) {
            if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(t).length;
            var e;
            for (e in t)
                if (t.hasOwnProperty(e)) return !1;
            return !0
        }(t) || a(t) && 0 === t.length) && (t = void 0), s._isAMomentObject = !0, s._useUTC = s._isUTC = r, s._l = n, s._i = t, s._f = e, s._strict = i, (o = new w(ce(Ee(s))))._nextDay && (o.add(1, "d"), o._nextDay = void 0), o
    }

    function De(t, e, n, i) {
        return Te(t, e, n, i, !1)
    }
    v.createFromInputFallback = n("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(t) {
        t._d = new Date(t._i + (t._useUTC ? " UTC" : ""))
    }), v.ISO_8601 = function() {}, v.RFC_2822 = function() {};
    var ke = n("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
            var t = De.apply(null, arguments);
            return this.isValid() && t.isValid() ? t < this ? this : t : g()
        }),
        Ce = n("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
            var t = De.apply(null, arguments);
            return this.isValid() && t.isValid() ? this < t ? this : t : g()
        });

    function Oe(t, e) {
        var n, i;
        if (1 === e.length && a(e[0]) && (e = e[0]), !e.length) return De();
        for (n = e[0], i = 1; i < e.length; ++i) e[i].isValid() && !e[i][t](n) || (n = e[i]);
        return n
    }
    var Me = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];

    function Ye(t) {
        var e = N(t),
            n = e.year || 0,
            i = e.quarter || 0,
            r = e.month || 0,
            o = e.week || 0,
            s = e.day || 0,
            a = e.hour || 0,
            l = e.minute || 0,
            c = e.second || 0,
            u = e.millisecond || 0;
        this._isValid = function(t) {
            for (var e in t)
                if (-1 === Tt.call(Me, e) || null != t[e] && isNaN(t[e])) return !1;
            for (var n = !1, i = 0; i < Me.length; ++i)
                if (t[Me[i]]) {
                    if (n) return !1;
                    parseFloat(t[Me[i]]) !== T(t[Me[i]]) && (n = !0)
                } return !0
        }(e), this._milliseconds = +u + 1e3 * c + 6e4 * l + 1e3 * a * 60 * 60, this._days = +s + 7 * o, this._months = +r + 3 * i + 12 * n, this._data = {}, this._locale = le(), this._bubble()
    }

    function Ae(t) {
        return t instanceof Ye
    }

    function Ie(t) {
        return t < 0 ? -1 * Math.round(-1 * t) : Math.round(t)
    }

    function xe(t, n) {
        U(t, 0, 0, function() {
            var t = this.utcOffset(),
                e = "+";
            return t < 0 && (t = -t, e = "-"), e + P(~~(t / 60), 2) + n + P(~~t % 60, 2)
        })
    }
    xe("Z", ":"), xe("ZZ", ""), lt("Z", ot), lt("ZZ", ot), ht(["Z", "ZZ"], function(t, e, n) {
        n._useUTC = !0, n._tzm = Le(ot, t)
    });
    var Ne = /([\+\-]|\d\d)/gi;

    function Le(t, e) {
        var n = (e || "").match(t);
        if (null === n) return null;
        var i = ((n[n.length - 1] || []) + "").match(Ne) || ["-", 0, 0],
            r = 60 * i[1] + T(i[2]);
        return 0 === r ? 0 : "+" === i[0] ? r : -r
    }

    function We(t, e) {
        var n, i;
        return e._isUTC ? (n = e.clone(), i = (S(t) || h(t) ? t.valueOf() : De(t).valueOf()) - n.valueOf(), n._d.setTime(n._d.valueOf() + i), v.updateOffset(n, !1), n) : De(t).local()
    }

    function Pe(t) {
        return 15 * -Math.round(t._d.getTimezoneOffset() / 15)
    }

    function He() {
        return !!this.isValid() && this._isUTC && 0 === this._offset
    }
    v.updateOffset = function() {};
    var Re = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
        je = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function Fe(t, e) {
        var n, i, r, o, s, a, l = t,
            c = null;
        return Ae(t) ? l = {
            ms: t._milliseconds,
            d: t._days,
            M: t._months
        } : u(t) ? (l = {}, e ? l[e] = t : l.milliseconds = t) : (c = Re.exec(t)) ? (n = "-" === c[1] ? -1 : 1, l = {
            y: 0,
            d: T(c[mt]) * n,
            h: T(c[gt]) * n,
            m: T(c[_t]) * n,
            s: T(c[vt]) * n,
            ms: T(Ie(1e3 * c[yt])) * n
        }) : (c = je.exec(t)) ? (n = "-" === c[1] ? -1 : (c[1], 1), l = {
            y: Ue(c[2], n),
            M: Ue(c[3], n),
            w: Ue(c[4], n),
            d: Ue(c[5], n),
            h: Ue(c[6], n),
            m: Ue(c[7], n),
            s: Ue(c[8], n)
        }) : null == l ? l = {} : "object" == typeof l && ("from" in l || "to" in l) && (o = De(l.from), s = De(l.to), r = o.isValid() && s.isValid() ? (s = We(s, o), o.isBefore(s) ? a = Xe(o, s) : ((a = Xe(s, o)).milliseconds = -a.milliseconds, a.months = -a.months), a) : {
            milliseconds: 0,
            months: 0
        }, (l = {}).ms = r.milliseconds, l.M = r.months), i = new Ye(l), Ae(t) && y(t, "_locale") && (i._locale = t._locale), i
    }

    function Ue(t, e) {
        var n = t && parseFloat(t.replace(",", "."));
        return (isNaN(n) ? 0 : n) * e
    }

    function Xe(t, e) {
        var n = {
            milliseconds: 0,
            months: 0
        };
        return n.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(n.months, "M").isAfter(e) && --n.months, n.milliseconds = +e - +t.clone().add(n.months, "M"), n
    }

    function Be(i, r) {
        return function(t, e) {
            var n;
            return null === e || isNaN(+e) || (C(r, "moment()." + r + "(period, number) is deprecated. Please use moment()." + r + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), n = t, t = e, e = n), Ve(this, Fe(t = "string" == typeof t ? +t : t, e), i), this
        }
    }

    function Ve(t, e, n, i) {
        var r = e._milliseconds,
            o = Ie(e._days),
            s = Ie(e._months);
        t.isValid() && (i = null == i || i, s && xt(t, Ct(t, "Month") + s * n), o && Ot(t, "Date", Ct(t, "Date") + o * n), r && t._d.setTime(t._d.valueOf() + r * n), i && v.updateOffset(t, o || s))
    }
    Fe.fn = Ye.prototype, Fe.invalid = function() {
        return Fe(NaN)
    };
    var qe = Be(1, "add"),
        Ge = Be(-1, "subtract");

    function Ke(t, e) {
        var n = 12 * (e.year() - t.year()) + (e.month() - t.month()),
            i = t.clone().add(n, "months");
        return -(n + (e - i < 0 ? (e - i) / (i - t.clone().add(n - 1, "months")) : (e - i) / (t.clone().add(n + 1, "months") - i))) || 0
    }

    function Qe(t) {
        var e;
        return void 0 === t ? this._locale._abbr : (null != (e = le(t)) && (this._locale = e), this)
    }
    v.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", v.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    var ze = n("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(t) {
        return void 0 === t ? this.localeData() : this.locale(t)
    });

    function Ze() {
        return this._locale
    }

    function $e(t, e) {
        U(0, [t, t.length], 0, e)
    }

    function Je(t, e, n, i, r) {
        var o;
        return null == t ? Ft(this, i, r).year : ((o = Ut(t, i, r)) < e && (e = o), function(t, e, n, i, r) {
            var o = jt(t, e, n, i, r),
                s = Ht(o.year, 0, o.dayOfYear);
            return this.year(s.getUTCFullYear()), this.month(s.getUTCMonth()), this.date(s.getUTCDate()), this
        }.call(this, t, e, n, i, r))
    }
    U(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100
    }), U(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100
    }), $e("gggg", "weekYear"), $e("ggggg", "weekYear"), $e("GGGG", "isoWeekYear"), $e("GGGGG", "isoWeekYear"), I("weekYear", "gg"), I("isoWeekYear", "GG"), W("weekYear", 1), W("isoWeekYear", 1), lt("G", it), lt("g", it), lt("GG", z, q), lt("gg", z, q), lt("GGGG", tt, K), lt("gggg", tt, K), lt("GGGGG", et, Q), lt("ggggg", et, Q), dt(["gggg", "ggggg", "GGGG", "GGGGG"], function(t, e, n, i) {
        e[i.substr(0, 2)] = T(t)
    }), dt(["gg", "GG"], function(t, e, n, i) {
        e[i] = v.parseTwoDigitYear(t)
    }), U("Q", 0, "Qo", "quarter"), I("quarter", "Q"), W("quarter", 7), lt("Q", V), ht("Q", function(t, e) {
        e[pt] = 3 * (T(t) - 1)
    }), U("D", ["DD", 2], "Do", "date"), I("date", "D"), W("date", 9), lt("D", z), lt("DD", z, q), lt("Do", function(t, e) {
        return t ? e._dayOfMonthOrdinalParse || e._ordinalParse : e._dayOfMonthOrdinalParseLenient
    }), ht(["D", "DD"], mt), ht("Do", function(t, e) {
        e[mt] = T(t.match(z)[0])
    });
    var tn = kt("Date", !0);
    U("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), I("dayOfYear", "DDD"), W("dayOfYear", 4), lt("DDD", J), lt("DDDD", G), ht(["DDD", "DDDD"], function(t, e, n) {
        n._dayOfYear = T(t)
    }), U("m", ["mm", 2], 0, "minute"), I("minute", "m"), W("minute", 14), lt("m", z), lt("mm", z, q), ht(["m", "mm"], _t);
    var en = kt("Minutes", !1);
    U("s", ["ss", 2], 0, "second"), I("second", "s"), W("second", 15), lt("s", z), lt("ss", z, q), ht(["s", "ss"], vt);
    var nn, rn = kt("Seconds", !1);
    for (U("S", 0, 0, function() {
            return ~~(this.millisecond() / 100)
        }), U(0, ["SS", 2], 0, function() {
            return ~~(this.millisecond() / 10)
        }), U(0, ["SSS", 3], 0, "millisecond"), U(0, ["SSSS", 4], 0, function() {
            return 10 * this.millisecond()
        }), U(0, ["SSSSS", 5], 0, function() {
            return 100 * this.millisecond()
        }), U(0, ["SSSSSS", 6], 0, function() {
            return 1e3 * this.millisecond()
        }), U(0, ["SSSSSSS", 7], 0, function() {
            return 1e4 * this.millisecond()
        }), U(0, ["SSSSSSSS", 8], 0, function() {
            return 1e5 * this.millisecond()
        }), U(0, ["SSSSSSSSS", 9], 0, function() {
            return 1e6 * this.millisecond()
        }), I("millisecond", "ms"), W("millisecond", 16), lt("S", J, V), lt("SS", J, q), lt("SSS", J, G), nn = "SSSS"; nn.length <= 9; nn += "S") lt(nn, nt);

    function on(t, e) {
        e[yt] = T(1e3 * ("0." + t))
    }
    for (nn = "S"; nn.length <= 9; nn += "S") ht(nn, on);
    var sn = kt("Milliseconds", !1);
    U("z", 0, 0, "zoneAbbr"), U("zz", 0, 0, "zoneName");
    var an = w.prototype;

    function ln(t) {
        return t
    }
    an.add = qe, an.calendar = function(t, e) {
        var n = t || De(),
            i = We(n, this).startOf("day"),
            r = v.calendarFormat(this, i) || "sameElse",
            o = e && (O(e[r]) ? e[r].call(this, n) : e[r]);
        return this.format(o || this.localeData().calendar(r, this, De(n)))
    }, an.clone = function() {
        return new w(this)
    }, an.diff = function(t, e, n) {
        var i, r, o;
        if (!this.isValid()) return NaN;
        if (!(i = We(t, this)).isValid()) return NaN;
        switch (r = 6e4 * (i.utcOffset() - this.utcOffset()), e = x(e)) {
            case "year":
                o = Ke(this, i) / 12;
                break;
            case "month":
                o = Ke(this, i);
                break;
            case "quarter":
                o = Ke(this, i) / 3;
                break;
            case "second":
                o = (this - i) / 1e3;
                break;
            case "minute":
                o = (this - i) / 6e4;
                break;
            case "hour":
                o = (this - i) / 36e5;
                break;
            case "day":
                o = (this - i - r) / 864e5;
                break;
            case "week":
                o = (this - i - r) / 6048e5;
                break;
            default:
                o = this - i
        }
        return n ? o : E(o)
    }, an.endOf = function(t) {
        return void 0 === (t = x(t)) || "millisecond" === t ? this : ("date" === t && (t = "day"), this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms"))
    }, an.format = function(t) {
        t || (t = this.isUtc() ? v.defaultFormatUtc : v.defaultFormat);
        var e = X(this, t);
        return this.localeData().postformat(e)
    }, an.from = function(t, e) {
        return this.isValid() && (S(t) && t.isValid() || De(t).isValid()) ? Fe({
            to: this,
            from: t
        }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
    }, an.fromNow = function(t) {
        return this.from(De(), t)
    }, an.to = function(t, e) {
        return this.isValid() && (S(t) && t.isValid() || De(t).isValid()) ? Fe({
            from: this,
            to: t
        }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
    }, an.toNow = function(t) {
        return this.to(De(), t)
    }, an.get = function(t) {
        return O(this[t = x(t)]) ? this[t]() : this
    }, an.invalidAt = function() {
        return b(this).overflow
    }, an.isAfter = function(t, e) {
        var n = S(t) ? t : De(t);
        return !(!this.isValid() || !n.isValid()) && ("millisecond" === (e = x(c(e) ? "millisecond" : e)) ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(e).valueOf())
    }, an.isBefore = function(t, e) {
        var n = S(t) ? t : De(t);
        return !(!this.isValid() || !n.isValid()) && ("millisecond" === (e = x(c(e) ? "millisecond" : e)) ? this.valueOf() < n.valueOf() : this.clone().endOf(e).valueOf() < n.valueOf())
    }, an.isBetween = function(t, e, n, i) {
        return ("(" === (i = i || "()")[0] ? this.isAfter(t, n) : !this.isBefore(t, n)) && (")" === i[1] ? this.isBefore(e, n) : !this.isAfter(e, n))
    }, an.isSame = function(t, e) {
        var n, i = S(t) ? t : De(t);
        return !(!this.isValid() || !i.isValid()) && ("millisecond" === (e = x(e || "millisecond")) ? this.valueOf() === i.valueOf() : (n = i.valueOf(), this.clone().startOf(e).valueOf() <= n && n <= this.clone().endOf(e).valueOf()))
    }, an.isSameOrAfter = function(t, e) {
        return this.isSame(t, e) || this.isAfter(t, e)
    }, an.isSameOrBefore = function(t, e) {
        return this.isSame(t, e) || this.isBefore(t, e)
    }, an.isValid = function() {
        return m(this)
    }, an.lang = ze, an.locale = Qe, an.localeData = Ze, an.max = Ce, an.min = ke, an.parsingFlags = function() {
        return f({}, b(this))
    }, an.set = function(t, e) {
        if ("object" == typeof t)
            for (var n = function(t) {
                    var e = [];
                    for (var n in t) e.push({
                        unit: n,
                        priority: L[n]
                    });
                    return e.sort(function(t, e) {
                        return t.priority - e.priority
                    }), e
                }(t = N(t)), i = 0; i < n.length; i++) this[n[i].unit](t[n[i].unit]);
        else if (O(this[t = x(t)])) return this[t](e);
        return this
    }, an.startOf = function(t) {
        switch (t = x(t)) {
            case "year":
                this.month(0);
            case "quarter":
            case "month":
                this.date(1);
            case "week":
            case "isoWeek":
            case "day":
            case "date":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
        }
        return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), this
    }, an.subtract = Ge, an.toArray = function() {
        var t = this;
        return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()]
    }, an.toObject = function() {
        var t = this;
        return {
            years: t.year(),
            months: t.month(),
            date: t.date(),
            hours: t.hours(),
            minutes: t.minutes(),
            seconds: t.seconds(),
            milliseconds: t.milliseconds()
        }
    }, an.toDate = function() {
        return new Date(this.valueOf())
    }, an.toISOString = function(t) {
        if (!this.isValid()) return null;
        var e = !0 !== t,
            n = e ? this.clone().utc() : this;
        return n.year() < 0 || 9999 < n.year() ? X(n, e ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : O(Date.prototype.toISOString) ? e ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", X(n, "Z")) : X(n, e ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ")
    }, an.inspect = function() {
        if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
        var t = "moment",
            e = "";
        this.isLocal() || (t = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", e = "Z");
        var n = "[" + t + '("]',
            i = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
            r = e + '[")]';
        return this.format(n + i + "-MM-DD[T]HH:mm:ss.SSS" + r)
    }, an.toJSON = function() {
        return this.isValid() ? this.toISOString() : null
    }, an.toString = function() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }, an.unix = function() {
        return Math.floor(this.valueOf() / 1e3)
    }, an.valueOf = function() {
        return this._d.valueOf() - 6e4 * (this._offset || 0)
    }, an.creationData = function() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        }
    }, an.year = Dt, an.isLeapYear = function() {
        return Et(this.year())
    }, an.weekYear = function(t) {
        return Je.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }, an.isoWeekYear = function(t) {
        return Je.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4)
    }, an.quarter = an.quarters = function(t) {
        return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
    }, an.month = Nt, an.daysInMonth = function() {
        return Mt(this.year(), this.month())
    }, an.week = an.weeks = function(t) {
        var e = this.localeData().week(this);
        return null == t ? e : this.add(7 * (t - e), "d")
    }, an.isoWeek = an.isoWeeks = function(t) {
        var e = Ft(this, 1, 4).week;
        return null == t ? e : this.add(7 * (t - e), "d")
    }, an.weeksInYear = function() {
        var t = this.localeData()._week;
        return Ut(this.year(), t.dow, t.doy)
    }, an.isoWeeksInYear = function() {
        return Ut(this.year(), 1, 4)
    }, an.date = tn, an.day = an.days = function(t) {
        if (!this.isValid()) return null != t ? this : NaN;
        var e, n, i = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != t ? (e = t, n = this.localeData(), t = "string" != typeof e ? e : isNaN(e) ? "number" == typeof(e = n.weekdaysParse(e)) ? e : null : parseInt(e, 10), this.add(t - i, "d")) : i
    }, an.weekday = function(t) {
        if (!this.isValid()) return null != t ? this : NaN;
        var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == t ? e : this.add(t - e, "d")
    }, an.isoWeekday = function(t) {
        if (!this.isValid()) return null != t ? this : NaN;
        if (null != t) {
            var e = (n = t, i = this.localeData(), "string" == typeof n ? i.weekdaysParse(n) % 7 || 7 : isNaN(n) ? null : n);
            return this.day(this.day() % 7 ? e : e - 7)
        }
        return this.day() || 7;
        var n, i
    }, an.dayOfYear = function(t) {
        var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == t ? e : this.add(t - e, "d")
    }, an.hour = an.hours = te, an.minute = an.minutes = en, an.second = an.seconds = rn, an.millisecond = an.milliseconds = sn, an.utcOffset = function(t, e, n) {
        var i, r = this._offset || 0;
        if (!this.isValid()) return null != t ? this : NaN;
        if (null != t) {
            if ("string" == typeof t) {
                if (null === (t = Le(ot, t))) return this
            } else Math.abs(t) < 16 && !n && (t *= 60);
            return !this._isUTC && e && (i = Pe(this)), this._offset = t, this._isUTC = !0, null != i && this.add(i, "m"), r !== t && (!e || this._changeInProgress ? Ve(this, Fe(t - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, v.updateOffset(this, !0), this._changeInProgress = null)), this
        }
        return this._isUTC ? r : Pe(this)
    }, an.utc = function(t) {
        return this.utcOffset(0, t)
    }, an.local = function(t) {
        return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Pe(this), "m")), this
    }, an.parseZone = function() {
        if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
        else if ("string" == typeof this._i) {
            var t = Le(rt, this._i);
            null != t ? this.utcOffset(t) : this.utcOffset(0, !0)
        }
        return this
    }, an.hasAlignedHourOffset = function(t) {
        return !!this.isValid() && (t = t ? De(t).utcOffset() : 0, (this.utcOffset() - t) % 60 == 0)
    }, an.isDST = function() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }, an.isLocal = function() {
        return !!this.isValid() && !this._isUTC
    }, an.isUtcOffset = function() {
        return !!this.isValid() && this._isUTC
    }, an.isUtc = He, an.isUTC = He, an.zoneAbbr = function() {
        return this._isUTC ? "UTC" : ""
    }, an.zoneName = function() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }, an.dates = n("dates accessor is deprecated. Use date instead.", tn), an.months = n("months accessor is deprecated. Use month instead", Nt), an.years = n("years accessor is deprecated. Use year instead", Dt), an.zone = n("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(t, e) {
        return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset()
    }), an.isDSTShifted = n("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
        if (!c(this._isDSTShifted)) return this._isDSTShifted;
        var t = {};
        if (_(t, this), (t = Ee(t))._a) {
            var e = t._isUTC ? p(t._a) : De(t._a);
            this._isDSTShifted = this.isValid() && 0 < s(t._a, e.toArray())
        } else this._isDSTShifted = !1;
        return this._isDSTShifted
    });
    var cn = Y.prototype;

    function un(t, e, n, i) {
        var r = le(),
            o = p().set(i, e);
        return r[n](o, t)
    }

    function hn(t, e, n) {
        if (u(t) && (e = t, t = void 0), t = t || "", null != e) return un(t, e, n, "month");
        var i, r = [];
        for (i = 0; i < 12; i++) r[i] = un(t, i, n, "month");
        return r
    }

    function dn(t, e, n, i) {
        "boolean" == typeof t ? u(e) && (n = e, e = void 0) : (e = t, t = !1, u(n = e) && (n = e, e = void 0)), e = e || "";
        var r, o = le(),
            s = t ? o._week.dow : 0;
        if (null != n) return un(e, (n + s) % 7, i, "day");
        var a = [];
        for (r = 0; r < 7; r++) a[r] = un(e, (r + s) % 7, i, "day");
        return a
    }
    cn.calendar = function(t, e, n) {
        var i = this._calendar[t] || this._calendar.sameElse;
        return O(i) ? i.call(e, n) : i
    }, cn.longDateFormat = function(t) {
        var e = this._longDateFormat[t],
            n = this._longDateFormat[t.toUpperCase()];
        return e || !n ? e : (this._longDateFormat[t] = n.replace(/MMMM|MM|DD|dddd/g, function(t) {
            return t.slice(1)
        }), this._longDateFormat[t])
    }, cn.invalidDate = function() {
        return this._invalidDate
    }, cn.ordinal = function(t) {
        return this._ordinal.replace("%d", t)
    }, cn.preparse = ln, cn.postformat = ln, cn.relativeTime = function(t, e, n, i) {
        var r = this._relativeTime[n];
        return O(r) ? r(t, e, n, i) : r.replace(/%d/i, t)
    }, cn.pastFuture = function(t, e) {
        var n = this._relativeTime[0 < t ? "future" : "past"];
        return O(n) ? n(e) : n.replace(/%s/i, e)
    }, cn.set = function(t) {
        var e, n;
        for (n in t) O(e = t[n]) ? this[n] = e : this["_" + n] = e;
        this._config = t, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
    }, cn.months = function(t, e) {
        return t ? a(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || Yt).test(e) ? "format" : "standalone"][t.month()] : a(this._months) ? this._months : this._months.standalone
    }, cn.monthsShort = function(t, e) {
        return t ? a(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[Yt.test(e) ? "format" : "standalone"][t.month()] : a(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
    }, cn.monthsParse = function(t, e, n) {
        var i, r, o;
        if (this._monthsParseExact) return function(t, e, n) {
            var i, r, o, s = t.toLocaleLowerCase();
            if (!this._monthsParse)
                for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], i = 0; i < 12; ++i) o = p([2e3, i]), this._shortMonthsParse[i] = this.monthsShort(o, "").toLocaleLowerCase(), this._longMonthsParse[i] = this.months(o, "").toLocaleLowerCase();
            return n ? "MMM" === e ? -1 !== (r = Tt.call(this._shortMonthsParse, s)) ? r : null : -1 !== (r = Tt.call(this._longMonthsParse, s)) ? r : null : "MMM" === e ? -1 !== (r = Tt.call(this._shortMonthsParse, s)) ? r : -1 !== (r = Tt.call(this._longMonthsParse, s)) ? r : null : -1 !== (r = Tt.call(this._longMonthsParse, s)) ? r : -1 !== (r = Tt.call(this._shortMonthsParse, s)) ? r : null
        }.call(this, t, e, n);
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), i = 0; i < 12; i++) {
            if (r = p([2e3, i]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"), this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")), n || this._monthsParse[i] || (o = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), this._monthsParse[i] = new RegExp(o.replace(".", ""), "i")), n && "MMMM" === e && this._longMonthsParse[i].test(t)) return i;
            if (n && "MMM" === e && this._shortMonthsParse[i].test(t)) return i;
            if (!n && this._monthsParse[i].test(t)) return i
        }
    }, cn.monthsRegex = function(t) {
        return this._monthsParseExact ? (y(this, "_monthsRegex") || Pt.call(this), t ? this._monthsStrictRegex : this._monthsRegex) : (y(this, "_monthsRegex") || (this._monthsRegex = Wt), this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex)
    }, cn.monthsShortRegex = function(t) {
        return this._monthsParseExact ? (y(this, "_monthsRegex") || Pt.call(this), t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (y(this, "_monthsShortRegex") || (this._monthsShortRegex = Lt), this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex)
    }, cn.week = function(t) {
        return Ft(t, this._week.dow, this._week.doy).week
    }, cn.firstDayOfYear = function() {
        return this._week.doy
    }, cn.firstDayOfWeek = function() {
        return this._week.dow
    }, cn.weekdays = function(t, e) {
        return t ? a(this._weekdays) ? this._weekdays[t.day()] : this._weekdays[this._weekdays.isFormat.test(e) ? "format" : "standalone"][t.day()] : a(this._weekdays) ? this._weekdays : this._weekdays.standalone
    }, cn.weekdaysMin = function(t) {
        return t ? this._weekdaysMin[t.day()] : this._weekdaysMin
    }, cn.weekdaysShort = function(t) {
        return t ? this._weekdaysShort[t.day()] : this._weekdaysShort
    }, cn.weekdaysParse = function(t, e, n) {
        var i, r, o;
        if (this._weekdaysParseExact) return function(t, e, n) {
            var i, r, o, s = t.toLocaleLowerCase();
            if (!this._weekdaysParse)
                for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], i = 0; i < 7; ++i) o = p([2e3, 1]).day(i), this._minWeekdaysParse[i] = this.weekdaysMin(o, "").toLocaleLowerCase(), this._shortWeekdaysParse[i] = this.weekdaysShort(o, "").toLocaleLowerCase(), this._weekdaysParse[i] = this.weekdays(o, "").toLocaleLowerCase();
            return n ? "dddd" === e ? -1 !== (r = Tt.call(this._weekdaysParse, s)) ? r : null : "ddd" === e ? -1 !== (r = Tt.call(this._shortWeekdaysParse, s)) ? r : null : -1 !== (r = Tt.call(this._minWeekdaysParse, s)) ? r : null : "dddd" === e ? -1 !== (r = Tt.call(this._weekdaysParse, s)) ? r : -1 !== (r = Tt.call(this._shortWeekdaysParse, s)) ? r : -1 !== (r = Tt.call(this._minWeekdaysParse, s)) ? r : null : "ddd" === e ? -1 !== (r = Tt.call(this._shortWeekdaysParse, s)) ? r : -1 !== (r = Tt.call(this._weekdaysParse, s)) ? r : -1 !== (r = Tt.call(this._minWeekdaysParse, s)) ? r : null : -1 !== (r = Tt.call(this._minWeekdaysParse, s)) ? r : -1 !== (r = Tt.call(this._weekdaysParse, s)) ? r : -1 !== (r = Tt.call(this._shortWeekdaysParse, s)) ? r : null
        }.call(this, t, e, n);
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), i = 0; i < 7; i++) {
            if (r = p([2e3, 1]).day(i), n && !this._fullWeekdaysParse[i] && (this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(r, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(r, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(r, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[i] || (o = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), this._weekdaysParse[i] = new RegExp(o.replace(".", ""), "i")), n && "dddd" === e && this._fullWeekdaysParse[i].test(t)) return i;
            if (n && "ddd" === e && this._shortWeekdaysParse[i].test(t)) return i;
            if (n && "dd" === e && this._minWeekdaysParse[i].test(t)) return i;
            if (!n && this._weekdaysParse[i].test(t)) return i
        }
    }, cn.weekdaysRegex = function(t) {
        return this._weekdaysParseExact ? (y(this, "_weekdaysRegex") || Qt.call(this), t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (y(this, "_weekdaysRegex") || (this._weekdaysRegex = qt), this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex)
    }, cn.weekdaysShortRegex = function(t) {
        return this._weekdaysParseExact ? (y(this, "_weekdaysRegex") || Qt.call(this), t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (y(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Gt), this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
    }, cn.weekdaysMinRegex = function(t) {
        return this._weekdaysParseExact ? (y(this, "_weekdaysRegex") || Qt.call(this), t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (y(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Kt), this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
    }, cn.isPM = function(t) {
        return "p" === (t + "").toLowerCase().charAt(0)
    }, cn.meridiem = function(t, e, n) {
        return 11 < t ? n ? "pm" : "PM" : n ? "am" : "AM"
    }, se("en", {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(t) {
            var e = t % 10;
            return t + (1 === T(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th")
        }
    }), v.lang = n("moment.lang is deprecated. Use moment.locale instead.", se), v.langData = n("moment.langData is deprecated. Use moment.localeData instead.", le);
    var fn = Math.abs;

    function pn(t, e, n, i) {
        var r = Fe(e, n);
        return t._milliseconds += i * r._milliseconds, t._days += i * r._days, t._months += i * r._months, t._bubble()
    }

    function mn(t) {
        return t < 0 ? Math.floor(t) : Math.ceil(t)
    }

    function gn(t) {
        return 4800 * t / 146097
    }

    function _n(t) {
        return 146097 * t / 4800
    }

    function vn(t) {
        return function() {
            return this.as(t)
        }
    }
    var yn = vn("ms"),
        bn = vn("s"),
        wn = vn("m"),
        Sn = vn("h"),
        En = vn("d"),
        Tn = vn("w"),
        Dn = vn("M"),
        kn = vn("y");

    function Cn(t) {
        return function() {
            return this.isValid() ? this._data[t] : NaN
        }
    }
    var On = Cn("milliseconds"),
        Mn = Cn("seconds"),
        Yn = Cn("minutes"),
        An = Cn("hours"),
        In = Cn("days"),
        xn = Cn("months"),
        Nn = Cn("years"),
        Ln = Math.round,
        Wn = {
            ss: 44,
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        },
        Pn = Math.abs;

    function Hn(t) {
        return (0 < t) - (t < 0) || +t
    }

    function Rn() {
        if (!this.isValid()) return this.localeData().invalidDate();
        var t, e, n = Pn(this._milliseconds) / 1e3,
            i = Pn(this._days),
            r = Pn(this._months);
        e = E((t = E(n / 60)) / 60), n %= 60, t %= 60;
        var o = E(r / 12),
            s = r %= 12,
            a = i,
            l = e,
            c = t,
            u = n ? n.toFixed(3).replace(/\.?0+$/, "") : "",
            h = this.asSeconds();
        if (!h) return "P0D";
        var d = h < 0 ? "-" : "",
            f = Hn(this._months) !== Hn(h) ? "-" : "",
            p = Hn(this._days) !== Hn(h) ? "-" : "",
            m = Hn(this._milliseconds) !== Hn(h) ? "-" : "";
        return d + "P" + (o ? f + o + "Y" : "") + (s ? f + s + "M" : "") + (a ? p + a + "D" : "") + (l || c || u ? "T" : "") + (l ? m + l + "H" : "") + (c ? m + c + "M" : "") + (u ? m + u + "S" : "")
    }
    var jn = Ye.prototype;
    return jn.isValid = function() {
        return this._isValid
    }, jn.abs = function() {
        var t = this._data;
        return this._milliseconds = fn(this._milliseconds), this._days = fn(this._days), this._months = fn(this._months), t.milliseconds = fn(t.milliseconds), t.seconds = fn(t.seconds), t.minutes = fn(t.minutes), t.hours = fn(t.hours), t.months = fn(t.months), t.years = fn(t.years), this
    }, jn.add = function(t, e) {
        return pn(this, t, e, 1)
    }, jn.subtract = function(t, e) {
        return pn(this, t, e, -1)
    }, jn.as = function(t) {
        if (!this.isValid()) return NaN;
        var e, n, i = this._milliseconds;
        if ("month" === (t = x(t)) || "year" === t) return e = this._days + i / 864e5, n = this._months + gn(e), "month" === t ? n : n / 12;
        switch (e = this._days + Math.round(_n(this._months)), t) {
            case "week":
                return e / 7 + i / 6048e5;
            case "day":
                return e + i / 864e5;
            case "hour":
                return 24 * e + i / 36e5;
            case "minute":
                return 1440 * e + i / 6e4;
            case "second":
                return 86400 * e + i / 1e3;
            case "millisecond":
                return Math.floor(864e5 * e) + i;
            default:
                throw new Error("Unknown unit " + t)
        }
    }, jn.asMilliseconds = yn, jn.asSeconds = bn, jn.asMinutes = wn, jn.asHours = Sn, jn.asDays = En, jn.asWeeks = Tn, jn.asMonths = Dn, jn.asYears = kn, jn.valueOf = function() {
        return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * T(this._months / 12) : NaN
    }, jn._bubble = function() {
        var t, e, n, i, r, o = this._milliseconds,
            s = this._days,
            a = this._months,
            l = this._data;
        return 0 <= o && 0 <= s && 0 <= a || o <= 0 && s <= 0 && a <= 0 || (o += 864e5 * mn(_n(a) + s), a = s = 0), l.milliseconds = o % 1e3, t = E(o / 1e3), l.seconds = t % 60, e = E(t / 60), l.minutes = e % 60, n = E(e / 60), l.hours = n % 24, a += r = E(gn(s += E(n / 24))), s -= mn(_n(r)), i = E(a / 12), a %= 12, l.days = s, l.months = a, l.years = i, this
    }, jn.clone = function() {
        return Fe(this)
    }, jn.get = function(t) {
        return t = x(t), this.isValid() ? this[t + "s"]() : NaN
    }, jn.milliseconds = On, jn.seconds = Mn, jn.minutes = Yn, jn.hours = An, jn.days = In, jn.weeks = function() {
        return E(this.days() / 7)
    }, jn.months = xn, jn.years = Nn, jn.humanize = function(t) {
        if (!this.isValid()) return this.localeData().invalidDate();
        var e, n, i, r, o, s, a, l, c, u, h = this.localeData(),
            d = (e = !t, n = h, i = Fe(this).abs(), r = Ln(i.as("s")), o = Ln(i.as("m")), s = Ln(i.as("h")), a = Ln(i.as("d")), l = Ln(i.as("M")), c = Ln(i.as("y")), (u = r <= Wn.ss && ["s", r] || r < Wn.s && ["ss", r] || o <= 1 && ["m"] || o < Wn.m && ["mm", o] || s <= 1 && ["h"] || s < Wn.h && ["hh", s] || a <= 1 && ["d"] || a < Wn.d && ["dd", a] || l <= 1 && ["M"] || l < Wn.M && ["MM", l] || c <= 1 && ["y"] || ["yy", c])[2] = e, u[3] = 0 < +this, u[4] = n, function(t, e, n, i, r) {
                return r.relativeTime(e || 1, !!n, t, i)
            }.apply(null, u));
        return t && (d = h.pastFuture(+this, d)), h.postformat(d)
    }, jn.toISOString = Rn, jn.toString = Rn, jn.toJSON = Rn, jn.locale = Qe, jn.localeData = Ze, jn.toIsoString = n("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Rn), jn.lang = ze, U("X", 0, 0, "unix"), U("x", 0, 0, "valueOf"), lt("x", it), lt("X", /[+-]?\d+(\.\d{1,3})?/), ht("X", function(t, e, n) {
        n._d = new Date(1e3 * parseFloat(t, 10))
    }), ht("x", function(t, e, n) {
        n._d = new Date(T(t))
    }), v.version = "2.22.2", t = De, v.fn = an, v.min = function() {
        return Oe("isBefore", [].slice.call(arguments, 0))
    }, v.max = function() {
        return Oe("isAfter", [].slice.call(arguments, 0))
    }, v.now = function() {
        return Date.now ? Date.now() : +new Date
    }, v.utc = p, v.unix = function(t) {
        return De(1e3 * t)
    }, v.months = function(t, e) {
        return hn(t, e, "months")
    }, v.isDate = h, v.locale = se, v.invalid = g, v.duration = Fe, v.isMoment = S, v.weekdays = function(t, e, n) {
        return dn(t, e, n, "weekdays")
    }, v.parseZone = function() {
        return De.apply(null, arguments).parseZone()
    }, v.localeData = le, v.isDuration = Ae, v.monthsShort = function(t, e) {
        return hn(t, e, "monthsShort")
    }, v.weekdaysMin = function(t, e, n) {
        return dn(t, e, n, "weekdaysMin")
    }, v.defineLocale = ae, v.updateLocale = function(t, e) {
        if (null != e) {
            var n, i, r = ee;
            null != (i = oe(t)) && (r = i._config), (n = new Y(e = M(r, e))).parentLocale = ne[t], ne[t] = n, se(t)
        } else null != ne[t] && (null != ne[t].parentLocale ? ne[t] = ne[t].parentLocale : null != ne[t] && delete ne[t]);
        return ne[t]
    }, v.locales = function() {
        return i(ne)
    }, v.weekdaysShort = function(t, e, n) {
        return dn(t, e, n, "weekdaysShort")
    }, v.normalizeUnits = x, v.relativeTimeRounding = function(t) {
        return void 0 === t ? Ln : "function" == typeof t && (Ln = t, !0)
    }, v.relativeTimeThreshold = function(t, e) {
        return void 0 !== Wn[t] && (void 0 === e ? Wn[t] : (Wn[t] = e, "s" === t && (Wn.ss = e - 1), !0))
    }, v.calendarFormat = function(t, e) {
        var n = t.diff(e, "days", !0);
        return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse"
    }, v.prototype = an, v.HTML5_FMT = {
        DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
        DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
        DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
        DATE: "YYYY-MM-DD",
        TIME: "HH:mm",
        TIME_SECONDS: "HH:mm:ss",
        TIME_MS: "HH:mm:ss.SSS",
        WEEK: "YYYY-[W]WW",
        MONTH: "YYYY-MM"
    }, v
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("popper.js")) : "function" == typeof define && define.amd ? define(["popper.js"], e) : t.Tooltip = e(t.Popper)
}(this, function(o) {
    "use strict";
    o = o && o.hasOwnProperty("default") ? o.default : o;
    var t = function() {
            function i(t, e) {
                for (var n, i = 0; i < e.length; i++)(n = e[i]).enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
            }
            return function(t, e, n) {
                return e && i(t.prototype, e), n && i(t, n), t
            }
        }(),
        s = Object.assign || function(t) {
            for (var e, n = 1; n < arguments.length; n++)
                for (var i in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t
        },
        r = {
            container: !1,
            delay: 0,
            html: !1,
            placement: "top",
            title: "",
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            offset: 0,
            arrowSelector: ".tooltip-arrow, .tooltip__arrow",
            innerSelector: ".tooltip-inner, .tooltip__inner"
        },
        e = function() {
            function i(t, e) {
                (function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                })(this, i), a.call(this), e = s({}, r, e), t.jquery && (t = t[0]), this.reference = t;
                var n = "string" == typeof(this.options = e).trigger ? e.trigger.split(" ").filter(function(t) {
                    return -1 !== ["click", "hover", "focus"].indexOf(t)
                }) : [];
                this._isOpen = !1, this._popperOptions = {}, this._setEventListeners(t, n, e)
            }
            return t(i, [{
                key: "_create",
                value: function(t, e, n, i) {
                    var r = window.document.createElement("div");
                    r.innerHTML = e.trim();
                    var o = r.childNodes[0];
                    o.id = "tooltip_" + Math.random().toString(36).substr(2, 10), o.setAttribute("aria-hidden", "false");
                    var s = r.querySelector(this.options.innerSelector);
                    return this._addTitleContent(t, n, i, s), o
                }
            }, {
                key: "_addTitleContent",
                value: function(t, e, n, i) {
                    if (1 === e.nodeType || 11 === e.nodeType) n && i.appendChild(e);
                    else if ((o = e) && "[object Function]" === {}.toString.call(o)) {
                        var r = e.call(t);
                        n ? i.innerHTML = r : i.textContent = r
                    } else n ? i.innerHTML = e : i.textContent = e;
                    var o
                }
            }, {
                key: "_show",
                value: function(t, e) {
                    if (this._isOpen && !this._isOpening) return this;
                    if (this._isOpen = !0, this._tooltipNode) return this._tooltipNode.style.visibility = "visible", this._tooltipNode.setAttribute("aria-hidden", "false"), this.popperInstance.update(), this;
                    var n = t.getAttribute("title") || e.title;
                    if (!n) return this;
                    var i = this._create(t, e.template, n, e.html);
                    t.setAttribute("aria-describedby", i.id);
                    var r = this._findContainer(e.container, t);
                    return this._append(i, r), this._popperOptions = s({}, e.popperOptions, {
                        placement: e.placement
                    }), this._popperOptions.modifiers = s({}, this._popperOptions.modifiers, {
                        arrow: {
                            element: this.options.arrowSelector
                        },
                        offset: {
                            offset: e.offset
                        }
                    }), e.boundariesElement && (this._popperOptions.modifiers.preventOverflow = {
                        boundariesElement: e.boundariesElement
                    }), this.popperInstance = new o(t, i, this._popperOptions), this._tooltipNode = i, this
                }
            }, {
                key: "_hide",
                value: function() {
                    return this._isOpen && (this._isOpen = !1, this._tooltipNode.style.visibility = "hidden", this._tooltipNode.setAttribute("aria-hidden", "true")), this
                }
            }, {
                key: "_dispose",
                value: function() {
                    var i = this;
                    return this._events.forEach(function(t) {
                        var e = t.func,
                            n = t.event;
                        i.reference.removeEventListener(n, e)
                    }), this._events = [], this._tooltipNode && (this._hide(), this.popperInstance.destroy(), !this.popperInstance.options.removeOnDestroy && (this._tooltipNode.parentNode.removeChild(this._tooltipNode), this._tooltipNode = null)), this
                }
            }, {
                key: "_findContainer",
                value: function(t, e) {
                    return "string" == typeof t ? t = window.document.querySelector(t) : !1 === t && (t = e.parentNode), t
                }
            }, {
                key: "_append",
                value: function(t, e) {
                    e.appendChild(t)
                }
            }, {
                key: "_setEventListeners",
                value: function(i, t, r) {
                    var o = this,
                        e = [],
                        n = [];
                    t.forEach(function(t) {
                        "hover" === t ? (e.push("mouseenter"), n.push("mouseleave")) : "focus" === t ? (e.push("focus"), n.push("blur")) : "click" === t && (e.push("click"), n.push("click"))
                    }), e.forEach(function(t) {
                        var e = function(t) {
                            !0 === o._isOpening || (t.usedByTooltip = !0, o._scheduleShow(i, r.delay, r, t))
                        };
                        o._events.push({
                            event: t,
                            func: e
                        }), i.addEventListener(t, e)
                    }), n.forEach(function(t) {
                        var n = function(t) {
                            !0 === t.usedByTooltip || o._scheduleHide(i, r.delay, r, t)
                        };
                        o._events.push({
                            event: t,
                            func: n
                        }), i.addEventListener(t, n), "click" === t && r.closeOnClickOutside && document.addEventListener("mousedown", function(t) {
                            if (o._isOpening) {
                                var e = o.popperInstance.popper;
                                i.contains(t.target) || e.contains(t.target) || n(t)
                            }
                        }, !0)
                    })
                }
            }, {
                key: "_scheduleShow",
                value: function(t, e, n) {
                    var i = this;
                    this._isOpening = !0;
                    var r = e && e.show || e || 0;
                    this._showTimeout = window.setTimeout(function() {
                        return i._show(t, n)
                    }, r)
                }
            }, {
                key: "_scheduleHide",
                value: function(t, e, n, i) {
                    var r = this;
                    this._isOpening = !1;
                    var o = e && e.hide || e || 0;
                    window.setTimeout(function() {
                        if (window.clearTimeout(r._showTimeout), !1 !== r._isOpen && document.body.contains(r._tooltipNode)) {
                            if ("mouseleave" === i.type)
                                if (r._setTooltipNodeEvent(i, t, e, n)) return;
                            r._hide(t, n)
                        }
                    }, o)
                }
            }, {
                key: "_updateTitleContent",
                value: function(t) {
                    if (void 0 !== this._tooltipNode) {
                        var e = this._tooltipNode.parentNode.querySelector(this.options.innerSelector);
                        this._clearTitleContent(e, this.options.html, this.reference.getAttribute("title") || this.options.title), this._addTitleContent(this.reference, t, this.options.html, e), this.options.title = t, this.popperInstance.update()
                    } else void 0 !== this.options.title && (this.options.title = t)
                }
            }, {
                key: "_clearTitleContent",
                value: function(t, e, n) {
                    1 === n.nodeType || 11 === n.nodeType ? e && t.removeChild(n) : e ? t.innerHTML = "" : t.textContent = ""
                }
            }]), i
        }(),
        a = function() {
            var s = this;
            this.show = function() {
                return s._show(s.reference, s.options)
            }, this.hide = function() {
                return s._hide()
            }, this.dispose = function() {
                return s._dispose()
            }, this.toggle = function() {
                return s._isOpen ? s.hide() : s.show()
            }, this.updateTitleContent = function(t) {
                return s._updateTitleContent(t)
            }, this._events = [], this._setTooltipNodeEvent = function(i, r, t, o) {
                var e = i.relatedreference || i.toElement || i.relatedTarget;
                return !!s._tooltipNode.contains(e) && (s._tooltipNode.addEventListener(i.type, function t(e) {
                    var n = e.relatedreference || e.toElement || e.relatedTarget;
                    s._tooltipNode.removeEventListener(i.type, t), r.contains(n) || s._scheduleHide(r, o.delay, o, e)
                }), !0)
            }
        };
    return e
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.PerfectScrollbar = e()
}(this, function() {
    "use strict";

    function _(t) {
        return getComputedStyle(t)
    }

    function d(t, e) {
        for (var n in e) {
            var i = e[n];
            "number" == typeof i && (i += "px"), t.style[n] = i
        }
        return t
    }

    function f(t) {
        var e = document.createElement("div");
        return e.className = t, e
    }
    var n = "undefined" != typeof Element && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);

    function a(t, e) {
        if (!n) throw new Error("No element matching method supported");
        return n.call(t, e)
    }

    function i(t) {
        t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t)
    }

    function r(t, e) {
        return Array.prototype.filter.call(t.children, function(t) {
            return a(t, e)
        })
    }
    var v = {
            main: "ps",
            element: {
                thumb: function(t) {
                    return "ps__thumb-" + t
                },
                rail: function(t) {
                    return "ps__rail-" + t
                },
                consuming: "ps__child--consume"
            },
            state: {
                focus: "ps--focus",
                clicking: "ps--clicking",
                active: function(t) {
                    return "ps--active-" + t
                },
                scrolling: function(t) {
                    return "ps--scrolling-" + t
                }
            }
        },
        o = {
            x: null,
            y: null
        };

    function y(t, e) {
        var n = t.element.classList,
            i = v.state.scrolling(e);
        n.contains(i) ? clearTimeout(o[e]) : n.add(i)
    }

    function b(t, e) {
        o[e] = setTimeout(function() {
            return t.isAlive && t.element.classList.remove(v.state.scrolling(e))
        }, t.settings.scrollingThreshold)
    }
    var s = function(t) {
            this.element = t, this.handlers = {}
        },
        t = {
            isEmpty: {
                configurable: !0
            }
        };
    s.prototype.bind = function(t, e) {
        void 0 === this.handlers[t] && (this.handlers[t] = []), this.handlers[t].push(e), this.element.addEventListener(t, e, !1)
    }, s.prototype.unbind = function(e, n) {
        var i = this;
        this.handlers[e] = this.handlers[e].filter(function(t) {
            return !(!n || t === n) || (i.element.removeEventListener(e, t, !1), !1)
        })
    }, s.prototype.unbindAll = function() {
        for (var t in this.handlers) this.unbind(t)
    }, t.isEmpty.get = function() {
        var e = this;
        return Object.keys(this.handlers).every(function(t) {
            return 0 === e.handlers[t].length
        })
    }, Object.defineProperties(s.prototype, t);
    var p = function() {
        this.eventElements = []
    };

    function m(t) {
        if ("function" == typeof window.CustomEvent) return new CustomEvent(t);
        var e = document.createEvent("CustomEvent");
        return e.initCustomEvent(t, !1, !1, void 0), e
    }
    p.prototype.eventElement = function(e) {
        var t = this.eventElements.filter(function(t) {
            return t.element === e
        })[0];
        return t || (t = new s(e), this.eventElements.push(t)), t
    }, p.prototype.bind = function(t, e, n) {
        this.eventElement(t).bind(e, n)
    }, p.prototype.unbind = function(t, e, n) {
        var i = this.eventElement(t);
        i.unbind(e, n), i.isEmpty && this.eventElements.splice(this.eventElements.indexOf(i), 1)
    }, p.prototype.unbindAll = function() {
        this.eventElements.forEach(function(t) {
            return t.unbindAll()
        }), this.eventElements = []
    }, p.prototype.once = function(t, e, n) {
        var i = this.eventElement(t),
            r = function(t) {
                i.unbind(e, r), n(t)
            };
        i.bind(e, r)
    };
    var e = function(t, e, n, i, r) {
        var o;
        if (void 0 === i && (i = !0), void 0 === r && (r = !1), "top" === e) o = ["contentHeight", "containerHeight", "scrollTop", "y", "up", "down"];
        else {
            if ("left" !== e) throw new Error("A proper axis should be provided");
            o = ["contentWidth", "containerWidth", "scrollLeft", "x", "left", "right"]
        }! function(t, e, n, i, r) {
            var o = n[0],
                s = n[1],
                a = n[2],
                l = n[3],
                c = n[4],
                u = n[5];
            void 0 === i && (i = !0);
            void 0 === r && (r = !1);
            var h = t.element;
            t.reach[l] = null, h[a] < 1 && (t.reach[l] = "start");
            h[a] > t[o] - t[s] - 1 && (t.reach[l] = "end");
            e && (h.dispatchEvent(m("ps-scroll-" + l)), e < 0 ? h.dispatchEvent(m("ps-scroll-" + c)) : 0 < e && h.dispatchEvent(m("ps-scroll-" + u)), i && (y(d = t, f = l), b(d, f)));
            var d, f;
            t.reach[l] && (e || r) && h.dispatchEvent(m("ps-" + l + "-reach-" + t.reach[l]))
        }(t, n, o, i, r)
    };

    function g(t) {
        return parseInt(t, 10) || 0
    }
    var w = {
            isWebKit: "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style,
            supportsTouch: "undefined" != typeof window && ("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
            supportsIePointer: "undefined" != typeof navigator && navigator.msMaxTouchPoints,
            isChrome: "undefined" != typeof navigator && /Chrome/i.test(navigator && navigator.userAgent)
        },
        S = function(t) {
            var e = t.element,
                n = Math.floor(e.scrollTop);
            t.containerWidth = e.clientWidth, t.containerHeight = e.clientHeight, t.contentWidth = e.scrollWidth, t.contentHeight = e.scrollHeight, e.contains(t.scrollbarXRail) || (r(e, v.element.rail("x")).forEach(function(t) {
                    return i(t)
                }), e.appendChild(t.scrollbarXRail)), e.contains(t.scrollbarYRail) || (r(e, v.element.rail("y")).forEach(function(t) {
                    return i(t)
                }), e.appendChild(t.scrollbarYRail)), !t.settings.suppressScrollX && t.containerWidth + t.settings.scrollXMarginOffset < t.contentWidth ? (t.scrollbarXActive = !0, t.railXWidth = t.containerWidth - t.railXMarginWidth, t.railXRatio = t.containerWidth / t.railXWidth, t.scrollbarXWidth = l(t, g(t.railXWidth * t.containerWidth / t.contentWidth)), t.scrollbarXLeft = g((t.negativeScrollAdjustment + e.scrollLeft) * (t.railXWidth - t.scrollbarXWidth) / (t.contentWidth - t.containerWidth))) : t.scrollbarXActive = !1, !t.settings.suppressScrollY && t.containerHeight + t.settings.scrollYMarginOffset < t.contentHeight ? (t.scrollbarYActive = !0, t.railYHeight = t.containerHeight - t.railYMarginHeight, t.railYRatio = t.containerHeight / t.railYHeight, t.scrollbarYHeight = l(t, g(t.railYHeight * t.containerHeight / t.contentHeight)), t.scrollbarYTop = g(n * (t.railYHeight - t.scrollbarYHeight) / (t.contentHeight - t.containerHeight))) : t.scrollbarYActive = !1, t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth && (t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth), t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight && (t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight),
                function(t, e) {
                    var n = {
                            width: e.railXWidth
                        },
                        i = Math.floor(t.scrollTop);
                    e.isRtl ? n.left = e.negativeScrollAdjustment + t.scrollLeft + e.containerWidth - e.contentWidth : n.left = t.scrollLeft;
                    e.isScrollbarXUsingBottom ? n.bottom = e.scrollbarXBottom - i : n.top = e.scrollbarXTop + i;
                    d(e.scrollbarXRail, n);
                    var r = {
                        top: i,
                        height: e.railYHeight
                    };
                    e.isScrollbarYUsingRight ? e.isRtl ? r.right = e.contentWidth - (e.negativeScrollAdjustment + t.scrollLeft) - e.scrollbarYRight - e.scrollbarYOuterWidth : r.right = e.scrollbarYRight - t.scrollLeft : e.isRtl ? r.left = e.negativeScrollAdjustment + t.scrollLeft + 2 * e.containerWidth - e.contentWidth - e.scrollbarYLeft - e.scrollbarYOuterWidth : r.left = e.scrollbarYLeft + t.scrollLeft;
                    d(e.scrollbarYRail, r), d(e.scrollbarX, {
                        left: e.scrollbarXLeft,
                        width: e.scrollbarXWidth - e.railBorderXWidth
                    }), d(e.scrollbarY, {
                        top: e.scrollbarYTop,
                        height: e.scrollbarYHeight - e.railBorderYWidth
                    })
                }(e, t), t.scrollbarXActive ? e.classList.add(v.state.active("x")) : (e.classList.remove(v.state.active("x")), t.scrollbarXWidth = 0, t.scrollbarXLeft = 0, e.scrollLeft = 0), t.scrollbarYActive ? e.classList.add(v.state.active("y")) : (e.classList.remove(v.state.active("y")), t.scrollbarYHeight = 0, t.scrollbarYTop = 0, e.scrollTop = 0)
        };

    function l(t, e) {
        return t.settings.minScrollbarLength && (e = Math.max(e, t.settings.minScrollbarLength)), t.settings.maxScrollbarLength && (e = Math.min(e, t.settings.maxScrollbarLength)), e
    }

    function c(e, t) {
        var n = t[0],
            i = t[1],
            r = t[2],
            o = t[3],
            s = t[4],
            a = t[5],
            l = t[6],
            c = t[7],
            u = t[8],
            h = e.element,
            d = null,
            f = null,
            p = null;

        function m(t) {
            h[l] = d + p * (t[r] - f), y(e, c), S(e), t.stopPropagation(), t.preventDefault()
        }

        function g() {
            b(e, c), e[u].classList.remove(v.state.clicking), e.event.unbind(e.ownerDocument, "mousemove", m)
        }
        e.event.bind(e[s], "mousedown", function(t) {
            d = h[l], f = t[r], p = (e[i] - e[n]) / (e[o] - e[a]), e.event.bind(e.ownerDocument, "mousemove", m), e.event.once(e.ownerDocument, "mouseup", g), e[u].classList.add(v.state.clicking), t.stopPropagation(), t.preventDefault()
        })
    }
    var E = {
            "click-rail": function(n) {
                n.event.bind(n.scrollbarY, "mousedown", function(t) {
                    return t.stopPropagation()
                }), n.event.bind(n.scrollbarYRail, "mousedown", function(t) {
                    var e = t.pageY - window.pageYOffset - n.scrollbarYRail.getBoundingClientRect().top > n.scrollbarYTop ? 1 : -1;
                    n.element.scrollTop += e * n.containerHeight, S(n), t.stopPropagation()
                }), n.event.bind(n.scrollbarX, "mousedown", function(t) {
                    return t.stopPropagation()
                }), n.event.bind(n.scrollbarXRail, "mousedown", function(t) {
                    var e = t.pageX - window.pageXOffset - n.scrollbarXRail.getBoundingClientRect().left > n.scrollbarXLeft ? 1 : -1;
                    n.element.scrollLeft += e * n.containerWidth, S(n), t.stopPropagation()
                })
            },
            "drag-thumb": function(t) {
                c(t, ["containerWidth", "contentWidth", "pageX", "railXWidth", "scrollbarX", "scrollbarXWidth", "scrollLeft", "x", "scrollbarXRail"]), c(t, ["containerHeight", "contentHeight", "pageY", "railYHeight", "scrollbarY", "scrollbarYHeight", "scrollTop", "y", "scrollbarYRail"])
            },
            keyboard: function(o) {
                var s = o.element;
                o.event.bind(o.ownerDocument, "keydown", function(t) {
                    if (!(t.isDefaultPrevented && t.isDefaultPrevented() || t.defaultPrevented) && (a(s, ":hover") || a(o.scrollbarX, ":focus") || a(o.scrollbarY, ":focus"))) {
                        var e, n = document.activeElement ? document.activeElement : o.ownerDocument.activeElement;
                        if (n) {
                            if ("IFRAME" === n.tagName) n = n.contentDocument.activeElement;
                            else
                                for (; n.shadowRoot;) n = n.shadowRoot.activeElement;
                            if (a(e = n, "input,[contenteditable]") || a(e, "select,[contenteditable]") || a(e, "textarea,[contenteditable]") || a(e, "button,[contenteditable]")) return
                        }
                        var i = 0,
                            r = 0;
                        switch (t.which) {
                            case 37:
                                i = t.metaKey ? -o.contentWidth : t.altKey ? -o.containerWidth : -30;
                                break;
                            case 38:
                                r = t.metaKey ? o.contentHeight : t.altKey ? o.containerHeight : 30;
                                break;
                            case 39:
                                i = t.metaKey ? o.contentWidth : t.altKey ? o.containerWidth : 30;
                                break;
                            case 40:
                                r = t.metaKey ? -o.contentHeight : t.altKey ? -o.containerHeight : -30;
                                break;
                            case 32:
                                r = t.shiftKey ? o.containerHeight : -o.containerHeight;
                                break;
                            case 33:
                                r = o.containerHeight;
                                break;
                            case 34:
                                r = -o.containerHeight;
                                break;
                            case 36:
                                r = o.contentHeight;
                                break;
                            case 35:
                                r = -o.contentHeight;
                                break;
                            default:
                                return
                        }
                        o.settings.suppressScrollX && 0 !== i || o.settings.suppressScrollY && 0 !== r || (s.scrollTop -= r, s.scrollLeft += i, S(o), function(t, e) {
                            var n = Math.floor(s.scrollTop);
                            if (0 === t) {
                                if (!o.scrollbarYActive) return !1;
                                if (0 === n && 0 < e || n >= o.contentHeight - o.containerHeight && e < 0) return !o.settings.wheelPropagation
                            }
                            var i = s.scrollLeft;
                            if (0 === e) {
                                if (!o.scrollbarXActive) return !1;
                                if (0 === i && t < 0 || i >= o.contentWidth - o.containerWidth && 0 < t) return !o.settings.wheelPropagation
                            }
                            return !0
                        }(i, r) && t.preventDefault())
                    }
                })
            },
            wheel: function(m) {
                var g = m.element;

                function t(t) {
                    var e, n, i, r = (n = (e = t).deltaX, i = -1 * e.deltaY, void 0 !== n && void 0 !== i || (n = -1 * e.wheelDeltaX / 6, i = e.wheelDeltaY / 6), e.deltaMode && 1 === e.deltaMode && (n *= 10, i *= 10), n != n && i != i && (n = 0, i = e.wheelDelta), e.shiftKey ? [-i, -n] : [n, i]),
                        o = r[0],
                        s = r[1];
                    if (! function(t, e, n) {
                            if (!w.isWebKit && g.querySelector("select:focus")) return !0;
                            if (!g.contains(t)) return !1;
                            for (var i = t; i && i !== g;) {
                                if (i.classList.contains(v.element.consuming)) return !0;
                                var r = _(i);
                                if ([r.overflow, r.overflowX, r.overflowY].join("").match(/(scroll|auto)/)) {
                                    var o = i.scrollHeight - i.clientHeight;
                                    if (0 < o && !(0 === i.scrollTop && 0 < n || i.scrollTop === o && n < 0)) return !0;
                                    var s = i.scrollWidth - i.clientWidth;
                                    if (0 < s && !(0 === i.scrollLeft && e < 0 || i.scrollLeft === s && 0 < e)) return !0
                                }
                                i = i.parentNode
                            }
                            return !1
                        }(t.target, o, s)) {
                        var a, l, c, u, h, d, f, p = !1;
                        m.settings.useBothWheelAxes ? m.scrollbarYActive && !m.scrollbarXActive ? (s ? g.scrollTop -= s * m.settings.wheelSpeed : g.scrollTop += o * m.settings.wheelSpeed, p = !0) : m.scrollbarXActive && !m.scrollbarYActive && (o ? g.scrollLeft += o * m.settings.wheelSpeed : g.scrollLeft -= s * m.settings.wheelSpeed, p = !0) : (g.scrollTop -= s * m.settings.wheelSpeed, g.scrollLeft += o * m.settings.wheelSpeed), S(m), (p = p || (a = o, l = s, c = Math.floor(g.scrollTop), u = 0 === g.scrollTop, h = c + g.offsetHeight === g.scrollHeight, d = 0 === g.scrollLeft, f = g.scrollLeft + g.offsetWidth === g.scrollWidth, !(Math.abs(l) > Math.abs(a) ? u || h : d || f) || !m.settings.wheelPropagation)) && !t.ctrlKey && (t.stopPropagation(), t.preventDefault())
                    }
                }
                void 0 !== window.onwheel ? m.event.bind(g, "wheel", t) : void 0 !== window.onmousewheel && m.event.bind(g, "mousewheel", t)
            },
            touch: function(a) {
                if (w.supportsTouch || w.supportsIePointer) {
                    var l = a.element,
                        c = {},
                        u = 0,
                        h = {},
                        n = null;
                    w.supportsTouch ? (a.event.bind(l, "touchstart", t), a.event.bind(l, "touchmove", e), a.event.bind(l, "touchend", i)) : w.supportsIePointer && (window.PointerEvent ? (a.event.bind(l, "pointerdown", t), a.event.bind(l, "pointermove", e), a.event.bind(l, "pointerup", i)) : window.MSPointerEvent && (a.event.bind(l, "MSPointerDown", t), a.event.bind(l, "MSPointerMove", e), a.event.bind(l, "MSPointerUp", i)))
                }

                function d(t, e) {
                    l.scrollTop -= e, l.scrollLeft -= t, S(a)
                }

                function f(t) {
                    return t.targetTouches ? t.targetTouches[0] : t
                }

                function p(t) {
                    return !(t.pointerType && "pen" === t.pointerType && 0 === t.buttons || (!t.targetTouches || 1 !== t.targetTouches.length) && (!t.pointerType || "mouse" === t.pointerType || t.pointerType === t.MSPOINTER_TYPE_MOUSE))
                }

                function t(t) {
                    if (p(t)) {
                        var e = f(t);
                        c.pageX = e.pageX, c.pageY = e.pageY, u = (new Date).getTime(), null !== n && clearInterval(n)
                    }
                }

                function e(t) {
                    if (p(t)) {
                        var e = f(t),
                            n = {
                                pageX: e.pageX,
                                pageY: e.pageY
                            },
                            i = n.pageX - c.pageX,
                            r = n.pageY - c.pageY;
                        if (function(t, e, n) {
                                if (!l.contains(t)) return !1;
                                for (var i = t; i && i !== l;) {
                                    if (i.classList.contains(v.element.consuming)) return !0;
                                    var r = _(i);
                                    if ([r.overflow, r.overflowX, r.overflowY].join("").match(/(scroll|auto)/)) {
                                        var o = i.scrollHeight - i.clientHeight;
                                        if (0 < o && !(0 === i.scrollTop && 0 < n || i.scrollTop === o && n < 0)) return !0;
                                        var s = i.scrollLeft - i.clientWidth;
                                        if (0 < s && !(0 === i.scrollLeft && e < 0 || i.scrollLeft === s && 0 < e)) return !0
                                    }
                                    i = i.parentNode
                                }
                                return !1
                            }(t.target, i, r)) return;
                        d(i, r), c = n;
                        var o = (new Date).getTime(),
                            s = o - u;
                        0 < s && (h.x = i / s, h.y = r / s, u = o),
                            function(t, e) {
                                var n = Math.floor(l.scrollTop),
                                    i = l.scrollLeft,
                                    r = Math.abs(t),
                                    o = Math.abs(e);
                                if (r < o) {
                                    if (e < 0 && n === a.contentHeight - a.containerHeight || 0 < e && 0 === n) return 0 === window.scrollY && 0 < e && w.isChrome
                                } else if (o < r && (t < 0 && i === a.contentWidth - a.containerWidth || 0 < t && 0 === i)) return !0;
                                return !0
                            }(i, r) && t.preventDefault()
                    }
                }

                function i() {
                    a.settings.swipeEasing && (clearInterval(n), n = setInterval(function() {
                        a.isInitialized ? clearInterval(n) : h.x || h.y ? Math.abs(h.x) < .01 && Math.abs(h.y) < .01 ? clearInterval(n) : (d(30 * h.x, 30 * h.y), h.x *= .8, h.y *= .8) : clearInterval(n)
                    }, 10))
                }
            }
        },
        u = function(t, e) {
            var n = this;
            if (void 0 === e && (e = {}), "string" == typeof t && (t = document.querySelector(t)), !t || !t.nodeName) throw new Error("no element is specified to initialize PerfectScrollbar");
            for (var i in (this.element = t).classList.add(v.main), this.settings = {
                    handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
                    maxScrollbarLength: null,
                    minScrollbarLength: null,
                    scrollingThreshold: 1e3,
                    scrollXMarginOffset: 0,
                    scrollYMarginOffset: 0,
                    suppressScrollX: !1,
                    suppressScrollY: !1,
                    swipeEasing: !0,
                    useBothWheelAxes: !1,
                    wheelPropagation: !0,
                    wheelSpeed: 1
                }, e) n.settings[i] = e[i];
            this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null;
            var r, o, s = function() {
                    return t.classList.add(v.state.focus)
                },
                a = function() {
                    return t.classList.remove(v.state.focus)
                };
            this.isRtl = "rtl" === _(t).direction, this.isNegativeScroll = (o = t.scrollLeft, t.scrollLeft = -1, r = t.scrollLeft < 0, t.scrollLeft = o, r), this.negativeScrollAdjustment = this.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, this.event = new p, this.ownerDocument = t.ownerDocument || document, this.scrollbarXRail = f(v.element.rail("x")), t.appendChild(this.scrollbarXRail), this.scrollbarX = f(v.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", s), this.event.bind(this.scrollbarX, "blur", a), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;
            var l = _(this.scrollbarXRail);
            this.scrollbarXBottom = parseInt(l.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1, this.scrollbarXTop = g(l.top)) : this.isScrollbarXUsingBottom = !0, this.railBorderXWidth = g(l.borderLeftWidth) + g(l.borderRightWidth), d(this.scrollbarXRail, {
                display: "block"
            }), this.railXMarginWidth = g(l.marginLeft) + g(l.marginRight), d(this.scrollbarXRail, {
                display: ""
            }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = f(v.element.rail("y")), t.appendChild(this.scrollbarYRail), this.scrollbarY = f(v.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", s), this.event.bind(this.scrollbarY, "blur", a), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;
            var c, u, h = _(this.scrollbarYRail);
            this.scrollbarYRight = parseInt(h.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1, this.scrollbarYLeft = g(h.left)) : this.isScrollbarYUsingRight = !0, this.scrollbarYOuterWidth = this.isRtl ? (c = this.scrollbarY, g((u = _(c)).width) + g(u.paddingLeft) + g(u.paddingRight) + g(u.borderLeftWidth) + g(u.borderRightWidth)) : null, this.railBorderYWidth = g(h.borderTopWidth) + g(h.borderBottomWidth), d(this.scrollbarYRail, {
                display: "block"
            }), this.railYMarginHeight = g(h.marginTop) + g(h.marginBottom), d(this.scrollbarYRail, {
                display: ""
            }), this.railYHeight = null, this.railYRatio = null, this.reach = {
                x: t.scrollLeft <= 0 ? "start" : t.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
                y: t.scrollTop <= 0 ? "start" : t.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
            }, this.isAlive = !0, this.settings.handlers.forEach(function(t) {
                return E[t](n)
            }), this.lastScrollTop = Math.floor(t.scrollTop), this.lastScrollLeft = t.scrollLeft, this.event.bind(this.element, "scroll", function(t) {
                return n.onScroll(t)
            }), S(this)
        };
    return u.prototype.update = function() {
        this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, d(this.scrollbarXRail, {
            display: "block"
        }), d(this.scrollbarYRail, {
            display: "block"
        }), this.railXMarginWidth = g(_(this.scrollbarXRail).marginLeft) + g(_(this.scrollbarXRail).marginRight), this.railYMarginHeight = g(_(this.scrollbarYRail).marginTop) + g(_(this.scrollbarYRail).marginBottom), d(this.scrollbarXRail, {
            display: "none"
        }), d(this.scrollbarYRail, {
            display: "none"
        }), S(this), e(this, "top", 0, !1, !0), e(this, "left", 0, !1, !0), d(this.scrollbarXRail, {
            display: ""
        }), d(this.scrollbarYRail, {
            display: ""
        }))
    }, u.prototype.onScroll = function(t) {
        this.isAlive && (S(this), e(this, "top", this.element.scrollTop - this.lastScrollTop), e(this, "left", this.element.scrollLeft - this.lastScrollLeft), this.lastScrollTop = Math.floor(this.element.scrollTop), this.lastScrollLeft = this.element.scrollLeft)
    }, u.prototype.destroy = function() {
        this.isAlive && (this.event.unbindAll(), i(this.scrollbarX), i(this.scrollbarY), i(this.scrollbarXRail), i(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = !1)
    }, u.prototype.removePsClasses = function() {
        this.element.className = this.element.className.split(" ").filter(function(t) {
            return !t.match(/^ps([-_].+|)$/)
        }).join(" ")
    }, u
}),
function(t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.wNumb = t()
}(function() {
    "use strict";
    var o = ["decimals", "thousand", "mark", "prefix", "suffix", "encoder", "decoder", "negativeBefore", "negative", "edit", "undo"];

    function b(t) {
        return t.split("").reverse().join("")
    }

    function m(t, e) {
        return t.substring(0, e.length) === e
    }

    function s(t, e, n) {
        if ((t[e] || t[n]) && t[e] === t[n]) throw new Error(e)
    }

    function w(t) {
        return "number" == typeof t && isFinite(t)
    }

    function n(t, e, n, i, r, o, s, a, l, c, u, h) {
        var d, f, p, m, g, _ = h,
            v = "",
            y = "";
        return o && (h = o(h)), !!w(h) && (!1 !== t && 0 === parseFloat(h.toFixed(t)) && (h = 0), h < 0 && (d = !0, h = Math.abs(h)), !1 !== t && (g = t, m = (m = h).toString().split("e"), h = (+((m = (m = Math.round(+(m[0] + "e" + (m[1] ? +m[1] + g : g)))).toString().split("e"))[0] + "e" + (m[1] ? +m[1] - g : -g))).toFixed(g)), -1 !== (h = h.toString()).indexOf(".") ? (p = (f = h.split("."))[0], n && (v = n + f[1])) : p = h, e && (p = b((p = b(p).match(/.{1,3}/g)).join(b(e)))), d && a && (y += a), i && (y += i), d && l && (y += l), y += p, y += v, r && (y += r), c && (y = c(y, _)), y)
    }

    function i(t, e, n, i, r, o, s, a, l, c, u, h) {
        var d, f, p = "";
        return u && (h = u(h)), !(!h || "string" != typeof h) && (a && m(h, a) && (h = h.replace(a, ""), d = !0), i && m(h, i) && (h = h.replace(i, "")), l && m(h, l) && (h = h.replace(l, ""), d = !0), r && (f = r, h.slice(-1 * f.length) === f) && (h = h.slice(0, -1 * r.length)), e && (h = h.split(e).join("")), n && (h = h.replace(n, ".")), d && (p += "-"), "" !== (p = (p += h).replace(/[^0-9\.\-.]/g, "")) && (p = Number(p), s && (p = s(p)), !!w(p) && p))
    }

    function r(t, e, n) {
        var i, r = [];
        for (i = 0; i < o.length; i += 1) r.push(t[o[i]]);
        return r.push(n), e.apply("", r)
    }
    return function t(e) {
        if (!(this instanceof t)) return new t(e);
        "object" == typeof e && (e = function(t) {
            var e, n, i, r = {};
            for (void 0 === t.suffix && (t.suffix = t.postfix), e = 0; e < o.length; e += 1)
                if (void 0 === (i = t[n = o[e]])) "negative" !== n || r.negativeBefore ? "mark" === n && "." !== r.thousand ? r[n] = "." : r[n] = !1 : r[n] = "-";
                else if ("decimals" === n) {
                if (!(0 <= i && i < 8)) throw new Error(n);
                r[n] = i
            } else if ("encoder" === n || "decoder" === n || "edit" === n || "undo" === n) {
                if ("function" != typeof i) throw new Error(n);
                r[n] = i
            } else {
                if ("string" != typeof i) throw new Error(n);
                r[n] = i
            }
            return s(r, "mark", "thousand"), s(r, "prefix", "negative"), s(r, "prefix", "negativeBefore"), r
        }(e), this.to = function(t) {
            return r(e, n, t)
        }, this.from = function(t) {
            return r(e, i, t)
        })
    }
});