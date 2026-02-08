/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a9dcde',
        secondary: '#082ccb',
        logo: '#183772',
        success: 'hsl(144, 52%, 34%)',
        warning: 'hsl(33, 100%, 34%)',
        // error and destructive share the same value for consistency
        // destructive is used by shadcn/ui components
        error: 'hsl(0, 78%, 49%)',
        destructive: 'hsl(0, 78%, 49%)',
        'gray-dark': '#5F5E5D',
      },
    },
  },
  plugins: [],
};
