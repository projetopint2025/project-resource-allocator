import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        customBlue: '#2C5697',
        'customBlue-subtle': 'rgba(44, 86, 151, 0.1)',
        'customBlue-glass': 'rgba(44, 86, 151, 0.05)',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'blur-gradient': 'linear-gradient(to bottom right, white, rgba(255, 255, 255, 0.9), rgba(44, 86, 151, 0.1))',
      },
      backdropBlur: {
        xs: '1px',
        '2xs': '2px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function({ addBase, addComponents, addUtilities }) {
      addBase({
        ':root': {
          '--blur-color-1': 'rgba(255, 255, 255, 0.6)',
          '--blur-color-2': 'rgba(44, 86, 151, 0.05)',
          '--custom-backdrop-blur': '120px',
        },
        'html, body': {
          position: 'relative',
          backgroundColor: 'white',
          minHeight: '100%',
          overflow: 'hidden',
        },
        'body::before': {
          content: '""',
          position: 'fixed',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
          zIndex: '-1',
          background: 'radial-gradient(circle at 10% 30%, var(--blur-color-1) 0%, transparent 70%), radial-gradient(circle at 90% 80%, var(--blur-color-2) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(var(--custom-backdrop-blur))',
        },
        '.glass-card': {
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(8px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        },
        '.glass-bg': {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(5px)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
      });
      
      addUtilities({
        '.custom-blur-bg': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            zIndex: '-1',
            background: 'radial-gradient(circle at 0% 0%, var(--blur-color-1) 0%, transparent 70%), radial-gradient(circle at 100% 100%, var(--blur-color-2) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          },
        },
        '.custom-blue-blur': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            right: '0',
            bottom: '0',
            left: '0',
            zIndex: '-1',
            background: 'radial-gradient(circle at 50% 50%, rgba(44, 86, 151, 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          },
        },
      });
    }),
  ],
} satisfies Config;
