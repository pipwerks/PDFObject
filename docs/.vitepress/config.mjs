import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "PDFObject",
  description: "Documentation for PDFObject.js",
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/favicons/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicons/favicon-96x96.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicons/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicons/favicon-16x16.png"}],
    ['link', { rel: "mask-icon", href: "/favicons/safari-pinned-tab.svg", color: "#5bbad5"}],
    ['link', { rel: "shortcut icon", href: "/favicons/favicon.ico"}],
    ['link', { rel: "manifest", href: "/favicons/manifest.json"}],
    ['meta', { name: "msapplication-TileColor", content: "#da532c"}],
    ['meta', { name: "msapplication-TileImage", content: "/favicons/mstile-144x144.png"}],
    ['meta', { name: "theme-color", content: "#ffffff"}]
  ],
  themeConfig: {
    logo: '/img/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Quick Start', link: '/guide/quick-start' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'NPM &amp; CDN', link: '/guide/cdn' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Why PDFObject?', link: '/guide/why-pdfobject' },
          { text: 'Quick Start', link: '/guide/quick-start' },
          { text: 'Common Use Cases', link: '/examples/' },
          { text: 'Browser Support', link: '/guide/browser-support' },
          { text: 'NPM &amp; CDN', link: '/guide/cdn' },
        ]
      },
      {
        text: 'API Documentation',
        items: [
          { text: 'API and Examples', link: '/api/' },
          { text: 'Changelog', link: '/api/changelog' }
        ]
      },
      {
        text: 'PDFObject for Vue',
        items: [
          { text: 'Using the PDFObject component in Vue 3', link: '/vue/' }
        ]
      },
      {
        text: 'Extras',
        items: [
          { text: 'How to embed PDFs without using JS or PDFObject', link: '/static/' },
          // { text: 'Markup generator', link: '/generator' },
        ]
      }
    ],
    footer: {
      message: "PDFObject is released under the <a href='http://pipwerks.mit-license.org'>MIT License</a>.",
      copyright: "Copyright © 2008-" + new Date().getFullYear() + " Philip Hutchison",
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pipwerks/pdfobject' }
    ],
    search: {
      provider: 'local'
    }
  },
  srcExclude: ['/docs/public/pdfjs/**'], // exclude PDFJS files from the build process
})