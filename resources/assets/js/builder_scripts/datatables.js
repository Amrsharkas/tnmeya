function sampleValidation(response) {}
$(document).on('ready pjax:success', function() {});

function initDataTables(selector = "body") {
    $(selector + " table.init_datatable").each(function() {
        var Table_id = $(this).attr("id");
        initDataTable("#" + Table_id);
    });
}
$(document).on('click', '.search_data', function(e) {
    e.preventDefault();
    modal = $(this).find('.search_modal').attr('data-modal');
    search_inputs = [];
    $.each($(this).find('.element'), function(key, value) { //add data input
        data_input = $(this).attr('data-input');
        search_inputs.push(data_input);
    });
    a_link = $(".search_list").find("[data-search-type='" + modal + "'][data_inputs='" + search_inputs + "']");
    a_link.click();
});
/*Remove search filter*/
$(document).on('click', '.remove_filter', function(e) {
    var Table_Id = $(this).closest(".table_search").attr("data-tableID");
    $(this).closest(".filter_single_attribute").remove();
    $('.select2').val('');
    if ($('.table_search').find('.filter_single_attribute ').length == 0) {
        $('.srch_form').hide();
    }
    $(Table_Id).DataTable().draw();
});
$(document).on('click', '.search_modal_submit', function(e) {
    e.preventDefault();
    var Table_Id = $(this).attr("data-table");
    var modal_body = $('.modal-body');
    var portlet = modal_body.find('.search_type').val(); //name of div outer portlet search div
    search_portlet = $('#hidden').find('.' + portlet).clone();
    var filter_name = modal_body.find('.search_element').attr('data-filter-name'); //name of div outer portlet search div
    modal_body.find('.search_element').each(function(key, value) {
        data_input = $(this).attr('data-input');
        value = $(this).val();
        var string_value = "";
        var $text = [];
        if ($(this).is('select')) {
            $selected_options = $(this).find('option:selected');
            $selected_options.each(function() {
                if ($(this).val() != "") {
                    $text.push($(this).text());
                }
            });
            string_value = $text.toString().replace(/,/g, " / ");
        } else {
            string_value = value;
        }
        $search_field = search_portlet.find('.element:eq(' + key + ')').attr('data-input', data_input);
        $search_field.attr('data-value', value);
        $search_field.html(string_value);
    });
    $search_fields_portlet = $("[data-tableID='" + Table_Id + "']").find('div.' + portlet);
    $search_fields_portlet_input = $search_fields_portlet.find('div[data-input="' + data_input + '"]');
    $filter_single_attribute = $search_fields_portlet_input.closest('.filter_single_attribute');
    $table_search_section = $(".table_search[data-tableID='" + Table_Id + "']");
    $search_portlet_title = search_portlet.find('.title');
    if ($search_fields_portlet_input.length !== 0) {
        $filter_single_attribute.remove();
    }
    $table_search_section.append(search_portlet);
    $search_portlet_title.html(filter_name);
    $table_search_section.closest(".srch_form").removeClass("hide").show();
    $('.modal_cancel').click();
    $(Table_Id).DataTable().draw();
});

function initBigDataSelect2s(selector = "body", reinit = false) {
    $(selector + " .select2.big_data").each(function() {
        if (!$this.hasClass("initialized")) {
            initBigDataSelect($(this));
            initBigDataSelectSingle($(this));
        } else {
            if (reinit) {
                destroyBigDataSelect($(this));
                initBigDataSelect($(this));
                initBigDataSelectSingle($(this));
            }
        }
    });
}

function setTargetDataTable($table = null, $search_type = null, $inputs = null, $options_url = null, $options = null) {
    var TableID = $table;
    $(".search_modal_submit").attr("data-table", TableID);
}

function initTextAndDateAndNumberRange($table = null, $search_type = null, $inputs = null, $options_url = null, $options = null, $filter_name = null, $multiple = null) {
    setTargetDataTable($table);
    var search_form = $('#hidden').find('.' + $search_type).clone(); //clone modal
    $.each(search_form.find('.search_element'), function(key, value) { //add data input
        search_inputs = $inputs.split(",");
        $(this).attr('data-input', search_inputs[key]);
        $(this).attr('data-filter-name', $filter_name);
        $search_field = $('.' + $search_type + '_portlet').find('div[data-input="' + search_inputs[key] + '"]');
        if ($search_field.length != 0) {
            previous_value = $search_field.attr('data-value');
            $(this).attr('data-value', previous_value);
            $(this).attr('value', previous_value);
        }
    });
    return search_form;
}

