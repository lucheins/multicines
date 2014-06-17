var win = Ti.UI.currentWindow;
var android = (Ti.Platform.osname === 'android');
var detalle = win.detalle;
var lineaImg = Ti.UI.createImageView({
	image:'../../images/lineaHorizontal.png', top:150
});
win.add(lineaImg);
var imageAvatar = Ti.UI.createImageView({
    image: detalle.thumb,
    left:10, top:50,
    width:70, height:90
  });
  win.add(imageAvatar);
  
  var labelTitulo = Ti.UI.createLabel({
    color:'black',
    font:{fontFamily:'HelveticaNeue-Bold', fontWeight:'bold', fontSize:18},
    text:detalle.titulo,
    left:10, top: 0,
    width:300, height: 30
  });
  win.add(labelTitulo);
  var labelIdioma = Ti.UI.createLabel({
    color:'black',
    text:'IDIOMA: '+detalle.lenguaje,
    font:{fontFamily:'Helvetica-Oblique', fontWeight:'bold', fontSize:14},
    left:10, top: 30,
    width:200, height: 20
  });
  win.add(labelIdioma);
  var labelCensura = Ti.UI.createLabel({
    color:'black',
    text:'CENSURA: '+detalle.censura + '        GENERO: '+detalle.genero,
    font:{fontFamily:'Helvetica-Oblique', fontWeight:'bold', fontSize:11},
    left:10, top: 150,
    width:300, height: 20
  });
  win.add(labelCensura);
  var label3d = Ti.UI.createLabel({
    color:'black',
    text:'3D',
    font:{fontFamily:'HelveticaNeue-Bold', fontWeight:'bold', fontSize:16},
    left:285, top: 0,
    width:30, height: 40
  });
  if(detalle.tresd == 'si'){
  	 win.add(label3d);
  }
  
  
  var sinopsis = Ti.UI.createTextArea({
  	value: detalle.sinopsis, top: 50, left: 90, width:220, height:90, editable:false
  });
  win.add(sinopsis);
	
	var imgCompras = Ti.UI.createImageView({
		image:'../../images/imgCompras.png', top:170
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
	for(i=0; i< detalle.lugares.length;i++){
		var row = Ti.UI.createTableViewRow({
		    className:'forumEvent', // used to improve table performance
		    selectedBackgroundColor:'white',
		    rowIndex:i, // custom property, useful for determining the row during events
		    height:44, borderRadius:8,
		    id:i,
		    focusable:false,touchEnabled:false, selectedColor:'white'
		});
		var complejo = Ti.UI.createLabel({
			text:detalle.lugares[i].complejo,
			left:10, width:90,  font:{fontFamily:'HelveticaNeue-Bold', fontWeight:'bold', fontSize:10},
		});
		row.add(complejo);
		l=110;
		var hay=0;
		for(var j=0;j<detalle.lugares[i].horarios.length;j++){
			var d = new Date();
			if(hay>=4){
				var btnMas = Ti.UI.createButton({
					 left:290, id:i, backgroundImage:'../../images/mas.png', width:16, height:16
				});
				if(android){
					btnMas.setLeft(300);
				}
				row.add(btnMas);
				btnMas.addEventListener('click',function(ev){
					var horarios=[];
					
					for(var k=0;k<detalle.lugares[ev.source.id].horarios.length;k++){
						var horaTodas =Ti.UI.createTableViewRow({title:detalle.lugares[ev.source.id].horarios[k].hora, link:detalle.lugares[ev.source.id].horarios[j].link});
						horarios.push(horaTodas);
						horaTodas.addEventListener('click', function(e){
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
								backgroundColor:'white',title:'Compra de entradas', barColor:'black', rightNavButton:cerrarVentana
							});
							winComprar.add(comprarWV);
							if(android){
								comprarWV.setTop(50);
								winComprar.add(cerrarVentana);
								cerrarVentana.setTop(0);
								cerrarVentana.setLeft(10);
								
							}
							winComprar.open( {modal:true,  modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,  modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
							comprarWV.addEventListener('load',function(e){
							//	comprarWV.evalJS("$('head').prepend('<meta name='viewport' content='initial-scale=1.0; maximum-scale=1.0; user-scalable=0;'/>);");
							//	comprarWV.evalJS("for (var i=0; i < document.images.length;i++){var imgs = document.images.item(i).src;		if(imgs.indexOf('pic_19494.jpg') != -1){			document.images.item(i).width=45;			}		else if(imgs.indexOf('pic_33465.jpg') != -1){			document.images.item(i).width=45;			}	else if(imgs.indexOf('pic_1656.jpg') != -1){			document.images.item(i).width=45;			} else if(imgs.indexOf('pic_26726.jpg') != -1){			document.images.item(i).width=45;			}	else if(imgs.indexOf('pic_1897.png') != -1){			document.images.item(i).width=45;			}	}	var tablas = document.getElementsByTagName('table');	var cont =0;	document.getElementById('main').style.width='100%';	for (var i=0; i < tablas.length ;i++){		if (tablas.item(i).width == '80%'){			tablas.item(i).width = '30%';				tablas.item(i).align = 'left';		}			} document.getElementsByTagName('head').item(0).innerHTML +='<style>body, td, div, span {    font-family: Verdana,Geneva,Arial,Helvetica,sans-serif;    font-size: 8px; webkitTextSizeAdjust:50%}	</style>';");
								comprarWV.evalJS("$('#jr_overlay,#jr_wrap').fadeOut('fast',function(){ $(this).remove();}); document.getElementsByTagName('body')[0].style.webkitTextSizeAdjust= '75%'");
							//	comprarWV.evalJS("$(document).ready(function(){$('.footer').css('display','none'); $('.container_top').css('display','none');$('.social_links').css('display','none'); $('#left_panel').hide();$('body').css('background','transparent'); $('.long_yellow').css('width',300); $('.span-17').css('width','280');$('.anythingSlider').hide();$('.span-6').css('width','80px'); $('input#document').css('width','80px'); $('.span-12').css({'width':'250px', 'font-size':'12px'}); $('#btnSend').css('width','80px'); $('#right_panel').css('width','480px'); $('.lightBlue').css({'font-size': '14px', 'width': '80px;','left': '-90px', 'position': 'relative'}); $('.span-4 img').css('width','65px'); $('#captcha').css('width','120px'); $('#recaptcha_response_field').css({'width':'100','height':'35','font-size':'14px'});});");
								comprarWV.evalJS("$('.social_links').css('display','none'); $('#left_panel').hide();$('body').css('background','transparent');$('.anythingSlider').hide();$");
							});
						});
					}
					
					var tablaHoras = Ti.UI.createTableView({
						 backgroundColor:'white',
						  data:horarios,
						  separatorColor : 'black',
						  top:30, height:300
					});
				
					var escoga = Ti.UI.createLabel({
						title:'Escoja un horario',top:10, color:'black'
					});
					var cerrarVentana= Ti.UI.createButton({
						style:Ti.UI.iPhone.SystemButtonStyle.DONE, title:'Cerrar' 
					});
					cerrarVentana.addEventListener('click',function(e){
						winHor.close({
							modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,  modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
							})
						});
					var winHor = Ti.UI.createWindow({
						backgroundColor:'white',title:'Todos los horarios', barColor:'black', rightNavButton:cerrarVentana
					});
					winHor.add(escoga);
					winHor.add(tablaHoras);
					winHor.open( {modal:true,  modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,  modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
				});
				break;
			}
			if (dateCompare(d.getHours()+':'+d.getMinutes()+':00',detalle.lugares[i].horarios[j].hora+':00') == -1){
				var hora = Ti.UI.createButton({
					title:detalle.lugares[i].horarios[j].hora,
					link:detalle.lugares[i].horarios[j].link,
					width:40,font:{fontFamily:'HelveticaNeue-Bold', fontWeight:'bold', fontSize:10}, height:38, left:l
				});
				if(android){
					hora.setWidth(44);
					
				}
				hora.addEventListener('click', function(e){
					var comprarWV = Ti.UI.createWebView({
						url:e.source.link
					});
					
					var cerrarVentana= Ti.UI.createButton({
						style:Ti.UI.iPhone.SystemButtonStyle.DONE, title:'Cerrar' 
					});
					cerrarVentana.addEventListener('click',function(e){
						winComprar.close({
							modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,  modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
						})
					});
					var winComprar = Ti.UI.createWindow({
						backgroundColor:'black',title:'Compra de entradas', barColor:'black', rightNavButton:cerrarVentana
					});
					winComprar.add(comprarWV);
					if(android){
						comprarWV.setTop(50);
						winComprar.add(cerrarVentana);
						cerrarVentana.setTop(0);
						cerrarVentana.setLeft(10);
					}
					winComprar.open( {modal:true,  modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,  modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
					comprarWV.addEventListener('load',function(e){
					//	comprarWV.evalJS("$('head').prepend('<meta name='viewport' content='initial-scale=1.0; maximum-scale=1.0; user-scalable=0;'/>);");
					//	comprarWV.evalJS("for (var i=0; i < document.images.length;i++){var imgs = document.images.item(i).src;		if(imgs.indexOf('pic_19494.jpg') != -1){			document.images.item(i).width=45;			}		else if(imgs.indexOf('pic_33465.jpg') != -1){			document.images.item(i).width=45;			}	else if(imgs.indexOf('pic_1656.jpg') != -1){			document.images.item(i).width=45;			} else if(imgs.indexOf('pic_26726.jpg') != -1){			document.images.item(i).width=45;			}	else if(imgs.indexOf('pic_1897.png') != -1){			document.images.item(i).width=45;			}	}	var tablas = document.getElementsByTagName('table');	var cont =0;	document.getElementById('main').style.width='100%';	for (var i=0; i < tablas.length ;i++){		if (tablas.item(i).width == '80%'){			tablas.item(i).width = '30%';				tablas.item(i).align = 'left';		}			} document.getElementsByTagName('head').item(0).innerHTML +='<style>body, td, div, span {    font-family: Verdana,Geneva,Arial,Helvetica,sans-serif;    font-size: 8px; webkitTextSizeAdjust:50%}	</style>';");
						comprarWV.evalJS("$('#jr_overlay,#jr_wrap').fadeOut('fast',function(){ $(this).remove();}); document.getElementsByTagName('body')[0].style.webkitTextSizeAdjust= '75%'");
					//	comprarWV.evalJS("$(document).ready(function(){$('.footer').css('display','none'); $('.container_top').css('display','none');$('.social_links').css('display','none'); $('#left_panel').hide();$('body').css('background','transparent'); $('.long_yellow').css('width',300); $('.span-17').css('width','280');$('.anythingSlider').hide();$('.span-6').css('width','80px'); $('input#document').css('width','80px'); $('.span-12').css({'width':'250px', 'font-size':'12px'}); $('#btnSend').css('width','80px'); $('#right_panel').css('width','480px'); $('.lightBlue').css({'font-size': '14px', 'width': '80px;','left': '-90px', 'position': 'relative'}); $('.span-4 img').css('width','65px'); $('#captcha').css('width','120px'); $('#recaptcha_response_field').css({'width':'100','height':'35','font-size':'14px'});});");
						comprarWV.evalJS("$('.social_links').css('display','none'); $('#left_panel').hide();$('body').css('background','transparent');$('.anythingSlider').hide();$");
					});
					
				});
				l=l+42;
				row.add(hora);
				hay++;

			}
			
			
		}
		if(hay==0){
			var noHoras= Ti.UI.createLabel({
				text:'No hay funciones.',font:{fontFamily:'HelveticaNeue-Bold', fontWeight:'bold', fontSize:10}, left:l
			});
			if(detalle.lugares[i].horarios.length>0){
				
			
				var abrirHorarios =  Ti.UI.createButton({
					title:'Ver horarios', height:38, right:5, id:i
					,font:{fontFamily:'HelveticaNeue-Bold', fontWeight:'bold', fontSize:12}
				});
				abrirHorarios.addEventListener('click',function(ev){
					var horarios=[];
					
					for(var k=0;k<detalle.lugares[ev.source.id].horarios.length;k++){
						var horaTodas =Ti.UI.createTableViewRow({title:detalle.lugares[ev.source.id].horarios[k].hora});
						horarios.push(horaTodas);						
					}
					
					var tablaHoras = Ti.UI.createTableView({
						 backgroundColor:'white',
						  data:horarios,
						  separatorColor : 'black',
						  top:30, height:200
					});
				
					var cerrarVentana= Ti.UI.createButton({
						style:Ti.UI.iPhone.SystemButtonStyle.DONE, title:'Cerrar' 
					});
					cerrarVentana.addEventListener('click',function(e){
						winHor.close({
							modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,  modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
							})
						});
					var winHor = Ti.UI.createWindow({
						backgroundColor:'white',title:'Todos los horarios', barColor:'black', rightNavButton:cerrarVentana
					});
					winHor.add(tablaHoras);
					winHor.open( {modal:true,  modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,  modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET});
				});
				row.add(abrirHorarios);
			}
			
			row.add(noHoras);
		}
		tableData.push(row);
	}
	var tableView = Ti.UI.createTableView({
	  backgroundColor:'white',
	  data:tableData,
	  separatorColor : 'black',
	  top:200, height:100
	});
	if(android){
		tableView.setHeight(200);
	}
	win.add(tableView);		  
	var url = "http://gdata.youtube.com/feeds/api/videos?q=trailer+"+ encodeURI(detalle.titulo) +"&key=AI39si7G7Y4n3rGMWcol6gz_06PciWdsHFaYX2I-j3Tr-lQuI6JeqffEIdYMZwnLyWm3SXWfxYhmlJwgqqcOd7ZLg_g5zCasBQ&max-results=3&v=2&format=5&alt=jsonc";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	        // this.responseText holds the raw text return of the message (used for JSON)
	        // this.responseXML holds any returned XML (used for SOAP web services)
	        // this.responseData holds any returned binary data
	        var jsonObject = JSON.parse(this.responseText);
	        
	        var espacio = 15;
			for(var i=0;i<jsonObject.data.items.length;i++){
				var content=jsonObject.data.items[i].id;
				if(!android){
					// var video = '<html>	<head>		<meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=90"/><title>YouTube Trailer</title></head><body style="background:#fff;margin-top:0px;margin-left:0px"><div>	<object width="90" height="60"><param name="movie" value="http://www.youtube.com/watch?v=';
		        	// video += content + '></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/watch?v=';
		        	// video+=content + '"type="application/x-shockwave-flash" wmode="transparent" width="90" height="60"></embed></object></div></body></html>';
					video = '<iframe class="youtube-player" type="text/html" width="90" height="60" src="http://www.youtube.com/embed/'+content+'" frameborder="0"></iframe>';
					var youtube = Ti.UI.createWebView({
		        		html:video,top:285, left:espacio +(90 *i), width:90,height:70
		        	});
		        	win.add(youtube);
				}
	        	else{
	        		var img = Ti.UI.createButton({
		        		backgroundImage:jsonObject.data.items[i].thumbnail.sqDefault, top:395, left:espacio +(95 *i), width:90,height:60, cont:content
		        	});
		        	img.addEventListener('click', function(e){
		        		Ti.Platform.openURL('http://www.youtube.com/embed/'+e.source.cont);
		        	
		        	});
		        	win.add(img);
	        	}
	        	
	        	
	        	//galerias.push(youtube);
	        }

	    },
	    onerror: function(e) {
	       var alert = Titanium.UI.createAlertDialog({
			    title: 'Error al cargar los trailers desde youtube',
			    message: 'Deseas intentarlo nuevamente?',
			    buttonNames: ['Si', 'No'],
			    cancel: 1
			});
			alert.addEventListener('click', function(e) { 
			   //Clicked cancel, first check is for iphone, second for android
			   if (e.cancel === e.index || e.cancel === true) {
			     
			      		var noDatos = Ti.UI.createLabel({
							text:'No se ha podido cargar trailers.',
							top:20,
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
