<div class="m-portlet m-portlet--accent m-portlet--head-solid-bg m-portlet--head-sm  qu-portlet" m-portlet="true" id="m_portlet_tools_1">
    <div class="m-portlet__head qu-portlet__head">
        <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
                <span class="m-portlet__head-icon">
                    <i class="flaticon-placeholder-2"></i>
                </span>
                <h3 class="m-portlet__head-text qu-portlet__head-text"> @yield("title") </h3>
            </div>
        </div>
        <div class="m-portlet__head-tools">
            <ul class="m-portlet__nav">
                <li class="m-portlet__nav-item qu-portlet__nav-item">
                    <a href="#" m-portlet-tool="toggle" class="m-portlet__nav-link m-portlet__nav-link--icon" aria-describedby="tooltip_doffbe0p5f"><i class="la la-angle-down"></i></a>
                </li>
                <li class="m-portlet__nav-item qu-portlet__nav-item">
                    <a href="#" m-portlet-tool="reload" class="m-portlet__nav-link m-portlet__nav-link--icon" aria-describedby="tooltip_0pm6hi9897"><i class="la la-refresh"></i></a>
                </li>
                <li class="m-portlet__nav-item qu-portlet__nav-item">
                    <a href="#" m-portlet-tool="fullscreen" class="m-portlet__nav-link m-portlet__nav-link--icon" aria-describedby="tooltip_ho66hdzhlx"><i class="la la-expand"></i></a>
                </li>
                <li class="m-portlet__nav-item qu-portlet__nav-item">
                    <a href="#" m-portlet-tool="remove" class="m-portlet__nav-link m-portlet__nav-link--icon" aria-describedby="tooltip_v0fndpu7hq"><i class="la la-close"></i></a>
                </li>
            </ul>
        </div>
    </div>
    <div class="m-portlet__body qu-portlet__body"> @yield("body") </div>
</div>
<div class="m-portlet__foot" style="">
    <button type="submit" class="btn btn-primary">Submit</button>
    <span class="m--margin-left-10">or <a href="#" class="m-link m--font-bold">Cancel</a></span>
</div>
</div>