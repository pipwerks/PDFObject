/*global jQuery, $, Prism */
//jshint unused:false, strict: false

/*
    Copyright (c) 2008-2021 Philip Hutchison
    MIT-style license: http://pipwerks.mit-license.org/
*/

$(function (){


var generateMarkup = function (){

    var form = document.querySelector("#pdfCodeGeneratorForm");

    //Get form values
    var embedtype = (form.embedtype.value !== "") ? form.embedtype.value : false;
    var targetElement = (form.targetElement.value !== "") ? form.targetElement.value : false;
    var pdfURL = (form.pdfURL.value !== "") ? form.pdfURL.value : false;
    //var pdfWidth = (form.pdfWidth.value !== "") ? form.pdfWidth.value : false;
    //var pdfHeight = (form.pdfHeight.value !== "") ? form.pdfHeight.value : false;
    var scrollbar = (form.scrollbar.value !== "") ? form.scrollbar.value : false; //1, 0, or ""
    var toolbar = (form.toolbar.value !== "") ? form.toolbar.value : false; //1, 0, or ""
    var statusbar = (form.statusbar.value !== "") ? form.statusbar.value : false; //1, 0, or ""
    var messages = (form.messages.value !== "") ? form.messages.value : false; //1, 0, or ""
    var navpanes = (form.navpanes.value !== "") ? form.navpanes.value : false; //1, 0, or ""
    var pagemode = (form.pagemode.value !== "") ? form.pagemode.value : false; //"", "none", "bookmarks", or "thumbs"
    var nameddest = (form.nameddest.value !== "") ? form.nameddest.value : false; //String
    var page = (form.page.value !== "") ? form.page.value : false; //number only
    var zoom_percent = (form.zoom_percent.value !== "") ? form.zoom_percent.value : false;
    var zoom_x = (form.zoom_x.value !== "") ? form.zoom_x.value : false;
    var zoom_y = (form.zoom_y.value !== "") ? form.zoom_y.value : false;
    var view = (form.view.value !== "") ? form.view.value : false; //string: "", "Fit", "FitH", "FitV", "FitB", "FitBH", "FitBV"
    var view_offset = (form.view_offset.value !== "") ? form.view_offset.value : false;
    var viewrect_w = (form.viewrect_w.value !== "") ? form.viewrect_w.value : false;
    var viewrect_h = (form.viewrect_h.value !== "") ? form.viewrect_h.value : false;
    var viewrect_x = (form.viewrect_x.value !== "") ? form.viewrect_x.value : false;
    var viewrect_y = (form.viewrect_y.value !== "") ? form.viewrect_y.value : false;
    var fdf = (form.fdf.value !== "") ? form.fdf.value : false; //string
    var comment = (form.comment.value !== "") ? form.comment.value : false; //string
    var highlight_w = (form.highlight_w.value !== "") ? form.highlight_w.value : false;
    var highlight_h = (form.highlight_h.value !== "") ? form.highlight_h.value : false;
    var highlight_x = (form.highlight_x.value !== "") ? form.highlight_x.value : false;
    var highlight_y = (form.highlight_y.value !== "") ? form.highlight_y.value : false;
    var search = (form.search.value !== "") ? form.search.value : false; //string
    var pdfAltContent = (form.pdfAltContent.value !== "") ? form.pdfAltContent.value.replace(/</g, "&lt;").replace(/'/g, "\\'") : "";
    var defaultFallback = '&lt;p>This browser does not support inline PDFs. Please download the PDF to view it: &lt;a href="[url]">Download PDF&lt;/a>&lt;/p>';
    var fallbackUsesDefault = (defaultFallback === pdfAltContent);

    var isForJavaScript = (embedtype === "javascript");

    //PDF Open Parameters
    var pdfparams_arr = [];
    var pdfOpenParamsString = "";
    var pdfOpenParamsString_separator = (isForJavaScript) ? ", " : "&";
    var zoom = ""; //comprised of percent, x, and y

    var markup = "";
    var options = "";

    /* === PDF Open params ===============================

       PDF open params are listed here in the same order
       as the Adobe PDF documentation.  Parameters need
       to be strung in a particular order for certain
       functionality to work.

     ===================================================== */

    /*  Required sequence:

        nameddest
        page
        comment
        zoom
        view
        viewrect
        pagemode
        scrollbar
        search
        toolbar
        statusbar
        messages
        navpanes
        highlight
        fdf

    */

    var createObjectString = function (key, value){
        return key + ": " + "'" + value + "'";
    };

    var createUrlString = function (key, value){
        return key + "=" + value;
    };

    var createParamString = function (key, value){
        return (isForJavaScript) ? createObjectString(key, value) : createUrlString(key, value);
    };

    // --- nameddest -------------------------------------
    if(nameddest){
        pdfparams_arr[pdfparams_arr.length] = createParamString("nameddest", nameddest);
    }

    // --- page -------------------------------------------
    if(page){
        pdfparams_arr[pdfparams_arr.length] = createParamString("page", page);
    }

    // --- comment ----------------------------------------
    if(comment){
        pdfparams_arr[pdfparams_arr.length] = createParamString("comment", comment);
    }

    // --- zoom -------------------------------------------
    if($.isNumeric(zoom_percent) && zoom_percent > 0){

        zoom = zoom_percent;

        if($.isNumeric(zoom_x) && $.isNumeric(zoom_y)){
            zoom += "," + zoom_x + "," + zoom_y;
        }

        pdfparams_arr[pdfparams_arr.length] = createParamString("zoom", zoom);

    }

    // --- view --------------------------------------------
    if(view) {

        if($.isNumeric(view_offset)){
            view += "," + view_offset;
        }

        pdfparams_arr[pdfparams_arr.length] = createParamString("view", view);

    }

    // --- viewrect ----------------------------------------
    if( $.isNumeric(viewrect_w) && $.isNumeric(viewrect_h) && $.isNumeric(viewrect_x) && $.isNumeric(viewrect_y)){
        pdfparams_arr[pdfparams_arr.length] = createParamString("viewrect", viewrect_x + "," + viewrect_y + "," + viewrect_w + "," + viewrect_h);
    }

    // --- pagemode -----------------------------------------
    if(pagemode){
        pdfparams_arr[pdfparams_arr.length] = createParamString("pagemode", pagemode);
    }

    // --- scrollbars ---------------------------------------
    if($.isNumeric(scrollbar)){
        pdfparams_arr[pdfparams_arr.length] = createParamString("scrollbar", scrollbar);
    }

    // --- search --------------------------------------------
    if(search){
        if(!isForJavaScript){ search = encodeURIComponent(search); }
        pdfparams_arr[pdfparams_arr.length] = createParamString("search", search);
    }

    // --- toolbar -------------------------------------------
    if($.isNumeric( toolbar)) {
        pdfparams_arr[pdfparams_arr.length] = createParamString("toolbar", toolbar);
    }

    // --- statusbar ------------------------------------------
    if($.isNumeric( statusbar)) {
        pdfparams_arr[pdfparams_arr.length] = createParamString("statusbar", statusbar);
    }

    // --- messages -------------------------------------------
    if($.isNumeric( messages)) {
        pdfparams_arr[pdfparams_arr.length] = createParamString("messages", messages);
    }

    // --- navpanes -------------------------------------------
    if($.isNumeric( navpanes)) {
        pdfparams_arr[pdfparams_arr.length] = createParamString("navpanes", navpanes);
    }

    // --- Handle highlight -----------------------------------
    if( $.isNumeric(highlight_w) &&
        $.isNumeric(highlight_h) &&
        $.isNumeric(highlight_x) &&
        $.isNumeric(highlight_y)){

        pdfparams_arr[pdfparams_arr.length] = createParamString("highlight", highlight_x + "," + highlight_y + "," + highlight_w + "," + highlight_h);

    }

    // --- misc ------------------------------------------
    if(fdf) {
        pdfparams_arr[pdfparams_arr.length] = createParamString("fdf", fdf);
    }

    // --- Handle alternate content HTML -----------------------
    //If this is for static markup, replace [url] with actual URL
    if(!isForJavaScript && pdfAltContent) {
        pdfAltContent = pdfAltContent.replace(/\[url\]/g, pdfURL);
    }

    // --- Build querystring for PDF Open params ---------------
    for (var i=0; i < pdfparams_arr.length; i++) {
        pdfOpenParamsString += pdfparams_arr[i];
        if(i !== (pdfparams_arr.length - 1)){
            pdfOpenParamsString += pdfOpenParamsString_separator;
        }
    }


    if(isForJavaScript) {

        if(pdfparams_arr.length || !fallbackUsesDefault){

            options = "var options = {\n";

            if(pdfparams_arr.length){

                options += "   pdfOpenParams: { " + pdfOpenParamsString + " }"

                if(!fallbackUsesDefault){ options += ","; }

                options += "\n";

            }

            if(!fallbackUsesDefault){
                options += "   fallbackLink: '" + pdfAltContent + "'\n";
            }

            options += "};\n\n";

        }

        markup = "&lt;!-- insert just before the closing body tag &lt;/body&gt; --&gt;\n";
        markup += "&lt;script src='/path-to-your-javascript-file/pdfobject.js'&gt;&lt;/script&gt;\n";
        markup += "&lt;script&gt;\n";

        if(!targetElement && !pdfparams_arr.length && fallbackUsesDefault){

            markup += "PDFObject.embed(\"" + pdfURL + "\");\n";

        } else {

            if(targetElement){

                targetElement = "\"" + targetElement + "\"";
                markup += "//Be sure your document contains an element with the CSS selector " + targetElement +"\n";

                if(!pdfparams_arr.length && fallbackUsesDefault){
                    markup += "PDFObject.embed(\"" + pdfURL + "\", " + targetElement + ");\n";
                } else {
                    markup += options;
                    markup += "PDFObject.embed(\"" + pdfURL + "\", " + targetElement + ", options);\n";
                }

            } else {

                markup += options;
                markup += "PDFObject.embed(\"" + pdfURL + "\", false, options);\n";

            }

        }

        markup += "&lt;/script&gt;";

    } else {  // if is for standard markup not JS

        // --- Create markup string ---------------------------------

        //Ensure the PDF Params string begins with a hash #
        if(pdfparams_arr.length){
            pdfOpenParamsString = "#" + pdfOpenParamsString;
        }

        markup = "&lt;!-- insert in the document body --&gt;\n" +
                  "&lt;object data='" + pdfURL + pdfOpenParamsString + "' \n" +
                  "        type='application/pdf' \n" +
                  "        width='100%' \n" +
                  "        height='100%'&gt;\n" +
                  pdfAltContent + "\n" +
                  "&lt;/object&gt;";

    }

    return "<h3>Your custom code:</h3><pre><code class='language-html'>" + markup + "</code></pre>";

};



//Improve UI by hiding PDF Parameters options unless
//user specifies they wan to use them.

var addOptionsButton = function () {

    var showtxt = 'Customize PDF Open Parameters';
    var hidetxt = 'Hide PDF Open options';
    var $pdfopenoptions = $("#pdfopenoptions");
    var $div = $("<div>").attr("id", "toggleButton");

    var $btn = $("<input type='button' />")
                .addClass("pure-button")
                .val(showtxt)
                .on("click", function (e) {
                    e.preventDefault();
                    $pdfopenoptions.toggle();
                    var $b = $(this);
                    if ($b.val() === showtxt) {
                        $b.val(hidetxt).addClass('hide');
                    } else {
                        $b.val(showtxt).removeClass('hide');
                    }
                    return false;
                }).appendTo($div);

    $div.insertBefore($pdfopenoptions);
    $pdfopenoptions.hide();

};


//Is the user trying to get markup or JS?

var setModeOptions = function (mode) {
    var $targetEl = $("#targetElement");
    var $parent = $targetEl.parent(".form-element-wrapper");
    if (mode === "javascript") {
        $targetEl.prop("disabled", false);
        $parent.show();
    } else if (mode === "markup") {
        $targetEl.prop("disabled", "disabled");
        $parent.hide();
    }
};

var $embedtype = $("#embedtype");

$embedtype.on("change", function (e) {
    setModeOptions(this.value);
});


//Some PDF Open Parameters conflict with one another.
//Ensure the form does not allow users to enter conflicting settings.
$("[data-has-relationship='true']").on("change", function (e) {

    var element = this;
    var form = document.querySelector("#pdfCodeGeneratorForm");
    var bool = false;

    switch (element.id) {

        case "toolbar":
            bool = (element.value !== "" && parseInt(element.value, 10) === 0);
            form.pagemode.disabled = bool;
            break;

        case "page":
            bool = (element.value !== "");
            form.nameddest.disabled = bool;
            break;

        case "nameddest":
            bool = (element.value !== "");
            form.page.disabled = bool;
            break;

        case "zoom_percent":
        case "zoom_x":
        case "zoom_y":
            bool = (form.zoom_percent.value !== "" || form.zoom_x.value !== "" || form.zoom_y.value !== "");
            form.view.disabled = bool;
            form.view_offset.disabled = bool;
            form.viewrect_w.disabled = bool;
            form.viewrect_h.disabled = bool;
            form.viewrect_x.disabled = bool;
            form.viewrect_y.disabled = bool;
            break;

        case "view":
            bool = (element.value !== "");
            form.zoom_percent.disabled = bool;
            form.zoom_x.disabled = bool;
            form.zoom_y.disabled = bool;
            form.viewrect_w.disabled = bool;
            form.viewrect_h.disabled = bool;
            form.viewrect_x.disabled = bool;
            form.viewrect_y.disabled = bool;
            break;

        case "viewrect_w":
        case "viewrect_h":
        case "viewrect_x":
        case "viewrect_y":
            bool = (form.viewrect_w.value !== "" || form.viewrect_h.value !== "" || form.viewrect_x.value !== "" || form.viewrect_y.value !== "");
            form.view.disabled = bool;
            form.view_offset.disabled = bool;
            form.zoom_percent.disabled = bool;
            form.zoom_x.disabled = bool;
            form.zoom_y.disabled = bool;
            break;

    }

});


//Generate the code!
$("#pdfCodeGeneratorForm").on("submit", function (e) {
    e.preventDefault();
    $("#generatedCode").html(generateMarkup());
    Prism.highlightAll();
    $('html, body').animate({
        scrollTop: $("#generatedCode").offset().top
    }, 500);
});


//Initialize the form
addOptionsButton();
setModeOptions($embedtype.val());

});
