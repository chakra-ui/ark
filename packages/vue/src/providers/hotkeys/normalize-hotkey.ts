import { parseHotkey } from '@zag-js/hotkeys'
import type { Platform } from './use-platform.ts'

// TODO(zag-bump): replace this whole file with `normalizeHotkey` from @zag-js/hotkeys once
// > 1.43.1 is released. The lone-modifier handling below also works around 1.43.1's
// `parseHotkey`, which parses a bare modifier as a regular key rather than a modifier flag.
const MODIFIER_CANONICAL: Record<string, string> = {
  alt: 'Alt',
  cmd: 'Meta',
  command: 'Meta',
  control: 'Control',
  ctrl: 'Control',
  meta: 'Meta',
  option: 'Alt',
  shift: 'Shift',
  win: 'Meta',
  windows: 'Meta',
}

const resolveLoneModifier = (hotkey: string, platform: Platform): string | undefined => {
  const token = hotkey.trim().toLowerCase()
  if (token === '' || token.includes('+') || token.includes('>')) return undefined
  if (token === 'mod' || token === 'controlormeta') return platform === 'mac' ? 'Meta' : 'Control'
  return MODIFIER_CANONICAL[token]
}

const serializeStep = (
  modifiers: { alt?: boolean; ctrl?: boolean; meta?: boolean; shift?: boolean },
  keys: string[],
): string => {
  const parts: string[] = []
  if (modifiers.ctrl) parts.push('Control')
  if (modifiers.alt) parts.push('Alt')
  if (modifiers.shift) parts.push('Shift')
  if (modifiers.meta) parts.push('Meta')
  parts.push(...keys)
  return parts.join('+')
}

export const normalizeHotkey = (hotkey: string, platform: Platform): string => {
  const loneModifier = resolveLoneModifier(hotkey, platform)
  if (loneModifier) return loneModifier

  const parsed = parseHotkey(hotkey, platform)

  if (parsed.isSequence && parsed.sequenceSteps) {
    return parsed.sequenceSteps.map((step) => serializeStep(step, [step.key])).join(' > ')
  }

  return serializeStep(parsed, parsed.keys)
}
