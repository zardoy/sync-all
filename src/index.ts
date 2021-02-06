import * as core from "@actions/core";
import * as fs from "fs";
//@ts-ignore
// import { run as syncSecrets } from "../node_modules/secrets-sync-action/src/main";

interface ExpectedConfig {
    [groupName: string]: {
        secrets?: string[];
        label?: string;
        /**
         * @default `/sync/${group}/` e.g. if group is npm-packages the files to sync should be stored in /sync/npm-packages/
         */
        srcRoot?: string;
        repos: string[];
    }
}

// Please, open an issue if you need more customization
const main = async () => {
    const configFilePath = core.getInput("config_file", { required: true });
    if (!fs.existsSync(configFilePath)) throw new Error(`Supplied config file path ${configFilePath} doesn't exist.`);
    const jsonConfig: ExpectedConfig = JSON.parse(
        fs.readFileSync(configFilePath).toString()
    );
    core.info(jsonConfig["npm-packages"]["repos"][0]);
    // for (const [groupName, groupConfig] of Object.entries(jsonConfig)) {
    //     process.env["DRY_RUN"] = "true";

    //     const reposToSync = groupConfig.repos.map(repo => {
    //         if (!~repo.indexOf("/")) {
    //             repo = `${process.env.GITHUB_ACTOR}/${repo}`;
    //         }
    //         return repo;
    //     });
    //     if (groupConfig.secrets) {
    //         //@ts-ignore
    //         process.env["SECRETS"] = groupConfig.secrets.join("\n");
    //         process.env["REPOSITORIES_LIST_REGEX"] = "false";
    //         process.env["REPOSITORIES"] = reposToSync.join("\n");
    //         // import("files-sync-action")
    //         await syncSecrets();
    //     }
    //     continue;
    //     const filesSource = groupConfig.srcRoot || `sync/${groupName}/`;
    //     if (!fs.existsSync(filesSource)) {
    //         core.info(`${filesSource} doesn't exist. Skipping files sync...`);
    //         continue;
    //     }
    //     process.env["SRC_ROOT"] = filesSource;
    //     process.env["FILE_PATTERNS"] = `.*`;
    //     process.env["INPUT_TARGET_REPOS"] = reposToSync.join("\n");
    //     await syncFiles();
    // }
}

main().catch(err => {
    core.error(err);
});

