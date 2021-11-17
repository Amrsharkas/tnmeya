@extends('admin.master_login')

@section('add_css')
    <link href="{{asset('/assets/pages/css/login-5.css')}}" rel="stylesheet" type="text/css"/>
    <link href="{{asset('assets/global/css/general-style.css')}}" rel="stylesheet" type="text/css" />

<link href="/css/style.bundle.css" rel="stylesheet" type="text/css" />
@stop


@section('add_js_scripts')
	<script src="{{asset('assets/global/plugins/jquery.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('/assets/admin/pages/scripts/login.js')}}" type="text/javascript"></script>
    <script type="text/javascript">
	setTimeout(function(){ location.reload(); }, 7200000);
	
	</script>
    

@stop

@section('add_inits')
    Login.init();
@stop

@section('title')
    Login
@stop

{{--@section('logo')--}}

    {{--<div class="logo">--}}
        {{--<img src="/images/logo.png" alt="logo" height='20'  class="logo-default"/>--}}

    {{--</div>--}}

{{--@stop--}}

@section('login_form')
    <div class="user-login-5">
        <div class="col-md-6 bs-reset">
            <div class="login-bg" style="background-image:url(/assets/admin/pages/img/login/bg1.jpg)">
                 </div>
        </div>
        <div class="col-md-6 login-container bs-reset">
            <div class="login-content">
            
                <h1 class="font-color"><img class="login-logo" src="/images/logo.png" style="text-align:center; height: 100px" /></h1>
                <p> Welcome to the Linguistix Tank Management System</p>
                <p> Please enter your email and password to login </p>
                <form class="login-form" role="form" method="POST" action="{{ url('/login') }}">
                    {{ csrf_field() }}
                    <div class="alert alert-danger" style="display:none;">
                        
                        <span>Enter any username and password. </span>
                    </div>
                    <div class="row">
                        <div class="col-xs-6 {{ $errors->has('email') ? ' has-error' : '' }}">
                            <input class="form-control form-control-solid placeholder-no-fix form-group" type="email" autocomplete="off" placeholder="E-mail Address" name="email" required/>
                            @if ($errors->has('email'))
                                <span class="help-block">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                            @endif
                        </div>

                        <div class="col-xs-6 {{ $errors->has('password') ? ' has-error' : '' }}">
                            <input class="form-control form-control-solid placeholder-no-fix form-group" type="password" autocomplete="off" placeholder="Password" name="password" required/>
                            @if ($errors->has('password'))
                                <span class="help-block">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                            @endif
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="rem-password">
                                <label class="rememberme mt-checkbox mt-checkbox-outline check">
                                    <input type="checkbox" name="remember"  /> Remember me
                                    <span></span>
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-8 text-right">
                            <div class="forgot-password">
                                <a href="javascript:;" id="forget-password" class="forget-password btn font-color">Forgot Password?</a>
                            </div>
                            <button class="btn btn-info" type="submit" id="login_button">Sign In</button>
                        </div>
                    </div>
                </form>
                <!-- BEGIN FORGOT PASSWORD FORM -->
                <form class="btn btn-primary forget-form" style="display:none;" action="{{ url('/password/email') }}" method="post">
                    {{ csrf_field() }}
                    <h3 class="font-color">Forgot Password ?</h3>
                    <p> Enter your e-mail address below to reset your password. </p>
                    <div class="form-group">
                        <input class="form-control placeholder-no-fix form-group" type="text" autocomplete="off" placeholder="Email" name="email" /> </div>
                    <div class="form-actions">
                        <button type="button" id="back-btn" class="btn btn-info btn-outline pull-left">Back</button>
                        <button type="submit" class="btn btn-info uppercase pull-right">Submit</button>
                    </div>
                </form>
                <!-- END FORGOT PASSWORD FORM -->
            </div>
            <div class="login-footer">
                <div class="row bs-reset">
                    <div class="col-xs-7 bs-reset">
                        <div class="login-copyright text-right">
                            <p> 2018 © WorkFlow Builder, Development by <a href="http://www.arabiclocalizer.com" target="_blank">Arabic Localizer</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

@stop