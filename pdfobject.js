/* global ActiveXObject, define, jQuery */

/**
 *  PDFObject v2.2.4
 *  https://github.com/pipwerks/PDFObject
 *  @license
 *  Copyright (c) 2008-2020 Philip Hutchison
 *  MIT-style license: http://pipwerks.mit-license.org/
 *  UMD module pattern from https://github.com/umdjs/umd/blob/master/templates/returnExports.js
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    root.PDFObject = factory()
  }
})(this, function () {
  'use strict'

  // PDFObject is designed for client-side (browsers), not server-side (node)
  // Will choke on undefined navigator and window vars when run on server
  // Return boolean false and exit function when running server-side

  if (
    typeof window === 'undefined' ||
    window.navigator === undefined ||
    window.navigator.userAgent === undefined ||
    window.navigator.mimeTypes === undefined
  ) {
    return false
  }

  const pdfObjectVersion = '2.2.4'
  const nav = window.navigator
  const ua = window.navigator.userAgent

  // Time to jump through hoops -- browser vendors do not make it easy to detect PDF support.

  /*
        IE11 still uses ActiveX for Adobe Reader, but IE 11 doesn't expose window.ActiveXObject the same way
        previous versions of IE did. window.ActiveXObject will evaluate to false in IE 11, but "ActiveXObject"
        in window evaluates to true.

        MS Edge does not support ActiveX so this test will evaluate false
    */
  const isIE = 'ActiveXObject' in window

  /*
        There is a coincidental correlation between implementation of window.promises and native PDF support in desktop browsers
        We use this to assume if the browser supports promises it supports embedded PDFs
        Is this fragile? Sort of. But browser vendors removed mimetype detection, so we're left to improvise
    */
  const isModernBrowser = window.Promise !== undefined

  // Older browsers still expose the mimeType
  const supportsPdfMimeType = nav.mimeTypes['application/pdf'] !== undefined

  // Safari on iPadOS doesn't report as 'mobile' when requesting desktop site, yet still fails to embed PDFs
  const isSafariIOSDesktopMode =
    nav.platform !== undefined &&
    nav.platform === 'MacIntel' &&
    nav.maxTouchPoints !== undefined &&
    nav.maxTouchPoints > 1

  // Quick test for mobile devices.
  const isMobileDevice =
    isSafariIOSDesktopMode || /Mobi|Tablet|Android|iPad|iPhone/.test(ua)

  // Safari desktop requires special handling
  const isSafariDesktop =
    !isMobileDevice &&
    nav.vendor !== undefined &&
    /Apple/.test(nav.vendor) &&
    /Safari/.test(ua)

  // Firefox started shipping PDF.js in Firefox 19. If this is Firefox 19 or greater, assume PDF.js is available
  const isFirefoxWithPDFJS =
    !isMobileDevice && /irefox/.test(ua)
      ? parseInt(ua.split('rv:')[1].split('.')[0], 10) > 18
      : false

  /* ----------------------------------------------------
       Supporting functions
       ---------------------------------------------------- */

  const createAXO = function (type) {
    let ax
    try {
      ax = new ActiveXObject(type)
    } catch (e) {
      ax = null // ensure ax remains null
    }
    return ax
  }

  // If either ActiveX support for "AcroPDF.PDF" or "PDF.PdfCtrl" are found, return true
  // Constructed as a method (not a prop) to avoid unneccesarry overhead -- will only be evaluated if needed
  const supportsPdfActiveX = function () {
    return !!(createAXO('AcroPDF.PDF') || createAXO('PDF.PdfCtrl'))
  }

  // Determines whether PDF support is available
  const supportsPDFs =
    // As of Sept 2020 no mobile browsers properly support PDF embeds
    !isMobileDevice &&
    // Modern versions of Firefox come bundled with PDFJS
    (isFirefoxWithPDFJS ||
      // Browsers that still support the original MIME type check
      supportsPdfMimeType ||
      // Pity the poor souls still using IE
      (isIE && supportsPdfActiveX()))

  // Create a fragment identifier for using PDF Open parameters when embedding PDF
  const buildURLFragmentString = function (pdfParams) {
    let string = ''
    let prop

    if (pdfParams) {
      for (prop in pdfParams) {
        if (Object.prototype.hasOwnProperty.call(pdfParams, prop)) {
          string +=
            encodeURIComponent(prop) +
            '=' +
            encodeURIComponent(pdfParams[prop]) +
            '&'
        }
      }

      // The string will be empty if no PDF Params found
      if (string) {
        string = '#' + string

        // Remove last ampersand
        string = string.slice(0, string.length - 1)
      }
    }

    return string
  }

  const emptyNodeContents = function (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild)
    }
  }

  const getTargetElement = function (targetSelector) {
    // Default to body for full-browser PDF
    let targetNode = document.body

    // If a targetSelector is specified, check to see whether
    // it's passing a selector, jQuery object, or an HTML element

    if (typeof targetSelector === 'string') {
      // Is CSS selector
      targetNode = document.querySelector(targetSelector)
    } else if (
      window.jQuery !== undefined &&
      targetSelector instanceof jQuery &&
      targetSelector.length
    ) {
      // Is jQuery element. Extract HTML node
      targetNode = targetSelector.get(0)
    } else if (
      targetSelector.nodeType !== undefined &&
      targetSelector.nodeType === 1
    ) {
      // Is HTML element
      targetNode = targetSelector
    }

    return targetNode
  }

  const generatePDFJSMarkup = function (
    targetNode,
    url,
    pdfOpenFragment,
    PDFJS_URL,
    id,
    omitInlineStyles
  ) {
    // Ensure target element is empty first
    emptyNodeContents(targetNode)

    const fullURL =
      PDFJS_URL + '?file=' + encodeURIComponent(url) + pdfOpenFragment
    const div = document.createElement('div')
    const iframe = document.createElement('iframe')

    iframe.src = fullURL
    iframe.className = 'pdfobject'
    iframe.type = 'application/pdf'
    iframe.frameborder = '0'

    if (id) {
      iframe.id = id
    }

    if (!omitInlineStyles) {
      div.style.cssText =
        'position: absolute; top: 0; right: 0; bottom: 0; left: 0;'
      iframe.style.cssText = 'border: none; width: 100%; height: 100%;'
      targetNode.style.position = 'relative'
      targetNode.style.overflow = 'auto'
    }

    div.appendChild(iframe)
    targetNode.appendChild(div)
    targetNode.classList.add('pdfobject-container')

    return targetNode.getElementsByTagName('iframe')[0]
  }

  const generatePDFObjectMarkup = function (
    embedType,
    targetNode,
    targetSelector,
    url,
    pdfOpenFragment,
    width,
    height,
    id,
    omitInlineStyles
  ) {
    // Ensure target element is empty first
    emptyNodeContents(targetNode)

    const embed = document.createElement(embedType)
    embed.src = url + pdfOpenFragment
    embed.className = 'pdfobject'
    embed.type = 'application/pdf'

    if (id) {
      embed.id = id
    }

    if (!omitInlineStyles) {
      let style = embedType === 'embed' ? 'overflow: auto;' : 'border: none;'

      if (targetSelector && targetSelector !== document.body) {
        style += 'width: ' + width + '; height: ' + height + ';'
      } else {
        style +=
          'position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;'
      }

      embed.style.cssText = style
    }

    targetNode.classList.add('pdfobject-container')
    targetNode.appendChild(embed)

    return targetNode.getElementsByTagName(embedType)[0]
  }

  const embed = function (url, targetSelector, options) {
    // If targetSelector is not defined, convert to boolean
    const selector = targetSelector || false

    // Ensure options object is not undefined -- enables easier error checking below
    const opt = options || {}

    // Get passed options, or set reasonable defaults
    const id = typeof opt.id === 'string' ? opt.id : ''
    const page = opt.page || false
    const pdfOpenParams = opt.pdfOpenParams || {}
    const fallbackLink = opt.fallbackLink || true
    const width = opt.width || '100%'
    const height = opt.height || '100%'
    const assumptionMode =
      typeof opt.assumptionMode === 'boolean' ? opt.assumptionMode : true
    const forcePDFJS =
      typeof opt.forcePDFJS === 'boolean' ? opt.forcePDFJS : false
    const supportRedirect =
      typeof opt.supportRedirect === 'boolean' ? opt.supportRedirect : false
    const omitInlineStyles =
      typeof opt.omitInlineStyles === 'boolean' ? opt.omitInlineStyles : false
    const suppressConsole =
      typeof opt.suppressConsole === 'boolean' ? opt.suppressConsole : false
    const forceIframe =
      typeof opt.forceIframe === 'boolean' ? opt.forceIframe : false
    const PDFJS_URL = opt.PDFJS_URL || false
    const targetNode = getTargetElement(selector)
    let fallbackHTML = ''
    let pdfOpenFragment = ''
    const fallbackHTMLDefault =
      "<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href='[url]'>Download PDF</a></p>"

    const embedError = function (msg, suppressConsole) {
      if (!suppressConsole) {
        console.log('[PDFObject] ' + msg)
      }
      return false
    }

    // Ensure URL is available. If not, exit now.
    if (typeof url !== 'string') {
      return embedError('URL is not valid', suppressConsole)
    }

    // If target element is specified but is not valid, exit without doing anything
    if (!targetNode) {
      return embedError('Target element cannot be determined', suppressConsole)
    }

    // page option overrides pdfOpenParams, if found
    if (page) {
      pdfOpenParams.page = page
    }

    // Stringify optional Adobe params for opening document (as fragment identifier)
    pdfOpenFragment = buildURLFragmentString(pdfOpenParams)

    // --== Do the dance: Embed attempt #1 ==--

    // If the forcePDFJS option is invoked, skip everything else and embed as directed
    if (forcePDFJS && PDFJS_URL) {
      return generatePDFJSMarkup(
        targetNode,
        url,
        pdfOpenFragment,
        PDFJS_URL,
        id,
        omitInlineStyles
      )
    }

    // --== Embed attempt #2 ==--

    // Embed PDF if traditional support is provided, or if this developer is willing to roll with assumption
    // that modern desktop (not mobile) browsers natively support PDFs
    if (
      supportsPDFs ||
      (assumptionMode && isModernBrowser && !isMobileDevice)
    ) {
      // Should we use <embed> or <iframe>? In most cases <embed>.
      // Allow developer to force <iframe>, if desired
      // There is an edge case where Safari does not respect 302 redirect requests for PDF files when using <embed> element.
      // Redirect appears to work fine when using <iframe> instead of <embed> (Addresses issue #210)
      const embedType =
        forceIframe || (supportRedirect && isSafariDesktop)
          ? 'iframe'
          : 'embed'

      return generatePDFObjectMarkup(
        embedType,
        targetNode,
        targetSelector,
        url,
        pdfOpenFragment,
        width,
        height,
        id,
        omitInlineStyles
      )
    }

    // --== Embed attempt #3 ==--

    // If everything else has failed and a PDFJS fallback is provided, try to use it
    if (PDFJS_URL) {
      return generatePDFJSMarkup(
        targetNode,
        url,
        pdfOpenFragment,
        PDFJS_URL,
        id,
        omitInlineStyles
      )
    }

    // --== PDF embed not supported! Use fallback ==--

    // Display the fallback link if available
    if (fallbackLink) {
      fallbackHTML =
        typeof fallbackLink === 'string' ? fallbackLink : fallbackHTMLDefault
      targetNode.innerHTML = fallbackHTML.replace(/\[url\]/g, url)
    }

    return embedError(
      'This browser does not support embedded PDFs',
      suppressConsole
    )
  }

  return {
    embed: function (a, b, c) {
      return embed(a, b, c)
    },
    pdfobjectversion: (function () {
      return pdfObjectVersion
    })(),
    supportsPDFs: (function () {
      return supportsPDFs
    })()
  }
})
