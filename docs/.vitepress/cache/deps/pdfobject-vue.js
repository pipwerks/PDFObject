import {
  require_pdfobject
} from "./chunk-WOOT27JM.js";
import {
  createElementBlock,
  onMounted,
  onUpdated,
  openBlock,
  ref
} from "./chunk-I27O6UFQ.js";
import {
  __toESM
} from "./chunk-LQ2VYIYD.js";

// node_modules/pdfobject-vue/dist/pdfobject-vue.es.js
var import_pdfobject = __toESM(require_pdfobject());
var s = {
  __name: "PDFObject",
  props: {
    url: { type: String, required: true },
    options: { type: Object, required: false }
  },
  setup(e) {
    const t = e, n = ref(null), o = () => {
      import_pdfobject.default.embed(t.url, n.value, t.options);
    };
    return onMounted(o), onUpdated(o), (a, d) => (openBlock(), createElementBlock("div", {
      ref_key: "pdfContainer",
      ref: n
    }, null, 512));
  }
};
var _ = {
  install(e) {
    e.component("PdfObject", s);
  }
};
export {
  _ as default
};
//# sourceMappingURL=pdfobject-vue.js.map
