/**
 * rFrame
 * A responsive frame to aid with mobile development
 * 
 * Latest version: https://github.com/seyDoggy/rFrame
 * 
 * License <https://github.com/seyDoggy/rFrame/blob/master/LICENSE.txt>
 */
;(function($, undefined) {
	'use strict';

	var pluginName = 'rFrame',
		pluginVersion = '0.0.1';

	$.rFrame = function(options) {
		/*
		 * OPTIONS
		 */
		var rframe = $.extend({
			background : '#dedede',
			device:'iPhone5',
			device_color : '#d0d0d0',
			width : 320,
			height : 568,
			view : 'portrait',
			topmargin:100,
			rightsidepad:27,
			leftsidepad:27,
			toppad:125,
			bottompad:125,
			radius:50,
			hash:window.location.hash,
			reference:null,
			wrapper:null,
			iFrame:null,
			rFrame:null,
			title:null,
		}, options);

		if (rframe.hash != "#rFrame") {
			/*
			 * Set hash to prevent further rFrame execution
			 */
			window.location.hash = "#rFrame";
			/*
			 *	Set current href as reference for iFrame
			 */
			rframe.reference = $(location).attr('href');
			/*
			 * Set device settings
			 */
			if (rframe.device != 'iPhone5') {
				switch(rframe.device) {
					case 'iPhone4':
						rframe.height = 480;
						break;

					case 'iPad':
						rframe.width = 768;
						rframe.height = 1024;
						rframe.rightsidepad = 100;
						rframe.leftsidepad = rframe.rightsidepad;
						rframe.toppad = 100;
						rframe.bottompad = rframe.toppad;
						break;

					case 'Android':
						rframe.width = 380;
						rframe.height = 685;
						rframe.toppad = 80;
						rframe.bottompad = 90;
						rframe.radius = 120;
						break;

					case 'Kindle':
						rframe.width = 600;
						rframe.height = 1024;
						rframe.rightsidepad = 100;
						rframe.leftsidepad = rframe.rightsidepad;
						rframe.toppad = 84;
						rframe.bottompad = 146;
						rframe.radius = 50;
						break;
				}
			}
			/*
			 * Set device orientation
			 */
			if (rframe.view == 'landscape') {
				var temp = rframe.width;
				rframe.width = rframe.height;
				rframe.height = temp;
				temp = rframe.rightsidepad;
				rframe.rightsidepad = rframe.bottompad;
				rframe.bottompad = temp;
				temp = rframe.leftsidepad;
				rframe.leftsidepad = rframe.toppad;
				rframe.toppad = temp;

			}
			/*
			 * Set device position
			 */
			if ((rframe.height + rframe.toppad + rframe.bottompad) < $(window).height()) {
				rframe.topmargin = ($(window).height() - (rframe.height + rframe.toppad + rframe.bottompad))/2
			}
			/*
			 * Create rFrame wrapper overlay 
			 */
			rframe.wrapper = $('<div id="rFrame"/>').css({
				'background-color':rframe.background,
				'position':'absolute',
				'top':0,
				'left':0,
				'height':$('html').height(),
				'min-height':'100%',
				'min-width':'100%'
			});
			/*
			 * Create iFrame as per the options
			 */
			rframe.iFrame = $('<iframe src="' + rframe.reference + '"/>').css({
				'background-color':rframe.device_color,
				'border-radius': rframe.radius + 'px',
				'display': 'block',
				'height':rframe.height,
				'margin': rframe.topmargin + 'px auto 20px',
				'padding': rframe.toppad + 'px ' + rframe.rightsidepad + 'px ' + rframe.bottompad + 'px '+ rframe.leftsidepad + 'px',
				'width':rframe.width,
			});
			/*
			 * Create the title
			 */
			rframe.title = $(
				'<div>' 
				+ rframe.device 
				+ ' (' + rframe.view + ')' 
				+ ' — ' + rframe.width 
				+ ' x ' + rframe.height 
				+ '<br>Please note that this is only an approximations.'
				+ '</div>'
			).css({
				'text-align':'center',
			})
			/*
			 * Smash the DOM elements together
			 */
			rframe.rFrame = rframe.wrapper.append(rframe.iFrame,rframe.title);
			/* 
			 * Implement
			 */ 
			$('body').append(rframe.rFrame);
		}
	};
})(jQuery);