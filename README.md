# detect-terminal [![NPM version](https://img.shields.io/npm/v/detect-terminal.svg?style=flat)](https://www.npmjs.com/package/detect-terminal) [![NPM monthly downloads](https://img.shields.io/npm/dm/detect-terminal.svg?style=flat)](https://npmjs.org/package/detect-terminal) [![NPM total downloads](https://img.shields.io/npm/dt/detect-terminal.svg?style=flat)](https://npmjs.org/package/detect-terminal)

> Detect the terminal program currently being used, with support for iTerm, Terminal.app, Hyper, iTerm2, ConEmu, Cmde,r Alacritty, Xterm, Terminator, Termux, Kitty, and others. Detection is based on environment variables and process-level indicators to identify the terminal in use. This can't be done reliably in all cases, but it's useful when available.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save detect-terminal
```

## Usage

```js
import detectTerminal from 'detect-terminal';
// or
import { detectTerminal } from 'detect-terminal';

console.log(detectTerminal()) //=> "iterm" (or whatever terminal you're using)
```

## Supported Terminals

The following terminals are supported. Detection is based on environment variables and process-level indicators to identify the terminal in use.

| Terminal | Detection (ENV / Process) | Description |
| --- | --- | --- |
| [Alacritty](https://github.com/alacritty/alacritty) | `TERM=alacritty` or `TERM_PROGRAM=alacritty` | Cross-platform, GPU-accelerated terminal emulator |
| [Apple Terminal](https://support.apple.com/guide/terminal/welcome/mac) | `TERM_PROGRAM=Apple_Terminal` | macOS default terminal emulator |
| [Cmd.exe](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | `process.title=cmd` or `COMSPEC=cmd.exe` | Windows Command Prompt |
| [Eterm](http://www.eterm.org/) | `TERM_PROGRAM=Eterm` | Enlightened Terminal Emulator |
| [Gnome Terminal](https://help.gnome.org/users/gnome-terminal/stable/) | `TERM_PROGRAM=gnome-terminal` or `TERM_PROGRAM=gnome-terminal-server` | GNOME terminal emulator |
| [Guake](http://guake-project.org/) | `TERM=guake` | Dropdown terminal for GNOME |
| [Hyper](https://hyper.is/) | `TERM_PROGRAM=Hyper` | JS/HTML/CSS terminal emulator |
| [iTerm2](https://iterm2.com/) | `TERM_PROGRAM=iTerm.app` or `iTerm` or `iTerm2` | Advanced terminal for macOS |
| [Konsole](https://konsole.kde.org/) | `TERM_PROGRAM=konsole` | KDE terminal emulator |
| [LilyTerm](https://github.com/Tetralet/LilyTerm) | `TERM=lilyterm` | Lightweight X Terminal Emulator |
| [MATE Terminal](https://mate-desktop.org/) | `TERM_PROGRAM=mate-terminal` | MATE terminal emulator |
| [PowerShell](https://github.com/PowerShell/PowerShell) | `TERM_PROGRAM=powershell` or `process.title=powershell` or `COMSPEC=powershell.exe` or `process.title=pwsh` | Powerful Windows/macOS/Linux shell |
| [PuTTY](https://www.putty.org/) | `TERM_PROGRAM=putty` | Popular SSH/Telnet client for Windows |
| [QTerminal](https://github.com/lxqt/qterminal) | `TERM_PROGRAM=qterminal` | Lightweight terminal for LXQt |
| [ROXTerm](https://roxterm.sourceforge.io/) | `TERM=roxterm` | Tabbed terminal emulator |
| [rxvt/rxvt-unicode](http://rxvt.sourceforge.net/) | `TERM=rxvt*`, `TERM_PROGRAM=rxvt` | Lightweight terminal emulator and its Unicode variant |
| [Sakura](https://launchpad.net/sakura) | `TERM=sakura` | GTK-based terminal |
| [st](https://st.suckless.org/) | `TERM=st` | Simple terminal for X |
| [screen](https://www.gnu.org/software/screen/) | `TERM=screen` | Terminal multiplexer |
| [Terminator](https://gnometerminator.blogspot.com/p/introduction.html) | `TERM_PROGRAM=terminator` | Multiple terminals per window |
| [Termux](https://termux.com/) | `TERM_PROGRAM=termux` | Android terminal emulator |
| [tmux](https://github.com/tmux/tmux) | `TERM=tmux` | Terminal multiplexer |
| [VS Code](https://code.visualstudio.com/) | `TERM_PROGRAM=vscode` or `VSCODE_PID` or `TERM_PROGRAM_VERSION` contains `vscode` | Visual Studio Code integrated terminal |
| [Warp](https://www.warp.dev/) | `TERM_PROGRAM=warp` | Modern Rust-based terminal |
| [WezTerm](https://wezfurlong.org/wezterm/) | `TERM_PROGRAM=wezterm` | GPU-accelerated terminal emulator |
| [Windows Terminal](https://github.com/microsoft/terminal) | `WT_SESSION` present or `COMSPEC=wt.exe` | Modern tabbed terminal for Windows 10+ |
| [Xfce4 Terminal](https://docs.xfce.org/apps/terminal/start) | `TERM_PROGRAM=xfce4-terminal` | Xfce terminal emulator |
| [Xterm](https://invisible-island.net/xterm/) | `TERM=xterm` or `TERM=xterm-256color` | X Window System terminal emulator |
| [VT100/VT220](https://en.wikipedia.org/wiki/VT220) | `TERM=vt100` or `TERM=vt220` | DEC VT100 and VT220 (and compatible emulators) |

**Notes:**

* Detection uses the `TERM` and `TERM_PROGRAM` environment variables, as well as process-level indicators such as `process.title` on some platforms, to identify the running terminal.
* Variable values are normalized to provide a consistent terminal identifier, regardless of differences in capitalization or formatting.
* Some Windows terminals are detected using Windows-specific variables such as `COMSPEC` or `WT_SESSION`.
* Terminal multiplexers such as `tmux` and `GNU Screen` are identified through the `TERM` variable when active.
* When running inside Visual Studio Code’s integrated terminal, detection relies on specific environment variables set by VS Code.
* Distinctions are maintained between terminal emulators (e.g., iTerm2, Konsole) and shells (e.g., bash, zsh), with shells excluded from the main detection table.
* In the absence of a recognized terminal, a fallback sanitizer produces a normalized identifier or `unknown` as a last resort.
* The detection logic is designed to cover terminals across UNIX-like systems (Linux, macOS) and Windows, providing broad compatibility for diverse development environments.

## Related

You might also be interested in:

* [open-file-manager-dialog](https://www.npmjs.com/package/open-file-manager-dialog): Cross-platform library for opening a file manager dialog window programmatically on MacOS, Windows, or Linux. | [homepage](https://github.com/jonschlinkert/open-file-manager-dialog "Cross-platform library for opening a file manager dialog window programmatically on MacOS, Windows, or Linux.")
* [open-file-manager](https://www.npmjs.com/package/open-file-manager): Cross-platform utility to open a file or directory in the system's default file manager (Finder… [more](https://github.com/jonschlinkert/open-file-manager) | [homepage](https://github.com/jonschlinkert/open-file-manager "Cross-platform utility to open a file or directory in the system's default file manager (Finder, Explorer, Nautilus, etc.)")
* [open-finder-dialog](https://www.npmjs.com/package/open-finder-dialog): Open a finder dialog window (finder prompt) programmatically. Only works on MacOS. | [homepage](https://github.com/jonschlinkert/open-finder-dialog "Open a finder dialog window (finder prompt) programmatically. Only works on MacOS.")
* [open-linux-file-dialog](https://www.npmjs.com/package/open-linux-file-dialog): Open a file dialog window programmatically to allow the user to select one or more… [more](https://github.com/jonschlinkert/open-linux-file-dialog) | [homepage](https://github.com/jonschlinkert/open-linux-file-dialog "Open a file dialog window programmatically to allow the user to select one or more files. Only works on Linux. No dependencies. Supports zenity (GNOME), kdialog (KDE), yad (Yet Another Dialog), qarma (Qt-based), matedialog (MATE), rofi (window switcher wi")
* [open-windows-file-dialog](https://www.npmjs.com/package/open-windows-file-dialog): Programmatically open a file dialog window (explorer) for picking files. Only works on Windows. Also… [more](https://github.com/jonschlinkert/open-windows-file-dialog) | [homepage](https://github.com/jonschlinkert/open-windows-file-dialog "Programmatically open a file dialog window (explorer) for picking files. Only works on Windows. Also see: open-finder-dialog, open-linux-file-dialog, and open-file-manager-dialog for other platforms.")

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>

<details>
<summary><strong>Building docs</strong></summary>

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

</details>

### Author

**Jon Schlinkert**

* [GitHub Profile](https://github.com/jonschlinkert)
* [Twitter Profile](https://twitter.com/jonschlinkert)
* [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)

### License

Copyright © 2025, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the MIT License.

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.8.0, on May 25, 2025._