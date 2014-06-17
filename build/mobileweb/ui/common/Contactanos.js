var win = Ti.UI.currentWindow;
var android = (Ti.Platform.osname === 'android');

var siguiente = Titanium.UI.createButton({
    title : 'Siguiente',
    style : Titanium.UI.iPhone.SystemButtonStyle.DONE
});
var enviar = Titanium.UI.createButton({
    title : 'Enviar',
    style : Titanium.UI.iPhone.SystemButtonStyle.DONE
});

var anterior = Titanium.UI.createButton({
	title : 'Anterior',
    systemButton : Titanium.UI.iPhone.SystemButton.DONE
});

var flexSpace = Titanium.UI.createButton({
    systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var nombre = Ti.UI.createTextField({
	top:20+'dp',   width:260+'dp', height:30+'dp', value:'Nombre', borderWidth: 2,  
	borderColor: 'black',  borderRadius: 5,borderStyle : Titanium.UI.INPUT_BORDERSTYLE_BEZEL,clearOnEdit:true,
	color:'black'
});
nombre.addEventListener('blur',function(e){
	if(nombre.hasText()==false){
		nombre.setValue('Nombre');
	}
});
var email = Ti.UI.createTextField({
	top:60+'dp',   width:260+'dp',  height:30+'dp', value:'Email', borderWidth: 2, 
	borderColor: 'black',  borderRadius: 5,borderStyle : Titanium.UI.INPUT_BORDERSTYLE_BEZEL, clearOnEdit:true,
	color:'black'
    
});
email.addEventListener('blur',function(e){
	if(!email.hasText()){
		email.setValue('Email');
	}
});

var complejo = Ti.UI.createTextField({
	top:100+'dp',  width:260+'dp',  height:30+'dp', value:'Complejo', borderWidth: 2, 
	borderColor: 'black',  borderRadius: 5,borderStyle : Titanium.UI.INPUT_BORDERSTYLE_BEZEL, clearOnEdit:true,
	color:'black'
});
var comentario = Ti.UI.createTextArea({
	top:140+'dp',  height:140+'dp', width:260+'dp', value:'Comentario', borderWidth: 2,  borderColor: 'black',  
	borderRadius: 5,borderStyle : Titanium.UI.INPUT_BORDERSTYLE_BEZEL, clearOnEdit:true,
	color:'black'
});
comentario.addEventListener('focus', function(e){
	var animation =Ti.UI.createAnimation({top:-140, duration:500});
	win.animate(animation);
});
comentario.addEventListener('blur', function(e){
	var animation =Ti.UI.createAnimation({top:0, duration:500});
	win.animate(animation);
});
Ti.UI.backgroundColor = 'white';
var winP = Ti.UI.createWindow({
  exitOnClose: true,
  layout: 'vertical',
  top:230+'dp'
});

var picker = Ti.UI.createPicker({
  top:50+'dp'
});

var data = [];
data[0]=Ti.UI.createPickerRow({title:'Condado'});
data[1]=Ti.UI.createPickerRow({title:'Recreo'});
data[2]=Ti.UI.createPickerRow({title:'CCI'});
data[3]=Ti.UI.createPickerRow({title:'Millenium plaza'});
data[4]=Ti.UI.createPickerRow({title:'Mall del Rio'});
data[5]=Ti.UI.createPickerRow({title:'Scala'});
picker.add(data);
picker.selectionIndicator = true;

winP.add(picker);
complejo.addEventListener('focus', function(e){
	winP.open();
});

picker.addEventListener('change',function(e){
	 
  complejo.setValue( data[e.rowIndex].getTitle());
  winP.hide();
});



var btnEnviar = Ti.UI.createButton({
	backgroundImage:'../../images/botonEnviar.png',
	top: 300+'dp',
	width:253+'dp', height:35+'dp'
});
win.add(nombre);
win.add(email);
win.add(complejo);
win.add(comentario);
win.add(btnEnviar);

if(android){
	actionBar = currentActivity.actionBar;
	actionBar.title='Contactos';
	// nombre.setHeight(40+'dp');
	// email.setHeight(40+'dp');
	// complejo.setHeight(40+'dp');
	// nombre.setTop(50+'dp');
	// email.setTop(90+'dp');
	// complejo.setTop(130+'dp');
	// comentario.setTop(170+'dp');
	// btnEnviar.setTop(320+'dp');
// 
	// var fondo = Ti.UI.createLabel({
		// text:'Contactanos',width:Ti.Platform.displayCaps.platformWidth, height:44+'dp', backgroundColor:'black', color:'white', top:0
	// });
	// win.add(fondo);
	//win.setTitle('Promociones');
}

btnEnviar.addEventListener('click', envia);
enviar.addEventListener('click',envia);

function envia(){
	body = 'Mensaje enviado por: '+ nombre.getValue() +' <br/>Sobre el siguiente complejo: '+complejo.getText() +' <br/> Con el siguiente comentario:<p>'+ comentario.getValue() +'</p>'
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	        // this.responseText holds the raw text return of the message (used for JSON)
	        // this.responseXML holds any returned XML (used for SOAP web services)
	        // this.responseData holds any returned binary data
	        var jsonObject = this.responseText;
	        if(jsonObject=='Mail Sent.'){
	        	alert('Comentario enviado con exito');
	        	nombre.setValue('');
				email.setValue('');
				complejo.setText('');
				comentario.setValue('');
	        }
	        else{
	        	alert('Error al enviar. Verifique que tenga conexión a internet.');
	        }
	     },
	    onerror: function(e) {
	    	 },
	    timeout:15000
	});
	xhr.open("GET", 'http://vamonosalcine.com/MulticinesAPI/enviarmail.php?to=publicidad@multicines.com.ec&email='+email.getValue()+'&body='+body);
	//xhr.setRequestHeader( 'User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1');
	xhr.send();
	
	
	// var cc = [];
	// cc[0]=email.getValue();
	// var emailDialog = Ti.UI.createEmailDialog()
	// emailDialog.subject = "Sugerencias";
	// emailDialog.toRecipients = ['publicidad@multicines.com.ec'];
	// emailDialog.messageBody = body;
	// emailDialog.ccRecipients=cc;
	// emailDialog.html=true;
	// emailDialog.open();
}
