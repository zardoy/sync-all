import * as core from '@actions/core'
import * as fs from 'fs'
//@ts-ignore

// interface ExpectedConfig {
//     [groupName: string]: {
//         secrets?: string[];
//         label?: string;
//         /**
//          * @default `/sync/${group}/` e.g. if group is npm-packages the files to sync should be stored in /sync/npm-packages/
//          */
//         srcRoot?: string;
//         repos: string[];
//     }
// }

// /**
//  * @param inputs Do not use spaces here
//  */
// const setInputValues = (inputs: { [input: string]: string | boolean | number; }) => {
//     Object.entries(inputs).forEach(([input, value]) => {
//         process.env[`INPUT_${input.toUpperCase()}`] = value.toString();
//     });
// }

// // Please, open an issue if you need more customization
// const main = async () => {
//     const configFilePath = core.getInput("config_file", { required: true });
//     if (!fs.existsSync(configFilePath)) throw new Error(`Supplied config file path ${configFilePath} doesn't exist.`);
//     const jsonConfig: ExpectedConfig = JSON.parse(
//         fs.readFileSync(configFilePath).toString()
//     );
//     for (const [groupName, groupConfig] of Object.entries(jsonConfig)) {
//         if (typeof groupConfig !== "object" || !groupConfig.repos) {
//             core.warning(`Skipping ${groupName} group as it doesn't have "repos" property`)
//             continue;
//         }
//         setInputValues({
//             dry_run: true
//         });

//         const reposToSync = groupConfig.repos.map(repo => {
//             if (!~repo.indexOf("/")) {
//                 repo = `${process.env.GITHUB_ACTOR}/${repo}`;
//             }
//             return repo;
//         });
//         if (groupConfig.secrets || false) {
//             setInputValues({
//                 SECRETS: groupConfig.secrets.join("\n"),
//                 REPOSITORIES_LIST_REGEX: false,
//                 REPOSITORIES: reposToSync.join("\n"),
//                 CONCURRENCY: 10
//             });
//             await (await import("../node_modules/secrets-sync-action/src/main")).run();
//         }
//         const filesSource = groupConfig.srcRoot || `sync/${groupName}/`;
//         if (!fs.existsSync(filesSource)) {
//             core.info(`${filesSource} doesn't exist. Skipping files sync...`);
//             continue;
//         }
//         setInputValues({
//             SRC_ROOT: filesSource,
//             FILE_PATTERNS: `.*`,
//             TARGET_REPOS: reposToSync.join("\n")
//         });
//         //@ts-ignore
//         await (await import("files-sync-action"))();
//     }
// }

const main = async () => {
    console.log('path')
    console.log(process.env.PATH)
}

main().catch(err => {
    core.setFailed(err.message)
})
