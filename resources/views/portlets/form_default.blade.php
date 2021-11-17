<div class="col-lg-12">
    <div class="m-portlet m-portlet--last m-portlet--head-lg m-portlet--responsive-mobile qu-portlet" id="main_portlet">
        <div class="m-portlet__head qu-portlet__head">
            <div class="m-portlet__head-progress">
                <!-- here can place a progress bar-->
            </div>
            <div class="m-portlet__head-wrapper">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <span class="m-portlet__head-icon">
                            <i class="flaticon-map-location"></i>
                        </span>
                        <h3 class="m-portlet__head-text qu-portlet__head-text"> Sticky Head Portlet </h3>
                    </div>
                </div>
                <div class="m-portlet__head-tools">
                    <a href="{{url()->previous()}}" class="btn btn-secondary m-btn m-btn--icon m-btn--wide m-btn--md m--margin-right-10">
                        <span>
                            <i class="la la-arrow-left"></i>
                            <span>Back</span>
                        </span>
                    </a>
                    {{-- <a href="#" class="btn btn-metal m-btn m-btn--icon m-btn--wide m-btn--md m--margin-right-10">
													<span>
														<i class="la la-puzzle-piece"></i>
														<span>Add Attributes</span>
													</span>
                    </a>--}}
                    <div class="btn-group">
                        <button type="button" class="btn btn-brand  m-btn m-btn--icon m-btn--wide m-btn--md">
                            <span>
                                <i class="la la-check"></i>
                                <span>Save</span>
                            </span>
                        </button>
                        <button type="button" class="btn btn-brand  dropdown-toggle dropdown-toggle-split m-btn m-btn--md" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="#">
                                <i class="la la-plus"></i> Save & New</a>
                            <a class="dropdown-item" href="#">
                                <i class="la la-copy"></i> Save & Duplicate</a>
                            <a class="dropdown-item" href="#">
                                <i class="la la-undo"></i> Save & Close</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">
                                <i class="la la-close"></i> Cancel</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-portlet__body qu-portlet__body column"> @yield("body") </div>
    </div>
</div>