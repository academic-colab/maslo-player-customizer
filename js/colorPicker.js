/**
 * Loads all the interactive features of the color picker
 * css an object that keeps track of the css file related to
 * the project. It is also stores information about new colors.
 */
function colorPickerInit(css) {
		$("#miniColors").miniColors({
			change: function(hex){
				var ele = $('input[name=color]:checked').val();
				var font = false;
				if(ele){
					if(ele.indexOf("font") != -1)  { font = true;}
					ele = (ele == "body") ? '#phonecontainer' : 
						(ele == "button") ? '#phonecontainer button':'.' + ele;
					if(font) 
						$(ele).css("color", hex);
					else 
						$(ele).css("background", hex);	
				}
			}		
		});
		
		$("#miniColors").blur(function(){
		var prop = $('input[name=color]:checked').val().toString();
		var val = $(this).val();
			switch(prop) {
				case "header" :
					css.header = val; break;
				case "header_font":
					css.header_font = val; break;
				case "light_row":
					css.light_row = val; break;
				case "light_row_font":
					css.light_row_font = val; break;
				case "dark_row":
					css.dark_row = val; break;
				case "button":
					css.button = val; break;
				case "button_font":
					css.button_font = val; break;
			}		
		});
		
		$('#submitcss').click(function(){
			var mesg = $('<div><p>Are you sure you want to submit the changes? \
			This will overwrite the css file related to the project.</p><div>');
			mesg.dialog({
				title: 'Sure?',
				height: 250,
 				width: 400,
 				modal: true,
 				draggable: false,
 				autoOpen: true,
 				closeOnEscape: false,
 				resizable: false,
 				buttons: {
 					'Cancel': function () {
 						$(this).dialog('close');
 					},
 					'Yes': function() {
 						css.updateFile();
 						$(this).dialog('close');
 					}
 				}
			});		
		});
		$(".header").click(function(){
			updateColorOnClick(0, rgb2hex($('.header').css("background-color")));
		});
		$(".header_font").click(function(){
			updateColorOnClick(1, rgb2hex($('.header_font').css("color")));
		});
		$(".dark_row").click(function(){
			updateColorOnClick(2, rgb2hex($('.dark_row').css("background-color")));
		});
		$(".light_row").click(function(){
			updateColorOnClick(3, rgb2hex($('.light_row').css("background-color")));
		});
		$(".light_row_font").click(function(){
			updateColorOnClick(4, rgb2hex($('.light_row_font').css("color")));
		});
		$("#phonecontainer button").click(function(){
			updateColorOnClick(5, rgb2hex($('#phonecontainer button').css("background-color")));
		});
				
		//Dropable
		var icons = document.querySelectorAll('#footer1 img');
		[].forEach.call(icons, function(icon) {
			if($(icon).attr('title') == 'name') return;
  			icon.addEventListener('dragenter', dragenter, false);
  			icon.addEventListener('dragover', dragover, false);
  			icon.addEventListener('drop', drop, false);
  			icon.addEventListener('dragleave', dragleave, false);
  			$(icon).click(function(){
				var img = new Image();
				img.src = $(this).attr('src');
				img.onload = function() {
  					var image = $('<div><img src="' + $(this).attr('src') + '" /></div>');
  					image.dialog({
  						title: 'Icon',
  						width: img.width + 40,
  						height: img.height + 60,
  						open: function() {
  							$('.ui-dialog-content').css('background', '#242424');
  						},
  						beforeClose: function() {
  							$('.ui-dialog-content').css('background', 'none');
  						}
  					});
  				}
  			});
  		});
  		
}
/**
 *	Adds invisible divs to the markup that can later be used
 * 	to retrieve css colors.
 */
function styleInit(css) {	
	$('#customCSS').attr('href', css.path);
	$('body').css('background', '#ebf4f9');
	//Make empty tags to retrieve the colors
	var dark_row =  $("<tr style='visibility:hidden;' class='dark'><td  class='delete'></td></tr>");
	var light_row = $("<tr style='visibility:hidden;' class='light'><td  class='left'></td></tr>");
	var header = $("<tr style='visibility:hidden;' class='dark'><td  class='logo'></td></tr>");
	var main_font = $("<div style='visibility:hidden;' id='menuTable'><tr><td></td></tr></div>");
	var button = $("<button style='visibility:hidden;' class='editButton'></button>");
	$('#options').append(dark_row, light_row, header, main_font, button);
	return false;			
}
/**
 *	Gets all the colors from the css file in the project so it can give a visual
 *	representation.
 */
function colorInit(CSS) {
	var dark_row = $('.delete').css('background-color');
	var light_row = $('.left').css('background-color');
	var header = $('.logo').css('background-color');
	var header_font = $('.logo').css('color');
	var main_font = CSS.getMainFont();
	if(!main_font) {dropError("Something wrong with the css file in your project"); return;}
	var button = $(".editButton").css('background-color');
	var button_font = $(".editButton").css('color');
	
	$('.dark_row').css('background-color', rgb2hex(dark_row));
	$('.light_row').css('background-color', rgb2hex(light_row));
	$('.header').css('background-color', rgb2hex(header));
 	$('.light_row_font').css('color',main_font);
	$('.header').css('color', rgb2hex(header_font));
	$('#phonecontainer button').css('background-color', rgb2hex(button));
	$('#phonecontainer button').css('color', rgb2hex(button_font));
		
	$('#customCSS').attr('href', '#');
	$('#tabs').css('visibility', 'visible');
}

/**
 *	Loads all the icons in the project folder. If an icon can't be found,
 *	a sample icon is loaded. 
 *	It also loads some of the icons into to the sample phone itself. Notice it
 *	only fits 4 icons. 
 */
function iconInit(device, path) {
	var icons = ["home.png", "store.png", "search.png", "more.png", "back.png", 
	"settings.png", "help.png","name", "home_over.png", "store_over.png", "search_over.png",
	"more_over.png", "back_over.png", "settings_over.png", "help_over.png"];
	var sample = ["#homeex", "#storeex", "#searchex", "#moreex","name"];
	//Get path to image folder
	var imgFolder = imageFolder(device);
	var iconPath, file;
	for(var i = 0; i < icons.length; i++) {
		if($("#footer1 img:nth(" + i + ")").attr('title') == 'name') continue;
		iconPath = path + imgFolder + icons[i];
		file = new air.File( iconPath );
		if(file.exists) {
			$("#footer1 img:nth(" + i + ")").attr('src', iconPath);
			if(i < 4) {
				$(sample[i]).attr('src', iconPath);
			}
		}
		else {
			$("#footer1 img:nth(" + i + ")").attr('src', 'img/pholder_' 
			+ icons[i].replace('_over', ""));
			if(i < 4) {
				$(sample[i]).attr('src', iconPath);
			}
		}
	}
	if(device == "android") 
		$('#phoneex').attr('src', 'img/and.png');
	else
		$('#phoneex').attr('src', 'img/phone.png');
	
}