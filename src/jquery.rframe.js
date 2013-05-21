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
			color : '#dedede',
			toolbar_bg: '#333',
			btn_bg: '#3e8ec0',
			btn_color: '#fff',
			font: 'Verdana',
			device:'iPhone5',
			device_color : '#d0d0d0',
			view : 0,
			forkme: true,
			width : 320,
			height : 568,
			topmargin:100,
			rightsidepad:27,
			leftsidepad:27,
			toppad:125,
			bottompad:125,
			radius:50,
			hash:window.location.hash,
			forkme_code: $('<a href="https://github.com/seyDoggy/rFrame" style="position: absolute; top: 0; right: 2em; border: 0;"><img style="border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" alt="Fork me on GitHub"></a>'),
			reference:null,
			wrapper:null,
			selectdevice:null,
			selectview:null,
			rFrame:null,
			toolbar:null,
			iFrame:null,
			rehash: function () {
				window.location.hash = '';
				$.ajax({
					url: "",
					context: document.body,
					success: function(s,x){
						$(this).html(s);
						$.rFrame({
							background:rframe.background,
							color:rframe.color,
							toolbar_bg:rframe.toolbar_bg,
							btn_bg:rframe.btn_bg,
							btn_color:rframe.btn_color,
							font:rframe.font,
							device:rframe.device,
							device_color:rframe.device_color,
							view:rframe.view,
							forkme:rframe.forkme
						});
					}
				});
			},
			setSelect: function () {
				$('#rFrame option[value="' + rframe.device + '"]').attr('selected','selected');
			}
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
			 * Utilize select device menu
			 */
			rframe.selectdevice = $('<select id="device_select">' 
  				+ '<option value="iPhone5">iPhone5</option>' 
  				+ '<option value="iPhone4">iPhone4</option>' 
  				+ '<option value="Android">Android</option>' 
  				+ '<option value="iPad">iPad</option>'
  				+ '<option value="Kindle">Kindle</option>'
  				+ '<option value="Off">Off</option>'
				+ '</select>').on('change',function () {
					if ($(this).val() != 'null' && $(this).val() != 'Off') {
						switch($(this).val()) {
							case 'iPhone5':
								rframe.device = 'iPhone5';
								break;
							case 'iPhone4':
								rframe.device = 'iPhone4';
								break;
							case 'Android':
								rframe.device = 'Android';
								break;
							case 'iPad':
								rframe.device = 'iPad';
								break;
							case 'Kindle':
								rframe.device = 'Kindle';
								break;
						}
						rframe.rehash();
					} else {
						window.location.hash = 'rFrame';
						window.location.reload();
					}
				});
			/*
			 * Utilize select device menu
			 */
			rframe.selectview = $('<a href="#" title="Select the device orientation."/>').text(function () {
				if (rframe.view == 0) {
					$(this).html('Portrait');
				} else {
					$(this).html('Landscape');
				}
			}).css({
				'text-decoration':'none',
				'background-color':rframe.btn_bg,
				'color':rframe.btn_color,
				'padding':'0.5em 1em',
				'margin-left':'2em'
			}).on('click', function (event) {
				event.preventDefault();
				if (rframe.view == 0) {
					rframe.view = 1;
					rframe.rehash();
				} else {
					rframe.view = 0;
					rframe.rehash();
				}
			});
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
						rframe.radius = 85;
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
			if (rframe.view == 1) {
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
				rframe.topmargin = (($(window).height() - (rframe.height + rframe.toppad + rframe.bottompad))/2) + 25;
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
				'border':'none',
				'border-radius': rframe.radius + 'px',
				'display': 'block',
				'height':rframe.height,
				'margin': rframe.topmargin + 'px auto 0',
				'padding': rframe.toppad + 'px ' + rframe.rightsidepad + 'px ' + rframe.bottompad + 'px '+ rframe.leftsidepad + 'px',
				'width':rframe.width,
			});
			/*
			 * Create toolbar
			 */
			rframe.toolbar = $('<div id="rFrame-toolbar"/>').css({
				'padding':'1em',
				'position':'fixed',
				'color':rframe.color,
				'font-family': rframe.font,
				'background-color':rframe.toolbar_bg,
				'z-index':'1000000',
				'width':'100%'
			}).append(
				rframe.forkme == true ? rframe.forkme_code : '',
				rframe.selectdevice,
				rframe.selectview
			);
			/*
			 * Smash the DOM elements together
			 */
			rframe.rFrame = rframe.wrapper.append(rframe.toolbar,rframe.iFrame);
			/* 
			 * Implement
			 */ 
			$('body').append(rframe.rFrame);
			rframe.setSelect();
		}
	};
})(jQuery);