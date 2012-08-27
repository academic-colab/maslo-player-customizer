/**
 *	Constructor for the css object. 
 */
function CSS(path, device) {
	var sep = air.File.separator;
	this.path = (device == "iphone") ? 
					(path + sep + 'www' + sep + 'style.css') :
					(path + sep + 'assets' + sep + 'www' + sep + 'style.css');
	this.cssFile = new air.File(this.path);
	if(!this.cssFile.exists) {
		var warning = $("<div><p>Unable to find the 'style.css' file in \
		your project folder. Please make sure the folder is correct and select it again.</p></div>");
		warning.dialog({			
				title: 'Could not find style.css',
 				height: 250,
 				width: 400,
 				modal: true,
 				draggable: false,
				autoOpen: true,
 				closeOnEscape: false,
 				resizable: false,
 				buttons: {
				   'Ok': function() {
 						   $('#change').click();
 						   $(this).dialog('close');
 						 }
 				}
 		});
		return false; 
	}
	//Get the css file as a string	
	var fs = new air.FileStream();
	fs.open(this.cssFile, air.FileMode.READ);
 	var myData = new air.ByteArray();
 	fs.readBytes(myData, 0, fs.bytesAvailable);
 	this.cssString = myData.toString();
 	
 	this.header = null;
 	this.header_font = null;
 	this.dark_row = null;
 	this.light_row = null;
 	this.light_row_font = null;
 	this.button = null;
 	this.button_font = null;
}

/**
 *	Gets the main font of the css file
 */
CSS.prototype.getMainFont = function() {
	var bodyCSS = this.cssString.match(/body.*{([\s\S]*?)}/)[0];
	return (bodyCSS.match(/\scolor:.*#([^;]*);/))[1];
};

/**
 *	Looks for changes made by the user and updates creates a new css file
 *	based on the changes. 
 */
CSS.prototype.updateFile = function() {
	if(this.header)
		this.cssString = this.cssString.replace(/(#.*?)(?=;\/\* &header \*\/)/g ,this.header);
	if(this.header_font)
		this.cssString = this.cssString.replace(/(#.*?)(?=;\/\* &header_font \*\/)/g ,this.header_font);
	if(this.dark_row)
		this.cssString = this.cssString.replace(/(#.*?)(?=;\/\* &dark_row \*\/)/g ,this.dark_row);
	if(this.light_row)
		this.cssString = this.cssString.replace(/(#.*?)(?=;\/\* &light_row \*\/)/g ,this.light_row);
	if(this.light_row_font)
		this.cssString = this.cssString.replace(/(#.*?)(?=;\/\* &light_row_font \*\/)/g ,this.light_row_font);
	if(this.button)
		this.cssString = this.cssString.replace(/(#.*?)(?=;\/\* &button \*\/)/g ,this.button);
	if(this.button_font)
		this.cssString = this.cssString.replace(/(#.*?)(?=;\/\* &button_font \*\/)/g ,this.button_font);
	 
	var fswrite = new air.FileStream();
 	fswrite.open(this.cssFile, air.FileMode.WRITE);
 	fswrite.writeMultiByte(this.cssString, "utf-8");
 	fswrite.close();
 	return true;
};