function initSelectOptions($table = null, $search_type = null, $inputs = null, $options_url = null, $options = null, $filter_name = null, $multiple = null) {
    setTargetDataTable($table);
    var search_form = $('#hidden').find('.' + $search_type).clone();
    search_inputs = $inputs.split(",");
    $.each(search_form.find('.search_element'), function(key, value) { //add data input
        $(this).attr('data-input', $inputs);
        $(this).attr('data-url', $options_url);
        $(this).attr('data-search_type', $search_type);
        $(this).attr('data-options', $options);
        $(this).attr('data-filter-name', $filter_name);
        if ($multiple == 'yes') {
            $(this).attr('multiple', 'multiple');
        }
        initDataBaseSelectOptions($(this));
    });
    return search_form;
}

function initDataBaseSelectOptions($select) {
    var url = $select.attr('data-url');
    var inputs = $select.attr('data-input');
    var search_type = $select.attr('data-search_type');
    var select_options = $select.attr('data-options');
    $search_input = $('.' + search_type + '_portlet').find('div[data-input="' + inputs + '"]');
    if (select_options) {
        option = select_options.split(',');
        $.each(option, function(key, value) {
            $select.append($("<option class='search_options' data-input=" + inputs + "></option>").attr("value", option[key]).text(option[key]));
        });
        if ($search_input.length != 0) {
            previous_values = $search_input.attr('data-value');
            setSelectPreviousValues(previous_values, $select);
        }
    } else {
        $.get(url, function(response) {
            if (response['ids'] != null) {
                response['ids'].forEach(function(id, index) {
                    $('select[data-input=' + inputs + ']').append($("<option class='search_options' data-input=" + inputs + "></option>").attr("value", id).text(response['names'][index]));
                });
            } else {
                response.forEach(function(element) {
                    $('select[data-input=' + inputs + ']').append($("<option class='search_options' data-input=" + inputs + "></option>").attr("value", element).text(element));
                });
            }
            if ($search_input.length != 0) {
                previous_values = $search_input.attr('data-value');
                setSelectPreviousValues(previous_values, $select);
            }
        });
    }
    $select.select2();
}

function setSelectPreviousValues(previous_values, $select) {
    selected = [];
    if (typeof previous_values !== 'undefined' && previous_values != '') {
        previous_value = previous_values.split(',');
        $.each(previous_value, function(x, y) {
            if (typeof previous_value[x] !== 'undefined') {
                if ($select.attr("value") == previous_value[x]) { //add selected values
                    selected.push($select.attr("value"));
                    $select.attr("selected", "selected");
                    $select.closest("select").val(selected).select2();
                } else {
                    selected.push(previous_value[x]);
                    $select.attr("selected", "selected");
                    $select.closest("select").val(selected).select2();
                }
            }
        });
    }
}

function initBigSelectOptions($table = null, $search_type = null, $inputs = null, $options_url = null, $options = null, $filter_name = null, $multiple = null) {
    setTargetDataTable($table);
    var search_form = $('#hidden').find('.' + $search_type).clone();
    $.each(search_form.find('.search_element'), function(key, value) {
        if ($(this).length !== 0) {
            $(this).attr('data-input', $inputs);
            $(this).attr('data-url', $options_url);
            $(this).attr("data-minimumInputLength", "3");
            $(this).attr("data-multiple", $multiple);
            $(this).addClass("select2").addClass("big_data");
            $(this).attr('data-filter-name', $filter_name);
            $search_input = $('.' + $search_type + '_portlet').find('div[data-input="' + $inputs + '"]');
            if ($search_input.length != 0) {
                previous_values = $search_input.attr('data-value');
                $(this).attr('data-previous-values', previous_values);
            }
            initBigDataSelect($(this));
        }
    });
    return search_form;
}

