const { mix } = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/assets/js/app.js", "public/js")

mix.sass("resources/assets/sass/app.scss","public/css/app.css");


mix.combine([
        "resources/assets/js/builder_scripts/datatables.js",
        "resources/assets/js/builder_scripts/forms.js",
        "resources/assets/js/builder_scripts/scripts.js",
        "resources/assets/js/builder_scripts/steps.js",
        "resources/assets/js/builder_scripts/uploader.js",
        "resources/assets/js/builder_scripts/week-picker.js",
        "resources/assets/js/builder_scripts/countries.js",
        "resources/assets/js/builder_scripts/popups.js",
        "resources/assets/js/builder_scripts/components-bootstrap-select.js",
        "resources/assets/js/scripts/handsontable-chosen-editor.js",
        "resources/assets/js/builder_scripts/datatables.bootstrap.js",
    ],
    "public/assets/all_custom_builder_scripts.js");

mix.sass([
        "resources/assets/sass/builder_css/styles.css",
        "resources/assets/sass/builder_css/theme.css",
        "resources/assets/sass/builder_css/week-picker-view.css",
        "resources/assets/sass/builder_css/datatables.bootstrap.css",
    ],
    "public/assets/all_custom_builder_css.css");





