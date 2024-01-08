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
				reject(new Error(stderr));
				resolve();
				return;
			}
			console.log(`標準出力 (${commandName}): ${stdout}`);
			resolve();
		});
	});
}

async function main() {
	const results = await Promise.allSettled([
		runCommand(
			"bunx biome check --config-path ./tools/lint/ --apply .",
			"biome",
		),
		runCommand(
			"bunx stylelint '**/*.css' --config tools/lint/.stylelintrc.json --fix",
			"stylelint-fix",
		),
		runCommand(
			"bunx stylelint '**/*.css' --config tools/lint/.stylelintrc.json",
			"stylelint",
		),
		runCommand("bunx tsc --noEmit -p tsconfig.json", "tsc"),
		runCommand(
			"bunx markuplint --config tools/lint/.markuplintrc.yml src/**/*.tsx",
			"markuplint",
		),
		runCommand(
			"bunx prettier --config tools/lint/.prettierrc --ignore-path tools/lint/.prettierignore -w ./**/*.css",
			"prettier",
		),
	]);

	const errors = results.filter((result) => result.status === "rejected");

	if (errors.length > 0) {
		console.error("エラーが発生しました:");
		for (const [index, error] of errors.entries()) {
			if ("reason" in error && error.reason instanceof Error) {
				console.error(`エラー ${index + 1}: ${error.reason.message}`);
			}
		}
	} else {
		console.log("ok 👍");
	}
}

main();
