/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          bgStart: "#FFF4EA",
          bgEnd: "#FFE8D6",
          primary: "#F9A66C",
          primaryHover: "#F28F4B",
          primaryActive: "#E87D35",
          burnt: "#C2561A", // Deeper burnt orange accent for key metrics & active states
          accent: "#FFD9B8",
          softFill: "#FFE9D6",
          heading: "#2B2118",
          body: "#6B5B4E",
          muted: "#9A8878",
          border: "#F3D3B8",
          cardBg: "rgba(255, 255, 255, 0.90)",
          successBg: "#EBF8F0",
          successText: "#186A3B",
          successBorder: "#C3E8D1",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(194, 86, 26, 0.08)',
        'warm-md': '0 8px 24px -6px rgba(194, 86, 26, 0.10)',
        'warm-lg': '0 16px 36px -8px rgba(194, 86, 26, 0.12)',
      },
      animation: {
        'blob-float-1': 'blobFloat1 24s ease-in-out infinite',
        'blob-float-2': 'blobFloat2 28s ease-in-out infinite',
      },
      keyframes: {
        blobFloat1: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(40px, 30px) scale(1.06)' },
        },
        blobFloat2: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(-35px, -25px) scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
};
