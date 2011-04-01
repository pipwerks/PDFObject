/* 
	PDFObject, copyright (C) 2008 Philip Hutchison (pipwerks.com)
	Documentation and examples are at www.pdfobject.com 
	Version 1.2, April 2011
	MIT style license
*/

/*global ActiveXObject, window */


var PDFObject = function (obj){
	
	if(!obj || !obj.url){ return false; }

	var pdfobjectversion = "1.2",
		//Set reasonable defaults
		id = obj.id || false,
		width = obj.width || "100%",
		height = obj.height || "100%",
		pdfOpenParams = obj.pdfOpenParams,
		url,
		pluginTypeFound;
	

	/* ----------------------------------------------------
	   Supporting functions
	   ---------------------------------------------------- */

	//Tests specifically for Adobe Reader (aka Acrobat) in Internet Explorer
	var hasReaderActiveX = function (){

		var axObj = null;
		
		if (window.ActiveXObject) {
			
			axObj = new ActiveXObject("AcroPDF.PDF");
				
			//If "AcroPDF.PDF" didn't work, try "PDF.PdfCtrl"
			if(!axObj){
				axObj = new ActiveXObject("PDF.PdfCtrl");
			}
			
			//If either "AcroPDF.PDF" or "PDF.PdfCtrl" are found, return true
			if (axObj !== null) {
				return true;
			}
	
		}
		
		//If you got to this point, there's no ActiveXObject for PDFs
		return false;
		
	};



	//Tests specifically for Adobe Reader (aka Adobe Acrobat) in non-IE browsers
	var hasReader = function (){
	
		var i,
			n = navigator.plugins,
			count = n.length,
			regx = /Adobe Reader|Adobe PDF|Acrobat/gi;
		
		for(i=0; i<count; i++){
			if(regx.test(n[i].name)){
				return true;
			}
		}
		
		return false;
	
	};


	//Detects unbranded PDF support
	var hasGeneric = function (){
		var plugin = navigator.mimeTypes["application/pdf"];
		return (plugin && plugin.enabledPlugin);
	};
	

	//Determines what kind of PDF support is available: Adobe or generic
	var pluginFound = function (){
	
		var type = null;
		
		if(hasReader() || hasReaderActiveX()){
			
			type = "Adobe";
		
		} else if(hasGeneric()) {
		
			type = "generic";
		
		}
		
		return type;
	
	};


	//If setting PDF to fill page, need to handle some CSS first
	var setCssForFullWindowPdf = function (){
		
		var html = document.getElementsByTagName("html");
		if(!html){ return false; }
		
		var html_style = html[0].style,
			body_style = document.body.style;
		
		html_style.height = "100%";
		html_style.overflow = "hidden";	
		body_style.margin = "0";
		body_style.padding = "0";
		body_style.height = "100%";
		body_style.overflow = "hidden";
		
	};


	//Creating a querystring for using PDF Open parameters when embedding PDF
	var buildQueryString = function(pdfParams){
		
		var string = "",
			prop;
		
		if(!pdfParams){ return string; }
		
		for (prop in pdfParams) {
			
			if (pdfParams.hasOwnProperty(prop)) {
				
				string += prop + "=";
				
				if(prop === "search") {
					
					string += encodeURI(pdfParams[prop]);
				
				} else {
					
					string += pdfParams[prop];
					
				}	
				
				string += "&";
				
			}
			
		}
		
		//Remove last ampersand
		return string.slice(0, string.length - 1);
	
	};


	//Simple function for returning values from PDFObject
	var get = function(prop){

		var value = null;

		switch(prop){
			case "url" : value = url; break;
			case "id" : value = id; break;
			case "width" : value = width; break;
			case "height" : value = height; break;
			case "pdfOpenParams" : value = pdfOpenParams; break;
			case "pluginTypeFound" : value = pluginTypeFound; break;
			case "pdfobjectversion" : value = pdfobjectversion; break;
		}

		return value;

	};


	/* ----------------------------------------------------
	   PDF Embedding functions
	   ---------------------------------------------------- */

	
	var embed = function(targetID){

		if(!pluginTypeFound){ return false; }

		var targetNode = null;

		if(targetID){

			//Allow users to pass an element OR an element's ID
			targetNode = (targetID.nodeType && targetID.nodeType === 1) ? targetID : document.getElementById(targetID);
			
			//Ensure target element is found in document before continuing
			if(!targetNode){ return false; }

		} else {

			targetNode = document.body; 
			setCssForFullWindowPdf();
			width = "100%";
			height = "100%";

		}

		targetNode.innerHTML = '<object	data="' +url +'" type="application/pdf" width="' +width +'" height="' +height +'"></object>';

		return targetNode.getElementsByTagName("object")[0];

	};

	//The hash (#) prevents odd behavior in Windows
	//Append optional Adobe params for opening document
	url = encodeURI(obj.url) + "#" + buildQueryString(pdfOpenParams);
	pluginTypeFound = pluginFound();
	
	this.get = function(prop){ return get(prop); };
	this.embed = function(id){ return embed(id); };
	
	return this;
	
};