export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
         colors: {
              primary: "var(--color-primary)",
              accent: "var(--color-accent)",
              muted: "var(--color-muted)",
              bg: "var(--color-bg)",
              text: "var(--color-text)",
         }
    },
  },
  plugins: [],
};