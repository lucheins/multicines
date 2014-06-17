var win = Ti.UI.currentWindow;
var android = (Ti.Platform.osname === 'android');
var detalle = win.detalle;
var Flurry = win.Flurry;

var imageAvatar = Ti.UI.createImageView({
    image: detalle.thumb,
    left:'5dp', top:'10dp',
    width:'95dp', height:'140dp'
  });
  win.add(imageAvatar);
  
  var labelTitulo = Ti.UI.createLabel({
    color:'black',
    font:{fontFamily:'HelveticaNeue-Bold', fontWeight:'bold', fontSize:'13dp'},
    text:detalle.titulo +' ('+detalle.lenguaje+')',
    left:'105dp', top: '3dp',
    width:'210dp', height: 35+'dp'
  });
  win.add(labelTitulo);
  var sinopsis = Ti.UI.createTextArea({
  	value: detalle.sinopsis, top: 50+'dp', left: 105+'dp', width:210+'dp', height:70+'dp', editable:false,
  	font:{ fontSize:11+'dp'},color:'black'
  });
  win.add(sinopsis);
  var lineaImg = Ti.UI.createImageView({
	image:'/images/lineaHorizontal.png', top:40+'dp', left:110+'dp'
  });
  win.add(lineaImg);
  
  var trailersBtn = Ti.UI.createButton({
  	width:83+'dp',height:38+'dp', backgroundImage:'/images/trailers.png', top:122+'dp', left:100+'dp',visible:false
  });
  win.add(trailersBtn);
  
  var labelCensura = Ti.UI.createLabel({
    color:'black',
    text:'Censura: '+detalle.censura + '\nGénero: '+detalle.genero,
    font:{fontFamily:'Helvetica-Oblique', fontWeight:'bold', fontSize:11+'dp'},
    left:190+'dp', top: 125+'dp',
    width:120+'dp', height: 40+'dp'
  });
  win.add(labelCensura);
  
  if(detalle.tresd == 'si'){
  	 win.add(Ti.UI.createImageView({
  	 	width:27+'dp',height:25+'dp', image:'/images/tresd.png',right:10+'dp', top:25+'dp',
  	 }));
  }
  
  
  
	
	var imgCompras = Ti.UI.createImageView({
		image:'/images/lineaHorizontal.png', top:170+'dp'
	});
	win.add(imgCompras);
	
	function dateCompare(time1,time2) {
	  var t1 = new Date();
	  var parts = time1.split(":");
	  t1.setHours(parts[0],parts[1],parts[2],0);
	  var t2 = new Date();
	  parts = time2.split(":");
	  t2.setHours(parts[0],parts[1],parts[2],0);
	
	  // returns 1 if greater, -1 if less and 0 if the same
	  if (t1.getTime()>t2.getTime()) return 1;
	  if (t1.getTime()<t2.getTime()) return -1;
	  return 0;
	}
	var tableData = [];
	
	var headerView = Ti.UI.createView({
		width:Ti.Platform.displayCaps.getPlatformWidth(), backgroundColor:'darkgray', height:'30dp',
	});
	headerView.add(Ti.UI.createLabel({
		color:'white', text:'COMPLEJO', left:'3dp',font:{fontFamily:'HelveticaNeue-Bold', fontWeight:'bold', fontSize:12+'dp'},
	}));
	headerView.add(Ti.UI.createLabel({
		color:'white', text:'FUNCIONES', left:'95dp',font:{fontFamily:'HelveticaNeue-Bold', fontWeight:'bold', fontSize:12+'dp'},
	}));
	var comp = Ti.UI.createTableViewSection({
		headerView:headerView
	});
	tableData.push(comp);
	for(i=0; i< detalle.lugares.length;i++){
		var rowHeight = Math.ceil(detalle.lugares[i].horarios.length / 4);
		Ti.API.info('c:'+detalle.lugares[i].complejo+ ' t: '+detalle.lugares[i].horarios.length+' r: '+rowHeight);
		var row = Ti.UI.createTableViewRow({
		    className:'forumEvent', // used to improve table performance
		    selectedBackgroundColor:'darkgray',
		    rowIndex:i, // custom property, useful for determining the row during events
		    borderRadius:8,
		    id:i,
		    focusable:false,touchEnabled:false, selectedColor:'white'
		});
		var fondo = Ti.UI.createView({
			width:80+'dp', height:(rowHeight*40)+'dp', left:0,top:0,backgroundColor:'white'
		});
		var complejo = Ti.UI.createLabel({
			text:detalle.lugares[i].complejo,
			left:10+'dp', width:70+'dp',  font:{fontFamily:'HelveticaNeue-Bold', fontWeight:'bold', fontSize:12+'dp'},
			color:'black'
		});
		fondo.add(complejo);
		row.add(fondo);
		l=90;
		h=5;
		var hay=0;
		for(var j=0;j<detalle.lugares[i].horarios.length;j++){
			if(( j % 4 ) == 0 && j >0){
				h=h+38;
				l=90;
			}
			var d = new Date();
			if (dateCompare(d.getHours()+':'+d.getMinutes()+':00',detalle.lugares[i].horarios[j].hora+':00') == -1){
				var hora = Ti.UI.createButton({
					title:detalle.lugares[i].horarios[j].hora,
					link:detalle.lugares[i].horarios[j].link,
					backgroundImage:'/images/botonHora.png', 
					width:52+'dp',font:{fontFamily:'HelveticaNeue-Bold', fontWeight:'bold', fontSize:10+'dp'}, height:35+'dp', 
					left:l+'dp',top:h+'dp',
					compra:true, color:'black'
				});
			}else{
				var hora = Ti.UI.createButton({
					title:detalle.lugares[i].horarios[j].hora,
					link:detalle.lugares[i].horarios[j].link,
					backgroundImage:'/images/noHora2.png', 
					width:52+'dp',font:{fontFamily:'HelveticaNeue-Bold', fontWeight:'bold', fontSize:10+'dp'}, 
					height:35+'dp', left:l+'dp',top:h+'dp',
					compra:false, color:'black', complejo:detalle.lugares[i].complejo
				});
			}
			
			hora.addEventListener('click', function(e){
				if(e.source.compra ==false){
					var dialog = Ti.UI.createAlertDialog({
						title:'Multicines', message:'Lamentamos informarle que el horario seleccionado de esta película ya no se encuentra disponible para la compra del día de hoy.'
					});
					dialog.show();
				}else{
					Flurry.logEvent('Comprar',{titulo:detalle.titulo,complejo:e.source.complejo});
					var comprarWV = Ti.UI.createWebView({
						url:e.source.link
					});
					
					var cerrarVentana= Ti.UI.createButton({
						style:Ti.UI.iPhone.SystemButtonStyle.DONE, title:'Cerrar' 
					});
					cerrarVentana.addEventListener('click',function(e){
						winComprar.close({
							modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,  modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
						});
					});
					var winComprar = Ti.UI.createWindow({
						backgroundColor:'black',title:'Compra de entradas', barColor:'black', rightNavButton:cerrarVentana
					});
					winComprar.add(comprarWV);
					if(android){
						comprarWV.setTop(50+'dp');
						winComprar.add(cerrarVentana);
						cerrarVentana.setTop(0);
						cerrarVentana.setLeft(10+'dp');
					}
					winComprar.open( {modal:true,  modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,  modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
					comprarWV.addEventListener('load',function(e){
					//	comprarWV.evalJS("$('head').prepend('<meta name='viewport' content='initial-scale=1.0; maximum-scale=1.0; user-scalable=0;'/>);");
					//	comprarWV.evalJS("for (var i=0; i < document.images.length;i++){var imgs = document.images.item(i).src;		if(imgs.indexOf('pic_19494.jpg') != -1){			document.images.item(i).width=45;			}		else if(imgs.indexOf('pic_33465.jpg') != -1){			document.images.item(i).width=45;			}	else if(imgs.indexOf('pic_1656.jpg') != -1){			document.images.item(i).width=45;			} else if(imgs.indexOf('pic_26726.jpg') != -1){			document.images.item(i).width=45;			}	else if(imgs.indexOf('pic_1897.png') != -1){			document.images.item(i).width=45;			}	}	var tablas = document.getElementsByTagName('table');	var cont =0;	document.getElementById('main').style.width='100%';	for (var i=0; i < tablas.length ;i++){		if (tablas.item(i).width == '80%'){			tablas.item(i).width = '30%';				tablas.item(i).align = 'left';		}			} document.getElementsByTagName('head').item(0).innerHTML +='<style>body, td, div, span {    font-family: Verdana,Geneva,Arial,Helvetica,sans-serif;    font-size: 8px; webkitTextSizeAdjust:50%}	</style>';");
						comprarWV.evalJS("$('#jr_overlay,#jr_wrap').fadeOut('fast',function(){ $(this).remove();}); document.getElementsByTagName('body')[0].style.webkitTextSizeAdjust= '75%'");
					//	comprarWV.evalJS("$(document).ready(function(){$('.footer').css('display','none'); $('.container_top').css('display','none');$('.social_links').css('display','none'); $('#left_panel').hide();$('body').css('background','transparent'); $('.long_yellow').css('width',300); $('.span-17').css('width','280');$('.anythingSlider').hide();$('.span-6').css('width','80px'); $('input#document').css('width','80px'); $('.span-12').css({'width':'250px', 'font-size':'12px'}); $('#btnSend').css('width','80px'); $('#right_panel').css('width','480px'); $('.lightBlue').css({'font-size': '14px', 'width': '80px;','left': '-90px', 'position': 'relative'}); $('.span-4 img').css('width','65px'); $('#captcha').css('width','120px'); $('#recaptcha_response_field').css({'width':'100','height':'35','font-size':'14px'});});");
						comprarWV.evalJS("$('.social_links').css('display','none'); $('#left_panel').hide();$('body').css('background','transparent');$('.anythingSlider').hide();$");
					});
				}
			});
			l=l+56;
			row.add(hora);
			hay++;
		}
		tableData.push(row);
	}
	

	var tableView = Ti.UI.createTableView({
	  backgroundColor:'white',
	  data:tableData,
	  separatorColor : 'darkgray',
	  top:180+'dp', height:Ti.UI.FILL
	});
	
	win.add(tableView);	
	
	var viewTrailers = Ti.UI.createView({
		width:280+'dp', height:200+'dp', backgroundColor:'black',visible:false
	});	  
	win.add(viewTrailers);
	
	var trailer;
	trailersBtn.addEventListener('click',function(e){
		//viewTrailers.show();
		Flurry.logEvent('Trailer',{titulo:detalle.titulo,url:trailer});
		var btnBackT = Ti.UI.createButton({
			 backgroundImage:'/images/botonVolver.png',
			 width:88+'dp',height:29+'dp', left:0+'dp',
		 });
		var trailerWindow = Ti.UI.createWindow({
			title:'Trailer', backButtonTitle:'Volver', 
			width:Ti.Platform.displayCaps.getPlatformWidth(),
			height:Ti.Platform.displayCaps.getPlatformHeight(),
			backgroundColor:'white', leftNavButton:btnBackT, barColor:'black'
		});
		trailerWindow.add(Ti.UI.createLabel({
		    color:'black',
		    font:{fontFamily:'HelveticaNeue-Bold', fontWeight:'bold', fontSize:15},
		    text:detalle.titulo +' ('+detalle.lenguaje+')',
		    top: 53+'dp',
		    width:300+'dp', height: 40+'dp'
		}));
		if(android){
			var youtubePlayer = require('titutorial.youtubeplayer');
			Ti.API.info("module is => " + youtubePlayer);
			trailerWindow.add(youtubePlayer);
			youtubePlayer.playVideo(trailer);
			
		}else{
			video = '<iframe class="youtube-player" type="text/html" width="310" height="280" src="http://www.youtube.com/embed/'+trailer+'" frameborder="0"></iframe>';
			var youtube = Ti.UI.createWebView({
	    		html:video, width:320+'dp',height:280+'dp'
	    	});
	    	trailerWindow.add(youtube);
			trailerWindow.open({modal:true});
			btnBackT.addEventListener('click',function(ev){
				trailerWindow.close();
			});
		}
		
		
		
	});
	var url = "http://gdata.youtube.com/feeds/api/videos?q=trailer+"+ encodeURI(detalle.titulo) +"&key=AI39si7G7Y4n3rGMWcol6gz_06PciWdsHFaYX2I-j3Tr-lQuI6JeqffEIdYMZwnLyWm3SXWfxYhmlJwgqqcOd7ZLg_g5zCasBQ&max-results=3&v=2&format=5&alt=jsonc";
	Ti.API.info(url);
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	        // this.responseText holds the raw text return of the message (used for JSON)
	        // this.responseXML holds any returned XML (used for SOAP web services)
	        // this.responseData holds any returned binary data
	        var jsonObject = JSON.parse(this.responseText);
	        
	        var espacio = 15;
			for(var i=0;i<jsonObject.data.items.length;i++){
				
				// if(android){
					// var contents=jsonObject.data.items[i].content;
					// var content=contents['1'];
					// Ti.API.info(content);
				// }else{
					var content=jsonObject.data.items[i].id;
					
				//}
				if(content!=undefined){
					trailer = content;
					trailersBtn.visible=true;
					break;
				}
				
	        }

	    },
	    onerror: function(e) {
	       var alert = Titanium.UI.createAlertDialog({
			    title: 'Error al cargar los trailers desde youtube',
			    message: 'Deseas intentarlo nuevamente?',
			    buttonNames: ['Si', 'No'],
			    cancel: 1
			});
			Flurry.logError('Youtube',url);
			alert.addEventListener('click', function(e) { 
			   //Clicked cancel, first check is for iphone, second for android
			   if (e.cancel === e.index || e.cancel === true) {
			     
			      		var noDatos = Ti.UI.createLabel({
							text:'No se ha podido cargar trailers.',
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
	    timeout:5000
	});
	 
	xhr.open("GET", url);
	xhr.setRequestHeader( 'User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1');
	xhr.send();
