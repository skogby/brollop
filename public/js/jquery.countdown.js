/**
 * @name		jQuery Countdown Plugin
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2011/12/countdown-jquery/
 * @license		MIT License
 */

(function($){
	
	// Number of seconds in every time division
	var days	= 24*60*60,
		hours	= 60*60,
		minutes	= 60;
	
	// Creating the plugin
	$.fn.countdown = function(timestamp){
		
		var left, d, h, m, s, self = this, elems = {};
		left = Math.floor((timestamp.getTime() - (new Date()).getTime()) / 1000);
		// Initialize the plugin
		this.addClass('countdownHolder');

		// Creating the markup inside the container
		$.each(['dag','tim','min','sek'], function(i){
			var unit = $('<div class="count">' +
				'<span class="position">' +
					 '<span class="firstDigit">0</span>' +
				'</span>' +
				'<span class="position">' +
					'<span class="secondDigit">0</span>' +
				'</span>' +
				'<span class="boxName">' +
					'<span>' + this + '</span>' +
				'</span>'
			);
			elems[this + '0'] = unit.find('.firstDigit');
			elems[this + '1'] = unit.find('.secondDigit');
			unit.appendTo(self);
		});
				
		(function tick(){
			left--;
			// Time left
			
			if(left < 0){
				left = 0;
				return;
			}
			
			var tmp = left
			// Number of days left
			if(d !== Math.floor(tmp / days)) {
				d = Math.floor(tmp / days);
				update("dag", d);
			}
			tmp -= d*days;
			
			// Number of hours tmp
			if (h !== Math.floor(tmp / hours)) {
				h = Math.floor(tmp / hours)
				update("tim", h);
			}
			tmp -= h*hours;
			
			// Number of minutes tmp
			if (m !== Math.floor(tmp / minutes)){
				m = Math.floor(tmp / minutes);
				update("min", m);
			}
			tmp -= m*minutes;
			
			// Number of seconds tmp
			s = tmp;
			update("sek", s);
			
			// Scheduling another call of this function in 1s
			setTimeout(tick, 999);
		})();
		
		// This function updates two digit positions at once
		function update(name, value){
			elems[name + '0'].text(Math.floor(value/10)%10);
			elems[name + '1'].text(value%10);
		}
		
		return this;
	};

})(jQuery);