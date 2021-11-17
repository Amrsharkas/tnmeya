<div id="signature-pad" class="m-signature-pad">
    <button onclick="goBack()" class="btn btn-info">Go Back</button>
    <div class="m-signature-pad--body">
        <canvas></canvas>
    </div>
    <div class="m-signature-pad--footer">
        <div class="description">Sign above</div>
        <div class="left">
            <button type="button" class="button btn-danger clear" data-action="clear">Clear</button>
        </div>
        <div class="right">
            <button type="button" class="button btn-edit save" data-action="save-png">Save</button>
        </div>

    </div>

</div>
<script>
    function goBack() {
        window.history.back();
    }

    var wrapper = document.getElementById("signature-pad"),
        canvas = wrapper.querySelector("canvas"),
        signaturePad;


    function resizeCanvas(canvas) {
        var ratio = window.devicePixelRatio || 1;
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
    }


    resizeCanvas(canvas);
    signaturePad = new SignaturePad(canvas);

    $('button.clear').click(function () {
        signaturePad.clear();
    });

    $('button.save').click(function () {
        if (signaturePad.isEmpty()) {
            alert("Please provide signature first.");
        } else {
            $signature = signaturePad.toDataURL();
            $.ajax({
                type: "POST",
                url: "{{route('files.addSignature')}}",
                data: {
                    image: $signature
                }
            }).done(function (respond) {
                $uuid = respond;
                $.ajax({
                    type: "POST",
                    url: "{{route('files.save_file')}}",
                    data: {
                        uuid: $uuid,
                        name: "signature.png",
                        youtube_videos: "0",
                        encrypt_files: "1",
                        multiple: "false",
                        model: "<?php echo $model; ?>",
                        field: "<?php echo $field; ?>",
                        entity_id: "<?php echo $id; ?>"

                    }
                }).done(function (respond) {
                    swal("Saved!", 'Saved Signature Successfully', "success");

                    {{--// you will get back the temp file name--}}
                    {{--// or "Unable to save this image."--}}
                    {{--console.log(respond);--}}
                });
            });

//                    signaturePad.clear();
        }
    });


</script>