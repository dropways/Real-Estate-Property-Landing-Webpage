jQuery(window).on("scroll load", function () {
	if ($(this).scrollTop() > 0) {
		$(".header-wrap").addClass("shrink-nav");
	} else {
		$(".header-wrap").removeClass("shrink-nav");
	}
});
jQuery(document).ready(function () {
	jQuery(".menu-toggle").on("click", function () {
		jQuery(this).toggleClass("open");
		jQuery(".header-right").toggleClass("show");
	});
});
