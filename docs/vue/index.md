---
outline: deep
---

# PDFObject for Vue 3

There is an official PDFObject plugin available for Vue 3 projects. Get it at https://github.com/pipwerks/pdfobject-vue/.

The plugin installs a `<PdfObject>` component, which uses PDFObject under the hood.

There are two ways to use the Vue plugin: via the standard Vue build process, or via Vue's standalone mode, which is purely client-side, and does not require a build step.

A sample project containing both methods can be downloaded from https://github.com/pipwerks/PDFObject-Vue-Test/


## Build mode

Install PDFObject and pdfobject-vue via NPM:  
`npm install pdfobject && npm install pdfobject-vue`

Import `pdfobject-vue` and set `app.use` in your Vue project's main.js:

```js
import { createApp } from 'vue';
import App from './App.vue';
import PDFObjectPlugin from 'pdfobject-vue';

const app = createApp(App);
app.use(PDFObjectPlugin);
app.mount('#app');
```

Add the `<PdfObject>` component to your Vue page. Pass the PDF's URL via the `url` attribute, and any options via the `:options` attribute. (Note the binding via colon.) For example:

```vue
<PdfObject url="/pdf/sample.pdf" :options="{ page: 2 }" />
```

## Standalone mode

Install the required scripts (in this example, loaded from the UNPKG CDN):

```html
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/pdfobject"></script>
<script src="https://unpkg.com/pdfobject-vue"></script>
```

Configure your Vue app to use `PDFObjectVuePlugin`:

```js
const { createApp } = Vue;
const app = createApp({});
app.use(PDFObjectVuePlugin);
app.mount('#app');
```

Add the `<pdf-object>` component to your Vue page. Pass the PDF's URL via the `url` attribute, and any options via the `:options` attribute. (Note the binding via colon.) For example:

```vue
<pdf-object url="/pdf/sample-3pp.pdf" :options="{ page: 2 }" />
```

> [!IMPORTANT]
> The standalone version of `pdfobject-vue` requires you to use the hyphenated `<pdf-object>` version of the component. The build version can use both styles: TitleCased `<PdfObject>` or hyphenated `<pdf-object>`.