function initBigDataSelect($select) {
    var minimumInputLength = $select.attr("data-minimumInputLength");
    var url = $select.attr("data-url");
    var inputs = $select.attr('data-input');
    var multiple = $select.attr('data-multiple');
    $('input[name=selected_to_id]').attr('data-input', inputs);
    pre_selected_ids = $select.attr('data-previous-values');
    if (typeof pre_selected_ids !== 'undefined') {
        if (pre_selected_ids !== "") {
            pre_selected_ids = pre_selected_ids.split(",");
            pre_selected_ids.forEach(function(currentValue, index, arr) {
                $select.append('<option value="' + currentValue + '" >' + currentValue + '</option>');
            })
        }
    }
    if (multiple == 'yes') {
        $select.attr('multiple', 'multiple');
    }
    $select.select2({
        minimumInputLength: minimumInputLength,
        ajax: {
            url: url,
            dataType: 'json',
            delay: 250,
            processResults: function(data) {
                return {
                    results: $.map(data, function(obj) {
                        return {
                            text: obj,
                            id: obj
                        }
                    })
                }
            },
            cache: true
        }
    });
    $select.val(pre_selected_ids).trigger('change');
    $select.addClass("initialized");
}
$(document).on('keyup change', 'input.search_element', function(e) {
    var value = $('input.search_element').filter(function() {
        return $(this).val() != '';
    });
    if (value.length > 0) {
        $('.search_submit').prop('disabled', false);
    } else {
        $('.search_submit').prop('disabled', true);
    }
});
//if change select
$(document).on('change', 'select.search_element', function() {
    if ($(this).val() != null) {
        $('.search_submit').prop('disabled', false);
    } else if ($(this).val() == null) {
        $('.search_submit').prop('disabled', true);
    }
});

function initDataTable(selector) {
    var selector = selector;
    $table = $(selector);
    var nonSortable = [];
    var hidden = [];
    $table.find("th").each(function(key, value) {
        if ($(this).attr("data-hidden") == 1) {
            hidden.push(key);
        }
        if ($(this).attr("data-nonSortable") == 1) {
            nonSortable.push(key);
        }
    });
    var export_excel = $table.attr("data-excel");
    var export_pdf = $table.attr("data-pdf");
    var scrollX = $table.attr("data-scrollX");
    var processing = $table.attr("data-processing");
    var bFilter = $table.attr("data-bFilter");
    var route = $table.attr("data-route");
    var drawCallbackFN = $table.attr("data-drawCallbackFN");
    var bLengthChange = $table.attr("data-bLengthChange");
    var column_data = [];
    var recordsPerPage = $table.attr("data-recordsPerPage");
    var refresh_rate = $table.attr("data-refresh");
    if (typeof recordsPerPage == 'undefined' || recordsPerPage == false) {
        recordsPerPage = 25; //Define recordsPerPage for the old datatables
    }
    if (typeof refresh_rate != 'undefined' && refresh_rate != false) {
        setInterval(function() {
            $table.DataTable().draw();
        }, parseInt(refresh_rate));
    }
    var datatable_obj = $(selector + " th").map(function() {
        return $(this).data('name');
    });
    $.each(datatable_obj, function(key, value) {
        column_data[key] = {
            "data": value
        }
    });
    var table = $(selector).on('preXhr.dt', function ( e, settings, data ) {
            startLoading();
        }).DataTable({
        "pageLength": recordsPerPage,
        "lengthMenu": [
            [1, 25, 50, -1],
            [1, 25, 50, "All"]
        ],
        //--@initialize-table-complete@--
        dom: 'Bfrtipl',
        "bLengthChange": JSON.parse(bLengthChange),
        buttons: [
            // {extend: 'pdf', exportOptions: { columns: ':not(.notexport)'}},
            // {extend: 'excel', exportOptions: {columns: ':not(.notexport)'}},
            // {
            //     extend: 'pdf',
            //     exportOptions: {
            //         columns: [':visible']
            //     }
            // }, {
            //     extend: 'excel',
            //     exportOptions: {
            //         columns: [':visible']
            //     }
            // }, 'colvis'
        ],
        "drawCallback": function(settings) {
            if (drawCallbackFN == "") {
                DefaultDrawCallBack(settings)
            } else {
                window[drawCallbackFN](settings);
            }
            endLoading();
        },
        "searching": false,
        processing: processing,
        serverSide: true,
        scrollX: scrollX,
        "columnDefs": [{
            className: "hidden",
            "targets": hidden
        }, {
            orderable: false,
            targets: nonSortable
        }],
        bFilter: bFilter, //default search is not working on server side datatables
        //--@sorting@--
        //--@disable-sorting@--
        columns: column_data,
        ajax: {
            url: route,
            data: function(d) {
                $("[data-tableID='" + selector + "']").find('.element').each(function() {
                    d[$(this).attr('data-input')] = $(this).attr('data-value');
                });
            }
        }
    });
    /* Elements Reordering */
    if ($(selector).attr('data-tableSortable') == 1) {
        initDataTableSort(selector)
    }
    // hide_show_columns(selector);
    return table;
}

