function appIconInit(css) {
	//Dropable
	var icons = document.querySelectorAll('#iconmng img');
	[].forEach.call(icons, function(icon) {
		icon.addEventListener('dragenter', dragenter, false);
  		icon.addEventListener('dragover', dragover, false);
  		icon.addEventListener('drop', dropIcon, false);
  		icon.addEventListener('dragleave', dragleave, false);
	});
  
}
/**
 *	Preloads the app with icons that are already in the 
 *	project folder. If there are no icons, they are simply
 *	left blank.
 */
function loadIcons() {
 	var device = air.EncryptedLocalStore.getItem( 'device' );
 	var directory = air.EncryptedLocalStore.getItem( 'directory' );
 	var sep = air.File.separator;
 	//First do lores picture
 	var path = (device == 'android') ? sep + 'res' + sep + 'drawable-ldpi' + sep + 'maslo_icon_hires' :
 										sep + 'images' + sep + 'maslo_icon_lores';
 	var file = new air.File(directory + path + ".png");
 	if(file.exists) {
 		$('#lrIcon img').attr('src', directory + path + ".png");
 	} else {
 		$('#lrIcon img').attr('src', '#');
 	}
 	path = (device == 'android') ? sep + 'res' + sep + 'drawable-hdpi' + sep + 'maslo_icon_hires' :
 										sep + 'images' + sep + 'maslo_icon_hires';	
 	file = new air.File(directory + path + ".png");
 	if(file.exists) {
 		$('#hrIcon img').attr('src', directory + path + ".png");
 	} else {
 		$('#lrIcon img').attr('src', '#');
 	}
}