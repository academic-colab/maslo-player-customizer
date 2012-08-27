/**
 *	Converts rgb color format to hex
 */
function rgb2hex(rgb){
 	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 	return "#" +
  	("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  	("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  	("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
}
function dropError(msg) {
	var error = $('<div><p>'+msg+'</p></div>');
		error.dialog({
			title: 'Error',
			modal: true,
			resizable: false,
			buttons: {
				'ok': function() {
					$(this).dialog('close');
				}
			}
		});
	return false;
}

/**
 *	Opens the color wheel for editing.
 *  number is the index of the radio button in the list that is selected. 
 *  hex is the hexadecimal value for the new color
 */
function updateColorOnClick(number, hex) {
	$('input[name=color]:nth('+ number +')').attr("checked","checked");			
	$('#miniColors').miniColors('value', hex);
	$('#miniColors').focus();
	return false;
}

/******************************
 *	The drag and drop handlers
 *  of all the icons and splash 
 *  screens
 ******************************/
function dragenter(e) {  
	e.stopPropagation();  
	e.preventDefault();  
}  
function dragover(e) {  
	e.stopPropagation();  
	e.preventDefault();
	$('#' + this.id).css('background-color', '#cccccc');   
}  
function dragleave(e) {  
	e.stopPropagation();  
	e.preventDefault();
	$('#' + this.id).css('background-color', '#222');   
}  
function drop(e) {  
	e.stopPropagation();  
	e.preventDefault(); 
	$('#' + this.id).css('background-color', '#222'); 	
	var files = e.dataTransfer.getData("application/x-vnd.adobe.air.file-list");
	if(!files) {$('#' + this.id).css('background-color', '#f222');return}; 
	if(files[0].extension != 'png' || files.length != 1) {
		dropError("Please drop a single .png file");
		$('#' + this.id).css('background-color', '#222');
		return; 
	}
	addFileToProject(files[0].nativePath, this.id);
	$('#' + this.id).attr('src', 'file://' + files[0].nativePath);
	$('#' + this.id + 'ex').attr('src', 'file://' + files[0].nativePath);
	$('#' + this.id).css('background-color', '#222');
}
function dropIcon(e){
	if(!processFile(e, this, this.width)) return;	
}
function dropSplash(e) {
	var name = (this.id == 'loresimg') ? 'splash_lores' : 'splash_hires';
	if(!processFile(e, this, name)) return;
}

/**
 * This method handles validation of both icons and splash screens
 * res either a number or name. If it is a number it would be
 * either 57 or 114 depending on the icon. Otherwise it specifies
 * whether it is a low res or hi res splash screen.
 */
function processFile(event, self, res) {
	event.stopPropagation();  
	event.preventDefault(); 
	var files = event.dataTransfer.getData("application/x-vnd.adobe.air.file-list");
	if(!files) { return }; 
	if(files[0].extension != 'png' || files.length != 1) {
		dropError("Please drop a single .png file");
		return false; 
	}
	var device = air.EncryptedLocalStore.getItem( 'device' );
	var name;
	if (res == 57 && device == 'android')
		return false; //For now, discard the android low res icon
	else if (res == 57 && device == 'iphone')
		name = 'maslo_icon_lores';
	else if (res == 114)
		name = 'maslo_icon_hires';
	else 
		name = res;	
	var img = new Image();
	img.src = 'file://' + files[0].nativePath;
	img.onload = function() {
		var width = img.width;
		var height = img.height;
		if(width == height && width == res) {	//Valid icon
			if(device == 'android') {
				for(var i = 1; i <= 3; i++) {
					addFileToProject(files[0].nativePath, name, i);
				}
				self.src = 'file://' + files[0].nativePath;
				$('#lrIcon img').attr('src', 'file://' + files[0].nativePath);
			} else {
				addFileToProject(files[0].nativePath, name, res);
				self.src = 'file://' + files[0].nativePath;
			}
		}
		else if (height/width == 1.5 && (((height == 480) && (name == 'splash_lores')) || 
								(height == 960 && (name == "splash_hires")))) {  //Valid splash
			addFileToProject(files[0].nativePath, name, res);
			self.src = 'file://' + files[0].nativePath;
		}
		else {
			dropError("Invalid dimensions");
		}
	}

}
/**
 * Opens the browse dialog to locate a folder.
 */
function browse(action) {
	var directory = air.File.documentsDirectory;
	try {
    	directory.browseForDirectory("Select Directory");
    	directory.addEventListener(air.Event.SELECT, action);
	} catch(error) {
		air.trace("Failed: ", error.message);
	}
}

/**
 *	Checks whether the folder given by path is valid. It is specific
 *  how the iphone and android folder system works.
 */
function checkFolder(path, device) {
	var sep = air.File.separator;
	//If device is iphone, check if the folder has www folder
	var iphoneCheck = new air.File(path + sep + 'www');
	//If device is android, check if the folder has assets/www
	var androidCheck = new air.File(path + sep + 'assets' + sep + 'www');
	if(device == 'iphone')
		return iphoneCheck.exists;
	else 
		return androidCheck.exists;	
}
/**
 *	Adds a file to the project
 *  path is the where the new file is located
 *  id is the name the file will get.
 *  icon specifies whether it is an icon.
 */
function addFileToProject(path, id, icon) {
	var projFolder = air.EncryptedLocalStore.getItem( 'directory' );
	var filename = id + '.png';
	var newPNG = new air.File(path);
	var device = air.EncryptedLocalStore.getItem( 'device' );
	if(!device) return;
	str = imageFolder(device, icon) + filename;
	var proj = new air.File( projFolder + str);
	newPNG.copyTo(proj, true);
}

/**
 * Returns the image folder related to the device.
 * icon specifies if it is an icon and is not necessary
 */
function imageFolder(device, icon) {
	var sep = air.File.separator;
	var str;
	if(device == "android") {
		if(icon) {
			str = (icon == 1) ? sep + 'res' + sep + 'drawable-ldpi' + sep :
				  (icon == 2) ? sep + 'res' + sep + 'drawable-hdpi' + sep :
				  				sep + 'res' + sep + 'drawable-mdpi' + sep;
		} else
			str = sep + 'assets' + sep + 'www' + sep + 'img' + sep + 'menu' + sep;
	}
	else
		if(icon) {
			str = sep + 'images' + sep;	
		} else {
			str = sep + 'www' + sep + 'img' + sep + 'menu' + sep;
		}
	return str;	
}
