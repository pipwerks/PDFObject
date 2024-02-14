---
outline: deep
---

<script setup>
import PDFObject from 'pdfobject';
const supported = PDFObject.supportsPDFs;
</script>

# Why PDFObject?

## How PDFObject can help your project

### Browser support detection for inline/embedded PDFs.

You build webpages, and need to display a PDF. But you're an experienced developer, and you know PDF embedding is not supported everywhere. If you insert a plain `<iframe>` for displaying your PDF, it might not display for some of your customers, causing confusion, frustration, and support tickets.

The PDFObject utility helps you avoid these situations by detecting whether the browser supports embedded PDFs; if yes, the PDF is embedded. **If no, the PDF will NOT be embedded**, but fear not ... 

### Automatic fallback links when the browser does not support inline PDFs.

PDFObject will automagically display a message for the visitor, including a link to download the PDF. This ensures your users always have access to your PDF. The fallback link can be customized, or the option can be disabled if you prefer.

If your PDF is a Base64 string, PDFObject will convert it to a downloadable file and present a download link to the end user.

(In case you were wondering, this browser {{ (supported) ? "supports" : "doesn't support" }} embedded PDFs. {{ (supported) ? "You lucky dog, you!" : "Sad pandas." }})

### Simplified management of PDF Open Parameters
PDF Open Parameters ([when supported!](/guide/browser-support#pdf-open-parameters)) are a great way to improve the user experience. PDFObject makes it easy to set your parameters, without the hassle of building a custom URL string. If the browser doesn't support PDF Open Parameters, don't worry! Unsupported parameters will be silently ignored.

### Plays well with others
PDFObject works great with jQuery and PDF.js. [PDFObject 2.x is also registered with NPM](https://www.npmjs.com/package/pdfobject), enabling easy integration with your automated build processes.

## What PDFObject _doesn't_ do
        
### Not a PDF rendering engine.
PDFObject's primary duty is to detect PDF support, then write an `<iframe>` element to the page. The browser (and any associated browser plugins) are responsible for rendering the PDF. **If the browser does not support embedded PDFs, PDFObject is not capable of forcing the browser to render the PDF.**

If you need to force browsers to display a PDF, we suggest using Mozilla's [PDF.js](https://mozilla.github.io/pdf.js/). Note that PDF.js is subject to its own limitations, such as cross-domain security restrictions. PDFObject and PDF.js play well together. Examples are provided in the PDFObject API documentation, under `PDF_JS`.

### Cannot customize the look and feel of the PDF toolbar.
The toolbar is controlled by the browser. Chrome, Safari, and Firefox each use completely different PDF rendering engines, and thus present different toolbars. Some of these browsers provide the ability to show or hide the toolbar, or toggle features such as the search field, via PDF Open Parameters. However, in general the browsers do NOT provide any mechanism for customizing the toolbar. If you really need to customize the toolbar, try forking Mozilla's [PDF.js](https://mozilla.github.io/pdf.js/) and customizing it to suit your needs.

### Does not validate that the PDF is actually rendered. 
The assumption is that you are using a valid PDF, you're specifying a valid URL, and the network is functioning normally. PDFObject does not check for 404 errors, and JavaScript cannot be used to verify whether the PDF actually rendered, unless you are using PDF.js, which is outside the scope of PDFObject.

### Does not magically implement PDF Open Parameters. 
As mentioned above, these parameters are not widely supported. The PDF rendering engine either supports them or doesn't &mdash; PDFObject cannot force the rendering engine to implement these features.

## PDFObject backstory
PDFObject was created by Philip Hutchison in 2008 to scratch his own itch. Philip was working as an instructional designer and online course developer, and needed to embed a PDF into one of his courses. Having been a member of the SWFObject team, he was familiar with the complications of embedding media files into HTML documents. 

In 2008, browsers generally didn't offer native support for media files (Flash, video, audio, PDFs). The few that did tended to use proprietary solutions. For PDFs, plugins like Adobe Reader and FoxIt bridged the gap, but as a web developer, you couldn't depend on the visitor having these plugins installed. This led to an era of JavaScript-based plugin detectors, enabling developers to present alternative content if the multimedia file wasn't supported. (The fallback content was usually a prompt to download a specific plugin.) PDFObject was created as a part of this trend; it enabled developers to verify PDF support before embedding the PDF.

The era's reliance on plugins ushered in the fight for web standards, spurring much debate around which media should be natively supported by browsers, and which HTML element(s) were best suited for embedding media files.

For Flash SWF files and PDFs, `<object>` was the most standards-compliant, and also natively supported fallback content. Thus, it was the element of choice for the SWF**Object** and PDF**Object** utilities. In both utilities, JavaScript would run a plugin detection routine, then handle any browser-specific gotchas, including switching to `<embed>` for browsers that hiccuped when using `<object>`.

Over time, browser support for PDFs vastly improved (all major browsers now include native PDF rendering, no plugins required), ECMAScript/JavaScript evolved, and attitudes shifted. 

In 2016, [PDFObject was rewritten](https://pipwerks.com/2016/04/21/pdfobject-2-0-released/) to embrace a more modern approach, with a focus on pragmatism. `<object>` was eliminated, with `<embed>` becoming the default. `<iframe>` was used in special circumstances.

Circa 2020, it became clear that `<iframe>` has become the most bulletproof method for embedding PDFs across all browsers. PDFObject 2.3 switched exclusively to `<iframe>` and no longer uses `<embed>` in any scenarios.

As of 2024, PDFObject has been used millions of times across thousands of websites, averaging over 100,000 downloads a week on NPM.