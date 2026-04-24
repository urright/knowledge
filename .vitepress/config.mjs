import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Hermes Agent 知识库',
  description: '整理自微信公众号文章（2026年4月）',
  srcDir: '.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }]
  ],
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'Hermes KB',
    nav: [
      { text: '首页', link: '/' },
      { text: '快速上手', link: '/01-quickstart' },
      { text: '配置指南', link: '/02-config' },
      { text: '高阶配置', link: '/03-advanced' },
      { text: '深度思考', link: '/04-deepthink' },
      { text: '飞书集成', link: '/05-feishu' },
      { text: '本地记忆', link: '/06-memos' },
      { text: '工具链', link: '/07-tools' },
    ],
    sidebar: {
      '/': [
        { text: '首页', link: '/' },
        { text: '快速上手', link: '/01-quickstart' },
        { text: '配置指南', link: '/02-config' },
        { text: '高阶配置', link: '/03-advanced' },
        { text: '深度思考', link: '/04-deepthink' },
        { text: '飞书集成', link: '/05-feishu' },
        { text: '本地记忆', link: '/06-memos' },
        { text: '工具链速查', link: '/07-tools' },
      ]
    },
    search: {
      provider: 'local',
      options: {
        detailedView: true
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nousresearch/hermes-agent' }
    ],
    footer: {
      message: '内容整理自微信公众号，来源见各章节。',
      copyright: 'MIT License'
    }
  },
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
