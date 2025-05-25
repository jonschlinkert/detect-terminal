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
  const termProgram = process.env.TERM_PROGRAM?.trim()?.toLowerCase();
  if (termProgram) {
    switch (termProgram) {
      case "apple_terminal":
        return "terminal";
      case "eterm":
        return "eterm";
      case "gnome-terminal":
        return "gnome_terminal";
      case "gnome-terminal-server":
        return "gnome_terminal";
      case "hyper":
        return "hyper";
      case "iterm.app":
        return "iterm";
      case "iterm":
        return "iterm";
      case "iterm2":
        return "iterm";
      case "konsole":
        return "konsole";
      case "mate-terminal":
        return "mate_terminal";
      case "powershell":
        return "powershell";
      case "putty":
        return "putty";
      case "qterminal":
        return "qterminal";
      case "rxvt":
        return "rxvt";
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
      case "xfce4-terminal":
        return "xfce4_terminal";
      case "alacritty":
        return "alacritty";
      default:
        break;
    }
    return termProgram.replace(/[^a-z0-9]+/g, "_");
  }
  if (typeof process.env.VSCODE_PID !== "undefined" || typeof process.env.TERM_PROGRAM_VERSION !== "undefined" && /vscode/i.test(process.env.TERM_PROGRAM_VERSION)) {
    return "vscode";
  }
  const term = process.env.TERM?.trim()?.toLowerCase();
  if (term && term !== "unknown") {
    if (/xterm|xterm-256color/.test(term)) return "xterm";
    if (/screen/.test(term)) return "screen";
    if (/tmux/.test(term)) return "tmux";
    if (/rxvt/.test(term)) return "rxvt";
    if (/vt100/.test(term)) return "vt100";
    if (/linux/.test(term)) return "linux_console";
    if (/alacritty/.test(term)) return "alacritty";
    if (/dopamine/.test(term)) return "dopamine";
    return term.replace(/[^a-z0-9]+/g, "_");
  }
  const colorTerm = process.env.COLORTERM?.trim()?.toLowerCase();
  if (colorTerm === "truecolor" || colorTerm === "24bit") {
    return "truecolor_terminal";
  }
  return null;
}, "detectFromEnv");
var detectFromShell = /* @__PURE__ */ __name(() => {
  try {
    const isWindows = process.platform === "win32";
    if (isWindows) {
      const shell = process.env.COMSPEC || "";
      if (/powershell/i.test(shell)) return "powershell";
      if (/cmd\.exe/i.test(shell)) return "cmd";
      if (/wt\.exe/i.test(shell)) return "windows_terminal";
      if (/conhost\.exe/i.test(shell)) return "conhost";
      if (process.env.WT_SESSION) return "windows_terminal";
      return "windows_cmd";
    } else {
      const terminal = (0, import_child_process.execSync)("echo $TERM", { encoding: "utf8" }).trim().toLowerCase();
      return terminal?.replace(/[^a-z0-9]+/g, "_") || null;
    }
  } catch {
    return null;
  }
}, "detectFromShell");
var detectFromProcessTitle = /* @__PURE__ */ __name(() => {
  const processTitle = process.title?.toLowerCase() ?? "";
  if (/bash/.test(processTitle)) return "bash";
  if (/zsh/.test(processTitle)) return "zsh";
  if (/ksh/.test(processTitle)) return "ksh";
  if (/fish/.test(processTitle)) return "fish";
  if (/csh/.test(processTitle)) return "csh";
  if (/tcsh/.test(processTitle)) return "tcsh";
  if (/pwsh/.test(processTitle)) return "powershell";
  if (/powershell/.test(processTitle)) return "powershell";
  if (/cmd/.test(processTitle)) return "cmd";
  if (/sh/.test(processTitle)) return "sh";
  if (/node/.test(processTitle)) return "node";
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