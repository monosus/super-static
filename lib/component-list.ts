import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chokidar from "chokidar";

const currentModulePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentModulePath);

const componentsDirectory = path.resolve(
	currentDirectory,
	"..",
	"src",
	"components",
);
const componentIndexFilePath = path.resolve(componentsDirectory, "index.ts");
const recipeIndexFilePath = path.resolve(componentsDirectory, "recipe.ts");

function generateComponentExports(): void {
	const directories = fs.readdirSync(componentsDirectory).filter((item) => {
		const itemPath = path.join(componentsDirectory, item);
		return (
			fs.statSync(itemPath).isDirectory() &&
			fs.existsSync(path.join(itemPath, "index.tsx"))
		);
	});

	const componentExports = directories.map((dir) => {
		return `export { default as ${dir} } from './${dir}';`;
	});

	fs.writeFileSync(componentIndexFilePath, `${componentExports.join("\n")}\n`);
}

function generateRecipeExports(): void {
	const directories = fs.readdirSync(componentsDirectory).filter((item) => {
		const itemPath = path.join(componentsDirectory, item);
		return fs.statSync(itemPath).isDirectory();
	});

	const recipeImports: string[] = [];
	const recipeKeys: string[] = [];
	for (const dir of directories) {
		const recipeFile = `${dir}.recipe.ts`;
		const recipePath = path.join(componentsDirectory, dir, recipeFile);
		if (fs.existsSync(recipePath)) {
			recipeImports.push(
				`import { ${dir}Recipe } from './${dir}/${dir}.recipe';`,
			);
			recipeKeys.push(`  ${dir}: ${dir}Recipe,`);
		}
	}

	const output = [
		...recipeImports,
		"",
		"export const Recipes = {",
		...recipeKeys,
		"};",
	].join("\n");

	fs.writeFileSync(recipeIndexFilePath, `${output}\n`);
}

function init(): void {
	generateComponentExports();
	generateRecipeExports();
}

function watchComponents(): void {
	const watcher = chokidar.watch(componentsDirectory, {
		persistent: true,
		ignoreInitial: false,
		depth: 99,
	});

	watcher.on("add", (addedPath: string) => {
		if (addedPath.endsWith("/index.tsx")) {
			console.log(`Component file ${addedPath} has been added`);
			generateComponentExports();
		} else if (addedPath.endsWith(".recipe.ts")) {
			console.log(`Recipe file ${addedPath} has been added`);
			generateRecipeExports();
		}
	});

	console.log(`Watching for changes in ${componentsDirectory}`);
}

const command = process.argv[2];
if (command === "init") {
	init();
} else if (command === "watch") {
	watchComponents();
} else {
	console.log('Specify a valid command: "init" or "watch"');
}
