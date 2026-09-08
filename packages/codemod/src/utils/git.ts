import { execFileSync } from 'node:child_process'

export function isTreeClean(cwd: string): boolean {
  try {
    const out = execFileSync('git', ['status', '--porcelain'], { cwd, encoding: 'utf8' })
    return out.trim().length === 0
  } catch {
    return true
  }
}
