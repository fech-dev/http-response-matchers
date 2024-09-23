import { DefaultTheme, defineConfig } from "vitepress";
import { STATUS_MAP } from "../../src/constants";
import { getStatusMatcherName } from "../../src/utils";

function getSidebarStatusMatcherItems(): DefaultTheme.SidebarItem[] {
  return [
    { text: "toHaveStatus", link: "/matchers#tohavestatus" },
    { text: "toBeSuccessful", link: "/matchers#tobesuccessful" },
    { text: "toBeServerError", link: "/matchers#tobeservererror" },
    ...Object.keys(STATUS_MAP).map((key) => {
      const text = getStatusMatcherName(key);
      return { text, link: `/matchers#${text.toLowerCase()}` };
    }),
  ];
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vitest Response Matchers",
  description: "Custom matchers for writing expressive HTTP response tests",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/getting-started" },
      { text: "Matchers", link: "/matchers" },
    ],

    sidebar: [
      { text: "Getting Started", link: "/getting-started" },
      {
        text: "Matchers",
        link: "/matchers",
        items: [
          { text: "Cookies Matchers", link: "/matchers#cookies" },
          { text: "Headers Matchers", link: "/matchers#headers" },
          {
            text: "Status Matchers",
            link: "/matchers#status",
            collapsed: true,
            items: getSidebarStatusMatcherItems(),
          },
          { text: "JSON Matchers", link: "/matchers#json" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/fech-dev/vitest-response-matchers",
      },
      {
        icon: "npm",
        link: "https://www.npmjs.com/package/vitest-response-matchers",
      },
    ],
  },
});
