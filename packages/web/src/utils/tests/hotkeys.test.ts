import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../examples/hotkeys/basic.js'
import { mount as FormFields } from '../../../examples/hotkeys/form-fields.js'
import { mount as KeyState } from '../../../examples/hotkeys/key-state.js'
import { mount as Recorder } from '../../../examples/hotkeys/recorder.js'
import { mount as Scopes } from '../../../examples/hotkeys/scopes.js'
import { mount as Sequence } from '../../../examples/hotkeys/sequence.js'
import { mount } from '../../test-utils.js'
import { createHotkey, createHotkeys, formatHotkey, getHotkeyStore, getPlatform } from '@ark-ui/web/hotkeys'

const user = userEvent.setup()

const mod = getPlatform() === 'mac' ? 'Meta' : 'Control'

const pressMod = (key: string) => user.keyboard(`{${mod}>}${key}{/${mod}}`)

afterEach(() => {
  getHotkeyStore().clear()
})

test('a hotkey fires its action until it is unregistered', async () => {
  const action = vi.fn()
  const off = createHotkey('mod+K', action)

  await pressMod('k')
  expect(action).toHaveBeenCalledTimes(1)

  off()

  await pressMod('k')
  expect(action).toHaveBeenCalledTimes(1)
})

test('createHotkeys registers every command and removes them together', async () => {
  const save = vi.fn()
  const undo = vi.fn()

  const off = createHotkeys([
    { hotkey: 'mod+S', action: save, label: 'Save' },
    { hotkey: 'mod+Z', action: undo, label: 'Undo' },
  ])

  const labels = () => Array.from(getHotkeyStore().getState().commands.values(), (command) => command.label)
  expect(labels()).toEqual(['Save', 'Undo'])

  await pressMod('s')
  await pressMod('z')

  expect(save).toHaveBeenCalledTimes(1)
  expect(undo).toHaveBeenCalledTimes(1)

  off()

  expect(labels()).toEqual([])
})

test('a sequence fires only after every key is pressed in order', async () => {
  const action = vi.fn()
  createHotkey('G > G', action)

  await user.keyboard('g')
  expect(action).not.toHaveBeenCalled()

  await user.keyboard('g')
  expect(action).toHaveBeenCalledTimes(1)
})

test('scoped commands respond only while their scope is active', async () => {
  const store = getHotkeyStore()
  const action = vi.fn()

  createHotkey('mod+B', action, { scopes: ['editor'] })

  store.setScope('reader')
  await pressMod('b')
  expect(action).not.toHaveBeenCalled()

  store.setScope('editor')
  await pressMod('b')
  expect(action).toHaveBeenCalledTimes(1)

  store.setScope('*')
})

test('plain keys are ignored in form fields unless enabled on form tags', async () => {
  const search = vi.fn()
  const preview = vi.fn()
  const save = vi.fn()

  createHotkeys([
    { hotkey: 'S', action: search },
    { hotkey: 'P', action: preview, options: { enableOnFormTags: true } },
    { hotkey: 'mod+S', action: save },
  ])

  const input = document.createElement('input')
  document.body.append(input)
  input.focus()

  await user.keyboard('sp')
  await pressMod('s')

  expect(search).not.toHaveBeenCalled()
  expect(preview).toHaveBeenCalledTimes(1)
  expect(save).toHaveBeenCalledTimes(1)
})

test('the store tracks which keys are held', async () => {
  const store = getHotkeyStore()
  const changes: boolean[] = []
  const unsubscribe = store.subscribe(
    () => store.isPressed('shift'),
    (pressed) => changes.push(pressed),
  )

  await user.keyboard('{Shift>}')
  expect(store.isPressed('shift')).toBe(true)
  expect(store.getCurrentlyPressed()).toContain('Shift')

  await user.keyboard('{/Shift}')
  expect(store.isPressed('shift')).toBe(false)
  expect(changes).toEqual([true, false])

  unsubscribe()
})

test('formatHotkey renders platform-aware labels', () => {
  expect(formatHotkey('mod+K', { platform: 'mac' })).toBe('⌘ K')
  expect(formatHotkey('mod+K', { platform: 'windows' })).toBe('Ctrl K')
  expect(formatHotkey('G > H', { platform: 'mac' })).toBe('G then H')
})

test('basic example counts each press', async () => {
  mount(Basic)

  expect(screen.getByText('0')).toBeInTheDocument()

  await pressMod('k')
  expect(screen.getByText('1')).toBeInTheDocument()
  expect(screen.getByText('time')).toBeInTheDocument()

  await pressMod('k')
  expect(screen.getByText('2')).toBeInTheDocument()
  expect(screen.getByText('times')).toBeInTheDocument()
})

test('sequence example navigates between pages', async () => {
  mount(Sequence)

  const currentPage = () => screen.getByText('Current page').nextElementSibling

  expect(currentPage()).toHaveTextContent('home')

  await user.keyboard('gs')
  expect(currentPage()).toHaveTextContent('settings')
  expect(screen.getByText('Settings').closest('li')).toHaveAttribute('data-fired')

  await user.keyboard('gh')
  expect(currentPage()).toHaveTextContent('home')
})

test('form fields example ignores single keys while typing', async () => {
  mount(FormFields)

  const lastFired = () => screen.getByText('Last fired').nextElementSibling

  await user.keyboard('s')
  expect(lastFired()).toHaveTextContent('Search (single key)')

  await user.click(screen.getByRole('textbox', { name: 'Note' }))
  await user.keyboard('s')
  expect(lastFired()).toHaveTextContent('Search (single key)')

  await user.keyboard('p')
  expect(lastFired()).toHaveTextContent('Preview (opted in)')

  await pressMod('s')
  expect(lastFired()).toHaveTextContent('Save (modifier)')
})

test('key state example shows the held keys', async () => {
  mount(KeyState)

  expect(screen.getByText('nothing')).toBeInTheDocument()
  expect(screen.getByText('Hold Shift for precision')).toBeInTheDocument()

  await user.keyboard('{Shift>}')
  expect(screen.getByText('Shift', { selector: 'kbd' })).toBeInTheDocument()
  expect(screen.getByText('Precision mode')).toBeInTheDocument()

  await user.keyboard('{/Shift}')
  expect(screen.getByText('nothing')).toBeInTheDocument()
})

test('scopes example only runs the active scope', async () => {
  mount(Scopes)

  const row = (label: string) => screen.getByText(label, { exact: false }).closest('li')

  await pressMod('p')
  expect(row('Print')).not.toHaveAttribute('data-fired')

  await pressMod('b')
  expect(row('Bold')).toHaveAttribute('data-fired')

  await user.click(screen.getByRole('button', { name: 'Switch scope' }))
  expect(screen.getByText('reader')).toBeInTheDocument()

  await pressMod('p')
  expect(row('Print')).toHaveAttribute('data-fired')
})

test('recorder example listens until cancelled', async () => {
  mount(Recorder)

  await user.click(screen.getByRole('button', { name: 'Record shortcut' }))
  expect(screen.getByRole('button', { name: 'Listening…' })).toBeDisabled()

  await user.keyboard('{Escape}')
  expect(screen.getByText('cancelled')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Record shortcut' })).toBeEnabled()
})
