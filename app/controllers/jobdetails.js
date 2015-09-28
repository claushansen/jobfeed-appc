var args = arguments[0] || {};
$.jobheadline.text = args.Headline;
function onClickWebBtn(e){
	Titanium.Platform.openURL(args.DetailsUrl);
}

//$.gotobtn.title = args.Location.Longitude || 'test';
if(args.DetailsUrl == null){
$.gotobtn.visible = false;
}
var Map = require('ti.map');
//var lat = OS_ANDROID ? _args.latitude+0.75 : _args.latitude;
if(args.Location == null){
	$.mapview.visible = false;

}else{
	var lat = args.Location.Latitude;
var lot = args.Location.Longitude;
	$.mapview.setRegion({
		latitude: lat || 30.631256,
		longitude: lot || -97.675422,
		latitudeDelta:2,
		longitudeDelta:2,
		zoom:10,
		tilt:45
	});
	
	var jobAnnotation = Map.createAnnotation({
    latitude:lat,
    longitude:lot,
    title:"Her ligger jobbet",
    subtitle:'Mountain View, CA',
    pincolor:Map.ANNOTATION_RED,
    myid:1 // Custom property to uniquely identify this annotation.
});
	$.mapview.addAnnotation(jobAnnotation);
}

	
//$.jobdetails.open();
