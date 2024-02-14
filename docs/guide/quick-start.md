---
outline: deep
---

# Quick start

```html
<style>
.pdfobject-container { height: 500px; border: 1px solid #ccc; }
</style>
<div id="my-pdf"></div>
<script src="https://unpkg.com/pdfobject"></script>
<script>PDFObject.embed("/path/to/file.pdf", "#my-pdf");</script>
```

**Demo:** [Basic embed](/examples/basic.html){target="_blank"}

## 1. Create a container to hold your PDF
```html
<div id="my-pdf"></div>
```

## 2. Add the PDFObject script to your page, then tell PDFObject which PDF to embed, and where to embed it
```html
<script src="https://unpkg.com/pdfobject"></script>
<script>PDFObject.embed("/path/to/file.pdf", "#my-pdf");</script>
```

## 3. Optional: Use CSS to change the appearance of the containing element, such as height, width, border, margins, etc.
```css
.pdfobject-container { height: 500px; border: 1px solid #ccc; }
```

## 4. Optional: Specify additional parameters for displaying the PDF.
See the [API documentation](/api/) for additional details and examples.
```js
<script>
let options = {
    page: 2 //navigate to page 2 when the PDF is opened
};
PDFObject.embed("/path/to/file.pdf", "#my-pdf", options);
</script>
```