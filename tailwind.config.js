/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['"IBM Plex Sans Thai"', 'sans-serif'],
        sans: ['"IBM Plex Sans Thai"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        fg: {
          white: '#FFFFFF',
          quaternary: '#98A2B3',
          quaternary_hover: '#667085',
          'error-primary': '#D92D20',
          'error-secondary': '#F04438',
          'brand-primary': '#6D5DF6',
          'success-secondary': '#12B76A',
        },
        brand: {
          DEFAULT: '#6D5DF6',
          solid: '#6D5DF6',
          solid_hover: '#5B4CE6',
        },
        page: {
          background: '#F3F4F6',
        },
        surface: '#FFFFFF',
        border: '#E5E7EB',
        error: {
          DEFAULT: '#EF4444',
          solid: '#D92D20',
          solid_hover: '#B42318',
          primary: '#FEF3F2',
        },
        error_subtle: '#FEE4E2',
        'error-primary': '#D92D20',
        'error-primary_hover': '#B42318',
        success: '#22C55E',
        warning: '#F59E0B',
        info: '#3B82F6',
        status: {
          draft: '#9CA3AF',
          new: '#3B82F6',
          waiting: '#F59E0B',
          assigned: '#6D5DF6',
          'in-progress': '#06B6D4',
          completed: '#22C55E',
          rejected: '#EF4444',
        },
      },
      backgroundColor: {
        primary: '#FFFFFF',
        primary_hover: '#F9FAFB',
        secondary: '#F9FAFB',
      },
      textColor: {
        primary: '#1F2937',
        secondary: '#344054',
        secondary_hover: '#1D2939',
        tertiary: '#475467',
        tertiary_hover: '#344054',
      },
      borderColor: {
        primary: '#D0D5DD',
      },
      ringColor: {
        primary: '#D0D5DD',
      },
      boxShadow: {
        'xs-skeuomorphic': '0px 1px 2px rgba(16, 24, 40, 0.05)',
      }
    },
  },
  plugins: [],
}
