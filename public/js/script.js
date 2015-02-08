//ßaddEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); }
$(document).ready(function(){


	/* ---- Countdown timer ---- */

	$('#counter').countdown(new Date('2015-05-02 14:30'));


	//Scroll stuff and menu
	var sections = $('[data-nav~=section]'),
		navItems = $('#navigation-items'),
		currentActiveSection = 0;

	function isElementMainSection(el, offsetY) {
		offsetY = offsetY || 0;
		if (el) {
			var rect = el.getBoundingClientRect();
			return (
				rect.top < offsetY &&
				rect.bottom > offsetY
			);
		}
	}
	function detectInScreenSection() {
		var previousActiveSection = currentActiveSection;
		if (sections[currentActiveSection - 1] && isElementMainSection(sections[currentActiveSection - 1])) {
			currentActiveSection -= 1;
		} else if (sections[currentActiveSection + 1] && isElementMainSection(sections[currentActiveSection + 1])) {
			currentActiveSection += 1;
		} else {
			for(var i = 0; i < sections.length; i++) {
				if (sections[i] && isElementMainSection(sections[i])) {
					currentActiveSection = i;
				}
			}
		}
		if (previousActiveSection !== currentActiveSection) {
			var elem = $(sections[currentActiveSection]);
			navItems.find('.active').removeClass('active');
			navItems.find('[data-content~=' + elem.attr('id') + ']').addClass('active');
		}
	}
	$(document).on('scroll', function(e) {
		if (!isElementMainSection(sections[currentActiveSection])) {
	      detectInScreenSection();
	    }
	});
	navItems.find('a').on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({
	        scrollTop: $('#' + $(e.target).data('content')).offset().top + 1
	    }, 1000);
	})

});
