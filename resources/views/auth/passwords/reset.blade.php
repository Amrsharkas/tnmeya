<style type="text/css">

.reset-password {

z-index:1000000000000000000;
border-radius:100px;
background-color: #8291c3;
color:white;
    width: auto;

text-transform: uppercase;

  font-weight: 500;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  height:auto;
  padding: 15px;
}

.reset-password:hover {
  background-color: #8291c3;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.4);
  color:white;
  transform: translateY(-7px);
}
.goto-login {

z-index:1000000000000000000;
border-radius:100px;
background-color: #e2e5f4;
color:#6e7484;
    width: auto;

text-transform: uppercase;

  font-weight: 500;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  height:auto;
  padding: 15px;
}

.goto-login:hover {
  background-color: #e2e5f4;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.4);
  color:#6e7484;
  transform: translateY(-7px);
}
.reset-pass-div{
text-align: center;
float: left;
padding-right: 0px;
padding-left: 0px;
padding-top: 130px
}    

.reset-form { margin-top: 50px; }

</style>
@extends('auth.welcome_login')

@section('login_body')

        <div class="col-lg-12 reset-form">

                    <form class="form-horizontal" role="form" method="POST" action="{{ url('/password/reset') }}">
                        {{ csrf_field() }}

                        <input type="hidden" name="token" value="{{ $token }}">

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">

                            <div class="col-md-12">
                                <input id="email" type="email" class="form-control box" name="email" value="{{ $email or old('email') }}" placeholder="EMAIL">

                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">

                            <div class="col-md-12">
                                <input id="password" type="password" class="form-control box" name="password" placeholder="Password">

                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                            <div class="col-md-12">
                                <input id="password-confirm" type="password" class="form-control box" name="password_confirmation" placeholder="Confirm Password">

                                @if ($errors->has('password_confirmation'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password_confirmation') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                            
                       

                        
                            <div class="col-lg-6 reset-pass-div">
                                <a href="/logout"><button type="submit" class="goto-login">Go to Login Form</button></a>
                            </div>

                            <div class="col-lg-6 reset-pass-div">
                                <button type="button" class="reset-password">
                                    <i class="fa fa-btn fa-refresh"></i> Reset Password
                                </button>
                            </div>
                        

                    </form>

        </div>
        <script type="text/javascript">
    $( document ).ready(function() {
        $('.login-msg').html('Reset Your Password');
    });
</script>

@endsection
