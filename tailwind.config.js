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
          DEFAULT: '#ffffff', // Pure white
          secondary: '#f8f9fa', // Very light gray for cards
          tertiary: '#e9ecef', // Light gray for hover states
        },
        foreground: {
          DEFAULT: '#2e3440', // Warm dark gray (primary text)
          secondary: '#4c566a', // Medium gray (secondary text)
          muted: '#6c757d', // Muted gray (tertiary text)
        },
        accent: {
          primary: '#5e81ac', // Soft blue (links, primary actions)
          secondary: '#88c0d0', // Teal (highlights)
          tertiary: '#81a1c1', // Light blue (alt accent)
          hover: '#4c6a8a', // Darker blue (hover state)
        },
        border: {
          DEFAULT: '#dee2e6', // Light border
          secondary: '#adb5bd', // Medium border
        },
        success: '#a3be8c', // Sage green
        warning: '#ebcb8b', // Warm yellow
        error: '#bf616a', // Muted red
        info: '#88c0d0', // Teal
      },
      maxWidth: {
        'content': '780px', // Match samwho.dev
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#2e3440',
            maxWidth: 'none',
            a: {
              color: '#5e81ac',
              textDecoration: 'underline',
              textDecorationColor: '#5e81ac',
              textUnderlineOffset: '3px',
              '&:hover': {
                color: '#4c6a8a',
                textDecorationColor: '#4c6a8a',
              },
            },
            h1: {
              color: '#2e3440',
              fontWeight: '700',
            },
            h2: {
              color: '#2e3440',
              fontWeight: '700',
              fontSize: '2rem',
            },
            h3: {
              color: '#2e3440',
              fontWeight: '600',
            },
            h4: {
              color: '#2e3440',
              fontWeight: '600',
            },
            strong: {
              color: '#2e3440',
              fontWeight: '600',
            },
            code: {
              color: '#2e3440',
              backgroundColor: '#f8f9fa',
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#2e3440',
              color: '#d8dee9',
            },
            blockquote: {
              color: '#4c566a',
              borderLeftColor: '#5e81ac',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
