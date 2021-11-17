<div class="m-portlet m-portlet--mobile qu-portlet">
    <div class="m-portlet__head qu-portlet__head">
        <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
                <h3 class="m-portlet__head-text qu-portlet__head-text"> @yield("title") </h3>
            </div>
        </div> @yield("tools") {{--@m-portlet__head-tools@--}}
    </div>
    <div class="m-portlet__body qu-portlet__body pm_portlet_body_style"> @yield("advanced_search") @yield("buttons") @yield("datatable") </div>
</div>