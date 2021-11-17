<!DOCTYPE html>

<html lang="en">
<!-- begin::Head -->
<head>
@include('admin_includes.scripts')

@include('admin_includes.meta')



<!--begin::Web font -->
	<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
	<script>
		WebFont.load({
			google: {"families": ["Poppins:300,400,500,600,700", "Roboto:300,400,500,600,700"]},
			active: function () {
				sessionStorage.fonts = true;
			}
		});
	</script>
	<!--end::Web font -->

	<!--begin::Base Styles -->


	@include('admin_includes.styles')
	@yield('plugins_css')
	<link href="/css/vendors.bundle.css" rel="stylesheet" type="text/css"/>
	<link href="/css/style.bundle.css" rel="stylesheet" type="text/css"/>
	<!--end::Base Styles -->


</head>
<!-- end::Head -->


<!-- end::Body -->
<body class="m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-light m-aside-left--fixed m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default">


<!-- begin:: Page -->
<div class="m-grid m-grid--hor m-grid--root m-page">


	<!-- BEGIN: Header -->
@include('admin_includes.header')
<!-- END: Header -->
	<!-- begin::Body -->
	<div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
		<!-- BEGIN: Left Aside -->


		<div id="m_aside_left" class="m-grid__item	m-aside-left  m-aside-left--skin-light ">
			<!-- BEGIN: Aside Menu -->
			<div
					id="m_ver_menu"
					class="m-aside-menu  m-aside-menu--skin-light m-aside-menu--submenu-skin-light "
					data-menu-vertical="true"
					data-menu-scrollable="true" data-menu-dropdown-timeout="500"
			>
				<ul class="m-menu__nav  m-menu__nav--dropdown-submenu-arrow ">
					@include('admin_includes.sidebar')

				</ul>
			</div>
			<!-- END: Aside Menu -->
		</div>
		<!-- END: Left Aside -->
		<div class="m-grid__item m-grid__item--fluid m-wrapper">
			<div class="m-content">
				@yield('content')

			</div>


		</div>


	</div>
	<!-- end:: Body -->


	<!-- begin::Footer -->
@include('admin_includes.footer')
<!-- end::Footer -->


</div>
<!-- end:: Page -->

