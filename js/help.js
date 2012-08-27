function help() {
var helpsis = $("<div> \
	<p> \
		This application is developed in order\
		to simplify the process of creating a custom MASLO skin.\
		The first time you load the app, it will prompt you to browse to the folder where the \
		source code is located on your computer. If you at any time need to change this folder, \
		simply click the 'Change Project' button.\
	</p>\
		<h2>Color Picker</h2>	\
	<p>\
		Use the sample phone as your guide in creating a color scheme    \
		that fits your needs. The elements you can change are listed,     \
		and by clicking one you can use the color wheel to select a color. \
		You can also click on the individual sections on the phone itself. \
	</p>\
	<p> \
		When you are happy with the colors you have chosen, simply click 'save'\
		and the CSS file will get updated with your changes.\
	</p>\
	<p> \
		Note: If your needs for customization exceed the options listed in the MASLO Skin Creator, feel \
		free to edit the style.css file in your project manually. Just bear in mind that the\
		MASLO Skin Creator is set up to work with a certain format of the style.css file so any \
		changes made to the file might lead to unexpected behavior when using the app. \
	</p>\
	<p> \
		You can import your own footer icons by dragging the files onto the app. \
		Choose your own normal state and over state for each icon listed in the table. \
		These will be automatically added to the project as you drop them in place. If you \
		don't want an overstate, \
		just use the normal state icon in both slots. \
	</p>\
		<h2>App Icon</h2>\
	<p>\
		For iPhone, it is required to supply both a high resolution and low resolution\
		app icon. This is in order for the icon to work with both old and newer iPhones.\
	</p>\
	<p>\
		Again, simply drag your .png file for each resolution to the designated slots.\
		The high-resolution icon needs to be 114px by 114px and the low-resolution icon 57px by 57px.\
		The icons will be automatically added to the project and overwrite any icon files already present.\
	</p>\
	<p>\
		For Android devices, only the high-resolution icon will be used, so you don't have to use\
		the low-resolution slot.\
	</p>\
		<h2>Splash Screen</h2>\
	<p>\
		The iPhone's splash screen is an image that is displayed for a few seconds before the\
		app is fully loaded. Drop your splash screen into the phone to add it to your project.\
		Like the icon, Apple requires two different resolutions in order to fully support its devices.\
		Use the sample phone for the 640px by 960px high resolution image and the smaller box\
		for the 320px by 480px image. If your images don't meet these specifications, they won't be added\
		to the project.</p>\
	<p>\
		Currently, we do not support splash screens for Android devices, so this option will\
		not be available.\
	</p>	\
	</div>");		
	helpsis.dialog({
		title: 'Help',
		modal:true,
		width: 500,
		height: 600,
		buttons: {
			'ok': function() {
					$(this).dialog('close');
				}
		}
	});
}