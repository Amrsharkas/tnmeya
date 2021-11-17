var table = null;

window.removeDomain = function (url) {
  return url.replace(/^.*\/\/[^\/]+/, "");
};
window.removeQueryParams = function (url) {
  let query_params = url.indexOf("?");
  if (query_params != -1) {
    url= url.substring(0, query_params);
  }
  let custom_query_params = url.indexOf("#");
  if (custom_query_params != -1) {
    url=  url.substring(0, custom_query_params);
  }
  return url;
};

const addNavbarActiveLink = () => {
  let  currentPath = removeQueryParams(window.location.href);
    currentPath = removeDomain(currentPath);
   let to_element=$("nav").find(`[href="${currentPath}"]`);
   if (to_element.hasClass('qu_require_active')){
     $("nav").find(".active").removeClass("active");
     to_element.addClass("active");
   }
};

addNavbarActiveLink();

function renderNavbar() {
  $.ajax({
    url: '/render_navbar',
    method: 'get',
    success: function (response) {
      actionChain(response);
    },
  });
  return true
}

function actionChain(response, $selector = $("body")) {
  var actions = response.action_chain;
  $.each(actions, function (action_name, value) {
    if (action_name == "toastr") {
      toastrOptions = value;
      toastr[toastrOptions["type"]](
        toastrOptions["msg"],
        toastrOptions["title"]
      );
    }
    if (action_name == "swal") {
      swalOptions = value;
      swal(swalOptions["title"], swalOptions["msg"]);
      setTimeout(function () {
        $(".mfp-close", window.parent.document).click();
      });
      $(".sweet-alert").addClass(swalOptions["className"]);
    }
    if (action_name == "Run function") {
      window[value](response);
    }
    if (action_name == "Click") {
      $(value).click();
    }
    if (action_name == "alert-msg") {
      setTimeout(function () {
        alertOptions = value;
        $(".qu-alert").html(alertOptions["msg"]);
        $(".qu-alert").addClass(alertOptions["type"]).removeClass("hidden");
        $(".qu-alert").delay(2000).fadeOut();
      }, 800);
    }
    if (action_name == "Run function") {
      window[value](response);
    }
    // Animate to div
    if (action_name == "Anchor") {
      anchor_to = value;
      $("html, body").animate(
        {
          scrollTop: $(anchor_to).offset().top - 100,
        },
        500
      );
    }
    if (action_name == "Validation Messages") {
      parameters = value;
      $.each(parameters, function (selector, message) {
        validationMessages(selector, message);
      });
    }
    if (action_name == "Refresh Server Side DataTable") {
      selector = value;
      $(selector).DataTable().draw();
    }
      if (action_name == "Refresh Server Side DataTable With Custom Page") {
          selector = value;
          let datatable_table=$(selector).DataTable();
          let currentPage = datatable_table.page.info().page;
          datatable_table.page(currentPage).draw('page');
      }
    if (action_name == "appendRenderedView") {
      actionChainAppendRenderedView(response);
      if (value == "no_more_actions") {
        return true;
      }
    }
    if (action_name == "page") {
      if (value != "none") {
        virtualSave($selector, "fa-exclamation");
        if (value == "without_pjax") {
          withourPjaxUrl = actions["page_url"];
          window.location.href = withourPjaxUrl;
          return false;
        }
        if (value == "ajax_request") {
          let url = actions["page_url"];
          let container = actions["container"];
          let title = actions["title"];
          let render_nav_bar = actions["render_nav_bar"];
          let after_ajax = actions["after_ajax"];
          if (render_nav_bar==undefined){
            render_nav_bar=false;
          }
          ajaxRequestWithState(url, "get", container, "{}", title,'foreword',render_nav_bar,after_ajax);
          return true;
        }
        if (value == "reload") {
          location.reload();
          return false;
        }
        url = value;
        pjaxPage(url);
        $(".close_modal").click();
        $(".close_modal").click();
        reloadFn = actions["reloadFn"];
        if (typeof window[reloadFn] !== "undefined") {
          location.reload();
          return false;
        }
      }
      url = value;
      pjaxPage(url);
      $(".close_modal").click();
      $(".close_modal").click();
    } else {
      $(".resetForm").click();
      virtualSave($selector, "fa-exclamation");
      $(".close_modal").click();
      $(".close_modal").click();
    }

    if (action_name == "jspanel_id") {
      $("#" + value).remove();
    }
    // $('.jsPanel-btn-close').click();
    // $('.jsPanel').remove();
  });
}

function AjaxRequest(url, method = "get", container, data = "{}",render_nav_bar,after_ajax) {
  // Change Loader To Progress Bar At Mapped Items View
  if (/\/mappedItems\?/.test(url)) {
    startLoading();
  } else {
    appBlockUI();
  }
  if (typeof method == undefined) {
    method = "get";
  }
  data = JSON.parse(data);
  $.ajax({
    url: url,
    method: method,
    data: data,
    success: function (response) {
      if (container) {
        $(container).html(response);
        init(container);
      }
      actionChain(response);
      if (render_nav_bar){
        renderNavbar()
      }
      // Change Loader To Progress Bar At Mapped Items View
      if (/\/mappedItems\?/.test(url)) {
        endLoading();
      } else {
        appUnBlockUI();
      }
      if (after_ajax!=undefined){
        window[after_ajax]();
      }
    },
  });
}

