import DefaultTheme from "vitepress/theme";
import CustomLayout from "./CustomLayout.vue";
import { createPlausible } from "v-plausible/vue";

const plausible = createPlausible({
  init: {
    domain: "pdfobject.com",
    trackLocalhost: true,
  },
  settings: {
    enableAutoOutboundTracking: true,
    enableAutoPageviews: true,
  },
  partytown: false,
});

export default {
  extends: DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: CustomLayout,
  enhanceApp({ app }) {
    app.use(plausible);
  },
};
