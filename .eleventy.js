const pluginMermaid = require("@kevingimbel/eleventy-plugin-mermaid");
const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = (eleventyConfig) => {
	eleventyConfig.addGlobalData("projectName","Sourcepool");
	eleventyConfig.setQuietMode(true);
	eleventyConfig.addPlugin(directoryOutputPlugin);
	eleventyConfig.addPlugin(pluginMermaid);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPassthroughCopy("./src/style.css");
	eleventyConfig.addPassthroughCopy("./src/assets/");
	eleventyConfig.addPassthroughCopy({"./src/favicon":"/"});
	return {
		dir: {
			input: "src",
			output: "build"
		}
	}
};