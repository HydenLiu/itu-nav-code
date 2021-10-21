import React from 'react'
import path from 'path'

export default {
  Document: ({
    Html,
    Head,
    Body,
    children,
    state: { siteData, renderMeta }
  }) => (
    <Html lang='en-US'>
      <Head>
        <meta httpEquiv='Content-Type' content='text/html; charset=UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>艾兔db - 程序员导航(要天天开心哦～~)</title>
        <meta name='description' content='艾兔,艾兔网,程序员导航,导航主页,编程导航,导航网站' />
        <meta name='keywords' content='艾兔,艾兔网,艾兔db,程序员导航,主页,编程,程序员,导航,资源,编程导航' />
        <link rel='shortcut icon' href='favicon.ico' type='image/x-icon' />
        <script src='baiduAnalyze.js'></script>
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
  entry: path.join(__dirname, 'src', 'index.tsx'),
  silent: true,
  sideRoot: 'https://itudb.cn',
  devServer: {
    port: 4518,
    host: '127.0.0.1'
  },
  plugins: [
    ['react-static-plugin-sass'],
    ['react-static-plugin-typescript', { typeCheck: false }],
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages')
      }
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap')
  ]
}
