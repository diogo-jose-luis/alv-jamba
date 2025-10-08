/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{md,mdx}",
    "./src/app/globals.css",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#520b29",     // vinho – predominante
          secondary: "#d6a434",   // dourado – secundária
          primary50: "#7a2b47",
          ink: "#171717",
          bg: "#ffffff",
          coal: "#0a0a0a",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        sans: ["var(--font-sans)"],
      },
      boxShadow: {
        brand: "0 0 0 1px #d6a434, 0 10px 24px rgba(82,11,41,0.12)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #d6a434 0%, #f0d07a 50%, #b68c2c 100%)",
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
      maxWidth: { container: "1200px" },
      transitionProperty: { spacing: "margin, padding" },
    },
  },
  plugins: [],
};
