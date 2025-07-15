/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B21B6',
        accent: '#D946EF',
        background: '#F9FAFB',
        foreground: '#111827',
        muted: '#6B7280',
        card: '#FFFFFF',
        'card-foreground': '#111827',
        'muted-foreground': '#6B7280',
        input: '#E5E7EB', // Tailwind gray-200
        ring: '#5B21B6',
        // Add more as needed for border, destructive, etc.
      },
      fontFamily: {
        sans: [
          'Inter var',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}; 