import {themes as prismThemes} from 'prism-react-renderer';

// 部署到 GitHub Pages 等子路徑時，用環境變數覆寫（見 README）
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const BASE_URL = process.env.BASE_URL || '/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'IT 知識庫',
  tagline: '伺服器、儲存、虛擬化實作紀錄與技術學習筆記',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: SITE_URL,
  baseUrl: BASE_URL,

  onBrokenLinks: 'throw',

  markdown: {
    // .md 用 CommonMark 解析（允許 HTML 註解），.mdx 才用 MDX
    format: 'detect',
    // ```mermaid 區塊會畫成流程圖
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  clientModules: ['./src/clientModules/imageZoom.js'],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en', 'zh'],
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: 'IT 知識庫',
        logo: {
          alt: 'logo',
          src: 'img/logo.svg',
        },
        items: [
          {type: 'docSidebar', sidebarId: 'docs', position: 'left', label: '文件'},
          {to: '/checklists/server-deployment', label: '裝機清單', position: 'left'},
          {to: '/tags', label: '標籤', position: 'left'},
          {
            type: 'dropdown',
            label: 'PDF',
            position: 'right',
            items: [
              {
                type: 'html',
                value:
                  '<button type="button" class="dropdown__link pdf-print-btn" onclick="window.print()">列印本頁／存成 PDF</button>',
              },
              {
                // 整本 PDF 由 npm run pdf 產生到 static/pdf/handbook.pdf
                to: 'pathname:///pdf/handbook.pdf',
                label: '下載整本 PDF',
                target: '_blank',
              },
            ],
          },
        ],
      },
      footer: {
        style: 'dark',
        // 內容授權 CC BY-NC-SA 4.0：可分享、需註明出處、禁止商業使用（見 LICENSE）
        copyright: `© ${new Date().getFullYear()} liam0116 · 內容採用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hant" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a> 授權：轉載請註明出處，禁止商業使用`,
      },
      mermaid: {
        theme: {light: 'neutral', dark: 'dark'},
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'ini', 'powershell'],
      },
    }),
};

export default config;
