@extends('emails.master')
@section('content')
<div width="50%" border="1" align="center" >
{{-- Intro Lines --}}
@foreach ($introLines as $line)
{{ $line }}

@endforeach
{{-- Action Button --}}
@if (isset($actionText))
<?php
    switch ($level) {
        case 'success':
            $color = 'green';
            break;
        case 'error':
            $color = 'red';
            break;
        default:
            $color = 'blue';
    }
?>
@component('mail::button', ['url' => $actionUrl, 'color' => $color])
{{ $actionText }}
@endcomponent
@endif
@foreach ($outroLines as $line)
{{ $line }}

@endforeach
<div class="well">
<div>
                <strong>Best Regards,</strong>
                <br/>Lingistix Tank Team
            </div>
            </div>
            </div>

@stop