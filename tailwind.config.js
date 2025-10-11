/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0f172a', // slate-900
          secondary: '#1e293b', // slate-800
          tertiary: '#334155', // slate-700
        },
        foreground: {
          DEFAULT: '#f1f5f9', // slate-100
          secondary: '#cbd5e1', // slate-300
          muted: '#94a3b8', // slate-400
        },
        accent: {
          primary: '#3b82f6', // blue-500
          secondary: '#8b5cf6', // violet-500
          hover: '#2563eb', // blue-600
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#f1f5f9',
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#2563eb',
              },
            },
            h1: { color: '#f1f5f9' },
            h2: { color: '#f1f5f9' },
            h3: { color: '#f1f5f9' },
            h4: { color: '#f1f5f9' },
            strong: { color: '#f1f5f9' },
            code: { color: '#f1f5f9' },
            blockquote: { color: '#cbd5e1' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
