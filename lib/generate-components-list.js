import fs from "fs";
import path from "path";
import chokidar from "chokidar";

const componentsDir = "src/components";
const indexFile = path.join(componentsDir, "index.ts");

function getDirectories(baseDir) {
	let directories = [];
	const items = fs.readdirSync(baseDir);

	for (const item of items) {
		const subDir = path.join(baseDir, item);
		if (fs.statSync(subDir).isDirectory()) {
			directories.push(subDir);
			directories = directories.concat(getDirectories(subDir));
		}
	}

	return directories;
}

function generateExports() {
	const allDirs = getDirectories(componentsDir);
	const exports = [];

	for (const dir of allDirs) {
		const indexFilePath = path.join(dir, "index.tsx");
		if (fs.existsSync(indexFilePath)) {
			const dirName = path.basename(dir);
			const relativePath = path.relative(componentsDir, dir);
			const exportLine = `export { default as ${dirName} } from './${relativePath}';\n`;
			exports.push(exportLine);
		}
	}

	fs.writeFileSync(indexFile, exports.join(""));
	console.log(`Exported components to ${indexFile}`);
}

const command = process.argv[2];

if (command === "init") {
	generateExports();
} else if (command === "watch") {
	console.log("Watching for component changes...");
	chokidar
		.watch(componentsDir, { ignored: /^\./, persistent: true })
		.on("add", (filePath) => {
			console.log(`File added: ${filePath}`);
			generateExports();
		})
		.on("unlink", (filePath) => {
			console.log(`File removed: ${filePath}`);
			generateExports();
		});
} else {
	console.log('Unknown command. Use "init" or "watch".');
}
