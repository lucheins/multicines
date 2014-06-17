function ApplicationTabGroup(Window,Flurry) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	//create app tabs
	var win1 = new Window(L('home')),
		win2 = new Window(L('settings'));
	
	var winCartelera = Titanium.UI.createWindow({
		url:'ui/common/Cartelera.js',
		barColor:'#000',
		backgroundColor:'black',
		Flurry:Flurry,
		exitOnClose:false,
		navBarHidden: false
	});
	var tab1 = Ti.UI.createTab({
		title: L('cartelera'),
		icon: '/images/cartelera.png',
		window: winCartelera
	});
	win1.containingTab = tab1;
	
	var winPromociones = Titanium.UI.createWindow({
		url:'ui/common/Promociones.js',
		//barImage :'images/header.png',
		barColor:'#000',
		backgroundColor:'white',
		title:L('promociones'),
		Flurry:Flurry
	});
	var tab2 = Ti.UI.createTab({
		title: L('promociones'),
		icon: '/images/promociones.png',
		window: winPromociones
	});
	win2.containingTab = tab2;
	
	var winContactanos = Titanium.UI.createWindow({
		url:'ui/common/Contactanos.js',
		//barImage :'images/header.png',
		barColor:'#000',
		backgroundColor:'white',
		title:L('contactos'),
		Flurry:Flurry
	});
	var tab3 = Ti.UI.createTab({
		title: L('contactos'),
		icon: '/images/contactanos.png',
		window: winContactanos
	});
	win2.containingTab = tab3;
	
	var tab4 = Ti.UI.createTab({
		title: L('facebook'),
		icon: '/images/facebook.png',
		window: win2
	});
	win2.containingTab = tab4;
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	//self.addTab(tab4);
	tab1.addEventListener('focus',function(e){
		Flurry.logEvent('Menu',{menu:'Cartelera'});
	});
	tab2.addEventListener('focus',function(e){
		Flurry.logEvent('Menu',{menu:'Promociones'});
	});
	tab3.addEventListener('focus',function(e){
		Flurry.logEvent('Menu',{menu:'Contactos'});
	});
	return self;
};

module.exports = ApplicationTabGroup;
