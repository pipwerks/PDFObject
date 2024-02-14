import{_ as s,c as i,o as a,V as e}from"./chunks/framework.uU83Gc3c.js";const c=JSON.parse('{"title":"Common Use Cases","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"examples/index.md","filePath":"examples/index.md"}'),t={name:"examples/index.md"},n=e(`<h1 id="common-use-cases" tabindex="-1">Common Use Cases <a class="header-anchor" href="#common-use-cases" aria-label="Permalink to &quot;Common Use Cases&quot;">​</a></h1><p>Here are some of the most common use cases for PDFObject.</p><h2 id="full-browser-embed" tabindex="-1">Full-browser embed <a class="header-anchor" href="#full-browser-embed" aria-label="Permalink to &quot;Full-browser embed&quot;">​</a></h2><p>If you don&#39;t specify a target element, PDFObject will default to <code>document.body</code>, which will cause the PDF to fill the entire browser window.</p><p>The following two examples have identical functionality.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PDFObject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">embed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/pdf/sample-3pp.pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><p><strong>Demo:</strong> <a href="/examples/full-browser-default.html" target="_blank">Full-browser embed (no selector specified)</a></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PDFObject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">embed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/pdf/sample-3pp.pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, document.body);</span></span></code></pre></div><p><strong>Demo:</strong> <a href="/examples/full-browser-explicit.html" target="_blank">Full-browser embed (explicit selector)</a></p><h2 id="passing-an-html-element-instead-of-a-selector" tabindex="-1">Passing an HTML element instead of a selector <a class="header-anchor" href="#passing-an-html-element-instead-of-a-selector" aria-label="Permalink to &quot;Passing an HTML element instead of a selector&quot;">​</a></h2><p>PDFObject needs to know where to embed your PDF. Most of the examples on this site use a CSS selector, such as <code>#my-container</code>, but you can also pass an HTML node or a jQuery element.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> container </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#my-pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PDFObject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">embed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/pdf/sample-3pp.pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, container);</span></span></code></pre></div><p><strong>Demo:</strong> <a href="/examples/passing-element-styled.html" target="_blank">Simple embed passing vanilla HTML element</a></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $container </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> $</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#my-pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PDFObject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">embed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/pdf/sample-3pp.pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, $container);</span></span></code></pre></div><p><strong>Demo:</strong> <a href="/examples/passing-element-jquery-styled.html" target="_blank">Simple embed passing vanilla HTML element</a></p><h2 id="setting-the-pdf-size" tabindex="-1">Setting the PDF size <a class="header-anchor" href="#setting-the-pdf-size" aria-label="Permalink to &quot;Setting the PDF size&quot;">​</a></h2><p>By default, PDFObject generates an <code>&lt;iframe&gt;</code> element with a width and height of 100%. It will automatically fill the target container.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PDFObject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">embed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;myfile.pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#my-container&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//outputs &lt;iframe src=&quot;myfile.pdf&quot; style=&quot;width:100%;height:100%&quot;&gt;</span></span></code></pre></div><p>PDFObject automatically appends the class <code>pdfobject</code> to the <code>&lt;iframe&gt;</code> element, and <code>pdfobject-container</code> to the target element. This helps you target your element in CSS.</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.pdfobject-container</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">500</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;my-container&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PDFObject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">embed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;myfile.pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#my-container&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//Will be embedded as</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//&lt;div id=&quot;my-container&quot; class=&quot;pdfobject-container&quot;&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//   &lt;iframe class=&quot;pdfobject&quot; [...]&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//&lt;/div&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p><strong>Demo:</strong> <a href="/examples/passing-selector-styled.html" target="_blank">Embed a PDF and specify dimensions using CSS</a></p><div class="tip custom-block github-alert"><p class="custom-block-title">TIP</p><p>PDFObject allows you to set the <code>width</code> and <code>height</code> directly on the <code>&lt;iframe&gt;</code>, but this is strongly discouraged! It&#39;s safer to specify dimensions using your site&#39;s CSS.</p><p>If you specify dimensions on the <code>&lt;iframe&gt;</code> element directly, you will lose the ability to resize the element via CSS, because the inline styles will always take precedence over the other styles in your file. Therefore it is recommended that you specify dimensions using external CSS rules as shown above.</p></div><h2 id="specifying-what-page-to-open" tabindex="-1">Specifying what page to open <a class="header-anchor" href="#specifying-what-page-to-open" aria-label="Permalink to &quot;Specifying what page to open&quot;">​</a></h2><p>As outlined on the <a href="/guide/browser-support.html">Browser Support</a> page, most PDF Open Parameters are not widely supported. However, there is one parameter that works everywhere: the <code>page</code> parameter.</p><p>If you specify a page number using the <code>page</code> parameter, as shown in this example, the PDF will auto-scroll to the specified page number when it loads.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> options </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   page: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PDFObject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">embed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/pdf/sample-3pp.pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#my-container&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, options);</span></span></code></pre></div><p><strong>Demo:</strong> <a href="/examples/specifying-page-number.html" target="_blank">Opening a specific page within the PDF</a></p><p>Some PDF engines also support the <code>pagemode</code> option, which can be used to display the PDF&#39;s page thumbnails. This is expecially handy when paired with the <code>page</code> parameter.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> options </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   page: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    pdfOpenParams: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        pagemode: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;thumbs&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PDFObject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">embed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/pdf/sample-3pp.pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#my-container&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, options);</span></span></code></pre></div><p><strong>Demo:</strong> <a href="/examples/specifying-page-number-thumbnails.html" target="_blank">Opening a specific page within the PDF, while also displaying thumbnails</a></p><h2 id="custom-fallback-message" tabindex="-1">Custom fallback message <a class="header-anchor" href="#custom-fallback-message" aria-label="Permalink to &quot;Custom fallback message&quot;">​</a></h2><p>PDFObject allows you to display custom messages to users when their browser is unable to display PDFs (this is most common on mobile devices). By default, PDFObject will display the message:</p><blockquote><p>This browser does not support inline PDFs. Please download the PDF to view it: Download PDF</p></blockquote><p>You can replace this message with any string you like. If you would like to let the user download the PDF, just add a link using the <code>[url]</code> shortcode, like so:</p><blockquote><p><code>&lt;a href=&#39;[url]&#39;&gt;Custom link&lt;/a&gt;</code></p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> customFallback </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;This is a custom fallback link that displays when the PDF can&#39;t be embedded. The PDF&#39;s URL can be embedded anywhere in this string using a shortcode. &lt;a href=&#39;[url]&#39;&gt;You can make a link&lt;/a&gt; or display it as text like this: [url].&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PDFObject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">embed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/pdf/sample-3pp.pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#my-pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, { fallbackLink: customFallback });</span></span></code></pre></div><p><strong>Demo:</strong> <a href="/examples/specifying-custom-fallback-link.html" target="_blank">Custom fallback message</a></p><h2 id="displaying-base64-pdfs" tabindex="-1">Displaying Base64 PDFs <a class="header-anchor" href="#displaying-base64-pdfs" aria-label="Permalink to &quot;Displaying Base64 PDFs&quot;">​</a></h2><p>Some PDFs are generated dynamically as Base64 strings. PDFObject can accept Base64 strings, just pass the string as the URL.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> b64 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;data:application/pdf;base64,JVBERi0xLjMKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovQ29udGVudHMgNCAwIFI+PgplbmRvYmoKNCAwIG9iago8PC9GaWx0ZXIgL0ZsYXRlRGVjb2RlIC9MZW5ndGggMTAxPj4Kc3RyZWFtCnicFcytDoAgGEbhzlW8UQsCU5mVqcFk+G6AKf4F2YDJ7TvS2Z5wFBYmeKeRmSE0s4RUXAjQgYkKyaHlWkMPXQntqOi6I9ZxRrYRm38/F5LbkTwsjI2ubxFTuN+T16CnbH7L/xqsCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFIgXQovQ291bnQgMQovTWVkaWFCb3ggWzAgMCA1OTUuMjggODQxLjg5XQo+PgplbmRvYmoKNSAwIG9iago8PC9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwo+PgplbmRvYmoKMiAwIG9iago8PAovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0ZvbnQgPDwKL0YxIDUgMCBSCj4+Ci9YT2JqZWN0IDw8Cj4+Cj4+CmVuZG9iago2IDAgb2JqCjw8Ci9Qcm9kdWNlciAoUHlGUERGIDEuNy4yIGh0dHA6Ly9weWZwZGYuZ29vZ2xlY29kZS5jb20vKQovQ3JlYXRpb25EYXRlIChEOjIwMjQwMjA4MDIyMTIzKQo+PgplbmRvYmoKNyAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL09wZW5BY3Rpb24gWzMgMCBSIC9GaXRIIG51bGxdCi9QYWdlTGF5b3V0IC9PbmVDb2x1bW4KPj4KZW5kb2JqCnhyZWYKMCA4CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDI1OCAwMDAwMCBuIAowMDAwMDAwNDQxIDAwMDAwIG4gCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA4NyAwMDAwMCBuIAowMDAwMDAwMzQ1IDAwMDAwIG4gCjAwMDAwMDA1NDUgMDAwMDAgbiAKMDAwMDAwMDY1NCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDgKL1Jvb3QgNyAwIFIKL0luZm8gNiAwIFIKPj4Kc3RhcnR4cmVmCjc1NwolJUVPRgo=&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PDFObject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">embed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(b64, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#my-pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><p><strong>Demo:</strong> <a href="/examples/base64.html" target="_blank">Embedding a Base64 PDF</a></p><h2 id="integrating-pdf-js" tabindex="-1">Integrating PDF.js <a class="header-anchor" href="#integrating-pdf-js" aria-label="Permalink to &quot;Integrating PDF.js&quot;">​</a></h2><p>You can force the webpage to render the PDF using <a href="https://mozilla.github.io/pdf.js" target="_blank" rel="noreferrer">PDF.js</a> instead of the browser&#39;s native PDF engine. This is ideal for scenarios where you want every user to have the same experience (no variation between browsers or operating systems), or when you want to ensure the viewer can see the PDF on a mobile device.</p><p>PDF.js can also be modified for specific use cases, such as tracking views, controlling the look/feel, toolbars, and more.</p><p>There are some important caveats:</p><ol><li>You must install and manage your own instance of PDF.js on your server. It is <strong>not</strong> included with PDFObject.</li><li>PDF.js does not allow cross-domain hosting; your PDF and PDF.js must reside on the same domain.</li><li>PDFObject does not verify that PDF.js is present and functional, it assumes you have correctly configured your PDF.js viewer and are not trying to load PDFs from a different domain. If your installation of PDF.js is malfunctioning, the PDF will not be rendered and no fallback will be displayed.</li><li>Load times may increase dramatically, as the browser has to download and initialize PDF.js before displaying the PDF.</li></ol><p>Here&#39;s an example of PDFObject instructing the browser to use PDF.js. The PDF is hosted on the same domain as PDF.js.</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PDFObject.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">embed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/pdf/sample-3pp.pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#pdf&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   page: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   pdfOpenParams: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      pagemode: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;thumbs&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   forcePDFJS: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   PDFJS_URL: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/pdfjs/web/viewer.html&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p><strong>Demo:</strong> <a href="/examples/pdfjs-forced.html" target="_blank">Using PDF.js to display the PDF</a></p>`,49),l=[n];function p(h,o,k,d,r,g){return a(),i("div",null,l)}const y=s(t,[["render",p]]);export{c as __pageData,y as default};
