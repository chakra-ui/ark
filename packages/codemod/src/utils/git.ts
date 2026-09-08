import { execFileSync } from 'node:child_process'

/** True when the working tree has no uncommitted changes, so a bad run is easy to undo. */
export function isTreeClean(cwd: string): boolean {
  try {
    const out = execFileSync('git', ['status', '--porcelain'], { cwd, encoding: 'utf8' })
    return out.trim().length === 0
  } catch {
    // not a git repo: nothing to protect, so do not block
    return true
  }
}
