<span class="title">مقياس الثقة العام</span>
<p>
<b>النتيجة: {{$total}} / 135</b>
<br/>
{{$result}}
<br/>
وفقا لنتائج إجاباتك على مقياس الثقة العام.  نوصي بتحسين الجوانب المتعلقة بالفقرات التالية:</p>

<ul style="    margin-right: 60px;
    font-size: 18px;">
@foreach($weak_points as $weak_point)
 <li>
 	{{$weak_point->question}}
 </li>
 @endforeach
</ul>
<p>في القائمة السابقة تجد فرص التطوير التي تحتاجها،  يمكنك أن تتخذ قرارك بأن تجتهد بالعمل على هذه القائمة حتى تتحول إجابتك إلى أحيانا. <br/>

إن جهدك المبذول  هو طريقك لتعزيز الثقة في الذات وفي الآخرين.</p>


<div class="submit-button"><button type="submit" class="go-back">العودة</button></div>