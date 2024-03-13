/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "moderate-blue": "hsl(238, 40%, 52%)",
      "soft-red": "hsl(358, 79%, 66%)",
      "light-grayish-blue": "hsl(239, 57%, 85%)",
      "plae-red": "hsl(357, 100%, 86%)",
      "dark-blue": "hsl(212, 24%, 26%)",
      "grayish-blue": "hsl(211, 10%, 45%)",
      "light-gray": "hsl(223, 19%, 93%)",
      "very-light-gray": "hsl(228, 33%, 97%)",
      white: "hsl(0, 0%, 100%)",
    },
  },
  variants: {
    fill: ["hover", "focus"], // this line does the trick
  },
  plugins: [],
};

// ===============================================
// ### Primary

// - Moderate blue: hsl(238, 40%, 52%)
// - Soft Red: hsl(358, 79%, 66%)
// - Light grayish blue: hsl(239, 57%, 85%)
// - Pale red: hsl(357, 100%, 86%)

// ### Neutral

// - Dark blue: hsl(212, 24%, 26%)
// - Grayish Blue: hsl(211, 10%, 45%)
// - Light gray: hsl(223, 19%, 93%)
// - Very light gray: hsl(228, 33%, 97%)
// - White: hsl(0, 0%, 100%)
