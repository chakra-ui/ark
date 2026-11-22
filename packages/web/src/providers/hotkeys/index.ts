import {
  type CommandDefinition,
  createHotkeyRecorder as createRecorder,
  createHotkeyStore,
  type HotkeyAction,
  type HotkeyRecorder,
  type HotkeyRecorderOptions,
  type HotkeyStore,
} from '@zag-js/hotkeys'

export {
  createHotkeyStore,
  formatHotkey,
  getPlatform,
  isHotKey,
  isHotkeyEqual,
  normalizeHotkey,
  parseHotkey,
  validateHotkey,
} from '@zag-js/hotkeys'

export type {
  CommandDefinition,
  ConflictBehavior,
  HotkeyAction,
  HotkeyCommand,
  HotkeyFormatOptions,
  HotkeyOptions,
  HotkeyRecorder,
  HotkeyRecorderOptions,
  HotkeyStore,
  HotkeyStoreOptions,
  HotkeyStoreState,
  Platform,
  ParsedHotkey,
  RecordedHotkey,
} from '@zag-js/hotkeys'

export interface HotkeysCommand extends Omit<CommandDefinition, 'id'> {
  id?: string | undefined
}

export interface HotkeysOptions {
  store?: HotkeyStore | undefined
  root?: Document | ShadowRoot | undefined
}

export interface CreateHotkeyOptions extends Omit<HotkeysCommand, 'hotkey' | 'action'>, HotkeysOptions {}

let shared: HotkeyStore | undefined
let count = 0

const initialized = new WeakSet<HotkeyStore>()

export function getHotkeyStore(options: HotkeysOptions = {}): HotkeyStore {
  shared ??= createHotkeyStore()
  const store = options.store ?? shared

  if (!initialized.has(store)) {
    initialized.add(store)
    store.init({ target: options.root ?? document })
  }

  return store
}

export function createHotkeys(commands: HotkeysCommand[], options: HotkeysOptions = {}): VoidFunction {
  const store = getHotkeyStore(options)
  const ids = commands.map((command) => command.id ?? `hotkey:${++count}`)

  store.register(commands.map((command, index) => ({ ...command, id: ids[index] })))

  return () => {
    for (const id of ids) store.unregister(id)
  }
}

export function createHotkey(hotkey: string, action: HotkeyAction, options: CreateHotkeyOptions = {}): VoidFunction {
  const { store, root, ...command } = options
  return createHotkeys([{ ...command, hotkey, action }], { store, root })
}

export function createHotkeyRecorder(options: HotkeyRecorderOptions = {}): HotkeyRecorder {
  return createRecorder(options).init(options.target ?? document)
}
