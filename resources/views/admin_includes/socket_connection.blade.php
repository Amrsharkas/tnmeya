@if(isset(Auth::user()->id))
    <script type="text/javascript">
        var domain = window.location.hostname;
        conn = new Connection(<?php echo Auth::user()->id;?>, "chatwindow", "108.161.135.29:2000");
    </script>
@endif
