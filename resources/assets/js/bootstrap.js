
window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.$ = window.jQuery = require('jquery'); //done
    require('tether')
    // window.Popper=require('@popperjs/core')
    require('bootstrap/dist/js/bootstrap.bundle') //done
    require('datatables.net-dt') ////done
    require('datatables-bootstrap')//done
    require('datatables.net-buttons')//done
    require('datatables.net-buttons-bs4')//done
    // require('bootstrap-datepicker')
    window.jsvalidator= require('jsvalidator')//done
    require('js-validation')
    window.toastr=require('toastr/toastr') //done check color
    require('select2') //done
    window.swal = window.sweetalert = window.Sweetalert2 = require('sweetalert') //done
    require('bootstrap-timepicker') //done
    window.qq=require('fine-uploader/lib/all')
    //waring fine uploader has many types please require used type
    require('@fancyapps/fancybox') //done
    // require('jquery-fancybox/source/js/jquery.fancybox')
    window.Handsontable=require('handsontable/dist/handsontable') //done
    require('pusher-js') //done
    require('chart.js') //done
    require('chartjs-plugin-datalabels') //done
    require('jscroll') //done
    ////// tinymce
    require('tinymce') //done
    require('tinymce/themes/modern/theme') //done
    require('tinymce/plugins/link/plugin.min') //done
    require('tinymce/plugins/paste/plugin.min') //done
    require('tinymce/plugins/table/plugin.min') //done
    require('tinymce/plugins/autoresize/plugin.min') //done
    //////
    require('tinymce/plugins/advlist/plugin.min') //done
    require('tinymce/plugins/autolink/plugin.min') //done
    require('tinymce/plugins/lists/plugin.min') //done
    require('tinymce/plugins/image/plugin.min') //done
    require('tinymce/plugins/charmap/plugin.min') //done
    require('tinymce/plugins/print/plugin.min') //done
    require('tinymce/plugins/preview/plugin.min') //done
    require('tinymce/plugins/anchor/plugin.min') //done
    require('tinymce/plugins/textcolor/plugin.min') //done
    require('tinymce/plugins/searchreplace/plugin.min') //done
    require('tinymce/plugins/visualblocks/plugin.min') //done
    require('tinymce/plugins/code/plugin.min') //done
    require('tinymce/plugins/fullscreen/plugin.min') //done
    require('tinymce/plugins/insertdatetime/plugin.min') //done
    require('tinymce/plugins/media/plugin.min') //done
    require('tinymce/plugins/contextmenu/plugin.min') //done
    require('tinymce/plugins/help/plugin.min') //done
    require('tinymce/plugins/wordcount/plugin.min') //done

    /////
    window.intlTelInput=require('intl-tel-input') //done
    window.dragula=require('dragula') //done
    window.Sortable=require('sortablejs/Sortable') //done
    require('jquery-editable-select') //done
    require('magnific-popup') //done
    require('jquery-slimscroll') //done
    window.Cookies=require('js-cookie') //done
    require('@audithsoftworks/jquery.uniform') //done

    // require('bootstrap-switch')
    require('bootstrap4-toggle/js/bootstrap4-toggle.min') //done
    require('bootstrap-hover-dropdown') //done
    //require('bootstrap-datepicker')
    window.selectpicker= require('bootstrap-select') //done
    require('jquery-blockui') //done
    require('jquery-ui') //done
    require('jquery-locationpicker') //done
    require('google-maps')
    require('@googlemaps/google-maps-services-js')
    require('jquery-pjax') //done

    //twitter-bootstrap contain all bootstrap js so include that you need
    // require('twitter-bootstrap')
    //end twitter-bootstrap
    require('jquery-validation')//done
    window.bootbox=require('bootbox') //done
    window.moment=require('moment/moment') //done
    // require('bootstrap-datetimepicker')
    window.datetimepicker=require('bootstrap4-datetimepicker') //done
    require('@liferay/jquery-form/jquery.form')
    require('bootstrap-datetime-picker') //done
    // require('jquery-slim')
    window.jsPanel=require('jspanel4/dist/jspanel') //done
    window.pdfMake = require('pdfmake/build/pdfmake.js'); //done
    window.pdfFonts = require('pdfmake/build/vfs_fonts'); //done
    require('chosen-js') //done
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

// window.axios = require('axios');
//
// window.axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
