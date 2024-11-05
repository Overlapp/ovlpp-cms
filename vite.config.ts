import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";

export default defineConfig({
	resolve: {
		alias: {
			"#root": __dirname,
		}
	},	
	plugins: [vike({}), react({})],
});