<!-- begin::Quick Sidebar -->
<div id="m_quick_sidebar" class="m-quick-sidebar m-quick-sidebar--tabbed m-quick-sidebar--skin-light">
	<div class="m-quick-sidebar__content m--hide">
		<span id="m_quick_sidebar_close" class="m-quick-sidebar__close"><i class="la la-close"></i></span>
		<ul id="m_quick_sidebar_tabs" class="nav nav-tabs m-tabs m-tabs-line m-tabs-line--brand" role="tablist">
			<li class="nav-item m-tabs__item">
				<a class="nav-link m-tabs__link active" data-toggle="tab" href="#m_quick_sidebar_tabs_messenger"
				   role="tab">Messages</a>
			</li>
			<li class="nav-item m-tabs__item">
				<a class="nav-link m-tabs__link" data-toggle="tab" href="#m_quick_sidebar_tabs_settings" role="tab">Settings</a>
			</li>
			<li class="nav-item m-tabs__item">
				<a class="nav-link m-tabs__link" data-toggle="tab" href="#m_quick_sidebar_tabs_logs" role="tab">Logs</a>
			</li>
		</ul>
		<div class="tab-content">
			<div class="tab-pane active m-scrollable" id="m_quick_sidebar_tabs_messenger" role="tabpanel">
				<div class="m-messenger m-messenger--message-arrow m-messenger--skin-light">
					<div class="m-messenger__messages">
						<div class="m-messenger__message m-messenger__message--in">
							<div class="m-messenger__message-pic">

							</div>
							<div class="m-messenger__message-body">
								<div class="m-messenger__message-arrow"></div>
								<div class="m-messenger__message-content">
									<div class="m-messenger__message-username">
										Megan wrote
									</div>
									<div class="m-messenger__message-text">
										Hi Bob. What time will be the meeting ?
									</div>
								</div>
							</div>
						</div>
						<div class="m-messenger__message m-messenger__message--out">
							<div class="m-messenger__message-body">
								<div class="m-messenger__message-arrow"></div>
								<div class="m-messenger__message-content">
									<div class="m-messenger__message-text">
										Hi Megan. It's at 2.30PM
									</div>
								</div>
							</div>
						</div>
						<div class="m-messenger__message m-messenger__message--in">
							<div class="m-messenger__message-pic">

							</div>
							<div class="m-messenger__message-body">
								<div class="m-messenger__message-arrow"></div>
								<div class="m-messenger__message-content">
									<div class="m-messenger__message-username">
										Megan wrote
									</div>
									<div class="m-messenger__message-text">
										Will the development team be joining ?
									</div>
								</div>
							</div>
						</div>
						<div class="m-messenger__message m-messenger__message--out">
							<div class="m-messenger__message-body">
								<div class="m-messenger__message-arrow"></div>
								<div class="m-messenger__message-content">
									<div class="m-messenger__message-text">
										Yes sure. I invited them as well
									</div>
								</div>
							</div>
						</div>
						<div class="m-messenger__datetime">2:30PM</div>
						<div class="m-messenger__message m-messenger__message--in">
							<div class="m-messenger__message-pic">

							</div>
							<div class="m-messenger__message-body">
								<div class="m-messenger__message-arrow"></div>
								<div class="m-messenger__message-content">
									<div class="m-messenger__message-username">
										Megan wrote
									</div>
									<div class="m-messenger__message-text">
										Noted. For the Coca-Cola Mobile App project as well ?
									</div>
								</div>
							</div>
						</div>
						<div class="m-messenger__message m-messenger__message--out">
							<div class="m-messenger__message-body">
								<div class="m-messenger__message-arrow"></div>
								<div class="m-messenger__message-content">
									<div class="m-messenger__message-text">
										Yes, sure.
									</div>
								</div>
							</div>
						</div>
						<div class="m-messenger__message m-messenger__message--out">
							<div class="m-messenger__message-body">
								<div class="m-messenger__message-arrow"></div>
								<div class="m-messenger__message-content">
									<div class="m-messenger__message-text">
										Please also prepare the quotation for the Loop CRM project as well.
									</div>
								</div>
							</div>
						</div>
						<div class="m-messenger__datetime">3:15PM</div>
						<div class="m-messenger__message m-messenger__message--in">
							<div class="m-messenger__message-no-pic m--bg-fill-danger">
								<span>M</span>
							</div>
							<div class="m-messenger__message-body">
								<div class="m-messenger__message-arrow"></div>
								<div class="m-messenger__message-content">
									<div class="m-messenger__message-username">
										Megan wrote
									</div>
									<div class="m-messenger__message-text">
										Noted. I will prepare it.
									</div>
								</div>
							</div>
						</div>
						<div class="m-messenger__message m-messenger__message--out">
							<div class="m-messenger__message-body">
								<div class="m-messenger__message-arrow"></div>
								<div class="m-messenger__message-content">
									<div class="m-messenger__message-text">
										Thanks Megan. I will see you later.
									</div>
								</div>
							</div>
						</div>
						<div class="m-messenger__message m-messenger__message--in">
							<div class="m-messenger__message-pic">

							</div>
							<div class="m-messenger__message-body">
								<div class="m-messenger__message-arrow"></div>
								<div class="m-messenger__message-content">
									<div class="m-messenger__message-username">
										Megan wrote
									</div>
									<div class="m-messenger__message-text">
										Sure. See you in the meeting soon.
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="m-messenger__seperator"></div>
					<div class="m-messenger__form">
						<div class="m-messenger__form-controls">
							<input type="text" name="" placeholder="Type here..." class="m-messenger__form-input">
						</div>
						<div class="m-messenger__form-tools">
							<a href="" class="m-messenger__form-attachment">
								<i class="la la-paperclip"></i>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="tab-pane  m-scrollable" id="m_quick_sidebar_tabs_settings" role="tabpanel">
				<div class="m-list-settings">
					<div class="m-list-settings__group">
						<div class="m-list-settings__heading">General Settings</div>
						<div class="m-list-settings__item">
							<span class="m-list-settings__item-label">Email Notifications</span>
							<span class="m-list-settings__item-control">
							<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
							<label>
							<input type="checkbox" checked="checked" name="">
							<span></span>
							</label>
							</span>
							</span>
						</div>
						<div class="m-list-settings__item">
							<span class="m-list-settings__item-label">Site Tracking</span>
							<span class="m-list-settings__item-control">
							<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
							<label>
							<input type="checkbox" name="">
							<span></span>
							</label>
							</span>
							</span>
						</div>
						<div class="m-list-settings__item">
							<span class="m-list-settings__item-label">SMS Alerts</span>
							<span class="m-list-settings__item-control">
							<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
							<label>
							<input type="checkbox" name="">
							<span></span>
							</label>
							</span>
							</span>
						</div>
						<div class="m-list-settings__item">
							<span class="m-list-settings__item-label">Backup Storage</span>
							<span class="m-list-settings__item-control">
							<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
							<label>
							<input type="checkbox" name="">
							<span></span>
							</label>
							</span>
							</span>
						</div>
						<div class="m-list-settings__item">
							<span class="m-list-settings__item-label">Audit Logs</span>
							<span class="m-list-settings__item-control">
							<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
							<label>
							<input type="checkbox" checked="checked" name="">
							<span></span>
							</label>
							</span>
							</span>
						</div>
					</div>
					<div class="m-list-settings__group">
						<div class="m-list-settings__heading">System Settings</div>
						<div class="m-list-settings__item">
							<span class="m-list-settings__item-label">System Logs</span>
							<span class="m-list-settings__item-control">
							<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
							<label>
							<input type="checkbox" name="">
							<span></span>
							</label>
							</span>
							</span>
						</div>
						<div class="m-list-settings__item">
							<span class="m-list-settings__item-label">Error Reporting</span>
							<span class="m-list-settings__item-control">
							<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
							<label>
							<input type="checkbox" name="">
							<span></span>
							</label>
							</span>
							</span>
						</div>
						<div class="m-list-settings__item">
							<span class="m-list-settings__item-label">Applications Logs</span>
							<span class="m-list-settings__item-control">
							<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
							<label>
							<input type="checkbox" name="">
							<span></span>
							</label>
							</span>
							</span>
						</div>
						<div class="m-list-settings__item">
							<span class="m-list-settings__item-label">Backup Servers</span>
							<span class="m-list-settings__item-control">
							<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
							<label>
							<input type="checkbox" checked="checked" name="">
							<span></span>
							</label>
							</span>
							</span>
						</div>
						<div class="m-list-settings__item">
							<span class="m-list-settings__item-label">Audit Logs</span>
							<span class="m-list-settings__item-control">
							<span class="m-switch m-switch--outline m-switch--icon-check m-switch--brand">
							<label>
							<input type="checkbox" name="">
							<span></span>
							</label>
							</span>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div class="tab-pane  m-scrollable" id="m_quick_sidebar_tabs_logs" role="tabpanel">
				<div class="m-list-timeline">
					<div class="m-list-timeline__group">
						<div class="m-list-timeline__heading">
							System Logs
						</div>
						<div class="m-list-timeline__items">
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
								<a href="" class="m-list-timeline__text">12 new users registered <span
											class="m-badge m-badge--warning m-badge--wide">important</span></a>
								<span class="m-list-timeline__time">Just now</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
								<a href="" class="m-list-timeline__text">System shutdown</a>
								<span class="m-list-timeline__time">11 mins</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-danger"></span>
								<a href="" class="m-list-timeline__text">New invoice received</a>
								<span class="m-list-timeline__time">20 mins</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-warning"></span>
								<a href="" class="m-list-timeline__text">Database overloaded 89% <span
											class="m-badge m-badge--success m-badge--wide">resolved</span></a>
								<span class="m-list-timeline__time">1 hr</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
								<a href="" class="m-list-timeline__text">System error</a>
								<span class="m-list-timeline__time">2 hrs</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
								<a href="" class="m-list-timeline__text">Production server down <span
											class="m-badge m-badge--danger m-badge--wide">pending</span></a>
								<span class="m-list-timeline__time">3 hrs</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
								<a href="" class="m-list-timeline__text">Production server up</a>
								<span class="m-list-timeline__time">5 hrs</span>
							</div>
						</div>
					</div>
					<div class="m-list-timeline__group">
						<div class="m-list-timeline__heading">
							Applications Logs
						</div>
						<div class="m-list-timeline__items">
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
								<a href="" class="m-list-timeline__text">New order received <span
											class="m-badge m-badge--info m-badge--wide">urgent</span></a>
								<span class="m-list-timeline__time">7 hrs</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
								<a href="" class="m-list-timeline__text">12 new users registered</a>
								<span class="m-list-timeline__time">Just now</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
								<a href="" class="m-list-timeline__text">System shutdown</a>
								<span class="m-list-timeline__time">11 mins</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-danger"></span>
								<a href="" class="m-list-timeline__text">New invoices received</a>
								<span class="m-list-timeline__time">20 mins</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-warning"></span>
								<a href="" class="m-list-timeline__text">Database overloaded 89%</a>
								<span class="m-list-timeline__time">1 hr</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
								<a href="" class="m-list-timeline__text">System error <span
											class="m-badge m-badge--info m-badge--wide">pending</span></a>
								<span class="m-list-timeline__time">2 hrs</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
								<a href="" class="m-list-timeline__text">Production server down</a>
								<span class="m-list-timeline__time">3 hrs</span>
							</div>
						</div>
					</div>
					<div class="m-list-timeline__group">
						<div class="m-list-timeline__heading">
							Server Logs
						</div>
						<div class="m-list-timeline__items">
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
								<a href="" class="m-list-timeline__text">Production server up</a>
								<span class="m-list-timeline__time">5 hrs</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
								<a href="" class="m-list-timeline__text">New order received</a>
								<span class="m-list-timeline__time">7 hrs</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
								<a href="" class="m-list-timeline__text">12 new users registered</a>
								<span class="m-list-timeline__time">Just now</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
								<a href="" class="m-list-timeline__text">System shutdown</a>
								<span class="m-list-timeline__time">11 mins</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-danger"></span>
								<a href="" class="m-list-timeline__text">New invoice received</a>
								<span class="m-list-timeline__time">20 mins</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-warning"></span>
								<a href="" class="m-list-timeline__text">Database overloaded 89%</a>
								<span class="m-list-timeline__time">1 hr</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
								<a href="" class="m-list-timeline__text">System error</a>
								<span class="m-list-timeline__time">2 hrs</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
								<a href="" class="m-list-timeline__text">Production server down</a>
								<span class="m-list-timeline__time">3 hrs</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-success"></span>
								<a href="" class="m-list-timeline__text">Production server up</a>
								<span class="m-list-timeline__time">5 hrs</span>
							</div>
							<div class="m-list-timeline__item">
								<span class="m-list-timeline__badge m-list-timeline__badge--state-info"></span>
								<a href="" class="m-list-timeline__text">New order received</a>
								<span class="m-list-timeline__time">1117 hrs</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- end::Quick Sidebar -->
<!-- begin::Scroll Top -->
<div class="m-scroll-top m-scroll-top--skin-top" data-toggle="m-scroll-top" data-scroll-offset="500"
	 data-scroll-speed="300">
	<i class="la la-arrow-up"></i>
</div>
<!-- end::Scroll Top -->            <!-- begin::Quick Nav -->

<!-- begin::Quick Nav -->
<!--begin::Base Scripts -->

<!--end::Page Resources -->


<a class="hidden pjax-link" id="pjax-goto-page" href="#">go to page</a>
<a class="hidden pjax-link" id="pjax-goto-link" href="#">go to link</a>


@include('admin_includes.hiddens')

<button type="button" class="btn btn-primary open_modal_button hidden" data-toggle="modal" data-target="#modal-1">
	Open Modal
</button>

<div class="modal " id="modal-1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
	 aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">

				<h5 class="modal-title" id="exampleModalLabel"></h5>

				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body">


			</div>
		</div>
	</div>
</div>

</body>
<!-- end::Body -->
</html>