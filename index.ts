import { execSync } from 'child_process';

export const detectFromEnv = (): string => {
  const program = process.env.TERM_PROGRAM?.trim()?.toLowerCase();
  switch (program) {
    case 'apple_terminal': return 'terminal';
    case 'eterm': return 'eterm';
    case 'hyper': return 'hyper';
    case 'iterm.app': return 'iterm';
    case 'iterm': return 'iterm';
    case 'powershell': return 'powershell';
    case 'putty': return 'putty';
    case 'qterminal': return 'qterminal';
    case 'terminal.app': return 'terminal_app';
    case 'terminator': return 'terminator';
    case 'termux': return 'termux';
    case 'vscode': return 'vscode';
    case 'warp': return 'warp';
    case 'wezterm': return 'wezterm';
    default: break;
  }

  return program?.replace(/[^a-z]/g, '_') || null;
};

export const detectFromShell = (): string => {
  try {
    const terminal = execSync('echo $TERM', { encoding: 'utf8' }).trim();
    return terminal;
  } catch {
    return null;
  }
};

export const detectFromProcessTitle = (): string => {
  const processTitle = process.title?.toLowerCase();
  if (/bash/.test(processTitle)) return 'bash';
  if (/zsh/.test(processTitle)) return 'zsh';
  if (/cmd/.test(processTitle)) return 'cmd';
  if (/powershell/.test(processTitle)) return 'powershell';
  if (/sh/.test(processTitle)) return 'sh';
  return null;
};

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
