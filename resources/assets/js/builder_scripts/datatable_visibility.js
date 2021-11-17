function on_reload_datatable($datatable) {
    $.ajax({
        url: '/datatable_invisible_columns',
        method: 'post',
        data: {
            datatable: $datatable
        },
        success: function(data) {
            var indeces = [];
            $($datatable).DataTable().columns().visible(true);
            $('.toggle-vis').attr('checked', 'checked');
            $.each(data, function(k, v) {
                var column = $(v.datatable).find('th[data-name=' + v.column_name + ']');
                var colIndex = column.parent().children().index(column);
                indeces.push(colIndex);
                $('.toggle-vis[name=' + v.column_name + ']').attr('checked', false);
            })
            $.each(indeces, function(k, v) {
                $($datatable).DataTable().column(v).visible(false);
            })
        },
        error: function() {
            swal('error', 'error', 'error');
        }
    })
}
$(document).on('change', '.toggle-vis', function() {
    var datatable = $(this).closest('ul').attr('data-datatable');
    var column_name = $(this).attr('name');
    // var column = $(datatable).find('th[data-name='+column_name+']');
    // var colIndex = column.parent().children().index(column);
    // var column = teachers_925.column(colIndex);
    // console.log(colIndex);
    if ($(this).is(":checked")) {
        // column.visible(false);
        var visibility = true;
    } else {
        // column.visible(true);
        var visibility = false;
    }
    $.ajax({
        url: '/datatable_visibility',
        method: 'post',
        data: {
            datatable: datatable,
            column_name: column_name,
            visibility: visibility
        },
        success: function() {
            on_reload_datatable(datatable);
        },
        error: function() {
            swal('error', 'error', 'error');
        }
    })
    // console.log(colIndex);
});