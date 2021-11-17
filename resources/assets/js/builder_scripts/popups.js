$(document).on('ready pjax:success', function() {
    $('.popup').magnificPopup({
        type: 'iframe',
        callbacks: {
            open: function() {
                if (typeof popupExtraAcions !== "undefined") {
                    // safe to use the function
                    popupExtraAcions();
                }
                // Will fire when this exact popup is opened
                // this - is Magnific Popup object
            },
            close: function() {
                //  console.log(typeof onVendorRatingPopupClose);
                // if (typeof onVendorRatingPopupClose !== "undefined") {
                //              onVendorRatingPopupClose();
                //          }
            }
            // e.t.c.
        }
    });
    $('.popup_image').magnificPopup({
        type: 'image',
        callbacks: {
            open: function() {
                // Will fire when this exact popup is opened
                // this - is Magnific Popup object
            },
            close: function() {
                var url = document.URL;
                var goTo = url.replace("#", "");
                //pjaxPage(goTo);
            }
            // e.t.c.
        }
    });
    $('.popup_refresh').magnificPopup({
        type: 'iframe',
        callbacks: {
            open: function() {
                // Will fire when this exact popup is opened
                // this - is Magnific Popup object
            },
            close: function() {
                var url = document.URL;
                // var goTo = url.replace("#", "");
                console.log(url);
                // pjaxPage(url);
                location.reload();
            }
            // e.t.c.
        }
    });
    $('.popup_refresh_tab').magnificPopup({
        type: 'iframe',
        callbacks: {
            beforeOpen: function() {
                // console.log(this.st.el);
            },
            open: function() {
                // Will fire when this exact popup is opened
                // this - is Magnific Popup object
            },
            close: function() {
                var url = document.URL;
                var goTo = url.split("#");
                var goTox = goTo[0].split("?element");
                //console.log($(this));
                // pjaxPage(goTo[0]);
                pjaxPage(goTox[0] + "?element=" + this.st.el.attr("id"));
                //location.reload();
            }
            // e.t.c.
        }
    });
});

function closePopup() {
    $.magnificPopup.close();
}