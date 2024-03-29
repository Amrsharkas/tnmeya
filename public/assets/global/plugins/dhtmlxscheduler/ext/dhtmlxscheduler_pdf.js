/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
! function() {
    function e(e) {
        return e.replace(y, "\n").replace(p, "")
    }

    function t(e, t) {
        e = parseFloat(e), t = parseFloat(t), isNaN(t) || (e -= t);
        var a = r(e);
        return e = e - a.width + a.cols * g, isNaN(e) ? "auto" : 100 * e / g
    }

    function a(e, t, a) {
        e = parseFloat(e), t = parseFloat(t), !isNaN(t) && a && (e -= t);
        var i = r(e);
        return e = e - i.width + i.cols * g, isNaN(e) ? "auto" : 100 * e / (g - (isNaN(t) ? 0 : t))
    }

    function r(e) {
        for (var t = 0, a = scheduler._els.dhx_cal_header[0].childNodes, r = a[1] ? a[1].childNodes : a[0].childNodes, i = 0; i < r.length; i++) {
            var n = r[i].style ? r[i] : r[i].parentNode,
                s = parseFloat(n.style.width);
            if (!(e > s)) break;
            e -= s + 1, t += s + 1
        }
        return {
            width: t,
            cols: i
        }
    }

    function i(e) {
        return e = parseFloat(e), isNaN(e) ? "auto" : 100 * e / m
    }

    function n(e, t) {
        return (window.getComputedStyle ? window.getComputedStyle(e, null)[t] : e.currentStyle ? e.currentStyle[t] : null) || ""
    }

    function s(e, t) {
        for (var a = parseInt(e.style.left, 10), r = 0; r < scheduler._cols.length; r++)
            if (a -= scheduler._cols[r], 0 > a) return r;
        return t
    }

    function d(e, t) {
        for (var a = parseInt(e.style.top, 10), r = 0; r < scheduler._colsS.heights.length; r++)
            if (scheduler._colsS.heights[r] > a) return r;
        return t
    }

    function l(e) {
        return e ? "<" + e + ">" : ""
    }

    function o(e) {
        return e ? "</" + e + ">" : ""
    }

    function c(e, t, a, r) {
        var i = "<" + e + " profile='" + t + "'";
        return a && (i += " header='" + a + "'"), r && (i += " footer='" + r + "'"), i += ">"
    }

    function _() {
        var t = "",
            a = scheduler._mode;
        if (scheduler.matrix && scheduler.matrix[scheduler._mode] && (a = "cell" == scheduler.matrix[scheduler._mode].render ? "matrix" : "timeline"), t += "<scale mode='" + a + "' today='" + scheduler._els.dhx_cal_date[0].innerHTML + "'>", "week_agenda" == scheduler._mode)
            for (var r = scheduler._els.dhx_cal_data[0].getElementsByTagName("DIV"), i = 0; i < r.length; i++) "dhx_wa_scale_bar" == r[i].className && (t += "<column>" + e(r[i].innerHTML) + "</column>");
        else if ("agenda" == scheduler._mode || "map" == scheduler._mode) {
            var r = scheduler._els.dhx_cal_header[0].childNodes[0].childNodes;
            t += "<column>" + e(r[0].innerHTML) + "</column><column>" + e(r[1].innerHTML) + "</column>"
        } else if ("year" == scheduler._mode)
            for (var r = scheduler._els.dhx_cal_data[0].childNodes, i = 0; i < r.length; i++) t += "<month label='" + e(r[i].childNodes[0].innerHTML) + "'>", t += u(r[i].childNodes[1].childNodes), t += h(r[i].childNodes[2]), t += "</month>";
        else {
            t += "<x>";
            var r = scheduler._els.dhx_cal_header[0].childNodes;
            t += u(r), t += "</x>";
            var n = scheduler._els.dhx_cal_data[0];
            if (scheduler.matrix && scheduler.matrix[scheduler._mode]) {
                t += "<y>";
                for (var i = 0; i < n.firstChild.rows.length; i++) {
                    var s = n.firstChild.rows[i];
                    t += "<row><![CDATA[" + e(s.cells[0].innerHTML) + "]]></row>"
                }
                t += "</y>", m = n.firstChild.rows[0].cells[0].offsetHeight
            } else if ("TABLE" == n.firstChild.tagName) t += h(n);
            else {
                for (n = n.childNodes[n.childNodes.length - 1]; - 1 == n.className.indexOf("dhx_scale_holder");) n = n.previousSibling;
                n = n.childNodes, t += "<y>";
                for (var i = 0; i < n.length; i++) t += "\n<row><![CDATA[" + e(n[i].innerHTML) + "]]></row>";
                t += "</y>", m = n[0].offsetHeight
            }
        }
        return t += "</scale>";
    }

    function h(t) {
        for (var a = "", r = t.firstChild.rows, i = 0; i < r.length; i++) {
            for (var n = [], s = 0; s < r[i].cells.length; s++) n.push(r[i].cells[s].firstChild.innerHTML);
            a += "\n<row height='" + t.firstChild.rows[i].cells[0].offsetHeight + "'><![CDATA[" + e(n.join("|")) + "]]></row>", m = t.firstChild.rows[0].cells[0].offsetHeight
        }
        return a
    }

    function u(t) {
        var a, r = "";
        scheduler.matrix && scheduler.matrix[scheduler._mode] && (scheduler.matrix[scheduler._mode].second_scale && (a = t[1].childNodes), t = t[0].childNodes);
        for (var i = 0; i < t.length; i++) r += "\n<column><![CDATA[" + e(t[i].innerHTML) + "]]></column>";
        if (g = t[0].offsetWidth, a)
            for (var n = 0, s = t[0].offsetWidth, d = 1, i = 0; i < a.length; i++) r += "\n<column second_scale='" + d + "'><![CDATA[" + e(a[i].innerHTML) + "]]></column>", n += a[i].offsetWidth, n >= s && (s += t[d] ? t[d].offsetWidth : 0, d++), g = a[0].offsetWidth;
        return r
    }

    function v(r) {
        var l = "",
            o = scheduler._rendered,
            c = scheduler.matrix && scheduler.matrix[scheduler._mode];
        if ("agenda" == scheduler._mode || "map" == scheduler._mode)
            for (var _ = 0; _ < o.length; _++) l += "<event><head><![CDATA[" + e(o[_].childNodes[0].innerHTML) + "]]></head><body><![CDATA[" + e(o[_].childNodes[2].innerHTML) + "]]></body></event>";
        else if ("week_agenda" == scheduler._mode)
            for (var _ = 0; _ < o.length; _++) l += "<event day='" + o[_].parentNode.getAttribute("day") + "'><body>" + e(o[_].innerHTML) + "</body></event>";
        else if ("year" == scheduler._mode)
            for (var o = scheduler.get_visible_events(), _ = 0; _ < o.length; _++) {
                var h = o[_].start_date;
                for (h.valueOf() < scheduler._min_date.valueOf() && (h = scheduler._min_date); h < o[_].end_date;) {
                    var u = h.getMonth() + 12 * (h.getFullYear() - scheduler._min_date.getFullYear()) - scheduler.week_starts._month,
                        v = scheduler.week_starts[u] + h.getDate() - 1,
                        f = r ? n(scheduler._get_year_cell(h), "color") : "",
                        g = r ? n(scheduler._get_year_cell(h), "backgroundColor") : "";
                    if (l += "<event day='" + v % 7 + "' week='" + Math.floor(v / 7) + "' month='" + u + "' backgroundColor='" + g + "' color='" + f + "'></event>", h = scheduler.date.add(h, 1, "day"), h.valueOf() >= scheduler._max_date.valueOf()) break
                }
            } else if (c && "cell" == c.render)
                for (var o = scheduler._els.dhx_cal_data[0].getElementsByTagName("TD"), _ = 0; _ < o.length; _++) {
                    var f = r ? n(o[_], "color") : "",
                        g = r ? n(o[_], "backgroundColor") : "";
                    l += "\n<event><body backgroundColor='" + g + "' color='" + f + "'><![CDATA[" + e(o[_].innerHTML) + "]]></body></event>"
                } else
                    for (var _ = 0; _ < o.length; _++) {
                        var p, y;
                        if (scheduler.matrix && scheduler.matrix[scheduler._mode]) p = t(o[_].style.left), y = t(o[_].offsetWidth) - 1;
                        else {
                            var b = scheduler.config.use_select_menu_space ? 0 : 26;
                            p = a(o[_].style.left, b, !0), y = a(o[_].style.width, b) - 1
                        }
                        if (!isNaN(1 * y)) {
                            var x = i(o[_].style.top),
                                w = i(o[_].style.height),
                                k = o[_].className.split(" ")[0].replace("dhx_cal_", "");
                            if ("dhx_tooltip_line" !== k) {
                                var E = scheduler.getEvent(o[_].getAttribute("event_id"));
                                if (E) {
                                    var v = E._sday,
                                        D = E._sweek,
                                        N = E._length || 0;
                                    if ("month" == scheduler._mode) w = parseInt(o[_].offsetHeight, 10), x = parseInt(o[_].style.top, 10) - scheduler.xy.month_head_height, v = s(o[_], v), D = d(o[_], D);
                                    else if (scheduler.matrix && scheduler.matrix[scheduler._mode]) {
                                        v = 0;
                                        var S = o[_].parentNode.parentNode.parentNode;
                                        D = S.rowIndex;
                                        var A = m;
                                        m = o[_].parentNode.offsetHeight, x = i(o[_].style.top), x -= .2 * x, m = A
                                    } else {
                                        if (o[_].parentNode == scheduler._els.dhx_cal_data[0]) continue;
                                        var C = scheduler._els.dhx_cal_data[0].childNodes[0],
                                            M = parseFloat(-1 != C.className.indexOf("dhx_scale_holder") ? C.style.left : 0);
                                        p += t(o[_].parentNode.style.left, M)
                                    }
                                    if (l += "\n<event week='" + D + "' day='" + v + "' type='" + k + "' x='" + p + "' y='" + x + "' width='" + y + "' height='" + w + "' len='" + N + "'>", "event" == k) {
                                        l += "<header><![CDATA[" + e(o[_].childNodes[1].innerHTML) + "]]></header>";
                                        var f = r ? n(o[_].childNodes[2], "color") : "",
                                            g = r ? n(o[_].childNodes[2], "backgroundColor") : "";
                                        l += "<body backgroundColor='" + g + "' color='" + f + "'><![CDATA[" + e(o[_].childNodes[2].innerHTML) + "]]></body>"
                                    } else {
                                        var f = r ? n(o[_], "color") : "",
                                            g = r ? n(o[_], "backgroundColor") : "";
                                        l += "<body backgroundColor='" + g + "' color='" + f + "'><![CDATA[" + e(o[_].innerHTML) + "]]></body>"
                                    }
                                    l += "</event>"
                                }
                            }
                        }
                    }
        return l
    }

    function f(e, t, a, r, i, n, s) {
        var d = !1;
        "fullcolor" == i && (d = !0, i = "color"), i = i || "color";
        var h = scheduler.uid(),
            u = document.createElement("div");
        u.style.display = "none", document.body.appendChild(u), u.innerHTML = '<form id="' + h + '" method="post" target="_blank" action="' + r + '" accept-charset="utf-8" enctype="application/x-www-form-urlencoded"><input type="hidden" name="mycoolxmlbody"/> </form>';
        var f = "";
        if (e) {
            var g = scheduler._date,
                m = scheduler._mode;
            t = scheduler.date[a + "_start"](t), t = scheduler.date["get_" + a + "_end"] ? scheduler.date["get_" + a + "_end"](t) : scheduler.date.add(t, 1, a), f = c("pages", i, n, s);
            for (var p = new Date(e); + t > +p; p = scheduler.date.add(p, 1, a)) scheduler.setCurrentView(p, a),
                f += l("page") + _().replace("–", "-") + v(d) + o("page");
            f += o("pages"), scheduler.setCurrentView(g, m)
        } else f = c("data", i, n, s) + _().replace("–", "-") + v(d) + o("data");
        document.getElementById(h).firstChild.value = encodeURIComponent(f), document.getElementById(h).submit(), u.parentNode.removeChild(u)
    }
    var g, m, p = new RegExp("<[^>]*>", "g"),
        y = new RegExp("<br[^>]*>", "g");
    scheduler.toPDF = function(e, t, a, r) {
        return f.apply(this, [null, null, null, e, t, a, r])
    }, scheduler.toPDFRange = function(e, t, a, r, i, n, s) {
        return "string" == typeof e && (e = scheduler.templates.api_date(e), t = scheduler.templates.api_date(t)), f.apply(this, arguments)
    }
}();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_pdf.js.map