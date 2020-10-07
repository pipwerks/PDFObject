# PDFObject

PDFObject is a lightweight JavaScript utility for dynamically embedding PDFs in HTML documents.

Copyright (c) 2008–2020 Philip Hutchison
MIT-style license: <https://pipwerks.mit-license.org/>

---

[![CDNJS](https://img.shields.io/cdnjs/v/pdfobject.svg)](https://cdnjs.com/libraries/pdfobject/)

## Changelog

### 2.2.4, October 2020

Reinstated `typeof` check for `window` to play nice with React and NextJS.

### 2.2.3, September 2020

Version bump for NPM. Sigh.

### 2.2.2, September 2020

Fixed typo affecting `suppressConsole` functionality. Hat tip to [John Hunter](https://github.com/johnhunter) for the discovery and fix.

### 2.2.1, September 2020

Fixed typo affecting styling of iframe when forcing PDFJS.

### 2.2.0, September 2020

- **New behavior:** Dropping support for IE9 and IE10, which have practically 0 marketshare now.
- **New behavior:** Now explicitly displaying fallback content for **all mobile devices**, even "Request Desktop" version of pages in iOS. The reasoning is simple: As the time of this update, no mobile device (Android, iOS) natively supports embedded PDFs. This change will lead to a consistent experience across all mobile devices. PDFs can be rendered via PDF.js on mobile if embedding on mobile is a critical need. PDF.js is not included with PDFObject.
- **New option:** Omit inline styles by setting option `omitInlineStyles` to `true`. This helps developers who use strict environments where inline styles are not allowed. Note you will be responsible for applying proper styling via your own CSS.
- **New option:** Suppress console logging by setting option `suppressConsole` to `true`. PDFObject currently places error messages in the console if the PDF can't be embedded for some reason. This option allows you to mute those alerts.
- **New option:** Force PDFObject to embed the PDF in an iframe (instead of an `<embed>`) by setting `forceIframe` to `true`.
- Refactored to use more modern code conventions, such as `let` in lieu of `var`, `el.classList.add()` in place of `el.className = 'foo'`, and `myvar === undefined` in place of `typeof myvar === "undefined"`. Implemented a `let` declaration before each variable instead of the Crockford practice of one `var` per function.
- **New option:** On macOS systems, Safari does not properly embed PDFs that have been requested via 302 URL redirection when embedding using the `<embed>` element. Setting `supportRedirect` to `true` forces PDFObject to use an `<iframe` instead of an `<embed>` for desktop Safari. Hat tip to [John Hunter](https://github.com/johnhunter) for the discovery and fix.
- Refactored to make code safer for server-side node.js-based environments.
- Refactored to eliminate string-based element creation via `innerHTML`. Replaced with standard DOM methods. This helps alleviate unforeseen issues with file names. Only exception is insertion of fallback content, which is passed as a string via `innerHTML`.
- Removed iframe scrollfix for iOS, as it is no longer needed as of iOS13. iOS 12 and lower have ~5-7% marketshare and shrinking fast.
- Refactored codebase to make it more concise and legible.

### 2.1.1, October 2018

Improved handling of iOS to properly indicate iOS does not support embedded PDFs.

### 2.1, October 2018

Changed `assumptionMode` default from false to true. This will ensure PDFObject 2.x will work for Firefox users without requiring them to change their codebase to enable assumptionMode. All they need to do is load the latest version of PDFObject, the PDFObject utility will take care of the rest.

### 2.1 (dev branch)

January 2017: Modified to support Mozilla's removal of `navigator.mimeTypes` inspection. Added `assumptionMode` for manual override of PDFObject's default `navigator.mimeTypes` sniffing.

### 2.0, April 2016

Initial release of PDFObject 2.0. Contains breaking changes, and is not compatible with PDFObject 1.x.
