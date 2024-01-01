import { exec } from "child_process";

function runCommand(command: string, commandName: string): Promise<void> {
	console.log(`実行中のコマンド: ${commandName}`);
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error(`エラー (${commandName}): ${error.message}`);
				reject(error);
				return;
			}
			if (stderr) {
				console.error(`標準エラー (${commandName}): ${stderr}`);
				resolve();
				return;
			}
			console.log(`標準出力 (${commandName}): ${stdout}`);
			resolve();
		});
	});
}

async function main() {
	await runCommand(
		"bunx biome check --config-path ./tools/lint/ --apply .",
		"biome",
	);
	await runCommand(
		"bunx stylelint '**/*.css' --config tools/lint/.stylelintrc.json --fix",
		"stylelint-fix",
	);
	await runCommand(
		"bunx stylelint '**/*.css' --config tools/lint/.stylelintrc.json",
		"stylelint",
	);
	await runCommand("bunx tsc --noEmit -p tsconfig.json", "tsc");
	await runCommand(
		"bunx markuplint --config tools/lint/.markuplintrc.yml src/**/*.tsx",
		"markuplint",
	);
	await runCommand(
		"bunx prettier --config tools/lint/.prettierrc --ignore-path tools/lint/.prettierignore -w .",
		"prettier",
	);
}

main().catch((error) => console.error(`実行中のエラー: ${error.message}`));
