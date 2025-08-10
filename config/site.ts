export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "USPS Shipping Label Generator",
  description: "Generate USPS shipping labels with ease.",
  routes: {
    generate: "/generate",
    result: "/result",
  },
  links: {
    github: "https://github.com/kauly",
  },
};
