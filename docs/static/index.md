---
outline: deep
---

# How to embed a PDF without using JavaScript

PDFs can be embedded into HTML pages without using JavaScript. Below are four examples of the most common techniques.

Note: these examples work in most modern desktop browsers, but results will vary in older desktop browsers and mobile browsers. None of these examples work properly on mobile, including iOS.


## `<embed>`
The `<embed>` element became an official part of the HTML specification with HTML5. All HTML5-compliant browsers&mdash;all 'modern' browsers&mdash;officially support the `<embed>` element. Older browsers also offer surprisingly robust (though sometimes unofficial) support for `<embed>`. Unfortunately, when used in static markup, the `<embed>` element doesn't provide a mechanism for fallback content. If the browser doesn't support PDF embedding, which still happens frequently with browsers on mobile devices, the end-user will see nothing.

```html
<embed src="/pdf/sample-3pp.pdf#page=2" type="application/pdf" width="100%" height="100%" />
```
<embed src="/pdf/sample-3pp.pdf#page=2" type="application/pdf" width="100%" height="100%" />


## `<iframe>`
The `<iframe>` approach is very widely supported and one of the easiest ways to embed a PDF. However, an `<iframe>` doesn't provide fallback content when PDF rendering is not supported by the browser.

```html
<iframe src="/pdf/sample-3pp.pdf#page=2" width="100%" height="100%">
</iframe>
```
<iframe src="/pdf/sample-3pp.pdf#page=2" width="100%" height="100%"></iframe>


## `<object>`
Unlike `<embed>`, the `<object>` element enables you to leave fallback content if the browser doesn't support PDF embedding. All browsers support the `<object>` element, but there are often discrepancies in how it has been implemented in each browser. Be sure to thoroughly test your page(s) across browsers and operating systems if you use the `<object>` element.

```html
<object data="/pdf/sample-3pp.pdf#page=2" type="application/pdf" width="100%" height="100%">
   <b>Example fallback content</b>: This browser does not support PDFs. Please download the PDF to view it: 
   <a href="/pdf/sample-3pp.pdf">Download PDF</a>.
</object>
```
<object data="/pdf/sample-3pp.pdf#page=2" type="application/pdf" width="100%" height="100%">
   <b>Example fallback content</b>: This browser does not support PDFs. Please download the PDF to view it: 
   <a href="/pdf/sample-3pp.pdf">Download PDF</a>.
</object>


## `<object><iframe></object>`
Using an `<object>` with an `<iframe>` provides extra insurance if `<object>` is not supported.

```html
<object data="/pdf/sample-3pp.pdf#page=2" type="application/pdf" width="100%" height="100%">
   <iframe src="/pdf/sample-3pp.pdf#page=2" width="100%" height="100%" style="border: none;">
     This browser does not support PDFs. Please download the PDF to view it: 
     <a href="/pdf/sample-3pp.pdf">Download PDF</a>
   </iframe>
</object>
```
<object data="/pdf/sample-3pp.pdf#page=2" type="application/pdf" width="100%" height="100%">
<iframe src="/pdf/sample-3pp.pdf#page=2" width="100%" height="100%" style="border: none;">
This browser does not support PDFs. Please download the PDF to view it: 
<a href="/pdf/sample-3pp.pdf">Download PDF</a>
</iframe>
</object>

<br/>

Now that you've seen how it works with plain HTML markup, [check out what's possible with JavaScript and the PDFObject utility](/examples/).