function initDataTableSort(selector) {
    new Sortable($(selector + ' tbody')[0], {
        animation: 150,
        handel: 'tr',
        onUpdate: function() {
            $('.reorder').prop('disabled', false);
        }
    });
}
$(document).on("click", ".multiple_delete", function() {
    var deleted_items = [];
    var table_selector = $(this).attr('data-tableID');
    var url = $(table_selector).attr('data-deleteRoute');
    if ($(".group-checkable").is(":checked")) {
        $("input[name^=items]").each(function() {
            if ($(this).is(":checked")) {
                deleted_items.push($(this).val())
            }
        });
    } else {
        $("input[name^=items]").each(function() {
            if ($(this).is(":checked")) {
                deleted_items.push($(this).val());
            }
        });
    }
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            "item": deleted_items
        },
        success: function(response) {
            $(".group-checkable").attr('checked', false);
            deleted_items.forEach(function($deleted_item) {
                $item = $('input[name^=items][value=' + $deleted_item + ']');
                $(table_selector).DataTable().rows($item.closest('tr')).remove();
            });
            $(table_selector).DataTable().draw();
            toastr.success(response.delete);
        }
    });
});
//Delete from list
$(document).on('click', '.remove-stuff', function(e) {
    e.preventDefault();
    $row = $(this).closest('tr');
    var action = $(this).attr('href');
    var method = $(this).attr('data-method');
    var btnTxt = $(this).attr('data-btn-text');
    var successMsgTitle = $(this).attr('data-success-msg-title');
    var successMsg = $(this).attr('data-success-msg');
    var table = $(this).closest('table');
    if (typeof method == 'undefined') {
        method = 'delete';
    }
    if (typeof btnTxt == 'undefined') {
        btnTxt = "Delete";
    }
    if (typeof successMsgTitle == 'undefined') {
        successMsgTitle = "Deleted!";
    }
    if (typeof successMsg == 'undefined') {
        successMsg = "Successfully deleted";
    }
    swal({
        title: "Are you sure?",
        text: "You won't be able to revert this !",
        type: "warning",
        className: "swal-warning-red-style",
        buttons: ['Cancel' , btnTxt],
        dangerMode: true,
    }).then(function(value) {
        if (!value) return null;

        appBlockUI();
        $.ajax({
            url: action,
            method: method,
            success: function(response) {
                actionChain(response);
                if (response.successMsg) {
                    successMsg = response.successMsg;
                } else {
                    successMsg = 'Successfully deleted';
                }
                if (response.successMsgTitle) {
                    successMsgTitle = response.successMsgTitle;
                } else {
                    successMsgTitle = 'Deleted';
                }
                swal({
                    title: successMsgTitle,
                    text: successMsg,
                    icon: "success",
                    className: "swal-success-style",
                    timer: 2000,
                    buttons: false
                });
                table.DataTable().row($row).remove().draw();
            },
            error: function() {
                toastr['error']('Something went wrong', "Sorry");
            },
            complete: function() {
                appUnBlockUI();
            }
        });
    });
});
$(document).on('click', '.reject', function() {
    var url = $(this).data('action');
    var method = $(this).data('method');
    $.ajax({
        url: url,
        method: method,
        success: function(data) {
            toastr['success']('Successfuly rejected', "Done");
            pjaxPage(data.url);
        },
    });
});
/* Reordering Elements in data table */
$(document).on('click', '.reorder', function() {
    $('.reorder').prop('disabled', true);
    var newSequence = [];
    $('.reorder-vals').each(function(index, element) {
        newSequence.push(element.value);
    });
    url = $(this).data('action');
    var ajaxData = {
        orderList: newSequence
    };
    $.ajax({
        url: url,
        method: 'post',
        data: ajaxData,
        success: function(data) {
            toastr['success'](data.message, "Done reordering");
        }
    })
});
/* End reordering elements in data table*/
/* Drawing data table */
$('#table-dt').on('draw.dt', function() {
    if ($('.table-checkbox:checked').length) {
        $('.delete_multiple').prop('disabled', false);
        $('.group-checkable').prop('checked', true);
    } else {
        $('.delete_multiple').prop('disabled', true);
        $('.group-checkable').prop('checked', false);
    }
});
/* Status Filter */
$(document).on('change', '#status-filter [name=status]', function() {
    pjaxPage($(this).val());
});
$(document).on('change', '.group-checkable', function() {
    if ($(this).is(':checked')) {
        $('.table-checkbox').prop('checked', true);
    } else {
        $('.table-checkbox').prop('checked', false);
    }
    $('.table-checkbox').each(function() {
        if ($(this).is(':checked')) {
            $(this).parents('tr').addClass("active to-remove");
        } else {
            $(this).parents('tr').removeClass("active to-remove");
        }
    });
    var formId = $(this).closest('form').attr('id');
    var $button = $('[data-form=' + formId + ']');
    if ($('.table-checkbox:checked').length) {
        $button.prop('disabled', false);
    } else {
        $button.prop('disabled', true);
    }
});
$(document).on('change', '.table-checkbox', function() {
    var formId = $(this).closest('form').attr('id');
    var $button = $('[data-form=' + formId + ']');
    if ($(this).is(':checked')) {
        $(this).parents('tr').addClass("active to-remove");
    } else {
        $(this).parents('tr').removeClass("active to-remove");
    }
    if ($('.table-checkbox:checked').length) {
        $button.prop('disabled', false);
    } else {
        $('.group-checkable').prop('checked', false);
        $button.prop('disabled', true);
    }
});
$(document).on('click', '.no-sorting', function() {
    $(this).removeClass('sorting sorting_asc sorting_desc');
});

