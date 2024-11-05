import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import Layout from "./../layouts/LayoutDefault";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
	Layout,

  // https://vike.dev/head-tags
	title: "Overlapp App CMS",
	description: "CMS to enrich our Overlapp App",

  extends: vikeReact,
} satisfies Config;
