// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/nightOwlLight')
const darkCodeTheme = require('prism-react-renderer/themes/nightOwl')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ark UI',
  tagline: '',
  url: 'https://ark-ui.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Ark UI',
        logo: {
          alt: 'Ark UI Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            position: 'left',
            label: 'Framework',
            items: [
              {
                type: 'doc',
                docId: 'index',
                docsPluginId: 'react',
                label: 'React',
              },
              {
                type: 'doc',
                docId: 'index',
                docsPluginId: 'solid',
                label: 'SolidJS',
              },
              {
                type: 'doc',
                docId: 'index',
                docsPluginId: 'vue',
                label: 'Vue.js',
              },
            ],
          },

          {
            href: 'https://github.com/chakra-ui/ark',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.com/invite/chakra-ui',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/chakra_ui',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/chakra-ui/ark',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Chakra UI, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  plugins: [
    './plugins/load-component-docs.js',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'react',
        path: 'docs/react',
        routeBasePath: '/docs/react',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'solid',
        path: 'docs/solid',
        routeBasePath: '/docs/solid',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'vue',
        path: 'docs/vue',
        routeBasePath: '/docs/vue',
      },
    ],
    '@docusaurus/plugin-content-pages',
  ],
  themes: [['@docusaurus/theme-classic', { customCss: require.resolve('./src/css/custom.css') }]],
}

module.exports = config
