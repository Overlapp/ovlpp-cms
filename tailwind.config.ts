import type { Config } from "tailwindcss";

export default {
  content: ["./{pages,layouts,components,src}/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('daisyui'),
	],
} satisfies Config;
