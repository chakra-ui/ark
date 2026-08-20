import { normalizeHotkey } from './normalize-hotkey.ts'

// Mirrors tests/parser.test.ts in @zag-js/hotkeys. Guards the local copy against drift
// until TODO(zag-bump) lands and this file can import from @zag-js/hotkeys directly.
describe('normalizeHotkey', () => {
  it('should produce the same string for equivalent hotkeys', () => {
    expect(normalizeHotkey('mod+k', 'mac')).toBe(normalizeHotkey('Meta+K', 'mac'))
    expect(normalizeHotkey('mod+k', 'windows')).toBe(normalizeHotkey('Control+K', 'windows'))
    expect(normalizeHotkey('ctrl+shift+k', 'mac')).toBe(normalizeHotkey('Shift+Control+K', 'mac'))
  })

  it('should order modifiers canonically', () => {
    expect(normalizeHotkey('shift+ctrl+alt+meta+k', 'mac')).toBe('Control+Alt+Shift+Meta+K')
  })

  it('should normalize sequences', () => {
    expect(normalizeHotkey('g > h', 'mac')).toBe('G > H')
    expect(normalizeHotkey('G>H', 'mac')).toBe('G > H')
  })

  it('should normalize a bare modifier', () => {
    expect(normalizeHotkey('shift', 'mac')).toBe('Shift')
  })

  it('should distinguish different hotkeys', () => {
    expect(normalizeHotkey('mod+k', 'mac')).not.toBe(normalizeHotkey('mod+j', 'mac'))
    expect(normalizeHotkey('ctrl+k', 'mac')).not.toBe(normalizeHotkey('meta+k', 'mac'))
  })
})
