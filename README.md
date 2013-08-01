# rFrame
## A responsive frame emulator to aid with mobile development

There are so many [neat][viewport resizer] [responsive][Responsinator] [viewport][Ripple] tools out there. Firefox even has a nifty little development feature called "Responsive Design Mode". But being as I do a lot of work inside RapidWeaver, which uses webkit, I have no way (that I know of) to take advantage of any of these solutions outside of anything other then a full blown browser window.

So on a sunny afternoon I hacked together rFrame, a self reflecting jQuery function that emulates the view port sizes of a handful (for now) of devices to give you a rough idea of how your web site/application might look on that device.

It's pretty crude right now and only works in Chrome and Safari for the time being, so fork it and make it better.

### Demo

<http://seydoggy.github.io/rFrame/>

### Installation

1. [Download](https://github.com/seyDoggy/rFrame/archive/master.zip) the latest release.
1. Clone the repo: git clone git://github.com/seyDoggy/rFrame.git
1. Install with [Bower](http://bower.io/): `bower install rFrame`

### Instructions (General)

1. Include jQuery in your page (likely just before the body tag).

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	```

1. Include the rframe plugin just after the call to jQuery.

	```html
	<script src="js/jquery.rframe.js"></script>
	```

1. Open the page in a browser and type the following in the console:

	```js
	$.rFrame()
	````

1. Use the selection menu to pick a device and orientation.

1. If you want to start with a particular viewport, you can specify that too:

	```js
	$.rFrame({device:'iPad',view:1})
	```

1. And of course you can do all of this from within a script as opposed to running it from the console:

	```html
	<script>
		$.rFrame({
			device:'iPad',
			view:1
		});
	</script>
	```

### Instructions (RapidWeaver developers)

For RapidWeaver developers looking to incorporate rFrame as an option in their themes, ignore the above and do the following:

1. Include [RwSetGet](https://github.com/seyDoggy/RwSetGet) in your scripts.

1. Include rFrame in your theme folders.

1. Make an options file that includes the following script (options are... erm... optional):

	```js
	jQuery(function ($) {
		$.getScript(RwGet.pathto("some/place/jquery.rframe.min.js"), function() {
			$.rFrame({
				device:'iPhone4',
				view:1
			});
		});
	});
	```

1. Make an option and include it in your Theme.plist

	```xml
	<dict>
		<key>GroupDisplayName</key>
		<dict>
			<key>de</key>
			<string>Device Emulation</string>
			<key>en</key>
			<string>Device Emulation</string>
			<key>fr</key>
			<string>Device Emulation</string>
			<key>it</key>
			<string>Device Emulation</string>
			<key>ja</key>
			<string>Device Emulation</string>
		</dict>
		<key>GroupMembers</key>
		<array>
			<dict>
				<key>DisplayName</key>
				<dict>
					<key>de</key>
					<string>Off</string>
					<key>en</key>
					<string>Off</string>
					<key>fr</key>
					<string>Off</string>
					<key>it</key>
					<string>Off</string>
					<key>ja</key>
					<string>Off</string>
				</dict>
				<key>Enabled</key>
				<true/>
				<key>Files</key>
				<array/>
				<key>Name</key>
				<string>Off</string>
				<key>Type</key>
				<string>Stylesheet</string>
			</dict>
			<dict>
				<key>DisplayName</key>
				<dict>
					<key>de</key>
					<string>On</string>
					<key>en</key>
					<string>On</string>
					<key>fr</key>
					<string>On</string>
					<key>it</key>
					<string>On</string>
					<key>ja</key>
					<string>On</string>
				</dict>
				<key>Enabled</key>
				<false/>
				<key>Files</key>
				<array>
					<string>options/emulator/emulator_on.js</string>
				</array>
				<key>Name</key>
				<string>On</string>
				<key>Type</key>
				<string>Javascript</string>
			</dict>
		</array>
		<key>GroupName</key>
		<string>Device Emulation</string>
		<key>GroupSelectionLimit</key>
		<integer>1</integer>
	</dict>
	```

### Options

```js
$.rFrame({
	background : '#dedede',/* 'body' background color */
	color : '#dedede',/* toolbar text color */
	toolbar_bg: '#333',/* toolbar background color */
	btn_bg: '#3e8ec0',/* Portrait/Landscape button background color  */
	btn_color: '#fff',/* Portrait/Landscape button text color  */
	font: 'Verdana',/* toolbar font  */
	device:'iPhone5',/* default device */
	device_color : '#d0d0d0',/* device color */
	view : 0,/* default orientation, portrait = 0, landscape = 1 */
	forkme: true,/* show Github forkme banner */
});
```

[viewport resizer]: http://lab.maltewassermann.com/viewport-resizer/ "viewport resizer"
[Responsinator]: http://www.responsinator.com/ "The Responsinator"
[Ripple]: https://chrome.google.com/webstore/detail/ripple-emulator-beta/geelfhphabnejjhdalkjhgipohgpdnoc?utm_source=chrome-ntp-icon "Ripple Emulator"