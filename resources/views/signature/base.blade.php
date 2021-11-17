<?php
$i = '';
$j = '';
?>
@extends('admin.master')
@section('plugins_css')

    <link href="{{asset('assets/global/plugins/datetimepicker/bootstrap-datetimepicker.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/global/plugins/bootstrap-toastr/toastr.min.css')}}" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="{{asset('assets/global/plugins/datatables/datatables.min.css')}}"/>
    <link rel="stylesheet" type="text/css" href="{{asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css')}}"/>
    <link rel="stylesheet" type="text/css" href="{{asset('assets/global/plugins/sweetAlert/sweetalert.css')}}"/>
    <link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css"/>
    <link rel="stylesheet" href="{{asset('assets/j-folder/css/j-forms.css')}}">
    <link rel="stylesheet" href="{{asset('assets/global/plugins/dragula/dragula.css')}}"/>
    <link rel="stylesheet" href="{{asset('assets/global/plugins/rich-editor/richEditor.css')}}"/>
    <link rel="stylesheet" href="{{asset('assets/global/plugins/signature-pad/css/signature-pad.css')}}">

@endsection
@section('plugins_js')

    {{--<script language="JavaScript" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>--}}
    <script type="text/javascript" src="{{asset('assets/global/scripts/datatable.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/global/plugins/malsup.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/global/plugins/datatables/datatables.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/global/plugins/datetimepicker/bootstrap-datetimepicker.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/global/plugins/bootstrap-toastr/toastr.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/global/plugins/sweetAlert/sweetalert.min.js')}}"></script>
    <script  type="text/javascript" src="{{asset('assets/global/plugins/dragula/dragula.js')}}"></script>
    <script type="text/javascript" src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"  integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
                crossorigin="anonymous"></script>

    <script type="text/javascript" src="{{asset('assets/global/plugins/signature-pad/js/signature_pad.js')}}"></script>
@endsection

@section('page_js')

    <script type="text/javascript" src="{{asset('assets/admin/pages/scripts/ajaxForms.js')}}"></script>
    {{--<script type="text/javascript" src="{{asset('assets/global/plugins/signature-pad/js/app.js')}}"></script>--}}

@endsection


@section('add_inits')

@stop


@section('page_title_small')

@stop

@section('content')
    @include($partialView)
@stop