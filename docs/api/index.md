---
outline: deep
---

# PDFObject API

PDFObject provides two properties and one method.

## `PDFObject.supportsPDFs`
Property. Returns true or false based on following logic:

  - If the browser is on a mobile device, PDFObject will automatically assume PDFs are not supported and return `false`. (As of February 2024, no mobile browsers properly support inline PDFs.)
  - If **not** a mobile device, PDFObject will check `navigator.pdfViewerEnabled`. 
  - If `navigator.pdfViewerEnabled` is found, but _disabled_ (e.g. the user has intentionally disabled PDF support in the browser), PDFObject will respect this and return `false`. 
  - If `navigator.pdfViewerEnabled` is found and set to `true`, PDFObject will return `true`. 
  - If `navigator.pdfViewerEnabled` is not found, PDFObject will check what kind of browser is being used. If the browser is known to support inline PDFs natively (Chrome/Edge/Opera/etc, macOS Safari, Firefox), PDFObject will assume inline PDFs are supported and return `true`.
  - If Internet Explorer 11, PDFObject will query against ActiveX for known PDF plugins (Acrobat, FoxIt) and act accordingly.

PDFObject **does not** perform detection for specific PDF rendering engines (PDFium, PDF.js, Adobe Reader, FoxIt, etc.). Note: For those who wish to target PDF.js, there is an option in `PDFObject.embed()` to force use of PDF.js. See [PDJS_URL](#PDFJS_URL) for details.

```js
if(PDFObject.supportsPDFs){
    console.log("Yay, this browser supports inline PDFs.");
} else {
    console.log("Boo, inline PDFs are not supported by this browser");
}
```

## `PDFObject.pdfobjectversion` 

Property. Returns the version of PDFObject.

```js
console.log(PDFObject.pdfobjectversion); //"2.3.0"
```

## `PDFObject.embed`
Method. Returns the embedded `<iframe>`, or false if unable to embed. Expects the following arguments:

`PDFObject.embed(url [string], target [mixed], options [object])`

  * url [string, required]. The URL of the PDF. Can be relative or absolute. Can also be a Base64 string (be sure to include MIME type as part of string).
  * target [mixed, optional]. The HTML element the PDF will be inserted into. 
  * options [object, optional]. Enables you to fine-tune the embed for various scenarios.


If target is omitted, PDFObject will default to `document.body`, filling the entire page with the embedded PDF.
```js
//embeds a PDF and makes it fill the browser window
PDFObject.embed("myfile.pdf");
```

### Specifying a target
The `target` parameter can accept a CSS selector, HTML node, or jQuery object.
```js
//passes a CSS selector to specify the target
PDFObject.embed("myfile.pdf", "#my-container");
```
```js
//passes a vanilla HTML node for target
var mynode = document.getElementById("someID");
PDFObject.embed("myfile.pdf", mynode);
```
```js
//passes a jQuery object (HTML node) for target
var $node = $("#someID");
PDFObject.embed("myfile.pdf", $node);
```

## Options
PDFObject's `options` parameter provides a lot of flexibility.

```js
//embeds a PDF into the element "my-container" with a few options specified
var options = {
    title: "My embedded PDF",
    pdfOpenParams: { view: 'Fit', page: '2' }
};
PDFObject.embed("myfile.pdf", "#my-container", options); 
```

<br/>

### page 
[string or number]. Default: `null`

Alias for PDF Open Parameters "page" option. Any number entered here will cause the PDF be opened to the specified page number, **if the browser supports it**. If left unspecified, the PDF will open on page 1.

```js
PDFObject.embed("myfile.pdf", "#my-container", { page: "2" });
```

**Demo:**  [Specifying the page number](/examples/specifying-page-number.html){target=_blank}

<br/>

### fallbackLink
[string] or [boolean]. Default: `"<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href='[url]'>Download PDF</a></p>"`

Any string entered here will be inserted into the target element when the browser doesn't support inline PDFs.

  * If entering a string, HTML is supported.
  * Use the shortcode `[url]` to insert the URL of the PDF (the string passed in `embed(url)`).
    ```js
    var options = {
       fallbackLink: "<p>This is a <a href='[url]'>fallback link</a></p>"
    };
    PDFObject.embed("myfile.pdf", "#my-container", options);
    //If browser doesn't support inline PDFs, outputs:
    //<p>This is a <a href='myfile.pdf'>fallback link</a></p>
    ```
  * Entering `false` will disable the fallback text option and prevent PDFObject from inserting fallback text
    ```js
    PDFObject.embed("myfile.pdf", "#my-container", {fallbackLink: false});
    //If browser doesn't support inline PDFs, PDFObject will output nothing
    ```

**Demo:**  [Specifying a custom fallback](/examples/specifying-custom-fallback-link.html){target=_blank}

**Demo:**  [Declining a fallback](/examples/declining-a-fallback.html){target=_blank}

<br/>

### fallbackFileNameForBase64
[string]. Default: `"file.pdf"`

If you're trying to embed a base64 PDF but the browser doesn't support inline PDFs, the user will see a download link for the PDF. This option enables you to set a custom filename for that downloaded base64 PDF.

```js
let b64 = "data:application/pdf;filename=OriginalNameHere.pdf;base64,JVBERi0xLjMKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovQ29udGVudHMgNCAwIFI+PgplbmRvYmoKNCAwIG9iago8PC9GaWx0ZXIgL0ZsYXRlRGVjb2RlIC9MZW5ndGggMTAxPj4Kc3RyZWFtCnicFcytDoAgGEbhzlW8UQsCU5mVqcFk+G6AKf4F2YDJ7TvS2Z5wFBYmeKeRmSE0s4RUXAjQgYkKyaHlWkMPXQntqOi6I9ZxRrYRm38/F5LbkTwsjI2ubxFTuN+T16CnbH7L/xqsCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFIgXQovQ291bnQgMQovTWVkaWFCb3ggWzAgMCA1OTUuMjggODQxLjg5XQo+PgplbmRvYmoKNSAwIG9iago8PC9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwo+PgplbmRvYmoKMiAwIG9iago8PAovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0ZvbnQgPDwKL0YxIDUgMCBSCj4+Ci9YT2JqZWN0IDw8Cj4+Cj4+CmVuZG9iago2IDAgb2JqCjw8Ci9Qcm9kdWNlciAoUHlGUERGIDEuNy4yIGh0dHA6Ly9weWZwZGYuZ29vZ2xlY29kZS5jb20vKQovQ3JlYXRpb25EYXRlIChEOjIwMjQwMjA4MDIyMTIzKQo+PgplbmRvYmoKNyAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL09wZW5BY3Rpb24gWzMgMCBSIC9GaXRIIG51bGxdCi9QYWdlTGF5b3V0IC9PbmVDb2x1bW4KPj4KZW5kb2JqCnhyZWYKMCA4CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDI1OCAwMDAwMCBuIAowMDAwMDAwNDQxIDAwMDAwIG4gCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA4NyAwMDAwMCBuIAowMDAwMDAwMzQ1IDAwMDAwIG4gCjAwMDAwMDA1NDUgMDAwMDAgbiAKMDAwMDAwMDY1NCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDgKL1Jvb3QgNyAwIFIKL0luZm8gNiAwIFIKPj4Kc3RhcnR4cmVmCjc1NwolJUVPRgo=";

PDFObject.embed(b64, "#my-pdf", {
  fallbackFileNameForBase64: "Custom File Name.pdf"
});
//If browser cannot display inline PDFs, and user clicks "Download PDF" link, the downloaded file will be named "Custom File Name.pdf"
```

**Demo:**  [Embedding a PDF encoded as a Base64 string, with custom filename](/examples/base64-filename.html){target=_blank}

<br/>


### pdfOpenParams 
[object]. Default: `null`

Allows you to specify PDF Open Parameters.

**Warning:** These are not well supported outside of Adobe Reader and FoxIt PDF Reader. See our Browser Support section for [a list of all available PDF Open Parameters, including browser support](/guide/browser-support.html#pdf-open-parameters).

```js
PDFObject.embed("myfile.pdf", "#my-container", {pdfOpenParams: { page: 10 }});
//If supported, the PDF viewer will automatically scroll to page 10 on load
```

> [!NOTE]
> PDFObject provides a convenient alias for PDF Open Parameters' `page` parameter:
> ```js
> //These two lines function identically
> PDFObject.embed("myfile.pdf", "#my-container", { page: 2 });
> PDFObject.embed("myfile.pdf", "#my-container", {pdfOpenParams: { page: 2 }});
> ```

**Demo:**  [PDF Open Parameters Test Page](/examples/pdf-open-params.html){target=_blank}

<br/>

### title
[string]. Default: `"Embedded PDF"`

Any string entered here will be appended to the generated `<iframe>` element as the `title` attribute. If left unspecified, PDFObject will write "Embedded PDF". This improves accessibility, ensuring the purpose of the `<iframe>` is clear to screen readers.

```js
PDFObject.embed("myfile.pdf", "#my-container", { title: "PDF version of your banking statement" });
//outputs <iframe src="myfile.pdf" title="PDF version of your banking statement">
```

> [!NOTE]
> PDFObject does not have the ability to alter the title of the PDF itself, or how the PDF's title is displayed in the PDF reader.

**Demo:**  [Setting iframe title](/examples/setting-title.html){target=_blank}

<br/>

### id
[string]. Default: `null`

Any string entered here will be appended to the generated `<iframe>` element as the ID. If left unspecified, no ID will be appended.

```js
PDFObject.embed("myfile.pdf", "#my-container", { id: "myID" });
//outputs <iframe src="myfile.pdf" id="myID">
```

<br/>

### customAttribute
[object]. Default: `null`

This option allows developers to specify a custom attribute on the `<iframe>` element. For example, you could specify the `loading` attribute on the iframe to be `"lazy"`. You could also set a `sandbox` value, if needed.

Values must be set as `key` and `value`, as shown in the following example:

```js
var options = {
    customAttribute: { key: "foo", value: "bar" }
};
PDFObject.embed("myfile.pdf", "#my-container", options);
```

**Demo:**  [Specifying a custom attribute](/examples/custom-attribute.html){target=_blank}

Disallowed tokens are: `className`, `type`, `title`, `src`, `style`, `id`, `allow`, and `frameborder`. These are all reserved.

PDFObject will only allow a single custom attribute to be set. However, if you would like to set additional attributes, you can do so by modifying the returned `<iframe>`:

```js
var options = {
    customAttribute: { key: "foo", value: "bar" }
};
let iframe = PDFObject.embed("myfile.pdf", "#my-container", options);
iframe.setAttribute("pie", "pumpkin");
```

<br/>

### PDFJS_URL 
[string]. Default: `null`

_PDFObject is not affiliated with Mozilla or PDF.js, and the PDF.js code is not included with PDFObject._

If you would like to use PDF.js with PDFObject, you will need to specify the URL of the [PDF.js viewer HTML file](https://github.com/mozilla/pdf.js/wiki/Setup-PDF.js-in-a-website). PDFObject will automatically pass the PDF's URL to PDF.js.

If you provide the `PDFJS_URL`, but do **not** set `forcePDFJS` to true, PDF.js will only be used as a fallback for browsers that do not offer native support for inline PDFs.

**Demo:**  [Using PDF.js as a fallback](/examples/pdfjs.html){target=_blank}

<br/>

### forcePDFJS
[boolean]. Default: `false`

_PDFObject is not affiliated with Mozilla or PDF.js, and the PDF.js code is not included with PDFObject._

If set to true and the `PDFJS_URL` string is not null, PDFObject will attempt to use PDF.js to embed the PDF in the browser, regardless of the browser's default PDF viewer.

**Demo:**  [Forcing all embeds to be rendered by PDF.js](/examples/pdfjs-forced.html){target=_blank}

<br/>

### height
[string]. Default: `"100%"`

Will insert the height as an inline style via the `style` attribute on the the generated `<iframe>`. If left unspecified, PDFObject will default to 100%. Is standard CSS, supports all units, including px, %, em, and rem.

```js
PDFObject.embed("myfile.pdf", "#my-container", { height: "500px" });
```

> [!TIP]
> Avoid hard-coding `height` when possible. It's safer to specify dimensions using your site's CSS. 

<br/>

### width 
[string]. Default: `"100%"`

Will insert the width as an inline style via the `style` attribute on the generated `<iframe>`. If left unspecified, PDFObject will default to 100%. Is standard CSS, supports all units, including px, %, em, and rem.

```js
PDFObject.embed("myfile.pdf", "#my-container", { width: "500px" });
```

> [!TIP]
> Avoid hard-coding `width` when possible. It's safer to specify dimensions using your site's CSS. 

<br/>

### omitInlineStyles
[boolean]. Default: `false`

If set to true, PDFObject will not include any inline styles when generating the `<iframe>` element.

> [!WARNING]
> If you choose to omit inline styles, be sure to specify the `<iframe>` dimensions in your site's CSS. Failure to set dimensions may cause the PDF to be invisible (height 0).

**Demo:**  [Omitting inline styles](/examples/omit-inline-styles.html){target=_blank}

<br/>

### suppressConsole 
[boolean]. Default: `false`

By default, PDFObject displays error messages in the browser's JavaScript console, such as "URL is not valid" or "This browser does not support embedded PDFs". Set `suppressConsole` to true to prevent PDFObject from displaying error messages.
