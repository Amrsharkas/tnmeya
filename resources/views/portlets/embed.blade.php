<li data-sort-target="{{isset($sort_target)&&$sort_target?$sort_target:''}}" data-id="{{$id?$id:''}}" class="{{strtolower($model)}} sub_entity">
    <div class="m-divider" style="visibility: hidden;">
        <span></span>
        <span>
            <span class="m-badge m-badge--{{$color}} m-badge--wide add_form_here" data-original-title="Add " data-toggle="tooltip" data-placement="top" title="" data-form="{{route(snake_case($route_group_prefix).'.initForm')}}">
                <span class="m--font-light"><i class="fa fa-plus"></i></span>
            </span>
        </span>
        <span></span>
    </div>
    <div class="m-portlet m-portlet--{{$color}} m-portlet--head-solid-bg m-portlet--head-sm m_portlet_tools close-portlet qu-portlet close-portlet">
        <div class="m-portlet__head qu-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <button class="btn btn-{{$color}} m-btn m-btn--icon m-btn--icon-only  portlet-toggle @if(isset($btns['collapse']) && $btns['collapse'] ==0) d-none @endif" type="button" data-target=".{{strtolower($model)}}-{{$id}}" aria-expanded="false">
                        <i class="fas fa-3x fa-caret-right"></i>
                    </button>
                    <h3 class="m-portlet__head-text qu-portlet__head-text"> @yield("title") </h3>
                </div>
            </div>
            <div class="m-portlet__head-tools">
                <ul class="m-portlet__nav">
                    <li class="m-portlet__nav-item qu-portlet__nav-item">
                        {{-- <a href="#" class="btn btn-outline-info m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air">
                                       <i class="la la-map-marker"></i>
                                   </a>--}}
                        <a href="javascript:void(0)" class="btn btn-outline-{{$color}} m-btn m-btn--icon m-btn--pill virtual-save @if(isset($btns['save']) && $btns['save'] != 1) d-none @endif">
                            <i class="fa @if($admin_show) fa-check @else fa-exclamation @endif"></i> Save </a>
                    </li>
                    {{-- @if(isset($btns['fullscreen']))
                               <li class="m-portlet__nav-item">

                                   <a href="#" m-portlet-tool="fullscreen"
                                      class="btn btn-outline-light m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air">
                                       <i class="la la-expand"></i>
                                   </a>
                               </li>
                           @endif--}} @if(isset($btns['clone']) && $btns['clone']) <li class="m-portlet__nav-item">
                        <button type="button" class="btn m-btn m-btn--icon m-btn--{{$color}} m-btn--icon-only m-btn--custom m-btn--pill m-btn--air clone" style="font-size: 21px;">
                            <a href="{{route(snake_case($route_group_prefix).'.clone', ['id'=>$id])}}" class="" title="Clone" target="_blank">
                                <i class="fa fa-copy"></i>
                            </a>
                        </button>
                    </li> @endif @if(isset($btns['remove']) && $btns['remove']) <li class="m-portlet__nav-item">
                        <button class="btn m-btn m-btn--icon m-btn--{{$color}} m-btn--icon-only m-btn--custom m-btn--pill m-btn--air remove" data-action="{{route(snake_case($route_group_prefix).'.delete', ['id'=>$id])}}" data-role="{{strtolower($model)}}" type="button" data-original-title="" title="" style="font-size: 28px;">
                            <i class="la la-close"></i>
                        </button>
                    </li> @endif
                </ul>
            </div>
        </div>
        <div class="m-portlet__body qu-portlet__body {{strtolower($model)}}-{{$id}}" style="display: none"> @yield("body") </div>
    </div>
</li>