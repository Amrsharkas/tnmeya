@if(Auth::user() && !session()->has('external_agency_quiz_token'))


    {{--@@START@@--}}


    <li class="m-menu__item <?php if(isset($i) && $i == '1' ){?>m-menu__item--active <?php ;}?>"
        aria-haspopup="true">
        <a href="/project" class="m-menu__link ">
            <i class="m-menu__link-icon fa fa-database"></i>
            <span class="m-menu__link-title">
				<span class="m-menu__link-wrap">
					<span class="m-menu__link-text">
						Projects
					</span>
					<span class="hide m-menu__link-badge">
						<span class="m-badge m-badge--danger">
							2
						</span>
					</span>
				</span>
			</span>
        </a>
    </li>


    {{--@@END@@--}}

@endif