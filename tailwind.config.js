/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#135bec",
        "accent-purple": "#8b5cf6",
        "background-light": "#f6f6f8",
        "background-dark": "#0a0b1e",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "pulse-purple": "pulsePurple 3s ease-in-out infinite",
        "float-slow": "floating 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 15px rgba(19,91,236,0.4)" },
          "50%": { boxShadow: "0 0 35px rgba(19,91,236,0.8)" },
        },
        pulsePurple: {
          "0%,100%": { boxShadow: "0 0 10px rgba(139,92,246,0.2)" },
          "50%": { boxShadow: "0 0 25px rgba(139,92,246,0.5)" },
        },
        floating: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
