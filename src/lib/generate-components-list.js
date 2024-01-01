import fs from "fs";
import path from "path";
import chokidar from "chokidar";

const componentsDir = "src/components";
const indexFile = path.join(componentsDir, "index.ts");

function getDirectories(baseDir) {
	let directories = [];
	try {
		const items = fs.readdirSync(baseDir);
		for (const item of items) {
			const subDir = path.join(baseDir, item);
			try {
				if (fs.statSync(subDir).isDirectory()) {
					directories.push(subDir);
					directories = directories.concat(getDirectories(subDir));
				}
			} catch (error) {
				console.error(`Failed to get stats of directory: ${subDir}`, error);
			}
		}
	} catch (error) {
		console.error(`Failed to read directory: ${baseDir}`, error);
	}
	return directories;
}

function generateExports() {
	const allDirs = getDirectories(componentsDir);
	const exports = [];
	for (const dir of allDirs) {
		const indexFilePath = path.join(dir, "index.tsx");
		try {
			if (fs.existsSync(indexFilePath)) {
				const dirName = path.basename(dir);
				const relativePath = path.relative(componentsDir, dir);
				const exportLine = `export { default as ${dirName} } from './${relativePath}';\n`;
				exports.push(exportLine);
			}
		} catch (error) {
			console.error(
				`Failed to check existence of file: ${indexFilePath}`,
				error,
			);
		}
	}
	try {
		fs.writeFileSync(indexFile, exports.join(""));
	} catch (error) {
		console.error(`Failed to write to file: ${indexFile}`, error);
	}
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
			try {
				console.log(`File added: ${filePath}`);
				generateExports();
			} catch (error) {
				console.error(`Failed to handle file addition: ${filePath}`, error);
			}
		})
		.on("unlink", (filePath) => {
			try {
				console.log(`File removed: ${filePath}`);
				generateExports();
			} catch (error) {
				console.error(`Failed to handle file removal: ${filePath}`, error);
			}
		});
} else {
	console.log('Unknown command. Use "init" or "watch".');
}
