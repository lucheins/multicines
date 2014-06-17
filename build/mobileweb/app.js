/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Flurry = require('com.onecowstanding.flurry');
	Flurry.appVersion = Ti.App.version;
	Flurry.debugLogEnabled = true;
	Flurry.eventLoggingEnabled = true;
	Flurry.sessionReportsOnCloseEnabled = true;
	Flurry.sessionReportsOnPauseEnabled = true;
	Flurry.sessionReportsOnActivityChangeEnabled = true;
	Flurry.secureTransportEnabled = false;
	
	// start the Flurry session
	Flurry.startSession('32K2Z6FPWKZ6RBGB5FQD' /* <-- PUT YOUR API KEY HERE */);
	
	// automatically log transitions on iOS
	Flurry.logAllPageViews();
	
	// manually log a transition
	Flurry.logPageView();
	Flurry.logEvent('device', { type: osname });
	
	if(Ti.App.Properties.getString('ciudad')=='' || Ti.App.Properties.getString('ciudad')==null){
		var win =Ti.UI.createWindow();
		win.setBackgroundColor('white');
		var logo = Ti.UI.createImageView({
			image:"/images/splash.png", width:"auto", height:"auto", top:60+'dp'
			
		});
		win.add(logo);
		var cuenca = Ti.UI.createButton({
			backgroundImage :"/images/botonCuenca.png", width:177+'dp', height:35+'dp',top:360+'dp'
		});
		var quito = Ti.UI.createButton({
			backgroundImage :"/images/botonQuito.png", width:177+'dp', height:35+'dp',top:320+'dp'
		});
		win.add(cuenca);
		win.add(quito);
		win.open();
		if(osname=='android'){
			cuenca.setTop('320dp');
			quito.setTop('360dp');
		}
		cuenca.addEventListener('click', function(e){
			Flurry.logEvent('ciudad',{ciudad:'Cuenca'});
			Ti.App.Properties.setString('ciudad','cuenca');
			openCartelera();
		});
		quito.addEventListener('click',function(e){
			Flurry.logEvent('ciudad',{ciudad:'Quito'});
			Ti.App.Properties.setString('ciudad','quito');
			openCartelera();
		});
	}else{
		openCartelera();
	}
	
	function openCartelera(){
		var Window;
		// if (isTablet) {
			// Window = require('ui/tablet/ApplicationWindow');
		// }
		// else {
			Window = require('ui/handheld/ApplicationWindow');
		// }
	
		var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
		new ApplicationTabGroup(Window,Flurry).open();
	}
	/*
	*/
})();
