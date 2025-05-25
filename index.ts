import { execSync } from 'child_process';

/**
 * Attempt to detect the terminal using environment variables.
 */

export const detectFromEnv = (): string | null => {
  // Check popular env vars in order of reliability/usefulness
  const termProgram = process.env.TERM_PROGRAM?.trim()?.toLowerCase();

  if (termProgram) {
    switch (termProgram) {
      case 'apple_terminal': return 'terminal';
      case 'eterm': return 'eterm';
      case 'gnome-terminal': return 'gnome_terminal';
      case 'gnome-terminal-server': return 'gnome_terminal';
      case 'hyper': return 'hyper';
      case 'iterm.app': return 'iterm';
      case 'iterm': return 'iterm';
      case 'iterm2': return 'iterm';
      case 'konsole': return 'konsole';
      case 'mate-terminal': return 'mate_terminal';
      case 'powershell': return 'powershell';
      case 'putty': return 'putty';
      case 'qterminal': return 'qterminal';
      case 'rxvt': return 'rxvt';
      case 'terminal.app': return 'terminal_app';
      case 'terminator': return 'terminator';
      case 'termux': return 'termux';
      case 'vscode': return 'vscode';
      case 'warp': return 'warp';
      case 'wezterm': return 'wezterm';
      case 'xfce4-terminal': return 'xfce4_terminal';
      case 'alacritty': return 'alacritty';
      default: break;
    }
    // Unrecognized: sanitize to a string identifier
    return termProgram.replace(/[^a-z0-9]+/g, '_');
  }

  // Check for VSCode environment (alternative detection)
  if (
    typeof process.env.VSCODE_PID !== 'undefined' ||
    typeof process.env.TERM_PROGRAM_VERSION !== 'undefined' && /vscode/i.test(process.env.TERM_PROGRAM_VERSION)
  ) {
    return 'vscode';
  }

  // Fallback: $TERM variable (common in UNIX)
  const term = process.env.TERM?.trim()?.toLowerCase();
  if (term && term !== 'unknown') {
    // Attempt to match known terminals.
    // (This list can be expanded as needed)
    if (/xterm|xterm-256color/.test(term)) return 'xterm';
    if (/screen/.test(term)) return 'screen';
    if (/tmux/.test(term)) return 'tmux';
    if (/rxvt/.test(term)) return 'rxvt';
    if (/vt100/.test(term)) return 'vt100';
    if (/linux/.test(term)) return 'linux_console';
    if (/alacritty/.test(term)) return 'alacritty';
    if (/dopamine/.test(term)) return 'dopamine';
    // Fallback: sanitize TERM value
    return term.replace(/[^a-z0-9]+/g, '_');
  }

  // Check COLORTERM (might be indicative)
  const colorTerm = process.env.COLORTERM?.trim()?.toLowerCase();
  if (colorTerm === 'truecolor' || colorTerm === '24bit') {
    return 'truecolor_terminal';
  }

  return null;
};

/**
 * Attempt to detect the terminal using the $TERM variable via shell,
 * fallback: only if absolutely needed.
 */

export const detectFromShell = (): string | null => {
  // Only for environments where process.env.TERM is missing/unusable.
  try {
    const isWindows = process.platform === 'win32';
    if (isWindows) {
      const shell = process.env.COMSPEC || '';
      if (/powershell/i.test(shell)) return 'powershell';
      if (/cmd\.exe/i.test(shell)) return 'cmd';
      if (/wt\.exe/i.test(shell)) return 'windows_terminal';
      if (/conhost\.exe/i.test(shell)) return 'conhost';
      // Try checking for Windows Terminal via environment
      if (process.env.WT_SESSION) return 'windows_terminal';
      return 'windows_cmd';
    } else {
      // For Unix: check $TERM from shell as a last resort (rarely needed now)
      const terminal = execSync('echo $TERM', { encoding: 'utf8' }).trim().toLowerCase();
      return terminal?.replace(/[^a-z0-9]+/g, '_') || null;
    }
  } catch {
    return null;
  }
};

/**
 * Attempt to detect the shell/terminal from the process title.
 */

export const detectFromProcessTitle = (): string | null => {
  const processTitle = process.title?.toLowerCase() ?? '';

  // Shell names
  if (/bash/.test(processTitle)) return 'bash';
  if (/zsh/.test(processTitle)) return 'zsh';
  if (/ksh/.test(processTitle)) return 'ksh';
  if (/fish/.test(processTitle)) return 'fish';
  if (/csh/.test(processTitle)) return 'csh';
  if (/tcsh/.test(processTitle)) return 'tcsh';
  if (/pwsh/.test(processTitle)) return 'powershell';
  if (/powershell/.test(processTitle)) return 'powershell';
  if (/cmd/.test(processTitle)) return 'cmd';
  if (/sh/.test(processTitle)) return 'sh';
  // "node" is not a terminal, but could happen
  if (/node/.test(processTitle)) return 'node';

  return null;
};

/**
 * Heuristic to detect terminal as reliably as possible, with wide support.
 */

export const detectTerminal = (): string => {
  let terminal = detectFromEnv();
  if (!terminal) {
    terminal = detectFromShell();
  }
  if (!terminal) {
    terminal = detectFromProcessTitle();
  }
  return terminal || 'unknown';
};

export default detectTerminal;
