<style type="text/css">
    
.reset-button {

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
  height:50px;
  padding: 15px;
}

.reset-button:hover {
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
.goto-login-div{
text-align: left;
padding-top: 120px;
padding-right: 0px !important;
padding-left: 0px !important;
}
.reset-div{
text-align: right;
padding-top: 120px;
padding-right: 0px !important;
padding-left: 0px !important;
}

.email-div{
    padding-top: 60px;
}
.has-error .help-block{
    color:#fff !important;
}
.success_msg{
    text-align: center;
        font-size: 18px;
}
</style>
<!-- Main Content -->
                <!-- <div class="panel-heading">Reset Password</div> -->
                <div class="reset">
                    @if (session('status'))
                        <div class="success_msg">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form class="form-horizontal" role="form" method="POST" action="{{ url('/password/email') }}">
                        {{ csrf_field() }}

                        <div class="{{ $errors->has('email') ? ' has-error' : '' }}">
                            

                            <div class="col-lg-12 email-div">
                                <input placeholder="EMAIL" id="email" type="email" class="box" name="email" value="{{ old('email') }}">

                                @if ($errors->has('email'))
                                
                                   <div style="margin-top:3px;">This email does not match our records.</div>
                                @endif
                            </div>
                        </div>

                        

                            <div class="col-lg-4 goto-login-div">
                                <a href="/logout"><button type="button" class="goto-login">Go to Login</button></a>
                            </div>

                            <div class="col-lg-8 reset-div">
                                    <button type="submit" class="reset-button">
                                        <i class="fa fa-btn fa-envelope"></i> Send Password Reset Link
                                    </button>
                            </div>    

                            
                          
                        
                    </form>
                </div>
