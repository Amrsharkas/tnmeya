<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css" integrity="sha384-gXt9imSW0VcJVHezoNQsP+TNrjYXoGcrqBZJpry9zJt8PCQjobwmhMGaDHTASo9N" crossorigin="anonymous">
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="/css/style2.css?v=1">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"></script> 
    <script src="https://malsup.github.io/jquery.form.js"></script>


<!-- jQuery Modal -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
        <title>مقياس الثقة العام</title>

    </head>
    <body style="direction: rtl;">
        
        <div class="header">
        <img src="/images/logo2.jpeg" class="logo">
    </div>
    <div id="quiz">
        <span class="title">مقياس الثقة العام</span>
        <p>عزيزي المتدرب أشكر تفضلك بأداء هذا المقياس المصمم لقياس درجة الثقة بالنفس، وأرجو منك الإجابة عن جميع فقرات هذا الاستبيان، مع رجائي الحار أن تكون إجاباتك على درجة عالية من الموضوعية والشفافية، مع الأخذ بعين الاعتبار أنه لا توجد إجابات صحيحة وأخرى خاطئة.
</p>

<form method="post" action="/result2" id="myForm1">
    @csrf
    <div id="ex2" class="modal" >
  <div class="form-group" >
    <label for="useremail">البريد الإلكتروني</label>
    <input required type="email" class="form-control" id="useremail" aria-describedby="emailHelp" placeholder="البريد الإلكتروني">
    
  </div>

  <div class="form-group" >
    <label for="username">الاسم</label>
    <input required type="text" class="form-control" id="username"  placeholder="الاسم">
    
  </div>

  <div class="form-group" >
    <label for="userphone">رقم التليفون</label>
    <input required type="text" class="form-control" id="userphone"  placeholder="رقم التليفون">
    
  </div>
  
  
  <button type="submit" class="btn btn-primary submit-form">اتمام</button>
</div>
<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col" width="75" style="text-align:center;">#</th>
      <th scope="col">العبارة</th>
      <th scope="col">غالبًا</th>
      <th scope="col">أحيانًا</th>
      <th scope="col">نادرًا</th>
    </tr>
  </thead>
  <tbody>
    @foreach($questions as $key => $question)
    @php
    if($question->is_negative == 1){
        $most_probably = 1;
        $rarely = 3;
    }else{
        $most_probably = 3;
        $rarely = 1;
    }
    @endphp
    <tr data-done="0">
      <th scope="row"  style="text-align:center;">{{$key+1}}</th>
      <td>{{$question->question}}</td>
      <td><input   type="radio" value="{{$most_probably}}" name="options-{{$key}}" class="btn-check" id="btn-check-outlined-{{$key}}-1" autocomplete="off">
<label class="btn btn-outline-secondary" for="btn-check-outlined-{{$key}}-1">غالبًا</label></td>
      <td><input type="radio" value="2" name="options-{{$key}}" class="btn-check" id="btn-check-outlined-{{$key}}-2" autocomplete="off">
<label class="btn btn-outline-secondary" for="btn-check-outlined-{{$key}}-2">أحيانًا</label></td>
      <td><input type="radio" value="{{$rarely}}" name="options-{{$key}}" class="btn-check" id="btn-check-outlined-{{$key}}-3" autocomplete="off">
<label class="btn btn-outline-secondary" for="btn-check-outlined-{{$key}}-3">نادرًا</label></td>
    </tr>
    @endforeach
  </tbody>
</table>



<div class="submit-button"><button type="button">اتمام</button></div>
<input type="hidden" name="email" id="email" />
<input type="hidden" name="name" id="name" />
<input type="hidden" name="phone" id="phone" />
</form>
<footer><span>
المقياس من إعداد الدكتور رأفت رخا
</span></footer>
</div>
<div id="result"></div>

<script type="text/javascript">
    function ValidateEmail(input) {

      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (input.match(validRegex)) {

        

        return true;

      } else {

        

        return false;

      }

    }


    $(document).on('change', '.btn-check', function (e) {

        $(this).closest("tr").attr('data-done',1);
        $(this).closest("tr").removeClass('error');

    });
    
    $(document).on('click', '.submit-button', function (e) {

        var unAnswered = $("table").find(`[data-done='0']`).length;
        if(unAnswered != 0){
            $("table").find(`[data-done='0']`).addClass('error');
            $([document.documentElement, document.body]).animate({
                scrollTop: $("table").find(`[data-done='0']:first`).offset().top
            }, 1000);
            return false; 
        }else{
            $(".modal").modal();
        }

    });
    $(document).on('click', '.submit-form', function (e) {
        if($("#useremail").val() == ''){
            alert("Email is required");
            return false;
        }
        if(!ValidateEmail($("#useremail").val())){
            alert("Invalid Email Address");
            return false;
        }
        if($("#username").val() == ''){
            alert("Name is required");
            return false;
        }
        if($("#userphone").val() == ''){
            alert("Phone is required");
            return false;
        }
        $("#email").val($("#useremail").val());
        $("#name").val($("#username").val());
        $("#phone").val($("#userphone").val());
        $("#myForm1").submit();

    });
    
    $(document).on('click', '.go-back', function (e) {
        
        $("#quiz").show(100);
        $("#result").html("");
        $.modal.close();

    });
    
    // prepare the form when the DOM is ready 
$(document).ready(function() { 
    var options = { 
        //target:        '#output1',   // target element(s) to be updated with server response 
        beforeSubmit:  showRequest,  // pre-submit callback 
        success:       showResponse  // post-submit callback 
 
        // other available options: 
        //url:       url         // override for form's 'action' attribute 
        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
        //clearForm: true        // clear all form fields after successful submit 
        //resetForm: true        // reset the form after successful submit 
 
        // $.ajax options can be used here too, for example: 
        //timeout:   3000 
    }; 
 
    // bind form using 'ajaxForm' 
    $('#myForm1').ajaxForm(options); 
}); 
 
// pre-submit callback 
function showRequest(formData, jqForm, options) { 
    $(".submit-form").prop('disabled', true);
    var queryString = $.param(formData); 
    var unAnswered = $("table").find(`[data-done='0']`).length;
    if(unAnswered != 0){
        $("table").find(`[data-done='0']`).addClass('error');
        $([document.documentElement, document.body]).animate({
            scrollTop: $("table").find(`[data-done='0']:first`).offset().top
        }, 1000);
        $(".submit-form").prop('disabled', false);
        return false; 
    }
    return true;
    
} 
 
// post-submit callback 
function showResponse(responseText, statusText, xhr, $form)  { 
    // for normal html responses, the first argument to the success callback 
    // is the XMLHttpRequest object's responseText property 
 
    // if the ajaxForm method was passed an Options Object with the dataType 
    // property set to 'xml' then the first argument to the success callback 
    // is the XMLHttpRequest object's responseXML property 
 
    // if the ajaxForm method was passed an Options Object with the dataType 
    // property set to 'json' then the first argument to the success callback 
    // is the json data object returned by the server 
    $(".submit-form").prop('disabled', false);
    $.modal.close();
    $("#quiz").hide();
    $("#result").html(responseText);
    $("html, body").animate({scrollTop: 0}, 50);
} 

</script>
    </body>
</html>
