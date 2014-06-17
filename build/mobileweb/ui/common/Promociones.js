var win = Ti.UI.currentWindow;
var android = (Ti.Platform.osname === 'android');
var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'white',
  font: {fontFamily:'Helvetica Neue', fontSize:16+'dp', fontWeight:'bold'},
  message: 'Cargando...',
  style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
  top:190+'dp',
  left:60+'dp',
  height:'auto',
  width:'auto'
});
win.add(activityIndicator);
activityIndicator.show();

if(android){
	// var fondo = Ti.UI.createLabel({
		// text:'Promociones',width:Ti.Platform.displayCaps.platformWidth, height:44+'dp', backgroundColor:'black', color:'white', top:0
	// });
	// win.add(fondo);
	//win.setTitle('Promociones');
	actionBar = currentActivity.actionBar;
		actionBar.title='Promociones';
}


var url = "http://www.multicines.com.ec/PromocionesMulticines/promocines.php?w="+Ti.Platform.displayCaps.getPlatformWidth()+'&p='+Ti.Platform.osname;
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	        // this.responseText holds the raw text return of the message (used for JSON)
	        // this.responseXML holds any returned XML (used for SOAP web services)
	        // this.responseData holds any returned binary data
	        var jsonObject = JSON.parse(this.responseText);
	        var galerias=[];
	        for(var i=0;i<jsonObject.data.length;i++){
	        	var img = Ti.UI.createImageView({
	        		image:jsonObject.data[i].imagen
	        	});
	        	var titulo = Ti.UI.createLabel({
	        		color:'white',top:300+'dp',left:160+'dp',text:jsonObject.data[i].titulo,font:{fontSize:12+'dp'},
	        	});
	        	img.add(titulo);
	        	galerias.push(img);
	        }
	        var scrollView = Titanium.UI.createScrollableView({
				views:galerias,
				showPagingControl:true,
				pagingControlHeight:30,
				maxZoomScale:2.0,
				currentPage:0
			});
			
			win.add(scrollView);
			activityIndicator.hide();
			if(android){
				scrollView.setTop(50+'dp');
			}

	    },
	    onerror: function(e) {
	       var alert = Titanium.UI.createAlertDialog({
			    title: 'Error al cargar las promociones!',
			    message: 'Deseas intentarlo nuevamente?',
			    buttonNames: ['Si', 'No'],
			    cancel: 1
			});
			alert.addEventListener('click', function(e) { 
			   //Clicked cancel, first check is for iphone, second for android
			   if (e.cancel === e.index || e.cancel === true) {
			      activityIndicator.hide();
			      		var noDatos = Ti.UI.createLabel({
							text:'No se ha podido cargar las promociones.',
							top:20+'dp',
							color:'white'
						});
						win.add(noDatos);
			      return;
			   }
			   switch (e.index) {
			      case 0: 	xhr.open("GET", url);
							xhr.send();
			      break;		
			      default:
			      break;
			
			  }
			});
			alert.show();
	    },
	    timeout:15000
	});
	 
	xhr.open("GET", url);
	//xhr.setRequestHeader( 'User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1');
	xhr.send();