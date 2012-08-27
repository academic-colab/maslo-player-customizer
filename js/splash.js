function initSplash() {
	$('#splash').empty();
	var device = air.EncryptedLocalStore.getItem( 'device' );
	if(device == 'android') {
		var msg = $('<p style="position: static;">The splash screen is currently only available for iPhone</p>');
		$('#splash').append(msg);
	}
	else {
		splashHtml(device);
		dropableSplash();
	}
}

/**
 *	The splash html
 */
function splashHtml(device) {
	var screen = $('#splash');
	var splashContent = $('\
	<img id="splashphone" width="300" src="img/phone.png" alt="iphone" />\
	<div id="splashcontainer">\
		<img src="" width="225" height="339" />\
	</div> \
	<h2 class="hres">Hi Res</h2> \
	<p>\
		Drag and drop your splash screen on the phone. For iPhone, it is required to\
		supply both a high resolution and low resolution image. The dimensions are 640px by 960px\
		and 320px by 480px respectively.\
		Use the phone to the left for hi res and the box below for lo res.   <br /><br />\
		Note that the file needs to be .png \
	</p> \
	<div id="lowrescontainer">\
		<img id="loresimg" src="" width="160" height="240" />\
	</div> \
	<h2 class="lres">Lo Res</h2> \
	');	
	screen.append(splashContent);
	var path = air.EncryptedLocalStore.getItem( 'directory' );
	var imgFolder = imageFolder(device, 'splash');
	var file = new air.File( path + imgFolder + 'splash_hires.png' );
	if(file.exists) {
		$('#splashcontainer img').attr('src', path + imgFolder + 'splash_hires.png');
	}
	var file = new air.File( path + imgFolder + 'splash_lores.png' );
	if(file.exists) {
		$('#lowrescontainer img').attr('src', path + imgFolder + 'splash_lores.png');
	}
}

function dropableSplash() {
	var splash = [$('#splashcontainer img')[0],$('#lowrescontainer img')[0]];
  	[].forEach.call(splash, function(s) {
  		s.addEventListener('dragenter', dragenter, false);
		s.addEventListener('dragover', dragover, false);
 		s.addEventListener('drop', dropSplash, false);
 		s.addEventListener('dragleave', dragleave, false);
  	});
}
