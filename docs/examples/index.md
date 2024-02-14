---
outline: deep
---

# Common Use Cases

Here are some of the most common use cases for PDFObject. 


## Full-browser embed

If you don't specify a target element, PDFObject will default to `document.body`, which will cause the PDF to fill the entire browser window.

The following two examples have identical functionality.

```js
PDFObject.embed("/pdf/sample-3pp.pdf");
```
**Demo:** [Full-browser embed (no selector specified)](/examples/full-browser-default.html){target="_blank"}
```js
PDFObject.embed("/pdf/sample-3pp.pdf", document.body);
```
**Demo:** [Full-browser embed (explicit selector)](/examples/full-browser-explicit.html){target="_blank"}


## Passing an HTML element instead of a selector

PDFObject needs to know where to embed your PDF. Most of the examples on this site use a CSS selector, such as `#my-container`, but you can also pass an HTML node or a jQuery element. 

```js
let container = document.querySelector("#my-pdf");
PDFObject.embed("/pdf/sample-3pp.pdf", container);
```
**Demo:** [Simple embed passing vanilla HTML element](/examples/passing-element-styled.html){target="_blank"}

```js
let $container = $("#my-pdf");
PDFObject.embed("/pdf/sample-3pp.pdf", $container);
```
**Demo:** [Simple embed passing vanilla HTML element](/examples/passing-element-jquery-styled.html){target="_blank"}


## Setting the PDF size

By default, PDFObject generates an `<iframe>` element with a width and height of 100%. It will automatically fill the target container.

```js
PDFObject.embed("myfile.pdf", "#my-container");
//outputs <iframe src="myfile.pdf" style="width:100%;height:100%">
```


PDFObject automatically appends the class `pdfobject` to the `<iframe>` element, and `pdfobject-container` to the target element. This helps you target your element in CSS.

```html
<style>
.pdfobject-container {
   width: 200px;
   height: 500px;
}
</style>

<div id="my-container"></div>

<script>
PDFObject.embed("myfile.pdf", "#my-container");
//Will be embedded as
//<div id="my-container" class="pdfobject-container">
//   <iframe class="pdfobject" [...]>
//</div>
</script>
```
**Demo:** [Embed a PDF and specify dimensions using CSS](/examples/passing-selector-styled.html){target="_blank"}

> [!TIP]
> PDFObject allows you to set the `width` and `height` directly on the `<iframe>`, but this is strongly discouraged! It's safer to specify dimensions using your site's CSS. 
>
> If you specify dimensions on the `<iframe>` element directly, you will lose the ability to resize the element via CSS, because the inline styles will always take precedence over the other styles in your file. Therefore it is recommended that you specify dimensions using external CSS rules as shown above.

## Specifying what page to open

As outlined on the [Browser Support](/guide/browser-support) page, most PDF Open Parameters are not widely supported. However, there is one parameter that works everywhere: the `page` parameter.

If you specify a page number using the `page` parameter, as shown in this example, the PDF will auto-scroll to the specified page number when it loads.

```js
var options = {
   page: "2"
};
PDFObject.embed("/pdf/sample-3pp.pdf", "#my-container", options);
```

**Demo:** [Opening a specific page within the PDF](/examples/specifying-page-number.html){target="_blank"}

Some PDF engines also support the `pagemode` option, which can be used to display the PDF's page thumbnails. This is expecially handy when paired with the `page` parameter.

```js
var options = {
   page: "2",
    pdfOpenParams: {
        pagemode: 'thumbs'
    }
};
PDFObject.embed("/pdf/sample-3pp.pdf", "#my-container", options);
```
**Demo:** [Opening a specific page within the PDF, while also displaying thumbnails](/examples/specifying-page-number-thumbnails.html){target="_blank"}


## Custom fallback message
PDFObject allows you to display custom messages to users when their browser is unable to display PDFs (this is most common on mobile devices). By default, PDFObject will display the message:

> This browser does not support inline PDFs. Please download the PDF to view it: Download PDF

You can replace this message with any string you like. If you would like to let the user download the PDF, just add a link using the `[url]` shortcode, like so:
> `<a href='[url]'>Custom link</a>`

