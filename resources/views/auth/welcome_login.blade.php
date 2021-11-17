<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link rel="stylesheet" href="{{asset('assets/global/css/bootstrap4.min.css')}}" type="text/css">


    <link href='/css/login.css' rel="stylesheet" type="text/css">
    <link href="{{asset('assets/global/plugins/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet"
          type="text/css"/>

    <script src="{{asset('assets/global/scripts/jquery-3.2.1.slim.min.js')}}"></script>
    <script src="{{asset('assets/global/scripts/popper.min.js')}}"></script>
    <script src="{{asset('assets/global/scripts/bootstrap4.min.js')}}"></script>
    <link href="{{asset('assets/global/plugins/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700">

    <!-- Styles -->
    <link href='{{asset('assets/global/css/twitter-bootstrap3.min.css')}}' rel="stylesheet" type="text/css">
    <link href="{{asset('assets/global/plugins/bootstrap-toastr/toastr.min.css')}}" rel="stylesheet" type="text/css"/>

    {{--<script language="JavaScript" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>--}}
    <script src="{{asset('assets/global/scripts/tether.min.js')}}"></script>
    <script src="{{asset('assets/global/scripts/twitter-bootstrap4.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/global/plugins/bootstrap-toastr/toastr.min.js')}}"></script>

    <title>Login</title>
</head>

<body class="welcome-background">

<div class="row welcome-header"><img class="logo" src="/images/logo 2.png"/></div>

<div class="row body-content">
    <div class="col-xl-8 col-md-12  welcome-content-8">
        <div class="img ">

            <div class="col-lg-6 welcome-text">
                <span class="welcome-title">WELCOME</span>
                <span class="welcome-msg">to Qurtoba Management System <br/>
                                    Please enter your email and password to login</span>
            </div>

            <div class="col-lg-6 col-md-12 login">

                <div class="black-bk">

                    <div class="first">
                        <img class="small-logo" src="/images/logoicon.png"/>
                        <div class="login-msg">Login below</div>
                    </div>
                    @yield('login_body')


                </div>

            </div>
        </div>
    </div>

    <div class="col-md-4 welcome-content-4"></div>

</div>
<div class="row footer">
    <span class="footer-font">Qurtoba Management System <br/> Development by Qurtoba</span>
</div>
<div class="hidden" id="hidden">
    @include('auth.passwords.email')
</div>
<?php if(isset($_GET['reset'])){?>
<script>
    $(document).ready(function () {
        $('.for-pass').click();
    });
</script>
<?php } ?>
<script type="text/javascript">
    $(document).on('click', '#login_button', function () {
        $(this).attr('disabled', 'disabled');
        $(".login-form").submit();
    });


    setTimeout(function () {
        location.reload();
    }, 7200000);
    $(document).on('click', '.for-pass', function (e) {
        e.preventDefault();
        $(".help-block").hide();
        $('#form').remove();
        var clone = $('#hidden').find('.reset').clone();
        $('.form').append(clone);
        $('.third').remove();
        $("#login_button").remove();
        $('.login-msg').html('Enter Your Email');
        if (window.location.href.indexOf("?reset") > -1) {
        } else {
            window.history.replaceState(null, null, window.location + "?reset");
        }
    })
</script>
</body>
</html>











