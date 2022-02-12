export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "borkhung",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css

  css: [{ src: "~/assets/custom.scss", lang: "sass" }],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~/plugins/func.js",
      mode: "client",
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["nuxt-bootstrap"],
  axios: {
    baseURL: "http://localhost:8000",
    proxyHeaders: false,
    credentials: false,
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "/api/login", method: "post" },
          logout: false,
          user: false,
        },
      },
    },
    redirect: {
      login: "/login",
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  /*
  server: {
    host: "0", // default: localhost
  },
  */
  serverMiddleware: [
    // '~/serverMiddleware/serverside',
    { path: "/api", handler: "~/api/index.js" },
  ],
  server: {
    host: process.env.BASE_URL || "localhost", // default: localhost
  },
};