function validationMessages(selector, message) {
  if (!$(selector).closest(".form-group").hasClass("has-error")) {
    $(selector).closest(".form-group").find(".help-block with-errors").remove();
    $(selector)
      .closest(".form-group")
      .addClass("has-error")
      .append('<div class="help-block with-errors ">' + message + "</div>");
  }
}

function SelectTab() {
  var url_string = window.location.href; //window.location.href
  var url = new URL(url_string);
  var tab_index = Number(url.searchParams.get("tab_index")) + 1;
  $('ul[role="tablist"] li:nth-child(' + tab_index + ") a").click();
}
$(document).on("ready pjax:success", function () {
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
  });
  initDates();
  SelectTab();
  $(".call-view").each(function () {
    $element = $(this);
    var url = $element.attr("href");
    var container = $element.attr("data-container");
    var method = $element.attr("data-method");
    AjaxRequest(url, method, container);
  });
  $(document).on("change", "select.go-to", function (e) {
    url = $(this).find("option:selected").attr("data-url");
    container = $(this).attr("data-container");
    method = $(this).attr("data-method");
    AjaxRequest(url, method, container);
  });
  $(".no-sorting").removeClass("sorting sorting_asc sorting_desc");
  $(":input", "form").each(function () {});
  init();
  // $("form select.select2").select2();
  $(document).on("click", ".m-topbar__notifications--img a", function (e) {
    $(this).removeClass("shake-top-bar");
    $(this)
      .closest(".m-topbar__notifications--img")
      .find("span.m-nav__link-badge")
      .removeClass("m-badge--danger");
    $(this)
      .closest(".m-topbar__notifications--img")
      .find(".m-animate-shake")
      .removeClass("m-animate-shake");
    $(this)
      .closest(".m-topbar__notifications--img")
      .find(".m-animate-blink")
      .removeClass("m-animate-blink");
  });
  $(document).on("click", ".nav-tabs.nav-justified li", function (e) {
    $(".nav-tabs.nav-justified li").removeClass("active1");
    $(this).addClass("active1");
  });
  $(".dataTables_length")
    .parent()
    .removeClass("col-md-6")
    .removeClass("col-sm-6");
  $(document).on("click", ".pdf_export", function (e) {
    e.preventDefault();
    $(this).closest(".qu-portlet").find(".buttons-pdf").click();
  });
  $(document).on("click", ".excel_export", function (e) {
    e.preventDefault();
    $(this).closest(".qu-portlet").find(".buttons-excel").click();
  });
  $(document).on("click", ".ajax_to_container", function (e) {
    e.preventDefault();
    $element = $(this);
    var url = $element.attr("href");
    var container = $element.attr("data-container");
    var method = $element.attr("data-method");
    AjaxRequest(url, method, container);
  });
  $(document).on("click", ".read-notification", function (e) {
    url = $(this).data("url");
    $.ajax({
      url: url,
      method: "post",
      success: function (data) {},
    });
  });
  // Handle remove button
  $portlets = $(".portlet.portlet-color");
  if ($portlets.length != 0) {
    $portlets.each(function () {
      $(this).find(".collapse").click();
      $removeButton = $(this).find(".remove,.delete_Question");
      $removeButton.html("");
      $removeButton.css("font-size", "28px", "important");
    });
    $(".hidden .portlet").find(".expand").click();
    $(".force_open.portlet").find(".expand").click();
  }
  if (window.opener) {
    // pop-up window or target=_blank window
  } else if (window.top !== window.self) {
    //inside an iframe
    $(
      ".page-header.navbar.navbar-fixed-top , .page-footer,.page-logo,.dropdown .dropdown-user , .menu-toggler .responsive-toggler"
    ).css("display", "none");
  } else {
    //top level window
  }
  $(".timepicker-24").each(function () {
    $(this).timepicker({
      showMeridian: false,
    });
  });
  $(".and-data").each(function () {
    $text_data = $(this).text();
    $text_data = $text_data.trim();
    $(this).text($text_data.substring(0, $text_data.length - 1) + ".");
  });
  retrieveChildren();
});

function pjaxPage(url) {
  var link = document.getElementById("pjax-goto-link");
  link.href = url;
  link.click();
}

function pjaxRedirect(url) {
  var link = document.getElementById("pjax-goto-page");
  link.href = url;
  link.click();
}

function province() {
  var country = $("select[name=country]").val();
  if (country == "Canada") {
    $(document).find("input[name =province]").hide();
    $(document).find("select[name=province_id]").show();
  } else {
    $(document).find("input[name =province]").show();
    $(document).find("select[name=province_id]").hide();
  }
}

