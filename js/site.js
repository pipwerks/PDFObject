/*global PDFObject, inView, SmoothScroll */
"use strict";

(function (){

//Inform the visitor whether their browser supports PDF embedding
document.querySelector(".pdf-support").innerHTML = (PDFObject.supportsPDFs) ? "supports" : "does not support";
document.querySelector(".qualitative-statement").innerHTML = (PDFObject.supportsPDFs) ? "You lucky dog, you!" : "Sad pandas.";

//auto-append deep links to section headings
//Polyfill for older browsers: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1); 
        return null;
    };
}

var h2s = document.querySelectorAll("section h2");
h2s.forEach(function (i){
    var id = i.closest("section").id;
    i.innerHTML = "<a class='deep-link' href='#" + id + "'>#</a> " + i.innerHTML;
});

var mindTheGap = function (el){
    if(el.id){
        var selector = "#" + el.id;
        inView(selector)
            .on('enter', function(){
                //<a href="#changelog">
                var link = document.querySelector("a[href='" + selector + "']");
                if(link){
                    link.classList.add('active');
                }
            })
            .on('exit',function (){
                //<a href="#changelog">
                var link = document.querySelector("a[href='" + selector + "']");
                if(link){
                    link.classList.remove('active');
                }
            });
    }
};

//Highlight nav links as page is scrolled
var deep_links = document.querySelectorAll("section");
deep_links.forEach(mindTheGap);

//Smooth scroll when visitor clicks anchor links
new SmoothScroll('a[href*="#"]');

})();
