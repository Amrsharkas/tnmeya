/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.config.year_x = 4, scheduler.config.year_y = 3, scheduler.xy.year_top = 0, scheduler.templates.year_date = function(e) {
        return scheduler.date.date_to_str(scheduler.locale.labels.year_tab + " %Y")(e)
    }, scheduler.templates.year_month = scheduler.date.date_to_str("%F"), scheduler.templates.year_scale_date = scheduler.date.date_to_str("%D"), scheduler.templates.year_tooltip = function(e, t, r) {
        return r.text
    },
    function() {
        var e = function() {
            return "year" == scheduler._mode
        };
        scheduler.dblclick_dhx_month_head = function(t) {
            if (e()) {
                var r = t.target || t.srcElement,
                    a = scheduler._getClassName(r.parentNode);
                if (-1 != a.indexOf("dhx_before") || -1 != a.indexOf("dhx_after")) return !1;
                var i = this.templates.xml_date(r.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("date"));
                i.setDate(parseInt(r.innerHTML, 10));
                var n = this.date.add(i, 1, "day");
                !this.config.readonly && this.config.dblclick_create && this.addEventNow(i.valueOf(), n.valueOf(), t)
            }
        };
        var t = scheduler.changeEventId;
        scheduler.changeEventId = function() {
            t.apply(this, arguments),
                e() && this.year_view(!0)
        };
        var r = scheduler.render_data,
            a = scheduler.date.date_to_str("%Y/%m/%d"),
            i = scheduler.date.str_to_date("%Y/%m/%d");
        scheduler.render_data = function(t) {
            if (!e()) return r.apply(this, arguments);
            for (var a = 0; a < t.length; a++) this._year_render_event(t[a])
        };
        var n = scheduler.clear_view;
        scheduler.clear_view = function() {
            if (!e()) return n.apply(this, arguments);
            var t = scheduler._year_marked_cells,
                r = null;
            for (var a in t) t.hasOwnProperty(a) && (r = t[a], r.className = "dhx_month_head", r.setAttribute("date", ""));
            scheduler._year_marked_cells = {}
        }, scheduler._hideToolTip = function() {
            this._tooltip && (this._tooltip.style.display = "none", this._tooltip.date = new Date(9999, 1, 1))
        }, scheduler._showToolTip = function(e, t, r, a) {
            if (this._tooltip) {
                if (this._tooltip.date.valueOf() == e.valueOf()) return;
                this._tooltip.innerHTML = ""
            } else {
                var i = this._tooltip = document.createElement("DIV");
                i.className = "dhx_year_tooltip", document.body.appendChild(i), i.onclick = scheduler._click.dhx_cal_data
            }
            for (var n = this.getEvents(e, this.date.add(e, 1, "day")), s = "", d = 0; d < n.length; d++) {
                var l = n[d];
                if (this.filter_event(l.id, l)) {
                    var o = l.color ? "background:" + l.color + ";" : "",
                        _ = l.textColor ? "color:" + l.textColor + ";" : "";
                    s += "<div class='dhx_tooltip_line' style='" + o + _ + "' event_id='" + n[d].id + "'>", s += "<div class='dhx_tooltip_date' style='" + o + _ + "'>" + (n[d]._timed ? this.templates.event_date(n[d].start_date) : "") + "</div>", s += "<div class='dhx_event_icon icon_details'>&nbsp;</div>", s += this.templates.year_tooltip(n[d].start_date, n[d].end_date, n[d]) + "</div>"
                }
            }
            this._tooltip.style.display = "", this._tooltip.style.top = "0px",
                document.body.offsetWidth - t.left - this._tooltip.offsetWidth < 0 ? this._tooltip.style.left = t.left - this._tooltip.offsetWidth + "px" : this._tooltip.style.left = t.left + a.offsetWidth + "px", this._tooltip.date = e, this._tooltip.innerHTML = s, document.body.offsetHeight - t.top - this._tooltip.offsetHeight < 0 ? this._tooltip.style.top = t.top - this._tooltip.offsetHeight + a.offsetHeight + "px" : this._tooltip.style.top = t.top + "px"
        }, scheduler._year_view_tooltip_handler = function(t) {
            if (e()) {
                var t = t || event,
                    r = t.target || t.srcElement;
                "a" == r.tagName.toLowerCase() && (r = r.parentNode), -1 != scheduler._getClassName(r).indexOf("dhx_year_event") ? scheduler._showToolTip(i(r.getAttribute("date")), getOffset(r), t, r) : scheduler._hideToolTip()
            }
        }, scheduler._init_year_tooltip = function() {
            scheduler._detachDomEvent(scheduler._els.dhx_cal_data[0], "mouseover", scheduler._year_view_tooltip_handler), dhtmlxEvent(scheduler._els.dhx_cal_data[0], "mouseover", scheduler._year_view_tooltip_handler)
        }, scheduler.attachEvent("onSchedulerResize", function() {
            return e() ? (this.year_view(!0), !1) : !0
        }), scheduler._get_year_cell = function(e) {
            var t = e.getMonth() + 12 * (e.getFullYear() - this._min_date.getFullYear()) - this.week_starts._month,
                r = this._els.dhx_cal_data[0].childNodes[t],
                e = this.week_starts[t] + e.getDate() - 1;
            return r.querySelector(".dhx_year_body").firstChild.rows[Math.floor(e / 7)].cells[e % 7].firstChild
        }, scheduler._year_marked_cells = {}, scheduler._mark_year_date = function(e, t) {
            var r = a(e),
                i = this._get_year_cell(e),
                n = this.templates.event_class(t.start_date, t.end_date, t);
            scheduler._year_marked_cells[r] || (i.className = "dhx_month_head dhx_year_event", i.setAttribute("date", r), scheduler._year_marked_cells[r] = i), i.className += n ? " " + n : ""
        }, scheduler._unmark_year_date = function(e) {
            this._get_year_cell(e).className = "dhx_month_head"
        }, scheduler._year_render_event = function(e) {
            var t = e.start_date;
            for (t = t.valueOf() < this._min_date.valueOf() ? this._min_date : this.date.date_part(new Date(t)); t < e.end_date;)
                if (this._mark_year_date(t, e), t = this.date.add(t, 1, "day"), t.valueOf() >= this._max_date.valueOf()) return
        }, scheduler.year_view = function(e) {
            var t;
            if (e && (t = scheduler.xy.scale_height, scheduler.xy.scale_height = -1), scheduler._els.dhx_cal_header[0].style.display = e ? "none" : "", scheduler.set_sizes(), e && (scheduler.xy.scale_height = t), scheduler._table_view = e, !this._load_mode || !this._load())
                if (e) {
                    if (scheduler._init_year_tooltip(), scheduler._reset_year_scale(), scheduler._load_mode && scheduler._load()) return void(scheduler._render_wait = !0);
                    scheduler.render_view_data()
                } else scheduler._hideToolTip()
        }, scheduler._reset_year_scale = function() {
            this._cols = [], this._colsS = {};
            var e = [],
                t = this._els.dhx_cal_data[0],
                r = this.config;
            t.scrollTop = 0, t.innerHTML = "";
            var a = Math.floor(parseInt(t.style.width) / r.year_x),
                i = Math.floor((parseInt(t.style.height) - scheduler.xy.year_top) / r.year_y);
            190 > i && (i = 190, a = Math.floor((parseInt(t.style.width) - scheduler.xy.scroll_width) / r.year_x));
            var n = a - 11,
                s = 0,
                d = document.createElement("div"),
                l = this.date.week_start(scheduler._currentDate());
            this._process_ignores(l, 7, "day", 1);
            for (var o = 7 - (this._ignores_detected || 0), _ = 0, c = 0; 7 > c; c++) this._ignores && this._ignores[c] || (this._cols[c] = Math.floor(n / (o - _)), this._render_x_header(c, s, l, d), n -= this._cols[c], s += this._cols[c], _++), l = this.date.add(l, 1, "day");
            d.lastChild.className += " dhx_scale_bar_last";
            for (var c = 0; c < d.childNodes.length; c++) this._waiAria.yearHeadCell(d.childNodes[c]);
            for (var h = this.date[this._mode + "_start"](this.date.copy(this._date)), u = h, v = null, c = 0; c < r.year_y; c++)
                for (var f = 0; f < r.year_x; f++) {
                    v = document.createElement("DIV"), v.style.cssText = "position:absolute;", v.setAttribute("date", this.templates.xml_format(h)), v.innerHTML = "<div class='dhx_year_month'></div><div class='dhx_year_grid'><div class='dhx_year_week'>" + d.innerHTML + "</div><div class='dhx_year_body'></div></div>";
                    var g = v.querySelector(".dhx_year_month"),
                        p = v.querySelector(".dhx_year_grid"),
                        m = v.querySelector(".dhx_year_week"),
                        y = v.querySelector(".dhx_year_body"),
                        x = scheduler.uid();
                    this._waiAria.yearHeader(g, x), this._waiAria.yearGrid(p, x), g.innerHTML = this.templates.year_month(h);
                    for (var b = this.date.week_start(h), w = (this._reset_month_scale(y, h, b, 6), y.querySelectorAll("td")), k = 0; k < w.length; k++) this._waiAria.yearDayCell(w[k]);
                    t.appendChild(v), m.style.height = m.childNodes[0].offsetHeight + "px";
                    var E = Math.round((i - 190) / 2);
                    v.style.marginTop = E + "px", this.set_xy(v, a - 10, i - E - 10, a * f + 5, i * c + 5 + scheduler.xy.year_top), e[c * r.year_x + f] = (h.getDay() - (this.config.start_on_monday ? 1 : 0) + 7) % 7, h = this.date.add(h, 1, "month")
                }
            this._els.dhx_cal_date[0].innerHTML = this.templates[this._mode + "_date"](u, h, this._mode), this.week_starts = e, e._month = u.getMonth(), this._min_date = u, this._max_date = h
        };
        var s = scheduler.getActionData;
        scheduler.getActionData = function(t) {
            if (!e()) return s.apply(scheduler, arguments);
            var r = t ? t.target : event.srcElement,
                a = scheduler._get_year_month_date(r),
                i = scheduler._get_year_month_cell(r),
                n = scheduler._get_year_day_indexes(i);
            return n && a ? (a = scheduler.date.add(a, n.week, "week"), a = scheduler.date.add(a, n.day, "day")) : a = null, {
                date: a,
                section: null
            }
        }, scheduler._get_year_day_indexes = function(e) {
            var t = scheduler._get_year_el_node(e, this._locate_year_month_table);
            if (!t) return null;
            for (var r = 0, a = 0, r = 0, i = t.rows.length; i > r; r++) {
                for (var n = t.rows[r].getElementsByTagName("td"), a = 0, s = n.length; s > a && n[a] != e; a++);
                if (s > a) break
            }
            return i > r ? {
                day: a,
                week: r
            } : null
        }, scheduler._get_year_month_date = function(e) {
            var e = scheduler._get_year_el_node(e, scheduler._locate_year_month_root);
            if (!e) return null;
            var t = e.getAttribute("date");
            return t ? scheduler.date.week_start(scheduler.date.month_start(i(t))) : null
        }, scheduler._locate_year_month_day = function(e) {
            return -1 != scheduler._getClassName(e).indexOf("dhx_year_event") && e.hasAttribute && e.hasAttribute("date")
        };
        var d = scheduler._locate_event;
        scheduler._locate_event = function(e) {
            var t = d.apply(scheduler, arguments);
            if (!t) {
                var r = scheduler._get_year_el_node(e, scheduler._locate_year_month_day);
                if (!r || !r.hasAttribute("date")) return null;
                var a = i(r.getAttribute("date")),
                    n = scheduler.getEvents(a, scheduler.date.add(a, 1, "day"));
                if (!n.length) return null;
                t = n[0].id
            }
            return t
        }, scheduler._locate_year_month_cell = function(e) {
            return "td" == e.nodeName.toLowerCase()
        }, scheduler._locate_year_month_table = function(e) {
            return "table" == e.nodeName.toLowerCase()
        }, scheduler._locate_year_month_root = function(e) {
            return e.hasAttribute && e.hasAttribute("date")
        }, scheduler._get_year_month_cell = function(e) {
            return this._get_year_el_node(e, this._locate_year_month_cell)
        }, scheduler._get_year_month_table = function(e) {
            return this._get_year_el_node(e, this._locate_year_month_table);
        }, scheduler._get_year_month_root = function(e) {
            return this._get_year_el_node(this._get_year_month_table(e), this._locate_year_month_root)
        }, scheduler._get_year_el_node = function(e, t) {
            for (; e && !t(e);) e = e.parentNode;
            return e
        }
    }();
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_year_view.js.map