```js
let customFallback = "This is a custom fallback link that displays when the PDF can't be embedded. The PDF's URL can be embedded anywhere in this string using a shortcode. <a href='[url]'>You can make a link</a> or display it as text like this: [url].";
PDFObject.embed("/pdf/sample-3pp.pdf", "#my-pdf", { fallbackLink: customFallback });
```

**Demo:** [Custom fallback message](/examples/specifying-custom-fallback-link.html){target="_blank"}


## Displaying Base64 PDFs

Some PDFs are generated dynamically as Base64 strings. PDFObject can accept Base64 strings, just pass the string as the URL.

```js
let b64 = "data:application/pdf;base64,JVBERi0xLjMKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovQ29udGVudHMgNCAwIFI+PgplbmRvYmoKNCAwIG9iago8PC9GaWx0ZXIgL0ZsYXRlRGVjb2RlIC9MZW5ndGggMTAxPj4Kc3RyZWFtCnicFcytDoAgGEbhzlW8UQsCU5mVqcFk+G6AKf4F2YDJ7TvS2Z5wFBYmeKeRmSE0s4RUXAjQgYkKyaHlWkMPXQntqOi6I9ZxRrYRm38/F5LbkTwsjI2ubxFTuN+T16CnbH7L/xqsCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFIgXQovQ291bnQgMQovTWVkaWFCb3ggWzAgMCA1OTUuMjggODQxLjg5XQo+PgplbmRvYmoKNSAwIG9iago8PC9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwo+PgplbmRvYmoKMiAwIG9iago8PAovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0ZvbnQgPDwKL0YxIDUgMCBSCj4+Ci9YT2JqZWN0IDw8Cj4+Cj4+CmVuZG9iago2IDAgb2JqCjw8Ci9Qcm9kdWNlciAoUHlGUERGIDEuNy4yIGh0dHA6Ly9weWZwZGYuZ29vZ2xlY29kZS5jb20vKQovQ3JlYXRpb25EYXRlIChEOjIwMjQwMjA4MDIyMTIzKQo+PgplbmRvYmoKNyAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL09wZW5BY3Rpb24gWzMgMCBSIC9GaXRIIG51bGxdCi9QYWdlTGF5b3V0IC9PbmVDb2x1bW4KPj4KZW5kb2JqCnhyZWYKMCA4CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDI1OCAwMDAwMCBuIAowMDAwMDAwNDQxIDAwMDAwIG4gCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA4NyAwMDAwMCBuIAowMDAwMDAwMzQ1IDAwMDAwIG4gCjAwMDAwMDA1NDUgMDAwMDAgbiAKMDAwMDAwMDY1NCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDgKL1Jvb3QgNyAwIFIKL0luZm8gNiAwIFIKPj4Kc3RhcnR4cmVmCjc1NwolJUVPRgo=";
PDFObject.embed(b64, "#my-pdf");
```
**Demo:** [Embedding a Base64 PDF](/examples/base64.html){target="_blank"}


## Integrating PDF.js

You can force the webpage to render the PDF using [PDF.js](https://mozilla.github.io/pdf.js) instead of the browser's native PDF engine. This is ideal for scenarios where you want every user to have the same experience (no variation between browsers or operating systems), or when you want to ensure the viewer can see the PDF on a mobile device. 

PDF.js can also be modified for specific use cases, such as tracking views, controlling the look/feel, toolbars, and more.

There are some important caveats: 
1. You must install and manage your own instance of PDF.js on your server. It is **not** included with PDFObject. 
2. PDF.js does not allow cross-domain hosting; your PDF and PDF.js must reside on the same domain.
3. PDFObject does not verify that PDF.js is present and functional, it assumes you have correctly configured your PDF.js viewer and are not trying to load PDFs from a different domain. If your installation of PDF.js is malfunctioning, the PDF will not be rendered and no fallback will be displayed.
4. Load times may increase dramatically, as the browser has to download and initialize PDF.js before displaying the PDF. 

Here's an example of PDFObject instructing the browser to use PDF.js. The PDF is hosted on the same domain as PDF.js. 

```js
PDFObject.embed("/pdf/sample-3pp.pdf", "#pdf", {
   page: "2",
   pdfOpenParams: {
      pagemode: "thumbs"
   },
   forcePDFJS: true,
   PDFJS_URL: "/pdfjs/web/viewer.html"
});
```

**Demo:** [Using PDF.js to display the PDF](/examples/pdfjs-forced.html){target="_blank"}


