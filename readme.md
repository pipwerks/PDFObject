PDFObject is a lightweight JavaScript utility for dynamically embedding PDFs in HTML documents.

Copyright (c) 2008-2018 Philip Hutchison
MIT-style license: http://pipwerks.mit-license.org/

-----

[![CDNJS](https://img.shields.io/cdnjs/v/pdfobject.svg)](https://cdnjs.com/libraries/pdfobject/)

## Changelog

2.1.1, October 2018: Improved handling of iOS to properly indicate iOS does not support embedded PDFs.

2.1, October 2018: Changed `assumptionMode` default from false to true. This will ensure PDFObject 2.x will work for Firefox users without requiring them to change their codebase to enable assumptionMode. All they need to do is load the latest version of PDFObject, the PDFObject utility will take care of the rest.

2.1 (dev branch), January 2017: Modified to support Mozilla's removal of `navigator.mimeTypes` inspection. Added `assumptionMode` for manual override of PDFObject's default `navigator.mimeTypes` sniffing.

2.0, April 2016: Initial release of PDFObject 2.0. Contains breaking changes, and is not compatible with PDFObject 1.x.