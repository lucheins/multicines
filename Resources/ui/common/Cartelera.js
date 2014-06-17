var win = Ti.UI.currentWindow;
win.navBarHidden= false;
var android = (Ti.Platform.osname === 'android');
var Flurry = win.Flurry;

var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'black',
  font: {fontFamily:'Helvetica Neue', fontSize:16+'dp', fontWeight:'bold'},
  message: 'Cargando...',
  top:160+'dp'
});
win.add(activityIndicator);
activityIndicator.show();

if(android){
	// var titulo = Ti.UI.createLabel({text:'Cartelera Cuenca', top:20+'dp', color:'white'})
	// win.add(titulo);
	// var logo = Ti.UI.createImageView({image:'/images/header.png', top:0, width:Ti.UI.SIZE, height:54+'dp', left:0, canScale:true, enableZoomControls:false});
	// win.add(logo);
	// var cartTitulo = Ti.UI.createLabel({text:'Cartelera Cuenca', color:'white', top:20+'dp',font:{fontWeight:'bold', fontSize:16+'dp'}});
	// win.add(cartTitulo);
	// if(Ti.App.Properties.getString('ciudad')=='quito'){
		// cartTitulo.setText('Cartelera Quito');
	// }
}


/*
    Branching logic based on OS
*/
var osname = Ti.Platform.osname;
var os = function(/*Object*/ map) {
    var def = map.def||null; //default function or value
    if (map[osname]) {
        if (typeof map[osname] == 'function') { return map[osname](); }
        else { return map[osname]; }
    }
    else {
        if (typeof def == 'function') { return def(); }
        else { return def; }
    }
};

var tableView = Ti.UI.createTableView({
  backgroundColor:'white',
  separatorColor : 'black'
});
if(android){
	// tableView.setTop(50+'dp');
	Ti.Android.currentActivity.addEventListener('resume',iniciar);
}
win.add(tableView);
tableView.hide();
var viewLoading = Ti.UI.createView({
	backgroundColor:'white', width:Ti.Platform.displayCaps.getPlatformWidth(),
	height:Ti.Platform.displayCaps.getPlatformHeight(), top:0+'dp', left:0+'dp'
});
win.add(viewLoading);
viewLoading.add(activityIndicator);
viewLoading.hide();

Ti.App.addEventListener('resume',iniciar);

