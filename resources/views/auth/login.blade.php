@extends('auth.welcome_login')

@section('login_body')

    <div class="second">

        <div class="form">

            <form id="form" class="login-form" role="form" method="POST" action="{{ url('/login') }}">
                {{ csrf_field() }}
                <input type="email" class="box" placeholder="EMAIL" name="email" required="required"/>

                <input type="password" class="box" placeholder="PASSWORD" name="password"/>
                <div class="keep_me">
                    <label class="checklabel">
                        <input class="check" type="checkbox" value=""
                               name="remember">Keep me signed in.</label>
                </div>
                @if ($errors->has('email'))
                    <span class="help-block" style="margin-top:30px;">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                @endif


        </div>

    </div>

    <div class="third">
        <div class="forgot" @if ($errors->has('email')) style="margin-top:50px !important;" @endif >
            <a class="for-pass" href="/login?reset">Forgot
                password?</a>
        </div>

        <div class="login-button" @if ($errors->has('email')) style="margin-top:90px !important;" @endif >
            <button id="login_button" type="submit" class="btnn">LOGIN</button>
        </div>
        </form>
    </div>

@endsection                  