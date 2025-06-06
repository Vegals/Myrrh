module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: ["./theme/**/*.liquid"],
    options: {
      safelist: [
        'text-xs',
        'text-sm',
        'text-base',
        'text-lg',
        'text-xl',
        'text-2xl',
        'text-3xl',
        'text-4xl',
        'text-5xl',
        'text-6xl',
        'text-7xl',
        'text-8xl',
        'text-9xl',
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.3s ease-in forwards",
        'marquee': 'marquee 3s linear infinite',
      },
      colors: {
        body_text: 'rgb(var(--body-color))',
        heading_text: 'rgb(var(--heading-color))',
        link_text: 'rgb(var(--link-color))',
        link_hover_text: 'rgb(var(--link-hover-color))',
        primary_background: 'rgb(var(--primary-background-color))',
        grid: 'rgb(var(--border-color))',
        icons: 'rgb(var(--icons-color))',
        icons_hover: 'rgb(var(--icons-hover-color))',
        button_text: 'rgb(var(--button-text-color))',
        button_background: 'rgb(var(--button-background-color))',
        button_hover_text: 'rgb(var(--button-hover-text-color))',
        button_hover_background: 'rgb(var(--button-hover-background-color))',
        button_border: 'rgb(var(--button-border-color))',
        button_hover_border: 'rgb(var(--button-hover-border-color))',

      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  variants: {
    extend: {
      // Add this to enable the 'sticky' class
      position: ["responsive", "sticky"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
    require("tailwindcss-buttons"),
  ],
};