function DefaultDrawCallBack(settings) {
    initTooltips();
    $('.popup').magnificPopup({
        type: 'iframe'
    });
}
$(document).on('keyup', '.search-on-keyup-form input', function() {
    var tableSelector = $(this).attr('data-table-selector');
    var table = $(tableSelector);
    $(this).attr('data-value', $(this).val());
    table.DataTable().draw();
});

function initBigSelectSingleOption($table = null, $search_type = null, $inputs = null, $options_url = null, $options = null, $filter_name = null, $multiple = null) {
    setTargetDataTable($table);
    var search_form = $('#hidden').find('.' + $search_type).clone();
    $.each(search_form.find('.search_element'), function(key, value) {
        if ($(this).length !== 0) {
            $(this).attr('data-input', $inputs);
            $(this).attr('data-url', $options_url);
            $(this).attr("data-minimumInputLength", "3");
            $(this).attr("data-multiple", $multiple);
            $(this).addClass("select2").addClass("big_data")
            $(this).attr('data-filter-name', $filter_name);
            $search_input = $('.' + $search_type + '_portlet').find('div[data-input="' + $inputs + '"]');
            if ($search_input.length != 0) {
                previous_values = $search_input;
                $(this).attr('data-previous-values', previous_values.attr('data-value'));
                $(this).attr('data-previous-text', previous_values.text());
            }
            initBigDataSelectSingle($(this));
        }
    });
    return search_form;
}

function initBigDataSelectSingle($select) {
    var minimumInputLength = $select.attr("data-minimumInputLength");
    var url = $select.attr("data-url");
    var inputs = $select.attr('data-input');
    var multiple = $select.attr('data-multiple');
    $('input[name=selected_to_id]').attr('data-input', inputs);
    pre_selected_ids = $select.attr('data-previous-values');
    pre_selected_text = $select.attr('data-previous-text');
    if (typeof pre_selected_ids !== 'undefined') {
        if (pre_selected_ids !== "") {
            $select.append('<option value="' + pre_selected_ids + '" >' + pre_selected_text + '</option>');
        }
    }
    if (multiple == 'yes') {
        $select.attr('multiple', 'multiple');
    }
    $select.select2({
        minimumInputLength: minimumInputLength,
        ajax: {
            url: url,
            dataType: 'json',
            delay: 250,
            processResults: function(data) {
                if (data['ids'] != null) {
                    return {
                        results: $.map(data['ids'], function(id, index) {
                            return {
                                text: data['names'][index],
                                id: id
                            }
                        })
                    }
                } else {
                    return {
                        results: $.map(data, function(obj) {
                            return {
                                text: obj,
                                id: obj
                            }
                        })
                    }
                }
            },
            cache: true
        }
    });
    $select.val(pre_selected_ids).trigger('change');
    $select.addClass("initialized");
}

$(document).on('click', '.remove-soft', function(e) {
    e.preventDefault();
    $row = $(this).closest('tr');
    var action = $(this).attr('href');
    var table = $(this).closest('table');   
    appBlockUI();
    $.ajax({
        url: action,
        method: 'delete',
        success: function(response) {
            toastr['success'](response.successMsg, "Success");
            table.DataTable().row($row).remove().draw();
        },
        error: function() {
            toastr['error']('Something went wrong', "Sorry");
        },
        complete: function() {
            appUnBlockUI();
        }
    }); 
});