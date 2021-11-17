@extends('admin.master_login')

@section('add_css')
    <link href="/assets/admin/pages/css/login.css" rel="stylesheet" type="text/css"/>
@stop

@section('add_js_scripts')
    <script src="{{asset('/assets/global/scripts/app.js')}}" type="text/javascript"></script>

    <script src="{{asset('/assets/admin/pages/scripts/login.min.js')}}" type="text/javascript"></script>

@stop

@section('add_inits')
    Login.init();
@stop

@section('title')
    Login
@stop

@section('logo')

    <div class="logo">
        <img src="/images/logo.png" alt="logo" height='20'  class="logo-default"/>

    </div>

@stop

@section('login_form')

    <form class="login-form" role="form" method="POST" action="{{ url('/login') }}">
        {{ csrf_field() }}
        <h3 class="form-title font-color">Sign In</h3>
        <div class="alert alert-danger display-hide">
            <button class="close" data-close="alert"></button>
            <span>Enter any username and password. </span>
        </div>
        <div class="form-group {{ $errors->has('email') ? ' has-error' : '' }}">
            <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
            <label for="email" class="control-label visible-ie8 visible-ie9">E-Mail Address</label>
            <input id="email" type="email" class="form-control form-control-solid placeholder-no-fix" name="email" value="{{ old('email') }}" placeholder="E-mail Address">
            @if ($errors->has('email'))
                <span class="help-block">
                    <strong>{{ $errors->first('email') }}</strong>
                </span>
            @endif
        </div>
        <div class="form-group {{ $errors->has('password') ? ' has-error' : '' }}">
            <label class="control-label visible-ie8 visible-ie9">Password</label>
            <input id="password" class="form-control form-control-solid placeholder-no-fix" type="password" autocomplete="off" placeholder="Password" name="password"/>
            @if ($errors->has('password'))
                <span class="help-block">
                    <strong>{{ $errors->first('password') }}</strong>
                </span>
            @endif
        </div>
        <div class="form-actions">
            <button type="submit" class="btn btn-md color uppercase">Login</button>
            <label class="rememberme check">
                <input type="checkbox" name="remember"> Remember Me
            </label>
            <a href="javascript:;" id="forget-password" class="forget-password font-color">Forgot Password?</a>

            {{--<a href="javascript:;" id="forget-password" class="forget-password">Forgot Password?</a>--}}
        </div>
        <div class="create-account">
            {{--<p>
                <a href="javascript:;" id="register-btn" class="uppercase">Create an account</a>
            </p>--}}
        </div>
    </form>
   
@stop
@section('forget_form')

    <form class="forget-form" action="{{ url('/password/email') }}" method="post">

        {{ csrf_field() }}
        <h3>Forget Password ?</h3>
        <p>
            Enter your e-mail address below to reset your password.
        </p>
        <div class="form-group">
            <input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Email" name="email"/>
        </div>
        <div class="form-actions">
            <button type="button" id="back-btn" class="btn btn-edit pull-left">Back</button>
            <button type="submit" class="btn color uppercase pull-right">Submit</button>
        </div>
    </form>

@stop
@section('footer')
<div class="login-footer">
    <div class="row bs-reset">
        <div class="col-xs-7 bs-reset">
            <div class="login-copyright text-right">
                <p> 2016 © SMART Project Management</p>
            </div>
        </div>
    </div>
</div>
    @stop