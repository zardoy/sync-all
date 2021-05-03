module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 936:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core = __importStar(__nccwpck_require__(186));
const fdir_1 = __nccwpck_require__(504);
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
    console.log(process.versions);
    const paths = await new fdir_1.fdir()
        .withBasePath()
        .crawl(process.env.GITHUB_WORKSPACE)
        .withPromise();
    console.log(paths);
};
main().catch(err => {
    core.setFailed(err.message);
});


/***/ }),

/***/ 351:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const os = __importStar(__nccwpck_require__(87));
const utils_1 = __nccwpck_require__(278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const command_1 = __nccwpck_require__(351);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(278);
const os = __importStar(__nccwpck_require__(87));
const path = __importStar(__nccwpck_require__(622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(747));
const os = __importStar(__nccwpck_require__(87));
const utils_1 = __nccwpck_require__(278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 504:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports.fdir = __nccwpck_require__(533);


/***/ }),

/***/ 392:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { readdir } = __nccwpck_require__(242);
const { makeWalkerFunctions, readdirOpts } = __nccwpck_require__(568);

function promise(dir, options) {
  return new Promise((resolve, reject) => {
    callback(dir, options, (err, output) => {
      if (err) return reject(err);
      resolve(output);
    });
  });
}

function callback(dirPath, options, callback) {
  const { init, walkSingleDir } = makeWalkerFunctions();

  const { state, callbackInvoker, dir } = init(dirPath, options, callback);

  function walk(state, dir, currentDepth, callback) {
    if (currentDepth < 0) {
      --state.queue;
      return;
    }
    readdir(dir, readdirOpts, function(error, dirents) {
      if (error) {
        --state.queue;
        callback(error, state);
        return;
      }
  
      walkSingleDir(walk, state, dir, dirents, currentDepth, callback);
      if (--state.queue < 0) callback(null, state);
    });
  }

  walk(state, dir, options.maxDepth, callbackInvoker);
}

module.exports = { promise, callback };


/***/ }),

/***/ 20:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { sep } = __nccwpck_require__(622);

/* GET ARRAY */
module.exports.getArray = function(state) {
  return state.paths;
};
module.exports.getArrayGroup = function() {
  return [""].slice(0, 0);
};

/** PUSH FILE */
module.exports.pushFileFilterAndCount = function(filters) {
  return function(filename, _files, _dir, state) {
    if (filters.every((filter) => filter(filename, false)))
      state.counts.files++;
  };
};

module.exports.pushFileFilter = function(filters) {
  return function(filename, files) {
    if (filters.every((filter) => filter(filename, false)))
      files.push(filename);
  };
};

module.exports.pushFileCount = function(_filename, _files, _dir, state) {
  state.counts.files++;
};
module.exports.pushFile = function(filename, files) {
  files.push(filename);
};

/** PUSH DIR */
module.exports.pushDir = function(dirPath, paths) {
  paths.push(dirPath);
};

module.exports.pushDirFilter = function(filters) {
  return function(dirPath, paths) {
    if (filters.every((filter) => filter(dirPath, true))) {
      paths.push(dirPath);
    }
  };
};

/** JOIN PATH */
module.exports.joinPathWithBasePath = function(filename, dir) {
  return `${dir}${sep}${filename}`;
};
module.exports.joinPath = function(filename) {
  return filename;
};

/** WALK DIR */
module.exports.walkDirExclude = function(exclude) {
  return function(walk, state, path, dir, currentDepth, callback) {
    if (!exclude(dir, path)) {
      module.exports.walkDir(walk, state, path, dir, currentDepth, callback);
    }
  };
};

module.exports.walkDir = function(
  walk,
  state,
  path,
  _dir,
  currentDepth,
  callback
) {
  state.queue++;
  state.counts.dirs++;
  walk(state, path, currentDepth, callback);
};

/** GROUP FILES */
module.exports.groupFiles = function(dir, files, state) {
  state.counts.files += files.length;
  state.paths.push({ dir, files });
};
module.exports.empty = function() {};

/** CALLBACK INVOKER */
module.exports.callbackInvokerOnlyCountsSync = function(state) {
  return state.counts;
};
module.exports.callbackInvokerDefaultSync = function(state) {
  return state.paths;
};

module.exports.callbackInvokerOnlyCountsAsync = callbackInvokerBuilder(
  "counts"
);
module.exports.callbackInvokerDefaultAsync = callbackInvokerBuilder("paths");

function report(err, callback, output, suppressErrors) {
  if (err && !suppressErrors) callback(err, null);
  else callback(null, output);
}

function callbackInvokerBuilder(output) {
  return function(err, state) {
    report(err, state.callback, state[output], state.options.suppressErrors);
  };
}


/***/ }),

/***/ 568:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { sep, resolve: pathResolve } = __nccwpck_require__(622);
const { cleanPath } = __nccwpck_require__(837);
const fns = __nccwpck_require__(20);
const readdirOpts = { withFileTypes: true };

module.exports = { makeWalkerFunctions, readdirOpts };

