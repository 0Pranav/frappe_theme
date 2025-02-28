frappe.ready(() => {
	// Select all links with hashes
	$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.click(function (event) {
			// On-page links
			if (
				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
				&& location.hostname == this.hostname
			) {
				// Figure out element to scroll to
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Does a scroll target exist?
				if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					scroll_to_el(target, () => {
						// Callback after animation
						// Must change focus!
						var $target = $(target);
						$target.focus();
						if ($target.is(":focus")) { // Checking if the target was focused
							return false;
						} else {
							$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
							$target.focus(); // Set focus again
						};
						// set window hash
						window.history.pushState({}, '', this.hash);
					});
				}
			}
		});

	$(document).on('click', '.from-markdown h1, .from-markdown h2, .from-markdown h3', (e) => {
		let $target = $(e.currentTarget);
		if (e.pageX - $target.offset().left <= 20) {
			scroll_to_el($target, () => {
				window.history.pushState({}, '', '#' + $target.prop('id'));
			})
		}
	});

	$(window).on('load', () => {
		let hash = window.location.hash;
		if (hash) {
			let el = document.querySelector(hash);
			scroll_to_el(el);
		}
	});

	function scroll_to_el(el, callback) {
		let subnav_height = $('.subnav').outerHeight() || 0;
		let offset_top = $(el).offset().top;
		let position = offset_top - subnav_height;
		$('html, body').animate({ scrollTop: position }, 500, callback);
	}
});
