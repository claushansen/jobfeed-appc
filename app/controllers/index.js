function onItemClick(e) {
    var item = $.joblist.items[e.itemIndex];
    
/*    var myModal = Ti.UI.createWindow({});
	
	var wrapperView    = Ti.UI.createView(); // Full screen
var backgroundView = Ti.UI.createView({  // Also full screen
    backgroundColor : '#000',
    opacity         : 0.5
});
var containerView  = Ti.UI.createView({  // Set height appropriately
    height          : 300,
    backgroundColor : '#FFF'
});
var someLabel      = Ti.UI.createLabel({
    title : 'Here is your modal',
    top   : 40,
    text: 'buoo',
    color:'#000'
});
var closeButton    = Ti.UI.createButton({
    title  : 'Close',
    bottom : 40
});
closeButton.addEventListener('click', function () {
    myModal.close();
});
	
containerView.add(someLabel);
containerView.add(closeButton);

wrapperView.add(backgroundView);
wrapperView.add(containerView);

myModal.add(wrapperView);	
	
	myModal.open({
		//modal:true,
		class:"container",
		title:'Job Details'
		}); 
    
 */  
    
    var detailsview = Alloy.createController('jobdetails',item.properties.job).getView();
    detailsview.open({modal:true});    
    //alert(item.properties.job.Location);
}
//preprocess function for getting data ready to inserting in listview
function preprocess(dataobj){
	tmp = {
		properties: {
			job: dataobj,
		},
		Headline:{text: dataobj.Headline},
		DiscoAmsName: {text: dataobj.DiscoAmsName},
		Body: {text: dataobj.Body},
		PostingCreated: {text: dataobj.PostingCreated},
		Details: {text: "Indrykket d. "+ dataobj.PostingCreated + " Arbejdsted: "+ dataobj.WorkLocation }
		};
	return tmp;
}


function getLatestJobs(){
//setting up url for jobnetfeed
var url="https://job.jobnet.dk/FindJobService/V1/Gateway.ashx/annonce?region=1084&start=1&antal=10&sortering=publicering&format=json&_=1443264545310";

//Declaring a variable for storing our json object
var json;

//creating httpclient
var xhr=Ti.Network.createHTTPClient({
onload:function(){
//parse the retrieved data,turning it in to a JavaScript object
json = JSON.parse(this.responseText);
//alert("Antal jobs: "+json.JobPostingDigests.length);

//array for storing our listview data after it is preprocessed
var jobdata = [];

//looping trough the data from the jobnet feed and run the preprocess function to get our data in right format
for(i=0;json.JobPostingDigests.length > i;i++){
	//pushing the preprocessed data to jobdata array
	jobdata.push(preprocess(json.JobPostingDigests[i]));
}
//Assigning our data to our listview
$.joblist.setItems(jobdata);
},
onerror : function(e) {
         Ti.API.debug(e.error);
         alert('error');
     }
});

//opens the connection
xhr.open('GET',url);

//sending request with our connection
xhr.send();
}
getLatestJobs();
$.index.open();