// We cannot simply export `init` and `walkSingleDir` directly. We need to rebuild them on every call.
// Otherwise, the functions setup by `buildFunctions` can be overwritten if a new concurrent async
// call is performed while walking is still happening from another call.
function makeWalkerFunctions() {
  function init(dir, options, callback, isSync) {
    if (options.resolvePaths) dir = pathResolve(dir);
    if (options.normalizePath) dir = cleanPath(dir);

    /* We use a local state object instead of direct global variables so that each function
     * execution is independent of each other.
     */
    const state = {
      // Perf: we explicitly tell the compiler to optimize for String arrays
      paths: [""].slice(0, 0),
      queue: 0,
      counts: { files: 0, dirs: 0 },
      options,
      callback,
    };

    /*
     * Perf: We conditionally change functions according to options. This gives a slight
     * performance boost. Since these functions are so small, they are automatically inlined
     * by the engine so there's no function call overhead (in most cases).
     */
    buildFunctions(options, isSync);

    return { state, callbackInvoker, dir };
  }

  function walkSingleDir(walk, state, dir, dirents, currentDepth, callback) {
    pushDir(dir, state.paths);
    // in cases where we have / as path
    if (dir === sep) dir = "";

    const files = getArray(state);

    for (var i = 0; i < dirents.length; ++i) {
      const dirent = dirents[i];

      if (dirent.isFile()) {
        const filename = joinPath(dirent.name, dir);
        pushFile(filename, files, dir, state);
      } else if (dirent.isDirectory()) {
        let dirPath = `${dir}${sep}${dirent.name}`;
        walkDir(walk, state, dirPath, dirent.name, currentDepth - 1, callback);
      }
    }

    groupFiles(dir, files, state);
  }

  function buildFunctions(options, isSync) {
    const {
      filters,
      onlyCountsVar,
      includeBasePath,
      includeDirs,
      groupVar,
      excludeFn,
      excludeFiles,
    } = options;

    buildPushFile(filters, onlyCountsVar, excludeFiles);

    pushDir = includeDirs
      ? filters.length
        ? fns.pushDirFilter(filters)
        : fns.pushDir
      : fns.empty;

    // build function for joining paths
    joinPath = includeBasePath ? fns.joinPathWithBasePath : fns.joinPath;

    // build recursive walk directory function
    walkDir = excludeFn ? fns.walkDirExclude(excludeFn) : fns.walkDir;

    // build groupFiles function for grouping files
    groupFiles = groupVar ? fns.groupFiles : fns.empty;
    getArray = groupVar ? fns.getArrayGroup : fns.getArray;

    buildCallbackInvoker(onlyCountsVar, isSync);
  }

  function buildPushFile(filters, onlyCountsVar, excludeFiles) {
    if (excludeFiles) {
      pushFile = fns.empty;
      return;
    }

    if (filters.length && onlyCountsVar) {
      pushFile = fns.pushFileFilterAndCount(filters);
    } else if (filters.length) {
      pushFile = fns.pushFileFilter(filters);
    } else if (onlyCountsVar) {
      pushFile = fns.pushFileCount;
    } else {
      pushFile = fns.pushFile;
    }
  }

  function buildCallbackInvoker(onlyCountsVar, isSync) {
    if (onlyCountsVar) {
      callbackInvoker = isSync
        ? fns.callbackInvokerOnlyCountsSync
        : fns.callbackInvokerOnlyCountsAsync;
    } else {
      callbackInvoker = isSync
        ? fns.callbackInvokerDefaultSync
        : fns.callbackInvokerDefaultAsync;
    }
  }

  /* Dummies that will be filled later conditionally based on options */
  var pushFile = fns.empty;
  var pushDir = fns.empty;
  var walkDir = fns.empty;
  var joinPath = fns.empty;
  var groupFiles = fns.empty;
  var callbackInvoker = fns.empty;
  var getArray = fns.empty;

  return { init, walkSingleDir };
}


/***/ }),

/***/ 941:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { readdirSync } = __nccwpck_require__(242);
const { makeWalkerFunctions, readdirOpts } = __nccwpck_require__(568);

// For sync usage, we can reuse the same walker functions, because
// there will not be concurrent calls overwriting the 'built functions'
// in the middle of everything.
const { init, walkSingleDir } = makeWalkerFunctions();

function sync(dirPath, options) {
  const { state, callbackInvoker, dir } = init(dirPath, options, null, true);
  walk(state, dir, options.maxDepth);
  return callbackInvoker(state);
}

function walk(state, dir, currentDepth) {
  if (currentDepth < 0) {
    return;
  }
  try {
    const dirents = readdirSync(dir, readdirOpts);
    walkSingleDir(walk, state, dir, dirents, currentDepth);
  } catch (e) {
    if (!state.options.suppressErrors) throw e;
  }
}

module.exports = sync;


/***/ }),

/***/ 418:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { promise, callback } = __nccwpck_require__(392);
const sync = __nccwpck_require__(941);

