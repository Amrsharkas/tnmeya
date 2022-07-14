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
        <link rel="stylesheet" href="/css/style.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"></script> 
    <script src="https://malsup.github.io/jquery.form.js"></script>
        <title>قيّم علاقتك بابنك</title>

    </head>
    <body style="direction: rtl;">
        <div class="header">
        <img src="/images/tnmeya-logo.png" class="logo">
    </div>
    <div id="quiz">
        <span class="title">قيّم علاقتك بابنك</span>
        <p>عزيزي الأب/ عزيزتي الأم
لقد أعد لك خبراؤنا الاختبار الذي بين يديك، ليساعدك على فهم و تقييم حالة التواصل بينك و بين ابنك، يظهر لك هذا الاختبار نقاط القوة و الضعف في التواصل بينكما، كما انه يساعدك على تطويير وتحسين العلاقة بينك و بين ابنك.
الاختبار بسيط لا يحتاج الى أكثر من 3 دقائق و نتائجه سرية تماما، ننصحك بالاجابة بشفافية لتحصل على أفضل تقييم، كما ينصح بتقييم علاقتك بابنائك باعتبار كل ابن على حدى في كل مرة. 
</p>
<form method="post" action="/result" id="myForm1">
    @csrf
<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">العبارة</th>
      <th scope="col">إطلاقًا</th>
      <th scope="col">أحيانًا</th>
      <th scope="col">دائمًا</th>
    </tr>
  </thead>
  <tbody>
    @foreach($questions as $key => $question)
    <tr data-done="0">
      <th scope="row">{{$key+1}}</th>
      <td>{{$question}}</td>
      <td><input type="radio" value="0" name="options-{{$key}}" class="btn-check" id="btn-check-outlined-{{$key}}-1" autocomplete="off">
<label class="btn btn-outline-secondary" for="btn-check-outlined-{{$key}}-1">إطلاقًا</label></td>
      <td><input type="radio" value="1" name="options-{{$key}}" class="btn-check" id="btn-check-outlined-{{$key}}-2" autocomplete="off">
<label class="btn btn-outline-secondary" for="btn-check-outlined-{{$key}}-2">أحيانًا</label></td>
      <td><input type="radio" value="2" name="options-{{$key}}" class="btn-check" id="btn-check-outlined-{{$key}}-3" autocomplete="off">
<label class="btn btn-outline-secondary" for="btn-check-outlined-{{$key}}-3">دائمًا</label></td>
    </tr>
    @endforeach
  </tbody>
</table>



<div class="submit-button"><button type="submit">اتمام</button></div>
</form>
</div>
<div id="result"></div>
<script type="text/javascript">
    $(document).on('change', '.btn-check', function (e) {

        $(this).closest("tr").attr('data-done',1);
        $(this).closest("tr").removeClass('error');

    });
    $(document).on('click', '.go-back', function (e) {

        $("#quiz").show(100);
        $("#result").html("");

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
    var queryString = $.param(formData); 
    var unAnswered = $("table").find(`[data-done='0']`).length;
    if(unAnswered != 0){
        $("table").find(`[data-done='0']`).addClass('error');
        $([document.documentElement, document.body]).animate({
            scrollTop: $("table").find(`[data-done='0']:first`).offset().top
        }, 1000);
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
    $("#quiz").hide();
    $("#result").html(responseText);
} 

</script>
    </body>
</html>
