/*global ActiveXObject, window, console, define, module, jQuery */
//jshint unused:false, strict: false

/**
 *  PDFObject v2.2.0
 *  https://github.com/pipwerks/PDFObject
 *  @license
 *  Copyright (c) 2008-2020 Philip Hutchison
 *  MIT-style license: http://pipwerks.mit-license.org/
 *  UMD module pattern from https://github.com/umdjs/umd/blob/master/templates/returnExports.js
 */

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === "object" && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.PDFObject = factory();
  }
}(this, function () {

    "use strict";
    //jshint unused:true

    //PDFObject is designed for client-side (browsers), not server-side (node)
    //Will choke on undefined navigator and window vars when run on server
    //Return boolean false and exit function when running server-side

    if( window === undefined || 
        window.navigator === undefined || 
        window.navigator.userAgent === undefined || 
        window.navigator.mimeTypes === undefined){ 
            return false;
    }

    var pdfobjectversion = "2.2.0",
    
        nav = window.navigator,
        ua = window.navigator.userAgent,

        //declare booleans
        isIE,
        supportsPdfActiveX,
        supportsPDFs,

        //Time to jump through hoops -- browser vendors do not make it easy to detect PDF support.

        //There is a coincidental correlation between implementation of window.promises and native PDF support
        isModernBrowser = (window.Promise !== undefined),

        //Older browsers still expose the mimeType
        supportsPdfMimeType = (nav.mimeTypes["application/pdf"] !== undefined),

        //Safari on iPadOS doesn't report as 'mobile' when requesting desktop site, yet still fails to embed PDFs
        isSafariIOS = ( nav.platform !== undefined && 
                        nav.platform === "MacIntel" && 
                        nav.maxTouchPoints !== undefined && 
                        nav.maxTouchPoints > 1 ),

        //Quick test for mobile devices.
        isMobileDevice = (isSafariIOS || /Mobi|Tablet|Android|iPad|iPhone/.test(ua)),

        //Safari desktop requires special handling 
        isSafariDesktop = ( !isMobileDevice && 
                            nav.vendor !== undefined && 
                            /Apple/.test(nav.vendor) && 
                            /Safari/.test(ua) ),
        
        //Firefox started shipping PDF.js in Firefox 19. If this is Firefox 19 or greater, assume PDF.js is available
        isFirefoxWithPDFJS = (!isMobileDevice && /irefox/.test(ua)) ? (parseInt(ua.split("rv:")[1].split(".")[0], 10) > 18) : false,

        //declare functions
        createAXO,
        buildFragmentString,
        embedError,
        embed,
        getTargetElement,
        generatePDFJSiframe,
        generateEmbedElement;


    /* ----------------------------------------------------
       Supporting functions
       ---------------------------------------------------- */

    createAXO = function (type){
        var ax;
        try {
            ax = new ActiveXObject(type);
        } catch (e) {
            ax = null; //ensure ax remains null
        }
        return ax;
    };

    //IE11 still uses ActiveX for Adobe Reader, but IE 11 doesn't expose
    //window.ActiveXObject the same way previous versions of IE did
    //window.ActiveXObject will evaluate to false in IE 11, but "ActiveXObject" in window evaluates to true
    //so check the first one for older IE, and the second for IE11
    //MS Edge does not support ActiveX at all, both will evaluate false
    //Constructed as a method (not a prop) to avoid unneccesarry overhead -- will only be evaluated if needed
    isIE = function (){ return !!(window.ActiveXObject || "ActiveXObject" in window); };

    //If either ActiveX support for "AcroPDF.PDF" or "PDF.PdfCtrl" are found, return true
    //Constructed as a method (not a prop) to avoid unneccesarry overhead -- will only be evaluated if needed
    supportsPdfActiveX = function (){ return !!(createAXO("AcroPDF.PDF") || createAXO("PDF.PdfCtrl")); };

    //Determines whether PDF support is available
    supportsPDFs = (
        //As of Sept 2020 no mobile browsers properly support PDF embeds
        !isMobileDevice && (
            //Modern versions of Firefox come bundled with PDFJS
            isFirefoxWithPDFJS ||
            //Browsers that still support the original MIME type check
            supportsPdfMimeType ||
            //Pity the poor souls still using IE
            (isIE() && supportsPdfActiveX())
        )
    );

    //Create a fragment identifier for using PDF Open parameters when embedding PDF
    buildFragmentString = function(pdfParams){

        var string = "",
            prop;

        if(pdfParams){

            for (prop in pdfParams) {
                if (pdfParams.hasOwnProperty(prop)) {
                    string += encodeURIComponent(prop) + "=" + encodeURIComponent(pdfParams[prop]) + "&";
                }
            }

            //The string will be empty if no PDF Params found
            if(string){

                string = "#" + string;

                //Remove last ampersand
                string = string.slice(0, string.length - 1);

            }

        }

        return string;

    };

    embedError = function (msg){
        if(!suppressConsole){
            console.log("[PDFObject] " + msg);
        }
        return false;
    };

    getTargetElement = function (targetSelector){

        //Default to body for full-browser PDF
        var targetNode = document.body;

        //If a targetSelector is specified, check to see whether
        //it's passing a selector, jQuery object, or an HTML element

        if(typeof targetSelector === "string"){

            //Is CSS selector
            targetNode = document.querySelector(targetSelector);

        } else if (jQuery !== undefined && targetSelector instanceof jQuery && targetSelector.length) {

            //Is jQuery element. Extract HTML node
            targetNode = targetSelector.get(0);

        } else if (targetSelector.nodeType !== undefined && targetSelector.nodeType === 1){

            //Is HTML element
            targetNode = targetSelector;

        }

        return targetNode;

    };

    generatePDFJSiframe = function (targetNode, url, pdfOpenFragment, PDFJS_URL, id, omitInlineStyles){

        var fullURL = PDFJS_URL + "?file=" + encodeURIComponent(url) + pdfOpenFragment;

        var div = document.createElement("div");
        var iframe = document.createElement("iframe");
        iframe.src = fullURL;
        iframe.id = id;
        iframe.className = "pdfobject";
        iframe.type = "application/pdf";
        iframe.frameborder = "0";

        if(!omitInlineStyles){
            div.style = "position: absolute; top: 0; right: 0; bottom: 0; left: 0;";
            iframe.style = "border: none; width: 100%; height: 100%;";
            targetNode.style.position = "relative";
            targetNode.style.overflow = "auto";        
        }

        div.appendChild(iframe);
        targetNode.appendChild(div);
        targetNode.classList.add("pdfobject-container");
        
        return targetNode.getElementsByTagName("iframe")[0];

    };

    generateEmbedElement = function (embedType, targetNode, targetSelector, url, pdfOpenFragment, width, height, id, omitInlineStyles){

        var embed = document.createElement(embedType);
        embed.src = url + pdfOpenFragment;
        embed.id = id;
        embed.className = "pdfobject";
        embed.type = "application/pdf";

        if(!omitInlineStyles){

            var style = (embedType === "embed") ? "overflow: auto;" : "border: none;";

            if(targetSelector && targetSelector !== document.body){
                style += "width: " + width + "; height: " + height + ";";
            } else {
                style += "position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;";
            }

            embed.style = style;

        }

        targetNode.classList.add("pdfobject-container");
        targetNode.appendChild(embed);

        return targetNode.getElementsByTagName(embedType)[0];

    };

    embed = function(url, targetSelector, options){

        //If targetSelector is not defined, convert to boolean
        var selector = targetSelector || false;

        //Ensure options object is not undefined -- enables easier error checking below
        var opt = options || {};

        //Get passed options, or set reasonable defaults
        var id = (opt.id && typeof opt.id === "string") ? "id='" + opt.id + "'" : "",
            page = opt.page || false,
            pdfOpenParams = opt.pdfOpenParams || {},
            fallbackLink = opt.fallbackLink || true,
            width = opt.width || "100%",
            height = opt.height || "100%",
            assumptionMode = (typeof opt.assumptionMode === "boolean") ? opt.assumptionMode : true,
            forcePDFJS = (typeof opt.forcePDFJS === "boolean") ? opt.forcePDFJS : false,
            supportRedirect = (typeof opt.supportRedirect === "boolean") ? opt.supportRedirect : false,
            omitInlineStyles = (typeof opt.omitInlineStyles === "boolean") ? opt.omitInlineStyles : false,
            suppressConsole = (typeof opt.suppressConsole === "boolean") ? opt.suppressConsole : false,
            PDFJS_URL = opt.PDFJS_URL || false,
            targetNode = getTargetElement(selector),
            fallbackHTML = "",
            pdfOpenFragment = "",
            fallbackHTML_default = "<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href='[url]'>Download PDF</a></p>";

        //Ensure URL is available. If not, exit now.
        if(typeof url !== "string"){ return embedError("URL is not valid", suppressConsole); }

        //If target element is specified but is not valid, exit without doing anything
        if(!targetNode){ return embedError("Target element cannot be determined", suppressConsole); }

        //page option overrides pdfOpenParams, if found
        if(page){ pdfOpenParams.page = page; }

        //Stringify optional Adobe params for opening document (as fragment identifier)
        pdfOpenFragment = buildFragmentString(pdfOpenParams);

        //Do the dance

        //If the forcePDFJS option is invoked, skip everything else and embed as directed
        if(forcePDFJS && PDFJS_URL){

            return generatePDFJSiframe(targetNode, url, pdfOpenFragment, PDFJS_URL, id, omitInlineStyles);

        //If traditional support is provided, or if this is a modern browser and not a mobile device
        } else if(supportsPDFs || (assumptionMode && isModernBrowser && !isMobileDevice)){

            // Safari will not honour redirect responses on embed src.
            if (supportRedirect && isSafariDesktop) {
                return generateEmbedElement("iframe", targetNode, targetSelector, url, pdfOpenFragment, width, height, id, omitInlineStyles);
            }

            return generateEmbedElement("embed", targetNode, targetSelector, url, pdfOpenFragment, width, height, id, omitInlineStyles);

        //If everything else has failed and a PDFJS fallback is provided, try to use it
        } else if(PDFJS_URL){

            return generatePDFJSiframe(targetNode, url, pdfOpenFragment, PDFJS_URL, id, omitInlineStyles);

        } else {

            //Display the fallback link if available
            if(fallbackLink){

                fallbackHTML = (typeof fallbackLink === "string") ? fallbackLink : fallbackHTML_default;
                targetNode.innerHTML = fallbackHTML.replace(/\[url\]/g, url);

            }

            return embedError("This browser does not support embedded PDFs", suppressConsole);

        }

    };

    return {
        embed: function (a,b,c){ return embed(a,b,c); },
        pdfobjectversion: (function () { return pdfobjectversion; })(),
        supportsPDFs: (function (){ return supportsPDFs; })()
    };

}));
