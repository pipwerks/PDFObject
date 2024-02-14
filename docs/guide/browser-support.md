---
outline: deep
---

<script setup>
import PDFObject from 'pdfobject';
const supported = PDFObject.supportsPDFs;
</script>

# Browser Support

_Big shoutout to [BrowserStack](https://www.browserstack.com/) for providing free access for our tests._

**PDFObject 2.x supports all modern browsers**, including Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari, and even Microsoft Internet Explorer 11 (for now).

**Important: Please don't confuse PDFObject browser support with browser support for inline PDFs.** PDFObject supports all modern browsers, including mobile browsers. But this does **not** mean PDFs can be embedded in these browsers! A key feature of PDFObject is automatically providing fallback content when browsers are not capable of rendering the PDF. For example, Safari on iOS does **not** properly support embedded PDFs, so PDFObject will automatically display the PDF's URL and a prompt to download the PDF.

(In case you were wondering, this browser {{ (supported) ? "supports" : "doesn't support" }} embedded PDFs. {{ (supported) ? "You lucky dog, you!" : "Sad pandas." }})

## Mobile Browsers

Let's get this out of the way: As of February 2024, all mobile browsers still fail to support inline PDFs, even on tablets. Some browsers, like Safari on iOS, give the _impression_ that inline PDFs are supported &mdash; they display a rendered image of the first page of the PDF, but you'll quickly see there is no way to interact with the PDF or even scroll to the second page. It's a usability nightmare. 

Our testing on Android devices also failed to find any browsers that provided even the most basic PDF support for inline/embedded PDFs.

Based on our testing, PDFObject currently assumes any browser on a mobile device is unable to display inline PDFs, and will default to the fallback content.

**Note:** This is specifically referring to inline/embedded PDFs. The device might be perfectly capable of displaying a PDF when it is not embedded within an HTML page. That's outside the scope of PDFObject.

## PDF Rendering Engines

**Warning: Grossly oversimplified summary ahead!** There are three primary desktop web browser platforms:

- [**Chromium**](https://www.chromium.org/Home/), which is used by [Google Chrome](https://www.google.com/chrome/), [Microsoft Edge](https://www.microsoft.com/en-us/edge), [Opera](https://www.opera.com/), [Vivaldi](https://vivaldi.com/), [Yandex](https://browser.yandex.com/) (popular in Russia), [Arc](https://arc.net/), [Brave](https://brave.com/), and others;
- [**WebKit**](https://webkit.org/), which is used by [Apple Safari](https://www.apple.com/safari/) and [DuckDuckGo](https://duckduckgo.com/browser);
- [**Gecko**](https://firefox-source-docs.mozilla.org/overview/gecko.html), which is used by [Mozilla Firefox](https://www.mozilla.org/en-US/firefox), [Tor](https://www.torproject.org), and [Ghostery](https://www.ghostery.com/ghostery-private-browser)

The three browser platforms are typically bundled with specific PDF rendering engines, as listed below.

### PDFium

Chromium-based browsers are typically packaged with [PDFium](https://pdfium.googlesource.com/pdfium/), a fork of [FoxIt Reader](https://www.foxit.com/blog/foxit-pdf-technology-chosen-for-google-open-source/). Chromium first introduced native PDF support in 2011.

In 2023, Microsoft announced they will be removing PDFium from Edge, in favor of [a proprietary fork of Adobe Reader](https://blog.adobe.com/en/publish/2023/02/08/adobe-microsoft-bring-industry-leading-acrobat-pdf-experience-window-users-microsoft-edge).

### Preview

Webkit's default PDF rendering engine is Apple's [Preview](<https://en.wikipedia.org/wiki/Preview_(macOS)>), which was built by NeXT, then expanded by Apple. Safari introduced native PDF support in 2009.

### PDF.js

Firefox is bundled with [PDF.js](https://mozilla.github.io/pdf.js/), a JavaScript-based PDF rendering engine built by Mozilla. Firefox introduced native PDF support in 2013.

## PDF Browser Plugins

There are two primary browser plugins for PDFs on desktop browsers: [Adobe Reader](https://get.adobe.com/reader/) and [FoxIt PDF Reader](https://www.foxit.com/pdf-reader/). While they aren't as ubiquitous as they were in the 2000s (native PDF support took hold circa 2010), they offer many more features and capabilities than native PDF readers, and are very common in corporate environments.

## PDF Open Parameters

Adobe introduced PDF Open Parameters as part of their Adobe Acrobat (now Adobe Reader) platform in the early 2000s. These parameters were designed to be included in the PDF's URL; when Acrobat opened the PDF in the web browser, Acrobat would examine the parameters and take the appropriate action(s).

Unfortunately, documentation for PDF Open Parameters support is hard to come by.

The original specification is hard to find online, as Adobe has frequently updated their site(s) and deleted old sub-sites/documentation. You can find two of the original SDK docs here on PDFObject.com: [Acrobat 8.1 (2007)](/pdf/pdf_open_parameters_acro8.pdf){target=blank} and [Acrobat 7.0 (2005)](/pdf/pdf_open_parameters_acro7.pdf){target=blank}. You can also find some information at [Adobe's Acrobat-PDFL SDK Documentation site](https://opensource.adobe.com/dc-acrobat-sdk-docs/library/pdfmark/pdfmark_Actions.html).

PDFium's documentation on PDF Open Parameters is also hard to find. There doesn't appear to be a canonical page outlining parameter support. Although PDFium began as a fork of FoxIt, the two forks don't appear to share the same support for PDF Open Parameters. FoxIt PDF Reader's Help Center provides a list of [FoxIt's supported parameters](https://kb.foxit.com/hc/en-us/articles/360042671711-Parameters-for-Opening-PDF-Files-with-a-command), which includes a few parameters that have not worked when we tested PDFium.

[PDF.js has a brief outline of supported parameters](https://github.com/mozilla/pdf.js/wiki/Viewer-options) on GitHub, last updated 2019.

There is no documentation for Safari's support of PDF Open Parameters, probably because Safari only supports one: `page`. [Insert sad trombone meme here.]

### Browser Support for Parameters

PDFObject.com includes a [page designed to demonstrate each of the PDF Open Parameters](/examples/pdf-open-params.html){target=blank}. Try it out for yourself!

The results of our testing (as of February 2024) are listed in the table below. 

Reminder: This table only represents **desktop browsers**.
- ![Supported](/img/checkmark-green.png) Green checkmark indicates supported.
- ![Unsupported](/img/cross-red.png) Red cross indicates unsupported.
- ![Untested](/img/question-blue.png) Blue questionmark indicates untested.

|                         | PDFium                                 | MS Edge                                | PDF.js                                 | Safari                                 |
| ----------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| page                    | ![Supported](/img/checkmark-green.png) | ![Supported](/img/checkmark-green.png) | ![Supported](/img/checkmark-green.png) | ![Supported](/img/checkmark-green.png) |
| nameddest               | ![Supported](/img/checkmark-green.png) | ![Supported](/img/checkmark-green.png) | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     |
| zoom                    | ![Supported](/img/checkmark-green.png) | ![Supported](/img/checkmark-green.png) | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     |
| zoom, with coordinates  | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     |
| Fit                     | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| FitH                    | ![Supported](/img/checkmark-green.png) | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| FitH, with coordinates  | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| FitV                    | ![Supported](/img/checkmark-green.png) | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| FitV, with coordinates  | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| FitB                    | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| FitBH                   | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| FitBH, with coordinates | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| FitBV                   | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| FitBV, with coordinates | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| toolbar                 | ![Supported](/img/checkmark-green.png) | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| navpanes                | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| pagemode                | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     |
| search                  | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Supported](/img/checkmark-green.png) | ![Unsupported](/img/cross-red.png)     |
| scrollbar               | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| statusbar               | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| comment\*               | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| messages\*              | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| highlight\*             | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| viewrect\*              | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| reverse\*\*             | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     | ![Unsupported](/img/cross-red.png)     |
| fdf                     | ![Untested](/img/question-blue.png)    | ![Untested](/img/question-blue.png)    | ![Untested](/img/question-blue.png)    | ![Untested](/img/question-blue.png)    |
| collab\*                | ![Untested](/img/question-blue.png)    | ![Untested](/img/question-blue.png)    | ![Untested](/img/question-blue.png)    | ![Untested](/img/question-blue.png)    |

\*Adobe-specific parameter.

\*\*FoxIt-specific parameter.

<style>
img { width: 16px }
img { display: inline; }
</style>
