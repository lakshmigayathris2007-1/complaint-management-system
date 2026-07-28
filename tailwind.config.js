/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core surfaces
        paper: '#F4F6F7',
        surface: '#FFFFFF',
        ink: '#17262E',
        'ink-muted': '#5C6B72',
        border: '#E1E6E8',
        // Brand
        primary: {
          DEFAULT: '#0D5C63',
          dark: '#093F44',
          light: '#E3EEEE',
        },
        accent: {
          DEFAULT: '#9C3D54',
          light: '#F3E3E7',
        },
        // Status (complaint lifecycle) — deliberately distinct from priority hues
        status: {
          open: '#6B7A82',
          'open-bg': '#EEF1F2',
          progress: '#2F6FAA',
          'progress-bg': '#E7F0F8',
          resolved: '#2E7D5B',
          'resolved-bg': '#E7F3EE',
          closed: '#9CA6AC',
          'closed-bg': '#F0F2F3',
        },
        // Priority
        priority: {
          low: '#8A97A0',
          'low-bg': '#F0F2F3',
          medium: '#B8901F',
          'medium-bg': '#FBF3E1',
          high: '#C97A2B',
          'high-bg': '#FAEEE1',
          critical: '#9C3D54',
          'critical-bg': '#F3E3E7',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        lg: '10px',
      },
    },
  },
  plugins: [],
};
