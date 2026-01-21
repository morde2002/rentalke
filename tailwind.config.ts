import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors (Navy)
        'primary-blue': '#003087',
        'primary-blue-hover': '#004aad', // Slightly lighter navy (subtle)
        'accent-purple': '#513bf3',
        'accent-purple-hover': '#3d28c4',

        // Neutral colors
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'border-gray': '#E5E7EB',
        'bg-light': '#F9FAFB',

        // Status colors
        'status-available': '#10B981',
        'status-almost-full': '#F59E0B',
        'status-occupied': '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'h1': '48px',
        'h2': '36px',
        'h3': '24px',
        'body-large': '18px',
        'body': '16px',
        'body-small': '14px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        'container': '1200px',
      },
      borderRadius: {
        'button': '1000px', // PayPal-style pill buttons
        'card': '12px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0, 0, 0.25, 1)', // PayPal easing
      },
      transitionDuration: {
        '200': '200ms',
        '400': '400ms',
      },
    },
  },
  plugins: [],
};

export default config;