function iniciar(){
	var url = "https://www.multicines.com.ec/MulticinesAPI/cinesJSON.php";
	win.setTitle('Cartelera Cuenca');
	//if (android) {titulo.setText('Cartelera Cuenca');};
	if(Ti.App.Properties.getString('ciudad')=='quito'){
		url = "https://www.multicines.com.ec/MulticinesAPI/cinesJSONq.php";
		win.setTitle('Cartelera Quito');
		//if (android) {titulo.setText('Cartelera Quito');};
	}
	if(android){
		//url = "http://push.ec/cines/Multicines/cinesJSON.php";
		actionBar = currentActivity.actionBar;
		actionBar.title='Cuenca';
		//cartTitulo.setText('Cartelera Cuenca');
		if(Ti.App.Properties.getString('ciudad')=='quito'){
			actionBar.title='Quito';
			//url = "http://push.ec/cines/Multicines/cinesJSONq.php";
		}
		//var activity = win.activity;

		currentActivity.onCreateOptionsMenu = function(e){
		  var menu = e.menu;
		  var menuCiudades = menu.add({ 
		    title: "Ciudades", 
		    icon:  "item1.png",
		    showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
		  });
		  var menuRecargar = menu.add({ 
		    icon:  "/images/refresh.png",
		    showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
		  });
		  menuCiudades.addEventListener("click", function(e) {
		    cambiaCiudad();
		  });
		  menuRecargar.addEventListener("click", function(e) {
		    iniciar();
		  });
		};

	}
	tableView.hide();
	viewLoading.show();
	activityIndicator.show();
	
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	        // this.responseText holds the raw text return of the message (used for JSON)
	        // this.responseXML holds any returned XML (used for SOAP web services)
	        // this.responseData holds any returned binary data
	        //alert(this.responseText);
	      
	        var jsonObject = JSON.parse(this.responseText);
	       // alert(jsonObject);
	        var tableData = [];
	        if (jsonObject.data.length > 0){
	        	
				for (var i=0; i<jsonObject.data.length; i++){
				  var row = Ti.UI.createTableViewRow({
				    //className:'forumEvent', // used to improve table performance
				    selectedBackgroundColor:'blue',
				    rowIndex:i, // custom property, useful for determining the row during events
				    height:110+'dp', borderRadius:8,
				    id:i,
				    backgroundColor:'white'
				  });
				  
				  var imageAvatar = Ti.UI.createImageView({
				    image: jsonObject.data[i].thumb,
				    left:10+'dp', top:5+'dp',
				    width:68+'dp', height:100+'dp'
				  });
				  row.add(imageAvatar);
				  
				  var labelTitulo = Ti.UI.createLabel({
				    color:'#000',
				    font:{fontWeight:'bold', fontSize:16+'dp'},
				    text:jsonObject.data[i].titulo,
				    left:105+'dp', top: 0,
				    width:215+'dp', height: 40+'dp'
				  });
				  row.add(labelTitulo);
				  var labelIdioma = Ti.UI.createLabel({
				    color:'black',
				    text:'IDIOMA: '+jsonObject.data[i].lenguaje,
				    font:{fontFamily:'Helvetica-Oblique', fontWeight:'bold', fontSize:14+'dp'},
				    left:105+'dp', top: 46+'dp',
				    width:200+'dp', height: 20+'dp'
				  });
				  row.add(labelIdioma);
				  var labelCensura = Ti.UI.createLabel({
				    color:'black',
				    text:'CENSURA: '+jsonObject.data[i].censura,
				    font:{fontFamily:'Helvetica-Oblique', fontWeight:'bold', fontSize:14+'dp'},
				    left:105+'dp', top: 66+'dp',
				    width:200+'dp', height: 20+'dp'
				  });
				  row.add(labelCensura);
				  var labelGenero = Ti.UI.createLabel({
				    color:'black',
				    text:'GENERO: '+jsonObject.data[i].genero,
				    font:{fontFamily:'Helvetica-Oblique', fontWeight:'bold', fontSize:14+'dp'},
				    left:105+'dp', top: 86+'dp',
				    width:200+'dp', height: 20+'dp'
				  });
				  row.add(labelGenero);
				  var label3d = Ti.UI.createLabel({
				    color:'black',
				    text:'3D',
				    font:{fontFamily:'HelveticaNeue-Bold', fontWeight:'bold', fontSize:16+'dp'},
				    left:285+'dp', top: 46+'dp',
				    width:30+'dp', height: 40+'dp'
				  });
				  if(jsonObject.data[i].tresd == 'si'){
				  	 row.add(label3d);
				  }
				 
				  tableData.push(row);
				  
				  row.addEventListener('click',function(ev){
					var btnBack = Ti.UI.createButton({
						 backgroundImage:'/images/botonVolver.png',
						 width:88+'dp',height:29+'dp', left:0+'dp',
					 });
	 				Flurry.logEvent('detalle',{cantidad:'Abierto'});
				 	var display = Ti.UI.createWindow({
							 url:'Detalles.js',
							 barColor:'#000',
							 backgroundColor:'white',
							 detalle:jsonObject.data[ev.row.id],
							 leftNavButton:btnBack,
							 title:jsonObject.data[ev.row.id].titulo,
							 Flurry:Flurry
					 });
					 btnBack.addEventListener('click', function() { display.close(); }); 
						 Titanium.UI.currentTab.open(display,{animated:true});
					 });
				}
				
				
				tableView.show();
				tableView.setData(tableData);
				activityIndicator.hide();
				viewLoading.hide();
			}
			else{
				var noDatos = Ti.UI.createLabel({
					text:'No existen nuevas notificaciones.',
					top:80+'dp',
					color:'white'
				});
				win.add(noDatos);
			}
			activityIndicator.hide();
	    },
	    onerror: function(e) {
	        var alert = Titanium.UI.createAlertDialog({
			    title: 'Error al cargar la cartelera!',
			    message: 'Deseas intentarlo nuevamente?',
			    buttonNames: ['Si', 'No'],
			    cancel: 1
			});
			Flurry.logError('Cartelera',JSON.stringify(e));
			alert.addEventListener('click', function(e) { 
			   //Clicked cancel, first check is for iphone, second for android
			   if (e.cancel === e.index || e.cancel === true) {
			      activityIndicator.hide();
			      		var noDatos = Ti.UI.createLabel({
							text:'No se ha podido cargar la cartelera.',
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
	    timeout:25000
	});
	
	xhr.open("GET", url);
	xhr.setRequestHeader( 'User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1');
	xhr.send();
}
iniciar();

var winCambiar =Ti.UI.createWindow();
var cerrarVentana= Ti.UI.createButton({
	style:Ti.UI.iPhone.SystemButtonStyle.DONE, title:'Cerrar' 
});
cerrarVentana.addEventListener('click',function(e){
	winCambiar.close({
		modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,  modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
	});
});

winCambiar.setBackgroundColor('white');
if(android){
	
}else{
	winCambiar.setRightNavButton(cerrarVentana);
	winCambiar.setBarColor('#000');
}


var logo = Ti.UI.createImageView({
	image:"/images/splash.png", width:"auto", height:"auto", top:40+'dp'

	
});
winCambiar.add(logo);
var cuenca = Ti.UI.createButton({
	backgroundImage :"/images/botonCuenca.png", width:177+'dp', height:35+'dp',top:320+'dp'
});
var quito = Ti.UI.createButton({
	backgroundImage :"/images/botonQuito.png", width:177+'dp', height:35+'dp',top:280+'dp'
});
winCambiar.add(cuenca);
winCambiar.add(quito);

if(android){
	cuenca.setTop('320dp');
	quito.setTop('360dp');
}

cuenca.addEventListener('click', function(e){
	Flurry.logEvent('ciudad',{ciudad:'Cuenca'});
	Ti.App.Properties.setString('ciudad','cuenca');
	iniciar();
	winCambiar.close({
		modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,  modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
	});
		
});
quito.addEventListener('click',function(e){
	Flurry.logEvent('ciudad',{ciudad:'Quito'});
	Ti.App.Properties.setString('ciudad','quito');
	iniciar();
	winCambiar.close({
		modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,  modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
	});
});
//var url = "http://www.multicines.com.ec/MulticinesAPI/cinesJSON.php";

var btnCabiar=Ti.UI.createButton({
	title:'Ciudades', top:5+'dp', right:10+'dp'
});

btnCabiar.addEventListener('click',function(e){
	cambiaCiudad();
});

function cambiaCiudad(){
	winCambiar.open({modal:true,  modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,  modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
}

var btnRefresh=Ti.UI.createButton({
	title:'Recargar', systemButton:Ti.UI.iPhone.SystemButton.REFRESH, top:5+'dp', left:10+'dp'
});
btnRefresh.addEventListener('click',function(e){
	Flurry.logEvent('Refrescar',{refrescar:'Refrescar'});
	iniciar();
});
if(!android){
	win.setRightNavButton(btnCabiar);
	win.setLeftNavButton(btnRefresh);
}else{
	// win.add(btnCabiar);
	// win.add(btnRefresh);
}

