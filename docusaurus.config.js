// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Thư viện BLAB",
  tagline: "Một thư viện hỗ trợ để phát triển ETH",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://your-docusaurus-site.example.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "BLAB", // Usually your GitHub org/user name.
  projectName: "eht_library", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        // title: "Home",
        logo: {
          alt: "BLAB Library Logo",
          src: "img/logo.svg",
        },

        items: [
          {
            position: "left",
            label: "Trang chủ",
            to: "http://117.4.240.104:3000",
          },
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Thư viện BLAB",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Thư viện BLAB",
            items: [
              {
                label: "Hợp đồng ETH",
                to: "/docs/smart-contracts/eth-contract",
              },
            ],
          },
        ],
        copyright: `Bản quyền © ${new Date().getFullYear()} BLAB, Inc.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
  plugins: [
    // Other plugins
    [
      "docusaurus-plugin-dotenv",
      {
        path: "./.env",
        systemvars: true,
      },
    ],
    "./src/plugins/webpack5.js",
  ],
};

export default config;
