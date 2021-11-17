<div class="row embed_offer_{{$offer_position->id}}" style="margin-bottom:20px; border-bottom:1px solid #e8e8e8;">
    <div class="col-md-10"> @yield("body") </div>
    <div class="col-md-2" style="line-height:70px;">
        <button data-after-append-fn="ShowHideWeight" type="button" class="btn btn-primary m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill add_form" data-target=".offers_positions_{{$offer_position->position_id}}" data-form="{{route('offer_position.initForm')}}?position_id={{$offer_position->position_id}}"><i class="fa fa-plus"></i>
        </button>
        <button class="btn btn-danger m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill remove" data-action="{{route(snake_case($route_group_prefix).'.delete', ['id'=>$id])}}" data-role="embed_offer_{{$offer_position->id}}" type="button" data-original-title="" title="" data-after-success-fn="ShowHideWeight">
            <i class="la la-close"></i>
        </button>
    </div>
</div>