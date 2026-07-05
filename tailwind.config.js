/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Prompt"', 'sans-serif'],
        sans: ['"Prompt"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          foreground: 'var(--color-primary-foreground)',
          soft: 'var(--color-primary-soft)',
        },
        page: {
          background: 'var(--color-page-background)',
        },
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
        status: {
          draft: 'var(--color-status-draft)',
          new: 'var(--color-status-new)',
          waiting: 'var(--color-status-waiting)',
          assigned: 'var(--color-status-assigned)',
          'in-progress': 'var(--color-status-in-progress)',
          completed: 'var(--color-status-completed)',
          rejected: 'var(--color-status-rejected)',
        },
      }
    },
  },
  plugins: [],
}
