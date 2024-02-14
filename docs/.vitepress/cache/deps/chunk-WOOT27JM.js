import {
  __commonJS
} from "./chunk-LQ2VYIYD.js";

// node_modules/pdfobject/pdfobject.js
var require_pdfobject = __commonJS({
  "node_modules/pdfobject/pdfobject.js"(exports, module) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define([], factory);
      } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
      } else {
        root.PDFObject = factory();
      }
    })(exports, function() {
      "use strict";
      if (typeof window === "undefined" || window.navigator === void 0 || window.navigator.userAgent === void 0 || window.navigator.mimeTypes === void 0) {
        return false;
      }
      let pdfobjectversion = "2.2.12";
      let nav = window.navigator;
      let ua = window.navigator.userAgent;
      let isIE = "ActiveXObject" in window;
      let isModernBrowser = window.Promise !== void 0;
      let supportsPdfMimeType = nav.mimeTypes["application/pdf"] !== void 0;
      let isSafariIOSDesktopMode = nav.platform !== void 0 && nav.platform === "MacIntel" && nav.maxTouchPoints !== void 0 && nav.maxTouchPoints > 1;
      let isMobileDevice = isSafariIOSDesktopMode || /Mobi|Tablet|Android|iPad|iPhone/.test(ua);
      let isSafariDesktop = !isMobileDevice && nav.vendor !== void 0 && /Apple/.test(nav.vendor) && /Safari/.test(ua);
      let isFirefoxWithPDFJS = !isMobileDevice && /irefox/.test(ua) && ua.split("rv:").length > 1 ? parseInt(ua.split("rv:")[1].split(".")[0], 10) > 18 : false;
      let createAXO = function(type) {
        var ax;
        try {
          ax = new ActiveXObject(type);
        } catch (e) {
          ax = null;
        }
        return ax;
      };
      let supportsPdfActiveX = function() {
        return !!(createAXO("AcroPDF.PDF") || createAXO("PDF.PdfCtrl"));
      };
      let supportsPDFs = (
        //As of Sept 2020 no mobile browsers properly support PDF embeds
        !isMobileDevice && //We're moving into the age of MIME-less browsers. They mostly all support PDF rendering without plugins.
        (isModernBrowser || //Modern versions of Firefox come bundled with PDFJS
        isFirefoxWithPDFJS || //Browsers that still support the original MIME type check
        supportsPdfMimeType || //Pity the poor souls still using IE
        isIE && supportsPdfActiveX())
      );
      let buildURLFragmentString = function(pdfParams) {
        let string = "";
        let prop;
        if (pdfParams) {
          for (prop in pdfParams) {
            if (pdfParams.hasOwnProperty(prop)) {
              string += encodeURIComponent(prop) + "=" + encodeURIComponent(pdfParams[prop]) + "&";
            }
          }
          if (string) {
            string = "#" + string;
            string = string.slice(0, string.length - 1);
          }
        }
        return string;
      };
      let embedError = function(msg, suppressConsole) {
        if (!suppressConsole) {
          console.log("[PDFObject] " + msg);
        }
        return false;
      };
      let emptyNodeContents = function(node) {
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
      };
      let getTargetElement = function(targetSelector) {
        let targetNode = document.body;
        if (typeof targetSelector === "string") {
          targetNode = document.querySelector(targetSelector);
        } else if (window.jQuery !== void 0 && targetSelector instanceof jQuery && targetSelector.length) {
          targetNode = targetSelector.get(0);
        } else if (targetSelector.nodeType !== void 0 && targetSelector.nodeType === 1) {
          targetNode = targetSelector;
        }
        return targetNode;
      };
      let generatePDFObjectMarkup = function(embedType, targetNode, url, pdfOpenFragment, width, height, id, title, omitInlineStyles, customAttribute, PDFJS_URL) {
        emptyNodeContents(targetNode);
        let source = url;
        if (embedType === "pdfjs") {
          let connector = PDFJS_URL.indexOf("?") !== -1 ? "&" : "?";
          source = PDFJS_URL + connector + "file=" + encodeURIComponent(url) + pdfOpenFragment;
        } else {
          source += pdfOpenFragment;
        }
        let el_type = embedType === "pdfjs" || embedType === "iframe" ? "iframe" : "embed";
        let el = document.createElement(el_type);
        el.className = "pdfobject";
        el.type = "application/pdf";
        el.title = title;
        el.src = source;
        if (id) {
          el.id = id;
        }
        if (el_type === "iframe") {
          el.allow = "fullscreen";
          el.frameborder = "0";
        }
        if (!omitInlineStyles) {
          let style = el_type === "embed" ? "overflow: auto;" : "border: none;";
          if (targetNode !== document.body) {
            style += "width: " + width + "; height: " + height + ";";
          } else {
            style += "position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;";
          }
          el.style.cssText = style;
        }
        let reservedTokens = ["className", "type", "title", "src", "style", "id", "allow", "frameborder"];
        if (customAttribute && customAttribute.key && reservedTokens.indexOf(customAttribute.key) === -1) {
          el.setAttribute(customAttribute.key, typeof customAttribute.value !== "undefined" ? customAttribute.value : "");
        }
        targetNode.classList.add("pdfobject-container");
        targetNode.appendChild(el);
        return targetNode.getElementsByTagName(el_type)[0];
      };
      let embed = function(url, targetSelector, options) {
        let selector = targetSelector || false;
        let opt = options || {};
        let id = typeof opt.id === "string" ? opt.id : "";
        let page = opt.page || false;
        let pdfOpenParams = opt.pdfOpenParams || {};
        let fallbackLink = typeof opt.fallbackLink === "string" || typeof opt.fallbackLink === "boolean" ? opt.fallbackLink : true;
        let width = opt.width || "100%";
        let height = opt.height || "100%";
        let title = opt.title || "Embedded PDF";
        let assumptionMode = typeof opt.assumptionMode === "boolean" ? opt.assumptionMode : true;
        let forcePDFJS = typeof opt.forcePDFJS === "boolean" ? opt.forcePDFJS : false;
        let supportRedirect = typeof opt.supportRedirect === "boolean" ? opt.supportRedirect : false;
        let omitInlineStyles = typeof opt.omitInlineStyles === "boolean" ? opt.omitInlineStyles : false;
        let suppressConsole = typeof opt.suppressConsole === "boolean" ? opt.suppressConsole : false;
        let forceIframe = typeof opt.forceIframe === "boolean" ? opt.forceIframe : false;
        let PDFJS_URL = opt.PDFJS_URL || false;
        let targetNode = getTargetElement(selector);
        let fallbackHTML = "";
        let pdfOpenFragment = "";
        let customAttribute = opt.customAttribute || {};
        let fallbackHTML_default = "<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href='[url]'>Download PDF</a></p>";
        if (typeof url !== "string") {
          return embedError("URL is not valid", suppressConsole);
        }
        if (!targetNode) {
          return embedError("Target element cannot be determined", suppressConsole);
        }
        if (page) {
          pdfOpenParams.page = page;
        }
        pdfOpenFragment = buildURLFragmentString(pdfOpenParams);
        if (forcePDFJS && PDFJS_URL) {
          return generatePDFObjectMarkup("pdfjs", targetNode, url, pdfOpenFragment, width, height, id, title, omitInlineStyles, customAttribute, PDFJS_URL);
        }
        if (supportsPDFs || assumptionMode && !isMobileDevice) {
          let embedtype = forceIframe || supportRedirect || isSafariDesktop ? "iframe" : "embed";
          return generatePDFObjectMarkup(embedtype, targetNode, url, pdfOpenFragment, width, height, id, title, omitInlineStyles, customAttribute);
        }
        if (PDFJS_URL) {
          return generatePDFObjectMarkup("pdfjs", targetNode, url, pdfOpenFragment, width, height, id, title, omitInlineStyles, customAttribute, PDFJS_URL);
        }
        if (fallbackLink) {
          fallbackHTML = typeof fallbackLink === "string" ? fallbackLink : fallbackHTML_default;
          targetNode.innerHTML = fallbackHTML.replace(/\[url\]/g, url);
        }
        return embedError("This browser does not support embedded PDFs", suppressConsole);
      };
      return {
        embed: function(a, b, c) {
          return embed(a, b, c);
        },
        pdfobjectversion: /* @__PURE__ */ function() {
          return pdfobjectversion;
        }(),
        supportsPDFs: /* @__PURE__ */ function() {
          return supportsPDFs;
        }()
      };
    });
  }
});

export {
  require_pdfobject
};
/*! Bundled license information:

pdfobject/pdfobject.js:
  (**
   *  PDFObject v2.2.12
   *  https://github.com/pipwerks/PDFObject
   *  @license
   *  Copyright (c) 2008-2023 Philip Hutchison
   *  MIT-style license: http://pipwerks.mit-license.org/
   *  UMD module pattern from https://github.com/umdjs/umd/blob/master/templates/returnExports.js
   *)
*/
//# sourceMappingURL=chunk-WOOT27JM.js.map
