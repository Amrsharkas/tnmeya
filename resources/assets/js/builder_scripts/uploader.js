function initFineUploader(uploader) {
    selector = uploader.attr('data-selector');
    entity_id = uploader.attr('data-entity-id');
    allowed_extensions = uploader.attr('data-allowed-extensions').split(',');
    maximum_file_size = uploader.attr('data-maximum-file-size');
    youtube_videos = uploader.attr('data-youtube-videos');
    encrypt_files = uploader.attr('data-encrypt-files');
    multiple = uploader.attr('data-multiple');
    model = uploader.attr('data-model');
    field = uploader.attr('data-field');
    $max_width = uploader.attr('data-max-width');
    if ($max_width == "" || $max_width == "undefined") {
        $max_width = 10000000000000;
    }
    $max_height = uploader.attr('data-max-height');
    if ($max_height == "" || $max_height == "undefined") {
        $max_height = 10000000000000;
    }
    $min_width = uploader.attr('data-min-width');
    if ($min_width == "" || $min_width == "undefined") {
        $min_width = 0;
    }
    $min_height = uploader.attr('data-min-height');
    if ($min_height == "" || $min_height == "undefined") {
        $min_height = 0;
    }
    runFineUploader(selector, maximum_file_size, youtube_videos, encrypt_files, multiple, model, field, entity_id, allowed_extensions, $min_width = 0, $min_height = 0, $max_width, $max_height, $scaling_max_size = 10000000000000);
}

function runFineUploader(selector, maximum_file_size, youtube_videos, encrypt_files, multiple, model, field, entity_id, allowedExtensions, $min_width = 0, $min_height = 0, $max_width, $max_height, $scaling_max_size = 10000000000000) {
    var errorHandler = function(id, fileName, reason) {
            return qq.log("id: " + id + ", fileName: " + fileName + ", reason: " + reason);
        },
        validatingUploader;
    var uploaded_ids = '';
    validatingUploader = new qq.FineUploader({
        element: document.getElementById(selector),
        multiple: multiple,
        request: {
            endpoint: "/files/endpoint",
            params: {
                "_token": $('meta[name=csrf-token]').attr('content')
            }
        },
        deleteFile: {
            enabled: true,
            endpoint: "/files/endpoint",
            forceConfirm: true,
            params: {
                "_token": $('meta[name=csrf-token]').attr('content'),
                "model": model,
                "field": field,
                "multiple": multiple,
            }
        },
        debug: false,
        validation: {
            allowedExtensions: allowedExtensions,
            sizeLimit: maximum_file_size,
            minSizeLimit: 0,
            image: {
                minWidth: $min_width,
                minHeight: $min_height,
                maxWidth: $max_width,
                maxHeight: $max_height
            }
        },
        text: {
            uploadButton: "Click Or Drop"
        },
        display: {
            fileSizeOnSubmit: true
        },
        chunking: {
            enabled: true,
            concurrent: {
                enabled: false
            },
            success: {
                endpoint: "/files/endpoint?done"
            }
        },
        resume: {
            enabled: true
        },
        retry: {
            enableAuto: true
        },
        scaling: {
            sendOriginal: false,
            sizes: [{
                name: "original",
                maxSize: $scaling_max_size
            }]
        },
        callbacks: {
            onError: errorHandler,
            onComplete: function(id, filename, responseJSON, xhr) {
                var uuid = this.getUuid(id);
                $.ajax({
                    url: "/files/save_file",
                    method: "post",
                    data: {
                        uuid: uuid,
                        name: filename,
                        youtube_videos: youtube_videos,
                        encrypt_files: encrypt_files,
                        multiple: multiple,
                        model: model,
                        field: field,
                        entity_id: entity_id
                    },
                    success: function(response) {
                        uploaded_ids = uploaded_ids.concat(',' + response); //add uploaded id
                    },
                    async: false
                });
                if (typeof uploaderComplete !== "undefined") {
                    // safe to use the function
                    uploaderComplete(selector);
                }
            },
            onAllComplete: function() {
                appUnBlockUI();
                $("#" + selector).find(".qq-upload-button").show();
                if (typeof uploaderAllComplete !== "undefined") {
                    // safe to use the function
                    uploaderAllComplete(uploaded_ids);
                }
                if ($("#" + selector).attr("data-uploaderAllComplete") != "" && typeof $("#" + selector).attr("data-uploaderAllComplete") != "undefined") {
                    window[$("#" + selector).attr("data-uploaderAllComplete")](selector);
                }
                uploaded_ids = '';
            },
            onSubmit: function(id, name) {
                appBlockUI();
                $("#" + selector).find(".qq-upload-list li").hide();
                $("#" + selector).find(".qq-upload-button").hide();
            },
            onDeleteComplete: function(id, isError) {
                var uuid = this.getUuid(id);
                if (typeof uploaderRemove !== "undefined") {
                    // safe to use the function
                    uploaderRemove(selector);
                }
            }
        }
    });
}