function scrollToTop() {
  var aTag = $("#page-top");
  $("html,body").animate(
    {
      scrollTop: aTag.offset().top,
    },
    "slow"
  );
}
// Blocking UI
function appBlockUI(offline = 0) {
  $.blockUI({
    message: '<h1><img src="/assets/global/img/ring-alt.svg" /> </h1>',
    overlayCSS: {
      backgroundColor: "#fff",
      bgOpacity: 0,
      opacity: 0.1,
    },
    css: {
      border: "none",
      padding: "0",
      backgroundColor: "none",
    },
  });
  if (offline == 0) {
    var check_auth_url = $("#hiddenAttributes").attr("data-check-auth-route");
    /* $.ajax({
             url: check_auth_url,
             method: 'get',
             success: function (response) {
                 if (response == "0") {
                     window.location.href = "/";
                 }
             }
         });*/
  }
}
// unblocking UI
function appUnBlockUI() {
  $.unblockUI();
}
$(document).on("click", ".delete_single", function () {
  // delete_single isn't used , has been replaced by remove
  var url = $(this).data("action");
  var $tr = $(this).closest("tr");
  var redirect = $(this).data("redirect");
  swal(
    {
      title: "Are you sure?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false,
    },
    function () {
      $.ajax({
        url: url,
        method: "delete",
        success: function (data) {
          if (data.status == 1) {
            if (redirect) {
              ajaxPage(pageAttributes.indexUrl);
            } else {
              table.row($tr).remove().draw();
            }
            swal("Deleted!", data.message, "success");
            return false;
          }
          if (data.status == -1) {
            swal("Error", data.message, "error");
            return false;
          }
        },
      });
    }
  );
});
$(document).on("click", ".delete_multiple", function () {
  var $form = $("#" + $(this).data("form"));
  var formData = $form.serialize();
  var url = $form.attr("action");
  swal(
    {
      title: "Are you sure?",
      text: "",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false,
    },
    function () {
      $.ajax({
        url: url,
        method: "delete",
        data: formData,
        success: function (data) {
          table.rows("tr.to-remove").remove().draw();
          $(".group-checkable").prop("checked", false);
          swal("Deleted!", data.message, "success");
          return false;
        },
        error: function (data) {
          $("tr.to-remove").removeClass("to-remove");
        },
      });
    }
  );
});
//usable in form & list
$(document).on("click", ".remove", function () {
  var role = $(this).data("role");
  var confirm = $(this).data("confirm");
  var $element = $(this).closest("." + role);
  var url = $(this).data("action");
  var parent = $(this).data("parent");
  if (
    $(this).hasClass("qu_min_one") &&
    parent != "undefined" &&
    $(parent).find(".remove").length == 1
  ) {
    var msg = $(this).data("msg");
    toastr["error"](msg, "Sorry");
  } else {
    if (confirm == "0") {
      appBlockUI();
      $.ajax({
        url: url,
        method: "delete",
        success: function (data) {
          if (data.status == false) {
            var $toast = toastr["error"](data.msg, "Sorry");
          } else {
            $element.remove();
            toastr["success"](role + " deleted successfully", "Done");
            swal("Deleted!", role + " deleted successfully", "success");
            if (typeof RemoveSuccess !== "undefined") {
              if ($jspanel_id) {
                RemoveSuccess($jspanel_id);
              } else {
                RemoveSuccess();
              }
            }
          }
        },
        error: function (data) {
          toastr["error"]("Something went wrong", "Sorry");
        },
        complete: function () {
          appUnBlockUI();
        },
      });
    } else {
      var li = $(this).closest("li:not(.qu-portlet__nav-item)");
      var ToClass = li.closest("ol");
      var sort = ToClass.data("sort");
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this !",
        icon: "warning",
        className: "swal-warning-red-style",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      }).then(function (value) {
        if (!value) return null;

        appBlockUI();
        $.ajax({
          url: url,
          method: "delete",
          success: function (data) {
            if (data.status == false) {
              var $toast = toastr["error"](data.msg, "Sorry");
            } else {
              $jspanel_id = $element
                .closest(".ajax_form")
                .find(".jspanel_id")
                .val();
              $element.remove();
              if (sort == 1) {
                initSortable(ToClass);
                //serializeSortData();
              }
              // toastr['success'](role + ' deleted successfully', "Done");
              swal({
                title: "Deleted!",
                text: role + " deleted successfully",
                icon: "success",
                className: "swal-success-style",
                timer: 2000,
                buttons: false,
              });
              if (typeof RemoveSuccess !== "undefined") {
                if ($jspanel_id) {
                  RemoveSuccess($jspanel_id);
                } else {
                  RemoveSuccess();
                }
              }
            }
          },
          error: function (data) {
            toastr["error"]("Something went wrong", "Sorry");
          },
          complete: function () {
            appUnBlockUI();
          },
        });
      });
    }
  }
});
$(document).on("click", ".expand", function () {
  $portlet = $(this).closest(".portlet");
  $element = $portlet
    .find("input[type=text],textarea,select")
    .filter(":visible:first");
  if ($element.is("select")) {
    caption = $portlet.find("select:first option:selected").text();
  } else {
    caption = $element.val();
  }
  if (caption == "") {
    caption = "Untitled !";
  }
  $question_order = $portlet.find(".caption").find(".q_order");
  if ($question_order.length > 0) {
    var weight = $portlet.find("input[name^=weight]").val();
    $portlet.find(".caption").find(".q_content").html(caption);
    $portlet
      .find(".caption")
      .find(".q_weight")
      .html("( w = " + weight + " )");
    $portlet.find(".caption").find(".q_content").html(caption);
  } else {
    $portlet.find(".caption").html(caption);
  }
});
$(document).on("click", ".mt-checkbox .checkbox", function () {
  $input = $(this).find("input");
  if ($input.is(":checked")) {
    $input.prop("checked", false);
  } else {
    $input.prop("checked", true);
  }
});
/*numbers only are click-able*/
/*was used b4 when we were using js in validation*/
$(document).on("keydown", ".numbers", function (e) {
  // reject all keys except numbers
  // Allow: backspace, delete, tab, escape, enter and .
  if (
    $.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
    // Allow: Ctrl+A, Command+A
    (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    (e.keyCode === 90 && (e.ctrlKey === true || e.metaKey === true)) ||
    (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) ||
    (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
    (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
    (e.keyCode === 82 && (e.ctrlKey === true || e.metaKey === true)) ||
    (e.keyCode === 76 && (e.ctrlKey === true || e.metaKey === true)) ||
    (e.keyCode === 68 && (e.ctrlKey === true || e.metaKey === true)) ||
    // Allow: home, end, left, right, down, up
    (e.keyCode >= 35 && e.keyCode <= 40)
  ) {
    // let it happen, don't do anything
    return;
  }
  // Ensure that it is a number and stop the keypress
  if (
    (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
    (e.keyCode < 96 || e.keyCode > 105)
  ) {
    e.preventDefault();
    return false;
  }
});
$(document)
  .on("click", ".option-disable", function () {
    $("option").prop("disabled", false);
    $("select.option-disable").each(function () {
      var val = this.value;
      $("select.option-disable")
        .not(this)
        .find("option")
        .filter(function () {
          return this.value === val;
        })
        .prop("disabled", true);
    });
    $("option.empty").prop("disabled", false);
  })
  .change();

function initDates() {
  $(".timepicker").keypress(function (event) {
    event.preventDefault();
    return false;
  });
  $(".timepicker-24").each(function () {
    $(this).timepicker({
      showMeridian: false,
    });
  });
  $(".timepicker").datetimepicker({
    format: "hh:ii",
    weekStart: 1,
    todayBtn: 0,
    autoclose: 1,
    todayHighlight: 0,
    startView: 1,
    minView: 0,
    maxView: 1,
    forceParse: 0,
    showMeridian: true,
  });
  $(".datePicker").datetimepicker({
    format: "yyyy-mm-dd",
    dateFormat: "yy-mm-dd",
    startView: "month",
    minView: "month",
    autoclose: 1,
    // startDate: '-1d',
    prevText: '<i class="fa fa-caret-left"></i>',
    nextText: '<i class="fa fa-caret-right"></i>',
  });
  $(".monthPicker").datetimepicker({
    format: "yyyy-mm",
    dateFormat: "yy-mm",
    startView: "year",
    minView: "year",
    autoclose: true,
    startDate: "+2m",
    prevText: '<i class="fa fa-caret-left"></i>',
    nextText: '<i class="fa fa-caret-right"></i>',
  });
  $(".yearPicker").datetimepicker({
    format: "yyyy",
    dateFormat: "yyyy",
    startView: 4,
    minView: 4,
    autoclose: true,
    startDate: "y",
    prevText: '<i class="fa fa-caret-left"></i>',
    nextText: '<i class="fa fa-caret-right"></i>',
  });
}

function getURLParameter(name) {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.search
      ) || [, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
}

function changeUrlParam(param, value) {
  var currentURL = window.location.href + "&";
  var change = new RegExp("(" + param + ")=(.*)&", "g");
  var newURL = currentURL.replace(change, "$1=" + value + "&");
  if (getURLParameter(param) !== null) {
    try {
      window.history.replaceState("", "", newURL.slice(0, -1));
    } catch (e) {}
  } else {
    var currURL = window.location.href;
    if (currURL.indexOf("?") !== -1) {
      window.history.replaceState(
        "",
        "",
        currentURL.slice(0, -1) + "&" + param + "=" + value
      );
    } else {
      window.history.replaceState(
        "",
        "",
        currentURL.slice(0, -1) + "?" + param + "=" + value
      );
    }
  }
}
$(document).on("click", 'ul[role="tablist"] li:not(.sub-tabs)', function (e) {
  var tab_index = $(this).prevAll().length;
  $(this).find("a.show").removeClass("show");
  if (typeof tab_index !== "undefined") {
    changeUrlParam("tab_index", tab_index);
  }
});

function refreshAjax() {
  var url = document.URL;
  var goTo = url.split("#");
  pjaxPage(goTo[0]);
}

$(document).on("click", ".portlet-toggle", function () {
  $portlet = $(this).closest(".qu-portlet");
  $portlet_head = $(this).closest(".qu-portlet__head");
  $portlet_body = $portlet_head.next(".qu-portlet__body");
  $("i", this).toggleClass("fa-caret-down fa-caret-right");
  $portlet_body.toggle();
  if ($portlet_body.css("display") == "none") {
    $portlet.removeClass("open-portlet").addClass("close-portlet");
  } else {
    $portlet.removeClass("close-portlet").addClass("open-portlet");
  }
});

$(document).on("mouseenter mouseleave", ".drop_targets", function (e) {
  if (e.type == "mouseenter") {
    $(this).find(".m-divider").css("visibility", "visible");
    // check if it is mouseenter, do something
  } else {
    $(this).find(".m-divider").css("visibility", "hidden");
    // if not, mouseleave, do something
  }
});

function init(selector = "body") {
  initDataTables(selector);
  initForms(selector);
  initBigDataSelect2s(selector);
  //initTooltips(selector);
  initTinyMces(selector);
  initTrees(selector);
  retrieveChildren(selector);
  initDateRangePickers(selector);
  $("select.select2").select2();
}

function initTrees(selector = "body") {
  $(selector + " .init-tree").each(function () {
    initTree($(this));
  });
}

function initTree($selector = $("body")) {
  $tree_json = $selector.attr("data-input");
  $selector.jstree({
    plugins: ["wholerow", "checkbox", "types"],
    core: {
      themes: {
        responsive: false,
      },
      data: JSON.parse($tree_json),
    },
    types: {
      default: {
        icon: "fa fa-folder m--font-warning",
      },
      file: {
        icon: "fa fa-file  m--font-warning",
      },
    },
  });
}

function serializeTreeData() {
  var $ids = [];
  $(".init-tree").each(function () {
    var tree_anchors = $(this).find(".jstree-anchor");
    $input_name = $(this).attr("data-input-name");
    tree_anchors.each(function () {
      var $action = $(this).hasClass("jstree-clicked");
      var $id = $(this).closest(".jstree-node ").attr("id");
      if ($action === true) {
        $ids.push($id);
      }
    });
    $("input[name=" + $input_name + "]").val($ids);
  });
}

function initTooltip($selector) {
 // $selector.tooltip();
}

function initTooltips(selector = "body") {
  $(selector + ' [data-toggle="tooltip"]').each(function () {
    initTooltip($(this));
  });
}

function destroy(selector = "body") {
  destroyDataTables(selector);
  destroyForms(selector);
  destroyBigDataSelect2s(selector);
}

function initDateRangePickers(selector) {
  $(selector)
    .find(".DateRangePicker")
    .each(function () {
      var selector = $(this);
      initDateRangePicker(selector);
    });
}

function setDate(start, end) {
  $(".DateRangePicker").html(
    start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
  );
  //reinit chart data
  if ($("#chartdiv").length !== 0) {
    url = $("#chartdiv").attr("data-url");
    x = $("#chartdiv").attr("data-x");
    y = $("#chartdiv").attr("data-y");
    setNewData(start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD"), url, x, y);
  }
}

function initDateRangePicker(selector) {
  var start = moment().subtract(29, "days");
  var end = moment();
  div_options = selector.attr("data-options");
  var options = [];
  if (div_options.includes("Today")) {
    options["Today"] = [moment(), moment()];
  }
  if (div_options.includes("Yesterday")) {
    options["Yesterday"] = [
      moment().subtract(1, "days"),
      moment().subtract(1, "days"),
    ];
  }
  if (div_options.includes("Last 7 Days")) {
    options["Last 7 Days"] = [moment().subtract(6, "days"), moment()];
  }
  if (div_options.includes("Last 30 Days")) {
    options["Last 30 Days"] = [moment().subtract(29, "days"), moment()];
  }
  if (div_options.includes("This Month")) {
    options["This Month"] = [
      moment().startOf("month"),
      moment().endOf("month"),
    ];
  }
  if (div_options.includes("Last Month")) {
    options["Last Month"] = [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ];
  }
  selector.daterangepicker(
    {
      startDate: start,
      endDate: end,
      ranges: options,
    },
    setDate
  );
  setDate(start, end);
}
$(document).on("click", "a.open_modal", function (e) {
  e.preventDefault();
  appBlockUI();
  var beforeModalInitFN = $(this).attr("data-beforeModalInit");
  var table = $(this).closest(".search_criteria_container").attr("data-table");
  var url = $(this).attr("href");
  var attr = $(this).attr("data-attr"); //session_id
  var title = $(this).attr("data-title");
  var search_type = $(this).attr("data-search-type");
  var options_url = $(this).attr("data-seletct-option");
  var options = $(this).attr("data-options");
  var inputs = $(this).attr("data_inputs");
  var filter_name = $(this).attr("data-filter-name");
  var multiple = $(this).attr("data-multiple");
  if (url == "#") {
    if (beforeModalInitFN !== undefined) {
      search_form = window[beforeModalInitFN](
        table,
        search_type,
        inputs,
        options_url,
        options,
        filter_name,
        multiple
      );
    }
    $(".modal-title").html(title);
    $(".modal-body").html(search_form);
    appUnBlockUI();
    $(".open_modal_button").click();
  } else {
    $.ajax({
      url: url,
      method: "get",
      success: function (data) {
        $(".modal-title").html(title);
        $(".modal-body").find(":first-child").remove();
        $(".modal-body").empty();
        $(".modal-body").html(data);
        appUnBlockUI();
        $form = $(".modal-body").find("form.ajax_form:first");
        // reinit uploader
        $(".uploader").each(function () {
          var uploader = $(this);
          initFineUploader(uploader);
        });
        // reinit ajaxform
        init(".modal-body");
        initDates();
        if (typeof afterOpenModal !== "undefined") {
          afterOpenModal();
        }
        //dont close modal and upend new content
        if (!$("#modal-1").data("bs.modal")) {
          $(".open_modal_button").click();
        }
      },
    });
  }
  initDates();
});
$(document).on("keyup change", "input.search_element", function (e) {
  var value = $("input.search_element").filter(function () {
    return $(this).val() != "";
  });
  if (value.length > 0) {
    $(".search_submit").prop("disabled", false);
  } else {
    $(".search_submit").prop("disabled", true);
  }
});
//if change select
$(document).on("change", "select.search_element", function () {
  if ($(this).val() != null) {
    $(".search_submit").prop("disabled", false);
  } else if ($(this).val() == null) {
    $(".search_submit").prop("disabled", true);
  }
});
//if new tab fix datatable problem
$(document).on("click", "a.nav-link.m-tabs__link", function () {
  setTimeout(function () {
    $(window).trigger("resize");
  }, 200);
});
$(document).on("click", ".go-back", function (e) {
  e.preventDefault;
  window.history.back();
});
$(document).on("click", ".open_swal", function (e) {
  e.preventDefault;
  var url = $(this).attr("data-url");
  var msg = $(this).attr("data-msg");
  var swal_type = $(this).attr("data-type");
  var confirmButtonText = $(this).attr("data-confirmButtonText");
  var confirmButtonColor = $(this).attr("data-confirmButtonColor");
  var swal_method = $(this).attr("data-method");
  swal(
    {
      title: msg,
      text: "",
      type: swal_type,
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      confirmButtonText: confirmButtonText,
    },
    function () {
      $.ajax({
        url: url,
        method: swal_method,
        success: function (data) {
          actionChain(data);
        },
        error: function (data) {
          console.log("error");
        },
      });
    }
  );
});

$(document).on("change", ".ajax_on_change", function (e) {
  e.preventDefault;
  var url = $(this).attr("data-url");
  var value = $(this).val();
  var data = '{ "driver_id" :"' + value + '"}';
  AjaxRequest(url, "post", "", data);
});

$(document).on("click", ".open_jspanel", function () {
  if ($(this).hasClass("qu_open_one_only")) {
    $("." + $(this).data("common-class")).remove();
  }
  var url = $(this).data("url");
  var header = $(this).data("header");
  const width = $(this).data("width");
  const height = $(this).data("height");
  const afterOpenJsPanel= $(this).attr("data-afterOpenJsPanel");
  jsPanel.create({
    // headerLogo: '<i class="fad fa-home-heart ml-2"></i>',
    headerTitle: header,
    panelSize: {
      width: () => {
        return width ? width : Math.min(800, window.innerWidth * 0.9);
      },
      height: () => {
        return height ? height : Math.min(500, window.innerHeight * 0.6);
      },
    },
    animateIn: "jsPanelFadeIn",
    contentAjax: {
      url: url,
      done: (xhr, panel) => {
        panel.content.innerHTML = xhr.responseText;
        if ($(this).data("common-class") != "undefined") {
          $("#" + panel.id).addClass($(this).data("common-class"));
        }
        init("#" + panel.id);
        $("#" + panel.id)
          .find(".ajax_form")
          .append(
            '<input hidden class="jspanel_id" name="jspanel_id" value="' +
              panel.id +
              '" />'
          ); //hidden

          if (typeof afterOpenJsPanel !== "undefined") { 
           window[afterOpenJsPanel]();
  
          
          }
      },
    },
    callback: () => setTimeout(() => $(".select2").select2(), 800),
    onbeforeclose: function () {
      const panelThis = this;

      swal({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        className: "swal-warning-style",
        // dangerMode: true,
        buttons: true,
      }).then(function (value) {
        if (value) {
          let  panelId=panelThis.id +'-min';
          $(`#${panelId}`).remove();
          return $(panelThis).remove();
        }
      });
      return false;
    },
    onwindowresize: true,
    contentOverflow: "auto",
    borderRadius: "23px",
    boxShadow: 0,
    headerControls: "xs",
    // iconfont: "material-icons",
    iconfont: [
      "custom-smallify",
      "custom-minimize",
      "custom-normalize",
      "custom-maximize",
      "custom-close",
    ],
    theme: {
      bgPanel: "#7fb726",
      bgContent: "#fff",
      colorHeader: "#fff",
      // border: 'thin #7fb726 solid'
      border: 0,
    },
  });
});

// Change Jpanel Controls In Minimized Mode
$(document).on("click", ".jsPanel-replacement .jsPanel-titlebar", function () {
  let panelId = $(this)
    .closest(".jsPanel-replacement")
    .attr("id")
    .replace("-min", "");
  //jsPanel-1-min
  document.querySelector(`#${panelId+'-min'}`).normalize();
  // if ($(`#${panelId}`).length>0){
  //   document.querySelector(`#${panelId+'-min'}`).normalize();
  // }
  // else {
  //   $(`#${panelId+'-min'}`).remove();
  // }
});

function ajaxRequestWithState(
  url,
  method,
  container,
  data,
  page = undefined,
  operator = "foreword",
  render_nav_bar = false,
  after_ajax=undefined
) {
  AjaxRequest(url, method, container, JSON.stringify(data),render_nav_bar,after_ajax);
  if (operator == "foreword") {
    history.pushState(null, null, url);
    if (page != undefined) {
      document.title = page;
    }
  }
  addNavbarActiveLink();
}

$(document).on("click", ".ajax_request", function (e) {
  e.preventDefault();
  $(this).closest("ul").find(".active").removeClass("active");
  $(this).addClass("active");
  var url = $(this).attr("href");
  //  var url = $(this).attr("href")+'?tab_index=0';
  var container = $(this).data("container");
  var page = $(this).data("page");
  var method = $(this).data("method");
  var after_ajax= $(this).attr("data-runAfter")
  var data = {};
  if ($(this).data("params")) {
    data = $(this).data("params");
  }
  if (after_ajax==undefined){
    let  currentPath = removeQueryParams(url);
    currentPath = removeDomain(currentPath);
    let to_element=$("nav").find(`[href="${currentPath}"]`);
     after_ajax=to_element.attr("data-runAfter")
  }
  ajaxRequestWithState(url, method, container, JSON.stringify(data), page,'foreword',false,after_ajax);
});

window.addEventListener("popstate", function (e) {
  e.preventDefault();
  let main_url = location.href;
  let  currentPath = removeQueryParams(main_url);
  currentPath = removeDomain(currentPath);
  let to_element=$("nav").find(`[href="${currentPath}"]`);
  var after_ajax=to_element.attr("data-runAfter")
  ajaxRequestWithState(main_url, "get", ".qu_spa", "{}", null, "back",false,after_ajax);
  addNavbarActiveLink();
});

// routing = {
//   "/": { container: ".qu_spa", title: "Home" },
//   "/registration": { container: ".card-body", title: "Registration" },
//   "/registration/form/get_second_view": {
//     container: ".card-body",
//     title: "Add Vendor",
//   },
//   "/purchase_order": { container: ".qu_spa", title: "PO" },
//   "/item": { container: ".qu_spa", title: "Items" },
//   "/syncViewTest": { container: ".m-content", title: "Sync Products" },
//   "/vendors": { container: ".qu_spa", title: "Vendors" },
//   "/vendors/edit/": { container: ".qu_spa", title: "Update Vendor" },
//   "/vendor_catalog": { container: ".qu_spa", title: "Vendor Catalog" },
//   "/mappedItems": { container: ".qu_spa", title: "MappingItems" },
//   "/chooseStore": { container: ".qu_spa", title: "chooseStore" },
// };


window.addEventListener(
  "scroll",
  () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (
      $("#turn_on_infinity_scroll").val() == 1 &&
      scrollTop + clientHeight + 200 >= scrollHeight
    ) {
      let main_page_ul = $(".pagination li.active + li");
      let main_page = $(".pagination li.active + li a");
      let main_url = main_page.attr("href");
      let main_url_with_params = main_url + "&scroll=1";
      $(".pagination li.active + li").addClass("active");
      $(".pagination li.active:first").removeClass("active");
      if (main_url != undefined && !main_page_ul.hasClass("qu_next_page")) {
        loadMoreData(main_url_with_params);
      }
    }
  },
  {
    passive: true,
  }
);

function loadMoreData(url) {
  $.ajax({
    url: url,
    type: "get",
    beforeSend: function () {
      appBlockUI();
    },
  })
    .done(function (data) {
      if (data == " ") {
        $(".ajax-load").html("No more records found");
        return;
      }
      appUnBlockUI();
      $("#post-data").append(data);
      let checked_checkboxs = $(
        ".qu_all_mapped_container input[type=checkbox]:checked"
      ).length;
      let indeterminate = false;
      if (checked_checkboxs > 0) {
        indeterminate = true;
      }
      if (
        $(".qu_variant_container").find(".qu_variant_parent:checked").length
      ) {
        $(".qu_all_mapped_container")
          .find(".qu_all_mapped")
          .prop({
            indeterminate: indeterminate,
            checked: false,
          })
          .addClass("indeterminate");
      }
      init("#post-data");
    })
    .fail(function (jqXHR, ajaxOptions, thrownError) {
      alert("server not responding...");
    });
}
// Change JsPanel Title To Include Vendor Name And Orders Count
const changePurchasePanelTitle = (thisElement) => {
  const jsPanelContainer = $(thisElement).closest(".jsPanel");
  const ordersCount = jsPanelContainer.find("#purchase_order_items li").length;
  const vendorName = jsPanelContainer
    .find("#select2-vendor_id-container")
    .attr("title");
  const newTitle = `PO ${
    vendorName === "Select Vendor  * " ? "" : `- ${vendorName}`
  } ${ordersCount ? `- ${ordersCount}` : ""}`;

  jsPanelContainer.find(".jsPanel-title").text(newTitle);
};

// (Start) DataTable Loading Bar
function startLoading() {
  if ($("#dt-progress-bar").length === 0) {
    // inject the bar..
    $("body").append(
      $("<div><b></b><i></i></div>").attr("id", "dt-progress-bar")
    );

    // animate the progress..
    $("#dt-progress-bar").width("90%").delay(400);
  }
}
function endLoading() {
  $("#dt-progress-bar")
    .width("101%")
    .delay(200)
    .fadeOut(300, function () {
      // ..then remove it.
      $(this).remove();
    });
}

function initSelect2() {
  setTimeout(function () {
    $("select.select2").select2();
  }, 1000);
}


$(document).on('click', '.check_all_inputs', function(e) {
 $('.check_input').prop('checked', true);
 const checkAllContainer = $(".check_all_container");
  if($(this).is(":checked")){

      const numberOfCheckedInputs =$('.check_input:checked').length;
           
      const numberOfRecords = $(".number-records").val(); 
     
      if(Number(numberOfRecords) > numberOfCheckedInputs){

        checkAllContainer.removeClass("hidden")
        checkAllContainer.hasClass("hidden")? checkAllContainer.removeClass("hidden"): "";
        const msg = `You have selected `+ numberOfCheckedInputs + ` records, Do you want to select all ` + numberOfRecords + `  records ?`;
        $(".check_all_container span").text(msg);
        $(".check_all_container button").text("select all");

       }
      else{

         $('.check_input').prop('checked', true);
         checkAllContainer.addClass("hidden");
        }

  }
  else{
    checkAllContainer.addClass("hidden");

 }

});

$(document).on('click', '.check_all_container button', function(e) {
  const numberOfRecords = $(".number-records").val(); 
  const numberOfCheckedInputs = $('.check_input:checked').length;
  if(Number(numberOfRecords) > numberOfCheckedInputs){
   
  if($(this).hasClass("get-from-server")){

   //case deselect all
   $(this).removeClass("get-from-server");
   //display msg
   const msg = `You have selected `+ numberOfCheckedInputs + ` records, Do you want to select all ` + numberOfRecords + `  records ?`;
   $(".check_all_container span").text(msg);
   $(".check_all_container button").text("select all");
  }
  else{
    //case select all
    
    $('.check_input').prop('checked', true); 
    $('.check_all_inputs').prop('checked', true); 
    $(this).addClass("get-from-server");
    //display msg
   const msg = `You have selected all ` + numberOfRecords + `  records, Deselect ?`;
   $(".check_all_container span").text(msg);
   $(".check_all_container button").text("Deselect");


  }
  }
});

$(document).on('click', '.check_input', function(e) {
  //block of select all visible
  if(!$(this).is(":checked")){
    $('.check_all_inputs').prop('checked', false); 
  }
 
    if(!$(".check_all_container").hasClass("hidden")){
      resetCheckAllInput();
    }
});

function resetCheckAllInput(){
   //reset
   const numberOfCheckedInputs =$('.check_input:checked').length;
   const numberOfRecords = $(".number-records").val(); 
   const msg = `You have selected `+ numberOfCheckedInputs + ` records, Do you want to select all ` + numberOfRecords + `  records ?`;
   $(".check_all_container span").text(msg);
   $(".check_all_container button").text("select all");
   getFromServerClass(false);
}

function getFromServerClass(value=true){

  if(value){
      $(".check_all_container button").hasClass("get-from-server") ? "" :  $(".check_all_container button").addClass("get-from-server");
  }
  else{
      $(".check_all_container button").hasClass("get-from-server") ?  $(".check_all_container button").removeClass("get-from-server") : "" ;

  }


}

function actionChainAppendRenderedView($response) {
  $views = $response['view'];
  $selectors = $response['selector'];
  if (Array.isArray($views)) {
    $.each($selectors, function(key, $selector) {
      renderView($views[key], $selector)
    });
  } else {
    renderView($views, $selectors);
  }
  if ($response['run_function_after_init'] !== undefined) {
    window[$response['run_function_after_init']]($response);
  }
}

function renderView($view, $selector) {
  if (($view != "" || $view !== undefined) && ($selector != "" || $selector !== undefined)) {
    $($selector).empty();
    $($selector).html('');
    $($selector).html($view);
    $forms = $($selector).find('.ajax_form');
    // init($selector);
  }
}

$(document).on('click', '.ajax_request_with_confirm', function(e) {
    e.preventDefault();
    let url=$(this).attr('href');
    swal({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        className: "swal-warning-style",
        buttons: true,
    }).then(function(value) {
        if (value) {
            $.ajax({
                url: url,
                method: 'get',
                success: function(response) {
                  actionChain(response)
                }
            });
        }
    });
});
// function runAfterLoad(){
//   let runAfterLoadArray={
//     'home': 'InitAllCharts',
//     'vendor_item_variants_data':'loadInitialData'
//   }
//     let  currentPath = removeQueryParams(location.href);
//     currentPath = removeDomain(currentPath);
//   let method_to_run=runAfterLoadArray[(currentPath.replace("/", "")).trim()];
//   console.log(method_to_run)
//   window[method_to_run]();
// }
// runAfterLoad();
// (End) DataTable Loading Bar
