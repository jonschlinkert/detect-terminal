"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var detect_terminal_exports = {};
__export(detect_terminal_exports, {
  default: () => detect_terminal_default,
  detectFromEnv: () => detectFromEnv,
  detectFromProcessTitle: () => detectFromProcessTitle,
  detectFromShell: () => detectFromShell,
  detectTerminal: () => detectTerminal
});
module.exports = __toCommonJS(detect_terminal_exports);
var import_child_process = require("child_process");
var detectFromEnv = /* @__PURE__ */ __name(() => {
  const program = process.env.TERM_PROGRAM?.trim()?.toLowerCase();
  switch (program) {
    case "apple_terminal":
      return "terminal";
    case "eterm":
      return "eterm";
    case "hyper":
      return "hyper";
    case "iterm.app":
      return "iterm";
    case "iterm":
      return "iterm";
    case "powershell":
      return "powershell";
    case "putty":
      return "putty";
    case "qterminal":
      return "qterminal";
    case "terminal.app":
      return "terminal_app";
    case "terminator":
      return "terminator";
    case "termux":
      return "termux";
    case "vscode":
      return "vscode";
    case "warp":
      return "warp";
    case "wezterm":
      return "wezterm";
    default:
      break;
  }
  return program?.replace(/[^a-z]/g, "_") || null;
}, "detectFromEnv");
var detectFromShell = /* @__PURE__ */ __name(() => {
  try {
    const terminal = (0, import_child_process.execSync)("echo $TERM", { encoding: "utf8" }).trim();
    return terminal;
  } catch {
    return null;
  }
}, "detectFromShell");
var detectFromProcessTitle = /* @__PURE__ */ __name(() => {
  const processTitle = process.title?.toLowerCase();
  if (/bash/.test(processTitle)) return "bash";
  if (/zsh/.test(processTitle)) return "zsh";
  if (/cmd/.test(processTitle)) return "cmd";
  if (/powershell/.test(processTitle)) return "powershell";
  if (/sh/.test(processTitle)) return "sh";
  return null;
}, "detectFromProcessTitle");
var detectTerminal = /* @__PURE__ */ __name(() => {
  let terminal = detectFromEnv();
  if (!terminal) {
    terminal = detectFromShell();
  }
  if (!terminal) {
    terminal = detectFromProcessTitle();
  }
  return terminal || "unknown";
}, "detectTerminal");
var detect_terminal_default = detectTerminal;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  detectFromEnv,
  detectFromProcessTitle,
  detectFromShell,
  detectTerminal
});
//# sourceMappingURL=index.js.map