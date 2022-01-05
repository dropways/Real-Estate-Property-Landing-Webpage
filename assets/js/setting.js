jQuery(window).on("scroll load", function () {
	if ($(this).scrollTop() > 0) {
		$(".header-wrap").addClass("shrink-nav");
	} else {
		$(".header-wrap").removeClass("shrink-nav");
	}
});
jQuery(document).ready(function () {
	/*==============================================================*/
	// click to scroll section start
	/*==============================================================*/
	jQuery(".goto-section").on("click", function (e) {
		e.preventDefault();
		var target = jQuery(this).data("id");
		jQuery("html, body")
			.stop()
			.animate(
				{
					scrollTop: jQuery("#" + target).offset().top,
				},
				1600,
				"swing",
				function () {}
			);
		if (jQuery(window).width() < 768) {
			jQuery("html, body")
				.stop()
				.animate(
					{
						scrollTop: jQuery("#" + target).offset().top - 70,
					},
					1600,
					"swing",
					function () {}
				);
		}
	});
	/*==============================================================*/
	// click to scroll section end
	/*==============================================================*/
});
