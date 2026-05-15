/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['IBM Plex Mono', 'Courier New', 'monospace'],
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0f0e0d',
        paper: '#f5f2ee',
        muted: '#e8e3dc',
        dim: '#9e9890',
        accent: '#d4570a',
        'status-todo': '#6b7280',
        'status-progress': '#2563eb',
        'status-done': '#16a34a',
      },
    },
  },
  plugins: [],
}
