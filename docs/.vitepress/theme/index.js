import DefaultTheme from "vitepress/theme";
import CustomLayout from "./CustomLayout.vue";

export default {
  extends: DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: CustomLayout,
  enhanceApp({ app }) {
    //app.use(plausible);
  },
};
