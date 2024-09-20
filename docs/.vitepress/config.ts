import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Response Matchers",
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
        items: [
          { text: "Cookies Matchers", link: "/matchers#cookies" },
          { text: "Headers Matchers", link: "/matchers#headers" },
          { text: "Status Matchers", link: "/matchers#status" },
          { text: "JSON Matchers", link: "/matchers#json" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/fech-dev/vitest-response-matchers",
      },
    ],
  },
});
