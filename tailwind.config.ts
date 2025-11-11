import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        'primary-virtual': 'var(--primary-virtual-color)',
      },
      fontFamily: {
        digital: ['digital-7-mono', 'monospace'],
        title: ['title-font', 'sans-serif'],
      },
    },
  },
}
export default config

