import { parse } from "node:path";
import { readFileSync, readJsonSync, writeJsonSync } from "fs-extra";
import { globby } from "globby";

const toPascalCase = (input: string): string =>
	input
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join("");

const main = async () => {
	const components = await globby([
		"../packages/react/src/components/*/*.{tsx,vue}",
	]);

	components
		.filter((file) => !file.endsWith(".stories.tsx"))
		.filter((file) => !file.endsWith(".stories.vue"))
		.filter((file) => !file.endsWith(".test.tsx"))
		.map((file) => {
			const content = readFileSync(file, "utf-8");
			const match = content.match(/<ark.([A-Za-z0-9]*)/);
			const component = parse(parse(file).dir).base;
			return {
				component,
				name: toPascalCase(parse(file).name.replace(`${component}-`, "")),
				tag: match?.[1],
			};
		})
		.map((item) => {
			const { name, component, tag } = item;
			if (!tag) {
				if (!name.includes("Context") && !name.includes("Root")) {
					console.log(`No node found for ${component}`, name);
				}
				return;
			}
			const types = readJsonSync(
				`../website/src/content/types/react/${component}.types.json`,
			);

			const content = Object.fromEntries(
				Object.entries(types).map(([key, value]) => {
					if (key === name) {
						// @ts-ignore
						return [key, { ...value, tag }];
					}
					return [key, value];
				}),
			);

			writeJsonSync(
				`../website/src/content/types/react/${component}.types.json`,
				content,
				{
					spaces: 2,
				},
			);
		});
};

main().catch((err) => {
	console.error(err.message);
	process.exit(1);
});
