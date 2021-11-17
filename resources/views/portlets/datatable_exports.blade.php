<div class="m-portlet__head-tools">
    <ul class="m-portlet__nav">
        <li class="m-portlet__nav-item">
            <div class="m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push" m-dropdown-toggle="hover" aria-expanded="true">
                <a href="#" class="m-portlet__nav-link m-portlet__nav-link--icon m-portlet__nav-link--icon-xl m-dropdown__toggle">
                    <i class="la la-plus m--hide"></i>
                    <i class="fa fa-ellipsis-h m--font-brand"></i>
                </a>
                <div class="m-dropdown__wrapper">
                    <span class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust" style="left: auto; right: 17.4062px;"></span>
                    <div class="m-dropdown__inner">
                        <div class="m-dropdown__body">
                            <div class="m-dropdown__content">
                                <ul class="m-nav">
                                    <li class="m-nav__section m-nav__section--first">
                                        <span class="m-nav__section-text"> Export </span>
                                    </li>
                                    {{--Export Image--}} @if($export_image) <div class="col-md-4">
                                        <button type="button" class="btn btn-primary image_export" id="load" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Processing "> Export to image </button>
                                        <a download="filename.png" class="image btn btn-primary hidden image_download" href=""> Download </a>
                                    </div> @endif {{--Export pdf--}} @if($export_pdf) <li class="m-nav__item">
                                        <a href="" class="m-nav__link pdf_export">
                                            <i class="m-nav__link-icon fa fa-file-pdf-o"></i>
                                            <span class="m-nav__link-text"> PDF </span>
                                        </a>
                                    </li> @endif {{--Export Excel--}} @if($export_excel) <li class="m-nav__item">
                                        <a href="" class="m-nav__link excel_export">
                                            <i class="m-nav__link-icon fa-file-excel-o fa"></i>
                                            <span class="m-nav__link-text"> Excel </span>
                                        </a>
                                    </li> @endif <li class="m-nav__separator m-nav__separator--fit m--hide"></li>
                                    <li class="m-nav__item m--hide">
                                        <a href="#" class="btn btn-outline-danger m-btn m-btn--pill m-btn--wide btn-sm"> Submit </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</div>