function APIBuilder(path, options) {
  this.dir = path;
  this.options = options;
}

APIBuilder.prototype.withPromise = function() {
  return promise(this.dir, this.options);
};

APIBuilder.prototype.withCallback = function(cb) {
  callback(this.dir, this.options, cb);
};

APIBuilder.prototype.sync = function() {
  return sync(this.dir, this.options);
};

module.exports = APIBuilder;


/***/ }),

/***/ 533:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const APIBuilder = __nccwpck_require__(418);
var pm = null;
var globCache = null;
/* istanbul ignore next */
try {
  require.resolve("picomatch");
  pm = __nccwpck_require__(939);
  globCache = {};
} catch (_e) {
  // do nothing
}

function Builder() {
  this.maxDepth = Infinity;
  this.suppressErrors = true;
  this.filters = [];
}

Builder.prototype.crawl = function(path) {
  return new APIBuilder(path, this);
};

Builder.prototype.crawlWithOptions = function(path, options) {
  if (!options.maxDepth) options.maxDepth = Infinity;
  options.groupVar = options.group;
  options.onlyCountsVar = options.onlyCounts;
  options.excludeFn = options.exclude;
  options.filters = options.filters || [];

  if (options.excludeFiles) {
    options.includeDirs = true;
  }

  return new APIBuilder(path, options);
};

Builder.prototype.withBasePath = function() {
  this.includeBasePath = true;
  return this;
};

Builder.prototype.withDirs = function() {
  this.includeDirs = true;
  return this;
};

Builder.prototype.withMaxDepth = function(depth) {
  this.maxDepth = depth;
  return this;
};

Builder.prototype.withFullPaths = function() {
  this.resolvePaths = true;
  this.includeBasePath = true;
  return this;
};

Builder.prototype.withErrors = function() {
  this.suppressErrors = false;
  return this;
};

Builder.prototype.group = function() {
  this.groupVar = true;
  return this;
};

Builder.prototype.normalize = function() {
  this.normalizePath = true;
  return this;
};

Builder.prototype.filter = function(filterFn) {
  this.filters.push(filterFn);
  return this;
};

Builder.prototype.onlyDirs = function() {
  this.excludeFiles = true;
  this.includeDirs = true;
  return this;
};

Builder.prototype.glob = function(...patterns) {
  /* istanbul ignore next */
  if (!pm) {
    throw new Error(
      `Please install picomatch: "npm i picomatch" to use glob matching.`
    );
  }
  var isMatch = globCache[patterns.join("\0")];
  if (!isMatch) {
    isMatch = pm(patterns, { dot: true });
    globCache[patterns.join("\0")] = isMatch;
  }
  this.filters.push((path) => isMatch(path));
  return this;
};

Builder.prototype.exclude = function(excludeFn) {
  this.excludeFn = excludeFn;
  return this;
};

Builder.prototype.onlyCounts = function() {
  this.onlyCountsVar = true;
  return this;
};

module.exports = Builder;


/***/ }),

/***/ 242:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { lstat, lstatSync, readdir, readdirSync, Dirent } = __nccwpck_require__(747);
const { sep } = __nccwpck_require__(622);

/* istanbul ignore next */
if (!Dirent) {
  module.exports.readdir = function(dir, _, callback) {
    readdir(dir, (err, files) => {
      if (err) return process.nextTick(callback, err, null);
      if (!files.length) return process.nextTick(callback, null, []);

      let dirents = [];

      for (let i = 0; i < files.length; ++i) {
        let name = files[i];
        let path = `${dir}${sep}${name}`;
        lstat(path, (err, stat) => {
          if (err) return process.nextTick(callback, err, null);
          dirents[dirents.length] = getDirent(name, stat);
          if (dirents.length === files.length) {
            process.nextTick(callback, null, dirents);
          }
        });
      }
    });
  };

  module.exports.readdirSync = function(dir) {
    const files = readdirSync(dir);
    let dirents = [];
    for (let i = 0; i < files.length; ++i) {
      let name = files[i];
      let path = `${dir}${sep}${name}`;
      const stat = lstatSync(path);
      dirents[dirents.length] = getDirent(name, stat);
    }
    return dirents;
  };

  function getDirent(name, stat) {
    return {
      name,
      isFile: () => stat.isFile(),
      isDirectory: () => stat.isDirectory(),
    };
  }
} else {
  module.exports = { readdirSync, readdir };
}


/***/ }),

/***/ 837:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { sep, normalize } = __nccwpck_require__(622);

function cleanPath(dirPath) {
  let normalized = normalize(dirPath);

  // to account for / path
  if (normalized.length > 1 && normalized[normalized.length - 1] === sep)
    normalized = normalized.substring(0, normalized.length - 1);
  return normalized;
}

module.exports = { cleanPath };


/***/ }),

/***/ 939:
/***/ ((module) => {

module.exports = eval("require")("picomatch");


/***/ }),

/***/ 747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 87:
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__nccwpck_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __nccwpck_require__(936);
/******/ })()
;